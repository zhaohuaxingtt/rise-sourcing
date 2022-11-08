export const ModeltableTitle = (vm) => [
    {
        required:true,tooltip:true,
        props: 'cartypeProId',
        name: '车型项目',
        key: 'partsprocure.PARTSPROCUREMODELPROJECT',
        width:150,
        rule: [
            { required: true, message: "11212121", trigger: "change" },
        ],
    },{
        required:true,tooltip:true,
        props: 'vsiPartNum',
        name: 'VSI参考零件号',
        key: 'PROJECTVSI参考零件号',
        width:150,
        rule: [
            { required: true, message: "11212121", trigger: "blur" },
        ],
    },{
        required:true,tooltip:true,
        props: 'vsiPartName',
        name: 'VSI参考零件名称',
        key: 'PROJECTVSI参考零件名称',
        width:150,
        rule: [
            { required: true, message: "11212121", trigger: "blur" },
        ],
    },{
        props: 'vwSet',tooltip:true,
        name: 'VW Set',
        key: 'PROJECTVWSet',
        width:150,
    },{
        props: 'vsiModel',tooltip:true,
        name: 'VSI参考模块',
        key: 'PROJECTVSI参考模块',
        width:150,
    },{
        required:true,tooltip:true,
        props: 'vsiPrice',
        name: 'VSI-单价',
        key: 'PROJECTVSI单价',
        width:150,
        rule: [
            { required: true, message: "11212121", trigger: "blur" },
        ],
    },{
        required:true,tooltip:true,
        props: 'vsiNum',
        name: 'VSI-数量',
        key: 'PROJECTVSI数量',
        width:150,
        rule: [
            { required: true, message: "11212121", trigger: "blur" },
            {
                pattern: /^\d+$/,
                required: true,
                trigger: 'blur'
            }
        ],
    },{
        props: 'vsiCar',tooltip:true,
        name: 'VSI-整车',
        key: 'PROJECTVSI整车',
        width:150,
    },{
        props: 'nomiPartNum',tooltip:true,
        name: '定点零件号',
        key: 'PROJECT定点零件号',
        width:150,
    },{
        props: 'nomiAPrice',tooltip:true,
        name: '定点A价',
        key: 'PROJECT定点A价',
        width:150,
    },{
        props: 'nomiCar',tooltip:true,
        name: '定点-整车',
        key: 'PROJECT定点整车',
        width:150,
    },{
        props: 'nomiSupplier',tooltip:true,
        name: '定点供应商',
        key: 'PROJECT定点供应商',
        width:150,
    },{
        props: 'dept',tooltip:true,
        name: '科室',
        key: 'PROJECT科室',
        width:150,
    },{
        props: 'fsNum',tooltip:true,
        name: 'FS号',
        key: 'PROJECTFS号',
        width:150,
    },{
        props: 'partPrjType',tooltip:true,
        name: '采购项目类型',
        key: 'PROJECT采购项目类型',
        width:150,
    },{
        props: 'ltcRate',tooltip:true,
        name: '年降',
        key: 'PROJECT年降',
        width:150,
    },{
        props: 'firstAnnualPrice',tooltip:true,
        name: '年降（SOP+1）',
        key: 'PROJECT年降SOP1',
        width:150,
    },{
        props: 'secondAnnualPrice',tooltip:true,
        name: '年降（SOP+2）',
        key: 'PROJECT年降SOP2',
        width:150,
    },{
        props: 'thirdAnnualPrice',tooltip:true,
        name: '年降（SOP+3）',
        key: 'PROJECT年降SOP3',
        width:150,
    },{
        props: 'modelBudget',tooltip:true,
        name: '模具预算',
        key: 'PROJECT模具预算',
        width:150,
    },{
        props: 'nomiModelCost',tooltip:true,
        name: '定点模具费用',
        key: 'PROJECT定点模具费用',
        width:150,
    }
]

export const dataPoint = [
    {
        props:"nomiPartNum",
    },{
        props:"nomiAPrice",
    },{
        props:"nomiCar",
    },{
        props:"nomiSupplier",
    },{
        props:"dept",
    },{
        props:"fsNum",
    },{
        props:"partPrjType",
    },{
        props:"ltcRate",
    },{
        props:"firstAnnualPrice",
    },{
        props:"secondAnnualPrice",
    },{
        props:"thirdAnnualPrice",
    },{
        props:"modelBudget",
    },{
        props:"nomiModelCost",
    },
]