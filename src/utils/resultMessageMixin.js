/*
 * @Author: your name
 * @Date: 2021-11-08 16:07:18
 * @LastEditTime: 2021-12-08 21:49:45
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \front-sourcing\src\utils\resultMessageMixin.js
 */
import { iMessage } from 'rise'

export default {
  methods: {
    resultMessage(res, successCallback, errorCallback) {
      const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn
      const moduleName = res.moduleName ? res.moduleName + ':' : ''
      if (res.result) {
        iMessage.success(moduleName + result)
        if (successCallback) {
          successCallback()
        }
      } else {
        iMessage.error(moduleName + result)
        if (errorCallback) {
          errorCallback()
        }
      }
    },
  },
}
