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
]

export const tableTitleOfPost = [
    { props: 'deptType', name: '岗位编码', key: 'LK_BUMENPINGFENLEIXING' },
    { props: 'deptNum', name: '岗位全称', key: 'LK_BUMENBIANHAO' },
    { props: 'graderId', name: '组织领导', key: 'LK_PINGFENREN' },
]