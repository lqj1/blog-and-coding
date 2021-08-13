import { createStore } from 'vuex';
import mutations from './mutations';
import actions from './actions';
import getters from './getters';
const state = {
  user: {
    // isLogin: false, // 这样设置一刷新页面就丢失了，所以默认值需要从localStorage中获取
    isLogin: window.localStorage.getItem('token') ? true : false,
  },
};
export default createStore({
  state,
  mutations,
  actions,
  getters,
});
