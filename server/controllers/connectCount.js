const { mysql } = require('../qcloud')

module.exports = async (ctx, next) => {
    if (ctx.state.$wxInfo.loginState === 1) {
        const { wifiId } = ctx.query
        var res = await mysql('connectList')
          .where('wifi_id', wifiId)
          .sum('count as count')
          .groupBy('wifi_id')
        ctx.state.data = res
        ctx.state.code = 200
    } else {
        ctx.state.code = -1
    }
}
