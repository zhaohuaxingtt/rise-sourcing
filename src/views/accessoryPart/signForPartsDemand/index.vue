<!--
 * @Author: Luoshuang
 * @Date: 2021-05-25 13:57:11
 * @LastEditors: YoHo
 * @LastEditTime: 2022-03-31 14:57:45
 * @Description: 配件签收
 * @FilePath: \front-sourcing\src\views\accessoryPart\signForPartsDemand\index.vue
-->

<template>
  <iPage class="signForParts">
          <headerNav />
          <!----------------------------------------------------------------->
          <!---------------------------搜索区域------------------------------->
          <!----------------------------------------------------------------->
          <iSearch @sure="sure" @reset="reset">
            <el-form>
              <el-form-item v-for="(item, index) in searchList" :key="index" :label="language(item.key,item.label)" v-permission.dynamic.auto="item.permission">
                <iSelect clearable v-if="item.type === 'select'" v-model="searchParams[item.value]" :placeholder="language('QINGXUANZE', '请选择')">
                  <el-option v-if="item.value == 'linieApportionStatus'" value="" :label="language('ALL','全部')"></el-option>
                  <template v-for="item1 in selectOptions[item.selectOption] || []">
                    <el-option
                      :key="item1.key || item1.value"
                      :label="item1.label"
                      :value="item1.value">
                    </el-option>
                  </template>
                </iSelect>
                <iDatePicker clearable v-else-if="item.type === 'date'" value-format="yyyy-MM-dd" type="daterange" v-model="searchParams[item.value]" :placeholder="language('QINGXUANZE', '请选择')"></iDatePicker>
                <iMultiLineInput clearable v-else-if="item.type === 'multiLineInput'" v-model="searchParams[item.value]" :title="language(item.key, item.label)" />
                <iInput clearable v-else v-model="searchParams[item.value]" :placeholder="language('QINGSHURU', '请输入')"></iInput> 
              </el-form-item>
            </el-form>
          </iSearch>
          <!----------------------------------------------------------------->
          <!---------------------------表格区域------------------------------->
          <!----------------------------------------------------------------->
          <iCard class="margin-top7" v-permission.auto="APREPART_SIGN_TABLE|配件-配件签收-表格">
            <div class="margin-bottom20 clearFloat">
              <span class="font18 font-weight">{{language('PEIJIANXUQIUQIANSHOU','配件需求签收')}}</span>
                <div class="floatright">
                  <!--------------------签收按钮----------------------------------->
                  <iButton @click="signAccessory" :loading="signLoading" v-permission.auto="APREPART_SIGN_SIGN|配件-配件签收-签收">{{language('QIANSHOU','签收')}}</iButton>
                  <!--------------------退回EPS按钮----------------------------------->
                  <iButton @click="changebackDialogVisible(true)" v-permission.auto="APREPART_SIGN_BACKEPS|配件-配件签收-退回EPS">{{language('TUIHUIEPS','退回EPS')}}</iButton>
                  <!--------------------分配询价采购员按钮----------------------------------->
                  <iButton @click="openBuyerDialog" v-permission.auto="APREPART_SIGN_SENDBUYER|配件-配件签收-分配询价采购员">{{language('FENPEIXUNJIACAIGOUYUAN','分配询价采购员')}}</iButton>
                  <!--------------------分配Linie按钮----------------------------------->
                  <iButton @click="openInquiryDialog" v-permission.auto="APREPART_SIGN_SENDLINIE|配件-配件签收-分配Linie" >{{language('FENPEILINIE','分配Linie')}}</iButton>
                  <!--------------------导出按钮----------------------------------->
                  <iButton @click="donwloadList" :loading="downloadLoading" v-permission.auto="APREPART_SIGN_EXPORT|配件-配件签收-导出">{{language('DAOCHU','导出')}}</iButton>
                  <buttonTableSetting @click="edittableHeader"></buttonTableSetting>
                </div>
            </div>
            <tableList
              ref="tableList"
              max-height="570px"
              permissionKey="ACCESSORYPART_SIGNFORPARTSDEMAND"
              :lang="true" 
            :activeItems='"spnrNum"' selection indexKey :tableData="tableData" :tableTitle="tableTitle" :tableLoading="tableLoading" @handleSelectionChange="handleSelectionChange" @openPage="openPage">
              <template #supplierSapCode="scope">
                <span>{{ scope.row.supplierSapCode || scope.row.supplierSvwTempCode }}</span>
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
    <!--                  分配询价科室弹窗                                   --->
          <!------------------------------------------------------------------------>
          <assignInquiryDepartmentDialog ref="sendliniedept" :dialogVisible="inquiryDialogVisible"  @changeVisible="changeInquiryDialogVisible" @sendAccessory="sendAccessoryDept" :idList="selectliniePartId" @init="init"/>
          <!------------------------------------------------------------------------>
          <!--                  分配询价采购员弹窗                                 --->
          <!------------------------------------------------------------------------>
          <assignInquiryBuyerDialog ref="sendlinie" :dialogVisible="buyerDialogVisible" @changeVisible="changeBuyerDialogVisible" @sendAccessory="sendAccessoryLINIE" :deptId="selectDeptId" :idList="selectBuyerPartId" @init="init" :hasUpdateStatus='true' />
          <!------------------------------------------------------------------------>
          <!--                  退回EPS弹窗                                       --->
          <!------------------------------------------------------------------------>
          <backDialog ref="backEPS" :dialogVisible="backDialogVisible" @changeVisible="changebackDialogVisible" @handleBack="handleBackEPS" />
  </iPage>
</template>

<script>
import { iPage, iSearch, iSelect, iInput, iCard, iButton, iPagination, iDatePicker, iMessage, iNavMvp, iMultiLineInput } from 'rise'
import { pageMixins } from "@/utils/pageMixins"
import headerNav from '@/components/headerNav'
// import tableList from '../../designate/designatedetail/components/tableList'
import tableList from "@/components/iTableSort";
import { tableTitle, searchList, TAB,navManagingDemandList} from '../signForPartsDemand/data'
import assignInquiryDepartmentDialog from '@/views/accessoryPart/integratedManage/components/distributionLinie'
import assignInquiryBuyerDialog from '@/views/accessoryPart/integratedManage/components/distributionBuyer'
import backDialog from '../integratedManage/components/backEps'
import { getAccessoryOneInfoList, signAccessoryInfo, sendAccessoryInfo, downLoadAccessoryList, backEPS } from '@/api/accessoryPart/index'
import { uniq } from 'lodash'
import {findBySearches,getCartypeDict} from "@/api/partsrfq/home";
import { getDictByCode } from '@/api/dictionary'
import {
  dictkey,
} from "@/api/partsprocure/editordetail";
import { clickMessage } from "@/views/partsign/home/components/data"
import moment from 'moment'

import { tableSortMixins } from "@/components/iTableSort/tableSortMixins";
import buttonTableSetting from '@/components/buttonTableSetting'

// eslint-disable-next-line no-undef
const { mapState, mapActions } = Vuex.createNamespacedHelpers("sourcing")

export default {
  mixins: [pageMixins,tableSortMixins],
  components: { iPage, iSearch, iSelect, iInput, iCard, iButton, iPagination, tableList, iDatePicker, iMultiLineInput, buttonTableSetting, assignInquiryDepartmentDialog, assignInquiryBuyerDialog, backDialog, iNavMvp, headerNav },
  data() {
    return {
      tableData: [],
      tableTitle: tableTitle,
      tableLoading: false,
      searchList: searchList,
      searchParams: {
        partNumFuzzySearch: '',
        carType: '',
        carProject: '',
        state: '',
        csfUserDept: '',
        csfUserId: '',
        startDate: '',
        endDate:'',
        sendDate: []
        // showSelf: true
      },
      inquiryDialogVisible: false,
      buyerDialogVisible: false,
      backDialogVisible: false,
      selectParts: [],
      tab: "source",
      selectOptions: {
        yesOrNoOption: [{value: '1', label: this.language('YES','是')},{value: '0', label: this.language('NO','否')}],
        cartypeProjectOptions: [],
        cartTypeOptions: [],
        trueOrFalseOption: [{value: true, label: this.language('YES','是')},{value: false, label: this.language('NO','否')}],
        // linieStatusOption:[]
      },
      selectDeptId: '',
      downloadLoading: false,
      signLoading: false,
      list: TAB,
      navManagingDemandList,
    }
  },
  created() {
    this.init()
    this.updateNavList
  },
  computed: {
    ...mapState(["navList"]),
    ...mapActions(["updateNavList"])
  },
  methods: {
    async init() {
       this.getSelectOptions()
      //  this.getCarTypeOptions()
       this.getProcureGroup()
       this.getCartypeDict()
      this.getTableList()
    },
    //获取上方group信息
    getProcureGroup() {
      dictkey().then((res) => {
        if (res.data) {
          this.fromGroup = res.data;
          this.selectOptions.cartypeProjectOptions = res.data.CAR_TYPE_PRO.filter((item)=>item.code).map(item => {
            return {
              ...item,
              value: item.code,
              key: item.code,
              name: item.name
            }
          })
        }
      });
    },
    
    // 获取车型字典
    getCartypeDict() {
      getCartypeDict()
      .then(res => {
        if (res.code == 200) {
          this.selectOptions.cartTypeOptions = 
            Array.isArray(res.data) ?
            res.data.map(item => ({
              ...item,
              key: item.id,
              label: item.name,
              value: item.value
            })) :
            []
        }
      })
    },
    /**
     * @Description: 调取数据字典获取下拉
     * @Author: Luoshuang
     * @param {*} optionName 下拉选项名称
     * @param {*} optionType 下拉类型
     * @return {*}
     */    
    getDictionary(optionName, optionType) {
      getDictByCode(optionType).then(res => {
        if(res?.result) {
          this.selectOptions[optionName] = res.data[0].subDictResultVo.map(item => {
            return { value: item.code, label: item.name }
          })
          // this.selectOptions.linieStatusOption.unshift({value: '', label: this.language('all','全部')})
        }
      })
    },
    /**
     * @Description: 获取下拉数据
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    getSelectOptions() {
      // 配件状态
      this.getDictionary('accessoryTypeOption', 'ACCESSORY_SIGN_STATE')
      //LINIE分配状态
      this.getDictionary('linieStatusOption', 'LINIE_APPORTION_STATUS')
    },
    /**
     * @Description: 车型项目下拉框
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    async getCarTypeOptions() {
      const res = await findBySearches('01')
      this.selectOptions.cartypeProjectOptions = res.data
    },
    /**
     * @Description: 退回EPS
     * @Author: Luoshuang
     * @param {*} reasonType 退回类型
     * @param {*} reasonDescription  退回描述
     * @return {*}
     */    
    handleBackEPS(reasonType, reasonDescription) {
      const params = {
        accessoryIdList: this.selectParts.map(item => item.id),
        reasonType,
        reasonDescription
      }
      backEPS(params).then(res => {
        if (res.result) {
          iMessage.success(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
          this.changebackDialogVisible(false)
          this.getTableList()
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
        }
      }).finally(() => {
        this.$refs.backEPS.changeSaveLoading && this.$refs.backEPS.changeSaveLoading(false)
      })
    },
    /**
     * @Description: 导出
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    async donwloadList() {
      this.downloadLoading = true
      const params = {
        ...this.searchParams,
        current: this.page.currPage,
        size: this.page.pageSize
      }
      await downLoadAccessoryList(params)
      this.downloadLoading = false
    },
    openInquiryDialog() {
      // if (this.selectParts.length < 1) {
      //   iMessage.warn(this.language('QINGXUANZEPEIJIAN','请选择配件'))
      //   return
      // }
      let arr = []
      this.selectParts.forEach(item=>{
        if(item.state == 'ACCEPTED'){
          arr.push(item.partNum)
        }
      })
      if(arr.length){
        return iMessage.warn(this.language('LINGJIANHAO','零件号')+arr.join(',')+this.language('YIQIANSHOUQZPJGLYMJXFPCGYDCZ','已签收，请至配件管理页面进行分配采购员的操作'))
      }
        // // eslint-disable-next-line no-undef
      const selectPartsDept = _.uniq(this.selectParts.map(item => item.csfuserDept))
      // eslint-disable-next-line no-undef
      this.selectliniePartId = _.uniq(this.selectParts.map(item => item.id))      // if (selectPartsDept.length !== 1 || selectPartsDept[0]) {
      //   iMessage.warn(this.language('QINGXUANZEWEIFENPEIBUMENDEPEIJIAN','请选择未分配部门的配件'))
      //   return
      // }
      this.changeInquiryDialogVisible(true)
    },
    /**
     * @Description: 打开分配询价采购员弹窗，若未勾选配件或勾选的配件没有部门或勾选的配件的部门不一致则给出提示不允许操作
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    openBuyerDialog() {
      // if (this.selectParts.length < 1) {
      //   iMessage.warn(this.language('QINGXUANZEPEIJIAN','请选择配件'))
      //   return
      // }
      let arr = []
      this.selectParts.forEach(item=>{
        if(item.state == 'ACCEPTED'){
          arr.push(item.partNum)
        }
      })
      if(arr.length){
        return iMessage.warn(this.language('LINGJIANHAO','零件号')+arr.join(',')+this.language('YIQIANSHOUQZPJGLYMJXFPCGYDCZ','已签收，请至配件管理页面进行分配采购员的操作'))
      }
  // eslint-disable-next-line no-undef
      const selectPartsDept = _.uniq(this.selectParts.map(item => item.csfuserDept))
      // eslint-disable-next-line no-undef
      const selectPartsUser = _.uniq(this.selectParts.map(item => item.csfuserId))
       // eslint-disable-next-line no-undef
       this.selectBuyerPartId = _.uniq(this.selectParts.map(item => item.id))

      // if (selectPartsDept.length !== 1) {
      //   iMessage.warn(this.language('QINGXUANZEXIANGTONGBUMENDEPEIJIAN','请选择相同部门的配件'))
      //   return
      // }
      // if (!selectPartsDept[0]) {
      //   iMessage.warn(this.language('QINGXUANZEYOUBUMENDEPEIJIAN','请选择有部门的配件'))
      //   return
      // }
      // if (selectPartsUser.length !== 1 || selectPartsUser[0]) {
      //   iMessage.warn(this.language('QINGXUANZEWEIFENPEICAIGOUYUANDEPEIJIAN','请选择未分配采购员的配件'))
      //   return
      // }
      this.selectDeptId = selectPartsDept[0]
      this.changeBuyerDialogVisible(true)
    },
    /**
     * @Description: 分配询价科室或询价采购员
     * @Author: Luoshuang
     * @param {*} respDept  询价科室
     * @param {*} respLINIE  询价采购员
     * @return {*}
     */    
    sendAccessory({respDept, respLINIE, respDeptName, respLINIEName}) {
      const params = {
        accessoryIdList: this.selectParts.map(item => item.id),
        csfDept: respDept,
        csfDeptName: respDeptName,
        csfuserId: respLINIE,
        csfuserName: respLINIEName
      }
      sendAccessoryInfo(params).then(res => {
        if (res.result) {
          iMessage.success(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
          this.changeInquiryDialogVisible(false)
          this.changeBuyerDialogVisible(false)
          this.getTableList()
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
        }
      }).finally(() => {
        if(respDept) {
          this.$refs.sendliniedept.changeLoading && this.$refs.sendliniedept.changeLoading(false)
        } else {
          this.$refs.sendlinie.changeLoading && this.$refs.sendlinie.changeLoading(false)
        }
      })
    },
    /**
     * @Description: 分配询价科室
     * @Author: Luoshuang
     * @param {*} respLINIE 询价科室ID
     * @return {*}
     */    
    sendAccessoryLINIE(respLINIE, respLINIEName) {
      this.sendAccessory({respLINIE, respLINIEName})
    },
    /**
     * @Description: 分配询价采购员
     * @Author: Luoshuang
     * @param {*} respDept 询价采购员ID
     * @return {*}
     */    
    sendAccessoryDept(respDept, respDeptName) {
      this.sendAccessory({respDept, respDeptName})
    },
    /**
     * @Description: 配件签收
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    signAccessory() {
      if (this.selectParts.length < 1) {
        iMessage.warn(this.language('QINGXUANZEXUYAOQIANSHOUDEPEIJIAN','请选择需要签收的配件'))
        return
      }
      this.signLoading = true
      const params = {
        accessoryIdList: this.selectParts.map(item => item.id)
      }
      signAccessoryInfo(params).then(res => {
        if (res.result) {
          iMessage.success(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
          this.getTableList()
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
        }
      }).finally(() => {
        this.signLoading = false
      })
    },
    /**
     * @Description: 搜索条件重置
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    reset() {
      this.searchParams = {
        partNumFuzzySearch: '',
        carType: '',
        carProject: '',
        state: '',
        csfUserDept: '',
        csfUserId: '',
        startDate: '',
        endDate:'',
        sendDate: []
        // showSelf: true
      }

      this.sure()
    },
    /**
     * @Description: 点击SP号跳转事件
     * @Author: Luoshuang
     * @param {*} row
     * @return {*}
     */    
    openPage(row) {
      const router =  this.$router.resolve({path: '/sourceinquirypoint/sourcing/accessorypartdetail', query: { spNum: row.spnrNum }})
      window.open(router.href,'_blank')
    },
    /**
     * @Description: 配件列表选中事件
     * @Author: Luoshuang
     * @param {*} val 选中的配件数组
     * @return {*}
     */    
    handleSelectionChange(val) {
      this.selectParts = val
    },
    /**
     * @Description: 分配询价科室弹窗状态修改
     * @Author: Luoshuang
     * @param {*} visible
     * @return {*}
     */    
    changeInquiryDialogVisible(visible) {
      if (this.selectParts.length < 1) {
        iMessage.warn(this.language('QINGXUANZEPEIJIAN','请选择配件'))
        return
      }
      this.inquiryDialogVisible = visible
    },
    /**
     * @Description: 分配询价采购员弹窗状态修改
     * @Author: Luoshuang
     * @param {*} visible
     * @return {*}
     */    
    changeBuyerDialogVisible(visible) {
      if (this.selectParts.length < 1) {
        iMessage.warn(this.language('QINGXUANZEPEIJIAN','请选择配件'))
        return
      }
      this.buyerDialogVisible = visible
    },
    /**
     * @Description: 退回EPS弹窗状态修改
     * @Author: Luoshuang
     * @param {*} visible
     * @return {*}
     */    
    changebackDialogVisible(visible) {
      if (this.selectParts.length < 1) {
        iMessage.warn(this.language('QINGXUANZEPEIJIAN','请选择配件'))
        return
      }
      this.backDialogVisible = visible
    },
    sure() {
      this.page.currPage = 1
      // 若有定点起止时间将其拆分成两个字段
      let {sendDate=[]} = this.searchParams;
      sendDate = sendDate || []
      this.searchParams.startDate = sendDate[0] || ''
      this.searchParams.endDate = sendDate[1] || ''
      // this.searchParams.sendDate = this.searchParams.sendDate ? moment(this.searchParams.sendDate).format('YYYY-MM-DDT00:00:00'): null
      this.getTableList()
    },
    /**
     * @Description: 获取配件列表
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    getTableList() {
      this.tableLoading = true
      let searchParams = JSON.parse(JSON.stringify(this.searchParams))
      delete searchParams.sendDate
      const params = {
        ...searchParams,
        current: this.page.currPage,
        size: this.page.pageSize
      }
      getAccessoryOneInfoList(params).then(res => {
        if(res?.result) {
          this.tableData = res.data.records
          this.page.pageSize = res.data.size
          this.page.currPage = res.data.current
          this.page.totalCount = res.data.total
        } else {
          this.tableData = []
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        }
      }).finally(() => {
        this.tableLoading = false
      })
    },
    // 通过待办数跳转
    clickMessage,
  }
}
</script>

<style lang="scss" scoped>
.signForParts {
  position: relative;
  .topMenu{
    display: flex;
    justify-content: space-between;
  }  
  .tab {
    ::v-deep .el-tabs__header {
      position: absolute;
      top: 20px;
      transform: translate(0, 5px);
      z-index: 1;

      .el-tabs__nav-wrap::after {
        background: transparent;
      }

      .el-tabs__active-bar {
        height: 3px;
        background: $color-blue;
        border-radius: 2px;
      }

      .el-tabs__item {
        font-size: 18px;
        color: #000000;
        opacity: 0.42;
        height: 35px;
        line-height: 35px;
        & + & {
          padding: 0 25px;
        }
      }
      .is-active {
        opacity: 1;
        font-weight: bold;
      }
    }
  }
  ::v-deep .el-date-editor .el-range__close-icon{
      display: block;
      width: 10px;
  }
}
</style>