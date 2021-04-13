<template>
  <iCard>
    <div class="margin-bottom20 clearFloat">
      <span class="font18 font-weight">{{ $t('LK_GONGYINGSHANGPINGFEN') }}</span>
      <div class="floatright">
        <!-- v-permission="PARTSRFQ_EDITORDETAIL_RFQPENDING_SUPPLIERSCORE_PARTSCORING_DELETE" -->
        <iButton @click="setScoringDept">{{ $t('LK_SHEZHIPINGFENBUMEN') }}</iButton>
        <iButton @click="sendTaskForRating" :loading="pushLoading">{{ $t('LK_TUISONGPINGFENRENWU') }}</iButton>
      </div>
    </div>
    <tablelist
        :tableData="tableListData"
        :tableTitle="tableTitle"
        :tableLoading="tableLoading"
        @handleSelectionChange="handleSelectionChange"
        :index="true"
        @openActionPropsPage="openActionPropsPage"
        @openMultiHeaderPropsPage="openMultiHeaderPropsPage"
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
    <!--                  备注弹框                                          --->
    <!------------------------------------------------------------------------>
    <tpb-remarks
        v-model="dialogRemarks"
        @submit="handleRemarksSubmit"
        :memo="selectedRowData.tpbMemo"
    />
    <scoringDeptDialog :visible.sync="scoringDeptVisible" :id="$route.query.id" />
  </iCard>
</template>

<script>
import {iCard, iPagination, iButton, iMessage} from "@/components";
import tablelist from './supplierScoreTableList'
import {supplierScoreTitle} from "./data";
import {pageMixins} from "@/utils/pageMixins";
import tpbRemarks from './tpbRemarks'
import {getAllSupplier, setTpbMemo, sendTaskForRating} from "@/api/partsrfq/editordetail";
import {serialize} from '@/utils'
import store from '@/store'
import {rfqCommonFunMixins} from "pages/partsrfq/components/commonFun";
import scoringDeptDialog from './scoringDeptDialog'

export default {
  components: {
    iCard,
    iPagination,
    tablelist,
    tpbRemarks,
    iButton,
    scoringDeptDialog
  },
  mixins: [pageMixins, rfqCommonFunMixins],
  data() {
    return {
      tableListData: [],
      tableTitle: supplierScoreTitle,
      tableLoading: false,
      selectTableData: [],
      dialogRemarks: false,
      selectedRowData: {},
      scoringDeptVisible: false,
      pushLoading: false
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
        try {
          const req = {
            rfqId: id,
            userId: store.state.permission.userInfo.id
          }
          const res = await getAllSupplier(req)
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
    sendTaskForRating() {
      this.pushLoading = true

      sendTaskForRating(this.selectTableData)
      .then(res => {
        if (res.code == 200) {
          iMessage.success(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
        }

        this.pushLoading = false
      })
      .catch(() => this.pushLoading = false)
    },
    uploadAttachments() {

    },
    openActionPropsPage(row) {
      const rfqId = this.$route.query.id
      const supplierId = row.id
      const params = serialize({
        rfqId,
        supplierId
      })
      this.$router.push({
        path: `/partsrfq/editordetail/partScoring?${params}`
      })
    },
    openMultiHeaderPropsPage(row) {
      this.selectedRowData = row
      this.dialogRemarks = true
    },
    //修改表格改动列
    handleSelectionChange(val) {
      this.selectTableData = val;
    },
    async handleRemarksSubmit(memo) {
      const req = {
        memo,
        supplierId: this.selectedRowData.id,
        rfqId: this.$route.query.id
      }
      const res = await setTpbMemo(req)
      this.resultMessage(res, () => {
        this.dialogRemarks = false
        this.getTableList()
      })
    },
    // 设置评分部门
    setScoringDept() {
      this.scoringDeptVisible = true
    }
  }
}
</script>

<style scoped>

</style>