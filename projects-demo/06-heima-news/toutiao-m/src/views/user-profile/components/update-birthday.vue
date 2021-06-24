<template>
  <div class="updateBirthday">
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
    />
  </div>
</template>

<script>
export default {
  name: 'UpdateBirthday',
  data () {
    return {
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 0, 1),
      currentDate: new Date()
    }
  }
}
</script>

<style lang="less" scoped>

</style>
