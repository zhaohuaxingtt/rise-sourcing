<template>
  <iPage class="partsprocureHome">
    <div class="page-head">
      <div class="page-headTitle">
        车型项目详情
      </div>
      <iNavWS2
      ></iNavWS2>
    </div>
    <DetailsSearch @reset="handleReset" @sure="handleSure" :isModelItem="true" />

    <iCard>
      <DetailsTable :tableListData="tableListData" :tableLoading="tableLoading" />
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
import { iNavWS2 } from "@/components";

export default {
  mixins: [pageMixins],
  components: {
    iPage,
    DetailsSearch,
    DetailsTable,
    iCard,
    iPagination,
    iNavWS2
  },

  data(){
    return {
      tableListData: [],
      tableLoading: false,
      page: {
        currPage: 1,
        pageSize: 10,
      },
      tmCartypeProId: '',
    }
  },

  created(){
    console.log('this.$route.params.id', this.$route.query.id);
    this.tmCartypeProId = this.$route.query.id;
  },

  methods: {

    //  查询
    handleSure(form){
      this.tableLoading = true;
      const param = {
        ...form,
        moldStatus: form['moldStatus'] === '' ? [] : [form['moldStatus']],
        current: this.page.currPage,
        size: this.page.pageSize,
        baAcountType: this.$store.state.baApply.baAcountType,
        tmCartypeProId: this.tmCartypeProId,
      }
      findBaPartsList(param).then(res => {
        this.tableListData = res.data;
        this.page.currPage = ~~res.pageNum;
        this.page.pageSize = ~~res.pageSize;
        this.page.totalCount = ~~res.total;

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
.page-head{
  display: flex;
  justify-content: space-between;

  .page-headTitle{
    font-size: 20px;
    font-weight: bold;
  }
}

</style>