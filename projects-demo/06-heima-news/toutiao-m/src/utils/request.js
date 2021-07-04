/**
 * 封装 axios 请求模块
 */
import axios from 'axios'
import JSONbig from 'json-bigint'
import { Toast } from 'vant'
// 在非组件模块中获取 store 必须通过这种方式
// 这里单独加载store，和在组件中 this.$store 是一样的方法
import store from '@/store/'
import router from '@/router/'
const refreshTokenReq = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
})
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
axios.interceptors.response.use(function (response) {
  // 响应成功进入这里
  return response
}, async function (error) {
  // 请求响应失败进入这里
  // 超过 2xx 的状态码都会进入这里
  const status = error.response.status
  if (status === 400) {
    // 客户端请求参数错误
    Toast.fail('客户端请求参数异常')
  } else if (status === 401) { // 401 token 需要单独处理
    // token 无效
    // 如果没有 user 或者 user.token，直接去登陆
    const { user } = store.state
    if (!user || !user.token) {
      // 没有登陆，直接跳转到登录页
      return redirectLogin()
    }
    // 如果有 refresh_token，则使用它请求获取新的 token
    try {
      const { data } = await refreshTokenReq({
        method: 'PUT',
        url: '/app/v1_0/authorization',
        headers: {
          Authorization: `Bearer ${user.refresh_token}`
        }
      })
      console.log(data)
      user.token = data.data
      store.commit('setUser', user)
    } catch (err) {
      // 刷新token失败，直接跳转登录页
      redirectLogin()
    }
    // 拿到新的token之后，把它更新到容器中
    // 把失败的请求重新发出去
  } else if (status === 403) {
    // 没有操作权限
    Toast.fail('没有权限')
  } else if (status >= 500) {
    // 服务端异常
    Toast.fail('服务端异常，请稍后重试')
  }
  // 抛出异常
  return Promise.reject(error)
})
function redirectLogin () {
  router.replace({
    name: '/login',
    // 传递查询参数，查询参数会以？作为分隔符放到url后面
    query: {
      // 数据名是自己起的
      // router.currentRoute和我们在组件中获取的this.$route是一个东西
      // this.$route用于组件中
      redirect: router.currentRoute.fullPath // 当前路由路径
    }
  })
}
// 导出
export default request
