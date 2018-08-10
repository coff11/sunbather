
import Http from './util/http.js'
import { config } from './config.js'
import { errToast } from './util/util.js'

const http = new Http()

App({

  globalData: {},

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {

  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {

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

            // 将行政区数据存储用于回调函数
            const districtValue = res

            // 通过获取的行政区查询天气
            http.getWeather({
              url: '/',
              data: {
                location: res,
                key: config.key
              },
              success(res) {

                // 从天气api获取行政区信息，用于页面显示
                const dis = res.basic.location

                // 获取天气API的更新时间
                const date = res.update.loc
                const year = date.substring(0, 4)
                const month = date.substring(5, 7)
                const day = date.substring(8, 10)
                const hour = date.substring(11, 13)
                const minute = date.substring(14, 16)

                // 获取 Now页面 天气数据
                const nowData = res.now
                const tmp = nowData.tmp // 温度
                const condTxt = nowData.cond_txt  // 天气描述
                const condCode = nowData.cond_code // 天气代码
                const windSc = nowData.wind_sc // 风力
                const windDir = nowData.wind_dir // 风向
                const hum = nowData.hum // 相对湿度

                const airArr = [...res.lifestyle].filter((item) => {
                  return item.type == 'air'
                })
                const air = airArr[0].brf   // 实时空气质量

                // 获取 Forecast页面 天气数据
                const dayOne = res.daily_forecast[1]
                const dayTwo = res.daily_forecast[2]

                const dayOneCondTxtD = dayOne.cond_txt_d
                const dayOneCondTxtN = dayOne.cond_txt_n
                const dayOneCondCodeD = dayOne.cond_code_d
                const dayOneCondCodeN = dayOne.cond_code_n
                const dayOneWindDir = dayOne.wind_dir
                const dayOneWindSc = dayOne.wind_sc

                const dayTwoCondTxtD = dayTwo.cond_txt_d
                const dayTwoCondTxtN = dayTwo.cond_txt_n
                const dayTwoCondCodeD = dayTwo.cond_code_d
                const dayTwoCondCodeN = dayTwo.cond_code_n
                const dayTwoWindDir = dayTwo.wind_dir
                const dayTwoWindSc = dayTwo.wind_sc

                // 设置全局数据
                this_.globalData = {
                  year,
                  month,
                  day,
                  hour,
                  minute,
                  tmp,
                  hum,
                  condTxt,
                  condCode,
                  windSc,
                  windDir,
                  dis,
                  air,
                  dayOneCondTxtD,
                  dayOneCondTxtN,
                  dayOneCondCodeD,
                  dayOneCondCodeN,
                  dayOneWindDir,
                  dayOneWindSc,
                  dayTwoCondTxtD,
                  dayTwoCondTxtN,
                  dayTwoCondCodeD,
                  dayTwoCondCodeN,
                  dayTwoWindDir,
                  dayTwoWindSc
                }

                // 判断页面中处理数据的回调函数是否存在，存在则执行
                this_.handleIndex && this_.handleIndex(res) 
                this_.handleForecast && this_.handleForecast(res)
              }
            })
          }
        })
      }
    })


  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {
    
  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {
    
  }
})
