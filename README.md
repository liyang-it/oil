# 用于查询农产品、全国油价的APP

# 框架使用 UniApp开发

## 开始
安装依赖
```bash
npm i
```
直接HbuilderX运行

# 第三方组件库

## UI库
[uView-PLUS](https://ext.dcloud.net.cn/plugin?name=uview-plus)

# 第三方接口调用服务
`api-service` 服务使用Node.js开发，相当于一个中间件调用第三方接口，因为有些api接口直接使用浏览器环境调用会出现跨域异常，这时候可以改为 浏览器请求node,node再去请求真实的api接口

`api-service` 可以部署在vercel(免费)