import Vue from 'vue'
import VueRouter from 'vue-router'

// @ 表示src目录
// 好处：它不受当前文件路径影响
import Login from '@/views/login'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  }
]

const router = new VueRouter({
  routes
})

export default router
