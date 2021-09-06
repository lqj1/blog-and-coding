<template>
  <div class="listview-top">
    <img :src="playlist.coverImgUrl" alt="" class="bg">
    <div class="listviewtop-nav">
      <!-- 左边后退 -->
      <div class="back">
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
  </div>
</template>

<script>
export default {
  props: ['playlist'],
  mounted () {
    // console.log(this.props);
  }
}
</script>

<style lang="less" scoped>
.listview-top {
  width: 7.5rem;
  padding: 0 0.4rem;
  height: 6rem;
  .bg {
    position: fixed;
    left: 0;
    top: 0;
    width: 7.5rem;
    height: auto;
    z-index: -1;
    filter: blur(2px);
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
      color: #eee;
      .icon {
        width: 0.5rem;
        height: 0.5rem;
        fill: #eee;
      }
      .title {
        margin-left: 0.4rem;
      }
      .search {
        margin-right: 0.4rem;
      }
    }
  }
  
}
</style>