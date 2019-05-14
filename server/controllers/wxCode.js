const request = require('request')
const config = require('../config')

const getAccessToken = async () => {
    var url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${config.appId}&secret=${config.appSecret}`
    return new Promise((resolve, reject) => {
        try {
            request(url, (err, resp, body) => {
                if (!err && resp.statusCode === 200) return resolve(JSON.parse(body))
                return reject(err)
            })
        } catch (err) {
            return reject(err)
        }
    })
}

const getWXACode = async (wifiId = '') => {
    const accessToken = await getAccessToken()
    const postData = {
        scene: wifiId,
        page: 'pages/connect/main',
        width: 430
        // auto_color: true,
        // is_hyaline: event.is_hyaline
    }
    let url = `https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=${accessToken['access_token']}`
    let options = {
        url,
        method: 'POST',
        encoding: 'base64',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(postData)
    }
    return new Promise((resolve, reject) => {
        request(options, (err, res, body) => {
            if (!err && res.statusCode === 200) return resolve(body)
        })
    })
}

module.exports = async (ctx, next) => {
    const { wifiId } = ctx.query
    ctx.state.data = await getWXACode(wifiId)
    ctx.state.code = 200
}

// // 这里应该加一个判断的，因为可能请求失败，返回另一个 JSON 对象。
// global.access_token = Object.assign(accessTokenObj, {timestamp: +new Date()});

// const access_token = global.access_token.access_token;

// const post_data = JSON.stringify({
//     scene: uid,     // 最多32个字符。
//     width: 200,     // 生成的小程序码宽度。
// });

// 获取图片二进制流
// const {imgBuffer, contentType} = await new Promise((resolve, reject) => {
//     let req = https.request(options, (res) => {
//         let resData = '';
//         res.setEncoding("binary");
//         res.on('data', data => {
//             resData += data;
//         });
//         res.on('end', () => {
//             // 微信api可能返回json，也可能返回图片二进制流。这里要做个判断。
//             const contentType = res.headers['content-type'];
//             if ( !contentType.includes('image') ) {
//                 console.log('获取小程序码图片失败，微信api返回的json为：')
//                 console.log( JSON.parse(resData) )
//                 return resolve(null);
//             }
//             const imgBuffer = Buffer.from(resData, 'binary');
//             resolve( {imgBuffer, contentType} );
//         });
//     });
//     req.on('error', (e) => {
//         console.log('获取微信小程序图片失败')
//         console.error(e);
//     });
//     req.write(post_data);   // 写入 post 请求的请求主体。
//     req.end();
// }).catch(() => {
//     return null;
// });

// if (imgBuffer == null) {
//     ctx.body = {code: 223, msg: '获取小程序码失败'};
//     return;
// }
// ctx.res.setHeader('Content-type', contentType);
// ctx.body = imgBuffer;
