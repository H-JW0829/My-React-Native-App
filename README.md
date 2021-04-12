# My-React-Native-App
基于expo搭建的React Native+Node.js仿闲鱼(项目代号：闲猪)项目

## 技术栈
前端基于[expo](https://docs.expo.io/)搭建（通用的React应用程序框架和平台，围绕React Native和native平台的工具集），表单采用[formik](https://formik.org/)，状态管理采用[mobx](https://cn.mobx.js.org/)
后端基于Node.js的[koa2](https://koa.bootcss.com/)框架搭建一个简单的服务器
数据库采用MongoDB，同时采用Socket.io进行服务器和客户端的即时通讯

## 环境
在真机环境下可以安装Expo Go，在expo的官网有具体的安装步骤，支持你在真机下查看应用程序的效果
此外还可以在电脑上安装ios和安卓模拟器，直接在模拟器上查看应用程序，具体安装步骤在React Native官网有说明：[React Native官网](https://www.react-native.cn/docs/environment-setup)

## 项目克隆和启动
1.克隆项目到本地：
```
git clone https://github.com/H-JW0829/My-React-Native-App.git
```
2.安装依赖模块：
```
yarn install
```
3.运行项目：
```
expo start
```
4.项目启动后会自动打开一个网页，里面有二维码（安卓expo go客户端扫码可以运行应用程序），ios expo go客户端需要登陆你的expo账号，登录后在expo go可以看到你的app项目
5.也可以“Run on iOS simulator”或者“Run on Android device/emulator”来在模拟器上运行应用程序

## 目录结构
├── app                         // 应用代码  
>├── config                  // 配置信息  
>>├── color.ts  
>>├── styles.ts   
>>├── commonVar.ts          // 在此修改后端端口号和socket服务器端口   
>├── page                    // 页面  
>├── component               // 组件  
>├── store                   // mobx状态管理   
>├── common                  // 公用方法  
>├── assets                  // 静态资源  

├── App.tsx                     // 根入口  
