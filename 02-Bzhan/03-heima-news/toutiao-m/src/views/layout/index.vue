<template>
  <div class="layout-container">
    <!-- 子路由出口 -->
    <keep-alive>
      <router-view/>
    </keep-alive>
    <!-- 子路由出口 -->
    <!-- 底部导航栏 -->
    <van-tabbar v-model="active" route>
      <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="comment-o" to="/qa">问答</van-tabbar-item>
      <van-tabbar-item icon="video-o" to="/video">视频</van-tabbar-item>
      <van-tabbar-item icon="manager-o" to="/my">我的</van-tabbar-item>
    </van-tabbar>
    <!-- 底部导航栏 -->
  </div>
</template>

<script>
export default {
  name: 'LayoutIndex',
  data () {
    return {
      active: 0
    }
  },
  mounted () {
    // 渲染成功之后，将当前组件再次缓存起来
    this.$store.commit('addCachePage', 'LayoutIndex')
  },
  activated () {
    console.log('activated')
  },
  deactivated () {
    console.log('deactivated')
  }
}
</script>

<style lang="less" scoped>

</style>
