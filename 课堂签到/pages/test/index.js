//index.js

var Lock = require('../../lib/gesture_lock.js');

//获取应用实例
var app = getApp()
Page({
  data: {
    userInfo: {},
    flag:true,
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    var s = this;
    this.lock = new Lock("id-gesture-lock", wx.createCanvasContext("id-gesture-lock"), function(checkPoints, isCancel) {
      console.log('over');
      //s.lock.gestureError();
      console.log(s.lock.checkPoints)
      s.data.flag = false;
      // setTimeout(function() {
      //   s.lock.reset();
      // }, 1000);
    }, {width:300, height:300})
    this.lock.drawGestureLock();
  },
  onTouchStart: function (e) {
    if(this.data.flag)
    this.lock.onTouchStart(e);
  },
  onTouchMove: function (e) {
    if(this.data.flag)
    this.lock.onTouchMove(e);
  },
  onTouchEnd: function (e) {
    if(this.data.flag)
    this.lock.onTouchEnd(e);
  }
})
