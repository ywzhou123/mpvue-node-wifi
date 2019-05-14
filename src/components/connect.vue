<template>
  <div class="container">
    <div class="connect">
      <div class="ssid">
        {{connect.ssid}}
      </div>
      <div class="title">
        {{connect.title}}
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
.container{
  padding: 5px 10px;
  background-color: white;
  .connect{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    .ssid{
      font-size: 40rpx;
    }
    .title{
      font-size: 32rpx;
      color: #aaaaaa;
      padding-left: 30rpx;
      flex: 1;
    }
    .time{
      font-size: 12px;
      color: rgba(92, 89, 89, 0.603);
      text-align: right;
    }
    &:hover{
      background-color: #eeeeee;
    }
  }
}
</style>
