
import ClassicModel from '../../models/classic.js'

const classic = new ClassicModel()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    classicData : null,
    district: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    classic.getLatest((res) => {
      console.log(res)
      this.setData({
        classicData: res
      })
    })

    //页面加载时，获取用户的行政区划，设置为district，传给子组件
    classic.getUserLoc((res) => {
      this.setData({
        district: res
      })
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