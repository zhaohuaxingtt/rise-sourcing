<template>
  <i-search  class='margin-bottom10 margin-top10' @sure='queryOrder' @reset='resetQueryForm' :hidens='true'
             :resetKey='PARTSPROCURE_RESET' :searchKey='PARTSPROCURE_CONFIRM'>
    <el-form :model='orderQueryForm' ref='orderQueryFormRef'>
      <!--RISE订单号-->
      <el-form-item :label="$t('MODEL-ORDER.LK_RISEDINGDANHAO')" prop='contractCode'>
        <i-input :placeholder="$t('partsignLanguage.QingShuRu')"
                 v-model.trim='orderQueryForm.contractCode'></i-input>
      </el-form-item>
      <!--SAP订单号-->
      <el-form-item :label="$t('MODEL-ORDER.LK_SAPDINGDANHAO')" prop='contractSapCode'>
        <i-input :placeholder="$t('partsignLanguage.QingShuRu')"
                 v-model.trim='orderQueryForm.contractSapCode'></i-input>
      </el-form-item>
      <!--供应商-->
      <el-form-item :label="$t('MODEL-ORDER.LK_GONGYINSHANG')" prop='supplierSapCode'>
        <i-input :placeholder="$t('partsignLanguage.QingShuRu')"
                 v-model.trim='orderQueryForm.supplierSapCode'></i-input>
      </el-form-item>
      <!--采购工厂-->
      <el-form-item :label="$t('MODEL-ORDER.LK_CAIGOUGONGCHANG')" prop='procureFactory'>
        <i-select :placeholder="$t('partsignLanguage.QingXuanZe')"
                  v-model.trim='orderQueryForm.procureFactory'>
          <el-option value='' :label="$t('all') | capitalizeFilter"></el-option>
          <el-option v-for='(item, index) in purchasingFactoryList' :value='item.procureFactory'
                     :label='`${item.procureFactory}-${item.factoryName}`' :key='index'></el-option>
        </i-select>
      </el-form-item>
      <!--零件号-->
      <el-form-item :label="$t('MODEL-ORDER.LK_LINGJIANHAO')" prop='partNum'>
        <i-input :placeholder="$t('partsignLanguage.QingShuRu')"
                 v-model.trim='orderQueryForm.partNum'></i-input>
      </el-form-item>
      <!--采购组-->
      <el-form-item :label="$t('MODEL-ORDER.LK_CAIGOUZU')" prop='procureGroup'>
        <i-input :placeholder="$t('partsignLanguage.QingShuRu')"
                 v-model.trim='orderQueryForm.procureGroup'></i-input>
      </el-form-item>

      <!--采购员-->
      <el-form-item :label="$t('MODEL-ORDER.LK_CAIGOUYUAN')" prop='buyerName'>
        <i-input :placeholder="$t('partsignLanguage.QingShuRu')"
                 v-model.trim='orderQueryForm.buyerName'></i-input>
      </el-form-item>
      <!--订单状态-->
      <el-form-item :label="$t('MODEL-ORDER.LK_DINGDANZHUANGTAI')" prop='state'>
        <iSelect :placeholder="$t('partsignLanguage.QingXuanZe')" v-model.trim='orderQueryForm.state'>
          <el-option value='' :label="$t('all') | capitalizeFilter"></el-option>
          <el-option v-for='(item, index) in orderStatusList' :key='index' :value='item.code' :label='item.name' />
        </iSelect>
      </el-form-item>
      <!--SAP发送状态-->
      <el-form-item :label="$t('MODEL-ORDER.LK_SAPFASONGZHUANGTAI')" prop='sapSendStatus'>
        <iSelect :placeholder="$t('partsignLanguage.QingXuanZe')"
                 v-model.trim='orderQueryForm.sapSendStatus'>
          <el-option value='' :label="$t('all') | capitalizeFilter"></el-option>
          <el-option v-for='(item, index) in sapSendStatusList' :key='index' :value='item.code' :label='item.name' />
        </iSelect>
      </el-form-item>
      <!--合同状态-->
      <el-form-item :label="$t('MODEL-ORDER.LK_HETONGZHUANGTAI')" prop='sapSendStatus'>
        <iSelect :placeholder="$t('partsignLanguage.QingXuanZe')"
                 v-model.trim='orderQueryForm.contractStatus'>
          <el-option value='' :label="$t('all') | capitalizeFilter"></el-option>
          <el-option v-for='(item, index) in contractStatusList' :key='index' :value='item.code' :label='item.name' />
        </iSelect>
      </el-form-item>
    </el-form>

  </i-search>
</template>

<script>
import { iInput, iSelect, iSearch } from 'rise'
export default {
  name: "ModelOrderSeachComponents",
  components:{
    iInput,
    iSelect,
    iSearch,
  },
  props:{
    orderQueryForm:{ type: Object, require: true,default:null },
    purchasingFactoryList:{type:Array,require: true,default:()=>[]},
    orderStatusList:{type:Array,require:true,default:()=>[]},
    sapSendStatusList:{type:Array,require:true,default:()=>[]},
    contractStatusList:{type:Array,require:true,default:()=>[]},
  },
  methods:{
    queryOrder() {
      this.$emit('queryOrder', this.orderQueryForm)
    },
    resetQueryForm() {
      this.$refs.orderQueryFormRef.resetFields()
      this.orderQueryForm.state = ''
      //this.queryOrder()
    }

  }
}
</script>

<style scoped>

</style>