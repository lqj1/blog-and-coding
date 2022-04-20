<template>
  <div class="search-container">
    <!-- 搜索栏 -->
    <!-- 在 van-search 外层添加form标签，且action不为空，即可在ios输入法中显示搜索按钮 -->
    <form action="/">
      <van-search
        v-model="searchText"
        placeholder="请输入搜索关键词"
        show-action
        @search="onSearch(searchText)"
        @cancel="$router.back()"
        @focus="isResultShow = false"
      />
    </form>
    <!-- 搜索栏 -->
    <!-- 搜索结果 -->
    <search-result v-if="isResultShow" :search-text="searchText"></search-result>
    <!-- 搜索结果 -->
    <!-- 联想建议 -->
    <!-- 判断搜索框是否有内容，如果有就启动联想建议 -->
    <search-suggestion v-else-if="searchText" :search-text="searchText" @search="onSearch"></search-suggestion>
    <!-- 联想建议 -->
    <!-- 历史记录 -->
    <search-history v-else :search-histories="searchHistories" @search="onSearch" @update-histories="searchHistories = $event"></search-history>
    <!-- 历史记录 -->
  </div>
</template>

<script>
import SearchSuggestion from './components/search-suggestion.vue'
import SearchHistory from './components/search-history.vue'
import SearchResult from './components/search-result.vue'
import { setItem, getItem } from '@/utils/storage'
// import { getSearchHistories } from '@/api/search'
import { mapState } from 'vuex'
export default {
  name: 'SearchIndex',
  components: {
    SearchSuggestion,
    SearchHistory,
    SearchResult
  },
  data () {
    return {
      searchText: '', // 搜索输入框的内容
      isResultShow: false, // 控制搜索结果的显示
      searchHistories: [] // 搜索历史数据
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {
    // 监视搜索历史记录的变化，存储到本地存储
    // 只有有监视变化，该页面其他 setItem 都不需要再执行
    searchHistories () {
      setItem('search-histories', this.searchHistories)
    }
  },
  async created () {
    this.loadSearchHistories()
  },
  methods: {
    onSearch (searchText) {
      // 把输入框设置为你要搜索的文本
      this.searchText = searchText
      // 触发搜索，记录搜索历史记录
      const index = this.searchHistories.indexOf(searchText)
      if (index !== -1) {
        // 把重复项移除掉
        this.searchHistories.splice(index, 1)
      }
      // 把最新的搜索记录放到顶部
      this.searchHistories.unshift(searchText)
      // 展示搜索结果
      this.isResultShow = true
      // 如果用户已登陆，则把历史记录存储到线上
      // 提示：只要我们调用搜索获取结果，后端会自动存储用户的搜索记录
      // 如果未登陆，则把搜索历史记录存储到本地
      // setItem('search-histories', this.searchHistories)
    },
    onCancel () {
      console.log('cancel')
    },
    async loadSearchHistories () {
      // 后端只能返回4条历史记录，让后端返回历史记录与本地存储的历史记录合并一起
      const searchHistories = getItem('search-histories') || []
      // 因为接口有问题，所以直接使用本地存储历史
      // if (this.user) {
      //   const { data } = await getSearchHistories()
      //   // [...array, ...array]，数组合并
      //   // [...set] 将set转换为数组
      //   searchHistories = [...new Set([...searchHistories, ...data.data.keywords])]
      // }
      this.searchHistories = searchHistories
    }
  }
}
</script>

<style lang="less" scoped>

</style>
