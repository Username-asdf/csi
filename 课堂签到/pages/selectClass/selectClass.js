// pages/selectClass/selectClass.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',//发起签到或随机点名标识
    isShow:false,//是否显示未创建班级
    classArr:[
     
    ],
  },
  //选择班级
  selectClass:function(e){
    var cid = e.currentTarget.dataset.cid;
    if(this.data.id==0){
      //发起签到，选择签到类型
      wx.navigateTo({
        url: '../selectSignType/selectSignType?cid='+cid,
      })
    }else{
      //随机点名
      wx.navigateTo({
        url: '../randomCall/randomCall?cid='+cid,
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.id = options.id;
    //获取创建班级数据
    wx.request({
      url: app.globalData.url+'/selUserCreateClass',
      data:{
        openid:app.globalData.openid
      },
      success:res=>{
        if(res.data.status==200){
          this.setData({
            classArr:res.data.data,
            isShow:false,
          })
        }else{
          this.setData({
            isShow:true,
            calssArr:[]
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