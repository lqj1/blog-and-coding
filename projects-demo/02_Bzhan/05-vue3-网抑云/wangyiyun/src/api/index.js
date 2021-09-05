import { request } from "./request";
// 获取轮播图api，type：资源类型，对应以下类型，默认0为pc，1为安卓，2为iphone，3位ipad
export function getBanners(type = 1) {
  return request({
    url: `/banner?type=${type}`,
    data: type
  })
}
// 获取推荐歌单，limit：取出数量，默认10条数据
export function getMusicList (limit = 10) {
  return request({
    url: `/personalized?limit=${limit}`,
    data: limit
  })
}