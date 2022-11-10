# web-cli

* 基于ts开发可以避免上线时的很多错误
* 框架按需加载meri-design的组件，减少热启动编译速度和打包体积
* 自动处理页面跳转loading
* 自动处理面包屑记录
* 页面缓存机制
* 自测单元
* 同步meri-desin的theme主题
* 自动注册组件、路由、方法等
* vuex 存储用户信息
* 封装友好的方法，如登录、上传、下载
* 自动处理打包信息

## 操作命令

| 操作 | 命令                    |
| ------------- | ----------- |
| 启动      | npm run serve       |
| 打包   | npm run build     |
| 单元测试   | npm run test:unit     |
| 语法检查   | npm run lint     |

## 配置
### 代理
`vue.config.js`
```javascript
const proxy = 'http://192.168.100.236' // 需要代理请求的nginx地址
```
### 项目信息
`package.json`
```javascript
  "name": "web-cli", // 前端项目名称，如electronicpatrol
  "title": "前端框架", // 产品名称，如电子巡更
  "version": "0.1.0", // 产品版本号,如v1.0.0
```

## 组件
### 按需注册meri-design组件
`src/utils/components.ts`
```javascript
import { Button, Message, Loading } from 'meri-design'
export default (Vue: any) => {
  Vue.use(Button)
  Vue.prototype.$message = Message
  Vue.prototype.$loading = Loading
}
```
### 注册全局组件
`src/components/common`

该文件下的vue组件，会自动注册为全局组件。

## 路由
`src/router`自动注册该文件夹导出的路由
```javascript
const list = () => import('@/views/notice/list.vue')
export default [
  {
    path: '/list',
    name: 'list',
    component: list,
    meta: {
      keepAlive: true, //是否需要缓存组件
      title: '公告管理' //面包屑记录的页面标题
    }
  }
]
```
## 请求
`src/api`该文件下导出的url会自动挂载到vue原型链上
```javascript
this.$axios.post(this.$api.xxx,{params})
```
## 方法
### 判断用户是否有资源权限
```javascript
state.authId.includes(key)
```
### 取用户相关信息
```javascript
const {user_id, person_id,xx} = state.userInfo
```

## 规范

* [代码管理规范](https://thoughts.teambition.com/workspaces/5eb42f82399747001a74bd94/docs/5eb430869f61dd00011b61bb)

* [开发提测规范](https://thoughts.teambition.com/workspaces/5eb42f82399747001a74bd94/docs/5fb235574cc5830001e13742)

