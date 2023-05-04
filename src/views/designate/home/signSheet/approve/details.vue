<!--
 * @Author: 余继鹏 917955345@qq.com
 * @Date: 2023-04-26 17:52:13
 * @LastEditors: 余继鹏 917955345@qq.com
 * @FilePath: \front-web\src\views\designate\home\signSheet\approve\details.vue
-->
<template>
  <iPage class="details">
    <div class="page-header">
      <span class="title">签字单:{{ id }}</span>
      <div class="button-box">
        <iButton>导出</iButton>
        <iButton>批准</iButton>
        <iButton>拒绝</iButton>
      </div>
    </div>
    <div class="margin-top20">
      <el-radio-group class="radio-group" v-model="tab">
        <el-radio-button label="part">Part * {{ partNum }}</el-radio-button>
        <el-radio-button label="mtz"
          >MTZ Rules & Parts * {{ mtzNum }}</el-radio-button
        >
      </el-radio-group>
    </div>
    <partTable class="margin-top10" v-if="tab == 'part'"></partTable>
    <mtzTable class="margin-top10" v-if="tab == 'mtz'"></mtzTable>
  </iPage>
</template>

<script>
import { iPage, iButton } from "rise";
import partTable from "./components/partTable";
import mtzTable from "./components/mtzTable";
export default {
  components: {
    iPage,
    iButton,
    partTable,
    mtzTable,
  },
  data() {
    return {
      id: "2023-CW15073",
      tab: "part",
      partNum: 24,
      mtzNum: 12,
    };
  },
  created() {
    this.getDetails();
  },
  methods: {
    getDetails() {},
  },
};
</script>

<style lang="scss" scoped>
.details {
  .page-header {
    display: flex;
    justify-content: space-between;
    .title {
      font-size: 20px;
      font-weight: bold;
    }
  }
  ::v-deep .el-radio-group {
    &.radio-group {
      .el-radio-button__inner {
        display: flex;
        border-radius: 0;
        padding: 3px 15px;
        align-items: center;
        min-width: 60px;
        justify-content: center;
        &:hover {
          color: #727272;
        }
      }
      .el-radio-button__orig-radio:checked + .el-radio-button__inner {
        background: #364d6e;
        color: #fff;
        border-color: #e0e6ed;
      }
    }
  }
  ::v-deep .el-table {
    border-radius: 0;
    font-size: 18px;
    .el-table__header {
      tr {
        background-color: #364d6e;
      }
      tr:nth-child(even) {
        background-color: #364d6e;
      }
      th {
        border-color: #d9d9d9;
        .cell {
          color: #fff;
          line-height: 20px;
        }
      }
      th.gutter:last-of-type {
        background: #fff;
        border: 0;
      }
    }
    .el-table__body-wrapper,
    .el-table__fixed-body-wrapper {
      tr:nth-child(even) {
        background-color: #ffffff;
      }

      tr:last-of-type {
        td {
          // border-bottom: 1px solid #d9d9d9;
        }
      }

      td {
        border-color: #d9d9d9;
        border-bottom: 1px solid #d9d9d9;
        .cell {
          line-height: 20px;
        }
      }
    }
    .el-table__footer-wrapper {
      tr:nth-child(even) {
        background-color: #ffffff;
      }
    }
    tr {
      .link {
        color: #364d6e;
        text-decoration: underline;
      }
    }
  }
}
</style>