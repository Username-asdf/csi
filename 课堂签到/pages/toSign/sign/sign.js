// pages/toSign/sign/sign.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showSuccess:true,
    signTime:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var signid = options.signid;
    wx.request({
      url: app.globalData.url+'/sign',
      data:{
        openid:app.globalData.openid,
        signid:signid,
      },
      success:res=>{
        if(res.data.status==200){
          this.setData({
            showSuccess:true,
            signTime:res.data.signTime,
          })
        }else{
          this.setData({
            showSuccess:false,
          })

          wx.showToast({
            title: res.data.msg,
            icon:'none'
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