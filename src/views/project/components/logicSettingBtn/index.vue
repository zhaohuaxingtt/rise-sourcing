<!--
 * @Author: Luoshuang
 * @Date: 2021-08-26 15:20:37
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-08-27 17:28:13
 * @Description: 算法配置按钮
 * @FilePath: \front-web\src\views\project\components\logicSettingBtn\index.vue
-->

<template>
  <span>
    <iButton @click="$emit('click')">
      {{language('SUANFAPEIZHI', '算法配置')}}
    </iButton>
    <logicSettingDialog ref="logic" :dialogVisible="logicVisible" :logicList="logicList" :logicData="logicData" :selectOptions="selectOptions" @handleUse="$emit('handleUse')" @changeVisible="changeVisible" />
  </span>
</template>

<script>
import { iButton, iMessage } from 'rise'
import logicSettingDialog from './components/logicsetting'
import { selectDictByKeyss } from '@/api/dictionary'
export default {
  components: { iButton, logicSettingDialog },
  props: {
    logicVisible: { type: Boolean, default: false },
    logicList: { type: Array, default: () => [] },
    logicData: { type: Object, default: () => { } }
  },
  created() {
    this.selectDictByKeys()
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
    /**
    * @Description: 获取字典下拉
    * @Author: Luoshuang
    * @param {*} keys
    * @return {*}
    */
    selectDictByKeys(keys) {
      selectDictByKeyss(keys).then(res => {
        if (res?.result) {
          this.selectOptions = { ...this.selectOptions, ...res.data }
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        }
      })
    },
    changeSaveLoading(loading) {
      this.$refs.logic.changeSaveLoading(loading)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>