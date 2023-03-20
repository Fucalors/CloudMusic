//引入axios
import axios from 'axios'
import { queuePostFlushCb } from "vue"; // 创建axios实例

const service = axios.create({
	baseURL: '/api', // 使用代理服务器
	timeout: 5000, // 请求超时时间
	withCredentials: true, // 设置允许跨域
})
// 网络错误提示
const errorHandle = (status, errorInfo) => {
	switch (status) {
		case 400:
			console.log('信息校验失败')
			break
		case 401:
			console.log('认证失败')
			break
		case 403:
			console.log('token校验失败')
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
		// console.log('请求拦截器')
		return config
	},
	error => {
		Message.error({ message: '请求超时!' })
		return Promise.reject(error);
	}
)
// 响应拦截器
service.interceptors.response.use(
	response => {
		// 对响应数据做一些处理
		return response.status === 200 ? Promise.resolve(response) : Promise.reject(response);
	},
	error => {
		if (error && error.response) {
			errorHandle(error.response.status, error.response.data.message, error.response.errorInfo)
		} //后面添加的 error.response.errorInfo

		return Promise.reject(error)
	}
)

export default service