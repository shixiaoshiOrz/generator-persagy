// 按需加载meri-design组件
import { Button, Message, Loading } from 'meri-design'
// 导入需要全局注册的公共组件
const comments = require.context('../components/common', true, /.(vue)$/)

export default (Vue: any) => {
  Vue.use(Button)
  Vue.prototype.$message = Message
  Vue.prototype.$loading = Loading
  // 位于components/common下的组件将自动全局注册
  comments.keys().forEach((fileName: any) => {
    function firstToUpper(str: string) {
      if (!str) {
        return ''
      } else {
        return str.trim().toLowerCase().replace(str[0], str[0].toUpperCase())
      }
    }
    const nameArray = fileName.match(/^.\/(.*).vue$/)[1].split('-')
    let componentName = ''
    nameArray.forEach((res: string) => (componentName += firstToUpper(res)))
    Vue.component(componentName, comments(fileName).default)
  })
}

