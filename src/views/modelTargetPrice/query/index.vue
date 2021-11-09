<!--
 * @Author: Luoshuang
 * @Date: 2021-06-22 11:14:02
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-11-09 21:13:40
 * @Description: 财务目标价-目标价查询
 * @FilePath: \front-web\src\views\modelTargetPrice\query\index.vue
-->

<template>
  <iPage v-permission.auto='MODELTARGETPRICE_QUERY_PAGE|模具目标价管理-目标价查询-页面'>
    <headerNav />
    <!----------------------------------------------------------------->
    <!---------------------------搜索区域------------------------------->
    <!----------------------------------------------------------------->
    <iSearch @sure="sure" @reset="reset">
      <el-form>
        <el-form-item v-for="(item, index) in searchList" :key="index" :label="language(item.i18n_label, item.label)" v-permission.dynamic.auto="item.permission">
          <iSelect v-if="item.type === 'select'" v-model="searchParams[item.value]" :placeholder="language('QINGXUANZE', '请选择')">
            <el-option value="" :label="language('all','全部')"></el-option>
            <el-option
              v-for="item in selectOptions[item.selectOption] || []"
              :key="item.code"
              :label="item.name"
              :value="item.code">
            </el-option>
          </iSelect> 
          <carProjectSelect v-else-if="item.type === 'carProjectSelect'" optionType="1" v-model="searchParams[item.value]" /> 
          <procureFactorySelect v-else-if="item.type === 'procureFactorySelect'" v-model="searchParams[item.value]" />
          <iDicoptions v-else-if="item.type === 'selectDict'" :optionAll="true" :optionKey="item.selectOption" v-model="searchParams[item.value]" />
          <iDatePicker v-else-if="item.type === 'dateRange'" value-format="" type="daterange" v-model="searchParams[item.value]" :default-time="['00:00:00', '23:59:59']"></iDatePicker>
          <iInput v-else v-model="searchParams[item.value]" :placeholder="language('QINGSHURU', '请输入')"></iInput> 
        </el-form-item>
      </el-form>
    </iSearch>
    <!----------------------------------------------------------------->
    <!---------------------------表格区域------------------------------->
    <!----------------------------------------------------------------->
    <iCard class="margin-top20" v-permission.auto='MODELTARGETPRICE_QUERY_TABLE|模具目标价管理-目标价查询-表格'>
      <div class="margin-bottom20 clearFloat">
        <span class="font18 font-weight"></span>
        <div class="floatright">
          <!--------------------导出按钮----------------------------------->
          <iButton @click="handleExport" v-permission.auto='MODELTARGETPRICE_QUERY_EXPORT|模具目标价管理-目标价查询-导出'>{{language('DAOCHU','导出')}}</iButton>
        </div>
      </div>
      <tableList 
        :activeItems='"fsnrGsnrNum"'
        selection 
        indexKey 
        :tableData="tableData" 
        :tableTitle="tableTitle" 
        :tableLoading="tableLoading" 
        @handleSelectionChange="handleSelectionChange" 
        @openPage="openPage"
        @openAttachmentDialog="openAttachmentDialog"
        @openApprovalDialog="openApprovalDialog"
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
    <approvalRecordDialog :dialogVisible="approvalDialogVisible" @changeVisible="changeApprovalDialogVisible" :id="applyId" />
  </iPage>
</template>

<script>
import { iPage, iCard, iPagination, iButton, iSelect, iDatePicker, iInput, iSearch, iMessage } from 'rise'
import headerNav from '../components/headerNav'
import { tableTitle, searchList } from './data'
import { pageMixins } from "@/utils/pageMixins"
import tableList from '../components/tableList'
import approvalRecordDialog from '../maintenance/components/approvalRecord'
import { excelExport } from "@/utils/filedowLoad"
import iDicoptions from 'rise/web/components/iDicoptions'
import attachmentDialog from '@/views/costanalysismanage/components/home/components/downloadFiles/index'
import carProjectSelect from '@/views/project/components/commonSelect/carProjectSelect' 
import procureFactorySelect from '@/views/modelTargetPrice/components/procureFactorySelect'
export default {
  mixins: [pageMixins],
  components: {iDicoptions,procureFactorySelect,iPage,headerNav,iCard,tableList,iPagination,iButton,iSelect,iDatePicker,iInput,iSearch,attachmentDialog,approvalRecordDialog, carProjectSelect},
  data() {
    return {
      tableTitle: tableTitle,
      tableData: [{fsnrGsnrNum: '1232132'}, {fsnrGsnrNum: '23423234324'}],
      searchList: searchList,
      searchParams: {
        buyerId: '',
        cfId: '',
        applyStats: '',
        carTypeCode: '',
        partStatus: '',
        procureFactoryId: '',
        linieId: '',
        cfPriceType: '',
        partProjectType: '',
        setKz: '',
        approveStats: '',
        carTypeName: '',
        assignStats: ''
      },
      isEdit: false,
      tableLoading: false,
      selectOptions: {},
      attachmentDialogVisible: false,
      approvalDialogVisible: false,
      selectItems: [],
      rfqId: '',
      applyId: '',
      fsNum: ''
    }
  },
  created() {
    this.getTableList()
  },
  methods: {
    handleSelectionChange(val) {
      this.selectItems = val
    },
    reset() {
      this.searchParams = {
        buyerId: '',
        cfId: '',
        applyStats: '',
        carTypeCode: '',
        partStatus: '',
        procureFactoryId: '',
        linieId: '',
        cfPriceType: '',
        partProjectType: '',
        setKz: '',
        approveStats: '',
        carTypeName: '',
        assignStats: ''
      }
    },
    sure() {
      this.page = {
        ...this.page,
        currPage: 1
      }
      this.getTableList()
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
    openPage(row) {
      const router =  this.$router.resolve({path: '/sourceinquirypoint/sourcing/partsprocure/editordetail', query: { projectId:row.purchasingProjectId,businessKey:row.partProjectType}})
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
     * @Description: 获取表格数据
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    getTableList() {
      // this.tableLoading = true
      // const params = omit({
      //   ...this.searchParams,
      //   searchType: '1',
      //   applyDateStart: this.searchParams.applyDate ? moment(this.searchParams.applyDate[0]).format('YYYY-MM-DD HH:mm:ss') : null,
      //   applyDateEnd: this.searchParams.applyDate ? moment(this.searchParams.applyDate[1]).format('YYYY-MM-DD HH:mm:ss') : null,
      //   responseDateStart: this.searchParams.responseDate ? moment(this.searchParams.responseDate[0]).format('YYYY-MM-DD HH:mm:ss') : null,
      //   responseDateEnd: this.searchParams.responseDate ? moment(this.searchParams.responseDate[1]).format('YYYY-MM-DD HH:mm:ss') : null,
      //   current: this.page.currPage,
      //   size: this.page.pageSize
      // },['applyDate','responseDate'])
      // getTargetPriceList(params).then(res => {
      //   if (res?.result) {
      //     this.page = {
      //       ...this.page,
      //       totalCount: Number(res.total),
      //       currPage: Number(res.pageNum),
      //       pageSize: Number(res.pageSize)
      //     }
      //     this.tableData = res.data
      //   } else {
      //     this.tableData = []
      //     iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
      //   }
      // }).finally(() => {
      //   this.tableLoading = false
      // })
    },
    handleExport() {
      if (this.selectItems.length < 1) {
        iMessage.warn(this.language('ZHISHAOXUANZEYITIAOJILU','至少选择一条记录'))
        return
      }
      excelExport(this.selectItems, this.tableTitle)
    },
  }
}
</script>

<style lang="scss" scoped>

</style>