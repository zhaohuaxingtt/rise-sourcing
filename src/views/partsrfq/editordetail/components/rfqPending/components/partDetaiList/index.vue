<!--
* @author:shujie
* @Date: 2021-2-25 11:42:11
 * @LastEditors: Please set LastEditors
* @Description: 待办事项-零件清单
 -->
<template>
  <iCard>
    <div class="header flex-align-center">
      <iButton v-permission="PARTSRFQ_EDITORDETAIL_PARTDETAILIST_DELETE">{{ $t('delete') }}</iButton>
      <iButton @click="showApplyPrice" v-permission="PARTSRFQ_EDITORDETAIL_PARTDETAILIST_NEWPRICE">
        {{ $t('LK_XINSHENQINGCAIWUMUBIAOJIA') }}
      </iButton>
      <iButton @click="againApply" v-permission="PARTSRFQ_EDITORDETAIL_PARTDETAILIST_REAPPLYPRICE">再新申请财务目标价</iButton>
    </div>
    <tableList :tableData="tableListData" :tableTitle="tableTitle" :tableLoading="confirmTableLoading"
               @handleSelectionChange="handleSelectionChange" @openPage="openPage"></tableList>
    <iPagination @size-change="handleSizeChange($event, getTableList)"
                 @current-change="handleCurrentChange($event, getTableList)" background :page-sizes="page.pageSizes"
                 :page-size="page.pageSize" :layout="page.layout" :total="page.totalCount"></iPagination>
    <div class="addFs flex-align-center">
      <iButton @click="start" :loading="addLoding" v-permission="PARTSRFQ_EDITORDETAIL_PARTDETAILIST_ADD">添加</iButton>
    </div>
    <partsTable ref="partsTable" :rfqId="rfqId" @targetHand="waitSelect"></partsTable>
    <!-- 新申请财务目标价 -->
    <applyPrice ref="applyPrice" @refresh="getTableList" :handleSelectArr="handleSelectArr"></applyPrice>
  </iCard>
</template>

<script>
import {
  iButton,
  iCard,
  iPagination,
  iMessage
} from "@/components";
import tableList from "@/views/partsign/home/components/tableList";
import {
  tableTitle,
  form
} from "@/views/partsprocure/home/components/data";
import {
  getPartSrcPrjs,
} from '@/api/partsrfq/editordetail';
import {
  addRfq
} from '@/api/partsrfq/home';
import {
  pageMixins
} from "@/utils/pageMixins";
import applyPrice from "./components/applyPrice";
import partsTable from './components/partsTable'
import store from "@/store";
import {rfqCommonFunMixins} from "pages/partsrfq/components/commonFun";

export default {
  mixins: [pageMixins, rfqCommonFunMixins],
  components: {
    iButton,
    iCard,
    tableList,
    iPagination,
    applyPrice,
    partsTable
  },
  created() {
    this.rfqId = this.$route.query.id
    this.getTableList();
  },
  data() {
    return {
      tableTitle,
      tableListData: [],
      confirmTableLoading: false,
      handleSelectArr: [], // 已在RFQ中零件选中数据
      waitHandleSelectArr: [], //未在RFQ中零件选中数据
      applyPriceShow: false, //显示财务申请价
      parmarsHasRfq: JSON.parse(JSON.stringify(form)),
      rfqId: "",
      addLoding: false,
    };
  },
  methods: {
    // 已在RFQ中零件选中数据
    handleSelectionChange(e) {
      this.handleSelectArr = e;
    },
    // 未在RFQ中零件选中数据
    waitSelect(e) {
      this.waitHandleSelectArr = e
    },
    // 跳转详情
    openPage(item) {
      this.$router.push({
        path: "/partsprocure/editordetail",
        query: {
          item: JSON.stringify(item),
        },
      });
    },
    validateStart() {
      return new Promise((r) => {
        if (this.waitHandleSelectArr.length == 0) {
          r(false);
          iMessage.warn(`抱歉，您当前还未选择需要添加的采购项目！`);
          return;
        }
        if (this.waitHandleSelectArr.find((items) => items.fsnrGsnrNum == "")) {
          r(false);
          iMessage.warn(
              `抱歉，当前采购项目中存在还未生成FSNR的数据，无法为您添加！`
          );
          return;
        }
        r(true);
      });
    },
    // 添加
    async start() {
      if (!(await this.validateStart())) return;
      this.addLoding = true;
      addRfq({
        insertRfcPackage: {
          operationType: '1',
          userId: store.state.permission.userInfo.id || '',
          userName: store.state.permission.userInfo.userName,
          rfqPartDTOList: this.waitHandleSelectArr,
          rfqId: this.rfqId
        }
      })
          .then((res) => {
            this.addLoding = false;
            if (res.data && res.data.rfqId) {
              this.getTableList()
              this.$refs.applyPrice.getTableList()
              this.$refs.partsTable.getTableList()
              this.resultMessage(res)
            } else {
              this.resultMessage(res)
            }
          })
          .catch(() => {
            this.addLoding = false;
          });
    },
    //获取表格数据
    getTableList() {
      this.confirmTableLoading = true
      this.parmarsHasRfq['search.size'] = this.page.pageSize
      this.parmarsHasRfq['search.current'] = this.page.currPage
      this.parmarsHasRfq['search.rfqId'] = this.rfqId
      this.parmarsHasRfq['search.projectStatus'] = '12'
      getPartSrcPrjs(this.parmarsHasRfq).then(res => {
        this.confirmTableLoading = false
        this.page.currPage = res.data.pageData.pageNum
        this.page.pageSize = res.data.pageData.pageSize
        this.page.totalCount = res.data.pageData.total
        this.tableListData = res.data.pageData.data
      }).catch(() => this.confirmTableLoading = false)
    },
    // 新申请财务目标价
    showApplyPrice() {
      if (this.handleSelectArr.length < 0) {
        iMessage.warn(`抱歉，您当前还未选择需要申请目标价的采购项目！`);
        return
      }
      this.$refs.applyPrice.show()
    },
    // 再次申请财务目标价
    againApply() {
      this.$refs.applyPrice.againShow()
    },
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

//  thead .el-table-column--selection .cell{
//   display: none;
// }
</style>
