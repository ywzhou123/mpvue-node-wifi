const isProduction = process.env['NODE_ENV'] === 'production'

let CONF = {
    serverHost: '192.168.100.5',
    tunnelServerUrl: '',
    tunnelSignatureKey: '27fb7d1c161b7ca52d73cce0f1d833f9f5b5ec89',
    // 腾讯云相关配置可以查看云 API 密钥控制台：https://console.cloud.tencent.com/capi
    qcloudAppId: '1256775876', // '您的腾讯云 AppID',
    qcloudSecretId: 'AKIDnL79vXwyWq1JNIt3zkHZ0DwZ5yc1BAvL', // '您的腾讯云 SecretId',
    qcloudSecretKey: 'OWUDhgvBDfrukhSxKEn6HGyUtKekcK7h', // '您的腾讯云 SecretKey',
    networkTimeout: 30000,

    port: '5757',
    rootPathname: '',

    // 微信小程序 App ID
    appId: 'wxd8a26b2c1042fa2a',

    // 微信小程序 App Secret
    appSecret: '38d0fa7b9a14e38ee2bfc4a696f94e08',

    // 是否使用腾讯云代理登录小程序，使用自已的服务器改为false
    useQcloudLogin: true,

    /**
     * MySQL 配置，用来存储 session 和用户信息
     * 若使用了腾讯云微信小程序解决方案
     * 开发环境下，MySQL 的初始密码为您的微信小程序 appid
     */
    mysql: {
        host: 'localhost',
        port: 3306,
        user: 'root',
        db: 'cAuth',
        pass: '123456',
        char: 'utf8mb4'
    },

    cos: {
        /**
         * 地区简称
         * @查看 https://cloud.tencent.com/document/product/436/6224
         */
        region: 'ap-guangzhou',
        // Bucket 名称
        fileBucket: 'qcloudtest',
        // 文件夹
        uploadFolder: ''
    },

    // 微信登录态有效期
    wxLoginExpires: 7200,
    wxMessageToken: 'abcdefgh'
}
if (isProduction) {
    CONF = Object.assign({}, CONF, {
        serverHost: 'localhost',
        tunnelServerUrl: '',
        tunnelSignatureKey: '',
        qcloudAppId: '',
        qcloudSecretId: '',
        qcloudSecretKey: '',
        useQcloudLogin: false,
        rootPathname: '/opt/freeflow',
        mysql: {
            host: 'localhost',
            port: 3306,
            user: 'root',
            db: 'FreeFlow',
            pass: '123456',
            char: 'utf8mb4'
        }
    })
}
module.exports = CONF
