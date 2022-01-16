<template>
  <div class="list-view">
    123
  </div>
</template>

<script>
import { onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { getPlayListDetail } from '@/api/index.js'

export default {
  setup () {
    // state里面的是响应式的，获取请求结果
    let state = reactive({
      list: []
    })
    // 获取路由
    // const route = useRoute()
    onMounted(async () => {
      alert()
      console.log(route);
      let res = await getPlayListDetail()
    })
  }
}
</script>

<style lang="less" scoped>

</style>