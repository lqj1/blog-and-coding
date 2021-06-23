<template>
  <div class="post-comment">
    <van-field
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="20"
      placeholder="请输入评论内容"
      show-word-limit
    />
    <van-button size="mini" @click="onPost" :disable="!message">发布</van-button>
  </div>
</template>

<script>
import { addComment } from '@/api/comment'
export default {
  name: 'PostComment',
  props: {
    // 如果发布文章评论，传递文章id
    // 如果发布评论回复，传递评论id
    target: {
      type: [Number, String, Object],
      required: true
    },
    // 如果发布评论回复，同时需要传递文章id
    articleId: {
      type: [Number, String, Object],
      default: null
    }
  },
  data () {
    return {
      message: '' // 评论内容
    }
  },
  methods: {
    async onPost () {
      this.$toast.loading({
        message: '发布中...',
        forbidClick: true // 禁止背景点击
      })
      // 1. 找到数据接口
      // 2. 封装请求方法
      // 3. 请求提交数据
      const { data } = await addComment({
        target: this.target.toString(), // 评论的目标id(评论文章即为文章id，对评论进行回复则为评论id)
        content: this.message, // 评论内容
        art_id: this.articleId === null ? null : this.articleId.toString() // 文章id，对评论内容发表回复时，需要传递此参数，表明所属文章id。对文章进行评论，不要传此参数，null不能toString，所以需要做判断
      })
      // 4. 处理响应结果
      // console.log('data', data)
      // 成功后，隐藏弹出层
      this.$emit('post-success', data.data.new_obj)
      this.$toast.success('发布成功')
      // 发布成功，清空文本框内容
      this.message = ''
    }
  }
}
</script>

<style lang="less" scoped>
.post-comment {
  padding: 14px;
  display: flex;
  align-items: center;
}
</style>
