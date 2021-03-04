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
      <template v-if="!hideOpenPage">
        <el-table-column :key="index" align='center' v-if='items.props === openPageProps' :prop="items.props"
                         :label="items.name">
          <template slot-scope="row"><span class="openLinkText cursor" @click="openPage">{{ row.row.b }}</span>
          </template>
        </el-table-column>
        <el-table-column :key="index" align='center' v-else :label="items.name" :prop="items.props"></el-table-column>
      </template>
      <template v-else>
        <el-table-column :key="index" align='center' :label="items.name" :prop="items.props"></el-table-column>
      </template>
    </template>
  </el-table>
</template>
<script>
export default {
  props: {
    tableData: {type: Array},
    tableTitle: {type: Array},
    tableLoading: {type: Boolean, default: false},
    selection: {type: Boolean, default: true},
    index: {type: Boolean, default: false},
    height: {type: Number || String},
    openPageProps: {type: String, default: 'b'},
    hideOpenPage: {type: Boolean, default: false}
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
.openLinkText {
  color: $color-blue;
}
</style>