/*
 * @Author: moxuan
 * @Date: 2021-03-03 09:52:00
 * @LastEditTime: 2021-07-07 10:32:09
 * @LastEditors: Luoshuang
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsrfq\home\components\data.js
 */
import { permissionTitle } from '@/utils'
export const tableTitle = [
// export const tableTitle = permissionTitle("PARTSRFQ_RFQLIST", [
    { props: 'id', name: 'RFQ编号', key: 'RFQBIANHAO', tooltip: false, width:80 },
    { props: 'rfqName', name: 'RFQ名称', key: 'RFQMINGCHENG', tooltip: true, width: 100 },
    { props: 'rfqType', name: 'RFQ类型', key: 'RFQLEIXING', tooltip: false },
    { props: 'carType', name: '车型项目', key: 'CHEXINGXIANGMU', tooltip: true, width: 120 },
    { props: 'createDate', name: '创建日期', key: 'CHUANGJIANRIQI', tooltip: false,width:100 },
    { props: 'currentRounds', name: '当前轮次', key: 'DANGQIANLUNCI', tooltip: false },
    { props: 'suppliers', name: '已询价供应商', key: 'YIXUNJIAGONGYINGSHANG', tooltip: false,width:100 },
    { props: 'quotations', name: '已报价供应商', key: 'YIBAOJIAGONGYINGSHANG', tooltip: false,width:100 },
    { props: 'currentStatus', name: 'RFQ状态', key: 'RFQZHUANGTAI', tooltip: false },
    { props: 'currentRoundsEndTime', name: '报价截至日期', key: 'BAOJIAJIEZHIRIQI', tooltip: false,width:100},
    { props: 'buyerName', name: '询价采购员', key: 'XUNJIACAIGOUYUAN', tooltip: false },
    { props: 'linieNameZh', name: 'LINIE', key: 'LINIE', tooltip: false },
    { props: 'tpGradeStatus', name: 'TP评分状态', key: 'TPPINGFENZHUANGTAI', tooltip: false, width: 100 },
    { props: 'mqGradeStatus', name: 'MQ评分状态', key: 'MQPINGFENZHUANGTAI', tooltip: false, width: 100 },
    { props: 'targetGradeStatus', name: 'CF目标价状态', key: 'CFMUBIAOJIAZHUANGTAI', tooltip: false, width: 100 },
    { props: 'heavyItem', name: 'Heavy Item', key: 'HEAVYITEM', tooltip: false, width: 100 },
    { props: 'kmAnalysis', name: '分析报告', key: 'FENXIBAOGAO', tooltip: false, width: 100 },
    { props: 'recordId', name: '', key: '', tooltip: false },
]
// )

export const assignmentOfScroingTasksTableTitle = [
    { props: 'deptNum', name: '部门编号', key: 'LK_BUMENBIANHAO' },
    { props: 'deptType', name: '部门评分类型', key: 'LK_BUMENPINGFENLEIXING' },
    { props: 'graderId', name: '评分人', key: 'LK_PINGFENREN' },
]

export const attachmentTableTitle = [
    { props: 'fileName', name: '文件名称', key: 'WENJIANMINGCHENG' }
]