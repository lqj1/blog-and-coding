<template>
  <div class="search-suggestion">
    <van-cell icon="search" v-for="(str,index) in suggestions" :key="index">
      <div slot="title" v-html="highlight(str)"></div>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestions } from '@/api/search'
import { debounce } from 'lodash'
export default {
  name: 'SearchSuggestion',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      suggestions: []
    }
  },
  watch: {
    // 属性名：要监视的数据的名称，监视 data 或者 props 中的数据
    // 这种情况，一般刚加载出来不会触发，而只有改变值之后才有触发，也就是只有渲染之后才会触发值的改变
    // searchText () {
    //   console.log('hello')
    // }
    // 这才是监视的完整写法
    searchText: {
      // 当数据发生变化就会执行 handler 处理函数
      // 【这里使用了防抖处理，1s内没操作才会把请求发送出去】
      // debounce 函数
      // 参数1： 函数
      // 参数2： 时间
      // 返回值： 防抖处理函数
      handler: debounce(async function () {
        const { data } = await getSearchSuggestions(this.searchText)
        this.suggestions = data.data.options
      }, 200),
      // async handler () {
      //   // 找到数据接口
      //   // 请求获取数据
      //   // 模板绑定展示
      //   const { data } = await getSearchSuggestions(this.searchText)
      //   this.suggestions = data.data.options
      // },
      immediate: true // 该回调会在监听开始后立即调用
    }
  },
  methods: {
    highlight (str) {
      // RegExp是正则表达式的构造函数，参数1：字符串或变量，参数2：匹配模式，返回值：正则对象
      return str.replace(new RegExp(this.searchText, 'gi'), `<span style="color: red">${this.searchText}</span>`)
    }
  }
}
</script>

<style lang="less" scoped>

</style>
