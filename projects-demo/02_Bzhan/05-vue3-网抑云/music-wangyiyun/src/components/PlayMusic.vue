<template>
  <div class="play-music">
    <div class="bg" :style="{backgroundImage:`url(${playDetail.al.picUrl})`}"></div>
    <div class="play-top">
      <div class="back" @click="$emit('back')">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-fanhui"></use>
        </svg>
      </div>
      <div class="center">
        <div class="title">
          <marquee behavior="scroll" direction="left">{{playDetail.al.name}}</marquee>
        </div>
        <div class="author"></div>
      </div>
      <div class="share">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-fenxiang"></use>
        </svg>
      </div>
    </div>
    <div class="play-content" v-show="!lyricShow">
      <img class="needle" :class="{active: !paused}" src="@/assets/images/needle-ab.png" alt="">
      <img class="disc" src="@/assets/images/disc_default.png" alt="">
      <img class="play-img" :src="playDetail.al.picUrl" alt="">
    </div>
    <div class="play-lyric" v-show="lyricShow">
      <p :class="{active:(currentTime*1000>=item.pre && currentTime*1000<item.time)}"
        v-for="(item,i) in store.getters.lyricList" :key="i">
        {{item.lyric}}
      </p>
      <div>{{store.state.currentTime}}</div>
    </div>
    <div class="progress"></div>
    <div class="play-footer">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-liebiaoxunhuan"></use>
      </svg>
      <svg class="icon" aria-hidden="true" @click="preNextSong(-1)">
        <use xlink:href="#icon-shangyishoushangyige"></use>
      </svg>
      <svg v-if="paused" class="icon play" aria-hidden="true" @click="playSong">
        <use xlink:href="#icon-bofang"></use>
      </svg>
      <svg v-else class="icon play" aria-hidden="true" @click="playSong">
        <use xlink:href="#icon-zanting1"></use>
      </svg>
      <svg class="icon" aria-hidden="true" @click="preNextSong(1)">
        <use xlink:href="#icon-xiayigexiayishou"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-liebiao"></use>
      </svg>
    </div>
  </div>
</template>

<script>
// import { getLyric } from '@/api/index.js'
import { ref, computed, onMounted, watch } from 'vue'
import { useStore } from 'vuex'
export default {
  // 包括属性和方法
  props: ['playDetail', 'paused', 'playSong'],
  setup () {
    let lyricShow = ref(true)
    // 获取store中歌词
    const store = useStore()
    const lyric = computed(() => store.state.lyric)
    const currentTime = computed(() => store.state.currentTime)
    const playlist = computed(() => store.state.playlist)
    const playCurrentIndex = computed(() => store.state.playCurrentIndex)
    const preNextSong = (num) => {
      // console.log(num);
      // console.log(playlist);
      // console.log(playCurrentIndex);
      let index = playCurrentIndex.value + num
      if (index < 0) {
        index = playlist.value.length - 1
      } else if (index == playlist.value.length) {
        index = 0
      }
      // console.log('index', index);
      store.commit('setPlayIndex', index)
    }
    return { lyricShow, lyric, store, currentTime, preNextSong }
  }
}
</script>

<style lang="less" scoped>
.play-music {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: #FFF;
  .bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background-size: auto 100%;
    background-position: center;
    filter: blur(60px);
  }
  .play-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 7.5rem;
    height: 1.2rem;
    position: absolute;
    left: 0;
    top: 0;
    color: #fff;
    padding: 0 0.4rem;
    .icon {
      width: 0.5rem;
      height: 0.5rem;
    }
    marquee {
      width: 5rem;
      flex: 1;
    }
  }
  .play-content {
    position: relative;
    width: 7.5rem;
    height: auto;
    left: 0;
    top: 1.5rem;
    .needle {
      width: 2.5rem;
      height: auto;
      position: absolute;
      left: 3.2rem;
      transform-origin: 0.3rem 0;
      transform: rotate(-15deg);
      z-index: 10;
      transition: all 1s;
    }
    .needle.active {
      transform: rotate(25deg);
      transition: all 1s;
    }
    .disc {
      width: 5.5rem;
      height: auto;
      border-radius: 50%;
      position: absolute;
      left: calc(50% - 2.75rem);
      top: 2.5rem;
    }
    .play-img {
      width: 3.6rem;
      height: 3.6rem;
      border-radius: 50%;
      position: absolute;
      left: calc(50% - 1.8rem);
      top: 3.45rem;
    }
  }
  .play-lyric {
    position: absolute;
    width: 7.5rem;
    height: 8rem;
    left: 0;
    top: calc(50% - 4rem);
    text-align: center;
    overflow: scroll;
    color: #fff;
    padding: 0.2rem 0;
    .active {
      color: orangered;
    }
  }
  .play-footer {
    width: 7.5rem;
    height: 1.5rem;
    position: absolute;
    left: 0;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0.8rem;
    .icon {
      fill: #fff;
      width: 0.5rem;
      height: 0.5rem;
    }
    .play {
      width: 0.8rem;
      height: 0.8rem;
    }
  }
}
</style>