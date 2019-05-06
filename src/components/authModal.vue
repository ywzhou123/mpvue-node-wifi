<template>
  <view class="modal-box" :hidden="!tip">
    <view class="modal-content">
      <view class="content-title">微信授权</view>
      <img src="/static/image/logo.png" mode="aspectFit" class="logo">
      <view class="content-text">
        畅享无限WiFi码 申请获得以下权限
      </view>
      <hr>
      <view class="content-desc">
        获得你的公开信息（昵称、头像、地区及性别）
      </view>
    </view>
    <view class="modal-btns">
      <view class="weui-flex">
        <view class="weui-flex__item">
          <button class="dialog-btn cancel" @click="hideTip">取消</button>
        </view>
        <view class="weui-flex__item">
          <button class="dialog-btn confirm" open-type="getUserInfo" @getuserinfo="getUserInfo">确认</button>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data () {
    return {
      tip: false
    }
  },
  methods: {
    getUserInfo (e) {
      wx.setStorageSync('userInfo', e.mp.detail.userInfo)
      this.hideTip()
    },
    hideTip () {
      this.tip = false
    },
    showTip () {
      this.tip = true
    }
  }
}
</script>

<style scoped>
.modal-box {
  position: fixed;
  background: rgba(0, 0, 0, 0.4);
  top: 0rpx;
  width: 100%;
  height: 100%;
}

.modal-content {
  background: #fff;
  width: 600rpx;
  margin: 40% auto 0;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #ebebec;

  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 20rpx 20rpx 0 0;
}

.content-title {
  text-align: center;
  font-size: 40rpx;
  padding: 20rpx 0;
  width:100%;
  border-bottom: 1px solid rgba(189, 185, 185, 0.304);
}
.logo{
  height: 100rpx;
  margin: 20rpx 0;
}
.content-text {
  font-size: 30rpx;
  text-align: center;
  margin:20rpx;
}
.content-desc{
  padding:0 80rpx;
  margin-bottom:40rpx;
  font-size: 26rpx;
  color: #999
}
.modal-btns {
  width: 600rpx;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
}

.dialog-btn {
  border-radius: 0;
  background: #fff;
  height: 100rpx;
  width: 100%;
}

.dialog-btn::after {
  border: none;
  border-radius: 0;
}

.cancel {
  color: #ccc;
  border-radius: 0 0 0 20rpx;
}

.confirm {
  border-left: 1px solid #ebebec;
  color: #60d048;
  border-radius: 0 0 20rpx 0;
}
</style>
