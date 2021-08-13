<!--
 * @Author: Luoshuang
 * @Date: 2021-08-02 15:48:30
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-08-13 14:43:45
 * @Description: 产品组
 * @FilePath: \front-web\src\views\project\schedulingassistant\historyprocessdb\components\productGroup\index.vue
-->

<template>
  <iCard class="margin-top20">
    <!---------------------------------------------------------------------->
    <!----------                  经验常值                   ---------------->
    <!---------------------------------------------------------------------->
    <template>
      <div class="margin-bottom20 clearFloat">
        <span class="font18 font-weight">{{language('JINGYANCHANGZHI', '经验常值')}}</span>
        <div class="floatright">
          <!--------------------拟合进度按钮----------------------------------->
          <iButton @click="showProgress" class="withBorder">{{language('NIHEJINDU','拟合进度')}}</iButton>
          <!--------------------配置显示字段按钮----------------------------------->
          <iButton @click="changeShowItem(true)" >{{language('PEIZHIXIANSHIZIDUAN','配置显示字段')}}</iButton>
          <!--------------------导出按钮----------------------------------->
          <iButton @click="handleExport" :loading="downloadLoading" >{{language('DAOCHU','导出')}}</iButton>
        </div>
      </div>
      <tableList class="regularTable" indexKey :tableTitle="regularTableTitle" :tableData="regularTableData" :tableLoading="regularTableLoading" @handleSelectionChange="handleSelectionChangeRegular">
      </tableList> 
    </template>
    <!---------------------------------------------------------------------->
    <!----------                  拟合进度                   ---------------->
    <!---------------------------------------------------------------------->
    <template v-if="isShowProgress">
      <div class="margin-bottom20 clearFloat margin-top30 padding-top30 borderTop">
        <span class="font18 font-weight">{{language('NIHEJINDU', '拟合进度')}}</span>
      </div>
      <tableList class="fitTable" indexKey :tableTitle="partTableTitle" :tableData="fitTableData" :tableLoading="partTableLoading" @handleSelectionChange="handleSelectionChangeFit">
      </tableList> 
    </template>
    <!---------------------------------------------------------------------->
    <!----------                  匹配零件号历史进度             ------------->
    <!---------------------------------------------------------------------->
    <template>
      <div class="margin-bottom20 clearFloat margin-top30 padding-top30 borderTop">
        <span class="font18 font-weight">{{language('PIPEILINGJIANHAOLISHIJINDU', '匹配零件号历史进度')}}</span>
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
    <logicSettingDialog ref="logic" :dialogVisible="logicVisible" :logicList="productLogicList" :logicData="logicData" :selectOptions="logicSelectOptions" @handleUse="handleUseLogic" @changeVisible="changeLogic" />
    <showItemDialog ref="showItem" :dialogVisible="showItemVisible" @changeVisible="changeShowItem" :checkList="checkList" type="1" :disabledColumn="disabledColumn" :defaultColumn="defaultColumn" />
  </iCard>
</template>

<script>
import { iCard, iPagination, iButton, iMessage } from 'rise'
import { regularTableTitle, partTableTitle, productLogicList } from '../../data'
import tableList from '@/views/project/schedulingassistant/progroup/components/tableList'
import { pageMixins } from "@/utils/pageMixins"
import logicSettingDialog from '@/views/project/schedulingassistant/progroup/components/logicsetting'
import { selectDictByKeyss } from '@/api/dictionary'
import showItemDialog from '../showItem'
import { cloneDeep } from 'lodash'
import { getExperience, getCondition, getFitting, downloadHistoryProgressFile } from '@/api/project'
export default {
  mixins: [pageMixins],
  components: { iCard, tableList, iPagination, iButton, logicSettingDialog, showItemDialog },
  props: {
    searchParams: { type:Object, default: () => {}},
    carProjectOptions: {type: Array, default: () => []},
    productGroupOptions: {type: Array, default: () => []}
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
      productLogicList,
      logicData: {},
      logicVisible: false,
      selectOptions: {},
      showItemVisible: false,
      selectColumn: [],
      selectRowRegular: [],
      selectRowFit: [],
      selectRowPart: [],
      downloadLoading: false,
      defaultColumn: [
        'CHANPINZUBIANHAO',
        'CHANPINZUZHONGWENMINGCHENG',
        'CHANPINZUDEWENMINGCHENG',
        'LINGJIANHAO',
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
        'CHANPINZUBIANHAO',
        'CHANPINZUZHONGWENMINGCHENG',
        'CHANPINZUDEWENMINGCHENG',
        'LINGJIANHAO'
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
        }),
        productGroupOptions: this.productGroupOptions
      }
    },
    partTableTitle() {
      if (this.selectColumn.length < 1) {
        return partTableTitle.filter(item => this.defaultColumn.includes(item.key))
      }
      return partTableTitle.filter(item => this.selectColumn.includes(item.key))
    },
    checkList() {
      return cloneDeep(partTableTitle).map(item => {
        return {
          ...item,
          isSelect: this.selectColumn.length < 1 ? this.defaultColumn.includes(item.key) : this.selectColumn.includes(item.key)
        }
      })
    },
  },
  created() {
    const keys = 'CATEGORY_CONFIG_OPTIONS,CALCULATE_CONFIG_OPTIONS,VALUE_CONFIG_OPTIONS,YEAR_CONFIG_OPTIONS,CAR_TYPE_CONFIG_OPTIONS'
    this.selectDictByKeys(keys)
    this.init()
  },
  methods: {
    /**
     * @Description: 经验常值列表选择
     * @Author: Luoshuang
     * @param {*} val
     * @return {*}
     */    
    handleSelectionChangeRegular(val) {
      this.selectRowRegular = val
    },
    /**
     * @Description: 拟合进度列表选择
     * @Author: Luoshuang
     * @param {*} val
     * @return {*}
     */    
    handleSelectionChangeFit(val) {
      this.selectRowFit = val
    },
    /**
     * @Description: 匹配零件列表选择
     * @Author: Luoshuang
     * @param {*} val
     * @return {*}
     */    
    handleSelectionChangePart(val) {
      this.selectRowPart = val
    },
    /**
     * @Description: 根据车型项目id获取车型项目名称
     * @Author: Luoshuang
     * @param {*} id
     * @return {*}
     */    
    getCartypeName(id) {
      const cartype = this.carProjectOptions.find(item => item.value === id)
      if (cartype) {
        return cartype.label
      }
      return ''
    },
    /**
     * @Description: 导出
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    async handleExport() {
      if (this.selectRowRegular.length < 1 && this.selectRowFit.length < 1 && this.selectRowPart.length < 1) {
        iMessage.warn(this.language('QINGXUANZEXUYAODAOCHUDESHUJU', '请选择需要导出的数据'))
        return
      }
      this.downloadLoading = true
      try {
        const params = {
          cartypeProId: '3',
          experienceVOList: this.selectRowRegular,
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
    /**
     * @Description: 获取拟合/匹配零件列表数据
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    getTableList() {
      if (this.isShowProgress) {
        this.getFitting()
      } else {
        this.getCondition()
      }
    },
    /**
     * @Description: 普通查询
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    handleNomalSearch() {
      this.page.currPage = 1
      // if (this.searchParams.productGroup) {
        this.getExperience()
      // }
      this.getCondition()
    },
    /**
     * @Description: 拟合进度弹窗状态修改
     * @Author: Luoshuang
     * @param {*} visible
     * @return {*}
     */    
    changeLogic(visible) {
      this.logicVisible = visible
    },
    /**
     * @Description: 使用拟合进度
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    handleUseLogic() {
      this.changeLogic(false)
      this.$refs.logic.changeSaveLoading(false)
      this.page.currPage = 1
      this.getFitting()
      this.getExperience(this.logicData.productGroup)
    },
    /**
     * @Description: 初始化页面
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    init() {
      if (this.$route.query.cartypeProId) {
        this.logicData = {
          ...this.logicData,
          ...this.$route.query
        }
        this.getExperience(this.$route.query.productGroup)
        this.getFitting()
      } else {
        this.getExperience()
        this.getCondition()
      }
    },
    /**
     * @Description: 获取经验常值列表
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    getExperience(productGroup = this.searchParams.productGroup) {
      this.regularTableLoading = true
      // const productGroup = this.searchParams.productGroup
      getExperience(productGroup).then(res => {
        if (res?.result) {
          this.regularTableData = res.data || []
        } else {
          this.regularTableData = []
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        }
      }).finally(() => {
        this.regularTableLoading = false
      })
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
    /**
     * @Description: 配置显示字段弹窗修改
     * @Author: Luoshuang
     * @param {*} visible
     * @return {*}
     */    
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
    /**
     * @Description: 获取字典下拉
     * @Author: Luoshuang
     * @param {*} keys
     * @return {*}
     */    
    selectDictByKeys(keys) {
      selectDictByKeyss(keys).then(res => {
        if (res?.result) {
          this.selectOptions = {...this.selectOptions,...res.data}
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        }
      })
    },
    /**
     * @Description: 拟合进度弹窗状态修改
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    showProgress() {
      this.logicData = {
        cartypeProId: this.logicData.cartypeProId || this.$route.query.cartypeProId || '',
        productGroup: this.logicData.productGroup || this.$route.query.productGroup || '',
        // sixPartCode: this.logicData.sixPartCode || this.$route.query.sixPartCode || '',
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
.fitTable {
  ::v-deep .el-table__body-wrapper{
    min-height: unset;
  }
}
.regularTable {
  ::v-deep .el-table__body-wrapper{
    min-height: 200px;
    // max-height: 200px;
  }
  &::before {
    height: 0;
  }
}
.borderTop {
  border-top: 1px dashed rgba(65, 67, 74, .2);
}
</style>
