<!--
 * @Author: Luoshuang
 * @Date: 2021-06-22 11:14:02
 * @LastEditors: 余继鹏 917955345@qq.com
 * @LastEditTime: 2022-12-29 20:56:07
 * @Description: 财务目标价-目标价查询
 * @FilePath: \front-sourcing\src\views\financialTargetPrice\query\index.vue
-->

<template>
  <iPage class="query" v-permission.auto="FINANCIALTARGETPRICE_QUERY_PAGE|财务目标价管理-目标价查询-页面">
    <headerNav />
    <!----------------------------------------------------------------->
    <!---------------------------搜索区域------------------------------->
    <!----------------------------------------------------------------->
    <iSearch @sure="sure" @reset="reset">
      <el-form>
        <el-form-item v-for="(item, index) in searchList" :key="index" :label="language(item.i18n_label, item.label)" v-permission.dynamic.auto="item.permission">
          <iSelect v-if="item.type === 'select'" v-model="searchParams[item.value]">
            <el-option value="" :label="language('all','全部')"></el-option>
            <el-option
              v-for="item in selectOptions[item.selectOption] || []"
              :key="item.code"
              :label="item.name"
              :value="item.selectOption === 'LINIE' ? item.name : item.code">
            </el-option>
          </iSelect> 
          <iDicoptions v-else-if="item.type === 'selectDict'" :optionAll="false" :optionKey="item.selectOption" v-model="searchParams[item.value]" />
          <iDatePicker v-else-if="item.type === 'dateRange'" value-format="" type="daterange" v-model="searchParams[item.value]" :default-time="['00:00:00', '23:59:59']"></iDatePicker>
          <iMultiLineInput v-else-if="item.type === 'multiLineInput'" v-model="searchParams[item.value]" :title="language(item.i18n_label, item.label)" />
          <iInput v-else v-model="searchParams[item.value]"></iInput> 
        </el-form-item>
      </el-form>
    </iSearch>
    <!----------------------------------------------------------------->
    <!---------------------------表格区域------------------------------->
    <!----------------------------------------------------------------->
    <iCard class="margin-top7" v-permission.auto="FINANCIALTARGETPRICE_QUERY_TABLE|财务目标价管理-目标价查询-表格">
      <div class="margin-bottom20 clearFloat">
        <span class="font18 font-weight"></span>
        <div class="floatright">
          <!--------------------指派按钮----------------------------------->
          <iButton @click="openAssignDialog" :loading="assignDialogVisible" v-permission.auto="FINANCIALTARGETPRICE_QUERY_ASSIGN|财务目标价管理-目标价查询-指派">{{language('LK_ZHIPAI','指派')}}</iButton>
          <!--------------------导出按钮----------------------------------->
          <iButton @click="handleExport" v-permission.auto="FINANCIALTARGETPRICE_QUERY_EXPORT|财务目标价管理-目标价查询-导出">{{language('DAOCHU','导出')}}</iButton>
        </div>
      </div>
      <tableList 
        fixed
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
      >
        <!-- LC_A -->
        <template #lcAPrice="scope">
          <span>{{ scope.row.lcAPrice | thousandsFilter }}</span>
        </template>
        <!-- LC_B -->
        <template #lcBPrice="scope">
          <span>{{ scope.row.lcBPrice | thousandsFilter }}</span>
        </template>
        <!-- 分摊量 -->
        <template #releaseOutput="scope">
          <span>{{ scope.row.releaseOutput | fixed }}</span>
        </template>
        <!-- 预计分摊A价 -->
        <template #estimateShareAPrice="scope">
          <span>{{ scope.row.estimateShareAPrice | thousandsFilter }}</span>
        </template>
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
    <modificationRecordDialog :dialogVisible="updateDialogVisible" @changeVisible="changeUpdateDialogVisible" :id="fsNum" />
    <!------------------------------------------------------------------------>
    <!--                  审批记录弹窗                                      --->
    <!------------------------------------------------------------------------>
    <approvalRecordDialog :dialogVisible="approvalDialogVisible" @changeVisible="changeApprovalDialogVisible" :id="applyId" />
    <!------------------------------------------------------------------------>
    <!--                  指派弹窗                                      --->
    <!------------------------------------------------------------------------>
    <assignDialog ref="assign" :dialogVisible.sync="assignDialogVisible" @changeVisible="changeAssignDialogVisible" @sendAccessory="targetAppoint" />
  </iPage>
</template>

<script>
import { iPage, iCard, iPagination, iButton, iSelect, iDatePicker, iInput, iSearch, iMessage, iMultiLineInput } from 'rise'
import headerNav from '../components/headerNav'
import { tableTitle, searchList } from './data'
import { pageMixins } from "@/utils/pageMixins"
import tableList from '../components/tableList'
import modificationRecordDialog from '../maintenance/components/modificationRecord'
import approvalRecordDialog from '../maintenance/components/approvalRecord'
import assignDialog from './components/assign'
import { dictkey } from "@/api/partsprocure/editordetail"
import { getCartypeDict} from "@/api/partsrfq/home"
import { appoint, getTargetPriceList, getPartStatus, getCFList, getSetOptions } from '@/api/financialTargetPrice/index'
import { excelExport } from "@/utils/filedowLoad"
import { omit } from 'lodash'
import { getDictByCode } from '@/api/dictionary'
import moment from 'moment'
import iDicoptions from 'rise/web/components/iDicoptions'
export default {
  mixins: [pageMixins],
  components: {iDicoptions,iPage,headerNav,iCard,tableList,iPagination,iButton,iSelect,iDatePicker,iInput,iSearch, iMultiLineInput, modificationRecordDialog,approvalRecordDialog, assignDialog},
  data() {
    return {
      tableTitle: tableTitle,
      tableData: [],
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
        assignStats: '',
        showSelf: true
      },
      isEdit: false,
      tableLoading: false,
      selectOptions: {},
      assignDialogVisible: false,
      updateDialogVisible: false,
      approvalDialogVisible: false,
      selectItems: [],
      rfqId: '',
      applyId: '',
      fsNum: ''
    }
  },
  filters:{
    // 金额千分位
    thousandsFilter(num, len = 2) {
      if(num==null) return num
      num = String(num).replace(/[^0-9.-]/ig, '');
      num = Number(num).toFixed(len);
      const numArray = String(num).split('.');
      numArray[0] = parseFloat(numArray[0]).toLocaleString();
      const value = numArray.join('.');
      return value || 0;
    },
    // 取整
    fixed(num,len=0){
      if(num==null) return num
      return Number(num).toFixed(len);
    }
  },
  created() {
    this.getSetOptions()
    this.getDicts()
    this.getProcureGroup()
    this.getCartypeDict()
    this.getCF()
    this.getPartStatus()
    this.getTableList()
  },
  methods: {
    getSetOptions() {
      getSetOptions().then(res => {
        if (res?.result) {
          this.selectOptions = {
            ...this.selectOptions,
            setOptions: res.data?.map(item => {
              return {
                code: item.id,
                name: item.code
              }
            })
          }
        }
      })
    },
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
        assignStats: '',
        showSelf: true

      }
      this.sure()
    },
    getDict(type) {
      if(type == 'IS_SHOW_SELF') {
        this.selectOptions = {
          ...this.selectOptions,
          [type]:[
            {
              code:true,
              name:'是'
            },
             {
              code:false,
              name:'否'
            },
          ]
        }
      } else {
        getDictByCode(type).then(res => {
          if (res?.result) {
            this.selectOptions = {
              ...this.selectOptions,
              [type]: res.data[0]?.subDictResultVo || []
            }
          }
        })
      }
    },
    getDicts() {
      // 目标价分类
      // this.getDict('CF_PRICE_TYPE')
      //申请状态CF_APPLY_STATUS
      // this.getDict('CF_APPLY_STATUS')
      // 审批状态CF_APPROVE_STATUS
      // this.getDict('CF_APPROVE_STATUS')
      // 指派状态CF_ASSIGN_START
      // this.getDict('CF_ASSIGN_START')
      //是否显示自己
      this.getDict('IS_SHOW_SELF')

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
     * @Description: 指派操作
     * @Author: Luoshuang
     * @param {*} priceAnaId 价格分析员id
     * @return {*}
     */    
    targetAppoint(priceAnaId) {
      const params = {
        idList: this.selectItems.map(item => item.applyId),
        priceAnaId
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
        this.$refs.assign.changeAssigLoading(false)
      })
    },
    // 获取车型字典
    getCartypeDict() {
      getCartypeDict()
      .then(res => {
        if (res?.code == 200) {
          this.selectOptions = {
            ...this.selectOptions,
            cartTypeOptions: Array.isArray(res.data) ? res.data : []
          }
        }
      })
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
          this.selectOptions = {...this.selectOptions,...res.data};
        }
      });
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
     * @Description: 修改修改记录弹窗状态
     * @Author: Luoshuang
     * @param {*} visible
     * @return {*}
     */    
    changeUpdateDialogVisible(visible) {
      this.updateDialogVisible = visible
    },
    /**
     * @Description: 指派
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    openAssignDialog(){
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
    /**
     * @Description: 获取表格数据
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    getTableList() {
      this.tableLoading = true
      const params = omit({
        ...this.searchParams,
        searchType: '1',
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
      this.isEdit = isEdit
    },
    handleExport() {
      if (this.selectItems.length < 1) {
        iMessage.warn(this.language('ZHISHAOXUANZEYITIAOJILU','至少选择一条记录'))
        return
      }
      excelExport(this.selectItems, this.tableTitle)
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