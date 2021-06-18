<!--
 * @Author: youyuan
 * @Date: 2021-06-18 16:03:35
 * @LastEditTime: 2021-06-18 16:23:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsrfq\vpAnalyse\vpAnalyseDetail\components\customPart\index.vue
-->
<template>
  <div>
    <iDialog title="自定义" :visible.sync="visible" >
      <div style="text-align: right">
        <iButton>删除</iButton>
        <iButton>新增</iButton>
        <iButton>重置</iButton>
        <iButton>保存</iButton>
      </div>
      <tableList/>
    </iDialog>
  </div>
</template>

<script>
import {iDialog, iButton} from 'rise'
export default {
  name: 'CustomPart',
  components: {iDialog, iButton},
  props: {
    partList: {
      type: Array,
      default: () => []
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {

    }
  },
  created() {

  },
  methods: {

  }
}
</script>

<style lang='less' scoped>

 
</style>
