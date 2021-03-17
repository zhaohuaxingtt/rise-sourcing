<template>
  <div>
    <iCard>
      <div class="margin-bottom20 clearFloat">
        <div class="floatright">
          <iButton @click="exports">导出</iButton>
        </div>
      </div>
      <tablelist
          :tableData="tableListData"
          :tableTitle="tableTitle"
          :tableLoading="tableLoading"
          :index="true"
          @handleSelectionChange="handleSelectionChange"
          @openPage='openPage'
          open-page-props="b"
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
      <!------------------------------------------------------------------------>
      <!--                  详情弹出框                                         --->
      <!------------------------------------------------------------------------>
      <detail-dialog
          v-model="detailDialog"
      />
    </iCard>
  </div>
</template>

<script>
import {iCard, iButton, iPagination} from "@/components";
import tablelist from 'pages/partsrfq/components/tablelist'
import {tableTitle} from "./components/data";
import {pageMixins} from "@/utils/pageMixins";
import {getLogisticsRequirementsList} from "@/api/partsrfq/editordetail";
import detailDialog from './components/detail'

export default {
  components: {
    iCard,
    iButton,
    iPagination,
    tablelist,
    detailDialog
  },
  mixins: [pageMixins],
  data() {
    return {
      tableListData: [],
      tableTitle: tableTitle,
      tableLoading: false,
      selectTableData: [],
      detailDialog: false
    };
  },
  created() {
    this.getTableList();
  },
  methods: {
    exports() {
    },
    //获取表格数据
    getTableList() {
      this.tableLoading = true;
      getLogisticsRequirementsList().then((res) => {
        this.tableListData = res.data;
        this.tableLoading = false;
      });
    },
    //修改表格改动列
    handleSelectionChange(val) {
      this.selectTableData = val;
    },
    openPage() {
      this.detailDialog = true
    }
  }
}
</script>

<style scoped>

</style>