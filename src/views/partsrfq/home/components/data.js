/*
 * @Author: moxuan
 * @Date: 2021-03-03 09:52:00
 * @LastEditTime: 2021-06-05 17:34:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rise\src\views\partsrfq\home\components\data.js
 */
import { permissionTitle } from '@/utils'
export const tableTitle = [
// export const tableTitle = permissionTitle("PARTSRFQ_RFQLIST", [
    { props: 'id', name: 'RFQ编号', key: 'LK_RFQBIANHAO', tooltip: false, width:155 },
    { props: 'rfqName', name: 'RFQ名称', key: 'LK_RFQMINGCHENG', tooltip: true },
    { props: 'rfqType', name: 'RFQ类型', key: 'LK_RFQLEIXING', tooltip: false },
    { props: 'carType', name: '车型项目', key: 'LK_CHEXINGXIANGMU', tooltip: true },
    { props: 'createDate', name: '创建日期', key: 'LK_CHUANGJIANRIQI', tooltip: false,width:100 },
    { props: 'currentRounds', name: '当前轮次', key: 'LK_DANGQIANLUNCI', tooltip: false },
    { props: 'suppliers', name: '已询价供应商', key: 'LK_YIXUNJIAGONGYINGSHANG', tooltip: false,width:100 },
    { props: 'quotations', name: '已报价供应商', key: 'LK_YIBAOJIAGONGYINGSHANG', tooltip: false,width:100 },
    { props: 'currentStatus', name: 'RFQ状态', key: 'LK_RFQZHUANGTAI', tooltip: false },
    { props: 'currentRoundsEndTime', name: '报价截至日期', key: 'LK_BAOJIAJIEZHIRIQI', tooltip: false,width:100},
    { props: 'buyerName', name: '询价采购员', key: 'LK_XUNJIACAIGOUYUAN', tooltip: false },
    { props: 'linieNameZh', name: 'LINIE', key: 'LK_LINIE', tooltip: false },
    { props: 'tpGradeStatus', name: 'TP评分状态', key: 'LK_TPPINGFENZHUANGTAI', tooltip: false },
    { props: 'mqGradeStatus', name: 'MQ评分状态', key: 'LK_MQPINGFENZHUANGTAI', tooltip: false },
    { props: 'targetGradeStatus', name: 'CF目标价状态', key: 'LK_MUBIAOJIAZHUANGTAI', tooltip: false },
    { props: 'heavyItem', name: 'Heavy Item', key: 'LK_HEAVYITEM', tooltip: false, width: 100 },
    { props: 'kmAnalysis', name: '分析报告', key: 'LK_FENXIBAOGAO', tooltip: false, width: 100 },
    { props: 'recordId', name: '', key: '', tooltip: false },
]
// )

export const assignmentOfScroingTasksTableTitle = [
    { props: 'deptNum', name: '部门编号', key: 'LK_BUMENBIANHAO' },
    { props: 'deptType', name: '部门评分类型', key: 'LK_BUMENPINGFENLEIXING' },
    { props: 'graderId', name: '评分人', key: 'LK_PINGFENREN' },
]

export const attachmentTableTitle = [
    { props: 'fileName', name: '文件名称', key: 'LK_WENJIANMINGCHENG' }
]