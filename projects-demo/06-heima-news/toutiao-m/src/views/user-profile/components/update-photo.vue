<template>
  <div class="updatePhoto">
    <img class="image" :src="image" ref="image" />
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
      image: window.URL.createObjectURL(this.file),
      cropper: null // 裁切器实例
    }
  },
  mounted () {
    // 获取需要裁切的图片 DOM
    const image = this.$refs.image
    this.cropper = new Cropper(image, {
      viewMode: 1,
      dragMode: 'move',
      aspectRatio: 1,
      // autoCropArea: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false,
      movable: true
    })
  },
  methods: {
    getCroppedCanvas () {
      return new Promise(resolve => {
        this.cropper.getCroppedCanvas().toBlob((file) => {
          resolve(file)
        })
      })
    },
    async onConfirm () {
      this.$toast.loading({
        message: '保存中',
        forbidclick: true
      })

      const file = await this.getCroppedCanvas()
      const fd = new FormData()
      fd.append('photo', file) // 上传裁切后的图片

      // 如果要求 Content-Type 是 multipart/form-data，则一定要提交 FormData 数据对象
      // 专门用于文件上传，不能提交 {}
      // const fd = new FormData()
      // fd.append('photo', this.file)
      await updateUserPhoto(fd)
      this.$toast.success('保存成功')
      // 更新父组件中的用户头像
      // this.$emit('update-photo', this.image)
      this.$emit('update-photo', window.URL.createObjectURL(file)) // 将裁切之后的文件转成图片上传
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
  background-color: #000;
}
.image {
  display: block;
  max-width: 100%;
}
</style>
