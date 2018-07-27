package com.meetup

import java.util.concurrent.ConcurrentHashMap

class LocalCache {

	static class Frequency {

		long firstTime

		long lastTime

		int count

	}

	static class Captcha {

		String captcha

		long timestamp

	}

	static Map<String, Object[]> cacheMap = new ConcurrentHashMap<String, Object[]>()

//	static final String KEY_CAPTCHA = "captcha_"

	static {
		new Timer(true).schedule(new TimerTask() {
			public void run() {
				cacheMap.each { k, v ->
					if ((v instanceof Captcha && System.currentTimeMillis() -
							((Captcha) v)?.timestamp > 10 * Const.CACHE_EXPIRE_TIME) ||
							(v instanceof Frequency && System.currentTimeMillis() -
									((Frequency) v)?.lastTime > 30 * Const.CACHE_EXPIRE_TIME)) {
						cacheMap.remove(k)
					}
				}
			}
		}, 0, Const.CACHE_EXPIRE_TIME)
	}

	static boolean setCaptcha(String key, String value) {
		cacheMap.put(key, new Captcha(captcha: value,
				timestamp: System.currentTimeMillis()))
		return true
	}

	static boolean validateCaptchaSentFrequency(String key) {
		Frequency frequency = cacheMap.get(key)
		if (!frequency) {
			frequency = new Frequency(firstTime: System.currentTimeMillis(),
					lastTime: System.currentTimeMillis(), count: 1)
			cacheMap.put(key, frequency)
		} else {
			if (System.currentTimeMillis() - frequency.lastTime <= Const.CACHE_EXPIRE_TIME) {
				return false
			}
			if (frequency.count >= 3 && System.currentTimeMillis() - frequency.firstTime
					<= frequency.count.intdiv(3) * 10 * Const.CACHE_EXPIRE_TIME) {
				return false
			}
			frequency.lastTime = System.currentTimeMillis()
			frequency.count += 1
		}
		return true
	}

	static String getCaptcha(String key) {
		if (!key) {
			return null
		}
		Captcha captcha = cacheMap.get(key)
		return captcha?.captcha
	}

}
