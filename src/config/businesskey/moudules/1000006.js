/*
 * @Author: your name
 * @Date: 2021-08-25 19:03:24
 * @LastEditTime: 2021-08-26 10:34:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\config\businesskey\moudules\aeko.js
 */
const blackKey = ['PARTSPROCURE_EDITORDETAIL_STARTUP', // 按钮-启动项目 show:false 
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

                  'PARTSPROCURE_EDITORDETAIL_PARTSPRODUCTIONPLAN', // TAB-零件产量计划 show:false
                  'PARTSPROCURE_EDITORDETAIL_DRAWINGSANDTPDETAILSPAGE', // TAB-图纸和信息单详情 show:false
                  'PARTSPROCURE_EDITORDETAIL_APPLYFORTARGETPRICE', // TAB-申请目标价 show:false

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
                 ]
const whiteKey = []
module.exports = {
  blackKey,
  whiteKey
}