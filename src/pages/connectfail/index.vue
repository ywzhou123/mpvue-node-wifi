<template>
  <div class="container">
    <img src="/static/image/warning.png" alt="" class="fail">
    <span class="fail_txt">连接失败</span>
    <span class="ssid">{{wifi.ssid}}</span>
    <span class="remark">{{wifi.remark}}</span>
    <span class="desc">您当前可能不在WiFi覆盖范围内，或WiFi密码有误</span>
    <button type='primary' class="connect" @click="clickHandle">重新连接</button>
    <a href="/pages/index/main" class="create">我也想创建WiFi码</a>
    <div class="footer"></div>
  </div>
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
  methods: {
    clickHandle () {
      wx.navigateTo({
        url: '/pages/connecting/main'
      })
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
  .desc{
    font-size:12px;
    color:gray;
  }
  .connect{
    width:175px;
    margin:20px;
  }
  .create{
    font-size:14px;
    color:green;
  }
  .footer{
    flex: 1;
  }
}
</style>
