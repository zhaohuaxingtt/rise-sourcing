<!--
 * @Author: YoHo
 * @Date: 2021-10-09 17:40:38
 * @LastEditTime: 2021-10-11 16:45:28
 * @LastEditors: YoHo
 * @Description: 
-->
<template>
  <iCard class="mb-16">
    <p class="title">模具CBD <span class="small">单位：RMB/Pc.</span></p>
    <el-table :data="tabledata" stripe>
      <el-table-column label="模具ID" prop="col1" align="center">
        <template slot-scope="{ row }">
          <div v-if="row.total" class="center-align">
            <span>TOTAL</span>
          </div>
          <div v-else>
            <span>{{ row.col1 }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="是否分摊" prop="col2" align="center">
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
        label="变更类型"
        prop="col3"
        align="center"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column prop="col4" align="center">
        <template slot-scope="{ row }" slot="header">
          固定资产名称
          <span>
            <icon
              symbol
              class="icon"
              name="iconzengjiacailiaochengben_lan"
            ></icon>
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="col5" align="center">
        <template slot-scope="{ row }" slot="header">
          工艺类型
          <span>
            <icon
              symbol
              class="icon"
              name="iconzengjiacailiaochengben_lan"
            ></icon>
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="col6" align="center">
        <template slot-scope="{ row }" slot="header">
          工模具种类
          <span>
            <icon
              symbol
              class="icon"
              name="iconzengjiacailiaochengben_lan"
            ></icon>
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="col7" align="center">
        <template slot-scope="{ row }" slot="header">
          资产分类编号
          <span>
            <icon
              symbol
              class="icon"
              name="iconzengjiacailiaochengben_lan"
            ></icon>
          </span>
        </template>
      </el-table-column>
      <el-table-column
        label="FS号"
        prop="col8"
        align="center"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column prop="col9" align="center">
        <template slot-scope="{ row }" slot="header">
          散件名称
          <span>
            <icon
              symbol
              class="icon"
              name="iconzengjiacailiaochengben_lan"
            ></icon>
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="col10" align="center">
        <template slot-scope="{ row }" slot="header">
          散件零件号
          <span>
            <icon
              symbol
              class="icon"
              name="iconzengjiacailiaochengben_lan"
            ></icon>
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="col11" align="center">
        <template slot-scope="{ row }" slot="header">
          数量
          <span>
            <icon
              symbol
              class="icon"
              name="iconzengjiacailiaochengben_lan"
            ></icon>
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="col12" align="center">
        <template slot-scope="{ row }" slot="header">
          资产变动单价
          <span>
            <icon
              symbol
              class="icon"
              name="iconzengjiacailiaochengben_lan"
            ></icon>
          </span>
        </template>
      </el-table-column>
      <el-table-column
        label="资产变动总额"
        prop="col13"
        align="center"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column
        label="原零件资产总额"
        prop="col14"
        align="center"
        :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column
        label="新零件资产总额"
        prop="col15"
        align="center"
        :show-overflow-tooltip="true"
      ></el-table-column>
    </el-table>
    <el-form inline class="mould-form" label-position="right">
      <el-form-item class="mould-form-item" label="总投资变动成本：">
        <iText class="mould-iText">{{params.prop1}}</iText>
      </el-form-item>
      <el-form-item class="mould-form-item" label="分摊投资变动成本：">
        <iText class="mould-iText">{{params.prop2}}</iText>
      </el-form-item>
      <el-form-item class="mould-form-item" label="分摊数量：">
        <iText class="mould-iText">{{params.prop3}}</iText>
      </el-form-item>
      <el-form-item class="mould-form-item" label="单件投资变动成本：">
        <iText class="mould-iText">{{params.prop4}}</iText>
      </el-form-item>
      <!-- <div class="mould-form-item">
        <span class="mould-form-item"></span>
        <iText class="mould-iText">{{params.prop2}}</iText>
      </div>
      <div class="mould-form-item">
        <span class="mould-form-item"></span>
        <iText class="mould-iText">{{params.prop3}}</iText>
      </div>
      <div class="mould-form-item">
        <span class="mould-form-item"></span>
        <iText class="mould-iText">{{params.prop4}}</iText>
      </div> -->
    </el-form>
  </iCard>
</template>

<script>
import { iCard, iTableCustom, iInput, icon, iText } from "rise";
export default {
  components: {
    iCard,
    iTableCustom,
    iInput,
    icon,
    iText
  },
  data() {
    return {
      params:{
        prop1:'550,000.00',
        prop2:'170,000.00',
        prop3:'10,000',
        prop4:'17.00',
      },
      tabledata: [
        {
          col1: "ID-1",
          col2: "否",
          col3: "修模",
          col4: "ABCDEFGHIJKL",
          col5: "注塑",
          col6: "盖板注塑模",
          col7: "13",
          col8: "AK2100001",
          col9: "壳体",
          col10: "Xxx",
          col11: "1",
          col12: "9,000.00",
          col13: "150,000.00",
          col14: "150,000.00",
          col15: "150,000.00",
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
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.title {
  font-size: 18px;
  font-family: Arial;
  font-weight: bold;
  line-height: 21px;
  color: #000000;
  .small {
    font-size: 14px;
    font-family: Arial;
    font-weight: 400;
    color: #485465;
    opacity: 0.7;
  }
}

.icon {
  font-size: 17px;
}
.mould-form{
  width: 100%;
  margin-top: 30px;
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  .mould-form-item{
    margin-right: 0;
    ::v-deep .el-form-item__label{
      font-size: 14px;
      font-family: Arial;
      font-weight: 400;
      color: #000000;
    }
  }
  .mould-iText{
    width: 240px;
    height: 35px;
  }
}
</style>