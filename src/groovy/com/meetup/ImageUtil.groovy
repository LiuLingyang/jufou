package com.meetup

import org.apache.commons.lang.StringUtils
import org.springframework.web.multipart.MultipartFile
import org.summercool.image.AnimatedGifEncoder
import org.summercool.image.GifDecoder

import javax.imageio.IIOImage
import javax.imageio.ImageIO
import javax.imageio.ImageReader
import javax.imageio.ImageWriter
import javax.imageio.stream.ImageInputStream
import javax.imageio.stream.ImageOutputStream
import java.awt.*
import java.awt.image.BufferedImage

/**
 * 图像裁剪以及压缩处理工具类
 *
 * 主要针对动态的GIF格式图片裁剪之后，只出现一帧动态效果的现象提供解决方案
 *
 * 提供依赖三方包解决方案（针对GIF格式数据特征一一解析，进行编码解码操作）
 * 提供基于JDK Image I/O 的解决方案
 */
public class ImageUtil {

	public static enum IMAGE_FORMAT {
		BMP("bmp"), JPG("jpg"), JPEG("jpeg"), PNG("png"), GIF("gif")

		private String value

		IMAGE_FORMAT(String value) {
			this.value = value
		}

		public String getValue() {
			return value
		}

		public void setValue(String value) {
			this.value = value
		}
	}

	public static String getImageFormatName(InputStream is) throws IOException {
		try {
			String formatName = null
			ImageInputStream iis = ImageIO.createImageInputStream(is)
			Iterator<ImageReader> imageReader = ImageIO.getImageReaders(iis)
			if (imageReader.hasNext()) {
				ImageReader reader = imageReader.next()
				formatName = reader.getFormatName()
			}
			return formatName?.toLowerCase()
		} finally {
			is.close()
		}
	}

	/**
	 * 获取图片格式
	 * @param file 图片文件
	 * @return 图片格式
	 */
	public static String getImageFormatName(File file) throws IOException {
		return getImageFormatName(new FileInputStream(file))
	}

	public static String getImageFormatName(MultipartFile file) throws IOException {
		String formatName = getImageFormatName(file.inputStream)
		if (StringUtils.isBlank(formatName)) {
			String filename = file.originalFilename.trim()
			formatName = filename.substring(
					filename.lastIndexOf(".") + 1).toLowerCase()
		}
		return formatName
	}

	public static void cutImage(InputStream is, OutputStream os, String formatName,
								int x, int y, int width, int height) throws IOException {
		if (!formatName) {
			return
		}
		// GIF需要特殊处理
		try {
			if (IMAGE_FORMAT.GIF.getValue() == formatName) {
				GifDecoder decoder = new GifDecoder()
				int status = decoder.read(is)
				if (status != GifDecoder.STATUS_OK) {
					throw new IOException("read image error!")
				}

				AnimatedGifEncoder encoder = new AnimatedGifEncoder()
				encoder.start(os)
				encoder.setRepeat(decoder.getLoopCount())
				for (int i = 0; i < decoder.getFrameCount(); i++) {
					encoder.setDelay(decoder.getDelay(i))
					BufferedImage image = decoder.getFrame(i)
					image = _processImage(image, x, y, width, height)
					encoder.addFrame(image)
				}
				encoder.finish()
			} else {
				BufferedImage image = ImageIO.read(is)
				image = _processImage(image, x, y, width, height)
				ImageIO.write(image, formatName, os)
			}
		} finally {
			os.close()
			is.close()
		}
	}

	/**
	 * 剪切图片
	 *
	 * @param source 待剪切图片路径
	 * @param targetPath 裁剪后保存路径（默认为源路径）
	 * @param x 起始横坐标
	 * @param y 起始纵坐标
	 * @param width 剪切宽度
	 * @param height 剪切高度
	 *
	 * @returns 裁剪后保存路径（图片后缀根据图片本身类型生成）
	 * @throws IOException
	 */
	public static String cutImage(String sourcePath, String targetPath,
								  int x, int y, int width, int height) throws IOException {
		File file = new File(sourcePath)
		if (!file.exists()) {
			throw new IOException("not found the image: " + sourcePath)
		}
		if (StringUtils.isBlank(targetPath)) {
			targetPath = sourcePath
		}

		String formatName = getImageFormatName(file)
		if (!formatName) {
			return targetPath
		}

		// 防止图片后缀与图片本身类型不一致的情况
		String pathPrefix = getPathWithoutSuffix(targetPath)
		targetPath = pathPrefix + formatName

		cutImage(new FileInputStream(file), new FileOutputStream(targetPath),
				formatName, x, y, width, height)

		return targetPath
	}

	public static void cutImage(MultipartFile file, OutputStream os, int x, int y,
								int width, int height, boolean baseJDK = false) throws IOException {
		if (baseJDK) {
			_cutImage(file, os, x, y, width, height)
		} else {
			String formatName = getImageFormatName(file)
			cutImage(file.inputStream, os, formatName, x, y, width, height)
		}
	}

	public static void zoom(InputStream is, OutputStream os, String formatName,
							double ratio, int width, int height, int[] pos = null) throws IOException {
		if (!formatName) {
			return
		}

		try {
			// GIF需要特殊处理
			if (IMAGE_FORMAT.GIF.getValue() == formatName) {
				GifDecoder decoder = new GifDecoder()
				int status = decoder.read(is)
				if (status != GifDecoder.STATUS_OK) {
					throw new IOException("read image error!")
				}

				AnimatedGifEncoder encoder = new AnimatedGifEncoder()
				encoder.start(os)
				encoder.setRepeat(decoder.getLoopCount())
				for (int i = 0; i < decoder.getFrameCount(); i++) {
					encoder.setDelay(decoder.getDelay(i))
					BufferedImage image = decoder.getFrame(i)
					if (pos) {
						image = _processImage(image, pos[0], pos[1],
								pos[2], pos[3])
					}
					image = _zoom(image, ratio, width, height)
					encoder.addFrame(image)
				}
				encoder.finish()
			} else {
				BufferedImage image = ImageIO.read(is)
				if (pos) {
					image = _processImage(image, pos[0], pos[1],
							pos[2], pos[3])
				}
				image = _zoom(image, ratio, width, height)
				ImageIO.write(image, formatName, os)
			}
		} finally {
			os.close()
			is.close()
		}
	}

	/**
	 * 压缩图片
	 * @param sourcePath 待压缩的图片路径
	 * @param targetPath 压缩后图片路径（默认为初始路径）
	 * @param width 压缩宽度
	 * @param height 压缩高度
	 *
	 * @returns 裁剪后保存路径（图片后缀根据图片本身类型生成）
	 * @throws IOException
	 */
	public static String zoom(String sourcePath, String targetPath,
							  int width, int height) throws IOException {
		File file = new File(sourcePath)
		if (!file.exists()) {
			throw new IOException("not found the image: " + sourcePath)
		}
		if (StringUtils.isBlank(targetPath)) {
			targetPath = sourcePath
		}

		String formatName = getImageFormatName(file)
		if (!formatName) {
			return targetPath
		}

		// 防止图片后缀与图片本身类型不一致的情况
		String pathPrefix = getPathWithoutSuffix(targetPath)
		targetPath = pathPrefix + formatName

		zoom(new FileInputStream(file), new FileOutputStream(targetPath),
				formatName, 0.0d, width, height)

		return targetPath
	}

	public static String zoom(String sourcePath, String targetPath,
							  double ratio) throws IOException {
		File file = new File(sourcePath)
		if (!file.exists()) {
			throw new IOException("not found the image: " + sourcePath)
		}
		if (StringUtils.isBlank(targetPath)) {
			targetPath = sourcePath
		}

		String formatName = getImageFormatName(file)
		if (!formatName) {
			return targetPath
		}

		// 防止图片后缀与图片本身类型不一致的情况
		String pathPrefix = getPathWithoutSuffix(targetPath)
		targetPath = pathPrefix + formatName

		zoom(new FileInputStream(file), new FileOutputStream(targetPath),
				formatName, ratio, 0, 0)

		return targetPath
	}

	public static void zoom(MultipartFile file, OutputStream os,
							int width, int height) throws IOException {
		String formatName = getImageFormatName(file)
		zoom(file.inputStream, os, formatName, 0.0d, width, height)
	}

	public static void zoom(MultipartFile file, OutputStream os,
							double ratio) throws IOException {
		String formatName = getImageFormatName(file)
		zoom(file.inputStream, os, formatName, ratio, 0, 0)
	}

	private static BufferedImage[] _readImage(BufferedImage sourceImage,
											  ImageInputStream iis) throws IOException {
		BufferedImage[] images = null
		Iterator<ImageReader> imageReaders = ImageIO.getImageReaders(iis)
		if (imageReaders.hasNext()) {
			ImageReader reader = imageReaders.next()
			reader.setInput(iis)
			int imageNumber = reader.getNumImages(true)
			images = new BufferedImage[imageNumber]
			for (int i = 0; i < imageNumber; i++) {
				BufferedImage image = reader.read(i)
				if (sourceImage.width > image.width ||
						sourceImage.height > image.height) {
					image = _zoom(image, 0.0d, sourceImage.width, sourceImage.height)
				}
				images[i] = image
			}
			reader.dispose()
			iis.close()
		}
		return images
	}

	/**
	 * 读取图片
	 * @param file 图片文件
	 * @return 图片数据
	 * @throws IOException
	 */
	public static BufferedImage[] readImage(File file) throws IOException {
		BufferedImage sourceImage = ImageIO.read(file)
		ImageInputStream iis = ImageIO.createImageInputStream(file)
		return _readImage(sourceImage, iis)
	}

	public static BufferedImage[] readImage(MultipartFile file) throws IOException {
		BufferedImage sourceImage = ImageIO.read(file.inputStream)
		ImageInputStream iis = ImageIO.createImageInputStream(file.inputStream)
		return _readImage(sourceImage, iis)
	}

	private static BufferedImage _processImage(BufferedImage image,
											   int x, int y, int width, int height) {
		if (x != 0 || y != 0 || width != image.width || height != image.height) {
			Map size = parseCut(x, y, width, height, image.width, image.height)
			image = image.getSubimage(size.x, size.y, size.width, size.height)
		}
		return image
	}

	/**
	 * 根据要求处理图片
	 *
	 * @param images 图片数组
	 * @param x 横向起始位置
	 * @param y 纵向起始位置
	 * @param width 宽度
	 * @param height 宽度
	 * @return 处理后的图片数组
	 * @throws Exception
	 */
	public static BufferedImage[] processImage(BufferedImage[] images,
											   int x, int y, int width, int height) throws Exception {
		if (!images) {
			return images
		}
		BufferedImage[] oldImages = images
		images = new BufferedImage[images.length]
		for (int i = 0; i < oldImages.length; i++) {
			images[i] = _processImage(oldImages[i], x, y, width, height)
		}
		return images
	}

	public static void writeImage(BufferedImage[] images, String formatName,
								  OutputStream os) throws Exception {
		Iterator<ImageWriter> imageWriters = ImageIO.getImageWritersByFormatName(formatName)
		if (imageWriters.hasNext()) {
			ImageWriter writer = imageWriters.next()
			ImageOutputStream ios = ImageIO.createImageOutputStream(os)
			writer.setOutput(ios)

			try {
				if (writer.canWriteSequence()) {
					writer.prepareWriteSequence(null)
					for (int i = 0; i < images.length; i++) {
						BufferedImage childImage = images[i]
						IIOImage image = new IIOImage(childImage, null, null)
						writer.writeToSequence(image, null)
					}
					writer.endWriteSequence()
				} else {
					for (int i = 0; i < images.length; i++) {
						writer.write(images[i])
					}
				}
			} finally {
				writer.dispose()
				ios.close()
			}
		}
	}

	/**
	 * 写入处理后的图片到file
	 *
	 * 图片后缀根据图片格式生成
	 *
	 * @param images 处理后的图片数据
	 * @param formatName 图片格式
	 * @param file 写入文件对象
	 * @throws Exception
	 */
	public static void writeImage(BufferedImage[] images, String formatName,
								  File file) throws Exception {
		String fileName = file.getName()
		int index = fileName.lastIndexOf(".")
		if (index > 0) {
			fileName = fileName.substring(0, index + 1) + formatName
		}
		String pathPrefix = getFilePrefixPath(file.getPath())
		writeImage(images, formatName, new FileOutputStream(pathPrefix + fileName))
	}

	private static void _cutImage(Object sourceFile, OutputStream os,
								  int x, int y, int width, int height) throws Exception {
		// 读取图片信息
		BufferedImage[] images = sourceFile instanceof File ?
				readImage((File) sourceFile) : readImage((MultipartFile) sourceFile)
		// 处理图片
		images = processImage(images, x, y, width, height)
		// 获取文件后缀
		String formatName = sourceFile instanceof File ?
				getImageFormatName((File) sourceFile) :
				getImageFormatName((MultipartFile) sourceFile)

		// 写入处理后的图片到文件
		writeImage(images, formatName, os)
	}

	/**
	 * 剪切格式图片
	 *
	 * 基于JDK Image I/O解决方案
	 *
	 * @param sourceFile 待剪切图片文件对象
	 * @param destFile 裁剪后保存文件对象
	 * @param x 剪切横向起始位置
	 * @param y 剪切纵向起始位置
	 * @param width 剪切宽度
	 * @param height 剪切宽度
	 * @throws Exception
	 */
	public static void cutImage(File sourceFile, File destFile,
								int x, int y, int width, int height) throws Exception {
		// 获取文件后缀
		String formatName = getImageFormatName(sourceFile)
		_cutImage(sourceFile, new FileOutputStream(getPathWithoutSuffix(
				destFile.getPath()) + formatName), x, y, width, height)
	}

	/**
	 * 获取系统支持的图片格式
	 */
	public static void getOSSupportsStandardImageFormat() {
		String[] readerFormatName = ImageIO.getReaderFormatNames()
		String[] readerSuffixName = ImageIO.getReaderFileSuffixes()
		String[] readerMIMEType = ImageIO.getReaderMIMETypes()
		println "========================= OS supports reader ========================"
		println "OS supports reader format name :  " + Arrays.asList(readerFormatName)
		println "OS supports reader suffix name :  " + Arrays.asList(readerSuffixName)
		println "OS supports reader MIME type :  " + Arrays.asList(readerMIMEType)

		String[] writerFormatName = ImageIO.getWriterFormatNames()
		String[] writerSuffixName = ImageIO.getWriterFileSuffixes()
		String[] writerMIMEType = ImageIO.getWriterMIMETypes()

		println "========================= OS supports writer ========================"
		println "OS supports writer format name :  " + Arrays.asList(writerFormatName)
		println "OS supports writer suffix name :  " + Arrays.asList(writerSuffixName)
		println "OS supports writer MIME type :  " + Arrays.asList(writerMIMEType)
	}

	/**
	 * 压缩图片
	 * @param sourceImage 待压缩图片
	 * @param width 压缩图片高度
	 * @param height 压缩图片宽度
	 */
	private static BufferedImage _zoom(BufferedImage sourceImage, double ratio,
									   int width, int height,
									   boolean manify = false,
									   boolean fill = false,
									   boolean both = false) {
		if (ratio > 0) {
			width = (int) (sourceImage.width * ratio)
			height = (int) (sourceImage.height * ratio)
		} else {
			Map size = parseZoom(sourceImage.width, sourceImage.height,
					width, height, manify, fill, both)
			width = size.width
			height = size.height
		}
		if (!manify && sourceImage.width <= width
				&& sourceImage.height <= height) {
			return sourceImage
		}
		BufferedImage zoomImage = new BufferedImage(width, height, sourceImage.getType())
		Image image = sourceImage.getScaledInstance(width, height, Image.SCALE_SMOOTH)
		Graphics gc = zoomImage.getGraphics()
		gc.setColor(Color.WHITE)
		gc.drawImage(image, 0, 0, null)
		return _processImage(zoomImage, 0, 0, width, height)
	}

	/**
	 * 获取某个文件的前缀路径
	 *
	 * 不包含文件名的路径
	 *
	 * @param file 当前文件对象
	 * @return
	 * @throws IOException
	 */
	public static String getFilePrefixPath(File file) throws IOException {
		String path = null
		if (!file.exists()) {
			throw new IOException("not found the file!")
		}
		String fileName = file.getName()
		path = file.getPath().replace(fileName, "")
		return path
	}

	/**
	 * 获取某个文件的前缀路径
	 *
	 * 不包含文件名的路径
	 *
	 * @param path 当前文件路径
	 * @return 不包含文件名的路径
	 * @throws Exception
	 */
	public static String getFilePrefixPath(String path) throws Exception {
		if (StringUtils.isBlank(path)) {
			throw new Exception("empty file path!")
		}
		int index = path.lastIndexOf(File.separator)
		if (index > 0) {
			path = path.substring(0, index + 1)
		}
		return path
	}

	/**
	 * 获取不包含后缀的文件路径
	 *
	 * @param src
	 * @return
	 */
	public static String getPathWithoutSuffix(String src) {
		String path = src
		int index = path.lastIndexOf(".")
		if (index > 0) {
			path = path.substring(0, index + 1)
		}
		return path
	}

	/**
	 * 获取文件名
	 * @param filePath 文件路径
	 * @return 文件名
	 * @throws IOException
	 */
	public static String getFileName(String filePath) throws IOException {
		File file = new File(filePath)
		if (!file.exists()) {
			throw new IOException("not found the file!")
		}
		return file.getName()
	}

	public static Map parseSize(String size) {
		String[] ss = size.split("\\*")
		int width = ss[0].trim().toInteger()
		int height = ss[1].trim().toInteger()
		return [width: width, height: height]
	}

	public static Map parseZoom(int sWidth, int sHeight,
								int tWidth, int tHeight,
								boolean manify = false,
								boolean fill = false,
								boolean both = false) {
		if (!manify) {
			if ((both && sWidth <= tWidth && sHeight <= tHeight) ||
					(!both && sWidth <= tWidth))
				return [width: sWidth, height: sHeight]
		}
		double wRatio = (double) tWidth / (double) sWidth
		double hRatio = (double) tHeight / (double) sHeight
		double ratio = wRatio <= hRatio ? (fill ? hRatio : wRatio) :
				(fill ? wRatio : hRatio)
		int width = (int) (sWidth * ratio)
		int height = (int) (sHeight * ratio)
		return [width: width, height: height]
	}

	public static Map parseCut(int sx, int sy, int sWidth, int sHeight,
							   int tWidth, int tHeight) {
		int x = sx < tWidth ? sx : tWidth
		int y = sy < tHeight ? sy : tHeight
		int width = x + sWidth <= tWidth ? sWidth : tWidth - x
		int height = y + sHeight <= tHeight ? sHeight : tHeight - y
		return [x: x, y: y, width: width, height: height]
	}

	/**
	 * @param args
	 * @throws Exception
	 */
	public static void main(String[] args) throws Exception {
		// 获取系统支持的图片格式
		//ImageCutterUtil.getOSSupportsStandardImageFormat()

		ImageUtil imageUtil = new ImageUtil()

		try {
			// 起始坐标，剪切大小
			int x = 100
			int y = 75
			int width = 100
			int height = 100
			// 参考图像大小
			int clientWidth = 300
			int clientHeight = 250


			File file = new File("E:\\P1030425.JPG")
			BufferedImage image = ImageIO.read(file)
			double destWidth = image.width
			double destHeight = image.height

			if (destWidth < width || destHeight < height) {
				throw new Exception("源图大小小于截取图片大小!")
			}

			double widthRatio = (double) destWidth / (double) clientWidth
			double heightRatio = (double) destHeight / (double) clientHeight

			x = Double.valueOf(x * widthRatio).intValue()
			y = Double.valueOf(y * heightRatio).intValue()
			width = Double.valueOf(width * widthRatio).intValue()
			height = Double.valueOf(height * heightRatio).intValue()

			println "裁剪大小  x:" + x + ",y:" + y + ",width:" + width + ",height:" + height

			/************************ 基于三方包解决方案 *************************/
			String formatName = imageUtil.getImageFormatName(file)
			String pathSuffix = "." + formatName
			String pathPrefix = imageUtil.getFilePrefixPath(file)
			String targetPath = pathPrefix + System.currentTimeMillis() + pathSuffix
			targetPath = imageUtil.cutImage(file.getPath(), targetPath, x, y, width, height)

			String bigTargetPath = pathPrefix + System.currentTimeMillis() + pathSuffix
			imageUtil.zoom(targetPath, bigTargetPath, 100, 100)

			String smallTargetPath = pathPrefix + System.currentTimeMillis() + pathSuffix
			imageUtil.zoom(targetPath, smallTargetPath, 50, 50)

			/************************ 基于JDK Image I/O 解决方案(JDK探索失败) *************************/
//            File destFile = new File(targetPath)
//            imageUtil.cutImage(file, destFile, x, y, width, height)
		} catch (IOException ex) {
			ex.printStackTrace()
		}
	}

}