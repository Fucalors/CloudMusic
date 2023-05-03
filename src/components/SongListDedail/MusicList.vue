<template>
  <div class="music-list">
    <table class="music-table">
      <thead>
        <tr style="height: 50px; background: none">
          <th class="serial">序号</th>
          <th class="song-name">歌曲名</th>
          <th class="avatar">作者</th>
          <th class="album">专辑</th>
          <th class="mv">唱片</th>
          <th class="time">时长</th>
        </tr>
      </thead>
      <tbody>
        <tr
          style="height: 40px; border-bottom;: 1px solid #ccc"
          v-for="(item, i) in props.songList.tracks"
          :key="i">
          <td class="serial">{{ i + 1 }}</td>
          <td class="song-name">{{ item.name }}</td>
          <td class="avatar">
            <span v-for="item1 in item.ar" :key="item1">{{ item1.name }}</span>
          </td>
          <td class="album">{{ item.al.name }}</td>
          <td class="mv">
            <span>
              <i class="icons ri-play-circle-line" v-if="item.mv != 0"></i>
            </span>
            <span>
              <i class="icons ri-play-list-line"></i>
            </span>
          </td>
          <td class="time">{{ convertMsToMinSec(item.dt) }}</td>
        </tr>
      </tbody>
    </table>
    <!-- <span v-for="(item, i) in props.songList.tracks" :key="i">
      {{ i + 1 }}-{{ item.name }}
      <span v-for="(item1, index) in item.ar" :key="index">{{ item1.name }}</span>
    </span> -->
  </div>
</template>

<script setup>
  import { convertMsToMinSec } from '@/plugins/index.js' // 歌曲时间函数
  const props = defineProps({
    songList: {
      type: Object,
      default() {
        return { message: 'hello' }
      }
    }
  })
</script>

<style lang="less" scoped>
  //@import url(); 引入公共css类
  .music-list {
    width: 100%;
    // background-color: rgb(255, 153, 27);
    .music-table {
      border-collapse: collapse;
      width: 100%;
      text-align: left;
      tr:nth-child(odd) {
        background-color: rgb(245, 245, 245);
      }
      tr:hover {
        background-color: rgb(240, 240, 240);
      }
      .serial {
        width: 55px;
        text-align: center;
        // background-color: red;
      }
      .song-name {
        width: fit-content;
        height: 100%;
        // background-color: aqua;
        padding: 0 10px;
      }
      .avatar {
        width: 300px;
        // background-color: burlywood;
        span {
          display: inline-block;
          margin-right: 8px;
        }
      }
      .album {
        width: 300px;
        // background-color: cadetblue;
      }
      .mv {
        width: 150px;
        text-align: left;
        span {
          display: inline-block;
          margin-right: 15px;
        }
        // background-color: blueviolet;
      }
      .time {
        width: 100px;
        text-align: center;
        // background-color: yellowgreen;
      }
    }
    .my-table th,
    .my-table td {
      border: 1px solid #ddd;
      padding: 8px;
      text-align: left;
    }

    .my-table th {
      background-color: #f2f2f2;
      color: #333;
    }
  }
</style>
