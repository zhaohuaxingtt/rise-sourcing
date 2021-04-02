<template>
  <div>
    <iCard>
      <div class="margin-bottom20 clearFloat">
        <span class="font18 font-weight">{{$t('LK_CAIWUMUBIAOJIA')}}</span>
        <div class="floatright">
          <iButton @click="exports" v-permission="PARTSRFQ_EDITORDETAIL_EXPORT">{{$t('LK_DAOCHU')}}</iButton>
        </div>
      </div>
      <tablelist
          :tableData="tableListData"
          :tableTitle="tableTitle"
          :tableLoading="tableLoading"
          @handleSelectionChange="handleSelectionChange"
          :hide-open-page="true"
          :index="true"
      ></tablelist>
      <!------------------------------------------------------------------------>
      <!--                  表格分页                                          --->
      <!------------------------------------------------------------------------>
      <iPagination
          v-update
          @size-change="handleSizeChange($event, getTableList)"
          @current-change="handleCurrentChange($event, getTableList)"
          background
          :page-sizes="page.pageSizes"
          :page-size="page.pageSize"
          :layout="page.layout"
          :current-page='page.currPage'
          :total="page.totalCount"
      />
    </iCard>
  </div>
</template>

<script>
import {iCard, iButton, iPagination, iMessage} from "@/components";
import tablelist from 'pages/partsrfq/components/tablelist'
import {tableTitle} from "./components/data";
import {pageMixins} from "@/utils/pageMixins";
import {getRfqDataList} from "@/api/partsrfq/home";
import {excelExport} from "@/utils/filedowLoad";

export default {
  components: {
    iCard,
    iButton,
    iPagination,
    tablelist
  },
  mixins: [pageMixins],
  data() {
    return {
      tableListData: [],
      tableTitle: tableTitle,
      tableLoading: false,
      selectTableData: []
    };
  },
  created() {
    this.getTableList();
  },
  methods: {
    async getTableList() {
      const id = this.$route.query.id
      if (id) {
        this.tableLoading = true;
        const req = {
          otherInfoPackage: {
            findType: '06',
            rfqId: id,
            current: this.page.currPage,
            size: this.page.pageSize,
          }
        }
        try {
          const res = await getRfqDataList(req)
          this.tableListData = res.data.rfqCfPriceVO.rfqCfPriceVOList;
          this.page.currPage = res.data.rfqCfPriceVO.pageNum
          this.page.pageSize = res.data.rfqCfPriceVO.pageSize
          this.page.totalCount = res.data.rfqCfPriceVO.total
          this.tableLoading = false;
        } catch {
          this.tableLoading = false;
        }
      }
    },
    exports() {
      if (this.selectTableData.length == 0)
        return iMessage.warn(this.$t('LK_QINGXUANZHEXUYAODAOCHUSHUJU'))
      excelExport(this.selectTableData, this.tableTitle)
    },
    //修改表格改动列
    handleSelectionChange(val) {
      this.selectTableData = val;
    },
  }
}
</script>

<style scoped>

</style>