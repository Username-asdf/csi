// pages/lSign/lSign.js
var timeUtil = require("../../utils/util");
var app = getApp();

var EARTH_RADIUS = 6378.137; //地球半径

function rad(d) {
  return d * Math.PI / 180.0;
}

function getDistance(lng1, lat1, lng2, lat2) {
  var radLat1 = rad(lat1);
  var radLat2 = rad(lat2);
  var a = radLat1 - radLat2;
  var b = rad(lng1) - rad(lng2);
  var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2)
    + Math.cos(radLat1) * Math.cos(radLat2)
    * Math.pow(Math.sin(b / 2), 2)));
  s = s * EARTH_RADIUS;
  s = Math.round(s * 10000) / 10000;
  return s;//返回数值单位：公里
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cid:'',
    time:timeUtil.timeData,
    index:0,
    latitude:'',
    longitude:'',
    range:'不限',//签到范围
    circles:[{
      latitude:"",
      longitude:"",
      color:'#428BCA88',
      fillColor:'#B6E1F248',
      radius:0,
      strokeWidth:1
    }]
  },
  //确定创建
  createPSign:function(){
    wx.request({
      url: app.globalData.url+'/createLSign',
      data:{
        openid:app.globalData.openid,
        cid:this.data.cid,
        validTime:((this.data.index)*60),
        latitude:this.data.latitude,
        longitude:this.data.longitude,
        range:this.data.circles[0].radius,
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
    
  },
  //picker change
  pickerChange:function(e){
    this.setData({
      index:e.detail.value
    })
  },
  //减少
  desc:function(){
    var c = this.data.circles;
    var r = "不限";
    c[0].radius-=100;
    if(c[0].radius<=0){
      c[0].radius = 0;
    }else{
      r = (c[0].radius/1000)+'km';
    }

    this.setData({
      circles:c,
      range:r,
    })
  },
  //增加
  inc:function(){
    var c = this.data.circles;
    c[0].radius+=100;
    this.setData({
      circles:c,
      range:(c[0].radius/1000)+'km'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.cid = options.cid;

    wx.getLocation({
      type:'gcj02',
      
      success: (result) => {
        console.log(result)
        var c = this.data.circles;
        c[0].latitude = result.latitude;
        c[0].longitude = result.longitude;
        this.setData({
          latitude:result.latitude,
          longitude:result.longitude,
          circles:c,
        })
      },
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