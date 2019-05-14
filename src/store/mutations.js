// 处理数据
export default {
  updateState (state, data) {
    if (data instanceof Object) {
      Object.keys(data).map(k => {
        if (data[k] !== undefined) {
          state[k] = data[k]
        }
      })
    }
  }
}
