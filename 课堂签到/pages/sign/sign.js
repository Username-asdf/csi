// pages/sign/sign.js
var timeUtil = require("../../utils/util");
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time:timeUtil.timeData,
    index:0,
    cid:'',
  },
  //选择时间
  pickerChange:function(e){
    this.setData({
      index:e.detail.value,
    })
  },
  //创建签到
  createSign:function(e){
    wx.request({
      url: app.globalData.url+'/createSign',
      data:{
        openid:app.globalData.openid,
        cid:this.data.cid,
        validTime:((this.data.index)*60),
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.cid = options.cid;
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