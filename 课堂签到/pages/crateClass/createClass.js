// pages/crateClass/createClass.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow:true,//是否展示创建班级
    code:'',
    tempName:'',
  },
  //确定创建班级
  createClass:function(){
    wx.request({
      url: app.globalData.url+'/addClass',
      data:{
        openid:app.globalData.openid,
        name:this.data.tempName
      },
      success:res=>{
        if(res.data.status==200){
          this.setData({
            code:res.data.code,
            isShow:false,
          })
          wx.showToast({
            title: "创建班级成功",
          })
        }else{
          wx.showToast({
            title: res.data.msg?res.data.msg:"失败，请稍后再试",
            icon:'none'
          })
        }
      }
    })
  },
  //输入框输入
  inputName:function(e){
    this.data.tempName = e.detail.value;
  },
  //展示邀请码后退出
  exit:function(){
    wx.reLaunch({
      url: '../about/about',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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