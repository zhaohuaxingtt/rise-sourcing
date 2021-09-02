<template>
  <div>
    <iCard>
      <div class="margin-bottom20 clearFloat">
        <div class="floatright">
          <iButton @click="exports" v-permission="PARTSRFQ_EDITORDETAIL_RFQDETAILINFO_LOGISTICSREQUIREMENTS_EXPORT">{{ language('LK_DAOCHU','导出') }}</iButton>
        </div>
      </div>
      <tablelist
          :tableData="tableListData"
          :tableTitle="tableTitle"
          :tableLoading="tableLoading"
          :index="true"
          @handleSelectionChange="handleSelectionChange"
          @openPage='openPage'
          open-page-props="fsGsNum"
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
      <!------------------------------------------------------------------------>
      <!--                  详情弹出框                                         --->
      <!------------------------------------------------------------------------>
      <detail-dialog
          v-model="detailDialog"
          :data-info="detailInfo"
      />
    </iCard>
  </div>
</template>

<script>
import {iCard, iButton, iPagination, iMessage} from 'rise';
import tablelist from 'pages/partsrfq/components/tablelist'
import {tableTitle} from "./components/data";
import {pageMixins} from "@/utils/pageMixins";
import detailDialog from './components/detail'
import {getRfqDataList,partLogisticByFs,pageByRfqId} from "@/api/partsrfq/home";
import {excelExport} from "@/utils/filedowLoad";

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
      detailDialog: false,
      detailInfo: []
    };
  },
  created() {
    this.getTableList();
  },
  methods: {
    exports() {
      if (this.selectTableData.length == 0)
        return iMessage.warn(this.language('LK_QINGXUANZHEXUYAODAOCHUSHUJU','请选择需要导出的数据'))
      excelExport(this.selectTableData, this.tableTitle)
    },
    //获取表格数据
    async getTableList() {
      const id = this.$route.query.id
      if (id) {
        this.tableLoading = true;
        const req = {
            findType: '02',
            rfqId: id,
            current: this.page.currPage,
            size: this.page.pageSize,
        }
        try {
          const res = await pageByRfqId(req)
          this.tableListData = res.data.partLogisticRequirementsVOList;
          this.page.currPage = res.data.pageNum
          this.page.pageSize = res.data.pageSize
          this.page.totalCount = res.data.total
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
    openPage(fsGsNum) {
      this.detailDialog = true
      this.getDetailData(fsGsNum)
    },
    async getDetailData(fsGsNum) {
      try {
        const id = this.$route.query.id
        const req = {
            findType: '09',
            rfqId: id,
            fsNum:fsGsNum
        }
        const res = await partLogisticByFs(req)
        this.detailInfo = res.data
        this.detailInfo.fsGsNum = fsGsNum
      } catch {
        this.detailInfo = {}
      }
    }
  }
}
</script>

<style scoped>

</style>