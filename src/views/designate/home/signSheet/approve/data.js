export const pendingTable = [
    {
        type: 'selection'
    }, {
        type: 'index',
        i18n: '#'
    }, {
        prop: 'signCode',
        name: '签字单号',
        i18n: 'QIANZIDANHAO',
        emit: 'openDetail',
        customRender: (h, scope) => {
            return <span class="link">{scope.row.signCode}</span>
        }
    }, {
        prop: 'appCount',
        name: '议题数量',
        i18n: '议题数量',
    }, {
        prop: 'remark',
        name: '备注',
        i18n: 'BEIZHU',
        tooltip: true,
        minWidth: 200
    }, {
        prop: 'pusher',
        name: '推送人',
        i18n: '推送人',
        width: 120
    }, {
        prop: 'pushDate',
        name: '推送时间',
        i18n: '推送时间',
        width: 180
    },
]

export const approveTable = [
    {
        type: 'index',
        i18n: '#'
    }, {
        prop: 'appNo',
        name: '定点申请编号',
        i18n: '定点申请编号',
    }, {
        prop: 'appName',
        name: '申请名称',
        i18n: '申请名称',
    }, {
        prop: 'appType',
        name: '类型',
        i18n: '类型',
    }, {
        prop: 'linieDept',
        name: 'commodity',
        i18n: 'commodity',
    }, {
        prop: 'approvedStatusName',
        name: '审批结果',
        i18n: '审批结果',
    }, {
        prop: 'approvedMsg',
        name: '审批意见',
        i18n: '审批意见',
    }, {
        prop: 'approvedDate',
        name: '审批时间',
        i18n: '审批时间',
    },
]