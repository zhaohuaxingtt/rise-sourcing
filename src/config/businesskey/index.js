/*
 * @Author: your name
 * @Date: 2021-08-25 16:16:22
 * @LastEditTime: 2021-09-02 18:49:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\config\businesskey\index.js
 */
import {partProjTypes} from '@/config/index'
import {translateBackToWhite} from '@/utils'
export let businessKey = {}
const modulesList = require.context('./moudules/',true,/\.js$/)
modulesList.keys().forEach(i=>{
  const f = modulesList(i)
  translateBackToWhite(i.match(/[0-9]*/g)[2],f.whiteKey,f.blackKey,partProjTypes,businessKey)
})

