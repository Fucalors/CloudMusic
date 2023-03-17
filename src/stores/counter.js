import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
	const count = ref(2)
	// state: () => ({ count: 0 })


	// state: () => ({ count: 0 }) //返回对象写法
	// state: () => ({
	// 	return: {
	// 		count: '3'
	// 	}
	// })
	// getters: { }
	// actions: { }

	return { count }

})