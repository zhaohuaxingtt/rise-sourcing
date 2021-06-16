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
          <iText class="valueWidth">100,000</iText>
        </div>
        <div class="itemBox">
          <iLabel label="实际累计产量（截至上月末）" slot="label" class="labelWidth"></iLabel>
          <iText class="valueWidth">125,000</iText>
          <icon symbol name="iconshangsheng-VP" class="margin-left15"></icon>
          <span class="up">25%</span>
        </div>
        <div class="itemBox">
          <iLabel label="Volume Pricing降幅潜力" slot="label" class="labelWidth font-weight" icons="iconxinxitishi"
                  :tip="1"></iLabel>
          <iText class="valueWidth bgGreen">- 4.4%</iText>
        </div>
      </div>
      <div class="right">
        <div class="itemBox">
          <iLabel label="计划总产量" slot="label" class="labelWidth"></iLabel>
          <iText class="valueWidth">100,000</iText>
        </div>
        <div class="itemBox">
          <iLabel label="预计总产量" slot="label" class="labelWidth"></iLabel>
          <iInput class="valueWidth"></iInput>
        </div>
        <div class="itemBox">
          <iLabel label="已实现额外降价" slot="label" class="labelWidth" icons="iconxinxitishi"
                  :tip="1"></iLabel>
          <iText class="valueWidth font-weight">100,000</iText>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {icon, iInput, iLabel, iText} from 'rise';

export default {
  components: {
    icon,
    iInput,
    iLabel,
    iText,
  },
  data() {
    return {
      massProductionTimeRate: 45,
      achievementRate: 65,
      OffsetData: 4,
    };
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
