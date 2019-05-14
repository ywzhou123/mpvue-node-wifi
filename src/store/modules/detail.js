import qcloud from 'wafer2-client-sdk'
import config from '@/config'
import { b64encode, b64decode } from '@/utils'

const initState = function () {
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
    },
    canvasImagePath: '',
    wxCode: ''
  }
}
export default {
  namespaced: true,
  state: initState(),
  mutations: {
    updateCanvasImagePath (state, data) {
      state.canvasImagePath = data
    },
    updateWifiDetail (state, data) {
      state.wifi = data
    },
    updateWxCode (state, data) {
      state.wxCode = data
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
            reject(err)
          },
          complete () {
            commit('index/endLoading', null, { root: true })
          }
        })
      })
    },
    getWxCode ({ commit }, wifiId) {
      return new Promise((resolve, reject) => {
        if (!wifiId) reject(wifiId)
        commit('index/startLoading', null, { root: true })
        qcloud.request({
          url: config.wxCode,
          data: {
            wifiId
          },
          success (res) {
            try {
              const fs = wx.getFileSystemManager()
              const fsPath = `${wx.env.USER_DATA_PATH}/wxcode_${wifiId}.png`
              fs.writeFileSync(
                fsPath,
                res.data.data,
                'base64'
              )
              commit('updateWxCode', fsPath)
              resolve(res)
            } catch (error) {
              console.log(error)
            }
          },
          complete (err) {
            commit('index/endLoading', null, { root: true })
            reject(err)
          }
        })
      })
    },
    setCanvasImagePath ({ commit }, data) {
      commit('updateCanvasImagePath', data)
    },
    deleteWifi ({ state, commit, dispatch }) {
      wx.showLoading({
        title: '删除中'
      })
      qcloud.request({
        url: config.wifiDelete,
        method: 'PUT',
        data: {
          wifiId: state.wifi.id
        },
        success (res) {
          commit('updateWifiDetail', initState())
          dispatch('index/getWifiList', null, { root: true })
          dispatch('index/getConnectList', null, { root: true })
          wx.redirectTo({
            url: '/pages/index/main'
          })
        },
        fail (err) {
          console.error('del', err)
          wx.showToast({
            icon: 'none',
            title: '删除失败'
          })
        },
        complete () {
          wx.hideLoading()
        }
      })
    },
    createWifi ({ state, commit, rootState }, data) {
      wx.showLoading({
        title: '创建中'
      })
      qcloud.request({
        url: config.wifiCreate,
        method: 'POST',
        data: {
          ...data,
          pass: b64encode(data.pass)
        },
        success (res) {
          if (res.data.code === 200) {
            wx.navigateTo({
              url: `/pages/detail/main?wifi_id=${res.data.data[0]}`
            })
          } else {
            wx.showToast({
              icon: 'none',
              title: '创建失败'
            })
          }
        },
        fail (err) {
          console.error('create: ', err)
          wx.showToast({
            icon: 'none',
            title: '创建失败'
          })
        },
        complete () {
          wx.hideLoading()
        }
      })
    },
    updateWifi ({ state, commit, rootState }, data) {
      wx.showLoading({
        title: '更新中'
      })
      qcloud.request({
        url: config.wifiUpdate,
        method: 'PUT',
        data: {
          ...data,
          pass: b64encode(data.pass)
        },
        success (res) {
          if (res.data.code === 200) {
            wx.navigateTo({
              url: `/pages/detail/main?wifi_id=${data.id}`
            })
          }
        },
        fail (err) {
          console.error('update: ', err)
          wx.showToast({
            icon: 'none',
            title: '更新失败'
          })
        },
        complete () {
          wx.hideLoading()
        }
      })
    }
  }
}
