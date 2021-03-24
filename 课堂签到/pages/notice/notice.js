// pages/notice/notice.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow:false,
    noticeData:{}//数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  //跳转到对应页面进行签到
  toSign:function(e){
    var id = e.currentTarget.dataset.id;
    var signid = e.currentTarget.dataset.signid;
    if(id==0){
      //普通签到
      wx.navigateTo({
        url: '../toSign/sign/sign?signid='+signid,
      })
    }else if(id==1){
      //密码签到
      wx.navigateTo({
        url: '../toSign/psign/psign?signid='+signid,
      })
    }else if(id==2){
      //手势签到
      wx.navigateTo({
        url: '../toSign/gsign/gsign?signid='+signid,
      })
    }else{
      //位置签到
      wx.navigateTo({
        url: '../toSign/lsign/lsign?signid='+signid,
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
    wx.request({
      url: app.globalData.url+'/getSignMsg',
      data:{
        openid:app.globalData.openid,
      },
      success:res=>{
        if(res.data.status){
          var len1 = res.data.data.sign.length;
          var len2 = res.data.data.psign.length;
          var len3 = res.data.data.gsign.length;
          var len4 = res.data.data.lsign.length;
          var total = len1+len2+len3+len4;
          if(total>0){
            this.setData({
              noticeData:res.data.data,
              isShow:false,
            })
          }else{
            this.setData({
              noticeData:res.data.data,
              isShow:true,
            })
          }
          
        }else{
          this.setData({
            noticeData:{},
            isShow:true,
          })
        }
      }
    })
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