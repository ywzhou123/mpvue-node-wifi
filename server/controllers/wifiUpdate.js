const { mysql } = require('../qcloud')

module.exports = async (ctx, next) => {
    const { id, title, remark, pass } = ctx.request.body
    if (ctx.state.$wxInfo.loginState === 1) {
        const userinfo = ctx.state.$wxInfo.userinfo
        var res = await mysql('wifiList')
          .where({id, open_id: userinfo.openId})
          .update({
              title, remark, pass
          })
        ctx.state.data = res
        ctx.state.code = 200
    } else {
        ctx.state.code = -1
    }
}
