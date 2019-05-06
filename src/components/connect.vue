<template>
  <div class="container"  @click="clickConnectHandle(connect.wifi_id, $event)">
    <div class="connect">
      <div class="ssid">
        {{connect.wifi && connect.wifi.ssid}}
      </div>
      <div class="time">
        {{time}}使用过
      </div>
    </div>
  </div>
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
        wifi: {
          ssid: ''
        }
      }
    }
  },
  computed: {
    time () {
      const oldtime = new Date(this.connect.time)
      const newtime = new Date()
      return beforeTime(oldtime, newtime)
    }
  },
  methods: {
    clickConnectHandle () {
      var wifiId = this.connect.wifi_id
      if (wifiId) {
        wx.navigateTo({
          url: `/pages/index/main?wifi_id=${wifiId}`
        })
      }
    }
  }
}
</script>

<style scoped>
.container{
  padding: 5px 10px;
  background-color: white;
}
.connect{
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
.ssid{
  font-size: 14px;
}
.time{
  font-size: 12px;
  color: rgba(92, 89, 89, 0.603);
  text-align: right;
}
</style>
