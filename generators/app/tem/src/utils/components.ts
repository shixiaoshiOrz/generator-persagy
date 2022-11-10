// 按需加载meri-design组件
import { Button, Message, Loading } from 'meri-design'
// 导入需要全局注册的公共组件
const comments = require.context('../components/common', true, /.(vue)$/)

export default (Vue: any) => {
  Vue.use(Button)
  Vue.prototype.$message = Message
  Vue.prototype.$loading = Loading

  comments.keys().forEach((fileName: any) => {
    Vue.component(fileName.match(/^.\/(.*).vue$/)[1], comments(fileName).default)
  })
}
