<template>
  <div class="search-top">
    <!-- 头部导航 -->
    <div class="search-nav">
      <!-- 左边后退 -->
      <div class="back" @click="$router.go(-1)">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xitongfanhui"></use>
        </svg>
      </div>
      <!-- 右边输入框 -->
      <div class="right">
        <input type="text" v-model="searchKeyword" :placeholder="placeholder" @keydown.enter="saveKeyword">
      </div>
    </div>
    <!-- 历史 -->
    <div class="history" v-show="searchSongs.length === 0">
      <div class="history-left">历史</div>
      <div class="history-right">
        <div class="keyword-item" v-for="(item,i) in keywordList" :key="i" @click="searchWord(item)">
          {{item}}
        </div>
      </div>
    </div>

    <!-- 播放歌单 -->
    <div class="searchSongs" v-show="searchSongs.length !== 0">
      <div class="searchSongs-top">
        <div class="left">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-bofangqi-bofangshu"></use>
          </svg>
          <div class="play-all">
            <div class="title">播放全部</div>
            <div class="num">(共{{searchSongs.length}}首)</div>
          </div>
        </div>
      </div>
      <!-- 播放歌曲列表 -->
      <div class="list">
        <div class="play-item" v-for="(item,i) in searchSongs" :key="i">
          <div class="left">
            <div class="index">{{i+1}}</div>
            <div class="content">
              <div class="title">{{item.name}}</div>
              <div class="author">
                <span>{{item.album.name}}</span>
              </div>
            </div>
          </div>
          <div class="right">
            <!-- 传入的 i 表示第几首 -->
            <svg class="icon" aria-hidden="true" @click="setPlay(item,i)">
              <use xlink:href="#icon-icon-"></use>
            </svg>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-gengduo-shuxiang"></use>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { searchMusic } from '@/api/index'
export default {
  data: function () {
    return {
      placeholder: '陈奕迅',
      searchKeyword: '', //绑定的input框的值
      keywordList: [], // localStorage存放的关键词的数组
      searchSongs: [] // 搜索歌曲列表
    }
  },
  beforeMount () {
    this.keywordList = localStorage.keywordList ? JSON.parse(localStorage.keywordList) : []
  },
  methods: {
    saveKeyword: async function () {
      this.keywordList.push(this.searchKeyword)
      this.keywordList = Array.from(new Set(this.keywordList))
      if (this.keywordList.length > 5) {
        this.keywordList = this.keywordList.slice(this.keywordList.length - 5, this.keywordList.length)
      }
      localStorage.keywordList = JSON.stringify(this.keywordList)
      let res = await searchMusic(this.searchKeyword)
      this.searchSongs = res.data.result.songs
    },
    searchWord: function (keyword) {
      this.searchKeyword = keyword
      this.saveKeyword()
    },
    setPlay (item, index) {
      item.al = item.album
      item.al.picUrl = item.album.artist.img1v1Url
      this.$store.commit('pushPlayList', item)
      this.$store.commit('setPlayIndex', this.$store.state.playlist.length - 1)
    }
  }
}
</script>

<style lang="less" scoped>
.search-top {
  width: 7.5rem;
  padding: 0 0.4rem;
  height: calc(100vh-1.2rem);
 
  .search-nav {
    display: flex;
    width: 100%;
    height: 1.2rem;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    .back {
      .icon {
        width: 0.4rem;
        height: 0.4rem;
      }
    }
    .right {
      padding: 0 0 0 0.4rem;
      flex: 1;
      input {
        border: none;
        outline: none;
        border-bottom: 1px solid #666;
        width: 100%;
        height: 0.5rem;
      }
    }
  }
  .history {
    display: flex;
    margin-top: 1.2rem;
    .history-left {
      width: 1.5rem;
      height: 0.6rem;
      line-height: 0.6rem;
      font-weight: 900;
      margin: 0.2rem 0;
    }
    .history-right {
      color: #666;
      display: flex;
      flex-wrap: wrap;
      .keyword-item {
        background-color: #eee;
        height: 0.6rem;
        line-height: 0.6rem;
        padding: 0 0.4rem;
        border-radius: 0.4rem;
        margin: 0.2rem 0.1rem;
      }
    }
  }
  .searchSongs {
    width: 7.5rem;
    padding: 0 0.4rem;
    background-color: #fff;
    border-top-left-radius: 0.3rem;
    border-top-right-radius: 0.3rem;
    position: fixed;
    top: 1.2rem;
    bottom: 1.2rem;
    overflow: scroll;
    .searchSongs-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 0.8rem;
      .left {
        display: flex;
        .play-all {
          display: flex;
          align-items: center;
          .num {
            color: #ccc;
          }
        }
        .icon {
          width: 0.50rem;
          height: 0.50rem;
        }      
        .title {
          font-size: 0.32rem;
        }
      }
      .right-btn {
        text-align: center;
        padding: 0 0.22rem;
        // width: 1.6rem;
        height: 0.65rem;
        line-height: 0.65rem;
        font-size: 0.28rem;
        color: #fff;
        background-color: orangered;
        border-radius: 0.5rem;
      }
    }
    .list {
      .play-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 1rem;
        margin: 0.3rem 0;
        .left {
          .index {
            width: 0.28rem;
          }
          display: flex;
          align-items: center;
          .content {
            margin-left: 0.4rem;
            .title {
              font-size: 0.3rem;
              font-weight: 900;
              color: #000;
              margin-bottom: 0.1rem;
            }
            .author {
              color: #666;
              .tag {
              font-size: 0.2rem;
              color: orangered;
              border: 1px solid orangered;
              border-radius: 0.1rem;
              margin: 0 0.03rem;
            }
            }
          }
        }
        .right {
          .icon {
            margin: 0 0.2rem;
          }
        }
      }
    }
  }
}
</style>