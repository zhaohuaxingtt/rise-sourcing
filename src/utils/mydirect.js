/*
 * @Author: yuszhou
 * @Date: 2021-02-19 14:29:09
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
 * @LastEditTime: 2021-09-28 18:36:49
 * @LastEditors: Please set LastEditors
=======
 * @LastEditTime: 2021-09-26 17:28:50
 * @LastEditors: Hao,Jiang
>>>>>>> workStream1
=======
 * @LastEditTime: 2021-09-27 12:52:37
 * @LastEditors: Please set LastEditors
>>>>>>> 6bc1e687ccbf9505a092fa42673d7c62d65f345c
=======
 * @LastEditTime: 2021-09-28 18:05:46
 * @LastEditors: Please set LastEditors
>>>>>>> origin/workStream1
 * @Description: 自定义指令文件。
 * @FilePath: \front-web\src\utils\mydirect.js
 */

import Vue from 'vue';
import store from '../store'
import router from '@/router'
import {businessPermission} from '@/utils'
import {getTousandNum, delcommafy} from "@/utils/tool";
// 按钮权限
// eslint-disable-next-line no-undef
Vue.directive('permission', {
        inserted: function(el, binding,vnode) {
            //如果是个变量则使用变量，否则当做字符串处理
            const value = binding.value?binding.value:binding.expression
            // dynamic、auto共用时处理
            if (binding.modifiers.dynamic && binding.modifiers.auto) {
                binding.modifiers.dynamic = false
                binding.expression = binding.value
            }

            if (binding.modifiers.disabled) {
                if (store.state.permission.whiteBtnList[value]) {
                    el.classList.add("is-disabled")
                }
            } else if (binding.modifiers.dynamic) {
                if (!store.state.permission.whiteBtnList[value] && businessPermission(value,router.currentRoute.query)) {
                    el.parentNode.removeChild(el)
                }
            } else if(binding.modifiers.auto){
                // eslint-disable-next-line no-debugger
                const splitValue = value.split('|')
                if(splitValue.length > 1){store.dispatch('uploadResource',splitValue)}
                // if (!store.state.permission.whiteBtnList[splitValue[0]]) {
                //     el.parentNode.removeChild(el)
                // }else{
                    if(businessPermission(splitValue[0],router.currentRoute.query)){
                       el.parentNode.removeChild(el)
                    }
                // }
                // force permission
                if (binding.modifiers.force && !store.state.permission.whiteBtnList[splitValue[0]]) {
                    el.parentNode.removeChild(el)
                }
            } else { //remove
                // if (!store.state.permission.whiteBtnList[binding.expression]) {
                //     el.parentNode.removeChild(el)
                // }else{
                    if(businessPermission(value,router.currentRoute.query)){
                       el.parentNode.removeChild(el)
                    }
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

Vue.directive("lazySelect", {
    bind(el, binding) {
        const dom = el.querySelector(".el-select-dropdown .el-select-dropdown__wrap")
        dom.addEventListener("scroll", function() {
            console.log(this,this.scrollHeight,this.scrollTop,(this.scrollHeight - this.scrollTop) <= this.clientHeight);
          if ((this.scrollHeight - this.scrollTop) <= this.clientHeight) binding.value()
        });
    }
})

Vue.directive("moneyInput", {
    inserted: function(el, binding) {
        let input = el.querySelector('input')
        input.addEventListener('keyup', () => {
            input.value = input.value.replace(/[^\d^\.]+/g,'').replace('.','$#$').replace(/\./g,'').replace('$#$','.')
        })
        input.addEventListener('focus', () => {
            input.value = delcommafy(input.value)
        })
        input.addEventListener('blur', () => {
            input.value = input.value.replace(/[^\d^\.]+/g,'').replace('.','$#$').replace(/\./g,'').replace('$#$','.')
            input.value = getTousandNum(Number(input.value).toFixed(2))
        })
    }
})

// 限制只能输入中文或英文逗号
Vue.directive("alphabet", {
  inserted(e) {
    const el = e.querySelector('.el-input__inner');
    el.addEventListener('input', e => {
      //进行验证
      checkedfun(el);
    })
    let checkedfun = el => {
      // let reg = new RegExp("^[A-Za-z0-9]*$");
      let reg = new RegExp("^[\d\,]*$");
      if (!reg.test(el.value)) {
        // el.value = el.value.replace(/[^A-Za-z0-9]+/g, "");
        el.value = el.value.replace(/[^\d\,]+/g, "");
        el.dispatchEvent(new Event("input"));//调用input事件使vue v-model绑定更新
      }
    }
  }
})

/**
 * @desc 验证整数类型数字方法
 * @param {Object} e
 * @param {regular} reg 正则
 * @param {Number} charcode 键盘code
 * */
 let checkNumber = (e, reg, charcode) => {
  if (!reg.test(String.fromCharCode(charcode)) && charcode > 9 && !e.ctrlKey) {
    if (e.preventDefault) {
      e.preventDefault()
    } else {
      e.returnValue = false
    }
  }
}

/**
 * @desc 验证浮点类型小数方法(建议用text类型的表单)
 * @param {Object} e
 * @param {regular} reg 正则
 * @param {Number} charcode 键盘code
 * @param {Object} el dom对象
 * */
let checkFloat = (e, reg, charcode, el) => {
  if (charcode == 46) {
    if (el.value.includes('.')) {
      e.preventDefault()
    }
  } else if (
    !reg.test(String.fromCharCode(charcode)) &&
    charcode > 9 &&
    !e.ctrlKey
  ) {
    if (e.preventDefault) {
      e.preventDefault()
    } else {
      e.returnValue = false
    }
  }
}

Vue.directive("positive", {
  inserted(el, bind) {
    el.addEventListener('keypress', e => {
      e = e || window.event
      let charcode = typeof e.charCode === 'number' ? e.charCode : e.keyCode
      let reg = null
      switch (bind.value) {
        case 'num':
          reg = /\d/
          checkNumber(e, reg, charcode)
          break
        case 'int':
          if (el.value.length === 0) {
            reg = /^[1-9]$/
          } else {
            reg = /\d/
          }
          checkNumber(e, reg, charcode)
          break
        case 'float':
          reg = /\d/
          checkFloat(e, reg, charcode, el)
          break
      }
    })
  }
})

