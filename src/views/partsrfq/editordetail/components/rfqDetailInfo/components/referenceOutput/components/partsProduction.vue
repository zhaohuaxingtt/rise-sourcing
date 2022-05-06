<template>
  <div>
    <iCard>
      <div class="margin-bottom20 clearFloat">
        <span class="font18 font-weight">{{ language('LK_LINGJIANCHANLIANG','零件产量') }}</span>
        <div class="floatright">
          <iButton @click="exports" v-permission.auto="PARTSRFQ_EDITORDETAIL_RFQDETAILINFO_EXPORTS|零件产量导出">{{
              language('LK_DAOCHU','导出')
            }}
          </iButton>
        </div>
      </div>
      <tablelist
          :tableData="tableListData"
          :tableTitle="tableTitle"
          :tableLoading="tableLoading"
          @handleSelectionChange="handleSelectionChange"
          :index="true"
          open-page-props="rfqPlanId"
          @openPage="openPage"
          :openPageGetRowData="true"
          v-permission.auto="PARTSRFQ_EDITORDETAIL_RFQDETAILINFO_TABLE|零件产量表格"
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
import {iCard, iButton, iPagination, iMessage} from 'rise';
import tablelist from 'pages/partsrfq/components/tablelist'
import {partsProductionTableTitle} from "./data";
import {pageMixins} from "@/utils/pageMixins";
import {outputpPageByRfqId} from "@/api/partsrfq/home";
import {excelExport} from "@/utils/filedowLoad";
import {serialize} from '@/utils'
import {partProjTypes} from '@/config'

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
      tableTitle: partsProductionTableTitle,
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
            findType: '05',
            rfqId: id,
            current: this.page.currPage,
            size: this.page.pageSize,
        }
        try {
          const res = await outputpPageByRfqId(req)
          this.tableListData = res.data;
          if (this.tableListData.length !== 0) {
            const yearTitle = this.tableListData[0].outputPlanList.map(item => {
              return {
                props: item.year,
                name: item.year
              }
            })
            yearTitle.push(
                {props: 'sum', name: 'Sum'},
                {props: 'versionNum', name: '版本号', key: 'LK_BANBENHAO'},
            )

            this.tableTitle = partsProductionTableTitle.concat(yearTitle)
            this.tableListData = this.tableListData.map(item => {
              item.outputPlanList.map(item2 => {
                item[item2.year] = item2.outPut
              })
              return item
            })
          }
          // this.page.currPage = res.data.pageNum
          // this.page.pageSize = res.data.pageSize
          this.page.totalCount = res.total
          this.tableLoading = false;
        } catch {
          this.tableLoading = false;
        }
      }
    },
    exports() {
      if (this.selectTableData.length == 0)
        return iMessage.warn(this.language('LK_QINGXUANZHEXUYAODAOCHUSHUJU','请选择需要导出的数据'))
      excelExport(this.selectTableData, this.tableTitle)
    },
    //修改表格改动列
    handleSelectionChange(val) {
      this.selectTableData = val;
    },
    openPage(row) {
      if (row.partPurchaseProType === partProjTypes.PEIJIAN) {
        const router =  this.$router.resolve({path: '/sourceinquirypoint/sourcing/accessorypartdetail', query: { spNum: row.rfqPlanId }})
        window.open(router.href,'_blank')
      } else {
        const partsPro = this.$router.resolve({
          path:'/sourceinquirypoint/sourcing/partsprocure/editordetail',
          query: {
            rfqId: this.$route.query.id,
            rfqPlanId: row.rfqPlanId,
            projectId: row.purchaseProjectId,
            businessKey: row.partProjectType,
            purchasingRequirementId: row.purchasingRequirementId,
            partNum: row.ninePartNum,
            categoryCode: row.categoryCode,
            purchasingRequirementId: row.purchasingRequirementId,
            tab : 'outputPlan'
          }
        })
        window.open(partsPro.href,"_blank")
      }
    }
  }
}
</script>

<style scoped lang="scss">
// ::v-deep .el-table {
//   tr{
//     background-color: white;
//   }

//   th {
//     background-color: rgb(231,239,254);
//   }
// }

</style>
