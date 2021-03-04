<!--
 * @Author: moxuan
 * @Date: 2021-02-25 09:59:25
 * @LastEditTime: 2021-02-25 10:01:59
 * @LastEditors: Please set LastEditors
 * @Description: RFQ模块首页
 * @FilePath: \rise\src\views\partsrfq\home\index.vue
-->
<template>
  <iPage>
    <div class="margin-bottom20">
      <iNav-mvp @change="change" right></iNav-mvp>
    </div>
    <!------------------------------------------------------------------------>
    <!--                  search 搜索模块                                   --->
    <!------------------------------------------------------------------------>
    <iSearch class="margin-bottom20" :icon="true">
      <el-form>
        <el-form-item label="零件号">
          <iInput placeholder='请输入零件号,FSNR,RFQ编号'></iInput>
        </el-form-item>
        <el-form-item label="车型项目">
          <iSelect placeholder='请选择车型项目'></iSelect>
        </el-form-item>
        <el-form-item label="零件项目类型">
          <iSelect placeholder='零件项目类型'></iSelect>
        </el-form-item>
      </el-form>
    </iSearch>
    <iCard>
      <!------------------------------------------------------------------------>
      <!--                  table模块，向外入参表格数据，表头                    --->
      <!------------------------------------------------------------------------>
      <div class="margin-bottom20 clearFloat">
        <span class="font18 font-weight">RFQ综合管理</span>
        <div class="floatright">
          <iButton @click="newRfq">新建RFQ</iButton>
          <iButton @click="closeRfq">关闭RFQ</iButton>
          <iButton @click="activateRfq">激活RFQ</iButton>
          <iButton @click="assignmentOfScoringTasks">转派评分任务</iButton>
          <iButton @click="transferNegotiation">转谈判</iButton>
          <iButton @click="createAFixedPointApplication">创建定点申请</iButton>
        </div>
      </div>
      <tablelist
          :tableData="tableListData"
          :tableTitle="tableTitle"
          :tableLoading="tableLoading"
          @handleSelectionChange="handleSelectionChange"
          @openPage='openPage'
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
      <!------------------------------------------------------------------------>
      <!--                  转派评分任务弹出框                                   --->
      <!------------------------------------------------------------------------>
      <assignment-of-scoring-tasks
          v-model="diologAssignmentOfScroingTasks"
      />
    </iCard>
  </iPage>

</template>
<script>
import {iPage, iButton, iCard, iMessage, iPagination, iSearch, iInput, iSelect, iNavMvp} from "@/components";
import tablelist from "pages/partsrfq/home/components/tableList";
import assignmentOfScoringTasks from "pages/partsrfq/home/components/assignmentOfScoringTasks";
import {pageMixins} from "@/utils/pageMixins";
import {tableTitle} from "pages/partsrfq/home/components/data";
import {getTabelData} from "@/api/partsign/home";

export default {
  components: {
    iPage,
    tablelist,
    iButton,
    iCard,
    iNavMvp,
    iPagination,
    iSearch,
    iInput,
    iSelect,
    assignmentOfScoringTasks
  },
  mixins: [pageMixins],
  data() {
    return {
      tableListData: [],
      tableTitle: tableTitle,
      tableLoading: false,
      selectTableData: [],
      diologAssignmentOfScroingTasks: false
    };
  },
  created() {
    this.getTableList();
  },
  methods: {
    openPage() {
      this.$router.push({
        path: '/partsrfq/editordetail'
      })
    },
    //获取表格数据
    getTableList() {
      this.tableLoading = true;
      getTabelData().then((res) => {
        this.tableListData = res.data;
        this.tableLoading = false;
      });
    },
    //修改表格改动列
    handleSelectionChange(val) {
      this.selectTableData = val;
    },
    newRfq() {

    },
    closeRfq() {

    },
    activateRfq() {

    },
    assignmentOfScoringTasks() {
      if (this.selectTableData.length == 0)
        return iMessage.warn("抱歉，您当前还未选择您需要转派的评分任务！");
      this.diologAssignmentOfScroingTasks = true
    },
    transferNegotiation() {
    },
    createAFixedPointApplication() {
    }
  }
}
</script>
<style lang='scss' scoped>
</style>