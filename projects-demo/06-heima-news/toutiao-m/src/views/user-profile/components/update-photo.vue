<template>
  <div class="updatePhoto">
    <img :src="image" ref="image" />
    <van-nav-bar
      class="toolbar"
      left-text="取消"
      right-text="确认"
      @click-left="$emit('close')"
      @click-right="onConfirm"
    ></van-nav-bar>
  </div>
</template>

<script>
import { updateUserPhoto } from '@/api/user'
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
export default {
  name: 'updatePhoto',
  props: {
    // image: {
    //   type: String,
    //   required: true
    // }
    file: {
      required: true
    }
  },
  data () {
    return {
      image: window.URL.createObjectURL(this.file)
    }
  },
  mounted () {
    // 获取需要裁切的图片 DOM
    const image = this.$refs.image
    const cropper = new Cropper(image, {
      aspectRatio: 16 / 9,
      crop (event) {
        console.log(event.detail.x)
        console.log(event.detail.y)
        console.log(event.detail.width)
        console.log(event.detail.height)
        console.log(event.detail.rotate)
        console.log(event.detail.scaleX)
        console.log(event.detail.scaleY)
      }
    })
    console.log(cropper)
  },
  methods: {
    async onConfirm () {
      this.$toast.loading({
        message: '保存中',
        forbidclick: true
      })
      // 如果要求 Content-Type 是 multipart/form-data，则一定要提交 FormData 数据对象
      // 专门用于文件上传，不能提交 {}
      const fd = new FormData()
      fd.append('photo', this.file)
      await updateUserPhoto(fd)
      this.$toast.success('保存成功')
      // 更新父组件中的用户头像
      this.$emit('update-photo', this.image)
      // 关闭弹出层
      this.$emit('close')
    }
  }
}
</script>

<style lang="less" scoped>
.toolbar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>
