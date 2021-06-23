<template>
  <div>
    <div class="chartBox">
      <div class="supplyingTime">
        <div>2019-02</div>
        <div>供货起始时间</div>
      </div>
      <div class="massProductionTime" :style="{'left': (this.massProductionTimeRate - this.OffsetData) + '%'}">
        <icon symbol name="iconbaojiapingfengenzong-jiedian-cheng" class="iconStyle"/>
        <div class="margin-top12 iconColor">{{ this.massProductionTimeRate }}%</div>
        <div>量产时间</div>
      </div>
      <div class="achievementRate" :style="{'left': (this.achievementRate - this.OffsetData) + '%'}">
        <icon symbol name="iconVP-jihuazongchanliang" class="iconStyle"/>
        <div class="margin-top12 iconColor">{{ this.achievementRate }}%</div>
        <div>计划量产达成率</div>
      </div>
      <div class="supplyingEndTime">
        <div>2019-02</div>
        <div>供货结束时间</div>
      </div>
    </div>
    <div class="formBox">
      <div class="left">
        <div class="itemBox">
          <iLabel label="计划产量（截至上月末）" slot="label" class="labelWidth"></iLabel>
          <iText class="valueWidth">{{ dataInfo.planProEndLastMonth }}</iText>
        </div>
        <div class="itemBox">
          <iLabel label="实际累计产量（截至上月末）" slot="label" class="labelWidth"></iLabel>
          <iText class="valueWidth">{{ dataInfo.actualProEndLastMonth }}</iText>
          <icon symbol name="iconshangsheng-VP" class="margin-left15"></icon>
          <span class="up">25%</span>
        </div>
        <div class="itemBox">
          <div class="warpBox">
            <iLabel label="Volume Pricing降幅潜力" slot="label" class="labelWidth font-weight">
            </iLabel>
            <el-popover
                placement="top-start"
                trigger="hover"
            >
              <div v-katex="dropPotentialTips"></div>
              <div class="margin-left45 margin-top10">
                <span class="font-weight" style="color:#000305">降本单价</span>
                <span style="color:#4C6C9C">{{ dropPotential.costReductionUnitPrice }}元</span>
              </div>
              <icon symbol name="iconxinxitishi" class="tipIcon" slot="reference"></icon>
            </el-popover>
          </div>
          <iText class="valueWidth bgGreen" v-if="dataInfo.reductionPotential < 0">{{ dataInfo.reductionPotential }}</iText>
          <iText class="valueWidth bgRed" v-else-if="dataInfo.reductionPotential > 0">{{ dataInfo.reductionPotential }}</iText>
          <iText class="valueWidth" v-else>{{ dataInfo.reductionPotential }}</iText>
        </div>
      </div>
      <div class="right">
        <div class="itemBox">
          <iLabel label="计划总产量" slot="label" class="labelWidth"></iLabel>
          <iText class="valueWidth">{{ dataInfo.planTotalPro }}</iText>
        </div>
        <div class="itemBox">
          <iLabel label="预计总产量" slot="label" class="labelWidth"></iLabel>
          <iInput class="valueWidth">{{ dataInfo.estimatedActualTotalPro }}</iInput>
        </div>
        <div class="itemBox">
          <div class="warpBox">
            <iLabel label="已实现额外降价" slot="label" class="labelWidth"></iLabel>
            <el-popover
                placement="top-start"
                trigger="hover"
            >
              <div class="font-weight">已实现额外降价</div>
              <div v-katex="additionalPriceReductionTips"></div>
              <icon symbol name="iconxinxitishi" class="tipIcon2" slot="reference"></icon>
            </el-popover>
          </div>
          <iText class="valueWidth font-weight">{{ dataInfo.achievedReductionPrice }}</iText>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {icon, iInput, iLabel, iText} from 'rise';
import VueKatex from 'vue-katex';
import 'katex/dist/katex.min.css';

export default {
  components: {
    icon,
    iInput,
    iLabel,
    iText,
  },
  props: {
    dataInfo: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  computed: {
    dropPotentialTips() {
      return `\\begin{array}{l}\\\\\\Delta\\%\\;\\;\\;=\\;\\left(\\frac{\\mathrm{计划总产量}}{\\mathrm{预计总产量}}\\;\\;-\\;1\\right)\\times\\mathrm{固定成本}\\%\\\\\\\\\\;\\;\\;\\;\\;\\;\\;\\;\\;
      =\\left(\\frac{${this.dropPotential.totalPlannedOutputTipsData}}{${this.dropPotential.estimatedTotalProductionTipsData}}-\\;1\\right)\\times${this.dropPotential.fixedCost}\\%\\\\\\\\\\;\\;\\;\\;\\;\\;\\;\\;\\;
      =${this.dropPotential.result}\\%\\\\\\end{array}`;
    },
    additionalPriceReductionTips() {
      return `\\begin{array}{l}\\\\=\\;\\mathrm{总降价}\\;-\\;LTC\\mathrm{降价}\\\\\\\\
      =${this.additionalPriceReduction.totalPriceReduction}\\%\\;-（${this.additionalPriceReduction.priceReduction}\\%）\\\\\\\\
      =${this.additionalPriceReduction.result}\\%\\\\\\end{array}`;
    },
  },
  created() {
    this.getMathematicalFormulaData()
  },
  data() {
    return {
      massProductionTimeRate: 45,
      achievementRate: 65,
      OffsetData: 4,
      dropPotential: {
        totalPlannedOutputTipsData: 200000,
        estimatedTotalProductionTipsData: 250000,
        fixedCost: 22,
        result: -4.4,
        costReductionUnitPrice: -0.88,
      },
      additionalPriceReduction: {
        totalPriceReduction: -3.4,
        priceReduction: -1.4,
        result: -2.0,
      },
    };
  },
  methods: {
    getMathematicalFormulaData() {
      this.dropPotential = {
        totalPlannedOutputTipsData: this.dataInfo.planTotalPro,
        estimatedTotalProductionTipsData: this.dataInfo.estimatedActualTotalPro,
        fixedCost: this.dataInfo.costProportion,
        result: this.dataInfo.reductionPotential,
        costReductionUnitPrice: -0.88,
      };
      this.additionalPriceReduction = {
        totalPriceReduction: -3.4,
        priceReduction: -1.4,
        result: this.dataInfo.achievedReductionPrice,
      };
    },
  },
};
</script>

<style scoped lang="scss">
.chartBox {
  position: relative;
  width: 90%;
  margin: 0 auto;
  height: 5px;
  background: #E8EFFE;
  border-radius: 10px;

  .supplyingTime {
    text-align: center;
    position: absolute;
    bottom: -60px;
    left: -50px;
  }

  .iconStyle {
    font-size: 20px;
  }

  .massProductionTime {
    text-align: center;
    position: absolute;
    bottom: -62px;

    .iconColor {
      color: #ED7D31
    }
  }

  .achievementRate {
    text-align: center;
    position: absolute;
    bottom: -62px;

    .iconColor {
      color: #4C6C9C
    }
  }

  .supplyingEndTime {
    text-align: center;
    position: absolute;
    bottom: -60px;
    right: -50px;
  }
}

.formBox {
  display: flex;
  justify-content: space-between;
  margin-top: 100px;

  .itemBox {
    display: flex;
    align-items: center;
    font-size: 16px;

    .warpBox {
      position: relative;

      .tipIcon {
        position: absolute;
        left: 190px;
        top: 50%;
        transform: translateY(-50%);
      }

      .tipIcon2 {
        position: absolute;
        left: 125px;
        top: 50%;
        transform: translateY(-50%);
      }
    }

    .up {
      color: #C00000;
    }

    .labelWidth {
      width: 250px
    }

    .valueWidth {
      width: 150px;
    }

    .bgGreen {
      background: #70AD47;
      font-size: 16px;
      font-weight: bold;
      color: #FFFFFF;
    }

    .bgRed {
      background: #C00000;
      font-size: 16px;
      font-weight: bold;
      color: #FFFFFF;
    }
  }

  .itemBox + .itemBox {
    margin-top: 35px;
  }
}
</style>
