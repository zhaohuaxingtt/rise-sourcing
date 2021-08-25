<template>
  <i-card :title="$t('LK_JICHUXINXI')" class='margin-top20' collapse :defalutCollVal='true'>
    <i-form-group :model='orderDetails' :rules='orderDetailsRules' ref='orderDetailsRef' row='1'>
      <!--第一行-->
      <el-row :gutter='20'>
        <el-col :span='6'>
          <!--订单类型-->
          <i-form-item :label="$t('MODEL-ORDER.LK_DINGDANLEIXING')" prop='contractType'>
            <i-text >{{ orderType }}</i-text>
          </i-form-item>
        </el-col>
        <el-col :span='6'>
          <!--RISE订单号-->
          <i-form-item :label="$t('MODEL-ORDER.LK_RISEDINGDANHAO')">
            <i-text>{{ orderDetails.contractCode }}</i-text>
          </i-form-item>
        </el-col>
        <el-col :span='6'>
          <!--SAP订单号-->
          <i-form-item :label="$t('MODEL-ORDER.LK_SAPDINGDANHAO')">
            <i-text>{{ orderDetails.contractSapCode }}</i-text>

          </i-form-item>
        </el-col>
        <el-col :span='6'>

        </el-col>
      </el-row>
      <!--第二行-->

      <el-row :gutter='20'>
        <el-col :span='6'>
          <!--供应商-->
          <i-form-item :label="$t('MODEL-ORDER.LK_GONGYINSHANG')" prop='supplierInfo'>
            <i-text v-if='generalEditorState'>{{ orderDetails.supplierSapCode }}</i-text>
            <i-input v-else :placeholder="$t('MODEL-ORDER.LK_QINGSHURUGONGYINGSHANGBIANMA')"
                     v-model.trim='orderDetails.supplierInfo'
                     @blur='querySupplierInfoAsync(orderDetails.supplierInfo)' :disabled='generalEditorState' />
          </i-form-item>
        </el-col>
        <el-col :span='6'>
          <!--采购组-->
          <i-form-item :label="$t('MODEL-ORDER.LK_CAIGOUZU')" prop='procureGroup'>
            <i-input v-if='purchasingGroupEditerState' :placeholder="$t('MODEL-ORDER.LK_QINGSHURUCAIGOUZU')" v-model.trim='procureGroupComputed'/>
            <i-text v-else>{{ procureGroupComputed }}</i-text>
          </i-form-item>
        </el-col>
        <el-col :span='6'>
          <!--采购员-->
          <i-form-item :label="$t('MODEL-ORDER.LK_CAIGOUYUAN')" prop='buyerName'>
            <i-text>{{ orderDetails.buyerName }}</i-text>
          </i-form-item>
        </el-col>
        <el-col :span='6'>
          <!--订单状态-->
          <i-form-item :label="$t('MODEL-ORDER.LK_DINGDANZHUANGTAI')" prop='state'>
            <i-text>{{ orderState }}</i-text>
          </i-form-item>
        </el-col>
      </el-row>
      <!--第三行-->
      <el-row :gutter='20'>
        <el-col :span='6'>
          <!--采购工厂-->
          <i-form-item :label="$t('MODEL-ORDER.LK_CAIGOUGONGCHANG')" prop='procureFactory'>
            <i-text v-if='generalEditorState'>{{ orderDetails.procureFactory }}</i-text>
            <i-select v-else v-model.trim='orderDetails.procureFactory'
                      :placeholder="$t('MODEL-ORDER.LK_QINGXUANZECAIGOUGONGCHANG')"
                      @change='factorySelectChanged' :disabled='generalEditorState'>
              <el-option v-for='(item, index) in purchasingFactoryList' :value='item.procureFactory'
                         :label='`${item.procureFactory}-${item.factoryName}`' :key='index'></el-option>
            </i-select>
          </i-form-item>
        </el-col>

        <el-col :span='6'>
          <!--订单日期-->
          <i-form-item :label="$t('MODEL-ORDER.LK_DINGDANRIQI')" name='test' prop='orderDate'>
            <i-text v-if='generalEditorState'>{{ orderDetails.orderDate }}</i-text>
            <i-date-picker
                v-else
                type='date'
                v-model.trim='orderDetails.orderDate'
                format='yyyy-MM-dd'
                value-format='yyyy-MM-dd'
                placeholder='YYYY-DD-MM'
                :disabled='generalEditorState'
            />
          </i-form-item>
        </el-col>
        <el-col :span='6'>
          <!--所属部门-->
          <i-form-item :label="$t('MODEL-ORDER.LK_SUOSHUBUMEN')">
            <i-text>{{ orderDetails.departmentCode }}</i-text>
          </i-form-item>
        </el-col>
        <el-col :span='6'>
          <!--版本-->
          <i-form-item :label="$t('MODEL-ORDER.LK_BANBEN')">
            <i-text>{{ orderDetails.version }}</i-text>
          </i-form-item>
        </el-col>
      </el-row>
      <!--第四行-->
      <el-row :gutter='20'>
        <el-col :span='6'>
          <!--公司代码-->
          <i-form-item :label="$t('MODEL-ORDER.LK_GONGSHIDAIMA')">
            <i-text>{{ orderDetails.companyCode }}</i-text>
          </i-form-item>
        </el-col>
        <el-col :span='6'>
          <!--货币-->
          <i-form-item :label="$t('LK_HUOBI')" prop='currency'>
            <i-text>{{ orderDetails.currency }}</i-text>
          </i-form-item>
        </el-col>
        <!--采购组织-->
        <el-col :span='6'>
          <i-form-item :label="$t('MODEL-ORDER.LK_CAIGOUZUZHI')">
            <i-text>{{ orderDetails.procureOrganization }}</i-text>
          </i-form-item>
        </el-col>
        <!--付款条件-->
        <el-col :span='6'>
          <i-form-item :label="$t('MODEL-ORDER.LK_FUKUANTIAOJIAN')">
            <i-text> {{ orderDetails.paymentCode }}</i-text>
          </i-form-item>
        </el-col>
      </el-row>
      <!--第五行-->
      <el-row>
        <el-col :span='24'>
          <!--备注-->
          <i-form-item :label="$t('LK_BEIZHU')">
            <i-text v-if='inputRemarksEditerState'>{{ orderDetails.remark }}</i-text>
            <i-input v-else :placeholder="$t('partsprocure.PLEENTER')" v-model.trim='orderDetails.remark'
                     :disabled='inputRemarksEditerState' />
          </i-form-item>
        </el-col>
      </el-row>
    </i-form-group>
  </i-card>
</template>

<script>
import {
  iCard,
  iFormGroup,
  iFormItem,
  iText,
  iInput,
  iDatePicker,
  iSelect
} from 'rise'
export default {
  name: "ModelOrderDetailsTopComponents",
  components:{
    iCard,
    iFormGroup,
    iFormItem,
    iSelect,
    iText,
    iInput,
    iDatePicker
  },
  props: {
    orderDetails: { type: Object, require: true },
    id: { type: Number, default: -1 },
    isEdit: { type: Boolean, default: true },
    option: { type: Number, default: 0 },
    purchasingFactoryList: { type: Array, default: () => [] },
    orderStatusList: { type: Array, default: () => [] },
    containPurchaseGroup: { type: Boolean, default: false }
  },
  computed:{
    //通用状态
    generalEditorState: function() {
      return this.option == 1 ? true : false
    },
    //构建订单状态值
    orderState: function() {
      if (this.orderStatusList.length <= 0) {
        return ''
      }
      return this.orderStatusList.find((i) => i.code === this.orderDetails.state).name
    },
    //备注编辑状态
    inputRemarksEditerState: function() {
      if (this.option == 0) {//创建模式 可编辑
        return false
      }

      if (this.orderDetails.state == 'draft' || this.orderDetails.state == 'formal') {//草稿和正式可编辑
        if (this.containPurchaseGroup) {
          return !this.isEdit
        }
        return true
      }
      return true //历史状态不可编辑
    },
    //订单类型
    orderType: function() {

      return 'DB订单'
    },
    procureGroupComputed: {
      get: function() {
        return this.orderDetails.procureGroup
      },
      set: function(val) {
        this.orderDetails.procureGroup = val.toUpperCase()
      }
    }
  },
  data(){
    return {
      purchasingGroupEditerState:false,
    }
  }
}
</script>

<style scoped>

</style>