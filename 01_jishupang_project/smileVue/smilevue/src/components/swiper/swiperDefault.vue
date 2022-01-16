<template>
  <div>
    <swiper>
      <swiper-slide class="swiper-slide" v-for="(item,index) in slide" :key="index">
        Slide {{item}}
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import 'swiper/swiper-bundle.css'
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
export default {
  components: {
    Swiper,
    SwiperSlide
  },
  data () {
    return {
      slide: [1, 2, 3, 4, 5, 6]
    }
  }
}
</script>

<style  scoped>
.swiper-slide {
  height: .4rem;
  text-align: center;
  padding-top: 3rem;
  border-bottom: 1px solid #ccc;
}
</style>