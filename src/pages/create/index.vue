<template>
  <section class="container">
    <header>
      <div class="title">
        <h1>填写WIFI码信息</h1>
        <span>填写时请确认WIFI密码是否填写正确</span>
      </div>
      <div class="example" @click="onNavigate">
        <h2>查看示例</h2>
        <img src="/static/image/go.png" alt='' mode='aspectFit'>
      </div>
    </header>
    <section class="form-wrap">
      <form class="form">
        <div class="form-item">
          <img src="/static/image/logo.png" alt='' mode='aspectFit'>
          <input type="text" class="ssid" placeholder="请输入WiFi名称" v-model="wifiData.ssid">
        </div>
        <div class="form-item">
          <img src="/static/image/password.png" alt='' mode='aspectFit'>
          <input type="text" class="pass" placeholder="请输入WiFi密码" v-model="wifiData.pass" v-if="showPassword">
          <input type="password" class="pass" placeholder="请输入WiFi密码" v-model="wifiData.pass" v-if="!showPassword">
          <img class="eye" :src="'/static/image/eye-' + (showPassword ? 'open' : 'close') +'.svg'" alt="" @click="showPassword = !showPassword">
        </div>
        <div class="form-item">
          <img src="/static/image/welcome.png" alt='' mode='aspectFit'>
          <input type="text" class="title" placeholder="说一句欢迎语吧~" v-model="wifiData.title">
        </div>
        <div class="form-item">
          <img src="/static/image/remark.png" alt='' mode='aspectFit'>
          <input type="text" class="remark" placeholder="请输入备注" v-model="wifiData.remark">
        </div>
      </form>
    </section>
    <section class="btn-wrap">
      <button class="weui-btn btn-main" type="primary" @click="clickHandle">{{wifiData.id?'更新':'生成'}}WiFi码</button>
    </section>
  </section>
</template>

<script>
import { isIncludeChinese } from '../../utils'
import * as Vuex from 'vuex'
const { mapState, mapActions } = Vuex.createNamespacedHelpers(
  'detail'
)
const initWifiData = function () {
  return {
    id: '',
    ssid: '',
    bssid: '',
    pass: '',
    title: '',
    remark: ''
  }
}
export default {
  data () {
    return {
      wifiData: initWifiData(),
      codeErrMsg: '',
      showPassword: false
    }
  },
  computed: {
    ...mapState(['wifi'])
  },
  methods: {
    ...mapActions(['createWifi', 'updateWifi']),
    clickHandle (e) {
      e.preventDefault()
      var that = this
      var pass = this.wifiData.pass.trim()
      if (!pass) {
        wx.showToast({
          icon: 'none',
          title: '密码不能为空'
        })
        return
      } else if (isIncludeChinese(pass)) {
        wx.showToast({
          icon: 'none',
          title: '密码不能包含中文'
        })
        return
      }
      wx.showModal({
        title: '请确认WiFi密码是否填写正确？',
        content:
          '请输入准确的WiFi密码，WiFi密码错误将导致访客无法连接，您的WiFi密码将加密存储，请放心使用',
        success (res) {
          if (res.confirm) {
            that.onConfirm()
          }
        }
      })
    },
    onConfirm () {
      if (this.wifiData.id) {
        this.updateWifi(this.wifiData)
      } else {
        this.createWifi(this.wifiData)
      }
    },
    onNavigate () {
      wx.navigateTo({
        url: '/pages/example/main'
      })
    }
  },
  mounted () {
    var query = this.$root.$mp.query
    var ssid = query.ssid || ''
    var bssid = query.bssid || ''
    if (query.edit) {
      this.wifiData = Object.assign({}, initWifiData(), this.wifi)
    } else {
      this.wifiData = Object.assign({}, initWifiData(), { ssid, bssid })
    }
  },
  onUnload () {
    this.wifiData = Object.assign({}, initWifiData())
  }
}
</script>

<style lang='scss' scoped>
.container {
  justify-content: flex-start;
  header{
    .example{
      padding-top: 60rpx;
      display: flex;
      align-items: center;
      h2{
        font-size: 32rpx;
        color: #02C9A0;
        line-height: 45rpx;
        padding-right: 22rpx;
      }
      img{
        width: 19rpx;
        height: 30rpx;
      }
    }
  }
  .form-wrap{
    padding-top: 18rpx;
    padding-left: 36rpx;
    .form{
      .form-item{
        display: flex;
        align-items: center;
        padding-top: 60rpx;
        img:first-child{
          width: 60rpx;
          height: 60rpx;
          padding-right: 36rpx;
        }
        input{
          width:100%;
          padding: 20rpx 0;
          font-size: 28rpx;
          line-height: 40rpx;
          color: #777777;
          border-bottom:1rpx solid #CECCE2;
        }
        .eye {
          width: 60rpx;
          height: 60rpx;
          padding:18rpx 30rpx;
          border-bottom:1rpx solid #CECCE2;
        }
      }
    }
  }
  .btn-wrap{
    padding: 120rpx 36rpx 0;
  }
}
</style>
