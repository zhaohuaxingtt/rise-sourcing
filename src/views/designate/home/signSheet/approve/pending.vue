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
          <iInput v-model="name"></iInput>
        </el-form-item>
        <el-form-item label="备注">
          <iInput v-model="remark"></iInput>
        </el-form-item>
      </el-form>
    </iSearch>
    <i-card class="margin-top20" title="生产采购-RS审批列表">
      <template slot="header-control">
        <iButton @click="confirm">批准</iButton>
        <iButton @click="reject">拒绝</iButton>
      </template>
      <iTableCustom
        :data="tableData"
        :columns="tableTitle"
        :loading="tableLoading"
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
} from "rise";
import { pendingTable as tableTitle } from "./data";
import { pageMixins } from "@/utils/pageMixins";
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
      name: "",
      remark: "",
      tableData: [],
      tableTitle,
      tableLoading: false,
    };
  },
  created() {
    this.getData();
  },
  methods: {
    sure() {
      console.log("sure");
    },
    reset() {
      console.log("reset");
    },
    getData() {},
    confirm() {
      console.log("confirm");
    },
    reject() {
      console.log("reject");
    },
  },
};
</script>

<style lang="scss" scoped>
</style>