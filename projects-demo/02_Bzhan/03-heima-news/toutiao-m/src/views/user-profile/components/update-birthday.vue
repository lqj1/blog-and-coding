<template>
  <div class="updateBirthday">
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="$emit('close')"
      @confirm="onConfirm"
    />
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'
import dayjs from 'dayjs'
export default {
  name: 'UpdateBirthday',
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.value)
    }
  },
  methods: {
    async onConfirm () {
      // 请求提交更新用户生日
      // 更新父组件中的用户生日
      // 关闭弹出层
      this.$toast.loading({
        message: '保存中',
        forbidclick: true // 禁止背景点击
      })
      // 自己获取年月日
      // const data = `${this.currentDate.getFullYear()} - ${this.currentDate.getMonth() + 1} - ${this.currentDate.getDate()}`
      // 或者也可以使用 dayjs 插件格式化
      const data = dayjs(this.currentDate).format('YYYY-MM-DD')
      // 请求更新用户的生日
      await updateUserProfile({
        birthday: data
      })
      this.$emit('input', data)
      this.$emit('close')
      this.$toast.success('保存成功')
    }
  }
}
</script>

<style lang="less" scoped>

</style>
