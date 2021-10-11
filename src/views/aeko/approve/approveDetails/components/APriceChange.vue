<!--
 * @Author: YoHo
 * @Date: 2021-10-09 16:02:48
 * @LastEditTime: 2021-10-11 09:18:10
 * @LastEditors: YoHo
 * @Description: 
-->
<template>
  <div>
    <iCard class="mb-20">
      <p class="title">变动值</p>
      <div>
        A价变动(含分摊):
        <iInput class="price-input" v-model="priceChange" />
      </div>
    </iCard>
    <iCard class="mb-20">
      <div>
        <p>变动值-CBD <span class="small">单位：RMB/Pc.</span></p>
        <iTableCustom
          :data="tableData"
          :columns="setCloum"
          align="center"
        ></iTableCustom>
      </div>
      <hr class="divider" />
      <div>
        <p>2.1 原材料/散件成本</p>
        <el-table :data="partsCostTableData">
          <el-table-column label="原材料/散件成本" align="center">
            <el-table-column
              prop="col1"
              label="#"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="col2"
              label="类型"
              align="center"
            ></el-table-column>
          </el-table-column>
          <el-table-column
            prop="col3"
            label="原材料/散件描述"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="col4"
            label="供应商名称"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="col5"
            label="原产国"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="col6"
            label="是否SVW指定价格散件"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="col7"
            label="数量单位（UoM）"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="col8"
            label="单价(RMB/UoM)"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="col9"
            label="数量(1..n)"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="col10"
            label="直接原材料/散件成本 （RMB/Pc.）"
            align="center"
          ></el-table-column>
          <el-table-column label="物料管理费" align="center">
            <el-table-column
              prop="col11"
              label="（%）"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="col12"
              label="（RMB/Pc.）"
              align="center"
            ></el-table-column>
          </el-table-column>
          <el-table-column
            prop="col13"
            label="原材料/散件成本（RMB/Pc.）"
            align="center"
          ></el-table-column>
        </el-table>
      </div>
      <hr class="divider" />
    </iCard>
  </div>
</template>

<script>
import { iCard, iInput, iTableCustom } from "rise";
export default {
  components: {
    iCard,
    iInput,
    iTableCustom,
  },
  data() {
    return {
      priceChange: 0,
      setCloum: [
        {
          prop: "col1",
          label: "原A价",
          i18n: "原A价",
          customRender: (h, scope) => {
            return (
              <el-tooltip
                content="台账库"
                placement="top"
                effect="light"
                popper-class="custom-card-tooltip"
              >
                <span>{scope.row.col1}</span>
              </el-tooltip>
            );
          },
        },
        {
          prop: "col2",
          label: "A价变动(含分摊)",
          i18n: "A价变动(含分摊)",
        },
        {
          prop: "col3",
          label: "新A价",
          i18n: "新A价",
        },
        {
          prop: "col4",
          label: "原BNK价",
          i18n: "原BNK价",
        },
        {
          prop: "col5",
          label: "新BNK价",
          i18n: "新BNK价",
        },
        {
          prop: "col6",
          label: "模具投资变动",
          i18n: "模具投资变动",
        },
        {
          prop: "col7",
          label: "开发费",
          i18n: "开发费",
        },
        {
          prop: "col8",
          label: "终止费",
          i18n: "终止费",
        },
        {
          prop: "col9",
          label: "样件费",
          i18n: "样件费",
        },
        {
          prop: "col10",
          label: "货币",
          i18n: "货币",
        },
        {
          prop: "col11",
          label: "计量单位",
          i18n: "计量单位",
        },
      ],
      tableData: [
        {
          col1: "test",
          col2: "test1",
          col3: "test2",
          col4: "test3",
          col5: "test4",
        },
      ],
      partsCostTableData: [
        {
          col1: "C1",
          col2: "原材料",
          col3: "PA66",
          col4: "ABC",
          col5: "China",
          col6: "否",
          col7: "KG",
          col8: "47.00",
          col9: "3.5",
          col10: "34.50",
          col11: "2.00",
          col12: "0.69",
          col13: "35.19",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.mb-20 {
  margin-bottom: 20px;
}
.title {
  font-size: 18px;
  font-family: Arial;
  font-weight: bold;
  line-height: 21px;
  color: #000000;
}
.small {
  font-size: 14px;
  font-family: Arial;
  font-weight: 400;
  color: #485465;
  opacity: 0.7;
}
.price-input {
  width: 220px;
  ::v-deep .el-input__inner {
    height: 35px;
    background: #f8f8fa;
    border-radius: 4px;
  }
}
.divider {
  width: 100%;
  height: 0px;
  margin: 30px 0;
  border: 1px dashed #bbc4d6;
}
</style>