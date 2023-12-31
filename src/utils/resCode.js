import router from '@/router'
import store from '@/store'
export default function getResCode(requestUrl) {
	const url = getUrl(requestUrl)
	let userName = store?.state?.permission?.userInfo?.userName || ''
	if (!userName) {
		const useInfo = window.sessionStorage.getItem('userInfo') || ''
		if (useInfo) {
			try {
				const userInfo = JSON.parse(useInfo) || {}
				userName = userInfo?.userName || ''
			} catch (err) {
				console.log(err)
			}
		}
	}
	const route = router?.app?.$route
	const activeMenu = getActiveMenu(route)
	const the2PerminssionKey =
		activeMenu && activeMenu.length && activeMenu.length > 1
			? activeMenu[1]
			: ''
	if (userName && url) {
		return toBase64([userName, url, the2PerminssionKey].join('@@@'))
	}
	return ''
}

function getActiveMenu(route) {
	if (route) {
		const { meta, matched } = route
		if (meta && meta.activeMenu && meta.activeMenu.length) {
			return meta.activeMenu || []
		} else {
			let parentMeta = []
			matched.forEach((e) => {
				const matchedMeta = e.meta
				if (
					matchedMeta.activeMenu &&
					matchedMeta.activeMenu.length &&
					!parentMeta.length
				) {
					parentMeta = matchedMeta.activeMenu
				}
			})
			return parentMeta
		}
	}
	return []
}

function getUrl(requestUrl) {
	const urlArr = requestUrl.split('?')
	return urlArr.length ? urlArr[0] : ''
}

function toBase64(str) {
	// 对字符串进行编码
	var encode = encodeURI(str)
	// 对编码的字符串转化base64
	var base64 = btoa(encode)
	return base64
}
