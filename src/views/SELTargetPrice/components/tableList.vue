<template>
  <tableList
    v-bind="$attrs"
    v-on="$listeners"
  >
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
  </tableList>
</template>
<script>
import { iSelect, iInput } from "rise";
import { _getMathNumber } from "@/utils";
import filters from '@/utils/filters'
import tableList from "@/components/iTableSort"
export default {
  components: { iSelect, iInput, tableList },
  mixins:[filters],
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