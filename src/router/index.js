import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/Home/Index.vue'
// import { useCounterStore } from '@/stores/counter.js'
// const loginStore = useCounterStore() //改变登录状态

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),

	routes: [
		{
			path: '/',
			name: 'home',
			// component: HomeView,
			redirect: '/discovermusic',
			children: [
				{
					// 当 /user/:id/profile 匹配成功
					// UserProfile 将被渲染到 User 的 <router-view> 内部
					path: '/discovermusic',
					name: 'discovermusic',
					component: () => import('../views/Home/DiscoverMusic.vue'),
				},
				{
					// 当 /user/:id/profile 匹配成功
					// UserProfile 将被渲染到 User 的 <router-view> 内部
					path: '/newmusic',
					name: 'newmusic',
					component: () => import('../views/Home/NewMusic.vue'),

				},
				{
					// 当 /user/:id/profile 匹配成功
					// UserProfile 将被渲染到 User 的 <router-view> 内部
					path: '/songlist',
					name: 'songlist',
					component: () => import('../views/Home/SongList.vue'),
				},
				{
					// 当 /user/:id/profile 匹配成功
					// UserProfile 将被渲染到 User 的 <router-view> 内部
					path: '/mv',
					name: 'mv',
					component: () => import('../views/Home/Mv.vue'),
				},
				{
					// 当 /user/:id/profile 匹配成功
					// UserProfile 将被渲染到 User 的 <router-view> 内部
					path: '/songlistdetail',
					name: 'songlistdetail',
					component: () => import('../views/Details/SongListDetail.vue'),
				},
			]
		},
		{
			path: '/login',
			name: 'login',
			// route level code-splitting
			// this generates a separate chunk (About.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			// component: resolve => reqire(['../views/Login.vue'],resolve) // 异步组件写法
			component: () => import('../components/Login/Login.vue')
		},
		{   //用户详情页
			path: '/userdetail',
			name: 'userdetail',
			component: () => import('../views/Details/UserDetail.vue'),
			// props($route) {
			// 	return {
			// 		id: $route.params.id,
			// 	}
			// },
		},
		{   //404页面
			path: '/:pathMatch(.*)*',
			name: 'NotFound',
			component: () => import('../views/404/NotFound.vue')
		},
	]
})
// 路由守卫
// router.beforeEach((to, from) => {
// 	if (to.path == '/login') {
// 		loginStore.$state.loginState = true
// 	} else {
// 		// store.state.isFooterMusic = true
// 	}
// })
export default router