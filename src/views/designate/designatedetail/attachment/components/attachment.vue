<!--
 * @Author: haojiang
 * @Date: 2021-05-27 09:42:07
 * @LastEditTime: 2021-07-07 15:38:15
 * @LastEditors: Please set LastEditors
 * @Description: 决策资料 - 附件
-->
<template>
  <iCard class="margin-bottom25">
    <div class="margin-bottom25 clearFloat">
      <span class="font18 font-weight">
        {{ language("Attachment","Attachment") }}</span
      >
      <div class="floatright">
        <!-- 下载 -->
        <iButton @click="downloadFile" class="margin-right10">
          {{ language("strategicdoc_XiaZai",'下载') }}
        </iButton>
        <!-- 删除 -->
        <span v-if="!nominationDisabled">
          <iButton
            class="margin-right10"
            @click="deleteFile($event, getFetchDataList)"
            v-if="!$store.getters.isPreview && !rsDisabled">
            {{ language("LK_SHANCHU",'删除') }}
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
            :accept="'.doc,.docx,.xls,.xlsx,.ppt,.pptx,.jpg,.jpeg,.png,.pdf,.tif'"
            :buttonText="language('strategicdoc_ShangChuanWenJian','上传文件')"
            @on-success="onUploadsucess(Object.assign(...arguments, {fileType: '102'}), getFetchDataList)"
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
      v-loading="tableLoading"
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
import tablelist from "@/views/designate/supplier/components/tableList";
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
      nomiAppId: this.$route.query.desinateId || '',
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
        layout:"prev, pager, next, jumper"
      }
    }
  },
  computed: {
    // eslint-disable-next-line no-undef
    ...Vuex.mapState({
      nominationDisabled: state => state.nomination.nominationDisabled,
      rsDisabled: state => state.nomination.rsDisabled,
    }),
  },
  mounted() {
    this.getFetchDataList()
  },
  methods: {
    async getFetchDataList() {
      const params = {
        nomiAppId: this.nomiAppId,
        sortColumn: 'sort',
        isAsc: true,
        fileType: '102',
      }
      await this.getDataList(params)
    }
  }
}
</script>
<style lang="scss" scoped>
</style>