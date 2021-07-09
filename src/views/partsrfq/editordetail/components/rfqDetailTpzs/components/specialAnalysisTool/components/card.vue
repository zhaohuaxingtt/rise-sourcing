<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-06-17 13:47:55
 * @LastEditors: zbin
 * @Descripttion: your project
-->
<template>
  <iCard style="min-height:400px" :title="labelData.title">
    <div slot="header-control">
      <el-popover placement="top-start" trigger="hover" :content="labelData.colourType===1?$t('TPZS.ZXFXGJNHYGLFXBG'):labelData.colourType===2?$t('TPZS.ZXFXGJNMYGLFXBGDHHILJ'):$t('TPZS.ZXFXGJNMYGLFXBGQBHHILJ')">
        <icon slot="reference" :name="labelData.colourType===1?'iconzhuanxiangfenxigongju-landian':labelData.colourType===2?'iconbaojiapingfengenzong-jiedian-cheng':'iconbaojiapingfengenzong-jiedian-hui'" symbol></icon>
      </el-popover>
    </div>
    <img class="cursor" :src="labelData.imgUrl" alt="" width="100%" height="250px">
    <el-divider></el-divider>
    <div class="buttom">
      <div>
        <div>{{$t('TPZS.FX')+labelData.analysisTotal}}</div>
        <div>{{$t('TPZS.BG')+labelData.reportTotal}}</div>
      </div>
      <div>
        <div>{{$t('TPZS.SCGXSJ')+labelData.analysisLastUpdateDate}}</div>
        <div>{{$t('TPZS.SCDCSJ')+labelData.reportLastUpdateDate}}</div>
      </div>
    </div>
  </iCard>
</template>

<script>
import { iCard, icon, iLabel } from "rise";
export default {
  components: { iCard, icon, iLabel },
  props: {
    cardData: {
      type: Object, default: () => {
        return {}
      }
    },
  },
  watch: {
    cardData: {
      handler(data) {
        this.labelData = data
      },
      deep: true,
      immediate: true,
    }
  },
  data() {
    return {
      labelData: {},
    }
  },
  created() {
  }
}
</script>

<style lang="scss" scoped>
.buttom {
  display: flex;
  justify-content: space-between;
}
::v-deep .el-divider--horizontal {
  margin: 1.25rem 0 !important;
}
</style>