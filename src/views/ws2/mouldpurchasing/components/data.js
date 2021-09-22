export const tableTitle = [{
    //export const tableTitle = permissionTitle("PARTSPROCURE_PARTSPROCURELIST",[{
    props: 'riseCode',
    name: 'RiSE编号',
    key: 'MODEL-ORDER.LK_RISEBIANHAO',
    tooltip: true,
    align: 'center',
},
{
    props: 'sapCode',
    name: 'SAP编号',
    key: 'MODEL-ORDER.LK_SAPBIANHAO',
    tooltip: true,
    align: 'center',
},
{
    props: 'sapItem',
    name: '项次',
    key: 'MODEL-ORDER.LK_XIANGCI',
    tooltip: true,
    align: 'center',
},
{
    props: 'account',
    name: '科目',
    key: 'LK_KEMU',
    tooltip: true,
    align: 'center',
},
{
    props: 'partNameZh',
    name: '描述',
    key: 'LK_MIAOSHU',
    tooltip: true,
    align: 'center',
},
{
    props: 'supplierNameZh',
    name: '期望供应商',
    key: 'MODEL-ORDER.LK_QIWANGGONGYINGSHANG',
    align: 'center',
    tooltip: true,
    width: 120
},
{
    props: 'quantity',
    name: '数量',
    key: 'LK_SHULIANG',
    tooltip: true,
    align: 'center',
},
{
    props: 'unit',
    name: '计量单位',
    key: 'LK_JILIANGDANWEI',
    tooltip: true,
    align: 'center',
},
{
    props: 'factoryName',
    name: '采购工厂',
    key: 'LK_CAIGOUGONGCHANG',
    tooltip: true,
    align: 'center',
},
{
    props: 'deptName',
    name: '科室',
    key: 'LK_KESHI',
    tooltip: true,
    align: 'center',
},
{
    props: 'procureGroup',
    name: '采购组',
    key: 'LK_CAIGOUZU',
    tooltip: true,
    align: 'center',
},
{
    props: 'status',
    name: '状态',
    key: 'LK_ZHUANGTAI',
    align: 'center',
    tooltip: true,
},
{
    props: 'applyBy',
    name: '申请人',
    key: 'LK_SHENQINGREN',
    tooltip: true,
    align: 'center',
},
{
    props: 'createDate',
    name: '生成时间',
    key: 'MODEL-ORDER.LK_SHENQINGSHIJIAN',
    tooltip: true,
    align: 'center',
},
{
    props: 'contractRiseCode',
    name: '订单号',
    key: 'LK_DINGDANHAO',
    tooltip: true,
    align: 'center',
    width: 120
},
// {
//     props: 'contractRiseCode',
//     name: 'SAP订单号',
//     key: 'LK_SAPDINGDANHAO',
//     tooltip: true,
//     align: 'center',
//     width: 120
// },
]


//零件采购列表入参
export const form = {
    'sapCode': '', //SAP编号
    'supplierSapCode': '', //期望供应商
    'supplierNameZh': '',
    'status': '', // 状态
    'riseCode': '', //RiSE编号
    'procureFactory': '', //采购工厂
    'pageSize': '10',
    'currentPage': 1,
    'procureGroup': '', // 采购组
    'requestTraceNo': '', // 需求追踪号
    'applyBy': '', // 申请人
    'partNameZh': '',   //描述
    'deptName': '', //科室编码
    'type': 'MPR'
}
