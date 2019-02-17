# freeflow

> 畅享无限

## Build Setup

``` bash
# 初始化项目
vue init mpvue/mpvue-quickstart myproject
cd myproject

# 安装依赖
yarn

# 开发时构建
npm dev

# 打包构建
npm build

# 指定平台的开发时构建(微信、百度、头条、支付宝)
npm dev:wx
npm dev:swan
npm dev:tt
npm dev:my

# 指定平台的打包构建
npm build:wx
npm build:swan
npm build:tt
npm build:my

# 生成 bundle 分析报告
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).



# 操作步骤
## 初始化
  npm install vue-cli nodemon -g
  vue init mpvue/mpvue-quickstart freeflow
  cd freeflow
  npm install
  npm i -D node-sass sass-loader
  npm i wafer2-client-sdk -S
  npm run dev

  安装数据库
  brew install mysql
  mysql.server start
  create database cAuth;

  初始化数据库
  cd server
  npm install
  node tools/initdb.js
  npm run dev

  相关文档：
  [wafer2-client-sdk](https://cloud.tencent.com/document/product/619/11449)
  [设置nodejs本地开发环境](https://cloud.tencent.com/document/product/619/12794)
  [设置腾讯云Api密钥](https://console.cloud.tencent.com/cam/capi)


