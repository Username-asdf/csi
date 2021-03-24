// pages/about/about.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogin:false,//是否进行了的登陆
  },

//用户点击进行登录
  getUserInfo:function(e){
    console.log(e)
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: app.globalData.url+"/login",
          data:{
            code:res.code,
            nickName:e.detail.userInfo.nickName,
            sex:e.detail.userInfo.gender,
          },
          success:data=>{
            if(data.data.status==200){
              wx.setStorageSync('openid', data.data.data.openid);
              app.globalData.openid = data.data.data.openid;
              this.setData({
                isLogin:true,
              })
              wx.showToast({
                title: '登录成功',
              })
            }else{
              //TODO 获取openid失败，进行相应处理
              wx.showToast({
                title: '登录失败，请稍后再试！',
                icon:"none"
              })
            }
          }
        })
      }
    })
  },
  //跳转到详细信息页面
  aboutDetail:function(){
    if(this.data.isLogin){
      wx.navigateTo({
        url: '../aboutDetail/aboutDetail',
      })
    }
  },

  //参加的签到
  joinedSign:function(){
    app.testLogin(function(){
      wx.navigateTo({
        url: '../joinedSign/joinedSign',
      })
    })
  },
   
  //创建签到班级
  createClass:function(){
    app.testLogin(function(){
      wx.navigateTo({
        url: '../crateClass/createClass',
      })
    });
  },
  //已创建的签到班级
  createdClass:function(){
    app.testLogin(function(){
      wx.navigateTo({
        url: '../createdClass/createdClass',
      })
    });
  },
  //已加入的班级
  joinedClass:function(){
    app.testLogin(function(){
      wx.navigateTo({
        url: '../joinedClass/joinedClass',
      })
    });
  },
  //发起的签到
  createedSign:function(){
    app.testLogin(function(){
      wx.navigateTo({
        url: '../createdSign/createdSign',
      })
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //查询本地是否存储openid
    var openid = wx.getStorageSync('openid');
    if(openid){
      app.globalData.openid = openid;
      this.setData({
        isLogin:true
      })
    }
    
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