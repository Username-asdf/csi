package com.api.pojo;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

public class SignBean {
	
	private String createTime;
	
	private String validTime;

	private String name;
	
	private List<UserBean> users;
	
	private UserBean user;
	
	private boolean hidden = true;
	
	
	public UserBean getUser() {
		return user;
	}

	public void setUser(UserBean user) {
		this.user = user;
	}

	public boolean isHidden() {
		return hidden;
	}

	public void setHidden(boolean hidden) {
		this.hidden = hidden;
	}
	
	public String getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = new SimpleDateFormat("yyyy/MM/dd hh:mm").format(createTime);
	}

	public String getValidTime() {
		return validTime;
	}

	public void setValidTime(int validTime) {
		if(validTime==0){
			this.validTime = "不限";
		}else{
			this.validTime = (validTime/60)+"分钟";
		}
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public List<UserBean> getUsers() {
		return users;
	}

	public void setUsers(List<UserBean> users) {
		this.users = users;
	}

}
