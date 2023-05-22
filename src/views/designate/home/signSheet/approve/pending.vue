<template>
  <div>
    <iSearch
      @sure="sure"
      @reset="reset"
      :resetKey="NORNIMATION_RESETBUTTON"
      :searchKey="NORNIMATION_CONFIRMBUTTON"
    >
      <el-form>
        <el-form-item label="签字单名称">
          <iInput v-model="searchForm.signName"></iInput>
        </el-form-item>
        <el-form-item label="备注">
          <iInput v-model="searchForm.remark"></iInput>
        </el-form-item>
      </el-form>
    </iSearch>
    <i-card class="margin-top20" title="生产采购-RS审批列表">
      <template slot="header-control">
        <iButton @click="signApprove(1)">批准</iButton>
        <iButton @click="signApprove(0)">拒绝</iButton>
      </template>
      <iTableCustom
        :data="tableData"
        :columns="tableTitle"
        :loading="tableLoading"
        @openDetail="openDetail"
        @handle-selection-change="handleSelectionChange"
      />
      <iPagination
        v-update
        @size-change="handleSizeChange($event, getData)"
        @current-change="handleCurrentChange($event, getData)"
        background
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :layout="page.layout"
        :current-page="page.currPage"
        :total="page.totalCount"
      />
    </i-card>
  </div>
</template>

<script>
import {
  iSearch,
  iInput,
  iCard,
  iTableCustom,
  iButton,
  iPagination,
  iMessage,
} from "rise";
import { pendingTable as tableTitle } from "./data";
import { pageMixins } from "@/utils/pageMixins";
import {
  getPendingApproval,
  signApprove,
} from "@/api/designate/nomination/mApprove";
export default {
  components: {
    iSearch,
    iInput,
    iCard,
    iTableCustom,
    iButton,
    iPagination,
  },
  mixins: [pageMixins],
  data() {
    return {
      searchForm: {
        signName: "",
        remark: "",
      },
      tableData: [],
      tableTitle,
      tableLoading: false,
      selectData: [],
    };
  },
  created() {
    this.getData();
  },
  methods: {
    sure() {
      this.page.currPage = 1;
      this.getData();
    },
    reset() {
      this.searchForm = {
        signName: "",
        remark: "",
      };
      this.sure();
    },
    getData() {
      let params = {
        ...this.searchForm,
        current: this.page.currPage,
        size: this.page.pageSize,
      };
      getPendingApproval(params).then((res) => {
        if (res?.code == 200) {
          this.tableData = res.data.records;
          this.page.totalCount = res.data.total;
        }
      });
    },
    handleSelectionChange(val) {
      this.selectData = val;
    },
    openDetail(row) {
      const router = this.$router.resolve({
        path: "/sourcing/partsnomination/signSheet/approve/details",
        query: {
          signId: row.signId,
          signCode: row.signCode,
        },
      });
      window.open(router.href, "_blank");
    },
    signApprove(isAgree) {
      // 0拒绝、1同意
      if (!this.selectData.length) return iMessage.warn("请选择至少一条数据");
      let params = {
        isAgree: isAgree, // 0拒绝、1同意
        isConfirm: 1, // 是否确认弹窗请求，1-是，0-否
        reason: isAgree ? "【同意】" : "【拒绝】", // 原因
        signIds: this.selectData.map((item) => {
          return item.signId;
        }),
      };
      signApprove(params).then(async (res) => {
        if (res?.code == 200) {
          iMessage.success("操作成功");
          this.getData();
        } else {
          await this.$confirm(
            this.$i18n.locale == 'zh' ? res.desZh : res.desEn,
            this.language("LK_WENXINTISHI", "温馨提示"),
            {
              confirmButtonText: this.language("LK_QUEDING", "确定"),
              cancelButtonText: this.language("LK_QUXIAO", "取 消"),
            }
          )
            .then(() => {
              let params = {
                isAgree: isAgree, // 0拒绝、1同意
                isConfirm: 0, // 是否确认弹窗请求，1-是，0-否
                reason: isAgree ? "【同意】" : "【拒绝】", // 原因
                signIds: this.selectData.map((item) => {
                  return item.signId;
                }),
              };
              signApprove(params).then((res) => {
                if (res?.code == 200) {
                  iMessage.success("操作成功");
                  this.getData();
                } else {
                  iMessage.error("操作失败");
                }
              });
            })
            .catch(() => {});
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>