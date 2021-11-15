<!--
 * @Author: Luoshuang
 * @Date: 2021-06-22 09:12:31
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-11-09 17:56:20
 * @Description: 模具目标价-目标价维护
 * @FilePath: \front-sourcing\src\views\modelTargetPrice\maintenance\index.vue
-->

<template>
  <iPage v-permission.auto='MODELTARGETPRICE_MAINTENANCE_PAGE|模具目标价管理-目标价维护-页面'>
    <headerNav />
    <!----------------------------------------------------------------->
    <!---------------------------搜索区域------------------------------->
    <!----------------------------------------------------------------->
    <iSearch @sure="sure" @reset="reset">
      <el-form>
        <el-form-item v-for="(item, index) in searchList" :key="index" :label="language(item.i18n_label, item.label)" v-permission.dynamic.auto="item.permission">
          <iSelect v-if="item.type === 'select'" v-model="searchParams[item.value]" :placeholder="language('QINGXUANZE', '请选择')">
            <el-option v-if="!item.hideAll" value="" :label="language('ALL','全部')"></el-option>
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
    <iCard class="margin-top20" v-permission.auto='MODELTARGETPRICE_MAINTENANCE_TABLE|模具目标价管理-目标价维护-表格'>
      <div class="margin-bottom20 clearFloat">
        <span class="font18 font-weight"></span>
        <div class="floatright">
          <!--------------------指派按钮----------------------------------->
          <iButton @click="openAssignDialog" v-permission.auto='MODELTARGETPRICE_MAINTENANCE_ASSIGN|模具目标价管理-目标价维护-指派'>{{language('ZHIPAI','指派')}}</iButton>
        </div>
      </div>
      <tableList 
        ref="tableList"
        :activeItems='"rfqId"' 
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
    <approvalRecordDialog :dialogVisible="approvalDialogVisible" @changeVisible="changeApprovalDialogVisible" :id="taskId" />
    <!------------------------------------------------------------------------>
    <!--                  指派弹窗                                      --->
    <!------------------------------------------------------------------------>
    <assignDialog ref="assignDialog" :dialogVisible="assignDialogVisible" @changeVisible="changeAssignDialogVisible" @sendAccessory="targetAppoint" />
  </iPage>
</template>

<script>
import { iPage, iCard, iPagination, iButton, iSelect, iDatePicker, iInput, iSearch, iMessage } from 'rise'
import headerNav from '../components/headerNav'
import { tableTitle, searchList } from './data'
import { pageMixins } from "@/utils/pageMixins"
import tableList from '../components/tableList'
import attachmentDialog from '@/views/costanalysismanage/components/home/components/downloadFiles/index'
import approvalRecordDialog from './components/approvalRecord'
import assignDialog from '../signin/components/assign'
import iDicoptions from 'rise/web/components/iDicoptions'
import carProjectSelect from '@/views/project/components/commonSelect/carProjectSelect' 
import procureFactorySelect from '@/views/modelTargetPrice/components/procureFactorySelect'
import { getTargetPriceMaintainPage, appoint } from '@/api/modelTargetPrice/index'
import moment from 'moment'

export default {
  mixins: [pageMixins],
  components: {carProjectSelect,iDicoptions,procureFactorySelect,iPage,headerNav,iCard,tableList,iPagination,iButton,iSelect,iDatePicker,iInput,iSearch,attachmentDialog,approvalRecordDialog, assignDialog},
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
        state: '',
        showSelf: true
      },
      tableLoading: false,
      selectOptions: {},
      attachmentDialogVisible: false,
      approvalDialogVisible: false,
      recordId: '',
      applyId: '',
      rfqId: '',
      fsNum: '',
      selectItems: [],
      uploadLoading: false,
      exportLoading: false,
      assignDialogVisible: false,
      taskId: ''
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
     * @Description: 指派操作
     * @Author: Luoshuang
     * @param {*} cfId 控制员id
     * @return {*}
     */    
    targetAppoint(cfId) {
      const params = {
        taskIds: this.selectItems.map(item => item.taskId),
        userId: cfId
      }
      appoint(params).then(res => {
        if (res?.result) {
          iMessage.success(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
          this.changeAssignDialogVisible(false)
          this.getTableList()
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        }
      }).finally(() => {
        this.$refs.assignDialog.changeAssigLoading(false)
      })
    },
    /**
     * @Description: 指派
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    openAssignDialog(){
      console.log('openAssignDialog')
      if (this.selectItems.length < 1) {
        iMessage.warn(this.language('ZHISHAOXUANZEYITIAOJILU','至少选择一条记录'))
        return
      }
      this.changeAssignDialogVisible(true)
    },
    /**
     * @Description: 修改指派弹窗状态
     * @Author: Luoshuang
     * @param {*} visible
     * @return {*}
     */    
    changeAssignDialogVisible(visible) {
      this.assignDialogVisible = visible
    },
    beforeUpload() {
      this.uploadLoading = true
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
        partProjectType: '',
        cartypeProjectNum: '',
        procureFactory: '',
        applyType: '',
        state: ''
      }
      this.sure()
    },
    handleSelectionChange(val) {
        this.selectItems = val
    },
    openPage(row) {
      const router =  this.$router.resolve({path: '/modeltargetprice/detail', query: { ...row,applyType: '2' }})
      window.open(router.href,'_blank')
    },
    /**
     * @Description: 审批记录查看
     * @Author: Luoshuang
     * @param {*} row
     * @return {*}
     */    
    openApprovalDialog(row){
      this.taskId = row.taskId || ''
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
      // eslint-disable-next-line no-undef
      const params = _.omit({
        ...this.searchParams,
        searchType: '0',
        applyStartDate: this.searchParams.applyDate ? moment(this.searchParams.applyDate[0]).format('YYYY-MM-DD HH:mm:ss') : null,
        applyEndDate: this.searchParams.applyDate ? moment(this.searchParams.applyDate[1]).format('YYYY-MM-DD HH:mm:ss') : null,
        returnStartDate: this.searchParams.responseDate ? moment(this.searchParams.responseDate[0]).format('YYYY-MM-DD HH:mm:ss') : null,
        returnEndDate: this.searchParams.responseDate ? moment(this.searchParams.responseDate[1]).format('YYYY-MM-DD HH:mm:ss') : null,
        current: this.page.currPage,
        size: this.page.pageSize
      },['applyDate','responseDate'])
      getTargetPriceMaintainPage(params).then(res => {
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
  }
}
</script>

<style lang="scss" scoped>

</style>