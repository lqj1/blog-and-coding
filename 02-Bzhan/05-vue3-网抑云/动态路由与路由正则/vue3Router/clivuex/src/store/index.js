import { createStore } from 'vuex';
import user from './user'; //导入模块
export default createStore({
  // 设置全局数据，在别的地方通过 $store.statecount 调用
  state: {
    count: 0,
    dzList: [],
  },
  // 存放计算属性
  getters: {
    totalPrice(state) {
      return state.count * 100;
    },
  },
  // 修改状态的地方，通过在别的地方调用 this.$store.commit('method')
  mutations: {
    setCount(state) {
      state.count++;
    },
    setCountNum(state, num) {
      state.count += num;
    },
    setDzList(state, arr) {
      state.dzList = arr;
    },
  },
  // 异步操作，在别的地方的调用方法为：this.$store.dispatch('method')
  actions: {
    getDz() {
      let api = 'test';
      this.$post(api).then(res => {
        // 请求后调用 mutations 中的方法
        context.commit('setDzList', res);
      });
    },
  },
  modules: {
    user, // 导入的user模块
  },
});
