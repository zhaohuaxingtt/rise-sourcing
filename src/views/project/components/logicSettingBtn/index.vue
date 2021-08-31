<!--
 * @Author: Luoshuang
 * @Date: 2021-08-26 15:20:37
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-08-31 14:34:06
 * @Description: 算法配置按钮
 * @FilePath: \front-web\src\views\project\components\logicSettingBtn\index.vue
-->

<template>
  <span>
    <iButton @click="openLogicSetting" :disabled="disabled">
      {{language('SUANFAPEIZHI', '算法配置')}}
    </iButton>
    <logicSettingDialog 
      ref="logic" 
      :dialogVisible="logicVisible" 
      :logicList="logicList" 
      :logicData="logicData" 
      @handleUse="$emit('handleUse', logicData)" 
      @changeVisible="changeVisible" />
  </span>
</template>

<script>
import { iButton, iMessage } from 'rise'
import logicSettingDialog from './components/logicsetting'
import { getCarConfig, getPartGroupConfig } from '@/api/project'
export default {
  components: {iButton, logicSettingDialog},
  props: {
    logicList: {type:Array,default:() => []},
    /**
     * @Description: 类型  1-产品组  2-零件
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */    
    logicType: {type:String,default:'1'},
    carProject: {type:String},
    disabled: {type:Boolean,default:false}
  },
  data() {
    return {
      logicVisible: false,
      selectOptions: {},
      logicData: {}
    }
  },
  methods: {
    openLogicSetting() {
      if (!this.carProject) {
        iMessage.error(this.language('QINGXUANZECHEXINGXIANGMU', '请选择车型项目'))
        return
      }
      if (this.logicType === '1') {
        this.getCarConfig()
      } else {
        this.getPartGroupConfig()
      }
    },
    getPartGroupConfig() {
      getPartGroupConfig(this.carProject).then(res => {
        if (res?.result) {
          this.logicData = res.data
        } else {
          this.logicData = {}
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        }
      })
      this.changeVisible(true)
    },
    getCarConfig() {
      getCarConfig(this.carProject).then(res => {
        if (res?.result) {
          this.logicData = res.data
        } else {
          this.logicData = {}
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        }
      })
      this.changeVisible(true)
    },
    changeVisible(visible) {
      this.logicVisible = visible
    },
    changeSaveLoading(loading) {
      if (loading === false) {
        this.changeVisible(false)
      }
      this.$refs.logic.changeSaveLoading(loading)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>