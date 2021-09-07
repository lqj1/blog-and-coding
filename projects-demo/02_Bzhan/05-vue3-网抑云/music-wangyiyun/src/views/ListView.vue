<template>
  <div class="list-view">
    <!-- 歌单页头部 -->
    <listview-top :playlist="state.playlist"></listview-top>
    <!-- 歌单页播放列表 -->
    <play-list :playlist="state.playlist"></play-list>
  </div>
</template>

<script>
import { onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { getPlayListDetail } from '@/api/index.js'
import ListviewTop from '@/components/ListviewTop.vue'
import PlayList from '@/components/PlayList.vue'
export default {
  components: { ListviewTop, PlayList },
  setup () {
    // state里面的是响应式的，获取请求结果
    let state = reactive({
      list: [],
      playlist: {
        creator: {},
        tracks: []
      }
    })
    // 获取路由
    const route = useRoute()
    onMounted(async () => {
      // console.log(route);
      let id = route.query.id
      let res = await getPlayListDetail(id)
      state.playlist = res.data.playlist
      // console.log(res)
    })
    return {
      state
    }
  }
}
</script>

<style lang="less" scoped>

</style>