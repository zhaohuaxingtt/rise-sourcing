/*
 * @Author: moxuan
 * @Date: 2021-03-03 09:52:00
 * @LastEditTime: 2021-09-07 16:33:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsrfq\home\components\data.js
 */
import { permissionTitle } from '@/utils'
export const tableTitle = [
// export const tableTitle = permissionTitle("PARTSRFQ_RFQLIST", [
    { props: 'id', name: 'RFQ编号', key: 'RFQBIANHAO', tooltip: true, width:80 },
    { props: 'rfqName', name: 'RFQ名称', key: 'RFQMINGCHENG', tooltip: true, width: 280 },
    { props: 'rfqType', name: 'RFQ类型', key: 'RFQLEIXING', tooltip: true },
    // { props: 'carType', name: '车型项目', key: 'CHEXINGXIANGMU', tooltip: true, width: 280 },
    { props: 'createDate', name: '创建日期', key: 'CHUANGJIANRIQI', tooltip: true,width:100 },
    { props: 'currentRounds', name: '当前轮次', key: 'DANGQIANLUNCI', tooltip: true },
    { props: 'suppliers', name: '已报价/已询价供应商', key: 'YIBAOJIA_YIXUNJIA_GONGYINGSHANG', tooltip: true,width:140 },
    // { props: 'quotations', name: '已报价供应商', key: 'YIBAOJIAGONGYINGSHANG', tooltip: true,width:100 },
    { props: 'currentStatus', name: 'RFQ状态', key: 'RFQZHUANGTAI', tooltip: true },
    { props: 'currentRoundsEndTime', name: '报价截至日期', key: 'BAOJIAJIEZHIRIQI', tooltip: true,width:100},
    { props: 'buyerName', name: '询价采购员', key: 'XUNJIACAIGOUYUAN', tooltip: true },
    { props: 'linieNameZh', name: 'LINIE', key: 'LINIE', tooltip: true,width:100 },
    { props: 'tpGradeStatus', name: '技术评分状态', key: 'JISHUPINGFENZHUANGTAI', tooltip: true, width: 100 },
    { props: 'mqGradeStatus', name: '质量评分状态', key: 'ZHILIANGPINGFENZHUANGTAI', tooltip: true, width: 100 },
    { props: 'targetGradeStatus', name: '财务目标价状态', key: 'CAIWUMUBIAOJIAZHUANGTAI', tooltip: true, width: 100 },
    { props: 'heavyItem', name: 'Heavy Item', key: 'HEAVYITEM', tooltip: true, width: 100 },
    { props: 'kmAnalysis', name: '分析报告', key: 'FENXIBAOGAO', tooltip: true, width: 100 },
    { props: 'recordId', name: '', key: '', tooltip: true },
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