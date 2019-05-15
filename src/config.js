// const host = 'http://192.168.31.207:5757'
// const host = 'http://106.12.130.102:5757'
const host = 'https://freeflow.api.ywzhou.shop'

const config = {
  host,
  loginUrl: `${host}/weapp/login`,
  user: `${host}/weapp/user`,
  wxCode: `${host}/weapp/wxCode`,
  wifiList: `${host}/weapp/wifiList`,
  wifiDetail: `${host}/weapp/wifiDetail`,
  wifiDelete: `${host}/weapp/wifiDelete`,
  wifiCreate: `${host}/weapp/wifiCreate`,
  wifiUpdate: `${host}/weapp/wifiUpdate`,
  connectList: `${host}/weapp/connectList`,
  connectCount: `${host}/weapp/connectCount`,
  connectWifi: `${host}/weapp/connectWifi`
}

export default config
