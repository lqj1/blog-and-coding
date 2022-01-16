<template>
  <div class="iconlist">
    <div class="icon-item">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-tuijian"></use>
      </svg>
      <span>每日推荐</span>
    </div>
    <div class="icon-item">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-AdobeFm"></use>
      </svg>
      <span>私人FM</span>
    </div>
    <div class="icon-item">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-songlist-01"></use>
      </svg>
      <span>歌单</span>
    </div>
    <div class="icon-item">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-paihangbang"></use>
      </svg>
      <span>排行榜</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IconList'
}
</script>

<style lang="less" scoped>
.iconlist {
  width: 7.5rem;
  display: flex;
  justify-content: space-around;
  padding: 0.4rem;
  .icon-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    .icon {
      width: 0.8rem;
      height: 0.8rem;
    }
    span {
      font-size: 0.28rem;
    }
  }
}
</style>