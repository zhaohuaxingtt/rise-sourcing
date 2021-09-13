<!--
 * @Author: youyuan
 * @Date: 2021-08-11 15:37:03
 * @LastEditTime: 2021-09-13 16:52:12
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
    const code = this.$store.state.rfq.categoryCode
    const name = this.$store.state.rfq.categoryName
    const newDate = new Date();
    const year = newDate.getFullYear()
    let month = newDate.getMonth() + 1
    let date = newDate.getDate()
    month = month.toString().length == 1 ? '0' + month : month
    date = date.toString().length == 1 ? '0' + date : date
    if(code && name) this.schemeName = '品类管理助手—成本结构—' + name + '—' + (year + '-' + month + '-' + date)
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
