/**
 * 基于axios 封装的请求模块
*/
import axios from 'axios'
import JSONbig from 'json-bigint'

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

// 导出请求方法
export default request

// 谁要使用谁就加载 request 模块
