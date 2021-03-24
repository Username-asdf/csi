// pages/toSign/lsign/lsign.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    latitude:'',
    longitude:'',
    signid:'',
    circles:[{
      latitude:"",
      longitude:"",
      color:'#428BCA88',
      fillColor:'#B6E1F248',
      radius:0,
      strokeWidth:1
    }],
  },
//进行签到
  lsign:function(){
    wx.request({
      url: app.globalData.url+'/lsign',
      data:{
        openid:app.globalData.openid,
        signid:this.data.signid,
        latitude:this.data.latitude,
        longitude:this.data.longitude,
      },
      success:res=>{
        if(res.data.status==200){
          wx.showToast({
             title: '签到成功',
          })

          //返回签到选择
          setTimeout(function(){
            wx.navigateBack()
          },2000);
        }else if(res.data.status==501||res.data.status==502){
          //签到超时
          wx.showToast({
            title: res.data.msg,
            icon:'none'
          })

          setTimeout(function(){
            wx.navigateBack()
          },2000);
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
    this.data.signid = options.signid;

    wx.getLocation({
      type:'gcj02',
      success: (result) => {
        this.setData({
          latitude:result.latitude,
          longitude:result.longitude,
        })
      },
    })
    //获取签到的范围
    wx.request({
      url: app.globalData.url+'/getLsignRange',
      data:{
        signid:this.data.signid,
      },
      success:res=>{
        if(res.data.status==200){
          var c = this.data.circles;
          c[0].latitude = res.data.data.latitude;
          c[0].longitude = res.data.data.longitude;
          c[0].radius = res.data.data.radius;
          this.setData({
            circles:c,
          })
        }else{
          wx.showToast({
            title: '获取签到范围信息失败',
            icon:'none',
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