<!--
 * @Author: moxuan
 * @Date: 2021-04-13 17:30:36
 * @LastEditTime: 2021-04-13 17:30:36
 * @LastEditors: Please set LastEditors
 * @Description: 通用表格
-->
<template>
  <el-table
    :height="height"
    tooltip-effect='light'
    :data='data'
    :empty-text="$t('LK_ZANWUSHUJU')"
    :row-class-name="rowClassName"
    v-loading='tableLoading'
    @selection-change="handleSelectionChange"
    highlight-current-row
  >
    <slot></slot>
  </el-table>
</template>
<script>

export default {
  props: {
    data: {type: Array},
    tableLoading: {type: Boolean, default: false},
    height: {type: Number || String},
    rowClassName: {type: Function},
  },
  data() {
    return {
    }
  },
  methods: {
    handleSelectionChange(val) {
      this.$emit('selectionChange', val)
    },
  }
}
</script>
<style lang='scss' scoped>
::v-deep .open-link-text {
  color: #1763F7;
  cursor: pointer;
}
::v-deep td .cell {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

</style>