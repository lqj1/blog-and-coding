import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 加载 vant 组件库
import Vant from 'vant'
// 加载 vant 组件库样式
import 'vant/lib/index.css'
import './utils/dayjs'

// 自动设置 REM 基准值 (html标签字体大小)
import 'amfe-flexible'

// 加载全局样式（最好放到最后，方便覆盖第三方组件的样式）
import './styles/index.less'

Vue.config.productionTip = false

// 全局注册 vant 中组件
Vue.use(Vant)

// 创建 vue 根实例，将router/store配置到根实例中
// 把 App 根组件渲染到 #app节点
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
