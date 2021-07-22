/*
 * @Author: Luoshuang
 * @Date: 2021-05-25 15:24:07
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-07-21 17:34:05
 * @Description: 
 * @FilePath: \front-web\src\views\accessoryPart\accessoryPartDetail\data.js
 */

export const detailList = [
  {value: 'partNum', label: '配件零件号', type: 'input', key: 'PEIJIANLINGJIANHAO',},
  {value: 'partNameCh', label: '配件零件名(中)', type: 'input', key: 'PEIJIANLINGJIANMING_ZH',},
  {value: 'partNameDe', label: '配件零件名(德)', type: 'input', key: 'PEIJIANLINGJIANMING_DE',},
  {value: 'sparePartCode', label: '编号', type: 'input', key: 'BIANHAO',},
  {value: 'spnrNum', label: 'SP号', type: 'input', key: 'SPHAO',},
  {value: 'annualQuantity', label: '年需求量', type: 'input', key: 'NIANXUQIULIANG',},
  {value: 'carType', label: '配件车型', type: 'input', key: 'PEIJIANCHEXING',},
  {value: 'carProject', label: '配件车型项目', type: 'input', key: 'PEIJIANCHEXINGXIANGMU',},
  {value: 'assemblyPartNum', label: '批量供货总成号', type: 'input', key: 'PILIANGGONGHUOZONGCHENGHAO',},
  {value: 'state', label: '配件状态', type: 'select', key: 'PEIJIANZHUANGTAI', selectOption: []},
  {value: 'accessoryStatus', label: '零件状态', type: 'select', key: 'LINGJIANZHUANGTAI', selectOption: []},
  {value: 'idState', label: 'ID状态', type: 'select', key: 'IDZHUANGTAI', selectOption: []},
  {value: 'csfuserDeptName', label: 'CSF科室', type: 'date', key: 'CSFKESHI',},
  {value: 'csfuserName', label: 'CSF', type: 'input', key: 'CSF',},
  {value: 'sendDate', label: '需求发送日期', type: 'input', key: 'XUQIUFASONGRIQI',},
  {value: 'respDeptName', label: 'LINIE科室', type: 'input', key: 'LINIEKESHI',},
  {value: 'respLinieName', label: 'LINIE', type: 'input', key: 'LINIE',},
  {value: 'brand', label: '品牌', type: 'input', key: 'PINPAI',},
  {value: 'supplierSapCode', label: '供应商SAP号', type: 'input', key: 'GONGYINGSHANGSAPHAO',},
  {value: 'supplierSvwCode', label: '供应商SVW号', type: 'input', key: 'GONGYINGSHANGSVWHAO',},
  {value: 'supplierSvwTempCode', label: '供应商名临时号', type: 'input', key: 'GONGYINGSHANGMINGLINSHIHAO',},
  {value: 'supplierNameZh', label: '供应商名(中)', type: 'input', key: 'GONGYINGSHANGMING_ZH',},
  {value: 'tcUnitName', label: '单位', type: 'input', key: 'DANWEI',},
  {value: 'deliveryWarehouse', label: '送货仓库', type: 'input', key: 'SONGHUOCANGKU',},
  {value: 'signDate', label: '需求签收日期', type: 'input', key: 'XUQIUQIANSHOURIQI',},
  {value: 'demandRecoveryDate', label: '需求恢复日期', type: 'input', key: 'XUQIUHUIFURIQI',},
  {value: 'sparePartUuid', label: 'UUID', type: 'input', key: 'UUID',},
  {value: 'technicianStaffNum', label: '售后技术人员工号', type: 'input', key: 'SHOUHOUJISHURENYUANGONGHAO',},
  {value: 'technicianStaffName', label: '售后技术人员名', type: 'input', key: 'LK_SHOUHOUJISHURENYUANMING',},
  {value: 'reason', label: '理由', type: 'input', key: 'LIYOU', row: 1},
  {value: 'remark', label: '备注说明', type: 'input', key: 'BEIZHUSHUOMING', row: 1}
]