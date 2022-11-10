import Vue from 'vue'
import App from './App.vue'
import { router, store } from './utils'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
