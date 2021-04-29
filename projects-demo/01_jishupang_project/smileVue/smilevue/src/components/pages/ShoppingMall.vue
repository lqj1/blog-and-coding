<template>
  <div>
    <div class="search-bar">
      <van-row class="test-row">
        <van-col span="3">
          <img :src="locationIcon" alt="" width="80%" class="location-icon">
        </van-col>
        <van-col span="16">
          <input type="text" class="search-input">
        </van-col>
        <van-col span="5">
          <van-button size="mini">查找</van-button>
        </van-col>
      </van-row>
    </div>
    <!-- swiper area -->
    <div class="swiper-area">
      <van-swipe :autoplay="1000">
        <van-swipe-item v-for="(banner,index) in bannerPicArray" :key="index">
          <img :src="banner.image" alt="" width="100%">
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- type bar -->
    <div class="type-bar">
      <div v-for="(cate,index) in category" :key="index">
        <img v-lazy="cate.image" width="90%" alt="">
        <span>{{cate.mallCategoryName}}</span>
      </div>
    </div>
    <!-- adBanner area -->
    <div>
      <img v-lazy="adBanner" width="100%">
    </div>
    <!-- recommend goods area -->
    <div class="recommend-area">
      <div class="recommend-title">
        商品推荐
      </div>
      <div class="recommend-body">
        <swiper ref="mySwiper" :options="swiperOptions">
          <swiper-slide v-for="(item,index) in recommendGoods" :key="index">
            <div class="recommend-item">
              <img :src="item.image" alt="" width="80%">
              <div>{{item.goodsName}}</div>
              <div>￥{{item.price}}(￥{{item.mallPrice}})</div>
            </div>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>
    </div>
    <!-- floor -->
    <floor-component :floorData="floor1" :floorTitle="floorName.floor1"></floor-component>
    <floor-component :floorData="floor2" :floorTitle="floorName.floor2"></floor-component>
    <floor-component :floorData="floor3" :floorTitle="floorName.floor3"></floor-component>
  </div>
</template>

<script>
import axios from 'axios'
import 'swiper/swiper-bundle.css'
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
import swiperDefault from '../swiper/swiperDefault'
import floorComponent from '../component/floorComponent'
import { toMoney } from '@/filter/moneyFilter.js'
// import 'swiper/css/swiper.css'
export default {
  components: {
    Swiper,
    SwiperSlide,
    swiperDefault,
    floorComponent
  },
  directives: {
    swiper: directive
  },
  data () {
    return {
      swiperOptions: {
        slidesPerView: 3,
        pagination: {
          el: '.swiper-pagination'
        },
        // Some Swiper option/callback...
      },

      msg: 'shoppingmall',
      locationIcon: require('../../assets/images/location.png'),
      bannerPicArray: [],
      category: [],
      adBanner: '',
      recommendGoods: [],
      floor1: [],
      floor2: [],
      floor3: [],
      floorName: {},
      // floor1_0: {},
      // floor1_1: {},
      // floor1_2: {},
    }
  },
  computed: {
    swiper () {
      return this.$refs.mySwiper.$swiper
    }
  },
  mounted () {
    console.log('Current Swiper instance object', this.swiper)
    this.swiper.slideTo(3, 1000, false)
  },
  created () {
    axios({
      url: 'https://www.fastmock.site/mock/b857271e6bbe13e6764694478ef91d8e/index/getdata',
      method: 'get'
    })
      .then(response => {
        console.log(response)
        if (response.status == 200) {
          this.category = response.data.data.category
          this.adBanner = response.data.data.advertesPicture.PICTURE_ADDRESS
          this.bannerPicArray = response.data.data.slides
          this.recommendGoods = response.data.data.recommend
          this.floor1 = response.data.data.floor1
          this.floor2 = response.data.data.floor2
          this.floor3 = response.data.data.floor3
          this.floorName = response.data.data.floorName;
          // this.floor1_0 = this.floor1[0]
          // this.floor1_1 = this.floor1[1]
          // this.floor1_2 = this.floor1[2]
          // console.log(this.category)
        }

      })
      .catch(error => {
        console.log(error)
      })
  },

}
</script>

<style scoped>
/* 1rem = 16px */
.search-bar {
  height: 2.2rem;
  background-color: #e5017d;
  overflow: hidden;
}
.search-input {
  width: 100%;
  height: 1.3rem;
  border-top: 0px;
  border-left: 0px;
  border-right: 0px;
  border-bottom: 1px solid #fff !important;
  background-color: #e5017d;
  color: #fff;
}
.location-icon {
  padding-top: .2rem;
  padding-left: .3rem;
}
.swiper-area {
  clear: both;
  max-height: 20rem;
  overflow: hidden;
}
.type-bar {
  background-color: #fff;
  margin: 0 .3rem .3rem .3rem;
  border-radius: .3rem;
  font-size: 14px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}
.type-bar div {
  padding: .3rem;
  font-size: 12px;
  text-align: center;
  width: 20%;
}
.recommend-area {
  background-color: #fff;
  margin-top: .3rem;
}
.recommend-title {
  border-bottom: 1px solid #eee;
  font-size: 14px;
  padding: .2rem;
  color: #e5017d;
}
.recommend-body {
  border-bottom: 1px solid #eee;
}
.recommend-item {
  width: 99%;
  border-right: 1px solid #eee;
  font-size: 12px;
  text-align: center;
}

</style>