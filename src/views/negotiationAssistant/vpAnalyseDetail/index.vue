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
      <div class="partItem" v-for="item of partList" :key="item">
        {{ item }}
      </div>
    </div>
    <!--信息-->
    <baseInfo class="margin-bottom20"/>
    <!--总单价表格-->
    <totalUnitPriceTable/>
  </iPage>
</template>

<script>
import {iPage, iButton} from 'rise';
import baseInfo from './components/baseInfo';
import totalUnitPriceTable from './components/totalUnitPriceTable';

export default {
  components: {
    iPage,
    iButton,
    baseInfo,
    totalUnitPriceTable
  },
  data() {
    return {
      partList: ['18D023607', '18D023607'],
    };
  },
};
</script>

<style scoped lang="scss">
.partBox {
  display: flex;

  .partItem {
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
    color: #1763F7;
  }
}
</style>
