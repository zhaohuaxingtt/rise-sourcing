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
    <DetailsSearch @sure="handleSearchSure" />

    <iCard>
      <DetailsTable @handelConfirmSuccess="handelConfirmSuccess" :tableListData="tableListData" :tableLoading="tableLoading" @refresh="refresh" />
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
      this.page.currPage = 1
      this.handleSure();
    },
    refresh(){
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
        if(res?.data){
          this.tableListData = res.data;
          this.page.totalCount = res.total;
        }else{
          iMessage.error(res?.desZh)
        }
        this.tableLoading = false;
      }).catch(err => {
        this.tableLoading = false;
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.partsprocureHome{
  display: flex;
  flex-flow: column;
  height: 100%;
  .table-card {
    flex: 1;
    overflow: hidden;
    min-height: 450px;
    ::v-deep .card-body-box {
      height: 100%;
    }
  }
}
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