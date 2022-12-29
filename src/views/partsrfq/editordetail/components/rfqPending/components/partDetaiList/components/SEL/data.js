// SEL目标价
export const SELTargetPriceTitle = [
    {
        props: "fsnrGsnrNum",
        name: "零件采购项目号",
        key: "LK_LINGJIANCAIGOUXIANGMUHAO",
        width:'150'
    },
    { props: "partNum", name: "零件号", key: "LK_LINGJIANHAO" },
    {
        props: "partNameZh",
        name: "零件名（中）",
        key: "LK_LINGJIANMINGZHONG",
    },
    { props: "businessTypeName", name: "申请类型", key: "LK_SHENQINGLEIXING" },
    { props: 'cfUserName', name: 'CF负责人', key: 'LK_CFFUZEREN', width: '100' },
    {
        props: "shareTargetPrice",
        name: "目标价·分摊",
        key: "目标价·分摊",
    },
    {
        props: "releaseOutput",
        name: "分摊量",
        key: "分摊量",
    },
    {
        props: "estimateShareAPrice",
        name: "预计A价Delta",
        key: "预计A价Delta",
    },
    {
        props: "targetPrice",
        name: "目标价·一次性",
        key: "目标价·一次性",
    },
    {
        props: "status",
        name: "状态",
        key: "LK_ZHUANGTAI",
    },
]
// SEL目标价申请记录
export const SELApplyTargetPriceTitle = [
    {
        props: "fsnrGsnrNum",
        name: "零件采购项目号",
        key: "LK_LINGJIANCAIGOUXIANGMUHAO",
        width:'150'
    },
    { props: "partNum", name: "零件号", key: "LK_LINGJIANHAO" },
    {
        props: "partNameZh",
        name: "零件名（中）",
        key: "LK_LINGJIANMINGZHONG",
    },
    { props: "businessTypeName", name: "申请类型", key: "LK_SHENQINGLEIXING" },
    { props: 'cfUserName', name: 'CF负责人', key: 'LK_CFFUZEREN', width: '100' },
    {
        props: "shareTargetPrice",
        name: "目标价·分摊",
        key: "目标价·分摊",
    },
    {
        props: "releaseOutput",
        name: "分摊量",
        key: "分摊量",
    },
    {
        props: "estimateShareAPrice",
        name: "预计A价Delta",
        key: "预计A价Delta",
    },
    {
        props: "targetPrice",
        name: "目标价·一次性",
        key: "目标价·一次性",
    },
    {
        props: "status",
        name: "状态",
        key: "LK_ZHUANGTAI",
    },
    // {
    //     props: "remarks",
    //     name: "备注",
    //     key: "LK_BEIZHU",
    // },
    // {
    //     props: "returnDate",
    //     name: "返回时间",
    //     key: "返回时间",
    // },
]
// 申请SEL目标价弹窗表格
export const selDialogTitle = [
    { props: 'fsnrGsnrNum', name: '零件采购项目号', key: "LINGJIANCAIGOUXIANGMUHAO", tooltip: true, width: 140 },
    { props: 'partNum', name: '零件号', key: "LINGJIANHAO", tooltip: true },
    { props: 'partNameZh', name: '零件名(中)', key: "LINGJIANMINGZHONG", tooltip: true },
    { props: 'procureFactoryName', name: '采购工厂', key: "CAIGOUGONGCHANG", tooltip: true, todoHiddel: true },
    { props: 'carTypeProjectZh', name: '车型项目', key: "LK_CARPROJECT", tooltip: true, minWidth: 140, todoHiddel: true },
    { props: 'expectedShareTargetPrice', name: '期望目标价·分摊', key: "期望目标价·分摊", tooltip: true }, // 填写的是期望目标价·分摊
    { props: 'expectedTargetPrice', name: '期望目标价·一次性', key: "期望目标价·一次性", tooltip: true }, // 填写的是期望目标价·一次性
]
export const iconName = {
    '已完成': 'iconrs-wancheng',
    '未完成': 'icontishi-cheng',
    '未申请': 'iconzhongyaoxinxitishi',
}