<!--
 * @Author: wentliao
 * @Date: 2021-05-24 10:16:04
 * @Description: 决策资料-SingleSourcing
-->
<template>
  <iCard
    v-permission.auto="
      SOURCING_NOMINATION_ATTATCH_SINGLESOURCING | (决策资料 - SingleSourcing)
    "
  >
    <div class="margin-bottom10 infos">
      <span class="title"
        >生产采购单一供应商说明 Single Sourcing for Production Purchasing</span
      >
      <div>
        <span class="name">项⽬名称 Project:</span
        ><span class="value">{{ projectName }}</span>
        <span class="name margin-left40">定点申请单号 Project No.:</span
        ><span class="value">{{ nominateId }}</span>
      </div>
    </div>

    <div class="decision-data-singleSourcing-content">
      <!-- 表单部分 -->
      <div class="singleSourcing-table">
        <tableList
          :selection="false"
          class="table"
          index
          :tableData="tableListData"
          :tableTitle="tableTitle"
          :tableLoading="loading"
          v-permission.auto="
            SOURCING_NOMINATION_ATTATCH_SINGLESOURCING_TABLE |
              (决策资料 - SingleSourcing - 表格)
          "
        >
          <!-- 采购项目编号 -->
          <template #fsnrGsnrNum="scope">
            <span>{{ scope.row.fsnrGsnrNum }}</span>
            <br />
            <span>({{ scope.row.procureFactory }})</span>
          </template>

          <!-- 零件信息 -->
          <template #partNum="scope">
            <span>{{ scope.row.partNum }}</span>
            <br />
            <span>{{ scope.row.partNameEn }}</span>
          </template>
          <!-- 供应商 -->
          <template #sapCode="scope">
            <span class="factoryDesc margin-right5">{{
              scope.row.suppliersName
            }}</span>
            <el-tooltip
              effect="light"
              :content="`${language('LK_FRMPINGJI', 'FRM评级')}：${
                scope.row.frmRate
              }`"
              v-if="scope.row.isFRMRate === 1 && !isPreview"
            >
              <span>
                <icon symbol name="iconzhongyaoxinxitishi" />
              </span>
            </el-tooltip>
            <br />
            <span>{{
              scope.row.sapCode || scope.row.svwCode || scope.row.svwTempCode
            }}</span>
            <span> {{ scope.row.suppliersNameEn }}</span>
          </template>
          <template #singleReason="scope">
            <div>
              <p>{{ scope.row.singleReason }}</p>
              <p>{{ scope.row.singleReasonEng }}</p>
            </div>
          </template>
        </tableList>
        <iPagination
          class="margin-bottom20"
          @size-change="handleSizeChange($event, getDetail)"
          @current-change="handleCurrentChange($event, getDetail)"
          background
          :page-sizes="page.pageSizes"
          :page-size="page.pageSize"
          :layout="page.layout"
          :current-page="page.currPage"
          :total="page.totalCount"
          v-update
        />
      </div>
    </div>
  </iCard>
</template>

<script>
import {
  iCard,
  iPagination,
  iFormGroup,
  iFormItem,
  iText,
  iMessage,
  icon,
  iButton,
} from "rise";
import { pageMixins } from "@/utils/pageMixins";
// import tableList from "@/views/partsign/editordetail/components/tableList"

// import tableList from '../../components/tableList'
import tableList from "@/components/iTableSort";
import { getSingleSourcing } from "@/api/designate/decisiondata/singleSourcing";
import { tableTitle } from "./data";
export default {
  mixins: [pageMixins],
  components: {
    iCard,
    iPagination,
    iFormGroup,
    iFormItem,
    iText,
    tableList,
    icon,
    iButton,
  },
  name: "SingleSourcing",
  data() {
    return {
      loading: false,
      tableListData: [],
      tableTitle,
      projectName: "",
      nominateId: "",
      fix: false,
    };
  },
  created() {
    this.getDetail();
    this.fix = this.$route.query.fix === "1";
  },
  computed: {
    isPreview() {
      return this.$store.getters.isPreview;
    },
    // 定点状态
    applicationStatus() {
      return this.$store.getters.applicationStatus;
    },
    isRoutePreview() {
      return this.$route.query.isPreview == 1;
    },
    isApproval() {
      return this.$route.query.isApproval === "true";
    },
  },
  methods: {
    // 获取详情
    async getDetail() {
      this.loading = true;
      const { query } = this.$route;
      const { desinateId = "" } = query;
      const { page } = this;
      const params = {
        nominateId: desinateId,
        current: page.currPage,
        size: page.pageSize,
      };
      await getSingleSourcing(params)
        .then((res) => {
          const { code, data = {} } = res;
          if (code == "200") {
            const {
              resultPage = {},
              nominateId = "",
              cartypeProjectZhList = [],
            } = data;
            const { total } = resultPage;
            this.tableListData = resultPage.data || [];
            this.page.totalCount = total;
            this.nominateId = nominateId;
            this.projectName = cartypeProjectZhList
              ? cartypeProjectZhList.join()
              : "";
          } else {
            iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
          }
          this.loading = false;
        })
        .catch((e) => {
          e && iMessage.error(this.$i18n.locale === "zh" ? e.desZh : e.desEn);
          this.loading = false;
        });
    },

    // 跳转至跳转供应商维护
    gotoSupplier() {
      const { query } = this.$route;
      console.log(query);
      const router = this.$router.resolve({
        path: "/designate/supplier",
        query: {
          ...query,
          route: "force",
        },
      });
      window.open(router.href, "_blank");
    },
  },
};
</script>

<style lang="scss" scoped>
.infos {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  font-weight: bold;
  // .title, .name, .value{
  //     font-size: 20px;
  //     font-weight: bold;
  // }
}
.decision-data-singleSourcing-content {
  .singleSourcing-table {
    ::v-deep .el-table .cell {
      white-space: pre-line;
    }
  }

  .fromGroup {
    ::v-deep .el-form-item__label {
      width: auto;
    }

    ::v-deep .el-form-item__content {
      .itext {
        height: 100%;
      }
    }
  }
}
</style>