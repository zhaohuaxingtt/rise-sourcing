<!--
 * @Author: Luoshuang
 * @Date: 2021-05-26 11:16:51
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-11-11 17:47:52
 * @Description: 配件综合管理页面
 * @FilePath: \front-sourcing\src\views\accessoryPart\integratedManage\index.vue
-->

<template>
  <iPage class="signForParts" v-permission.auto="APREPART_MANAGFMENT_PAGE|配件-配件管理-页面">
    <!-- <el-tabs v-model="tab" class="tab"> -->
      <!-- <el-tab-pane lazy :label="language('LK_XUNYUANZHIHANG','寻源')" name="source"> -->
        <div>
          <div class="topMenu">
            <iNavMvp class="margin-bottom30" :list="navListLeft" lang @change="change" :lev="1" routerPage></iNavMvp>
            <iNavMvp class="margin-bottom30" lang @change="change" right routerPage lev="2" :list="navList" @message="clickMessage" />
          </div>
          <!----------------------------------------------------------------->
          <!---------------------------搜索区域------------------------------->
          <!----------------------------------------------------------------->
          <iSearch @sure="sure" @reset="reset">
            <el-form>
              <el-form-item v-for="(item, index) in searchList" :key="index" :label="language(item.key,item.label)" v-permission.dynamic.auto="item.permission">
                <iSelect v-update v-if="item.type === 'select'" v-model="searchParams[item.value]" :placeholder="language('QINGXUANZE', '请选择')">
                  <el-option v-if="item.value == 'showSelf'" value="" :label="language('ALL','全部')"></el-option>
                  <el-option
                    v-for="item in selectOptions[item.selectOption] || []"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>  
                </iSelect> 
                <iInput v-else v-model="searchParams[item.value]" @input="item.inputType ? handleInput($event, item, searchParams) : ''" :placeholder="language('QINGSHURU', '请输入')"></iInput> 
              </el-form-item>
            </el-form>
          </iSearch>
          <!----------------------------------------------------------------->
          <!---------------------------表格区域------------------------------->
          <!----------------------------------------------------------------->
          <iCard class="margin-top20" v-permission.auto="APREPART_MANAGFMENT_TABLE|配件-配件管理-表格">
            <div class="margin-bottom20 clearFloat">
              <span class="font18 font-weight">{{language('PEIJIANZONGHECHAXUN','配件综合查询')}}</span>
                <div class="floatright">
                  <!--------------------分配询价科室按钮----------------------------------->
                  <iButton @click="openInquiryDialog" v-permission.auto="APREPART_MANAGFMENT_SENDDEPT|配件-配件管理-分配询价科室">{{language('FENPEIXUNJIAKESHI','分配询价科室')}}</iButton>
                  <!--------------------分配询价采购员按钮----------------------------------->
                  <iButton @click="openBuyerDialog" v-permission.auto="APREPART_MANAGFMENT_SENDBUYPER|配件-配件管理-分配询价采购员">{{language('FENPEIXUNJIACAIGOUYUAN','分配询价采购员')}}</iButton>
                  <!--------------------退回按钮----------------------------------->
                  <iButton @click="changebackDialogVisible(true)" v-permission.auto="APREPART_MANAGFMENT_BACK|配件-配件管理-退回">{{language('TUIHUI','退回')}}</iButton>
                  <!--------------------退回EPS按钮----------------------------------->
                  <iButton @click="changebackEpsDialogVisible(true)" v-permission.auto="APREPART_MANAGFMENT_BACKEPS|配件-配件管理-退回EPS">{{language('TUIHUIEPS','退回EPS')}}</iButton>
                  <!--------------------创建RFQ----------------------------------->
                  <iButton @click="handleCreateRFQ" v-permission.auto="APREPART_MANAGFMENT_CREATERFQ|配件-配件管理-创建RFQ">{{language('CHUANGJIANRFQ','创建RFQ')}}</iButton>
                  <!--------------------加入已有RFQ----------------------------------->
                  <iButton @click="handleJoinRFQ" v-permission.auto="APREPART_MANAGFMENT_JOINRFQ|配件-配件管理-加入已有RFQ">{{language('JIARUYIYOURFQ','加入已有RFQ')}}</iButton>
                  <!--------------------下载报表----------------------------------->
                  <iButton @click="downloadAll" :loading="downloadAllLoading" v-permission.auto="APREPART_MANAGFMENT_DWONLOAD|配件-配件管理-下载报表">{{language('XIAZAIBAOBIAO','下载报表')}}</iButton>
                  <!--------------------导出按钮----------------------------------->
                  <iButton @click="donwloadList" :loading="downloadLoading" v-permission.auto="APREPART_MANAGFMENT_EXPORT|配件-配件管理-导出">{{language('DAOCHU','导出')}}</iButton>
                </div>
            </div>
            <tableList :activeItems='"spnrNum"' :activeItems2='"rfqNum"' selection indexKey :tableData="tableData" :tableTitle="tableTitle" :tableLoading="tableLoading" @handleSelectionChange="handleSelectionChange" @openPage="openPage" @openPage2="openPage2" class="aotoTableHeight">
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
          <assignInquiryDepartmentDialog ref="sendliniedept" :dialogVisible="inquiryDialogVisible" @changeVisible="changeInquiryDialogVisible" @sendAccessory="sendAccessoryDept" />
          <!------------------------------------------------------------------------>
          <!--                  分配询价采购员弹窗                                 --->
          <!------------------------------------------------------------------------>
          <assignInquiryBuyerDialog ref="sendlinie" :dialogVisible="buyerDialogVisible" @changeVisible="changeBuyerDialogVisible" @sendAccessory="sendAccessoryLINIE" :deptId="selectDeptId" />
          <!------------------------------------------------------------------------>
          <!--                  退回EPS弹窗                                       --->
          <!------------------------------------------------------------------------>
          <backEpsDialog ref="backEPS" :dialogVisible="backEpsDialogVisible" @changeVisible="changebackEpsDialogVisible" @handleBack="handleBackEPS" />
          <!------------------------------------------------------------------------>
          <!--                    退回弹窗                                        --->
          <!------------------------------------------------------------------------>
          <backDialog ref="back" :dialogVisible="backDialogVisible" @changeVisible="changebackDialogVisible" @handleBack="handleBack" />
          <!------------------------------------------------------------------------>
          <!--                    加入已有RFQ弹窗                                  --->
          <!------------------------------------------------------------------------>
          <joinRfqDialog ref="joinRfq" :dialogVisible="joinRfqDialogVisible" @changeVisible="changeJoinRfqDialogVisible" @joinRfq="joinRfq" :partType="partProjTypes.PEIJIAN" />
        </div>
      <!-- </el-tab-pane> -->
      <!-- <el-tab-pane lazy label="进度监控" name="progress"></el-tab-pane> -->
    <!-- </el-tabs> -->
  </iPage>
</template>

<script>
import { iPage, iSearch, iSelect, iInput, iCard, iButton, iPagination, iMessage, iNavMvp } from 'rise'
import { pageMixins } from "@/utils/pageMixins"
import tableList from '@/views/designate/designatedetail/components/tableList'
import { tableTitle, searchList, TAB } from './data'
import assignInquiryDepartmentDialog from '../signForPartsDemand/components/assignInquiryDepartment'
import assignInquiryBuyerDialog from '../signForPartsDemand/components/assignInquiryBuyer'
import backEpsDialog from './components/backEps'
import backDialog from './components/back'
import { uniq } from 'lodash'
import { getAccessoryManageList, sendAccessoryInfo, downloadManageList, downLoadAccessoryAll, back, backEPS } from '@/api/accessoryPart/index'
import { getDictByCode } from '@/api/dictionary'
import {findBySearches,getCartypeDict} from "@/api/partsrfq/home";
import joinRfqDialog from '@/views/designateFiles/fileManage/components/joinRfq'
import { insertRfqPart } from '@/api/partsrfq/home/index'
import {
  dictkey,
} from "@/api/partsprocure/editordetail";
import { clickMessage } from "@/views/partsign/home/components/data"
import {partProjTypes} from '@/config'
import { numberProcessor } from '@/utils' 

// eslint-disable-next-line no-undef
const { mapState, mapActions } = Vuex.createNamespacedHelpers("sourcing")

export default {
  mixins: [pageMixins],
  components: { iPage, iSearch, iSelect, iInput, iCard, iButton, iPagination, tableList, assignInquiryDepartmentDialog, assignInquiryBuyerDialog,backEpsDialog, backDialog, iNavMvp, joinRfqDialog },
  data() {
    return {
      // 零件项目类型
      partProjTypes,
      tableData: [],
      tableTitle: tableTitle,
      tableLoading: false,
      searchList: searchList,
      searchParams: {
        carType: '',
        carProject: '',
        state: '',
        partStatus: '',
        partState: '',
        cfTargetPrice: '',
        nomiType: '',
        idState: '',
        showSelf: true
      },
      inquiryDialogVisible: false,
      buyerDialogVisible: false,
      backDialogVisible: false,
      backEpsDialogVisible: false,
      selectParts: [],
      tab: "source",
      selectOptions: {
        yesOrNoOption: [{value: '1', label: this.language('YES','是')},{value: '0', label: this.language('NO','否')}],
        cartypeProjectOptions: [],
        carTypeOptions: [],
        trueOrFalseOption: [{value: true, label: this.language('YES','是')},{value: false, label: this.language('NO','否')}]
      },
      selectDeptId: '',
      downloadAllLoading: false,
      downloadLoading: false,
      joinRfqDialogVisible: false,
      list:TAB,
    }
  },
  created() {
    this.init()
    this.updateNavList
  },
  computed: {
    ...mapState(["navList","navListLeft"]),
    ...mapActions(["updateNavList"])
  },
  methods: {
    /**
     * @Description: 点击RFQ编号跳转事件
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    openPage2(row) {
      const router =  this.$router.resolve({path: `/sourceinquirypoint/sourcing/partsrfq/editordetail?id=${row.rfqNum}`})
      window.open(router.href,'_blank')
    },
    async init() {
       this.getSelectOptions()
      //  this.getCarTypeOptions()
       this.getCartypeDict()
       this.getProcureGroup()
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
    /**
     * @Description: 加入已有rfq
     * @Author: Luoshuang
     * @param {*} rfq
     * @return {*}
     */    
    joinRfq(rfq) {
      const params = this.selectParts.map(item => {
            return {
              buyerName: item.csfUserIdName, // 询价采购员
              linieName: item.respLinieName, // linie
              linieUserId: item.respLinie, // linie
              partNum: item.partNum, // 零件号
              fsnrGsnrNum: item.spnrNum, // fs号
              stuffId: item.stuffId, // 工艺组ID
              stuffName: item.stuffName, // 工艺组name
              purchaseProjectId: item.purchasingProjectId,
              partNameZh: item.partNameCh,
              partProjectType: partProjTypes.PEIJIAN,
              rfqId: rfq.id,
              userId: this.$store.state.permission.userInfo.id
            }
      })
      insertRfqPart(params).then(res => {
        if (res?.result) {
          iMessage.success(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
          this.changeJoinRfqDialogVisible(false)
          this.getTableList()
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        }
      }).finally(() => {
        this.$refs.joinRfq.changeActiveButtonLoading(false)
      })
    },
    /**
     * @Description: 修改加入已有rfq弹窗状态
     * @Author: Luoshuang
     * @param {*} visible
     * @return {*}
     */    
    changeJoinRfqDialogVisible(visible) {
      this.joinRfqDialogVisible = visible
    },
    /**
     * @Description: 点击加入已有rfq按钮
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    handleJoinRFQ() {
      if (this.selectParts.length < 1) {
        iMessage.warn(this.language('QINGXUANZEPEIJIAN','请选择配件'))
        return
      }
      const selectRfq = uniq(this.selectParts.map(item => item.rfqNum))
      if (selectRfq.length > 1 || selectRfq[0]) {
        iMessage.warn(this.language('LK_QINGXUANZEWEIFENPEIRFQDEPEIJIAN','请选择未分配RFQ的配件'))
        return
      }
      this.changeJoinRfqDialogVisible(true)
    },
    // 获取车型字典
    getCartypeDict() {
      getCartypeDict()
      .then(res => {
        if (res.code == 200) {
          this.selectOptions.carTypeOptions = 
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
     * @Description: 调取数据字典获取下拉
     * @Author: Luoshuang
     * @param {*} optionName 下拉选项名称
     * @param {*} optionType 下拉类型
     * @return {*}
     */    
    getDictionary(optionName, optionType) {
      getDictByCode(optionType).then(res => {
        if(res?.result) {
          const options = res.data[0].subDictResultVo.map(item => {
            return { value: item.code, label: item.name }
          })
          this.selectOptions[optionName] = optionType === 'ACCESSORY_STATE' ? options.filter(item => !['NOTACCEPTED','REFUSED'].includes(item.value)) : options
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
      // ID状态
      this.getDictionary('accessoryIdStateOption', 'ACCESSORY_ID_STATE')
      // 定点状态
      this.getDictionary('nominateStateOption', 'NOMINATE_STATE')
      // 合同状态
      this.getDictionary('contactStateOption', 'CONTRACT_STATE')
      // 零件状态
      this.getDictionary('partStateOption', 'RFQ_PART_STATUS_CODE_TYPE')
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
        partStatus: '',
        partState: '',
        cfTargetPrice: '',
        nomiType: '',
        idState: '',
        showSelf: true
      }
      this.sure()
    },
    sure() {
      this.page.currPage = 1
      this.getTableList()
    },
    /**
     * @Description: 获取列表数据
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
      getAccessoryManageList(params).then(res => {
        if(res.result) {
          this.tableData = res.data.records
          this.page.pageSize = res.data.size
          this.page.currPage = res.data.current
          this.page.totalCount = res.data.total
        } else {
          this.tableData = []
          iMessage.error(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
        }
      }).finally(() => {
        this.tableLoading = false
      })
    },
    /**
     * @Description: 退回
     * @Author: Luoshuang
     * @param {*} reason 退回原因
     * @return {*}
     */    
    handleBack(reason){
      const params = {
        accessoryIdList: this.selectParts.map(item => item.id),
        reason
      }
      back(params).then(res => {
        if (res.result) {
          iMessage.success(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
          this.changebackDialogVisible(false)
          this.getTableList()
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
        }
      }).finally(() => {
        this.$refs.back.changeSaveLoading && this.$refs.back.changeSaveLoading(false)
      })
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
          this.changebackEpsDialogVisible(false)
          this.getTableList()
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
        }
      }).finally(() => {
        this.$refs.backEPS.changeSaveLoading && this.$refs.backEPS.changeSaveLoading(false)
      })
    },
    /**
     * @Description: 打开分配询价科室弹窗，若未勾选配件或勾选的配件已有部门或勾选的配件的部门不一致则给出提示不允许操作
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */ 
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
     * @Description: 下载报表
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    async downloadAll() {
      this.downloadAllLoading = true
      await downLoadAccessoryAll()
      this.downloadAllLoading = false
    },
    /**
     * @Description: 导出事件
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    async donwloadList() {
      this.downloadLoading = true
      const params = {
        ...this.searchParams
      }
      await downloadManageList(params)
      this.downloadLoading = false
    },
    /**
     * @Description: 点击SP号跳转事件
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    openPage(row) {
      const router =  this.$router.resolve({path: '/sourceinquirypoint/sourcing/accessorypartdetail', query: { spNum: row.spnrNum }})
      window.open(router.href,'_blank')
    },
    /**
     * @Description: 表格选中事件
     * @Author: Luoshuang
     * @param {*} val 选中的行
     * @return {*}
     */    
    handleSelectionChange(val) {
      this.selectParts = val
    },
    /**
     * @Description: 分配询价科室弹窗状态变化
     * @Author: Luoshuang
     * @param {*} visible 是否可见
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
     * @Description: 分配询价采购员弹窗状态变化
     * @Author: Luoshuang
     * @param {*} visible 是否可见
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
     * @Description: 退回弹窗状态变化
     * @Author: Luoshuang
     * @param {*} visible 是否可见
     * @return {*}
     */    
    changebackDialogVisible(visible) {
      if (this.selectParts.length < 1) {
        iMessage.warn(this.language('QINGXUANZEPEIJIAN','请选择配件'))
        return
      }
      this.backDialogVisible = visible
    },
    /**
     * @Description: 退回EPS弹窗状态变化
     * @param {*} visible 是否可见
     * @return {*}
     */    
    changebackEpsDialogVisible(visible) {
      if (this.selectParts.length < 1) {
        iMessage.warn(this.language('QINGXUANZEPEIJIAN','请选择配件'))
        return
      }
      this.backEpsDialogVisible = visible
    },
    /**
     * @Description: 点击创建RFQ按钮跳转事件
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    handleCreateRFQ() {
      if (this.selectParts.length < 1) {
        iMessage.warn(this.language('QINGXUANZEPEIJIAN','请选择配件'))
        return
      }
      if (this.selectParts.some(item => item.rfqNum)) {
        iMessage.warn(this.language('LK_QINGXUANZEWEIFENPEIRFQDEPEIJIAN','请选择未分配RFQ的配件'))
        return
      }
      const selectLINIE = uniq(this.selectParts.map(item => item.respLinie)).filter(item => !!item)
      const selectLINIEName = uniq(this.selectParts.map(item => item.respLinieName)).filter(item => !!item)
      const selectLINIEDept = uniq(this.selectParts.map(item => item.respDept)).filter(item => !!item)
      const selectLINIEDeptName = uniq(this.selectParts.map(item => item.respDeptName)).filter(item => !!item)
      const selectStuffId = uniq(this.selectParts.map(item => item.stuffId))
      if (selectStuffId.length > 1) {
        iMessage.warn(this.language('QINGXUANZEXIANGTONGGONGYIZUDEPEIJIAN','请选择相同工艺组的配件'))
        return
      } if (!selectStuffId[0]) {
        iMessage.warn(this.language('GAIGONGYINGSHANGBUZAIGONGYIZUBDLNEI','该供应商不在工艺组BDL内，请与EPS确认'))
        return
      }
      this.selectLinieDept = selectLINIEDept[0]
      const query = {
        type: '1',
        ids: this.selectParts.map(item => item.spnrNum).join(','),
        linie: selectLINIE.length === 1 ? selectLINIE[0] : null,
        linieName: selectLINIE.length === 1 ? selectLINIEName[0] : null,
        linieDept: selectLINIE.length === 1 ? selectLINIEDept[0] : null,
        linieDeptName: selectLINIE.length === 1 ? selectLINIEDeptName[0] : null
      }
      const router =  this.$router.resolve({path: '/sourceinquirypoint/sourcing/createrfq', query})
      window.open(router.href,'_blank')
    },
    // 通过待办数跳转
    clickMessage,
    handleInput(value, item, obj) {
      switch(item.inputType) {
        case "int":
          this.$set(obj, item.value, numberProcessor(value, 0))
          break
        default:
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.signForParts {
  position: relative;
  .aotoTableHeight{
    ::v-deep .el-table__body-wrapper {
      min-height: 422px !important;  
      overflow: auto !important ;
    }
  }
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