import { createStore } from 'vuex';
// import mutations from './mutations';
// import actions from './actions';
// import getters from './getters';
const state = {};
export default createStore({
  state: {
    playlist: [{ al: {} }],
    playCurrentIndex: 0,
  },
  mutations: {
    setPlaylist: function(state, value) {
      // console.log(value);
      state.playlist = value;
    },
    // 修改播放第几首
    setPlayIndex (state, val) {
      state.playCurrentIndex = val
    }
  },
  actions: {},
  // getters,
});
