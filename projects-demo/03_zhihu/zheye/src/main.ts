import { createApp } from 'vue'
import axios from 'axios'
import router from './router'
import store from './store'
import App from './App.vue'
// 配置网络请求的前缀
axios.defaults.baseURL = 'http://apis.imooc.com/api/'
// axios.defaults.baseURL = 'http://localhost:8080/api/'
axios.interceptors.request.use(config => {
  config.params = { ...config.params, icode: 'C6A6C4086133360B' }
  return config
})
// axios.get('/column?icon=C6A6C4086133360B').then(res => {
//   console.log(res.data)
// })
// 加入interceptors之后，上面可以改下如下
axios.get('/column').then(res => {
  console.log(res.data)
})
const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
