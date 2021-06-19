<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar class="app-nav-bar" title="文章详情" left-arrow @click-left="$router.back()" />
    <!-- 导航栏 -->
    <!-- 正文部分 -->
    <h1 class="title">{{article.title}}</h1>
    <van-cell center class="user-info">
      <div slot="title" class="name">{{article.aut_name}}</div>
      <!-- 知识点：fit:cover 设置图片完全覆盖 -->
      <van-image class="avatar" slot="icon" fit="cover" src="article.aut_photo" round></van-image>
      <div slot="label" class="pubdate">{{article.pubdate | relativeTime}}</div>
      <van-button
        class="follow-btn"
        round size="small"
        :type="article.is_followed ? 'default' : 'info'"
        :icon="article.is_followed ? '' : 'plus'"
      >
        {{article.is_followed ? '已关注' : '关注'}}
      </van-button>
    </van-cell>
    <!-- 知识点：类似于github的 markdown的css样式文件 -->
    <div class="content markdown-body" v-html="article.content" ref="article-content">
    </div>
    <!-- 正文部分 -->
  </div>
</template>

<script>
/* 知识点：类似于github的 markdown的css样式文件 */
import './github-markdown.css'
import { getArticleById } from '@/api/article'
import { ImagePreview } from 'vant'
// 在组建中获取动态路由参数：
// 1. this.$route.params.xxx
// 2. props传参，推荐，【知识点】：在router中设置参数，props: true
export default {
  name: 'ArticleIndex',
  props: {
    articleId: {
      type: [String, Number, Object],
      required: true
    }
  },
  data () {
    return {
      article: {} // 文章数据对象
    }
  },
  created () {
    this.loadArticle()
  },
  methods: {
    async loadArticle () {
      const { data } = await getArticleById(this.articleId)
      this.article = data.data
      console.log('data', data)
      // 知识点
      // 获取文章内容dom容器
      // 得到所有的img标签，
      // 循环所有的img，给img注册点击事件
      // 在事件处理函数中调用 ImagePreview() 方法预览图片
      const articleContent = this.$refs['article-content']
      // 数据改变影响视图更新（操作DOM）
      const imgs = articleContent.querySelectorAll('img')
    }
  }
}
</script>

<style lang="less" scoped>
.title {
  font-size: 20px;
  color: #3a3a3a;
  padding: 14px;
  background-color: #fff;
  margin: 0;
}
.user-info {
  .avatar {
    width: 35px;
    height: 35px;
    margin-right: 8px;
  }
  .name {
    font-size: 12px;
    color: #333;
  }
  .pubdate {
    font-size: 11px;
    color: #b4b4b4;
  }
  .follow-btn {
    width: 85px;
    height: 29px;
  }
}
ul {
  // 知识点：去掉设置的 ul 的样式
  list-style: unset;
}
.markdown-body {
  padding: 14px;
  background-color: #fff;
}
</style>
