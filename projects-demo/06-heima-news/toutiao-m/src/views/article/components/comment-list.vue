<template>
  <div class="comment-list">
    <van-cell title="全部评论"></van-cell>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <!-- 139988可以测试文章的评论 -->
      <comment-item
        v-for="(comment, index) in list"
        :key="index"
        :comment="comment"
        @reply-click="$emit('reply-click', $event)"
      />
    </van-list>
  </div>
</template>

<script>
import { getComments } from '@/api/comment'
import CommentItem from './comment-item.vue'
export default {
  name: 'CommentList',
  components: {
    CommentItem
  },
  props: {
    source: {
      type: [Number, String, Object],
      required: true
    },
    list: {
      type: Array,
      // 知识点：数组或对象的默认值必须通过函数返回
      // default: function () {
      //   return []
      // }
      // 简写
      default: () => []
    },
    // 获取文章评论，使用字符 a
    // 获取评论回复，使用字符 c
    type: {
      type: String,
      default: 'a'
    }
  },
  data () {
    return {
      // list: [],
      loading: false,
      finished: false,
      offset: null, // 获取下一页数据的页码
      limit: 10 // 每页大小
    }
  },
  methods: {
    async onLoad () {
      // 1. 请求获取数据
      const { data } = await getComments({
        type: this.type, // 评论类型： a是对文章的评论，c是对评论的回复
        source: this.source.toString(), // 源id，文章id或评论id
        offset: this.offset, // 获取评论数的偏移量，值为评论id，表示从此 id 的数据向后取，不传表示从第一页开始读取数据
        limit: this.limit // 每页大小
      })
      // 向父级组件反馈评论总数
      this.$emit('update-total-count', data.data.total_count)
      // 2. 把数据放到列表中
      const { results } = data.data
      this.list.push(...results)
      // 3. 将本次的 loading 关闭
      this.loading = false
      // 4. 判断是否还有数据，
      if (results.length) {
        // 如果有更新获取下一页的代码
        this.offset = data.data.last_id
      } else {
        // 如果没有将 finished 设置为 true
        this.finished = true
      }
    }
  }
}
</script>
<style lang="less" scoped>

</style>
