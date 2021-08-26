/*
 * @Author: your name
 * @Date: 2021-08-25 16:17:37
 * @LastEditTime: 2021-08-25 19:00:05
 * @LastEditors: Please set LastEditors
 * @Description: 仅零件号变更业务权限key控制。
 * @FilePath: \front-web\src\config\businesskey\moudules\onlyPartsChange.js
 */
import {partProjTypes} from '@/config/index'
const routerKey = partProjTypes.JINLINGJIANHAOGENGGAI
const blackKey = [ 'PARTSPROCURE_EDITORDETAIL_STARTUP', //采购项目详情-启动项目
                   'PARTSPROCURE_EDITORDETAIL_GENERATEFSGSNR',//采购项目详情-生成fs
                   'PARTSPROCURE_EDITORDETAIL_CANCELITEMS', //采购项目详情-取消零件采购项目
                   'PARTSPROCURE_EDITORDETAIL_SPLITFACTORY', //采购项目详情-采购采购工厂
                   'PARTSPROCURE_EDITORDETAIL_ENDPROJECT', //采购项目详情-结束项目
                   'PARTSPROCURE_BATCHMIANTAIN_GENERATEFSNUMBER', //批量维护-生成零件采购项目号
                   'PARTSPROCURE_BATCHMIANTAIN_STARTINQUIRY', //批量维护-启动询价
                   'PARTSPROCURE_BATCHMIANTAIN_OUTPUTLINE',//批量维护-参量计划
                   'PARTSPROCURE_BATCHMIANTAIN_CHEXINXIANGMU', //批量维护车型项目
                   'PARTSPROCURE_EDITORDETAIL_LINGJIANCHANLIANGJILU', //采购项目详情-零件产量记录
                   'PARTSPROCURE_OUTPUTPLAN_OUTPUTRECORD_SAVE', //采购项目详情-产量计划详情-保存按钮
                   'PARTSPROCURE_BATCHMIANTAIN_PURCHASINGCONFIRM' //零件采购项目批量修改-详细信息保存
                 ]
const whiteKey = ['PARTSPROCURE_EDITORDETAIL_CREATEDDSQD', //采购项目详情-生成定点申请 show:true disabel:true
                  'PARTSPROCURE_BATCHMIANTAIN_ONLYCHANGE', //仅零件号变更-零件采购项目记录-批量修改界面
                  'PARTSPROCURE_BATCHMIANTAIN_PURCHASINGCONFIRMJLJH',//仅零件号变更-顶部保存按钮。
                 ]
module.exports = {
  blackKey,
  whiteKey,
  routerKey
}