<template>
  <section class="wifi">
    <img src="/static/image/code.jpg" mode="aspectFit">
    <div class="content">
      <h1>{{wifi.ssid}}</h1>
      <span>已连接{{count}}次</span>
    </div>
  </section>
</template>

<script>
import qcloud from 'wafer2-client-sdk'
import config from '@/config'

export default {
  props: {
    wifi: {
      type: Object,
      require: true,
      default: {
        ssid: '',
        id: ''
      }
    }
  },
  data () {
    return {
      count: 0
    }
  },
  methods: {
    getCount () {
      const that = this
      const wifiId = this.wifi.id
      if (wifiId) {
        qcloud.request({
          url: config.connectCount,
          data: {
            wifiId
          },
          success (res) {
            if (res.data.data.length) {
              that.count = res.data.data[0].count
            }
          }
        })
      }
    }
  },
  mounted () {
    this.getCount()
  }
}
</script>

<style lang='scss' scoped>
.wifi{
  width: 280rpx;
  background-color: #ffffff;
  border-radius: 9rpx 9rpx 0 0;
  box-shadow: 0 0 30rpx rgba(0, 0, 0, 0.08);
  img{
    width: 230rpx;
    height: 230rpx;
    padding:22rpx 25rpx 28rpx;
  }
  .content{
    height: 100rpx;
    background-color: #02C9A0;
    border-radius: 0 0 9rpx 9rpx;
    text-align: center;
    color: #ffffff;
    h1{
      font-size: 32rpx;
      line-height: 45rpx;
      padding-top: 10rpx;
    }
    span{
      font-size: 20rpx;
      line-height: 28rpx;
      padding-top: 7rpx;
      display: block;
    }
  }
}
</style>
