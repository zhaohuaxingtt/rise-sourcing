<!--
 * @Author: YoHo
 * @Date: 2021-10-09 17:40:38
 * @LastEditTime: 2021-10-09 18:19:00
 * @LastEditors: YoHo
 * @Description: 
-->
<template>
  <iCard class="mb-16">
    <p class="title">模具CBD</p>
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
</template>

<script>
import { iCard, iTableCustom } from "rise";
export default {
  components: {
    iCard,
    iTableCustom,
  },
  data() {
    return {
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
};
</script>

<style lang="scss" scoped>
</style>