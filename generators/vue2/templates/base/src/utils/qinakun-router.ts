import Vue from 'vue'
import VueRouter, { Route } from 'vue-router'
import { store } from './index'

Vue.use(VueRouter)

// 导出相关的路由
const routeFiles = require.context('../router', true, /ts|js$/)
const routes = routeFiles.keys().reduce((con, cur) => con.concat(routeFiles(cur).default), [])

function createRouter() {
  const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
  })

  let globalLoading: any
  // 路由拦截信息
  router.beforeEach(async (to, from, next) => {
    globalLoading = Vue.prototype.$loading({ type: 'global' })
    const { user_id } = store.state.userInfo
    if (user_id) {
      return next()
    }
    const loginName = to?.query.loginName
    const project_id = to?.query.project_id
    if (project_id) {
      store.commit('project_id', project_id)
    }
    const sessionUserInfo = sessionStorage.getItem('userInfo')
    if (sessionUserInfo) {
      const parseUserInfo = JSON.parse(sessionUserInfo)
      if (parseUserInfo && parseUserInfo.user_id) {
        if (!loginName || loginName == parseUserInfo.userName) {
          store.commit('userInfo', parseUserInfo)
          return next()
        }
      }
    }
    // 登录
    if (!loginName) {
      return
    }
    store.commit('project_id', to.query.project_id) // 存储当前的project_id
    const {
      data: { result, content }
    } = await Vue.prototype.$axios.post(Vue.prototype.$api.login, {
      loginName,
      loginDevice: 'PC'
    })
    // 登录成功
    if (result === 'success' && content.length) {
      const userInfo = content?.[0]
      userInfo.user_id = userInfo.userId
      store.commit('userInfo', userInfo)
      next()
    } else {
      console.log('登录失败！')
    }
  })

  // 路由守卫
  router.afterEach((to: Route, from: Route) => {
    // 关闭页面loading
    Vue.prototype.$loading.close(globalLoading)
    // 需要添加面包屑信息
    if (to?.meta?.title) {
      const { meta, params, path, query } = to
      store.commit('changeBreadcrumb', { name: meta.title, params, query, path })
    }
  })
}
// vuex持久化（监听页面卸载并将vuex的信息加密存入）
window.addEventListener('unload', () => {
  sessionStorage.setItem('userInfo', JSON.stringify(store.state.userInfo))
  sessionStorage.setItem('breadcrumbArr', JSON.stringify(store.state.breadcrumbArr))
})
// 删除敏感信息
window.addEventListener('load', () => {
  sessionStorage.removeItem('userInfo')
})

export default createRouter