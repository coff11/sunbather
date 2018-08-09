
import Http from '../util/http.js'
import { config } from '../config.js'

class ClassicModel extends Http {


  getLatest (cb) {
    this.request({
      url: '/forecast',
      data: {
        key: config.key,
        location: 'CN101010100'
      },
      success(res) {
        cb(res)
      }
    })
  }

  // 获取用户的行政区划（区）
  getUserLoc (cb) {
    const this_ = this
    this.getPosition({
      success(res) {

        // 成功获取用户的经纬度
        const lng = res.longitude
        const lat = res.latitude
        const latlng = lat + ',' + lng   // 百度地图API接收的格式是纬度+经度

        // 通过经纬度获取用户所在的行政区
        this_.getDistrict({
          latlng: latlng,
          success (res) {
            cb(res)
          }
        })
      },
      fail () {
        wx.showToast({
          title: '抱歉，出现了一个错误',
          icon: 'none',
          duration: 2000
        })
      }
    })
  }

}

export default ClassicModel