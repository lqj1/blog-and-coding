<template>
  <van-tabs v-model:active="activeName">
    <van-tab title="推荐" name="recommend">
      <video-recommend></video-recommend>
    </van-tab>
    <van-tab title="评论" name="comment">
      <video-comment></video-comment>
    </van-tab>
  </van-tabs>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import VideoRecommend from './video-recommend.vue'
import VideoComment from './video-comment.vue'
const activeName = ref('recommend')
</script>
<style scoped>
 
</style>