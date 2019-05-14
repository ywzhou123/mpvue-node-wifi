<template>
  <div class="container">
    <div class="codepic-cont">
      <button open-type="share" class="sharebtn">
        <img src="/static/image/share.png" alt class="share" @click="shareHandle">
      </button>
      <img src="/static/image/edit.png" alt class="update" @click="updateHandle">
      <img src="/static/image/delete.png" alt class="delete" @click="deleteHandle">
    </div>
    <canvas class="canvas" canvas-id="canvas" @click="onPreviewImage"></canvas>
    <span class="desc">点击查看大图，分享给朋友</span>
    <span class="continue" @click="continueHandle">继续创建</span>
    <span class="back" @click="homeHandle">返回首页</span>
  </div>
</template>

<script>
import * as Vuex from 'vuex'
const { mapState, mapActions } = Vuex.createNamespacedHelpers(
  'detail'
)

export default {
  onShareAppMessage () {
    return {
      title: `邀请你连接${this.wifi.ssid}`,
      path: `/pages/connect/main?wifi_id=${this.wifi.id}`
    }
  },
  computed: {
    ...mapState(['wifi', 'wxCode', 'canvasImagePath']),
    ...Vuex.mapState(['ratio'])
  },
  methods: {
    ...mapActions(['getWifiDetail', 'getWxCode', 'setCanvasImagePath', 'deleteWifi']),
    ...Vuex.mapActions('index', ['getWifiList']),
    // canvas绘图
    createNewImage () {
      wx.showLoading({
        title: '生成中'
      })
      var that = this
      var ctx = wx.createCanvasContext('canvas', this)
      const { title, ssid, remark } = that.wifi
      // 把模板图片绘制到canvas上
      const ratio = 2 / that.ratio
      ctx.width = 225 * ratio
      // 白色背景
      ctx.setFillStyle('white')
      ctx.fillRect(0, 0, ctx.width, 350 * ratio)
      // 小程序码图
      // eslint-disable-next-line no-undef
      // var wxCodeImg = new Image()
      // wxCodeImg.src = that.wxCode
      console.log(that.wxCode)
      ctx.drawImage(
        that.wxCode,
        125 * ratio / 2,
        160 * ratio / 2,
        200 * ratio / 2,
        200 * ratio / 2
      ) // px
      ctx.setFontSize(12) // 设置字体大小，默认10
      ctx.setFillStyle('black')
      // ctx.setFillStyle('#5F6FEE')//文字颜色：默认黑色
      ctx.fillText(
        title,
        (ctx.width - ctx.measureText(title).width * ratio) / 2,
        40 * ratio
      )
      // 说明文字
      const desc = '扫一扫，连接WiFi'
      ctx.setFontSize(20) // 设置字体大小，默认10
      ctx.setFillStyle('black')
      ctx.fillText(
        desc,
        (ctx.width - ctx.measureText(desc).width * ratio) / 2,
        240 * ratio
      )
      // ssid文字
      ctx.setFontSize(12) // 设置字体大小，默认10
      ctx.setFillStyle('black')
      const ssidX = (ctx.width - ctx.measureText(ssid).width * ratio) / 2
      ctx.fillText(ssid, ssidX, 280 * ratio)
      ctx.drawImage(
        '/static/image/wifi-green.png',
        ssidX - 26 * ratio,
        266 * ratio,
        18 * ratio,
        18 * ratio
      )
      // 备注文字
      ctx.setFontSize(12) // 设置字体大小，默认10
      ctx.setFillStyle('rgba(196, 164, 164, 0.603)')
      ctx.fillText(
        remark,
        (ctx.width - ctx.measureText(remark).width * ratio) / 2,
        320 * ratio
      )
      // 底部背景
      ctx.setFillStyle('green')
      ctx.fillRect(0, 340 * ratio, 225 * ratio, 350 * ratio)
      // 底部文字
      ctx.setFillStyle('white')
      // ctx.font = "small-caps bold 35px Arial";//设置用户文本填充颜色
      ctx.setFontSize(4) // 设置字体大小，默认10
      const company = '畅享无限WiFi码'
      const companyX = (ctx.width - ctx.measureText(company).width * ratio) / 2
      ctx.fillText(company, companyX, 345 * ratio)
      ctx.drawImage(
        '/static/image/logo.png',
        companyX - 12 * ratio,
        340 * ratio,
        10 * ratio,
        10 * ratio
      )
      ctx.setFontSize(3) // 设置字体大小，默认10
      const by = 'Powered by ywzhou'
      ctx.fillText(by, companyX, 348 * ratio)

      ctx.draw() // 绘制图片
      that.savePic()
    },
    // 保存海报图片
    savePic () {
      let that = this
      const ratio = 2 / that.ratio
      setTimeout(() => {
        wx.canvasToTempFilePath(
          {
            x: 0,
            y: 0,
            width: 225 * ratio,
            height: 350 * ratio,
            canvasId: 'canvas',
            success (res) {
              that.setCanvasImagePath(res.tempFilePath)
            },
            fail (e) {
              console.log(e)
            },
            complete () {
              wx.hideLoading()
            }
          },
          this
        )
      }, 2000)
    },
    onPreviewImage () {
      const urls = [this.canvasImagePath]
      wx.previewImage({
        urls
      })
    },
    homeHandle () {
      this.getWifiList()
      wx.reLaunch({
        url: '/pages/index/main'
      })
    },
    continueHandle () {
      wx.navigateTo({
        url: '/pages/wifilist/main'
      })
    },
    updateHandle () {
      wx.navigateTo({
        url: '/pages/create/main?edit=1'
      })
    },
    deleteHandle () {
      var that = this
      wx.showModal({
        title: '您确定要删除吗',
        success (res) {
          if (res.confirm) {
            that.deleteWifi()
          }
        }
      })
    }
  },
  mounted () {
    const that = this
    const wifiId = this.$root.$mp.query.wifi_id
    if (wifiId) {
      this.getWifiDetail(wifiId).then(res => {
        that.getWxCode(wifiId).then(r => {
          that.createNewImage()
        })
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.container{
  .canvas {
    background-color: white;
    /* margin: 40rpx 0; */
    width: 225px;
    height: 350px;
  }
  .codepic-cont,
  .weui-btn {
    margin-top: 40rpx;
    width: 60%;
  }
  .codepic-cont {
    .share,
    .update,
    .delete {
      background-color: #aaa;
      width: 40rpx;
      height: 40rpx;
      padding: 10rpx;
    }
    .sharebtn {
      background-color: transparent;
      position: absolute;
      right: 60rpx;
      top: 40rpx;
      padding: 0;
      border-radius: 0;
      box-sizing: unset;
    }
    button::after {
      border: none;
    }

    .update {
      position: absolute;
      right: 60rpx;
      top: 120rpx;
    }
    .delete {
      position: absolute;
      right: 60rpx;
      top: 200rpx;
    }
  }
  .desc {
    font-size: 12px;
    color: rgba(196, 164, 164, 0.603);
    text-align: center;
    margin: 40rpx;
  }
  .continue,
  .back {
    font-size: 18px;
    color: green;
    margin-bottom: 50rpx;
  }
}
</style>
