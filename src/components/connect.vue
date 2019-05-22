<template>
  <section class="connect-wrap">
    <section class="connect">
      <img class="logo" src="/static/image/wifi-icon.png" alt="" mode="aspectFit">
      <div class="content">
        <h1>{{connect.ssid}}</h1>
        <span>{{time}}使用过</span>
      </div>
      <img class="back" src="/static/image/back.png" alt="">
    </section>
  </section>
</template>

<script>
import { beforeTime } from '@/utils'

export default {
  props: {
    connect: {
      type: Object,
      require: true,
      default: {
        wifi_id: '',
        time: '',
        ssid: ''
      }
    }
  },
  computed: {
    time () {
      const oldtime = new Date(this.connect.time)
      const newtime = new Date()
      return beforeTime(oldtime, newtime)
    }
  }
}
</script>

<style lang='scss' scoped>
.connect-wrap{
  padding: 40rpx 36rpx 0;
  .connect{
    height: 160rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0px 0px 30px #EAEEF6;
    border-radius: 12rpx;
    .logo{
      width: 120rpx;
      height: 120rpx;
      padding: 0 36rpx;
    }
    .content {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      h1{
        font-size: 28rpx;
        line-height: 40rpx;
      }
      span{
        display: block;
        font-size: 24rpx;
        line-height: 39rpx;
        color: #777777;
      }
    }
    .back{
      width: 19rpx;
      height: 30rpx;
      padding-right: 36rpx;
    }
  }
}
</style>
