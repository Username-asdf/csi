package com.api.pojo;

import java.text.SimpleDateFormat;
import java.util.Date;

public class UserBean {
	
	private String nickName;
	
	private String signTime;
	
	private String sex;
	
	private String phone;
	
	private String result;
	
	private String location;

	public String getNickName() {
		return nickName;
	}

	public void setNickName(String nickName) {
		this.nickName = nickName;
	}

	public String getSignTime() {
		return signTime;
	}

	public void setSignTime(Date signTime) {
		this.signTime = new SimpleDateFormat("yyyy/MM/dd hh:mm:ss").format(signTime);;
	}

	public String getSex() {
		return sex;
	}

	public void setSex(String sex) {
		if(sex.equals("1")){
			this.sex = "男";
		}else if(sex.equals("2")){
			this.sex = "女";
		}else{
			this.sex = "未设置";
		}
		
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		if(phone==null||phone.equals("0")){
			this.phone = "未设置";
		}
		this.phone = phone;
	}

	public String getResult() {
		return result;
	}

	public void setResult(String result) {
		if(result.equals("1")){
			this.result = "已签到";
		}else if(result.equals("2")){
			this.result = "已超时";
		}else{
			this.result = "未签到";
		}
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}
	
	
}
