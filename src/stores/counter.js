import { defineStore } from 'pinia'
import { getLoginEmail } from '@/server/Login/login.js'


export const useCounterStore = defineStore('counter', {
	state: () => ({
		loginState: false,//登录状态 loginStore.$state.isLogin = true // 调用值为loginState的状态true
	}),

	getters: {
	},
	actions: {

	},
	mutations: {
		updateLoginState: function (state, value) {
			// loginStore.$state.updateLoginState = true // 调用值为true的changeLoginState突变true
			state.isLogin = value
		},
		changeLoginState: function (state, value) { //登录状态
			state.loginState = value || false
			// loginStore.$state.changeLoginState = true // 调用值为true的changeLoginState突变true
		},
	},

})
