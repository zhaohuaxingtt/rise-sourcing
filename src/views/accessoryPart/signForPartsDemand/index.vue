<!--
 * @Author: Luoshuang
 * @Date: 2021-05-25 13:57:11
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-07-21 15:00:55
 * @Description: 
 * @FilePath: \front-web\src\views\accessoryPart\signForPartsDemand\index.vue
-->

<template>
  <iPage class="signForParts" >
    <!-- <el-tabs v-model="tab" class="tab"> -->
      <!-- <el-tab-pane lazy :label="language('XUNYUANZHIHANG','寻源执行')" name="source"> -->
        <div>
          <div class="topMenu">
            <iNavMvp class="margin-bottom30" :list="list" lang @change="change" :lev="1" routerPage></iNavMvp>
            <iNavMvp class="margin-bottom30" @change="change" right routerPage lev="2" :list="navList" @message="clickMessage" />
          </div>
          <!----------------------------------------------------------------->
          <!---------------------------搜索区域------------------------------->
          <!----------------------------------------------------------------->
          <iSearch @sure="sure" @reset="reset">
            <el-form>
              <el-form-item v-for="(item, index) in searchList" :key="index" :label="language(item.key,item.label)">
                <iSelect v-if="item.type === 'select'" v-model="searchParams[item.value]">
                  <el-option value="" :label="language('ALL','全部')"></el-option>
                  <el-option
                    v-for="item in selectOptions[item.selectOption] || []"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </iSelect> 
                <iDatePicker v-else-if="item.type === 'date'" value-format="" type="date" v-model="searchParams[item.value]"></iDatePicker>
                <iInput v-else v-model="searchParams[item.value]"></iInput> 
              </el-form-item>
            </el-form>
          </iSearch>
          <!----------------------------------------------------------------->
          <!---------------------------表格区域------------------------------->
          <!----------------------------------------------------------------->
          <iCard class="margin-top20">
            <div class="margin-bottom20 clearFloat">
              <span class="font18 font-weight">{{language('PEIJIANXUQIUQIANSHOU','配件需求签收')}}</span>
                <div class="floatright">
                  <!--------------------签收按钮----------------------------------->
                  <iButton @click="signAccessory" :loading="signLoading">{{language('QIANSHOU','签收')}}</iButton>
                  <!--------------------退回EPS按钮----------------------------------->
                  <iButton @click="changebackDialogVisible(true)" >{{language('TUIHUIEPS','退回EPS')}}</iButton>
                  <!--------------------分配询价科室按钮----------------------------------->
                  <iButton @click="openInquiryDialog" >{{language('FENPEIXUNJIAKESHI','分配询价科室')}}</iButton>
                  <!--------------------分配询价采购员按钮----------------------------------->
                  <iButton @click="openBuyerDialog" >{{language('FENPEIXUNJIACAIGOUYUAN','分配询价采购员')}}</iButton>
                  <!--------------------导出按钮----------------------------------->
                  <iButton @click="donwloadList" :loading="downloadLoading" >{{language('DAOCHU','导出')}}</iButton>
                </div>
            </div>
            <tableList :activeItems='"spnrNum"' selection indexKey :tableData="tableData" :tableTitle="tableTitle" :tableLoading="tableLoading" @handleSelectionChange="handleSelectionChange" @openPage="openPage"></tableList>
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
          <assignInquiryDepartmentDialog ref="sendliniedept" :dialogVisible="inquiryDialogVisible" @changeVisible="changeInquiryDialogVisible" @sendAccessory="sendAccessoryDept" />
          <!------------------------------------------------------------------------>
          <!--                  分配询价采购员弹窗                                 --->
          <!------------------------------------------------------------------------>
          <assignInquiryBuyerDialog ref="sendlinie" :dialogVisible="buyerDialogVisible" @changeVisible="changeBuyerDialogVisible" @sendAccessory="sendAccessoryLINIE" :deptId="selectDeptId" />
          <!------------------------------------------------------------------------>
          <!--                  退回EPS弹窗                                       --->
          <!------------------------------------------------------------------------>
          <backDialog ref="backEPS" :dialogVisible="backDialogVisible" @changeVisible="changebackDialogVisible" @handleBack="handleBackEPS" />
        </div>
      <!-- </el-tab-pane> -->
      <!-- <el-tab-pane lazy label="进度监控" name="progress"></el-tab-pane> -->
    <!-- </el-tabs> -->
  </iPage>
</template>

<script>
import { iPage, iSearch, iSelect, iInput, iCard, iButton, iPagination, iDatePicker, iMessage, iNavMvp } from 'rise'
import { pageMixins } from "@/utils/pageMixins"
import tableList from '../../designate/designatedetail/components/tableList'
import { tableTitle, searchList, TAB} from '../signForPartsDemand/data'
import assignInquiryDepartmentDialog from './components/assignInquiryDepartment'
import assignInquiryBuyerDialog from './components/assignInquiryBuyer'
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

// eslint-disable-next-line no-undef
const { mapState, mapActions } = Vuex.createNamespacedHelpers("sourcing")

export default {
  mixins: [pageMixins],
  components: { iPage, iSearch, iSelect, iInput, iCard, iButton, iPagination, tableList, iDatePicker, assignInquiryDepartmentDialog, assignInquiryBuyerDialog, backDialog, iNavMvp },
  data() {
    return {
      tableData: [],
      tableTitle: tableTitle,
      tableLoading: false,
      searchList: searchList,
      searchParams: {
        carType: '',
        carProject: '',
        state: '',
        csfUserDept: '',
        csfUserId: ''
      },
      inquiryDialogVisible: false,
      buyerDialogVisible: false,
      backDialogVisible: false,
      selectParts: [],
      tab: "source",
      selectOptions: {
        yesOrNoOption: [{value: '1', label: this.language('YES','是')},{value: '0', label: this.language('NO','否')}],
        cartypeProjectOptions: [],
        cartTypeOptions: []
      },
      selectDeptId: '',
      downloadLoading: false,
      signLoading: false,
      list: TAB,
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
          this.selectOptions.cartypeProjectOptions = res.data.CAR_TYPE_PRO.map(item => {
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
              key: item.code,
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
      this.getDictionary('accessoryTypeOption', 'ACCESSORY_STATE')
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
        ...this.searchParams
      }
      await downLoadAccessoryList(params)
      this.downloadLoading = false
    },
    openInquiryDialog() {
      if (this.selectParts.length < 1) {
        iMessage.warn(this.language('QINGXUANZEPEIJIAN','请选择配件'))
        return
      }
      const selectPartsDept = uniq(this.selectParts.map(item => item.csfuserDept))
      if (selectPartsDept.length !== 1 || selectPartsDept[0]) {
        iMessage.warn(this.language('QINGXUANZEWEIFENPEIBUMENDEPEIJIAN','请选择未分配部门的配件'))
        return
      }
      this.changeInquiryDialogVisible(true)
    },
    /**
     * @Description: 打开分配询价采购员弹窗，若未勾选配件或勾选的配件没有部门或勾选的配件的部门不一致则给出提示不允许操作
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    openBuyerDialog() {
      if (this.selectParts.length < 1) {
        iMessage.warn(this.language('QINGXUANZEPEIJIAN','请选择配件'))
        return
      }
      const selectPartsDept = uniq(this.selectParts.map(item => item.csfuserDept))
      const selectPartsUser = uniq(this.selectParts.map(item => item.csfuserId))
      if (selectPartsDept.length !== 1) {
        iMessage.warn(this.language('QINGXUANZEXIANGTONGBUMENDEPEIJIAN','请选择相同部门的配件'))
        return
      }
      if (!selectPartsDept[0]) {
        iMessage.warn(this.language('QINGXUANZEYOUBUMENDEPEIJIAN','请选择有部门的配件'))
        return
      }
      if (selectPartsUser.length !== 1 || selectPartsUser[0]) {
        iMessage.warn(this.language('QINGXUANZEWEIFENPEICAIGOUYUANDEPEIJIAN','请选择未分配采购员的配件'))
        return
      }
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
        carType: '',
        carProject: '',
        state: '',
        csfUserDept: '',
        csfUserId: ''
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
      const router =  this.$router.resolve({path: '/sourcing/accessorypartdetail', query: { spNum: row.spnrNum }})
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
      this.searchParams.sendDate = this.searchParams.sendDate ? moment.utc(this.searchParams.sendDate) : null
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
      const params = {
        ...this.searchParams,
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
}
</style>