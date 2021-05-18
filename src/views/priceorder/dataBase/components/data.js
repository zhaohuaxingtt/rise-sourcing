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
     'search.partNameZh': '', //零件名称(中)
     'search.partNum': '', //零件号
     'search.tmCartypeProId': "", //车型项目
     'search.categoryName': "", //材料组
     'search.nomiType': "", //材料组
     'search.deptId': "", //材料组
     'search.cartypeProType': "", //材料组
}

export const dataBaseData = [
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