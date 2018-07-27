package com.meetup

import org.apache.hadoop.conf.Configuration
import org.apache.hadoop.fs.FSDataOutputStream
import org.apache.hadoop.fs.FileSystem
import org.apache.hadoop.fs.Path
import org.apache.hadoop.io.IOUtils
import org.springframework.web.multipart.MultipartFile

import javax.servlet.ServletRequest

class HdfsService extends AbstractService {

//	@Resource
//	def grailsApplication

	private FileSystem hdfs = null

	private String contextPath = null

	private String thumbnailContextPath = null

	private String appContextPath = null

	private boolean windows = System.getProperty("os.name").startsWith("Windows")

	public boolean isWindows() {
		return this.windows
	}

	public String getContextPath() {
		return this.contextPath
	}

	public String getThumbnailContextPath() {
		return this.thumbnailContextPath
	}

	public String getAppContextPath() {
		return this.appContextPath
	}

	public void init() {
		this.contextPath = this.grailsApplication.config.app.hdfs.contextPath
		this.thumbnailContextPath = this.grailsApplication.config.
				app.hdfs.thumbnail.contextPath
		this.appContextPath = this.grailsApplication.config.
				app.hdfs.app.contextPath
		if (!this.windows) {
			Configuration conf = new Configuration()
			this.hdfs = FileSystem.get(
					URI.create(this.grailsApplication.config.app.hdfs.uri), conf)
		}
	}

	public OutputStream create(String path, ServletRequest request, boolean local = false) {
//		String fid = UUID.randomUUID().toString().encodeAsMD5()
//		String path = fid + filename.substring(filename.lastIndexOf("."))
		if (this.hdfs && !local) {
			return this.hdfs.create(new Path(path))
		} else {
			path = request.getRealPath(path)
			File to = new File(path.substring(0,
					path.lastIndexOf(File.separator)))
			if (!to.exists()) {
				to.mkdirs()
			}
			return new FileOutputStream(path)
		}
	}

	public String upload(MultipartFile file, String path, ServletRequest request,
						 String ssize = null, boolean local = false) {
//		String fid = UUID.randomUUID().toString().encodeAsMD5()
//		String path = fid + filename.substring(filename.lastIndexOf("."))
		Map size = ssize ? ImageUtil.parseSize(ssize) : null
		if (this.hdfs && !local) {
			FSDataOutputStream output = this.hdfs.create(new Path(path))
			if (size) {
				ImageUtil.zoom(file, output, size.width, size.height)
			} else {
				IOUtils.copyBytes(file.getInputStream(), output, 4096, true)
			}
		} else {
			path = request.getRealPath(path)
			File to = new File(path.substring(0,
					path.lastIndexOf(File.separator)))
			if (!to.exists()) {
				to.mkdirs()
			}
			if (size) {
				ImageUtil.zoom(file, new FileOutputStream(path),
						size.width, size.height)
			} else {
				file.transferTo(new File(path))
			}
			path = path.replace(File.separator, "/")
		}
		return path
	}

	public String upload(File file, String path, boolean local = false) {
		if (this.hdfs && !local) {
			FSDataOutputStream output = this.hdfs.create(new Path(path))
			IOUtils.copyBytes(new FileInputStream(file), output, 4096, true)
		} else {
			File to = new File(path.substring(0, path.lastIndexOf(File.separator)))
			if (!to.exists()) {
				to.mkdirs()
			}
			file.renameTo(new File(path))
			path = path.replace(File.separator, "/")
		}
		return path
	}

	public String clip(InputStream is, String path, ServletRequest request,
					   String formatName, String ssize, int[] pos) {
		Map size = ImageUtil.parseSize(ssize)
		if (this.hdfs) {
			FSDataOutputStream output = this.hdfs.create(new Path(path))
			ImageUtil.zoom(is, output, formatName, 0.0d, size.width,
					size.height, pos)
		} else {
			path = request.getRealPath(path)
			File to = new File(path.substring(0,
					path.lastIndexOf(File.separator)))
			if (!to.exists()) {
				to.mkdirs()
			}
			ImageUtil.zoom(is, new FileOutputStream(path), formatName,
					0.0d, size.width, size.height, pos)
			path = path.replace(File.separator, "/")
		}
		return path
	}

//	private _path(path) {
//		if (path.startsWith(this.contextPath)) {
//			return path.substring(this.contextPath.length())
//		}
//		if (path.startsWith(this.thumbnailContextPath)) {
//			return path.substring(this.thumbnailContextPath.length())
//		}
//		if (path.startsWith(this.updateContextPath)) {
//			return path.substring(this.updateContextPath.length())
//		}
//		return path
//	}

	public InputStream download(String path, ServletRequest request,
								boolean local = false) {
		path = this.parseUrl(path, false)
		try {
			if (this.hdfs && !local) {
				return this.hdfs.open(new Path(path))
			} else {
				return new FileInputStream(request.getRealPath(path))
			}
		} catch (FileNotFoundException ex) {
			return null
		}
	}

	public boolean delete(String path, ServletRequest request,
						  boolean recursive = false,
						  boolean local = false) {
		path = this.parseUrl(path, false)
		if (this.hdfs && !local) {
			return this.hdfs.delete(new Path(path), recursive)
		} else {
			File file = new File(request.getRealPath(path))
			if (file.isDirectory()) {
				if (recursive) {
					return file.deleteDir()
				} else {
					return file.delete()
				}
			} else {
				return file.delete()
			}
		}
	}

	public boolean isOriginal(String url, boolean context = true) {
		return url.startsWith(this._context(context) + this.contextPath)
	}

	public boolean isThumbnail(String url, boolean context = true) {
		return url.startsWith(this._context(context) + this.thumbnailContextPath)
	}

	public boolean isApp(String url, boolean context = true) {
		return url.startsWith(this._context(context) + this.appContextPath)
	}

	private _context(boolean context = true) {
		return context ? Const.CONTEXT_PATH : ""
	}

	public String parseUrl(String url, boolean context = true) {
		if (this.isOriginal(url, context)) {
			url -= this._context(context) + this.contextPath
		}
		if (this.isThumbnail(url, context)) {
			url -= this._context(context) + this.thumbnailContextPath
		}
		if (this.isApp(url, context)) {
			url -= this._context(context) + this.appContextPath
		}
		return url
	}

}
