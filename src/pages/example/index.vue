<template>
  <section class="container">
    <header>
      <div class="title">
        <h1>WIFI码示例</h1>
      </div>
    </header>
    <section class="example-wrap">
      <div class="example">
        <h1>这里是欢迎语~</h1>
        <img src="/static/image/code.jpg" alt="" class="code">
        <h2>这里是WIFI名称</h2>
        <span>这里是备注</span>
      </div>
    </section>
  </section>
</template>

<script>

export default {

}
</script>

<style lang='scss' scoped>
.container {
  justify-content: flex-start;
  .example-wrap{
    padding: 129rpx 105rpx 0;
    .example{
      height: 714rpx;
      border-radius: 25rpx;
      box-shadow: 0 0 30rpx #EAEEF6;
      text-align: center;
      h1{
        background-color: #02C9A0;
        line-height: 174rpx;
        color: #ffffff;
        font-size: 36rpx;
        border-radius: 25rpx 25rpx 0 0;
      }
      h2{
        font-size: 34rpx;
        line-height: 48rpx;
        padding-top: 40rpx;
      }
      span{
        display: block;
        font-size: 22rpx;
        line-height: 30rpx;
        padding-top: 16rpx;
      }
      img{
        width: 310rpx;
        height: 310rpx;
        padding-top: 36rpx;
        margin: 0 auto;
      }
    }
  }
}
</style>
