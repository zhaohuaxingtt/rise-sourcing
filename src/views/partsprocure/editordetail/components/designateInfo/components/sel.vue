<!--
 * @Author: Luoshuang
 * @Date: 2021-05-27 21:20:49
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-06-25 13:06:21
 * @Description: 
 * @FilePath: \front-web\src\views\partsprocure\editordetail\components\designateInfo\components\sel.vue
-->

<template>
  <iDialog 
    :visible.sync="dialogVisible"
    @close="clearDialog"
    width="90%"
    class="addPartsDialog"
  >
    <template slot="title">
      <div class="clearFloat">
        <span class="font18 font-weight">{{language('SELFENTANDAN','SEL分摊单')}}</span>
          <div class="floatright">
            <!--------------------下载按钮----------------------------------->
            <iButton @click="handleDownload" class="margin-right20" >{{language('XIAZAI','下载')}}</iButton>
          </div>
      </div>
    </template>
    <tableList :activeItems='"fileName"' selection indexKey :tableTitle="tableTitle" :tableData="tableData" :tableLoading="tableLoading" class="doubleHeader" @handleSelectionChange="handleSelectionChange" @openPage="openPage"></tableList>
    <iPagination v-update 
      @size-change="handleSizeChange($event, getRfqTableList)" 
      @current-change="handleCurrentChange($event, getRfqTableList)" 
      background 
      :page-sizes="page.pageSizes"
      :page-size="page.pageSize"
      :layout="page.layout"
      :current-page="page.currPage"
      :total="page.totalCount"
      class="padding-bottom20"
    />
  </iDialog>
</template>

<script>
import { iDialog, iButton, iPagination, iMessage } from 'rise'
import tableList from '@/views/designate/designatedetail/components/tableList'
import { fileTableTitle } from '../data'
import { pageMixins } from "@/utils/pageMixins"
import { downloadFile, downloadUdFile } from '@/api/file'
import { getNominateFileInfo } from "@/api/partsprocure/editordetail"
export default {
  mixins: [pageMixins],
  components: { iDialog, iButton, iPagination, tableList },
  props: {
    dialogVisible: { type: Boolean, default: false },
    nominateAppId: {type: String}
  },
  data() {
    return {
      tableTitle: fileTableTitle,
      tableData: [],
      tableLoading: false,
      selectData: []
    }
  },
  watch: {
    dialogVisible(val) {
      if (val && this.nominateAppId) {
        this.getTableList()
      }
    }
  },
  methods: {
    openPage(row) {
      this.handleFileDownload([row.uploadId])
    },
    /**
     * @Description: 文件下载
     * @Author: Luoshuang
     * @param {*} fileList
     * @return {*}
     */    
    async handleFileDownload(fileList) {
      if (fileList.length < 1) {
        return
      }
      // const params = {
      //   applicationName: 'rise',
      //   fileList: fileList
      // }
      // await downloadFile(params)
      await downloadUdFile(fileList)
    },
    /**
     * @Description: 下载文件
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    handleDownload() {
      if (this.selectData.length < 1) {
        iMessage.warn(this.language('QINGXUANZEXUYAOXIAZAIDEWENJIAN','请选择需要下载的文件'))
        return
      }
      this.handleFileDownload(this.selectData.map(item => item.uploadId))
    },
    /**
     * @Description: 处理表格选中
     * @Author: Luoshuang
     * @param {*} val
     * @return {*}
     */    
    handleSelectionChange(val) {
      this.selectData = val
    },
    /**
     * @Description: 获取表格数据
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    getTableList() {
      this.tableLoading = true
      const params = {
        nomiAppId: this.nominateAppId,
        sortColumn: 'uploadDate',
        isAsc: false,
        fileType: '105',
        pageNo: this.page.currPage,
        pageSize: this.page.pageSize
      }
      getNominateFileInfo(params).then(res => {
        if (res?.result) {
          this.tableData = res.data
          this.page.pageSize = Number(res.pageSize)
          this.page.currPage = Number(res.pageNum)
          this.page.totalCount = Number(res.total)
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        }
      }).finally(() => {
        this.tableLoading = false
      })
    },
    /**
     * @Description: 关闭弹窗
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    clearDialog() {
      this.$emit('changeVisible', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.addPartsDialog {
  .card {
    box-shadow: none;
    border-radius: 0;
    border-bottom: 1px solid rgba(112, 112, 112, .1);
    ::v-deep .cardBody {
      padding-top: 0;
      padding-left: 0;
      padding-right: 0;
    }
  }
  ::v-deep .el-dialog {
    margin-top: 30px !important;
    height: 90%;
    .el-dialog__body {
      height: calc(100% - 70px);
      overflow: auto;
    }
  }
}
</style>