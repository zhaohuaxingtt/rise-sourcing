<template>
<div>
  <iSearch
    @sure="sure"
    @reset="reset"
    :resetKey="NORNIMATION_RESETBUTTON"
    :searchKey="NORNIMATION_CONFIRMBUTTON"
  >
    <el-form>
      <el-form-item label="会议名称">
        <iInput v-model="name"></iInput>
      </el-form-item>
      <el-form-item label="议题名称">
        <iInput v-model="name"></iInput>
      </el-form-item>
      <el-form-item label="科室/股别">
        <iInput v-model="name"></iInput>
      </el-form-item>
      <el-form-item label="申请编号/名称">
        <iInput v-model="name"></iInput>
      </el-form-item>
      <el-form-item label="审批结果">
        <iInput v-model="remark"></iInput>
      </el-form-item>
    </el-form>
  </iSearch>
  <i-card class="margin-top20" title="生产采购-RS审批列表">
    <iTableCustom 
      :data="tableData"
      :columns="tableTitle"
      :loading="tableLoading" />
      
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
import { iSearch, iInput, iCard, iTableCustom, iButton, iPagination } from "rise";
import { approveTable as tableTitle } from "./data";
import { pageMixins } from "@/utils/pageMixins";
export default {
  components: {
    iSearch,
    iInput,
    iCard,
    iTableCustom,
    iButton,
    iPagination
  },
    mixins: [pageMixins],
  data() {
    return {
      name: "",
      remark: "",
      tableData:[],
      tableTitle,
      tableLoading: false
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
  },
};
</script>

<style lang="scss" scoped>
</style>