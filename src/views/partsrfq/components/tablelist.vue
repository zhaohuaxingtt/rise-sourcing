<!--
 * @Author: moxuan
 * @Date: 2021-03-04 17:33:00
 * @LastEditors: Please set LastEditors
 * @Description: RFQ-table组件。
-->
<template>
  <el-table :height="height" :data='tableData' v-loading='tableLoading' @selection-change="handleSelectionChange">
    <el-table-column v-if="selection" type='selection' width="50" align='center'></el-table-column>
    <el-table-column v-if='index' type='index' width='50' align='center' label='编号'></el-table-column>
    <template v-for="(items,index) in tableTitle">
      <el-table-column :key="index" align='center' v-if='items.props === openPageProps' :prop="items.props"
                       :label="items.name">
        <template slot-scope="scope">
            <span class="openLinkText cursor"
                  @click="openPage(openPageGetRowData ?  scope.row : scope.row[items.props])">{{
                customOpenPageWord ? customOpenPageWord : scope.row[openPageProps]
              }}</span>
        </template>
      </el-table-column>
      <el-table-column :key="index" align='center' v-else-if='inputProps.includes(items.props)' :prop="items.props"
                       :label="items.name">
        <template slot-scope="scope">
          <i-input v-model="scope.row[items.props]"/>
        </template>
      </el-table-column>
      <el-table-column :key="index" align='center'
                       v-else-if='isSelectOptionsLinkage && selectProps.includes(items.props)' :prop="items.props"
                       :label="items.name">
        <template slot-scope="scope">
          <i-select v-model="scope.row[items.props]"
                    @change="(val)=>handleSelectChange(items.props,val, scope.row.time)">
            <el-option v-for="items in selectPropsOptionsObject[scope.row.time][items.props]" :key='items.code'
                       :value='items.code'
                       :label="items.name"/>
          </i-select>
        </template>
      </el-table-column>
      <el-table-column :key="index" align='center'
                       v-else-if='!isSelectOptionsLinkage && selectProps.includes(items.props)' :prop="items.props"
                       :label="items.name">
        <template slot-scope="scope">
          <i-select v-model="scope.row[items.props]">
            <el-option v-for="items in selectPropsOptionsObject[items.props]" :key='items.code' :value='items.code'
                       :label="items.name"/>
          </i-select>
        </template>
      </el-table-column>
      <el-table-column :key="index" align='center' v-else-if='items.props === iconProps' :prop="items.props"
                       :label="items.name">
        <template slot-scope="scope">
          <slot name="icon" :data="scope.row"></slot>
        </template>
      </el-table-column>
      <el-table-column :key="index" align='center' v-else :label="items.name" :prop="items.props"></el-table-column>
    </template>
  </el-table>
</template>
<script>
import {iInput, iSelect} from '@/components'

export default {
  props: {
    tableData: {type: Array},
    tableTitle: {type: Array},
    tableLoading: {type: Boolean, default: false},
    selection: {type: Boolean, default: true},
    index: {type: Boolean, default: false},
    height: {type: Number || String},
    openPageProps: {type: String, default: ''},
    inputProps: {
      type: Array, default: () => {
        return []
      }
    },
    selectProps: {
      type: Array, default: () => {
        return []
      }
    },
    selectPropsOptionsObject: {
      type: Object, default: () => {
        return {}
      }
    },
    isSelectOptionsLinkage: {
      type: Boolean, default: false
    },
    iconProps: {type: String, default: ''},
    customOpenPageWord: {type: String, default: ''},
    openPageGetRowData: {type: Boolean, default: false},
  },
  components: {
    iInput,
    iSelect
  },
  methods: {
    handleSelectionChange(val) {
      this.$emit('handleSelectionChange', val)
    },
    handleSelectChange(type, val, time) {
      const res = {
        type,
        val,
        time
      }
      this.$emit('handleSelectChange', res)
    },
    openPage(params) {
      this.$emit('openPage', params)
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

.icon {
  color: $color-blue;
}
</style>