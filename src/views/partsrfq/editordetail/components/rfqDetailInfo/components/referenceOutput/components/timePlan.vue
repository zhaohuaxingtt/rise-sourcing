<template>
  <div>
    <iCard>
      <div class="margin-bottom20 clearFloat">
        <span class="font18 font-weight">时间计划</span>
        <div class="floatright">
          <template v-if="!editStatus">
            <iButton @click="edit">编辑</iButton>
          </template>
          <template v-else>
            <iButton @click="save">保存</iButton>
            <iButton @click="back">返回</iButton>
          </template>

          <iButton @click="exports">导出</iButton>
        </div>
      </div>
      <tablelist
          v-if="showTable"
          :tableData="tableListData"
          :tableTitle="tableTitle"
          :tableLoading="tableLoading"
          @handleSelectionChange="handleSelectionChange"
          :index="true"
          :hide-open-page="true"
          :input-props="inputProps"
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
  </div>
</template>

<script>
import {iCard, iButton, iPagination} from "@/components";
import tablelist from 'pages/partsrfq/components/tablelist'
import {timePlanableTitle} from "./data";
import {pageMixins} from "@/utils/pageMixins";
import {getRfqDataList} from "@/api/partsrfq/home";

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
      tableTitle: timePlanableTitle,
      tableLoading: false,
      selectTableData: [],
      editStatus: false,
      inputProps: [],
      showTable: true
    };
  },
  created() {
    this.getTableList();
  },
  methods: {
    async getTableList() {
      this.tableLoading = true;
      const id = this.$route.query.id
      if (id) {
        const req = {
          otherInfoPackage: {
            findType: '07',
            rfqId: id,
            current: this.page.currPage,
            size: this.page.pageSize,
          }
        }
        try {
          const res = await getRfqDataList(req)
          this.tableListData = res.data;
          this.page.currPage = res.currPage
          this.page.pageSize = res.pageSize
          this.page.totalCount = res.totalCount
          this.tableLoading = false;
        } catch {
          this.tableLoading = false;
        }
      }
    },
    //修改表格改动列
    handleSelectionChange(val) {
      this.selectTableData = val;
    },
    edit() {
      this.editStatus = true
      this.inputProps = ['i', 'j', 'k']
      this.showTable = false
      this.$nextTick(() => {
        this.showTable = true
      })
    },
    save() {
      console.log(this.tableListData)
    },
    back() {
      this.editStatus = false
      this.inputProps = []
      this.showTable = false
      this.$nextTick(() => {
        this.showTable = true
      })
    }
  }
}
</script>

<style scoped>

</style>