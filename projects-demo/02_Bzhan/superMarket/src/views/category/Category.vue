<template>
<div class="wrapper">
  <ul class="content">
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
    <li>1111</li>
  </ul>
</div>
 
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name: 'Category',
    data() {
      return {
        scroll: null
      }
    },
    mounted() {
      this.scroll = new BScroll(document.querySelector('.wrapper'),{
        probeType: 3,
        pullUpLoad: true
      })
      this.scroll.on('scroll',(position) => {
        console.log(position);
      })
      this.scroll.on('pullingUp',() => {
        console.log('上拉加载更多...')
      })
    }
  }
</script>

<style scoped>
.wrapper {
  height: 150px;
  background-color: #f00;
  overflow-y: scroll;
}
</style>