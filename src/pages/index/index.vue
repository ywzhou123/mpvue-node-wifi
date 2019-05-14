<template>
  <div class="container">
    <div class="userinfo">
      <img class="userinfo-avatar" v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" background-size="cover" />
      <button class="userinfo-button" v-if="!userInfo.avatarUrl"  open-type="getUserInfo" @getuserinfo="getUserInfo">
        登录
      </button>
    </div>
    <div class="welcome">
      <h1 class="head">欢迎使用！</h1>
      <p class="info">在活动现场、会议室、公司前台、客厅、门店等放置您的专属WiFi码，访客扫一扫即可免密连WiFi。</p>
    </div>
    <div class="btn">
      <button class="weui-btn" type="primary" @click="createWifiHandle">我要创建WiFi码</button>
    </div>
    <blank></blank>
    <div class="wifi-list">
      <div v-for="(item, index) in getWifiListSorted" :key="index" @click="clickWifiHandle(item.id)">
        <wifi :wifi="item"></wifi>
        <blank></blank>
      </div>
    </div>
    <div class="connect-head" v-if="getConnectListSorted.length">
      <div class="icon"></div>
      <div class="title">最近使用</div>
    </div>
    <div class="connect-list">
      <div  v-for="(item, index) in getConnectListSorted" :key="index"
        @click="clickConnectHandle(item.wifi_id)">
        <connect :connect="item"></connect>
      </div>
    </div>
    <blank height="40px"></blank>
    <div class="weui-footer">
      <div class="weui-footer__text"><span class="text">Powered by 畅享无限</span></div>
    </div>
    <auth-modal/>
  </div>
</template>

<script>
import wifi from '@/components/wifi'
import connect from '@/components/connect'
import blank from '@/components/blank'
import authModal from '@/components/authModal'
import { sortTime } from '@/utils'

import {
  mapState,
  mapActions
} from 'vuex'

export default {
  components: {
    wifi,
    connect,
    blank,
    authModal
  },
  computed: {
    ...mapState('index', ['userInfo', 'wifiList', 'connectList']),
    getWifiListSorted () {
      return this.wifiList.sort((a, b) => sortTime(a.create, b.create, 'desc'))
    },
    getConnectListSorted () {
      return this.connectList.sort((a, b) => sortTime(a.time, b.time, 'desc'))
    }
  },
  async onPullDownRefresh () {
    await this.getWifiList()
    await this.getConnectList()
    wx.stopPullDownRefresh()
  },
  methods: {
    ...mapActions('index', ['login', 'getWifiList', 'getConnectList']),
    getUserInfo () {
      this.login()
    },
    createWifiHandle () {
      wx.navigateTo({
        url: '/pages/wifilist/main'
      })
    },
    clickWifiHandle (wifiId) {
      if (wifiId) {
        wx.navigateTo({
          url: `/pages/detail/main?wifi_id=${wifiId}`
        })
      }
    },
    clickConnectHandle (wifiId) {
      if (wifiId) {
        wx.navigateTo({
          url: `/pages/connect/main?wifi_id=${wifiId}`
        })
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.container {
  min-height: 100vh;
  .userinfo{
    background-color: white;
    width:100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .userinfo-avatar {
      width: 128rpx;
      height: 128rpx;
      margin: 40rpx;
      border-radius: 50%;
    }
    .userinfo-button {
      width: auto;
      height: 128rpx;
      line-height: 128rpx;
      margin: 40rpx;
      border-radius:50%;
      background-color:#eee;
      &::after{
        border: 0;
      }
    }
  }
  .welcome {
    background-color: white;
    text-align: center;
    .head {
      background-color: white;
      padding: 20px 0;
      font-size: 14px;
    }
    .info{
      padding: 0 40px;
      font-size: 14px;
      color: rgba(196, 164, 164, 0.603);
    }
  }
  .btn {
    background-color: white;
    width:100%;
    .weui-btn{
      margin-top: 40px;
      margin-bottom: 20px;
      width:60%;
    }
  }

  .wifi-list{
    width: 100%;
  }
  .connect-head{
    background-color: white;
    padding: 20px;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    .icon{
      width: 4px;
      height: 18px;
      margin-left: 20px;
      background-color: green;
    }
    .title{
      padding-left: 10px;
    }
  }
  .connect-list{
    width: 100%;
    flex: 1;
  }
  .weui-footer{
    margin: 10px 0;
    .text{
      font-size: 14px;
    }
  }
}
</style>
