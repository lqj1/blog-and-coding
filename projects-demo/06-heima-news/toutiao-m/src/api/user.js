/**
 * 用户相关的请求模块
 */
import request from '@/utils/request'
// 这里单独加载store，和在组件中 this.$store 是一样的
// import store from '@/store/'
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
/**
 * 发送短信验证码
 */
// 直接将data作为参数对象传入
export const sendMsg = mobile => {
  return request({
    method: 'GET',
    url: `/app/v1_0/sms/codes/${mobile}`
  })
}
/**
 * 获取登陆用户信息
 */
// 直接将data作为参数对象传入
export const getCurrentUser = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user'
    // headers: {
    //   Authorization: `Bearer ${store.state.user.token}`
    // }
  })
}
/**
 * 获取用户频道列表
 */
// 直接将data作为参数对象传入
export const getUserChannels = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/channels'
  })
}
