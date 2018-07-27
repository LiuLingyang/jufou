package com.meetup
/**
 * Created with IntelliJ IDEA.
 * User: zjulyy
 * Date: 13-4-7
 * Time: 下午9:08
 * To change this template use File | Settings | File Templates.
 */
class MapUtil {

//	def sql = """latitude, longitude, SQRT(POWER(69.1 * (latitude -  10), 2)
//						+ POWER(69.1 * (10- longitude) * COS(latitude / 57.3), 2))
//						as distance"""

	private static double rad(double d) {
		return d * Math.PI / 180.0;
	}

	public static double getDistance(double lat1, double lng1,
									 double lat2, double lng2) {
		if (lat1 == lat2 && lng1 == lng2) {
			return 0.0
		}
		double radLat1 = rad(lat1);
		double radLat2 = rad(lat2);
		double a = radLat1 - radLat2;
		double b = rad(lng1) - rad(lng2);
		double s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
				Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
		s = s * Const.EARTH_RADIUS;
		s = Math.round(s * 10000) / 10000;
		return s;
	}

	/**
	 * @param raidus 单位米
	 * return minLat,minLng,maxLat,maxLng
	 */
	public static double[] getAround(double lat, double lng, long raidus) {

		double degree = (24901 * 1609) / 360.0

		double dpmLat = 1 / degree
		double radiusLat = dpmLat * raidus
		double minLat = lat - radiusLat
		double maxLat = lat + radiusLat

		double mpdLng = degree * Math.cos(lat * (Math.PI / 180))
		double dpmLng = 1 / mpdLng
		double radiusLng = dpmLng * raidus
		double minLng = lng - radiusLng
		double maxLng = lng + radiusLng
		return [minLat, minLng, maxLat, maxLng]

	}

}
