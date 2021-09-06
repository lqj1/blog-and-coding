<template>
  <div id="swiper-com">
    <div class="swiper" id="swiperIndex">
      <swiper :autoplay="swiper_options.autoplay" :loop="swiper_options.loop" :speed="swiper_options.speed"
        :pagination="swiper_options.pagination" class="swiper-container">
        <swiper-slide v-for="(item,i) in state.imgs" :key="i">
          <img :src="item.pic" />
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive } from 'vue'
import SwiperCore, { Pagination, Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/swiper.less'
//这里导入对应样式
import 'swiper/components/pagination/pagination.less'
import { getBanners } from '@/api/index.js'
//导入后在SwiperCore.use([])里注册
SwiperCore.use([Pagination, Autoplay])
export default {
  name: 'swipercom',
  components: { Swiper, SwiperSlide },
  setup () {
    // swiper相关配置属性放在swiper_options这个变量里
    let swiper_options = reactive({
      autoplay: {
        delay: 3000,
        disableOnInteraction: false
      },
      loop: true,
      speed: 1000,
      // 如果需要分页器
      pagination: {
        clickable: true,
        el: '.swiper-pagination'
      },
      // 前进后退按钮
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }
    })
    // 获取本地图片
    let state = reactive({
      imgs: [
        // 初始值，会被请求的数据覆盖
        { pic: require('../assets/images/qq-music.jpg') },
        { pic: require('../assets/images/qq-music2.jpg') },
        { pic: require('../assets/images/qq-music3.jpg') },
        { pic: require('../assets/images/qq-music4.jpg') },
      ]
    })
    // 将swiper_options返回给模板中的swiper组件使用
    onMounted(async () => {
      // 请求banner
      let res = await getBanners(1)
      state.imgs = res.data.banners
    })
    return { state, swiper_options };
  },



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