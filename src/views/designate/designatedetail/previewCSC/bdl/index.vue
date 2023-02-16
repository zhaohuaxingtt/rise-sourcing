<!--
 * @Author: Luoshuang
 * @Date: 2021-05-25 17:00:48
 * @LastEditors: 余继鹏 917955345@qq.com
 * @LastEditTime: 2023-02-16 11:07:52
 * @Description: 定点管理-决策资料-BDL
 * @FilePath: \front-web\src\views\designate\designatedetail\decisionData\bdl\index.vue
-->

<template>
  <div ref="bdl" class="bdl">
    <div class="page-nav">
      <el-radio-group
        class="radio-group margin-bottom10"
        v-model="tab"
        @change="getTableList"
      >
        <template v-for="item in rfqList">
          <el-radio-button :label="item.id" :key="item.id"> </el-radio-button>
        </template>
      </el-radio-group>
    </div>
    <div :key="index" class="content">
      <span class="font18 font-weight">
        {{
          "RFQ NO." +
          (detail.id || "-") +
          ",RFQ Name:" +
          (detail.rfq_name || "-")
        }}</span
      >
      <div class="table-box margin-top10">
        <tableList
          :tableTitle.sync="tableTitle"
          :selection="false"
          :tableLoading="loading"
          index
          height="100%"
          :key="tab"
          :tableData="tableData"
          class="doubleHeader table"
          v-permission.auto="
            SOURCING_NOMINATION_ATTATCH_BDL_TABLE | (决策资料 - bdl - 表格)
          "
        >
          <template #supplierName="scope">
            <div>
              <p class="factoryDesc">
                <span>{{ scope.row.supplierName }}</span>
                <img class="mbdl" :src="MBDL" v-if="scope.row.isMbdl" alt="">
              </p>
              <el-tooltip
                effect="light"
                :content="`${language('LK_FRMPINGJI', 'FRM评级')}：${
                  scope.row.frmRate
                }`"
                v-if="$route.query.isPreview != 1 && scope.row.isFRMRate === 1"
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
            <img :src="success" v-if="scope.row.isQuotation" alt="">
          </template>
          <template #isPartQuotation="scope">
            <img :src="success" v-if="scope.row.isPartQuotation" alt="">
          </template>
          <template #isRefuse="scope">
            <img :src="success" v-if="scope.row.isRefuse" alt="">
          </template>
          <template #noQuotation="scope">
            <img :src="success" v-if="scope.row.noQuotation" alt="">
          </template>
        </tableList>
      </div>
      <iPagination
        v-update
        @size-change="(val) => sizeChange(val, index)"
        @current-change="(val) => currentChange(val, index)"
        background
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :layout="page.layout"
        :current-page="page.currPage"
        :total="page.totalCount"
      />
    </div>
  </div>
</template>

<script>
import {
  iCard,
  iPage,
  iPagination,
  iButton,
  iMessage,
  icon,
  iTabsList,
} from "rise";
import tableList from "@/components/iTableSort";
import { tableTitle } from "./data";
import partsRatingDialog from "./partsRating";
import {
  readQuotation,
  findRfqSupplierQuotationPage,
} from "@/api/designate/decisiondata/bdl";
import { pageMixins } from "@/utils/pageMixins";
import { cloneDeep } from "lodash";
import supplierBlackIcon from "@/views/partsrfq/components/supplierBlackIcon";
import filters from "@/utils/filters";
import success from '@/assets/images/csc-bdl-success.svg'
import MBDL from '@/assets/images/icon/mbdl-icon.png'
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
    iTabsList,
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
      success,
      MBDL,
      tab: "",
      rfqList: [],
      newRfqList: [],
      rateTableData: [],
      cntentHeight: null,
      tableData: [],
      loading: false,
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
    rfqObj() {
      let obj = {};
      this.rfqList.forEach((item) => {
        obj[item.id] = item;
      });
      return obj;
    },
    detail() {
      return this.rfqObj[this.tab] || {};
    },

    tableTitle() {
      const title = cloneDeep(tableTitle);
      let rates = [];
      this.tableData.forEach((item) => {
        (item.departmentRate || []).map((child) => {
          if (!rates.includes(child.rateDepartNum)) {
            rates.push(child.rateDepartNum);
          }
        });
      });
      let subList = ["E", "Q", "L"];
      title.push({
        props: "departmentRate",
        name: "Rating",
        key: "",
        tooltip: true,
        children: subList.map((item, i) => {
          if(i==2){
            return {
            props: rates[i] || item,
            name: `${item}(PL)`,
            key: "",
            type: "rate",
          };
          }
          return {
            props: rates[i] || item,
            name: `${item}(${rates[i] || "-"})`,
            key: "",
            type: "rate",
          };
        }),
      });

      if (this.hasTitle)
        title.unshift({ props: "index", name: "序号", key: "", width: 80 });
      return title;
    },
  },
  created() {
    this.init();
  },
  methods: {
    sizeChange() {
      (this.page.currPage = 1), this.getTableList();
    },
    currentChange() {
      this.getTableList();
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
     * @Description: 获取每个表格数据
     * @Author: Luoshuang
     * @param {*} element
     * @param {*} index
     * @return {*}
     */
    async getTableList() {
      this.loading = true;
      const { isExportPdf = false } = this;
      const params = {
        nominateId: this.$route.query.desinateId,
        rfqId: this.tab,
        current: this.page.currPage || 1,
        size: (isExportPdf ? 999999 : this.page.pageSize) || 10,
      };
      const res = await findRfqSupplierQuotationPage(params);
      if (res?.result) {
        let tableData = res?.data.map((child, i) => {
          if (this.hasTitle) child.index = 1 + i;
          return child;
        });
        this.tableData = tableData;
        this.page.totalCount = res.total;
      } else {
        iMessage.error(this.$i18n.locale === "zh" ? res?.desZh : res?.desEn);
      }
      this.loading = false;
    },
    /**
     * @Description: 获取rfq List和对应的表格数据
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */
    async getRfqAndTableList() {
      const res = await readQuotation(this.$route.query.desinateId);
      if (res?.result) {
        this.rfqList = res.data;
        this.tab = this.rfqList[0].id;
        this.getTableList(); // 默认显示第一个
      } else {
        iMessage.error(this.$i18n.locale === "zh" ? res?.desZh : res?.desEn);
      }
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
  width: 100%;
  display: inline-flex;
  justify-content: space-between;
  .text{
    flex: 1;
  }
  .mbdl{
    height: 100%;
    vertical-align: bottom;
  }
}
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
    ::v-deep .el-radio-group {
      &.radio-group {
        .el-radio-button__inner {
          display: flex;
          border-radius: 0;
          height: 26px;
          padding: 3px 10px;
          align-items: center;
          min-width: 60px;
          justify-content: center;
          &:hover {
            color: #727272;
          }
        }
        .el-radio-button__orig-radio:checked + .el-radio-button__inner {
          background: #364d6e;
          color: #fff;
          border-color: #e0e6ed;
        }
      }
    }
  }
  .content {
    overflow: auto;    
    flex: 1;
    .table-box {
      height: calc(100% - 84px);
    }
  }
}
.table {
  ::v-deep .el-table__header {
    tr {
      background-color: #364d6e;
    }
  }
}
</style>