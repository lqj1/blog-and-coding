<template>
  <div class="video-play">
    <video controls class="video" :poster="videoInfo.poster" :src="videoInfo.videoSrc">{{videoInfo.poster}}</video>
  </div>
</template>

<script setup lang="ts">
import { defineProps, PropType } from 'vue';
// 进阶用法：如果多个地方都用到同样的接口定义，还可以把接口抽离出去独立维护
import { IVideoInfo } from '../types';
defineProps({
  videoInfo: {
    type: Object as PropType<IVideoInfo>,
    required: true
  }
})
</script>

<style scoped>

</style>