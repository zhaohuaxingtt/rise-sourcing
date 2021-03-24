/*
 * @Author: moxuan
 * @Date: 2021-03-04 17:40:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 */
export const supplierScoreTitle = [
    {props: 'svwCode', name: 'SVW号'},
    {props: 'shortNameZh', name: '供应商名'},
    {props: 'companyAddress', name: '供应商生产场地'},
    {props: 'action', name: '零件评分'},
    {
        name: 'TPB',
        list: [
            {props: 'tpbGrade', name: '评分'},
            {props: 'tpbExternaFee', name: '外部开发费（元）'},
            {props: 'tpbAddFee', name: '增加的认可费（元）'},
            {props: 'tpbConfirmCycle', name: '认可周期（周）'},
            {props: 'tpbMemo', name: '备注'},
        ]
    }
]

export const supplierRatingAttachmentTitle = [
    {props: 'fileName', name: '文件名称'},
    {props: 'fileSize', name: '大小（MB）'},
    {props: 'createDate', name: '上传日期'},
    {props: 'createBy', name: '上传人'},
    {props: 'operateType', name: '操作'}
]


export const partScroingTitle = [
    {props: 'partNum', name: '零件号'},
    {props: 'fsNum', name: 'FS号'},
    {props: 'purchasingFactory', name: '采购工厂'},
    {props: 'partName', name: '零件名称（中）'},
    {props: 'e', name: '零件名称（德）'},
    {props: 'carProjectType', name: '车型项目'},
    {props: 'relatedModels', name: '相关车型'},
    {
        name: 'TPB',
        list: [
            {props: 'tpGrade', name: '评分'},
            {props: 'tpbExternaFee', name: '外部开发费（元）'},
            {props: 'tpbAddFee', name: '增加的认可费（元）'},
            {props: 'tpbConfirmCycle', name: '认可周期（周）'},
            {props: 'tpbMemo', name: '备注'},
        ]
    }
]