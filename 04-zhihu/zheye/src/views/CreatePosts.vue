<template>
  <div class="create-post-page">
    <h4>{{isEditMode ? '编辑文章' : '新建文章'}}</h4>
    <uploader action="/upload" :beforeUpload="uploadCheck" @file-uploaded="handleFileUploaded" :uploaded="uploadedData"
      class="d-flex align-items-center justify-content-center bg-light text-secondary w-100 my-4">
      <h2>点击上传头图</h2>
      <template #loading>
        <div class="d-flex">
          <div class="spinner-border text-secondary" role="status">
            <span class="sr-only">Loading...</span>
          </div>
          <h2>正在上传</h2>
        </div>
      </template>
      <template #uploaded="dataProps">
        <div class="uploaded-area">
          <img :src="dataProps.uploadedData.data.url">
          <h3>点击重新上传</h3>
        </div>
      </template>
    </uploader>
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">文章标题：</label>
        <validate-input :rules="titleRules" v-model="titleVal" placeholder="请输入文章标题" type="text" />
      </div>
      <div class="mb-3">
        <label class="form-label">文章详情：</label>
        <validate-input rows="10" tag="textarea" placeholder="请输入文章详情" :rules="contentRules" v-model="contentVal" />
      </div>
      <template #submit>
        <button class="btn btn-primary btn-large">{{isEditMode ? '更新文章' : '发表文章'}}
        </button>
      </template>
    </validate-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { GlobalDataProps, PostProps } from '../store'
import ValidateInput, { RulesProp } from '../components/ValidateInput.vue'
import ValidateForm from '../components/ValidateForm.vue'
export default defineComponent({
  name: 'CreatePosts',
  components: {
    ValidateInput,
    ValidateForm
  },
  setup () {
    const titleVal = ref('')
    const router = useRouter()
    const store = useStore<GlobalDataProps>()
    const titleRules: RulesProp = [
      { type: 'required', message: '文章标题不能为空' }
    ]
    const contentVal = ref('')
    const contentRules: RulesProp = [
      { type: 'required', message: '文章详情不能为空' }
    ]
    const onFormSubmit = (result: boolean) => {
      if (result) {
        const { columnId } = store.state.user
        if (columnId) {
          const newPost: PostProps = {
            _id: new Date().getTime(),
            title: titleVal.value,
            content: contentVal.value,
            columnId,
            createdAt: new Date().toLocaleString()
          }
          store.commit('createPost', newPost)
          router.push({ name: 'column', params: { id: columnId } })
        }
      }
    }
    return {
      titleRules,
      titleVal,
      contentVal,
      contentRules,
      onFormSubmit
    }
  }
})
</script>

<style scoped>

</style>
