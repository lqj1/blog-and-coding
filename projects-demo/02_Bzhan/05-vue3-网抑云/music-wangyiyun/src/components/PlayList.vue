<template>
  <div class="playlist">
    <div class="playlist-top">
      <div class="left">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-bofangqi-bofangshu"></use>
        </svg>
        <div class="play-all">
          <div class="title">播放全部</div>
          <div class="num">(共{{playlist.tracks.length}}首)</div>
        </div>
      </div>
      <div class="right-btn">
        + 收藏({{formatValue(playlist.subscribedCount)}})
      </div>
    </div>
    <!-- 播放歌曲列表 -->
    <div class="list">
      <div class="play-item" v-for="(item,i) in playlist.tracks" :key="i">
        <div class="left">
          <div class="index">{{i+1}}</div>
          <div class="content">
            <div class="title">{{item.name}}</div>
            <div class="author">
              <span class="tag" v-for="(tag,index) in playlist.tags" :key="index">{{tag}}</span>
              <span>{{item.al.name}}</span>
            </div>
          </div>
        </div>
        <div class="right">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-icon-"></use>
          </svg>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-gengduo-shuxiang"></use>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
.playlist {
  width: 7.5rem;
  margin-top: 0.22rem;
  padding: 0 0.4rem;
  background-color: #fff;
  border-top-left-radius: 0.3rem;
  border-top-right-radius: 0.3rem;
  .playlist-top {
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
</style>