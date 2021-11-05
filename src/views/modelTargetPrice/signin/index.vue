<!--
 * @Author: Luoshuang
 * @Date: 2021-06-22 11:14:02
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-11-03 14:42:25
 * @Description: 财务目标价-目标价查询
 * @FilePath: \front-web\src\views\modelTargetPrice\signin\index.vue
-->

<template>
  <iPage v-permission.auto='MODELTARGETPRICE_SIGNIN_PAGE|模具目标价管理-目标价签收-页面'>
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
              :value="item.selectOption === 'LINIE' ? item.name : item.code">
            </el-option>
          </iSelect> 
          <carProjectSelect v-else-if="item.type === 'carProjectSelect'" optionType="1" v-model="searchParams[item.value]" /> 
          <procureFactorySelect v-else-if="item.type === 'procureFactorySelect'" v-model="searchParams[item.value]" />
          <iDicoptions v-else-if="item.type === 'selectDict'" :optionAll="false" :optionKey="item.selectOption" v-model="searchParams[item.value]" />
          <iDatePicker v-else-if="item.type === 'dateRange'" value-format="" type="daterange" v-model="searchParams[item.value]" :default-time="['00:00:00', '23:59:59']"></iDatePicker>
          <iInput v-else v-model="searchParams[item.value]" :placeholder="language('QINGSHURU', '请输入')"></iInput> 
        </el-form-item>
      </el-form>
    </iSearch>
    <!----------------------------------------------------------------->
    <!---------------------------表格区域------------------------------->
    <!----------------------------------------------------------------->
    <iCard class="margin-top20" v-permission.auto='MODELTARGETPRICE_SIGNIN_TABLE|模具目标价管理-目标价签收-表格'>
      <div class="margin-bottom20 clearFloat">
        <span class="font18 font-weight"></span>
        <div class="floatright">
          <!--------------------指派按钮----------------------------------->
          <iButton @click="openAssignDialog" v-permission.auto='MODELTARGETPRICE_SIGNIN_ASSIGNBTN|模具目标价管理-目标价签收-指派按钮'>{{language('LK_ZHIPAI','指派')}}</iButton>
          <!--------------------无投资按钮----------------------------------->
          <iButton @click="openNoInvest" v-permission.auto='MODELTARGETPRICE_SIGNIN_NOINVESTBTN|模具目标价管理-目标价签收-无投资按钮'>{{language('WUTOUZI','无投资')}}</iButton>
          <!--------------------签收按钮----------------------------------->
          <iButton @click="handleSignIn" v-permission.auto='MODELTARGETPRICE_SIGNIN_SIGNINBTN|模具目标价管理-目标价签收-签收按钮'>{{language('QIANSHOU','签收')}}</iButton>
        </div>
      </div>
      <tableList 
        selection 
        indexKey 
        :tableData="tableData" 
        :tableTitle="tableTitle" 
        :tableLoading="tableLoading" 
        @handleSelectionChange="handleSelectionChange" 
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
    <!--                  指派弹窗                                      --->
    <!------------------------------------------------------------------------>
    <assignDialog ref="assign" :dialogVisible="assignDialogVisible" @changeVisible="changeAssignDialogVisible" @sendAccessory="targetAppoint" />
     <!------------------------------------------------------------------------>
    <!--                  无投资确认弹窗                                      --->
    <!------------------------------------------------------------------------>
    <noInvestConfirmDialog ref="noInvestConfirm" :dialogVisible="noInvestDialogVisible" @changeVisible="changeNoInvestDialogVisible" @handleConfirm="handleNoInvestConfirm" />
  </iPage>
</template>

<script>
import { iPage, iCard, iPagination, iButton, iSelect, iDatePicker, iInput, iSearch, iMessage } from 'rise'
import headerNav from '../components/headerNav'
import { tableTitle, searchList } from './data'
import { pageMixins } from "@/utils/pageMixins"
import tableList from '../components/tableList'
import assignDialog from './components/assign'
import { dictkey } from "@/api/partsprocure/editordetail"
import { getCartypeDict} from "@/api/partsrfq/home"
import { appoint } from '@/api/financialTargetPrice/index'
import iDicoptions from 'rise/web/components/iDicoptions'
import attachmentDialog from '@/views/costanalysismanage/components/home/components/downloadFiles/index'
import noInvestConfirmDialog from './components/noInvestConfirm'
import carProjectSelect from '@/views/project/components/commonSelect/carProjectSelect' 
import procureFactorySelect from '@/views/modelTargetPrice/components/procureFactorySelect'
export default {
  mixins: [pageMixins],
  components: {carProjectSelect,procureFactorySelect,iDicoptions,iPage,headerNav,iCard,tableList,iPagination,iButton,iSelect,iDatePicker,iInput,iSearch,attachmentDialog, assignDialog, noInvestConfirmDialog},
  data() {
    return {
      tableTitle: tableTitle,
      tableData: [{}, {}],
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
      assignDialogVisible: false,
      updateDialogVisible: false,
      approvalDialogVisible: false,
      selectItems: [],
      rfqId: '',
      applyId: '',
      fsNum: '',
      noInvestDialogVisible: false,
      attachmentDialogVisible: false
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
    changeAttachmentDialogVisible(visible) {
      this.attachmentDialogVisible = visible
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
        if (res.code == 200) {
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
      const router =  this.$router.resolve({path: '/sourceinquirypoint/sourcing/partsprocure/editordetail', query: { item: JSON.stringify(row) }})
      window.open(router.href,'_blank')
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
    /**
     * @Description: 签收
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    handleSignIn() {
      if (this.selectItems.length < 1) {
        iMessage.warn(this.language('ZHISHAOXUANZEYITIAOJILU','至少选择一条记录'))
        return
      }
    },
    /**
     * @Description: 无投资
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    openNoInvest() {
      if (this.selectItems.length < 1) {
        iMessage.warn(this.language('ZHISHAOXUANZEYITIAOJILU','至少选择一条记录'))
        return
      }
      this.changeNoInvestDialogVisible(true)
    },
    changeNoInvestDialogVisible(visible) {
      this.noInvestDialogVisible = visible
    },
    /**
     * @Description: 无投资确认
     * @Author: Luoshuang
     * @param {*} memo 备注
     * @return {*}
     */    
    handleNoInvestConfirm(memo) {}
  }
}
</script>

<style lang="scss" scoped>

</style>