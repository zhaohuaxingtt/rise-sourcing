<!--
 * @Author: 余继鹏 917955345@qq.com
 * @Date: 2023-04-26 18:18:30
 * @LastEditors: 余继鹏 917955345@qq.com
 * @FilePath: \front-web\src\views\designate\home\signSheet\approve\components\mtzTable.vue
-->
<template>
  <div>
    <el-table
      border
      :data="tableData"
      :span-method="arraySpanMethod"
      :cell-class-name="cellClassName"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" align="center"></el-table-column>
      <el-table-column
        type="index"
        label="#"
        align="center"
        width="60"
      ></el-table-column>
      <el-table-column
        label="Present Items"
        prop="appName"
        header-align="center"
        align="left"
        minWidth="260"
      ></el-table-column>
      <el-table-column
        label="Type"
        prop="appType"
        align="center"
        width="120"
      ></el-table-column>
      <el-table-column
        label="Nomination No."
        prop="appNo"
        align="center"
        width="160"
      >
        <template slot-scope="scope">
          <span class="link" @click="openDetail(scope.row)">{{
            scope.row.appNo
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Supplier" align="center">
        <el-table-column
          label="Name"
          header-align="center"
          align="left"
          prop="supplier"
          width="190"
        >
          <template slot-scope="scope">
            <el-table
              class="supplier-table"
              v-if="scope.row.appSupplierList"
              :data="scope.row.appSupplierList"
              :show-header="false"
            >
              <el-table-column prop="name" width="190"></el-table-column>
              <el-table-column prop="newRule" width="120"></el-table-column>
              <el-table-column
                prop="materialName"
                width="139"
              ></el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column
          label="New Rule"
          header-align="center"
          align="right"
          width="120"
        ></el-table-column>
        <el-table-column
          label="Material"
          header-align="center"
          align="right"
          width="140"
        ></el-table-column>
      </el-table-column>
      <el-table-column
        label="Com."
        prop="linieDept"
        align="center"
        width="100"
      ></el-table-column>
      <el-table-column
        label="Status"
        prop="approvedStatus"
        align="center"
        width="220"
      >
        <template slot-scope="scope">
          <p>{{ scope.row.approvedStatusName }}</p>
          <p>{{ scope.row.approvedDate }}</p>
        </template>
      </el-table-column>
    </el-table>
    <drawer
      @refreshData="getData"
      :visible.sync="visible"
      :row="row"
      :menuList="tableData"
      isMtz
    />
  </div>
</template>

<script>
import drawer from "./drawer";
import { signAppMtzPage } from "@/api/designate/nomination/mApprove";
export default {
  components: { drawer },
  data() {
    return {
      tableData: [],
      selectData: [],
      row: {},
      visible: false,
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.loading = true;
      let params = {
        signId: this.$route.query.signId,
        size: 10000,
        current: 1,
      };
      signAppMtzPage(params)
        .then((res) => {
          if (res?.code == 200) {
            this.tableData = res.data.records;
            this.$emit("setCount", "mtzNum", res.data.total);
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },

    cellClassName({ row, column, rowIndex, columnIndex }) {
      if ([5].includes(columnIndex)) {
        return "supplier-box";
      } else {
        return "";
      }
    },

    arraySpanMethod({ row, column, rowIndex, columnIndex }) {
      if ([5].includes(columnIndex)) {
        return [1, 3];
      } else if ([6, 7].includes(columnIndex)) {
        return [0, 0];
      }
    },
    handleSelectionChange(val) {
      this.selectData = val;
    },
    openDetail(row) {
      this.row = JSON.parse(JSON.stringify(row));
      this.visible = true;
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .supplier-box {
  padding: 0;
  .cell {
    padding: 0 !important;
    .supplier-table {
      &::before {
        content: unset;
      }
      .el-table__body-wrapper {
        tr:last-of-type {
          td {
            border-bottom: 0;
          }
        }
      }
      td:last-of-type {
        border-right: 0;
      }
      .cell {
        padding: 0 5px !important;
      }
    }
  }
}
</style>