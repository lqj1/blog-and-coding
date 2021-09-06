<template>
  <div class="music-list">
    <div class="music-top">
      <div class="title">发现好歌单</div>
      <div class="more">查看更多</div>
    </div>
    <div class="mlist">
      <div v-swiper:mySwiper="swiperOption" class="swiper-container">
        <div class="swiper-wrapper">
<<<<<<< HEAD
          <router-link :to="{path:'/listview', query:{id: item.id}}" class="swiper-slide"
            v-for="(item,index) in musicList" :key="index">
=======
          <div class="swiper-slide" v-for="(item,index) in musicList" :key="index">
>>>>>>> 7f13b7d360fdbec50a808d395fab16db8a9122f5
            <img :src="item.picUrl" alt="">
            <div class="name">{{item.name}}</div>
            <div class="count">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-xiangyousanjiaoxing"></use>
              </svg>
              {{formatValue(item.playCount)}}
            </div>
<<<<<<< HEAD
          </router-link>
=======
          </div>
>>>>>>> 7f13b7d360fdbec50a808d395fab16db8a9122f5
        </div>
        <div class="swiper-pagination"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { getMusicList } from '@/api/index.js'
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
// import style (>= Swiper 6.x)
// import 'swiper/swiper-bundle.css'
// import style (<= Swiper 5.x)
import 'swiper/css/swiper.css'

<<<<<<< HEAD
// vue2 写法
export default {
  components: {
  },
  data () {
    return {
      swiperOption: {
        slidesPerView: 3, // 一行显示多少张
        spaceBetween: 10,
        // 不需要配置点
        // pagination: {
        //   el: '.swiper-pagination'
        // },
        // ...
      },
      musicList: [], // 推荐列表数据
    }
  },
  methods: {
    formatValue: function (num) {
      let res = 0
      if (num >= 100000000) {
        res = (num / 100000000).toFixed(2) + '亿'
      } else if (num >= 10000) {
        res = (num / 10000).toFixed(2) + '万'
      }
      return res
    }
  },
  directives: {
    swiper: directive
  },
  mounted: async function () {
    let res = await getMusicList()
    this.musicList = res.data.result
    console.log('res', res);
  },
  // 过滤函数
  filter: {
  }
}
=======
// // vue2 写法
// export default {
//   components: {
//   },
//   data () {
//     return {
//       swiperOption: {
//         slidesPerView: 3, // 一行显示多少张
//         spaceBetween: 10,
//         // 不需要配置点
//         // pagination: {
//         //   el: '.swiper-pagination'
//         // },
//         // ...
//       },
//       musicList: [], // 推荐列表数据
//     }
//   },
//   methods: {
//     formatValue: function (num) {
//       let res = 0
//       if (num >= 100000000) {
//         res = (num / 100000000).toFixed(2) + '亿'
//       } else if (num >= 10000) {
//         res = (num / 10000).toFixed(2) + '万'
//       }
//       return res
//     }
//   },
//   directives: {
//     swiper: directive
//   },
//   mounted: async function () {
//     let res = await getMusicList()
//     this.musicList = res.data.result
//     console.log('res', res);
//   },
//   // 过滤函数
//   filter: {
//   }
// }
>>>>>>> 7f13b7d360fdbec50a808d395fab16db8a9122f5
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
      height: 3rem;
      .swiper-slide {
        text-align: center;
        font-size: 18px;
        /* Center slide text vertically */
        display: -webkit-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        flex-direction: column;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        -webkit-justify-content: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        -webkit-align-items: center;
        align-items: center;
        img {
          width: 100%;
          height: auto;
          border-radius: 0.1rem;
        }
        .name {
          height: 0.6rem;
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
  }
}
</style>