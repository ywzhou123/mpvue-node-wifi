<script>
// import qcloud from 'wafer2-client-sdk'
// import config from './config'
// export default {
//   created () {
//     const user = wx.getStorageSync('userInfo')
//     console.log('user: ', user)
//     if (!user) {
//       qcloud.setLoginUrl(config.loginUrl)
//       qcloud.login({
//         success (userInfo) {
//           console.log('登录成功：', userInfo)
//           wx.setStorageSync('userInfo', userInfo)
//         },
//         fail (err) {
//           console.log('登录失败', err)
//         }
//       })
//     }
//   }
// }
</script>

<style>
page {
  background-color: #eeeeee;
}
.container {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}
</style>
