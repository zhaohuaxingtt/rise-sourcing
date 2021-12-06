<!--
 * @Author: haojiang
 * @Date: 2021-02-24 09:42:07
 * @LastEditTime: 2021-12-03 14:37:47
 * @description: 决策资料 - tasks
-->
<template>
  <div v-permission.auto="SOURCING_NOMINATION_ATTATCH_TASKS|决策资料-tasks">
    <!-- 备注信息 -->
    <editor :isTask="true"/>
    <!-- 表单信息 -->
    <taskTable />
  </div>
</template>
<script>
import editor from './components/editor'
import taskTable from './components/taskTable'

export default {
  components: {
    editor,
    taskTable
  }
}
</script>