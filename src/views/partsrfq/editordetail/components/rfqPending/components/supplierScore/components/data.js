/*
 * @Author: moxuan
 * @Date: 2021-03-04 17:40:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 */
import {permissionTitle} from '@/utils'
// export const supplierScoreTitle = [
// export const supplierScoreTitle = permissionTitle("PARTSRFQ_EDITORDETAIL_RFQPENDING_SUPPLIERSCORE_PARTSCORING_VIEWREMARK",[
//     {props: 'svwCode', name: 'SVW号', key: 'LK_SWHAO'},
//     {props: 'shortNameZh', name: '供应商名', key: 'LK_GONGYINGSHANGMING'},
//     {props: 'companyAddress', name: '供应商生产场地', key: 'LK_GONGYINGSHANGSHENGCHANCHANGDI'},
//     {props: 'action', name: '零件评分', key: 'LK_LINGJIANPINGFEN'},
//     {
//         name: 'TPB',
//         list: [
//             {props: 'rate', name: '评分', key:'LK_PINGFEN'},
//             {props: 'externaFee', name: '外部开发费（元）', key:'LK_WAIBUKAIFAFEIYUAN'},
//             {props: 'addFee', name: '增加的认可费（元）', key:'LK_ZENGJIADERENKEFEIYUAN'},
//             {props: 'confirmCycle', name: '认可周期（周）', key:'LK_RENKEZHOUQIZHOU'},
//             {props: 'memo', name: '备注', key:'LK_BEIZHU'},
//         ]
//     }
// ])
//权限key暂时先去掉
export const supplierScoreTitle = [
    {props: 'svwCode', name: '供应商号', key: 'GONGYINGSHANGHAO'},
    {props: 'shortNameZh', name: '供应商名', key: 'LK_GONGYINGSHANGMING', disabled: true},
    {props: 'companyAddress', name: '供应商生产场地', key: 'LK_GONGYINGSHANGSHENGCHANCHANGDI'},
    {props: 'action', name: '零件评分', key: 'LK_LINGJIANPINGFEN'},
]
export const templateScoreTitle = {
    name: 'TPB',
    list: [
        {props: 'rate', name: '评分', key:'LK_PINGFEN'},
        {props: 'externaFee', name: '外部开发费（元）', key:'LK_WAIBUKAIFAFEIYUAN'},
        {props: 'addFee', name: '增加的认可费（元）', key:'LK_ZENGJIADERENKEFEIYUAN'},
        {props: 'confirmCycle', name: '认可周期（周）', key:'LK_RENKEZHOUQIZHOU'},
        {props: 'memo', name: '备注', key:'LK_BEIZHU'},
    ]
}
export const supplierRatingAttachmentTitle = [
    {props: 'fileName', name: '文件名称', key: 'LK_WENJIANMINGCHENG'},
    {props: 'fileSize', name: '大小', key: 'DAXIAO'},
    {props: 'createDate', name: '上传日期', key: 'LK_SHANGCHUANRIQI'},
    {props: 'uploader', name: '上传人', key: 'LK_SHANGCHUANREN'},
    {props: 'operateType', name: '操作', key: 'LK_CAOZUO'}
]


export const partScroingTitle = [
    {props: 'partNum', name: '零件号', key: 'LK_LINGJIANHAO'},
    {props: 'fsNum', name: 'FS号', key: 'LK_FSHAO'},
    {props: 'purchasingFactory', name: '采购工厂', key: 'LK_CAIGOUGONGCHANG'},
    {props: 'partNameZh', name: '零件名称（中）', key: 'LK_LINGJIANMINGCHENGZHONG'},
    {props: 'partNameDe', name: '零件名称（德）', key: 'LK_LINGJIANMINGCHENGDE'},
    {props: 'carProjectType', name: '车型项目', key: 'LK_CHEXINGXIANGMU'},
    {props: 'relatedModels', name: '相关车型', key: 'LK_XIANGGUANCHEXING'},
    {props: 'rateDepartNum', name: '评分部门编号', key: 'PINGFENBUMENBIANHAO'},
    // {
    //     name: 'TPB',
    //     list: [
            {props: 'grade', name: '评分', key: 'LK_PINGFEN'},
            {props: 'externaFee', name: '外部开发费（元）', key: 'LK_WAIBUKAIFAFEIYUAN'},
            {props: 'addFee', name: '增加的认可费（元）', key: 'LK_ZENGJIADERENKEFEIYUAN'},
            {props: 'confirmCycle', name: '认可周期（周）', key: 'LK_RENKEZHOUQIZHOU'},
            {props: 'memo', name: '备注', key: 'LK_BEIZHU'},
    //     ]
    // }
]

export const scoringDeptTitle = [
    { props: 'rateTag', name: '部门评分类型', key: 'LK_BUMENPINGFENLEIXING' },
    { props: 'rateDepartNum', name: '部门编号', key: 'LK_BUMENBIANHAO', tooltip: true },
    { props: 'raterId', name: '评分人', key: 'LK_PINGFENREN' },
    { props: 'coordinatorId', name: '协调人', key: 'LK_XIETIAOREN' }
]