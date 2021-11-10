<!--
 * @Author: lyujiahong
 * @Date: 2021-02-24 09:42:07
 * @LastEditTime: 2021-07-12 14:17:13
 * @LastEditors: Please set LastEditors
 * @Description: 零件签收-table组件。
 * @FilePath: \rise\src\views\partsign\components\tableList.vue
-->
<template>
  <el-table
    tooltip-effect="light"
    :height="height"
    :data="tableData"
    v-loading="tableLoading"
    @selection-change="handleSelectionChange"
    :empty-text="language('LK_ZANWUSHUJU','暂无数据')"
    ref="moviesTable"
    :class="radio && 'radio'"
  >
    <el-table-column
      v-if="selection"
      type="selection"
      width="55"
      align="center"
    ></el-table-column>
    <template v-for="(items, index) in tableTitle">
      <el-table-column
        :key="index"
        align="center"
        :show-overflow-tooltip="items.tooltip"
        v-if="items.props == activeItems"
        :prop="items.props"
        :label="$t(items.key)"
      >
        <template slot-scope="row"
          ><span class="openLinkText cursor" @click="openPage(row.row)">{{
            row.row[activeItems]
          }}</span></template
        >
      </el-table-column>
      <el-table-column
        :key="index"
        align="center"
        :show-overflow-tooltip="items.tooltip"
        v-else-if="items.props == 'tpInfoType'"
        :label="items.name"
        :prop="items.props"
      >
        <template slot-scope="scope">
          <span>{{
            translateData("tp_info_type", scope.row[items.props])
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        :key="index"
        align="center"
        :show-overflow-tooltip="items.tooltip"
        v-else
        :label="items.name"
        :prop="items.props"
        :min-width="items.props == 'linie' ? 120 : 'auto'"
      >
        <template slot="header">
          <Popover
              placement="top-start"
              :content="$t(items.key)"
              trigger="hover">
            <div slot="reference" class="tableHeader">{{ $t(items.key) }}</div>
          </Popover>
        </template>
        <template v-if="$scopedSlots[items.props] || $slots[items.props]" v-slot="scope">
          <slot :name="items.props" :row="scope.row"></slot>
        </template>
      </el-table-column>
    </template>
  </el-table>
</template>

<script>
import {Popover} from "element-ui"

export default {
  props: {
    tableData: { type: Array },
    tableTitle: { type: Array },
    tableLoading: { type: Boolean, default: false },
    selection: { type: Boolean, default: true },
    index: { type: Boolean, default: false },
    indexLabel: { type: String, default: "#" },
    height: { type: Number || String },
    activeItems: { type: String, default: "b" },
    radio: { type: Boolean, default: false }, // 是否单选
  },
  inject: ["vm"],
  components: {
    Popover
  },
  methods: {
    handleSelectionChange(val) {
      if (this.radio) {
        if (val.length > 1) {
          //取出最后val的最后一个返回出来
          var duoxuans = val.pop();
          this.handleSelectArr = val.pop();
          //清除所有选中
          this.$refs.moviesTable.clearSelection();
          //给最后一个加上选中
          this.$refs.moviesTable.toggleRowSelection(duoxuans);
        } else {
          this.$emit("handleSelectionChange", val);
        }
      } else {
        this.$emit("handleSelectionChange", val);
      }
    },
    openPage(e) {
      this.$emit("openPage", e);
    },
    translateData(key, row) {
      try {
        return this.vm.getGroupList(key).find((i) => i.key == row).value;
      } catch (error) {
        return "";
      }
    },
  },
};
</script>
<style lang='scss' scoped>
.tableHeader{
  max-width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.openLinkText {
  color: $color-blue;
}
.radio {
  ::v-deep thead .el-table-column--selection .cell {
    display: none;
  }
}
</style>