// pages/toSign/psign/psign.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
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
    signid:'',
  },
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
  //进行签到
  psign:function(){
    if(this.data.one.value&&this.data.two.value&&this.data.three.value&&this.data.four.value){
      var pwd = ""+this.data.one.value+this.data.two.value+
      this.data.three.value+this.data.four.value;

      wx.request({
        url: app.globalData.url+'/psign',
        data:{
          openid:app.globalData.openid,
          signid:this.data.signid,
          password:pwd,
        },
        success:res=>{
          if(res.data.status==200){
            wx.showToast({
              title: '签到成功',
            })
  
            //返回签到选择页面
            setTimeout(function(){
              wx.navigateBack()
            },2000);
          } else if(res.data.status==501){
            wx.showToast({
              title: res.data.msg,
              icon:'none'
            })

            setTimeout(function(){
              wx.navigateBack()
            },2000);
          }else{
            wx.showToast({
              title: res.data.msg,
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
    this.data.signid = options.signid;
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