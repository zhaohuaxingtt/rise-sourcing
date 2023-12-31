/*
 * @Author: your name
 * @Date: 2021-03-17 23:40:36
 * @LastEditTime: 2023-03-17 09:31:23
 * @LastEditors: 余继鹏 917955345@qq.com
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\utils\filedowLoad.js
 */

export function excelExport(data, title, name) {
	var fileName;
	if(name){
		fileName= name
	}else{
		fileName= new Date().getTime()
	}
	try {
		// eslint-disable-next-line no-undef
		if (!data && !title)
			return console.warn(Vue.$t('LK_MEIYOUKEYIXIAZHAIDEXINXI'))
		let worksheet = window.XLSX.utils.aoa_to_sheet(translateData(data, title))
		// 创建工作簿
		let newWorkbook = window.XLSX.utils.book_new()
		// 将工作表附加到工作簿
		window.XLSX.utils.book_append_sheet(newWorkbook, worksheet, 'SheetJS')

		// 写入数据
		let s = window.XLSX.write(newWorkbook, { type: 'binary' })
		let tmpDown = new Blob([s2ab(s)], { type: '' })
		const href = document.createElement('a')
		href.setAttribute('href', URL.createObjectURL(tmpDown))
		href.setAttribute('download', fileName + '.xlsx')
		document.body.appendChild(href)
		href.click()
		setTimeout(() => {
			// 延时释放
			URL.revokeObjectURL(tmpDown)
		}, 5000)
	} catch (error) {
		console.log(error)
	}
}

function s2ab(s) {
	//  字符串转字符流
	var buf = new ArrayBuffer(s.length)
	var view = new Uint8Array(buf)
	for (var i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xff
	return buf
}

function translateData(data, title) {
	let baseName = []
	let baseKey = []
	for (let i in title) {
		baseName.push(title[i].name)
		baseKey.push(title[i].props)
	}
	baseName = [baseName]
	data.forEach((element) => {
		let newArray = []
		baseKey.forEach((err) => {
			newArray.push(element[err])
		})
		baseName.push(newArray)
	})

	return baseName
}

// 将blob数据流转化为url
export const exportExcel = (blob, fileName) => {
	let b = new Blob([blob], { type: 'application/vnd.ms-excel' })
	let blobUrl = window.URL.createObjectURL(b)
	const link = document.createElement('a') // 创建a标签
	link.href = blobUrl
	link.download = fileName + '.xlsx'
	link.click() // 模拟点击a标签
	window.URL.revokeObjectURL(link.href)
}
