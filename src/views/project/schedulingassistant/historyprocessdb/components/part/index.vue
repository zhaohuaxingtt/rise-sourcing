<!--
 * @Author: Luoshuang
 * @Date: 2021-08-02 15:48:39
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-08-16 10:12:30
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
          <!--------------------配置显示字段按钮----------------------------------->
          <iButton @click="changeShowItem(true)" >{{language('PEIZHIXIANSHIZIDUAN','配置显示字段')}}</iButton>
          <!--------------------导出按钮----------------------------------->
          <iButton @click="handleExport" :loading="downloadLoading">{{language('DAOCHU','导出')}}</iButton>
        </div>
      </div>
      <tableList indexKey :showPot="true" :tableTitle="partTableTitle" :tableData="partTableData" :tableLoading="partTableLoading" @handleSelectionChange="handleSelectionChangeFit">
      </tableList> 
    </template>
    <template>
      <div :class="`margin-bottom20 clearFloat ${isShowProgress ? 'margin-top20' : ''}`">
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
import logicSettingDialog from '@/views/project/schedulingassistant/progroup/components/logicsetting'
import { selectDictByKeyss } from '@/api/dictionary'
import showItemDialog from '../showItem'
import { cloneDeep } from 'lodash'
import { getCondition, getFitting, downloadHistoryProgressFile } from '@/api/project'
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
      ]
    }
  },
  computed: {
    logicSelectOptions() {
      return {
        ...this.selectOptions,
        carProjectOptions: this.carProjectOptions.map(item => {
          return {
            ...item,
            code: item.value,
            name: item.label
          }
        })
      }
    },
    partTableTitle() {
      if (this.selectColumn.length < 1) {
        return partTableTitle.filter(item => !this.productColumns.includes(item.key) && this.defaultColumn.includes(item.key))
      }
      return partTableTitle.filter(item => !this.productColumns.includes(item.key) && (this.selectColumn.includes(item.key)))
    },
    checkList() {
      return cloneDeep(partTableTitle).reduce((accu, item) => {
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
    const keys = 'CATEGORY_CONFIG_OPTIONS,CALCULATE_CONFIG_OPTIONS,VALUE_CONFIG_OPTIONS,YEAR_CONFIG_OPTIONS,CAR_TYPE_CONFIG_OPTIONS'
    this.selectDictByKeys(keys)
    this.init()
  },
  methods: {
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
      this.init()
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
    init() {
      if (this.$route.query.cartypeProId) {
        this.logicData = {
          ...this.logicData,
          ...this.$route.query
        }
        this.getFitting()
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
    selectDictByKeys(keys) {
      selectDictByKeyss(keys).then(res => {
        if (res?.result) {
          this.selectOptions = {...this.selectOptions,...res.data}
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        }
      })
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
.withBorder {
  border: 2px solid #1763F7;
}
</style>
