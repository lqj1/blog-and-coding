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
          <img :src="banner.imageUrl" alt="" width="100%">
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      msg: 'shoppingmall',
      locationIcon: require('../../assets/images/location.png'),
      bannerPicArray: [
        { imageUrl: 'http://images.baixingliangfan.cn/advertesPicture/20180407/20180407175040_1780.jpg' },
        { imageUrl: 'http://images.baixingliangfan.cn/advertesPicture/20180407/20180407175111_9509.jpg' },
        { imageUrl: 'http://images.baixingliangfan.cn/advertesPicture/20180407/20180407175142_6947.jpg' },
      ],
      category: [],
    }
  },
  created () {
    axios({
      url: 'https://www.fastmock.site/mock/b857271e6bbe13e6764694478ef91d8e/index/getdata',
      method: 'get'
    })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      })
  }
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
</style>