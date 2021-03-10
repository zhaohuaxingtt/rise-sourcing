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
      <el-table-column :key="index" align='center' v-if='items.props === openPageProps' :prop="items.props"
                       :label="items.name">
        <template slot-scope="row">
            <span class="openLinkText cursor"
                  @click="openPage">{{ customOpenPageWord ? customOpenPageWord : row.row[openPageProps] }}</span>
        </template>
      </el-table-column>
      <el-table-column :key="index" align='center' v-else-if='items.props === inputProps' :prop="items.props"
                       :label="items.name">
        <template>
          <i-input/>
        </template>
      </el-table-column>
      <el-table-column :key="index" align='center' v-else-if='selectProps.includes(items.props)' :prop="items.props"
                       :label="items.name">
        <template>
          <i-select></i-select>
        </template>
      </el-table-column>
      <el-table-column :key="index" align='center' v-else-if='items.props === iconProps' :prop="items.props"
                       :label="items.name">
        <template>
          <slot name="icon"></slot>
        </template>
      </el-table-column>
      <el-table-column :key="index" align='center' v-else :label="items.name" :prop="items.props"></el-table-column>
    </template>
  </el-table>
</template>
<script>
import {iInput, iSelect } from '@/components'

export default {
  props: {
    tableData: {type: Array},
    tableTitle: {type: Array},
    tableLoading: {type: Boolean, default: false},
    selection: {type: Boolean, default: true},
    index: {type: Boolean, default: false},
    height: {type: Number || String},
    openPageProps: {type: String, default: ''},
    inputProps: {type: String, default: ''},
    selectProps: {
      type: Array, default: () => {
        return []
      }
    },
    iconProps: {type: String, default: ''},
    customOpenPageWord: {type: String, default: ''}
  },
  components: {
    iInput,
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
.openLinkText {
  color: $color-blue;
}

.el-select {
  margin: 2px 0;
}

::v-deep .el-table__row .el-input {
  height: 35px !important;

  .el-input__inner {
    height: 35px !important;
  }
}
.icon{
  color: $color-blue;
}
</style>