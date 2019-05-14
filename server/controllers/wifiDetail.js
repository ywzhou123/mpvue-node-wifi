const { mysql } = require('../qcloud')

module.exports = async (ctx, next) => {
    const { wifiId } = ctx.query
    var res = await mysql('wifiList')
      .where('id', wifiId)
    ctx.state.data = res[0]
    ctx.state.code = 200
}
