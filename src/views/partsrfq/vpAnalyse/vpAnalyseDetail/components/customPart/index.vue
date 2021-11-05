<!--
 * @Author: youyuan
 * @Date: 2021-06-18 16:03:35
 * @LastEditTime: 2021-08-12 21:56:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsrfq\vpAnalyse\vpAnalyseDetail\components\customPart\index.vue
-->
<template>
  <div>
    <iDialog :title="dialogTitle" :visible.sync="visible" width="80%"  @close="handleClose">
      <customPartMain 
        v-if="!addMode" 
        :addStatus="addStatus"
        :partList="customPartList" 
        @saveCustomPart="saveCustomPart"
        @handleReturnAdd="handleReturnAdd"/>

      <customPartAdd 
        v-if="addMode" 
        :defaultList="selectionList"
        @handleCloseAdd="handleCloseAdd"
        @handleSubmitAdd="handleSubmitAdd"/>
    </iDialog>
  </div>
</template>

<script>
import {iDialog} from 'rise'
import customPartMain from './components/main'
import customPartAdd from './components/add'
export default {
  name: 'CustomPart',
  components: {iDialog, customPartMain, customPartAdd},
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
      addMode: false,
      customPartList: this.partList,
      selectionList: [],
      addStatus: false,
    }
  },
  created() {

  },
  computed: {
    dialogTitle() {
      return this.addMode ? this.language('CQLJ','查找零件') : this.$t('TPZS.LK_CUSTOM_TITLE')
    }
  },
  methods: {
    //取消事件
    handleClose() {
      this.addMode = false
      this.$emit('handleCloseCustomPart')
    },
    //点击新增按钮事件，跳转新增弹窗
    handleReturnAdd(val) {
      this.addMode = true
      this.selectionList = window._.cloneDeep(val)
    },
    //新增弹窗点击返回，跳转自定义零件列表页面
    handleCloseAdd() {
      this.addMode = false
    },
    //提交新增数据，跳转自定义零件列表页面
    handleSubmitAdd(val) {
      this.addMode = false
      this.addStatus = true
      this.customPartList = val
    },
    //提交保存自定义零件数据
    saveCustomPart() {
      this.$emit('saveCustomPart')
    }
  }
}
</script>

<style lang='scss' scoped>
</style>
