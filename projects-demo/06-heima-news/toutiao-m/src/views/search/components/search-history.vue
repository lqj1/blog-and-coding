<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <div v-if="isDeleteShow">
        <!-- prop数据如果是引用类型（数据，对象）可以修改，这个修改指的是 user.name = 'jack', arr.push(123) -->
        <!-- 但是任何 prop 数据都不能重新赋值 -->
        <!-- 如果想要 prop = 新的数据，需要让父组件自己修改 -->
        <span @click="$emit('update-histories', [])">全部删除</span>
        &nbsp;&nbsp;
        <span @click="isDeleteShow = false">完成</span>
      </div>
      <van-icon  v-else name="delete" @click="isDeleteShow = true" />
    </van-cell>
    <van-cell v-for="(history,index) in searchHistories" :key="index" :title="history" @click="onDelete(history,index)">
      <van-icon name="close" v-show="isDeleteShow" />
    </van-cell>
  </div>
</template>

<script>
import { setItem } from '@/utils/storage'
export default {
  name: 'SearchHistory',
  props: {
    searchHistories: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      isDeleteShow: false // 删除的显示状态
    }
  },
  methods: {
    onDelete (history, index) {
      // 如果是删除状态，则执行删除操作
      if (this.isDeleteShow) {
        this.searchHistories.splice(index, 1)
        // 持久化处理
        // 1. 修改本地存储的数据
        // 2. 请求接口删除线上的数据
        // 如果已登陆，删除线上的历史数据，因为接口没有删除单个的历史接口，只有删除所有历史的接口
        setItem('search-histories', this.searchHistories)
      }
      // 非删除状态下，展示搜索结果
      this.$emit('search', history)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
