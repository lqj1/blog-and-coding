<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar class="app-nav-bar"
                 title="文章详情"
                 left-arrow
                 @click-left="$router.back()" />
    <!-- /导航栏 -->
    <!-- 正文部分 -->
    <div class="article-wrap">
      <h1 class="title">{{article.title}}</h1>
      <van-cell center
                class="user-info">
        <div slot="title"
             class="name">{{article.aut_name}}</div>
        <!-- 知识点：fit:cover 设置图片完全覆盖 -->
        <van-image class="avatar"
                   slot="icon"
                   fit="cover"
                   src="article.aut_photo"
                   round></van-image>
        <div slot="label"
             class="pubdate">{{article.pubdate | relativeTime}}</div>
        <van-button class="follow-btn"
                    round
                    size="small"
                    :type="article.is_followed ? 'default' : 'info'"
                    :icon="article.is_followed ? '' : 'plus'"
                    :loading="isFollowLoading"
                    @click="onFollow">
          {{article.is_followed ? '已关注' : '关注'}}
        </van-button>
      </van-cell>
      <!-- 知识点：类似于github的 markdown的css样式文件 -->
      <div class="content markdown-body"
           v-html="article.content"
           ref="article-content">
      </div>
      <!-- 文章评论列表 -->
      <comment-list :source="articleId"
                    :list="commentList"
                    @update-total-count="totalCommentCount = $event"
                    @reply-click="onReplyClick"></comment-list>
      <!-- /文章评论列表 -->
    </div>
    <!-- /正文部分 -->
    <!-- 底部区域 -->
    <div class="article-bottom">
      <van-button class="comment-btn"
                  type="default"
                  round
                  size="small"
                  @click="isPostShow = true">写评论</van-button>
      <van-icon name="comment-o"
                :info="totalCommentCount"
                color="#777" />
      <van-icon :color="article.is_collected? 'orange' : '#777'"
                :name="article.is_collected? 'star' : 'star-o'"
                @click="onCollect" />
      <van-icon :name="article.attitude === 1 ? 'good-job' : 'good-job-o'"
                :color="article.attitude === 1 ? 'hotpink' : '#777'"
                @click="onLike" />
      <van-icon name="share"
                color="#777" />
    </div>
    <!-- /底部区域 -->
    <!-- 发布评论 -->
    <van-popup v-model="isPostShow"
               position="bottom"
               :style="{ height: '30%' }">
      <post-comment :target="articleId"
                    @post-success="onPostSuccess" />
    </van-popup>
    <!-- /发布评论 -->
    <!-- 评论回复 -->
    <van-popup v-model="isReplyShow"
               position="bottom"
               :style="{ height: '60%' }">
      <comment-reply v-if="isReplyShow"
                     :comment="replyComment"
                     :article-id="articleId"
                     @close="isReplyShow = false" />
    </van-popup>
    <!-- /评论回复 -->
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
import PostComment from './components/post-comment.vue'
import CommentReply from './components/comment-reply.vue'
// 在组件中获取动态路由参数：
// 1. this.$route.params.xxx
// 2. props传参，推荐，【知识点】：在router中设置参数，props: true
export default {
  name: 'ArticleIndex',
  components: {
    CommentList,
    PostComment,
    CommentReply
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
      isCollectLoading: false, // 收藏文章按钮的 loading
      isPostShow: false, // 控制发布评论的显示状态
      isReplyShow: false, // 评论回复的显示状态
      commentList: [], // 文章评论列表
      totalCommentCount: 0, // 评论的总数量
      replyComment: {} // 当前回复评论对象
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
    },
    onPostSuccess (comment) {
      // console.log(comment)
      // 把发布成功的评论内容放到评论列表底部
      this.commentList.unshift(comment)
      // 更新评论的总数量
      this.totalCommentCount++
      // 关闭发布评论弹出层
      this.isPostShow = false
    },
    onReplyClick (comment) {
      // console.log('reply', comment)
      this.replyComment = comment
      // 展示回复内容
      this.isReplyShow = true
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
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-sizing: border-box;
  height: 44px;
  // border-top: 1px solid #d8d8d8;
  background-color: #fff;
  .comment-btn {
    width: 141px;
    height: 23px;
    // border: 1px solid #eee;
    font-size: 15px;
    line-height: 23px;
    color: #a7a7a7;
  }
  .van-icon {
    font-size: 20px;
    .van-info {
      font-size: 11px;
      background-color: #e22829;
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
