<template>
  <iPage class="partsprocureHome">
    <div class="page-head">
      <div class="page-headTitle" v-if="!isBa">
        {{$t('LK_CHEXINGXIANGMUXIANGQ')}}
      </div>
      <div class="page-headTitle" v-else>
        {{$t('LK_BASHENQING')}} | {{$t('LK_CHEXINGXIANGMUXIANGQ')}}
      </div>
      <iNavWS2
      ></iNavWS2>
    </div>
    <DetailsSearch @reset="handleReset" @sure="handleSearchSure" />

    <iCard>
      <DetailsTable @handelConfirmSuccess="handelConfirmSuccess" :tableListData="tableListData" :tableLoading="tableLoading" />
      <div class="unitExplain">
        <UnitExplain />
      </div>
      <iPagination
          v-update
          @size-change="handleSizeChange($event, handleSure)"
          @current-change="handleCurrentChange($event, handleSure)"
          background
          :current-page="page.currPage"
          :page-sizes="page.pageSizes"
          :page-size="page.pageSize"
          :layout="page.layout"
          :total="page.totalCount"
      />
    </iCard>
  </iPage>
</template>

<script>
import {iPage, iMessage, iDialog, iButton, iCard, iPagination} from "rise";
import DetailsSearch from "./components/detailsSearch";
import DetailsTable from "./components/detailsTable";
import { findBaPartsList } from "@/api/ws2/baApply";
import { pageMixins } from "@/utils/pageMixins";
import { iNavWS2 } from '@/components';
import { detailsForm } from "./components/data";
import store from '@/store';
import UnitExplain from "./components/unitExplain";
import {cloneDeep} from 'lodash'

export default {
  mixins: [pageMixins],
  components: {
    iPage,
    DetailsSearch,
    DetailsTable,
    iCard,
    iPagination,
    iNavWS2,
    UnitExplain
  },

  data(){
    return {
      tableListData: [],
      tableLoading: false,
      page: {
        currPage: 1,
        pageSize: 10,
      },
      isBa: false,
      form: cloneDeep(detailsForm)
    }
  },

  created(){
    this.isBa = this.$route.query.isBa;
  },

  methods: {

    handelConfirmSuccess(){
      this.handleSure();
    },

    handleSearchSure(data){
      this.form = data;
      this.page = {
        currPage: 1,
        pageSize: 10,
      },
      this.handleSure();
    },

    //  查询
    handleSure(){
      this.tableLoading = true;
      const param = {
        ...this.form,
        moldStatus: this.form['moldStatus'] === '' ? [] : [this.form['moldStatus']],
        current: this.page.currPage,
        size: this.page.pageSize,
        baAcountType: this.$store.state.baApply.baAcountType,
      }
      findBaPartsList(param).then(res => {
        this.tableListData = res.data;
        this.page.currPage = ~~res.pageNum;
        // this.page.pageSize = ~~res.pageSize;
        this.page.totalCount = ~~res.total;
        this.page.layout = 'sizes, prev, pager, next, jumper';
        this.page.pageSizes = [10,20,50,100,300]

        this.tableLoading = false;
      }).catch(err => {
        this.tableLoading = false;
      })
    },

    //  获取列表
    getList(){

    },

    //  重置
    handleReset(form){
      console.log('handleReset', form);
    }
  }
}
</script>

<style lang="scss" scoped>
.unitExplain{
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}
.page-head{
  display: flex;
  justify-content: space-between;

  .page-headTitle{
    font-size: 20px;
    font-weight: bold;
  }
}

</style>