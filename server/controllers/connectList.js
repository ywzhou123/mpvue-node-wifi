const { mysql } = require('../qcloud')

module.exports = async (ctx, next) => {
    if (ctx.state.$wxInfo.loginState === 1) {
        const userinfo = ctx.state.$wxInfo.userinfo
        var res = await mysql('connectList')
          .where('connectList.open_id', userinfo.openId)
          .innerJoin('wifiList', 'connectList.wifi_id', '=', 'wifiList.id')
          .orderBy('time', 'desc')
          .limit(20)
        ctx.state.data = res
        ctx.state.code = 200
    } else {
        ctx.state.code = -1
    }
}
