import axios from "axios";
// 获取轮播图api，type：资源类型，对应以下类型，默认0为pc，1为安卓，2为iphone，3位ipad
export function getBanners(type = 1) {
  return axios.get(`http://localhost:3000/banner?type=${type}`);
}
