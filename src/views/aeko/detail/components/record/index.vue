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
      <iButton class="" @click="submit">
        {{ language("TIJIAO", "提交") }}
      </iButton>
    </div>
    <tablelist
      height="400"
      index
      :selection="true"
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
      <template #comment="scope">
        <iInput v-model="scope.row.comment" :placeholder="language('LK_QINGSHURU','请输入')" clearable />
      </template>
      <template #describe="">
        <a class="link-underline" href="javascript:;">
          {{ language("CHAKAN", "查看") }}
        </a>
      </template>
      <template #attach="scope">
        <a class="link-underline" href="javascript:;" @click="openUploadDialog(scope.row)" v-if="!scope.row.attachment">
          {{ language("LK_SHANGCHUAN", "上传") }}
        </a>
        <a class="link-underline" href="javascript:;" v-else>
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
      :readOnly="false" />
  </iCard>
</template>

<script>
import Vuex from 'vuex'
import {approveReCordTableTitle as tableTitle} from '../data'
import {attachTableTitle} from './components/data'
import iFileDialog from 'rise/web/components/iFile/dialog'
import tablelist from 'rise/web/components/iFile/tableList'; 
import {iCard, iButton, iPagination, iInput, iMessage} from 'rise'
import { pageMixins } from '@/utils/pageMixins'
import {
  findHistoryByAeko,
  submitForApproval
} from '@/api/aeko/detail/approveRecord'
import {
  getAuditFilePage,
  auditFileSave,
	auditFileDelete
} from '@/api/aeko/detail/approveAttach'

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
  computed: {
		...Vuex.mapState({
      userInfo: state => state.permission.userInfo,
    }),
	},
  props:{
    aekoInfo:{
      type:Object,
      default:()=>{},
    }
  },
  data() {
    return {
      tableTitle,
      tableListData: [],
      tableSelecteData: [],
      tableLoading: false,
      // 自定义解释附件表头
      attachTableTitle,
      // 附件弹窗
      attachDialogVisibal: false,
      attachAekoCode: '',
      currentRow: {}
    };
  },
  mounted() {
    this.getFetchData()
  },
  methods: {
    handleSelectionChange(val) {
      this.tableSelecteData = val
    },
    openUploadDialog(row) {
      console.log('openUploadDialog', row)
      if (!row.taskId) {
        iMessage.error(this.language('TASKIDBUNENGWEIKONG','TASK ID 不能为空'))
        return
      }
      if (!row.processInstanceId) {
        iMessage.error(this.language('LIUCHNEGIDBUENNGWEIKONG','流程不能为空'))
        return
      }
      this.attachDialogVisibal = true
      this.attachAekoCode = row.requirementAekoId
      this.currentRow = row
    },
    /**
     * @description: 获取数据列表
     * @param {*}
     * @return {*}
     */    
    getFetchData() {
      console.log(this.aekoInfo)
      const parmas = Object.assign({
        applyUserId: this.userInfo.id || '',
        businessId: Number(this.aekoInfo.aekoManageId) || '',
        // procStatus: '',
        pageNo: this.page.currPage,
        pageSize: this.page.pageSize
      })
      this.tableLoading = true
      findHistoryByAeko(parmas).then(res => {
        if (res.data && res.data.records) {
          const tableListData = (res.data && res.data.records || []).map(o => {
            o.unresigned = !o.chiefName
            return o
          })
          console.log('tableListData',res.data, tableListData)
          this.tableListData = tableListData
          this.page.totalCount = res.data.total
        } else {
          this.tableListData = []
          // iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
        }
        this.tableLoading = false
        
      }).catch(e => {
        this.tableLoading = false
        iMessage.error(this.$i18n.locale === "zh" ? e.desZh : e.desEn);
      }).finally(() => {
        this.tableLoading = false
      })
    },
    /**
     * @description: 提交
     * @param {*}
     * @return {*}
     */    
    submit() {
      let state = true
      let info = ''
      if (!this.tableSelecteData.length) {
				iMessage.error(this.language('QINGXUANZEZHISHAOYITIAOSHUJU','请选择至少一条数据'))
				return
			}
      let parmas = this.tableSelecteData.map(o => {
        if (state && !o.comment) {
          state = false
          info = this.language('SHENPIYIJIANANDJIESHIBUNENGWEIKONG','审批意见/申请人解释不能为空')
        }
        state && !o.comment && (state = false)
        return {
          workFlowId: o.processInstanceId,
          taskId: o.taskId,
          // workFlowId: '1075838',
          // taskId: '1075873',
          auditUserId: this.userInfo.id,
          explainReason: o.comment || '',
          addMaterialUserId: this.userInfo.id,
        }
      })
      if (!state && info) {
        iMessage.error(info)
        return
      }
      this.$confirm(this.language('submitSure','您确定要执行提交操作吗？')).then(confirmInfo => {
        if (confirmInfo === 'confirm') {
          submitForApproval(parmas[0]).then(res => {
            if (res.code === '200') {
              iMessage.success(this.language('LK_CAOZUOCHENGGONG','操作成功'))
              this.getFetchData()
            } else {
              iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
            }
          }).catch(e => {
            iMessage.error(this.$i18n.locale === "zh" ? e.desZh : e.desEn);
          })
        }
      })
    },
    onUploadsucess(data, cb) {
      console.log('data', data)
			const fileData = data.data || {}
			const parmas = {
				aekoNum: this.aekoInfo.requirementAekoId,
				manageId: Number(this.aekoInfo.aekoManageId) || '',
				fileName: fileData.name || '',
				filePath: fileData.path || '',
				fileSize: Number(fileData.size/1000/1000).toFixed(2) || 0, // 文件大小MB
				fileType: fileData.extensionName || '',
				uploadId: fileData.id || '',
				linieId: this.userInfo.id || '',
				deptId: this.userInfo.deptDTO && this.userInfo.deptDTO.id || '',
        auditUserId: this.userInfo.id || '',
				taskId: Number(this.currentRow.taskId) || 1075873,
			}
			this.uploading = true
			auditFileSave(parmas).then(res => {
        if (res.code === '200') {
					iMessage.success(this.language('LK_CAOZUOCHENGGONG','操作成功'))
					cb && typeof cb === 'function' && (cb())
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
        }
				this.uploading = false
      }).catch(e => {
        iMessage.error(this.$i18n.locale === "zh" ? e.desZh : e.desEn);
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
				aekoNum: this.aekoInfo.requirementAekoId,
				manageId: Number(this.aekoInfo.aekoManageId) || '',
				taskId: Number(this.aekoInfo.taskId) || 1075873,
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
          tableListData = res.data || []
          totalCount = res.total
        } else {
          tableListData = []
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
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
        iMessage.error(this.$i18n.locale === "zh" ? e.desZh : e.desEn);
      }).finally(() => {
        cb && typeof cb === 'function' && (cb({
          fileTableLoading: false
        }))
      })
    },
		deleteFile(data=[], cb) {
      console.log('删除文件', data, cb)
			if (!data.length) {
				iMessage.error(this.language('QINGXUANZEZHISHAOYITIAOSHUJU','请选择至少一条数据'))
				return
			}
			const fileList = data.map(o => o.id)
			if (fileList && !fileList.length) return iMessage.error(this.language('QINGXUANZEZHISHAOYITIAOSHUJU','请选择至少一条数据'))
				this.$confirm(this.language('deleteSure','您确定要执行删除操作吗？')).then(confirmInfo => {
				if (confirmInfo === 'confirm') {
					auditFileDelete(fileList).then(res => {
						if (res.code === '200') {
							iMessage.success(this.language('LK_CAOZUOCHENGGONG','操作成功'))
              cb && typeof cb === 'function' && (cb())
						} else {
							iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
						}
					}).catch(e => {
						iMessage.error(this.$i18n.locale === "zh" ? e.desZh : e.desEn)
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

}
</style>