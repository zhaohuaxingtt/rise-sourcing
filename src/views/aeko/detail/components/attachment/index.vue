<!--
 * @Author: wentliao
 * @Date: 2021-08-07 09:59:52
 * @Description: aeko详情-审批附件
-->
<template>
  <iCard class="aekoDetailAttachment">
    <span class="font18 font-weight">
      {{ language("LK_SHENPIFUJIAN", "审批附件") }}
    </span>
    <div class="editControl floatright margin-bottom20">
      <upload
				class="upload-trigger"
				:hideTip="true"
				:accept="'.jpg,.jpeg,.png,.pdf,.tif'"
				:buttonText="language('LK_SHANGCHUAN','上传')"
				:uploadButtonLoading="uploading"
        v-permission.auto="AEKO_AEKODETAIL_APPROVE_ATTACHMENT_BUTTON_UPLOAD|AKEO详情-审批附件上传"
				@on-success="onUploadsucess"
			/>
			<iButton class="margin-left5" @click="deleteFile" :loading="deleting" v-permission.auto="AEKO_AEKODETAIL_APPROVE_ATTACHMENT_BUTTON_DELETE|AKEO详情-审批附件删除">
        {{ language("LK_SHANCHU", "删除") }}
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
      v-permission.auto="AEKO_AEKODETAIL_APPROVE_ATTACHMENT_TABLE|AKEO详情-审批附件列表"
    >
      <template #fileName="scope">
        <div style="text-align: left">
          <a class="link-underline" href="javascript:;" @click="download(scope.row)">
            {{ scope.row.fileName }}
          </a>
        </div>
      </template>
      <template #fileDescribe="scope">
        <iInput v-model="scope.row.fileDescribe" @blur="updateApproveAttach(scope.row)" :placeholder="language('LK_QINGSHURU','请输入')" clearable />
      </template>
			<template #remark="scope">
        <iInput v-if="!scope.row.taskId" v-model="scope.row.remark" @blur="updateApproveAttach(scope.row)" :placeholder="language('LK_QINGSHURU','请输入')" clearable />
        <span v-else>{{language('JIESHIFUJIAN', '解释附件')}}</span>
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
  </iCard>
</template>

<script>
import Vuex from 'vuex'
import {approveAttachTableTitle as tableTitle} from '../data'
import upload from 'rise/web/components/iFile/upload'
import tablelist from 'rise/web/components/iFile/tableList';
import {downloadFile} from 'rise/web/components/iFile/lib'
import {iCard, iButton, iPagination, iInput, iMessage} from 'rise'
import { pageMixins } from '@/utils/pageMixins'
import { setLogMenu } from "@/utils";
import {
  getAuditFilePage,
  auditFileSave,
	auditFileUpdate,
	auditFileDelete
} from '@/api/aeko/detail/approveAttach'

export default {
  name: "aekoDetailRecord",
  mixins: [pageMixins],
  components: {
    iCard,
    iButton,
    iPagination,
		iInput,
    tablelist,
		upload
    // iFileDialog
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
			uploading: false,
			deleting: false,
      disabled:false,
    };
  },
  created(){
    const {query} = this.$route;
    const {from=''} = query;
    from=='manage'?setLogMenu('AEKO管理-详情页-审批附件'):setLogMenu('AEKO表态-详情页-审批附件')
  },
  mounted() {
    this.getFetchData()
  },
  methods: {
  /**
   * @description: 表格选择
   * @param {*} val
   * @return {*}
   */    
		handleSelectionChange(val) {
      this.tableSelecteData = val
    },
  /**
   * @description: 点击文件名下载
   * @param {*} row
   * @return {*}
   */    
		download(row) {
			downloadFile(row.uploadId)
		},
		updateApproveAttach(fileData) {
			const parmas = window._.cloneDeep(fileData)
      // 删除备份
      delete parmas._fileDescribe
      delete parmas._remark
      // 必填校验
      if (!parmas.fileDescribe) {
        iMessage.error(this.language('WENJIANMIAOSHUBUNENGWEIKONG','文件描述不能为空'))
        this.$set(fileData, 'fileDescribe', fileData._fileDescribe)
        return
      }
      // 内容没改变，直接退出
      if (parmas.fileDescribe === fileData._fileDescribe && parmas.remark === fileData._remark) return
			auditFileUpdate(parmas).then(res => {
        if (res.code !== '200') {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
        }else{
          fileData._fileDescribe = fileData.fileDescribe
          fileData._remark = fileData.remark
        }
      }).catch(e => {
        iMessage.error(this.$i18n.locale === "zh" ? e.desZh : e.desEn);
      })
		},
    onUploadsucess(data) {
			const fileData = data.data || {}
			const parmas = {
				aekoNum: this.aekoInfo.aekoCode,
				manageId: Number(this.aekoInfo.aekoManageId) || '',
				fileName: fileData.name || '',
				filePath: fileData.path || '',
				fileSize: Number(fileData.size/1000/1000).toFixed(2) || 0, // 文件大小MB
				fileType: fileData.extensionName || '',
				uploadId: fileData.id || '',
				linieId: this.userInfo.id || '',
				deptId: this.userInfo.deptDTO && this.userInfo.deptDTO.id || '',
        deptName: this.userInfo.deptDTO && this.userInfo.deptDTO.nameEn || '',
				taskId: Number(this.aekoInfo.taskId) || 0,

			}
			this.uploading = true
			auditFileSave(parmas).then(res => {
        if (res.code === '200') {
					iMessage.success(this.language('LK_CAOZUOCHENGGONG','操作成功'))
					this.getFetchData()
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
    getFetchData() {
      const parmas = Object.assign({
				linieId: this.userInfo.id || '',
				aekoNum: this.aekoInfo.aekoCode,
				manageId: Number(this.aekoInfo.aekoManageId) || '',
				taskId: [],
        current: this.page.currPage,
        size: this.page.pageSize
      })
      this.tableLoading = true
      getAuditFilePage(parmas).then(res => {
        if (res.code === '200') {
          this.tableListData = (res.data || []).map(o => {
            o._fileDescribe = o.fileDescribe
            o._remark = o.remark
            o._fileSize = `${o.fileSize} MB`
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
		deleteFile() {
			if (!this.tableSelecteData.length) {
				iMessage.error(this.language('QINGXUANZEZHISHAOYITIAOSHUJU','请选择至少一条数据'))
				return
			}
			const fileList = this.tableSelecteData.map(o => o.id)
			if (fileList && !fileList.length) return iMessage.error(this.language('QINGXUANZEZHISHAOYITIAOSHUJU','请选择至少一条数据'))
				this.$confirm(this.language('deleteSure','您确定要执行删除操作吗？')).then(confirmInfo => {
				if (confirmInfo === 'confirm') {
          this.deleting = true
					auditFileDelete({
            ids: fileList,
            delType: 0
          }).then(res => {
						if (res.code === '200') {
							iMessage.success(this.language('LK_CAOZUOCHENGGONG','操作成功'))
							this.getFetchData()
						} else {
							iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
						}
					}).catch(e => {
						iMessage.error(this.$i18n.locale === "zh" ? e.desZh : e.desEn)
					}).finally(() => {
            this.deleting = false
          })
				}
			})
		}
  }
};
</script>

<style lang="scss" scoped>
	.aekoDetailAttachment{
	}

</style>