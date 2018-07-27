package com.meetup

class UserCredential {

    private String key;

    private String value;

    private long createTime = System.currentTimeMillis();

    public UserCredential(String key, String value) {
        this.key = key
        this.value = value
    }

}
