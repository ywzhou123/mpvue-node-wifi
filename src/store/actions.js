// 处理数据的方法 异步
export default {
  async getSystemInfo ({ state, commit, rootState }) {
    // 获取系统信息
    await wx.getSystemInfo({
      success: function (res) {
        // 获取可使用窗口宽度
        let clientHeight = res.windowHeight
        // 获取可使用窗口高度
        let clientWidth = res.windowWidth
        // 算出比例
        let ratio = 750 / clientWidth
        // 算出高度(单位rpx)
        let height = clientHeight * ratio
        var system = ''
        if (res.platform === 'android') system = parseInt(res.system.substr(8))
        if (res.platform === 'ios') system = parseInt(res.system.substr(4))

        commit('updateState', {
          system,
          platform: res.platform,
          ratio,
          windowHeight: `${height}rpx`
        })
      },
      fail (err) {
        console.log('getSystemInfo: ', err)
      }
    })
  }
}
