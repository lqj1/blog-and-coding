<template>
  <van-tabs v-model:active="active">
    <van-tab  v-for="item in list" :key="item.id" :title="item.text"></van-tab>
  </van-tabs>
</template>
<script setup lang="ts">
import { ref } from "vue"
import axios from 'axios'
// TypeScript 的接口用于标记数据格式
interface INavItem {
  id: string
  text: string
}
interface ISwiperItem {
  link: string
  imgSrc: string
}
// 当前选中的下标为0
const active = ref(0)
// 频道数据， <INavItem[]> 表示list数据为数组，数组的每一项需要复合 INavItem 接口的格式
// TypeScript 好处：模板中使用 list 和 item 的时候，鼠标移入有类型提醒
const list = ref<INavItem[]>([])  // 定义一个 INavItem[] 类型的数组，ref<type>([])
const list2 = ref<ISwiperItem[]>([])  
// 调用mock接口，并获取频道的列表数据
axios({
  url: '/navList',
  method: 'get'
}).then(res => {
  // console.log('获取频道数据', res.data);
  list.value = res.data.result
})
// 调用mock接口，并获取轮播图的数据
axios({
  url: '/swiperList',
  method: 'get'
}).then(res => {
  list2.value = res.data.result
})
</script>


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