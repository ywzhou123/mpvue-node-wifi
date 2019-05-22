<template>
  <section class="container">
    <header>
      <h1>请选择可用的WIFI</h1>
      <span>可创建当前连接WIFI或下方WIFI列表的WIFI码</span>
      <img class="logo" src="/static/image/logo.png" alt='' mode='aspectFit'>
      <div class="ssid">{{ssid||'未连接Wifi'}}</div>
      <button class="weui-btn" type="primary" :disabled="!ssid" @click="clickHandleCreate">立即创建</button>
    </header>
    <section class="wifi-list-wrap">
      <div class="list-title">
        <div class="tag"></div>
        <h2>WIFI列表</h2>
      </div>
      <div class="wifi-list">
        <div
          v-for="(item, index) in wifiListSortd"
          :key="index"
          @click="clickWifiHandle(item.SSID, item.BSSID, $event)"
        >
          <wifi :wifi="item" :ssid="ssid" :bssid="bssid" />
          <div class="line" v-if="index < wifiListSortd.length - 1"></div>
        </div>
      </div>
    </section>
    <FooterComp/>
  </section>
</template>

<script>
import FooterComp from '@/components/FooterComp'
import wifi from './wifi.vue'

import {
  mapState,
  mapActions
} from 'vuex'

export default {
  components: {
    wifi,
    FooterComp
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
  header{
    padding: 0 36rpx;
    h1{
      padding-top: 36rpx;
      font-size: 48rpx;
      line-height: 67rpx;
    }
    span{
      padding-top: 10rpx;
      font-size: 28rpx;
      line-height: 40rpx;
    }
    .logo{
      margin: 0 auto;
      width: 294rpx;
      height: 294rpx;
    }
    .ssid{
      text-align: center;
      font-size: 36rpx;
      line-height: 50rpx;
      padding-top: 20rpx;

    }
    .weui-btn{
      width: 100%;
      height:88rpx;
      margin-top: 60rpx;
      line-height: 88rpx;
      color: #ffffff;
      font-size: 36rpx;
      background:linear-gradient(93deg,rgba(5,221,124,1) 0%,rgba(2,201,158,1) 50%,rgba(0,183,197,1) 100%);
      box-shadow:0px 20rpx 40rpx rgba(2,200,160,0.2);
      border-radius:48rpx
    }
  }
  .wifi-list-wrap {
    padding-top: 120rpx;
    padding-bottom: 160rpx;
    flex: 1;
    .wifi-list{
      padding-top: 60rpx;
      .line{
        margin: 40rpx 0 40rpx 110rpx;
        height: 1rpx;
        background-color: #CECCE2;
      }
    }
  }
}
</style>
