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
        <iButton @click="sortVisibal = true">
          {{ $t("strategicdoc.XiaZai") }}
        </iButton>
        <span>
          <!-- 删除 -->
        <iButton
          v-if="!$store.getters.isPreview"
        >
          {{ $t("strategicdoc.ShanChu") }}
        </iButton>
        <!-- 上传文件 -->
        <iButton
          v-if="!$store.getters.isPreview"
          @click="$router.push({path: '/designate/decisiondata/attachment/upload'})"
        >
          {{ $t("strategicdoc.ShangChuanXianXiaRS") }}
        </iButton>
        </span>
      </div>
    </div>
    <tablelist
      index
      :selection="!$store.getters.isPreview"
      :tableData="tableListData"
      :tableTitle="uploadtableTitle"
      :tableLoading="tableLoading"
      @handleSelectionChange="handleMutiSelectionChange"
    >
    </tablelist>
    <iPagination
      v-update
      @size-change="handleSizeChange($event, getTableListFn)"
      @current-change="handleCurrentChange($event, getTableListFn)"
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
  mokeUploadTableListData
} from './data'
import tablelist from "./tableList";
import {
  iCard,
  iButton,
  iPagination
} from "rise";

export default {
  components: {
    iCard,
    iButton,
    iPagination,
    tablelist
  },
  data() {
    return {
      tableListData: mokeUploadTableListData,
      tableLoading: false,
      uploadtableTitle,
      multiEditState: false,
      multiEditControl: false,
      selectMultiData: [],
      page: {
        currPage: 1,
        pageSizes: 10,
        totalCount: 3
      }
    }
  },
  methods: {
    handleMutiSelectionChange(data) {
      this.multiEditControl = Boolean( data && data.length)
      this.selectMultiData = data
    },
  }
}
</script>
<style lang="scss" scoped>
</style>