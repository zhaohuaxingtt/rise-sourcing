<!--
 * @Author: moxuan
 * @Date: 2021-04-13 17:30:36
 * @LastEditTime: 2022-04-01 11:06:27
 * @LastEditors: YoHo
 * @Description: 通用表格
-->
<template>
  <el-form :model="{ tableData }" status-icon :rules="rules" ref="commonTableForm" class="commonTable"
    :class="{ formStyle: ruleLength === 0, 'table-border-visible': border }">
    <el-table :highlight-current-row="highlightCurrentRow" :height="height" :max-height="maxHeight"
      :span-method="handleMerge" tooltip-effect="light" :data="tableData" :empty-text="language('暂无数据')"
      v-loading="tableLoading" @current-change="handleCurrentChange" @selection-change="handleSelectionChange"
      @row-click="handleClickRow" :row-class-name="handleTableRow" v-bind="$attrs" :border="border">
      <el-table-column v-if="selection" type="selection" width="50" align="center" :fixed="fixed"></el-table-column>
      <el-table-column v-if="index" type="index" width="50" align="center" :fixed="fixed"
        :label="indexLabel"></el-table-column>
      <template v-for="(items, index) in tableTitle">
        <!-- 点击事件-->
        <el-table-column :key="index" align="center" :width="items.width" :show-overflow-tooltip="items.tooltip"
          v-if="items.props === openPageProps" :prop="items.props"
          :label="items.key ? language(items.key, items.name) : items.name" :fixed="items.fixed">
          <template slot-scope="scope">
            <el-form-item>
              <span class="openLinkText cursor linkEllipsis" @click="
                openPage(
                  openPageGetRowData ? scope.row : scope.row[items.props]
                )
              ">{{
  customOpenPageWord
  ? customOpenPageWord
  : scope.row[openPageProps]
}}</span>
            </el-form-item>
          </template>
        </el-table-column>
        <!--输入框-->
        <el-table-column :width="items.width" :min-width="items.minWidth" :show-overflow-tooltip="items.tooltip"
          :key="index" align="center" v-else-if="inputProps.includes(items.props)" :prop="items.props"
          :label="items.key ? language(items.key, items.name) : items.name">
          <template #header>
            {{ items.key ? language(items.key, items.name) : items.name }}
            <span class="required" v-if="items.required">*</span>
            <el-popover trigger="hover" :content="
              items.iconTextKey
                ? language(items.iconTextKey, items.iconText)
                : items.iconText
            " placement="top-start">
              <icon slot="reference" symbol v-if="items.icon" :name="items.icon" class="font-size16 marin-left5" />
            </el-popover>
          </template>
          <template slot-scope="scope">
            <el-form-item :prop="'tableData.' + scope.$index + '.' + items.props" :rules="items.rule ? items.rule : ''">
              <i-input v-model="scope.row[items.props]" v-if="inputType" :type="inputType"
                :placeholder="language('QINGSHURU', '请输入')" :maxlength="items.maxlength ? items.maxlength : 300" />
              <i-input v-model="scope.row[items.props]" v-else :placeholder="language('QINGSHURU', '请输入')"
                :maxlength="items.maxlength ? items.maxlength : 300" />
            </el-form-item>
          </template>
        </el-table-column>
        <!--普通下拉框-->
        <el-table-column :width="items.width" :show-overflow-tooltip="items.tooltip" :key="index" align="center"
          v-else-if="selectProps.includes(items.props)" :prop="items.props"
          :label="items.key ? language(items.key, items.name) : items.name">
          <template slot-scope="scope">
            <el-form-item :prop="'tableData.' + scope.$index + '.' + items.props" :rules="items.rule ? items.rule : ''">
              <i-select v-model="scope.row[items.props]">
                <el-option v-for="items in selectPropsOptionsObject[items.props]" :key="items.code" :value="
                  customSelectValueKey
                    ? items[customSelectValueKey]
                    : items.code
                " :label="
  items.key ? language(items.key, items.name) : items.name
" />
              </i-select>
            </el-form-item>
          </template>
        </el-table-column>
        <!--文件大小-->
        <el-table-column :width="items.width" :show-overflow-tooltip="items.tooltip" :key="index" align="center"
          v-else-if="items.props === fileSizeProps" :prop="items.props"
          :label="items.key ? language(items.key, items.name) : items.name">
          <template slot-scope="scope">
            <el-form-item>
              {{
                scope.row[items.props]
                ? (scope.row[items.props] / 1024 / 1024).toFixed(2)
                : 0
              }}
            </el-form-item>
          </template>
        </el-table-column>
        <!--纯展示-->
        <el-table-column :width="items.width" :min-width="items.minWidth" :show-overflow-tooltip="items.tooltip"
          :key="index" align="center" v-else :render-header="renderHeader"
          :label="items.key ? language(items.key, items.name) : items.name" :prop="items.props" :fixed="items.fixed">
          <!--自定义嵌入-->
          <template #header>
            <div v-if="!items.overlap && tagNum == '1'" class="titleHeader">
              <span style="margin-right: 10px" v-html="
                items.key ? language(items.key, items.name) : items.name
              "></span>
              <span class="required" v-if="items.required">*</span>

              <el-popover trigger="hover" :content="
                items.iconTextKey
                  ? language(items.iconTextKey)
                  : items.iconText
              " placement="top-start">
                <span class="numIcon" v-if="items.typeIcon == 'num'" slot="reference" size="mini" circle type="primary">{{ items.num
                }}</span>
                <icon v-else slot="reference" symbol v-if="items.icon" :name="items.icon"
                  class="logIcon" />
              </el-popover>
              <!-- <br /> -->
              <span style="margin-right: 10px; font-weight: initial">{{
                items.overlapbottom
              }}</span>
            </div>
            <div v-else class="titleHeader">
              <span style="margin-right: 10px" v-html="
                items.key ? language(items.key, items.name) : items.name
              "></span>
              <!-- <br /> -->
              <span style="margin-right: 10px; font-weight: initial">{{
                items.overlapbottom
              }}</span>
            </div>
          </template>
          <template v-if="$scopedSlots[items.props] || $slots[items.props]" v-slot="scope">
            <el-form-item :class="items.tooltip ? 'tipsTableClass' : ''"
              :prop="'tableData.' + scope.$index + '.' + items.props" :rules="items.rule ? items.rule : ''">
              <slot :name="items.props" :row="scope.row"></slot>
            </el-form-item>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </el-form>
</template>
<script>
import { iInput, iSelect, icon } from 'rise'

export default {
  props: {
    tagNum: { type: String, default: '0' },
    RsObject: { type: Boolean, default: true },
    tableData: { type: Array },
    tableTitle: { type: Array },
    tableLoading: { type: Boolean, default: false },
    selection: { type: Boolean, default: true },
    index: { type: Boolean, default: false },
    height: { type: Number || String },
    maxHeight: { type: Number || String },
    openPageProps: { type: String, default: '' },
    inputProps: {
      type: Array,
      default: () => {
        return []
      }
    },
    selectProps: {
      type: Array,
      default: () => {
        return []
      }
    },
    selectPropsOptionsObject: {
      type: Object,
      default: () => {
        return {}
      }
    },
    customSelectValueKey: { type: String, default: '' },
    customOpenPageWord: { type: String, default: '' },
    openPageGetRowData: { type: Boolean, default: false },
    inputType: { type: String, default: '' },
    fileSizeProps: { type: String, default: 'fileSize' },
    mergeValue: { type: String, default: '' },
    fixed: { type: Boolean, default: false },
    highlightCurrentRow: { type: Boolean, default: false },
    renderHeader: {
      type: Function
    },
    border: { type: Boolean, default: false },
    indexLabel: { type: String, default: '#' },
    rowClassName: { type: String, default: '' },
  },
  components: {
    iInput,
    iSelect,
    icon
  },
  computed: {
    ruleLength() {
      const ruleList = this.tableTitle.filter((item) => {
        return item.rule
      })
      return ruleList.length
    }
  },
  data() {
    return {
      rules: []
    }
  },
  created() { },
  methods: {
    handleMerge({ row, column, rowIndex, columnIndex }) {
      // 判断需不需要合并
      if (this.mergeValue === 'pkpiTable1') {
        if (
          (columnIndex === 1 ||
            columnIndex === 3 ||
            columnIndex === 4 ||
            columnIndex === 5 ||
            columnIndex === 6) &&
          rowIndex === 14
        ) {
          return {
            rowspan: 2,
            colspan: 1
          }
        }
      }
      if (this.mergeValue === 'furtherRatingCard') {
        if (columnIndex === 1) {
          return [1, 3]
        }
      }
    },
    handleSelectionChange(val) {
      this.$emit('handleSelectionChange', val)
    },
    handleCurrentChange(val) {
      this.$emit('handleCurrentChange', val)
    },
    handleClickRow(row, column, event) {
      this.$emit('handleClickRow', row, column, event)
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
      return this.rowClassName
    }
  }
}
</script>
<style>
.el-tooltip__popper {
  max-width: 400px;
}
</style>
<style lang="scss" scoped>
.numIcon{
    display:inline-block;
    text-align:center;
    line-height:20px;
    width:20px;
    height:20px;
    font-size:14px;
    background-color:#1763f7;
    color:white;
    border-radius:50%;
    
}
::v-deep.el-form .el-table .cell{
  span{
    display: block;
  }
}

  .titleHeader{
    line-height: normal;
    font-weight:500;
    span{
      display: inline-block;
    word-wrap: break-word;
    white-space: normal;
    display:block;
    }

  }
  .formStyle ::v-deep.el-table th {
  position:relative;
}
.formStyle ::v-deep.el-table th > .cell{
  height:100%;
  position:static;
  .numIcon{
    position:absolute;
    bottom:0px;
    left:calc(50% - 10px);
  }
  .logIcon{
    position:absolute;
    bottom:0px;
    left:calc(50% - 10px);
  }
}
.openLinkText {
  color: $color-blue;
}

.linkEllipsis {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
}

.el-select {
  margin: 2px 0;
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

::v-deep.el-button--mini.is-circle {
  padding: 3px 4px;
}

.tipsTableClass {
  ::v-deep .el-form-item__content {
    span {
      white-space: nowrap;
      text-overflow: ellipsis;
      display: block;
      overflow: hidden;
    }
  }
}
</style>
