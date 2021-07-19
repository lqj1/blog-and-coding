<template>
  <div class="home">

  </div>
</template>

<script>
// @ is an alias to /src
import { onMounted } from 'vue'
import { getHomeAllData } from 'network/home'
export default {
  name: 'Home',
  setup () {
    const banner = ref([])
    onMounted(() => {
      getHomeAllData().then(res => {
        console.log(res);
      }).catch(err => {
        console.log(err);
      })
    })
    return {
      banner
    }
  },
  components: {

  }
}
</script>
