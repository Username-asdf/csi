// pages/randomCall/randomCall.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stus:[],//班级成员
    stu:'',//被选中的学生
    isShow:false,
  },
  //随机点名
  randomCall:function(e){
    var len = this.data.stus.length;
    if(len<=0){
      wx.showToast({
        title: '班级内没有成员，请先添加成员',
        icon:'none'
      })
    }else{
      var i = Math.floor(Math.random()*len);
      console.log(i);
      this.setData({
        stu:this.data.stus[i],
        isShow:true,
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var cid = options.cid;
    wx.request({
      url: app.globalData.url+'/getOneClassUserInfo',
      data:{
        openid:app.globalData.openid,
        cid:cid
      },
      success:res=>{
        if(res.data.status==200){
          console.log(res.data.data)
          this.data.stus = res.data.data;
        }else{
          wx.showToast({
            title: '获取班级成员列表失败，请稍后再试',
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