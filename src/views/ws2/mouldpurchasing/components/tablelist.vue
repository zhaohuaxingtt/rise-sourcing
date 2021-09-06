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
        v-if="items.props == 'state'"
        :show-overflow-tooltip="items.tooltip"
        :width="items.width"
        :label="items.name"
        :prop="items.props"
        :align="items.align"
        header-align="center"
      >
        <template slot-scope="row"
          ><span>{{ translateState(row.row["state"]) }}</span></template
        >
      </el-table-column>
      <el-table-column
        :key="index"
        v-else-if="items.props == 'factoryName'"
        :show-overflow-tooltip="items.tooltip"
        :width="items.width"
        :label="$t(items.key)"
        :prop="items.props"
        :align="items.align"
        header-align="center"
      >
        <template slot-scope="row"
          ><span
            >{{ row.row["procureFactory"] }}
            <b v-if="row.row['factoryName'] != null">-</b>
           {{ row.row["factoryName"] }}</span
          ></template
        >
      </el-table-column>
      <el-table-column
        :key="index"
        v-else-if="items.props == 'supplierNameZh'"
        :show-overflow-tooltip="items.tooltip"
        :width="items.width"
        :label="$t(items.key)"
        :prop="items.props"
        :align="items.align"
        header-align="center"
      >
        <template slot-scope="row"
          ><span
            >{{ row.row["supplierSapCode"] }}
            <b v-if="row.row['supplierNameZh'] != null">-</b>
            {{ row.row["supplierNameZh"] }}</span
          ></template
        >
      </el-table-column>
      <el-table-column
        :key="index"
        align="center"
        :show-overflow-tooltip="items.tooltip"
        v-else-if="items.props == 'status'"
        :prop="items.props"
        :label="$t(items.key)"
        :width="items.width"
      >
        <template slot-scope="row"
          ><span>{{
            statusData[row.row.status]
          }}</span></template
        >
      </el-table-column>
      <el-table-column
        :key="index"
        align="center"
        :show-overflow-tooltip="items.tooltip"
        v-else-if="items.props == 'sapItem'"
        :prop="items.props"
        :label="$t(items.key)"
        :width="items.width"
      >
        <template slot-scope="row"
          ><span class="openLinkText cursor" @click="openItemPage(row.row)">{{
            row.row["sapItem"]
          }}</span></template
        >
      </el-table-column>
      <el-table-column
        :key="index"
        align="center"
        :show-overflow-tooltip="items.tooltip"
        v-else-if="items.props == 'contractRiseCode'"
        :prop="items.props"
        :label="$t(items.key)"
        :width="items.width"
      >
        <template slot-scope="row"
          ><span class="openLinkText cursor" @click="openOrderPage(row.row)">{{
            row.row["contractRiseCode"]
          }}</span></template
        >
      </el-table-column>
      <el-table-column
        :key="index"
        :align="items.align"
        header-align="center"
        v-else
        :show-overflow-tooltip="items.tooltip"
        :width="items.width"
        :label="$t(items.key)"
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
    stockCodeList: { type: Array },
  },
  inject: ["vm"],
  data() {
    return {
      statusData: {
        "1": "已创建",
        "2": "已关联订单",
        "3": "订单已推送SAP",
        "4": "关闭",
      }
    }
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
    translateState(state) {
      if (this.stockCodeList.some((i) => i.code == state)) {
        return this.stockCodeList.find((d) => d.code == state).name;
      } else {
        return state;
      }
    },
    openItemPage(val) {
      this.$emit("openItemPage", val);
    },
    openOrderPage(val) {
      this.$emit("openOrderPage", val);
    }
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
  .isred {
    color: #ee260ae3;
  }
}
</style>