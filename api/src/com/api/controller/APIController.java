package com.api.controller;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.jdbc.datasource.SimpleDriverDataSource;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.api.pojo.Classes;
import com.api.pojo.Createlsign;
import com.api.pojo.Users;
import com.api.service.APIService;
import com.api.utils.HttpUtils;


@Controller
public class APIController {
	@Value("${appId}")
	private String appId;
	@Value("${appSecret}")
	private String appSecret;
	@Resource
	private APIService aPIService;
	
	/**
	 * 小程序进行登录
	 * 返回openID
	 * @return
	 */
	@RequestMapping("login")
	@ResponseBody
	public Map login(String code,String nickName,String sex){
		Map data = new HashMap();
		String url = "https://api.weixin.qq.com/sns/jscode2session?appid="+
				appId+"&secret="+appSecret+"&js_code="+code+"&grant_type=authorization_code";
		String str = HttpUtils.doHttpPost(url, null, null, null, 5);
		
		System.out.println(url);
		System.out.println(str);
		Map<String,String> map = (Map<String, String>) JSON.parse(str);
		
		if(map.get("openid")==null){//获取openid失败
			data.put("status", "500");
			data.put("data", map);
		}else{//获取openid成功
			//数据库插入用户数据
			aPIService.addNewUser(map.get("openid"),nickName,sex);
			data.put("status", "200");
			data.put("data", map);
		}
		return data;
	}
	
	/**
	 * 用户获取个人信息
	 * @return 用户个人信息
	 */
	@RequestMapping("getUserInfo")
	@ResponseBody
	public Map getUserInfo(@RequestParam String openid){
		Map map = new HashMap();
		Users user = aPIService.getUserInfo(openid);
		if(user==null){
			map.put("status",500);
		}else{
			map.put("status", 200);
			Map data = new HashMap<>();
			if(user.getSex()!=null&&user.getSex().equals("1")){
				data.put("sex", "男");
			}else if(user.getSex()!=null&&user.getSex().equals("2")){
				data.put("sex", "女");
			}else{
				data.put("sex", "未设置");
			}
			if(user.getPhone()!=null&&!user.getPhone().equals("")){
				data.put("phone", user.getPhone());
			}else{
				data.put("phone", "未设置");
			}
			map.put("data", data);
		}
		return map;
	}
	
	/**
	 * 用户修改性别
	 * @param openid
	 * @param sex
	 * @return
	 */
	@RequestMapping("updUserSex")
	@ResponseBody
	public Map updUserSex(String openid,String sex){
		Map map = new HashMap<>();
		String dbSex = "0";
		if(sex==null){
			map.put("status", 500);
			map.put("msg", "请输入正确的性别");
			return map;
		}else{
			if(sex.equals("男")){
				dbSex = "1";
			}else if(sex.equals("女")){
				dbSex = "2";
			}else{
				map.put("status", 500);
				map.put("msg", "请输入正确的性别");
				return map;
			}
		}
		boolean b = aPIService.updUserSex(openid, dbSex);
		if(b){
			map.put("status", 200);
		}else{
			map.put("status", 500);
			map.put("msg", "修改失败，请稍后再试");
		}
		return map;
	}
	
	/**
	 * 用户修改手机号
	 * @param openid
	 * @param phone
	 * @return
	 */
	@RequestMapping("updUserPhone")
	@ResponseBody
	public Map updUserPhone(String openid,String phone){
		Map map = new HashMap<>();
		if(phone==null){
			map.put("status", "500");
			map.put("msg","请输入正确的手机号");
			return map;
		}else if(phone.matches("^1[3456789]\\d{9}$")){
			boolean b = aPIService.updUserPhone(openid, phone);
			if(b){
				map.put("status", 200);
			}else{
				map.put("status", 500);
				map.put("msg", "修改手机号失败，请稍后再试");
			}
		}else{
			map.put("status", "500");
			map.put("msg","请输入正确的手机号");
			return map;
		}
		return map;
	}

	@RequestMapping("addClass")
	@ResponseBody
	public Map addClass(String openid,String name){
		Map map = new HashMap<>();
		if(name==null||name.equals("")){
			map.put("status", 500);
			map.put("msg", "请输入班级名称");
			return map;
		}
		
		Users user = aPIService.getUserInfo(openid);
		if(user==null){
			map.put("status", 500);
			map.put("msg", "请先登录");
			return map;
		}
		
		Classes cla = aPIService.insClass(user.getId(), name);
		if(cla==null&&cla.getCode()!=null){
			map.put("status", 500);
			map.put("msg", "创建班级失败，请稍后再试");
		}else{
			map.put("status", "200");
			map.put("code", cla.getCode());
		}
		return map;
	}
	
	/**
	 * 用户查看创建的班级及班级成员
	 * @param openid
	 * @return
	 */
	@RequestMapping("getUserClass")
	@ResponseBody
	public Map getUserClass(String openid){
		Map map = new HashMap<>();
		if(openid==null){
			map.put("status", 500);
			map.put("msg", "openid为空");
			return map;
		}
		List list = aPIService.getClassUserInfo(openid);
		if(list!=null&&list.size()>0){
			map.put("status", 200);
			map.put("data", list);
		}else{
			map.put("status", 500);
			map.put("msg", "没有查到用户创建的班级信息");
		}
		return map;
	}
	
	/**
	 * 用户删除班级
	 * @param openid
	 * @param cid
	 * @return
	 */
	@RequestMapping("delClass")
	@ResponseBody
	public Map delClass(String openid,int cid){
		Map map = new HashMap<>();
		boolean b = aPIService.delClass(openid, cid);
		if(b){
			map.put("status", 200);
		}else{
			map.put("status", 500);
		}
		return map;
	}
	
	/**
	 * 用户输入邀请码 加入班级
	 * @param openid
	 * @param code
	 * @return
	 */
	@RequestMapping("joinClass")
	@ResponseBody
	public Map joinClass(String openid,String code){
		Map map = new HashMap<>();
		Map data = aPIService.insClassUser(openid, code);
		if(data==null){
			map.put("status", "500");
			map.put("msg", "加入班级失败，请稍后再试");
			return map;
		}
		
		if(data.get("fail")!=null){
			map.put("status", "500");
			map.put("msg", data.get("fail"));
		}else{
			map.put("status", "200");
			map.put("name", data.get("name"));
		}
		return map;
	}
	
	/**
	 * 用户获取已加入班级的信息
	 * @param openid
	 * @return
	 */
	@RequestMapping("getUserJoinClass")
	@ResponseBody
	public Map getUserJoinClass(String openid){
		Map map = new HashMap<>();
		List list = aPIService.selUserJoinClass(openid);
		if(list!=null&&list.size()>0){
			map.put("status", 200);
			map.put("data", list);
		}else{
			map.put("status", 500);
		}
		return map;
	}
	
	/**
	 * 用户修改班级昵称
	 * @param openid
	 * @param cid
	 * @param nickName
	 * @return
	 */
	@RequestMapping("updUserClassNickName")
	@ResponseBody
	public Map updUserClassNickName(String openid,int cid,String nickName){
		Map map = new HashMap<>();
		if(nickName==null||nickName.equals("")){
			map.put("status", 500);
			map.put("msg", "请输入班级昵称");
			return map;
		}
		boolean b = aPIService.updUserClassNickName(openid, cid, nickName);
		if(b){
			map.put("status", 200);
		}else{
			map.put("status", 500);
			map.put("msg", "修改失败，请稍后再试");
		}
		
		return map;
	}
	
	/**
	 * 用户退出已加入的班级
	 * @param openid
	 * @param cid
	 * @param nickName
	 * @return
	 */
	@RequestMapping("exitClass")
	@ResponseBody
	public Map exitClass(String openid,int cid){
		Map map = new HashMap<>();
		boolean b = aPIService.stuDelClassUserByOpenidAndCid(openid, cid);
		if(b){
			map.put("status", 200);
		}else{
			map.put("status", 500);
		}
		return map;
	}
	
	/**
	 * 班级创建者删除班级成员
	 * @param openid
	 * @param cid
	 * @param uid
	 * @return
	 */
	@RequestMapping("teaDelClassUser")
	@ResponseBody
	public Map teaDelClassUser(String openid,int cid,int uid){
		Map map = new HashMap<>();
		boolean b = aPIService.teaDelClassUser(openid, cid, uid);
		if(b){
			map.put("status", 200);
		}else{
			map.put("status", 500);
		}
		return map;
	}
	
	/**
	 * 获取用户创建的班级信息
	 * @param openid
	 * @return
	 */
	@RequestMapping("selUserCreateClass")
	@ResponseBody
	public Map selUserCreateClass(String openid){
		Map map = new HashMap<>();
		List<Classes> list = aPIService.selUserCreateClasses(openid);
		if(list!=null&&list.size()>0){
			map.put("status", 200);
			map.put("data", list);
		}else{
			map.put("status", 500);
		}
		return map;
	}
	
	/**
	 * 用户发起普通签到
	 * @param openid
	 * @param cid
	 * @return
	 */
	@RequestMapping("createSign")
	@ResponseBody
	public Map createSign(String openid,int cid,int validTime){
		Map map = new HashMap<>();
		boolean b = aPIService.createSign(openid, cid, validTime);
		if(b){
			map.put("status", 200);
		}else{
			map.put("status", 500);
		}
		return map;
	}
	
	/**
	 * 用户发起密码签到
	 * @param openid
	 * @param cid
	 * @param password
	 * @param validTime
	 * @return
	 */
	@RequestMapping("createPSign")
	@ResponseBody
	public Map createPSign(String openid,int cid,String password,int validTime){
		Map map = new HashMap<>();
		boolean b = aPIService.createPSign(cid, openid, password, validTime);
		if(b){
			map.put("status", 200);
		}else{
			map.put("status", 500);
		}
		return map;
	}
	
	/**
	 * 用户发起手势签到
	 * @param openid
	 * @param cid
	 * @param password
	 * @param validTime
	 * @return
	 */
	@RequestMapping("createGSign")
	@ResponseBody
	public Map createGSign(String openid,int cid,String password,int validTime){
		Map map = new HashMap<>();
		boolean b = aPIService.createGSign(openid, cid, validTime, password);
		if(b){
			map.put("status", 200);
		}else{
			map.put("status", 500);
		}
		return map;
	}
	
	/**
	 * 用户发起位置签到
	 * @param openid
	 * @param cid
	 * @return
	 */
	@RequestMapping("createLSign")
	@ResponseBody
	public Map createLSign(String openid,int cid,int validTime,
			double latitude,double longitude,int range){
		Map map = new HashMap<>();
		boolean b = aPIService.createLSign(cid, openid, validTime, latitude, longitude, range);
		if(b){
			map.put("status", 200);
		}else{
			map.put("status", 500);
		}
		return map;
	}
	
	/**
	 * 获取一个班级的成员信息，用于随机点名
	 * @param openid
	 * @param cid
	 * @return
	 */
	@RequestMapping("getOneClassUserInfo")
	@ResponseBody
	public Map getOneClassUserInfo(String openid,int cid){
		Map map = new HashMap<>();
		List<Users> list = aPIService.getOneClassUserInfo(openid, cid);
		if(list!=null){
			map.put("status", 200);
			map.put("data", list);
		}else{
			map.put("status", 500);
		}
		return map;
	}
	
	@RequestMapping("getSignMsg")
	@ResponseBody
	public Map getSignMsg(String openid){
		Map map = new HashMap<>();
		Map data = aPIService.getSignMsg(openid);
		if(data==null){
			map.put("status", 500);
		}else{
			map.put("status", 200);
			map.put("data", data);
		}
		return map;
	}
	
	/**
	 * 用户进行普通签到
	 * @param openid
	 * @param cid
	 * @return
	 */
	@RequestMapping("sign")
	@ResponseBody
	public Map sign(String openid,int signid){
		Map map = new HashMap<>();
		Map data = aPIService.sign(openid, signid);
		if(data!=null){
			if(data.get("overtime")==null){
				map.put("status", 200);
				map.put("signTime", data.get("date"));
			}else{
				map.put("status", 500);
				map.put("msg", "签到已超时");
			}
		}else{
			map.put("status", 500);
			map.put("msg", "签到失败，请稍后再试");
		}
		return map;
	}
	
	/**
	 * 用户进行普通签到
	 * @param openid
	 * @param cid
	 * @return
	 */
	@RequestMapping("lsign")
	@ResponseBody
	public Map lsign(String openid,int signid,double latitude,double longitude){
		Map map = new HashMap<>();
		Map data = aPIService.lsign(openid, signid, latitude, longitude);
		if(data!=null){
			if(data.get("overtime")!=null){
				map.put("status", 501);
				map.put("msg", "签到已超时");
			}else if(data.get("overRange")!=null){
				map.put("status", 502);
				map.put("msg", "超出签到范围");
			}else{
				map.put("status", 200);
				map.put("signTime", data.get("date"));
			}
		}else{
			map.put("status", 500);
			map.put("msg", "签到失败，请稍后再试");
		}
		return map;
	}
	
	/**
	 * 用户进行普通签到
	 * @param openid
	 * @param cid
	 * @return
	 */
	@RequestMapping("psign")
	@ResponseBody
	public Map psign(String openid,int signid,String password){
		Map map = new HashMap<>();
		Map data = aPIService.psign(signid, openid, password);
		if(data!=null){
			if(data.get("overtime")!=null){
				map.put("status", 501);
				map.put("msg", "签到已超时");
			}else if(data.get("wrongPwd")!=null){
				map.put("status", 502);
				map.put("msg", "密码不正确");
			}else{
				map.put("status", 200);
				map.put("signTime", data.get("date"));
			}
		}else{
			map.put("status", 500);
			map.put("msg", "签到失败，请稍后再试");
		}
		return map;
	}
	
	/**
	 * 用户进行普通签到
	 * @param openid
	 * @param cid
	 * @return
	 */
	@RequestMapping("gsign")
	@ResponseBody
	public Map gsign(String openid,int signid,String password){
		Map map = new HashMap<>();
		Map data = aPIService.gsign(signid, openid, password);
		if(data!=null){
			if(data.get("overtime")!=null){
				map.put("status", 501);
				map.put("msg", "签到已超时");
			}else if(data.get("wrongPwd")!=null){
				map.put("status", 502);
				map.put("msg", "密码不正确");
			}else{
				map.put("status", 200);
				map.put("signTime", data.get("date"));
			}
		}else{
			map.put("status", 500);
			map.put("msg", "签到失败，请稍后再试");
		}
		return map;
	}
	
	@RequestMapping("getLsignRange")
	@ResponseBody
	public Map getLsignRange(int signid){
		Map map = new HashMap<>();
		Createlsign cls = aPIService.getLsignRange(signid);
		if(cls!=null){
			map.put("status", 200);
			map.put("data", cls);
		}else{
			map.put("status", 500);
		}
		return map;
	}
	
	/**
	 * 班级创建者查看签到的结果
	 * @param openid
	 * @return
	 */
	@RequestMapping("getSignResult")
	@ResponseBody
	public Map getSignResult(String openid){
		Map map = new HashMap<>();
		Map data = aPIService.getSignResult(openid);
		if(data!=null){
			map.put("status", 200);
			map.put("data", data);
		}else{
			map.put("status", 500);
		}
				
		return map;
	}
	
	/**
	 * 获取用户参加的签到
	 * @param openid
	 * @param cid
	 * @return
	 */
	@RequestMapping("getJoinedSign")
	@ResponseBody
	public Map getJoinedSign(String openid){
		Map map = new HashMap<>();
		Map data = aPIService.getJoinedSign(openid);
		if(data!=null){
			map.put("status", 200);
			map.put("data", data);
		}else{
			map.put("status", 500);
		}
		return map;
	}
	
	@RequestMapping("demo")
	@ResponseBody
	public Map demo(String openid,int cid){
		Map map = new HashMap<>();
		
		return map;
	}
}
