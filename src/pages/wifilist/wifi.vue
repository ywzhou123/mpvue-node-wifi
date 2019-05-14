<template>
  <div class="container">
    <div class="weui-flex">
        <div class="weui-flex__item item-select">
          <icon type="success_no_circle" size="20"  v-show="isCurrentWifi"/>
        </div>
        <div class="weui-flex__item  weui-flex flex-item-ssid">
          <div class="weui-flex__item item-ssid">
          <div class="ssid">{{wifi.SSID}}</div>
          </div>
          <div class="weui-flex__item item-secure">
            <img src="/static/image/lock.png" alt="" class="lock" v-if="wifi.secure">
          </div>
          <div class="weui-flex__item item-signalStrength">
            <img :src="signalStrengthLevel" alt="" class="signalStrength">
          </div>
        </div>

      </div>
  </div>
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
      if (signalStrength > 75) return '/static/image/wifi-4.png'
      if (signalStrength > 50) return '/static/image/wifi-3.png'
      if (signalStrength > 25) return '/static/image/wifi-2.png'
      return '/static/image/wifi-1.png'
    }
  }
}
</script>

<style scoped>
.container{
  background-color: white;
  height: 40px;
}
.weui-flex {
  width: 100%;
  height: 100%;
  justify-content: space-between;
}
.weui-flex__item{
  flex: 0;
  align-self: center;
}
.item-select{
  padding: 0 10px;
  flex-basis: 20px;
}
.flex-item-ssid{
  flex: 1;
  border-bottom: 1px solid #ccc;
}
.item-ssid{
  flex: 1;
}
.item-signalStrength{
  margin-right: 10px;
  margin-left: 10px;
}

.lock, .signalStrength{
  width: 40rpx;
  height: 40rpx;
}
</style>
