<template>
  <div>
    <div class="page-head">
      <iButton @click="applyBA">{{$t('LK_APPLYBANUMBER')}}</iButton>
    </div>
    
    <iTableList
        :height="tableHeight - 440"
        :tableData="tableListData"
        :tableTitle="tableTitle"
        :tableLoading="tableLoading"
        @handleSelectionChange="handleSelectionChange"
        :activeItems="'partNum'"
    >
      <template #baNum="scope">
        <div>{{scope.row.baNum === '' ? '无' : scope.row.baNum}}</div>
      </template>
    </iTableList>

    <!-- 申请BA单弹窗 -->
    <ApplyPopup :visible="visible" @changeLayer="changeLayer" @confirm="layerConfirm">
      <span slot="nameArry" class="span-color">
        {{nameList}}
      </span>

      <template slot="table">

        <template v-for="(item, index) in tableLayerListData.listDate">
          <iTableList
            :getSummaries="getSummaries"
            :tableData="item"
            :tableTitle="tableLayerTitle"
            :tableLoading="tableLayerLoading"
            :selection="false"
            :show-summary="true"
            :key="index"
            style="margin-bottom:36px"
          >
            <template #amount="scope">
              <iInput :placeholder="$t('LK_QINGSHURU')" v-model="scope.row.amount" v-if="scope.row.deptName === 'Aeko'"
                      maxlength="20"></iInput>
              <div v-else>{{scope.row.amount}}</div>
            </template>
          </iTableList>
        </template>
        
      </template>

    </ApplyPopup>
  </div>
</template>

<script>
import { tableHeight } from "@/utils/tableHeight";
import { detailsTableHead, layerTableHead1, layerTableHead2 } from "./data";
import { iButton, iMessage, iInput } from "rise";
import { getDetail, baConfirm } from "@/api/ws2/baApply/baCommodityApply";
import ApplyPopup from "./applyPopup";
import { excelExport } from '@/utils/filedowLoad'
import {
  iTableList
} from "@/components";
import { form } from '../../../partsign/home/components/data';

export default {
  props: {
    tableListData: {type: Array, default: () => []},
    tableLoading: {type: Boolean, default: false},
  },
  computed: {
    nameList(){
      const key = this.$store.state.baApply.baAcountType === 2 ? 'locationFactoryName' : 'baNum';
      return this.selectTableData.map(item => item[key]).join('、');
    }
  },
  data(){
    return {
      tableTitle: detailsTableHead,
      selectTableData: [],
      visible: false,
      tableLayerListData: {},
      tableLayerTitle: [],
      tableLayerLoading: false,
    }
  },
  mixins: [tableHeight],
  components: {
    iTableList,
    iButton,
    ApplyPopup,
    iInput
  },

  methods: {

    layerConfirm(){
      const param = {
        baAccountType: this.$store.state.baApply.baAcountType,
        baPartsApplyDTOS: this.tableLayerListData.baPartsApplyDTOS,
        listDate: this.tableLayerListData.listDate,
      }
      baConfirm(param).then(res => {
        const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn;
        if(res.data){
          iMessage.success(result);
          this.visible = false;
        }else{
          iMessage.error(result);
        }
        console.log('11111', res);
      })
    },

    changeLayer(visible){
      this.visible = visible;
    },

    getSummaries(param){
      const { columns, data } = param;
      const sums = [];

      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = 'Total';
          return;
        }
        if(column.property === "amount"){  //  只有金额字段才需要显示总价
          const values = data.map(item => Number(item[column.property]));
          console.log('values', values);
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
          } else {
            sums[index] = 'N/A';
          }
        }else{
          sums[index] = '';
        }
        
      });
      return sums;
    },
    
    //  申请BA单
    applyBA(){
      if(!this.selectTableData.length){
        return iMessage.warn(this.$t('LK_BAAPPLYTISP1'));
      }
      this.getDetail();
    },

    getDetail(){
      getDetail(this.selectTableData).then(res => {
        console.log('明细：', res);
        const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn;

        if(res.data){
          this.tableLayerTitle = this.$store.state.baApply.baAcountType === 2 ? layerTableHead2 : layerTableHead1;
          this.tableLayerListData = res.data;
          this.visible = true;
        }else{
          iMessage.error(result);
        }
      })
    },

    handleSelectionChange(val) {
      this.selectTableData = val;
    },
  }
}
</script>

<style lang="scss" scoped>
.span-color{
  color: #1660F1;
}
.page-head{
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
}
</style>