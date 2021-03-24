// pages/pSign/pSign.js
var timeUtil = require("../../utils/util");
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time:timeUtil.timeData,
    index:0,
    cid:'',
    one:{
      focus:true,
      value:''
    },
    two:{
      focus:false,
      value:''
    },
    three:{
      focus:false,
      value:''
    },
    four:{
      focus:false,
      value:''
    },
  },
  //输入密码
  pwdInput:function(e){
    var value = e.detail.value;
    var id = e.currentTarget.dataset.id;
    if(value in ['0','1','2','3','4','5','6','7','8','9']){
      //检测用户输入的是否是数字
    if(id==0){
      this.data.one.value = value;
      if(!this.data.two.value){
        this.setData({
          two:{
            focus:true,
            value:this.data.two.value,
          }
        })
      }
    }else if(id==1){
      this.data.two.value = value;
      if(!this.data.three.value)
      this.setData({
        three:{
          focus:true,
          value: this.data.three.value,
        }
      })
    }else if(id==2){
      this.data.three.value = value;
      if(!this.data.four.value)
      this.setData({
        four:{
          focus:true,
          value:this.data.four.value,
        }
      })
    }else{
      this.data.four.value = value;
    }
  }else{
    if(e.detail.keyCode!=8){

    //提示用户，密码只能是数字
    wx.showToast({
      title: '密码只能是数字',
      icon:'none'
    })
  }

    if(id==0){
      this.setData({
        one:{
          focus:true,
          value:''
        }
      })
    }else if(id==1){
      this.setData({
        two:{
          focus:true,
          value:''
        }
      })
    }else if(id==2){
      this.setData({
        three:{
          focus:true,
          value:''
        }
      })
    }else{
      this.setData({
        four:{
          focus:true,
          value:''
        }
      })
    }
  }
  },
  //picker change
  pickerChange:function(e){
    this.setData({
      index:e.detail.value
    })
  },
  //确定创建
  createPSign:function(){
    if(this.data.one.value&&this.data.two.value&&this.data.three.value&&this.data.four.value){
      var pwd = ""+this.data.one.value+this.data.two.value+
      this.data.three.value+this.data.four.value;

      wx.request({
        url: app.globalData.url+'/createPSign',
        data:{
          openid:app.globalData.openid,
          cid:this.data.cid,
          validTime:((this.data.index)*60),
          password:pwd,
        },
        success:res=>{
          if(res.data.status==200){
            wx.showToast({
              title: '创建成功',
            })
  
            //返回首页
            setTimeout(function(){
              wx.reLaunch({
                url: '../index/index',
              })
            },2000);
          }else{
            wx.showToast({
              title: '创建失败，请稍后再试',
              icon:'none'
            })
          }
        }
      })

    }else{
      wx.showToast({
        title: "请填写签到密码",
        icon: 'none'
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