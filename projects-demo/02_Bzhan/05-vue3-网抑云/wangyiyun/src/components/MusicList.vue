<template>
  <div class="music-list">
    <div class="music-top">
      <div class="title">发现好歌单</div>
      <div class="more">查看更多</div>
    </div>
    <div class="mlist">
      <div v-swiper:mySwiper="swiperOption" class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide">Slide 1</div>
          <div class="swiper-slide">Slide 2</div>
          <div class="swiper-slide">Slide 3</div>
          <div class="swiper-slide">Slide 4</div>
          <div class="swiper-slide">Slide 5</div>
          <div class="swiper-slide">Slide 6</div>
          <div class="swiper-slide">Slide 7</div>
          <div class="swiper-slide">Slide 8</div>
          <div class="swiper-slide">Slide 9</div>
          <div class="swiper-slide">Slide 10</div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
// import style (>= Swiper 6.x)
// import 'swiper/swiper-bundle.css'
// import style (<= Swiper 5.x)
import 'swiper/css/swiper.css'

export default {
  components: {
  },
  data () {
    return {
      swiperOption: {
        slidesPerView: 3, // 一行显示多少张
        spaceBetween: 20,
        pagination: {
          el: '.swiper-pagination'
        },
        // ...
      }
    }
  },
  directives: {
    swiper: directive
  },
}
</script>

<style lang="less" scoped>
.music-list {
  width: 7.5rem;
  padding: 0 0.4rem;
  .music-top {
    display: flex;
    justify-content: space-between;
    height: 1rem;
    align-items: center;
    .title {
      font-size: 0.4rem;
      font-weight: 900;
    }
    .more {
      border: 1px solid #ccc;
      padding: 0.06rem;
      border-radius: 0.2rem;
      font-size: 0.24rem;
      height: 0.5rem;
      width: 1.2rem;
      text-align: center;
    }
  }
  .mlist {
    .swiper-container {
      width: 100%;
      height: 4rem;
      .swiper-slide {
        text-align: center;
        font-size: 18px;
        background: orange;
        /* Center slide text vertically */
        display: -webkit-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        -webkit-justify-content: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        -webkit-align-items: center;
        align-items: center;
      }
    }
  }
}
</style>