<template>
  <div class="container">
    <div class="submit-comment">
      <!-- 文本框 -->
      <el-input
        type="textarea"
        placeholder="评论"
        maxlength="140"
        show-word-limit
        v-model="textarea"
        :rows="3"></el-input>
      <!-- 提交按钮 -->
      <div class="submit">
        <el-button @click="submitComment">发送评论</el-button>
      </div>
    </div>

    <div class="comment-section" v-show="comment.hotComments">
      <h3>热门评论</h3>
      <!-- Display the comments -->
      <div class="comment" v-for="item in comment.hotComments" :key="item">
        <div class="comment-header">
          <img class="avatar" :src="item.user.avatarUrl" alt="avatar" />
          <div class="comment-info">
            <span class="username">{{ item.user.nickname }}：</span>
            <span class="comment-content">{{ item.content }}</span>
            <div class="aiter" v-for="item1 in item.beReplied" :key="item1">
              <span class="username" @click="toUserDetails(item.user.userId)">@{{ item1.user.nickname }}：</span>
              <span class="comment-content">{{ item1.content }}</span>
            </div>
            <div class="time-btn">
              <span class="time">{{ convertTimestampToDateString(item.time) }}</span>
              <div class="btn">
                <i class="icons ri-heart-2-line"></i>
                <i class="icons ri-share-circle-line"></i>
                <i class="icons ri-chat-3-line"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="comment-section">
      <h3>精彩评论</h3>
      <!-- Display the comments -->
      <div class="comment" v-for="item in comment.comments" :key="item">
        <div class="comment-header">
          <img class="avatar" :src="item.user.avatarUrl" alt="avatar" />
          <div class="comment-info">
            <span class="username">{{ item.user.nickname }}：</span>
            <span class="comment-content">{{ item.content }}</span>
            <div class="aiter" v-for="item1 in item.beReplied" :key="item1">
              <span class="username" @click="toUserDetails(item.user.userId)">@{{ item1.user.nickname }}：</span>
              <span class="comment-content">{{ item1.content }}</span>
            </div>
            <div class="time-btn">
              <span class="time">{{ convertTimestampToDateString(item.time) }}</span>
              <div class="btn">
                <i class="icons ri-thumb-up-line"></i>
                <i class="icons ri-share-circle-line"></i>
                <i class="icons ri-chat-3-line"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="20"
        :page-count="Math.ceil(total / 20 + 1)"
        :total="total"
        @current-change="handlePageChange" />
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  import { getSongListComment } from '@/server/SongList/songList'
  import { convertTimestampToDateString } from '@/plugins/index' // 时间戳转换格式化函数

  const textarea = ref('')
  const comment = ref({}) // 歌单评论
  const total = ref(0) // 歌单评论总数
  let id = useRoute().query.id // 歌单 id
  // 歌单评论获取
  const getSongListComments = async (val = 0) => {
    try {
      //处理数据逻辑
      let res = await getSongListComment(id, val * 20)
      comment.value = res.data
      total.value = res.data.total // 获取总评论数
      //   console.log(res.data)
    } catch (error) {
      console.error(error.message)
    }
  }
  // 分页
  const handlePageChange = (pages) => {
    let val = --pages
    getSongListComments(val)
    // 改变页数回到顶部
    const paginationClassName = document.querySelector('.el-main')
    paginationClassName.scrollTo({ top: 300, behavior: 'smooth' })
  }

  onMounted(() => {
    getSongListComments()
  })
  const submitComment = () => {
    if (!textarea.value) {
      console.log('不能为空')
    }
    // console.log(textarea.value)
  }
</script>

<style lang="less" scoped>
  //@import url(); 引入公共css类
  .container {
    width: 100%;
    height: 100%;
    .submit-comment {
      .submit {
        display: flex;
        justify-content: flex-end;
      }
    }
    .comment-section {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      .comment {
        display: flex;
        gap: 1rem;
        padding-bottom: 10px;
        border-bottom: 1px solid rgb(230, 230, 230);
        .comment-header {
          width: 100%;
          display: flex;
          gap: 0.5rem;
          .avatar {
            width: 5rem;
            height: 5rem;
            border-radius: 50%;
            background-color: azure;
            border: 1px solid rgb(230, 230, 230);
          }
          .comment-info {
            width: 100%;
            .username {
              display: inline-block;
              font-weight: bold;
              color: #5a8ab9;
              cursor: pointer;
            }
            .comment-content {
              display: inline;
            }
            .aiter {
              padding: 0 10px;
              margin: 8px 0;
              border-radius: 5px;
              background-color: rgb(223, 223, 223);
            }
            .time-btn {
              width: 100%;
              display: flex;
              align-items: center;
              justify-content: space-between;
              color: gray;
              font-size: 1rem;
              .time {
                display: flex;
                align-items: center;
              }
              .btn {
                display: flex;
                align-items: center;
                gap: 12px;
                .icons {
                  font-size: 20px;
                  &:hover {
                    cursor: pointer;
                  }
                }
              }
            }
          }
        }
      }
    }
    .pagination {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px 0;
      transform: translateX(-20px);
    }
  }
</style>
