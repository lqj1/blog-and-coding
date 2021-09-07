import { createStore } from 'vuex';
// import mutations from './mutations';
// import actions from './actions';
// import getters from './getters';
const state = {};
export default createStore({
  state: {
    playlist: [],
    playCurrentIndex: 0,
  },
  mutations: {
    setPlaylist: function(state, value) {
      state.playlist = value;
    },
  },
  // actions,
  // getters,
});
