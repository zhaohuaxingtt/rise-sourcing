<!--
 * @Description: 
 * @Author: tyra liu
 * @Date: 2021-10-19 10:59:33
 * @LastEditTime: 2021-12-03 10:32:23
 * @LastEditors:  
-->
<template>
  <iCard class="margin-bottom25">
    <div class="margin-bottom25 clearFloat">
      <span class="font18 font-weight">
        {{ language("MTZ Attachment", "MTZ Attachment") }}
      </span>
    </div>
    <tablelist
      index
      :selection="true"
      :tableTitle="mtzuploadtableTitle"
      :tableData="mtzTableData"
      :tableLoading="tbaleLoading"
      v-loading="tableLoading"
      :activeItems="'fileName'"
      @openPage="openPage"
      v-permission.auto="
        SOURCING_NOMINATION_ATTATCH_MTZATTACHMENT_TABLE | (MTZAttachment - 表格)
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
    >
    </iPagination>
  </iCard>
</template>
<script>
import { iCard, iPagination } from "rise";
import tablelist from "@/views/designate/supplier/components/tableList";
import { mtzuploadtableTitle } from "./data";
import { attachMixins } from "@/utils/attachMixins";
import { pageMixins } from "@/utils/pageMixins";
import { getMtzAttachmentPageList } from "@/api/designate/designatedetail/attachment";
import { downloadUdFile } from "@/api/file";
import { nominateAppSDetail } from "@/api/designate";
export default {
  mixins: [attachMixins, pageMixins],
  components: {
    iCard,
    tablelist,
    iPagination,
  },
  props:{
    type: { type: String, default: '' },
  },
  data() {
    return {
      mtzAppId: "",
      mtzuploadtableTitle,
      tableLoading: false,
      multiEditState: false,
      multiEditControl: false,
      mtzTableData: [],
      page: {
        currPage: 1,
        pageSizes: 10,
        totalCount: 0,
        layout: "prev, pager, next, jumper",
      },
    };
  },
  created() {
    this.nominateAppSDetail();
  },
  methods: {
    nominateAppSDetail() {
      if (this.$route.query.desinateId) {
        nominateAppSDetail({
          nominateAppId: this.$route.query.desinateId,
        }).then((res) => {
          this.mtzAppId = res.data.mtzApplyId || "";
          this.getFetchDataList();
        });
      }
    },
    getFetchDataList() {
      let data = {
        mtzAppId: this.mtzAppId,
        pageNo: this.page.currPage,
        pageSize: this.page.pageSize,
      };
      if (this.mtzAppId !== "")
        getMtzAttachmentPageList(data).then((res) => {
          this.mtzTableData = res.data;
        });
    },
    async openPage(val) {
      await downloadUdFile(val.fileId);
    },
    download(row) {
      window.open(`${row.fileUrl}`, "_blank");
    },
  },
};
</script>
<style>
</style>