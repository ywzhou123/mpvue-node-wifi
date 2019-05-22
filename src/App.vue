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
</style>
