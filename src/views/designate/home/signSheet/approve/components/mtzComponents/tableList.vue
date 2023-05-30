<template>
  <el-form :model="{ tableData }" status-icon class="commonTable formStyle">
    <el-table
      tooltip-effect="light"
      :data="tableData"
      :empty-text="language('暂无数据')"
      v-loading="tableLoading"
      @current-change="handleCurrentChange"
      @selection-change="handleSelectionChange"
      @row-click="handleClickRow"
      :row-class-name="handleTableRow"
      v-bind="$attrs"
      :border="border"
    >
      <el-table-column
        v-if="selection"
        type="selection"
        width="50"
        align="center"
      ></el-table-column>
      <el-table-column
        v-if="index"
        type="index"
        width="50"
        align="center"
        :label="indexLabel"
      ></el-table-column>
      <template v-for="(items, index) in tableTitle">
        <el-table-column
          :width="items.width"
          :min-width="items.minWidth"
          :show-overflow-tooltip="items.tooltip"
          :key="index"
          align="center"
          :label="items.key ? language(items.key, items.name) : items.name"
          :prop="items.props"
          :fixed="items.fixed"
        >
          <!--自定义嵌入-->
          <template #header>
            <div v-if="!items.overlap && tagNum == '1'" class="titleHeader">
              <span
                style="margin-right: 10px"
                v-html="
                  items.key ? language(items.key, items.name) : items.name
                "
              ></span>
              <span class="required" v-if="items.required">*</span>

              <el-popover
                trigger="hover"
                :content="
                  items.iconTextKey
                    ? language(items.iconTextKey)
                    : items.iconText
                "
                placement="top-start"
              >
                <span
                  class="numIcon"
                  v-if="items.typeIcon == 'num'"
                  slot="reference"
                  size="mini"
                  circle
                  type="primary"
                  >{{ items.num }}</span
                >
                <icon
                  slot="reference"
                  symbol
                  v-else-if="items.icon"
                  :name="items.icon"
                  class="logIcon"
                />
              </el-popover>
              <span style="margin-right: 10px; font-weight: initial">{{
                items.overlapbottom
              }}</span>
            </div>
            <div v-else class="titleHeader">
              <span
                style="margin-right: 10px"
                v-html="
                  items.key ? language(items.key, items.name) : items.name
                "
              ></span>
              <span style="margin-right: 10px; font-weight: initial">{{
                items.overlapbottom
              }}</span>
            </div>
          </template>
          <template
            v-if="$scopedSlots[items.props] || $slots[items.props]"
            v-slot="scope"
          >
            <el-form-item :class="items.tooltip ? 'tipsTableClass' : ''">
              <slot :name="items.props" :row="scope.row"></slot>
            </el-form-item>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </el-form>
</template>
<script>
import { icon } from "rise";

export default {
  props: {
    tagNum: { type: String, default: "0" },
    tableData: { type: Array },
    tableTitle: { type: Array },
    tableLoading: { type: Boolean, default: false },
    selection: { type: Boolean, default: true },
    index: { type: Boolean, default: false },
    border: { type: Boolean, default: false },
    indexLabel: { type: String, default: "#" },
    rowClassName: { type: String, default: "" },
  },
  components: {
    icon,
  },
  methods: {
    handleSelectionChange(val) {
      this.$emit("handleSelectionChange", val);
    },
    handleCurrentChange(val) {
      this.$emit("handleCurrentChange", val);
    },
    handleClickRow(row, column, event) {
      this.$emit("handleClickRow", row, column, event);
    },
    handleTableRow(row) {
      row.row.index = row.rowIndex;
      return this.rowClassName;
    },
  },
};
</script>
<style>
.el-tooltip__popper {
  max-width: 400px;
}
</style>
<style lang="scss" scoped>
.numIcon {
  display: inline-block;
  text-align: center;
  line-height: 20px;
  width: 20px;
  height: 20px;
  font-size: 14px;
  background-color: #1763f7;
  color: white;
  border-radius: 50%;
}
::v-deep.el-form .el-table .cell {
  span {
    display: block;
  }
}

.titleHeader {
  line-height: normal;
  font-weight: 500;
  span {
    display: inline-block;
    word-wrap: break-word;
    white-space: normal;
    display: block;
  }
}
.formStyle ::v-deep.el-table th {
  position: relative;
}
.formStyle ::v-deep.el-table th > .cell {
  height: 100%;
  position: static;
  .numIcon {
    position: absolute;
    bottom: 0px;
    left: calc(50% - 10px);
  }
  .logIcon {
    position: absolute;
    bottom: 0px;
    left: calc(50% - 10px);
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
