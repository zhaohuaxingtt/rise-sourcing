<!--
 * @Author: wentliao
 * @Date: 2021-05-21 15:30:02
 * @Description: 决策资料-PartList
-->
<template>
  <div
    class="decision-data-partList"
    v-permission.auto="
      SOURCING_NOMINATION_ATTATCH_PARTLIST | (决策资料 - PartList)
    "
  >
    <div class="decision-data-partList-content">
      <!-- table区域 -->
      <tablelist
        height="100%"
        permissionKey="DESIGNATE_DESIGNATEDETAIL_DECISIONDATA_PARTLIST"
        ref="tableList"
        showTitleName
        :indexConfig='{
          width:60
        }'
        :selection="!isPreview"
        :index="isPreview"
        v-permission.auto="SOURCING_NOMINATION_ATTATCH_PARTLIST_TABLE | 表格"
        :tableData="tableListData"
        :tableTitle="tableTitle"
        :tableLoading="loading"
      >
        <!-- 采购项目编号 -->
        <template #fsNum="scope">
          <span>{{ scope.row.fsNum }}</span>
          <br>
          <span>({{ scope.row.procureFactory }})</span>
        </template>
        <!-- 零件信息 -->
        <template #partNum="scope">
          <div class="mtz-box">
            <span>{{ scope.row.partNum }}</span>
            <img class="margin-left5" :src="mtz" v-if="scope.row.mtz" alt="MTZ">
          </div>
          <span>{{ scope.row.partNameZh }}</span>
        </template>
        <!-- 项目信息 -->
        <template #project="scope">
          <span>{{ scope.row.project }}</span>
          <br />
          <span>SOP:{{ scope.row.sopDate ? scope.row.sopDate : "-" }}</span>
        </template>
        <!-- 装车率 -->
        <template #ebrConfirmValue="scope">
          <span class="link" @click="openDetail(scope.row)">{{
            percent(scope.row.ebrConfirmValue || 0)
          }}</span>
        </template>

        <!-- 手工输入EBR值:综合每车用量 -->
        <template #ebrCalculatedValue="scope">
          <span>{{
            numberProcessor(scope.row.ebrCalculatedValue,1)
          }}</span>
        </template>
        <template #lifeTime="scope">
          <span>{{ scope.row.lifeTime | toThousands(true) }}</span>
        </template>
        <template #paVolume="scope">
          <span>{{ scope.row.paVolume | toThousands(true) }}</span>
        </template>
      </tablelist>
    </div>
    <iPagination
      class="iPagination"
      @size-change="handleSizeChange($event, getListData)"
      @current-change="handleCurrentChange($event, getListData)"
      background
      :page-sizes="page.pageSizes"
      :page-size="page.pageSize"
      :layout="page.layout"
      :current-page="page.currPage"
      :total="page.totalCount"
      v-update
    />
    <detailDialog :visible.sync="visible" :row="row" />
  </div>
</template>

<script>
import { iCard, iButton, iPagination, iInput, icon, iMessage } from "rise";
import { pageMixins } from "@/utils/pageMixins";
import {
  getPartList,
  partUpdate,
} from "@/api/designate/designatedetail/decisionData/partlist";
import { numberProcessor, toThousands } from "@/utils";
import { tableTitle } from "./data";
import tablelist from "@/components/iTableSort";
import { tableSortMixins } from "@/components/iTableSort/tableSortMixins";
import buttonTableSetting from "@/components/buttonTableSetting";
import mtz from '@/assets/images/icon/mtz-icon.png'
import detailDialog from "./detailDialog";

export default {
  mixins: [pageMixins, tableSortMixins],
  components: {
    iCard,
    iButton,
    iPagination,
    iInput,
    icon,
    tablelist,
    buttonTableSetting,
    detailDialog,
  },
  filters: {
    toThousands,
  },
  created() {
    this.getListData();
  },
  data() {
    return {
      mtz,
      visible: false,
      loading: false,
      saveLoading: false,
      tableListData: [],
      tableTitle,
      row: {},
    };
  },
  computed: {
    // eslint-disable-next-line no-undef
    ...Vuex.mapState({
      nominationDisabled: (state) => state.nomination.nominationDisabled,
      rsDisabled: (state) => state.nomination.rsDisabled,
    }),
    isPreview() {
      return this.$store.getters.isPreview;
    },
    isRoutePreview() {
      return this.$route.query.isPreview == 1;
    },
    isApproval() {
      return this.$route.query.isApproval === "true";
    },
  },
  methods: {
    numberProcessor,
    openDetail(row) {
      this.row = row;
      this.$nextTick(() => {
        this.visible = true;
      });
    },
    // 获取列表
    async getListData() {
      const { query } = this.$route;
      const { desinateId = "" } = query;

      const { pageSize, currPage } = this.page;

      const data = {
        nominateId: desinateId,
        size: pageSize,
        current: currPage,
      };

      this.loading = true;

      await getPartList(data)
        .then((res) => {
          const { code, data } = res;
          if (code === "200" && data) {
            const { records = [], total } = data;
            this.tableListData = records.map((item) => {
              const result = { ...item };

              if (item.ebrConfirmValue) {
                result.ebrConfirmValue =
                  this.isPreview == "1" ||
                  this.nominationDisabled ||
                  this.rsDisabled
                    ? item.ebrConfirmValue
                    : this.percent(item.ebrConfirmValue);
              } else {
                result.ebrConfirmValue = "";
              }

              return result;
            });
            this.page.totalCount = total;
          }
        })
        .finally(() => (this.loading = false));
    },
    // 输入框 手工输入EBR值 数字的限制
    handleInputLimit(val, row) {
      this.$set(row, "ebrConfirmValue", numberProcessor(val, 2));
    },
    handleFocus(val, row) {
      this.$set(row, "ebrConfirmValue", val.replace(/^(.*)%$/, "$1"));
    },
    handleBlur(val, row) {
      if (val) {
        this.$set(row, "ebrConfirmValue", val + "%");
      } else {
        this.$set(row, "ebrConfirmValue", "");
      }
    },
    // 保存
    async save() {
      this.saveLoading = true;
      const data = {
        partPrjList: [
          ...this.tableListData.map((item) => ({
            ...item,
            ebrConfirmValue: item.ebrConfirmValue
              ? math
                  .divide(
                    math.bignumber(
                      item.ebrConfirmValue.replace(/^(.*)%$/, "$1")
                    ),
                    100
                  )
                  .toFixed(4)
              : "",
          })),
        ],
      };
      await partUpdate(data)
        .then((res) => {
          this.saveLoading = false;
          if (res.code == 200) {
            iMessage.success(
              this.$i18n.locale === "zh" ? res.desZh : res.desEn
            );
          } else {
            iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
          }
          this.getListData();
        })
        .catch((err) => {
          this.saveLoading = false;
        });
    },

    // 跳转至零件清单添加
    goToRfq() {
      const { query } = this.$route;
      console.log(query);
      const router = this.$router.resolve({
        path: "/designate/rfqdetail",
        query: {
          ...query,
          route: "force",
        },
      });
      window.open(router.href, "_blank");
    },
    percent(val) {
      return math.multiply(math.bignumber(val), 100).toString() + "%";
    },
  },
};
</script>

<style lang="scss" scoped>
.decision-data-partList {
  height: 100%;
  display: flex;
  flex-flow: column;
  ::v-deep .el-table {
    border-radius: 0;
    font-size: 18px;
    .el-table__header {
      background-color: #364d6e;
      th {
        border-color: #d9d9d9;
        .cell {
          color: #fff;
          line-height: 20px;
        }
      }
    }
    td {
      border-color: #d9d9d9;
      .cell {
        line-height: 20px;
      }
      .mtz-box{
        display: flex;
        align-items: center;
      }
    }
  }
  // 减去分页器高度
  .decision-data-partList-content {
    height: calc(100% - 45px);
    flex: 1;
  }
  // 45px
  ::v-deep .i-pagination {
    height: 35px;
    margin-top: 10px;
    .pagination {
      margin-top: 0;
      .el-pager li:not(.disabled).active {
        background-color: #364d6e;
      }
    }
  }
  ::v-deep .el-dialog .el-dialog__headerbtn {
    background: #364d6e;
  }
}
</style>