<!--
 * @Author: haojiang
 * @Date: 2021-05-27 09:42:07
 * @LastEditTime: 2023-03-13 09:36:33
 * @LastEditors: 余继鹏 917955345@qq.com
 * @Description: 决策资料 - 附件
-->
<template>
  <iCard class="attachment margin-bottom25">
    <div v-if="type!='approval'" class="margin-bottom25 clearFloat">
      <span class="font18 font-weight">
        {{ language("Attachment", "Attachment") }}
      </span>
      <template v-if="!nominationDisabled">
        <template v-if="!$store.getters.isPreview">
          -
          <span class="tip">{{
            $t("为获得更好的展示效果，建议上传pdf格式文件,不支持PPT格式")
          }}</span>
        </template>
      </template>
      <div class="floatright">
        <!-- 下载 -->
        <iButton
          v-if="!isRoutePreview && !isApproval"
          @click="downloadFile"
          class="downloadBtn"
          v-permission.auto="
            SOURCING_NOMINATION_ATTATCH_ATTACHMENT_DOWNLOAD |
              (Attachment - 下载)
          "
        >
          {{ language("strategicdoc_XiaZai", "下载") }}
        </iButton>
        <!-- 删除 -->
        <span v-if="!nominationDisabled">
          <iButton
            class="margin-right10"
            @click="deleteFile($event, getFetchDataList)"
            v-if="!$store.getters.isPreview && !rsDisabled"
            v-permission.auto="
              SOURCING_NOMINATION_ATTATCH_ATTACHMENT_DELETE |
                (Attachment - 删除)
            "
          >
            {{ language("LK_SHANCHU", "删除") }}
          </iButton>
          <!-- 上传文件 -->
          <!-- <iButton 
            v-if="!$store.getters.isPreview"
            @click="$router.push({path: '/designate/decisiondata/attachment/upload'})">
            {{ language("strategicdoc.ShangChuanWenJian") }}
          </iButton> -->
          <upload
            class="upload-trigger margin-left10"
            v-if="!$store.getters.isPreview"
            :hideTip="true"
            :uploadButtonLoading="uploadButtonLoading"
            :accept="'.doc,.docx,.jpg,.jpeg,.png,.pdf,.tif'"
            :buttonText="language('strategicdoc_ShangChuanWenJian', '上传文件')"
            @on-success="
              onUploadsucess(
                Object.assign(...arguments, { fileType: '102' }),
                getFetchDataList
              )
            "
            v-permission.auto="
              SOURCING_NOMINATION_ATTATCH_ATTACHMENT_UPLOAD |
                (Attachment - 上传文件)
            "
          />
        </span>
      </div>
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
import {
  uploadtableTitle,
  // mokeUploadTableListData
} from "./data";
import tablelist from "@/views/designate/supplier/components/tableList";
import { iCard, iButton, iPagination } from "rise";
import upload from "../../components/upload.vue";
import { attachMixins } from "@/utils/attachMixins";
import { pageMixins } from "@/utils/pageMixins";

export default {
  mixins: [attachMixins, pageMixins],
  components: {
    iCard,
    iButton,
    iPagination,
    tablelist,
    upload,
  },
  props:{
    type: { type: String, default: '' },
  },
  data() {
    return {
      nomiAppId: this.$route.query.desinateId || "",
      // tableListData: mokeUploadTableListData,
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