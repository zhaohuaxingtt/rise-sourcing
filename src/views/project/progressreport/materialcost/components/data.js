export const ModeltableTitle = (vm) => [
    {
        required:true,
        props: 'cartypeProId',
        name: '车型项目',
        key: 'partsprocure.PARTSPROCUREMODELPROJECT',
        width:150,
        rule: [
            { required: true, message: "11212121", trigger: "change" },
        ],
    },{
        required:true,
        props: 'vsiPartNum',
        name: 'VSI参考零件号',
        key: 'PROJECTVSI参考零件号',
        width:150,
        rule: [
            { required: true, message: "11212121", trigger: "blur" },
        ],
    },{
        required:true,
        props: 'vsiPartName',
        name: 'VSI参考零件名称',
        key: 'PROJECTVSI参考零件名称',
        width:150,
        rule: [
            { required: true, message: "11212121", trigger: "blur" },
        ],
    },{
        props: 'vwSet',
        name: 'VW Set',
        key: 'PROJECTVWSet',
        width:150,
    },{
        props: 'vsiModel',
        name: 'VSI参考模块',
        key: 'PROJECTVSI参考模块',
        width:150,
    },{
        required:true,
        props: 'vsiPrice',
        name: 'VSI-单价',
        key: 'PROJECTVSI单价',
        width:150,
        rule: [
            { required: true, message: "11212121", trigger: "blur" },
        ],
    },{
        required:true,
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
        props: 'vsiCar',
        name: 'VSI-整车',
        key: 'PROJECTVSI整车',
        width:150,
    },{
        props: 'nomiPartNum',
        name: '定点零件号',
        key: 'PROJECT定点零件号',
        width:150,
    },{
        props: 'nomiAPrice',
        name: '定点A价',
        key: 'PROJECT定点A价',
        width:150,
    },{
        props: 'nomiCar',
        name: '定点-整车',
        key: 'PROJECT定点整车',
        width:150,
    },{
        props: 'nomiSupplier',
        name: '定点供应商',
        key: 'PROJECT定点供应商',
        width:150,
    },{
        props: 'dept',
        name: '科室',
        key: 'PROJECT科室',
        width:150,
    },{
        props: 'fsNum',
        name: 'FS号',
        key: 'PROJECTFS号',
        width:150,
    },{
        props: 'partPrjType',
        name: '采购项目类型',
        key: 'PROJECT采购项目类型',
        width:150,
    },{
        props: 'ltcRate',
        name: '年降',
        key: 'PROJECT年降',
        width:150,
    },{
        props: 'firstAnnualPrice',
        name: '年降（SOP+1）',
        key: 'PROJECT年降SOP1',
        width:150,
    },{
        props: 'secondAnnualPrice',
        name: '年降（SOP+2）',
        key: 'PROJECT年降SOP2',
        width:150,
    },{
        props: 'thirdAnnualPrice',
        name: '年降（SOP+3）',
        key: 'PROJECT年降SOP3',
        width:150,
    },{
        props: 'modelBudget',
        name: '模具预算',
        key: 'PROJECT模具预算',
        width:150,
    },{
        props: 'nomiModelCost',
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