<template>
  <div class="container">
    <!-- User profile header -->
    <div class="header">
      <div class="avatar">
        <img :src="profiles.avatarUrl" fit="cover" alt="avatar" />
      </div>
      <div class="userInfo">
        <div class="userName-info">
          <h2>{{ profiles.nickname }}</h2>
          <div class="info">
            <div class="identify" v-if="identify">
              <img :src="identify.imageUrl" alt="" />
              <span style="color: #ffeb62">{{ identify.imageDesc }}</span>
            </div>
            <div class="lv">Lv {{ level.level }}</div>
            <div class="gender">
              <!-- {{ profiles.gender === 0 ? '保密' : profiles.gender === 1 ? '男性' : '女性' }} -->
              <i v-if="profiles.gender === 0" class="aliens ri-aliens-line"></i>
              <i v-if="profiles.gender === 1" class="men ri-men-line"></i>
              <i v-if="profiles.gender === 2" class="women ri-women-line"></i>
            </div>
          </div>
        </div>
        <div class="line"></div>
        <div class="stats">
          <div class="stat">
            <span class="number">{{ profiles.eventCount }}</span>
            <span class="label">动态</span>
          </div>
          <div class="stat">
            <span class="number">{{ profiles.follows }}</span>
            <span class="label">关注</span>
          </div>
          <div class="stat">
            <span class="number">{{ profiles.followeds }}</span>
            <span class="label">粉丝</span>
          </div>
        </div>
        <div>
          <div class="userId">UID: {{ profiles.userId }}</div>
          <div class="city">所在城市: {{ profiles.city }}</div>
          <!-- <div class="signature"> -->
          <template v-if="profiles.signature">
            <div class="signature">个人介绍: {{ profiles.signature }}</div>
          </template>
          <template v-else>
            <div class="signature">个人介绍: 这个人很懒，什么都没有写</div>
          </template>
          <!-- </div> -->
        </div>
      </div>
    </div>

    <!-- User profile tabs -->
    <div class="tabs">
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="创建的歌单" name="first">
          <div class="box">
            <span v-for="item in userList" :key="item">
              <router-link :to="{ path: '/SongListDetail', query: { id: item.id } }">
                <el-card class="card" :body-style="{ padding: '0px' }" shadow="hover">
                  <img :src="item.coverImgUrl" lazy="ture" class="card-img" />
                  <div class="content-name">
                    <span class="content-style">{{ item.name }}</span>
                    <div class="bottom">
                      <time class="time">{{ item.trackCount }}首</time>
                    </div>
                  </div>
                </el-card>
              </router-link>
            </span>
          </div>
        </el-tab-pane>
        <el-tab-pane label="收藏的歌单" name="second">Config</el-tab-pane>
        <el-tab-pane label="收藏的播客" name="third">Role</el-tab-pane>
        <el-tab-pane label="创建的音乐专栏" name="fourth">Task</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup>
  import { ref, reactive, onMounted } from 'vue'
  import { useRoute } from 'vue-router'
  import { userDetail, userPlaylist } from '@/server/Main/main'
  import { ElCard, ElRow, ElCol } from 'element-plus'
  //   const activeTab = ref('overview')
  let profiles = ref({})
  let identify = ref({})
  let level = ref({}) // 等级
  let userList = ref({}) // 等级
  const activeName = ref('first') //tab第一项
  let id = useRoute().query.id
  const handleClick = (tab, event) => {
    console.log(tab, event)
  }
  const getUserDetail = async () => {
    try {
      //处理数据逻辑
      let res = await userDetail(id)
      level.value = res.data
      profiles.value = res.data.profile
      identify.value = res.data.identify
      console.log(res.data)
    } catch (error) {
      console.error(error.message)
    }
  }
  const getUserPlaylist = async () => {
    try {
      //处理数据逻辑
      let res = await userPlaylist(id)
      userList.value = res.data.playlist
      //   console.log(res.data)
    } catch (error) {
      console.error(error.message)
    }
  }
  onMounted(() => {
    getUserDetail()
    getUserPlaylist()
  })
</script>
<style lang="less" scope>
  .container {
    width: 100%;
    height: 100%;
    .header {
      height: 200px;
      display: flex;
      margin-bottom: 20px;
      .avatar {
        width: 200px;
        height: 200px;
        margin-right: 20px;
        border-radius: 50%;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .userInfo {
        width: calc(100% - 220px);
        height: 100%;
        .userName-info {
          h2 {
            font-size: 24px;
            font-weight: bold;
            //   margin-bottom: 10px;
          }
          .info {
            display: flex;
            align-items: center;
            gap: 7px;
            .identify {
              display: flex;
              align-items: center;
              height: 17px;
              border-radius: 50px;
              background-color: #a4854b;

              img {
                width: 17px;
                height: 17px;
                object-fit: cover;
                margin-right: 3px;
              }
              span {
                font-size: 12px;
                padding-right: 5px;
                padding-bottom: 1px;
              }
            }
            .lv {
              display: flex;
              align-items: center;
              height: 17px;
              padding: 0 5px;
              padding-bottom: 1px;
              border-radius: 50px;
              background-color: rgb(236, 236, 236);
            }
            .gender {
              font-size: 13px;

              .aliens {
                padding: 2px;
                border-radius: 50px;
                color: inherit;
                background-color: rgb(236, 236, 236);
              }
              .men {
                padding: 2px;
                border-radius: 50px;
                color: #68bde1;
                background-color: #bff3ff;
              }
              .women {
                padding: 2px;
                border-radius: 50px;
                color: #ea5a95;
                background-color: #ffcce7;
              }
            }
          }
        }
        //横线
        .line {
          width: 100%;
          height: 1px;
          margin: 5px 0;
          background-color: #aaa;
        }
        .stats {
          display: flex;
          //   background-color: #68bde1;
          .stat {
            margin-right: 20px;
            // background-color: #ea5a95;
            .number {
              font-size: 24px;
              font-weight: bold;
              margin-bottom: 5px;
            }
            .label {
              font-size: 16px;
              color: #999;
            }
          }
        }
      }
    }
    .tabs {
      width: 100%;
      .demo-tabs {
        .el-tabs__content {
          //   padding: 32px;
          //   display: flex;
          //   color: #6b778c;
          //   font-size: 32px;
          //   font-weight: 600;
          .box {
            display: grid;
            grid-template-columns: repeat(auto-fill, 234px);
            gap: 15px;

            .card {
              width: 234px;
              height: 283px;
              border-radius: 4px;
              border: 1px solid #e4e7ed;
              background-color: rgb(246, 246, 246);
              .card-img {
                border-top-left-radius: 4px;
                border-top-right-radius: 4px;
                display: block;
                width: 100%;
                height: 233px;
                overflow: hidden;
                cursor: pointer;
                display: block;
              }
              .content-name {
                padding: 5px 5px 8px 5px;
                cursor: pointer;
                .content-style {
                  color: #333;
                  display: -webkit-box;
                  text-overflow: ellipsis;
                  overflow: hidden;
                  -webkit-line-clamp: 1;
                  -webkit-box-orient: vertical;
                }
                .bottom {
                  line-height: 12px;
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  .time {
                    font-size: 12px;
                    color: #999;
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  /*
    Finally, you can add styles to the activity section using the following rules:
  */
  /*
    .activity-section {
      margin-bottom: 30px;
    }

    .activity-item {
      font-size: 14px;
      color: #666;
      margin-bottom: 10px;
    } */
</style>
