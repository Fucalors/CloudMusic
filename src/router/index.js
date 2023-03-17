import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home/Home.vue'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),

	routes: [
		{
			path: '/',
			name: 'index',
			component: HomeView,
			redirect: '/index',
			children: [
				{
					// 当 /user/:id/profile 匹配成功
					// UserProfile 将被渲染到 User 的 <router-view> 内部
					path: '/index',
					name: 'index',
					component: () => import('../components/Main/HomePage.vue'),
				},
				{
					// 当 /user/:id/profile 匹配成功
					// UserProfile 将被渲染到 User 的 <router-view> 内部
					path: '/main',
					name: 'main',
					component: () => import('../views/Content/Main.vue'),

				},
				{
					// 当 /user/:id/profile 匹配成功
					// UserProfile 将被渲染到 User 的 <router-view> 内部
					path: '/fa',
					name: 'fa',
					component: () => import('../views/Content/Fa.vue'),
				},
				{
					// 当 /user/:id/profile 匹配成功
					// UserProfile 将被渲染到 User 的 <router-view> 内部
					path: '/mv',
					name: 'mv',
					component: () => import('../views/Content/Mv.vue'),
				}
			]
		},
		{
			path: '/login',
			name: 'login',
			// route level code-splitting
			// this generates a separate chunk (About.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			// component: resolve => reqire(['../views/Login.vue'],resolve) // 异步组件写法
			component: () => import('../views/Login/Login.vue')
		},
		// {
		// 	path: '/main',
		// 	name: 'main',
		// 	component: () => import('../components/Main/Main.vue')
		// },
		{   //404页面
			path: '/:pathMatch(.*)*',
			name: 'NotFound',
			component: import('../views/404/NotFound.vue')
		},
	]
})
export default router