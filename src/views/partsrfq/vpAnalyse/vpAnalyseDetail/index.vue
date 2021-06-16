<!--
 * @Author: moxuan
 * @LastEditors: Please set LastEditors
 * @Description: VP分析详情
-->
<template>
  <iPage>
    <div class="margin-bottom20 clearFloat">
      <span class="font18 font-weight">Volume Pricing{{ $t('TPZS.FENXI') }}</span>
      <div class="floatright">
        <!--返回-->
        <iButton>{{ $t('LK_FANHUI') }}</iButton>
        <!--预览-->
        <iButton>{{ $t('TPZS.YULAN') }}</iButton>
        <!--保存-->
        <iButton>{{ $t('LK_BAOCUN') }}</iButton>
      </div>
    </div>
    <div class="partBox margin-bottom20">
      <div class="partItemContainer">
        <div class="partItem"
             v-for="(item,index) of partList"
             :key="item"
             :class="{'partItemActive': partItemCurrent === index}"
             @click="handlePartItemClick(index)"
        >
          <div class="quxiaoIconBox" @click="handlePartItemClose(index)">
            <icon symbol
                  name="iconrs-quxiao"
                  class="quxiaoIcon"
                  v-if="partItemCurrent === index && partList.length > 1 "
            />
          </div>
          {{ item }}
        </div>
      </div>
      <!--      自定义图标-->
      <div class="customBox" @click="handleOpenCustomDialog">
        <icon symbol
              name="iconzidingyi"
              class="customIcon"
        />
      </div>
    </div>
    <!--信息-->
    <baseInfo class="margin-bottom20"/>
    <!--总单价表格-->
    <totalUnitPriceTable class="margin-bottom20"/>

    <!--图形-->
    <div class="chartBox">
      <iCard class="curveBox" :title="'Volume Pricin' + $t('TPZS.QUXIAN')">
        <curveChart chartHeight="260px"/>
      </iCard>

      <iCard class="analyzeBox">
      </iCard>
    </div>
  </iPage>
</template>

<script>
import {iPage, iButton, icon, iCard} from 'rise';
import baseInfo from './components/baseInfo';
import totalUnitPriceTable from './components/totalUnitPriceTable';
import curveChart from './components/curveChart';

export default {
  components: {
    iPage,
    iButton,
    baseInfo,
    totalUnitPriceTable,
    icon,
    iCard,
    curveChart,
  },
  data() {
    return {
      partList: ['18D023607', '18D023602'],
      partItemCurrent: 0,
    };
  },
  methods: {
    handlePartItemClick(index) {
      this.partItemCurrent = index;
    },
    handlePartItemClose(index) {
      this.partList.splice(index, 1);
      console.log(this.partList);
      this.partItemCurrent = 0;
    },
    handleOpenCustomDialog() {},
  },
};
</script>

<style scoped lang="scss">
.partBox {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .partItemContainer {
    display: flex;

    .partItem {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 30px;
      height: 35px;
      padding: 9px 15px;
      background: #FFFFFF;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.08);
      border-radius: 5px;
      font-size: 16px;
      font-weight: bold;
      color: #000000;
      cursor: pointer;

      .quxiaoIconBox {
        position: absolute;
        right: -10px;
        top: -10px;
      }

      .quxiaoIcon {
        font-size: 20px;
      }
    }

    .partItemActive {
      color: #1763F7;
    }
  }

  .customBox {
    .customIcon {
      cursor: pointer;
      font-size: 20px;
    }
  }
}

.chartBox {
  display: flex;
  justify-content: space-between;
  height: 390px;

  .curveBox {
    width: 42%;
    height: 100%
  }

  .analyzeBox {
    width: 57%;
    height: 100%
  }
}
</style>
