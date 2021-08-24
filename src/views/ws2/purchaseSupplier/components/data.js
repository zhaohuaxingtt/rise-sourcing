/*
 * @Author: yz
 */
import {permissionTitle} from '@/utils'

export const tabtitle = [
    {value: 1, message: 0, name: "模具投资清单", activePath: '/purchaseSupplier/investmentList', url: '/purchaseSupplier/investmentList', key: "模具投资清单"},
]
export const navList = [
    {value: 1, message: 0, name: "确认任务", activePath: '/purchaseSupplier/investmentList', url: '/purchaseSupplier/investmentList', key: "确认任务"},
    {value: 2, message: 0, name: "变更任务", activePath: '/purchaseSupplier/changeTask', url: '/purchaseSupplier/changeTask', key: "变更任务"},
]
export const investmentListTitle = [
    {
        props: 'bmSerial',
        name: 'BM单流水号',
        key: 'BM单流水号',
        width: 180,
        isMoney: true,
        tooltip: false
    },
    {
        props: 'bmTypeName',
        name: 'BM单类型',
        key: 'BM单类型',
        tooltip: false
    },
    {
        props: 'tmCartypeProName',
        name: '车型项目',
        key: '车型项目',
        tooltip: false
    },
    {
        props: 'moldInvestmentAmount',
        name: '模具投资金额',
        key: '模具投资金额',
        width: 200,
        tooltip: false
    },
    {
        props: 'behalfPartsNum',
        name: '代表零件号',
        key: '代表零件号',
        width: 180,
        tooltip: false
    },
    {
        props: 'taskAcceptDate',
        name: '任务接收日期',
        key: '任务接收日期',
        width: 150,
        tooltip: false
    },
    {
        props: 'taskDealDate',
        name: '任务处理日期',
        key: '任务处理日期',
        width: 150,
        tooltip: false
    },
    {
        props: 'linieName',
        name: 'Linie',
        key: 'Linie',
        tooltip: false
    },
    {
        props: 'moldInvestmentStatus',
        name: '模具投资清单状态',
        key: '模具投资清单状态',
        width: 220,
        tooltip: false
    },
]

export const changeTaskTitle = [
    {
        props: 'changeNum',
        name: '变更单号',
        key: '变更单号',
        width: 150,
        tooltip: false
    },
    {
        props: 'bmSerial',
        name: 'BM单流水号',
        key: 'BM单流水号',
        width: 250,
        tooltip: false
    },
    {
        props: 'bmNum',
        name: 'BM单号',
        key: 'BM单号',
        width: 150,
        tooltip: false
    },
    {
        props: 'akeoType',
        name: 'BM单类型',
        key: 'BM单类型',
        width: 150,
        tooltip: false
    },
    {
        props: 'tmCartypeProName',
        name: '车型项目',
        key: '车型项目',
        width: 250,
        tooltip: false
    },
    {
        props: 'moldInvestmentAmount',
        name: '模具投资金额',
        key: '模具投资金额',
        width: 200,
        tooltip: false
    },
    {
        props: 'newMoldInvestmentAmount',
        name: '变更后金额',
        key: '变更后金额',
        width: 200,
        tooltip: false
    },
    {
        props: 'behalfPartsName',
        name: '代表零件号',
        key: '代表零件号',
        width: 180,
        tooltip: false
    },
    {
        props: 'taskAcceptDate',
        name: '任务接收日期',
        key: '任务接收日期',
        width: 150,
        tooltip: false
    },
    {
        props: 'taskDealDate',
        name: '任务处理日期',
        key: '任务处理日期',
        width: 150,
        tooltip: false
    },
    {
        props: 'linieName',
        name: 'Linie',
        key: 'Linie',
        width: 150,
        tooltip: false
    },
    {
        props: 'changeStatusName',
        name: '变更单状态',
        key: '变更单状态',
        width: 150,
        tooltip: false
    },
    {
        props: 'moldInvestmentStatusName',
        name: '模具投资清单状态',
        key: '模具投资清单状态',
        width: 220,
        tooltip: false
    },
]

export const bmInfoTitle = [
    {
        props: 'moldId',
        name: '模具ID',
        key: '模具ID',
        width: 200,
        tooltip: false
    },
    {
        props: 'assetName',
        name: '固资名称',
        key: '固资名称',
        width: 200,
        tooltip: false
    },
    {
        props: 'craftType',
        name: '工艺类型',
        key: '工艺类型',
        width: 200,
        tooltip: false
    },
    {
        props: 'moldType',
        name: '工模具种类',
        key: '工模具种类',
        width: 200,
        tooltip: false
    },
    {
        props: 'assetTypeNum',
        name: '资产分类编号',
        key: '资产分类编号',
        width: 200,
        tooltip: false
    },
    {
        props: 'partsTotalName',
        name: '零件总成名称',
        key: '零件总成名称',
        width: 200,
        tooltip: false
    },
    {
        props: 'partsTotalNum',
        name: '总成零件号',
        key: '总成零件号',
        width: 200,
        tooltip: false
    },
    {
        props: 'partsShareNum',
        name: '共享零件号',
        key: '共享零件号',
        width: 200,
        tooltip: false
    },
    {
        props: 'fsNum',
        name: 'FS号',
        key: 'FS号',
        width: 200,
        tooltip: false
    },
    {
        props: 'partsName',
        name: '零部件名称',
        key: '零部件名称',
        width: 200,
        tooltip: false
    },
    {
        props: 'partsNum',
        name: '零件号',
        key: '零件号',
        width: 200,
        tooltip: false
    },
    {
        props: 'count',
        name: '数量',
        key: '数量',
        width: 200,
        tooltip: false
    },
    {
        props: 'assetPrice',
        name: '资产单价',
        key: '资产单价',
        width: 200,
        tooltip: false
    },
    {
        props: 'assetTotal',
        name: '资产总额',
        key: '资产总额',
        width: 200,
        tooltip: false
    },
    {
        props: 'picture',
        name: '照片',
        key: '照片',
        width: 200,
        tooltip: false
    },

]

