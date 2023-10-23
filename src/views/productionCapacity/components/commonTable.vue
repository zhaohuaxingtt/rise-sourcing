<!--
 * @Author: moxuan
 * @Date: 2021-04-13 17:30:36
 * @LastEditTime: 2022-09-27 17:32:39
 * @LastEditors: caopeng
 * @Description: 通用表格
-->
<template>
  <el-form :model="{ tableData }" status-icon :rules="rules" ref="commonTableForm" :class="{ formStyle: ruleLength === 0, 'table-border-visible': border }">
    <el-table
      :tree-props="
        isChildren
          ? treeProps
          : {
              children: 'dd',
              hasChildren: 'dd',
            }
      "
      :height="height"
      :span-method="handleMerge"
      tooltip-effect="light"
      :data="tableData"
      @select="select"
      ref="customTable"
      class="customTable"
      @cell-mouse-enter="cellMouseEnter"
      :row-key="rowKey"
      :empty-text="$t('LK_ZANWUSHUJU')"
      v-loading="tableLoading"
      :indent="0"
      :max-height="maxHeight"
      @selection-change="handleSelectionChange"
      :row-class-name="handleTableRow"
      :border="border"
    >
      <el-table-column v-if="selection" type="selection" width="50" align="center"></el-table-column>
      <el-table-column v-if="index" type="index" width="50" align="center" label="#"></el-table-column>
      <template v-for="(items, index) in tableTitle">
        <!-- 点击事件-->
        <el-table-column :key="index" :sortable="items.sortable || false" :align="items.align || 'left'" :width="items.width" :min-width="items.minWidth" :show-overflow-tooltip="items.tooltip" v-if="items.props === openPageProps" class-name="openPageProps" :prop="items.props" :label="items.key ? language(items.key, items.name) : items.name" :fixed="items.fixed">
          <template slot-scope="scope">
            <el-form-item style="display: inline-block">
              <span class="openLinkText linkEllipsis" @click="openPage(openPageGetRowData ? scope.row : scope.row[items.props])">{{ customOpenPageWord ? customOpenPageWord : scope.row[openPageProps] }}</span>
            </el-form-item>
          </template>
        </el-table-column>
        <!--输入框-->
        <el-table-column :width="items.width" :min-width="items.minWidth" :show-overflow-tooltip="items.tooltip" :key="index" align="center" v-else-if="inputProps.includes(items.props)" :prop="items.props" :label="items.key ? language(items.key, items.name) : items.name">
          <template #header>
            <!-- {{ items.key ? $t(items.key) : items.name }} -->
            <span v-if="items.showEn">
              <span style="font-family: Microsoft YaHei, 微软雅黑">{{ items.name }}</span
              ><br />
              <span style="font-family: arial">
                {{ items.nameExt ? items.nameExt : items.key }}
              </span>
            </span>
            <span v-else>
              {{ items.key ? language(items.key, items.name) : items.name }}
            </span>
            <span class="required" v-if="items.required">*</span>
            <el-popover trigger="hover" :content="items.iconTextKey ? $t(items.iconTextKey) : items.iconText" placement="top-start">
              <icon slot="reference" symbol v-if="items.icon" :name="items.icon" class="font-size16 marin-left5" />
            </el-popover>
          </template>
          <template slot-scope="scope">
            <el-form-item :prop="'tableData.' + scope.$index + '.' + items.props" :rules="items.rule ? items.rule : {}">
              <i-input v-model="scope.row[items.props]" v-if="inputType" :type="inputType" :maxlength="items.maxlength ? items.maxlength : 300" @blur="inputBlur($event, scope.row)" />
              <i-input v-model="scope.row[items.props]" v-else :maxlength="items.maxlength ? items.maxlength : 300" @blur="inputBlur($event, scope.row)" />
            </el-form-item>
          </template>
        </el-table-column>
        <!-- Switch -->
        <el-table-column :width="items.width" :min-width="items.minWidth" :show-overflow-tooltip="items.tooltip" :key="index" align="center" v-else-if="switchProps.includes(items.props)" :prop="items.props" :label="items.key ? language(items.key, items.name) : items.name">
          <template slot-scope="scope">
            <el-form-item>
              <el-switch @change="switchChange($event, scope.row)" v-model="scope.row[items.props]" active-color="#67C23A" :activeText="activeText" :inactiveText="inactiveText" />
            </el-form-item>
          </template>
        </el-table-column>
        <!--时间选择框-->
        <el-table-column :width="items.width" :min-width="items.minWidth" :show-overflow-tooltip="items.tooltip" :key="index" align="center" v-else-if="datePickerProps.includes(items.props)">
          <template #header>
            <span v-if="items.error" style="color: red">*</span>
            <iDatePicker v-model="items.startDate" type="date" @change="selectDate($event, index, 'start')" value-format="yyyy-MM-dd" :default-value="items.defaultDate" :picker-options="items.pickerOptionsStart" />
            <span>-</span>
            <iDatePicker v-model="items.endDate" type="date" @change="selectDate($event, index, 'end')" value-format="yyyy-MM-dd" :default-value="items.defaultDate" :picker-options="items.pickerOptionsEnd" />
          </template>
          <template slot-scope="scope">
            <el-checkbox v-model="items.checked" v-if="scope.$index == 0" />
            <el-form-item v-else :class="items.customClass" :prop="'tableData.' + scope.$index + '.' + items.props" :rules="items.rule && scope.$index != 0 ? items.rule : {}">
              <i-input v-if="inputType" v-model="scope.row[items.props]" :type="inputType" :maxlength="items.maxlength ? items.maxlength : 300" />
              <i-input v-model="scope.row[items.props]" v-else />
            </el-form-item>
          </template>
        </el-table-column>
        <!--普通下拉框-->
        <el-table-column :width="items.width" :min-width="items.minWidth" :show-overflow-tooltip="items.tooltip" :key="index" align="center" v-else-if="selectProps.includes(items.props)" :prop="items.props" :label="items.key ? language(items.key, items.name) : items.name">
          <template slot-scope="scope">
            <el-form-item :prop="'tableData.' + scope.$index + '.' + items.props" :rules="items.rule ? items.rule : {}">
              <i-select v-model="scope.row[items.props]">
                <el-option v-for="items in selectPropsOptionsObject[items.props]" :key="items.code" :value="customSelectValueKey ? items[customSelectValueKey] : items.code" :label="items.key ? language(items.key, items.name) : items.name" />
              </i-select>
            </el-form-item>
          </template>
        </el-table-column>
        <!--文件大小-->
        <el-table-column :width="items.width" :min-width="items.minWidth" :show-overflow-tooltip="items.tooltip" :key="index" align="center" v-else-if="items.props === fileSizeProps" :prop="items.props" :label="items.key ? language(items.key, items.name) : items.name">
          <template slot-scope="scope">
            <el-form-item>
              {{ scope.row[items.props] ? scope.row[items.props] / 1024 / 1024 : 0 }}
            </el-form-item>
          </template>
        </el-table-column>
        <!--纯展示-->
        <el-table-column :sortable="items.sortable || false" :width="items.width" :min-width="items.minWidth" :show-overflow-tooltip="items.tooltip" :key="index" :align="items.align || 'left'" v-else :label="items.key ? language(items.key, items.name) : items.name" :prop="items.props" :fixed="items.fixed">
          <!--自定义嵌入-->
          <template #header>
            <!-- {{ items.key ? language(items.key, items.name) : items.name }} -->
            <span v-if="items.showEn">
              <span style="font-family: Microsoft YaHei, 微软雅黑">{{ language(items.key, items.name) }}</span
              ><br />
              <span style="font-family: arial">
                {{ items.nameExt ? language(items.keyExt, items.nameExt) : items.keyExt }}
              </span>
            </span>
            <span v-else>
              {{ items.key ? language(items.key, items.name) : items.name }}
            </span>
            <span class="required" v-if="items.required">*</span>
            <el-popover trigger="hover" :content="items.iconTextKey ? $t(items.iconTextKey) : items.iconText" placement="top-start">
              <icon slot="reference" symbol v-if="items.icon" :name="items.icon" class="font-size16 margin-left5" />
            </el-popover>
          </template>
          <template v-if="$scopedSlots[items.props] || $slots[items.props]" v-slot="scope">
            <el-form-item style="display: inline-block" :prop="'tableData.' + scope.$index + '.' + items.props" :rules="items.rule ? items.rule : {}">
              <slot :name="items.props" :row="scope.row"></slot>
            </el-form-item>
          </template>
        </el-table-column>
      </template>
      <!-- <template v-if="$scopedSlots['append']" #append> </template> -->
    </el-table>
  </el-form>
</template>
<script>
import Sortable from 'sortablejs'
import { iInput, iSelect, icon, iDatePicker } from 'rise'
export default {
  props: {
    border: { type: Boolean, default: true },
    disabledLoad: { type: Boolean, default: true }, // 禁止无限滚动
    tableData: { type: Array },
    tableTitle: { type: Array },
    tableLoading: { type: Boolean, default: false },
    selection: { type: Boolean, default: true },
    index: { type: Boolean, default: false },
    height: { type: Number || String },
    openPageProps: { type: String, default: '' },
    rowKey: { type: String || Number },
    inputProps: {
      type: Array,
      default: () => {
        return []
      },
    },
    switchProps: {
      type: Array,
      default: () => {
        return []
      },
    },
    activeText: { type: String, default: 'Y' },
    inactiveText: { type: String, default: 'N' },
    selectProps: {
      type: Array,
      default: () => {
        return []
      },
    },
    datePickerProps: {
      type: Array,
      default: () => {
        return []
      },
    },
    selectPropsOptionsObject: {
      type: Object,
      default: () => {
        return {}
      },
    },
    isChildren: { type: Boolean, default: true },
    customClass: { type: Boolean, default: false },
    customSelectValueKey: { type: String, default: '' },
    customOpenPageWord: { type: String, default: '' },
    openPageGetRowData: { type: Boolean, default: false },
    inputType: { type: String, default: '' },
    fileSizeProps: { type: String, default: '' },
    mergeValue: { type: String, default: '' },
    maxHeight: { type: Number },

    treeProps: {
      type: Object,
      default: () => {
        return {
          children: 'historyList',
          hasChildren: 'children',
        }
      },
    },
  },
  components: {
    iInput,
    iSelect,
    icon,
    iDatePicker,
  },
  data() {
    return {
      rules: {},
      scrollElem: null,
    }
  },
  computed: {
    ruleLength() {
      const ruleList = this.tableTitle.filter((item) => {
        return item.rule
      })
      return ruleList.length
    },
  },
  created() {
    // const e = document.getElementsByClassName('el-table__row--level-1')
    // console.log(e)
    // for (var i = 0; i < e.length; i++) {
    //   if (e[i].getElementsByTagName('td').length >= 1) {
    //     console.log(e[i].getElementsByTagName('td')[1])
    //     e[i].getElementsByTagName('td')[1].getElementsByTagName('span')[0].setAttribute('style', 'margin-left:16px')
    //   }
    // }
  },
  mounted() {
    this.columnDrop()
  },
  beforeUpdate() {
    this.$nextTick(() => {
      this.$refs.customTable.doLayout()
    })
  },
  methods: {
    //列拖拽
    columnDrop() {
      const wrapperTr = document.querySelector('.el-table__header-wrapper tr')
      this.sortable = Sortable.create(wrapperTr, {
        animation: 180,
        delay: 0,
        onEnd: (evt) => {
          //   const oldindex = evt.oldIndex - 2
          //   const newindex = evt.newIndex - 2
          //   const oldItem = this.tableTitle[oldindex]
          // //   const newItem = this.tableTitle[newindex]
          //   this.$set(this.tableTitle, newindex, oldItem)
          //   this.$set(this.tableTitle, oldindex, newItem)
          this.$nextTick(() => {
            const oldItem = this.tableTitle[evt.oldIndex - 2]
            this.tableTitle.splice(evt.oldIndex - 2, 1)
            this.tableTitle.splice(evt.newIndex - 2, 0, oldItem)
          })
          console.log(this.tableTitle)
        },
      })
    },
    // 无限滚动事件
    infiniteLoad() {
      this.$emit('load')
    },
    handleMerge({ row, column, rowIndex, columnIndex }) {
      // 判断需不需要合并
      if (this.mergeValue === 'pkpiTable1') {
        if ((columnIndex === 1 || columnIndex === 3 || columnIndex === 4 || columnIndex === 5 || columnIndex === 6) && rowIndex === 14) {
          return {
            rowspan: 2,
            colspan: 1,
          }
        }
      }
      if (this.mergeValue === 'furtherRatingCard') {
        if (columnIndex === 1) {
          return [1, 3]
        }
      }
    },
    // input框blur事件
    inputBlur(e, row) {
      this.$emit('inputBlur', e, row)
    },
    // switch切换
    switchChange(bol, row) {
      this.$emit('switchChangeEvent', bol, row)
    },
    handleSelectionChange(val) {
      this.$emit('handle-selection-change', val)
    },
    select(selection, row) {
      this.$emit('select', selection, row)
    },
    cellMouseEnter(row, column, cell, event) {
      this.$emit('cellMouseEnter', row, column, cell, event)
    },
    handleSelectChange(type, val, time) {
      const res = {
        type,
        val,
        time,
      }
      this.$emit('handleSelectChange', res)
    },
    openPage(params) {
      this.$emit('openPage', params)
    },
    handleTableRow(row) {
      row.row.index = row.rowIndex
    },
    selectDate(value, index, status) {
      this.$emit('selectDate', value, index, status)
    },
  },
}
</script>
<style lang="scss" scoped>
.openLinkText {
  color: $color-blue;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
}

.linkEllipsis {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
}

.el-select {
  margin: 2px 0;
}
::v-deep .openPageProps {
  & > .cell {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .el-table__expand-icon .el-icon-arrow-right {
    color: $color-blue;
    &:before {
      content: '\e791';
    }
  }
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
.el-form-item {
  margin-top: 1.375rem;
}
::v-deep .el-switch {
  position: relative;
  color: transparent;
  .el-switch__label {
    position: absolute;
    color: transparent;
  }
  .el-switch__label--left {
    left: 25px;
    z-index: 1;
  }
  .el-switch__label--right {
    left: 5px;
  }
  .el-switch__label--left.is-active {
    color: #000;
  }
  .el-switch__label--right.is-active {
    color: #fff;
  }
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
