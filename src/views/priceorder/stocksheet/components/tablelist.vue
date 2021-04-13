<!--
 * @Author: lyujiahong
 * @Date: 2021-02-24 09:42:07
 * @LastEditTime: 2021-04-01 20:08:22
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
    :empty-text="$t('LK_ZANWUSHUJU')"
    ref="moviesTable"
    :class="radio && 'radio'"
  >
    <el-table-column
      v-if="selection"
      type="selection"
      width="50"
      align="center"
    ></el-table-column>
    <template v-for="(items, index) in tableTitle">
      <el-table-column
        :key="index"
        align="center"
        :show-overflow-tooltip="items.tooltip"
        v-if="items.props == activeItems"
        :prop="items.props"
        :label="items.name"
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
      ></el-table-column>
    </template>
  </el-table>
</template>

<script>
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
.openLinkText {
  color: $color-blue;
}
.radio {
  ::v-deep thead .el-table-column--selection .cell {
    display: none;
  }
}
</style>