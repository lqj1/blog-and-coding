<template>
  <div class="listview-top">
    <!-- 背景图片 -->
    <img :src="playlist.coverImgUrl" alt="" class="bg">
    <!-- 头部导航 -->
    <div class="listviewtop-nav">
      <!-- 左边后退 -->
      <div class="back" @click="$router.go(-1)">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xitongfanhui"></use>
        </svg>
        <div class="title">歌单</div>
      </div>
      <!-- 右边 -->
      <div class="right">
        <svg class="icon search" aria-hidden="true">
          <use xlink:href="#icon-sousuo"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-gengduo-shuxiang"></use>
        </svg>
      </div>
    </div>
    <!-- 主要内容 -->
    <div class="content">
      <div class="content-left">
        <img :src="playlist.coverImgUrl">
        <div class="count">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-xiangyousanjiaoxing"></use>
          </svg>
          <span>{{formatValue(playlist.playCount)}}</span>
        </div>
      </div>
      <div class="content-right">
        <h3>{{playlist.name}}</h3>
        <div class="author">
          <img :src="playlist.creator.avatarUrl" alt="" class="header">
          <span>{{playlist.creator.nickname}}</span>
        </div>
        <div class="description">
          {{playlist.description}}
        </div>
      </div>
    </div>
    <!-- 四个图标列表 -->
    <div class="iconlist">
      <div class="icon-item">
        <svg class="icon-four" aria-hidden="true">
          <use xlink:href="#icon-pinglun"></use>
        </svg>
        <span>{{playlist.commentCount}}</span>
      </div>
      <div class="icon-item">
        <svg class="icon-four" aria-hidden="true">
          <use xlink:href="#icon-fenxiang"></use>
        </svg>
        <span>{{playlist.shareCount}}</span>
      </div>
      <div class="icon-item">
        <svg class="icon-four" aria-hidden="true">
          <use xlink:href="#icon-yunxiazai"></use>
        </svg>
        <span>下载</span>
      </div>
      <div class="icon-item">
        <svg class="icon-four" aria-hidden="true">
          <use xlink:href="#icon-icon_duoxuankuangzu"></use>
        </svg>
        <span>多选</span>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted } from 'vue'
export default {
  props: ['playlist'],
  setup () {
    let formatValue = (num) => {
      let res = num
      if (num >= 100000000) {
        res = (num / 100000000).toFixed(2) + '亿'
      } else if (num >= 10000) {
        res = (num / 10000).toFixed(2) + '万'
      }
      return res
    }
    return { formatValue }
  }
}
</script>

<style lang="less" scoped>
.listview-top {
  width: 7.5rem;
  padding: 0 0.4rem;
  .bg {
    position: fixed;
    left: 0;
    top: 0;
    width: 7.5rem;
    height: auto;
    z-index: -1;
    filter: blur(15px);
  }
  .listviewtop-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 1.2rem;
    font-size: 0.33rem;
    .back, .right {
      display: flex;
      align-items: center;
      color: #fff;
      .icon {
        width: 0.5rem;
        height: 0.5rem;
        fill: #fff;
      }
      .title {
        margin-left: 0.4rem;
      }
      .search {
        margin-right: 0.4rem;
      }
    }
  }
  .content {
    display: flex;
    justify-content: space-between;
    padding: 0.4rem 0;
    .content-left {
      position: relative;
      display: flex;
      img {
        width: 2.8rem;
        height: 2.8rem;
        border-radius: 0.1rem;
      }
      .count {
        position: absolute;
        right: 0.1rem;
        span {
          color: #eee;
        }
      }
    }
    .content-right {
      width: 3.5rem;
      h3 {
        color: #fff;
      }
      .author {
        display: flex;
        align-items: center;
        margin: 0.2rem 0;
        span {
          color: #eee;
        }
        img.header {
          width: 0.6rem;
          height: 0.6rem;
          border-radius: 0.3rem;
          margin-right: 0.2rem;
        }
      }
      .description {
          font-size: 0.24rem;
          color: #ddd;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
    }
  }
  .iconlist {
    display: flex;
    justify-content: space-around;
    .icon-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      .icon-four {
        width: 0.55rem;
        height: 0.55rem;
        fill: #eee;
      }
      span {
        color: #ccc;
        font-size: 0.26rem;
      }
    }
  }
}
</style>