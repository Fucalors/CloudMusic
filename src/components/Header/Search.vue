<template>
  <div class="searchTip">
    <el-popover placement="bottom" width="365" trigger="click">
      <template #reference>
        <el-input placeholder="搜索" :prefix-icon="Search"></el-input>
        <!-- <el-input v-for="item in hotSearchs" key="item" :placeholder="item.first" :prefix-icon="Search"></el-input> -->
      </template>
      <HotSearch />
      <!-- <SearchTip /> -->
    </el-popover>
  </div>
</template>

<script setup>
  import { Search } from '@element-plus/icons-vue'
  import { hotSearch } from '@/server/MainApi/main'
  import { ref, onMounted } from 'vue'
  // const isSearchPopShow = ref('false')
  const hotSearchs = ref([])

  const getHotSearch = async () => {
    try {
      let res = await hotSearch()
      hotSearchs.value = res.data.result.hots

      //   hotSearchs.value.forEach((item) => {
      //     console.log(item.first)
      //   })
    } catch (error) {
      console.error(error.message)
    }
  }

  onMounted(() => {
    getHotSearch()
  })
</script>

<style lang="less" scoped>
  .searchTip {
    width: 365px;
    .el-popover {
      padding: 0;
    }
  }
</style>
