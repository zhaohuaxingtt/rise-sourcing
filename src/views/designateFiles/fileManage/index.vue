<!--
 * @Author: Luoshuang
 * @Date: 2021-05-26 16:20:16
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-09-08 10:56:28
 * @Description: 附件综合管理
 * @FilePath: \front-web\src\views\designateFiles\fileManage\index.vue
-->

<template>
  <iPage class="signForParts" v-permission.auto="ACCESSORY_MANAGEMENT_PAGE|附件-附件管理-页面">
    <!-- <el-tabs v-model="tab" class="tab"> -->
      <!-- <el-tab-pane lazy :label="language('LK_XUNYUANZHIHANG','寻源')" name="source"> -->
        <div class="topMenu">
          <iNavMvp class="margin-bottom30" :list="navListLeft" lang @change="change" :lev="1" routerPage></iNavMvp>
          <iNavMvp class="margin-bottom30" right routerPage lev="2" :list="navList" @message="clickMessage" />
        </div>
        <div>
          <!-- <div class="margin-bottom33">
            <iNavMvp @change="change" right routerPage lev="2" :list="navList" @message="clickMessage" />
          </div> -->
          <!----------------------------------------------------------------->
          <!---------------------------搜索区域------------------------------->
          <!----------------------------------------------------------------->
          <iSearch @sure="sure" @reset="reset">
            <el-form>
              <el-form-item v-for="(item, index) in searchList" :key="index" :label="language(item.key,item.label)" v-permission.dynamic.auto="item.permission">
                <iSelect v-if="item.type === 'select'" :filterable="item.filterable" v-model="searchParams[item.value]">
                  <el-option value="" :label="language('ALL','全部')"></el-option>
                  <el-option
                    v-for="item in getOptions(item)"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </iSelect> 
                <iSelect 
                  v-else-if="item.type === 'linie'"
                  v-model="searchParams[item.value]"
                  filterable
                  remote
                  reserve-keyword
                  placeholder="请输入关键词"
                  :remote-method="remoteMethod"
                  :loading="loading"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.id"
                    :label="item.nameZh"
                    :value="item.id">
                  </el-option>
                </iSelect> 
                <iDatePicker v-else-if="item.type === 'date'" value-format="yyyy-MM-dd" v-model="searchParams[item.value]"></iDatePicker>
                <iInput v-else v-model="searchParams[item.value]"></iInput> 
              </el-form-item>
            </el-form>
          </iSearch>
          <!----------------------------------------------------------------->
          <!---------------------------表格区域------------------------------->
          <!----------------------------------------------------------------->
          <iCard class="margin-top20" v-permission.auto="ACCESSORY_MANAGEMENT_TABLE|附件-附件管理-表格">
            <div class="margin-bottom20 clearFloat">
              <span class="font18 font-weight">{{language('FUJIANZONGHECHAXUN','附件综合查询')}}</span>
                <div class="floatright">
                  <!--------------------分配LINIE/CSS----------------------------------->
                  <iButton @click="handleSendLinie" v-permission.auto="ACCESSORY_MANAGEMENT_SENDLINIE|附件-附件管理-分配LINIE/CSS">{{language('FENPEILINIECSS','分配LINIE/CSS')}}</iButton>
                  <!--------------------退回按钮----------------------------------->
                  <iButton @click="changebackDialogVisible(true)" v-permission.auto="ACCESSORY_MANAGEMENT_BACK|附件-附件管理-退回">{{language('TUIHUI','退回')}}</iButton>
                  <!--------------------创建RFQ----------------------------------->
                  <iButton @click="handleCreateRFQ" v-permission.auto="ACCESSORY_MANAGEMENT_CREATRFQ|附件-附件管理-创建RFQ">{{language('CHUANGJIANRFQ','创建RFQ')}}</iButton>
                  <!--------------------加入已有RFQ----------------------------------->
                  <iButton @click="handleJoinRFQ" v-permission.auto="ACCESSORY_MANAGEMENT_JOINRFQ|附件-附件管理-加入已有RFQ">{{language('JIARUYIYOURFQ','加入已有RFQ')}}</iButton>
                  <!--------------------删除按钮----------------------------------->
                  <iButton @click="handleDelete" v-permission.auto="ACCESSORY_MANAGEMENT_DELETE|附件-附件管理-删除">{{language('SHANCHU','删除')}}</iButton>
                </div>
            </div>
            <tableList :activeItems='"rfqId"' selection indexKey :tableData="tableData" :tableTitle="tableTitle" :tableLoading="tableLoading" @handleSelectionChange="handleSelectionChange" @openPage="openPage" @handleFileDownload="handleFileDownload" class="aotoTableHeight"></tableList>
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
          <!--                  分配LINIE/CSS弹窗                                   --->
          <!------------------------------------------------------------------------>
          <linieDialog ref="sendLinie" :dialogVisible="linieDialogVisible" @changeVisible="changeLinieDialogVisible" @updateLinie="updateLinie" />
          <!------------------------------------------------------------------------>
          <!--                    退回弹窗                                        --->
          <!------------------------------------------------------------------------>
          <backDialog ref="back" :dialogVisible="backDialogVisible" @changeVisible="changebackDialogVisible" @handleBack="handleBack" />
          <!------------------------------------------------------------------------>
          <!--                    加入已有RFQ弹窗                                  --->
          <!------------------------------------------------------------------------>
          <joinRfqDialog ref="joinRfq" :dialogVisible="joinRfqDialogVisible" @changeVisible="changeJoinRfqDialogVisible" @joinRfq="joinRfq" :partType="partProjTypes.FUJIAN" />
        </div>
      <!-- </el-tab-pane> -->
      <!-- <el-tab-pane lazy label="进度监控" name="progress"></el-tab-pane> -->
    <!-- </el-tabs> -->
  </iPage>
</template>

<script>
import { iPage, iSearch, iSelect, iInput, iCard, iButton, iPagination, iMessage, iNavMvp, iDatePicker } from 'rise'
import { pageMixins } from "@/utils/pageMixins"
import tableList from '@/views/designate/designatedetail/components/tableList'
import { tableTitle, searchList } from './data'
import linieDialog from './components/setLinie'
import backDialog from './components/back'
import { cloneDeep, uniq } from 'lodash'
import { getAffixList, updateAffixList, findBuyer, deleteAffix } from '@/api/designateFiles/index'
import { downloadFile, downloadUdFile } from '@/api/file'
import { insertRfqPart as insertRfq } from '@/api/partsrfq/home/index'
import joinRfqDialog from '@/views/designateFiles/fileManage/components/joinRfq'
import { getDictByCode } from '@/api/dictionary'
import { clickMessage } from "@/views/partsign/home/components/data"
import {partProjTypes} from '@/config'

// eslint-disable-next-line no-undef
const { mapState, mapActions } = Vuex.createNamespacedHelpers("sourcing")

export default {
  mixins: [pageMixins],
  components: { iPage, iSearch, iSelect, iInput, iCard, iButton, iPagination, tableList, linieDialog, backDialog, iNavMvp, joinRfqDialog, iDatePicker },
  data() {
    return {
      // 零件项目类型
      partProjTypes,
      tableData: [],
      tableTitle: tableTitle,
      tableLoading: false,
      searchList: searchList,
      searchParams: {
        partStatus: '',
        status: '',
        isShow: '',
        linieId: ''
      },
      linieDialogVisible: false,
      backDialogVisible: false,
      selectParts: [],
      tab: "source",
      selectOptions: {
        yesOrNoOption: [{value: '1', label: this.language('YES','是')},{value: '0', label: this.language('NO','否')}]
      },
      joinRfqDialogVisible: false,
      selectLinie: '',
      selectLinieDept: '',
      loading: false,
      options: []
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
    sure() {
      this.page.currPage = 1
      this.getTableList()
    },
    /**
     * @Description: 删除附件
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    handleDelete() {
      if (this.selectParts.length < 1) {
        iMessage.warn(this.language('QINGXUANZEXUYAOSHANCHUDEFUJIAN','请选择需要删除的附件'))
        return
      }
      const params = this.selectParts.map(item => item.id)
      deleteAffix(params).then(res => {
        if (res?.result) {
          iMessage.success(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
          this.getTableList()
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        }
      })
    },
    /**
     * @Description: 获取linie下拉框
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    getLinieOption() {
      findBuyer().then(res => {
        if (res?.result) {
          this.selectOptions.linieOptions = (res.data || []).map(item => {
            return { value: item.id, label: item.nameZh }
          })
        } else {
          // iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        }
      })
    },
    /**
     * @Description: 模糊搜索LINIE
     * @Author: Luoshuang
     * @param {*} query
     * @return {*}
     */    
    remoteMethod(query) {
      if (query !== '') {
        this.loading = true;
        findBuyer(query).then(res => {
          if (res?.result) {
            this.options = cloneDeep(res.data || [])
            this.optionsTemp = cloneDeep(res.data)
          } else {
            iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
          }
        }).finally(() => {
          this.loading = false
        })
      } else {
        this.options = [];
      }
    },
    async init() {
       this.getSelectOptions()
       this.getLinieOption()
      this.getTableList()
    },
    
    getOptions(item) {
      return this.selectOptions[item.selectOption] || []
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
          this.selectOptions[optionName] = res.data[0]?.subDictResultVo?.map(item => {
            return { value: item.code, label: item.name }
          })
          // console.log(this.selectOptions)
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
      // 状态
      this.getDictionary('statusOption', 'AFFIX_STATUS_TYPE')
      // 零件状态
      this.getDictionary('partStatusOption', 'RFQ_PART_STATUS_CODE_TYPE')
    },
    handleSendLinie() {
      if (this.selectParts.length < 1) {
        iMessage.warn(this.language('QINGXUANZEFUJIAN','请选择附件'))
        return
      }
      const selectLINIE = uniq(this.selectParts.map(item => item.csfuserId))
      if (selectLINIE.length > 1 || selectLINIE[0]) {
        iMessage.warn(this.language('QINGXUANZEWEIFENPEILINIEDEFUJIAN','请选择未分配LINIE的附件'))
        return
      }
      this.changeLinieDialogVisible(true)
    },
    /**
     * @Description: 点击加入已有rfq按钮
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    handleJoinRFQ() {
      if (this.selectParts.length < 1) {
        iMessage.warn(this.language('QINGXUANZEFUJIAN','请选择附件'))
        return
      }
      const selectLINIE = uniq(this.selectParts.map(item => item.csfuserId))
      const selectRfq = uniq(this.selectParts.map(item => item.rfqId))
      if (selectLINIE.length > 1) {
        iMessage.warn(this.language('QINGXUANZEXIANGTONGLINIEDEFUJIAN','请选择相同LINIE的附件'))
        return
      } 
      if (!selectLINIE[0]) {
        iMessage.warn(this.language('QINGXUANZEYIFENPEILINIEDEFUJIAN','请选择已分配LINIE的附件'))
        return
      }
      if (selectRfq.length > 1 || selectRfq[0]) {
        iMessage.warn(this.language('QINGXUANZEWEIFENPEIRFQDEFUJIAN','请选择未分配RFQ的附件'))
        return
      }
      this.selectLinie = selectLINIE[0]
      this.changeJoinRfqDialogVisible(true)
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
              rfqId: rfq.id,
              buyerName: item.csfUser, // 询价采购员
              linieName: item.csfUser, // linie
              linieUserId: item.csfuserId, // linie
              partNum: item.partNum, // 零件号
              fsnrGsnrNum: item.spnrNum, // fs号
              stuffId: item.stuffId, // 工艺组ID
              stuffName: item.stuffName, // 工艺组name
              purchaseProjectId: item.purchasingProjectId,
              partNameZh: item.partNameCh,
              partProjectType: partProjTypes.FUJIAN,
              userId: this.$store.state.permission.userInfo.id
            }
      })
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
     * @Description: 文件下载
     * @Author: Luoshuang
     * @param {*} fileList
     * @return {*}
     */    
    async handleFileDownload(fileList, list) {
      if (fileList.length < 1) {
        return
      }
      this.tableLoading = true
      // const params = {
      //   applicationName: 'rise',
      //   fileList: fileList
      // }
      // await downloadFile(params)
      await downloadUdFile(list.map(item => item.uploadId))
      this.tableLoading = false
    },
    /**
     * @Description: 更新配件信息
     * @Author: Luoshuang
     * @param {*} respDept 采购员部门
     * @param {*} respLINIE 采购员
     * @param {*} reason 退回原因
     * @param {*} updateType 更新类型（0：退回 1：分配Linie）
     * @return {*}
     */
    updateAffix({respDeptId, respDept, respLinieId, respLinie, reason, updateType}){
      const params = {
        affixIdList: this.selectParts.map(item => item.id),
        respDept,
        respDeptId,
        respLinieId,
        respLinie,
        reason,
        updateType
      }
      updateAffixList(params).then(res => {
        if (res.result) {
          iMessage.success(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
          this.getTableList()
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
        }
      }).finally(() => {
        if (updateType === '1') {
          this.changeLinieDialogVisible(false)
          this.$refs.sendLinie.changeLoading(false)
        } else {
          this.changebackDialogVisible(false)
          this.$refs.back.changeLoading(false)
        }
      })
    },
    /**
     * @Description: 分配LINIE
     * @Author: Luoshuang
     * @param {*} linie 采购员相关
     * @return {*}
     */    
    updateLinie(linie) {
      this.updateAffix({respDeptId:linie.deptId, respDept: linie.deptNameZh, respLinieId:linie.id, respLinie: linie.nameZh, updateType: '1'})
    },
    /**
     * @Description: 退回
     * @Author: Luoshuang
     * @param {*} reason 退回原因
     * @return {*}
     */    
    handleBack(reason) {
      this.updateAffix({reason, updateType: '0'})
    },
    /**
     * @Description: 重置搜索条件
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    reset() {
      this.searchParams = {
        partStatus: '',
        status: '',
        isShow: '',
        linie: ''
      }
      this.sure()
    },
    /**
     * @Description: 获取表格数据
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
      getAffixList(params).then(res => {
        if (res?.result) {
          this.tableData = res.data.records
          this.page.currPage = res.data.current
          this.page.pageSize = res.data.size
          this.page.totalCount = res.data.total
        } else {
          this.tableData = []
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        }
      }).finally(() => {
        this.tableLoading = false
      })
    },
    /**
     * @Description: 点击RFQ编号跳转事件
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    openPage(row) {
      const router =  this.$router.resolve({path: `/sourceinquirypoint/sourcing/partsrfq/editordetail?id=${row.rfqId}`})
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
     * @Description: 分配LINIE/CSS弹窗状态变化
     * @Author: Luoshuang
     * @param {*} visible 是否可见
     * @return {*}
     */    
    changeLinieDialogVisible(visible) {
      if (this.selectParts.length < 1) {
        iMessage.warn(this.language('QINGXUANZEFUJIAN','请选择附件'))
        return
      }
      this.linieDialogVisible = visible
    },
    /**
     * @Description: 退回弹窗状态变化
     * @Author: Luoshuang
     * @param {*} visible 是否可见
     * @return {*}
     */    
    changebackDialogVisible(visible) {
      if (this.selectParts.length < 1) {
        iMessage.warn(this.language('QINGXUANZEFUJIAN','请选择附件'))
        return
      }
      this.backDialogVisible = visible
    },
    /**
     * @Description: 点击创建RFQ按钮跳转事件
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    handleCreateRFQ() {
      if (this.selectParts.length < 1) {
        iMessage.warn(this.language('QINGXUANZEFUJIAN','请选择附件'))
        return
      }
      if (this.selectParts.some(item => item.rfqId)) {
        iMessage.warn(this.language('LK_QINGXUANZEWEIFENPEIRFQDEFUJIAN','请选择未分配RFQ的附件'))
        return
      }
      const selectLINIE = uniq(this.selectParts.map(item => item.csfuserId))
      const selectLINIEName = uniq(this.selectParts.map(item => item.csfUser))
      const selectLINIEDept = uniq(this.selectParts.map(item => item.csfuserDept))
      const selectLINIEDeptName = uniq(this.selectParts.map(item => item.csfuserDeptName))
      if (selectLINIE.length > 1) {
        iMessage.warn(this.language('QINGXUANZEXIANGTONGLINIEDEFUJIAN','请选择相同LINIE的附件'))
        return
      } if (!selectLINIE[0]) {
        iMessage.warn(this.language('QINGXUANZEYIFENPEILINIEDEFUJIAN','请选择已分配LINIE的附件'))
        return
      }
      this.selectLinieDept = selectLINIEDept[0]
      const router =  this.$router.resolve({path: '/sourceinquirypoint/sourcing/createrfq', query: { type: '2', ids: this.selectParts.map(item => item.spnrNum).join(','),linie:selectLINIE[0], linieName: selectLINIEName[0], linieDept:selectLINIEDept[0], linieDeptName: selectLINIEDeptName[0]}})
      window.open(router.href,'_blank')
    },
    // 通过待办数跳转
    clickMessage,
  }
}
</script>

<style lang="scss" scoped>
.signForParts {
  position: relative;
  .aotoTableHeight{
    ::v-deep .el-table__body-wrapper {
      min-height: 410px !important;  
      overflow: auto !important ;
    }
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
  .topMenu{
    display: flex;
    justify-content: space-between;
  }
}
</style>