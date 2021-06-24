<template>
  <div class="user-profile">
    <!-- 导航栏 -->
    <van-nav-bar class="app-nav-bar" title="个人信息" left-arrow @click-left="$router.back()" />
    <!-- 导航栏 -->
    <!-- 单元格 -->
    <van-cell title="头像" is-link center>
      <van-image
        width="30"
        height="30"
        round
        fit="cover"
        :src="user.photo"
      />
    </van-cell>
    <van-cell title="昵称" is-link :value="user.name" @click="isEditNameShow = true" ></van-cell>
    <van-cell title="性别" is-link :value="user.gender === 0 ? '男' : '女'" @click="isEditGenderShow = true"></van-cell>
    <van-cell title="生日" is-link :value="user.birthday"></van-cell>
    <!-- /单元格 -->
    <!-- 修改昵称弹出层 -->
    <van-popup
      v-model="isEditNameShow"
      position="bottom"
      :style="{ height: '100%'}"
    >
    <!-- 知识点：通过 $event 直接拿到子组件传的参数 -->
    <!-- 知识点：当传给子组件的数据既然使用又要修改，例如这里的 name，这种情况下，我们可以使用 v-model 来简写 -->
      <!-- <update-name :name="user.name" @update-name="user.name = $event" @close="isEditNameShow = false" /> -->
      <!-- v-model="user.name" 相当于 :value="user.name" @input="user.name = $event"，默认传递 value，默认监听 input -->
      <update-name
        v-if="isEditNameShow"
        v-model="user.name"
        :gender.sync="user.gender"
        @close="isEditNameShow = false" />
    </van-popup>
    <!-- /修改昵称 -->
    <!-- 知识点： v-model 只能使用一次，如果有多个数据，需要保持同步，使用 .sync修饰符 -->
    <!-- 知识点： :gender.sync="user.gender" 相当于 :gender="user.gender" 且 @update:gender="user.gender = $event" -->
    <!-- 知识点：一般把常用的数据设计为 v-model 绑定，把不常用的设计为 .sync 绑定-->

    <!-- 修改性别 -->
    <van-popup
      v-model="isEditGenderShow"
      position="bottom"
      :style="{ height: '50%'}"
    >
      <update-gender
        v-if="isEditGenderShow"
        v-model="user.gender"
        :gender.sync="user.gender"
        @close="isEditGenderShow = false" />
    </van-popup>

    <!-- 修改生日 -->
    <van-popup
      v-model="isEditBirthdayShow"
      position="bottom"
      :style="{ height: '50%'}"
    >
      <update-birthday
        v-if="isEditBirthdayShow"
        v-model="user.gender"
        :gender.sync="user.gender"
        @close="isEditBirthdayShow = false" />
    </van-popup>
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
import UpdateName from './components/update-name.vue'
import UpdateGender from './components/update-gender.vue'
import UpdateBirthday from './components/update-birthday.vue'
export default {
  name: 'UserProfile',
  components: {
    UpdateName,
    UpdateGender,
    UpdateBirthday
  },
  data () {
    return {
      user: {}, // 用户数据
      isEditNameShow: false, // 编辑昵称的显示状态
      isEditGenderShow: false, // 编辑性別的显示状态
      isEditBirthdayShow: false // 编辑生日的显示状态
    }
  },
  created () {
    this.loadUserProfile()
  },
  methods: {
    async loadUserProfile () {
      const { data } = await getUserProfile()
      this.user = data.data
    }
  }
}
</script>

<style lang="less" scoped>
.van-popup {
  background-color: #f5f7f9;
}
</style>
