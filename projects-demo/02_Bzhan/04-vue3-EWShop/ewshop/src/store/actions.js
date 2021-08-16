import { getCart } from 'network/cart';
// 异步处理的时候调用
const actions = {
  updateCart({ commit }) {
    // 获取所有购物车列表
    getCart().then(res => {
      commit('addCart', { count: res.data.length || 0 }); // 提交给 mutation.js 中的方法
    });
  },
};
export default actions;
