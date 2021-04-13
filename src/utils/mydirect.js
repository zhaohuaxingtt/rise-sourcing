/*
 * @Author: yuszhou
 * @Date: 2021-02-19 14:29:09
 * @LastEditTime: 2021-04-12 20:57:25
 * @LastEditors: Please set LastEditors
 * @Description: 自定义指令文件。
 * @FilePath: \rise\src\utils\mydirect.js
 */

import store from '../store'
// 按钮权限
// eslint-disable-next-line no-undef
Vue.directive('permission', {
        inserted: function(el, binding) {
            if (binding.modifiers.disabled) {
                if (store.state.permission.whiteBtnList[binding.expression]) {
                    el.classList.add("is-disabled")
                }
            } else {
                if (!store.state.permission.whiteBtnList[binding.expression]) {
                    el.parentNode.removeChild(el)
                }
            }
        }
    })
    //切换I8n动态更新element值
    // eslint-disable-next-line no-undef
Vue.directive('update', {
    bind: function(el, binding, vnode) {
        vnode.key = Hash()
    }
});

// 实现拖拽功能
// eslint-disable-next-line no-undef
Vue.directive('dragabled', {
    bind: function(el, binding, vnode, oldVnode) {
        if (!binding) return
        el.onmousedown = (e) => {
            // 鼠标按下，计算当前元素距离可视区的距离
            let disX = e.clientX;
            let disY = e.clientY;
            el.style.cursor = 'move';

            document.onmousemove = function(e) {
                e.preventDefault(); // 移动时禁用默认事件

                // 通过事件委托，计算移动的距离 
                const left = e.clientX - disX;
                disX = e.clientX;
                el.scrollLeft += -left;

                const top = e.clientY - disY;
                disY = e.clientY;
                el.scrollTop += -top;
            };

            document.onmouseup = function(e) {
                el.style.cursor = 'auto';
                document.onmousemove = null;
                document.onmouseup = null;
            };
        }
    }
})

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