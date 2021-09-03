<template>
  <div id="swiper-com">
    <div class="swiper" id="swiperIndex">
      <Swiper ref="mySwiper" :options="swiperOptions" class="swiper-container">
        <Swiper-slide v-for="(item,i) in imgs" :key="i">
          <img :src="item.pic" />
        </Swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </Swiper>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
// import style (>= Swiper 6.x)
// import 'swiper/swiper-bundle.css'
// import style (<= Swiper 5.x)
import 'swiper/css/swiper.css'
import axios from 'axios'
import { getBanners } from '@/api/index'
export default {
  name: 'carrousel',
  components: {
    Swiper,
    SwiperSlide
  },
  directives: {
    swiper: directive
  },
  data: function () {
    return {
      swiperOptions: {
        // 循环模式
        loop: true,
        // 如果需要分页器
        pagination: {
          el: '.swiper-pagination'
        },
        // 前进后退按钮
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }
        // Some Swiper option/callback...
      },
      // 获取本地图片
      imgs: [
        // 初始值，会被请求的数据覆盖
        { pic: require('../assets/images/qq-music.jpg') },
        { pic: require('../assets/images/qq-music2.jpg') },
        { pic: require('../assets/images/qq-music3.jpg') },
        { pic: require('../assets/images/qq-music4.jpg') },
      ]
    }
  },
  computed: {
    swiper () {
      return this.$refs.mySwiper.$swiper
    }
  },
  async mounted () {
    console.log('Current Swiper instance object', this.swiper)
    this.swiper.slideTo(3, 1000, false)
    // 请求banner
    let res = await getBanners(1)
    this.imgs = res.data.banners
  }
}
</script>

<style lang="less" scoped>
#swiper-com {
  width: 7.5rem;
  #swiperIndex {
    .swiper-container {
      // margin-top: 0.10rem;
      width: 7.1rem;
      height: 2.6rem;
      border-radius: 0.1rem;
    }
    .swiper-container img {
      width: 100%;
    }
    /deep/ .swiper-pagination-bullet-active {
      background: orangered;
    }
  }
}

</style>