import Vue from 'vue'
import App from './App.vue'
<% if ( !qiankun ) { %>import { router, store } from './utils'  
<% } else { %>import { store } from "./utils"
import createRouter from "./utils/router";<% } %>  
Vue.config.productionTip = false
<% if ( !qiankun ) { %>
new Vue({
  router,
  store,
  render: (h: any) => h(App)
}).$mount('#app')<% } else { %>
let instance: any = null
let router:any = null
function render(props: any = {}) {
  const { container } = props;
  router = createRouter()
  instance = new Vue({
    router,
    store,
    render: (h: any) => h(App)
  }).$mount(container ? container.querySelector('#app') : '#app')
}

// 独立运行时
if (!(window as any).__POWERED_BY_QIANKUN__) {
  render()
}

export async function bootstrap() {
  console.log('[vue] vue app bootstraped')
}
export async function mount(props: any) {
  store.commit("userInfo", props.getGlobalState.system.user)
  render(props)
}
export async function unmount() {
  instance.$destroy();
  instance.$el.innerHTML = ''
  instance = null
  router = null
}<% } %> 

