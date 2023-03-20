<template>
  <el-scrollbar>
    <div class="container">
      <div class="banner" @click="Tip">
        <el-carousel :interval="3000" type="card" indicator-position="none" height="250px">
          <el-carousel-item v-for="banners in bannerImg" :key="banners">
            <img :src="banners.imageUrl" :alt="banners.typeTitle" />
            <!-- <el-image :src="item.pic" fit="cover" /> -->
          </el-carousel-item>
        </el-carousel>
      </div>

      <div class="dailySongList">
        <div class="title">
          <span>今日推荐歌单</span>
        </div>
        <el-row :gutter="20">
          <el-col :span="4" v-for="list in songList" :key="list">
            <div class="grid-content">
              <span class="playCount">
                <el-icon><VideoPlay /></el-icon>
                {{ list.playCount }}
              </span>
              <img :src="list.picUrl" :alt="list.name" />
            </div>
            <span class="songListName">{{ list.name }}</span>
          </el-col>
        </el-row>
      </div>

      <div>推荐新音乐</div>
    </div>
  </el-scrollbar>
</template>

<script setup>
  import { VideoPlay } from '@element-plus/icons-vue'
  import { banner, dailySongList } from '../../request/MainApi/main'
  import { ref } from 'vue'

  const bannerImg = ref([]) //图片加载
  const songList = ref([]) //歌单

  const getBanner = async () => {
    //图片加载
    await banner()
      .then((res) => {
        //处理数据逻辑

        bannerImg.value = res.data.banners
        // console.log(res.data)
      })
      .catch((error) => {
        //处理错误逻辑
        console.log(error + ' 请求HomePage数据失败')
        // 界面错误提示
        ElMessage({
          message: '获取数据失败，请稍后再试。',
          type: 'error',
          grouping: true, //分组归类
          showClose: true //支持关闭
        })
      })
  }
  const Tip = (banners) => {
    // 此功能不完善
    ElMessage({
      message: '暂不支持单击跳转，敬请期待啦。',
      type: 'warning',
      grouping: true, //分组归类
      showClose: true //支持关闭
    })
    // console.log(banners)
  }
  const getSongList = async () => {
    //歌单获取
    await dailySongList()
      .then((res) => {
        //处理数据逻辑
        songList.value = res.data.result
        console.log(res.data.result)
      })
      .catch((error) => {
        //处理错误逻辑
        console.log(error + ' 请求HomePage数据失败')
        // 界面错误提示
        ElMessage({
          message: '获取数据失败，请稍后再试。',
          type: 'error',
          grouping: true, //分组归类
          showClose: true //支持关闭
        })
      })
  }
  getSongList()
  getBanner()
</script>

<style lang="less" scoped>
  //@import url(); 引入公共css类
  .container {
    width: 100%;
    height: 100%;
    padding: 10px;
    background-color: rgb(234, 233, 233);
    overflow: hidden;
    .banner {
      width: 100%;
      //   height: auto;
      //   background-color: rgb(224, 74, 74);
      border-radius: 12px;
      img {
        display: block;
        width: 100%;
        height: 250px;
        object-fit: cover;
      }
    }
    .dailySongList {
      margin-top: 40px;
      .title {
        // background-color: red;
        padding: 8px 0;
        span {
          color: #212020;
          font-size: 18px;
          font-weight: 600;
          padding: 5px;
          border-bottom: 3px solid #333;
        }
      }
      .el-row {
        margin-top: 10px;
        &:last-child {
          margin-bottom: 0;
        }
        .el-col {
          display: block;
          margin-bottom: 25px;
          .grid-content {
            background: #d3dce6;
            border-radius: 4px;
            height: auto;
            max-width: 200px;
            min-width: 100px;
            max-height: 200px;
            min-height: 100px;
            box-shadow: 0px 0px 5px 3px rgb(169, 169, 169);
            -webkit-box-shadow: 0px 0px 5px 3px rgb(169, 169, 169);
            -moz-box-shadow: 0px 0px 5px 3px rgb(169, 169, 169);
            position: relative;
            .playCount {
              display: flex;
              position: absolute;
              background-color: rgba(0, 0, 0, 0.4);
              align-items: center;
              padding: 0 5px;
              border-radius: 3px;
              color: #fff;
              font-size: 13px;
              z-index: 2;
              i {
                color: red;
                margin-right: 2px;
              }
            }
            img {
              display: block;
              border-radius: 4px;
              width: 100%;
              height: 100%;
              object-fit: cover;
              cursor: pointer;
            }
            // img:hover {
            //   transform: scale(1.01);
            //   box-shadow: 0px 0px 5px 3px rgb(169, 169, 169);
            //   -webkit-box-shadow: 0px 0px 5px 3px rgb(169, 169, 169);
            //   -moz-box-shadow: 0px 0px 5px 3px rgb(169, 169, 169);
            // }
          }
          .songListName {
            display: block;
            text-align: left;
            margin-top: 8px;
            -webkit-line-clamp: 2; //（用来限制在一个块元素显示的文本的行数，2 表示最多显示 2 行。为了实现该效果，它需要组合其他的 WebKit 属性）
            display: -webkit-box; //（和 1 结合使用，将对象作为弹性伸缩盒子模型显示 ）
            -webkit-box-orient: vertical; //（和 1 结合使用 ，设置或检索伸缩盒对象的子元素的排列方式 ）
            overflow: hidden; //（文本溢出限定的宽度就隐藏内容）
            text-overflow: ellipsis; //（多行文本的情况下，用省略号 “…” 隐藏溢出范围的文本)
          }
        }
      }
    }
  }
</style>
