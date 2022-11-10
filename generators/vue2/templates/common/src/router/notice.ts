/** 公告系统**/
const list = () => import('@/views/notice/list.vue')
const detail = () => import('@/views/notice/detail.vue')
export default [
  //
  {
    path: '/list',
    name: 'list',
    component: list,
    meta: {
      keepAlive: true,
      title: '公告管理'
    }
  },
  {
    path: '/detail',
    name: 'detail',
    component: detail,
    meta: {
      keepAlive: true,
      title: '日志管理'
    }
  }
]
