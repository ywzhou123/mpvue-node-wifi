# FreeFlow

  畅享无限WIFI微信小程序，可分享wifi信息，可保存海报打印成贴纸，点击分享链接或扫码免密连接wifi。省去wifi咨询、密码暴露等问题。

  项目基于mpvue框架开发前端页面
  后端使用腾讯云node+mysql开发，微信公众后台可进行开通，提供开发和生产两个环境，部署比较方便。

  server目录是node端代码

### 说明

  连接Wifi:
    仅 Android 与 iOS 11 以上版本支持

  获取Wifi列表:
    iOS 将跳转到系统的 Wi-Fi 界面，Android 不会跳转。
    iOS 11.0 及 iOS 11.1 两个版本因系统问题，该方法失效。
    目前存在跳转到系统权限设置页面的bug，需要用户点击左上角“设置”返回，然后点击“无线局域网”，最后点击左上解“微信”返回到页面。
    [BUG](https://developers.weixin.qq.com/community/develop/doc/000c02f4990080871047570655ac00)

# 操作步骤

## 初始化

```bash
  npm install vue-cli nodemon -g
  vue init mpvue/mpvue-quickstart freeflow
  cd freeflow
  npm install
  # npm i -D node-sass sass-loader
  # npm i wafer2-client-sdk -S
  npm run dev

  # 安装数据库
  brew install mysql
  mysql.server start
  create database cAuth;

  # 初始化数据库
  cd server
  npm install
  node tools/initdb.js

  # 启动开发环境
  npm run dev
```

## 相关文档：

[wafer2-client-sdk](https://cloud.tencent.com/document/product/619/11449)
[设置nodejs本地开发环境](https://cloud.tencent.com/document/product/619/12794)
[设置腾讯云Api密钥](https://console.cloud.tencent.com/cam/capi)


