<!--
 * @Author: Luoshuang
 * @Date: 2021-08-02 15:48:39
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-09-17 15:49:51
 * @Description: 
 * @FilePath: \front-web\src\views\project\schedulingassistant\historyprocessdb\components\part\index.vue
-->

<template>
  <iCard class="margin-top20">
    <template v-if="isShowProgress">
      <div class="margin-bottom20 clearFloat">
        <span class="font18 font-weight">{{language('NIHEJINDU', '拟合进度')}}</span>
        <div class="floatright">
          <!--------------------拟合进度按钮----------------------------------->
          <iButton @click="showProgress" class="withBorder">{{language('NIHEJINDU','拟合进度')}}</iButton>
          <!--------------------回传进度按钮----------------------------------->
          <iButton v-if="$route.query.cartypeProId && $route.query.sixPartCode" @click="rollBackProgress" :loading="rollBackLoading" >{{language('HUICHUANJINDU','回传进度')}}</iButton>
          <!--------------------配置显示字段按钮----------------------------------->
          <iButton @click="changeShowItem(true)" >{{language('PEIZHIXIANSHIZIDUAN','配置显示字段')}}</iButton>
          <!--------------------导出按钮----------------------------------->
          <iButton @click="handleExport" :loading="downloadLoading">{{language('DAOCHU','导出')}}</iButton>
        </div>
      </div>
      <tableList class="fitTable" indexKey :showPot="true" :tableTitle="partTableTitle" :tableData="fitTableData" :tableLoading="partTableLoading" @handleSelectionChange="handleSelectionChangeFit">
      </tableList> 
    </template>
    <template>
      <div :class="`margin-bottom20 clearFloat ${isShowProgress ? 'margin-top30 padding-top30 borderTop' : ''}`">
        <span class="font18 font-weight">{{language('PIPEILINGJIANHAOLISHIJINDU', '匹配零件号历史进度')}}</span>
        <div class="floatright" v-if="!isShowProgress">
          <!--------------------拟合进度按钮----------------------------------->
          <iButton @click="showProgress" class="withBorder">{{language('NIHEJINDU','拟合进度')}}</iButton>
          <!--------------------配置显示字段按钮----------------------------------->
          <iButton @click="changeShowItem(true)" >{{language('PEIZHIXIANSHIZIDUAN','配置显示字段')}}</iButton>
          <!--------------------导出按钮----------------------------------->
          <iButton @click="handleExport" :loading="downloadLoading">{{language('DAOCHU','导出')}}</iButton>
        </div>
      </div>
      <tableList indexKey :tableTitle="partTableTitle" :tableData="partTableData" :tableLoading="partTableLoading" @handleSelectionChange="handleSelectionChangePart">
      </tableList> 
      <iPagination v-update @size-change="handleSizeChange($event, getTableList)" @current-change="handleCurrentChange($event, getTableList)" background :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :layout="page.layout"
        :current-page="page.currPage"
        :total="page.totalCount"
      />
    </template>
    <logicSettingDialog ref="logic" :dialogVisible="logicVisible" :logicList="partLogicList" :logicData="logicData" :selectOptions="logicSelectOptions" @handleUse="handleUseLogic" @changeVisible="changeLogic" />
    <showItemDialog ref="showItem" type="2" :dialogVisible="showItemVisible" @changeVisible="changeShowItem" :checkList="checkList" :disabledColumn="disabledColumn" :defaultColumn="defaultColumn" />
  </iCard>
</template>

<script>
import { iCard, iPagination, iButton, iMessage } from 'rise'
import { regularTableTitle, partTableTitle, partLogicList } from '../../data'
import tableList from '@/views/project/schedulingassistant/progroup/components/tableList'
import { pageMixins } from "@/utils/pageMixins"
import logicSettingDialog from '@/views/project/components/logicSettingBtn/components/logicsetting'
import showItemDialog from '../showItem'
import { getCondition, getFitting, downloadHistoryProgressFile, partSchedulePartFitting, getPartGroupConfig } from '@/api/project'
export default {
  mixins: [pageMixins],
  components: { iCard, tableList, iPagination, iButton, logicSettingDialog, showItemDialog },
  props: {
    searchParams: { type:Object, default: () => {}},
    carProjectOptions: {type: Array, default: () => []}
  },
  data() {
    return {
      isShowProgress: false,
      regularTableTitle,
      regularTableData: [],
      regularTableLoading: false,
      partTableData: [],
      partTableLoading: false,
      fitTableData: [],
      fitTableLoading: false,
      partLogicList,
      logicData: {},
      logicVisible: false,
      selectOptions: {},
      showItemVisible: false,
      selectColumn: [],
      productColumns: [
        'CHANPINZUBIANHAO',
        'CHANPINZUZHONGWENMINGCHENG',
        'CHANPINZUDEWENMINGCHENG',
        'BFSOLL1',
        'BFSOLL2',
        'BFIST',
        'BFSHIFOUYANWU',
        'BFYANWUYUANYIN'
      ],
      selectRowFit: [],
      selectRowPart: [],
      downloadLoading: false,
      defaultColumn: [
        'LINGJIANHAO',
        'LINGJIANZHONGWENMINGCHENG',
        'LINGJIANDEWENMINGCHENG',
        'CAILIAOZUBIANHAO',
        'CAILIAOZUMINGCHENG',
        'CHEXINGXIANGMU',
        'SHIFANGDINGDIANZHOU',
        'DINGDIANBFZHOU',
        'BFFIRSTTRYOUTZHOU',
        'FIRSTTRYOUTOTSZHOU',
        'FIRSTTRYOUTEMZHOU',
        'SOURCINGLEIXING',
        'SHIFOUBMG',
        'SHIFOUSEL'
      ],
      disabledColumn: [
        'LINGJIANHAO',
        'LINGJIANZHONGWENMINGCHENG',
        'LINGJIANDEWENMINGCHENG',
      ],
      rollBackLoading: false
    }
  },
  computed: {
    logicSelectOptions() {
      return {
        ...this.selectOptions
      }
    },
    partTableTitle() {
      if (this.selectColumn.length < 1) {
        return partTableTitle.filter(item => !this.productColumns.includes(item.key) && this.defaultColumn.includes(item.key))
      }
      return partTableTitle.filter(item => !this.productColumns.includes(item.key) && (this.selectColumn.includes(item.key)))
    },
    checkList() {
      // eslint-disable-next-line no-undef
      return _.cloneDeep(partTableTitle).reduce((accu, item) => {
        if (this.productColumns.includes(item.key)) {
          return accu
        }
        return [...accu, {
          ...item,
          isSelect: this.selectColumn.length < 1 ? this.defaultColumn.includes(item.key) : this.selectColumn.includes(item.key)
        }]
      },[])
    },
  },
  created() {
    this.init()
  },
  methods: {
    rollBackProgress() {
      if (this.selectRowFit.length + this.selectRowPart.length === 0) {
        iMessage.warn(this.language('QINGXUANZEXUYAOHUICHUANDESHUJU', '请选择需要回传的数据'))
        return
      }
      if (this.selectRowFit.length + this.selectRowPart.length !== 1) {
        iMessage.warn(this.language('ZHINENGXUANZEYITIAOSHUJUJINXINGHUICHUAN', '只能选择一条数据进行回传'))
        return
      }
      if (this.selectRowPart.length < 1 && this.partTableData.length < 1) {
        return
      }
      this.rollBackLoading = true
      let params = {}
      if (this.selectRowPart[0]) {
        params = {
          carTypeProPartConfigDTO: this.logicData,
          partHistoryProgressVO: {
            ...this.selectRowPart[0],
            type: 2 // 历史
          }
        }
      } else {
        const selectFit = this.selectRowFit[0]
        params = {
          carTypeProPartConfigDTO: this.logicData,
          partHistoryProgressVO: {
            ...this.partTableData[0],
            fsdocCscWeekly: selectFit.fsdocCscWeekly,
            cscBfWeekly: selectFit.cscBfWeekly,
            bf1stWeekly: selectFit.bf1stWeekly,
            ots1stWeekly: selectFit.ots1stWeekly,
            em1stWeekly: selectFit.em1stWeekly,
            type: 1 // 拟合
          }
        }
      }
      partSchedulePartFitting(params).then(res => {
        if (res?.result) {
          iMessage.success(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
          this.$router.push({path: '/projectmgt/projectscheassistant/partscheduling', query: this.$route.query})
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        }
      })
      this.rollBackLoading = false
    },
    handleSelectionChangeFit(val) {
      this.selectRowFit = val
    },
    handleSelectionChangePart(val) {
      this.selectRowPart = val
    },
    getCartypeName(id) {
      const cartype = this.carProjectOptions.find(item => item.value === id)
      if (cartype) {
        return cartype.label
      }
      return ''
    },
    async handleExport() {
      if (this.selectRowFit.length < 1 && this.selectRowPart.length < 1) {
        iMessage.warn(this.language('QINGXUANZEXUYAODAOCHUDESHUJU', '请选择需要导出的数据'))
        return
      }
      this.downloadLoading = true
      try {
        const params = {
          experienceVOList: [],
          fields: this.partTableTitle.map(item => {
            return {
              gridFieldZh: item.name,
              gridField: item.props
            }
          }),
          fittingProgressList: this.selectRowFit.map(item => {
            const returnItem = {}
            this.partTableTitle.forEach(element => {
              returnItem[element.props] = item[element.props]
            })
            return returnItem
          }),
          partHistoryProgressVOList: this.selectRowPart.map(item => {
            const returnItem = {}
            this.partTableTitle.forEach(element => {
              returnItem[element.props] = item[element.props]
            })
            return returnItem
          }),
          partsHistoryProgressDTO: this.isShowProgress ? {
            ...this.searchParams,
            ...this.logicData,
            cartypeProName: this.getCartypeName(this.logicData.cartypeProId)
          } : {
            ...this.searchParams,
            cartypeProName: this.getCartypeName(this.searchParams.cartypeProId)
          }
        }
        await downloadHistoryProgressFile(params)
        this.downloadLoading = false
      } catch(error) {
        this.downloadLoading = false
      }
      
    },
    getTableList() {
      if (this.isShowProgress) {
        this.getFitting()
      } else {
        this.getCondition()
      }
    },
    handleNomalSearch() {
      this.page.currPage = 1
      this.getCondition()
    },
    changeLogic(visible) {
      this.logicVisible = visible
    },
    handleUseLogic() {
      this.changeLogic(false)
      this.$refs.logic.changeSaveLoading(false)
      this.page.currPage = 1
      this.getFitting()
    },
    async getLogicData({partNum, cartypeProId}) {
      const res =  await getPartGroupConfig(cartypeProId, partNum)
      if (res?.result) {
        return res.data
      } else {
        iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
      }
      return null
    },
    async init() {
      const { cartypeProId, sixPartCode, partNum } = this.$route.query
      if (cartypeProId && sixPartCode) {
        const logicData = await this.getLogicData({partNum, cartypeProId})
        if (logicData) {
          this.logicData = {
            ...this.$route.query,
            ...logicData
          }
          this.getFitting()
        }
      } else {
        this.getCondition()
      }
    },
    /**
     * @Description: 根据拟合进度查询匹配零件号历史进度列表
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    getFitting() {
      this.partTableLoading = true
      this.fitTableLoading = true
      this.isShowProgress = true
      const params = {
        ...this.searchParams,
        ...this.logicData,
        current: this.page.currPage,
        size: this.page.pageSize
      }
      getFitting(params).then(res => {
        if (res?.result) {
          this.partTableData = res.data?.partHistoryProgressVOList.records || []
          this.page.pageSize = res.data?.partHistoryProgressVOList.size
          this.page.currPage = res.data?.partHistoryProgressVOList.current
          this.page.totalCount = res.data?.partHistoryProgressVOList.total
          this.selectColumn = res.data?.fields || []
          this.fitTableData = res.data?.fittingProgressList || []
        } else {
          this.partTableData = []
          this.fitTableData = []
          this.page.totalCount = 0
          this.page.currPage = 1
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        }
      }).finally(() => {
        this.partTableLoading = false
        this.fitTableLoading = true
      })
    },
    /**
     * @Description: 正常获取匹配零件号历史进度列表
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    getCondition() {
      this.isShowProgress = false
      this.partTableLoading = true
      const params = {
        ...this.searchParams,
        current: this.page.currPage,
        size: this.page.pageSize
      }
      getCondition(params).then(res => {
        if (res?.result) {
          this.partTableData = res.data.partHistoryProgressVOList.records || []
          this.page.pageSize = res.data.partHistoryProgressVOList.size
          this.page.currPage = res.data.partHistoryProgressVOList.current
          this.page.totalCount = res.data.partHistoryProgressVOList.total
          this.selectColumn = res.data.fields || []
        } else {
          this.partTableData = []
          this.page.totalCount = 0
          this.page.currPage = 1
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        }
      }).finally(() => {
        this.partTableLoading = false
      })
    },
    changeShowItem(visible) {
      this.showItemVisible = visible
      if (!visible) {
        if (this.isShowProgress) {
          this.getFitting()
        } else {
          this.getCondition()
        }
      }
    },
    showProgress() {
      this.logicData = {
        cartypeProId: this.logicData.cartypeProId || this.$route.query.cartypeProId || '',
        // productGroup: this.logicData.productGroup || this.$route.query.productGroup || '',
        sixPartCode: this.logicData.sixPartCode || this.$route.query.sixPartCode || '',
        cartype: this.logicData.cartype || (this.selectOptions.CAR_TYPE_CONFIG_OPTIONS ? this.selectOptions.CAR_TYPE_CONFIG_OPTIONS[0]?.code : ''),
        year: this.logicData.year || (this.selectOptions.YEAR_CONFIG_OPTIONS ? this.selectOptions.YEAR_CONFIG_OPTIONS[0]?.code : ''),
        value: this.logicData.value || (this.selectOptions.VALUE_CONFIG_OPTIONS ? this.selectOptions.VALUE_CONFIG_OPTIONS[0]?.code :  ''),
        categoryType: this.logicData.categoryType || (this.selectOptions.CATEGORY_CONFIG_OPTIONS ? this.selectOptions.CATEGORY_CONFIG_OPTIONS[0]?.code :  ''),
      }
      this.logicVisible = true
    },
    changeProgress(isShowProgress) {
      this.isShowProgress = isShowProgress
    }
  }
}
</script>

<style lang="scss" scoped>
.fitTable {
  ::v-deep .el-table__body-wrapper{
    min-height: unset;
  }
}
.withBorder {
  border: 2px solid #1763F7;
}
.borderTop {
  border-top: 1px dashed rgba(65, 67, 74, .2);
}
</style>
