import Vue from 'vue'
import VueRouter from 'vue-router'

// @ 表示src目录
// 好处：它不受当前文件路径影响
import Login from '@/views/login'
import Home from '@/views/home'
import Layout from '@/views/layout'
import Article from '@/views/article'
import Publish from '@/views/publish'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    // name: 'layout',
    component: Layout,
    children: [
      {
        path: '', // 默认 子路由
        name: 'home',
        component: Home
      },
      {
        path: '/article',
        name: 'article',
        component: Article
      },
      {
        path: '/publish',
        name: 'publish',
        component: Publish
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 路由导航守卫
// to: 要去的路由页面信息
// form: 来自哪里的路由信息
// next: 放行方法
router.beforeEach((to, from, next) => {
  // 如果要访问的页面不是 /login，校验登录状态
  // 如果没有登录，则跳转登录页面
  // 如果登录了，则允许通过
  // next()

  const user = JSON.parse(window.localStorage.getItem('user'))

  // 校验非登录页面的登录状态
  if (to.path !== '/login') {
    if (user) {
      // 已登录，允许通过
      next()
    } else {
      // 没有登录，跳转登录页面
      next('/login')
    }
  } else {
    // 登录页面，正常允许通过
    next()
  }
})

export default router
