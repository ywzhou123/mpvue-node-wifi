const { mysql } = require('../qcloud')

module.exports = async (ctx, next) => {
    if (ctx.state.$wxInfo.loginState === 1) {
        const userinfo = ctx.state.$wxInfo.userinfo
        var res = await mysql('wifiList')
          .where({'open_id': userinfo.openId, deltag: 0})
          .orderBy('create', 'desc')
          .limit(20)
        ctx.state.data = res
        ctx.state.code = 200
    } else {
        ctx.state.code = -1
    }
}
