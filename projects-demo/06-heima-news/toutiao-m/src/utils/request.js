/**
 * 封装 axios 请求模块
 */
import axios from 'axios'
import JSONbig from 'json-bigint'
// 在非组件模块中获取 store 必须通过这种方式
// 这里单独加载store，和在组件中 this.$store 是一样的方法
import store from '@/store/'

// 请求定义给 request，方便导出，以及后续的拦截器处理
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/', // 基础路径
  transformResponse: [function (data) {
    // 后端返回的数据可能不是 JSON 格式字符串
    // 如果不是的话，那么 JSONbig.parse 调用就会报错
    // 所以我们使用 try-catch 来捕获异常，处理异常的发生
    try {
      // 如果转换成功，则直接把结果返回
      return JSONbig.parse(data)
    } catch (err) {
      // console.log('转换失败', err)
      return data
    }
    // axios 默认在内部使用 JSON.parse 来转换处理原始数据
    // return JSON.parse(data)
  }]
})

// 请求拦截器
request.interceptors.request.use(function (config) {
  const { user } = store.state
  // 如果用户已登陆，统一给接口设置 token 信息
  // 如果没有登陆，则设置token就没有意义了
  if (user) {
    // config.headers.Authorization = `Bearer ${store.state.user.token}`
    config.headers.Authorization = `Bearer ${user.token}`
  }
  // 处理完之后，一定要把 config 返回，相当于放行的标志
  return config
}, function (error) {
  return Promise.reject(error)
})
// 响应拦截器

// 导出
export default request
