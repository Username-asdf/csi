
var timeUtil = require("../../utils/util");
var app = getApp();
var Lock = require('../../lib/gesture_lock.js');
var temp = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cid:'',
    time:timeUtil.timeData,
    index:0,
    flag:true,
    pwd:'',
  },
  //确定创建
  createPSign:function(){
    if(this.data.pwd){
      wx.request({
        url: app.globalData.url+'/createGSign',
        data:{
          openid:app.globalData.openid,
          cid:this.data.cid,
          validTime:((this.data.index)*60),
          password:this.data.pwd,
        },
        success:res=>{
          if(res.data.status==200){
            wx.showToast({
              title: '创建成功',
            })
  
            //返回首页
            setTimeout(function(){
              wx.reLaunch({
                url: '../index/index',
              })
            },2000);
          }else{
            wx.showToast({
              title: '创建失败，请稍后再试',
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
   //picker change
   pickerChange:function(e){
    this.setData({
      index:e.detail.value
    })
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
    this.data.cid = options.cid;

    var s = this;
    this.lock = new Lock("id-gesture-lock", wx.createCanvasContext("id-gesture-lock"), function(checkPoints, isCancel) {
      s.data.flag = false;
      var tempPwd = '';
      for(var i in checkPoints){
        tempPwd +=checkPoints[i].index;
      }
      s.data.pwd = tempPwd;
    }, {width:300, height:300})
    
    this.lock.drawGestureLock();

  },
  //重新绘制
  reset:function(){
    this.lock.reset();
    this.data.flag = true;
    this.data.pwd = '';
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
    setTimeout(()=>{
      this.lock.drawGestureLock();
    },600);
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