/*
 * @Author: yuszhou
 * @Date: 2021-02-19 14:29:09
 * @LastEditTime: 2021-08-13 17:03:28
 * @LastEditors: Please set LastEditors
 * @Description: 自定义指令文件。
 * @FilePath: \front-web\src\utils\mydirect.js
 */

import Vue from 'vue';
import store from '../store'
import router from '@/router'
import {businessPermission} from '@/utils'
// 按钮权限
// eslint-disable-next-line no-undef
Vue.directive('permission', {
        inserted: function(el, binding,vnode) {  // dist
            if (binding.modifiers.disabled) {
                if (store.state.permission.whiteBtnList[binding.expression]) {
                    el.classList.add("is-disabled")
                }
            } else if (binding.modifiers.dynamic) {
                if (!store.state.permission.whiteBtnList[binding.value] && businessPermission(binding.value,router.currentRoute.query)) {
                    el.parentNode.removeChild(el)
                }
            } else { //remove
                if (!store.state.permission.whiteBtnList[binding.expression] && businessPermission(binding.expression,router.currentRoute.query)) {
                    el.parentNode.removeChild(el)
                }
                // if (businessPermission(binding.expression,router.currentRoute.query)) {
                //     //remove paneTabs
                //     el.parentNode.removeChild(el)
                // }
            }
        }
    })
Vue.directive('permissionArr', {
    inserted: function(el, binding) {  // dist
        if (binding.modifiers.disabled) {
            if (binding.value.some(item => store.state.permission.whiteBtnList[item])) {
                el.classList.add("is-disabled")
            }
        } else { //remov
            if (!(binding.value.some(item => store.state.permission.whiteBtnList[item]))) {
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


const selectDisableStyle = `-webkit-user-select:none; -moz-user-select: none; -ms-user-select: none; user-select: none; `
Vue.directive('areaSelect', {
    inserted: (el, binding, vnode) => {
        
        let randIds = new Map()
        let mouseDownFlag = false
        let mouseUpFlag = false
        let cells = []
        el.addEventListener('mousedown', function (event) {
          
            mouseDownFlag = true
            mouseUpFlag = false
            cells = []
            el.querySelectorAll('tr').forEach(tr => {
                let row = tr.querySelectorAll('td div.cell')
                row.length > 0 && cells.push(row)
            })
            cells.forEach((tdRow, idy) => {
                tdRow.forEach((tdCol, idx) => {
                    const style = tdCol.style
                    if (String.call(style).indexOf(selectDisableStyle) < 0) {
                        tdCol.setAttribute('style',  selectDisableStyle)
                    }
                    // 若表格有 rowIndex ,cellIndex 则可不设 id
                    tdCol.setAttribute('id', `${idy + 1}_${idx + 1}`)
                })
            })
            // 选中点击的 cell
            removeStyle(event)
        })

        function mouseMove(evt) {
            if (mouseUpFlag || !mouseDownFlag) {
                return
            }
            // 缓存经过的 cell id
            randIds.set(evt.target.id, evt.target.id)
            // 选中
            removeStyle(evt)
        }

        el.addEventListener('mousemove', mouseMove)
        el.addEventListener('mouseup', function (evt) {
          
            mouseUpFlag = true
            mouseDownFlag = false
            // 框选逻辑
            let posList = Array.from(randIds).filter(v => v[0]).map(v => v[0]).map(v => v.split('_'))
            let posYList = posList.map(v => v[0])
            let posXList = posList.map(v => v[1])
            let minX = Math.min(...posXList), minY = Math.min(...posYList)
            let maxX = Math.max(...posXList), maxY = Math.max(...posYList)
            cells.forEach(cellRow => {
             
                cellRow.forEach(cell => {
               
                    let [idy, idx] = cell.id.split('_').map(v => Number(v))
                    if (idx >= minX && idx <= maxX && idy >= minY && idy <= maxY) {
                        // removeStyle(cell)
                    }
                })
            })
            // 重置
            randIds = new Map()
            cells = []
        })
    }
});


// directives: {
//     areaSelect: { // 在需要自定义选择的元素上添加 v-areaSelect
//         inserted: (el, binding, vnode) => {
//             let randIds = new Map()
//             let mouseDownFlag = false
//             let mouseUpFlag = false
//             let cells = []
//             el.addEventListener('mousedown', function (event) {
//                 mouseDownFlag = true
//                 mouseUpFlag = false
//                 cells = []
//                 el.querySelectorAll('tr').forEach(tr => {
//                     let row = tr.querySelectorAll('td div.cell')
//                     row.length > 0 && cells.push(row)
//                 })
//                 cells.forEach((tdRow, idy) => {
//                     tdRow.forEach((tdCol, idx) => {
//                         const style = tdCol.getAttribute('style')
//                         if (style.indexOf(selectDisableStyle) < 0) {
//                             tdCol.setAttribute('style', style + selectDisableStyle)
//                         }
//                         // 若表格有 rowIndex ,cellIndex 则可不设 id
//                         tdCol.setAttribute('id', `${idy + 1}_${idx + 1}`)
//                     })
//                 })
//                 // 选中点击的 cell
//                 removeStyle(event)
//             })

//             function mouseMove(evt) {
//                 if (mouseUpFlag || !mouseDownFlag) {
//                     return
//                 }
//                 // 缓存经过的 cell id
//                 randIds.set(evt.target.id, evt.target.id)
//                 // 选中
//                 removeStyle(evt)
//             }

//             el.addEventListener('mousemove', mouseMove)
//             el.addEventListener('mouseup', function (evt) {
//                 mouseUpFlag = true
//                 mouseDownFlag = false
//                 // 框选逻辑
//                 let posList = Array.from(randIds).filter(v => v[0]).map(v => v[0]).map(v => v.split('_'))
//                 let posYList = posList.map(v => v[0])
//                 let posXList = posList.map(v => v[1])
//                 let minX = Math.min(...posXList), minY = Math.min(...posYList)
//                 let maxX = Math.max(...posXList), maxY = Math.max(...posYList)
//                 cells.forEach(cellRow => {
//                     cellRow.forEach(cell => {
//                         let [idy, idx] = cell.id.split('_').map(v => Number(v))
//                         if (idx >= minX && idx <= maxX && idy >= minY && idy <= maxY) {
//                             removeStyle(cell)
//                         }
//                     })
//                 })
//                 // 重置
//                 randIds = new Map()
//                 cells = []
//             })
//         }
//     }
// }

// 清除禁止选中的样式，同时选中
function removeStyle(evt) {
    let target = evt.target || evt
    let style = target.style|| selectDisableStyle
    console.log(style)
    let reg = new RegExp(selectDisableStyle, 'g')
    target.setAttribute('style', style)
}
