<!--
 * @Author: youyuan
 * @Date: 2021-08-11 15:37:03
 * @LastEditTime: 2021-08-11 16:57:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsrfq\externalAccessToAnalysisTools\categoryManagementAssistant\internalDemandAnalysis\costAnalysisMain\components\save.vue
-->
<template>
  <div>
    <iDialog :visible.sync="value" :title="language('BAOCUN', '保存')" width="20%" >
      <div>
        <p style="marginBottom: 5px;fontWeight: bold;">{{language('BAOCUNZHIFENXIKU', '保存至分析库')}}</p>
        <iInput v-model="schemeName"></iInput>
        <div slot="footer" style="margin: 10px 0; padding: 10px 0; textAlign: right;">
          <iButton @click="clickSure">确 定</iButton>
        </div>
      </div>
    </iDialog>
  </div>
</template>

<script>
import { iDialog, iInput, iButton } from 'rise'
export default {
  name: 'saveModal',
  data () {
    return {
      schemeName: null
    }
  },
  components: {
    iDialog,
    iInput,
    iButton
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
  },
  created() {

  },
  methods: {
    clickSure() {
      this.$emit('checkSchemeName', this.schemeName)
    }
  }
}
</script>

<style lang='scss' scoped>

 
</style>
