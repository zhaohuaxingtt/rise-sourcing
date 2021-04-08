/*
 * @Author: lyujiahong
 * @Date: 2021-03-03 09:52:00
 * @LastEditTime: 2021-04-01 19:28:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rise\src\views\partsrfq\home\components\data.js
 */
import { permissionTitle } from '@/utils'
export const tableTitle = [
    // export const tableTitle = permissionTitle("PARTSRFQ_RFQLIST", [
    { props: 'rfqName', name: '组织机构编码', key: 'LK_ZUZHIJIGOUBIANMA', tooltip: false },
    { props: 'rfqType', name: '组织机构名称', key: 'LK_ZUZHIJIGOUMINGCHENG', tooltip: false },
    { props: 'carType', name: '组织机构简码', key: 'LK_ZUZHIJIGOUJIANMA', tooltip: true },
    { props: 'createDate', name: '组织机构简称', key: 'LK_ZUZHIJIGOUJIANCHENG', tooltip: false },
    { props: 'currentRounds', name: '负责人', key: 'LK_FUZEREN', tooltip: false },
    { props: 'suppliers', name: '备注', key: 'LK_BEIZHU', tooltip: false }
]

export const assignmentOfScroingTasksTableTitle = [
    { props: 'deptType', name: '部门评分类型', key: 'LK_BUMENPINGFENLEIXING' },
    { props: 'deptNum', name: '部门编号', key: 'LK_BUMENBIANHAO' },
    { props: 'graderId', name: '评分人', key: 'LK_PINGFENREN' },
]