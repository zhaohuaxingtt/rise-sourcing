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
        <div class="margin-top6 iconColor" style="line-height: 16px">{{ this.massProductionTimeRate }}%</div>
        <!--        量产时间-->
        <div style="line-height: 16px">{{ $t('TPZS.LCSJ') }}</div>
      </div>
      <div class="achievementRate" :style="{'left': (this.achievementRateDot - this.OffsetData) + '%'}">
        <div class="iconColor" style="line-height: 16px">{{ this.achievementRate }}%</div>
        <!--        计划量产达成率-->
        <div style="line-height: 16px">{{ $t('TPZS.JHLCDCL') }}</div>
        <icon symbol name="iconVP-jihuazongchanliang" class="iconStyle margin-top6"/>
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
          <template v-if="dataInfo.proGrowthRate > 0">
            <div class="flex-align-center">
              <icon symbol name="iconshangsheng-VP" class="margin-left15 margin-right5"></icon>
              <span class="up">{{ dataInfo.proGrowthRate }}%</span>
            </div>
          </template>
          <template v-else-if="dataInfo.proGrowthRate < 0">
            <div class="flex-align-center">
              <icon symbol name="iconxiajiang-VP" class="margin-left15 margin-right5"></icon>
              <span class="down">{{ dataInfo.proGrowthRate }}%</span>
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
              <div class="formula">
                <div class="row1">
                  <div class="icon">Δ%</div>
                  <div class="equal">=</div>
                  <div class="left-bracket">（</div>
                  <div class="division">
                    <div class="item item-top">{{ this.$t('TPZS.JIHUAZHONGCHANLIANG') }}</div>
                    <div class="item">{{this.$t('TPZS.YUJIZONGCHANLIANG')}}</div>
                  </div>
                  <div class="subduction"></div>
                  <div class="subduction-num">1</div>
                  <div class="right-bracket">）</div>
                  <div class="multiply">✖️</div>
                  <div class="multiply-num">{{this.$t('TPZS.GUDINGCHENGBEN')}}%</div>
                </div>
                <div class="row2">
                  <div class="equal">=</div>
                  <div class="left-bracket">（</div>
                  <div class="division">
                    <div class="item item-top">{{ this.dropPotential.totalPlannedOutputTipsData }}</div>
                    <div class="item">{{this.dropPotential.estimatedTotalProductionTipsData}}</div>
                  </div>
                  <div class="subduction"></div>
                  <div class="subduction-num">1</div>
                  <div class="right-bracket">）</div>
                  <div class="multiply">✖️</div>
                  <div class="multiply-num">{{this.dropPotential.fixedCost}}%</div>
                </div>
                <div class="row2">
                  <div class="equal">=</div>
                  <div class="result">{{this.dropPotential.result}}%</div>
                </div>
              </div>
<!--              <div v-katex="dropPotentialTips"></div>-->
              <div class="margin-left32 margin-top10">
                <!--                降本单价-->
                <span class="font-weight" style="color:#000305">{{ $t('TPZS.JBDJ') }}</span>
                <span style="color:#4C6C9C">{{ dropPotential.costReductionUnitPrice }}{{ $t('TPZS.YUAN') }}</span>
              </div>
              <icon symbol name="iconxinxitishi" class="tipIcon" slot="reference"></icon>
            </el-popover>
          </div>
          <iText class="valueWidth bgGreen" v-if="dataInfo.reductionPotential < 0">
            {{ dataInfo.reductionPotential }}%
          </iText>
          <iText class="valueWidth bgRed" v-else-if="dataInfo.reductionPotential > 0">
            {{ dataInfo.reductionPotential }}%
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
      //计划总产量
      //预计总产量
      //固定成本
      return `\\begin{array}{l}\\\\\\Delta\\%\\;\\;\\;=\\;\\left(\\frac{\\mathrm{${this.$t('TPZS.JIHUAZHONGCHANLIANG')}}}{\\mathrm{${this.$t('TPZS.YUJIZONGCHANLIANG')}}}\\;\\;-\\;1\\right)\\times\\mathrm{${this.$t('TPZS.GUDINGCHENGBEN')}}\\%\\\\\\\\\\;\\;\\;\\;\\;\\;\\;\\;\\;
      =\\left(\\frac{${this.dropPotential.totalPlannedOutputTipsData}}{${this.dropPotential.estimatedTotalProductionTipsData}}-\\;1\\right)\\times${this.dropPotential.fixedCost}\\%\\\\\\\\\\;\\;\\;\\;\\;\\;\\;\\;\\;
      =${this.dropPotential.result}\\%\\\\\\end{array}`;
    },
    additionalPriceReductionTips() {
      //总降价
      //降价
      return `\\begin{array}{l}\\\\=\\;\\mathrm{${this.$t('TPZS.ZONGJIANGJIA')}}\\;-\\;LTC\\mathrm{${this.$t('TPZS.JIANGJIA')}}\\\\\\\\
      =${this.additionalPriceReduction.totalPriceReduction}\\%\\;-（${this.additionalPriceReduction.priceReduction}\\%）\\\\\\\\
      =${this.additionalPriceReduction.result}\\%\\\\\\end{array}`;
    },
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
  watch: {
    dataInfo: {
      deep: true,
      handler() {
        this.getMathematicalFormulaData();
      },
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
    font-size: 20px;
  }

  .massProductionTime {
    text-align: center;
    position: absolute;
    bottom: -66px;
    height: 80px;
    .iconColor {
      color: #ED7D31
    }
  }

  .achievementRate {
    text-align: center;
    position: absolute;
    top: -57px;
    height: 80px;

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
.formula{
  .row1{
    display: flex;
    .subduction{
      width: 10px;
      height: 2px;
      background: black;
      margin: 22px 10px 0;
    }
  }
  .left-bracket{
    margin-left: -15px;
  }
  .left-bracket,.right-bracket{
    font-size: 40px;
  }
  .item{
   padding: 0 20px;
  }
  .item-top{
    border-bottom: 1px solid black;
  }
  .subduction-num{
    margin-top: 12px;
  }
  .multiply{
    margin-left: -10px;
    margin-top: 15px;
  }
  .multiply-num{
    margin-left: 5px;
    margin-top: 14px;
  }
  .icon{
    margin-top: 13px;
    width: 22px;
  }
  .equal{
    margin-top: 9px;
    margin-left: 7px;
    font-size: 20px;
  }
  .row2{
    display: flex;
    .equal{
      margin-left: 29px;
    }
    .subduction{
      width: 10px;
      height: 2px;
      background: black;
      margin: 20px 10px 0;
    }
    .subduction-num{
      margin-top: 10px;
    }
    .result{
      margin-left: 10px;
      margin-top: 13px;
    }
  }
}
</style>
