package com.api.utils;

import java.util.Map;

import com.alibaba.fastjson.JSONObject;

public class LocationUtils {
    /**
     * 赤道半径
     */
    private static double EARTH_RADIUS = 6378.137;

    private static double rad(double d) {
        return d * Math.PI / 180.0;
    }

    /**
     * Description : 通过经纬度获取距离(单位：米)
     * Group :
     *
     * @param origin      出发点
     * @param destination 目的地
     * @return double
     * @author honghh
     * @date 2019/2/13 0013 15:50
     */
    public static double getDistance(String origin, String destination) {
        if (origin == null) {
            //log.error("出发点 经纬度不可以为空！");
            return 0;
        }
        if (destination == null) {
            //log.error("目的地 经纬度不可以为空！");
            return 0;
        }
        String[] temp = origin.split(",");
        String[] temp2 = destination.split(",");

        double radLat1 = rad(Double.parseDouble(temp[1]));
        double radLat2 = rad(Double.parseDouble(temp2[1]));
        double a = radLat1 - radLat2;
        double b = rad(Double.parseDouble(temp[0])) - rad(Double.parseDouble(temp2[0]));
        double s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2)
                + Math.cos(radLat1) * Math.cos(radLat2)
                * Math.pow(Math.sin(b / 2), 2)));
        s = s * EARTH_RADIUS;
        // 保留两位小数
        s = Math.round(s * 100d) / 100d;
        s = s * 1000;
        return s;
    }

    /**
     * Description : 通过经纬度获取距离(单位：米)
     * Group :
     *
     * @param originLon      出发点经度
     * @param originLat      出发点纬度
     * @param destinationLon 目的地经度
     * @param destinationLat 目的地纬度
     * @return double
     * @author honghh
     * @date 2019/2/15 0015 9:14
     */
    public static double getDistance(String originLon, String originLat, String destinationLon, String destinationLat) {
//        if (StringUtil.isEmpty(originLon)) {
//            log.error("出发点 经度不可以为空！");
//            return 0;
//        }
//        if (StringUtil.isEmpty(originLat)) {
//            log.error("出发点 纬度不可以为空！");
//            return 0;
//        }
//        if (StringUtil.isEmpty(destinationLon)) {
//            log.error("目的地 经度不可以为空！");
//            return 0;
//        }
//        if (StringUtil.isEmpty(destinationLat)) {
//            log.error("目的地 纬度不可以为空！");
//            return 0;
//        }

        double radLat1 = rad(Double.parseDouble(originLat));
        double radLat2 = rad(Double.parseDouble(destinationLat));
        double a = radLat1 - radLat2;
        double b = rad(Double.parseDouble(originLon)) - rad(Double.parseDouble(destinationLon));
        double s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2)
                + Math.cos(radLat1) * Math.cos(radLat2)
                * Math.pow(Math.sin(b / 2), 2)));
        s = s * EARTH_RADIUS;
        // 保留两位小数
        s = Math.round(s * 100d) / 100d;
        s = s * 1000;
        return s;
    }
    
    public static double getDisrtance(double lat1,double long1,double lat2,double long2){
    	double radLat1 = rad(lat1);
		double radLat2 = rad(lat2);
    	double a = radLat1 - radLat2;
    	double b = rad(long1) - rad(long2);
    	
		double s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2)
                + Math.cos(radLat1) * Math.cos(radLat2)
                * Math.pow(Math.sin(b / 2), 2)));
        s = s * EARTH_RADIUS;
        // 保留两位小数
        s = Math.round(s * 100d) / 100d;
        s = s * 1000;
        return s;
    }
    
    public static String reverseLocation(double latitude,double longitude,String key){
    	if(latitude==0|longitude==0){
    		return "";
    	}
    	String postUrl = "https://apis.map.qq.com/ws/geocoder/v1/"
    			+"?output=json&key="+key
    			+"&location="+latitude+","+longitude;
		String locationJson = HttpUtils.doHttpPost(postUrl , null, "application/json", null, null);
		Map map = (Map) JSONObject.parse(locationJson);
    	return (String) ((Map)map.get("result")).get("address");
    }
}

