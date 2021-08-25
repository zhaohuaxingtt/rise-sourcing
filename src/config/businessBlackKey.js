/*
 * @Author: your name
 * @Date: 2021-08-02 15:35:55
 * @LastEditTime: 2021-08-25 16:43:58
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
    ['PARTSPROCURE_EDITORDETAIL_CREATEDDSQD', //采购项目详情-生成定点申请
    'PARTSPROCURE_BATCHMIANTAIN_ONLYCHANGE', //仅零件号变更-零件采购项目记录-批量修改界面
    'PARTSPROCURE_BATCHMIANTAIN_PURCHASINGCONFIRMJLJH',//仅零件号变更-顶部保存按钮。
    ],
    [ 'PARTSPROCURE_EDITORDETAIL_STARTUP', //采购项目详情-启动项目
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
    ],
    partProjTypes,businessKey
)

// 零件采购项⽬详情页--零件项目类型:AEKO
translateBackToWhite(
  partProjTypes.AEKOLINGJIANXIN,
  [
    // 'PARTSPROCURE_EDITORDETAIL_RETURN', // 返回按钮 
    // 'PARTSPROCURE_EDITORDETAIL_PARTNUMBER', // 基础信息-零件号
    // 'PARTSPROCURE_EDITORDETAIL_PARTNAMEZH', // 基础信息-零件名（中）
    // 'PARTSPROCURE_EDITORDETAIL_PARTNUMBERGER', // 基础信息-零件名称（德）
    // 'PARTSPROCURE_EDITORDETAIL_FSNRGSNRSPNR', // 基础信息-FSNR/GSNR/SPNR
    // 'PARTSPROCURE_EDITORDETAIL_INQUIRYBUYER', // 基础信息--询价采购员 
    // 'PARTSPROCURE_EDITORDETAIL_SOPDATE', // 基础信息-PSOP日期 
    // 'PARTSPROCURE_EDITORDETAIL_PARTSTATUS', // 基础信息-零件采购项目状态
    // 'PARTSPROCURE_EDITORDETAIL_BMG', // 基础信息-BMG 
  ],
  [
    'PARTSPROCURE_EDITORDETAIL_STARTUP', // 按钮-启动项目 show:false 
    'PARTSPROCURE_EDITORDETAIL_ENDPROJECT', // 按钮-结束项目 show:false
    'PARTSPROCURE_EDITORDETAIL_GENERATEFSGSNR', // 按钮-生成零件采购项目号 show:false
    'PARTSPROCURE_EDITORDETAIL_CANCELITEMS', // 按钮-取消零件采购项目 show:false
    'PARTSPROCURE_EDITORDETAIL_BASICINFOSAVE', // 按钮-保存 show:false
    'PARTSPROCURE_EDITORDETAIL_CFCONTROLLER', // 基础信息-CF控制员 show:false
    'PARTSPROCURE_BASIC_HEVAYITEMLIST', // 基础信息-HeavyItemList show:false 
    'PARTSPROCURE_EDITORDETAIL_LINGJIANCHENGBENFENXIYUAN', // 基础信息-零件成本分析员 show:false 
    'PARTSPROCURE_EDITORDETAIL_MOJUCHENGBENFENXIYUAN', // 基础信息-模具成本分析员 show:false 
    'PARTSPROCURE_EDITORDETAIL_COMMINSOURCING', // 基础信息-Common Sourcing show:false 
    'PARTSPROCURE_EDITORDETAIL_DATEOFRECEIPT', //  基础信息-签收日期 show:false 

    'PARTSPROCURE_EDITORDETAIL_SETPROCESSGROUP', // TAB-材料组信息-按钮-设置工艺组 show:false
    'PARTSPROCURE_EDITORDETAIL_CHAZHAOGONGYIZUGONGYINGSHANG', // TAB-材料组信息-按钮-查找工艺组供应商 show:false
    'PARTSPROCURE_EDITORDETAIL_REMARKS_SAVE', // TAB-备注-按钮-保存 show:false
    
    'PARTSPROCURE_EDITORDETAIL_REMARKS_INQUIRYBUYER', // TAB-备注-询价采购员备注 show:true disabled:true
    'PARTSPROCURE_EDITORDETAIL_REMARKS_LINIENOTES', // TAB-备注-Linie备注 show:true disabled:true
    'PARTSPROCURE_EDITORDETAIL_REMARKS_CS1REMARKS', // TAB-备注-CS*1备注 show:true disabled:true


    'PARTSPROCURE_EDITORDETAIL_EVENTITEMTYPE', // 基础信息-零件项目类型 show:true disabled:true
    'PARTSPROCURE_EDITORDETAIL_CARTYPEZH', // 基础信息-车型项目 show:true disabled:true
    'PARTSPROCURE_EDITORDETAIL_PARTTYPE', // 基础信息-零件类型 show:true disabled:true
    'LK_DANWEI', // 基础信息-单位 show:true disabled:true
    'PARTSPROCURE_EDITORDETAIL_MTZPARTS', // 基础信息-MTZ零件 show:true disabled:true
    'PARTSPROCURE_EDITORDETAIL_PURCHASINGFACTORY', // 基础信息--采购工厂 show:true disabled:true
    'PARTSPROCURE_EDITORDETAIL_LINEDEPARTMENT', // 基础信息 LINIE部门 show:true disabled:true
    'PARTSPROCURE_EDITORDETAIL_LINE', // 基础信息 LINIE show:true disabled:true
  ],
  partProjTypes,businessKey
)