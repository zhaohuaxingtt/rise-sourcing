<template>
  <i-card class='margin-top20 margin-bottom20'>
    <div class='floatright margin-bottom20'>
      <iButton v-if='editBtnGroupShow' @click='referPurchaseRequisitionClick'>
        {{ $t('MODEL-ORDER.LK_CANZHAOCAIGOUSHENQING') }}
      </iButton>
      <iButton v-if='editBtnGroupShow' @click='deleteOrderItems' v-loading.fullscreen.lock='fullscreenLoading'>
        {{ $t('MODEL-ORDER.LK_SHANCHUXIANGCI') }}
      </iButton>
      <iButton v-if='editBtnGroupShow' @click='recoveryItemByPagePurchaseOrder'
               v-loading.fullscreen.lock='fullscreenLoading'>{{ $t('MODEL-ORDER.LK_HUIFUXIANGCI') }}
      </iButton>
      <iButton v-if='priceSelGroupShow' @click='readPriceOrder' v-loading.fullscreen.lock='fullscreenLoading'>
        {{ $t('MODEL-ORDER.LK_DUQUJIAGE') }}
      </iButton>
    </div>
    <div class='table'>
      <iTableCustom ref='orderTable' :row-class-name='tableRowClassName' :columns='orderItemColumns'
                    :data='orderItemData' :extraData='extraData' @handle-selection-change='handleSelectionChange'
                    @open-page='openPage' @goLedger='goLedger' @open-grIr='openGrIr'></iTableCustom>
    </div>

    <ModelByPurchaseRequisitionDialog v-if="referPurchaseRequisitionisVisible" v-model="referPurchaseRequisitionisVisible" :order-details="orderDetails" @selectPurchaseOrderTableData='selectPurchaseOrderTableData'  />

    <!--点击项次对话框-->
    <ModelOrderItemDetailsDialog v-if="purchaseOrderItemDetailsIsVisible" v-model='purchaseOrderItemDetailsIsVisible' :orderItemForm='orderItemForm' :orderDetails='orderDetails' :partTypeList='partTypeList'  @onRefrsh="queryOrderItemList"  />
    <!--GRIR对话框-->
    <GeneralOrderGRIRDialog v-if="purchaseOrderGrIrSelIsVisible" v-model='purchaseOrderGrIrSelIsVisible' :clickItemData="orderItemForm" :detailInfo="orderDetails"/>
  </i-card>

</template>

<script>
import {
  iCard,
  iButton,
  iMessageBox
} from 'rise'
import iTableCustom from '@/components/iTableCustom'
import {MODEL_ORDER_DETAILS_ITEMSCOLUMNS} from "../../config/data";
import {getPurchaseOrderLineList,inventoryLocation,
  readByPurchaseOrderPrice,recoveryItemByPurchaseOrder,
  deleteItemByPurchaseOrder} from "@/api/ws2/modelOrder";
import ModelByPurchaseRequisitionDialog from "../../components/ModelByPurchaseRequisitionDialog";
import {getDictByCode} from "@/api/dictionary";
import ModelOrderItemDetailsDialog from "../../components/ModelOrderItemDetailsDialog";

export default {
  name: "ModelOrderDetailsBottomComponents",
  components: {
    ModelOrderItemDetailsDialog,
    ModelByPurchaseRequisitionDialog,
    iCard,
    iButton,
    iTableCustom
  },
  props: {
    id: {type: Number, default: -1},
    orderDetails: Object,
    isEdit: {type: Boolean, default: true},
    containPurchaseGroup: {type: Boolean, default: false}
  },
  computed: {
    editBtnGroupShow: function () {
      if (null != this.orderDetails && this.orderDetails != undefined) {
        if (this.orderDetails.state == 'draft') {
          return this.containPurchaseGroup && this.isEdit
        }
        return false
      }
      return false
    },
    //价格选择组
    priceSelGroupShow: function () {
      if (null != this.orderDetails && this.orderDetails != undefined) {
        if (this.orderDetails.state == 'draft') {
          return this.containPurchaseGroup && !this.isEdit
        }
        return false
      }
      return false

    },
  },
  data() {
    return {
      fullscreenLoading: false,
      orderItemColumns: MODEL_ORDER_DETAILS_ITEMSCOLUMNS,
      orderItemData: [],
      selectOrderItemData: [],//选中数据
      extraData: {},
      purchaseOrderItemDetailsIsVisible: false,
      referPurchaseRequisitionisVisible: false,
      purchaseOrderGrIrSelIsVisible: false,
      orderItemForm:{},
      partTypeList: [],//零件类型

    }
  },
  created() {
    this.queryOrderItemList()
    this.queryInventoryLocation()
    this.queryPartType()
  },
  methods: {
    //查询采购订单
    queryOrderItemList() {
      let data = { orderId: this.orderDetails.id }
      getPurchaseOrderLineList(data).then(res => {
        if (res.code == 200) {
          this.orderItemData = res.data
        }
      })
    },
    //获取零件类型字典
    queryPartType() {
      getDictByCode('PT')
          .then((res) => {
            if (res.code == 200) {
              this.partTypeList = (res?.data[0]?.subDictResultVo)
              this.extraData.partTypeList = this.partTypeList
            }
          })
    },
    //查询库存地点
    queryInventoryLocation() {
      let data = { procureFactory: this.orderDetails.procureFactory }
      inventoryLocation(data).then(res => {
        this.extraData.stockLocations = res.data
      })
    },
    //参照采购申请
    referPurchaseRequisitionClick() {
      this.referPurchaseRequisitionisVisible = true
    },
    selectPurchaseOrderTableData(selTableData) {
      if (selTableData instanceof Array && selTableData.length > 0) {
        // let item = (this.itemnum += 10);
        let newArray = selTableData.map((item) => {
          return {
            partNum: item.partNum,//零件号
            partNameZh: item.partNameZh,//零件名
            partType: item.partType,//零件类型
            subject: item.account,//科目
            quantity: item.quantity,//数量
            partUnit: item.unitCode,//计量单位
            priceUnit: item.currency,//价格单位
            deliveryDate: item.deliveryDate,//交货日期
            inventoryLocation: item.storageLocationCode,//库存地点
            tmPartInfoId: item.id,//零件id
            itemSource: '2',//来源
            itemSourceCode: item.riseCode,
            itemSourceItem: item.sapItem.toString(),
            isSparePart: item.isSparePart,
            fromContractCode: '',
            price: item.price
          }
        })
        let newList = newArray.filter(item => !this.orderItemData.some(x => x.partNum === item.partNum))//去除重复零件号
        let duplicateCollectionList = newArray.filter(item => this.orderItemData.some(x => x.partNum === item.partNum))
        if (newList != null && newList.length > 0) {
          this.$message.success('添加成功')
          this.orderItemData.unshift(...newList)
          this.orderItemData = this.orderItemData.map((k, i) => {
            k.index = i
            return k
          })
        } else {
          if (duplicateCollectionList != null && duplicateCollectionList.length > 0 && duplicateCollectionList != undefined) {
            duplicateCollectionList.forEach((item) => {
              this.$message.error(`项次[${item.itemSourceItem}]零件[${item.partNum}]的采购申请已经被参照，无法保存`)
            })
          }
        }
      }
    },
    //删除项次
    deleteOrderItems() {
      if (this.selectOrderItemData.length <= 0) return this.$message.error('请选中要删除的项次')
      iMessageBox(
          '请确认是否删除选中项次', // 暂时处理
          this.$t('LK_WENXINTISHI'),
          {
            confirmButtonText: this.$t('LK_QUEDING'),
            cancelButtonText: this.$t('LK_QUXIAO')
          }
      ).then(async () => {
        let selNewAddItem = this.selectOrderItemData.filter(item => (item.id == null || item.id == '' || item.id == undefined))
        let selByIdNet = this.selectOrderItemData.filter(item => item.id)
        if (selNewAddItem != null && selNewAddItem.length > 0) {
          this.orderItemData = this.orderItemData.filter(a => !selNewAddItem.some(b => b.partNum == a.partNum))
        }
        if (selByIdNet != null && selByIdNet.length > 0) {
          let itemIdList = selByIdNet.map((i) => i.id)
          this.fullscreenLoading = true
          deleteItemByPurchaseOrder(itemIdList).then(res => {
            this.fullscreenLoading = false
            if (res.code == 200) {
              this.$message.success(res.desZh)
              this.queryOrderItemList()
            } else {
              this.$message.error(res.desZh)
            }
          })
        }

      })
    },
    //恢复项次
    recoveryItemByPagePurchaseOrder() {
      if (this.selectOrderItemData.length <= 0) return this.$message.error('请选中要恢复得项次')
      let itemIdList = this.selectOrderItemData.map((i) => i.id)
      this.fullscreenLoading = true
      recoveryItemByPurchaseOrder(itemIdList).then(res => {
        this.fullscreenLoading = false
        if (res.code == 200) {
          this.queryOrderItemList()
          this.$message.success(res.desZh)
        } else {
          this.$message.error(res.desZh)
        }
      })
    },
    //读取价格
    readPriceOrder() {
      let params = { orderId: this.orderDetails.id }
      this.fullscreenLoading = true
      readByPurchaseOrderPrice(params).then(res => {
        this.fullscreenLoading = false
        if (res.code == 200) {
          if (res.data != null && res.data != '' && res.data != undefined) {
            this.$message.warning(res.data)
          }
        } else {
          this.$message({
            dangerouslyUseHTMLString: true,
            message: res.desZh.replace(/\n|\r\n/g, ' <br/> '),
            type: 'error'
          })
        }
        this.queryOrderItemList()
      })
    },
    //点击项次
    openPage(row) {
       this.orderItemForm = row
       this.purchaseOrderItemDetailsIsVisible = true
    },
    handleSelectionChange(row) {
      this.selectOrderItemData = row
    },
    //模具台账
    goLedger(item) {

    },
    openGrIr(item) {
      if (this.orderDetails.contractSapCode) {
        this.orderItemForm = item
      }
      this.purchaseOrderGrIrSelIsVisible = true
    },
    getOrderItemData() {
      return this.orderItemData
    },
    tableRowClassName({row, rowIndex}) {
      if (row.isDelete) {
        return 'warning-row'
      } else {
        return ''
      }
    },
    //删除项次后刷新
    refreshPageData() {
      let sapCode = this.orderDetails.contractSapCode
      if (sapCode != null && sapCode != '' && sapCode != undefined) {//逻辑删除
        this.orderItemData.forEach(item => {
          let isInclude = this.selectOrderItemData.some(it => {
            return it.partNum === item.partNum
          })
          if (isInclude) {
            item.isDelete = true
          }
        })
      } else {//物理删除
        this.orderItemData = [...this.orderItemData].filter(x => [...this.selectOrderItemData].every(y => y.partNum !== x.partNum))
      }
      this.orderItemData = this.orderItemData.map((k, i) => {
        k.index = i
        return k
      })
    },
  }
}
</script>

<style scoped>

</style>