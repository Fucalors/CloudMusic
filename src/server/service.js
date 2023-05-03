//引入axios
import axios from 'axios'

// 创建axios实例
const service = axios.create({
	baseURL: '/api', // 使用代理服务器

	timeout: 5000, // 请求超时时间
	// params: params, // 对象
	withCredentials: true, // 设置允许跨域
	// crossDomain: true, // 允许跨域
})
// 网络错误提示
const errorHandle = (status, errorInfo) => {
	switch (status) {
		case 301:
			console.log('资源永久移动')
			break
		case 302:
			console.log('资源临时移动')
			break
		case 400:
			console.log('信息校验失败')
			break
		case 401:
			console.log('请求要求身份验证')
			break
		case 403:
			console.log('服务器拒绝请求')
			break
		case 404:
			console.log('请求的资源不存在')
			break
		case 500:
			console.log('内部服务器错误')
			break
		case 502:
			console.log('服务器无响应')
			break
		case 503:
			console.log('服务不可用')
			break
		default:
			console.log(errorInfo)
			break
	}

}

// 请求拦截器
service.interceptors.request.use(
	config => {
		// 在请求发送之前做一些处理
		// const token = localStorage.getItem('token')
		// if (token) {
		//     config.headers.Authorization = token
		// }
		if (config.method === 'POST') {  //提前处理POST请求
			config.data = queryString.stringify(config.data)
		}
		// ElMessage({
		// 	message: '获取成功',
		// 	type: 'success',
		// 	grouping: true, //分组归类
		// 	showClose: true //支持关闭
		// })
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
		// console.log(error.response.statusText + ': ' + error.message)
		// if (error && error.response) {
		// 	errorHandle(error.response.status, error.response.message)
		// }

		return Promise.reject(error)
	}
)

export default service