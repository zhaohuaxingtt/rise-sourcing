<template>
  <i-page>
    <div class="pageTitle flex-between-center-center">
      <div class="flex nav-box">
        <span>{{ language('LK_LINGJIANPINGFEN','零件评分') }}</span>
      </div>
      <div class="btnList">
        <iButton @click="backPage">{{ language('LK_FANHUI','返回') }}</iButton>
        <iButton type="text" @click="log">
          <icon symbol name="iconrizhiwuzi" class="log-icon"/>
          <span class="log-word">{{ language('LK_RIZHI','日志') }}</span>
        </iButton>
        <span>
					<icon symbol name="icondatabaseweixuanzhong"></icon>
				</span>
      </div>
    </div>
    <iCard class="margin-top20">
      <tablelist
          :tableData="tableListData"
          :tableTitle="tableTitle"
          :tableLoading="tableLoading"
          @handleSelectionChange="handleSelectionChange"
          :index="true"
          @openMultiHeaderPropsPage="openMultiHeaderPropsPage"
          multi-header-props="memo"
          :multi-header-props-text="language('LK_CHAKAN','查看')"
          action-props=""
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
    <!------------------------------------------------------------------------>
    <!--                  备注弹框                                          --->
    <!------------------------------------------------------------------------>
    <tpb-remarks
        v-model="dialogRemarks"
        :memo="selectedRowData.memo"
        :disabled="true"
    />
  </i-page>

</template>

<script>
import {iCard, iPagination, iPage, icon, iButton} from 'rise';
import tablelist from './supplierScoreTableList'
import {partScroingTitle} from "./data";
import {pageMixins} from "@/utils/pageMixins";
import tpbRemarks from './tpbRemarks'
import {getSupplierAllParts, getAllParts} from "@/api/partsrfq/editordetail";
import { getRfqPartRatingsByCurrentDept } from "@/api/supplierscore"
import store from '@/store'
import { cloneDeep } from "lodash"
export default {
  components: {
    iCard,
    iPage,
    iPagination,
    iButton,
    icon,
    tablelist,
    tpbRemarks
  },
  mixins: [pageMixins],
  data() {
    return {
      tableListData: [],
      tableTitle: cloneDeep(partScroingTitle),
      tableLoading: false,
      selectTableData: [],
      dialogRemarks: false,
      selectedRowData: []
    };
  },
  created() {
    this.getTableList();
  },
  methods: {
    async getTableList() {
      const rfqId = this.$route.query.rfqId
      const supplierId = this.$route.query.supplierId
      if (rfqId && supplierId) {
        this.tableLoading = true;
        try {
          const res = await getAllParts({
            rfqId,
            supplierId
          })
          this.tableListData = Array.isArray(res.data) ? res.data : []
          this.tableTitle = cloneDeep(partScroingTitle)
          if (this.tableListData[0]) {
            this.tableTitle[this.tableTitle.length - 1].name = this.tableListData[0].rateTag
          }
          // const req = {
          //   supplierId,
          //   rfqId,
          //   userId:store.state.permission.userInfo.id,
          //   isFake: 1
          // }
          // const res = await getSupplierAllParts(req)
          // this.tableListData = res.records;
          // this.page.currPage = res.current
          // this.page.pageSize = res.size
          // this.page.totalCount = res.total
          this.tableLoading = false;
        } catch {
          this.tableLoading = false;
        } finally {
          this.tableLoading = false;
        }
      }
    },
    deleteItems() {
    },
    uploadAttachments() {

    },
    openMultiHeaderPropsPage(row) {
      this.dialogRemarks = true
      this.selectedRowData = row
    },
    //修改表格改动列
    handleSelectionChange(val) {
      this.selectTableData = val;
    },
    log() {
      window.open(`/#/log?recordId=`, '_blank')
    },
    backPage() {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped lang="scss">
.pageTitle {
  .nav-box {
    > span {
      font-size: 20px;
      font-weight: bold;
    }

    .ml30 {
      margin-left: 30px;
    }
  }

  .btnList {
    > span {
      font-size: 20px;
      margin-left: 30px;
    }
  }
}

.log-icon {
  font-size: 20px;
}

.log-word {
  color: $color-blue;
  margin-left: 4px;
}
</style>