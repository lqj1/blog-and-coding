import axios from 'axios';
import { Notify } from 'vant';
import router from '../router';
import { Toast } from 'vant';
export function request(config) {
  const instance = axios.create({
    baseURL: 'https://api.shop.eduwork.cn',
    timeout: 5000,
  });
  // 请求拦截
  instance.interceptors.request.use(
    config => {
      // 统一设置需要认证的接口，比如 token
      const token = window.localStorage.getItem('token');
      if (token) {
        // 给需要token的接口统一添加认证信息
        config.headers.Authorization = 'Bearer ' + token;
      }
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
      // console.log(err);
      // 如果有错误，这里来处理，比如处理一些服务器返回的错误码
      if (err.response.status === 401) {
        // 服务器返回没有授权的接口
        Toast.fail('请先登录');
        router.push({ path: '/login' });
      }
      // 如果有错误，这里会去处理，显示错误信息
      Notify(err.response.data.errors[Object.keys(err.response.data.errors)[0]][0]);
    }
  );
  // 一定要注意返回这句代码
  return instance(config);
}
