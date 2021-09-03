/*
 * @Author: your name
 * @Date: 2021-08-25 19:03:24
 * @LastEditTime: 2021-09-03 11:15:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\config\businesskey\moudules\aeko.js
 */
const blackKey = [
                  // 零件采购项目详情页
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

                  'PARTSPROCURE_EDITORDETAIL_PARTSPRODUCTIONPLAN', // TAB-零件产量计划 show:false
                  'PARTSPROCURE_EDITORDETAIL_DRAWINGSANDTPDETAILSPAGE', // TAB-图纸和信息单详情 show:false
                  'PARTSPROCURE_EDITORDETAIL_APPLYFORTARGETPRICE', // TAB-申请目标价 show:false



                  // 'PARTSPROCURE_EDITORDETAIL_REMARKS_INQUIRYBUYER_SHOW', // TAB-备注-询价采购员备注
                  'PARTSPROCURE_EDITORDETAIL_REMARKS_INQUIRYBUYER', // TAB-备注-询价采购员备注 show:true disabled:true
                  'PARTSPROCURE_EDITORDETAIL_REMARKS_LINIENOTES', // TAB-备注-Linie备注 show:true disabled:true
                  'PARTSPROCURE_EDITORDETAIL_REMARKS_CS1REMARKS', // TAB-备注-CS*1备注 show:true disabled:true


                  // 'PARTSPROCURE_EDITORDETAIL_EVENTITEMTYPE', // 基础信息-零件项目类型 show:true disabled:true
                  // 'PARTSPROCURE_EDITORDETAIL_CARTYPEZH', // 基础信息-车型项目 show:true disabled:true
                  // 'PARTSPROCURE_EDITORDETAIL_PARTTYPE', // 基础信息-零件类型 show:true disabled:true
                  // 'LK_DANWEI', // 基础信息-单位 show:true disabled:true
                  // 'PARTSPROCURE_EDITORDETAIL_MTZPARTS', // 基础信息-MTZ零件 show:true disabled:true
                  // 'PARTSPROCURE_EDITORDETAIL_PURCHASINGFACTORY', // 基础信息--采购工厂 show:true disabled:true
                  // 'PARTSPROCURE_EDITORDETAIL_LINEDEPARTMENT', // 基础信息 LINIE部门 show:true disabled:true
                  // 'PARTSPROCURE_EDITORDETAIL_LINE', // 基础信息 LINIE show:true disabled:true

                  'PARTSPROCURE_EDITORDETAIL_DINGDIANXINXI', // TAB-定点信息


                  // RFQ详情页
                  'PARTSRFQ_EDITORDETAIL_NEWRFQROUND', // 按钮-新建RFQ轮次 show:false
                  'PARTSRFQ_EDITORDETAIL_SENDINQUIRY', // 按钮-发出询价 show:false
                  'PARTSRFQ_EDITORDETAIL_ENDQUOTATION', // 按钮-结束本轮询价 show:false
                  'PARTSRFQ_EDITORDETAIL_TRANSFERNEGOTIATION', // 按钮-转谈判 show:false
                  'PARTSRFQ_EDITORDETAIL_CREATEAPPLICATION', // 按钮创建定点申请 show:false
                  'PARTSRFQ_EDITORDETAIL_EP', // 基础信息-技术评分人 show:false
                  'PARTSRFQ_EDITORDETAIL_CF', // // 基础信息-财务控制员 show:false
                  'PARTSRFQ_EDITORDETAIL_MQ', // // 基础信息-质量评分人 show:false
                  'PARTSRFQ_EDITORDETAIL_CURRENTROUND', // // 基础信息-当前轮次 show:false
                  'PARTSRFQ_EDITORDETAIL_ROUNDTYPE', // // 基础信息-轮次类型 show:false
                  'PARTSRFQ_EDITORDETAIL_PL', // // 基础信息-物流审核人 show:false
                  'PARTSRFQ_EDITORDETAIL_SAVE', // // 基础信息-编辑或保存按钮 show:false
                  'PARTSRFQ_EDITORDETAIL_RFQPENDING_SUPPLIERSCORE_PARTSCORING_INDEXPAGE', // TAB-供应商评分 SHOW:false
                  'PARTSRFQ_EDITORDETAIL_RFQPENDING_MOLDBUDGETAPPLICATION_INDEXPAGE', // TAB-模具预算申请 SHOW:false
                  'PARTSRFQ_EDITORDETAIL_RFQPENDING_TECHNICALSEMINAR_BASICINFORMATIONMEETING_INDEXPAGE', // TAB-技术交底会 SHOW:false
                  'PARTSRFQ_EDITORDETAIL_PARTDETAILIST_DELETE', // 零件清单TAB-按钮-删除 show:false
                  'PARTSRFQ_EDITORDETAIL_PARTDETAILIST_SENDKM', // 零件清单TAB-按钮-发送KM show:false
                  'PARTSRFQ_EDITORDETAIL_PARTDETAILIST_NEWPRICE', // 零件清单TAB-按钮-新申请财务目标价 show:false
                  'PARTSRFQ_EDITORDETAIL_PARTDETAILIST_REAPPLYPRICE', // 零件清单TAB-按钮-再申请财务目标价 show:false
                  'PARTSRFQ_EDITORDETAIL_PARTDETAILIST_ADD', // 零件清单TAB-按钮-添加 show:false
                  'PARTSRFQ_EDITORDETAIL_RFQPENDING_BDLSAVEBDL', // BDLTAB-按钮-添加 show:false
                  'PARTSRFQ_EDITORDETAIL_RFQPENDING_DELETESUPPLIER', // BDLTAB-按钮-删除供应商 show:false
                  'PARTSRFQ_EDITORDETAIL_RFQPENDING_ADDCUSTOM', // BDLTAB-按钮-添加自定义评分项 show:false


                  // RFQ-谈判助手
                  'RFQ_DETAIL_TIPS_BAOJIAFENXIHUIZONGLINGJIAN', // tab-报价分析汇总-零件 show:false
                  'RFQ_DETAIL_TIPS_BAOJIAFENXIHUIZONGMOJU', // tab-报报价分析汇总-模具 show:false
                  'RFQ_DETAIL_TIPS_YEWUFENPEIMONI', // tab-业务分配模拟 show:false
                  'RFQ_DETAIL_TIPS_BAOJIAFENXI_RENWUJINDU', // tab报价分析-报价分析与评分跟踪--整体任务进度&整车进度风险 show:false
                  'RFQ_DETAIL_TIPS_BAOJIAQUSHI_JIAGEWEIDU_SELECT', // tab报价分析-报价趋势-价格维度-下拉框 show:false
                  'RFQ_DETAIL_TIPS_BAOJIAQUSHI_GONGYINGSHANG_SELECT', // tab报价分析-报价趋势-供应商-下拉框 show:false
                  'RFQ_DETAIL_TIPS_BAOJIAQUSHI_LINGJIAN_SELECT', // tab报价分析-报价趋势-零件-下拉框 show:false
                  'RFQ_DETAIL_TIPS_BAOJIAQUSHI_FSHAO_SELECT', // tab报价分析-报价趋势-FS号-下拉框 show:false
                  'RFQ_DETAIL_TIPS_BAOJIAQUSHI_DANGQIANLUNCI_SELECT', // tab报价分析-报价趋势-当前轮次-下拉框 show:false
                  'RFQ_DETAIL_TIPS_BAOJIAQUSHI_CHAXUN_BUTTON', // tab报价分析-报价趋势-查询-按钮 show:false
                  'RFQ_DETAIL_TIPS_BAOJIAQUSHI_CHONGZHI_BUTTON', // tab报价分析-报价趋势-重置-按钮 show:false
                  'RFQ_DETAIL_TIPS_BAOJIAQUSHI_DAOCHU_BUTTON', // tab报价分析-报价趋势-导出-按钮 show:false
                 ]
const whiteKey = [
  // 零件采购项目详情页
  'PARTSPROCURE_EDITORDETAIL_REMARKS_SAVE_AEKO_MANGE' // TAB备注-保存按钮-针对AEKO管理员
]
module.exports = {
  blackKey,
  whiteKey
}