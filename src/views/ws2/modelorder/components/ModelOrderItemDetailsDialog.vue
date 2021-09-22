<template>
  <i-dialog :visible.sync='value' width='98%' :show-close='false' @close='closeDiolog'>
    <div class='d_title_content margin-bottom20'>
      <span class='d_title'>{{ $t('MODEL-ORDER.LK_XIANGCI') }}</span>
      <div class='d_right_content'>
        <iButton @click='saveOrderItemNums'>
          {{ $t('LK_QUEREN') }}
        </iButton>
        <i class='el-icon-error' @click='value = false'></i>
      </div>
    </div>
    <div>
      <i-form-group v-model='orderItemForm' row='1'>
        <el-row :gutter='20'>
          <el-col :span='6'>
            <i-form-item :label="$t('MODEL-ORDER.LK_RISEDINGDANHAO')">
              <i-text>{{ orderDetails.contractCode }}</i-text>
            </i-form-item>
          </el-col>
          <el-col :span='6'>
            <i-form-item :label="$t('MODEL-ORDER.LK_SAPDINGDANHAO')">
              <i-text>{{ orderDetails.contractSapCode }}</i-text>
            </i-form-item>
          </el-col>
          <el-col :span='6'>
            <i-form-item :label="$t('MODEL-ORDER.LK_DINGDANLEIXING')">
              <i-text>{{ orderType }}</i-text>
            </i-form-item>
          </el-col>
          <el-col :span='6'>
            <i-form-item :label="$t('LK_JIAOHUORIQI')">
              <i-date-picker v-model.trim='orderItemForm.deliveryDate' class='datapicker' placeholder='YYYY-MM-DD'
                             format='yyyy-MM-dd' value-format='yyyy-MM-dd' type='date' />
            </i-form-item>
          </el-col>
        </el-row>

        <el-row :gutter='20'>
          <el-col :span='6'>
            <i-form-item :label="$t('MODEL-ORDER.LK_XIANGCI')">
              <i-text>{{ orderItemForm.item }}</i-text>
            </i-form-item>
          </el-col>
          <el-col :span='6'>
            <i-form-item :label="$t('MODEL-ORDER.LK_MIAOSHU')">
              <i-text>{{ orderItemForm.partNum }}</i-text>
            </i-form-item>
          </el-col>
          <el-col :span='6'>
            <i-form-item :label="$t('LK_KEMU')">
              <i-text>{{ orderItemForm.subject }}</i-text>
            </i-form-item>
          </el-col>

          <el-col :span='6'>
            <i-form-item :label="$t('MODEL-ORDER.LK_CAIGOUGONGCHANG')">
              <i-text>{{ orderItemForm.procureFactory }}</i-text>
            </i-form-item>
          </el-col>
        </el-row>

        <el-row :gutter='20'>
          <el-col :span='6'>
            <i-form-item :label="$t('LK_LINGJIANLEIXING')">
              <i-text>{{ parTypeName }}</i-text>
            </i-form-item>
          </el-col>
          <el-col :span='6'>
            <i-form-item :label="$t('MODEL-ORDER.LK_JIAGE')">
              <i-text>{{ orderItemForm.price }}</i-text>
            </i-form-item>
          </el-col>
          <el-col :span='6'>
            <i-form-item :label="$t('LK_JILIANGDANWEI')">
              <i-text>{{ orderItemForm.partUnit }}</i-text>
            </i-form-item>
          </el-col>
          <el-col :span='6'>
            <i-form-item :label="$t('LK_SHULIANG')">
              <i-text>{{ orderItemForm.quantity }}</i-text>
            </i-form-item>
          </el-col>
        </el-row>

        <el-row :gutter='20'>
          <el-col :span='6'>
            <i-form-item :label="$t('LK_ZONGZHANGKEMU')">
              <i-input v-model.trim='orderItemForm.generalLedger' :placeholder="$t('partsprocure.PLEENTER')" />
            </i-form-item>
          </el-col>
          <el-col :span='6'>
            <i-form-item :label="$t('MODEL-ORDER.LK_WBSYUANSU')">
              <i-input v-model.trim='orderItemForm.wbs' :placeholder="$t('partsprocure.PLEENTER')" />
            </i-form-item>
          </el-col>
          <el-col :span='6'>
            <i-form-item :label="$t('LK_TONGJIDINGDAN')">
              <i-input :placeholder="$t('partsprocure.PLEENTER')" v-model.trim='orderItemForm.orderStatistics' />
            </i-form-item>
          </el-col>
          <el-col :span='6'>
            <i-form-item :label="$t('LK_CHENGBENZHONGXIN')">
              <i-input :placeholder="$t('partsprocure.PLEENTER')" v-model.trim='orderItemForm.costCenter' />
            </i-form-item>
          </el-col>
        </el-row>

        <el-row :gutter='20'>
          <el-col :span='6'>
            <i-form-item :label="$t('LK_CHENGBENKONGZHIYU')">
              <i-input :placeholder="$t('partsprocure.PLEENTER')" v-model.trim='orderItemForm.costControlField' />
            </i-form-item>
          </el-col>
          <el-col :span='6'>
            <i-form-item :label="$t('MODEL-ORDER.LK_LAIYUANRISEBIANHAO')">
              <i-text>{{ orderItemForm.itemSourceCode }}</i-text>
            </i-form-item>
          </el-col>
          <el-col :span='6'>
            <i-form-item :label="$t('MODEL-ORDER.LK_LAIYUANXIANGCI')">
              <i-text>{{ orderItemForm.itemSourceItem }}</i-text>
            </i-form-item>
          </el-col>
        </el-row>
      </i-form-group>
    </div>
  </i-dialog>

</template>

<script>
import { iDialog, iFormGroup, iFormItem, iText, iInput, iButton, iDatePicker } from 'rise'
import {getDictByCode} from "@/api/dictionary";
import {updatepurchaseOrderByOneItem} from "@/api/ws2/modelOrder";
export default {
  name: "ModelOrderItemDetailsDialog",
  components: {
    iDialog,
    iFormGroup,
    iFormItem,
    iText,
    iInput,
    iButton,
    iDatePicker
  },
  props: {
    value: { type: Boolean, default: false },
    orderItemForm: { type: Object },
    orderDetails: { type: Object },
    partTypeList: { type: Array }
  },
  computed: {
    orderType: function() {
      if (this.orderTypeList.length <= 0) {
        return ''
      }
      let orderTypeRes = this.orderTypeList.find((i) => i.code == this.orderDetails.contractType)
      return orderTypeRes == undefined ? this.orderDetails.contractType : orderTypeRes.name
    },
    parTypeName: function() {
      if (this.partTypeList.length <= 0) {
        return ''
      }
      if (this.orderItemForm == null || this.orderItemForm == '' || this.orderItemForm == undefined) {
        return ''
      }
      let partType = this.partTypeList.find((i) => i.code == this.orderItemForm.partType)
      return partType == undefined ? '' : partType.name
    }
  },
  data() {
    return {
      orderTypeList: []
    }
  },
  methods: {

    //关闭对话框
    closeDiolog() {
      this.$emit('input', false)
    },
    //查询订单类型
    queryOrderTypeList() {
      getDictByCode('pp_purchase_order_contract_type').then((res) => {
        if (res.code == 200) {
          this.orderTypeList = res?.data[0]?.subDictResultVo
        }
      })
    },
    //保存订单项次修改
    saveOrderItemNums() {
      let data = {
        costCenter: this.orderItemForm.costCenter, //成本中心
        costControlField: this.orderItemForm.costControlField, //成本控制域
        deliveryDate: this.orderItemForm.deliveryDate, //收货时间
        generalLedger: this.orderItemForm.generalLedger, //总帐科目
        id: this.orderItemForm.id, //项次编号
        orderStatistics: this.orderItemForm.orderStatistics, //统计订单
        wbs: this.orderItemForm.wbs //WBS
      }
      updatepurchaseOrderByOneItem(data).then((res) => {
        if (res.code == 200) {
          this.$message.success(res.desZh)
          this.$emit('onRefrsh')
        } else {
          this.$message.error(res.desZh)
        }
        this.value = false
      })
    }
  }
}
</script>
<style scoped lang="scss">
.d_title {
  height: 25px;
  font-size: 18px;
  font-family: Arial;
  font-weight: bold;
  line-height: 21px;
  color: #000000;
  opacity: 1;
}

.d_title_content {
  flex: 1;
  display: flex;
  justify-content: space-between;
}

.el-icon-error {
  margin-left: 20px;
  font-size: 30px;
  color: #a0bffc;
}
</style>