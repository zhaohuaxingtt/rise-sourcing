<!--
 * @Author: haojiang
 * @Date: 2021-02-24 09:42:07
 * @LastEditTime: 2023-02-22 17:31:15
 * @description: 决策资料 - tasks
-->
<template>
  <div class="task" v-permission.auto="SOURCING_NOMINATION_ATTATCH_TASKS|决策资料-tasks">
    <!-- 备注信息 -->
    <editor class="editor" :isTask="true"/>
    <!-- 表单信息 -->
    <taskTable class="margin-top20 task-table" />
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
<style lang="scss" scoped>
.task{
  height: 100%;
  padding-top: 10px;
  .editor{
    height: 125px;
    overflow: auto;
  }
  .task-table{
    height: calc(100% - 145px);
  }
}
</style>