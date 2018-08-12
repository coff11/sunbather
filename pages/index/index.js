
const app = getApp()

Page({

  // 页面的初始数据
  data: {},

  // 生命周期函数--监听页面加载
  onLoad: function (options) {

    // 设置一个测试数据，用于判断app.js中的http请求是否已经获取到数据
    const testVal = app.globalData.dis

    if (testVal && testVal != '') {
      this.setData(app.globalData)
    } else {

      // 如果测试数据的值仍然为初始值 空字符串，则在app上定义一个回调函数
      // 用于在http请求获取数据成功的回调函数中执行此回调函数
      app.handleIndex = (res) => {
        this.setData(app.globalData)
      }
    }
  },

})
