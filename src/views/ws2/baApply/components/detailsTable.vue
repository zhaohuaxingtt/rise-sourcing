<!--
 * @Author: your name
 * @Date: 2021-07-12 20:18:28
 * @LastEditTime: 2021-11-06 12:36:39
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \front-web\src\views\ws2\baApply\components\detailsTable.vue
-->
<template>
  <div>
    <div class="page-head">
      <iButton @click="applyBA" :loading="applyLoading">{{$t('LK_APPLYBANUMBER')}}</iButton>
    </div>
    
    <iTableList
        :tableData="tableListData"
        :tableTitle="tableTitle"
        :tableLoading="tableLoading"
        @handleSelectionChange="handleSelectionChange"
        :activeItems="'partNum'"
    >
      <template #baNum="scope">
        <div>{{scope.row.baNum === '' ? '无' : scope.row.baNum}}</div>
      </template>
      <template #rsNum="scope">
        <a @click="openViewPdf(scope)" class="detailed">{{scope.row.rsNum}}</a>
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
            class="baApply-table"
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
import { getDetail, baConfirm, downloadExport } from "@/api/ws2/baApply/baCommodityApply";
import ApplyPopup from "./applyPopup";
import store from '@/store';
import {
  iTableList
} from '@/components';

export default {
  props: {
    tableListData: {type: Array, default: () => []},
    tableLoading: {type: Boolean, default: false},
  },
  computed: {
    // nameList(){
    //   const ksy1 = store.state.permission.whiteBtnList['TOOLING_BUDGET_BAAPPLICATION_TOTAL'];  //  是否有汇总页面权限
    //   const key = ksy1 ? 'baNum' : 'carTypeName';
    //   return this.selectTableData.map(item => item[key]).join('、');
    // }
  },
  data(){
    return {
      tableTitle: detailsTableHead,
      selectTableData: [],
      visible: false,
      tableLayerListData: {},
      tableLayerTitle: [],
      tableLayerLoading: false,
      applyLoading: false,
      nameList: '',
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

    //  预览RSpdf
    openViewPdf(scope){
      const url = process.env.VUE_APP_TOOLING  + '/baCommodityApply' + '/exportRsFull/' + scope.row.rsNum;
      window.open(url);
    },

    downloadExport(){
      downloadExport(this.selectTableData).then(res => {
        
      })
    },

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
          this.downloadExport();
          this.$emit('handelConfirmSuccess');
        }else{
          iMessage.error(result);
        }
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
      const ksy1 = store.state.permission.whiteBtnList['TOOLING_BUDGET_BAAPPLICATION_TOTAL'];  //  是否有汇总页面权限
      const key = ksy1 ? 'carTypeName' : 'locationFactoryName';
      this.nameList = this.selectTableData.map(item => item[key]).join('、');
      this.getDetail();
    },

    getDetail(){
      this.applyLoading = true;
      getDetail(this.selectTableData).then(res => {
        console.log('明细：', res);
        const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn;

        if(res.data){
          const ksy1 = store.state.permission.whiteBtnList['TOOLING_BUDGET_BAAPPLICATION_TOTAL'];  //  是否有汇总页面权限
          this.tableLayerTitle = ksy1 ? layerTableHead1 : layerTableHead2;
          this.tableLayerListData = res.data;
          this.visible = true;
          this.applyLoading = false;
        }else{
          iMessage.error(result);
          this.applyLoading = false;
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
.baApply-table{
  ::v-deep .el-input__inner{
    width: 120px !important;
  }

  ::v-deep .el-table__footer-wrapper .is-center{
    color: #000 !important;
    font-weight: bold !important;
  }
}
.span-color{
  color: #1660F1;
}
.page-head{
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
}
.detailed{
  color: #1663F6;
  text-decoration: underline;
  font-family: Arial;
  cursor: pointer;
}
</style>