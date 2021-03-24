//app.js
App({
  
  onLaunch: function () {
    

   this.globalData.openid = wx.getStorageSync('openid');
  },
  testLogin:function(sucess){
    if(this.globalData.openid){
      sucess(this.globalData.openid);
    }else{
      wx.showToast({
        title: '请先登录',
        icon:'none'
      })
    }
  },
  globalData: {
    url:"http://127.0.0.1:8080/api",
    userInfo: null,
    openid:'',
    key:'',#位置服务key
  }
})