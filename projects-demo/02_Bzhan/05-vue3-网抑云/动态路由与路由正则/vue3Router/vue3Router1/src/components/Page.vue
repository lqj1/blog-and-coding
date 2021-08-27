<template>
  <div>
    <h1>page页面，通过 js 实现跳转</h1>
    <button @click="goPage">跳转页面</button>
    <button @click="replacePage">替换页面，无法回去</button>
    <button @click="$router.go(1)">前进</button>
    <button @click="$router.go(-1)">后退</button>
  </div>
</template>

<script>
export default {
  methods: {
    goPage () {
      console.log('跳转到首页');
      this.$router.push({ path: '/about' })
      // 携带参数
      // this.$router.push({ path: '/news/12345' })
      // 通过 name 属性导航
      this.$router.push({ name: 'news', params: { id: 89 } })
      // 携带 问号 的参数, 
      this.$router.push({ path: '/', query: { search: '特朗普' } })
    },
    replacePage () {
      this.$router.replace({ path: '/', query: { search: '特朗普' } })
    }
  }
}
</script>

<style scoped>

</style>