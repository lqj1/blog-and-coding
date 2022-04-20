import axios from 'axios'
export function request(config) {
  const instance = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 3000
  })
  // 请求拦截
  instance.interceptors.request.use()
  // 响应拦截
  instance.interceptors.response.use()
  // 返回创建的实例
  return instance(config)
}