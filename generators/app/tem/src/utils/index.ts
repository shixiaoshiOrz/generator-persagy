
import Vue from 'vue'

// 导入需要按需引入的组件
import meri from './components'

// 引入vuex
import Vuex from 'vuex'
import storeConfig from './store'

// 导入axios模块
import axios from './axios'

// 导入 router
import router from './router'

// 需要注册的全局指令
import directive from './directives'

// 导出 api
import api from './api'
Vue.use(meri)
Vue.use(Vuex)
const store = new Vuex.Store(storeConfig)
Vue.prototype.$axios = axios
Vue.use(directive)
Vue.prototype.$api = api

// 导出相关
export {
  router,
  store
}
