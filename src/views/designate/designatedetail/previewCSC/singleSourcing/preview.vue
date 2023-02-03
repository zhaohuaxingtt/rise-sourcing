<!--
 * @Author: wentliao
 * @Date: 2021-05-24 10:16:04
 * @Description: 决策资料-SingleSourcing
-->
<template>
  <iCard
    title="生产采购单一供应商说明 Single Sourcing for Production Purchasing"
  >
    <div class="decision-data-singleSourcing-content">
      <div class="margin-top30 margin-bottom30">
        <iFormGroup class="fromGroup" inline row="2">
          <iFormItem label="项⽬名称 Project:">
            <iText tooltip style="width: 250px">{{ projectName }}</iText>
          </iFormItem>
          <iFormItem label="定点申请单号 Project No.:">
            <iText style="width: 250px">{{ nominateId }}</iText>
          </iFormItem>
        </iFormGroup>
      </div>
      <!-- 表单部分 -->
      <div class="singleSourcing-table">
        <tableList
          :selection="false"
          class="table"
          index
          :tableData="tableListData"
          :tableTitle="tableTitle"
          :tableLoading="loading"
        >
          <template #suppliersName="scope">
            <div>
              <span class="factoryDesc margin-right5">{{
                scope.row.suppliersName
              }}</span>
              <br />
              <span>{{ scope.row.suppliersNameEn }}</span>
            </div>
          </template>
          <!-- 零件名称 -->
          <template #partNameCh="scope">
            <span>{{ scope.row.partNameCh }}</span>
            <br />
            <span>{{ scope.row.partNameEn }}</span>
          </template>
          <template #sapCode="scope">
            <span>{{
              scope.row.sapCode || scope.row.svwCode || scope.row.svwTempCode
            }}</span>
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

import tableList from "../../components/tableList";
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
    };
  },
  created() {
    this.getDetail();
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
  },
};
</script>

<style lang="scss" scoped>
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