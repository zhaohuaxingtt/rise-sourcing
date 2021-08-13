<template>
  <iDialog
      :visible.sync="value"
      width="95%"
      @close="clearDiolog"
  >
    <div id="content">
      <div class="title">{{ language('PI.PIINDEXBAOGAO', 'Price Index报告') }}- 零件号</div>
      <theBaseInfo class="margin-top20"/>
      <el-divider class="margin-top20 margin-bottom20"/>
      <theTable :isPreview="true"/>
      <el-divider class="margin-top20 margin-bottom20"/>
      <div class="chartBox">
        <!--      Price Index价格分析-->
        <thePriceIndexChart class="lineBox" :isPreview="true"/>
        <!--      零件成本构成-->
        <thePartsCostChart class="pieBox"/>
      </div>
    </div>
  </iDialog>
</template>

<script>
import {iDialog} from 'rise';
import theBaseInfo from './theBaseInfo';
import theTable from './theTable';
import thePriceIndexChart from './thePriceIndexChart';
import thePartsCostChart from './thePartsCostChart';

export default {
  props: {
    dataInfo: {
      type: Object,
      default: () => {
        return {};
      },
    },
    value: {type: Boolean},
  },
  components: {
    iDialog,
    theBaseInfo,
    theTable,
    thePriceIndexChart,
    thePartsCostChart,
  },
  data() {
    return {};
  },
  methods: {
    clearDiolog() {
      this.$emit('input', false);
    },
  },
};
</script>

<style scoped lang="scss">
#content {
  .title {
    font-size: 22px;
    font-weight: bold;
    color: #000000;
  }

  .chartBox {
    display: flex;
    justify-content: space-between;
    height: 573px;

    .lineBox {
      width: 69%;
      height: 100%;
    }

    .pieBox {
      width: 30%;
      height: 100%;
    }
  }
}
</style>
