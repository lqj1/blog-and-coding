<template>
  <div>
    <!-- <h2>BililiBilili</h2>
    <router-link to="/vider/1"></router-link> -->
    <!-- 头部 -->
    <app-header></app-header>
    <!-- 频道列表 -->
    <home-channel></home-channel>
    <!-- 轮播图 -->
    <home-swiper></home-swiper>
    <!-- 视频列表 -->
    <home-video></home-video>
  </div>
</template>

<script setup lang="ts">
// setup中只需要导入组件，无需使用 component 注册
import AppHeader from '@/components/app-header.vue'
import HomeChannel from './components/home-channel.vue'
import HomeSwiper from './components/home-swiper.vue'
import HomeVideo from './components/home-video-list.vue';
</script>

<style scoped>

</style>