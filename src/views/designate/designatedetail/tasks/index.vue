<!--
 * @Author: haojiang
 * @Date: 2021-02-24 09:42:07
 * @LastEditTime: 2021-04-19 17:15:37
 * @description: 决策资料 - tasks
-->
<template>
  <div>
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