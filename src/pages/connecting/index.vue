<template>
  <div class="container">
    <img src="/static/image/connecting.gif" alt class="img">
    <span class="ssid">{{wifi.ssid}}</span>
    <span class="desc">{{connectText}}</span>
    <div class="step_cont">
      <div class="step_item step1">
        <span class="txt">建立连接</span>
        <icon class="success" type="success" size="20" v-if="step1"></icon>
        <img src="/static/image/loading.png" alt class="status" v-else>
      </div>
      <div class="step_item step2">
        <span class="txt">分配IP地址</span>
        <icon class="success" type="success" size="20" v-if="step2"></icon>
        <img src="/static/image/loading.png" alt class="status" v-else>
      </div>
      <div class="step_item step3">
        <span class="txt">安全检查</span>
        <icon class="success" type="success" size="20" v-if="step3"></icon>
        <img src="/static/image/loading.png" alt class="status" v-else>
      </div>
      <div class="step_item step4">
        <span class="txt">联网检查</span>
        <icon class="success" type="success" size="20" v-if="step4"></icon>
        <img src="/static/image/loading.png" alt class="status" v-if="!step4">
      </div>
    </div>
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
  }
}
</script>

<style lang='scss' scoped>
.container {
  background-color: #fff;
  height: 100vh;
  .img {
    height: 180px;
    width: 200px;
    margin-top: 40px;
    margin-bottom: 10px;
  }
  .desc {
    margin: 10px;
    font-size: 14px;
  }
  .success,
  .status {
    width: 20px;
    height: 20px;
  }
  .status {
    animation: rotate 1s linear infinite;
    -webkit-animation: rotate 1s linear infinite;
  }
  .step_cont {
    flex: 1;
    margin-top: 80px;
    width: 100%;
    .step_item {
      display: flex;
      font-size: 14px;
      line-height: 20px;
      border-bottom: 1px rgba(153, 153, 153, 0.509);
      margin: 0 10px;
      padding: 10px;
      justify-content: space-between;
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
}
</style>
