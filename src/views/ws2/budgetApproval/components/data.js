/*
 * @Author: yuszhou
 * @Date: 2021-02-25 10:14:46
 * @LastEditTime: 2021-04-03 14:22:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rise\src\views\partsprocure\home\component\data.js
 */
import { permissionTitle } from '@/utils'
//零件采购列表入参
export const form = {
     'search.tmCartypeProId': '', //车型项目
     'search.partsNum': '', //零件号
     'search.rfqId': "", //RFQ号
     'search.categoryName': "", //材料组
     'search.approvalStatus': "", //预算状态
     'search.applyUserId': "", //申请人
     'search.timeStarEnd': "", //申请时间止
}

export const budgetApprovalData = [
    {
        props: 'rfqId',
        name: 'RFQ号',
        key: 'RFQ号',
        tooltip: false
    },
    {
        props: 'tmCartypeProName',
        name: '车型项目',
        key: '车型项目',
        tooltip: false
    },
    {
        props: 'fsName',
        name: '前期采购员',
        key: '前期采购员',
        tooltip: false
    },
    {
        props: 'linieName',
        name: 'Linie',
        key: 'Linie',
        tooltip: false
    },
    {
        props: 'categoryName',
        name: '材料组',
        key: '材料组',
        tooltip: false
    },
    {
        props: 'categoryBudget',
        name: '材料组预算',
        key: '材料组预算',
        tooltip: false
    },
    {
        props: 'budgetLeftoverAmount',
        name: '材料组预算剩余',
        key: '材料组预算剩余',
        tooltip: false
    },
    {
        props: 'budgetApplyAmount',
        name: '申请金额',
        key: '申请金额',
        tooltip: false
    },
    {
        props: 'approvalStatus',
        name: '预算状态',
        key: '预算状态',
        tooltip: false
    },
]

export const alertList = [
    {
        props: 'tmCarTypeProName',
        name: '车型项目',
        key: '车型项目',
        tooltip: false
    },
    {
        props: 'categoryName',
        name: '材料组',
        key: '材料组',
        tooltip: false
    },
    {
        props: 'budgetApplyAmount',
        name: '申请金额',
        key: '申请金额',
        tooltip: false
    }
]

export const RFQList = [
    {
        props: 'partNum',
        name: '零件号',
        key: '零件号',
        tooltip: false
    },
    {
        props: 'partName',
        name: '零件名称',
        key: '零件名称',
        tooltip: false
    },
    {
        props: 'procureFactory',
        name: '采购工厂',
        key: '采购工厂',
        tooltip: false
    },
    {
        props: 'fsnrGsnrNum',
        name: 'FSNR / GSNR',
        key: 'FSNR / GSNR',
        tooltip: false
    },
    {
        props: 'applyTime',
        name: '申请日期',
        key: '申请日期',
        tooltip: false
    },
    {
        props: 'cartypeProjectZh',
        name: '车型项目',
        key: '车型项目',
        tooltip: false
    },
    {
        props: 'budget',
        name: '投资预算',
        key: '投资预算',
        tooltip: false
    },
    {
        props: 'csfPDiretor',
        name: 'CSF(P)负责人',
        key: 'CSF(P)负责人',
        tooltip: false
    }
]

export const budgetApplyAmountList = [
    {
        props: 'categroyName',
        name: '材料组',
        key: '材料组',
        tooltip: false
    },
    {
        props: 'budgetAmount',
        name: '预算金额',
        key: '预算金额',
        tooltip: false
    },
    {
        props: 'usableAmount',
        name: '可用金额',
        key: '可用金额',
        tooltip: false
    },
    {
        props: 'partNum',
        name: '零件号',
        key: '零件号',
        tooltip: false
    },
    {
        props: 'rfqId',
        name: 'RFQ号',
        key: 'RFQ号',
        tooltip: false
    },
    {
        props: 'budget',
        name: '申请金额',
        key: '申请金额',
        tooltip: false
    },
    {
        props: 'applyName',
        name: '申请人',
        key: '申请人',
        tooltip: false
    },
]
