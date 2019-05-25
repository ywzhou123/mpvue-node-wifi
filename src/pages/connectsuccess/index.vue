<template>
  <div class="container">
    <img src="/static/image/success.png" alt="" class="success">
    <span class="success_txt">连接成功</span>
    <span class="ssid">{{wifi.ssid}}</span>
    <span class="remark">{{wifi.remark}}</span>
    <section class="btn-wrap">
      <button
        class="weui-btn btn-main"
        type="primary"
        @click="clickHandle"
      >回到首页</button>
    </section>
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
      wx.reLaunch({
        url: '/pages/index/main'
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.container{
  background-color:#fff;
  height: 100vh;
  .success{
    background:linear-gradient(93deg,rgba(5,221,124,1) 0%,rgba(2,201,158,1) 50%,rgba(0,183,197,1) 100%);
    box-shadow:0px 20rpx 40rpx rgba(2,200,160,0.2);
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
  .btn-wrap{
    flex: 1;
    padding: 50rpx 97rpx 0;
  }
}
</style>
