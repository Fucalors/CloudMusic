import service from "../service";

export const banner = () => {
	// banner
	// 调用此接口, 可获取 banner(轮播图) 数据,

	// 可选参数:
	// type: 资源类型, 对应以下类型, 默认为 0 即 PC
	// 0: pc 1: android 2: iphone 3: ipad
	return service({
		url: `/banner?type=0`,
		methods: 'GET'
	})
}
// export const homePage = () => {
// 	// 首页 - 发现音乐
// 	// 说明: 调用此接口, 可获取 APP 首页信息
// 	// 接口地址: /homepage/block / page

// 	// 可选参数: refresh: 是否刷新数据, 默认为 false
// 	// cursor: 上一条数据返回的 cursor
// 	return service({
// 		url: `/homepage/block/page`,
// 		methods: 'GET'
// 	})
// }
export const banners = () => {
	// 歌单
	// 调用此接口, 可获取 banner(轮播图) 数据,

	// 可选参数:
	// type: 资源类型, 对应以下类型, 默认为 0 即 PC
	// 0: pc 1: android 2: iphone 3: ipad
	return service({
		url: `/banner?type=0`,
		methods: 'GET'
	})
}