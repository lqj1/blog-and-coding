<template>
  <div>
    <!-- 头部 -->
    <app-header></app-header>
    <!-- 视频播放 -->
    <video-play :videoInfo="videoInfo"></video-play>
    <!-- 视频信息 -->
    <video-info :videoInfo="videoInfo"></video-info>
    <!-- 底部推荐和评论 -->
    <video-bottom></video-bottom>
  </div>
</template> 

<script setup lang="ts">
// setup中只需要导入组件，无需使用 component 注册
import AppHeader from '@/components/app-header.vue'
import VideoPlay from './components/video-play.vue'
import VideoInfo from './components/video-info.vue'
import VideoBottom from './components/video-bottom.vue'
import { useRoute } from 'vue-router'
import { ref } from "vue";
import axios from 'axios';
export interface IVideoInfo {
  author?: string
  authorIconSrc?: string
  commentCount?: number
  date?: string
  id?: string
  poster?: string
  playCount?: string
  likeCount?: string
  favCount?: string
  videoSrc?: string
  videoTitle?: string
}
const videoInfo = ref<IVideoInfo>({})
const route = useRoute()
// 请求视频的详细信息
axios({
  url: '/videoDetail',
  method: 'get',
  // 根据路由对象的 id 参数发放请求并获取对应的视频
  params: { id: route.params.id }
}).then(({data}) => {     // 解构data数据
  videoInfo.value = data.result
})

</script>

<style scoped>

</style>