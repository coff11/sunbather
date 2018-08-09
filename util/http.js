import { config } from '../config.js'

const errorCode = {
  7: '出现了一个未知错误',
  1: '服务器内部错误',
  2: '请求参数非法',
  3: '权限校验失败',
  4: '配额校验失败',
  5: 'AK不存在或非法',
  101: '服务禁用',
  102: '不通过白名单或安全码错误'
}

class Http {

  request(params = {
    url: '/',
    method: 'GET',
    data: {
      key: config.key
    }
  }) {
    const _this = this
    wx.request({
      url: config.apiUrl + params.url,
      method: params.method,
      data: params.data,
      header: {
        'content-type': 'application/json'
      },
      success(res) {

        console.log(res.data.HeWeather6[0])
        // const code = res.statusCode+''
        // if (code.startsWith('2')) {
        //   params.success(res.data)
        // } else {
        //   _this._show_code(res.data.error_code)
        // }
      },
      fail() {
        // _this._show_code(0)
      }
    })
  }

  /*
   * 获取用户的位置信息
   */
  getPosition (params) {
    wx.getLocation({
      type: 'gcj02',
      success (res) {
        // console.log(res)
        params.success(res)
      },
      fail () {
        wx.showToast({
          title: "抱歉，获取地理位置信息失败",
          icon: "none",
          duration: 2000
        })
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
        location: params.latlng,    // 提供 纬度+经度
        ak: config.ak,    // 开发者认证ak
        output: 'json'    // 默认返回xml，修改为json
      },
      success (res) {
        params.success(res.data.result.addressComponent.district)
      }
    })
  }

  getNow () {
    wx.request({
      url: '',
    })
  }

  // _show_code (code) {
  //   wx.showToast({
  //     title: errorCode[code],
  //     icon: 'none',
  //     duration: 2000
  //   })
  // }
}


export default Http;