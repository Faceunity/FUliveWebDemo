# FULiveWebDemo Guide

## 1.Online Demo
[FULiveWebDemo](https://nama-webdemo.faceunity.com/)
[FULiveWebDemo+Agora](https://nama-webdemo.faceunity.com/agora)
## 2.Running
### 2.1 Develop environment
- It is recommended to use Node.js version 20 or higher.
- Browser compatibility：
   The browser needs to be compatible with WebAssembly, navigator.mediaDevices.getUserMedia, ReadableStream, and WritableStream
  - IOS： Safari >=14.6；
  - Android： Chrome >= 80
  - Windows: Chrome >= 80;  Edge >= 16； Firefox >=100
  - Mac: Chrome >= 80; Firefox >=100;  Safari >=14.6 
- [Download Demo](https://github.com/Faceunity/FUliveWebDemo) 
### 2.2 Source Code and Certificates
- Download source code
- Certificates (optional) are required only if you are working on an independent development project.
  - Request for a certificate (note that it is strongly bound to the access domain)
  - Replace the certificate: Update the corresponding certificate in the CDN.
    ```typescript
    CDNBase + `/authpack.bin`
    ```
    Request certificates：
    1、Call 0571-89774660
    2、Send an email to marketing@faceunity.com for consultation.  
- Agora Authentication (required only for versions with the Agora plugin)
  -   AppId:Configure the AppId issued by Agora
  -   Token(optional): Configure the Token issued by Agora
    ```typescript
    //src/common/global.ts

    export const agoraOptions = {
    // your AppId
    appId: "AppId",
    // your Token(optional)
    token: "Token",
    };
    ```
### 2.3 Running
```typescript
npm install

npm run dev

//Access localhost to launch the demo, and append /agora to the URL to activate the Agora plugin.
```