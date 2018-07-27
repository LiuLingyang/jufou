package com.meetup

import org.apache.commons.codec.binary.Hex
import org.springframework.core.io.Resource

import java.security.InvalidKeyException
import java.security.NoSuchAlgorithmException
import java.security.spec.InvalidKeySpecException
import javax.crypto.SecretKey

class SimpleCipherDES implements SimpleCipher {

    private SecretKey key = null;

    private Resource keyFile = null;

    public void setKeyFile(Resource keyFile) {
        this.keyFile = keyFile;
        try {
            key = TripleDES.readKey(keyFile.getFile());
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

    public String simpleStringEncrypt(byte[] input) {
        try {
            return new String(Hex.encodeHex(TripleDES.simpleEncrypt(key, input)));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public byte[] simpleStringDecrypt(String input) {
        try {
            byte[] bin = Hex.decodeHex(input.toCharArray());
            return TripleDES.simpleDecrypt(key, bin);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

}
