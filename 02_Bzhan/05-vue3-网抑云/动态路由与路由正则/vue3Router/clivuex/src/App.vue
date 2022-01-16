<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App" />
  <h1>数量：{{$store.state.count}}</h1>
  <h1>mapState 映射的数量：{{count}}</h1>
  <h1>别名的数量：{{productCount}}</h1>
  <h1>单价：100</h1>
  <h1>总价：{{$store.getters.totalPrice}}</h1>
  <h1>mapGetters映射的总价：{{totalPrice}}</h1>
  <button @click="changeEvent">添加数量</button>
  <button @click="setCountNum(3)">mapMutation 映射的添加数量</button>
  <h1>user模块中的vuex变量：{{$store.state.user.username}}</h1>
  <h1>user模块中的getters：{{$store.getters.description}}</h1>
  <h1>user模块中添加了namespaced后的getters：{{$store.getters.['user1/description']}}</h1>
  <h1>添加了命名空间后的 mapState 映射的数量：{{user1.count}}</h1>
  <h1>添加了命名空间后的 user模块中添加了namespaced后的getters：{{description}}</h1>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
// 掌握 映射状态数据和方法
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  computed: {
    ...mapState(['count']),  // 通过映射就可以去掉 $store.state
    ...mapState({
      productCount: (state) => state.count
    }),
    ...mapGetters(['totalPrice']),
    // 命名空间解构
    ...mapState(['user1']), // 结构有命名空间的属性
    ...mapGetters('user1', ['description']) // 结构有命名空间的属性，把命名空间名单独取出来
  },
  methods: {
    changeEvent () {
      // this.$store.commit('setCount')
      this.$store.commit('setCountNum', 3)
    },
    ...mapMutations(['setCountNum']),
    ...mapActions(['getDz']), // vuex 中的 action 中的方法 
    ...mapActions('user1', ['asyncSetAge'])  //命名空间中 action 解构的写法

  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
