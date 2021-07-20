<template>
  <div class="tab-control">
    <div v-for="(item,index) in titles" :key="index" class="tab-control-item" @click="itemClick(index)"
      :class="{active: index == currentIndex }">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabControl',
  props: {
    titles: {
      type: Array,
      default () {
        return []
      }
    }
  },
  setup () {
    let currentIndex = ref(0)
    // 方法
    const itemClick = (index) => {
      currentIndex.value = index;
    }
    return {
      currentIndex,
      itemClick
    }
  }
}
</script>

<style lang="scss" scoped>
.tab-control {
  display: flex;
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 14px;
  background-color: #fff;
  width: 100%;
  .tab-control0-item {
    flex: 1;
    span {
      padding: 6px;
    }
  }
  .active {
    color: var(--color-tint)
    span {
      border-bottom: 3px solid var(--color-tint);
    }
  }
}
</style>