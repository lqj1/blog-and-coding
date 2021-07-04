<template>
  <div id="app">
    <!-- 路由出口 -->
    <!-- todo: bug: 缓存不生效 -->
    <keep-alive :include="['cachePages']">
      <router-view/>
    </keep-alive>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'App',
  computed: {
    // 需要缓存的页面
    ...mapState(['cachePages'])
  }
}
</script>
<style lang="less">

</style>
