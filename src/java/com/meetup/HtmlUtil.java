/*
 * Created on 2006-6-1 
 *
 * Copyright @ 2004-2008 Netease. All rights reserved.
 */
package com.meetup;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.htmlparser.Node;
import org.htmlparser.Parser;
import org.htmlparser.nodes.TagNode;
import org.htmlparser.util.NodeIterator;
import org.htmlparser.util.NodeList;
import org.htmlparser.util.ParserException;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class HtmlUtil {
	/**
	 * Logger for this class
	 */
	private static final Logger logger = Logger.getLogger(HtmlUtil.class);

	public static String escapes = "&nbsp; &lt; &gt; &amp; &quot; &reg; &copy; &trade; &ensp; &emsp;";

	/**
	 * 获取没有html标签的摘要
	 *
	 * @param content
	 * @param length
	 * @return
	 */
	public static String getBrief(String content, int length) {
		StringBuffer result = new StringBuffer();
		if (content == null) {
			return "";
		}
		Parser parser = Parser.createParser(content, "GBK");
		try {
			NodeIterator iter = parser.elements();
			while (iter.hasMoreNodes()) {
				Node node = iter.nextNode();
				result.append(node.toPlainTextString());
			}
		} catch (ParserException e) {
			logger.error("getBrief(String, int)", e);
		}
		return result.substring(0, result.length() > length ? length : result.length());
	}

	/**
	 * 获取带有HTML的预览信息，其中content是对象的一个属性，也就是待处理的HTML内容
	 *
	 * @return
	 */
	public static String getAbstract(String content, int maxLength) {
		String ct = procAbstract(content, maxLength);
		if (content.length() > maxLength) {
			String plain = getPlainText(ct);
			if (plain.length() < maxLength / 4) {// 如果生成的摘要纯文本长度太短，则重新生成一次。
				ct = procAbstract(content, maxLength * 2);
			} else if (plain.length() < maxLength / 3) {// 如果生成的摘要纯文本长度太短，则重新生成一次。
				ct = procAbstract(content, (int) (maxLength * 7 / 4));
			} else if (plain.length() < maxLength / 2) {// 如果生成的摘要纯文本长度太短，则重新生成一次。
				ct = procAbstract(content, (int) (maxLength * 3 / 2));
			}
		}
		return ct;
	}

	public static String procAbstract(String content, int maxLength) {
		String ct = StringUtils.left(content, maxLength);
		//如果最后一个html标签不完整(就是'<'没有匹配的'>'),直接踢掉
		int lastEndHtmlTagIndex = ct.lastIndexOf('>');
		int lastStartHtmlTagIndex = ct.lastIndexOf('<');
		if (lastStartHtmlTagIndex > lastEndHtmlTagIndex) {
			ct = StringUtils.left(ct, lastStartHtmlTagIndex);
		}
		//处理转义符被截断的情况
		for (String escape : escapes.split(" ")) {
			String tmp = StringUtils.left(content, maxLength + escape.length() - 1);
			int escapePos = tmp.lastIndexOf(escape);
			if (escapePos + escape.length() + 1 > maxLength) {
				ct = StringUtils.left(content, escapePos);
			}
		}
		//对于一些页面嵌入了ActiveX对象进行预处理
		if (ct != null && content != null) {
			int idx2 = ct.toLowerCase().lastIndexOf("</object>");
			int idx1 = ct.toLowerCase().lastIndexOf("<object");
			if ((idx2 == -1 && idx1 >= 0) || idx1 > idx2) {
				String ct2 = content.substring(ct.length()).toLowerCase();
				int idx3 = ct2.indexOf("</object>");
				if (idx3 != -1)
					ct += content.substring(ct.length(), ct.length() + idx3 + 9);
				else
					ct = ct.substring(0, idx1);
			}
		}

		if (ct != null && content != null && ct.length() > 0) {
			if (ct.charAt(ct.length() - 1) != '>') {
				String ct2 = content.substring(ct.length()).toLowerCase();
				int idx1 = ct2.indexOf("<");//查找下一个段落
				if (idx1 < 50 && idx1 > 0) {//如果小于50个字符则一直把摘要延长
					ct += content.substring(ct.length(), ct.length() + idx1);
				}
			}
		}

		if (ct != null && content != null) {
			ct = repairHtml(ct);
		}

		return ct;
	}

	/**
	 * 修复html中不完整的html标签
	 *
	 * @param content
	 * @return
	 * @throws Exception
	 */
	public static String repairHtml(String content) {
		String result = null;
		if (content != null) {
			NodeList nodeList;
			try {
				Parser parser = Parser.createParser(content, "GBK");
				nodeList = parser.parse(null);
				return nodeList.toHtml();
			} catch (ParserException e) {
				logger.error("repairHtml(String)", e);
			}
		}
		return result;
	}

	/**
	 * 去掉html中的html标签，只返回纯文本
	 *
	 * @param content
	 * @return
	 * @throws Exception
	 */
	public static String getPlainText(String content) {
		String result = null;
		if (content != null) {
			NodeList nodeList;
			try {
				Parser parser = Parser.createParser(content, "GBK");
				nodeList = parser.parse(null);
				result = nodeList.asString();
			} catch (ParserException e) {
				logger.error("getPlainText(String)", e);
			}

			String[] escapeArr = escapes.split(" ");
			for (String escape : escapeArr) {
				result = result.replaceAll(escape, "");
			}
			result = result.replaceAll("\\s+", " ").replaceAll("((\\r\\n)\\s?)+", "\r\n");
		}
		return result;
	}

	private static void processMyNodes(Node node, StringBuffer sb) {
		String tagName;
		TagNode tagNode;
		if (node instanceof TagNode) {
			tagName = (tagNode = (TagNode) node).getTagName();
			if ("br".equalsIgnoreCase(tagName)) {
				sb.append("<br/>");
			} else if ("p".equalsIgnoreCase(tagName)) {
				sb.append("<p>");
				sb.append(tagNode.toPlainTextString());
				sb.append("</p>");
			} else {
				NodeList children = tagNode.getChildren();
				if (children != null && children.size() > 0) {
					try {
						for (NodeIterator i = children.elements(); i.hasMoreNodes(); )
							processMyNodes(i.nextNode(), sb);
					} catch (ParserException e) {
						e.printStackTrace();
					}
				}
			}
		} else {
			sb.append(node.toPlainTextString());
		}
	}


	public static String getPlainTextWithTag(String content) {
		if (content != null) {
			try {
				StringBuffer sb = new StringBuffer(1024);
				Parser parser = Parser.createParser(content, "GBK");
				for (NodeIterator i = parser.elements(); i.hasMoreNodes(); )
					processMyNodes(i.nextNode(), sb);
				return sb.toString();
			} catch (ParserException e) {
				logger.error("getPlainText(String)", e);
			}
		}
		return null;
	}

	private static boolean _isSystemImg(String src) {
		if (src.indexOf("/res/images/") >= 0 || src.indexOf("/res/img/") >= 0
				|| src.indexOf("/res/mobile/") >= 0 || src.indexOf("/res/theme/") >= 0) {
			return true;
		}
		return false;
	}

	public static String[] getImageSrc(String content, int number, boolean filterGif) {
		String[] results = new String[number];
		if (StringUtils.isBlank(content)) {
			return results;
		}
		Pattern p = Pattern.compile(
				"<img(\\s|\\s[^>]*\\s)src=(['\"])([^>'\"]*)(['\"])[^>]*>",
				Pattern.CASE_INSENSITIVE);
		Matcher m = p.matcher(content);
		int index = 0;
		while (m.find() && index < number) {
			if (m.groupCount() < 4) {
				continue;
			}
			String src = m.group(3).trim();
			if (src.length() < 2 || _isSystemImg(src)
					|| src.toLowerCase().startsWith("https://")) {//判断是否为博客自带头像
				continue;
			}
			if (filterGif && src.endsWith(".gif")) {
				continue;
			}
			results[index] = src;
			index++;
		}
		return results;
	}

	public static String getFirstImageSrc(String content) {
		if (StringUtils.isBlank(content)) {
			return "";
		}
		String[] imageUrls = getImageSrc(content, 1, false);
		String imageUrl = "";
		if (imageUrls == null || imageUrls.length == 0) {
			imageUrl = "";
		} else {
			imageUrl = imageUrls[0];
		}
		if (imageUrl == null) {
			imageUrl = "";
		}
		if (imageUrl.length() >= 255) {
			imageUrl = "";
		}
		return imageUrl;
	}

	/**
	 * @param args
	 */
	public static void main(String[] args) throws Exception {
//	  String content = "<P><STRONG><FONT size=4>一个字：<FONT style=\"BACKGROUND-COLOR: rgb(255,255,102)\" color=#ff00cc>赞</FONT></FONT></STRONG></P>"+
//						  "<P>&nbsp;</P>"+
//						  "<P>&nbsp;&nbsp;&nbsp; 今天偶然发现，在“设置”里增加了新功能“<U><FONT color=#800080>数据克隆</FONT></U>”，目前只支持spaces，正好我的旧居就在spaces，操作非常简便，完全是傻瓜式的，数据的克隆也非常迅速，不到1分钟系统就提示搬迁完成了，日志、珍藏列表、相片都搬过来了，不过还是有不足的地方：</P>"+
//						  "<P>&nbsp;</P>"+
//						  "<P>1、搬迁过来的珍藏分类必须重新命名才能添加到首页</P>"+
//						  "<P>2、spaces日志原来的分类没克隆过来，必须重新分类</P>"+
//						  "<P>3、相册只克隆了一小部分，还有大部分照片没搬过来（<FONT style=\"BACKGROUND-COLOR: rgb(204,255,255)\">可否有补救方法，把没搬过来的都搬过来？）</FONT></P>"+
//						  "<P>&nbsp;</P>"+
//						  "<P>&nbsp;</P>";
//	  String abs = getAbstract(content, 200);
//	  System.out.println(abs);
//    String content = "asdf  <br>\r\n\r\n <a    href=\"asdf\">我们是害虫我们是害虫我们是害虫我们是害虫我们是害虫我们是害ea</a>";//<table><tr><td>1234567890</td></tr></table>lk你好中国"; 
//    System.out.println(getPlainText(content));
		String content = "<DIV>bbaadf a_<div>rr<!--r<dsafds</div>aa<div>dsafa ";
		/*"<DIV "+
		  "<DIV "+
		  "<DIV "+
		  "<DIV "+
		  "<UL>"+
		  "<LI </LI></UL></DIV></DIV></DIV>"+
		  "<DIV style=\"TEXT-ALIGN: center\">"+
		  "<DIV style=\"MARGIN: 50px auto; WIDTH: 700px\">"+
		  "<DIV "+
		  "<H2 "+

		  "<DIV "+
		  "<DIV "+
		  "<DIV "+
		  "<DIV userdefineclass\">"+
		  "<DIV "+
		  "<P>??2??e￡??ú·??êμ?ò3??2?′??ú?￡?ú?éò?<A href=\"\">·μ??</A>￡??ò?°íù<A href=\"/\">?÷ò3</A>?￡</P>"+
		  "</DIV></DIV></DIV></DIV></DIV>"+

		 " <DIV href=\"http://corp.163.com/index_eng.html\" target=_blank>About Netease</A> - "+
		  "<!--<A href=\"http://corp.163.com/index_gb.html\" target=_blank>1????ò?é</A> - "+
		  "<A href=\"http://corp.163.com/gb/contactus/contactus.html\" target=_blank>áa?μ·?·¨</A> - "+
		  "<A href=\"http://corp.163.com/gb/job/job.html\" target=_blank>?D??D??￠</A> - "+
		  "<A href=\"http://corp.163.com/gb/contactus/contactus_comment.html\" target=_blank>?í?§·t??</A> - "+
		  "<A href=\"http://corp.163.com/gb/legal/legal.html\" target=_blank>?à1?·¨?é</A> - "+
		  "<A href=\"http://power.163.com/adpage/salescenter/index.html\" target=_blank>1???·t??- </A>"+
		  "<A href=\"http://www.blog.163.com/advice.do?host=public\" target=_blank>ó??§·′à?</A>- "+
		  "<A href=\"http://www.blog.163.com/indict.do\" target=_blank>?ù±¨2?á?D??￠</A> -->"+
		  "<BR>?1997-2006 í?ò×1???°?è¨?ùóD "+
		  "</DIV>";*/
		System.out.println(getPlainTextWithTag(content));
		System.out.println(repairHtml(content));
	}

}
