/*
 * @Author: moxuan
 * @Date: 2021-05-19 20:08:08
 * @Description: FRM综合管理
 */

export const tableTitle = [
    {props: 'title', name: '描述', key: 'LK_MIAOSHU', tooltip: true},
    {props: '_status', name: '状态', key: 'LK_ZHUANGTAI', width: 200, tooltip: true,},
    {props: 'createDate', name: '创建日期', key: 'LK_CJRQ', width: 120, tooltip: true},
    {props: 'updateDate', name: '更新日期', key: 'LK_GXRQ', tooltip: true,},
    {props: 'version', name: '版本号', key: 'LK_BANBENHAO', tooltip: true,},
    {props: '_billType', name: '单据类型', key: 'LK_DANJULEIX', tooltip: true, width: 110,},
    {props: '_type', name: '业务类型', key: 'LK_YEWULEIXING', width: 120, tooltip: true,},
    {props: '_source', name: '来源', key: 'LK_LAIYUAN', tooltip: true},
    {props: 'createByName', name: '发起人', key: 'LK_FAQIREN', width: 110, tooltip: true,},
    {props: 'operation', name: '操作', key: 'LK_CAOZUO', width: 200, tooltip: true,},

];
export const tableTitle1 = [
    {props: 'title', name: '', key: '', width: '',tooltip: true},
    {props: 'total', name: 'Total', key: '',width: '',tooltip: true,},
    {props: 'total', name: 'Total', key: '',width: '',tooltip: true,},
    // {props: 'CSM', name: 'CSM', key: '', tooltip: true},
    // {props: 'CSE', name: 'CSE', key: '', tooltip: true,},
    // {props: 'CSI', name: 'CSI', key: '', tooltip: true,},
    // {props: 'CSP', name: 'CSP', key: '', tooltip: true,},
    // {props: 'CSX', name: 'CSX', key: '', tooltip: true,},
    // {props: 'BUB', name: 'BUB', key: '', tooltip: true,},
];
export const tableTitle2 = [
    {props: 'code', name: '产品家族', key: '', tooltip: true},
    {props: 'calcAmount', name: '系统计算金额', key: '',tooltip: true,},
    {props: 'adjustAmount', name: '调整后金额', key: '',tooltip: true,},
    // {props: 'CSM', name: 'CSM', key: '', tooltip: true},
    // {props: 'CSE', name: 'CSE', key: '', tooltip: true,},
    // {props: 'CSI', name: 'CSI', key: '', tooltip: true,},
    // {props: 'CSP', name: 'CSP', key: '', tooltip: true,},
    // {props: 'CSX', name: 'CSX', key: '', tooltip: true,},
    // {props: 'BUB', name: 'BUB', key: '', tooltip: true,},
];

export const tableList = [
    {props: 'deptCode', name: '科室', key: 'KESHI',},
    {
        props: '', name: 'TTO', key: 'TTO',
        child: [
            {
                props: 'tto', name: 'Total', key: 'total',
            }
        ]
    },
    {
        props: '', name: '平均', key: 'PINJUN',
        child: [
            {
                props: 'lastTarget', name: 'Target', key: 'Target',
            },
            {
                props: 'lastCommitment', name: 'Commitment', key: 'Commitment',
            }
        ]

    },
    {
        props: '', name: '持续', key: 'CHIXU',
        child: [
            {
                props: 'averageTarget', name: 'Target', key: 'Target',
            },
            {
                props: 'averageCommitment', name: 'Commitment', key: 'Commitment',
            }
        ]
    },

];