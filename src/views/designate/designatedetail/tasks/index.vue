<!--
 * @Author: haojiang
 * @Date: 2021-02-24 09:42:07
 * @LastEditTime: 2021-09-07 15:30:50
 * @description: 决策资料 - tasks
-->
<template>
  <div v-permission.auto="SOURCING_NOMINATION_ATTATCH_TASKS|决策资料-tasks">
    <!-- 备注信息 -->
    <editor />
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