<!--
 * @Author: Luoshuang
 * @Date: 2021-06-22 09:12:02
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-11-10 15:23:01
 * @Description: 财务目标价-目标价审批
 * @FilePath: \front-sourcing\src\views\modelTargetPrice\approval\index.vue
-->

<template>
  <iPage v-permission.auto='MODELTARGETPRICE_APPROVAL_PAGE|模具目标价管理-目标价审批-页面'>
    <headerNav />
    <!----------------------------------------------------------------->
    <!---------------------------搜索区域------------------------------->
    <!----------------------------------------------------------------->
    <iSearch @sure="sure" @reset="reset">
      <el-form>
        <el-form-item v-for="(item, index) in searchList" :key="index" :label="language(item.i18n_label,item.label)" v-permission.dynamic.auto="item.permission">
          <iSelect v-if="item.type === 'select'" v-model="searchParams[item.value]" :placeholder="language('QINGXUANZE', '请选择')">
            <el-option v-if="!item.hideAll" value="" :label="language('all','全部')"></el-option>
            <el-option
              v-for="item in selectOptions[item.selectOption] || []"
              :key="item.code"
              :label="item.name"
              :value="item.selectOption === 'LINIE' ? item.name : item.code">
            </el-option>
          </iSelect> 
          <carProjectSelect v-else-if="item.type === 'carProjectSelect'" optionType="1" v-model="searchParams[item.value]" valueType="2" /> 
          <procureFactorySelect v-else-if="item.type === 'procureFactorySelect'" v-model="searchParams[item.value]" />
          <iDicoptions v-else-if="item.type === 'selectDict'" :optionAll="true" :optionKey="item.selectOption" v-model="searchParams[item.value]" />
          <iDatePicker v-else-if="item.type === 'dateRange'" type="daterange" value-format="" v-model="searchParams[item.value]" :default-time="['00:00:00', '23:59:59']"></iDatePicker>
          <iInput v-else v-model="searchParams[item.value]" :placeholder="language('QINGSHURU', '请输入')"></iInput> 
        </el-form-item>
      </el-form>
    </iSearch>
    <!----------------------------------------------------------------->
    <!---------------------------表格区域------------------------------->
    <!----------------------------------------------------------------->
    <iCard class="margin-top20" v-permission.auto='MODELTARGETPRICE_APPROVAL_TABLE|模具目标价管理-目标价审批-表格'>
      <div class="margin-bottom20 clearFloat">
        <span class="font18 font-weight"></span>
        <div class="floatright">
          <!--------------------批准按钮----------------------------------->
          <iButton @click="openApprovalDetailDialog" v-permission.auto='MODELTARGETPRICE_APPROVAL_APPROVALBTN|模具目标价管理-目标价审批-批准按钮'>{{language('PIZHUN','批准')}}</iButton>
          <!--------------------导出按钮----------------------------------->
          <iButton @click="handleExport" :loading="exportLoading" v-permission.auto='MODELTARGETPRICE_APPROVAL_EXPORTBTN|模具目标价管理-目标价审批-导出按钮'>{{language('DAOCHU','导出')}}</iButton>
        </div>
      </div>
      <tableList 
        :activeItems='"rfqId"'
        selection 
        indexKey 
        :tableData="tableData" 
        :tableTitle="tableTitle" 
        :tableLoading="tableLoading" 
        @handleSelectionChange="handleSelectionChange" 
        @openPage="openPage"
        @openApprovalDialog="openApprovalDialog"
        @openAttachmentDialog="openAttachmentDialog"
      >
      </tableList>
      <!------------------------------------------------------------------------>
      <!--                  表格分页                                          --->
      <!------------------------------------------------------------------------>
      <iPagination v-update @size-change="handleSizeChange($event, getTableList)" @current-change="handleCurrentChange($event, getTableList)" background :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :layout="page.layout"
        :current-page="page.currPage"
        :total="page.totalCount"
      />
    </iCard>
    <!------------------------------------------------------------------------>
    <!--                  附件弹窗                                      --->
    <!------------------------------------------------------------------------>
    <attachmentDialog :dialogVisible="attachmentDialogVisible" @changeVisible="changeAttachmentDialogVisible" :rfqNum="rfqId" />
    <!------------------------------------------------------------------------>
    <!--                  审批记录弹窗                                      --->
    <!------------------------------------------------------------------------>
    <approvalRecordDialog :dialogVisible="approvalRecordDialogVisible" @changeVisible="changeApprovalRecordDialogVisible" :id="taskId" />
    <!------------------------------------------------------------------------>
    <!--                  批准弹窗                                      --->
    <!------------------------------------------------------------------------>
    <approvalDialog ref="modelApproval" :dialogVisible="approvalDialogVisible" @changeVisible="changeApprovalDialogVisible" @handleConfirm="handleConfirm" />
  </iPage>
</template>

<script>
import { iPage, iCard, iPagination, iButton, iSelect, iDatePicker, iInput, iSearch, iMessage } from 'rise'
import headerNav from '../components/headerNav'
import { tableTitle, searchList } from './data'
import { pageMixins } from "@/utils/pageMixins"
import tableList from '../components/tableList'
import approvalRecordDialog from '../maintenance/components/approvalRecord'
import attachmentDialog from '@/views/costanalysismanage/components/home/components/downloadFiles/index'
import approvalDialog from './components/approval'
import iDicoptions from 'rise/web/components/iDicoptions'
import carProjectSelect from '@/views/project/components/commonSelect/carProjectSelect' 
import procureFactorySelect from '@/views/modelTargetPrice/components/procureFactorySelect'
import { getTargetPriceApprovalPage, approve, exportApproval } from '@/api/modelTargetPrice/index'
export default {
  mixins: [pageMixins],
  components: {iDicoptions,carProjectSelect,procureFactorySelect,iPage,headerNav,iCard,tableList,iPagination,iButton,iSelect,iDatePicker,iInput,iSearch,attachmentDialog,approvalRecordDialog, approvalDialog},
  data() {
    return {
      tableTitle: tableTitle,
      tableData: [],
      searchList: searchList,
      searchParams: {
        partProjectType: '',
        cartypeProjectNum: '',
        procureFactory: '',
        applyType: '',
        toolingPriceIsZeno: '',
        showSelf: true
      },
      isEdit: false,
      tableLoading: false,
      selectOptions: {},
      approvalDialogVisible: false,
      selectedItems: [],
      applyId: '',
      fsNum: '',
      attachmentDialogVisible: false,
      approvalRecordDialogVisible: false,
      taskId: '',
      exportLoading: false
    }
  },
  created() {
    this.selectOptions = {
      showSelfOptions: [
        { name: this.language("SHI", "是"), code: true },
        { name: this.language("FOU", "否"), code: false }
      ]
    }

    this.getTableList()
  },
  methods: {
    /**
     * @Description: 批准
     * @Author: Luoshuang
     * @param {*} reason
     * @return {*}
     */    
    handleConfirm(reason) {
      const params = {
        remarks: reason,
        taskIds: this.selectedItems.map(item => item.taskId)
      }
      approve(params).then(res => {
        if (res?.result) {
          iMessage.success(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
          this.changeApprovalDialogVisible(false)
          this.getTableList()
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
        }
      }).finally(() => {
        this.$refs.modelApproval.changeSaveLoading(false)
      })
    },
    /**
     * @Description: 附件查看
     * @Author: Luoshuang
     * @param {*} row
     * @return {*}
     */  
    openAttachmentDialog(row){
      this.rfqId = row.rfqId || ''
      this.changeAttachmentDialogVisible(true)
    },
    /**
     * @Description: 修改附件弹窗状态
     * @Author: Luoshuang
     * @param {*} visible
     * @return {*}
     */    
    changeAttachmentDialogVisible(visible) {
      this.attachmentDialogVisible = visible
    },
    /**
     * @Description: 修改记录查看
     * @Author: Luoshuang
     * @param {*} row
     * @return {*}
     */    
    openUpdateDialog(row){
      this.fsNum = row.fsnrGsnrNum || ''
      this.changeUpdateDialogVisible(true)
    },
    /**
     * @Description: 审批记录查看
     * @Author: Luoshuang
     * @param {*} row
     * @return {*}
     */    
    openApprovalDialog(row){
      this.taskId = row.taskId || ''
      this.changeApprovalRecordDialogVisible(true)
    },
    /**
     * @Description: 修改审批记录弹窗状态
     * @Author: Luoshuang
     * @param {*} visible
     * @return {*}
     */    
    changeApprovalRecordDialogVisible(visible) {
      this.approvalRecordDialogVisible = visible
    },
    /**
     * @Description: 修改修改记录弹窗状态
     * @Author: Luoshuang
     * @param {*} visible
     * @return {*}
     */    
    changeUpdateDialogVisible(visible) {
      this.updateDialogVisible = visible
    },
    reset() {
      this.searchParams = {
        partProjectType: '',
        cartypeProjectNum: '',
        procureFactory: '',
        applyType: '',
        toolingPriceIsZeno: ''
      }
      this.sure()
    },
    sure() {
      this.page = {
        ...this.page,
        currPage: 1
      }
      this.getTableList()
    },
    handleSelectionChange(val) {
      this.selectedItems = val
    },
    getTableList() {
      this.tableLoading = true
      const params = {
        ...this.searchParams,
        current: this.page.currPage,
        size: this.page.pageSize
      }
      getTargetPriceApprovalPage(params).then(res => {
        if (res?.result) {
          this.page = {
            ...this.page,
            totalCount: res.total,
            currPage: res.pageNum,
            pageSize: res.pageSize
          }
          this.tableData = res.data
        } else {
          this.tableData = []
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        }
      }).catch(e => {
        this.tableData = []
        iMessage.error(this.$i18n.locale === 'zh' ? e?.desZh : e?.desEn)
      }).finally(() => {
        this.tableLoading = false
      })
    },
    openPage(row) {
      const router =  this.$router.resolve({path: '/modeltargetprice/detail', query: {...row,applyType: '3'}})
      window.open(router.href,'_blank')
    },
    openApprovalDetailDialog(row){
      if (this.selectedItems.length < 1) {
        iMessage.warn(this.language('ZHISHAOXUANZEYITIAOJILU','至少选择一条记录'))
        return
      }
      this.changeApprovalDialogVisible(true)
    },
    changeApprovalDialogVisible(visible) {
      this.approvalDialogVisible = visible
      // if (!visible) {
      //   this.getTableList()
      // }
    },
    /**
     * @Description: 更改编辑状态
     * @Author: Luoshuang
     * @param {*} isEdit 是否为编辑状态
     * @return {*}
     */    
    changeEdit(isEdit) {
      this.isEdit = isEdit
    },
    async handleExport() {
      if (this.selectedItems.length < 1) {
        iMessage.warn(this.language('ZHISHAOXUANZEYITIAOJILU','至少选择一条记录'))
        return
      }
      this.exportLoading = true
      await exportApproval(this.selectedItems.map(item => item.taskId))
      this.exportLoading = false
    },
    handleUpload() {},
    /**
     * @Description: 保存编辑后的内容
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    handleSave() {
      this.changeEdit(false)
    },
    /**
     * @Description: 取消编辑
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    handleCancel() {
      this.changeEdit(false)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>