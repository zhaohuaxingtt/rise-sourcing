<template>
  <iCard
  >
    <!-- 附件 -->
    <commonTable
      ref="tableDataForm"
      :tableData="attchmentsPage"
      :tableTitle="attachTableTitle"
      :tableLoading="tableLoading"
      @handleSelectionChange="handleSelectionChange"
      :selection="false"
    >
      <template slot="index" slot-scope="scope">
        <div>{{ scope.row.index + 1 }}</div>
      </template>
      <template slot="attachmentName" slot-scope="scope">
        <div class="form-item-attachName" @click="handleDown(scope)">
          {{ scope.row["attachmentName"] }}
        </div>
      </template>
      <template slot="attachmentSize" slot-scope="scope">
        <div>
          {{ scope.row["attachmentSize"] + "MB" }}
        </div>
      </template>
      <template slot="updateDate" slot-scope="scope">
        <div>
          {{ scope.row["updateDate"].replace("T", " ") || "" }}
        </div>
      </template>
    </commonTable>
    <iPagination
      v-update
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
      background
      :page-sizes="page.pageSizes"
      :page-size="page.pageSize"
      :prev-text="language('BIDDING_SHANGYIYE','上一页')"
      :next-text="language('BIDDING_XIAYIYE','下一页')"
      :layout="page.layout"
      :current-page="page.currPage"
      :total="total"
    />
  </iCard>
</template>

<script>
import { iPagination,iCard } from "rise";
import commonTable from "@/components/biddingComponents/commonTable";
import { pageMixins } from "@/utils/pageMixins";
import { attachTableTitle } from "./data";
import { getFileId } from "@/api/mock/mock";
export default {
  mixins: [pageMixins],
  components: {
    commonTable,
    iPagination,
    iCard
  },
  props: {
    value: {
      type: Object,
      default: () => ({}),
    },
    tableLoading: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        console.log(74,val);
        this.ruleForm = val;
      },
    },
  },
  data() {
    return {
      ruleForm: {},
      tableListData: [],
      // tableLoading: false,
      attachTableTitle,
      selectProps: [],
      size: "",
    };
  },
  computed: {
    total() {
      console.log(this.attchmentsPage)
      console.log(this.attachments)
      return this.ruleForm.attachments?.length;
    },
    attchmentsPage() {
      const { attachments } = this.ruleForm;
      const { currPage, pageSize } = this.page;
      return attachments?.slice((currPage - 1) * pageSize, pageSize * currPage);
    },
  },
  methods: {
    handleSelectionChange(val) {
      this.$emit("handleSelectionChange", val);
    },
    handleDown(scope) {
      console.log(scope);
      const fileId = scope.row.attachmentId;
      const name = scope.row.attachmentName;

      window.open(`${ window.location.origin }${ process.env.VUE_APP_BASE_UPLOAD_API }/fileud/getFileByFileId?fileId=${ fileId }`, "_blank")
    },
    handleCurrentChange(e) {
      this.page.currPage = e;
    },
    handleSizeChange(val) {
      this.page.currPage = 1;
      this.page.pageSize = val;
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .el-table {
  .el-form-item {
    margin-top: 0;
    margin-bottom: 0;
  }
}
.form-item-attachName {
  color: blue;
  cursor: pointer;
}
</style>
