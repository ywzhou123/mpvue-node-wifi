<template>
  <div class="container">
    <div class="weui-flex">
      <div class="weui-flex__item item-img">
        <img src="/static/image/wifi-example.png" mode="aspectFit" class="img">
      </div>
      <div class="weui-flex__item item-wifi">
          <div class="ssid">
            <div class="ssid-value">{{wifi.ssid}}</div>
            <div class="title">{{wifi.title}}</div>
          </div>
          <div class="count">已连接{{count}}次</div>
      </div>
      <div class="weui-flex__item item-right">
        <img src="/static/image/right.png" class="right">
      </div>
    </div>
  </div>
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
.container{
  padding: 20rpx;
  height: 240rpx;
  background-color: white;
  &:hover{
    border: 1rpx solid #179B16;
  }
  .weui-flex {
    width: 100%;
    height: 100%;
    .wifi {
      padding: 20rpx;
    }
    .item-img{
      flex: 0;
      .img{
        height: 200rpx;
        width: 150rpx;
        margin-right: 20rpx;
      }
    }
    .item-wifi{
      display: flex;
      flex-direction: column;
      .ssid{
        height: 100%;
        text-align: center;
        flex: 1;
        display: flex;
        .ssid-value, .title{
          font-size: 48rpx;
          align-self: center;
        }
        .title{
          font-size: 32rpx;
          color: #aaaaaa;
          padding-left: 30rpx;
        }
      }
      .count{
        font-size: 24rpx;
        color: rgba(92, 89, 89, 0.603);
      }
    }
    .item-right{
      flex: 0;
      align-self: center;
      .right{
        color:  rgba(92, 89, 89, 0.603);
        width: 50rpx;
        height: 50rpx;
      }
    }
  }
}
</style>
