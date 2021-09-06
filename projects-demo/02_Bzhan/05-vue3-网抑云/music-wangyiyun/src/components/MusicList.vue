<template>
  <div class="music-list">
    <div class="music-top">
      <div class="title">发现好歌单</div>
      <div class="more">查看更多</div>
    </div>
    <div class="mlist">
      <swiper :autoplay="swiper_options.autoplay" :loop="swiper_options.loop" :speed="swiper_options.speed"
        :pagination="swiper_options.pagination" :slidesPerView="swiper_options.slidesPerView"
        :spaceBetween="swiper_options.spaceBetween">
        <swiper-slide v-for="(item,i) in state.musicList" :key="i">
          <img class="img" :src="item.picUrl" alt="">
          <div class="name">{{item.name}}</div>
          <div class="count">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-xiangyousanjiaoxing"></use>
            </svg>
            {{formatValue(item.playCount)}}
          </div>
        </swiper-slide>
        <!-- <div class="swiper-wrapper">
          <router-link :to="{path:'/listview', query:{id: item.id}}" class="swiper-slide"
            v-for="(item,index) in state.musicList" :key="index">
            <img class="img" :src="item.picUrl" alt="">
            <div class="name">{{item.name}}</div>
            <div class="count">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-xiangyousanjiaoxing"></use>
              </svg>
              {{formatValue(item.playCount)}}
            </div>
          </router-link>
        </div> -->
      </swiper>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive } from 'vue'
import { getMusicList } from '@/api/index.js'
import SwiperCore, { Pagination, Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/swiper.less'
//这里导入对应样式
import 'swiper/components/pagination/pagination.less'
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
      slidesPerView: 3,
      spaceBetween: 30,
      slidesPerGroup: 4,
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
    // 请求的图片数据
    let state = reactive({
      musicList: []
    })
    // 格式化数据
    let formatValue = (num) => {
      let res = 0
      if (num >= 100000000) {
        res = (num / 100000000).toFixed(2) + '亿'
      } else if (num >= 10000) {
        res = (num / 10000).toFixed(2) + '万'
      }
      return res
    }
    onMounted(async () => {
      let res = await getMusicList()
      state.musicList = res.data.result
      console.log('res', res);
    })
    return { state, swiper_options, formatValue };
  }
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
    width: 100%;
    height: 3.2rem;          
    img {
      width: 100%;
      height: auto;
      border-radius: 0.1rem;
    }
    .name {
      height: 0.7rem;
      width: 100%;
      font-size: 0.26rem;
    }
    .count {
      position: absolute;
      right: 0.2rem;
      top: 0.15rem;
      font-size: 0.24rem;
      color: #ddd;
      display: flex;
      align-items: center;
    }
  }
}
</style>