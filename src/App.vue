<script>
import {
  mapActions
} from 'vuex'

export default {
  methods: {
    ...mapActions('index', ['getAuthSetting']),
    ...mapActions(['getSystemInfo'])
  },
  created () {
    this.getAuthSetting()
    this.getSystemInfo()
  }
}
</script>

<style lang='scss'>
page {
  background-color: #eeeeee;
}
.container {
  min-height: 100vh;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  background-color: #ffffff;
  color: #181818;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
section, header, footer{
  width: 100%;
  box-sizing: border-box
}
img{
  display: block;
}
button::after{
  border: 0;
}
header{
  padding: 0 36rpx;
  .title{
    h1{
      padding-top: 36rpx;
      font-size: 48rpx;
      line-height: 67rpx;
    }
    span{
      display: block;
      padding-top: 10rpx;
      color: #777777;
      font-size: 28rpx;
      line-height: 40rpx;
    }
  }
}
.list-title{
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
    // color: #181818;
  }
}

.weui-btn.btn-main{
  width: 100%;
  height:88rpx;
  margin-top: 60rpx;
  line-height: 88rpx;
  color: #ffffff;
  font-size: 36rpx;
  background:linear-gradient(93deg,rgba(5,221,124,1) 0%,rgba(2,201,158,1) 50%,rgba(0,183,197,1) 100%);
  box-shadow:0px 20rpx 40rpx rgba(2,200,160,0.2);
  border-radius:48rpx;
  &.disabled{
    box-shadow: none;
    background: rgba(152, 151, 151, 0.7);
  }
}
</style>
