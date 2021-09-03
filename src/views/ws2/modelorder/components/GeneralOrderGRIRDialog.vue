<!--GR IR 选择对话框-->
<template>
  <i-dialog  :visible.sync="value" width="98%" :show-close="false" @close="dimissDialog">
    <div class="changeContent">
      <div class="d_title_content">
        <span class="d_title">GR/IR - {{ $t('MODEL-ORDER.LK_XIANGCI') }} {{ itemTitle}}</span>
        <div class="d_right_content">
          <i-button  @click="exportGrIR">{{ $t('MODEL-ORDER.LK_DAOCHU') }}</i-button>
          <i class="el-icon-error" @click="value = false"></i>
        </div>
      </div>
      <i-form-group row="4" inline>
        <i-form-item :label="$t('MODEL-ORDER.LK_RISEXIEYIHAO')">
          <i-text>{{ contractCode }}</i-text>
        </i-form-item>
        <i-form-item :label="$t('MODEL-ORDER.LK_SAPXIEYIHAO')">
          <i-text>{{ contractSapCode }}</i-text>
        </i-form-item>
        <i-form-item :label="$t('LK_LINGJIANHAO')">
          <i-text>{{partNum }}</i-text>
        </i-form-item>
        <i-form-item :label="$t('MODEL-ORDER.LK_GONGYINSHANG')">
          <i-text>{{supplierSapCode}}</i-text>
        </i-form-item>
      </i-form-group>
      <div style="background: #e3e3e3;height: 1px;margin-top: 30px"></div>
      <div class="c_bottom_date">
        <el-form :model="queryForm" rules="queryFormRules" ref="queryFormRef" >
          <el-form-item :label="$t('MODEL-ORDER.LK_GUOZHANGQIZHIRIQI')" class="r_el-form-item" >
            <i-date-picker
              type="date"
              v-model="queryForm.startDate"
              clearable
              value-format="yyyy-MM-dd"
              :picker-options="pickerOptions"
              placeholder="YYYY-MM-DD"
            />
          </el-form-item>


          <el-form-item :label="$t('MODEL-ORDER.LK_ZHI')"  class="r_el-form-item">
            <i-date-picker
              type="date"
              v-model="queryForm.endDate"
              clearable
              value-format="yyyy-MM-dd"
              :picker-options="pickerOptions"
              placeholder="YYYY-MM-DD"
            />
          </el-form-item>
          <i-button @click="queryGrIr"   class="floatright">{{ $t('LK_INQUIRE') }}</i-button>
        </el-form>
      </div>
      <i-table-custom :columns="columns" :data="tablesData"  :treeExpand="treeExpand"></i-table-custom>
    </div>
  </i-dialog>
</template>

<script>
import {iDialog, iButton, iFormGroup, iFormItem, iDatePicker, iText}  from 'rise'
import iTableCustom from "@/components/iTableCustom"
import { exportExcel } from '../../../../utils/filedowLoad'
import { formatDate } from 'element-ui/src/utils/date-util'
import {exportGrIrDetailData,queryGRIRPurchaseOrder} from "@/api/ws2/modelOrder";
export default {
  components: {
    iDialog,
    iButton,
    iFormGroup,
    iFormItem,
    iDatePicker,
    iText,
    iTableCustom
  },
  props: {
    value: {type: Boolean, default: false},
    clickItemData: { type: Object, default: null },
    detailInfo: Object
  },
  computed:{
    itemTitle:function (){
      if(this.clickItemData==null||this.clickItemData==''||this.clickItemData==undefined){
        return ''
      }
      return this.clickItemData.item
    },
    contractCode:function (){
      if(this.detailInfo==null||this.detailInfo==''||this.detailInfo==undefined){
        return ''
      }
      return this.detailInfo.contractCode
    },
    contractSapCode:function (){
      if(this.detailInfo==null||this.detailInfo==''||this.detailInfo==undefined){
        return ''
      }
      return this.detailInfo.contractSapCode
    },
    partNum:function (){
      if(this.clickItemData==null||this.clickItemData==''||this.clickItemData==undefined){
        return ''
      }
      return this.clickItemData.partNum
    },
    supplierSapCode:function (){
      if(this.detailInfo==null||this.detailInfo==''||this.detailInfo==undefined) {
        return ''
      }
      if(this.detailInfo.supplierShortNameZh==null||this.detailInfo.supplierShortNameZh==''||this.detailInfo.supplierShortNameZh==undefined){
        return this.detailInfo.supplierSapCode
      }
      return  this.detailInfo.supplierSapCode +'-'+this.detailInfo.supplierShortNameZh

    }
  },
  created() {
    this.queryForm.itemNum = this.clickItemData.id
    this.queryGrIr()
  },
  data() {
    return {
      tablesData: [],
      columns:[
        {
          prop: 'showName',// Q 结算
          label: '类型',
          i18n: 'MODEL-ORDER.LK_LEIXING',
          tooltip: false,
          headerAlign: 'left',
          align: 'left',
          type: 'expanded',

        },
        {
          prop: 'contractSapCode',
          label: '物料凭证',
          i18n: 'MODEL-ORDER.LK_WULIAOPINGZHENG',
          tooltip: false,
          headerAlign: 'left',
          align: 'left',
        },
        {
          prop: 'item',
          label: '项目',
          i18n: 'MODEL-ORDER.LK_XIANGMU',
          tooltip: false,
          headerAlign: 'left',
          align: 'left',
        },
        {
          prop: 'accountingDate',
          label: '过账日期',
          i18n: 'MODEL-ORDER.LK_GUOZHANGRIQI',
          tooltip: false,
          headerAlign: 'left',
          align: 'left',
          customRender: (h, scope) => {
            let dateStr=formatDate(scope.row['accountingDate'])
            return <span> {dateStr}</span>
          },
        },
        {
          prop: 'receiveQuantity',
          label: '数量',
          i18n: 'LK_SHULIANG',
          tooltip: false,
          headerAlign: 'left',
          align: 'left',
          customRender:(h,scope)=>{
            let isLeaf=!scope.row.isLeaf
            return  isLeaf?<span style='font-weight:bold'> {scope.row['receiveQuantity']}</span>:<span> {scope.row['receiveQuantity']}</span>
          }
        },
        {
          prop: 'partUnit',
          label: '计量单位',
          i18n: 'LK_JILIANGDANWEI',
          tooltip: false,
          headerAlign: 'left',
          align: 'left',
          customRender:(h,scope)=>{
            let isLeaf=!scope.row.isLeaf
            return  isLeaf?<span style='font-weight:bold'> {scope.row['partUnit']}</span>:<span> {scope.row['partUnit']}</span>
          }
        },
        {
          prop: 'settlementAmount',
          label: '金额',
          i18n: 'MODEL-ORDER.LK_JINE',
          tooltip: false,
          headerAlign: 'left',
          align: 'left',
          customRender:(h,scope)=>{
            let isLeaf=!scope.row.isLeaf
            return  isLeaf?<span style='font-weight:bold'> {scope.row['settlementAmount']}</span>:<span> {scope.row['settlementAmount']}</span>
          }
        },
        {
          prop: 'currency',
          label: '货币',
          i18n: 'LK_HUOBI',
          tooltip: false,
          headerAlign: 'left',
          align: 'left',
          customRender:(h,scope)=>{
            let isLeaf=!scope.row.isLeaf
            return  isLeaf?<span style='font-weight:bold'> {scope.row['currency']}</span>:<span> {scope.row['currency']}</span>
          }
        },
        {
          prop: 'transType',
          label: '借贷标识',
          tooltip: false,
          headerAlign: 'center',
          align: 'center',
          customRender: (h, scope) => {
            let transType = scope.row['transType']
            let isLeaf=!scope.row.isLeaf
            let transTypeStr = ''
            if (transType != null && transType != '' && transType != undefined) {
              if (transType == 'H') {
                transTypeStr = '正常'
              }
              if (transType == 'S') {
                transTypeStr = '冲销'
              }
            }
            return  isLeaf?<span style='font-weight:bold'> {transTypeStr}</span>:<span> {transTypeStr}</span>
          }
        }
      ],
      treeExpand:{
        expandKey:'showName',
        childrenKey:'itemList'
      },
      queryForm: {
        startDate: null,
        endDate: null,
        itemNum: this.clickItemData?.item,
        orderId : this.detailInfo.id,
      },
      queryFormRules: {
        queryEndDate: [{type: 'date', required: true, message: this.$t('partsprocure.CHOOSE'), trigger: 'change'}]
      },
      pickerOptions: {
        disabledDate: time => {
          return this.dealDisabledDate(time);
        }
      },
    }
  },

  watch: {
    clickItemData: function(val) {
      this.queryForm.itemNum = this.clickItemData.id
      this.queryGrIr()
    },
  },
  methods: {
    // 展开
    dimissDialog() {
      this.value=false
      this.$emit("input", false);
    },
    //导出
    exportGrIR() {
      this.queryForm.itemNum=this.clickItemData.item
      exportGrIrDetailData(this.queryForm).then(res=>{
        if(res){
          exportExcel(res,this.detailInfo.contractCode+'_'+this.clickItemData.id+'_'+this.clickItemData.item+'采购订单GRIR明细表')
        }

      })
    },
    queryGrIr() {
      this.queryForm.itemNum=this.clickItemData.item
      this.queryForm.orderId=this.detailInfo.id
      queryGRIRPurchaseOrder(this.queryForm).then(res => {
        if(res.code==200){
          let localData=res.data
          localData.forEach(item=>{
            if (item.bizType == "E") {
              item.showName = "收货";
            } else {
              item.showName = '结算';
            }
            item.itemList.forEach(item1=>{
              if (item1.bizType == "E") {
                item1.showName = "GR"
              } else {
                item1.showName = 'IR'
              }
            })
          })
          this.tablesData=localData
        }
      })

    },

    dealDisabledDate(time) {
      return (
        time.getTime() < new Date(this.queryForm.startDate).getTime() ||
        time.getTime() > new Date(this.queryForm.endDate).getTime()
      );
    },

  }
}
</script>

<style lang='scss' scoped>

.changeContent {
  padding: 0 10px 20px 10px;

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
    margin-bottom: 30px;
  }

  .el-icon-error {
    margin-left: 20px;
    font-size: 24px;
    color: #A0BFFC;
  }


}

.el-form-item {
  display: flex;
}
.r_el-form-item {
  display: inline-flex;
}

.el_date {
  display: inline-block;
}

.row {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  justify-content: space-between;

  .col {
    width: 395px;
    // border-right: 1px solid $color-border;
    margin-right: 10px;
    padding-right: 20px;

    &:last-child {
      margin-right: 0px;
      margin-top: 64px;
      border-right: none;
    }
  }

  .items {
    width: 300px;
  }
}

.c_bottom_date {
  margin-top: 30px;
}
</style>


