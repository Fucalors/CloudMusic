import { defineStore } from 'pinia'
import { ref } from "vue";
// import { getSongList, getSongLists } from '@/server/SongList/songList'
export const useMusicStore = defineStore('musicStore', {
	// 定义state
	state: () => ({
		// const music = useMusicStore()
		//使用方法 music.playShow = true
		playList: [{ //播放列表
			id: 2014336709,
			al: {
				id: 158206361,
				name: "我不曾忘记",
				pic: 109951168232666770,
				picUrl: "https://p2.music.126.net/dM_2lEqG7ZP7l0NjoApPFg==/109951168232666774.jpg",
				pic_str: "109951168232666774"
			},
			ar: [{
				name: "花玲／张安琪／沐霏"
			}]
		}],
		playListIndex: 0,
		playShow: true,//播放按钮切换显示
		musicPlayState: false,// 歌曲播放状态（默认为：false，不播放）
		currentTime: 0, //歌曲当前时间
	}),
	// 定义计算属性
	getters: {},
	// 定义同步,异步方法,修改state
	actions: {
		changePlayListIndex(value) {// 改变歌曲播放状态（默认为：false，不播放）
			this.playListIndex = value;
		},
		changePlayShow(value) {// 改变播放按钮切换显示
			this.playShow = value;
		},
		changeMusicPlayState(value) {// 改变歌曲播放状态（默认为：false，不播放）
			this.musicPlayState = value;
		},
		changeCurrentTime(value) {// 改变歌曲播放时间
			this.currentTime = value;
		},

	},
	persist: {
		enabled: true, // 这个配置代表存储生效，而且是整个store都存储
		strategies: [
			{ storage: localStorage, }, // localstorage存储
		],

	}
})
