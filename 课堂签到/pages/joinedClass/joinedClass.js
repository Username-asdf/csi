// pages/joinedClass/joinedClass.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataArr:[],
    isShow:false,
  },
  //input输入
  nickNameInput:function(e){
    var index = e.currentTarget.dataset.id;
    this.data.dataArr[index].tempNickName = e.detail.value;
  },
  //确定修改
  updConfirm:function(e){
    var openid = wx.getStorageSync('openid');
    var cid = e.currentTarget.dataset.cid;
    var index = e.currentTarget.dataset.id;
    var temp = this.data.dataArr[index].tempNickName;
    wx.request({
      url: app.globalData.url+'/updUserClassNickName',
      data:{
        openid:openid,
        cid:cid,
        nickName:temp,
      },
      success:res=>{
        if(res.data.status==200){
          wx.showToast({
            title: '修改成功',
          })
          
          var data = this.data.dataArr;
          data[index].user.nickName = data[index].tempNickName;
          data[index].showUpd = true;
          this.setData({
            dataArr:data
          })
        }else{
          wx.showToast({
            title: res.data.msg,
            icon:"none"
          })
        }
      }
    })
  },
  //取消修改
  updCancle:function(e){
    var index = e.currentTarget.dataset.id;
    var data = this.data.dataArr;
    data[index].showUpd = true;
    this.setData({
      dataArr:data
    })
  },
  //显示修改输入框
  showUpd:function(e){
    var index = e.currentTarget.dataset.id;
    var data = this.data.dataArr;
    data[index].showUpd = false;
    this.setData({
      dataArr:data
    })
  },
  //显示个人信息
  showUser:function(e){
    var index = e.currentTarget.dataset.id;
    var data = this.data.dataArr;
    data[index].hidden = false;
    this.setData({
      dataArr:data
    })
  },
  //隐藏个人信息
  hiddenUser:function(e){
    var index = e.currentTarget.dataset.id;
    var data = this.data.dataArr;
    data[index].hidden = true;
    this.setData({
      dataArr:data
    })
  },
  //退出班级
  delClass:function(e){
    var id = e.currentTarget.dataset.cid;
    wx.showModal({
      cancelColor: '#000',
      title:'确定要退出班级吗？',
      success:res=>{
        if(res.confirm){
          //发送请求，退出班级
          wx.request({
            url: app.globalData.url+'/exitClass',
            data:{
              openid:app.globalData.openid,
              cid:id
            },
            success:result=>{
              if(result.data.status==200){
                wx.showToast({
                  title: '退出班级成功',
                })
                
                setTimeout(()=>{this.onLoad();},2000);
              }else{
                wx.showToast({
                  title: '退出失败，请稍后再试',
                  icon:'none'
                })
              }
            }
          })
        }
      }
    })
  },
  //显示隐藏退出按钮
  showDel:function(e){
    var index = e.currentTarget.dataset.id;
    var data = this.data.dataArr;
    data[index].delHidden = !data[index].delHidden;
    this.setData({
      dataArr:data
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: app.globalData.url+'/getUserJoinClass',
      data:{
        openid:app.globalData.openid
      },
      success:res=>{
        if(res.data.status==200){
          var data = res.data.data;
          for(var i=0;i<data.length;i++){
            data[i].hidden = true;
            data[i].delHidden = true;
            data[i].showUpd = true;
            data[i].tempNickName = '未设置';
          }
          this.setData({
            dataArr:data,
            isShow:false,
          })
          
        }else{
          this.setData({
            isShow:true,
            dataArr:[]
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