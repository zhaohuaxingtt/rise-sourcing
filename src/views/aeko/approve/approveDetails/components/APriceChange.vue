<!--
 * @Author: YoHo
 * @Date: 2021-10-09 16:02:48
 * @LastEditTime: 2021-10-11 19:01:06
 * @LastEditors: YoHo
 * @Description: 
-->
<template>
  <div>
    <iCard class="mb-20">
      <p class="title">变动值</p>
      <el-form inline>
        <el-form-item label="A价变动(含分摊):">
          <div class="price-itext">
            <iText>{{ priceChange }}</iText>
          </div>
        </el-form-item>
      </el-form>
    </iCard>
    <iCard class="mb-20">
      <div>
        <p class="title mb-20">
          变动值-CBD <span class="small">单位：RMB/Pc.</span>
        </p>
        <iTableCustom
          :data="tableData"
          :columns="setCloum"
          align="center"
        ></iTableCustom>
      </div>
      <hr class="divider" />
      <div>
        <p class="title">2.1 原材料/散件成本</p>
        <el-table :data="partsCostTableData" stripe :span-method="spanMethod">
          <el-table-column
            v-for="(item, index) in partsCostTableTitle"
            :key="index"
            :prop="item.prop"
            :label="item.label"
            :width="item.width"
            :min-width="minWidth"
            align="center"
          >
            <template v-if="item.children.length > 0">
              <el-table-column
                v-for="(child, cindex) in item.children"
                :key="cindex"
                :prop="child.prop"
                :label="child.label"
                :width="child.width"
                align="center"
              >
                <template slot-scope="{ row }">
                  <template v-if="child.isNew">
                    <icon
                      symbol
                      v-if="row.isNew"
                      class="icon"
                      name="iconxinlingjianCBD"
                    />
                  </template>
                  <template>{{ row[child.prop] }}</template>
                </template>
              </el-table-column>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <hr class="divider" />
      <div>
        <p class="title">2.2 制造成本</p>
        <el-table :data="manufacturingCostTableData" stripe :span-method="spanMethod">
          <el-table-column
            v-for="(item, index) in manufacturingCostTableTitle"
            :key="index"
            :prop="item.prop"
            :label="item.label"
            :width="item.width"
            :min-width="minWidth"
            align="center"
          >
            <template v-if="item.children.length > 0">
              <el-table-column
                v-for="(child, cindex) in item.children"
                :key="cindex"
                :prop="child.prop"
                :label="child.label"
                :width="child.width"
                align="center"
              >
                <template slot-scope="{ row }">
                  <template v-if="child.isNew">
                    <icon
                      symbol
                      v-if="row.isNew"
                      class="icon"
                      name="iconxinlingjianCBD"
                    />
                  </template>
                  <template>{{ row[child.prop] }}</template>
                </template>
              </el-table-column>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <hr class="divider" />
      <div class="flexBox">
        <div>
          <p class="title mb-20">2.3 报废成本</p>
          <el-table :data="scrapCostTable">
            <el-table-column
              prop="col1"
              label="#"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="col2"
              label="报废成本"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="col3"
              label="原报废率(%)"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="col4"
              label="现报废率(%)"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="col5"
              label="变动金额(RMB/Pc.)"
              align="center"
            ></el-table-column>
          </el-table>
        </div>
        <div>
          <p class="title mb-20">2.4 管理费</p>
          <el-table :data="managementFeeTable">
            <el-table-column
              prop="col1"
              label="#"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="col2"
              label="管理费"
              align="center"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="col3"
              label="原比例(%)"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="col4"
              label="现比例(%)"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="col5"
              label="变动金额(RMB/Pc.)"
              align="center"
            ></el-table-column>
          </el-table>
        </div>
      </div>
      <hr class="divider" />
      <div class="flexBox">
        <div>
          <p class="title mb-20">2.5 其他费用</p>
          <el-table :data="OtherFeesTable">
            <el-table-column
              prop="col1"
              label="#"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="col2"
              label="其他费用"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="col3"
              label="金额"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="col4"
              label="分摊数量(1..n)"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="col5"
              label="分摊金额(RMB/Pc.)"
              align="center"
            ></el-table-column>
          </el-table>
        </div>
        <div>
          <p class="title mb-20">2.6 利润</p>
          <el-table :data="ProfitTable">
            <el-table-column
              prop="col1"
              label="#"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="col2"
              label="利润"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="col3"
              label="原比例(%)"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="col4"
              label="现比例(%)"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="col5"
              label="变动金额(RMB/Pc.)"
              align="center"
            ></el-table-column>
          </el-table>
        </div>
      </div>
    </iCard>
  </div>
</template>

<script>
import { iCard, iText, iTableCustom, icon } from "rise";
import { changesValueCBD, partsCostTableTitle, manufacturingCostTableTitle } from "../data.js";
export default {
  components: {
    iCard,
    iText,
    iTableCustom,
    icon,
  },
  data() {
    return {
      priceChange: 0,
      setCloum: changesValueCBD,
      tableData: [
        {
          isTop: true,
          col1: "test",
          col2: "test1",
          col3: "test2",
          col4: "test3",
          col5: "test4",
        },
      ],
      // 原材料/散件成本
      partsCostTableTitle: partsCostTableTitle,
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
          isNew: true,
        },
      ],
      // 制造成本
      manufacturingCostTableTitle: manufacturingCostTableTitle,
      manufacturingCostTableData: [
        {
          col1: "P1",
          col2: "Injection Molding",
          col3: "C1",
          col4: "Haitian 120T",
          col5: "350,000",
          col6: "30.00",
          col7: "2",
          col8: "25.00",
          col9: "2",
          col10: "120,000",
          col11: "4.09",
          col12: "0.02",
          col13: "10.00",
          col14: "10.00",
        },
        {
          col1: "P1",
          col2: "Injection Molding",
          col3: "C1",
          col4: "Haitian 120T",
          col5: "350,000",
          col6: "30.00",
          col7: "2",
          col8: "25.00",
          col9: "2",
          col10: "120,000",
          col11: "4.09",
          col12: "0.02",
          col13: "10.00",
          col14: "10.00",
          isNew: true,
        },
      ],
      // 报废成本
      scrapCostTable: [
        {
          col1: "S1",
          col2: "整体报废成本变动",
          col3: "2.00",
          col4: "2.00",
          col5: "0.00",
        },
      ],
      // 管理费
      managementFeeTable: [
        {
          col1: "O1",
          col2: "原材料与散件(不含SVW指定散件)管理费",
          col3: "2.00",
          col4: "2.00",
          col5: "0.00",
        },
      ],
      // 其它费用
      OtherFeesTable: [
        {
          col1: "A1",
          col2: "分摊开发费",
          col3: "50,000",
          col4: "10,000",
          col5: "5.00",
        },
      ],
      // 利润
      ProfitTable: [
        {
          col1: "P1",
          col2: "利润(不含SVW指定散件)",
          col3: "10.00",
          col4: "13.20",
          col5: "0.00",
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
  color: #000000;
  margin-bottom: 30px;
  .small {
    font-size: 14px;
    font-family: Arial;
    font-weight: 400;
    color: #485465;
    opacity: 0.7;
  }
}
.price-itext {
  width: 220px;
  height: 35px;
}
.icon {
  font-size: 17px;
}
.divider {
  width: 100%;
  height: 0px;
  margin: 30px 0;
  border: 1px dashed #bbc4d6;
}

.flexBox {
  display: flex;
  flex-wrap: wrap;

  & > div {
    width: 50%;
    box-sizing: border-box;

    &:nth-of-type(odd) {
      ::v-deep .topCutLine {
        margin-right: 2px;
      }
      padding-right: 55px;
    }

    &:nth-of-type(even) {
      ::v-deep .topCutLine {
        margin-left: 2px;
      }
      padding-left: 55px;
    }

    &:last-of-type:not(&:nth-of-type(even)) {
      ::v-deep .topCutLine {
        width: 200%;
      }
    }
  }
}
</style>