<template>
  <van-swipe class="my-swipe" :autoplay="3000" lazy-render indicator-color="white">
    <van-swipe-item v-for="item in list" :key="item.imgSrc">
      <img :src="item.imgSrc" />
    </van-swipe-item>
  </van-swipe>
</template>
<script setup lang="ts">
import { ref } from "vue"
import axios from 'axios'
// TypeScript 的接口用于标记数据格式
interface ISwiperItem {
  link: string
  imgSrc: string
}
// 当前选中的下标为0
const active = ref(0)
// 频道数据， <INavItem[]> 表示list数据为数组，数组的每一项需要复合 INavItem 接口的格式
// TypeScript 好处：模板中使用 list 和 item 的时候，鼠标移入有类型提醒
const list = ref<ISwiperItem[]>([])  
// 调用mock接口，并获取轮播图的数据
axios({
  url: '/swiperList',
  method: 'get'
}).then(res => {
  list.value = res.data.result
})
</script>
<style lang="less" scoped>
.my-swipe {
  img {
    width: 100%;
  }
}
</style>
<!-- 不使用 setup 的情况 -->
<!-- <script lang="ts">
import { ref } from "vue"
export default {
  setup() {
    const active = ref(0)  // 当前选中的下标为0
    return {active}
  }
}
</script> -->