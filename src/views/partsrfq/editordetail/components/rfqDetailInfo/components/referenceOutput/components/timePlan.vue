<template>
  <div>
    <iCard>
      <div class="margin-bottom20 clearFloat">
        <span class="font18 font-weight">时间计划</span>
        <div class="floatright">
          <template v-if="!editStatus">
            <iButton @click="edit" v-permission="PARTSRFQ_EDITORDETAIL_RFQDETAILINFO_TIMEPLAN_EDIT">编辑</iButton>
          </template>
          <template v-else>
            <iButton @click="save" v-permission="PARTSRFQ_EDITORDETAIL_RFQDETAILINFO_TIMEPLAN_SAVE">保存</iButton>
            <iButton @click="back" v-permission="PARTSRFQ_EDITORDETAIL_RFQDETAILINFO_TIMEPLAN_BACK">返回</iButton>
          </template>

          <iButton @click="exports" v-permission="PARTSRFQ_EDITORDETAIL_RFQDETAILINFO_TIMEPLAN_EXPORTS">导出</iButton>
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
import {iCard, iButton, iPagination, iMessage} from "@/components";
import tablelist from 'pages/partsrfq/components/tablelist'
import {timePlanableTitle} from "./data";
import {pageMixins} from "@/utils/pageMixins";
import {getRfqDataList, editRfqData} from "@/api/partsrfq/home";
import {excelExport} from "@/utils/filedowLoad";
import store from '@/store'
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
      const id = this.$route.query.id
      if (id) {
        this.tableLoading = true;
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
          this.tableListData = res.data.timePlanVO.timePlanVOList;
          this.page.currPage = res.data.timePlanVO.pageNum
          this.page.pageSize = res.data.timePlanVO.pageSize
          this.page.totalCount = res.data.timePlanVO.total
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
      this.inputProps = ['svwFirst', 'svwRequestEm', 'svwRequestOts']
      this.reRenderTable()
    },
    async save() {
      const reqList = this.tableListData.map(item => {
        return {
          userId:store.state.permission.userInfo.id,
          id: item.id,
          svwFirst: item.svwFirst,
          svwRequestEm: item.svwRequestEm,
          svwRequestOts: item.svwRequestOts,
        }
      })
      const req = {
        updateTimePlanPackage: reqList
      }
      const res = await editRfqData(req)
      res.result ? iMessage.success(this.$i18n.locale === 'zh' ? res.desZh : res.desEn) : iMessage.error(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
      this.editStatus = false
      this.inputProps = []
      this.reRenderTable()
      this.getTableList()
    },
    back() {
      this.editStatus = false
      this.inputProps = []
      this.reRenderTable()
    },
    reRenderTable() {
      this.showTable = false
      this.$nextTick(() => {
        this.showTable = true
      })
    },
    exports() {
      if (this.selectTableData.length == 0)
        return iMessage.warn('请选择需要导出的数据')
      excelExport(this.selectTableData, this.tableTitle)
    },
  }
}
</script>

<style scoped>

</style>