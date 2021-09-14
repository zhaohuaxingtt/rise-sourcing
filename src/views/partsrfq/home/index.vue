<!--
 * @Author: moxuan
 * @Date: 2021-02-25 09:59:25
 * @LastEditTime: 2021-09-14 13:32:58
 * @LastEditors: Please set LastEditors
 * @Description: RFQ模块首页
 * @FilePath: \rise\src\views\partsrfq\home\index.vue
-->
<template>
  <iPage class="partsrfqHome">
    <!-- <el-tabs v-model="tab" class="tab">
      <el-tab-pane lazy :label="language('LK_XUNYUANZHIHANG','寻源')" name="source"> -->
        <div class="topMenu">
          <iNavMvp class="margin-bottom30" :list="navListLeft" lang @change="change" :lev="1" routerPage></iNavMvp>
          <iNavMvp class="margin-bottom30" right routerPage lev="2" :list="navList" @message="clickMessage" />
        </div>
        <div>
          <!-- <div class="margin-bottom33">
            <iNavMvp lang @change="change" right routerPage lev="2" :list="navList" @message="clickMessage" />
          </div> -->
          <!------------------------------------------------------------------------>
          <!--                  search 搜索模块                                   --->
          <!------------------------------------------------------------------------>
          <iSearch class="margin-bottom20" :icon="false" @reset="handleSearchReset" @sure="sure"
                   :resetKey="PARTSRFQ_RESET" :searchKey="PARTSRFQ_SEARCH">
            <el-form>
              <!-- <el-form-item :label="language('LK_LINGJIANHAO_FSNR_RFQBIANHAO_CAIGOUYUAN','零件号/FSNR/RFQ编号/采购员')" style="width: 340px">
                <iInput :placeholder="language('LK_QINGXUANZE','请选择')" v-model="form.searchConditions"
                        v-permission="PARTSRFQ_SEARCHBOX"></iInput>
              </el-form-item> -->
              <el-form-item :label="language('LK_LINGJIANHAO_FSNR_RFQBIANHAO_CAIGOUYUAN_SAP_SUPPLIERNAME','零件号/零件采购项目号/RFQ编号/采购员/供应商SAP号/供应商名称')" style="width: 400px">
                <iInput v-on:keyup.enter.native="getTableList" :placeholder="language('LK_QINGXUANZE','请选择')" v-model="form.searchConditions"
                        v-permission="PARTSRFQ_SEARCHBOX"></iInput>
              </el-form-item>
              <el-form-item :label="language('LK_CHEXINGXIANGMU','车型项目')">
                <iSelect :placeholder="language('LK_QINGXUANZE','请选择')" v-model="form.carType"
                         v-permission="PARTSRFQ_MODELPROJECT">
                  <el-option value="" :label="language('all','全部') | capitalizeFilter"></el-option>
                  <el-option v-for="items in carTypeOptions" :key='items.code' :value='items.code' :label="items.name"/>
                </iSelect>
              </el-form-item>
              <el-form-item :label="language('LK_LINGJIANXIANGMULEIXING','零件项目类型')">
                <iSelect :placeholder="language('LK_QINGXUANZE','请选择')" v-model="form.partType"
                         v-permission="PARTSRFQ_PARTITEMTYPE">
                  <el-option value="" :label="language('all','全部') | capitalizeFilter"></el-option>
                  <el-option v-for="items in partTypeOptions" :key='items.code' :value='items.code'
                             :label="items.name"/>
                </iSelect>
              </el-form-item>
              <el-form-item :label="language('LK_RFQZHUANGTAI','RFQ状态')">
                <iSelect :placeholder="language('LK_QINGXUANZE','请选择')" v-model="form.rfqStatus"
                         v-permission="PARTSRFQ_RFQSTATUS">
                  <el-option value="" :label="language('all','全部') | capitalizeFilter"></el-option>
                  <el-option v-for="items in rfqStatusOptions" :key='items.code' :value='items.code'
                             :label="items.name"/>
                </iSelect>
              </el-form-item>
              <el-form-item :label="language('LK_CHEXING','车型')">
                <iSelect :placeholder="language('LK_QINGXUANZE','请选择')" v-model="form.modelCode" filterable>
                  <el-option value="" :label="language('all','全部') | capitalizeFilter"></el-option>
                  <el-option v-for="item in cartTypeOptions" :key="item.key" :value="item.value" :label="item.label"/>
                </iSelect>
              </el-form-item>
            </el-form>
          </iSearch>
          <iCard>
            <!------------------------------------------------------------------------>
            <!--                  table模块，向外入参表格数据，表头                    --->
            <!------------------------------------------------------------------------>
            <div class="margin-bottom20 clearFloat">
              <span class="font18 font-weight">{{ language('LK_RFQZONGHEGUANLI','RFQ综合管理') }}</span>
              <div class="floatright">
                <!--激活RFQ：仅前期采购员有该按钮权限。已经关闭的RFQ，如果需要再次打开时，点击该键-->
                <iButton @click="editRfq('02')" :loading="activateButtonLoading" v-permission="PARTSRFQ_ACTIVATERFQ">
                  {{ language('LK_JIHUORFQS','激活RFQ') }}
                </iButton>
                <!--新建RFQ：点击该键，系统会跳到下一界面。具体新建RFQ见另一user story，当RFQ类型为FS时，仅前期采购员有该按钮权限-->
                <iButton @click="newRfq" v-permission="PARTSRFQ_NEWRFQ">{{ language('LK_XINJIANRFQS','新建RFQ') }}</iButton>
                <!--关闭RFQ：仅前期采购员有该按钮权限。以下情况可关闭：RFQ零件状态是全部定点或全部结束，当前RFQ没有零件-->
                <iButton @click="editRfq('01')" :loading="closeButtonLoading" v-permission="PARTSRFQ_CLOSERFQ">
                  {{ language('LK_GUANBIRFQS','关闭RFQ') }}
                </iButton>
                <!--转派评分任务：选中RFQ之后，可以手动转派任务给EP/MQ同事-->
                <iButton @click="assignmentOfScoringTasks" v-permission="PARTSRFQ_ASSIGNMENTTASKS">
                  {{ language('LK_ZHUANPAIPINGFENRENWUS','转派任务评分') }}
                </iButton>
                <!--转谈判：只会出现在前期采购员界面-->
                <iButton @click="editRfq('03')" :loading="transferNegotiationButtonLoading"
                         v-permission="PARTSRFQ_TRANSFERNEGOTIATION">{{ language('LK_ZHUANTANPANS','转谈判') }}
                </iButton>
                <!--转询价：只会出现在专业采购员界面-->
                <iButton @click="editRfq('04')" :loading="transferInquiryButtonLoading"
                         v-permission="PARTSRFQ_REINQUIRY">{{ language('LK_ZHUANXUNJIAS','转询价') }}
                </iButton>
                <!--创建定点申请：在列表中选择RFQ，点击该键，会跳转到定点申请创建页面，RFQ的内容会自动带入到定点申请的各页签中-->
                <iButton v-permission="PARTSRFQ_CREATEAPPLICATION" :loading="createDesignateLoading" @click="openNominateTypeDialog">
                  {{ language('LK_CHUANGJIANDINGDIANSHENQINGS','创建定点申请') }}
                </iButton>
                <iButton @click="exportTable" v-permission="PARTSRFQ_EXPORT">{{ language('LK_DAOCHUS','导出') }}</iButton>
              </div>
            </div>
            <tablelist
                :tableData="tableListData"
                :tableTitle="tableTitle"
                :tableLoading="tableLoading"
                @handleSelectionChange="handleSelectionChange"
                openPageGetRowData
                @openPage='openPage'
                open-page-props="id"
                :index="true"
                icon-props="recordId"
                :lang="true"
                class="aotoTableHeight"
            >
              <template v-slot:icon="scope">
                <div @click="toTop(scope.data)" class="icon-style">
                  <icon symbol class="icon icon-color-active" name="iconliebiaoyizhiding"
                        v-if="+scope.data.recordId > 0"></icon>
                  <icon symbol class="icon" name="iconliebiaoweizhiding" v-else></icon>
                </div>
              </template>
              <template #kmAnalysis="scope">
                <el-popover
                  v-if="scope.row.kmAnalysis"
                  placement="left"
                  width="300"
                  trigger="click"
                  @show="showAttachmentTable(scope.row)"
                  @hide="attachmentTableListData = []">
                  <tablelist :tableTitle="attachmentTableTitle" :tableData="attachmentTableListData" :tableLoading="attachmentLoading" :selection="false">
                    <template #fileName="attachmentScope">
                      <span class="link" @click="downLoad(attachmentScope.row)">{{ attachmentScope.row.fileName }}</span>
                    </template>
                  </tablelist>
                  <icon class="tick icon-style" symbol name="iconbaojiazhuangtailiebiao_yibaojia" slot="reference"/>
                </el-popover>
              </template>

              <!-- 已报价&已询价 合并显示 -->
              <template #suppliers="scope">
                <span>{{scope.row.quotations}}/{{scope.row.suppliers}}</span>
              </template>
            </tablelist>
            <!------------------------------------------------------------------------>
            <!--                  表格分页                                          --->
            <!------------------------------------------------------------------------>
            <iPagination
                v-update
                @size-change="handleSizeChange($event, getTableList)"
                @current-change="handleCurrentChange($event, getTableList)"
                background
                :page-sizes="page.pageSizes"
                :page-size="page.pageSize"
                :layout="page.layout"
                :current-page='page.currPage'
                :total="page.totalCount"
            />
            <!------------------------------------------------------------------------>
            <!--                  转派评分任务弹出框                                   --->
            <!------------------------------------------------------------------------>
            <!-- <assignment-of-scoring-tasks
                v-model="diologAssignmentOfScroingTasks"
                :rfq-id="assignmentRfqIdList"
                :selectDatalist='selectDatalist'
            /> -->
            <scoringDeptDialog ref="scoringDeptDialog" :visible.sync="scoringDeptVisible" :ids="rfqIds" :customAction="true" @handleSave="scoringDeptSave" />
          </iCard>
          <nominateTypeDialog :visible.sync="nominateTypeDialogVisible" @confirm="createDesignate" />
        </div>
      <!-- </el-tab-pane> -->
      <!-- <el-tab-pane lazy label="进度监控" name="progress"></el-tab-pane> -->
    <!-- </el-tabs> -->
  </iPage>

</template>
<script>
import {iPage, iButton, iCard, iMessage, iPagination, iInput, iSelect, icon} from "rise";
import { iNavMvp, iSearch } from "rise";
import tablelist from "pages/partsrfq/components/tablelist";
import {pageMixins} from "@/utils/pageMixins";
import {tableTitle, attachmentTableTitle} from "pages/partsrfq/home/components/data";
import {findBySearches, getRfqList, getCartypeDict, modification, ratingTranslate, setRfqTop} from "@/api/partsrfq/home";
import {excelExport} from "@/utils/filedowLoad";
import store from '@/store'
import filters from "@/utils/filters";
import {rfqCommonFunMixins} from "pages/partsrfq/components/commonFun";
import {getAllScoringDepartmentInfo} from '@/api/partsrfq/home'
import { getProcureGroup } from "@/api/partsprocure/home";
import scoringDeptDialog from "@/views/partsrfq/editordetail/components/rfqPending/components/supplierScore/components/scoringDeptDialog"
import { getKmFileHistory } from "@/api/costanalysismanage/costanalysis"
import { downloadFile, downloadUdFile } from "@/api/file"
import { selectRfq } from "@/api/designate/designatedetail/addRfq"
import nominateTypeDialog from "./components/nominateTypeDialog"
import { clickMessage} from "@/views/partsign/home/components/data"
import { Row } from 'element-ui';

// eslint-disable-next-line no-undef
const { mapState, mapActions } = Vuex.createNamespacedHelpers("sourcing")

export default {
  components: {
    iPage,
    tablelist,
    iButton,
    iCard,
    iNavMvp,
    iPagination,
    iSearch,
    iInput,
    iSelect,
    icon,
    scoringDeptDialog,
    nominateTypeDialog
  },
  mixins: [pageMixins, filters, rfqCommonFunMixins],
  data() {
    return {
      tableListData: [],
      tableTitle: tableTitle,
      tableLoading: false,
      selectTableData: [],
      diologAssignmentOfScroingTasks: false,
      form: {
        searchConditions: '',
        carType: '',
        partType: '',
        rfqStatus: '',
        car: '',
        modelCode: ''
      },
      activateButtonLoading: false,
      closeButtonLoading: false,
      transferNegotiationButtonLoading: false,
      transferInquiryButtonLoading: false,
      carTypeOptions: [],
      partTypeOptions: [],
      rfqStatusOptions: [],
      assignmentRfqIdList: [],
      fromGroup: [],
      tab: 'source',
      selectDatalist:[],
      scoringDeptVisible: false,
      rfqIds: [],
      attachmentLoading: false,
      attachmentTableTitle,
      attachmentTableListData: [], 
      cartTypeOptions: [],
      createDesignateLoading: false,
      nominateTypeDialogVisible: false
    };
  },
  created() {
    this.getCartypeDict()
    this.getTableList()
    this.getCarTypeOptions()
    this.getPartTypeOptions()
    this.getRfqStatusOptions()
    this.updateNavList
  },
  computed: {
    ...mapState(["navList","navListLeft"]),
    ...mapActions(["updateNavList"])
  },
  methods: {
    sure(){
      this.page.currPage = 1
      this.getTableList()
    },
    getYearMonth(date){
      date = (date + '').split(/[ ]+/);
      return date[0];
    },
    //获取转派评分任务列表
    getAllScoringDepartmentInfo(){
      return new Promise((r)=>{
        const rfqids = []
          this.selectTableData.forEach(element => {
            rfqids.push(element.id)
          });
          getAllScoringDepartmentInfo({rfqId:rfqids}).then(res=>{
            r(res.data)
          }).catch(err=>{
            r([])
          })
      })
    },
    //动态获取转派评分任务
    openPage(row) {
      this.$router.push({
        path: `/sourceinquirypoint/sourcing/partsrfq/editordetail?id=${row.id}&round=${row.currentRounds}&carTypeNames=${row.carTypeNames}&businessKey=${row.partProjectType}`
      })
    },
    //获取表格数据
    async getTableList() {
      this.tableLoading = true;
      const req = {
          userId: store.state.permission.userInfo.id,
          current: this.page.currPage,
          size: this.page.pageSize,
          ...this.form
      }
      try {
        // const res = await getRfqDataList(req)
        const res = await getRfqList(req)
        // this.tableListData = res.data.getRfqInfoVO.rfqVOList;
        // this.page.currPage = res.data.getRfqInfoVO.pageNum
        // this.page.pageSize = res.data.getRfqInfoVO.pageSize
        // this.page.totalCount = res.data.getRfqInfoVO.total
       
       res.data.forEach(val=> {
          // eslint-disable-next-line no-undef
          val.createDate = val.createDate?moment(val.createDate).format('YYYY-MM-DD'):''
          // eslint-disable-next-line no-undef
          val.currentRoundsEndTime = val.currentRoundsEndTime?moment(val.currentRoundsEndTime).format('YYYY-MM-DD'):''
        })
        this.tableListData = Array.isArray(res.data) ? res.data : []
        this.page.totalCount = res.total
        this.tableLoading = false;
      } catch {
        this.tableLoading = false;
      }
    },
    //修改表格改动列
    handleSelectionChange(val) {
      this.selectTableData = val;
    },
    newRfq() {
      const newRfqUrl = this.$router.resolve({
        path: '/sourceinquirypoint/sourcing/partsrfq/editordetail'
      })
      window.open(newRfqUrl.href,'_blank')
    },
    async editRfq(updateType) {
      if (this.selectTableData.length === 0) {
        return iMessage.warn(this.language('LK_NINDANGQIANHAIWEIXUANZE','抱歉！您当前还未选择！'));
      }
      const idList = this.selectTableData.map(item => {
        return item.id
      })
      const req = {
          updateType,
          tmRfqIdList: idList,
          userId: store.state.permission.userInfo.id
      }
      this.setOperationButtonLoading(updateType, true)
      const res = await modification(req)
      this.setOperationButtonLoading(updateType, false)
      this.resultMessage(res)
      this.getTableList()
    },
    //d点击打开转派评分任务列表
    async assignmentOfScoringTasks() {
      if (this.selectTableData.length > 0) {
        this.rfqIds = this.selectTableData.map(item => item.id)
      } else {
        return iMessage.warn(this.language('LK_NINDANGQIANHAIWEIXUANZENINXUYAOZHUANPAIDEPINGFENRENWU','抱歉，您当前还未选择您需要转派的评分任务！'));
      }
      this.scoringDeptVisible = true
      // if (this.selectTableData.length == 0)
      //   return iMessage.warn(this.$t('LK_NINDANGQIANHAIWEIXUANZENINXUYAOZHUANPAIDEPINGFENRENWU'));
      // this.selectDatalist = await this.getAllScoringDepartmentInfo()
      // this.diologAssignmentOfScroingTasks = true
      // this.assignmentRfqIdList = this.selectTableData.map(item => {
      //   return item.id
      // })
    },
    async scoringDeptSave(list) {
      // if (this.selectTableData.length == "") return iMessage.warn(this.$t("LK_NINDANGQIANHAIWEIXUANZE"));
      const rateDepartMap = {
        "质量部门": "MQ",
        "技术部门": "EP"
      }

      if (!list || !list.length) return

      const req = this.list.map(item => ({
            deptNum: item.rateDepartNum,
            deptType: rateDepartMap[item.rateDepart], 
            graderId: item.raterId,
            graderName: item.rater,
            rfqId: this.rfqIds,
            userId: store.state.permission.userInfo.id,
      }))
      this.$refs.scoringDeptDialog.setSaveLoading(true)
      try {
        const res = await ratingTranslate(req);
        if (res.code == 200) {
          iMessage.success(this.language('LK_ZHUANPAICHENGGONG','转派成功'))
        } else {
          iMessage.error(`${ this.$i18n.locale === 'zh' ? res.desZh : res.desEn }`)
        }
      } finally {
        this.$refs.scoringDeptDialog.setSaveLoading(false)
      }
    },
    async toTop(row) {
      const setType = row.recordId ? '0' : '1'
      const req = {
          setType,
          rfqId: row.id,
          userId: store.state.permission.userInfo.id
      }
      const res = await setRfqTop(req)
      this.resultMessage(res)
      this.getTableList()
    },
    change() {},
    handleSearchReset() {
      this.form = {}
      this.getTableList()
    },
    exportTable() {
      if (this.selectTableData.length == 0)
        return iMessage.warn(this.language('LK_QINGXUANZHEXUYAODAOCHUSHUJU','请选择需要导出的数据'));
      excelExport(this.selectTableData, this.tableTitle)
    },
    setOperationButtonLoading(updateType, boolean) {
      switch (updateType) {
        case '01':
          this.closeButtonLoading = boolean
          break;
        case '02':
          this.activateButtonLoading = boolean
          break;
        case '03':
          this.transferNegotiationButtonLoading = boolean
          break;
        case '04':
          this.transferInquiryButtonLoading = boolean
          break;
      }
    },
    async getCarTypeOptions() {
      const res = await findBySearches('01')
      this.carTypeOptions = res.data
    },
    async getPartTypeOptions() {
      const res = await findBySearches('02')
      this.partTypeOptions = res.data
    },
    async getRfqStatusOptions() {
      const res = await findBySearches('03')
      this.rfqStatusOptions = res.data
    },
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
        pageSize: 99999999
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
    // 获取车型字典
    getCartypeDict() {
      getCartypeDict()
      .then(res => {
        if (res.code == 200) {
          this.cartTypeOptions = 
            Array.isArray(res.data) ?
            res.data.map(item => ({
              ...item,
              key: item.code,
              label: item.name,
              value: item.name
            })) :
            []
        }
      })
    },
    openNominateTypeDialog() {
      if (this.selectTableData.length !== 1) return iMessage.warn(this.language("LK_QINGXUANZEYITIAORFQ","请选择一条RFQ"))
      // this.nominateTypeDialogVisible = true
      this.createDesignate()
    },
    // 创建定点申请
    createDesignate() {
      this.nominateTypeDialogVisible = false
      this.createDesignateLoading = true

      selectRfq({
        rfqIdArr: [ this.selectTableData[0].id ]
      })
      .then(res => {
        const message = this.$i18n.locale === 'zh' ? res.desZh : res.desEn

        if (res.code == 200) {
          iMessage.success(message)
          const openDesignate = this.$router.resolve({
            path: "/designate/rfqdetail", 
            query: {
              desinateId: res.data.nominateId, 
              designateType: res.data.nominateProcessType
            }
          })
          window.open(openDesignate.href,'_blank')
        } else {
          iMessage.error(message)
        }

        this.createDesignateLoading = false
      })
      .catch(() => this.createDesignateLoading = false)
    },
    // 通过待办数跳转
    clickMessage,
  }
}
</script>
<style lang='scss' scoped>
.icon-color-active {
  color: $color-blue;
}

.icon-style {
  cursor: pointer;
}

.partsrfqHome {
  position: relative;
  .aotoTableHeight{
    ::v-deep .el-table__body-wrapper {
      min-height: 422px !important;  
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

  .tick {
    font-size: 18px;
  }
  .topMenu{
    display: flex;
    justify-content: space-between;
  }
}
</style>