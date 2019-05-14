<template>
  <div class="container">
    <div class="wifilist">
      <div class="current">
        <img src="/static/image/logo.png" alt class="logo">
        <span class="company">畅享无限</span>
        <div class="ssid">
          <span>{{ssid||'未连接Wifi'}}</span>
        </div>
        <div class="create">
          <button class="weui-btn" type="primary" :disabled="!ssid" @click="clickHandleCreate">快速创建WiFi码</button>
        </div>
      </div>
      <div class="title" v-if="wifiList.length">
        <span v-if="wifiList.length">或选择以下可用的rWiFi，点击去创建</span>
      </div>
      <div class="wifi-list">
        <div
          v-for="(item, index) in wifiListSortd"
          :key="index"
          @click="clickWifiHandle(item.SSID, item.BSSID, $event)"
        >
          <wifi :wifi="item" :ssid="ssid" :bssid="bssid"></wifi>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import wifi from './wifi.vue'

import {
  mapState,
  mapActions
} from 'vuex'

export default {
  components: {
    wifi
  },
  computed: {
    ...mapState(['system', 'platform']),
    ...mapState('wifiList', [
      'ssid',
      'bssid',
      'wifiList'
    ]),
    wifiListSortd () {
      return this.wifiList.sort((a, b) => a.signalStrength < b.signalStrength)
    }
  },
  async onPullDownRefresh () {
    await this.getCurrentWifi()
    await this.getSetting()
    wx.stopPullDownRefresh()
  },
  methods: {
    ...mapActions('wifiList', ['setState']),
    // 获取系统系统
    getSystemInfo () {
      if ((this.platform === 'android' && this.system < 6) || (this.platform === 'ios' && this.system < 11.2)) {
        const errMsg = `当前系统版本(${this.platform}:${
          this.system
        })暂不支持`
        wx.showToast({
          icon: 'none',
          title: errMsg
        })
        return
      }
      // 初始化 Wi-Fi 模块
      this.startWifi()
    },
    // 初始化 Wi-Fi 模块。
    startWifi () {
      wx.startWifi({
        fail () {
          wx.showToast({
            icon: 'none',
            title: 'WiFi模块初始化失败'
          })
        }
      })
    },
    // 获取当前wifi
    getCurrentWifi () {
      var that = this
      wx.getConnectedWifi({
        success (res) {
          that.setState({
            ssid: res.wifi.SSID,
            bssid: res.wifi.BSSID
          })
        },
        fail (res) {
          let errMsg = '获取WiFi失败'
          const code = res.errCode
          if (code === 12005) {
            errMsg = '请打开无线网络'
          } else if (code === 12002) {
            errMsg = '密码错误'
          } else if (code === 12003 || code === 12012) {
            errMsg = '连接超时'
          } else if (code === 12001) {
            errMsg = '系统不支持'
          } else if (code === 12006) {
            errMsg = '请打开GPS定位'
          } else if (code === 12010) {
            if (res.errMsg.endsWith('currentWifi is null')) {
              errMsg = '未连接WiFi'
            }
          }
          wx.showToast({
            icon: 'none',
            title: errMsg
          })
          that.setState({
            ssid: '',
            bssid: ''
          })
        }
      })
    },
    // 监听wifi列表
    onGetWifiList () {
      var that = this
      // 监听获取到 Wi-Fi 列表数据
      wx.onGetWifiList(function (res) {
        // 获取列表
        if (res.wifiList.length) {
          that.setState({
            wifiList: res.wifiList
          })
        } else {
          that.setState({
            wifiList: [],
            wifiListErrorInfo: '未搜索到附近的WiFi'
          })
        }
      })
    },
    handleSystemPlatform () {
      var that = this
      if (this.platform === 'ios') {
        wx.showModal({
          title: 'IOS获取Wifi列表操作提示',
          content:
            '将会打开系统权限设置页面，点击左上角“设置”回到设置首页，滑动到顶部然后点击“无线局域网”，最后点击左上角小字“微信”返回到小程序页面。',
          success (res) {
            if (res.confirm) {
              that.getWifiList()
            }
          }
        })
      } else {
        that.getWifiList()
      }
    },
    // 请求获取wifi列表
    getWifiList () {
      wx.getWifiList()
    },
    clickHandleCreate (e) {
      if (!this.ssid) return
      wx.navigateTo({
        url: `/pages/create/main?ssid=${this.ssid}&bssid=${this.bssid}`
      })
    },
    clickWifiHandle (ssid, bssid, e) {
      if (!ssid) return
      wx.navigateTo({
        url: `/pages/create/main?ssid=${ssid}&bssid=${bssid}`
      })
    },
    getSetting () {
      const that = this
      wx.getSetting({
        success (res) {
          if (res.authSetting['scope.userLocation']) {
            that.handleSystemPlatform() // 请求wifi列表
          } else {
            wx.authorize({
              scope: 'scope.userLocation',
              success () {
                that.handleSystemPlatform() // 请求wifi列表
              }
            })
          }
        }
      })
    }
  },
  beforeMount () {
    this.getSystemInfo() // 获取系统信息 初始化wifi
    this.onGetWifiList() // 监听wifi列表的获取
  },
  mounted () {
    this.getCurrentWifi() // 获取当前已连接的wifi信息
    this.getSetting()
  }
}
</script>

<style lang='scss' scoped>
.container{

  .wifilist {
    width: 100%;
    .current {
      display: flex;
      flex-direction: column;
      .logo {
        width: 40px;
        height: 40px;
        align-self: center;
        margin-top: 20px;
        margin-bottom: 10px;
      }
      .company {
        font-size: 12px;
        color: #ccc;
        align-self: center;
      }
      .ssid {
        text-align: center;
        padding-top: 40px;
      }
      .create {
        padding: 40px;
        text-align: center;
      }
    }
    .title {
      height: 40px;
      line-height: 40px;
      padding-left: 20px;
      font-size: 14px;
    }
    .current,
    .wifi-list {
      background-color: #fff;
    }
  }
}
</style>
