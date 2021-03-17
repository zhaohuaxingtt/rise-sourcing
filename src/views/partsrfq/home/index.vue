<!--
 * @Author: moxuan
 * @Date: 2021-02-25 09:59:25
 * @LastEditTime: 2021-03-17 19:27:17
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
    <iSearch class="margin-bottom20" :icon="true" @reset="handleSearchReset" @sure="getTableList">
      <el-form>
        <el-form-item label="零件号/FSNR/RFQ/采购员">
          <iInput placeholder='请输入查询' v-model="form.searchConditions"></iInput>
        </el-form-item>
        <el-form-item label="车型项目">
          <iSelect placeholder='请选择' v-model="form.carType"></iSelect>
        </el-form-item>
        <el-form-item label="零件项目类型">
          <iSelect placeholder='请选择' v-model="form.partType"></iSelect>
        </el-form-item>
        <el-form-item label="RFQ状态">
          <iSelect placeholder='请选择' v-model="form.rfqStatus"></iSelect>
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
          <iButton @click="editRfq('02')">激活RFQ</iButton>
          <iButton @click="newRfq">新建RFQ</iButton>
          <iButton @click="editRfq('01')">关闭RFQ</iButton>
          <iButton @click="assignmentOfScoringTasks">转派评分任务</iButton>
          <iButton @click="editRfq('03')">转谈判</iButton>
          <iButton disabled>创建定点申请</iButton>
          <iButton @click="exportTable">导出</iButton>
        </div>
      </div>
      <tablelist
          :tableData="tableListData"
          :tableTitle="tableTitle"
          :tableLoading="tableLoading"
          @handleSelectionChange="handleSelectionChange"
          @openPage='openPage'
          open-page-props="id"
          :index="true"
          icon-props="recordId"
      >
        <template v-slot:icon="scope">
          <div @click="toTop(scope.data)" class="icon-style">
            <icon class="icon icon-color-active" name="iconliebiaoyizhiding"
                  v-if="scope.data.recordId > 1"></icon>
            <icon class="icon" name="iconliebiaoyizhiding" v-else></icon>
          </div>
        </template>
      </tablelist>
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
      <!--                  转派评分任务弹出框                                   --->
      <!------------------------------------------------------------------------>
      <assignment-of-scoring-tasks
          v-model="diologAssignmentOfScroingTasks"
      />
    </iCard>
  </iPage>

</template>
<script>
import {iPage, iButton, iCard, iMessage, iPagination, iSearch, iInput, iSelect, iNavMvp, icon} from "@/components";
import tablelist from "pages/partsrfq/components/tablelist";
import assignmentOfScoringTasks from "pages/partsrfq/home/components/assignmentOfScoringTasks";
import {pageMixins} from "@/utils/pageMixins";
import {tableTitle} from "pages/partsrfq/home/components/data";
import {getRfqDataList, editRfqData} from "@/api/partsrfq/home";

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
    icon,
    assignmentOfScoringTasks
  },
  mixins: [pageMixins],
  data() {
    return {
      tableListData: [],
      tableTitle: tableTitle,
      tableLoading: false,
      selectTableData: [],
      diologAssignmentOfScroingTasks: false,
      form: {
        searchConditions: '',
        carType: '',
        partType: '',
        rfqStatus: ''
      }
    };
  },
  created() {
    this.getTableList();
  },
  methods: {
    openPage(id) {
      this.$router.push({
        path: `/partsrfq/editordetail?id=${id}`
      })
    },
    //获取表格数据
    async getTableList() {
      this.tableLoading = true;
      const req = {
        userId: 12321,
        current: this.page.currPage,
        size: this.page.pageSize,
        ...this.form
      }
      try {
        const res = await getRfqDataList(req)
        this.tableListData = res.data;
        this.tableLoading = false;
      } catch {
        this.tableLoading = false;
      }
    },
    //修改表格改动列
    handleSelectionChange(val) {
      this.selectTableData = val;
    },
    newRfq() {
      this.$router.push({
        path: '/partsrfq/editordetail'
      })
    },
    async editRfq(updateType) {
      if (this.selectTableData.length === 0) {
        return iMessage.warn("抱歉，您当前还未选择任务！");
      }
      const idList = this.selectTableData.map(item => {
        return item.id
      })
      const req = {
        updateRfqStatusPackage: {
          updateType,
          tmRfqIdList: idList,
          userId: 12321
        }
      }
      const res = await editRfqData(req)
      iMessage.success(res.desZh)
      this.getTableList()
    },
    assignmentOfScoringTasks() {
      if (this.selectTableData.length == 0)
        return iMessage.warn("抱歉，您当前还未选择您需要转派的评分任务！");
      this.diologAssignmentOfScroingTasks = true
    },
    async toTop(row) {
      const setType = row.recordId > 1 ? '0' : '1'
      const req = {
        rfqSetTopPackage: {
          setType,
          rfqId: row.id,
          userId: 12321
        },
      }
      const res = await editRfqData(req)
      iMessage.success(res.desZh)
      this.getTableList()
    },
    change() {
    },
    handleSearchReset() {
      this.form = {}
    },
    exportTable() {

    }
  }
}
</script>
<style lang='scss' scoped>
.icon-color-active {
  color: $color-blue;
}

.icon-style {
  cursor: pointer;
}
</style>