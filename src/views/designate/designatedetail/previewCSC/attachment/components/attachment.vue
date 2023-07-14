<!--
 * @Author: haojiang
 * @Date: 2021-05-27 09:42:07
 * @LastEditTime: 2023-03-13 09:23:15
 * @LastEditors: 余继鹏 917955345@qq.com
 * @Description: 决策资料 - 附件
-->
<template>
  <iCard class="attachment margin-bottom25">
    <div class="margin-bottom25 clearFloat">
      <span class="font18 font-weight">
        {{ language("Attachment", "Attachment") }}
      </span>
    </div>
    <tablelist
      index
      :selection="true"
      :tableData="dataList"
      :tableTitle="uploadtableTitle"
      :tableLoading="tableLoading"
      v-loading="tableLoading"
      @handleSelectionChange="handleSelectionChange"
      v-permission.auto="
        SOURCING_NOMINATION_ATTATCH_ATTACHMENT_TABLE | (Attachment - 表格)
      "
    >
      <template #fileName="scope">
        <span class="link-underline" @click="download(scope.row)">{{
          scope.row.fileName
        }}</span>
      </template>
      <template #uploadDate="scope">
        {{ scope.row.uploadDate | dateFilter("YYYY-MM-DD") }}
      </template>
    </tablelist>
    <iPagination
      v-update
      @size-change="handleSizeChange($event, getFetchDataList)"
      @current-change="handleCurrentChange($event, getFetchDataList)"
      background
      :current-page="page.currPage"
      :page-sizes="page.pageSizes"
      :page-size="page.pageSize"
      :layout="page.layout"
      :total="page.totalCount"
    />
  </iCard>
</template>

<script>
import { uploadtableTitle } from "./data";
import tablelist from "@/views/designate/supplier/components/tableList";
import { iCard, iButton, iPagination } from "rise";
import { attachMixins } from "@/utils/attachMixins";
import { pageMixins } from "@/utils/pageMixins";

export default {
  mixins: [attachMixins, pageMixins],
  components: {
    iCard,
    iButton,
    iPagination,
    tablelist,
  },
  data() {
    return {
      nomiAppId: this.$route.query.desinateId || "",
      tableLoading: false,
      uploadtableTitle,
      multiEditState: false,
      multiEditControl: false,
      selectMultiData: [],
      page: {
        currPage: 1,
        pageSizes: 10,
        totalCount: 0,
        layout: "prev, pager, next, jumper",
      },
    };
  },
  computed: {
    // eslint-disable-next-line no-undef
    ...Vuex.mapState({
      nominationDisabled: (state) => state.nomination.nominationDisabled,
      rsDisabled: (state) => state.nomination.rsDisabled,
    }),
    isRoutePreview() {
      return this.$route.query.isPreview == 1;
    },
    isApproval() {
      return this.$route.query.isApproval === "true";
    },
  },
  mounted() {
    this.getFetchDataList();
  },
  methods: {
    async getFetchDataList() {
      const params = {
        nomiAppId: this.nomiAppId,
        sortColumn: "sort",
        isAsc: true,
        fileType: "102",
      };
      await this.getDataList(params);
    },
    download(row) {
      window.open(`${row.filePath}`, "_blank");
    },
  },
};
</script>
<style lang="scss" scoped>
.attachment {
  .downloadBtn {
    margin-right: 10px;
  }
}
</style>