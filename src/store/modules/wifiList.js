export default {
  namespaced: true,
  state () {
    return {
      startError: '', // 初始化错误提示
      // wifiListError: false, // wifi列表错误显示开关
      wifiListErrorInfo: '', // wifi列表错误详细
      // system: '', // 版本号
      // platform: '', // 系统 android
      ssid: '', // wifi帐号(必填)
      bssid: '', // 设备号 自动获取
      // endError: '', // 连接最后的提示
      wifiList: [] // 附近的wifi
    }
  },
  mutations: {
    updateState (state, data) {
      if (data instanceof Object) {
        Object.keys(data).map(k => {
          if (data[k] !== undefined) {
            state[k] = data[k]
          }
        })
      }
    }
  },
  actions: {
    setState ({ commit }, data) {
      commit('updateState', data)
    }
  }
}
