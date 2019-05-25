<template>
  <div class="container">
    <section class="connecting">
      <div class="wifi-wrap">
        <img class="wifi-icon" src="/static/image/wifi.svg" alt="">
        <div class="bo"></div>
        <div class="bo bo-2"></div>
        <img class="loading" src="/static/image/loading.svg" alt="">
      </div>
      <div class="text ssid">{{wifi.ssid}}</div>
      <div class="text desc">{{connectText}}</div>
    </section>
    <section class="step_cont">
      <div class="step_item step1">
        <span class="txt">建立连接</span>
        <icon class="success" type="success" size="20" v-if="step1"></icon>
        <img src="/static/image/loading.png" alt class="status" v-if="!step1">
      </div>
      <div class="step_item step2">
        <span class="txt">分配IP地址</span>
        <icon class="success" type="success" size="20" v-if="step2"></icon>
        <img src="/static/image/loading.png" alt class="status" v-if="!step2">
      </div>
      <div class="step_item step3">
        <span class="txt">安全检查</span>
        <icon class="success" type="success" size="20" v-if="step3"></icon>
        <img src="/static/image/loading.png" alt class="status" v-if="!step3">
      </div>
      <div class="step_item step4">
        <span class="txt">联网检查</span>
        <icon class="success" type="success" size="20" v-if="step4"></icon>
        <img src="/static/image/loading.png" alt class="status" v-if="!step4">
      </div>
    </section>
  </div>
</template>

<script>
import qcloud from 'wafer2-client-sdk'
import config from '@/config'
import * as Vuex from 'vuex'
const { mapState } = Vuex.createNamespacedHelpers(
  'connect'
)
export default {
  data () {
    return {
      step1: false,
      step2: false,
      step3: false,
      step4: false,
      connectText: '正在连接...'
    }
  },
  computed: {
    ...mapState(['wifi'])
  },
  methods: {
    ...Vuex.mapActions('index', ['getConnectList']),
    readyConnect () {
      var that = this
      that.runConnect()
      setTimeout(() => {
        that.step1 = true
      }, 500)
      setTimeout(() => {
        that.step2 = true
      }, 1000)
      setTimeout(() => {
        that.step3 = true
      }, 1500)
    },
    runConnect () {
      const that = this
      if (that.wifi.ssid) {
        wx.startWifi({
          success () {
            wx.connectWifi({
              SSID: that.wifi.ssid,
              password: that.wifi.pass,
              async success (res) {
                that.connectText = '连接成功'
                that.step4 = true
                const r = await qcloud.request({
                  url: config.connectWifi,
                  method: 'PUT',
                  data: {
                    wifiId: that.wifi.id
                  }
                })
                console.log(r)
                that.getConnectList()
                wx.redirectTo({
                  url: '/pages/connectsuccess/main'
                })
              },
              fail (err) {
                console.log('连接失败', err)
                wx.redirectTo({
                  url: `/pages/connectfail/main?errCode=${err.errCode}`
                })
              }
            })
          },
          fail () {
            wx.showToast({
              icon: 'none',
              title: 'WiFi模块初始化失败'
            })
          }
        })
      } else {
        wx.showToast({
          icon: 'none',
          title: 'WiFi不存在'
        })
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.readyConnect()
    })
  },
  onUnload () {
    this.step1 = false
    this.step2 = false
    this.step3 = false
    this.step4 = false
  }
}
</script>

<style lang='scss' scoped>
.container {
  height: 100vh;
  background-color: #f5f5f5;
  justify-content:flex-start;

  .connecting{
    height: 70vh;
    background:linear-gradient(135deg,rgb(226, 248, 164) 0%,rgb(65, 228, 165) 50%,rgb(3, 165, 76) 100%);
    text-align: center;
    .wifi-wrap{
      border-radius: 50%;
      background-color: rgba(255, 255, 255, 0.3);
      margin: 100rpx auto 50rpx;
      width: 300rpx;
      height: 300rpx;
      position: relative;
      .wifi-icon{
        margin: 0 auto;
        width: 60rpx;
        height: 60rpx;
        padding-top: 120rpx;
      }
      .loading{
        position: absolute;
        top: -50rpx;
        left: -50rpx;
        width: 400rpx;
        height: 400rpx;
        opacity: 0.5;
        animation: rotate linear 2s infinite both;
      }
      .bo{
        position: absolute;
        top: 0;
        left: 0;
        border-radius: 50%;
        width: 300rpx;
        height: 300rpx;
        background-color: #ffffff;
        animation: bolan linear 2s infinite both;
        transform-origin: center center;
        @keyframes bolan {
          from {
            opacity: 0.4;
            transform: scale(0);
          }
          to {
            opacity: 0.3;
            transform: scale(1);
          }
        }
      }
      .bo-2{
        animation-delay: 1s;
      }
    }
    .text {
      color: #ffffff;
      font-size: 32rpx;
      padding-top: 40rpx;
    }
  }
  .step_cont {
    margin-top: -120rpx;
    width: 80%;
    border-radius: 24rpx;
    background-color: #ffffff;
    .step_item {
      display: flex;
      justify-content: space-between;
      font-size: 32rpx;
      line-height: 60rpx;
      padding: 20rpx 36rpx;
      &:nth-of-type(n+2) {
        border-top: 1rpx solid rgba(153, 153, 153, 0.2);
      }
      .success,
      .status {
        width: 40rpx;
        height: 40rpx;
      }
      .status {
        animation: rotate 1s linear infinite;
        -webkit-animation: rotate 1s linear infinite;
      }
    }
  }
  @keyframes rotate {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes rotate {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
}
</style>
