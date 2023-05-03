import { defineStore } from 'pinia'
import { getLoginEmail } from '@/server/Login/login.js'


export const useCounterStore = defineStore('counter', {
	state: () => ({
		isLogin: false, //判断是否登录
		token: "", //登录token
		user: {}, //用户数据

	}),

	getters: {
	},
	actions: {
		//异步登录
		getLogin: async function (context, value) {
			let res = await getLoginEmail(value)
			console.log(res)
			return res
		},

	},
	mutations: {
		updateIsLogin: function (state, value) {
			state.isLogin = true
		},
		updateToken: function (state, value) {
			state.token = value
			localStorage.setItem('token', state.token)
		},
		updateUser: function (state, value) {
			state.user = value
		},
	},

})
