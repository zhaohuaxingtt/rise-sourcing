<!--
 * @Author: Luoshuang
 * @Date: 2021-08-26 15:20:37
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-30 22:45:22
 * @Description: 算法配置按钮
 * @FilePath: \front-web\src\views\project\components\logicSettingBtn\index.vue
-->

<template>
  <span>
    <iButton @click="$emit('click')">
      {{language('SUANFAPEIZHI', '算法配置')}}
    </iButton>
    <logicSettingDialog ref="logic" :dialogVisible="logicVisible" :logicList="logicList" :logicData="logicData" :selectOptions="selectOptions" @handleUse="$emit('handleUse')" @changeVisible="changeVisible" />
    <logicSettingDialog 
      ref="logic" 
      :dialogVisible="logicVisible" 
      :logicList="logicList" 
      :logicData="logicData" 
      @handleUse="$emit('handleUse')" 
      @changeVisible="changeVisible" />
  </span>
</template>

<script>
import { iButton } from 'rise'
import logicSettingDialog from './components/logicsetting'
export default {
  components: { iButton, logicSettingDialog },
  props: {
    logicVisible: { type: Boolean, default: false },
    logicList: { type: Array, default: () => [] },
    logicData: { type: Object, default: () => { } }
  },
  data() {
    return {
      selectOptions: {}
    }
  },
  methods: {
    changeVisible(visible) {
      this.$emit('changeVisible', visible)
    },
    changeSaveLoading(loading) {
      this.$refs.logic.changeSaveLoading(loading)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>