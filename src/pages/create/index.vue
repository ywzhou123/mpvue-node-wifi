<template>
  <div class="container">
    <div class="image">
      <img src="../../../static/image/wifi-example.png" alt class="img">
    </div>
    <div class="errMsg" v-if="codeErrMsg">
      <span>生成小程序码错误：{{codeErrMsg}}</span>
    </div>
    <form class="form">
      <input type="text" class="ssid" :value="wifiData.ssid" disabled>
      <input type="password" class="pass" placeholder="输入WiFi密码（必填）" v-model="wifiData.pass" auto-focus>
      <input type="text" class="title" placeholder="输入欢迎语（例：XXX企业欢迎您）" v-model="wifiData.title">
      <input type="text" class="remark" placeholder="输入备注（例：会议室专用）" v-model="wifiData.remark">
      <button class="weui-btn" type="primary" @click="clickHandle">{{wifiData.id?'更新':'生成'}}WiFi码</button>
    </form>
  </div>
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
      codeErrMsg: ''
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
    }
  },
  mounted () {
    var query = this.$root.$mp.query
    var ssid = query.ssid
    var bssid = query.bssid
    if (query.edit) {
      this.wifiData = Object.assign({}, initWifiData(), this.wifi)
    } else if (ssid && bssid) {
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
  .image {
    background-color: #fff;
    margin-top: 40px;
  }
  .img {
    height: 400px;
    width: 280px;
  }
  .form {
    background-color: #fff;
    position: fixed;
    bottom: 0;
    width: 100%;
    input {
      margin: 10px 20px;
      border-bottom: 1px solid #eee;
      font-size: 16px;
    }
    .weui-btn {
      margin: 20px;
    }
  }
  .errMsg {
    color: red;
    font-size: 12px;
    text-align: center;
  }
}
</style>
