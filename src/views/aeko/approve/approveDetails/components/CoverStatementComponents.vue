<template>
  <div>
    <i-card>
      <span class="card-title">封面表态 - 待审批</span>
      <i-form-group row='1'>
        <!--第一行-->
        <el-row :gutter='20'>
          <el-col :span='6'>
            <i-form-item label="是否Top:">
              <i-text>是</i-text>
            </i-form-item>
          </el-col>
          <el-col :span='6'>
            <i-form-item label="是否相关:">
              <i-text>是</i-text>
            </i-form-item>
          </el-col>
          <el-col :span='6'>
            <i-form-item label="更改零件名称:">
              <i-text>是</i-text>
            </i-form-item>
          </el-col>
          <el-col :span='6'>
            <i-form-item label="主要供应商:">
              <i-text>是</i-text>
            </i-form-item>
          </el-col>
        </el-row>
        <!--第二行-->
        <el-row :gutter='20'>
          <el-col :span='6'>
            <i-form-item label="新首批送样周期(周数):">
              <i-text>是</i-text>
            </i-form-item>
          </el-col>
          <el-col :span='6'>
            <i-form-item label="影响进度:">
              <i-text>是</i-text>
            </i-form-item>
          </el-col>
          <el-col :span='6'>
            <i-form-item label="指定前期采购:">
              <i-text>是</i-text>
            </i-form-item>
          </el-col>
          <el-col :span='6'>
            <i-form-item label="封面状态:">
              <i-text>是</i-text>
            </i-form-item>
          </el-col>
        </el-row>
        <!--第三行行-->
        <el-row :gutter='20'>
          <div class="margin-left10">备注:</div>
          <i-input class="margin-top10 margin-left10" type="textarea" v-model="textarea" :rows="8" disabled>
          </i-input>
        </el-row>
      </i-form-group>

      <el-table :data="modelProjectList" border class="margin-top30" :summary-method="getSummaries" show-summary
                :row-class-name="rowClassName">
        <el-table-column
            type="index"
            label="#"
            align="center">
        </el-table-column>
        <el-table-column
            prop="name"
            align="center"
            label="车型项目/车型"
        >
        </el-table-column>
        <el-table-column
            prop="amount1"
            align="center"
            label="增加材料成本(RMB/车)"
        >
        </el-table-column>
        <el-table-column
            prop="amount2"
            align="center"
            label="增加投资费用(不含税)"
        >
        </el-table-column>
        <el-table-column
            prop="amount3"
            align="center"
            label="其它费用(不含税)"
        >
        </el-table-column>
      </el-table>

      <div class="margin-top30 card-bottom-tip">Top-Aeko / Top-MP：|ΔGesamt Materialkosten| ≥35 RMB oder Invest≥10,000,000 RMB; Top-AeA: ΔGesamt Materialkosten ≥35 RMB oder Invest≥10,000,000 RMB</div>

    </i-card>

  </div>
</template>

<script>
import { iInput, iCard, iFormItem, iFormGroup, iText} from "rise"

export default {
  name: "CoverStatementComponents",
  components: {
    iCard,
    iFormItem,
    iText,
    iInput,
    iFormGroup,
  },
  data() {
    return {
      textarea: 'CSX-张三：ACTION: ENOIVHRI NLIARFO; Efor the vehicles without nm lesnvelkvnsk.nvaCNEO WRNIRENVETRIGGENMOCE HFOW EFOWH FHEUFHIFH HHFOIHRED BY (VNRENVIRE;RENMFF H489HRWOI N4 43JTI43 JTT4J3T94 EFOWH FHEUFHIFH HHFOIHRED  NCFE NDIOFNOIJMOMJOMO\n' +
          'CSX-罗伊：ACTION: ENOIVHRI NLIARFO; Efor the vehicles without nm lesnvelkvnsk.nvaCNEO WRNIRENVETRIGGENMOCE HFOW EFOWH FHEUFHIFH HHFOIHRED BY (VNRENVIRE;RENMFF H489HRWOI N4 43JTI43 JTT4J3T94 EFOWH FHEUFHIFH HHFOIHRED  NCFE NDIOFNOIJMOMJOMO\n' +
          'CSI-李四： FNEKRUOT4I83RU9 RHFQ[83 R4HG  084 T438 T1T94 UR19XRJ9 UT Pre-series release vehicles (VFF) HR 4H3R  HH43U 43HIOJFT4OI3JTR 43JTI43 JTT4J3T94 JRJTIF43JMJPOT43 NUVEUOVHVN  FHF 3NOIF 43 3ROIJ 4JR09 HT34NIOQ RJ4IHF43I FI4 BIUEVAICEN V;OIUFH;O NOIRF \n' +
          'SK-BU-王五：  FN48 U093RUR MCU9U4MC FIHH FJ094J FESJ VG904[3QJF DIE R34 O4HFOI4NFI H4R8 JIO JF9R NFCEJOIRF OIJEW  FJ4 FJOIERJFIO4 FOI4 F;OIQ34 JFOIGNFOI43 FJ49R0 JW JJ49 JR4J43\n' +
          'WVHERBV\n' +
          '\n' +
          'CSI-李四： FNEKRUOT4I83RU9 RHFQ[83 R4HG  084 T438 T1T94 UR19XRJ9 UT Pre-series release vehicles (VFF) HR 4H3R  HH43U 43HIOJFT4OI3JTR 43JTI43 JTT4J3T94 JRJTIF43JMJPOT43 NUVEUOVHVN  FHF 3NOIF 43 3ROIJ 4JR09 HT34NIOQ RJ4IHF43I FI4 BIUEVAICEN V;OIUFH;O NOIRF \n' +
          'SK-BU-王五：  FN48 U093RUR MCU9U4MC FIHH FJ094J FESJ VG904[3QJF DIE R34 O4HFOI4NFI H4R8 JIO JF9R NFCEJOIRF OIJEW  FJ4 FJOIERJFIO4 FOI4 F;OIQ34 JFOIGNFOI43 FJ49R0 JW JJ49 JR4J43\n' +
          'WVHERBV',

      modelProjectList: [{
        name: '王小虎',
        amount1: '234',
        amount2: '3.2',
        amount3: 10
      }, {
        name: '王小虎',
        amount1: '165',
        amount2: '4.43',
        amount3: 12
      }, {
        name: '王小虎',
        amount1: '324',
        amount2: '1.9',
        amount3: 9
      }, {
        name: '王小虎',
        amount1: '621',
        amount2: '2.2',
        amount3: 17
      }, {
        name: '王小虎',
        amount1: '539',
        amount2: '4.1',
        amount3: 15
      }],

    }
  },
  methods: {
    rowClassName({ row, rowIndex }) {
      if (rowIndex == this.modelProjectList.length-1) {
        return 'lastCelStyle'
      }
      return ''
    },
    getSummaries(param) {
      const {columns, data} = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 1) {
          sums[index] = 'TOTAL';
          return;
        }
        const values = data.map(item => Number(item[column.property]));
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
        }
      });
      return sums;
    }
  }
}
</script>

<style scoped lang="scss">
.card-title {
  font-size: 18px;
  font-family: Arial;
  font-weight: bold;
}

.lastCelStyle {
  font-size: 14px;
  font-family: Arial;
  font-weight: bold;
  color: black;
}
.card-bottom-tip{
  font-size: 14px;
  font-family: Arial;
  font-weight: 400;
  color: #8C96A7;
}
</style>