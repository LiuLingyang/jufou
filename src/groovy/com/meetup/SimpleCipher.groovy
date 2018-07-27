package com.meetup

import org.springframework.core.io.Resource

public interface SimpleCipher {

    public abstract String simpleStringEncrypt(byte[] input);

    public abstract byte[] simpleStringDecrypt(String input);

    public void setKeyFile(Resource keyFile);

}