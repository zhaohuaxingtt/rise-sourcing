<!--
 * @Author: Luoshuang
 * @Date: 2021-05-21 09:23:11
 * @LastEditors: YoHo
 * @LastEditTime: 2022-03-23 15:44:11
 * @Description: RFQ & 零件清单界面
 * @FilePath: \front-web\src\views\designate\designatedetail\rfqdetail\index.vue
-->

<template>
  <div class="rfq-detail-page" v-permission.auto="SOURCING_NOMINATION_RFQDETAIL_PAGE|RFQ零件清单页面">
    <!-- <designateStep/> -->
    <iCard>
      <div class="margin-bottom20 clearFloat">
        <span class="font18 font-weight">{{language('RFQQINGDAN','RFQ清单')}}</span>
        <div class="floatright">
          <iInput :placeholder="language('QINGSHURULINGJIANHAORFQLINIE','请输入零件号/RFQ编号/RFQ名称/LINIE')" v-model="searchParam" class="margin-right20 margin-left20 input" @blur="searchRfqTableList" v-permission.auto="SOURCING_NOMINATION_RFQDETAIL_SEARCHPARAM|RFQ零件清单搜索" >
            <icon symble slot="suffix" name="iconshaixuankuangsousuo" />
          </iInput>
          <!--------------------新增按钮----------------------------------->
          <iButton v-if="!nominationDisabled && !rsDisabled" @click="addRfq" v-permission.auto="SOURCING_NOMINATION_RFQDETAIL_ADDRFQ|新增RFQ">{{language('XINZENG','新增')}}</iButton>
          <!--------------------删除按钮----------------------------------->
          <iButton v-if="!nominationDisabled && !rsDisabled" @click="deleteRfq" v-permission.auto="SOURCING_NOMINATION_RFQDETAIL_DELETERFQ|删除RFQ">{{language('SHANCHU','删除')}}</iButton>
        
          
          <button-table-setting class="margin-top10" @click="edittableHeader('rfqTable')" />
        </div>
      </div>
      <tableList
        permissionKey="DESIGNATE_DESIGNATEDETAIL_RFQDETAIL_RFQTABLE"
        :activeItems='"id"'
        selection
        indexKey
        :tableData="rfqTableListData"
        :tableTitle="rfqTableTitle"
        :tableLoading="rfqTableLoading"
        @handleSelectionChange="handleRfqSelectionChange"
        @openPage="openRfqPage"
        @updateSlot='rfqToTop'
        v-permission.auto="SOURCING_NOMINATION_RFQDETAIL_TABLE|表格"
        ref="rfqTable"
        index
        lang
      >
        <template #kmAnalysis="scope">
          <el-popover
            v-if="scope.row.kmAnalysis"
            placement="left"
            width="300"
            trigger="click"
            @show="showAttachmentTable(scope.row)"
            @hide="attachmentTableListData = []">
            <tableList :tableTitle="attachmentTableTitle" :tableData="attachmentTableListData" :tableLoading="attachmentLoading" :selection="false">
              <template #fileName="attachmentScope">
                <span class="link" @click="downLoad(attachmentScope.row)">{{ attachmentScope.row.fileName }}</span>
              </template>
            </tableList>
            <icon class="tick icon-style" symbol name="iconbaojiazhuangtailiebiao_yibaojia" slot="reference"/>
          </el-popover>
          <span v-else></span>
        </template>
      </tableList>
    </iCard>
    <iCard class="margin-top20" v-permission.auto="SOURCING_NOMINATION_RFQDETAIL_PARTDETAILTABLE|零件清单表格">
      <div class="margin-bottom20 clearFloat">
        <span class="font18 font-weight">{{language('LK_LINGJIANQINGDAN','零件清单')}}</span>
        <div class="floatright">
          <iButton 
            v-if="!isDisabled && createMtzDisabled"
            v-permission.auto="SOURCING_NOMINATION_SUGGESTION_CREATEMTZAPPLY|创建MTZ申请"
            :loading="createMtzLoading"
            @click="handleCreateMtz">
              {{ language("LK_CREATEMTZREQUEST",'创建MTZ申请') }}
          </iButton>
          <!--------------------保存按钮----------------------------------->
          <iButton
            v-if="!isDisabled"
            v-permission.auto="SOURCING_NOMINATION_RFQDETAIL_PARTDETAILTSAVE|零件清单保存" 
            :loading="addSelectedLoading"
            @click="saveParts">
              {{ language("JIARUSHENQING", "加入申请") }}
          </iButton>
          <iButton
            v-if="!isDisabled" 
            :loading="cancelSelectedLoading" 
            @click="handleClickByCancelSelected">
            {{ language("QUXIAOSHENQING", "取消申请") }}
          </iButton>
          <button-table-setting class="margin-top10" @click="edittableHeader('partTable')" />
        </div>
      </div>
      <tableList
        permissionKey="DESIGNATE_DESIGNATEDETAIL_RFQDETAIL_PARTTABLE"
        class="partsTable"
        :activeItems='"fsnrGsnrNum"'
        selection
        indexKey
        :tableData="partsTableListData"
        :tableTitle="partsTableTitle"
        :tableLoading="partsTableLoading"
        @handleSelectionChange="handlePartsSelectionChange"
        @openPage="openPartsSource"
        :selectedItems="partsSelectedItems"
        ref="partTable"
        :disabled="isDisabled"
        :cellClassName="partsCellClass"
        :selectable="partsSelectable"
        index
        lang
      >
        <template #selected="scope">
          <span>{{ selectedFormat(scope.row.selected) }}</span>
        </template>
        <template #sort="scope">
          <div v-if="scope.row.selected == 1">
            <icon symbol :class="{ cursor: scope.$index !== 0 }" class="icon" :name="scope.$index === 0 ? 'iconliebiaoweizhiding' : 'iconliebiaoyizhiding'" @click.native="isDisabled ? '' : partSort(scope.row, 'asc')" />
            <icon symbol :class="{ cursor: scope.$index !== lastSelectedPartsIndex }" class="icon desc" :name="scope.$index === lastSelectedPartsIndex ? 'iconliebiaoweizhiding' : 'iconliebiaoyizhiding'" @click.native="isDisabled ? '' : partSort(scope.row, 'desc')" />
          </div>
        </template>
      </tableList>
    </iCard>
  </div>
</template>

<script>
import { iCard, iMessage, iButton, iInput, icon, iMessageBox } from "rise"
// import tableList from '../components/tableList'
import tableList from "@/components/iTableSort";
import { rfqListTitle, partsListTitle } from './data'
import { pageMixins } from "@/utils/pageMixins";
import { getRfqList, getPartList, updatePart, deleteRfq, addPartNominate, cancelPartNominate, sortPartNominate } from '@/api/designate/designatedetail/rfqdetail/index'
import { updateProcureButch } from "@/api/partsprocure/home"
import { cloneDeep } from 'lodash'
import { getKmFileHistory } from "@/api/costanalysismanage/costanalysis"
import { attachmentTableTitle} from "@/views/partsrfq/home/components/data";
import { downloadFile, downloadUdFile } from "@/api/file"
import buttonTableSetting from '@/components/buttonTableSetting'
export default {
  mixins: [pageMixins],
  components:{ iCard, tableList, buttonTableSetting, iButton, iInput, icon, iMessageBox },
  data() {
    return {
      rfqTableTitle: rfqListTitle,
      rfqTableListData: [],
      rfqTableListDataTemp: [],
      rfqTableLoading: false,
      rfqSelectedItems: [],
      partsTableTitle: partsListTitle,
      partsTableListData: [],
      partsTableListDataTemp: [],
      partsTableLoading: false,
      partsSelectedItems: [],
      searchParam: '',
      attachmentTableListData: [],
      attachmentTableTitle,
      attachmentLoading: false,
      addSelectedLoading: false, // 加入申请loading
      cancelSelectedLoading: false, // 取消申请loading
      createMtzLoading: false
    }
  },
  computed: {
    // eslint-disable-next-line no-undef
    ...Vuex.mapState({
      nominationType: state => state.nomination.nominationType,
      applicationStatus: state => state.nomination.applicationStatus,
      nominationDisabled: state => state.nomination.nominationDisabled,
      rsDisabled: state => state.nomination.rsDisabled,
      mtzApplyId: state => state.nomination.mtzApplyId,
      nominationData: state => state.nomination.nominationData,
    }),
    isDisabled() {
      return this.nominationDisabled || this.rsDisabled
    },
    partsTableTitleComputed() {
      if (this.isDisabled) return this.partsTableTitle.filter(item => item.props !== "sort")
      return this.partsTableTitle
    },
    lastSelectedPartsIndex() {
      for (let i = this.partsTableListData.length, item; item = this.partsTableListData[--i]; ) {
        if (item.selected == 1) return i
      }
    },
    createMtzDisabled() {
      if (this.nominationType === "TRANFORM") {
        if (this.applicationStatus === "NEW" || this.applicationStatus === "NOTPASS") return true
        return false
      } 

      if (this.nominationType === "MEETING" || this.nominationType === "RECORD") {
        if (this.applicationStatus === "NEW") return true
        return false
      }
    }
  },
  created(){
    if(this.$route.query.desinateId){
      this.desinateId = this.$route.query.desinateId
      this.getRfqTableList()
    } 
  },
  mounted(){
    if(this.$route.query.desinateId){
      this.getPartsTableList()
    }
  },
  methods: {
    // 分析报告下载
    downLoad(row) {
      // downloadFile({
      //   applicationName: "rise",
      //   fileList: row.fileName
      // })
      downloadUdFile(row.uploadId)
    },
    showAttachmentTable(row) {
      this.getKmFileHistory(row.id)
    },
    // 获取分析报告
    getKmFileHistory(rfqId) {
      if (!rfqId) return

      this.attachmentLoading = true
      getKmFileHistory({
        hostId: rfqId,
        type: 1,
        currPage: 1,
        pageSize: 99999999,
        rfqFlag: true
      })
      .then(res => {
        if (res.code == 200) {
          this.attachmentTableListData = Array.isArray(res.data) ? res.data : []
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }

        this.attachmentLoading = false
      })
      .catch(() => this.attachmentLoading = false)
    },
    searchRfqTableList() {
      if (!this.searchParam) {
        this.rfqTableListData = this.rfqTableListDataTemp
        this.partsTableListData = this.partsTableListDataTemp
        return
      }

      this.rfqTableListData = this.rfqTableListDataTemp.filter(item => (
        item.id.toLocaleLowerCase().includes(this.searchParam.toLocaleLowerCase()) || item.rfqName.toLocaleLowerCase().includes(this.searchParam.toLocaleLowerCase()) || item.linieNameZh.toLocaleLowerCase().includes(this.searchParam.toLocaleLowerCase())
      ))
      this.partsTableListData = this.partsTableListDataTemp.filter(item => this.rfqTableListData.some(rfqItem => rfqItem.id === item.rfqId))
      this.$nextTick(()=>{
        // this.$refs.rfqTable.toggleSelection()
        // this.defaultSelectTable()
      })
    },
    /**
     * @Description: 默认选中表格部分
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */
    defaultSelectTable(){
      //  this.$refs.partTable.toggleSelection(this.partsTableListData.filter(item => item.selected == 1))
    },
    /**
     * @Description: 保存选中的零件
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    saveParts() {
      // if (this.partsSelectedItems.length < 1) {
      //   iMessage.warn(this.language('NOMILINGJIANWEIKONGTIXING','当前零件清单未勾选任何零件，请至少勾选一个零件后再进行操作！'))
      //   return
      // }
      // this.partsTableLoading = true
      // const params = {
      //   nominateAppId: this.desinateId,
      //   partPrjList: (this.partsSelectedItems.length > 0 ? this.partsSelectedItems : this.partsTableListData).map(item => {
      //     return {
      //       id: item.id,
      //       partPrjCode: item.fsnrGsnrNum,
      //       // partPrjId: item.
      //     }
      //   })
      // }
      // const params = {
      //   nominateAppId: this.desinateId,
      //   partPrjList: this.partsSelectedItems
      // }
      // updatePart(params).then(res => {
      //   if (res?.result) {
      //     iMessage.success(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
      //     this.getPartsTableList()
      //   } else {
      //     iMessage.error(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
      //   }
      // }).finally(() => {
      //   this.partsTableLoading = false
      // })
      if (!this.partsSelectedItems.length) return iMessage.warn(this.language("nominationSuggestion_QingXuanZeZhiShaoYiTiaoShuJu", "请选择至少一条数据"))
      if (this.partsSelectedItems.some(item => item.selected == 1)) return iMessage.warn(this.language("XUANZHONGDELINGJIANZHONGBUNENGHANYOUYICANYUDELINGJIAN", "选中的零件中不能含有已参与的零件"))

      this.addSelectedLoading = true
      addPartNominate({
        nominateAppId: this.desinateId,
        partPrjList: this.partsSelectedItems.map(item => ({
          fsnrGsnrNum: item.fsnrGsnrNum,
          id: item.id,
          partPrjId: item.partPrjId
        }))
      })
      .then(res => {
        if (res.code == 200) {
          iMessage.success(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
          this.getPartsTableList()
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
        }
      })
      .finally(() => this.addSelectedLoading = false)
    },
    /**
     * @Description: 删除rfq按钮点击事件
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    deleteRfq() {
      if (this.rfqSelectedItems.length < 1) {
        iMessage.warn(this.language('QINGXUANZEYAOSHANCHUDEHANG','请选择需要删除的行'))
        return
      }
      this.rfqTableLoading = true
      const params = {
        nominateAppId: this.desinateId,
        rfqIdList: this.rfqSelectedItems.map(item => item.id)
      }
      deleteRfq(params).then(res => {
        if (res?.result) {
          iMessage.success(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
          this.getRfqTableList()
          this.getPartsTableList()
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
        }
      }).finally(() => {
        this.rfqTableLoading = false
      })
    },
    /**
     * @Description: 新增rfq按钮点击事件
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    addRfq() {
      this.$router.push({path: '/sourcing/designate/rfqdetail/addRfq', query: {desinateId: this.desinateId}})
    },
    /**
     * @Description: rfq清单列表数据查询
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    getRfqTableList() {
      this.rfqTableLoading = true
      getRfqList(this.desinateId).then(res => {
        if(res?.result) {
          this.rfqTableListData = res.data
          this.rfqTableListDataTemp = cloneDeep(res.data)
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
        }
      }).finally(() => {
        this.rfqTableLoading = false
      })
    },
    /**
     * @Description: rfq清单列表选中处理事件
     * @Author: Luoshuang
     * @param {*} selectItems
     * @return {*}
     */        
    handleRfqSelectionChange(selectItems){
      this.rfqSelectedItems = selectItems
    },
    /**
     * @Description: rfq清单列表点击rfq编号跳转事件
     * @Author: Luoshuang
     * @param {*} row
     * @return {*}
     */    
    openRfqPage(row){
      const router =  this.$router.resolve({
        path: `/sourceinquirypoint/sourcing/partsrfq/editordetail`,
        query: {
          id: row.id,
          round: row.currentRounds,
          carTypeNames: row.carTypeNames,
          rfqName: row.rfqName,
          businessKey: row.partProjectType
        }
      })

      // const router =  this.$router.resolve({path: `/sourceinquirypoint/sourcing/partsrfq/editordetail?id=${row.id}`})
      window.open(router.href,'_blank')
    },
    /**
     * @Description: rfq清单列表置顶处理事件
     * @Author: Luoshuang
     * @param {*} row
     * @return {*}
     */    
    rfqToTop(row){},
    /**
     * @Description: 零件列表数据查询
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    getPartsTableList(){
      this.partsTableLoading = true
      getPartList(this.desinateId).then(res => {
        if(res?.result) {
          // res.data.forEach(val => {val.mtz == true ? val.mtz = '是' : val.mtz = '否'})
          this.partsTableListData = res.data
          this.partsTableListDataTemp = cloneDeep(res.data)
          this.$store.dispatch('setPartListNull', !this.partsTableListDataTemp.filter(item => item.selected == 1).length)
          this.$nextTick(()=>{
            this.defaultSelectTable()
          })
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
        }
      }).finally(() => {
        this.partsTableLoading = false
      })
    },
    /**
     * @Description: 零件列表选中处理
     * @Author: Luoshuang
     * @param {*} selectItems
     * @return {*}
     */    
    handlePartsSelectionChange(selectItems){
      this.partsSelectedItems = selectItems
      // 零件清单标记为空
      // this.$store.dispatch('setPartListNull', !this.partsSelectedItems.length)
    },
    /**
     * @Description: 零件列表点击零件号跳转事件
     * @Author: Luoshuang
     * @param {*} row
     * @return {*}
     */    
    openPartsPage(row){
      const router =  this.$router.resolve({path: `/sourceinquirypoint/sourcing/partsrfq/editordetail?id=${row.rfqId}`})
      window.open(router.href,'_blank')
    },
    /* 
    fs号跳转零件采购项目详情
    */
    openPartsSource(row){
      const router =  this.$router.resolve({path: '/sourceinquirypoint/sourcing/partsprocure/editordetail',
        query:{
          projectId: row.partPrjId, 
          businessKey: row.partProjectType 
        }
      })
      window.open(router.href,'_blank')
    },
    partsCellClass({ row, column }) {
      if (column.type === "selection") {
        if (row.selected == 2) return "hideCheckbox"
      }

      switch(row.selected) {
        case 0:
          return "deleteLine"
        case 2:
          return "disabledLine"
        default:
      }
    },
    // 取消参与
    handleClickByCancelSelected() {
      if (!this.partsSelectedItems.length) return iMessage.warn(this.language('nominationSuggestion_QingXuanZeZhiShaoYiTiaoShuJu','请选择至少一条数据'))
      if (this.partsSelectedItems.some(item => item.selected == 0)) return iMessage.warn(this.language("XUANZHONGDELINGJIANZHONGBUNENGHANYOUYIQUXIAOCANYUDELINGJIAN", "选中的零件中不能含有已取消参与的零件"))
    
      this.cancelSelectedLoading = true

      cancelPartNominate({
        nominateAppId: this.desinateId,
        partPrjList: this.partsSelectedItems.map(item => ({
          fsnrGsnrNum: item.fsnrGsnrNum,
          id: item.id,
          partPrjId: item.partPrjId
        }))
      })
      .then(res => {
        if (res.code == 200) {
          iMessage.success(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
          this.getPartsTableList()
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
      })
      .finally(() => this.cancelSelectedLoading = false)
    },
    // 创建MTZ申请
    async handleCreateMtz() {
      if (this.mtzApplyId) return iMessage.warn(this.language("BENDINGDIANSHENQINGYIGUANLIANMTZSHENQINGDAN", "本定点申请已关联MTZ申请单，无法创建MTZ申请"))
      if (!this.partsSelectedItems.length) return iMessage.warn(this.language('nominationSuggestion_QingXuanZeZhiShaoYiTiaoShuJu','请选择至少一条数据'))
      if (this.partsSelectedItems.some(item => item.selected == 0)) return iMessage.warn(this.language("XUANZHONGDELINGJIANZHONGBUNENGHANYOUWEICANYUDELINGJIAN", "选中的零件中不能含有未参与的零件"))


      const notMtzParts = this.partsSelectedItems.filter(item => !item.mtz)

      if (notMtzParts.length) {
        await iMessageBox(
          `${ this.language("SUOXUAN", "所选") }${ notMtzParts.reduce((acc, cur) => acc ? `${ acc }、${ cur.fsnrGsnrNum }` : cur.fsnrGsnrNum, "") }${ this.language("FEIMTZLINGJIAN", "非MTZ零件") }，${ this.language("SHIFOUGENGXINWEIMTZBINGJIXUCHUANGJIANMTZSHENQING", "是否更新为MTZ并继续创建MTZ申请") }？`, 
          this.language("TISHI", "提示"), 
          { cancelButtonText: this.language("FOU", "否"), confirmButtonText: this.language("SHI", "是") }
        )

        this.createMtzLoading = true
        try {
          const res = await updateProcureButch({
            ids: notMtzParts.map(item => item.partPrjId),
            updateInfo: {
              mtz: true
            }
          })

          if (res.code == 200) {
            iMessage.success(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
            this.getPartsTableList()
            window.open(`${ process.env.VUE_APP_PORTAL_URL }mtz/annualGeneralBudget/locationChange/MtzLocationPoint/overflow/applyInfor?appId=${ this.desinateId }&appName=${ this.nominationData.nominateName }&flowType=${ this.nominationType }&item=${ this.partsSelectedItems.reduce((acc, cur) => acc ? `${ acc },${ cur.partNum }` : cur.partNum, "") }`, "_blank")
          } else {
            iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
          }
        } finally {
          this.createMtzLoading = false
          return
        }
      }

      window.open(`${ process.env.VUE_APP_PORTAL_URL }mtz/annualGeneralBudget/locationChange/MtzLocationPoint/overflow/applyInfor?appId=${ this.desinateId }&appName=${ this.nominationData.nominateName }&flowType=${ this.nominationType }&item=${ this.partsSelectedItems.reduce((acc, cur) => acc ? `${ acc },${ cur.partNum }` : cur.partNum, "") }`, "_blank")
    },
    // 是否加入申请
    selectedFormat(status) {
      const map = {
        0: ["FOU", "否"],
        1: ["SHI", "是"],
        2: ["BUKEJIARU", "不可加入"]
      }

      return map[status] ? this.language(map[status][0], map[status][1]) : status
    },
    // 禁止勾选
    partsSelectable(row) {
      if (row.selected == 2) return false
      else return true
    },
    // 排序
    partSort(row, type) {
      const index = this.partsTableListData.indexOf(row)
      const tableSort = [ ...this.partsTableListData ]

      if (type == "asc") { // 提升
        if (!index) return

        [tableSort[index - 1], tableSort[index]] = [tableSort[index], tableSort[index - 1]]
      } else { // 下降
        if (index === this.lastSelectedPartsIndex) return

        [tableSort[index], tableSort[index + 1]] = [tableSort[index + 1], tableSort[index]]
      }

      this.partsTableLoading = true
      sortPartNominate({
        nominateAppId: this.desinateId,
        partPrjList: tableSort.map(item => ({
          fsnrGsnrNum: item.fsnrGsnrNum,
          id: item.id,
          partPrjId: item.partPrjId
        }))
      })
      .then(res => {
        if (res.code == 200) {
          iMessage.success(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
          this.getPartsTableList()
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
      })
      .finally(() => this.partsTableLoading = false)
    },
    edittableHeader(type) {
        this.$refs[type].settingVisible = true
      },
      handleResetSetting({data, done} = data) {
        done(data)
      },
      handleSaveSetting({data, done} = data) {
        done(data)
      },
  }
}
</script>

<style lang="scss" scoped>
.rfq-detail-page {
  .floatright {
    display: flex;
  }

  .input {
    ::v-deep input {
      width: 338px;
      padding-right: 50px;
      padding-left: 20px;
    }

    ::v-deep .el-input__suffix {
      right: 18px;

      .el-input__suffix-inner {
        height: 35px;
        line-height: 35px;
      }
    }
  }

  .partsTable {
    ::v-deep .deleteLine:not(.el-table-column--selection)::after {
      content: no-open-quote;
      position: absolute;
      top: 51%;
      left: 0;
      width: 100%;
      border-bottom: 1px solid $color-blue;
    }

    ::v-deep .disabledLine {
      color: #bfbfbf;

      &::after {
        content: no-open-quote;
        position: absolute;
        top: 51%;
        left: 0;
        width: 100%;
        border-bottom: 1px solid #bfbfbf;
      }
    }

    ::v-deep .icon {
      font-size: 16px;
    }

    .cursor {
      cursor: pointer;
    }

    .desc {
      transform: rotate(180deg);
      margin-left: 10px;
    }
  }
}
</style>