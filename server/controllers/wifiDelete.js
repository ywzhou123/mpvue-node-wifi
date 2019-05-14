const { mysql } = require('../qcloud')

module.exports = async (ctx, next) => {
    if (ctx.state.$wxInfo.loginState === 1) {
        const { wifiId } = ctx.query
        const userinfo = ctx.state.$wxInfo.userinfo
        var res = await mysql('wifiList')
          .where({id: wifiId, open_id: userinfo.openId})
          .update({ deltag: 1 })
        ctx.state.data = res
        ctx.state.code = 200
    } else {
        ctx.state.code = -1
    }
}
