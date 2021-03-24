// pages/selectSignType/selectSignType.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cid:'',//选择的班级id
  },
  //选择签到类型
  selectSignType:function(e){
    var id = e.currentTarget.dataset.id;
    if(id==0){
      //普通签到
      wx.navigateTo({
        url: '../sign/sign?cid='+this.data.cid,
      })
    }else if(id==1){
      //密码签到
      wx.navigateTo({
        url: '../pSign/pSign?cid='+this.data.cid,
      })
    }else if(id==2){
      //手势签到
      wx.navigateTo({
        url: '../gSign/gSign?cid='+this.data.cid,
      })
    }else{
      //位置签到
      wx.navigateTo({
        url: '../lSign/lSign?cid='+this.data.cid,
      })
    }
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