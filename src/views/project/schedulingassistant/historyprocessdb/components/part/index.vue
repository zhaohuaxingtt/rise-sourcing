<!--
 * @Author: Luoshuang
 * @Date: 2021-08-02 15:48:39
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-08-03 10:36:38
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
          <iButton @click="showProgress" >{{language('NIHEJINDU','拟合进度')}}</iButton>
          <!--------------------配置显示字段按钮----------------------------------->
          <iButton @click="$emit('handleSend')" >{{language('PEIZHIXIANSHIZIDUAN','配置显示字段')}}</iButton>
          <!--------------------导出按钮----------------------------------->
          <iButton @click="$emit('handleSend')" >{{language('DAOCHU','导出')}}</iButton>
        </div>
      </div>
      <tableList indexKey :tableTitle="partTableTitle" :tableData="partTableData" :tableLoading="partTableLoading" @handleSelectionChange="handleSelectionChange">
      </tableList> 
    </template>
    <template>
      <div :class="`margin-bottom20 clearFloat ${isShowProgress ? 'margin-top20' : ''}`">
        <span class="font18 font-weight">{{language('PIPEILINGJIANHAOLISHIJINDU', '匹配零件号历史进度')}}</span>
        <div class="floatright" v-if="!isShowProgress">
          <!--------------------拟合进度按钮----------------------------------->
          <iButton @click="showProgress" >{{language('NIHEJINDU','拟合进度')}}</iButton>
          <!--------------------配置显示字段按钮----------------------------------->
          <iButton @click="$emit('handleSend')" >{{language('PEIZHIXIANSHIZIDUAN','配置显示字段')}}</iButton>
          <!--------------------导出按钮----------------------------------->
          <iButton @click="$emit('handleSend')" >{{language('DAOCHU','导出')}}</iButton>
        </div>
      </div>
      <tableList indexKey :tableTitle="partTableTitle" :tableData="partTableData" :tableLoading="partTableLoading" @handleSelectionChange="handleSelectionChange">
      </tableList> 
      <iPagination v-update @size-change="handleSizeChange($event, getTableList)" @current-change="handleCurrentChange($event, getTableList)" background :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :layout="page.layout"
        :current-page="page.currPage"
        :total="page.totalCount"
      />
    </template>
    <logicSettingDialog ref="logic" :dialogVisible="logicVisible" :logicList="partLogicList" :logicData="logicData" :selectOptions="selectOptions" @handleUse="handleUseLogic" @changeVisible="changeLogic" />
  </iCard>
</template>

<script>
import { iCard, iPagination, iButton, iMessage } from 'rise'
import { regularTableTitle, partTableTitle, partLogicList } from '../../data'
import tableList from '@/views/project/schedulingassistant/progroup/components/tableList'
import { pageMixins } from "@/utils/pageMixins"
import logicSettingDialog from '@/views/project/schedulingassistant/progroup/components/logicsetting'
import { selectDictByKeyss } from '@/api/dictionary'
export default {
  mixins: [pageMixins],
  components: { iCard, tableList, iPagination, iButton, logicSettingDialog },
  data() {
    return {
      isShowProgress: false,
      regularTableTitle,
      regularTableData: [],
      regularTableLoading: false,
      partTableData: [],
      partTableLoading: false,
      partLogicList,
      logicData: {},
      logicVisible: false,
      selectOptions: {}
    }
  },
  computed: {
    partTableTitle() {
      return partTableTitle.filter(item => !['CHANPINZUBIANHAO','CHANPINZUZHONGWENMINGCHENG','CHANPINZUDEWENMINGCHENG'].includes(item.key) && (item.disabled || item.isSelect))
    }
  },
  created() {
    const keys = 'CATEGORY_CONFIG_OPTIONS,CALCULATE_CONFIG_OPTIONS,VALUE_CONFIG_OPTIONS,YEAR_CONFIG_OPTIONS,CAR_TYPE_CONFIG_OPTIONS'
    this.selectDictByKeys(keys)
  },
  methods: {
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
      this.logicVisible = true
      this.isShowProgress = true
    },
    changeProgress(isShowProgress) {
      this.isShowProgress = isShowProgress
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
