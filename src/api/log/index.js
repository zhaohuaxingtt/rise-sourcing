/*
 * @Author: YoHo
 * @Date: 2021-10-08 18:14:35
 * @LastEditTime: 2021-11-01 18:04:03
 * @LastEditors: YoHo
 * @Description: 
 */
import axios from '@/utils/axios'
const requst = axios(process.env.VUE_APP_COMMON)

export function queryByPage(params) {
  return requst({
    url: '/itLog/inner/queryByPage',
    method: 'GET',
    params: params
  })
}

export function queryLogByAeko(params) {
  return new Promise((r,j)=>{
    let res = {
      code:'200',
      total:2,
      data:[{
        module:"模具投资清单",
        operatorType:"修改",
        operatorName:"超级管理员",
        createDate:"2021-03-04 12:00:00",
        responseDate:"2021-03-04 12:00:00",
        result:"Success",
        info:"模具ID=0; 变更原因=改了数量; 变更内容=[数量: 1 -> 3;资产单价:1000.00 -> 1000; 资产总额: 1000.00 -> 3000]"
      },{
        module:"模具投资清单",
        operatorType:"修改",
        operatorName:"超级管理员",
        createDate:"2021-03-04 12:00:00",
        responseDate:"2021-03-04 12:00:00",
        result:"Success",
        info:"模具ID=0; 变更原因=改了数量; 变更内容=[数量: 1 -> 3;资产单价:1000.00 -> 1000; 资产总额: 1000.00 -> 3000]"
      }]
    }
    r(res)
  })
  // return requst({
  //   url: '/itLog/inner/queryByPage',
  //   method: 'GET',
  //   params: params
  // })
}