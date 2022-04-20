<template>
  <!-- <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div> -->
  <div>
    <router-view />
    <play-controller></play-controller>
  </div>

</template>
<script>
import PlayController from '@/components/PlayController.vue'
export default {
  components: {
    PlayController
  }
}
</script>
<style lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.icon {
  width: 0.30rem;
  height: 0.30rem;
}
a {
  color: #333;
  text-decoration: none;
}
</style>
