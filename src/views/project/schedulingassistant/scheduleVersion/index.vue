<!--
 * @Author: Luoshuang
 * @Date: 2021-07-27 14:30:02
 * @LastEditors: YoHo
 * @LastEditTime: 2022-03-23 16:37:03
 * @Description: 排程版本查询
 * @FilePath: \front-web\src\views\project\schedulingassistant\scheduleVersion\index.vue
-->

<template>
  <div class="scheduleVersion" v-permission.auto="PROJECTMGT_SCHEDULINGASSISTANT_SCHEDULEVERSION|排程版本查询">
    <search @search="handSearch" ref="searchForm" />
    <!-- v-permission.auto="PROJECTMGT_SCHEDULINGASSISTANT_SCHEDULEVERSION_TABLE|排程版本表格" -->
    <iCard class="margin-top20" v-permission.auto="PROJECTMGT_SCHEDULINGASSISTANT_SCHEDULEVERSION_TABLE|排程版本表格">
      <div class="margin-bottom20 clearFloat">
        <div class="floatright">
          <!-- 批量下载排程版本 -->
          <iButton
            :loading="batchUploading"
            @click="batchDownload"
             v-permission.auto="PROJECTMGT_SCHEDULINGASSISTANT_SCHEDULEVERSION_DOWNLOAD_BUTTON|排程版本查询-下载-按钮"
          >
            {{ language('LK_XIAZAI', '下载') }}
          </iButton>
          <buttonTableSetting @click="edittableHeader"></buttonTableSetting>
        </div>
      </div>
      <tableList
                permissionKey="PROJECT_SCHEDULINGASSISTANT_SCHEDULEVERSION"
                indexKey
                 ref="tableList"
                 :lang="true"
                 :tableTitle="tableTitle"
                 :tableData="tableData"
                 :tableLoading="tableLoading"
                 @handleSelectionChange="handleSelectionChange"
      >
        <template #versionName="scope">
         <span class="flexRow-link">
            <span class="openLinkText underline cursor"  @click="download(scope.row)"> {{ scope.row.versionName }}</span>
          </span>
      </template>
      </tableList> 
      <iPagination v-update @size-change="handleSizeChange($event, getFetchData)" @current-change="handleCurrentChange($event, getFetchData)" background :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :layout="page.layout"
        :current-page="page.currPage"
        :total="page.totalCount"
        act
      />
    </iCard>
  </div>
</template>

<script>
import {iCard, iPagination, iButton, iMessage} from 'rise'
import { pageMixins } from '@/utils/pageMixins'
import filters from "@/utils/filters"
import tableList from "@/components/iTableSort";
import { tableSortMixins } from "@/components/iTableSort/tableSortMixins";
import search from './components/search'
import {tableTitle} from './components/data'
import {
  getScheduleVersion,
  genScheduleVersionFileId
} from '@/api/project/scheduleVersion'
// 导入rise附件下载方法
import {downloadFile} from 'rise/web/components/iFile/lib'
import buttonTableSetting from '@/components/buttonTableSetting'
export default {
  mixins: [ filters, pageMixins, tableSortMixins ],
  components: { iCard, iPagination, iButton, search, tableList,buttonTableSetting },
  data() {
    return {
      tableTitle,
      tableData: [],
      selectTableData: [],
      tableLoading: false,
      batchUploading: false
    }
  },
  mounted() {
    this.getFetchData()
  },
  methods: {
    /**
     * @description: 搜索
     * @param {*}
     * @return {*}
     */    
    handSearch() {
      this.page.currPage = 1
      this.getFetchData()
    },
    /**
     * @description: 多选
     * @param {*} data
     * @return {*}
     */    
    handleSelectionChange(data) {
      this.selectTableData = data
    },
    /**
     * @description: 获取排程版本
     * @param {*}
     * @return {*}
     */    
    getFetchData() {
      this.tableLoading = true
      getScheduleVersion({
        ...this.$refs.searchForm.form,
        current: this.page.currPage,
        size: this.page.pageSize
      }).then(res => {
        this.tableLoading = false
        if (res.code === '200') {
          const tableData = res.data || []
          this.tableData = tableData.map(o => {
            o.createDate = o.createDate ? window.moment(o.createDate).format('YYYY-MM-DD HH:mm:ss') : ''
            return o
          })
          this.page.totalCount = res.total
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
      }).catch(e => {
        iMessage.error(this.$i18n.locale === "zh" ? e.desZh : e.desEn)
        this.tableLoading = false
      })
    },
    /**
     * @description: 下载排程版本
     * @param {*} row 有fileId号直接下载，没有的话先调接口生成
     * @return {*}
     */    
    download(row) {
      if (!row.fileId){
        this.genScheduleVersion([{
            id: row.id,
            type: row.type
          }])
        return
      }
      downloadFile(row.fileId)
    },
    batchDownload() {
      const fileList = this.selectTableData.map(o => {
        return {
          id: o.id,
          type: o.type
        }
      })
      if (!(fileList && fileList.length)) {
        iMessage.error(this.language('QINGXUANZEZHISHAOYITIAOSHUJU','请选择至少一条数据'))
        return
      }
      // 如果选择的都有fileid，直接下载
      if (this.selectTableData.filter(o => o.fileId).length === fileList.length) {
        downloadFile(this.selectTableData.map(o => o.fileId))
        return
      }
      // 部分没有fileID，调接口生成fileId
      this.batchUploading = true
      this.genScheduleVersion(fileList)
    },
    /**
     * @description: 生成排程版本文件oss id
     * @param {*} file 字符串表示单个文件下载
     * @return {*}
     */   
    async genScheduleVersion(fileList) {
      try {
        const res = await genScheduleVersionFileId(fileList)
        if (res.code === '200') {
          const fileList = res.data || []
          if (fileList.length) {
            downloadFile(fileList.map(o => o.id))
          }
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
        this.batchUploading = false
      } catch (e) {
        this.batchUploading = false
        iMessage.error(this.$i18n.locale === "zh" ? e.desZh : e.desEn)
      }
      this.batchUploading = false
    }
  }
  
}
</script>