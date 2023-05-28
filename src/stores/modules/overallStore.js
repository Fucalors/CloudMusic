import { defineStore } from 'pinia'
// import { getLoginQRKey, getQRCodeImgBase, getCheckStatus, getLoginStatus } from '@/server/Login/login' //二维码登录

export const useOverallStore = defineStore('overall', {
	state: () => {
		return {
			//使用方法 music.playShow = true

		}
	},
	// 定义计算属性
	getters: {},
	// 定义异步方法 --同步异步都支持,修改state
	actions: {
		//使用方法useOverallStore.changeState(true)

		// async login() {
		// 	try {
		// 		let QRkeys = await getLoginQRKey() // 获取key
		// 		let key = QRkeys.data.data.unikey
		// 		let CodeImg = await getQRCodeImgBase(key) // 获取二维码(key)
		// 		this.QRCodeIm = CodeImg.data.data.qrimg //将二维码显示
		// 		let timer // 定义计时器
		// 		timer = setInterval(async () => {
		// 			let statusRes = await getCheckStatus(key) // 二维码检测扫码状态接口(key)
		// 			//   console.log(statusRes.data)
		// 			if (statusRes.data.code === 800) {
		// 				//   console.log(statusRes.data.code + ':' + statusRes.data.message)
		// 				clearInterval(timer) //关闭定时器
		// 			} else if (statusRes.data.code === 801) {
		// 				//   console.log(statusRes.data.code + ':' + statusRes.data.message)
		// 			} else if (statusRes.data.code === 802) {
		// 				//   console.log(statusRes.data.code + ':' + statusRes.data.message)
		// 			} else if (statusRes.data.code === 803) {
		// 				// 这一步会返回cookie
		// 				//   console.log(statusRes.data.code + ':' + statusRes.data.message)
		// 				const cookie = statusRes.data.cookie //若登录成功则拿到cookie
		// 				localStorage.setItem('cookie', cookie) //把cookie保存到localStorage中
		// 				let loginStatus = await getLoginStatus(cookie) // 获取登录状态(cookie)
		// 				console.log(loginStatus);
		// 				// console.log(loginStatus.data.data) //拿到cookie获取cookie的用户数据(用户数据)
		// 				// localStorage.setItem('userInfo', JSON.stringify(loginStatus.data.data)) //把loginStatus.data.data(用户数据)保存到localStorage中
		// 				//   loginStore.loginState = true // 调用值为loginState的状态true
		// 				clearInterval(timer) //关闭定时器
		// 				// router.go(0)
		// 				this.loginState = true
		// 			} else {
		// 				console.log(statusRes.data.code + ':' + statusRes.data.message)
		// 				clearInterval(timer) //关闭定时器
		// 			}
		// 		}, 3000)
		// 	} catch (error) {
		// 		console.log(error)
		// 	}

		// },
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