<!--
 * @Author: Luoshuang
 * @Date: 2021-06-22 09:12:31
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-09-07 17:54:38
 * @Description: 财务目标价-目标价维护
 * @FilePath: \front-web\src\views\financialTargetPrice\maintenance\index.vue
-->

<template>
  <iPage v-permission.auto="FINANCIALTARGETPRICE_MAINTENANCE_PAGE|财务目标价管理-目标价维护-页面">
    <headerNav />
    <!----------------------------------------------------------------->
    <!---------------------------搜索区域------------------------------->
    <!----------------------------------------------------------------->
    <iSearch @sure="sure" @reset="reset">
      <el-form>
        <el-form-item v-for="(item, index) in searchList" :key="index" :label="language(item.i18n_label, item.label)" v-permission.dynamic.auto="item.permission">
          <iSelect v-if="item.type === 'select'" v-model="searchParams[item.value]">
            <el-option value="" :label="language('ALL','全部')"></el-option>
            <el-option
              v-for="item in selectOptions[item.selectOption] || []"
              :key="item.code"
              :label="item.name"
              :value="item.selectOption === 'LINIE' ? item.name : item.code">
            </el-option>
          </iSelect> 
          <iDatePicker v-else-if="item.type === 'dateRange'" type="daterange" value-format="" v-model="searchParams[item.value]" :default-time="['00:00:00', '23:59:59']"></iDatePicker>
          <iInput v-else v-model="searchParams[item.value]"></iInput> 
        </el-form-item>
      </el-form>
    </iSearch>
    <!----------------------------------------------------------------->
    <!---------------------------表格区域------------------------------->
    <!----------------------------------------------------------------->
    <iCard class="margin-top20" v-permission.auto="FINANCIALTARGETPRICE_MAINTENANCE_TABLE|财务目标价管理-目标价维护-表格">
      <div class="margin-bottom20 clearFloat">
        <span class="font18 font-weight"></span>
        <div class="floatright">
          <!--------------------保存按钮----------------------------------->
          <iButton v-if="!isEdit" @click="changeEdit(true)" v-permission.auto="FINANCIALTARGETPRICE_MAINTENANCE_TABLEEDIT|财务目标价管理-目标价维护-表格编辑">{{language('BIANJI','编辑')}}</iButton>
          <!--------------------保存按钮----------------------------------->
          <iButton v-if="isEdit" @click="handleSave" :loading="signLoading">{{language('BAOCUN','保存')}}</iButton>
          <!--------------------取消按钮----------------------------------->
          <iButton v-if="isEdit" @click="handleCancel" >{{language('QUXIAO','取消')}}</iButton>
          <!--------------------导出批量维护按钮----------------------------------->
          <iButton @click="handleExport" :loading="exportLoading" v-permission.auto="FINANCIALTARGETPRICE_MAINTENANCE_TABLEEXPORT|财务目标价管理-目标价维护-表格导出批量维护">{{language('DAOCHUPILIANGWEIHU','导出批量维护')}}</iButton>
          <!--------------------导入批量维护按钮----------------------------------->
          <el-upload
            class=" margin-left10 margin-right10"
            accept='.xlsx'
            style="display:inline-block;"
            :http-request="upload"
            :show-file-list='false'
            :before-upload="beforeUpload"
            v-permission.auto="FINANCIALTARGETPRICE_MAINTENANCE_TABLEIMPORT|财务目标价管理-目标价维护-表格导入批量维护"
          >
            <iButton :loading='uploadLoading'>{{language('DAORUPILIANGWEIHU','导入批量维护')}}</iButton>
          </el-upload>
        </div>
      </div>
      <tableList 
        ref="tableList"
        :activeItems='"partNum"' 
        :isEdit="isEdit" 
        selection 
        indexKey 
        :tableData="tableData" 
        :tableTitle="tableTitle" 
        :tableLoading="tableLoading" 
        @handleSelectionChange="handleSelectionChange" 
        @openPage="openPage"
        @openModifyDialog="openUpdateDialog"
        @openAttachmentDialog="openAttachmentDialog"
        @openApprovalDialog="openApprovalDialog"
        @openEditdetail="openEditdetail"
        :selectedItems="selectItems"
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
    <!--                  修改记录弹窗                                      --->
    <!------------------------------------------------------------------------>
    <modificationRecordDialog :dialogVisible="updateDialogVisible" @changeVisible="changeUpdateDialogVisible" :id="applyId" />
    <!------------------------------------------------------------------------>
    <!--                  附件弹窗                                      --->
    <!------------------------------------------------------------------------>
    <attachmentDialog :dialogVisible="attachmentDialogVisible" @changeVisible="changeAttachmentDialogVisible" :rfqNum="rfqId" />
    <!------------------------------------------------------------------------>
    <!--                  审批记录弹窗                                      --->
    <!------------------------------------------------------------------------>
    <approvalRecordDialog :dialogVisible="approvalDialogVisible" @changeVisible="changeApprovalDialogVisible" :id="applyId" />
  </iPage>
</template>

<script>
import { iPage, iCard, iPagination, iButton, iSelect, iDatePicker, iInput, iSearch, iMessage } from 'rise'
import headerNav from '../components/headerNav'
import { tableTitle, searchList } from './data'
import { pageMixins } from "@/utils/pageMixins"
import tableList from '../components/tableList'
import modificationRecordDialog from './components/modificationRecord'
import attachmentDialog from '@/views/costanalysismanage/components/home/components/downloadFiles/index'
import approvalRecordDialog from './components/approvalRecord'
import { dictkey } from "@/api/partsprocure/editordetail"
import { getTargetPriceList, exportTargetPriceList, setPrice, getCFList, getPartStatus, importTargetPriceList, batchSetPrice} from "@/api/financialTargetPrice/index"
import { getDictByCode } from '@/api/dictionary'
import {omit} from 'lodash'
import moment from 'moment'
export default {
  mixins: [pageMixins],
  components: {iPage,headerNav,iCard,tableList,iPagination,iButton,iSelect,iDatePicker,iInput,iSearch,modificationRecordDialog,attachmentDialog,approvalRecordDialog},
  data() {
    return {
      tableTitle: tableTitle,
      tableData: [],
      searchList: searchList,
      searchParams: {
        cfId: '',
        applyStats: '',
        partProjectType: '',
        buyerId: '',
        linieName: '',
        partStatus: '',
        carTypeName: '',
        procureFactoryId: '',
        cfPriceType: ''
      },
      isEdit: false,
      tableLoading: false,
      selectOptions: {},
      attachmentDialogVisible: false,
      updateDialogVisible: false,
      approvalDialogVisible: false,
      uploadUrl: process.env.VUE_APP_SOURCING_ZDH,
      recordId: '',
      applyId: '',
      rfqId: '',
      selectItems: [],
      uploadLoading: false,
      exportLoading: false
    }
  },
  created() {
    this.getDicts()
    this.getCF()
    this.getPartStatus()
    this.getProcureGroup()
    this.getTableList()
  },
  methods: {
    beforeUpload() {
      this.uploadLoading = true
    },
    upload(content) {
      const formData = new FormData()
      formData.append('file', content.file)
      // formData.append('applicationName', 'procurereq-service')
      importTargetPriceList(formData)
        .then(res => {
          this.fileSuccess(res)
        })
        .catch(rej => {
          this.fileError(rej)
        })
    },
    getPartStatus() {
      getPartStatus().then(res => {
        if(res?.result) {
          this.selectOptions = {
            ...this.selectOptions,
            PART_STATUS: res.data[0].list.map(item => {
              return {
                code: item.key,
                name: item.name
              }
            })
          }
        }
      })
    },
    sure() {
      this.page = {
        ...this.page,
        currPage: 1
      }
      this.getTableList()
    },
    reset() {
      this.searchParams = {
        cfId: '',
        applyStats: '',
        partProjectType: '',
        buyerId: '',
        linieName: '',
        partStatus: '',
        carTypeName: '',
        procureFactoryId: '',
        cfPriceType: ''
      }
    },
    getCF() {
      getCFList().then(res => {
        if (res?.result) {
          this.selectOptions = {
            ...this.selectOptions,
            CF_USER: res.data.map(item => {
              return {
                code: item.id,
                name: item.nameZh
              }
            })
          }
        }
      })
    },
    getDict(type) {
      getDictByCode(type).then(res => {
        if (res?.result) {
          this.selectOptions = {
            ...this.selectOptions,
            [type]: res.data[0]?.subDictResultVo || []
          }
        }
      })
    },
    getDicts() {
      // 财务目标价分类
      this.getDict('CF_PRICE_TYPE')
      //申请状态CF_APPLY_STATUS
      this.getDict('CF_APPLY_STATUS')
    },
    handleSelectionChange(val) {
      if (!this.isEdit) {
        this.selectItems = val
      } else {
        // this.$refs.tableList.toggleSelection(val.filter(item => item.props !== val.props), false)
        // this.$refs.tableList.toggleSelection(this.selectItems)
      }
    },
    fileError(err) {
      this.uploadLoading = false;
      // console.log(err.message)
      const errRes = JSON.parse(err.message)
      this.uploadLoading=false;iMessage.error(this.$i18n.locale === 'zh' ? errRes?.desZh : errRes?.desEn || '上传失败')
    },
    fileSuccess(res){
      if(res.code == 200){
        // this.vm.init()
        this.uploadLoading=false;
        iMessage.success(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        this.getTableList()
      }else{
        this.uploadLoading = false;
        iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
      }
    },
    /**
     * @Description: 获取下拉框
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    getProcureGroup() {
      dictkey().then((res) => {
        if (res.data) {
          this.selectOptions = {
            ...this.selectOptions,
            ...res.data
          }
        }
      });
    },
    /**
     * @Description: 点击操作列
     * @Author: Luoshuang
     * @param {*} row
     * @return {*}
     */    
    openEditdetail(row) {
      const router =  this.$router.resolve({path: '/financialtargetprice/detail', query: { item: JSON.stringify(row) }})
      window.open(router.href,'_blank')
    },
    openPage(row) {
      const router =  this.$router.resolve({path: '/sourceinquirypoint/sourcing/partsprocure/editordetail', query: { item: JSON.stringify({...row,id:row.purchasingProjectId,purchasingRequirementObjectId:row.purchasingRequirementId}) }})
      window.open(router.href,'_blank')
    },
    /**
     * @Description: 审批记录查看
     * @Author: Luoshuang
     * @param {*} row
     * @return {*}
     */    
    openApprovalDialog(row){
      this.applyId = row.applyId || ''
      this.changeApprovalDialogVisible(true)
    },
    /**
     * @Description: 修改审批记录弹窗状态
     * @Author: Luoshuang
     * @param {*} visible
     * @return {*}
     */    
    changeApprovalDialogVisible(visible) {
      this.approvalDialogVisible = visible
    },
    /**
     * @Description: 修改记录查看
     * @Author: Luoshuang
     * @param {*} row
     * @return {*}
     */    
    openUpdateDialog(row){
      this.applyId = row.applyId || ''
      this.changeUpdateDialogVisible(true)
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
     * @Description: 获取表格数据
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    getTableList() {
      this.tableLoading = true
      this.isEdit = false
      const params = omit({
        ...this.searchParams,
        searchType: '0',
        applyDateStart: this.searchParams.applyDate ? moment(this.searchParams.applyDate[0]).format('YYYY-MM-DD HH:mm:ss') : null,
        applyDateEnd: this.searchParams.applyDate ? moment(this.searchParams.applyDate[1]).format('YYYY-MM-DD HH:mm:ss') : null,
        responseDateStart: this.searchParams.responseDate ? moment(this.searchParams.responseDate[0]).format('YYYY-MM-DD HH:mm:ss') : null,
        responseDateEnd: this.searchParams.responseDate ? moment(this.searchParams.responseDate[1]).format('YYYY-MM-DD HH:mm:ss') : null,
        current: this.page.currPage,
        size: this.page.pageSize
      },['applyDate','responseDate'])
      getTargetPriceList(params).then(res => {
        if (res?.result) {
          this.page = {
            ...this.page,
            totalCount: Number(res.total),
            currPage: Number(res.pageNum),
            pageSize: Number(res.pageSize)
          }
          this.tableData = res.data
        } else {
          this.tableData = []
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        }
      }).finally(() => {
        this.tableLoading = false
      })
    },
    /**
     * @Description: 更改编辑状态
     * @Author: Luoshuang
     * @param {*} isEdit 是否为编辑状态
     * @return {*}
     */    
    changeEdit(isEdit) {
      if (isEdit) {
        this.tableData = this.tableData.map(item => {
          return {
            ...item,
            isEdit: !['APPROVED', 'APPROVAL_K2'].includes(item.approveStatus) && item.applyType === 'LC'
          }
        })
      }
      if (!this.tableData.some(item => item.isEdit)) {
        iMessage.warn(this.language('MEIYOUKEYIBIANJIDESHUJU','没有可以编辑的数据'))
        return
      }
      // if (this.selectItems.length < 1) {
      //   iMessage.warn(this.language('QINGXUANZEYITIAOJILU','请选择一条记录'))
      //   return
      // }
      // if (this.selectItems.length > 1) {
      //   iMessage.warn(this.language('ZHINENGXUANZEYITIAOJILU','只能选择一条记录'))
      //   return
      // }
      this.isEdit = isEdit
    },
    async handleExport() {
      if (this.selectItems.length < 1) {
        iMessage.warn(this.language('ZHISHAOXUANZEYITIAOJILU','至少选择一条记录'))
        return
      }
      this.exportLoading = true
      await exportTargetPriceList({idList: this.selectItems.map(item => item.applyId)})
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
      this.tableLoading = true
      const params = this.tableData.filter(item => item.isEdit).map(item => {
        return {
          ...item,
          partPrjCode: item.fsnrGsnrNum
        }
      })
      batchSetPrice(params).then(res => {
        if (res?.result) {
          iMessage.success(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
          this.changeEdit(false)
          this.getTableList()
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        }
      }).finally(() => {
        this.tableLoading = false
      })
    },
    /**
     * @Description: 取消编辑
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    handleCancel() {
      this.changeEdit(false)
      this.getTableList()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>