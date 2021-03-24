// pages/createdSign/createdSign.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    signHidden:true,
    psignHidden:true,
    gsignHidden:true,
    lsignHidden:true,
    signData:[],
    psignData:[],
    lsignData:[],
    gsignData:[],
    isShow:false,
  },

  //显示隐藏签到信息
  showSign:function(e){
    var id = e.currentTarget.dataset.id;
    if(id==0){
      this.setData({
        signHidden:!this.data.signHidden,
      })
    }else if(id==1){
      this.setData({
        psignHidden:!this.data.psignHidden,
      })
    }else if(id==2){
      this.setData({
        gsignHidden:!this.data.gsignHidden,
      })
    }else{
      this.setData({
        lsignHidden:!this.data.lsignHidden,
      })
    }
  },
  //普通签到--显示结果
  showSignUser:function(e){
    var id = e.currentTarget.dataset.id;
    var sign = this.data.signData;
    sign[id].hidden = false;
    this.setData({
      signData:sign,
    })
  },
  hiddenSignUser:function(e){
    var id = e.currentTarget.dataset.id;
    var sign = this.data.signData;
    sign[id].hidden = true;
    this.setData({
      signData:sign,
    })
  },
  //密码签到--显示结果
  showPSignUser:function(e){
    var id = e.currentTarget.dataset.id;
    var sign = this.data.psignData;
    sign[id].hidden = false;
    this.setData({
      psignData:sign,
    })
  },
  hiddenPSignUser:function(e){
    var id = e.currentTarget.dataset.id;
    var sign = this.data.psignData;
    sign[id].hidden = true;
    this.setData({
      psignData:sign,
    })
  },
  //手势签到--显示结果
  showGSignUser:function(e){
    var id = e.currentTarget.dataset.id;
    var sign = this.data.gsignData;
    sign[id].hidden = false;
    this.setData({
      gsignData:sign,
    })
  },
  hiddenGSignUser:function(e){
    var id = e.currentTarget.dataset.id;
    var sign = this.data.gsignData;
    sign[id].hidden = true;
    this.setData({
      gsignData:sign,
    })
  },
  //位置签到--显示结果
  showLSignUser:function(e){
    var id = e.currentTarget.dataset.id;
    var sign = this.data.lsignData;
    sign[id].hidden = false;
    this.setData({
      lsignData:sign,
    })
  },
  hiddenLSignUser:function(e){
    var id = e.currentTarget.dataset.id;
    var sign = this.data.lsignData;
    sign[id].hidden = true;
    this.setData({
      lsignData:sign,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: app.globalData.url+'/getSignResult',
      data:{
        openid:app.globalData.openid,
      },
      success:res=>{
        console.log(res)
        if(res.data.status==200){
          if(res.data.data.total==0){
            this.setData({
              signData:[],
              psignData:[],
              gsignData:[],
              lsignData:[],
              isShow:true,
            })
          }else{
            var signData = res.data.data.sign;
            var psignData = res.data.data.psign;
            var gsignData = res.data.data.gsign;
            var lsignData = res.data.data.lsign;
                
            this.setData({
              signData:signData,
              psignData:psignData,
              lsignData:lsignData,
              gsignData:gsignData,
              isShow:false,
            })
          }
        }else{
          this.setData({
            signData:[],
            psignData:[],
            gsignData:[],
            lsignData:[],
            isShow:true,
          })
        }
      }
    })
  },

  getLocation:function(e){
    var id1 = e.currentTarget.dataset.id1;
    var id2 = e.currentTarget.dataset.id2;
    var lsign = this.data.lsignData;
    var user = lsign[id1].users[id2];
    
    user.showLocation = !user.showLocation;
    this.setData({
      lsignData:lsign
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
    this.onLoad();
    setTimeout(() => {
      wx.stopPullDownRefresh({
        success: (res) => {},
      })
    }, 1000);
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