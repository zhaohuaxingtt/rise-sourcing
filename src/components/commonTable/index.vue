<!--
 * @Author: moxuan
 * @Date: 2021-04-13 17:30:36
 * @LastEditTime: 2022-01-11 15:23:02
 * @LastEditors: caopeng
 * @Description: 通用表格
-->
<template>
  <el-form :model="{tableData}" status-icon :rules="rules" ref="commonTableForm"
            class="commonTable"
            :class="{ formStyle: ruleLength === 0, 'table-border-visible': border }"
  >
    <el-table :height="height"
              tooltip-effect='light'
              :data='tableData'
              ref="commonTable"
              :empty-text="language('LK_ZANWUSHUJU', '暂无数据')"
              v-loading='tableLoading'
              @row-click="rowClick"
              @select-all="handleSelectionAllChange"
              @selection-change="handleSelectionChange"
              :border="border"
              :row-class-name="handleTableRow">
      <el-table-column v-if="selection" :selectable="selectionType" type='selection' width="55" align='center'></el-table-column>
      <el-table-column v-if='index' :fixed="indexFixed" type='index' width='50' align='center' label='#'></el-table-column>
      <template v-for="(items,index) in tableTitle">
        <!-- 点击事件-->
        <el-table-column :key="index" align='center' :width="items.width" :show-overflow-tooltip='items.tooltip' :sortable="items.sortable"
                         v-if='items.props === openPageProps' :prop="items.props"
                         :label="language ? language(items.key, items.name) : $t(items.key)" :fixed="items.fixed">
          <template slot-scope="scope">
            <el-form-item>
            <span class="openLinkText cursor"
                  @click="openPage(openPageGetRowData ?  scope.row : scope.row[items.props])">{{
                customOpenPageWord ? customOpenPageWord : scope.row[openPageProps]
              }}</span>
            </el-form-item>
          </template>
        </el-table-column>
        <!--输入框-->
        <el-table-column :width="items.width" :show-overflow-tooltip='items.tooltip' :key="index" align='center'
                         v-else-if='inputProps.includes(items.props)' :prop="items.props" :sortable="items.sortable"
                         :label="language ? language(items.key, items.name) : $t(items.key)">
          <template #header>
            {{ language ? language(items.key, items.name) : $t(items.key) }}
            <span class="required" v-if="items.required">*</span>
            <el-popover
                trigger="hover"
                :content="language ? language(items.iconTextKey, items.iconText) : $t(items.iconTextKey)"
                placement="top-start">
              <icon slot="reference" symbol v-if="items.icon" :name="items.icon" class="font-size16 marin-left5"/>
            </el-popover>
          </template>
          <template slot-scope="scope">
            <el-form-item :prop="'tableData.' + scope.$index + '.' + items.props" :rules="items.rule ? items.rule : ''">
              <i-input v-model="scope.row[items.props]" v-if="inputType" :type="inputType"
                       :maxlength="items.maxlength ? items.maxlength : 300"/>
              <i-input v-model="scope.row[items.props]" v-else :maxlength="items.maxlength ? items.maxlength : 300"/>
            </el-form-item>
          </template>
        </el-table-column>
        <!--普通下拉框-->
        <el-table-column :width="items.width" :show-overflow-tooltip='items.tooltip' :key="index" align='center'
                         v-else-if='selectProps.includes(items.props)' :prop="items.props" :sortable="items.sortable"
                         :label="language ? language(items.key, items.name) : $t(items.key)">
          <template #header>
            {{ language ? language(items.key, items.name) : $t(items.key) }}
            <span class="required" v-if="items.required">*</span>
          </template>
          <template slot-scope="scope">
            <el-form-item :prop="'tableData.' + scope.$index + '.' + items.props" :rules="items.rule ? items.rule : ''">
              <i-select v-model="scope.row[items.props]">
                <el-option v-for="items in selectPropsOptionsObject[items.props]" :key='items.code' :value='items.code'
                           :label="language ? language(items.key, items.name) : $t(items.key)"/>
              </i-select>
            </el-form-item>
          </template>
        </el-table-column>
        <!--文件大小-->
        <el-table-column :width="items.width" :show-overflow-tooltip='items.tooltip' :key="index" align='center'
                         v-else-if='items.props === fileSizeProps' :prop="items.props" :sortable="items.sortable"
                         :label="language ? language(items.key, items.name) : $t(items.key)">
          <template slot-scope="scope">
            <el-form-item>
              {{ scope.row[items.props] ? scope.row[items.props] / 1024 / 1024 : 0 }}
            </el-form-item>
          </template>
        </el-table-column>
        <!--纯展示-->
        <el-table-column :width="items.width" :show-overflow-tooltip='items.tooltip' :key="index" align='center' v-else
                         :label="language ? language(items.key, items.name) : $t(items.key)" :sortable="items.sortable"
                         :prop="items.props" :fixed="items.fixed">
          <!--自定义嵌入-->
          <template #header>
            {{ language ? language(items.key, items.name) : $t(items.key) }}
            <span class="required" v-if="items.required">*</span>
            <el-popover
                trigger="hover"
                :content="language ? language(items.iconTextKey, items.iconText) : $t(items.iconTextKey)"
                placement="top-start">
              <icon slot="reference" symbol v-if="items.icon" :name="items.icon" class="font-size16 marin-left5"/>
            </el-popover>
          </template>
          <template v-if="$scopedSlots[items.props] || $slots[items.props]" v-slot="scope">
            <el-form-item :prop="'tableData.' + scope.$index + '.' + items.props" :rules="items.rule ? items.rule : ''">
              <slot :name="items.props" :row="scope.row"></slot>
            </el-form-item>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </el-form>
</template>
<script>
import {iInput, iSelect, icon} from 'rise'

export default {
  props: {
    tableData: {type: Array},
    tableTitle: {type: Array},
    tableLoading: {type: Boolean, default: false},
    selection: {type: Boolean, default: true},
    index: {type: Boolean, default: false},
    height: {type: Number || String},
    openPageProps: {type: String, default: ''},
    selectable:{type: Boolean, default: false},
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
    border: { type: Boolean, default: false },
    customOpenPageWord: {type: String, default: ''},
    openPageGetRowData: {type: Boolean, default: false},
    inputType: {type: String, default: ''},
    fileSizeProps: {type: String, default: 'fileSize'},
    lang: {type: Boolean, default: false},
    indexFixed:{type:Boolean,default:false}, // 序号是否固定
  },
  components: {
    iInput,
    iSelect,
    icon
  },
  data() {
    return {
      rules: []
    }
  },
  methods: {
    selectionType(){
      if (this.selectable == true) {
        return false
      } else {
        return true
      }
    },
    handleSelectionChange(val) {
      this.$emit('handleSelectionChange', val)
    },
    handleSelectionAllChange(val) {
      this.$emit('handleSelectionAllChange', val)
    },
    rowClick(row, column, event) {
      const res = {
        row,
        column,
        event
      }
      this.$emit('rowClick', res)
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
    },
    handleTableRow(row) {
      row.row.index = row.rowIndex
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

.required {
  font-size: 14px;
  color: red;
}
.commonTable {
  ::v-deep .el-table__row {
    .el-form-item {
      margin-top: 0;
      margin-bottom: 0;
    }
    .el-input {
      height: 35px !important;
      width: 100% !important;

      .el-input__inner {
        height: 35px !important;
      }
    }
  }
}

.el-tooltip__popper {
  max-width: 400px;
}
.linkEllipsis {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
}
.el-form-item {
  margin-top: 1.375rem;
}

.formStyle ::v-deep .el-form-item {
  margin-top: 0;
  margin-bottom: 0;
}

.table-border-visible {
  ::v-deep .el-table--border th {
    border-right: 1px solid #ffffff !important;
  }

  ::v-deep .el-table--border td {
    border-right: 0 !important;
  }
}
</style>