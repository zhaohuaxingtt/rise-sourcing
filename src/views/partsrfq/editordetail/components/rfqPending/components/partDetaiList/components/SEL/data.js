// SEL目标价
export const SELTargetPriceTitle = [
    {
        props: "fsnrGsnrNum",
        name: "零件采购项目号",
        key: "LK_LINGJIANCAIGOUXIANGMUHAO",
    },
    { props: "partNum", name: "零件号", key: "LK_LINGJIANHAO" },
    {
        props: "partNameZh",
        name: "零件名（中）",
        key: "LK_LINGJIANMINGZHONG",
    },
    { props: "applyType", name: "申请类型", key: "LK_SHENQINGLEIXING" },
    { props: 'cfControllerName', name: 'CF负责人', key: 'LK_CFFUZEREN', width: '180' },
    {
        props: "expTargetpri",
        name: "目标价",
        key: "LK_MUBIAOJIA",
    },
    {
        props: "remark",
        name: "备注",
        key: "LK_BEIZHU",
    },
    {
        props: "endDate",
        name: "返回时间",
        key: "返回时间",
    },
]
// SEL目标价申请记录
export const SELApplyTargetPriceTitle = [
    {
        props: "fsnrGsnrNum",
        name: "零件采购项目号",
        key: "LK_LINGJIANCAIGOUXIANGMUHAO",
    },
    { props: "partNum", name: "零件号", key: "LK_LINGJIANHAO" },
    {
        props: "partNameZh",
        name: "零件名（中）",
        key: "LK_LINGJIANMINGZHONG",
    },
    { props: "applyType", name: "申请类型", key: "LK_SHENQINGLEIXING" },
    { props: 'cfControllerName', name: 'CF负责人', key: 'LK_CFFUZEREN', width: '180' },
    {
        props: "expTargetpri",
        name: "目标价",
        key: "LK_MUBIAOJIA",
    },
    {
        props: "remark",
        name: "备注",
        key: "LK_BEIZHU",
    },
    {
        props: "endDate",
        name: "返回时间",
        key: "返回时间",
    },
]
// 申请SEL目标价弹窗表格
export const selDialogTitle = [
    { props: 'fsnrGsnrNum', name: '零件采购项目号', key: "LINGJIANCAIGOUXIANGMUHAO", tooltip: true, width: 140 },
    { props: 'partNum', name: '零件号', key: "LINGJIANHAO", tooltip: true },
    { props: 'partNameZh', name: '零件名(中)', key: "LINGJIANMINGZHONG", tooltip: true },
    { props: 'procureFactoryName', name: '采购工厂', key: "CAIGOUGONGCHANG", tooltip: true, todoHiddel: true },
    { props: 'carTypeProjectZh', name: '车型项目', key: "LK_CARPROJECT", tooltip: true, minWidth: 140, todoHiddel: true },
    // { props: 'originalTargetPrice', name: '原目标价', key: "YUANMUBIAOJIA", tooltip: true },
    // { props: 'businessTypeDesc', name: '类型', key: "LEIXING", tooltip: true },
    { props: 'targetPrice', name: '目标价', key: "MUBIAOJIA", tooltip: true },
]
export const iconName = {
    '已完成': 'iconrs-wancheng',
    '未完成': 'icontishi-cheng',
    '未申请': 'iconzhongyaoxinxitishi',
  }