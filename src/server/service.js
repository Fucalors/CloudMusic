//引入axios
import axios from 'axios'

// 创建axios实例
const service = axios.create({
	baseURL: '/api', // 使用代理服务器
	timeout: 5000, // 请求超时时间
	// params: params, // 对象
	// withCredentials: true, // 设置允许跨域
	// crossDomain: true, // 允许跨域
})
// 请求拦截器
service.interceptors.request.use(
	config => {
		// 在请求发送之前做一些处理
		const cookie = localStorage.getItem('cookie')
		if (cookie) {
			config.headers.Authorization = cookie
		}

		const token = localStorage.getItem('token')
		if (token) {
			config.headers.Authorization = token
		}

		if (config.method === 'POST') {  //提前处理POST请求
			config.data = queryString.stringify(config.data)
		}
		return config
	},
	error => {
		// Message.error({ message: '请求超时!' })
		// console.log(error.message + '请求超时!');
		return Promise.reject(error);
	}
)
// 响应拦截器
service.interceptors.response.use(
	response => {
		// 对响应数据做一些处理
		// console.log(response)
		// return response.status === 200 ? Promise.resolve(response) : Promise.reject(response); //原写法
		return response.status === 200 ? Promise.resolve(response) : Promise.reject(response.data);

	},
	error => {
		// const message= ''
		// let status =error.response.status
		// switch (status) {
		// 	case 301:
		// 		console.log('资源永久移动')
		// 		break;
		// 	case 302:
		// 		console.log('资源临时移动')
		// 		break;
		// 	case 400:
		// 		console.log('信息校验失败')
		// 		break;
		// 	case 401:
		// 		console.log('请求要求身份验证或token过期')
		// 		break;
		// 	case 403:
		// 		console.log('服务器拒绝请求')
		// 		break;
		// 	case 404:
		// 		console.log('请求的资源不存在')
		// 		break;
		// 	case 500:
		// 		console.log('服务器错误')
		// 		break;
		// 	case 502:
		// 		console.log('服务器无响应')
		// 		break;
		// 	case 503:
		// 		console.log('服务不可用')
		// 		break
		// 	default:
		// 		message = '网络出现问题';
		// 		break;
		// }
		// 提示错误信息
		ElMessage({
			type: 'error',
			grouping: true, //分组归类
			showClose: true, //支持关闭
			message: error.message
		})
		return Promise.reject(error)
	}
)

export default service