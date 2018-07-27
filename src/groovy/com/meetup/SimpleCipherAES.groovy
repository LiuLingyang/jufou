package com.meetup

import org.apache.commons.codec.binary.Hex
import org.springframework.core.io.Resource

import java.security.InvalidKeyException
import java.security.NoSuchAlgorithmException
import java.security.spec.InvalidKeySpecException
import javax.crypto.spec.SecretKeySpec
import javax.crypto.*

class SimpleCipherAES implements SimpleCipher {

    private SecretKey key = null;

    private Cipher cipher = null;

    public SimpleCipherAES() {
        try {
            cipher = Cipher.getInstance("AES/ECB/PKCS5Padding");
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
            throw new RuntimeException("init simple cipher aes fail.", e);
        } catch (NoSuchPaddingException e) {
            e.printStackTrace();
            throw new RuntimeException("init simple cipher aes fail.", e);
        }
    }

    public void setKeyFile(Resource keyFile) {
        try {
            key = readKey(keyFile.getFile());
        } catch (InvalidKeyException e) {
            e.printStackTrace();
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        } catch (InvalidKeySpecException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }

    }

    public byte[] simpleStringDecrypt(String input) {
        try {
            byte[] bin = Hex.decodeHex(input.toCharArray());
            return simpleDecrypt(key, bin);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public String simpleStringEncrypt(byte[] input) {
        try {
            return new String(Hex.encodeHex(simpleEncrypt(key, input)));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    /** Read a TripleDES secret key from the specified file */
    private SecretKey readKey(File f) throws IOException,
            NoSuchAlgorithmException, InvalidKeyException,
            InvalidKeySpecException {
        // Read the raw bytes from the keyfile
        DataInputStream input = new DataInputStream(new FileInputStream(f));
        byte[] rawkey = new byte[(int) f.length()];
        input.readFully(rawkey);
        input.close();

        // Convert the raw bytes to a secret key like this
        SecretKeySpec key = new SecretKeySpec(rawkey, "AES");
        return key;
    }

    private byte[] simpleEncrypt(SecretKey key, byte[] input)
    throws NoSuchAlgorithmException, NoSuchPaddingException,
            InvalidKeyException, IllegalBlockSizeException, BadPaddingException {
        cipher.init(Cipher.ENCRYPT_MODE, key);
        return cipher.doFinal(input);
    }

    private byte[] simpleDecrypt(SecretKey key, byte[] input)
    throws NoSuchAlgorithmException, NoSuchPaddingException,
            InvalidKeyException, IllegalBlockSizeException, BadPaddingException {
        cipher.init(Cipher.DECRYPT_MODE, key);
        return cipher.doFinal(input);
    }

}
