<!--
 * @Author: youyuan
 * @Date: 2021-08-11 16:52:10
 * @LastEditTime: 2021-08-26 15:26:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsrfq\externalAccessToAnalysisTools\categoryManagementAssistant\internalDemandAnalysis\costAnalysisMain\components\confirm.vue
-->
<template>
  <div>
    <iDialog :visible.sync="value" :title="language('TISHI', '提示')" width="20%" >
      <div>
        <p style="marginBottom: 5px;fontWeight: bold;">{{language('COVERCONFIRM', '此分析方案/报告名称已存在，是否覆盖？')}}</p>
        <div slot="footer" style="margin: 10px 0; padding: 10px 0; textAlign: right;">
          <iButton @click="clickSure">确 定</iButton>
          <iButton @click="clickCancel">取 消</iButton>
        </div>
      </div>
    </iDialog>
  </div>
</template>

<script>
import { iDialog, iButton } from 'rise'
export default {
  name: 'saveModal',
  data () {
    return {
      schemeName: null
    }
  },
  components: {
    iDialog,
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
      this.$emit('handleCover')
    },
    clickCancel() {
      this.$emit('handleCancelCover')
    }
  }
}
</script>

<style lang='scss' scoped>

 
</style>