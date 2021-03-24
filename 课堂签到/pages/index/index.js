// pages/index/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showNum:false,
    numVal:0,
    url:app.globalData.url,
  },
  //加入班级
  joinClass:function(){
    app.testLogin(function(){
      wx.navigateTo({
        url: '../joinClass/joinClass',
      })
    })
    
  },
  //发起签到，随机点名-选择班级
  seelctClass:function(e){
    var id = e.currentTarget.dataset.id;
    app.testLogin(function(){
      wx.navigateTo({
        url: '../selectClass/selectClass?id='+id,
      })
    });
  },
  //消息提醒，进行签到

  notice:function(){
    app.testLogin(function(){
      wx.navigateTo({
        url: '../notice/notice',
      })
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
    if(app.globalData.openid){

    wx.request({
      url: app.globalData.url+'/getSignMsg',
      data:{
        openid:app.globalData.openid,
      },
      success:res=>{
        if(res.data.status==200){
          var len1 = res.data.data.sign.length;
          var len2 = res.data.data.psign.length;
          var len3 = res.data.data.gsign.length;
          var len4 = res.data.data.lsign.length;
          var total = len1+len2+len3+len4;
          if(total>0&&total<=99){
            this.setData({
              showNum:true,
              numVal:total
            })
          }else if(total>99){
            this.setData({
              showNum:true,
              numVal:'99+',
            })
          }else{
            this.setData({
              showNum:false,
              numVal:0
            })
          }
        }else{
          wx.showToast({
            title: '获取数据失败，请稍后再试',
            icon:'none'
          })

          this.setData({
            showNum:false,
            numVal:0
          })
        }
      }
    })
  }

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
    this.onShow();
    setTimeout(function(){
      wx.stopPullDownRefresh();
    },1000);
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