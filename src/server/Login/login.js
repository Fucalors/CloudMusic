import service from "../service";
// 发送验证码
export const captcha = (phone) => {
	return service({
		method: 'GET',
		url: `/captcha/sent?phone=${phone}`,
	})
}
// 校验验证码
export const getCheckCaptcha = (phone, captcha) => {
	return service({
		method: 'GET',
		url: `/captcha/verify?phone=${phone}&captcha=${captcha}`,
	})
}
// 检测手机号码是否已经注册
export const getTelIsRegister = (phone) => {
	return service({
		url: `/cellphone/existence/check?phone=${phone}`,
		method: 'GET',
	})
}
// 手机号登录
export const getTelLogin = (phone, captcha) => {
	return service({
		url: `/login/cellphone?phone=${phone}&captcha=${captcha}`,
		method: 'GET',
	})
}
// 手机登录
export function getLoginPhone(phone, password) {
	// 1. 手机登录(现在要求验证, 暂时绕不过, 请使用二维码登录)
	// 必选参数:
	// phone: 手机号码
	// password: 密码
	// 可选参数:
	// countrycode: 国家码，用于国外手机号登录，例如美国传入：1
	// md5_password: md5 加密后的密码, 传入后 password 参数将失效
	// captcha: 验证码, 使用 / captcha / sent接口传入手机号获取验证码, 调用此接口传入验证码, 可使用验证码登录, 传入后 password 参数将失效
	// 接口地址: /login/cellphone
	// 调用例子: /login/cellphone ? phone = xxx & password=yyy / login / cellphone ? phone = xxx & md5_password=yyy/  login / cellphone ? phone = xxx & captcha=1234
	return service({
		method: "GET",
		url: `/login?cellphone?phone=${phone}&password=${password}`,
	})
}
// 邮箱登录
export function getLoginEmail(data) {
	// 	2. 邮箱登录(现在要求验证, 暂时绕不过, 请使用二维码登录)
	// 	必选参数:
	// 	email: 163 网易邮箱
	// 	password: 密码
	// 	可选参数:
	// 	md5_password: md5 加密后的密码, 传入后 password 将失效
	// 	接口地址: /login
	// 	调用例子: /login?email=xxx@163.com&password=yyy
	// 	完成登录后, 会在浏览器保存一个 Cookies 用作登录凭证, 大部分 API 都需要用到这个 Cookies,
	// 	非跨域情况请求会自动带上 Cookies, 跨域情况参考调用前须知
	// v3.30.0 后支持手动传入 cookie, 登录接口返回内容新增 cookie 字段, 保存到本地后, get 请求带上 ? cookie = xxx
	// 	(先使用 encodeURIComponent() 编码 cookie 值) 或者 post 请求 body 带上 cookie 即可,
	// 	如: /user/cloud?cookie=xxx 或者
	return service({
		method: "GET",
		url: `/login?email=${data.email}@163.com&password=${data.password}`,
	})
}
// 二维码登录
export function getLoginQRKey() {
	// 3. 二维码登录
	// 说明: 二维码登录涉及到 3 个接口, 调用务必带上时间戳, 防止缓存
	// 1.二维码 key 生成接口
	// 说明: 调用此接口可生成一个 key
	// 接口地址: /login/qr/key
	return service({
		method: "GET",
		url: `/login/qr/key?timestamp=${new Date().getTime()}`,
	})
}
// 获取二维码的 base64 编码
export const getQRCodeImgBase = (key) => {
	// 2. 二维码生成接口
	// 说明: 调用此接口传入上一个接口生成的 key 可生成二维码图片的 base64 和二维码信息, 可使用 base64 展示图片, 或者使用二维码信息内容自行使用第三方二维码生成库渲染二维码
	// 必选参数: key, 由第一个接口生成
	// 可选参数: qrimg 传入后会额外返回二维码图片 base64 编码
	// 接口地址: /login/qr / create
	// 调用例子: /login/qr/create?key = xxx
	return service({
		method: "GET",
		url: `/login/qr/create?key=${key}&qrimg=true&timestamp=${new Date().getTime()}`,

	})
}

// 检测二维码的状态
export const getCheckStatus = (key) => {
	// 	3. 二维码检测扫码状态接口
	// 	说明: 轮询此接口可获取二维码扫码状态, 800 为二维码过期, 801 为等待扫码, 802 为待确认, 803 为授权登录成功(803 状态码下会返回 cookies)
	// 	必选参数: key, 由第一个接口生成
	// 	接口地址: /login/qr / check
	// 	调用例子: /login/qr / check ? key = xxx
	// 调用可参考项目文件例子 / public / qrlogin.html(访问地址: http://localhost:3000/qrlogin.html)
	return service({
		method: "GET",
		url: `/login/qr/check?key=${key}&timestamp=${new Date().getTime()}`,

	})
}
// 登录状态
export const getLoginStatus = (cookie = '') => {
	// 登录状态
	// 说明: 调用此接口, 可获取登录状态
	// 接口地址: /login/status
	return service({
		method: "POST",
		url: `/login/status?timestamp=${new Date().getTime()}`,
		// headers: {
		// 	'Content-Type': 'application/x-www-form-urlencoded',
		// 	'Cookie': cookie
		// },
		// data: { cookie }
	})
}
// 注册
export const getRegister = (username, password, captcha, nickname) => {
	// 登录状态
	// 说明: 调用此接口, 可获取登录状态
	// 接口地址: /login/status
	return service({
		method: "GET",
		url: `/register/cellphone?phone=${username}&password=${password}&captcha=${captcha}&nickname=${nickname}`,
	})
}