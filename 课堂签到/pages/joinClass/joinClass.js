// pages/joinClass/joinClass.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tempCode:'',
  },
  //input输入
  inputCode:function(e){
    this.data.tempCode = e.detail.value;
  },
  //加入班级
  joinClass:function(){
    wx.request({
      url: app.globalData.url+'/joinClass',
      data:{
        openid:app.globalData.openid,
        code:this.data.tempCode
      },
      success:res=>{
        console.log(res)
        if(res.data.status==200){
          wx.showToast({
            title: '加入:'+res.data.name+"班级，成功",
            icon:"none"
          })
          setTimeout(function(){
            wx.navigateBack()
          },3000);
          
        }else{
          wx.showToast({
            title: res.data.msg,
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