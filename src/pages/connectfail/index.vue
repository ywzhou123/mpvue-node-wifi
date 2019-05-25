<template>
  <section class="container">
    <img src="/static/image/warning.png" alt="" class="fail">
    <span class="fail_txt">{{errMsg}}</span>
    <span class="ssid">{{wifi.ssid}}</span>
    <span class="remark">{{wifi.remark}}</span>
    <section class="btn-wrap">
      <button
        class="weui-btn btn-main"
        type="primary"
        @click="clickHandle"
      >重新连接</button>
    </section>
    <a href="/pages/index/main" class="create">我也想创建WiFi码</a>
  </section>
</template>

<script>
import * as Vuex from 'vuex'
const { mapState } = Vuex.createNamespacedHelpers(
  'connect'
)
export default {
  computed: {
    ...mapState(['wifi'])
  },
  data () {
    return {
      errMsg: '连接失败'
    }
  },
  methods: {
    clickHandle () {
      wx.redirectTo({
        url: '/pages/connecting/main'
      })
    }
  },
  mounted () {
    const { errCode } = this.$root.$mp.query
    console.log(errCode)
    if (errCode) {
      switch (errCode) {
        case '12000':
          this.errMsg = '未先调用startWifi接口'
          break
        case '12001':
          this.errMsg = '当前系统不支持'
          break
        case '12002':
          this.errMsg = '密码错误'
          break
        case '12003':
          this.errMsg = '连接超时'
          break
        case '12004':
          this.errMsg = '重复连接'
          break
        case '12005':
          this.errMsg = '未打开WiFi开关'
          break
        case '12006':
          this.errMsg = '未打开GPS定位开关'
          break
        case '12007':
          this.errMsg = '用户拒绝授权'
          break
        case '12008':
          this.errMsg = '无效的SSID'
          break
        case '12009':
          this.errMsg = '系统运营商配置拒绝'
          break
        case '12011':
          this.errMsg = '应用在后台无法配置WiFi'
          break
        case '12013':
          this.errMsg = '系统保存的WiFi配置过期'
          break
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.container{
  background-color:#fff;
  height: 100vh;
  .fail{
    background-color:rgb(152, 151, 151);
    border-radius:50%;
    height:100px;
    width:100px;
    padding:50px;
    margin:40px;
  }
  .fail_txt{
    top:0;
    position:absolute;
    top:187px;
    font-size:14px;
    color:#fff;
  }
  .ssid{
    font-size:16px;
  }
  .remark{
    margin-top:20px;
    margin-bottom:30px;
    font-size:16px;
  }
  .btn-wrap{
    flex: 1;
    padding: 50rpx 97rpx 0;
  }
  .create{
    font-size:14px;
    color:green;
    padding: 80rpx 0;
  }
}
</style>
