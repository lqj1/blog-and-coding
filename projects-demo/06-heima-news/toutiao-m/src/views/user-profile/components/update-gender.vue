<template>
  <div class="update-gender">
    <!-- 导航栏 -->
    <van-picker
      show-toolbar
      :columns="columns"
      :default-index="defaultIndex"
      @cancel="$emit('close')"
      @confirm="onConfirm"
      @change="onGenderChange"
    />
    <!-- 导航栏 -->
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'
export default {
  name: 'UpdateName',
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      columns: ['男', '女'],
      defaultIndex: this.value
    }
  },
  methods: {
    async onConfirm () {
      this.$toast.loading({
        message: '保存中',
        forbidclick: true // 禁止背景点击
      })
      // 请求更新用户的性别
      await updateUserProfile({
        gender: this.defaultIndex
      })
      this.$toast.success('保存成功')
      this.$emit('input', this.defaultIndex)
      this.$emit('close')
    },
    onGenderChange (picker, value, index) {
      this.defaultIndex = index
    }
  }
}
</script>
<style lang="less" scoped>
.name-field-wrap {
  padding: 10px;
}
</style>
