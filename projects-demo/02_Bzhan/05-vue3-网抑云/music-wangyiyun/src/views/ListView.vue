<template>
  <div class="list-view">
    <listview-top :playlist="state.playlist"></listview-top>
  </div>
</template>

<script>
import { onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { getPlayListDetail } from '@/api/index.js'
import ListviewTop from '@/components/ListviewTop.vue'
export default {
  components: { ListviewTop },
  setup () {
    // state里面的是响应式的，获取请求结果
    let state = reactive({
      list: [],
      playlist: {}
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