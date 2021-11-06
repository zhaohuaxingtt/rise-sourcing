<template>
  <div class="block">
    <iCard>
      <div class="table-head">
        <iButton @click="confirmApply" :loading="confirmApplyLoading">{{ $t('LK_QUERENSHENQING') }}</iButton><!-- 确认申请 -->
        <iButton @click="toVoid" :loading="bmCancelLoading">{{ $t('LK_ZUOFEI') }}</iButton><!-- 作废 -->
        <iButton @click="downloadList">{{ $t('LK_XIAZAIQINGDAN') }}</iButton><!-- 下载清单 -->
      </div>
      <iTableList
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
          <div @click="openViewPdf(scope.row)" class="table-txtStyle">{{scope.row.rsNum}}</div>
        </template>
      </iTableList>

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
import {
  iMessage,
  iButton,
  iCard,
  iPagination,
  iDialog,
  iInput,
  iSelect,
} from "rise";
import { aekoTableHead } from "./data";
import { excelExport } from '@/utils/filedowLoad';
import { findBmAekoAddList, bmCancel, bmConfirm } from "@/api/ws2/bmApply";
import { pageMixins } from "@/utils/pageMixins";
import UnitExplain from "./unitExplain";

export default {
  components: {
    iTableList, iCard, iButton, iPagination, UnitExplain
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

  mixins: [pageMixins],

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
    }
  },

  created(){
    this.findBmAekoAddList();
  },

  methods: {

    //  预览RSpdf
    openViewPdf(scope){
      const url = process.env.VUE_APP_TOOLING  + '/baCommodityApply' + '/exportRsFull/' + scope.rsNum;
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

    findBmAekoAddList(){
      this.allTableLoading = true;

      const param = {
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

      excelExport(this.selectTableList, this.bmTableHead, 'BM申请单');
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