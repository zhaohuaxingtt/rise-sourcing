//模具订单首页表格数据配置
import RiseContractCodeComponents from "../components/RiseContractCodeComponents";
import SapSendStatusCompomemts from "../components/SapSendStatusCompomemts";
import LinkPurchaseOrderComponent from "../Details/components/LinkPurchaseOrderComponent";
import CustomRenderPriceComponents from "../Details/components/CustomRenderPriceComponents";
import ReceiptLocationComponents from "../Details/components/ReceiptLocationComponents";

export const MODEL_ORDER_HOME_TABCOLUMNS = [
    {
        type: 'selection',
        width: 50,
    },
    {
        prop: 'index',
        align: 'left',
        label: '',
        type: 'expanded',
    },
    {
        prop: 'contractCode',
        label: 'RiSE订单号',
        i18n: 'MODEL-ORDER.LK_RISEDINGDANHAO',
        tooltip: true,
        headerAlign: 'center',
        align: 'center',
        emit: 'open-page',
        width: 120,
        customRender: (h, scope, column) => {
            return <RiseContractCodeComponents row={scope.row}/>
        },
    },
    {
        prop: 'contractSapCode',
        label: 'SAP订单号',
        i18n: 'LK_SAPDINGDANHAO',
        tooltip: true,
        headerAlign: 'center',
        align: 'center',
        width: 120,
    },
    {
        prop: 'version',
        label: '版本',
        i18n: 'LK_BANBENHAO',
        tooltip: false,
        headerAlign: 'center',
        align: 'center',
    },
    {
        prop: 'state',
        label: '订单状态',
        tooltip: false,
        i18n: 'MODEL-ORDER.LK_DINGDANZHUANGTAI',
        headerAlign: 'center',
        align: 'center',
        /*   customRender: (h, scope, extraData) => {
            /!* let orderStatus=this.orderStatusList.find((i) => i.code ==scope.row['state'])
             return <span>{(orderStatus==null||orderStatus==undefined)?scope.row['state']:orderStatus.name} </span>*!/

           },*/
    },
    {
        prop: 'procureFactory',
        label: '采购工厂',
        i18n: 'LK_CAIGOUGONGCHANG',
        tooltip: true,
        headerAlign: 'center',
        align: 'center',
        width: 100
    },
    {
        prop: 'supplierSapCode',
        label: '供应商',
        i18n: 'MODEL-ORDER.LK_GONGYINSHANG',
        tooltip: true,
        headerAlign: 'center',
        align: 'center',
        customRender: (h, scope) => {
            return <span>{scope.row['supplierSapCode']}-{scope.row['supplierShortNameZh']}</span>
        },
    },
    {
        prop: 'departmentCode',
        label: '科室',
        i18n: 'LK_KESHI',
        tooltip: true,
        headerAlign: 'center',
        align: 'center',
    },
    {
        prop: 'procureGroup',
        label: '采购组-采购员',
        i18n: 'MODEL-ORDER.LK_CAIGOUZUCAIGOUYUAN',
        tooltip: true,
        headerAlign: 'center',
        align: 'center',
        customRender: (h, scope) => {
            return <span> {scope.row['procureGroup']}-{scope.row['buyerName']}</span>
        },

    },
    {
        prop: 'sapSendStatus',
        label: 'SAP发送状态',
        i18n: 'MODEL-ORDER.LK_SAPFASONGZHUANGTAI',
        tooltip: false,
        headerAlign: 'center',
        align: 'center',
        width: 95,
        customRender: (h, scope) => {
            return <SapSendStatusCompomemts row={scope.row}/>
        }
    },
    {
        prop: 'contractStatus',
        label: '合同状态',
        i18n: 'MODEL-ORDER.LK_HETONGZHUANGTAI',
        tooltip: false,
        headerAlign: 'center',
        align: 'center',
        width: 95,
        /*customRender: (h, scope) => {
        contractRemark 描述
          return <SapSendStatusCompomemts row={scope.row} />
        }*/
    },
    {
        prop: 'orderDate',
        label: '订单日期',
        i18n: 'MODEL-ORDER.LK_DINGDANRIQI',
        tooltip: false,
        headerAlign: 'center',
        align: 'center',
    },
    {
        prop: 'orderDate',
        label: '订单日期',
        i18n: 'MODEL-ORDER.LK_DINGDANRIQI',
        tooltip: false,
        headerAlign: 'center',
        align: 'center',
    },
    {
        prop: 'orderDate',
        label: '订单日期',
        i18n: 'MODEL-ORDER.LK_DINGDANRIQI',
        tooltip: false,
        headerAlign: 'center',
        align: 'center',
    },
]

export const MODEL_ORDER_DETAILS_ITEMSCOLUMNS = [
    {
        type: 'selection',
        width: 50,
    },
    {
        prop: 'item',
        label: '项次',
        i18n: 'LK_XIANGCI',
        tooltip: false,
        emit: 'open-page',
        headerAlign: 'center',
        align: 'center',
        customRender: (h, scope, column, extraData) => {
            //extraData.partTypeList.find((i) => i.code == scope.row["partType"]).name
            return <LinkPurchaseOrderComponent content={scope.row["item"]} isEdit={extraData.isEdit}/>
            //return extraData.isEdit?(<span> {scope.row["item"]} </span>):<span className='open-link-text'>{scope.row["item"]}</span>
        },
    },
    {
        prop: 'partNameZh',
        label: '描述',
        i18n: 'MODEL-ORDER.LK_MIAOSHU',
        tooltip: false,
        headerAlign: 'center',
        align: 'center',
    },
    {
        prop: 'partNameZh',
        label: '模具台账',
        i18n: 'MODEL-ORDER.LI_MOJUTAIZHANG',
        tooltip: false,
        headerAlign: 'center',
        align: 'center',
        emit: 'go-ledger',
        customRender: (h, scope, column, extraData) => {
            //extraData.partTypeList.find((i) => i.code == scope.row["partType"]).name
            return <LinkPurchaseOrderComponent content={scope.row["partNameZh"]} isEdit={extraData.isEdit}/>
            //return extraData.isEdit?(<span> {scope.row["item"]} </span>):<span className='open-link-text'>{scope.row["item"]}</span>
        },
    },
    {
        prop: 'quantity',
        label: '数量',
        i18n: 'LK_SHULIANG',
        tooltip: false,
        headerAlign: 'center',
        align: 'center',
    },
    {
        prop: 'partUnit',
        label: '计量单位',
        i18n: 'LK_JILIANGDANWEI',
        tooltip: false,
        headerAlign: 'center',
        align: 'center',
    },
    {
        prop: 'price',
        label: '价格',
        i18n: 'MODEL-ORDER.LK_JIAGE',
        tooltip: false,
        headerAlign: 'center',
        align: 'center',
        customRender: (h, scope, column, extraData) => {
            return <CustomRenderPriceComponents price={scope.row.price}/>
        }
    },
    {
        prop: 'grIr',
        label: 'GR/IR',
        i18n: 'MODEL-ORDER.LK_GR/IR',
        tooltip: false,
        emit: 'open-grIr',
        headerAlign: 'center',
        align: 'center',
        customRender: (h, scope, column, extraData) => {
            let grIr = scope.row['grIr']
            let isEdit = extraData.isEdit
            let sapcode = extraData.orderDetails.contractSapCode
            if (sapcode) {
                return isEdit ? (<span>{grIr == null ? '0/0' : grIr}</span>) : (
                    <span class='open-link-text'>{grIr == null ? '0/0' : grIr}</span>)
            } else {
                return (<span>{grIr == null ? '0/0' : grIr}</span>)

            }
        }
    },
    {
        prop: 'deliveryDate',
        label: '交货日期',
        i18n: 'LK_JIAOHUORIQI',
        tooltip: false,
        headerAlign: 'center',
        align: 'center',
        width: 150,
    },
    {
        prop: 'inventoryLocation',
        label: '库存地点',
        i18n: 'MODEL-ORDER.LK_KUCUNDIDIAN',
        tooltip: true,
        headerAlign: 'center',
        align: 'center',
        width: 150,
        customRender: (h, scope, column, extraData) => {
            return <ReceiptLocationComponents stockLocations={extraData.stockLocations} row={scope.row}
                                              isEdit={extraData.isEdit}/>
        },

    },
    {
        prop: 'deliveryDate',
        label: '原固资编号',
        i18n: 'MODEL-ORDER.LK_YUANGUZIBIANHAO',
        tooltip: false,
        headerAlign: 'center',
        align: 'center',
        width: 150,
    },
]