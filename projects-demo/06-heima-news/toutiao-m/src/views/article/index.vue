<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar class="app-nav-bar" title="文章详情" left-arrow @click-left="$router.back()" />
    <!-- /导航栏 -->
    <!-- 正文部分 -->
    <div class="article-wrap">
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
          :loading="isFollowLoading"
          @click="onFollow"
        >
          {{article.is_followed ? '已关注' : '关注'}}
        </van-button>
      </van-cell>
      <!-- 知识点：类似于github的 markdown的css样式文件 -->
      <div class="content markdown-body" v-html="article.content" ref="article-content">
      </div>
      <!-- 文章评论列表 -->
      <comment-list :source="articleId"></comment-list>
      <!-- /文章评论列表 -->
    </div>
    <!-- /正文部分 -->
    <!-- 底部区域 -->
    <div class="article-bottom">
      <div class="art-bot-wrap">
        <van-button class="comment-btn" type="default" round size="small" >写评论
        </van-button>
        <van-icon name="comment-o" info="123" color="#777" />
        <van-icon
          :color="article.is_collected? 'orange' : '#777'"
          :name="article.is_collected? 'star' : 'star-o'"
          @click="onCollect"
        />
        <van-icon
          :name="article.attitude === 1 ? 'good-job' : 'good-job-o'"
          :color="article.attitude === 1 ? 'hotpink' : '#777'"
          @click="onLike"
        />
        <van-icon name="share" color="#777" />
      </div>
    </div>
    <!-- /底部区域 -->
  </div>
</template>

<script>
/* 知识点：类似于github的 markdown的css样式文件 */
import './github-markdown.css'
import {
  getArticleById,
  addCollect,
  deleteCollect,
  addLike,
  deleteLike
} from '@/api/article'
import { ImagePreview } from 'vant'
import { addFollow, deleteFollow } from '@/api/user'
import CommentList from './components/comment-list.vue'
// 在组建中获取动态路由参数：
// 1. this.$route.params.xxx
// 2. props传参，推荐，【知识点】：在router中设置参数，props: true
export default {
  name: 'ArticleIndex',
  components: {
    CommentList
  },
  props: {
    articleId: {
      type: [String, Number, Object],
      required: true
    }
  },
  data () {
    return {
      article: {}, // 文章数据对象
      isFollowLoading: false, // 关注用户的按钮的 loading，防止连续点击
      isCollectLoading: false // 收藏文章按钮的 loading
    }
  },
  created () {
    this.loadArticle()
  },
  methods: {
    async onFollow () {
      this.isFollowLoading = true
      if (this.article.is_followed) {
        // 已关注，取消关注
        await deleteFollow(this.article.aut_id)
      } else {
        // 未关注，添加关注
        await addFollow(this.article.aut_id)
      }
      this.article.is_followed = !this.article.is_followed
      this.isFollowLoading = false
    },
    async onCollect () {
      this.$toast.loading({
        message: '操作中...',
        forbidClick: true // 知识点：慢速网络下，请求的时候 禁止背景点击
      })
      // this.isCollectLoading = true
      if (this.article.is_collected) {
        // 已收藏，取消关注
        await deleteCollect(this.articleId)
      } else {
        // 未收藏，添加关注
        await addCollect(this.articleId)
      }
      this.article.is_collected = !this.article.is_collected
      // this.isCollectLoading = false
      this.$toast.success(
        `${this.article.is_collected ? '' : '取消'}收藏成功`
      )
    },
    async onLike () {
      this.$toast.loading({
        message: '操作中...',
        forbidClick: true // 知识点：慢速网络下，请求的时候 禁止背景点击
      })
      // this.isCollectLoading = true
      if (this.article.attitude === 1) {
        // 已点赞，取消点赞
        await deleteLike(this.articleId)
        this.article.attitude = -1
      } else {
        // 未点赞，添加点赞
        await addLike(this.articleId)
        this.article.attitude = 1
      }
      this.$toast.success(
        `${this.article.attitude === 1 ? '' : '取消'}点赞成功`
      )
    },
    async loadArticle () {
      const { data } = await getArticleById(this.articleId)
      this.article = data.data
      // 知识点：图片预览
      // 获取文章内容dom容器
      // 得到所有的img标签，
      // 循环所有的img，给img注册点击事件
      // 在事件处理函数中调用 ImagePreview() 方法预览图片
      // 数据改变影响视图更新（操作DOM数据）不是立即的
      // 所以如果需要在修改数据之后马上操作被该数据影响的视图，需要把这个代码放到 $nextTick 中
      // 得到所有的 img 标签
      // this.$nextTick 是 Vue 提供的一个方法
      this.$nextTick(() => {
        this.handlePreviewImage()
      })
    },
    handlePreviewImage () {
      // 提取文章内容的 DOM 容器
      const articleContent = this.$refs['article-content']
      const imgs = articleContent.querySelectorAll('img')
      const imgPaths = []
      imgs.forEach((img, index) => {
        imgPaths.push(img.src)
        img.onclick = function () {
          ImagePreview({
            images: imgPaths, // 预览图片路径列表
            startPosition: index // 起始位置
          })
        }
      })
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
.article-bottom {
  position: fixed;
  bottom: 0;
  .art-bot-wrap {
    display: flex;
    justify-content: space-around;
    align-items: center;
    .comment-btn {
      width: 180px;
    }
    .van-icon {
      flex: 1;
    }
  }
}
.article-wrap {
  position: fixed;
  left: 0;
  right: 0;
  top: 46px;
  bottom: 46px;
  overflow-y: auto;
}
</style>
