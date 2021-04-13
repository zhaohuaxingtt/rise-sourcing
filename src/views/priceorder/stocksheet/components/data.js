/*
 * @Author: yuszhou
 * @Date: 2021-02-25 10:14:46
 * @LastEditTime: 2021-04-03 14:22:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \rise\src\views\partsprocure\home\component\data.js
 */
import { permissionTitle } from '@/utils'
export const tableTitle = [{
            //export const tableTitle = permissionTitle("PARTSPROCURE_PARTSPROCURELIST",[{
            props: 'fsnrGsnrNum',
            name: '备货表号',
            key: 'partsprocure.PARTSPROCUREFSNFGSNFSPNR',
            tooltip: false
        },
        {
            props: 'partNum',
            name: '项次',
            key: 'partsprocure.PARTSPROCUREPARTNUMBER',
            tooltip: false
        },
        {
            props: 'partNameZh',
            name: '创建⽇期',
            key: 'partsprocure.PARTSPROCUREPARTNAMEZH',
            tooltip: false
        },
        {
            props: 'partNameDe',
            name: '部⻔',
            key: 'partsprocure.PARTSPROCUREPARTNAMEDE',
            tooltip: false
        },
        {
            props: 'statusName',
            name: '采购组',
            key: 'partsprocure.PARTSPROCURESTATUS',
            tooltip: false
        },
        {
            props: 'procureFactoryName',
            name: '零件号',
            key: 'partsprocure.PARTSPROCUREPURCHASINGFACTORY',
            tooltip: false
        },
        {
            props: 'partProjectTypeName',
            name: '零件名称',
            key: 'partsprocure.PARTSPROCUREPARTITEMTYPE',
            tooltip: false
        },
        {
            props: 'cartypeCategory',
            name: '零件名称',
            key: 'partsprocure.PARTSPROCUREVEHICLECATEGORIES',
            tooltip: false
        },
        {
            props: 'cartypeProjectZh',
            name: '运输⽅式',
            key: 'partsprocure.PARTSPROCUREMODELPROJECT',
            tooltip: false
        },
        {
            props: 'statusName',
            name: '采购⼯⼚',
            key: 'partsprocure.PARTSPROCUREPARTSTATUS',
            tooltip: false
        },
        {
            props: 'buyerName',
            name: '实施⽇期',
            key: 'partsprocure.PARTSPROCUREINQUIRYBUYER',
            tooltip: false
        },
        {
            props: 'linieName',
            name: '供应商',
            key: 'partsprocure.PARTSPROCURELINIE',
            tooltip: false
        },
        {
            props: 'cfControllerZh',
            name: '项⽬跟踪号',
            key: 'partsprocure.CF',
            tooltip: false
        },
        {
            props: 'cfControllerZh',
            name: '状态',
            key: 'partsprocure.CF',
            tooltip: false
        },
        {
            props: 'cfControllerZh',
            name: '年度需求',
            key: 'partsprocure.CF',
            tooltip: false
        },
        {
            props: 'cfControllerZh',
            name: 'SAP协议号',
            key: 'partsprocure.C1F',
            tooltip: false
        },
        {
            props: 'cfControllerZh',
            name: 'RISE协议号',
            key: 'partsprocure.CF',
            tooltip: false
        },
    ]
    //)

//零件采购列表入参
export const form = {
    'search.buyerName': '', //询价采购员
    'search.cartypeCategory': '', //车型大类
    'search.cartypeProjectNum': '', //车型项目编号	
    'search.cartypeProjectZh': '', //车型项目
    'search.categoryCode': '', //材料组编号
    'search.fsnrGsnrNum': "", //FSNR/GSNR/SPNR
    'search.linieName': '', //LINIE
    'search.partNameZh': '', //零件名称(中)
    'search.partNum': '', //零件号
    'search.partPrejectType': '', //零件项目类型
    'search.partStatus': '', //零件状态
    'search.procureFactory': '', //采购工厂
    'search.projectStatus': '', //采购项目状态
    'search.rfqId': '', //rfq编号
    'search.size': '',
    'search.current': ""
}

// addRfq
export const addRfqTitle = [
    { props: 'id', name: 'RFQ#' },
    { props: 'rfqName', name: 'RFQ名称' },
    { props: 'currentStatus', name: 'RFQ状态' },
    { props: 'updateDate', name: '操作时间' },

]