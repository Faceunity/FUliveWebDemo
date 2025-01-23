# FULiveWebDemo 运行文档

## 1.线上体验Demo
[FULiveWebDemo](https://nama-webdemo.faceunity.com/)
[FULiveWebDemo+Agora](https://nama-webdemo.faceunity.com/agora)
## 2.运行
### 2.1 开发环境
- Node.js 建议版本大于等于20
- 浏览器的理论兼容性：
   需要兼容WebAssembly、navigator.mediaDevices.getUserMedia、ReadableStream 、WritableStream
  - IOS： Safari >=14.6；
  - Android： Chrome >= 80
  - Windows: Chrome >= 80;  Edge >= 16； Firefox >=100
  - Mac: Chrome >= 80; Firefox >=100;  Safari >=14.6 
- [下载Demo](https://github.com/Faceunity/FUliveWebDemo) 
### 2.2 源代码与证书
- 下载源代码
- 证书（非必须），如果是独立开发项目，才需要自行申请证书。
  - 申请证书（注意与访问域名强绑定的）
  - 替换证书： 更换CDN内对应的证书。
    ```typescript
    // CDNBase  是所有bunlde等镜头资源cdn 地址
    CDNBase + `/authpack.bin`
    ```
    获取证书方法：
    1、拨打电话 0571-89774660
    2、发送邮件至 marketing@faceunity.com 进行咨询。  
- 声网鉴权（仅带声网插件的版本需要）
  -   AppId:配置声网下发的AppId
  -   Token(可选项): 配置声网下发的token
    ```typescript
    //src/common/global.ts

    export const agoraOptions = {
    // 配置你的AppId
    appId: "AppId",
    // 配置你的Token(可选)
    token: "Token",
    };
    ```
### 2.3 运行
```typescript
npm install

npm run dev

//访问localhost启动FU体验demo，加入后缀/agora启动声网插件
```