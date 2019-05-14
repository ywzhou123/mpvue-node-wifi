import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import state from './state'
import createPersistedState from 'vuex-persistedstate' // 解决Vuex持久化插件-在F5刷新页面后数据不见的问题
import indexStore from './modules/index'
import detailStore from './modules/detail'
import connectStore from './modules/connect'
import wifiListStore from './modules/wifiList'

Vue.use(Vuex)
export default new Vuex.Store({
  state () {
    return state
  },
  actions,
  mutations,
  modules: {
    index: indexStore,
    detail: detailStore,
    connect: connectStore,
    wifiList: wifiListStore
  },
  plugins: [
    createPersistedState({
      storage: {
        getItem: key => wx.getStorageSync(key),
        setItem: (key, value) => wx.setStorageSync(key, value),
        removeItem: key => wx.clearStorage()
      }
    })
  ]
})
