<template>
  <div class="container">
    <div class="user">
      <div class="user-info" v-for="item in subscribers" :key="item">
        <img class="avatar" :src="item.avatarUrl" alt="avatar" />
        <span class="user-name">{{ item.nickname }}</span>
        <!-- <span class="username">{{ item.signature }}</span> -->
      </div>
    </div>
    <div class="pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="30"
        :page-count="Math.ceil(total / 30)"
        :total="total"
        @current-change="handlePageChange" />
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  import { getSsubscribers } from '@/server/SongList/songList'

  const subscribers = ref({})
  const total = ref(0) // 歌单评论总数

  let id = useRoute().query.id // 歌单 id
  const getListSubscribers = async (val = 0) => {
    try {
      //处理数据逻辑
      let res = await getSsubscribers(id, val * 30)
      subscribers.value = res.data.subscribers
      total.value = res.data.total // 获取总评论数
      //   console.log(res.data)
    } catch (error) {
      console.error(error.message)
    }
  }
  // 分页
  const handlePageChange = (pages) => {
    let val = --pages
    getListSubscribers(val)
    // 改变页数回到顶部
    const paginationClassName = document.querySelector('.el-main')
    paginationClassName.scrollTo({ top: 300, behavior: 'smooth' })
  }
  onMounted(() => {
    getListSubscribers()
  })
</script>

<style lang="less" scoped>
  .container {
    width: 100%;
    .user {
      display: grid;
      grid-template-rows: repeat(3, 1fr);
      grid-template-columns: repeat(3, 1fr);
      grid-row-gap: 20px;
      grid-column-gap: 10px;
      .user-info {
        display: flex;
        align-items: center;
        padding: 10px;
        cursor: pointer;
        border-radius: 5px;
        .avatar {
          display: block;
          height: 70px;
          object-fit: cover;
          border-radius: 50%;
          margin-right: 10px;
        }

        .user-name {
          font-size: 16px;
          font-weight: 500;
        }
        &:hover {
          background-color: rgb(240, 240, 240);
        }
      }
    }
    .pagination {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px 0;
      transform: translateX(-70px);
    }
  }
</style>
