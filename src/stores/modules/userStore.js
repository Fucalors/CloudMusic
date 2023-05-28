import { defineStore } from 'pinia'
// import { getLoginQRKey, getQRCodeImgBase, getCheckStatus, getLoginStatus } from '@/server/Login/login' //二维码登录

export const useUserStore = defineStore('userStore', {
	state: () => {
		return {
			//使用方法 music.loginState = true
			loginState: false, //登录状态
		}
	},
	// 定义计算属性
	getters: {},
	// 定义异步方法 --同步异步都支持,修改state
	actions: {
		changeLoginState(value) {//改变登录状态
			this.loginState = value
		}
	},
	persist: {
		enabled: true, // 这个配置代表存储生效，而且是整个store都存储
	}
	// persist: {
	// 	enabled: true,
	// 	strategies: [
	// 		{ storage: sessionStorage, paths: ['firstName', 'lastName'] }, // firstName 和 lastName字段用sessionStorage存储
	// 		{ storage: localStorage, paths: ['accessToken'] }, // accessToken字段用 localstorage存储
	// 	],
	// }
	// persist:{
	// 	enabled:true,
	// 	strategies:[{
	// 		key:"store",//自定义存储名称
	// 		storage:sessionStorage,//自定义存储位置
	// 	}]
	// }
})

// useOverallStore.count++
// useOverallStore.fo='fooo'

// useOverallStore.$patch({
// 	count: useOverallStore.count++,
// 	fo:'fooo'
//  arr:[...useOverallStore.arr,4] //数组
// })

// useOverallStore.$patch(state => {
// 	state.count++
// 	state.fo = 'fooo'
// 	state.arr.push(4)
// })