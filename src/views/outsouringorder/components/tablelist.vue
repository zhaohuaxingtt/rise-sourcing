<template>
  <el-table
    tooltip-effect="light"
    :height="height"
    border
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
      fixed
    ></el-table-column>
    <template v-for="(items, index) in tableTitle">
      <el-table-column
        :key="index"
        v-if="items.props == 'state'"
        :show-overflow-tooltip="items.tooltip"
        :width="items.width"
        :label="$t(items.key)"
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
        v-else-if="items.props == 'procureFactory'"
        :show-overflow-tooltip="items.tooltip"
        :width="items.width"
        :label="$t(items.key)"
        :prop="items.props"
        :align="items.align"
        header-align="center"
      >
        <template slot-scope="row"
          ><span
            >{{ row.row["procureFactory"] }}</span
          ></template
        >
      </el-table-column>
      <el-table-column :key="index" v-else-if="items.props == 'partNum'" :show-overflow-tooltip="items.tooltip" :min-width="items.width ? items.width.toString() : ''" :label="items.key ? $t(items.key) : items.name" :prop="items.props" :align="items.align" header-align="center">
        <template slot-scope="row">
          <span class="whitespace"> {{ row.row['partNum'] }} </span>
        </template>
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
        v-else-if="items.props == 'subType'"
        :show-overflow-tooltip="items.tooltip"
        :width="items.width"
        :label="$t(items.key)"
        :prop="items.props"
        :align="items.align"
        header-align="center"
      >
        <template slot-scope="row"
          ><span
            >{{ row.row["subType"] == "43" ? "预批量采购申请" : row.row["subType"] == "45" ? "标准采购申请" : row.row["subType"] == "411" ? "工序委外要货" : ""}}</span
          ></template
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
        v-else-if="items.props == 'riseCode'"
        :prop="items.props"
        :label="$t(items.key)"
        :width="items.width"
        :fixed="items.fixed"
      >
        <template slot-scope="row"
          ><span v-if="row.row.itemSource == 3 && row.row.nominationStatus == '0' && row.row.status == '1'" class="openLinkText cursor" @click="openRisePage(row.row)">{{
            row.row["riseCode"]
          }}</span>
          <span v-else>{{ row.row.riseCode }}</span>
          </template
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
        v-else-if="items.props == 'nominationStatus'"
        :prop="items.props"
        :label="$t(items.key)"
        :width="items.width"
      >
        <template slot-scope="row"
          ><span>{{
            pointData[row.row.nominationStatus]
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
      },
      pointData: {
        // "0": "未发起转定点",
        "1": "已转定点",
        "2": "已定点",
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
    openRisePage(val) {
      this.$emit("openRisePage", val);
    },
    openOrderPage(val) {
      this.$emit("openOrderPage", val)
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