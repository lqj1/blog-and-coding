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
    <div class="play-content">
      <img src="@/assets/images/needle-ab.png" alt="">
      <img src="" alt="">
    </div>
    <div class="play-liric"></div>
    <div class="progress"></div>
    <div class="play-footer"></div>
  </div>
</template>

<script>
export default {
  props: ['playDetail']
}
</script>

<style lang="less" scoped>
.play-music {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: #fff;
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
}
</style>