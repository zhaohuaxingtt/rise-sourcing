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
  </i-card>

</template>

<script>
import {
  iCard,
  iButton
} from 'rise'
import iTableCustom from '@/components/iTableCustom'
import {MODEL_ORDER_DETAILS_ITEMSCOLUMNS} from "../../config/data";

export default {
  name: "ModelOrderDetailsBottomComponents",
  components: {
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
      extraData: {},

    }
  },
  methods: {
    //参照采购申请
    referPurchaseRequisitionClick() {

    },
    //删除项次
    deleteOrderItems() {

    },
    //恢复项次
    recoveryItemByPagePurchaseOrder() {

    },
    //读取价格
    readPriceOrder() {

    },
    //点击项次
    openPage(row) {
      /* this.orderItemForm = row
       this.purchaseOrderItemDetailsIsVisible = true*/
    },
    handleSelectionChange(row) {
      //this.selectOrderItemData = row
    },
    //模具台账
    goLedger(item) {

    },
    openGrIr(item) {

    },
    tableRowClassName({row, rowIndex}) {
      if (row.isDelete) {
        return 'warning-row'
      } else {
        return ''
      }
    }
  }
}
</script>

<style scoped>

</style>