// pages/createdClass/createdClass.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow:false,//是否展示没有班级信息
    dataArr:[],//用户创建的班级信息
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: app.globalData.url+'/getUserClass',
      data:{
        openid:app.globalData.openid
      },
      success:res=>{
        console.log(res.data)
        if(res.data.status==200){
          var data = res.data.data;
          for(var i=0;i<data.length;i++){
            data[i].hidden = true;
            data[i].delHidden = true;
          }
          this.setData({
            dataArr:data,
            isShow:false
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
  //显示成员
  showUser:function(e){
    var id = e.currentTarget.dataset.id;
    var data = this.data.dataArr;
    data[id].hidden = false;
    this.setData({
      dataArr:data
    })
  },
  //隐藏成员
  hiddenUser:function(e){
    var id = e.currentTarget.dataset.id;
    var data = this.data.dataArr;
    data[id].hidden = true;
    this.setData({
      dataArr:data
    })
  },
  //删除班级
  delClass:function(e){
    var id = e.currentTarget.dataset.id;
    wx.showModal({
      cancelColor: '#000',
      title:'确定要删除班级吗？',
      success:res=>{
        if(res.confirm){
          //发送请求，删除班级
          wx.request({
            url: app.globalData.url+'/delClass',
            data:{
              openid:app.globalData.openid,
              cid:id
            },
            success:result=>{
              if(result.data.status==200){
                wx.showToast({
                  title: '删除成功',
                })

                setTimeout(()=>{this.onLoad();},2000);
              }else{
                wx.showToast({
                  title: '删除失败，请稍后再试',
                  icon:'none'
                })
              }
            }
          })
        }
      }
    })
  },
  //显示隐藏删除
  showDel:function(e){
    var id = e.currentTarget.dataset.id;
    var data = this.data.dataArr;
    data[id].delHidden = !data[id].delHidden;
    this.setData({
      dataArr:data
    })
  },
  //班级创建者删除班级成员
  delClassUser:function(e){
    //班级成员数组的index
    var userIndex = e.currentTarget.dataset.userIndex;
    //数据数组的index
    var index = e.currentTarget.dataset.id;

    var data = this.data.dataArr;
    var cid = e.currentTarget.dataset.cid;
    var uid = e.currentTarget.dataset.uid;
    wx.showModal({
      title:'确定要删除该班级成员吗？',
      success:res=>{
        if(res.confirm){
          wx.request({
            url: app.globalData.url+'/teaDelClassUser',
            data:{
              openid:app.globalData.openid,
              cid:cid,
              uid:uid
            },
            success:result=>{
              if(result.data.status==200){
                wx.showToast({
                  title: '删除成功',
                })
                //todo 删除该行数据
                data[index].users.splice(userIndex,1);
                data[index].class.num -= 1;
                this.setData({
                  dataArr:data
                })
              }else{
                wx.showToast({
                  title: '删除失败，请稍后再试',
                })
              }
            }
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