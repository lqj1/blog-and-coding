/**
 * 用户相关的请求模块
 */
import request from '@/utils/request'
/**
 * 登录/注册
 */
// 直接将data作为参数对象传入
export const login = data => {
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data
  })
}
