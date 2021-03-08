<template>
  <div>
    <iCard>
      <div class="margin-bottom20 clearFloat">
        <div class="floatright">
          <iButton @click="submit">提交</iButton>
          <iButton @click="recall">撤回</iButton>
        </div>
      </div>
      <tablelist
          :tableData="tableListData"
          :tableTitle="tableTitle"
          :tableLoading="tableLoading"
          :index="true"
          @handleSelectionChange="handleSelectionChange"
          open-page-props="c"
          input-props="f"
      ></tablelist>
      <!------------------------------------------------------------------------>
      <!--                  表格分页                                          --->
      <!------------------------------------------------------------------------>
      <iPagination
          @size-change="handleSizeChange($event, getTableList)"
          @current-change="handleCurrentChange($event, getTableList)"
          background
          :page-sizes="page.pageSizes"
          :page-size="page.page"
          :layout="page.layout"
          :current-page='page.size'
          :total="page.total"
      />
    </iCard>
  </div>
</template>

<script>
import {iCard, iButton, iPagination} from "@/components";
import tablelist from 'pages/partsrfq/components/tablelist'
import {tableTitle} from "./components/data";
import {pageMixins} from "@/utils/pageMixins";
import {getBomList} from "@/api/partsrfq/editordetail";


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
    //获取表格数据
    getTableList() {
      this.tableLoading = true;
      getBomList().then((res) => {
        this.tableListData = res.data;
        this.tableLoading = false;
      });
    },
    submit() {
    },
    recall() {
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