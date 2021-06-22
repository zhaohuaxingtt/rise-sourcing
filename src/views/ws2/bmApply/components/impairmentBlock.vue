<template>
  <div class="block">
    <iCard>
      <div class="table-head">
        <iButton @click="modifyA">{{ $t('LK_QUERENSHENQING') }}</iButton><!-- 确认申请 -->
        <iButton @click="modifyA">{{ $t('LK_ZUOFEI') }}</iButton><!-- 作废 -->
        <iButton @click="downloadList">{{ $t('LK_XIAZAIQINGDAN') }}</iButton><!-- 下载清单 -->
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
          <div class="table-txtStyle" @click="openBMDetail(scope.row)">{{scope.row.rsNum}}</div>
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
} from "@/components";
import {
  iMessage,
  iButton,
  iCard,
  iPagination,
  iDialog,
  iInput,
  iSelect,
} from "rise";
import { aekoBmTableHead } from "./data";
import { excelExport } from '@/utils/filedowLoad';
import { findBmAekoMinusList } from "@/api/ws2/bmApply";
import { pageMixins } from "@/utils/pageMixins";
import UnitExplain from "./unitExplain";

export default {
  components: {
    iTableList, iCard, iButton, iPagination, UnitExplain
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
    }
  },

  created(){
    this.findBmAekoMinusList();
  },

  methods: {

    findBmAekoMinusList(){
      this.allTableLoading = true;

      const param = {
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