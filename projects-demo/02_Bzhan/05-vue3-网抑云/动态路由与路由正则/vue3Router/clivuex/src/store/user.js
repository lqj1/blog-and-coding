const user = {
  state: () => ({
    username: 'lqj',
    age: 30,
  }),
  mutations: {
    setUsername(state) {
      this.state.username = 'lqj2';
    },
    setAge() {
      this.state.age = 40;
    },
  },
  actions: {
    asyncSetAge(context, value = 20) {
      setTimeout(() => {
        // this.state.age = 20; // 直接修改
        context.commit('setAge', value);
      }, 1000);
    },
  },
  getters: {
    description(state, getters, rootState) {
      return state.username + '的年龄是' + state.age + '岁';
    },
  },
};
export default user;
