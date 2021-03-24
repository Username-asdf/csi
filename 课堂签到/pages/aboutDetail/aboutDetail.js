// pages/aboutDetail/aboutDetail.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sex:'未设置',
    phone:'未设置',
    tempSex:'',
    tempPhone:'',
    showSex:{
      showInput:false,
      showUpd:true,
    },//是否显示性别对象
    showPhone:{
      showInput:false,
      showUpd:true,
    },//是否显示手机号对象
  },
  //修改手机号
  updPhone:function(e){
    this.setData({
      showPhone:{
        showInput:true,
        showUpd:false,
      }
    })
  },
  //修改性别
  updSex:function(e){
    this.setData({
      showSex:{
        showInput:true,
        showUpd:false,
      }
    }
    )
  },
  //手机号输入
  phoneInput:function(e){
    var value = e.detail.value;
    this.data.tempPhone = value;
  },
  //性别输入
  sexInput:function(e){
    var value = e.detail.value;
    this.data.tempSex = value;
  },
  //取消输入性别
  sexBlur:function(){
    this.setData({
      showSex:{
        showInput:false,
        showUpd:true,
      }
    }
    )
  },
  //取消输入手机号
  phoneBlur:function(){
    this.setData({
      showPhone:{
        showInput:false,
        showUpd:true,
      }
    })
  },
  //确定修改手机号，
  phoneConfirm:function(e){
    var phone = this.data.tempPhone;
    var openid = wx.getStorageSync('openid');
    wx.request({
      url: app.globalData.url+'/updUserPhone',
      data:{
        openid:openid,
        phone:phone,
      },
      success:res=>{
        if(res.data.status==200){
          this.setData({
            phone:phone,
          })
          wx.showToast({
            title: '修改手机号成功',
          })
          this.phoneBlur();
        }else{
          wx.showToast({
            title: res.data.msg,
            icon:"none"
          })
        }
      }
    })
  },
  //确定修改性别
  sexConfirm:function(e){
    var openid = wx.getStorageSync('openid');
    var sex = this.data.tempSex;
    wx.request({
      url: app.globalData.url+'/updUserSex',
      data:{
        openid:openid,
        sex:sex,
      },
      success:res=>{
        if(res.data.status==200){
          this.setData({
            sex:sex,
          })
          wx.showToast({
            title: '修改性别成功',
          })
          this.sexBlur();
        }else{
          wx.showToast({
            title: res.data.msg,
            icon:"none"
          })
        }
      }
    })
  },
  //退出登录
  exit:function(){
    wx.removeStorageSync('openid');
    app.globalData.openid = '';
    wx.reLaunch({
      url: '../about/about',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var openid = wx.getStorageSync('openid')
    //获取用户信息
    wx.request({
      url: app.globalData.url+'/getUserInfo',
      data:{
        openid:openid
      },
      success:res=>{
        if(res.data.status==200){
          this.setData({
            sex:res.data.data.sex,
            phone:res.data.data.phone
          })
        }else{
          wx.showToast({
            title: '加载用户信息失败，请稍后再试！',
            icon:"none"
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})