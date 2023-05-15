<template>
  <div class="music-player">
    <div class="music-info">
      <img src="../../assets/logo.svg" alt="cover" class="imgCover" />
      <div class="song-info">
        <p class="song-name">currentSong.name</p>
        <p class="singer">currentSong.singer</p>
      </div>
    </div>

    <div class="music-controls">
      <div class="progress-bar">
        <div
          class="progress"
          style="
             {
              width: progress + '%';
            }
          "></div>
      </div>
      <div class="buttons">
        <button class="prev"><i class="ri-mail-settings-fill"></i></button>
        <button class="play-pause"><i class="ri-mail-settings-fill"></i></button>
        <button class="next"><i class="ri-mail-settings-fill"></i></button>
      </div>
    </div>
    <audio ref="audio" src=""></audio>
  </div>
</template>

<script setup></script>

<style lang="less" scoped>
  .music-player {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 90px;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
    .music-info {
      display: flex;
      align-items: center;
      .imgCover {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        margin-right: 20px;
        object-fit: cover;
        background-color: #ff4d4f;
      }
      .song-info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        .song-name {
          font-size: 16px;
          font-weight: 500;
          margin-bottom: 5px;
        }

        .singer {
          font-size: 14px;
          color: #999;
        }
      }
    }
    .music-controls {
      display: flex;
      align-items: center;
      .progress-bar {
        width: 200px;
        height: 4px;
        background-color: #eee;
        margin-right: 20px;
        position: relative;
        .progress {
          height: 100%;
          background-color: #ff4d4f;
          position: absolute;
          left: 0;
          top: 0;
        }
      }
      .buttons {
        display: flex;
        align-items: center;
        button {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: none;
          background-color: transparent;
          margin-right: 10px;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          transition: all 0.3s ease;
          &:hover {
            background-color: #f5f5f5;
          }
          i {
            font-size: 20px;
            color: #333;
          }
          .play-pause i {
            font-size: 24px;
          }
          .play-pause.playing i {
            transform: rotate(15deg);
          }
        }
      }
    }
    audio {
      display: none;
    }
  }
</style>
