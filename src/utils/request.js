/**
 * 基于axios 封装的请求模块
*/
import axios from 'axios'
import JSONbig from 'json-bigint'
import router from '@/router'

// 非组件模块可以这样加载使用 element 的 message 提示组件
import { Message } from 'element-ui'

// axios()
// axios.get()
// axios.post()

// 通过axios这个实例去发送请求，把需要的配置配置给这个实例来处理
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/', // 请求的基础路径
  transformResponse: [function (data) {
    try {
      // 转换成功，则直接把结果返回
      return JSONbig.parse(data)
    } catch (err) {
      console.log('转换失败', err)
      // 转换失败，进入这里
      return data
    }
  }]
})

// const req1 = axios create()
// req1.defaults.baseURL = 'http://ttapi.research.itcast.cn/'

// 请求拦截器
request.interceptors.request.use(
  // 任何所有请求都会经过这里
  // config 是当前请求相关的配置信息对象
  // config 是可以修改的
  function (config) {
    const user = JSON.parse(window.localStorage.getItem('user'))
    // 如果有登录信息，则统一 设置 token
    if (user) {
      config.headers.Authorization = `Bearer ${user.token}`
    }

    // return config 之后的请求才会真正的发送出去
    return config
  },
  // 请求失败
  function (error) {
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(function (response) {
  // 所有的响应码为2xx的响应都会进入这里
  // response 是响应处理
  // 注意：一定要把响应结果 return，否则真正发请求的位置拿不到数据
  return response
}, function (error) {
  // 任何超出 2xx 的响应码都会进入这里
  if (status === 401) {
    // 跳转到登录页面
    // 清除本地储存中的用户登录状态
    window.localStorage.removeItem('user')
    router.push('/login')
    Message.error('登录状态失败，请重新登录')
  } else if (status === 403) {
    // token 为携带或已过期
    Message({
      message: '没有操作权限'
    })
  } else if (status === 400) {
    // 客户端参数错误
    Message.error('参数错误，请检查请求参数')
  } else if (status >= 500) {
    Message.error('服务端内部异常，请稍后重试')
  }
  return Promise.reject(error)
})

// 导出请求方法
export default request

// 谁要使用谁就加载 request 模块
