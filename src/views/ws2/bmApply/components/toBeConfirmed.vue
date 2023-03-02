<template>
  <div class="block">
    <SearchBlock @sure="allSerch" />
    <iCard>
      <div class="table-head">
        <div class="tmCartypePro">
          <!-- <div>{{$t('LK_CHEXINXIANGMU')}}</div>
          <iSelect
              :placeholder="$t('partsprocure.PLEENTER')"
              v-model="tmCartypeProId"
              filterable
              @change="changeCarTypeProject"
              ref="carTypeProjectRef"
              clearable
          >
            <el-option
                :value="item.tmCartypeProId"
                :label="item.tmCartypeProName"
                v-for="(item, index) in fromGroup"
                :key="index"
            ></el-option>
          </iSelect> -->
        </div>
        <div>
          <iButton @click="confirmApply" :loading="confirmApplyLoading" v-permission="TOOLING_BUDGET_BMAPPLICATION_TOBECONFIRMED_CONFIRM">{{ $t('LK_QUERENSHENQING') }}</iButton><!-- 确认申请 -->
          <iButton @click="toVoid" :loading="bmCancelLoading" v-permission="TOOLING_BUDGET_BMAPPLICATION_TOBECONFIRMED_INVALID">{{ $t('LK_ZUOFEI') }}</iButton><!-- 作废 -->
          <iButton @click="downloadList" v-permission="TOOLING_BUDGET_BMAPPLICATION_TOBECONFIRMED_DOWNLOAD">{{ $t('LK_XIAZAIQINGDAN') }}</iButton><!-- 下载清单 -->
          <buttonTableSetting @click="edittableHeader"></buttonTableSetting>
        </div>
        
      </div>
      <tableList
        ref="tableList"
        permissionKey="toBeConfirmed"
        :tableData="bmTableList"
        :tableTitle="bmTableHead"
        :tableLoading="allTableLoading"
        @handleSelectionChange="handleSelectionChange"
      >
        <!-- BM单流水号 -->
        <template #bmSerial="scope">
          <div class="table-txtStyle" @click="openBMDetail(scope.row)">{{scope.row.bmSerial}}</div>
        </template>

        <!-- RS单号 -->
        <template #rsNum="scope">
          <template v-if="scope.row.rsNum == 'AEKO RS单'">
            <div  @click="goRsList(scope.row)" class="table-txtStyle" v-if="scope.row.aekoNum!=='0'">{{scope.row.aekoNum}}</div>
          </template>
          <template v-else>
            <div  @click="openViewPdf(scope.row)" class="table-txtStyle" v-if="scope.row.rsNum!=='0'">{{scope.row.rsNum}}</div>
          </template>
          <!-- <div @click="openViewPdf(scope.row)" class="table-txtStyle" v-if="scope.row.rsNum !== '0'">{{scope.row.rsNum}}</div> -->
        </template>
      </tableList>

      <div class="unitExplain">
        <UnitExplain />
      </div>

      <iPagination
          v-update
          @size-change="handleSizeChange($event, getTableData)"
          @current-change="handleCurrentChange($event, getTableData)"
          background
          :current-page="page.currPage"
          :page-sizes="page.pageSizes"
          :page-size="page.pageSize"
          :layout="page.layout"
          :total="page.totalCount"
      />
    </iCard>
  </div>
  
</template>

<script>
import SearchBlock from "./searchBlock";

import {
  iTableList
} from '@/components';
import {
  iMessage,
  iButton,
  iCard,
  iPagination,
  iDialog,
  iInput,
  iSelect,
} from "rise";
import UnitExplain from "./unitExplain";
import { bmTableHead,bmApplyForm } from "./data";
import { bmCarTypePullDown, findBmWaitConfirmList, bmCancel, bmConfirm } from "@/api/ws2/bmApply";
import { pageMixins } from "@/utils/pageMixins";
import { excelExport } from '@/utils/filedowLoad';
import Moment from 'moment';
import tableList from "@/components/iTableSort";
import { tableSortMixins } from "@/components/iTableSort/tableSortMixins";
import buttonTableSetting from "@/components/buttonTableSetting";
export default {
  components: {
    iTableList, iCard, iButton, iPagination,
    UnitExplain, iSelect,SearchBlock,tableList,buttonTableSetting
  },

  props: {
    refresh: {
      type: Boolean,
      default: false
    }
  },

  watch: {
    refresh(){
      this.getTableData();
    }
  },

  mixins: [pageMixins, tableSortMixins],

  data(){
    return {
      fromGroup: [],
      tmCartypeProId: '',
      allTableLoading: false,
      bmTableHead,
      bmTableList: [],
      selectTableList: [],
      page: {
        currPage: 1,
        pageSize: 10,
      },
      bmCancelLoading: false,
      confirmApplyLoading: false,
      form: _.cloneDeep(bmApplyForm),
    }
  },

  created(){
    this.getTableData();
    this.getCarTypePullDown();
  },

  methods: {
    goRsList(row){
      const roleList = this.$store.state.permission.userInfo;
      let transmitObj = {
          option: 4,
          aekoApprovalDetails: {
            linieId: row.linieId,
            aekoNum: row.aekoNum,
            requirementAekoId: row.requirementAekoId,
            aekoManageId: row.aekoManageId,
            workFlowDTOS:[]
          }
      }
      let routeData = this.$router.resolve({
        path: `/aeko/AEKOApprovalDetails`,
        query: {
          from:'aekodetail',
          key:"rsAeko",
          requirementAekoId: row.requirementAekoId,
          aekoManageId: row.aekoManageId,
          transmitObj: window.btoa(unescape(encodeURIComponent(JSON.stringify(transmitObj))))
        }
      })
      window.open(routeData.href, '_blank')
    },
    //  预览RSpdf
    openViewPdf(scope){
      const roleList = this.$store.state.permission.userInfo.roleList;
      const isFlag = roleList.some(item => ['CWMJKZY','CWMJKZGZ','CWMJKZKZ'].includes(item.code));
      console.log('roleListroleListroleList', roleList, isFlag);
      const url = process.env.VUE_APP_TOOLING  + '/baCommodityApply' + '/exportRsFull/' + scope.rsNum + '?flag=' + !isFlag;
      window.open(url);
    },

    //  作废
    toVoid(){
      if(!this.selectTableList.length){
        return iMessage.warn(this.$t('LK_QINGXUANZHE'))
      }

      this.bmCancelLoading = true;

      bmCancel({
        ids: this.selectTableList.map(item => item.id)
      }).then(res => {
        const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn;

        if(res.data){
          iMessage.success(result);
          this.getTableData();
          this.selectTableList = [];
          this.$emit('updateTable');
        }else{
          iMessage.error(result);
        }

        this.bmCancelLoading = false;
      }).catch(err => {
        this.bmCancelLoading = false;
      })
    },

    //  打开详情
    openBMDetail(scope){
      this.$emit('openBMDetail', scope);
    },

    handleSelectionChange(val){
      this.selectTableList = val;
    },

    //  下载清单
    downloadList(){
      if(!this.selectTableList.length){
        return iMessage.warn(this.$t('LK_QINGXUANZHE'))
      }

      excelExport(this.selectTableList, this.bmTableHead, 'BM申请单');
    },

    //  确认申请
    confirmApply(){
      if(!this.selectTableList.length){
        return iMessage.warn(this.$t('LK_QINGXUANZHE'))
      }

      const isBmAmount = this.selectTableList.filter(item => Number(item.bmAmount) > 999999000);
      if(isBmAmount.length){
        return iMessage.warn(`BM金额已超过999999000`)
      }
      
      this.confirmApplyLoading = true;
      bmConfirm({
        ids: this.selectTableList.map(item => item.id)
      }).then(res => {
        const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn;

        if(res.data){
          iMessage.success(result);
          this.getTableData();
          this.$emit('updateTable');
        }else{
          iMessage.error(result);
        }

        this.confirmApplyLoading = false;
      }).catch(err => {
        this.confirmApplyLoading = false;
      })
    },

    getCarTypePullDown(){
      bmCarTypePullDown().then(res => {
        const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn;
        if(res.data){
          this.fromGroup = res.data;
        }else{
          iMessage.error(result);
        }
      })
    },
    allSerch(data){
      this.form = data;
      this.getTableData();
    },
    getTableData(){
      this.allTableLoading = true;
      const param = {
        ...this.form,
        startDate: this.form.startDate ? Moment(this.form.startDate).format('YYYY-MM-DD') : '',
        endDate: this.form.endDate ? Moment(this.form.endDate).format('YYYY-MM-DD') : '',
        current: this.page.currPage,
        size: this.page.pageSize,
        // tmCartypeProId: this.tmCartypeProId
      }
      findBmWaitConfirmList(param).then(res => {
        const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn;
        if(res.data){
          this.bmTableList = res.data;
          this.page.currPage = res.pageNum;
          this.page.pageSize = res.pageSize;
          this.page.totalCount = res.total;
        }else{
          iMessage.error(result);
        }

        this.allTableLoading = false;
      }).catch(err => {
        this.allTableLoading = false;
      })
    },

    changeCarTypeProject(){
      this.getTableData();
    },
  }
}
</script>

<style lang="scss" scoped>
.block{
  .table-txtStyle{
    color: #1663F6;
    text-decoration: underline;
    font-family: Arial;
    cursor: pointer;
  }

  .table-head{
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;

    .tmCartypePro{
      display: flex;
      align-items: center;

      & > div{
        white-space: nowrap;
        margin-right: 10px;
      }
    }
  }

  .unitExplain{
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
  }
}
</style>