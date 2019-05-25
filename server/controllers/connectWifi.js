const { mysql } = require('../qcloud')

module.exports = async (ctx, next) => {
    if (ctx.state.$wxInfo.loginState === 1) {
        const { wifiId } = ctx.request.body
        const userinfo = ctx.state.$wxInfo.userinfo
        var res = await mysql('connectList')
          .where({wifi_id: wifiId, open_id: userinfo.openId})
        if (res.length) {
            res = await mysql('connectList')
              .where({'wifi_id': wifiId, 'open_id': userinfo.openId})
              .increment('count', 1)
        } else {
            res = await mysql('connectList').insert({
                wifi_id: wifiId,
                open_id: userinfo.openId
            })
        }
        ctx.state.data = res
        ctx.state.code = 200
    } else {
        ctx.state.code = -1
    }
}
