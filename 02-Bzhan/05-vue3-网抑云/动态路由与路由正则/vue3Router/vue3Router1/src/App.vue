<template>
  <div>
    <!-- <h1>Hello App!</h1>
    <p>
      <router-link to="/">Go to home</router-link>
      <router-link to="/about">Go to About</router-link>
    </p> -->
    <!-- 用于子页面导航 -->
    <!-- <router-view></router-view> -->
    <!-- 名称导航路由 -->
    <router-view name="ShopTop"></router-view>
    <router-view></router-view>
    <router-view name="ShopFooter"></router-view>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>
