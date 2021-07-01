<template>
  <div>
    <div class="chartBox">
      <div class="supplyingTime">
        <div>{{ dataInfo.supplyBeginTime }}</div>
        <!--        供货起始时间-->
        <div>{{ $t('TPZS.GHQSSJ') }}</div>
      </div>
      <div class="massProductionTime" :style="{'left': (this.massProductionTimeRateDot - this.OffsetData) + '%'}">
        <icon symbol name="iconbaojiapingfengenzong-jiedian-cheng" class="iconStyle"/>
        <div class="margin-top12 iconColor">{{ this.massProductionTimeRate }}%</div>
        <!--        量产时间-->
        <div>{{ $t('TPZS.LCSJ') }}</div>
      </div>
      <div class="achievementRate" :style="{'left': (this.achievementRateDot - this.OffsetData) + '%'}">
        <div class="margin-top12 iconColor">{{ this.achievementRate }}%</div>
        <!--        计划量产达成率-->
        <div>{{ $t('TPZS.JHLCDCL') }}</div>
        <icon symbol name="iconVP-jihuazongchanliang" class="iconStyle"/>
      </div>
      <div class="supplyingEndTime">
        <div>{{ dataInfo.supplyEndTime }}</div>
        <!--        供货结束时间-->
        <div>{{ $t('TPZS.GHJSSJ') }}</div>
      </div>
    </div>
    <div class="formBox">
      <div class="left">
        <div class="itemBox">
          <!--          计划产量（截至上月末）-->
          <iLabel :label="$t('TPZS.JHCLJZSYM')" slot="label" class="labelWidth"></iLabel>
          <iText class="valueWidth">{{ dataInfo.planProEndLastMonth }}</iText>
        </div>
        <div class="itemBox">
          <!--          实际累计产量（截至上月末）-->
          <iLabel :label="$t('TPZS.SJLJCL')" slot="label" class="labelWidth"></iLabel>
          <iText class="valueWidth">{{ dataInfo.actualProEndLastMonth }}</iText>
          <template v-if="true">
            <div class="flex-align-center">
              <icon symbol name="iconshangsheng-VP" class="margin-left15 margin-right5"></icon>
              <span class="up">25%</span>
            </div>
          </template>
          <template v-if="false">
            <div class="flex-align-center">
              <icon symbol name="iconxiajiang-VP" class="margin-left15 margin-right5"></icon>
              <span class="down">-25%</span>
            </div>
          </template>

        </div>
        <div class="itemBox">
          <div class="warpBox">
            <!--            Volume Pricing降幅潜力-->
            <iLabel :label="$t('TPZS.VPJFQL')" slot="label" class="labelWidth font-weight">
            </iLabel>
            <el-popover
                placement="top-start"
                trigger="hover"
            >
              <div v-katex="dropPotentialTips"></div>
              <div class="margin-left45 margin-top10">
                <!--                降本单价-->
                <span class="font-weight" style="color:#000305">{{ $t('TPZS.JBDJ') }}</span>
                <span style="color:#4C6C9C">{{ dropPotential.costReductionUnitPrice }}{{ $t('TPZS.YUAN') }}</span>
              </div>
              <icon symbol name="iconxinxitishi" class="tipIcon" slot="reference"></icon>
            </el-popover>
          </div>
          <iText class="valueWidth bgGreen" v-if="dataInfo.reductionPotential < 0">{{
              dataInfo.reductionPotential
            }}
          </iText>
          <iText class="valueWidth bgRed" v-else-if="dataInfo.reductionPotential > 0">{{
              dataInfo.reductionPotential
            }}
          </iText>
          <iText class="valueWidth" v-else>{{ dataInfo.reductionPotential }}</iText>
        </div>
      </div>
      <div class="right">
        <div class="itemBox">
          <!--          计划总产量-->
          <iLabel :label="$t('TPZS.JHZCL')" slot="label" class="labelWidth"></iLabel>
          <iText class="valueWidth">{{ dataInfo.planTotalPro }}</iText>
        </div>
        <div class="itemBox">
          <!--          预计总产量-->
          <iLabel :label="$t('TPZS.YJZCL')" slot="label" class="labelWidth"></iLabel>
          <iInput class="valueWidth" v-model="dataInfo.estimatedActualTotalPro"></iInput>
        </div>
        <div class="itemBox">
          <div class="warpBox">
            <!--            已实现额外降价-->
            <iLabel :label="$t('TPZS.YSXEWJJ')" slot="label" class="labelWidth"></iLabel>
            <el-popover
                placement="top-start"
                trigger="hover"
            >
              <div class="font-weight">{{ $t('TPZS.YSXEWJJ') }}</div>
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
    this.getMathematicalFormulaData();
  },
  data() {
    return {
      massProductionTimeRate: 45,
      massProductionTimeRateDot: 0,
      achievementRate: '',
      achievementRateDot: '',
      OffsetData: 1,
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
      this.achievementRate = this.dataInfo.achievementRate ? this.dataInfo.achievementRate : '';
      this.massProductionTimeRate = this.dataInfo.massProductionRatio ? this.dataInfo.massProductionRatio : '';
      this.achievementRateDot = this.getDotRange(this.achievementRate);
      this.massProductionTimeRateDot = this.getDotRange(this.massProductionTimeRate);
      this.dropPotential = {
        totalPlannedOutputTipsData: this.dataInfo.planTotalPro ? this.dataInfo.planTotalPro : '',
        estimatedTotalProductionTipsData: this.dataInfo.estimatedActualTotalPro
            ? this.dataInfo.estimatedActualTotalPro
            : '',
        fixedCost: this.dataInfo.costProportion ? this.dataInfo.costProportion : '',
        result: this.dataInfo.reductionPotential ? this.dataInfo.reductionPotential : '',
        costReductionUnitPrice: this.dataInfo.costReductionPrice ? this.dataInfo.costReductionPrice : '',
      };
      this.additionalPriceReduction = {
        totalPriceReduction: this.dataInfo.totalPriceReduction ? this.dataInfo.totalPriceReduction : '',
        priceReduction: this.dataInfo.ltcPriceReduction ? this.dataInfo.ltcPriceReduction : '',
        result: this.dataInfo.achievedReductionPrice ? this.dataInfo.achievedReductionPrice : '',
      };
    },
    getDotRange(num) {
      if (num < 10) {
        return 10;
      } else if (num > 82) {
        return 82;
      } else {
        return num;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.chartBox {
  position: relative;
  width: 90%;
  margin: 60px auto 0;
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
    margin-top: 10px;
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
    top: -73px;

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
  margin-top: 90px;

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

    .down {
      color: #70AD47;
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
    margin-top: 20px;
  }
}
</style>
