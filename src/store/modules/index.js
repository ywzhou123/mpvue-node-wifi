import qcloud from 'wafer2-client-sdk'
import config from '@/config'

const userInfo = {
  avatarUrl: '',
  city: '',
  country: '',
  gender: 0,
  language: 'zh_CN',
  nickName: '',
  openId: '',
  province: ''
}
export default {
  namespaced: true,
  state () {
    return {
      userInfo,
      tip: false,
      wifiList: [],
      connectList: []
    }
  },
  mutations: {
    // 获权modal
    showTip (state) {
      state.tip = true
    },
    // 获权modal
    hideTip (state) {
      state.tip = false
    },
    // 全局loading
    startLoading () {
      wx.showLoading({
        title: '数据加载中...'
      })
    },
    // 全局loading
    endLoading () {
      wx.hideLoading()
    },
    // 更新数据
    updateUserInfo (state, data) {
      state.userInfo = data
    },
    // 更新数据
    updateWifiList (state, data) {
      state.wifiList = data
    },
    // 更新数据
    updateConnectList (state, data) {
      state.connectList = data
    },
    // 更新数据
    updateConnectWifiList (state, data) {
      const wifiIds = data.map(wifi => wifi.id)
      state.connectList = state.connectList.map(con => {
        if (wifiIds.includes(con.wifi_id)) {
          con.wifi = data.filter(wifi => wifi.id === con.wifi_id)[0]
        }
        return con
      })
    }
  },
  actions: {
    // 获取认证状态
    getAuthSetting ({ state, commit, rootState, dispatch }) {
      wx.getSetting({
        success (res) {
          if (res.authSetting['scope.userInfo']) {
            commit('hideTip')
            dispatch('login')
          } else {
            commit('showTip')
            commit('updateUserInfo', userInfo)
            commit('updateWifiList', [])
            commit('updateConnectList', [])
          }
        }
      })
    },
    // 登录
    login ({ state, commit, rootState, dispatch }) {
      qcloud.setLoginUrl(config.loginUrl)
      qcloud.login({
        success (userInfo) {
          commit('updateUserInfo', userInfo)
          commit('hideTip')
          dispatch('getWifiList')
          dispatch('getConnectList')
        },
        fail () {
          commit('showTip')
        }
      })
    },
    // 获取数据
    getWifiList ({ state, commit, rootState }) {
      commit('startLoading')
      qcloud.request({
        url: config.wifiList,
        success (res) {
          commit('updateWifiList', res.data.data)
        },
        complete () {
          commit('endLoading')
        }
      })
    },
    // 获取数据
    getConnectList ({ state, commit, rootState, dispatch }) {
      commit('startLoading')
      qcloud.request({
        url: config.connectList,
        success (res) {
          commit('updateConnectList', res.data.data)
        },
        complete () {
          commit('endLoading')
        }
      })
    }
  }
}
