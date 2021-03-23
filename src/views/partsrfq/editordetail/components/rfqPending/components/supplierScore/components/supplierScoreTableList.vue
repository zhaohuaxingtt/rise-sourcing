<!--
 * @Author: moxuan
 * @Date: 2021-03-05 17:33:00
 * @LastEditors: Please set LastEditors
 * @Description: RFQ-table组件。
-->
<template>
  <el-table :height="height" :data='tableData' v-loading='tableLoading' @selection-change="handleSelectionChange">
    <el-table-column v-if="selection" type='selection' width="50" align='center'></el-table-column>
    <el-table-column v-if='index' type='index' width='50' align='center' label='编号'></el-table-column>
    <template v-for="(items,index) in tableTitle">
      <template v-if="items.list && isArray(items.list)">
        <el-table-column :label="items.name" :key="index" align="center">
          <template v-for="(items2, index2) in items.list">
            <el-table-column :key="index2" align='center' v-if="items2.props === multiHeaderProps" :prop="items2.props" :label="items2.name">
              <template>
                <span class="openLinkText cursor" @click="openMultiHeaderPropsPage">{{multiHeaderPropsText}}</span>
              </template>
            </el-table-column>
            <el-table-column :key="index2" align='center' v-else :label="items2.name" :prop="items2.props"></el-table-column>
          </template>
        </el-table-column>
      </template>
      <template v-else>
        <el-table-column :key="index" align='center' v-if="items.props === actionProps" :prop="items.props"
                         :label="items.name">
          <template>
            <span class="openLinkText cursor" @click="openActionPropsPage">查看</span>
          </template>
        </el-table-column>
        <el-table-column :key="index" align='center' v-else :label="items.name" :prop="items.props"></el-table-column>
      </template>
    </template>
  </el-table>
</template>
<script>
import {isArray} from 'lodash'

export default {
  props: {
    tableData: {type: Array},
    tableTitle: {type: Array},
    tableLoading: {type: Boolean, default: false},
    selection: {type: Boolean, default: true},
    index: {type: Boolean, default: false},
    height: {type: Number || String},
    hideOpenPage: {type: Boolean, default: false},
    multiHeaderProps: {type: String, default: 'tpbMemo'},
    actionProps: {type: String, default: 'action'},
    multiHeaderPropsText: {type: String, default: '编辑'},
  },
  methods: {
    handleSelectionChange(val) {
      this.$emit('handleSelectionChange', val)
    },
    openActionPropsPage() {
      this.$emit('openActionPropsPage')
    },
    openMultiHeaderPropsPage() {
      this.$emit('openMultiHeaderPropsPage')
    },
    isArray
  }
}
</script>
<style lang='scss' scoped>
.openLinkText {
  color: $color-blue;
}
</style>