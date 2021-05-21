/*
 * @Author: yz
 * @Date: 2021-05-21 10:14:46
 */
import { permissionTitle } from '@/utils'
//零件采购列表入参
export const form = {
     'search.partNameZh': '', //零件名称(中)
     'search.partNum': '', //零件号
     'search.tmCartypeProId': "", //车型项目
     'search.categoryName': "", //材料组
     'search.nomiType': "", //材料组
     'search.deptId': "", //材料组
     'search.cartypeProType': "", //材料组
}

export const summaryData = [
    {
        props: 'tmCartypeProName',
        name: '车型项目',
        key: '车型项目',
        tooltip: false
    },
    {
        props: 'sopTime',
        name: 'SOP时间',
        key: 'SOP时间',
        tooltip: false
    },
    {
        props: 'cartypeProType',
        name: '车型项目类型',
        key: '车型项目类型',
        tooltip: false
    },
    {
        props: 'deptName',
        name: '专业科室',
        key: '专业科室',
        tooltip: false
    },
    {
        props: 'categoryNameZh',
        name: '材料组',
        key: '材料组',
        tooltip: false
    },
    {
        props: 'budgetAuditAmount',
        name: '模具属性',
        key: '模具属性',
        tooltip: false
    },
    {
        props: 'nomiAmount',
        name: '定点金额',
        key: '定点金额',
        tooltip: false
    },
    {
        props: 'bmAmount',
        name: 'BM单金额',
        key: 'BM单金额',
        tooltip: false
    },
    {
        props: 'entryAmount',
        name: '入账金额',
        key: '入账金额',
        tooltip: false
    },
]

export const partNoData = [
    {
        props: 'tmCartypeProName',
        name: '车型项目',
        key: '车型项目',
        tooltip: false
    },
    {
        props: 'cartypeProType',
        name: '车型项目类型',
        key: '车型项目类型',
        tooltip: false
    },
    {
        props: 'deptName',
        name: '专业科室',
        key: '专业科室',
        tooltip: false
    },
    {
        props: 'categoryNameZh',
        name: '材料组',
        key: '材料组',
        tooltip: false
    },
    {
        props: 'partNum',
        name: '零件号',
        key: '零件号',
        tooltip: false
    },
    {
        props: 'partSixNum',
        name: '六位号',
        key: '六位号',
        tooltip: false
    },
    {
        props: 'partNameZh',
        name: '零件名称',
        key: '零件名称',
        tooltip: false
    },
    {
        props: 'nomiType',
        name: '定点类型',
        key: '定点类型',
        tooltip: false
    },
    {
        props: 'nomiAmount',
        name: '定点金额',
        key: '定点金额',
        tooltip: false
    },
    {
        props: 'bmAmount',
        name: 'BM单金额',
        key: 'BM单金额',
        tooltip: false
    },
    {
        props: 'entryAmount',
        name: '入账金额',
        key: '入账金额',
        tooltip: false
    },
]