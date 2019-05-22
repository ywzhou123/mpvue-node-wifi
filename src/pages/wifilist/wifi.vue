<template>
  <section class="wifi-item-wrap">
    <div class="choose">
      <img src="/static/image/choose.png" alt="" v-show="isCurrentWifi"  mode='aspectFit'>
    </div>
    <div class="ssid">{{wifi.SSID}}</div>
    <img src="/static/image/lock.png" alt="" class="lock" v-if="wifi.secure"  mode='aspectFit'>
    <img :src="signalStrengthLevel" alt="" class="signalStrength"  mode='aspectFit'>
  </section>
</template>

<script>
export default {
  props: {
    ssid: {
      type: String,
      default: ''
    },
    bssid: {
      type: String,
      default: ''
    },
    wifi: {
      type: Object,
      require: true,
      default: {
        SSID: '',
        BSSID: '',
        secure: '',
        signalStrength: 0
      }
    }
  },
  computed: {
    isCurrentWifi () {
      return this.wifi.SSID === this.ssid && this.wifi.BSSID === this.bssid
    },
    signalStrengthLevel () {
      var signalStrength = this.wifi.signalStrength
      if (signalStrength > 66) return '/static/image/wifi-3.png'
      if (signalStrength > 33) return '/static/image/wifi-2.png'
      return '/static/image/wifi-1.png'
    }
  }
}
</script>

<style lang='scss' scoped>
.wifi-item-wrap{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36rpx;
  .choose, .choose img{
    width: 45rpx;
    height: 45rpx;
  }
  .ssid{
    padding-left: 29rpx;
    flex: 1;
    font-size: 32rpx;
    line-height: 45rpx;
  }
  .lock{
    width: 27rpx;
    height: 32rpx;
    padding-right: 20rpx;
  }
  .signalStrength{
    width: 42rpx;
    height: 32rpx;
  }
}
</style>
