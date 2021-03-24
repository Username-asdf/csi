package com.api.test;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.api.utils.LocationUtils;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;

public class Test1 {

	public static void main(String[] args) throws JsonParseException, JsonMappingException, IOException {
//		String str = "{'a':1,'b':2,'c':3}";
//		Map map = (Map) JSON.parse(str );
//		System.out.println(map.get("a"));
//		SimpleDateFormat format = new SimpleDateFormat("yyyy/MM/dd hh:mm:ss");
//		String str = format.format(new Date());
		
//		System.out.println(str);
//		Date date = new Date();
//		System.out.println(date.getTime());
		
		LocationUtils.reverseLocation(34.86426, 117.55601, "22IBZ-YHLWX-BRL4N-7DEBE-UDMJQ-7MBKW");
	}
}
