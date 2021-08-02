/*
 * @Author: your name
 * @Date: 2021-08-02 15:35:55
 * @LastEditTime: 2021-08-02 18:36:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\config\businessKey.js
 */
import {partProjTypes} from './index'
import {translateBackToWhite} from '@/utils'
export const businessKey = {}
//仅零件号变更的黑名单key,业务逻辑上这些key都不需要显示。
translateBackToWhite(
  partProjTypes.JINLINGJIANHAOGENGGAI,
  ['PARTSPROCURE_EDITORDETAIL_CREATEDDSQD' //采购项目详情-生成定点申请
  ],
  ['PARTSPROCURE_EDITORDETAIL_STARTUP', //采购项目详情-启动项目
    'PARTSPROCURE_EDITORDETAIL_GENERATEFSGSNR',//采购项目详情-生成fs
    'PARTSPROCURE_EDITORDETAIL_CANCELITEMS', //采购项目详情-取消零件采购项目
    'PARTSPROCURE_EDITORDETAIL_SPLITFACTORY', //采购项目详情-采购采购工厂
    'PARTSPROCURE_EDITORDETAIL_ENDPROJECT', //采购项目详情-结束项目
    'PARTSPROCURE_EDITORDETAIL_BASICINFOSAVE',//采购项目详情-保存
    'PARTSPROCURE_EDITORDETAIL_APPLYFORTARGETPRICE' //采购项目详情-申请目标价
  ],
  partProjTypes,businessKey
  )