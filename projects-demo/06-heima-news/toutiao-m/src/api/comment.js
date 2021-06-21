
import request from '@/utils/request'
/**
 * 文章评论相关请求模块
 */
export const getComments = params => {
  return request({
    method: 'GET',
    url: '/app/v1_0/comments',
    params
  })
}
