<!--
 * @Author: haojiang
 * @Date: 2021-05-27 09:42:07
 * @LastEditTime: 2021-04-19 17:15:37
 * @LastEditors: Please set LastEditors
 * @Description: 决策资料 - 附件
-->
<template>
  <iCard class="margin-bottom25">
    <div class="margin-bottom25 clearFloat">
      <span class="font18 font-weight">
        {{ $t("RS Sheet") }}</span
      >
      <div class="floatright">
        <!-- 下载 -->
        <iButton @click="downloadFile" class="margin-right10">
          {{ $t("strategicdoc.XiaZai") }}
        </iButton>
        <span>
          <!-- 删除 -->
        <iButton
          class="margin-right10"
          @click="deleteFile"
          v-if="!$store.getters.isPreview"
        >
          {{ $t("strategicdoc.ShanChu") }}
        </iButton>
        <!-- 上传文件 -->
        <!-- <iButton
          v-if="!$store.getters.isPreview"
          @click="$router.push({path: '/designate/decisiondata/attachment/upload'})"
        >
          {{ $t("strategicdoc.ShangChuanXianXiaRS") }}
        </iButton> -->
        <upload
          class="upload-trigger"
          v-if="!$store.getters.isPreview"
          :hideTip="true"
          :accept="'.doc,.docx,.xls,.xlsx,.ppt,.pptx,.jpg,.jpeg,.png,.pdf,.tif'"
          :buttonText="$t('strategicdoc.ShangChuanXianXiaRS')"
          @on-success="onUploadsucess({fileType: '103'})"
        />
        </span>
      </div>
    </div>
    <tablelist
      index
      :selection="!$store.getters.isPreview"
      :tableData="dataList"
      :tableTitle="uploadtableTitle"
      :tableLoading="tableLoading"
      @handleSelectionChange="handleSelectionChange"
    >
    <template #uploadDate="scope">
      {{scope.row.uploadDate | dateFilter('YYYY-MM-DD')}}
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
} from './data'
import tablelist from "./tableList";
import {
  iCard,
  iButton,
  iPagination
} from "rise";
import upload from '@/components/Upload'
import { attachMixins } from '@/utils/attachMixins'
import { pageMixins } from '@/utils/pageMixins'

export default {
  mixins: [ attachMixins, pageMixins ],
  components: {
    iCard,
    iButton,
    iPagination,
    tablelist,
    upload
  },
  data() {
    return {
      // tableListData: mokeUploadTableListData,
      nomiAppId: this.$route.query.desinateId || '',
      tableLoading: false,
      uploadtableTitle,
      multiEditState: false,
      multiEditControl: false,
      selectMultiData: [],
      page: {
        currPage: 1,
        pageSizes: 2,
        totalCount: 0,
        layout:"prev, pager, next, jumper"
      }
    }
  },
  mounted() {
    this.getFetchDataList()
  },
  methods: {
    getFetchDataList() {
      const params = {
        nomiAppId: this.nomiAppId,
        sortColumn: 'sort',
        isAsc: true,
        fileType: '103',
      }
      this.getDataList(params)
    }
  }
}
</script>
<style lang="scss" scoped>
</style>