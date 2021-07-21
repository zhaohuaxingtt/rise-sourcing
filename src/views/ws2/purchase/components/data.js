/*
 * @Author: yz
 */
import {permissionTitle} from '@/utils'

export const tabtitle = [
    {value: 1, message: 0, name: "模具投资清单", activePath: '/purchase/investmentList', url: '/purchase/investmentList', key: "模具投资清单"},
]
export const navList = [
    {value: 1, message: 0, name: "确认任务", activePath: '/purchase/investmentList', url: '/purchase/investmentList', key: "确认任务"},
    {value: 2, message: 0, name: "变更任务", activePath: '/404', url: '/404', key: "变更任务"},
]
export const investmentListTitle = [
    {
        props: 'aa',
        name: 'BM单流水号',
        key: 'BM单流水号',
        isMoney: true,
        tooltip: false
    },
    {
        props: 'tmCartypeProName',
        name: 'BM单类型',
        key: 'BM单类型',
        tooltip: false
    },
    {
        props: 'fsName',
        name: '车型项目',
        key: '车型项目',
        tooltip: false
    },
    {
        props: 'linieName',
        name: '供应商',
        key: '供应商',
        tooltip: false
    },
    {
        props: 'categoryName',
        name: '模具投资金额',
        key: '模具投资金额',
        tooltip: false
    },
    {
        props: 'categoryBudget',
        name: '代表零件号',
        key: '代表零件号',
        tooltip: false
    },
    {
        props: 'budgetLeftoverAmount',
        name: '零件采购项目类型',
        key: '零件采购项目类型',
        tooltip: false
    },
    {
        props: 'budgetApplyAmount',
        name: '定点申请单号',
        key: '定点申请单号',
        tooltip: false
    },
    {
        props: 'approvalStatus',
        name: 'Linie',
        key: 'Linie',
        tooltip: false
    },
    {
        props: 'approvalStatus',
        name: '模具投资清单状态',
        key: '模具投资清单状态',
        tooltip: false
    },
]
