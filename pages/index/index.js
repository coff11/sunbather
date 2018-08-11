
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {},

  /**
   * 生命周期函数--监听页面加载
   */
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
