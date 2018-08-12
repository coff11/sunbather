
const app = getApp()

Page({

  // 页面的初始数据
  data: {},

  // 生命周期函数--监听页面加载
  onLoad: function (options) {

    //由于是第二个页面，所以当访问首页时就已经获取到了http请求到的数据，所以不需要设置回调函数取值
    this.setData(app.globalData)
  }
  
})
