<template>
  <section class="container">
    <section class="banner-wrap">
      <!-- lazy-load -->
      <img class="home-banner" src="/static/image/home-banner.png" alt="" mode='aspectFit'>
      <div class="title">
        <h1>首页</h1>
        <span>欢迎使用畅享无线~</span>
      </div>
      <div class="userinfo">
        <img class="avatar" v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" mode='aspectFit'/>
        <button class="btn-login" v-if="!userInfo.avatarUrl"  open-type="getUserInfo" @getuserinfo="getUserInfo">
          登录
        </button>
      </div>
    </section>
    <section class="create-btn-wrap">
      <button class="weui-btn" type="primary" @click="createWifiHandle">创建WiFi码</button>
    </section>
    <section class="wifi-list-wrap" v-if="getWifiListSorted.length">
      <div class="title">
        <div class="tag"></div>
        <h2>我的分享码</h2>
      </div>
      <div class="wifi-list">
        <div class="wifi-item" v-for="(item, index) in getWifiListSorted" :key="index" @click="clickWifiHandle(item.id)">
          <wifi :wifi="item"></wifi>
        </div>
      </div>
    </section>
    <section class="connect-list-wrap" v-if="getConnectListSorted.length">
      <div class="title">
        <div class="tag"></div>
        <h2>最近连接</h2>
      </div>
      <div class="connect-list">
        <div  v-for="(item, index) in getConnectListSorted" :key="index"
          @click="clickConnectHandle(item.wifi_id)">
          <connect :connect="item"></connect>
        </div>
      </div>
    </section>
    <FooterComp/>
    <auth-modal/>
  </section>
</template>

<script>
import wifi from '@/components/wifi'
import connect from '@/components/connect'
import blank from '@/components/blank'
import authModal from '@/components/authModal'
import FooterComp from '@/components/FooterComp'
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
    authModal,
    FooterComp
  },
  computed: {
    ...mapState('index', ['userInfo', 'wifiList', 'connectList']),
    getWifiListSorted () {
      return [...this.wifiList, ...this.wifiList, ...this.wifiList].sort((a, b) => sortTime(a.create, b.create, 'desc'))
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
  background-color: #ffffff;
  .banner-wrap {
    position: relative;
    .home-banner{
      width: 100%;
      height: 392rpx;
    }
    .title{
      position: absolute;
      top: 36rpx;
      left: 36rpx;
      h1{
        color:#181818;
        font-size: 48rpx;
        line-height: 67rpx;
        padding-bottom: 10rpx;
      }
      span{
        color: #777777;
        font-size: 28rpx;
        line-height: 40rpx;
      }
    }
    .userinfo{
      position: absolute;
      top:36rpx;
      right: 36rpx;
      .avatar{
        width: 108rpx;
        height: 108rpx;
        border-radius: 50%;
      }
      .btn-login{
        width: auto;
        height: 108rpx;
        line-height: 108rpx;
        border-radius:50%;
        background-color:#eee;
        &::after{
          border: 0;
        }
      }
    }
  }
  .create-btn-wrap{
    padding: 40rpx 36rpx 0;
    box-sizing:border-box;
    .weui-btn{
      width: 100%;
      height: 88rpx;
      border-radius: 48rpx;
      background:linear-gradient(93deg,rgba(5,221,124,1) 0%,rgba(2,201,158,1) 50%,rgba(0,183,197,1) 100%);
      box-shadow:0 20rpx 40rpx rgba(2,200,160,0.2);

      font-size:36rpx;
      font-weight:bold;
      line-height:88rpx;
      color: #ffffff;
    }
  }
  .wifi-list-wrap,
  .connect-list-wrap{
    .title{
      display: flex;
      align-items: center;
      .tag {
        width: 10rpx;
        height: 50rpx;
        margin-left: 44rpx;
        border-radius:19rpx;
        background-color: #02C9A0;
        box-shadow:-5rpx 5rpx 12rpx rgba(2,201,160,0.3);
      }
      h2{
        padding-left: 36rpx;
        font-size: 36rpx;
        line-height: 50rpx;
        color: #181818;
      }
    }
  }
  .wifi-list-wrap {
    padding-top: 80rpx;
    .wifi-list{
      padding: 60rpx 0;
      display: flex;
      overflow-x: scroll;
      overflow-y: hidden;
      .wifi-item{
        position: relative;
        padding-right: 40rpx;
      }
      .wifi-item:first-child {
        padding-left: 36rpx;
      }
    }
  }
  .connect-list-wrap{
    padding-bottom: 161rpx;
  }
}
</style>
