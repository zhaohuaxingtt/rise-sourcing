/*
 * @Author: yuszhou
 * @Date: 2021-02-19 14:29:09
 * @LastEditTime: 2021-02-24 09:47:00
 * @LastEditors: Please set LastEditors
 * @Description: 系统静态路由.
 * @FilePath: \rise\src\router\index.js
 * 
 */
/* eslint-disable no-undef */
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}
Vue.use(VueRouter)
export const staticRouter = [
  {
    path: '/',
    name: 'index',
    component: () => import('@/layout/default'),
    redirect: '/partsign',
    children: [
      {
        path:'/index',
        name:'home',
        component:() => import('@/views/home')
      },
      {
        path:'/partsign',
        name:'partsign',
        component:()=> import('@/views/partsign/home')
      },
	  {
	    path:'/editordetail',
	    name:'editordetail',
	    component:()=> import('@/views/partsign/editordetail')
	  }
    ]
  },
  {
    path: '/ui',
    name: 'ui',
    meta: {
      title: '公用组件管理',
    },
    component: () => import('@/views/ui')
  }, 
  {
    path: '*',
    name: '404',
    meta: { title: '404' },
    component: () => import(`@/views/404`)
  }
]

// eslint-disable-next-line no-undef
export default new VueRouter({
  routes: staticRouter,
})



