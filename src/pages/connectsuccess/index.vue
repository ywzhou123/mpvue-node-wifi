<template>
  <div class="container">
    <img src="/static/image/success.png" alt="" class="success">
    <span class="success_txt">已连接成功</span>
    <span class="ssid">{{wifi.ssid}}</span>
    <span class="remark">{{wifi.remark}}</span>
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
  }
}
</script>

<style lang='scss' scoped>
.container{
  background-color:#fff;
  height: 100vh;
  .success{
    background-color:rgb(7, 184, 66);
    border-radius:50%;
    height:100px;
    width:100px;
    padding:50px;
    margin:40px;
  }
  .success_txt{
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
  .create{
    font-size:14px;
    color:green;
  }
  .footer{
    flex: 1;
  }
}
</style>
