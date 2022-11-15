<template>
  <div class="block">
    <SearchBlock @sure="allSerch" />
    <iCard>
      <div class="table-head">
        <iButton @click="confirmApply" :loading="confirmApplyLoading" v-permission="TOOLING_BUDGET_BMAPPLICATION_AEKOREDUCE_CONFIRM">{{ $t('LK_QUERENSHENQING') }}</iButton><!-- 确认申请 -->
        <iButton @click="toVoid" :loading="bmCancelLoading" v-permission="TOOLING_BUDGET_BMAPPLICATION_AEKOREDUCE_INVALID">{{ $t('LK_ZUOFEI') }}</iButton><!-- 作废 -->
        <iButton @click="downloadList" v-permission="TOOLING_BUDGET_BMAPPLICATION_AEKOREDUCE_DOWNLOAD">{{ $t('LK_XIAZAIQINGDAN') }}</iButton><!-- 下载清单 -->
      </div>
      <iTableList
        :tableData="aekoBmTableList"
        :tableTitle="aekoBmTableHead"
        :tableLoading="allTableLoading"
        @handleSelectionChange="handleSelectionChange"
      >
        <!-- BM单流水号 -->
        <template #bmSerial="scope">
          <div class="table-txtStyle" @click="openBMDetail(scope.row)">{{scope.row.bmSerial}}</div>
        </template>

        <!-- RS单号 -->
        <template #rsNum="scope">
          <!-- <div @click="openViewPdf(scope.row)" :class="scope.row.rsNum == 'AEKO RS单'? '' :'table-txtStyle' " v-if="scope.row.rsNum !== '0'">{{scope.row.rsNum}}</div> -->
          <template v-if="scope.row.rsNum == 'AEKO RS单'">
            <div  @click="goRsList(scope.row)" class="table-link" v-if="scope.row.aekoNum!=='0'">{{scope.row.aekoNum}}</div>
          </template>
          <template v-else>
            <div  @click="openViewPdf(scope.row)" class="table-link" v-if="scope.row.rsNum!=='0'">{{scope.row.rsNum}}</div>
          </template>
        </template>
      </iTableList>

      <div class="unitExplain">
        <UnitExplain />
      </div>

      <iPagination
          v-update
          @size-change="handleSizeChange($event, findBmAekoMinusList)"
          @current-change="handleCurrentChange($event, findBmAekoMinusList)"
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
import {
  iTableList
} from '@/components';
import SearchBlock from "./searchBlock";
import {
  iMessage,
  iButton,
  iCard,
  iPagination,
  iDialog,
  iInput,
  iSelect,
} from "rise";
import { aekoBmTableHead,bmApplyForm } from "./data";
import { excelExport } from '@/utils/filedowLoad';
import { findBmAekoMinusList, bmCancel, bmConfirm } from "@/api/ws2/bmApply";
import { pageMixins } from "@/utils/pageMixins";
import UnitExplain from "./unitExplain";
import Moment from 'moment';

export default {
  components: {
    iTableList, iCard, iButton, iPagination, UnitExplain,SearchBlock
  },

  props: {
    refresh: {
      type: Boolean,
      default: false
    }
  },

  watch: {
    refresh(){
      this.findBmAekoMinusList();
    }
  },

  mixins: [pageMixins],

  data(){
    return {
      allTableLoading: false,
      aekoBmTableList: [],
      selectTableList: [],
      aekoBmTableHead,
      page: {
        currPage: 1,
        pageSize: 10,
      },
      confirmApplyLoading: false,
      form: _.cloneDeep(bmApplyForm),
    }
  },

  created(){
    this.findBmAekoMinusList();
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
      if(scope.rsNum == 'AEKO RS单') {
        return
      }
      const roleList = this.$store.state.permission.userInfo.roleList;
      const isFlag = roleList.some(item => ['CWMJKZY','CWMJKZGZ','CWMJKZKZ'].includes(item.code));
      console.log('roleListroleListroleList', roleList, isFlag);
      const url = process.env.VUE_APP_TOOLING  + '/baCommodityApply' + '/exportRsFull/' + scope.rsNum + '?flag=' + !isFlag;
      window.open(url);
    },

    //  确认申请
    confirmApply(){

      if(!this.selectTableList.length){
        return iMessage.warn(this.$t('LK_QINGXUANZHE'))
      }
      
      this.confirmApplyLoading = true;
      bmConfirm({
        ids: this.selectTableList.map(item => item.id)
      }).then(res => {
        const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn;

        if(res.data){
          iMessage.success(result);
          this.findBmAekoMinusList();
          this.$emit('updateTable');
        }else{
          iMessage.error(result);
        }

        this.confirmApplyLoading = false;
      }).catch(err => {
        this.confirmApplyLoading = false;
      })
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
          this.findBmAekoMinusList();
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
    allSerch(data){
      this.form = data;
      this.findBmAekoMinusList();
    },
    findBmAekoMinusList(){
      this.allTableLoading = true;

      const param = {
        ...this.form,
        startDate: this.form.startDate ? Moment(this.form.startDate).format('YYYY-MM-DD') : '',
        endDate: this.form.endDate ? Moment(this.form.endDate).format('YYYY-MM-DD') : '',
        current: this.page.currPage,
        size: this.page.pageSize,
      }

      findBmAekoMinusList(param).then(res => {
        const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn;
        if(res.data){
          this.aekoBmTableList = res.data;
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

    //  下载清单
    downloadList(){
      console.log(this.selectTableList, this.aekoBmTableHead, '1212')
      // if(!this.selectTableList.length){
      //   return iMessage.warn(this.$t('LK_QINGXUANZHE'))
      // }
      excelExport(this.selectTableList, this.aekoBmTableHead, 'BM申请单');
    },

    handleSelectionChange(val){
      this.selectTableList = val;
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
  
  .unitExplain{
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
  }

  .table-head{
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;
  }
}
</style>