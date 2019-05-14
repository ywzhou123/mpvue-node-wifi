import qcloud from 'wafer2-client-sdk'
import config from '@/config'
import { b64decode } from '@/utils'

const state = function () {
  return {
    wifi: {
      id: '',
      ssid: '',
      bssid: '',
      title: '',
      remark: '',
      pass: '',
      create: '',
      open_id: ''
    }
  }
}
export default {
  namespaced: true,
  state,
  mutations: {
    updateWifiDetail (state, data) {
      state.wifi = data
    }
  },
  actions: {
    getWifiDetail ({ commit }, wifiId) {
      return new Promise((resolve, reject) => {
        if (!wifiId) reject(wifiId)
        commit('index/startLoading', null, { root: true })
        qcloud.request({
          url: config.wifiDetail,
          data: {
            wifiId
          },
          success (res) {
            res.data.data.pass = b64decode(res.data.data.pass)
            commit('updateWifiDetail', res.data.data)
            resolve(res.data.data)
          },
          fail (err) {
            wx.showToast({
              icon: 'none',
              title: 'WiFi已被分享者删除'
            })
            wx.navigateTo({
              url: '/pages/index/main'
            })
            reject(err)
          },
          complete () {
            commit('index/endLoading', null, { root: true })
          }
        })
      })
    }
  }
}
