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
export const budgetManagementData = [{
    //export const tableTitle = permissionTitle("PARTSPROCURE_PARTSPROCURELIST",[{
        props: 'categoryCode',
        name: '材料组编号',
        key: 'LK_CAILIAOZUBIANHAO2',
        tooltip: false
    },
    {
        props: 'categoryNameZh',
        name: '材料组名称（中）',
        key: 'LK_CAILIAOZUMINGCENGZHONG',
        tooltip: false
    },
    {
        props: 'categoryNameDe',
        name: '材料组名称（德）',
        key: 'LK_CAILIAOZUMINGCENGDE',
        tooltip: false
    },
    {
        props: 'commodity',
        name: '专业科室',
        key: 'LK_ZHUANYEKESHI',
        tooltip: false
    },
    {
        props: 'isCommonSourcing',
        name: 'Common Sourcing',
        key: 'LK_CommonSourcing',
        tooltip: false
    },
    {
        props: 'moldProperties',
        name: '模具属性',
        key: 'LK_MOJUSHUXIN',
        tooltip: false
    },
    {
        props: 'newLinieName',
        name: 'LINIE',
        key: 'LK_LINIE',
        tooltip: false
    },
    {
        props: 'zp',
        name: 'ZP',
        key: 'LK_ZP',
        tooltip: false
    },
    // {
    //     props: 'remarks',
    //     name: '备注',
    //     key: 'partsprocure.PARTSPROCUREMODELPROJECT',
    //     tooltip: false
    // }
]
export const addListInvestment = [{
    //export const tableTitle = permissionTitle("PARTSPROCURE_PARTSPROCURELIST",[{
        props: 'categoryCode',
        name: '材料组编号',
        key: 'LK_CAILIAOZUBIANHAO2',
        tooltip: false
    },
    {
        props: 'categoryNameZh',
        name: '材料组名称（中）',
        key: 'LK_CAILIAOZUMINGCENGZHONG',
        tooltip: false
    },
    {
        props: 'categoryNameDe',
        name: '材料组名称（德）',
        key: 'LK_CAILIAOZUMINGCENGDE',
        tooltip: false
    },
    {
        props: 'commodity',
        name: '专业科室',
        key: 'LK_ZHUANYEKESHI',
        tooltip: false
    },
    {
        props: 'isCommonSourcing',
        name: 'Common Sourcing',
        key: 'LK_CommonSourcing',
        tooltip: false
    },
    {
        props: 'moldProperties',
        name: '模具属性',
        key: 'LK_MOJUSHUXIN',
        tooltip: false
    },
    {
        props: 'linie',
        name: 'LINIE',
        key: 'LK_LINIE',
        tooltip: false
    },
    {
        props: 'zp',
        name: 'ZP',
        key: 'LK_ZP',
        tooltip: false
    },
]
export const investmentListJV = [{
    //export const tableTitle = permissionTitle("PARTSPROCURE_PARTSPROCURELIST",[{
        props: 'categoryCode',
        name: '材料组编号',
        key: 'LK_CAILIAOZUBIANHAO2',
        width: 120,
        tooltip: false
    },
    {
        props: 'categoryNameZh',
        name: '材料组名称（中）',
        key: 'LK_CAILIAOZUMINGCENGZHONG',
        width: 150,
        tooltip: false
    },
    {
        props: 'categoryNameDe',
        name: '材料组名称（德）',
        key: 'LK_CAILIAOZUMINGCENGDE',
        width: 150,
        tooltip: false
    },
    {
        props: 'commodity',
        name: '专业科室',
        key: 'LK_ZHUANYEKESHI',
        width: 100,
        tooltip: false
    },
    {
        props: 'budgetAmount',
        name: '预算金额PSK(Mio.RMB)',
        key: 'LK_YUSUANJINEPSK',
        width: 220,
        tooltip: false
    },
    {
        props: 'moldProperties',
        name: '模具属性',
        key: 'LK_MOJUSHUXIN',
        width: 130,
        tooltip: false
    },
    {
        props: 'sourcingType',
        name: 'Sourcing类型',
        key: 'LK_SOURCINGLEIXIN',
        width: 150,
        tooltip: false
    },
    {
        props: 'linie',
        name: 'LINIE',
        key: 'LK_LINIE',
        width: 200,
        tooltip: false
    },
    {
        props: 'zp',
        name: 'ZP',
        key: 'LK_ZP',
        width: 60,
        tooltip: false
    },
    {
        props: 'refCartypeName',
        name: '参考项目',
        key: 'LK_CANKAOXIANGMU',
        width: 130,
        tooltip: false
    },
    {
        props: 'refMoldAmount',
        name: '参考项目模具金额(Mio.RMB)',
        key: 'LK_CANKAOXINGMUMOJUJINE',
        width: 320,
        tooltip: false
    },
    {
        props: 'remarks',
        name: '预算备注',
        key: 'LK_YUSUANBEIZHU',
        width: 140,
        tooltip: false
    },
    {
        props: 'applyAmount',
        name: '已申请金额',
        key: '已申请金额',
        width: 140,
        tooltip: false
    },
    {
        props: 'nomiAmount',
        name: '已定点金额',
        key: '已定点金额',
        width: 140,
        tooltip: false
    },
    {
        props: 'baAmount',
        name: '已BA金额',
        key: '已BA金额',
        width: 140,
        tooltip: false
    },
    {
        props: 'bmAmount',
        name: '已BM金额',
        key: '已BM金额',
        width: 140,
        tooltip: false
    },
]
export const investmentListCommon = [{
    //export const tableTitle = permissionTitle("PARTSPROCURE_PARTSPROCURELIST",[{
        props: 'cateGoryCode',
        name: '材料组编号',
        key: 'LK_CAILIAOZUBIANHAO2',
        width: 120,
        tooltip: false
    },
    {
        props: 'cateGoryNameCN',
        name: '材料组名称（中）',
        key: 'LK_CAILIAOZUMINGCENGZHONG',
        width: 150,
        tooltip: false
    },
    {
        props: 'cateGoryNameDe',
        name: '材料组名称（德）',
        key: 'LK_CAILIAOZUMINGCENGDE',
        width: 150,
        tooltip: false
    },
    {
        props: 'partsPackageCN',
        name: '零件包-CN',
        key: '零件包-CN',
        width: 230,
        tooltip: false
    },
    {
        props: 'partsPackageDe',
        name: '零件包-DE',
        key: '零件包-DE',
        width: 230,
        tooltip: false
    },
    {
        props: 'commodity',
        name: '专业科室',
        key: '专业科室',
        width: 130,
        tooltip: false
    },
    {
        props: 'budgetAmount',
        name: '预算金额',
        key: '预算金额',
        width: 150,
        tooltip: false
    },
    {
        props: 'dataSource',
        name: '数据来源',
        key: '数据来源',
        width: 200,
        tooltip: false
    },
    {
        props: 'remark',
        name: '备注',
        key: '备注',
        width: 200,
        tooltip: false
    },
    {
        props: 'refCarTypeProName',
        name: '参考项目',
        key: '参考项目',
        width: 200,
        tooltip: false
    },
    {
        props: 'refMoldAmount',
        name: '参考项目模具定点金额',
        key: '参考项目模具定点金额',
        width: 320,
        tooltip: false
    },
]
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
    'search.current': "",

    'search.carTypeProject': "", //车型项目
    'search.locationFactoryId': "", //车型项目
    'search.projectType': "", //项目类型
    'search.fixedPointType': "", //定点类型
    'search.modelCategory': "", //车型类别
    'search.materialName': "", //材料组
    'search.categoryName': "", //材料组

    'search.zhEnNo': "", //材料组编号/中文名/德文名
    'search.mouldAttr': "", //模具属性
    'search.professionalDepartments': "", //专业科室

    'search.referenceModel1': "", //参考车型项目一
    'search.referenceModel2': "", //参考车型项目二
    'search.referenceModel3': "", //参考车型项目三
    'search.otherModel': "", //其它车型项目备选
    'search.modelProject': "", //车型项目类型
    'search.sopBegin': "", //车型项目起止年份
    'search.sopEnd': "", //车型项目起止年份

    'search.version': "", //版本号
    'search.carTypeName': "", //车型名称
    'search.sopDate': "", //SOD
    'search.purchasingFactory': "", //采购工厂
    'search.approvalInvestment': "", //批准投资
    'search.relatedCarType': "", //关联车型

    'search.SUBTOTA': "", //SUB-TOTAL
    'search.aekoPercent': "", //AEKO
    'search.AEKOMoney': "", //AEKO金额
    'search.contingencyAmount': "", //综合偏差
    'search.contingencyPercent': "", //综合偏差金额
    'search.totalBudget': "", //总预算
    'search.DeptSelect': "", // 专业科室
}

// addRfq
export const addRfqTitle = [
    { props: 'id', name: 'RFQ#' },
    { props: 'rfqName', name: 'RFQ名称' },
    { props: 'currentStatus', name: 'RFQ状态' },
    { props: 'updateDate', name: '操作时间' },
]

export const tabtitle = [
    // {value: 1, message: 0, name: "车型项目概览", activePath: '/tooling/investmentReport', url: '/tooling/investmentReport', key: "LK_CHEXINGXIANGMUGAILAN"},
    {value: 1, message: 0, name: "预算管理", activePath: '/tooling/budgetManagement', url: '/tooling/budgetManagement', key: "LK_YUSUANGUANLI"},
    {value: 2, message: 0, name: "预算审批", activePath: '/tooling/budgetApproval', url: '/tooling/budgetApproval', key: "LK_YUSUANSHENPI"},
    {value: 3, message: 0, name: "BA申请", activePath: '/tooling/baApplyIndex', url: '/tooling/baApplyIndex', key: "LK_BASHENQING"},
    {value: 4, message: 0, name: "BM申请", activePath: '/tooling/bmApplyIndex', url: '/tooling/bmApplyIndex', key: "LK_BMSHENQING"},
    {value: 5, message: 0, name: "投资报告", activePath: '/tooling/investmentReport', url: '/tooling/investmentReport', key: "LK_TOUZIBAOGAO"},
    {value: 6, message: 0, name: "BA审批", activePath: '/tooling/baApprovalIndex', url: '/tooling/baApprovalIndex', key: "LK_BAAPPROVAL"},
    {value: 7, message: 0, name: "付款计划制定与查看", activePath: '/tooling/investmentAdmin', url: '/tooling/investmentAdmin', key: "LK_FUKUANJIHUADINGZHIYUCHAKAN"},
]

export const budgetManagement3rd = [
    {value: 1, message: 0, name: "车型项目", activePath: 'carTypeOverview', url: '/tooling/budgetManagement/carTypeOverview', key: "LK_CHEXINGXIANGMU", permissionKey: "TOOLING_BUDGET_OVERVIEW"},
    {value: 2, message: 0, name: "Common Sourcing", activePath: 'commonSourcing', url: '/tooling/budgetManagement/commonSourcing', key: "Common Sourcing", permissionKey: "TOOLING_BUDGET_COMMONSOURCING_MODELBAGBUDGET"},
    {value: 3, message: 0, name: "付款看板", activePath: 'payBlock', url: '/tooling/investmentAdmin/payBlock', key: "LK_FUKUANKANBAN", permissionKey: "TOOLING_PAYMENTPLAN_PAYMENTBOARD"},
    {value: 4, message: 0, name: "年度计划", activePath: 'yearlyPlan', url: '/tooling/investmentAdmin/yearlyPlan', key: "LK_NIANDUJIHUA", permissionKey: "TOOLING_PAYMENTPLAN_YEAR"},
    {value: 5, message: 0, name: "月度计划", activePath: 'monthlyPlan', url: '/tooling/investmentAdmin/monthlyPlan', key: "LK_YUEDUJIHUA", permissionKey: "TOOLING_PAYMENTPLAN_MONTH"},
]

export const dataBaseData = [
    {
        props: 'tmCartypeProName',
        name: '车型项目',
        key: 'LK_CHEXINGXIANGMU',
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

export const tmCartypeProList = [
    {
        props: 'tmCartypeProName',
        name: '车型项目',
        key: 'LK_CHEXINGXIANGMU',
        tooltip: false
    },
    {
        props: 'cartypeProType',
        name: '车型类型',
        key: '车型类型',
        tooltip: false
    },
    {
        props: 'nomiType',
        name: 'JV/Common',
        key: 'JV/Common',
        tooltip: false
    },
    {
        props: 'categoryNameZh',
        name: '材料组',
        key: '材料组',
        tooltip: false
    },
    {
        props: 'nomiAmount',
        name: '模具定点金额',
        key: '模具定点金额',
        tooltip: false
    },
    {
        props: 'entryAmount',
        name: '模具入账金额',
        key: '模具入账金额',
        tooltip: false
    },
    {
        props: 'info',
        name: '',
        key: '',
        tooltip: false
    },
    {
        props: 'apply',
        name: '',
        key: '',
        tooltip: false
    },
]

export const partsList = [
    {
        props: 'partNum',
        name: '零件号',
        key: '零件号',
        tooltip: false
    },
    {
        props: 'partNameZh',
        name: '零件名称（中）',
        key: '零件名称（中）',
        tooltip: false
    },
    {
        props: 'partNameDe',
        name: '零件名称（德）',
        key: '零件名称（德）',
        tooltip: false
    },
    {
        props: 'nomiAmount',
        name: '模具定点金额',
        key: '模具定点金额',
        tooltip: false
    },
    {
        props: 'nomiType',
        name: '定点类型',
        key: '定点类型',
        tooltip: false
    },
    {
        props: 'entryAmount',
        name: '模具入账金额',
        key: '模具入账金额',
        tooltip: false
    },
]

export const appliedList = [
    {
        props: 'categoryName',
        name: '材料组',
        key: '材料组',
        tooltip: false
    },
    {
        props: 'rfqId',
        name: 'RFQ',
        key: 'RFQ',
        tooltip: false
    },
    {
        props: 'partNum',
        name: '零件号',
        key: '零件号',
        tooltip: false
    },
    {
        props: 'partNameZh',
        name: '零件名称（中）',
        key: '零件名称（中）',
        tooltip: false
    },
    {
        props: 'partNameDe',
        name: '零件名称（德）',
        key: '零件名称（德）',
        tooltip: false
    },
    {
        props: 'budgetApplyAmount',
        name: '申请金额',
        key: '申请金额',
        tooltip: false
    },
    {
        props: 'applyAmountStatus',
        name: '申请状态',
        key: '申请状态',
        tooltip: false
    },
    {
        props: 'purchaserName',
        name: '询价采购员',
        key: '询价采购员',
        tooltip: false
    },
]

export const nomiAmountDetailList = [
    {
        props: 'categoryName',
        name: '材料组',
        key: '材料组',
        tooltip: false
    },
    {
        props: 'rfqId',
        name: 'RFQ',
        key: 'RFQ',
        tooltip: false
    },
    {
        props: 'partNum',
        name: '零件号',
        key: '零件号',
        tooltip: false
    },
    {
        props: 'partNameZh',
        name: '零件名称（中）',
        key: '零件名称（中）',
        tooltip: false
    },
    {
        props: 'partNameDe',
        name: '零件名称（德）',
        key: '零件名称（德）',
        tooltip: false
    },
    {
        props: 'nomiAmount',
        name: '定点金额',
        key: '定点金额',
        tooltip: false
    },
    {
        props: 'supplierName',
        name: '定点供应商',
        key: '定点供应商',
        tooltip: false
    },
    {
        props: 'purchaserName',
        name: '询价采购员',
        key: '询价采购员',
        tooltip: false
    },
    {
        props: 'nomiDate',
        name: '定点日期',
        key: '定点日期',
        tooltip: false
    },
]

export const baAmountDetailList = [
    {
        props: 'categoryName',
        name: '材料组',
        key: '材料组',
        tooltip: false
    },
    {
        props: 'rfqId',
        name: 'RFQ',
        key: 'RFQ',
        tooltip: false
    },
    {
        props: 'partNum',
        name: '零件号',
        key: '零件号',
        tooltip: false
    },
    {
        props: 'partNameZh',
        name: '零件名称（中）',
        key: '零件名称（中）',
        tooltip: false
    },
    {
        props: 'partNameDe',
        name: '零件名称（德）',
        key: '零件名称（德）',
        tooltip: false
    },
    {
        props: 'baAmount',
        name: '申请BA金额',
        key: '申请BA金额',
        tooltip: false
    },
    {
        props: 'baNum',
        name: 'A号',
        key: 'A号',
        tooltip: false
    },
    {
        props: 'purchaserName',
        name: '询价采购员',
        key: '询价采购员',
        tooltip: false
    },
]

export const bmAmountDetailList = [
    {
        props: 'categoryName',
        name: '材料组',
        key: '材料组',
        tooltip: false
    },
    {
        props: 'rfqId',
        name: 'RFQ',
        key: 'RFQ',
        tooltip: false
    },
    {
        props: 'partNum',
        name: '零件号',
        key: '零件号',
        tooltip: false
    },
    {
        props: 'partNameZh',
        name: '零件名称（中）',
        key: '零件名称（中）',
        tooltip: false
    },
    {
        props: 'partNameDe',
        name: '零件名称（德）',
        key: '零件名称（德）',
        tooltip: false
    },
    {
        props: 'bmAmount',
        name: 'BM单金额',
        key: 'BM单金额',
        tooltip: false
    },
    {
        props: 'bmNum',
        name: 'BM单号',
        key: 'BM单号',
        tooltip: false
    },
    {
        props: 'wbsCode',
        name: 'WBS code',
        key: 'WBS code',
        tooltip: false
    },
    {
        props: 'purchaserName',
        name: '询价采购员',
        key: '询价采购员',
        tooltip: false
    },
]