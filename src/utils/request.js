/**
 * 基于axios 封装的请求模块
*/
import axios from 'axios'

// axios()
// axios.get()
// axios.post()

// 通过axios这个实例去发送请求，把需要的配置配置给这个实例来处理
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/' // 请求的基础路径
})

// const req1 = axios create()
// req1.defaults.baseURL = 'http://ttapi.research.itcast.cn/'

// 请求拦截器

// 响应拦截器

// 导出请求方法
export default request

// 谁要使用谁就加载 request 模块
