import service from "../service";

// export const songListTab = () => {
// 	// 精品歌单标签列表
// 	// 说明: 调用此接口, 可获取精品歌单标签列表

// 	// 接口地址: /playlist/highquality/tags

// 	// 调用例子: /playlist/highquality/tags
// 	return service({
// 		url: `/playlist/highquality/tags`,
// 		methods: 'GET'
// 	})
// }

// 获取歌单详情
export function getSongList(id) {
	// 	获取歌单详情
	// 	说明: 歌单能看到歌单名字, 但看不到具体歌单内容, 调用此接口, 传入歌单 id, 可 以获取对应歌单内的所有的音乐(未登录状态只能获取不完整的歌单, 登录后是完整的)，但是返回的 trackIds 是完整的，tracks 则是不完整的，可拿全部 trackIds 请求一次 song / detail 接口获取所有歌曲的详情(https://github.com/Binaryify/NeteaseCloudMusicApi/issues/452)
	// 	必选参数 : id : 歌单 id
	// 可选参数 : s : 歌单最近的 s 个收藏者, 默认为 8
	// 接口地址 : /playlist/detail
	// 调用例子 : /playlist/detail ? id = 24381616
	return service({
		method: "GET",
		url: `/playlist/detail?id=${id}`,
	})
}
// 获取歌单详情
export function getSongLists(ids) {
	// 	获取歌单详情
	// 	说明: 歌单能看到歌单名字, 但看不到具体歌单内容, 调用此接口, 传入歌单 id, 可 以获取对应歌单内的所有的音乐(未登录状态只能获取不完整的歌单, 登录后是完整的)，但是返回的 trackIds 是完整的，tracks 则是不完整的，可拿全部 trackIds 请求一次 song / detail 接口获取所有歌曲的详情(https://github.com/Binaryify/NeteaseCloudMusicApi/issues/452)
	// 	必选参数 : id : 歌单 id
	// 可选参数 : s : 歌单最近的 s 个收藏者, 默认为 8
	// 接口地址 : /playlist/detail
	// 调用例子 : /playlist/detail ? id = 24381616
	if (ids.length > 1) {
		let idStr = ''
		for (let i = 0; i < ids.length; i++) {
			idStr += ids[i] + ','
		}
		ids = idStr.substring(0, idStr.length - 1)
	}
	return service({
		method: "GET",
		url: `/song/detail?ids=${ids}`,
	})
}

// 获取歌单所有歌曲
export function getSongListTrack(data) {
	// 获取歌单所有歌曲
	// 说明: 由于网易云接口限制，歌单详情只会提供 10 首歌，通过调用此接口，传入对应的歌单，即可获得对应的所有歌曲id
	// 必选参数 ： ： 歌单 idid
	// 可选参数: : 限制获取歌曲的数量，默认值为当前歌单的歌曲数量limit
	// 可选参数 ： ： 默认值为0offset
	// 接口地址: /playlist/track / all
	// 调用例子: /playlist/track / all ? id = 24381616 & limit=10 & offset=1
	// 注：关于，你可以这样理解，假设你当前的歌单有200首歌offset
	// 你传入limit = 50 & offset=0等价于limit = 50，你会得到第1 - 50首歌曲
	// 你传入limit = 50 & offset=50，你会得到第51 - 100首歌曲
	// 如果你设置limit = 50 & offset=100，你就会得到第101 - 150首歌曲
	return service({
		method: "GET",
		url: `/playlist/track/all?id=${data}`,
	})
}

// 获取歌单评论
export function getSongListComment(data, val) {
	// 歌单评论
	// 说明: 调用此接口, 传入音乐 id 和 limit 参数, 可获得该歌单的所有评论(不需要 登录)
	// 必选参数: id: 歌单 id
	// 可选参数: limit: 取出评论数量, 默认为 20
	// offset: 偏移数量, 用于分页, 如 : (评论页数 - 1) * 20, 其中 20 为 limit 的值
	// before: 分页参数, 取上一页最后一项的 time 获取下一页数据(获取超过 5000 条评论的时候需要用到)
	// 接口地址: /comment/playlist
	// 调用例子: /comment/playlist ? id = 705123491
	return service({
		method: "GET",
		url: `/comment/playlist?id=${data}&offset=${val}`,
	})
}

// 获取歌单收藏者
export function getSsubscribers(data, val) {
	// 歌单收藏者
	// 说明: 调用此接口, 传入歌单 id 可获取歌单的所有收藏者
	// 必选参数:
	// id: 歌单 id
	// 可选参数: limit: 取出评论数量, 默认为 20
	// offset: 偏移数量, 用于分页, 如 : (评论页数 - 1) * 20, 其中 20 为 limit 的值
	// 接口地址: /playlist/subscribers
	// 调用例子: /playlist/subscribers ? id = 544215255 & limit=30
	return service({
		method: "GET",
		url: `/playlist/subscribers?id=${data}&offset=${val}&limit=30`,
	})
}