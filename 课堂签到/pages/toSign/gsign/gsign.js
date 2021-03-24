// pages/toSign/gsign/gsign.js
var app = getApp();
var Lock = require('../../../lib/gesture_lock.js');
var temp = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag:true,
    pwd:'',
    signid:'',
  },


  onTouchStart: function (e) {
    if(this.data.flag)
    this.lock.onTouchStart(e);
  },
  onTouchMove: function (e) {
    if(this.data.flag){
      if(e.timeStamp-temp>50){
        this.lock.onTouchMove(e);
        temp = e.timeStamp;
      }
    }
  },
  onTouchEnd: function (e) {
    if(this.data.flag)
    this.lock.onTouchEnd(e);
  },

  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.signid = options.signid;
    var s = this;
    this.lock = new Lock("id-gesture-lock", wx.createCanvasContext("id-gesture-lock"), function(checkPoints, isCancel) {
      var points = s.lock.getCheckPoint();
      s.data.flag = false;
      for(var i in points){
        s.data.pwd+=points[i].index;
      }
    }, {width:300, height:300})
    this.lock.drawGestureLock();
  },

  //重新绘制
  reset:function(){
    this.lock.reset();
    this.data.flag = true;
    this.data.pwd = '';
  },
  //进行签到
  gsign:function(){
    if(this.data.pwd){
      wx.request({
        url: app.globalData.url+'/gsign',
        data:{
          openid:app.globalData.openid,
          signid:this.data.signid,
          password:this.data.pwd,
        },
        success:res=>{
          if(res.data.status==200){
            wx.showToast({
              title: '签到成功',
            })
  
            //返回选择签到
            setTimeout(function(){
              wx.navigateBack({
                delta: 0,
              })
            },2000);
          }else if(res.data.status==502){
            wx.showToast({
              title: res.data.msg,
              icon:'none'
            })

            this.lock.gestureError();
            setTimeout((a)=>{
              this.reset();
            },1000)
          }else if(res.data.status==501){
            wx.showToast({
              title: res.data.msg,
              icon:'none'
            })

            setTimeout(function(){
              wx.navigateBack({
                delta: 0,
              })
            },2000);
          }else{
            wx.showToast({
              title: res.data.msg,
              icon:'none'
            })
          }
        }
      })

    }else{
      wx.showToast({
        title: "请填绘制密码",
        icon: 'none'
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