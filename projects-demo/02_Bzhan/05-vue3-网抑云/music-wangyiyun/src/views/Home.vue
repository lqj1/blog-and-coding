<template>
  <div class="home">
    <!-- <div id="d1">
      // Symbol使用方式
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-sousuo"></use>
      </svg>
      // font-class使用方式
      <span class="iconfont icon-sousuo"></span>
    </div> -->
    <!-- 最顶端 -->
    <top-nav></top-nav>
    <!-- 轮播图 -->
    <swiper-com></swiper-com>
    <!-- 图标栏 -->
    <icon-list></icon-list>
    <!-- 发现好歌单 -->
    <music-list></music-list>
  </div>
</template>

<script>
// @ is an alias to /src
import TopNav from '@/components/TopNav.vue'
import SwiperCom from '@/components/SwiperCom.vue'
import IconList from '@/components/IconList.vue'
import MusicList from '@/components/MusicList.vue'
export default {
  name: 'carrousel',
  components: {
    TopNav,
    SwiperCom,
    IconList,
    MusicList
  },
  data: function () {
    return {

    }
  }
}
</script>
<style lang="less" scoped>
#d1 {
  width: 3.75rem;
  height: 3.75rem;
  background: skyblue;
}
</style>
