<!--
 * @Author: Luoshuang
 * @Date: 2021-05-25 17:00:48
 * @LastEditors: 余继鹏 917955345@qq.com
 * @LastEditTime: 2023-02-10 14:47:43
 * @Description: 定点管理-决策资料-BDL
 * @FilePath: \front-web\src\views\designate\designatedetail\decisionData\bdl\index.vue
-->

<template>
  <div ref="bdl" class="bdl">
    <!-- <div ref="rsPdfCard"> -->
      <div class="page-nav">
      <iTabsList class="preview-tabs" type="card" v-model="tab">
        <template v-for="item in refIdList">
          <el-tab-pane :name="item.id" :label="item.id" :key="item.id">
          </el-tab-pane>
        </template>
      </iTabsList>
      </div>
      <!-- <template v-for="(item, index) in rfqList"></template> -->
    <div :key="index" class="content">
      <template v-if="detail.tableData && detail.tableTitle">
        <span class="font18 font-weight">
          {{
            "RFQ NO." +
            (detail.rfqNum || "-") +
            ",RFQ Name:" +
            (detail.rfqName || "-")
          }}</span
        >
        <div class="table-box margin-top10">
          <tableList
            :tableRowClassName="'table-row' + index"
            :tableTitle="detail.tableTitle"
            :selection="false"
            index
            :tableData="detail.tableData"
            class="doubleHeader table"
            @openDialog="openRateDialog($event, detail.rfqNum)"
            v-permission.auto="
              SOURCING_NOMINATION_ATTATCH_BDL_TABLE | (决策资料 - bdl - 表格)
            "
          >
            <template #supplierName="scope">
              <div>
                <span class="factoryDesc">{{ scope.row.supplierName }}</span>
                <span v-if="!scope.row.isMbdl">MBDL</span>
                <el-tooltip
                  effect="light"
                  :content="`${language('LK_FRMPINGJI', 'FRM评级')}：${
                    scope.row.frmRate
                  }`"
                  v-if="
                    $route.query.isPreview != 1 && scope.row.isFRMRate === 1
                  "
                >
                  <span>
                    <icon symbol name="iconzhongyaoxinxitishi" />
                  </span>
                </el-tooltip>
                <supplierBlackIcon
                  :isShowStatus="
                    typeof scope.row.isComplete === 'boolean'
                      ? !scope.row.isComplete
                      : false
                  "
                  :BlackList="scope.row.blackStuffs || []"
                />
                <div>
                  <span>{{ scope.row.sapCode }}</span>
                  {{ scope.row.supplierNameEn }}
                </div>
              </div>
            </template>
            <template #isQuotation="scope">
              <icon
                v-if="scope.row.isQuotation"
                symbol
                name="iconxialakuang_qiehuanlingjian_yiwancheng"
              />
            </template>
            <template #isPartQuotation="scope">
              <icon
                v-if="scope.row.isPartQuotation"
                symbol
                name="iconxialakuang_qiehuanlingjian_yiwancheng"
              />
            </template>
            <template #isRefuse="scope">
              <icon
                v-if="scope.row.isRefuse"
                symbol
                name="iconxialakuang_qiehuanlingjian_yiwancheng"
              />
            </template>
            <template #noQuotation="scope">
              <icon
                v-if="scope.row.noQuotation"
                symbol
                name="iconxialakuang_qiehuanlingjian_yiwancheng"
              />
            </template>
          </tableList>
        </div>
        <iPagination
          v-update
          @size-change="(val) => sizeChange(val, index)"
          @current-change="(val) => currentChange(val, index)"
          background
          :page-sizes="detail.page.pageSizes"
          :page-size="detail.page.pageSize"
          :layout="detail.page.layout"
          :current-page="detail.page.currPage"
          :total="detail.page.totalCount"
        />
      </template>
    </div>
  </div>
</template>

<script>
import { iCard, iPage, iPagination, iButton, iMessage, icon, iTabsList } from "rise";
// import tableList from '../../components/tableList'
import tableList from "@/components/iTableSort";
import { tableTitle } from "./data";
import partsRatingDialog from "./partsRating";
import {
  readQuotation,
  findRfqSupplierQuotationPage,
} from "@/api/designate/decisiondata/bdl";
import { pageMixins } from "@/utils/pageMixins";
import { cloneDeep, uniq } from "lodash";
import supplierBlackIcon from "@/views/partsrfq/components/supplierBlackIcon";
import filters from "@/utils/filters";
export default {
  mixins: [pageMixins, filters],
  components: {
    iCard,
    iPage,
    tableList,
    iPagination,
    partsRatingDialog,
    iButton,
    icon,
    supplierBlackIcon,
    iTabsList
  },
  props: {
    isExportPdf: {
      type: Boolean,
      default: false,
    },
    tableList: { type: Array, default: () => [] },
    prototypeTableList: { type: Array, default: () => [] },
  },
  data() {
    return {
      tab:'',
      refIdList:[],
      rfqList: [],
      newRfqList: [],
      tableTitle: [],
      dialogVisible: false,
      rateTableData: [],
      cntentHeight: null,
    };
  },
  computed: {
    isPreview() {
      return this.$store.getters.isPreview || this.otherPreview;
    },
    // 定点状态
    applicationStatus() {
      return this.$store.getters.applicationStatus;
    },
    userName() {
      return this.$i18n.locale === "zh"
        ? this.$store.state.permission.userInfo.nameZh
        : this.$store.state.permission.userInfo.nameEn;
    },
    hasTitle() {
      return (this.$slots.tabTitle && true) || false;
    },
    rfqObj(){
      let obj = {}
      this.rfqList.forEach(item=>{
        obj[item.rfqNum] = item
      })
      return obj
    },
    detail(){
      return this.rfqObj[this.tab] || {}
    }
  },
  created() {
    this.init();
  },
  methods: {sizeChange(val, index) {
      this.rfqList[index].page = {
        ...this.rfqList[index].page,
        currPage: 1,
        pageSize: val,
      };
      const element = {
        id: this.rfqList[index].rfqNum,
        rfq_name: this.rfqList[index].rfqName,
      };
      this.getTableList(element, index);
    },
    currentChange(val, index) {
      this.rfqList[index].page = {
        ...this.rfqList[index].page,
        currPage: val,
      };
      const element = {
        id: this.rfqList[index].rfqNum,
        rfq_name: this.rfqList[index].rfqName,
      };
      this.getTableList(element, index);
    },
    openRateDialog(row, rfqId) {
      this.rfqId = rfqId;
      this.supplierId = row.supplierNo;
      this.rateTableData = row.partRatingList;
      this.changeDialogVisible(true);
    },
    /**
     * @Description: 初始化页面
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */
    init() {
      this.getRfqAndTableList();
    },
    /**
     * @Description: 动态获取表格title
     * @Author: Luoshuang
     * @param {*} tableData
     * @return {*}
     */
    getTableTitle(tableData) {
      const title = cloneDeep(tableTitle);
      const rates = uniq(
        tableData.reduce((accum, curr) => {
          return [
            ...accum,
            ...(curr.departmentRate || []).map((item) => item.rateDepartNum),
          ];
        }, [])
      );
      title.push({
        props: "departmentRate",
        name: "Rating",
        key: "",
        tooltip: true,
        children: rates.map((item) => {
          return {
            props: item,
            name: item,
            key: "",
            type: "rate",
          };
        }),
      });

      if (this.hasTitle)
        title.unshift({ props: "index", name: "序号", key: "", width: 80 });
      return title;
    },
    /**
     * @Description: 获取每个表格数据
     * @Author: Luoshuang
     * @param {*} element
     * @param {*} index
     * @return {*}
     */
    async getTableList(element, index) {
      const { isExportPdf = false } = this;
      const params = {
        nominateId: this.$route.query.desinateId,
        rfqId: element.id,
        current: this.rfqList[index].page.currPage || 1,
        size: (isExportPdf ? 999999 : this.rfqList[index].page.pageSize) || 10,
      };
      const res = await findRfqSupplierQuotationPage(params);
      if (res?.result) {
        let tableData = res?.data.map((child, i) => {
          if (this.hasTitle) child.index = 1 + i;
          return child;
        });
        this.rfqList = this.rfqList.map((item, rfqIndex) => {
          return rfqIndex === index
            ? {
                tableList: [],
                rfqNum: element.id,
                rfqName: element.rfq_name,
                tableData: tableData || [],
                tableTitle: this.getTableTitle(res.data),
                page: {
                  ...item.page,
                  pageSize: Number(res?.pageSize),
                  currPage: Number(res?.pageNum),
                  totalCount: Number(res?.total),
                },
              }
            : item;
        });
        console.log("rfqList=>", this.rfqList);
      } else {
        iMessage.error(this.$i18n.locale === "zh" ? res?.desZh : res?.desEn);
      }
    },
    /**
     * @Description: 获取rfq List和对应的表格数据
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */
    async getRfqAndTableList() {
      const res = await readQuotation(this.$route.query.desinateId);
      this.rfqList = [];
      if (res?.result) {
        this.refIdList = res.data
        this.tab = this.refIdList[0].id
        res.data.forEach((element, index) => {
          this.rfqList.push({
            page: this.page,
          });
          this.getTableList(element, index);
        });
      } else {
        iMessage.error(this.$i18n.locale === "zh" ? res?.desZh : res?.desEn);
      }
    },
    /**
     * @Description: 零件评分弹窗控制
     * @Author: Luoshuang
     * @param {*} visible
     * @return {*}
     */
    changeDialogVisible(visible) {
      this.dialogVisible = visible;
    },
    /**
     * @Description: 跳转单一供应商
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */
    gotoSupplier() {
      const router = this.$router.resolve({
        path: "/designate/supplier",
        query: {
          ...this.$route.query,
          route: "force",
        },
      });
      window.open(router.href, "_blank");
    },
  },
};
</script>

<style lang="scss" scoped>
.rsPdfCard {
  box-shadow: none;
  & + .rsCard {
    margin-top: 20px; /*no*/
  }
  ::v-deep .cardHeader {
    padding: 30px 0px;
  }
  ::v-deep .cardBody {
    padding: 0px;
  }
}
.factoryDesc {
  display: inline-block;
  padding-right: 3px;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 95%;
  vertical-align: middle;
}
.decision-bdl {
  // padding: 0;
}
// .doubleHeader {
//   border: none;
//   &::before, &::after {
//     background-color: transparent;
//   }
//   ::v-deep thead th:not(.is-leaf) {
//     border-left: 1px solid #fff;
//     border-bottom: 1px solid #fff;
//   }
//   ::v-deep thead tr:nth-of-type(2) {
//     th {
//       border-left: 1px solid #fff;
//     }
//   }
//   ::v-deep tbody td {
//     border-right: none;
//   }
// }

.page-logo {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  align-items: center;
  border-top: 1px solid #666;
}

.bdl {
  height: 100%;
  padding-top: 20px;
  
.page-nav {
  display: flex;
  align-items: center;
}
  .content{
    height: calc(100% - 39px);
    overflow: auto;
    .table-box {
      height: calc(100% - 84px);
    }
  }
}
.table {
  ::v-deep .el-table__header {
    background-color: #364d6e;
  }
}
</style>