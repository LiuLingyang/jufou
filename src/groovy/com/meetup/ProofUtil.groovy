package com.meetup

import java.util.zip.CRC32
import org.apache.commons.lang.StringUtils
import org.apache.commons.codec.digest.DigestUtils

class ProofUtil {

	private static final int TOKEN_LEN = 6;
	private static String proofLetter = "23456789ABCDEFGHJKMNPQRSTUVWXYZ";
	private static String proofLetterLower = "23456789abcdefghjkmnpqrstuvwxyz";
	private static String proofDigit = "1234567898765432345678987654321"

	private static int len = proofLetter.length();

	public static String genProofCode(int len, boolean digit = false) {
		return genProofCode(len, true, digit);
	}

	public static String genProofCode(int len, boolean useLowercase,
									  boolean digit) {
		StringBuilder sb = new StringBuilder();
		for (int l = len; l > 0; l -= 4) {
			sb.append(genCodeSeg(digit ? proofDigit : (useLowercase ?
				proofLetterLower : proofLetter)));
		}
		return sb.substring(0, len);
	}

	public static String genProofCode() {
		return new String(genCodeSeg(proofLetterLower));
	}

	/**
	 * @return 4个Byte的字符
	 */
	private static char[] genCodeSeg(String proofLetter) {
		UUID uuid = UUID.randomUUID();
		byte[] bb = DigestUtils.md5(uuid.toString());
		char[] cc = new char[4];
		int acc = 0;
		int idx = 0;
		for (int i = 0; i < bb.length; i++) {
			acc += Math.abs((int) bb[i]);
			if (i % 4 == 3) {
				int m = acc % len;
				cc[idx] = proofLetter.charAt(m);
				idx++;
				acc = 0;
			}
		}
		return cc;
	}

	public static String genToken() {
		String sval = genRandomString();
		int len = sval.length();
		if (len > TOKEN_LEN)
			return sval.substring(len - TOKEN_LEN, TOKEN_LEN);
		else
			return sval;
	}

	public static String genToken(int length) {
		String sval = genRandomString();
		int len = sval.length();
		if (len > length)
			return sval.substring(len - length);
		else
			return StringUtils.leftPad(sval, length - len, '0');
	}

	private static String genRandomString() {
		UUID uuid = UUID.randomUUID();
		CRC32 crc = new CRC32();
		crc.update(uuid.toString().getBytes());
		Long val = crc.getValue();
		return val.toString();
	}

}
