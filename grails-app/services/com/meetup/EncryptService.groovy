package com.meetup

import org.springframework.core.io.Resource

class EncryptService extends AbstractService {

	private SimpleCipher sessionCipher = null

	private SimpleCipher persistCipher = null

//    public void setPersistCipher(String persistCipherFile) {
//        this.persistCipher = new SimpleCipherDES()
//        this.persistCipher.setKeyFile(new ClassPathResource(persistCipherFile))
//    }
//
//    public void setSessionCipher(String sessionCipherFile) {
//        this.sessionCipher = new SimpleCipherAES()
//        this.sessionCipher.setKeyFile(new ClassPathResource(sessionCipherFile))
//    }

	public void setPersistCipher(Resource persistCipherFile) {
		this.persistCipher = new SimpleCipherAES()
		this.persistCipher.setKeyFile(persistCipherFile)
	}

	public void setSessionCipher(Resource sessionCipherFile) {
		this.sessionCipher = new SimpleCipherDES()
		this.sessionCipher.setKeyFile(sessionCipherFile)
	}

	public CredDecryptResult decryptSessionCredential(String credential) {
		return this.decryptCredentialByCipher(credential, this.sessionCipher)
	}

	public CredDecryptResult decryptPersistentCredential(String credential) {
		return this.decryptCredentialByCipher(credential, this.persistCipher)
	}

	private CredDecryptResult decryptCredentialByCipher(String credential, SimpleCipher cipher) {
		try {
			String decryped = new String(
					cipher.simpleStringDecrypt(credential), "ISO-8859-1")
			if (decryped == null) {
				return null
			}
			String[] ss = decryped.split("\\|")
			if (ss.length != 4) {
				return null
			}
			return new CredDecryptResult(username: ss[0], userId: Long.parseLong(ss[1]),
					createTime: Long.parseLong(ss[2]))
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace()
		}
		return null
	}

	public UserCredential encryptSessionCredential(String username, long userId,
												   int flag) {
		return this.encryptCredentialByCipher(username, userId, Const.COOKIE_SESSION,
				flag, this.sessionCipher)
	}

	public UserCredential encryptPersistentCredential(String username, long userId) {
		return this.encryptCredentialByCipher(username, userId, Const.COOKIE_PERSIST,
				Const.FLAG_EXCHANGE, this.persistCipher)
	}

	private UserCredential encryptCredentialByCipher(String username, long userId,
													 String key, int flag,
													 SimpleCipher cipher) {
		long time = System.currentTimeMillis()
		String cred = username + "|" + userId + "|" + time + "|" + flag
		String encrypted = cipher.simpleStringEncrypt(cred.getBytes())
		UserCredential uc = new UserCredential(key, encrypted)
		return uc
	}

	public String encryptWithDES(String msg) {
		return !msg ? null : this.sessionCipher.simpleStringEncrypt(msg.getBytes())
	}

	public String encryptWithAES(String msg) {
		return !msg ? null : this.persistCipher.simpleStringEncrypt(msg.getBytes())
	}

	public String decryptWithDES(String msg) {
		try {
			return !msg ? null : new String(this.sessionCipher.simpleStringDecrypt(msg), "ISO-8859-1")
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace()
		}
		return null
	}

	public String decreyptWithAES(String msg) {
		try {
			return !msg ? null : new String(this.persistCipher.simpleStringDecrypt(msg), "ISO-8859-1")
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace()
		}
		return null
	}

}
