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
            {props: 'f', name: '外部开发费（元）'},
            {props: 'g', name: '增加的认可费（元）'},
            {props: 'h', name: '认可周期（周）'},
            {props: 'tpbMemo', name: '备注'},
        ]
    }
]

export const supplierRatingAttachmentTitle = [
    {props: 'name', name: '文件名称'},
    {props: 'fileSize', name: '大小（B）'},
    {props: 'createDate', name: '上传日期'},
    {props: 'createBy', name: '上传人'},
    {props: 'operateType', name: '操作'}
]


export const partScroingTitle = [
    {props: 'a', name: '零件号'},
    {props: 'b', name: 'FS号'},
    {props: 'c', name: '采购工厂'},
    {props: 'd', name: '零件名称（中）'},
    {props: 'e', name: '零件名称（德）'},
    {props: 'f', name: '车型项目'},
    {props: 'g', name: '相关车型'},
    {
        name: 'TPB',
        list: [
            {props: 'h', name: '评分'},
            {props: 'i', name: '外部开发费（元）'},
            {props: 'j', name: '增加的认可费（元）'},
            {props: 'k', name: '认可周期（周）'},
            {props: 'l', name: '备注'},
        ]
    }
]