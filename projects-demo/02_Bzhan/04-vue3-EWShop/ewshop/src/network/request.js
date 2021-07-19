import axios from 'axios';
export function request(config) {
  const instance = axios.create({
    baseURL: 'https://api.shop.eduwork.cn',
    timeout: 5000,
  });
  // 请求拦截
  instance.interceptors.request.use(
    config => {
      // 统一设置需要认证的接口，比如 token
      // 直接放行
      return config;
    },
    err => {}
  );
  // 响应拦截
  instance.interceptors.response.use(
    res => {
      // 正常相应不做任何事，直接放行
      // return res;
      // 如果每个请求返回对象中都有data的话，就可以这样写，这样调用到的地方就可以直接写 res
      return res.data ? res.data : res;
    },
    err => {
      // 如果有错误，这里来处理，比如处理一些服务器返回的错误码
    }
  );
}
