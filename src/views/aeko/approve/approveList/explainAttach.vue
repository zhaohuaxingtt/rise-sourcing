<!--
 * @Autor: Hao,Jiang
 * @Date: 2021-10-13 14:15:18
 * @LastEditors: YoHo
 * @LastEditTime: 2021-10-25 09:06:27
 * @Description: 解释附件查看列表
-->
<template>
  <div class="aeko-assign" >
    <!-- 搜索 -->
    <search @search="getFetchData" ref="search" />
    <!-- 表格 -->
    <iCard class="aeko-assign-table">
      <tablelist
        height="400"
        index
        :selection="false"
        :tableData="tableListData"
        :tableTitle="tableTitle"
        :tableLoading="tableLoading"
        :lang="true"
        :selectable="(row, index) => {return row.unresigned}"
        v-loading="tableLoading"
        @handleSelectionChange="handleSelectionChange"
      >
      <template #fileName="scope">
        <div style="text-align: left">
          <a class="link-underline" href="javascript:;" @click="download(scope.row)">
            {{ scope.row.fileName }}
          </a>
        </div>
      </template>
      </tablelist>
      <div class="pagination">
        <iPagination v-update
          class="pagination"
          @size-change="handleSizeChange($event, getFetchData)"
          @current-change="handleCurrentChange($event, getFetchData)"
          background
          :current-page="page.currPage"
          :page-sizes="page.pageSizes"
          :page-size="page.pageSize"
          :layout="page.layout"
          :total="page.totalCount" />
      </div>
    </iCard>
  </div>
</template>
<script>
import search from '../components/searchAttach'
import {explainAttachTableTitle as tableTitle} from '../components/data'
import tablelist from 'rise/web/components/iFile/tableList'; 
import {iCard, iSelect, iPagination, icon, iMessage} from 'rise'
import { pageMixins } from '@/utils/pageMixins'
// 解释附件、审批附件查询，审批附件带taskId
import {
  getAuditFilePage,
} from '@/api/aeko/detail/approveAttach'
import {downloadFile} from 'rise/web/components/iFile/lib'

export default {
  mixins: [pageMixins],
  components: {
    iCard,
    iPagination,
    search,
    tablelist
  },
  data() {
    return {
      tableTitle,
      tableListData: [],
      tableLoading: false,
    }
  },
  mounted() {
    this.getFetchData()
  },
  methods: {
    onSearch() {
      this.page.currPage = 1
      this.getFetchData()
    },
    /**
   * @description: 点击文件名下载
   * @param {*} row
   * @return {*}
   */    
		download(row) {
			downloadFile(row.uploadId)
		},
    /**
     * @description: 获取数据列表
     * @param {*}
     * @return {*}
     */    
    getFetchData() {
      this.queryParams = this.$route.query;
      console.log(this.queryParams);
      let str_json = window.atob(this.queryParams.transmitObj);
      const AECOAPPROVEPARAMS = JSON.parse(decodeURIComponent(escape(str_json)))||{};
      // const AECOAPPROVEPARAMS = sessionStorage.getItem('AEKO-APPROVAL-DETAILS-ITEM') || {}
      const aekoApprovalDetails = AECOAPPROVEPARAMS || {}
      const aekoNum = aekoApprovalDetails?.aekoApprovalDetails?.aekoNum || ''
      const requirementAekoId = this.$route.query.requirementAekoId || aekoApprovalDetails.requirementAekoId || ''
      const aekoManageId = this.$route.query.aekoManageId || aekoApprovalDetails.aekoManageId || ''
      const linieId = this.$route.query.linieId || aekoApprovalDetails.linieId || ''
      const taskId = this.$route.query.taskId || aekoApprovalDetails.taskId || ''
      const form = this.$refs.search.form || {}
      const parmas = Object.assign({
        linieId: linieId || '',
				aekoNum: aekoNum,
				manageId: Number(aekoManageId) || '',
				taskId: String(taskId).split(',') || [],
        current: this.page.currPage,
        size: this.page.pageSize
      },form)
      if (!parmas.manageId) {
        iMessage.error(this.language('AEKOMANAGEIDBUNENGWEIKONG','aekoManageId不能为空'))
        return
      }
      if (!parmas.aekoNum) {
        iMessage.error(this.language('AEKOIDBUENNGWEIKONG','aekoid不能为空'))
        return
      }
      if (!parmas.linieId) {
        iMessage.error(this.language('LINIEIDBUENNGWEIKONG','linieid不能为空'))
        return
      }
      this.tableLoading = true
      getAuditFilePage(parmas).then(res => {
        if (res.code === '200') {
          this.tableListData = (res.data || []).map(o => {
            o._fileDescribe = o.fileDescribe
            o.fileSize = `${o.fileSize} MB`
            return o
          })
          this.page.totalCount = res.total
        } else {
          this.tableListData = []
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
        }
        this.tableLoading = false
      }).catch(e => {
        this.tableLoading = false
        iMessage.error(this.$i18n.locale === "zh" ? e.desZh : e.desEn);
      }).finally(() => {
        this.tableLoading = false
      })
    },
  }
}
</script>
<style lang="scss" scoped>
.aeko-assign {
  .aeko-assign-table {
    .cardBody {
      padding: 10px;
    }
  }
}
.icon {
  svg {
    font-size: 28px;
  }
}
</style>