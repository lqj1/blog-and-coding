<template>
  <div>
    <h1>films{{$route.params.id}}</h1>
  </div>
</template>

<script>
export default {
  mounted () {
    console.log(this.$route);
  }
}
</script>

<style scoped>

</style>