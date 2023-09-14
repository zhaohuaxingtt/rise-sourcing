<template>
  <div class="block">
    <SearchBlock @sure="allSerch" />
    <iCard>
      <div class="table-head">
        <iButton @click="confirmApply" :loading="confirmApplyLoading" v-permission="TOOLING_BUDGET_BMAPPLICATION_AEKOINCREASE_CONFIRM">{{ $t('LK_QUERENSHENQING') }}</iButton><!-- 确认申请 -->
        <iButton @click="toVoid" :loading="bmCancelLoading" v-permission="TOOLING_BUDGET_BMAPPLICATION_AEKOINCREASE_INVALID">{{ $t('LK_ZUOFEI') }}</iButton><!-- 作废 -->
        <iButton @click="downloadList" v-permission="TOOLING_BUDGET_BMAPPLICATION_AEKOINCREASE_DOWNLOAD">{{ $t('LK_XIAZAIQINGDAN') }}</iButton><!-- 下载清单 -->
        <buttonTableSetting @click="edittableHeader"></buttonTableSetting>
      </div>
      <tableList
        ref="tableList"
        max-height="570px"
        permissionKey="incrementBlock"
        :tableData="aekoTableList"
        :tableTitle="aekoTableHead"
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
          <!-- <div @click="openViewPdf(scope.row)" :class="scope.row.rsNum == 'AEKO RS单'? '' :'table-txtStyle' " v-if="scope.row.rsNum !== '0'">{{scope.row.rsNum}}</div> -->
        </template>
      </tableList>

      <div class="unitExplain">
        <UnitExplain />
      </div>

      <iPagination
          v-update
          @size-change="handleSizeChange($event, findBmAekoAddList)"
          @current-change="handleCurrentChange($event, findBmAekoAddList)"
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
import { aekoTableHead,bmApplyForm } from "./data";
import { excelExport } from '@/utils/filedowLoad';
import { findBmAekoAddList, bmCancel, bmConfirm } from "@/api/ws2/bmApply";
import { pageMixins } from "@/utils/pageMixins";
import UnitExplain from "./unitExplain";
import Moment from 'moment';
import tableList from "@/components/iTableSort";
import { tableSortMixins } from "@/components/iTableSort/tableSortMixins";
import buttonTableSetting from "@/components/buttonTableSetting";
export default {
  components: {
    iTableList, iCard, iButton, iPagination, UnitExplain,SearchBlock,tableList,
buttonTableSetting
  },

  props: {
    refresh: {
      type: Boolean,
      default: false
    }
  },

  watch: {
    refresh(){
      this.findBmAekoAddList();
    }
  },

  mixins: [pageMixins, tableSortMixins],

  data(){
    return {
      allTableLoading: false,
      aekoTableList: [],
      selectTableList: [],
      aekoTableHead,
      page: {
        currPage: 1,
        pageSize: 10,
      },
      confirmApplyLoading: false,
      form: _.cloneDeep(bmApplyForm),
    }
  },

  created(){
    this.findBmAekoAddList();
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
          this.findBmAekoAddList();
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
          this.findBmAekoAddList();
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
      this.findBmAekoAddList();
    },
    findBmAekoAddList(){
      this.allTableLoading = true;

      const param = {
        ...this.form,
        startDate: this.form.startDate ? Moment(this.form.startDate).format('YYYY-MM-DD') : '',
        endDate: this.form.endDate ? Moment(this.form.endDate).format('YYYY-MM-DD') : '',
        current: this.page.currPage,
        size: this.page.pageSize,
      }

      findBmAekoAddList(param).then(res => {
        const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn;
        if(res.data){
          this.aekoTableList = res.data;
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
      if(!this.selectTableList.length){
        return iMessage.warn(this.$t('LK_QINGXUANZHE'))
      }

      excelExport(this.selectTableList, this.aekoTableHead, 'BM申请单');
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