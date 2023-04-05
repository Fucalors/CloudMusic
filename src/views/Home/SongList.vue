<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <span v-for="(item, index) in listTab" :key="item">
      <el-tab-pane :label="item.name">用户管理{{ index + 1 }}</el-tab-pane>
    </span>
  </el-tabs>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import { songListTab } from '@/server/songList/songList.js'
  const listTab = ref([])

  const getSongListTab = async () => {
    try {
      //处理数据逻辑
      let res = await songListTab()
      listTab.value = res.data.tags
      console.log(res.data)
    } catch (error) {
      //处理错误逻辑
      // console.log('获取Banner数据失败: ' + error.response.statusText + ': ' + error.message)
      console.error(error.message)
    }
  }

  onMounted(() => {
    getSongListTab()
  })
  const activeName = ref('first')

  const handleClick = (tab, event) => {
    console.log(tab, event)
  }
</script>

<style lang="less" scoped>
  //@import url(); 引入公共css类
</style>
