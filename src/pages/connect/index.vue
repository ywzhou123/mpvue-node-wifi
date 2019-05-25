<template>
  <section class="container">
    <header>
      <div class="title">
        <h1>欢迎使用畅享无限WIFI</h1>
        <span>点击连接即可使用WIFI</span>
      </div>
    </header>
    <section class="content-wrap">
      <div class="content">
        <div class="title">
          <h2>{{wifi.title}}</h2>
          <div class="circle1"></div>
          <div class="circle2"></div>
        </div>
        <img src="/static/image/logo.png" alt="" class="logo">
        <h2 class="ssid">{{wifi.ssid}}</h2>
        <span class="remark">{{wifi.remark}}</span>
        <section class="btn-wrap">
          <button
            class="weui-btn btn-main"
            type="primary"
            :disabled="!wifi.id"
            @click="clickHandle"
          >连接WIFI</button>
        </section>
      </div>
    </section>
    <FooterComp/>
    <auth-modal/>
  </section>
</template>

<script>
import authModal from '@/components/authModal'
import FooterComp from '@/components/FooterComp'
import * as Vuex from 'vuex'
const { mapState, mapActions } = Vuex.createNamespacedHelpers(
  'connect'
)
export default {
  components: {
    FooterComp,
    authModal
  },
  computed: {
    ...mapState(['wifi'])
    // backgroundImage () {
    //   let base64 = wx.getFileSystemManager().readFileSync('/static/image/background.png', 'base64')
    //   return `url(data:image/jpg;base64,${base64})`
    // }
  },
  methods: {
    ...mapActions(['getWifiDetail']),
    clickHandle (e) {
      wx.navigateTo({
        url: `/pages/connecting/main?wifi_id=${this.wifi._id}`
      })
    }
  },
  mounted () {
    var wifiId
    var query = this.$root.$mp.query

    if (query.scene && query.scene !== 'scene') {
      wifiId = decodeURIComponent(query.scene)
    } else {
      wifiId = query.wifi_id
    }

    if (wifiId) {
      this.getWifiDetail(wifiId)
    } else {
      wx.showToast({
        icon: 'none',
        title: '请求参数错误'
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.container {
  .content-wrap{
    flex: 1;
    padding: 80rpx 60rpx 0;
    .content{
      height: 866rpx;
      text-align: center;
      box-shadow:0px 30rpx 80rpx rgba(234,238,246,1);
      border-radius:34rpx;
      position: relative;
      .title{
        position: relative;
        overflow: hidden;
        height: 277rpx;
        background:linear-gradient(135deg,rgba(5,221,125,1) 0%,rgba(0,184,196,1) 100%);
        border-radius:34rpx 34rpx 0px 0px;
        h2{
          font-size: 32rpx;
          line-height: 45rpx;
          color: #ffffff;
          padding-top: 61rpx;
        }
        .circle1,.circle2{
          position: absolute;
          width:87rpx;
          height:87rpx;
          background:linear-gradient(313deg,rgba(0,185,193,1) 0%,rgba(4,218,130,1) 100%);
          border-radius:50%;
        }
        .circle1{
          left: -20rpx;
          top: -15rpx;
          width: 175rpx;
          height: 175rpx;
        }
        .circle2{
          right: 19rpx;
          bottom: 25rpx;
        }
      }
      img.logo{
        width: 222rpx;
        height: 222rpx;
        position: relative;
        border-radius: 50%;
        margin: -100rpx auto 0;
      }
      .ssid{
        font-size: 36rpx;
        line-height: 50rpx;
        padding-top: 40rpx;
      }
      .remark{
        font-size: 28rpx;
        line-height: 40rpx;
        color: #777777;
        padding-top: 36rpx;
      }
      .btn-wrap{
        position: absolute;
        bottom: 94rpx;
        padding: 0 97rpx;
      }
    }
  }
}
</style>
