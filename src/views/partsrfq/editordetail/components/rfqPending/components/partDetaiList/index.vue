<!--
* @author:shujie
* @Date: 2021-2-25 11:42:11
 * @LastEditors: Please set LastEditors
* @Description: 待办事项-零件清单
 -->
<template>
  <iCard>
    <div class="header flex-align-center">
      <iButton>删除</iButton>
      <iButton>新申请财务目标价</iButton>
      <iButton>再新申请财务目标价</iButton>
    </div>
    <tableList
      :tableData="confirmTableListData"
      :tableTitle="tableTitle"
      :tableLoading="confirmTableLoading"
      @handleSelectionChange="handleSelectionChange"
      @openPage="openPage"
    ></tableList>
    <iPagination
      @size-change="handleSizeChange($event, getTableList)"
      @current-change="handleCurrentChange($event, getTableList)"
      background
      :page-sizes="page.pageSizes"
      :page-size="page.pageSize"
      :layout="page.layout"
      :total="page.total"
    ></iPagination>
    <di class="addFs flex-align-center"
      ><iButton @click="addFsList">添加</iButton></di
    >
    <tableList
      :tableData="tableListData"
      :tableTitle="tableTitle"
      :tableLoading="tableLoading"
      @handleSelectionChange="handleSelectionChange"
      @openPage="openPage"
    ></tableList>
    <iPagination
      @size-change="handleSizeChange($event, getTableList)"
      @current-change="handleCurrentChange($event, getTableList)"
      background
      :page-sizes="page.pageSizes"
      :page-size="page.pageSize"
      :layout="page.layout"
      :total="page.total"
    ></iPagination>
  </iCard>
</template>

<script>
import { iButton, iCard, iPagination } from "@/components";
import tableList from "@/views/partsign/home/components/tableList";
import { tableTitle } from "./data";
import { getTabelData } from "@/api/partsign/home";
import { pageMixins } from "@/utils/pageMixins";
export default {
  mixins: [pageMixins],
  components: {
    iButton,
    iCard,
    tableList,
    iPagination,
  },
  created() {
    this.getTableList();
    this.getConfirmTableList();
  },
  data() {
    return {
      tableTitle,
      tableListData: [],
      confirmTableListData: [], //已确认的零件列表
      tableLoading: false,
      confirmTableLoading: false,
      handleSelectArr: [], //选中添加零件清单数据
    };
  },
  methods: {
    // 已确认零件
    confirmHandleSelectionChange(e) {},
    // 待选零件
    handleSelectionChange(e) {
      this.handleSelectArr = e;
    },
    openPage() {
      console.log(1);
    },
    // 添加FS零件列表
    addFsList() {
      this.confirmTableListData = this.confirmTableListData.concat(
        this.handleSelectArr
      );
    },
    //获取表格数据
    getTableList() {
      this.tableLoading = true;
      getTabelData().then((res) => {
        this.tableListData = res.data;
        this.tableLoading = false;
      });
    },
    // 获取已确认表格数据
    getConfirmTableList() {},
  },
};
</script>

<style lang="scss" scoped>
.header {
  justify-content: flex-end;
  margin-bottom: 20px;
}
.addFs {
  height: 85px;
  justify-content: flex-end;
}
</style>
