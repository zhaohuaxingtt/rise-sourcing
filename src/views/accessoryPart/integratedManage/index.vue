<!--
 * @Author: Luoshuang
 * @Date: 2021-05-26 11:16:51
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-06-15 17:09:17
 * @Description: 配件综合管理页面
 * @FilePath: \front-web\src\views\accessoryPart\integratedManage\index.vue
-->

<template>
  <iPage class="signForParts" >
    <el-tabs v-model="tab" class="tab">
      <el-tab-pane :label="$t('LK_XUNYUANZHIHANG')" name="source">
        <div>
          <div class="margin-bottom33">
            <iNavMvp @change="change" right routerPage lev="2" :list="navList" />
          </div>
          <!----------------------------------------------------------------->
          <!---------------------------搜索区域------------------------------->
          <!----------------------------------------------------------------->
          <iSearch @sure="getTableList" @reset="reset">
            <el-form>
              <el-form-item v-for="(item, index) in searchList" :key="index" :label="item.label">
                <iSelect v-update v-if="item.type === 'select'" v-model="searchParams[item.value]">
                  <el-option value="" :label="$t('all')"></el-option>
                  <el-option
                    v-for="item in selectOptions[item.selectOption] || []"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>  
                </iSelect> 
                <iInput v-else v-model="searchParams[item.value]"></iInput> 
              </el-form-item>
            </el-form>
          </iSearch>
          <!----------------------------------------------------------------->
          <!---------------------------表格区域------------------------------->
          <!----------------------------------------------------------------->
          <iCard class="margin-top20">
            <div class="margin-bottom20 clearFloat">
              <span class="font18 font-weight">配件综合查询</span>
                <div class="floatright">
                  <!--------------------分配询价科室按钮----------------------------------->
                  <iButton @click="openInquiryDialog" >分配询价科室</iButton>
                  <!--------------------分配询价采购员按钮----------------------------------->
                  <iButton @click="openBuyerDialog" >分配询价采购员</iButton>
                  <!--------------------退回按钮----------------------------------->
                  <iButton @click="changebackDialogVisible(true)" >退回</iButton>
                  <!--------------------退回EPS按钮----------------------------------->
                  <iButton @click="changebackEpsDialogVisible(true)" >退回EPS</iButton>
                  <!--------------------创建RFQ----------------------------------->
                  <iButton @click="handleCreateRFQ">创建RFQ</iButton>
                  <!--------------------加入已有RFQ----------------------------------->
                  <iButton @click="handleJoinRFQ">加入已有RFQ</iButton>
                  <!--------------------下载报表----------------------------------->
                  <iButton @click="downloadAll" :loading="downloadAllLoading">下载报表</iButton>
                  <!--------------------导出按钮----------------------------------->
                  <iButton @click="donwloadList" :loading="downloadLoading" >导出</iButton>
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
          <backEpsDialog :dialogVisible="backEpsDialogVisible" @changeVisible="changebackEpsDialogVisible" @handleBack="handleBackEPS" />
          <!------------------------------------------------------------------------>
          <!--                    退回弹窗                                        --->
          <!------------------------------------------------------------------------>
          <backDialog :dialogVisible="backDialogVisible" @changeVisible="changebackDialogVisible" @handleBack="handleBack" />
          <!------------------------------------------------------------------------>
          <!--                    加入已有RFQ弹窗                                  --->
          <!------------------------------------------------------------------------>
          <joinRfqDialog ref="joinRfq" :dialogVisible="joinRfqDialogVisible" @changeVisible="changeJoinRfqDialogVisible" @joinRfq="joinRfq" partType="12" />
        </div>
      </el-tab-pane>
      <!-- <el-tab-pane label="进度监控" name="progress"></el-tab-pane> -->
    </el-tabs>
  </iPage>
</template>

<script>
import { iPage, iSearch, iSelect, iInput, iCard, iButton, iPagination, iMessage, iNavMvp } from 'rise'
import { pageMixins } from "@/utils/pageMixins"
import tableList from '@/views/designate/designatedetail/components/tableList'
import { tableTitle, tableMockData, searchList } from './data'
import assignInquiryDepartmentDialog from '../signForPartsDemand/components/assignInquiryDepartment'
import assignInquiryBuyerDialog from '../signForPartsDemand/components/assignInquiryBuyer'
import backEpsDialog from './components/backEps'
import backDialog from './components/back'
import { navList } from "@/views/partsign/home/components/data"
import { cloneDeep, uniq } from 'lodash'
import { getAccessoryManageList, sendAccessoryInfo, downLoadAccessoryList, downLoadAccessoryAll, back, backEPS } from '@/api/accessoryPart/index'
import { getDictByCode } from '@/api/dictionary'
import {findBySearches,getCartypeDict} from "@/api/partsrfq/home";
import joinRfqDialog from '@/views/designateFiles/fileManage/components/joinRfq'
import { insertRfq } from '@/api/accessoryPart/index'
import {
  dictkey,
} from "@/api/partsprocure/editordetail";
export default {
  mixins: [pageMixins],
  components: { iPage, iSearch, iSelect, iInput, iCard, iButton, iPagination, tableList, assignInquiryDepartmentDialog, assignInquiryBuyerDialog,backEpsDialog, backDialog, iNavMvp, joinRfqDialog },
  data() {
    return {
      tableData: tableMockData,
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
        idState: ''
      },
      inquiryDialogVisible: false,
      buyerDialogVisible: false,
      backDialogVisible: false,
      backEpsDialogVisible: false,
      selectParts: [],
      navList: cloneDeep(navList),
      tab: "source",
      selectOptions: {
        yesOrNoOption: [{value: '1', label: '是'},{value: '0', label: '否'}],
        carTypeProjectOptions: [],
        carTypeOptions: []
      },
      selectDeptId: '',
      downloadAllLoading: false,
      downloadLoading: false,
      joinRfqDialogVisible: false
    }
  },
  created() {
    this.init()
  },
  methods: {
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
          this.selectOptions.carTypeProjectOptions = res.data.CAR_TYPE_PRO.map(item => {
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
      const params = {
        insertRfqPackage: {
          rfqId: rfq.rfqId,
          operationType: '1',
          rfqPartDTOList: this.selectParts.map(item => {
            return {
              buyerName: item.csfUserIdName, // 询价采购员
              linieName: item.respLinieName, // linie
              linieUserId: item.respLinie, // linie
              partNum: item.partNum, // 零件号
              fsnrGsnrNum: item.spnrNum, // fs号
              stuffId: item.stuffId, // 工艺组ID
              stuffName: item.stuffName, // 工艺组name
            }
          }),
          userId: store.state.permission.userInfo.id
        }
      }
      insertRfq(params).then(res => {
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
        iMessage.warn('请选择配件')
        return
      }
      const selectRfq = uniq(this.selectParts.map(item => item.rfqNum))
      if (selectRfq.length > 1 || selectRfq[0]) {
        iMessage.warn('请选择未分配RFQ的附件')
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
      this.selectOptions.carTypeProjectOptions = res.data
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
          this.selectOptions[optionName] = res.data[0]?.subDictResultVo.map(item => {
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
      this.getDictionary('accessoryTypeOption', 'SPARE_PART_STATE')
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
        idState: ''
      }
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
        iMessage.warn('请选择配件')
        return
      }
      const selectPartsDept = uniq(this.selectParts.map(item => item.csfuserDept))
      if (selectPartsDept.length !== 1 || selectPartsDept[0]) {
        iMessage.warn('请选择未分配部门的配件')
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
        iMessage.warn('请选择配件')
        return
      }
      const selectPartsDept = uniq(this.selectParts.map(item => item.csfuserDept))
      const selectPartsUser = uniq(this.selectParts.map(item => item.csfuserId))
      if (selectPartsDept.length !== 1) {
        iMessage.warn('请选择相同部门的配件')
        return
      }
      if (!selectPartsDept[0]) {
        iMessage.warn('请选择有部门的配件')
        return
      }
      if (selectPartsUser.length !== 1 || selectPartsUser[0]) {
        iMessage.warn('请选择未分配采购员的配件')
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
    sendAccessory({respDept, respLINIE}) {
      const params = {
        accessoryIdList: this.selectParts.map(item => item.id),
        csfDept: respDept,
        csfUserId: respLINIE
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
    sendAccessoryLINIE(respLINIE) {
      this.sendAccessory({respLINIE})
    },
    /**
     * @Description: 分配询价采购员
     * @Author: Luoshuang
     * @param {*} respDept 询价采购员ID
     * @return {*}
     */    
    sendAccessoryDept(respDept) {
      this.sendAccessory({respDept})
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
      await downLoadAccessoryList(params)
      this.downloadLoading = false
    },
    /**
     * @Description: 点击SP号跳转事件
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    openPage(row) {
      const router =  this.$router.resolve({path: '/sourcing/accessorypartdetail', query: { accessoryId: row.id }})
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
        iMessage.warn('请选择配件')
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
        iMessage.warn('请选择配件')
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
        iMessage.warn('请选择配件')
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
        iMessage.warn('请选择配件')
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
        iMessage.warn('请选择配件')
        return
      }
      const router =  this.$router.resolve({path: '/sourcing/createrfq', query: { type: '1', ids: this.selectParts.map(item => item.spnrNum).join(',') }})
      window.open(router.href,'_blank')
    }
  }
}
</script>

<style lang="scss" scoped>
.signForParts {
  position: relative;

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