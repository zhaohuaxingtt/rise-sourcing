<template>
  <div>
    <div class="chartBox">
      <div class="supplyingTime">
        <div>{{ dataInfo.supplyBeginTime ? moment(dataInfo.supplyBeginTime).format('YYYY-MM') : '' }}</div>
        <!--        供货起始时间-->
        <div>{{ $t('TPZS.GHQSSJ') }}</div>
      </div>
      <div class="massProductionTime" :style="{'left': (this.massProductionTimeRateDot) + '%'}">
        <!--        <icon symbol name="iconbaojiapingfengenzong-jiedian-cheng" class="iconStyle"/>-->
        <img src="./images/orange.png" class="iconStyle" style="width: 16px; height: 16px">
        <div style="margin-left: -50%; text-align: center">
          <div class="margin-top26 iconColor" style="line-height: 16px;text-align: center">
            {{ this.massProductionTimeRate }}%
          </div>
          <!--        量产时间-->
          <div style="line-height: 16px;white-space: nowrap">{{ $t('TPZS.LCSJ') }}</div>
        </div>
      </div>
      <div class="achievementRate" :style="{'left': (this.achievementRateDot) + '%'}">
        <!--        <icon symbol name="iconVP-jihuazongchanliang" class="iconStyle"/>-->
        <img src="./images/blue.png" class="iconStyle" style="width: 16px; height: 16px">
        <div style="margin-left: -75%; text-align: center">
          <div class="iconColor" style="line-height: 16px; margin-top: -36px;text-align: center">{{
              this.achievementRate
            }}%
          </div>
          <!--        计划量产达成率-->
          <div style="line-height: 16px;white-space: nowrap">{{ $t('TPZS.JHLCDCL') }}</div>
        </div>
      </div>
      <div class="supplyingEndTime">
        <div>{{ dataInfo.supplyEndTime ? moment(dataInfo.supplyEndTime).format('YYYY-MM') : '' }}</div>
        <!--        供货结束时间-->
        <div>{{ $t('TPZS.GHJSSJ') }}</div>
      </div>
    </div>
    <div class="formBox">
      <div class="left">
        <div class="itemBox">
          <!--          计划产量（截至上月末）-->
          <iLabel :label="$t('TPZS.JHCLJZSYM')" slot="label" class="labelWidth"></iLabel>
          <iText class="valueWidth">{{ toThousands(dataInfo.planProEndLastMonth) }}</iText>
        </div>
        <div class="itemBox">
          <!--          实际累计产量（截至上月末）-->
          <iLabel :label="$t('TPZS.SJLJCL')" slot="label" class="labelWidth"></iLabel>
          <iText class="valueWidth">{{ toThousands(dataInfo.actualProEndLastMonth) }}</iText>
          <template v-if="dataInfo.proGrowthRate2 > 0">
            <div class="flex-align-center">
              <!--              <icon symbol name="iconshangsheng-VP" class="margin-left15 margin-right5"></icon>-->
              <img src="./images/upload.png" class="margin-left15 margin-right5" style="width: 10px; height: 10px">
              <span class="up">{{ toFixedNumber(dataInfo.proGrowthRate2, 2) }}%</span>
            </div>
          </template>
          <template v-else-if="dataInfo.proGrowthRate2 < 0">
            <div class="flex-align-center">
              <!--              <icon symbol name="iconxiajiang-VP" class="margin-left15 margin-right5"></icon>-->
              <img src="./images/down.png" class="margin-left15 margin-right5" style="width: 10px; height: 10px">
              <span class="down">{{ toFixedNumber(dataInfo.proGrowthRate2, 2) }}%</span>
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
                    <div class="item">{{ this.$t('TPZS.YUJIZONGCHANLIANG') }}</div>
                  </div>
                  <div class="subduction"></div>
                  <div class="subduction-num">1</div>
                  <div class="right-bracket">）</div>
                  <div class="multiply">✖️</div>
                  <div class="multiply-num">{{ this.$t('TPZS.GUDINGCHENGBEN') }}%</div>
                </div>
                <div class="row2">
                  <div class="equal">=</div>
                  <div class="left-bracket">（</div>
                  <div class="division">
                    <div class="item item-top">{{ this.dropPotential.totalPlannedOutputTipsData }}</div>
                    <div class="item">{{ this.dropPotential.estimatedTotalProductionTipsData }}</div>
                  </div>
                  <div class="subduction"></div>
                  <div class="subduction-num">1</div>
                  <div class="right-bracket">）</div>
                  <div class="multiply">✖️</div>
                  <div class="multiply-num">{{ toFixedNumber(this.dropPotential.fixedCost, 2) }}%</div>
                </div>
                <div class="row2">
                  <div class="equal">=</div>
                  <div class="result">{{ toFixedNumber(this.dropPotential.result, 2) }}%</div>
                </div>
              </div>
              <!--              <div v-katex="dropPotentialTips"></div>-->
              <div class="margin-left32 margin-top10">
                <!--                降本单价-->
                <span class="font-weight" style="color:#000305">{{ $t('TPZS.JBDJ') }}</span>
                <span style="color:#4C6C9C">{{ toFixedNumber(dropPotential.costReductionUnitPrice, 2) }}{{
                    $t('TPZS.YUAN')
                  }}</span>
              </div>
              <icon symbol name="iconxinxitishi" class="tipIcon" slot="reference"></icon>
            </el-popover>
          </div>
          <iText class="valueWidth bgGreen" v-if="dataInfo.reductionPotential < 0">
            {{ toFixedNumber(dataInfo.reductionPotential, 2) }}%
          </iText>
          <iText class="valueWidth bgRed" v-else-if="dataInfo.reductionPotential > 0">
            {{ toFixedNumber(dataInfo.reductionPotential, 2) }}%
          </iText>
          <iText class="valueWidth" v-else>{{ toFixedNumber(dataInfo.reductionPotential, 2) }}</iText>
        </div>
      </div>
      <div class="right">
        <div class="itemBox">
          <!--          计划总产量-->
          <iLabel :label="$t('TPZS.JHZCL')" slot="label" class="labelWidth"></iLabel>
          <iText class="valueWidth">{{ toThousands(dataInfo.planTotalPro) }}</iText>
        </div>
        <div class="itemBox">
          <!--          预计总产量-->
          <iLabel :label="$t('TPZS.YJZCL')" slot="label" class="labelWidth"></iLabel>
          <iInput class="valueWidth estimatedActualTotalPro"
                  v-model="dropPotential.estimatedActualTotalPro"
                  v-if="!disabledEstimatedActualTotalPro"
                  @blur="inputMoneyFormat($event, 'estimatedActualTotalPro')"
          ></iInput>
          <iText class="valueWidth" v-else>{{ toThousands(dropPotential.estimatedActualTotalPro) }}</iText>
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
          <iText class="valueWidth font-weight">{{
              toThousands(toFixedNumber(dataInfo.achievedReductionPrice, 2))
            }}%
          </iText>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {icon, iInput, iLabel, iText} from 'rise';
import moment from 'moment';
import VueKatex from 'vue-katex';
import 'katex/dist/katex.min.css';
import {toThousands, deleteThousands, toFixedNumber} from '@/utils';

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
    disabledEstimatedActualTotalPro: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    dropPotentialTips() {
      //计划总产量
      //预计总产量
      //固定成本
      return `\\begin{array}{l}\\\\\\Delta\\%\\;\\;\\;=\\;\\left(\\frac{\\mathrm{${this.$t(
          'TPZS.JIHUAZHONGCHANLIANG')}}}{\\mathrm{${this.$t(
          'TPZS.YUJIZONGCHANLIANG')}}}\\;\\;-\\;1\\right)\\times\\mathrm{${this.$t('TPZS.GUDINGCHENGBEN')}}\\%\\\\\\\\\\;\\;\\;\\;\\;\\;\\;\\;\\;
      =\\left(\\frac{${this.dropPotential.totalPlannedOutputTipsData}}{${this.dropPotential.estimatedTotalProductionTipsData}}-\\;1\\right)\\times${this.dropPotential.fixedCost}\\%\\\\\\\\\\;\\;\\;\\;\\;\\;\\;\\;\\;
      =${this.toFixedNumber(this.dropPotential.result, 2)}\\%\\\\\\end{array}`;
    },
    additionalPriceReductionTips() {
      //总降价
      //降价
      return `\\begin{array}{l}\\\\=\\;\\mathrm{${this.$t('TPZS.ZONGJIANGJIA')}}\\;-\\;LTC\\mathrm{${this.$t(
          'TPZS.JIANGJIA')}}\\\\\\\\
      =${this.toFixedNumber(this.additionalPriceReduction.totalPriceReduction, 2)}\\%\\;-（${this.toFixedNumber(
          this.additionalPriceReduction.priceReduction, 2)}\\%）\\\\\\\\
      =${this.toFixedNumber(this.additionalPriceReduction.result, 2)}\\%\\\\\\end{array}`;
    },
  },
  mounted() {
    this.getMathematicalFormulaData();
  },
  data() {
    return {
      massProductionTimeRate: 45,
      massProductionTimeRateDot: 0,
      achievementRate: '',
      achievementRateDot: '',
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
    toFixedNumber,
    toThousands,
    moment(date) {
      return moment(date);
    },
    getMathematicalFormulaData() {
      this.achievementRate = this.dataInfo.achievementRate;
      this.massProductionTimeRate = this.dataInfo.massProductionRatio;
      this.achievementRateDot = this.getDotRange(this.achievementRate);
      this.massProductionTimeRateDot = this.getDotRange(this.massProductionTimeRate);
      this.dropPotential = {
        totalPlannedOutputTipsData: this.dataInfo.planTotalPro,
        estimatedTotalProductionTipsData: this.dataInfo.estimatedActualTotalPro
            ? this.dataInfo.estimatedActualTotalPro
            : '',
        estimatedActualTotalPro: toThousands(this.dataInfo.estimatedActualTotalPro),
        fixedCost: this.dataInfo.costProportion,
        result: this.dataInfo.reductionPotential,
        costReductionUnitPrice: this.dataInfo.costReductionPrice,
      };
      this.additionalPriceReduction = {
        totalPriceReduction: this.dataInfo.totalPriceReduction,
        priceReduction: this.dataInfo.ltcPriceReduction,
        result: this.dataInfo.achievedReductionPrice,
      };
    },
    getDotRange(num) {
      if (num < 0) {
        return 0;
      } else if (num > 100) {
        return 100;
      } else {
        return num;
      }
    },
    getInputValue(el) {
      let inputVal = el.target.value || '';
      return toThousands(deleteThousands(inputVal));
    },
    inputMoneyFormat(el, name) {
      this.dropPotential[name] = this.getInputValue(el);
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
  width: 65%;
  margin: 60px auto 0;
  height: 5px;
  background: #E8EFFE;
  border-radius: 10px;

  .supplyingTime {
    text-align: center;
    position: absolute;
    bottom: -3.45rem;
    left: -140px;
  }

  .iconStyle {
    position: absolute;
    /*left: 50%;
    transform: translateX(-50%);*/
    width: 20px;
    height: 20px;
    font-size: 20px;
  }

  .massProductionTime {
    text-align: left;
    position: absolute;
    bottom: -4.15rem;
    height: 80px;

    .iconColor {
      color: #ED7D31
    }
  }

  .achievementRate {
    text-align: left;
    position: absolute;
    bottom: -4.15rem;
    height: 80px;

    .iconStyle {
      //left: 18px;
    }

    .iconColor {
      color: #4C6C9C
    }
  }

  .supplyingEndTime {
    text-align: center;
    position: absolute;
    bottom: -3.45rem;
    right: -180px;
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

.formula {
  .row1 {
    display: flex;

    .subduction {
      width: 10px;
      height: 2px;
      background: black;
      margin: 22px 10px 0;
    }
  }

  .left-bracket {
    margin-left: -15px;
  }

  .left-bracket, .right-bracket {
    font-size: 40px;
  }

  .item {
    padding: 0 20px;
  }

  .item-top {
    border-bottom: 1px solid black;
  }

  .subduction-num {
    margin-top: 12px;
  }

  .multiply {
    margin-left: -10px;
    margin-top: 15px;
  }

  .multiply-num {
    margin-left: 5px;
    margin-top: 14px;
  }

  .icon {
    margin-top: 13px;
    width: 22px;
  }

  .equal {
    margin-top: 9px;
    margin-left: 7px;
    font-size: 20px;
  }

  .row2 {
    display: flex;

    .equal {
      margin-left: 29px;
    }

    .subduction {
      width: 10px;
      height: 2px;
      background: black;
      margin: 20px 10px 0;
    }

    .subduction-num {
      margin-top: 10px;
    }

    .result {
      margin-left: 10px;
      margin-top: 13px;
    }
  }
}

::v-deep .estimatedActualTotalPro {
  .el-input__inner {
    text-align: center !important;
  }
}
</style>
