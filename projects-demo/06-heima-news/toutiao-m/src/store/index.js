import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage'
Vue.use(Vuex)

// 将不需要频繁变化的东西定义为常量，一旦后面的变量写错，就会报错，更安全
const USER_KEY = 'toutiao-user'

export default new Vuex.Store({
  state: {
    // 当前登录用户的登陆状态（token）等数据
    user: getItem(USER_KEY)
  },
  mutations: {
    setUser (state, data) {
      state.user = data
      // 为了防止页面刷新数据丢失，需要把数据放到本地存储中，仅仅是为了持久化数据
      // window.localStorage.setItem('user', JSON.stringify(state.user))
      setItem(USER_KEY, state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})
