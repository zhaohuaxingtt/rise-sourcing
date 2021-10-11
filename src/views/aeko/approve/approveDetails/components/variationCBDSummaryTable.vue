<!--
 * @Author: YoHo
 * @Date: 2021-10-09 11:32:16
 * @LastEditTime: 2021-10-11 08:52:22
 * @LastEditors: YoHo
 * @Description: 
-->
<template>
  <iPage>
    <iCard class="mb-16">
      <p class="title">变动值CBD - 汇总表</p>
      <el-table :data="tabledata" stripe :span-method="spanMethod">
        <el-table-column label="#" prop="col1" align="center">
          <template slot-scope="{ row }">
            <div v-if="row.total" class="center-align">
              <span>TOTAL</span>
            </div>
            <div v-else>
              <span>{{ row.col1 }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="AEKO零件号" prop="col2" align="center">
          <template slot-scope="{ row }">
            <template v-if="row.total">
              <div class="end-align">
                <span>{{ row.total }}</span>
              </div>
            </template>
            <template v-else>
              {{ row.col2 }}
            </template>
          </template>
        </el-table-column>
        <el-table-column
          label="类别"
          prop="col3"
          align="center"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column
          label="内容"
          prop="col4"
          align="center"
        ></el-table-column>
        <el-table-column label="原零件" align="center">
          <el-table-column
            label="原零件号"
            prop="col5"
            align="center"
          ></el-table-column>
          <el-table-column
            label="单价"
            prop="col6"
            align="center"
          ></el-table-column>
          <el-table-column
            label="单位"
            prop="col7"
            align="center"
          ></el-table-column>
          <el-table-column
            label="用量"
            prop="col8"
            align="center"
          ></el-table-column>
          <el-table-column
            label="小计"
            prop="col9"
            align="center"
          ></el-table-column>
        </el-table-column>
        <el-table-column label="新零件" align="center">
          <el-table-column
            label="新零件号"
            prop="col10"
            align="center"
          ></el-table-column>
          <el-table-column
            label="单价"
            prop="col11"
            align="center"
          ></el-table-column>
          <el-table-column
            label="单位"
            prop="col12"
            align="center"
          ></el-table-column>
          <el-table-column
            label="用量"
            prop="col13"
            align="center"
          ></el-table-column>
          <el-table-column
            label="小计"
            prop="col14"
            align="center"
          ></el-table-column>
        </el-table-column>
        <el-table-column
          label="变动值"
          prop="col15"
          align="center"
        ></el-table-column>
      </el-table>
    </iCard>
    <switchParts />
    <iTabsList type="card" v-model="defaultTab">
      <el-tab-pane label="A价变动(含分摊)" name="0">
        <APriceChange />
      </el-tab-pane>
      <el-tab-pane label="模具投资变动" name="1"> 模具投资变动 </el-tab-pane>
      <el-tab-pane label="开发费" name="2"> 开发费 </el-tab-pane>
      <el-tab-pane label="终止费" name="3"> 终止费 </el-tab-pane>
      <el-tab-pane label="样件费" name="4"> 样件费 </el-tab-pane>
    </iTabsList>
  </iPage>
</template>

<script>
import { iPage, iCard, iTabsList, iTableCustom } from "rise";
import APriceChange from "./APriceChange.vue";
import switchParts from "./switchParts.vue";
export default {
  components: {
    iPage,
    iCard,
    iTabsList,
    iTableCustom,
    APriceChange,
    switchParts,
  },
  data() {
    return {
      defaultTab: "0",
      tabledata: [
        {
          col1: "1",
          col2: "A23D654321",
          col3: "2.1 原材料/散件成本",
          col4: "",
          col5: "A23D654321",
          col6: "10.0000",
          col7: "件",
          col8: "2.0000",
          col9: "20.0000",
          col10: "A23D654321",
          col11: "9.0000",
          col12: "件",
          col13: "2.0000",
          col14: "18.0000",
          col15: "2.0000",
        },
        {
          col1: "2",
          col2: "A23D654321",
          col3: "2.1 原材料/散件成本",
          col4: "",
          col5: "A23D654321",
          col6: "10.0000",
          col7: "件",
          col8: "2.0000",
          col9: "20.0000",
          col10: "A23D654321",
          col11: "9.0000",
          col12: "件",
          col13: "2.0000",
          col14: "18.0000",
          col15: "2.0000",
        },
        {
          col1: "3",
          col2: "A23D654321",
          col3: "2.1 原材料/散件成本",
          col4: "",
          col5: "A23D654321",
          col6: "10.0000",
          col7: "件",
          col8: "2.0000",
          col9: "20.0000",
          col10: "A23D654321",
          col11: "9.0000",
          col12: "件",
          col13: "2.0000",
          col14: "18.0000",
          col15: "2.0000",
        },
        {
          col1: "TOTAL",
          col2: "RMB 2.0000",
          col3: "",
          col4: "",
          col5: "",
          col6: "",
          col7: "",
          col8: "",
          col9: "",
          col10: "",
          col11: "",
          col12: "",
          col13: "",
          col14: "",
          col15: "",
          total: "RMB 2.0000",
        },
      ],
    };
  },
  methods: {
    spanMethod({ row, columnIndex }) {
      if (row.total) {
        if (!columnIndex) {
          return [1, 1];
        } else if ((columnIndex = 1)) {
          return [1, Object.keys(row).length - 2];
        } else {
          return [0, 0];
        }
      }
      return [1, 1];
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  height: 25px;
  font-size: 18px;
  font-family: Arial;
  font-weight: bold;
  line-height: 21px;
  color: #000000;
  margin-bottom: 20px;
}
.mb-16 {
  margin-bottom: 16px;
}
::v-deep .el-table {
  tr {
    td {
      border: 0;
      .cell {
        font-size: 14px;
      }
    }
  }
  .center-align,
  .end-align {
    font-size: 15px;
    font-weight: bold;
  }
  .end-align {
    padding: 0 28px 0;
    text-align: right;
  }
}
.i-select {
  width: 366px;
  height: 35px;
  background: #ffffff;
  box-shadow: 0px 0px 3px rgba(0, 38, 98, 0.15);
  opacity: 1;
  border-radius: 4px;
}
</style>