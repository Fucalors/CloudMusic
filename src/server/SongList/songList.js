import service from "../service";

export const songListTab = () => {
	// 精品歌单标签列表
	// 说明: 调用此接口, 可获取精品歌单标签列表

	// 接口地址: /playlist/highquality/tags

	// 调用例子: /playlist/highquality/tags
	return service({
		url: `/playlist/highquality/tags`,
		methods: 'GET'
	})
}