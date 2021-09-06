import { request } from "./request";
// 获取轮播图api，type：资源类型，对应以下类型，默认0为pc，1为安卓，2为iphone，3位ipad
export function getBanners(type = 1) {
  return request({
<<<<<<< HEAD
    data: type,
    url: `/banner?type=${type}`
  });
}
// 获取推荐歌单，limit：取出数量，默认10条数据
export function getMusicList(limit = 10) {
  return request({
    data: limit,
    url: `/personalized?limit=${limit}`
  });
}
// 获取歌单详情
export function getPlayListDetail(id) {
  return request({
    data: id,
    url: `/playlist/detail?id=${id}`
  });
=======
    url: `/banner?type=${type}`,
    data: type
  })
>>>>>>> 7f13b7d360fdbec50a808d395fab16db8a9122f5
}
// 获取推荐歌单，limit：取出数量，默认10条数据
export function getMusicList (limit = 10) {
  return request({
    url: `/personalized?limit=${limit}`,
    data: limit
  })
}