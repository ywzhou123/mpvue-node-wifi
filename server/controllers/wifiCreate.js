const { mysql } = require('../qcloud')

module.exports = async (ctx, next) => {
    const { title, remark, ssid, bssid, pass } = ctx.request.body
    if (ctx.state.$wxInfo.loginState === 1) {
        const userinfo = ctx.state.$wxInfo.userinfo
        const res = await mysql('wifiList')
          .insert({
              title, remark, ssid, bssid, pass, 'open_id': userinfo.openId
          })
        ctx.state.data = res
        ctx.state.code = 200
    } else {
        ctx.state.code = -1
    }
}
