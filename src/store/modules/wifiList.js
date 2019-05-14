export default {
  namespaced: true,
  state () {
    return {
      ssid: '',
      bssid: '',
      wifiList: []
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
