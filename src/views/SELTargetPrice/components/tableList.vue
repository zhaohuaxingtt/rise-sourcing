<template>
  <el-table
    ref="multipleTable"
    fit
    tooltip-effect="light"
    :height="height"
    :data="tableData"
    v-loading="tableLoading"
    @selection-change="handleSelectionChange"
    :empty-text="language('ZANWUSHUJU', '暂无数据')"
  >
    <el-table-column
      v-if="selection"
      type="selection"
      width="55"
      align="center"
    ></el-table-column>
    <el-table-column
      v-if="indexKey"
      type="index"
      width="50"
      align="center"
      label="#"
      :fixed="indexFixed"
    >
      <template slot-scope="scope">
        {{ tableIndexString + (scope.$index + 1) }}
      </template>
    </el-table-column>
    <template v-for="(items, index) in tableTitle">
      <!---------------------------可编辑列---------------------------------->
      <el-table-column
        :key="index"
        align="center"
        :width="items.width"
        :min-width="items.minWidth"
        :show-overflow-tooltip="items.tooltip"
        v-if="items.editable"
        :prop="items.props"
        :label="items.key ? language(items.key, items.name) : items.name"
        :sortable="items.sortable || false"
        :sort-method="items.sortMethod"
        :fixed="items.fixed"
      >
        <template slot="header">
          <span>{{
            items.key ? language(items.key, items.name) : items.name
          }}</span>
          <span v-if="items.required" style="color: red">*</span>
        </template>
        <template slot-scope="scope">
          <iInput
            v-if="scope.row.isEdit && items.type === 'input'"
            :value="scope.row[items.props]"
            @input="(val) => changeValue(val, scope.row, items)"
          ></iInput>
          <iSelect
            v-else-if="scope.row.isEdit && items.type === 'select'"
            v-model="scope.row[items.props]"
            @change="(val) => changeValue(val, scope.row, items)"
          >
            <el-option
              :value="item.value"
              :label="item.label"
              v-for="(item, index) in items.selectOption"
              :key="index"
            ></el-option>
          </iSelect>
          <span v-else>{{ scope.row[items.props] }}</span>
        </template>
      </el-table-column>
      <!-------------------------正常列--------------------------->
      <el-table-column
        :key="index"
        align="center"
        :width="items.width"
        :min-width="items.minWidth"
        :show-overflow-tooltip="items.tooltip"
        v-else
        :label="items.key ? language(items.key, items.name) : items.name"
        :prop="items.props"
        :sortable="items.sortable || false"
        :sort-method="items.sortMethod"
        :fixed="items.fixed"
      >
        <template slot="header">
          <span v-if="items.enName"
            >{{ items.name
            }}<span
              ><br />{{ items.enName }}<br v-if="items.enName1" />{{
                items.enName1
              }}</span
            ></span
          >
          <span v-else>{{
            items.key ? language(items.key, items.name) : items.name
          }}</span>
          <span v-if="items.required" style="color: red">*</span>
        </template>
        <template
          v-if="$scopedSlots[items.props] || $slots[items.props]"
          v-slot="scope"
        >
          <slot :name="items.props" :row="scope.row"></slot>
        </template>
        <template v-else slot-scope="scope">
          <!------------------审批记录列--------------------------->
          <span
            class="openLinkText cursor"
            v-if="items.props === 'shenpi'"
            @click="$emit('openApprovalDialog', scope.row)"
            >{{ language("CHAKAN", "查看") }}</span
          >
          <!------------------正常--------------------------->
          <span v-else>{{ scope.row[items.props] }}</span>
        </template>
      </el-table-column>
    </template>
  </el-table>
</template>
<script>
import { iSelect, iInput } from "rise";
import { _getMathNumber } from "@/utils";
import filters from '@/utils/filters'
export default {
  components: { iSelect, iInput },
  mixins:[filters],
  props: {
    tableData: { type: Array },
    tableTitle: { type: Array, default:()=>[] },
    tableLoading: { type: Boolean, default: false },
    selection: { type: Boolean, default: true },
    height: { type: Number || String },
    activeItems: { type: String, default: "b" },
    tableIndexString: {
      type: String,
      default: "",
    },
    indexKey: Boolean,
    notEdit: Boolean,
    doubleHeader: Boolean,
    selectedItems: { type: Array },
    isEdit: { type: Boolean, default: false },
  },
  inject: ["vm"],
  computed:{
    indexFixed(){
      return this.tableTitle.some(item=>item?.fixed)
    }
  },
  methods: {
    changeValue(val, row, item) {
      if (item.isNumber) {
        if (/^\d*\.?\d*$/.test(val)) {
          this.$set(row, item.props, val);
        }
      } else {
        this.$set(row, item.props, val);
      }
    },
    handleSelectionChange(val) {
      this.$emit("handleSelectionChange", val);
    },
    openPage(e) {
      this.$emit("openPage", e);
    },
  },
};
</script>
<style lang='scss' scoped>
.openLinkText {
  color: $color-blue;
  text-decoration: underline;
}
.radio {
  ::v-deep thead .el-table-column--selection .cell {
    display: none;
  }
}
.isChange {
  ::v-deep .el-input__inner {
    color: red;
    background: rgb(255 0 0 / 10%);
    border-color: red;
  }
}
</style>