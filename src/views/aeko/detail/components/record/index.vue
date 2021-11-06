<!--
 * @Author: wentliao
 * @Date: 2021-08-07 10:25:28
 * @Description: aeko详情-审批记录
-->
<template>
  <iCard class="aekoDetailRecord">
    <span class="font18 font-weight">
      {{ language("SHENPIJILU", "审批记录") }}
    </span>
    <div class="editControl floatright margin-bottom20">
      <iButton class="" @click="submit" v-if="checkFirstRecord">
        {{ language("TIJIAO", "提交") }}
      </iButton>
    </div>
    <tablelist
        class="margin-top15"
        height="400"
        index
        :selection="alowSubmit"
        :selectable="selectable"
        :tableData="tableListData"
        :tableTitle="tableTitle"
        :tableLoading="tableLoading"
        :lang="true"
        @handleSelectionChange="handleSelectionChange"
        v-loading="tableLoading"
    >
      <template #aekoNum="scope">
        <div style="text-align: left">
          <a class="link-underline" href="javascript:;">
            {{ scope.row.aekoNum }}
          </a>
        </div>
      </template>
      <template #endTime="scope">
        <span>{{scope.row.endTime|formatDate}}</span>
      </template>
      <template #akeoAuditType="scope">
        {{ getAdiType(scope.row.akeoAuditType) }}
      </template>
      <template #startUser="scope">
        <span>{{scope.row.startUser ? scope.row.startUser.nameZh : '' }}</span>
      </template>
      <template #comment="scope">
        <span>{{ itemCommentContent(scope.row) }}</span>
      </template>
      <template #explainReason="scope">
        <iInput v-if="!itemIsCanReply(scope.row)" v-model="scope.row.explainReason" type="textarea" rows="2"
                :placeholder="language('LK_QINGSHURU','请输入')" clearable/>
        <span v-else-if="itemExplainShow(scope.row)">{{ itemExplain(scope.row) }}</span>
        <span v-else>{{ scope.row.explainReason }}</span>
      </template>
      <template #attach="scope">
        <a class="link-underline" href="javascript:;" @click="openUploadDialog(scope.row, false)"
           v-if="!itemIsCanReply(scope.row)">
          {{ language("LK_SHANGCHUAN", "上传") }}
        </a>
        <a class="link-underline" href="javascript:;" @click="openUploadDialog(scope.row, true)" v-else>
          {{ language("CHAKAN", "查看") }}
        </a>
      </template>
    </tablelist>
    <div class="pagination">
      <iPagination
          v-update
          class="pagination"
          @size-change="handleSizeChange($event, getFetchData)"
          @current-change="handleCurrentChange($event, getFetchData)"
          background
          :current-page="page.currPage"
          :page-sizes="page.pageSizes"
          :page-size="page.pageSize"
          :layout="page.layout"
          :total="page.totalCount"
      />
    </div>
    <!-- 上传附件弹窗 -->
    <iFileDialog
        width="800"
        :title="language('JIESHIFUJIANCHAKAN', '解释附件查看')"
        :visible.sync="attachDialogVisibal"
        :hostId="attachAekoCode"
        :init="false"
        :getFileCallBack="getAttach"
        :onSuccessCallBack="onUploadsucess"
        :deleteFileCallBack="deleteFile"
        :customizeTableTitle="attachTableTitle"
        :editControl="['delete','upload']"
        :activeItems="'fileName'"
        :readOnly="attachReadOnly"/>
  </iCard>
</template>

<script>
import Vuex from 'vuex'
import {approveReCordTableTitle as tableTitle, aekoApproveTypes} from '../data'
import {attachTableTitle} from './components/data'
import iFileDialog from 'rise/web/components/iFile/dialog'
import tablelist from 'rise/web/components/iFile/tableList';
import {iCard, iButton, iPagination, iInput} from 'rise'
import {pageMixins} from '@/utils/pageMixins'
import { setLogModule } from "@/utils";
import {
  findHistoryByAeko,
  submitForApproval
} from '@/api/aeko/detail/approveRecord'
import {
  getAuditFilePage,
  auditFileSave,
  auditFileDelete
} from '@/api/aeko/detail/approveAttach'
import * as dateUtils from "@/utils/date";

export default {
  name: "aekoDetailRecord",
  mixins: [pageMixins],
  components: {
    iCard,
    iButton,
    iInput,
    iPagination,
    tablelist,
    iFileDialog
  },
  filters:{
    formatDate(value) {
      if (value == null || value == '') return ''
      let date = new Date(value);
      return dateUtils.formatDate(date, 'yyyy-MM-dd hh:mm')
    },
  },
  computed: {
    ...Vuex.mapState({
      userInfo: state => state.permission.userInfo,
    }),
    alowSubmit() {
      return true
    },
    checkFirstRecord() {
      if (this.tableListData == null || this.tableListData.length <= 0) return false

      let valid = false
      const validItems = this.tableListData.filter(o => o.activityName === '【补充材料通知】补充材料')
      validItems.forEach(item => {
        !valid && (valid = !this.itemIsCanReply(item))
      })
      if (valid) return true

      let firstItem = this.tableListData[0]
      if (null != firstItem) {
        return firstItem.operation == '补充材料'
      }
      return false
    },
  },
  props: {
    aekoInfo: {
      type: Object,
      default: () => {
      },
    }
  },
  data() {
    return {
      tableTitle,
      tableListData: [],
      tableSelecteData: [],
      tableLoading: false,
      // 解释记录
      tableExplainData: [],
      // 自定义解释附件表头
      attachTableTitle,
      // 附件弹窗
      attachDialogVisibal: false,
      attachAekoCode: '',
      attachReadOnly: false,
      currentRow: {}
    };
  },
  mounted() {
    // 查询审批数据
    this.getFetchData()
  },
  created(){
    setLogModule('AEKO表态-详情页-审批记录')
    // 如果是从AEKO查看过来的 tableTitle需要展示一个提交人字段
    const {query} = this.$route;
    const {from=''} = query;
    if(from != 'check'){
      this.tableTitle = tableTitle.filter((item)=>item.props !=='startUser');
    }
  },
  methods: {
    selectable(row) {
      return !this.itemIsCanReply(row)
    },
    getAdiType(code) {
      return aekoApproveTypes.find(o => o.id === code)?.name || ''
    },
    handleSelectionChange(val) {
      this.tableSelecteData = val
    },
    openUploadDialog(row, attachReadOnly) {
      this.attachReadOnly = attachReadOnly
      if (!row.taskId) {
        this.$message.error(this.language('TASKIDBUNENGWEIKONG', 'TASK ID 不能为空'))
        return
      }
      if (!row.processInstanceId) {
        this.$message.error(this.language('LIUCHNEGIDBUENNGWEIKONG', '流程不能为空'))
        return
      }
      this.attachDialogVisibal = true
      this.attachAekoCode = row.aekoCode
      this.currentRow = row
    },
    async getFetchData() {
      this.tableLoading = true
      await this.getexplainList()
    },
    /**
     * @description: 获取解释记录
     * @param {*}
     * @return {*}
     */
    getexplainList() {
      const parmas = Object.assign({
        applyUserId: String(this.userInfo.id) || '',
        currentUserId: String(this.userInfo.id) || '',
        aekoNo: this.aekoInfo.aekoCode || '',
        hasParentTaskId: true,
        pageNo: this.page.currPage,
        pageSize: this.page.pageSize
      })
      findHistoryByAeko(parmas).then(res => {
        this.tableLoading = false
        let resDatas = res.data.records
        this.tableListData = resDatas.map(item => {
          item.disabled = item.activityName != '【补充材料通知】补充材料'
          return item
        })
      })
    },
    itemCommentContent(row) {
      if (row.activityName == "【解释说明回复】") {
        return ''
      }
      return row.comment
    },
    itemExplain(row) {
      if (row.activityName == "【解释说明回复】") {
        return row.comment
      }
      return ''
    },
    itemExplainShow(row) {
      return row.activityName == "【解释说明回复】"
    },
    itemIsCanReply(row) {
      if (row.activityName == "【补充材料通知】补充材料") {
        let findRes = this.tableListData.filter(item => item.parentTaskId == row.id)
        return findRes != null && findRes.length > 0
      }
      //不用回复
      return row.disabled
    },

    /**
     * @description: 提交
     * @param {*}
     * @return {*}
     */
    submit() {
      let state = true
      let info = ''
      let sourceFirstItem = this.tableListData[0]
      if (!this.tableSelecteData.length) {
        this.tableSelecteData.push(sourceFirstItem)
      }
      if (this.tableSelecteData[0].id != sourceFirstItem.id) {
        return this.$message.error(this.language('LK_QINGXUANZEBUCHONGCAILIAOJILUJINXINGTIJIAO', '请选择补充材料记录进行提交'))
      }
      let selResArray = this.tableSelecteData.filter(item => item.id == sourceFirstItem.id)
      let parmas = selResArray.map(o => {
        if (state && !o.explainReason) {
          state = false
          info = this.language('SHENPIYIJIANANDJIESHIBUNENGWEIKONG', '审批意见/申请人解释不能为空')
        }
        state && !o.explainReason && (state = false)
        return {
          workFlowId: o.processInstanceId,
          taskId: o.taskId,
          // workFlowId: '1075838',
          // taskId: '1075873',
          parentTaskId: o.parentTaskId,
          auditUserId: o.assignee,
          explainReason: o.explainReason || '',
          addMaterialUserId: this.userInfo.id,
        }
      })
      if (!state && info) {
        this.$message.error(info)
        return
      }
      this.$confirm(this.language('submitSure', '您确定要执行提交操作吗？')).then(confirmInfo => {
        if (confirmInfo === 'confirm') {
          submitForApproval(parmas).then(res => {
            if (res.code === '200') {
              this.$message.success(this.language('LK_CAOZUOCHENGGONG', '操作成功'))
              this.getFetchData()
            } else {
              this.$message.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
            }
          }).catch(e => {
            this.$message.error(this.$i18n.locale === "zh" ? e.desZh : e.desEn);
          })
        }
      })
    },
    onUploadsucess(data, cb) {
      console.log('data', data)
      const fileData = data.data || {}
      const parmas = {
        aekoNum: this.aekoInfo.aekoCode,
        manageId: Number(this.aekoInfo.aekoManageId) || '',
        fileName: fileData.name || '',
        filePath: fileData.path || '',
        fileSize: Number(fileData.size / 1000 / 1000).toFixed(2) || 0, // 文件大小MB
        fileType: fileData.extensionName || '',
        uploadId: fileData.id || '',
        linieId: this.userInfo.id || '',
        deptId: this.userInfo.deptDTO && this.userInfo.deptDTO.id || '',
        auditUserId: this.userInfo.id || '',
        taskId: this.currentRow.parentTaskId,
      }
      this.uploading = true
      auditFileSave(parmas).then(res => {
        if (res.code === '200') {
          this.$message.success(this.language('LK_CAOZUOCHENGGONG', '操作成功'))
          cb && typeof cb === 'function' && (cb())
        } else {
          this.$message.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
        }
        this.uploading = false
      }).catch(e => {
        this.$message.error(this.$i18n.locale === "zh" ? e.desZh : e.desEn);
        this.uploading = false
      })
    },
    /**
     * @description: 获取数据列表
     * @param {*}
     * @return {*}
     */
    getAttach(cb) {
      console.log(this.aekoInfo)
      const parmas = Object.assign({
        linieId: this.userInfo.id || '',
        aekoNum: this.aekoInfo.aekoCode,
        manageId: Number(this.aekoInfo.aekoManageId) || '',
        taskId: [Number(this.currentRow.taskId)],
        current: this.page.currPage,
        size: this.page.pageSize
      })
      let tableLoading = false
      let tableListData = []
      let totalCount = 0
      cb && typeof cb === 'function' && (cb({
        fileTableLoading: true
      }))
      getAuditFilePage(parmas).then(res => {
        if (res.code === '200') {
          tableListData = (res.data || []).map(o => {
            o.fileSize = `${o.fileSize} MB`
            return o
          })
          totalCount = res.total
        } else {
          tableListData = []
          this.$message.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
        }
        tableLoading = false
        cb && typeof cb === 'function' && (cb({
          fileTableLoading: tableLoading,
          fileDataList: tableListData,
          totalCount
        }))
      }).catch(e => {
        cb && typeof cb === 'function' && (cb({
          fileTableLoading: false
        }))
        this.$message.error(this.$i18n.locale === "zh" ? e.desZh : e.desEn);
      }).finally(() => {
        cb && typeof cb === 'function' && (cb({
          fileTableLoading: false
        }))
      })
    },
    deleteFile(data = [], cb) {
      console.log('删除文件', data, cb)
      if (!data.length) {
        this.$message.error(this.language('QINGXUANZEZHISHAOYITIAOSHUJU', '请选择至少一条数据'))
        return
      }
      const fileList = data.map(o => o.id)
      if (fileList && !fileList.length) return this.$message.error(this.language('QINGXUANZEZHISHAOYITIAOSHUJU', '请选择至少一条数据'))
      this.$confirm(this.language('deleteSure', '您确定要执行删除操作吗？')).then(confirmInfo => {
        if (confirmInfo === 'confirm') {
          auditFileDelete(fileList).then(res => {
            if (res.code === '200') {
              this.$message.success(this.language('LK_CAOZUOCHENGGONG', '操作成功'))
              cb && typeof cb === 'function' && (cb())
            } else {
              this.$message.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
            }
          }).catch(e => {
            this.$message.error(this.$i18n.locale === "zh" ? e.desZh : e.desEn)
          }).finally(() => {
          })
        }
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.aekoDetailRecord {
  ::v-deep.el-table {
    th, td {
      vertical-align: top;

      .el-textarea {
        height: 60px;

        .el-textarea__inner {
          height: 100%;
          resize: none !important;
        }
      }
    }
  }
}
</style>