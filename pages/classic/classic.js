
import Http from '../../util/http.js'
import { config } from '../../config.js'
import { errToast} from '../../util/util.js'

const http = new Http()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    classicData : null,
    district: '',
    year: '',
    month: '',
    day: '',
    hour: '',
    minute: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    const this_ = this

    // 获取用户的地理坐标
    http.getPosition({
      success(res) {

        // 成功获取用户的经纬度
        const lng = res.longitude
        const lat = res.latitude
        const latlng = lat + ',' + lng   // 百度地图API接收的格式是纬度+经度

        // 通过经纬度获取用户所在的行政区
        http.getDistrict({
          latlng: latlng,
          success(res) {

            // 执行传入的回调函数设置行政区数据
            this_.setData({
              district: res
            })

            // 通过获取的行政区查询天气
            http.getWeather({
              url: '/',
              data: {
                location: res,
                key: config.key
              },
              success(res) {
                console.log(res)

                // 获取天气API的更新时间
                const date = res.update.loc
                const year = date.substring(0, 4)
                const month = date.substring(5, 7)
                const day = date.substring(8, 10)
                const hour = date.substring(11, 13)
                const minute = date.substring(14, 16)
                this_.setData({
                  year,
                  month,
                  day,
                  hour,
                  minute
                })
              }
            })
          }
        })
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