/*
 * @Author: yuszhou
 * @Date: 2021-02-19 14:29:09
 * @LastEditTime: 2021-04-12 16:35:21
 * @LastEditors: Please set LastEditors
 * @Description: 自定义指令文件。
 * @FilePath: \rise\src\utils\mydirect.js
 */

import store from '../store'
// 按钮权限
// eslint-disable-next-line no-undef
Vue.directive('permission', {
	inserted: function(el, binding) {
		if (!store.state.permission.whiteBtnList[binding.expression]) {
			if (binding.modifiers.disabled) {
				el.classList.add("is-disabled")
				// let textarea = el.getElementsByTagName("textarea")
				// let input = el.getElementsByTagName("input")
				// let arr = [...textarea,...input]
				// arr.forEach(res => {
				// 	res.setAttribute('disabled','disabled')
				// })
			} else {
				el.parentNode.removeChild(el)
			}
		}
	}
});
//切换I8n动态更新element值
// eslint-disable-next-line no-undef
Vue.directive('update', {
	bind: function(el, binding, vnode) {
		vnode.key = Hash()
	}
});

export function Hash() {
	return parseInt(Math.random() * 1000000000)
}
// Input 整数输入
// eslint-disable-next-line no-undef
Vue.directive('Int', {
	bind: function(el) {
		const input = el.getElementsByTagName('input')[0]
		input.onkeyup = function(e) {
			if (input.value.length === 1) {
				input.value = input.value.replace(/[^1-9]/g, '')
			} else {
				input.value = input.value.replace(/[^\d]/g, '')
			}
		}
		input.onblur = function(e) {
			if (input.value.length === 1) {
				input.value = input.value.replace(/[^1-9]/g, '')
			} else {
				input.value = input.value.replace(/[^\d]/g, '')
			}
		}
	}
})
