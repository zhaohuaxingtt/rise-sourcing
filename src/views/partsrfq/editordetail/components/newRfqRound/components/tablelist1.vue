<!--
 * @Author: moxuan
 * @Date: 2021-03-04 17:33:00
 * @LastEditors: Please set LastEditors
 * @Description: RFQ-table组件。
-->
<template>
  <el-table :height="height" :data='tableData' v-loading='tableLoading' @selection-change="handleSelectionChange">
    <el-table-column v-if="selection" type='selection' width="50" align='center'></el-table-column>
    <el-table-column v-if='index' type='index' width='50' align='center' label='#'></el-table-column>
    <template v-for="(items,index) in tableTitle">
      <el-table-column :key="index" align='center' v-if='items.props === selectProps' :prop="items.props"
                       :label="items.name">
        <template slot-scope="row">
          <iSelect size="medium">
            {{ row.row.select }}
          </iSelect>
        </template>
      </el-table-column>
      <el-table-column :key="index" align='center' v-else :label="items.name" :prop="items.props"></el-table-column>
    </template>
  </el-table>
</template>
<script>
import {iSelect} from '@/components'

export default {
  props: {
    tableData: {type: Array},
    tableTitle: {type: Array},
    tableLoading: {type: Boolean, default: false},
    selection: {type: Boolean, default: true},
    index: {type: Boolean, default: false},
    height: {type: Number || String},
    selectProps: {type: String, default: 'select'}
  },
  components: {
    iSelect
  },
  methods: {
    handleSelectionChange(val) {
      this.$emit('handleSelectionChange', val)
    },
    openPage() {
      this.$emit('openPage')
    }
  }
}
</script>
<style lang='scss' scoped>
</style>