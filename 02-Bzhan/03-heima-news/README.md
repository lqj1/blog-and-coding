## 03-heima-news
### 移动端适配

Vant中样式默认使用 px 作为单位，如果需要使用rem单位，推荐使用以下两个工具：

1. postcss-pxtorem 是一款postcss插件，用于将单位转化为rem
   1. style中单位可以转，行内样式无法转换
2. lib-flexible用于设置rem基准值

PostCSS是一个处理css的工具，本身功能比较单一，主要负责解析CSS代码，再交由插件进行处理，它的插件体系非常强大，如：

- Autoprefixer插件可以实现自动添加浏览器相关的声明前缀
- PostCSS Preset Env插件可以让你使用更新的CSS语法特性并实现向下兼容
- postcss-pxtorem可以实现px转换为rem

### 频道数据持久化业务分析

频道编辑这个功能，无论用户是否登录都可以使用

不登录也能使用

- 数据存储到本地
- 不支持同步功能

登录也能使用

- 数据存储在线上后台服务器
- 更换不同的设备可以同步数据

### 手机发放验证码并登录的相关代码

```javascript
async onSendMsg () {
// 方法一：
// this.$ref['login-form'].validate('mobile').then( // 只验证手机号，通过then接收结果
//   data => {
//   }
// )
// 方法二：也可以通过async和await来处理then的返回
try {
// 校验手机号
await this.$refs['login-form'].validate('mobile')
// 验证通过，请求发送验证码
this.isSendSmsLoading = true // 展示按钮的loading状态，防止网络慢，用户多次点击触发发送行为
// 校验通过，发送请求
await sendMsg(this.user.mobile)
// 短信发送出去了，隐藏发送按钮，显示倒计时
this.isCountDownShow = true
// 倒计时结束，显示发送按钮，隐藏倒计时，监视倒计时组件的 finish 事件
} catch (err) {
// try中任何错误都会进入catch
// 不同的错误需要有不同的提示
let message = ''
if (err && err.response && err.response.status === 429) {
  // 发送短信失败的错误提示
  message = '发送太频繁了，请稍后重试'
} else if (err.name === 'mobile') {
  // 表单验证失败的错误提示
  message = err.message
  // console.log(message)
} else {
  // 未知错误
  message = '发送失败，请稍后重试'
}
// 表单验证失败
this.$toast({
  message,
  position: 'top'
})
}
// 无论成功或者失败，最后都要关闭发送按钮loading状态
this.isSendSmsLoading = false
```

// 表单中所有的按钮点击都会触发表单提交，click.prevent 时间阻止默认行为
// 验证手机号
// 验证通过 -> 请求发送验证码 -> 用户接收短信 -> 用户输入验证码 -> 请求登陆
// 请求发送验证码 -> 隐藏发送按钮 -> 显示倒计时
// 倒计时结束 -> 隐藏倒计时，显示发送按钮
}

### 手机首页布局代码

```javascript
<div class="layout-container">
<!-- 子路由出口 -->
<keep-alive>
  <router-view/>
</keep-alive>
<!-- 子路由出口 -->
<!-- 底部导航栏 -->
<van-tabbar v-model="active" route>
  <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
  <van-tabbar-item icon="comment-o" to="/qa">问答</van-tabbar-item>
  <van-tabbar-item icon="video-o" to="/video">视频</van-tabbar-item>
  <van-tabbar-item icon="manager-o" to="/my">我的</van-tabbar-item>
</van-tabbar>
<!-- 底部导航栏 -->
</div>
```

### 请求代码-request.js

```javascript
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
```

### 具体请求接口-article.js

```javascript
/**
* 文章相关请求模块
*/
import request from '@/utils/request'
/**
* 获取文章列表
*/
export const getArticles = params => {
return request({
  method: 'GET',
  url: '/app/v1_1/articles',
  params
})
}
/**
* 获取文章详情
*/
export const getArticleById = articleId => {
return request({
  method: 'GET',
  url: `/app/v1_0/articles/${articleId}`
})
}
```

### 获取本地存储代码-storage.js

```javascript
/**
* 本地存储封装模块
*/
export const getItem = name => {
const data = window.localStorage.getItem(name)
// 为什么将 JSON.parse 放在 try-catch 中，因为data可能不是JSON字符串
try {
  // 尝试将 data 转为 JavaScript 对象
  return JSON.parse(data)
} catch (err) {
  // data不是JSON字符串，直接原样返回
  return data
}
}
export const setItem = (name, value) => {
// 如果 value 是对象，就把value转为 JSON 格式字符串再存储
if (typeof value === 'object') {
  value = JSON.stringify(value)
}
window.localStorage.setItem(name, value)
}
export const removeItem = name => {
window.localStorage.removeItem(name)
}
```