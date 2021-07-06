<template>
  <div class="block">
    <SearchBlock @sure="allSerch" />
      <iCard>
        <div class="table-head">
          <iButton @click="downloadList">{{ $t('LK_XIAZAIQINGDAN') }}</iButton><!-- 下载清单 -->
        </div>
        <iTableList
          :tableData="allTableList"
          :tableTitle="allTableHead"
          :tableLoading="allTableLoading"
          @handleSelectionChange="handleSelectionChange"
        >
          <!-- BM单流⽔号 -->
          <template #bmSerial="scope">
            <div class="table-link" @click="openBMDetail(scope.row)">{{scope.row.bmSerial}}</div>
          </template>

          <!-- RS单号 -->
          <template #rsNum="scope">
            <div  @click="openViewPdf(scope.row)" class="table-link">{{scope.row.rsNum}}</div>
          </template>
        </iTableList>

        <div class="unitExplain">
          <UnitExplain />
        </div>

        <iPagination
            v-update
            @size-change="handleSizeChange($event, allSerch)"
            @current-change="handleCurrentChange($event, allSerch)"
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
import SearchBlock from "./searchBlock";
import { findAllBmList } from "@/api/ws2/bmApply";
import { allTableHead, bmApplyForm } from "./data";
import { pageMixins } from "@/utils/pageMixins";
import UnitExplain from "./unitExplain";
import { excelExport } from '@/utils/filedowLoad';

export default {
  components: {
    SearchBlock, iTableList, iCard, iButton, iPagination,
    UnitExplain,
  },

  mixins: [pageMixins],

  data(){
    return {
      allTableList: [],
      allTableHead,
      allTableLoading: false,
      selectTableList: [],
      page: {
        currPage: 1,
        pageSize: 10,
      },
    }
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

  created(){
    this.getTableData();
  },

  methods: {

    //  预览RSpdf
    openViewPdf(scope){
      const url = process.env.VUE_APP_BACOMMODITYAPPLY + '/exportRsFull/' + scope.rsNum;
      window.open(url);
    },

    //  打开详情
    openBMDetail(scope){
      this.$emit('openBMDetail', scope);
    },

    //  下载清单
    downloadList(){
      if(!this.selectTableList.length){
        return iMessage.warn(this.$t('LK_QINGXUANZHE'))
      }

      excelExport(this.selectTableList, this.allTableHead, 'BM申请单')
    },

    getTableData(){
      this.allSerch(bmApplyForm)
    },

    handleSelectionChange(val){
      this.selectTableList = val;
    },

    allSerch(data){
      this.allTableLoading = true;
      const param = {
        ...data,
        current: this.page.currPage,
        size: this.page.pageSize,
      }
      findAllBmList(param).then(res => {
        const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn;
        if(res.data){
          this.allTableList = res.data;
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
  }
}
</script>

<style lang="scss" scoped>
.block{
  .unitExplain{
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
  }

  .table-link{
    color: #1663F6;
    text-decoration: underline;
    font-family: Arial;
    cursor: pointer;
  }

  .table-head{
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;
  }
}

</style>