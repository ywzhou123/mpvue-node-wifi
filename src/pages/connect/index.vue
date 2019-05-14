<template>
  <div class="container" :style="{backgroundImage:backgroundImage}">
    <div class="header">
      <span>欢迎使用畅享无限WiFi</span>
    </div>
    <div class="body">
      <img src="/static/image/logo.png" alt class="logo">
      <span class="find">发现WiFi</span>
      <span class="ssid">{{wifi.ssid}}</span>
      <span class="title">{{wifi.title}}</span>
      <span class="remark">{{wifi.remark}}</span>
      <button
        class="weui-btn"
        type="primary"
        :disabled="wifi.id===''"
        @click="clickHandle"
      >连接WiFi</button>
    </div>
    <a href="/pages/index/main" class="footer">如何创建WiFi码</a>
  </div>
</template>

<script>
import * as Vuex from 'vuex'
const { mapState, mapActions } = Vuex.createNamespacedHelpers(
  'connect'
)
export default {
  computed: {
    ...mapState(['wifi']),
    backgroundImage () {
      let base64 = wx.getFileSystemManager().readFileSync('/static/image/background.png', 'base64')
      return `url(data:image/jpg;base64,${base64})`
    }
  },
  methods: {
    ...mapActions(['getWifiDetail']),
    clickHandle (e) {
      wx.navigateTo({
        url: `/pages/connecting/main?wifi_id=${this.wifi._id}`
      })
    }
  },
  mounted () {
    var wifiId
    var query = this.$root.$mp.query

    if (query.scene && query.scene !== 'scene') {
      wifiId = decodeURIComponent(query.scene)
    } else {
      wifiId = query.wifi_id
    }

    if (wifiId) {
      this.getWifiDetail(wifiId)
    } else {
      wx.showToast({
        icon: 'none',
        title: '请求参数错误'
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.container {
  justify-content: start;
  background-color: green;
  height: 100vh;
  .header {
    font-size: 24px;
    color: #fff;
    margin: 60px;
  }
  .body {
    display: flex;
    flex-direction: column;
    width: 80%;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    border-radius: 10px;
    padding-bottom: 60px;
    .logo {
      width: 40px;
      height: 40px;
      margin: 15px;
    }
    .find {
      font-size: 12px;
      color: #ccc;
      margin-bottom: 20px;
    }
    .ssid {
      line-height: 20px;
    }
    .title {
      font-size: 14px;
      color: #aaa;
    }
    .remark {
      font-size: 14px;
      color: #aaa;
    }
    .weui-btn {
      width: 60%;
    }
  }
  .footer {
    position: fixed;
    bottom: 0;
    border-bottom: 2px solid #fff;
    font-size: 14px;
    color: #fff;
    margin-bottom: 20px;
  }
}
</style>
