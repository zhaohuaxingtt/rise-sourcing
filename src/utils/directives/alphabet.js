/*
 * @Author: your name
 * @Date: 2021-09-03 11:12:48
 * @LastEditTime: 2021-09-03 14:40:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \重庆软维科技\front-web\src\utils\directives\alphabet.js
 */
/*
 * @Author: youyuan
 * @Date: 2021-09-03 11:12:48
 * @LastEditTime: 2021-09-03 11:20:13
 * @LastEditors: Please set LastEditors
 * @Description: 限制只能输入中文或英文
 * @FilePath: \重庆软维科技\front-web\src\utils\directives\alphabet.js
 */
export default {
  key: 'alphabet',
  func: {
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
  }
}