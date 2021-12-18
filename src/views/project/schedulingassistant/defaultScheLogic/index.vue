<!--
 * @Author: Luoshuang
 * @Date: 2021-07-27 21:00:58
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-11-29 14:42:54
 * @Description: 排程助手-默认排程算法配置
 * @FilePath: \front-sourcing\src\views\project\schedulingassistant\defaultScheLogic\index.vue
-->

<template>
  <!-------------v-permission="PROJECTMGT_SCHEDULINGASSISTANTPORTAL_DEFAULTSCHELOGIC"----------------------------------------->
  <iPage class="defaultScheLogic" v-permission.auto="PROJECTMGT_SCHEDULINGASSISTANTPORTAL_DEFAULTSCHELOGIC|项目管理-排程助手-默认排程算法配置">
    <logicItem :loading="proLoading" :selectOptions="selectOptions" :logicList="productLogicList" :logicData="productData" :cardTitle="productTitle" @handleOK="handleOKPro" />
    <logicItem class="margin-top20" :loading="partLoading" :selectOptions="selectOptions" :logicList="partLogicList" :logicData="partData" :cardTitle="partTitle" @handleOK="handleOKPart" />
  </iPage>
</template>

<script>
import { iPage, iMessage } from 'rise'
import { productLogicList, partLogicList } from './data'
import logicItem from './components/logicItem'
import { selectDictByKeys } from '@/api/dictionary'
import { getDefaultConfig, saveUpdateConfig } from '@/api/project'

export default {
  components: { iPage, logicItem },
  data() {
    return {
      productLogicList,
      partLogicList,
      productData: {},
      partData: {},
      selectOptions: {},
      productTitle: {key: 'LKCHANGZHOUQICHANPINZUPAICHENGSUANFAPEIZHI', name: '长周期产品组排程算法配置'},
      partTitle: {key: 'LINGJIANSUANFAPEIZHI', name: '零件算法配置'},
      proLoading: false,
      partLoading: false
    }
  },
  created() {
    const keys = 'keys=CATEGORY_CONFIG_OPTIONS,CALCULATE_CONFIG_OPTIONS,VALUE_CONFIG_OPTIONS,YEAR_CONFIG_OPTIONS,CAR_TYPE_CONFIG_OPTIONS'
    this.selectDictByKeys(keys)
    this.getDefaultLogic()
  },
  methods: {
    handleOKPro() {
      const params = {
        ...this.productData,
        type: 1
      }
      this.proLoading = true
      saveUpdateConfig(params).then(res => {
        if (res?.result) {
          iMessage.success(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
          this.getDefaultLogic()
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        }
      }).finally(() => {
        this.proLoading = false
      })
    },
    handleOKPart() {
      const params = {
        ...this.partData,
        type: 2
      }
      this.partLoading = true
      saveUpdateConfig(params).then(res => {
        if (res?.result) {
          iMessage.success(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
          this.getDefaultLogic()
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        }
      }).finally(() => {
        this.partLoading = false
      })
    },
    selectDictByKeys(keys) {
      selectDictByKeys(keys).then(res => {
        if (res?.result) {
          this.selectOptions = res.data
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        }
      })
    },
    getDefaultLogic() {
      this.proLoading = true
      this.partLoading = true
      getDefaultConfig().then(res => {
        if (res?.result) {
          this.productData = res.data.scheduleConfigVO || {}
          this.partData = res.data.partConfigVO || {}
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        }
      }).finally(() => {
        this.proLoading = false
        this.partLoading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.defaultScheLogic {
  padding: 0;
  padding-top: 10px;
  height: calc(100% - 55px);
  overflow: visible;
}
</style>