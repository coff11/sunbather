import { config } from '../config.js'
import { errToast } from './util.js'

class Http {

  /*
   * 获取用户的位置信息
   */

  getPosition (params) {
    wx.getLocation({
      type: 'gcj02',
      success (res) {
        params.success && params.success(res)
      },
      fail () {
        errToast('抱歉，获取地理信息失败')
      }
    })
  }

  /*
   * 通过调用百度地图逆地理编码API获取用户的行政区信息
   */

  getDistrict (params) {
    wx.request({
      url: config.baiduUrl,
      data: {
        coordtype: 'gcj02ll',   // 国测局坐标，小程序和百度地图通用，非默认值
        location: params.latlng || "39.911066,116.413610",    // 提供 纬度+经度
        ak: config.ak,    // 开发者认证ak
        output: 'json'    // 默认返回xml，修改为json
      },
      success (res) {
        params.success && params.success(res.data.result.addressComponent.district)
      },
      fail() {
        errToast('抱歉，请求城区数据失败')
      }
    })
  }

  /*
   * 根据传入的 district 查询实时天气
   */

  getWeather (params) {
    wx.request({
      url: config.apiUrl + (params.url || ''),
      data: params.data || {
        location: '东城区',
        key: config.key
      },
      success (res) {
        params.success && params.success(res.data.HeWeather6[0])
      },
      fail() {
        errToast('抱歉，请求天气数据失败')
      }
    })
  }

}

export default Http;
