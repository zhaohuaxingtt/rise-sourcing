<template>
  <i-dialog :visible.sync='value' :title="$t('MODEL-ORDER.LK_CANZHAOCAIGOUSHENQING')" width='98%' @close='clearDiolog'>
    <i-search class='margin-bottom10 margin-top20' @sure='btnQueryPurchaseRequisition' @reset='resetQueryForm'
              :resetKey='PARTSPROCURE_RESET' :searchKey='PARTSPROCURE_CONFIRM'>
      <el-form :model='purchaseRequisitionQueryForm' ref='purchaseRequisitionQueryFormRef'>
        <!--SAP编号-->
        <el-form-item :label="$t('MODEL-ORDER.LK_SAPBIANHAO')" prop='sapCode'>
          <i-input :placeholder="$t('partsignLanguage.QingShuRu')"
                   v-model.trim='purchaseRequisitionQueryForm.sapCode'></i-input>
        </el-form-item>
        <!--零件号-->
        <el-form-item :label="$t('LK_LINGJIANHAO')" prop='partNumStr'>
          <i-input :placeholder="$t('partsignLanguage.QingShuRu')"
                   v-model.trim='purchaseRequisitionQueryForm.partNumStr'></i-input>
        </el-form-item>
        <!--期望供应商-->
        <el-form-item :label="$t('MODEL-ORDER.LK_QIWANGGONGYINGSHANG')">
          <i-text>{{ orderDetails.supplierSapCode }}</i-text>
        </el-form-item>
        <!--采购申请类型-->
        <el-form-item :label="$t('MODEL-ORDER.LK_CAIGOUSHENQINGLEIXING')" prop='subType'>
          <i-select :placeholder="$t('partsignLanguage.QingXuanZe')"
                    v-model.trim='purchaseRequisitionQueryForm.subType'>
            <el-option value='' :label="$t('LK_ALL') | capitalizeFilter"></el-option>
            <el-option value='42' :label="$t('MODEL-ORDER.LK_MOJUCAIGOUSHENQING')"></el-option>
            <el-option value='43' :label="$t('MODEL-ORDER.LK_YUPILIANGCAIGOUSHENQING')"></el-option>
            <el-option value='45' :label="$t('MODEL-ORDER.LK_BIAOZHUNCAIGOUSHENQING')"></el-option>
            <el-option value='411' :label="$t('MODEL-ORDER.LK_GONGXUWEIWAI')"></el-option>
          </i-select>
        </el-form-item>
        <!--状态-->
        <el-form-item :label="$t('LK_ZHUANGTAI')" prop='status'>
          <i-select :placeholder="$t('partsignLanguage.QingXuanZe')" v-model.trim='purchaseRequisitionQueryForm.status'
                    disabled>
            <el-option value='' :label="$t('LK_ALL') | capitalizeFilter"></el-option>
            <el-option v-for='(item, index) in orderStates' :value='item.code' :label='item.name'
                       :key='index'></el-option>
          </i-select>
        </el-form-item>
        <!--RISE编号-->
        <el-form-item :label="$t('MODEL-ORDER.LK_RISEBIANHAO')" prop='riseCode'>
          <i-input :placeholder="$t('partsignLanguage.QingShuRu')"
                   v-model.trim='purchaseRequisitionQueryForm.riseCode'></i-input>
        </el-form-item>
        <!--采购工厂-->
        <el-form-item :label="$t('MODEL-ORDER.LK_CAIGOUGONGCHANG')">
          <i-text>{{ procureFactoryShow }}</i-text>
        </el-form-item>

        <!--采购组-->
        <el-form-item :label="$t('LK_CAIGOUZU')" prop='procureGroup'>
          <i-input :placeholder="$t('partsignLanguage.QingShuRu')"
                   v-model.trim='purchaseRequisitionQueryForm.procureGroup'></i-input>
        </el-form-item>
        <!--需求跟踪号-->
        <el-form-item :label="$t('MODEL-ORDER.LK_XUQIUGENZONGHAO')" prop='requestTraceNo'>
          <i-input :placeholder="$t('partsignLanguage.QingShuRu')"
                   v-model.trim='purchaseRequisitionQueryForm.requestTraceNo'></i-input>
        </el-form-item>

        <!--申请人-->
        <el-form-item :label="$t('LK_SHENQINGREN')" prop='applyBy'>
          <i-input :placeholder="$t('partsignLanguage.QingShuRu')"
                   v-model.trim='purchaseRequisitionQueryForm.applyBy'></i-input>
        </el-form-item>
      </el-form>
    </i-search>
    <div class='clearFloat'>
      <div class='floatright margin-bottom20'>
        <iButton @click='addReferPurchaseRequisitionItems'>{{ $t('LK_TIANJIA') }}</iButton>
      </div>
    </div>
    <iTableCustom ref='testTable ' :columns='purchaseRequisitionColumns' :data='purchaseOrderTableData'
                  :extraData='extraData'
                  @handle-selection-change='handleSelectionChange'></iTableCustom>
    <div class='padding-bottom20'>
      <iPagination v-update @size-change='handleSizeChange($event, queryPurchaseRequisition)'
                   @current-change='handleCurrentChange($event,queryPurchaseRequisition)' background
                   :current-page='page.currPage' :page-sizes='page.pageSizes' :page-size='page.pageSize'
                   :layout='page.layout' :total='page.totalCount' />
    </div>
  </i-dialog>

</template>

<script>
import {iDialog, iInput, iSearch, iSelect, iPagination, iButton, iText} from 'rise'
import iTableCustom from '@/components/iTableCustom'
import {MODEL_PURCHASEREQUISITIONCOLUMNS} from "../config/data";
import { pageMixins } from '@/utils/pageMixins'
import filters from '@/utils/filters'
import {purchaseFactory} from "@/api/partsprocure/editordetail";
export default {
  mixins: [pageMixins, filters],
  name: "ModelByPurchaseRequisitionDialog",
  components: {
    iDialog, iInput, iSearch, iSelect, iPagination, iButton, iText, iTableCustom
  },
  props: {
    value: {type: Boolean, default: false},
    orderDetails: {type: Object, default: null}
  },
  computed: {
    procureFactoryShow: function () {
      if (this.orderDetails.factoryName != null && this.orderDetails.factoryName != '' && this.orderDetails.factoryName != undefined) {
        return `${this.orderDetails.procureFactory}-${this.orderDetails.factoryName}`
      }
      return this.orderDetails.procureFactory
    }
  },
  data() {
    return {
      purchaseRequisitionQueryForm: {},
      purchaseRequisitionColumns:MODEL_PURCHASEREQUISITIONCOLUMNS,
      purchaseOrderTableData:[],//表格列表数据
      selectPurchaseOrderTableData: [],//选种的数据
      purchasingFactoryList: [],//采购工厂
      orderStates: [
        {code: 1, name: '已创建'},
        {code: 2, name: '已关联订单'},
        {code: 3, name: '订单已推送SAP'},
        {code: 4, name: '关闭'}],
      extraData:{
        orderStates: [
            { code: 1, name: '已创建' },
            { code: 2, name: '已关联订单' },
            { code: 3, name: '订单已推送SAP' },
            {code: 4,name: '关闭'}
        ],
        purchaseRequisitionTypes: [
            { code: 'SPR', name: '标准采购申请' },
            { code: 'MPR', name: '模具采购申请' },
            {code: 'GPR',name: '工序委外'},

        ]//采够申请类型
      },
    }

  },
  watch: {
    value: function(val) {
      if (val) {
        this.queryPurchaseRequisition()
        this.queryPurchasingFactory()
      }
    }
  },
  methods: {
    clearDiolog() {
      this.$emit('input', false)
    },

    addReferPurchaseRequisitionItems() {
      if (this.selectPurchaseOrderTableData.length === 0) {
        return this.$message.warning(this.$t('LK_NINDANGQIANHAIWEIXUANZE'))
      }
      this.$emit('selectPurchaseOrderTableData', this.selectPurchaseOrderTableData)
    },
    handleSelectionChange(row){
      this.selectPurchaseOrderTableData = row

    },
    //获取采购工厂
    queryPurchasingFactory() {
      purchaseFactory({ isSparePart: false })
          .then((res) => {
            if (res?.data && res.code == 200) {
              this.purchasingFactoryList = res.data
            }
          })
    },
    //查询列表
    queryPurchaseRequisition(){

    },
    //查询采购申请
    btnQueryPurchaseRequisition() {

    },
    //重置表单
    resetQueryForm() {
      this.$refs.purchaseRequisitionQueryFormRef.resetFields()

    }
  }
}
</script>

<style scoped>

</style>