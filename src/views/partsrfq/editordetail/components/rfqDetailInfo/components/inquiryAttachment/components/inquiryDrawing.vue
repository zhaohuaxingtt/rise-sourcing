<template>

  <iCard>
    <div class="margin-bottom20 clearFloat">
      <span class="font18 font-weight">询价图纸</span>
      <div class="floatright">
        <iButton @click="download">下载</iButton>
      </div>
    </div>
    <tablelist
        :tableData="tableListData"
        :tableTitle="tableTitle"
        :tableLoading="tableLoading"
        @handleSelectionChange="handleSelectionChange"
        :index="true"
        open-page-props="fileName"
        :openPageGetRowData="true"
        @openPage="handleOpenPage"
    ></tablelist>
    <!------------------------------------------------------------------------>
    <!--                  表格分页                                          --->
    <!------------------------------------------------------------------------>
    <iPagination
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
</template>

<script>
import {iCard, iButton, iPagination} from "@/components";
import tablelist from 'pages/partsrfq/components/tablelist'
import {inquiryDrawingTableTitle} from "./data";
import {pageMixins} from "@/utils/pageMixins";
import {getAllAnnex} from "@/api/partsrfq/editordetail";


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
      tableTitle: inquiryDrawingTableTitle,
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
          fileType: 3,
          rfqId: id,
          userId: 12321
        }
        try {
          const res = await getAllAnnex(req)
          this.tableListData = res.records;
          this.page.currPage = res.current
          this.page.pageSize = res.size
          this.page.totalCount = res.total
          this.tableLoading = false;
        } catch {
          this.tableLoading = false;
        }
      }
    },
    download() {
    },
    //修改表格改动列
    handleSelectionChange(val) {
      this.selectTableData = val;
    },
    handleOpenPage(row) {
      const url = row.filePath
      const a = document.createElement('a');
      a.setAttribute('download', '')
      a.setAttribute('href', url);
      a.setAttribute('target', '_blank');
      a.click();
    }
  }
}
</script>

<style scoped>

</style>