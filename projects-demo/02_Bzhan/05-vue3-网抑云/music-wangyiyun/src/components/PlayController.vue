<template>
  <div class="play-controller">
    <div class="left" @click="playShow=!playShow">
      <img :src="playlist[playCurrentIndex].al.picUrl" alt="">
      <div class="content">
        <div class="title">{{playlist[playCurrentIndex].al.name}}</div>
        <div class="tips">横划可以切换上下首</div>
      </div>
    </div>
    <div class="right">
      <svg v-if="paused" class="icon" aria-hidden="true" @click="playSong">
        <use xlink:href="#icon-bofang"></use>
      </svg>
      <svg v-else class="icon" aria-hidden="true" @click="playSong">
        <use xlink:href="#icon-zanting"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-liebiao"></use>
      </svg>
    </div>
    <play-music v-show="playShow" :playSong="playSong" :playDetail="playlist[playCurrentIndex]" :paused="paused"
      @back="playShow=!playShow">
    </play-music>
    <audio ref="myAudio"
      :src="`https://music.163.com/song/media/outer/url?id=${playlist[playCurrentIndex].id}.mp3`"></audio>
  </div>
</template>

<script>
import PlayMusic from '@/components/PlayMusic.vue'
import { computed, onMounted, ref, reactive } from 'vue'
import { useStore } from 'vuex'
export default {
  components: {
    PlayMusic
  },
  setup () {
    // 获取 vuex 数据
    const store = useStore()
    const playlist = computed(() => store.state.playlist)
    // console.log('playlist', playlist);
    const playCurrentIndex = computed(() => store.state.playCurrentIndex)
    // 获取 audio
    const myAudio = ref(null)
    let playlistValue = null
    let playIndex = null
    playlistValue = playlist.value
    playIndex = playCurrentIndex.value
    let playId = playlistValue[playIndex].id
    onMounted(() => {
      // console.dir(myAudio.value)
      // store中异步获取歌词
      // console.log('playlist', playlist.value[playCurrentIndex.value].id);
      store.dispatch('reqLyric', { id: playId })
    })
    // 播放切换，初始值为暂停状态为真
    let paused = ref(true)
    // 播放器播放
    const playSong = () => {
      // console.log('test', myAudio.value);
      if (myAudio.value.paused) {
        // ref的数据需要在value中获取
        myAudio.value.play()
        // 开始播放，暂停状态为假
        paused.value = false
        // 更新时间
        updateTime()
      } else {
        myAudio.value.pause()
        paused.value = true
        // 取消时间更新的定时器
        clearInterval(store.state.intervalId)
      }
    }
    // 更新时间
    const updateTime = () => {
      console.log('currentTIme', myAudio.value.currentTime);
      store.state.intervalId = setInterval(() => {
        store.commit('setCurrentTime', myAudio.value.currentTime)
      }, 1000)
    }

    // 播放页面的显示
    let playShow = ref(false)
    return {
      playlist,
      playCurrentIndex,
      myAudio,
      playSong,
      updateTime,
      paused,
      playShow
    }
  },
}
</script>

<style lang="less" scoped>
.play-controller {
  background: #fff;
  width: 7.5rem;
  height: 1.2rem;
  position: fixed;
  left: 0;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #ccc;
  .left {
    display: flex;
    padding: 0 0.2rem;
    img {
      width: 0.8rem;
      height: 0.8rem;
      border-radius: 0.4rem;
    }
    .content {
      padding: 0 0.2rem;
      .tips {
        font-size: 0.2rem;
        color: #999;
      }
    }
  }
  .right {
    .icon {
      width: 0.4rem;
      height: 0.4rem;
      margin: 0 0.2rem;
    }
  }
}
</style>