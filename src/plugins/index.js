export const getCurrentTime = () => {  //当前时间
	const now = new Date();
	const year = now.getFullYear();
	const month = now.getMonth() + 1;
	const day = now.getDate();
	const hour = now.getHours();
	const minute = now.getMinutes();
	const second = now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds();;

	return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}

export const playCount = (number) => { // 对播放数量的处理
	if (number < 10000) {
		return number
	} else if (number < 100000000) {
		return (number / 10000).toFixed(1) + '万'
	} else {
		return (number / 100000000).toFixed(1) + '亿'
	}
}

export const convertMsToMinSec = (ms) => { // 毫秒  --> 分:秒 函数
	// 调用方法
	// let timeString = convertMsToMinSec(238552)
	// console.log(timeString)
	let minutes = Math.floor(ms / 60000)
	let seconds = ((ms % 60000) / 1000).toFixed(0)
	return minutes + ':' + (seconds < 10 ? '0' : '') + seconds
}
