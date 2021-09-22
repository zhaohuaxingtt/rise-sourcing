<!--
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-06-17 13:47:55
 * @LastEditors: zbin
 * @Descripttion: your project
-->
<template>
  <div class="content">
    <div class="bottom">
      <div class="opacity"></div>
      <div class="buttom-text">
        <div>
          <div v-if="labelData.title!=='PCA'&&labelData.title!=='TIA'&&labelData.title!=='Bid-Link'">{{$t('TPZS.FX')+labelData.analysisTotal}}</div>
          <div>{{ $t('TPZS.BG')+labelData.reportTotal}}</div>
        </div>
        <div>
          <div>{{labelData.title==='PCA'||labelData.title==='TIA'?$t('TPZS.ZJSCSH'):$t('TPZS.SCGXSJ')+labelData.analysisLastUpdateDate}}</div>
          <div v-if="labelData.title!=='PCA'&&labelData.title!=='TIA'&&labelData.title!=='Bid-Link'">{{$t('TPZS.SCDCSJ')+labelData.reportLastUpdateDate}}</div>
        </div>
      </div>
    </div>
    <iCard :class="(labelData.colourType===1?'border':'')+' min-height'" :title="labelData.title">
      <div slot="header-control">
        <el-popover placement="top-start" trigger="hover" :content="labelData.colourType===1?$t('TPZS.ZXFXGJNHYGLFXBG'):labelData.colourType===2?$t('TPZS.ZXFXGJNMYGLFXBGDHHILJ'):$t('TPZS.ZXFXGJNMYGLFXBGQBHHILJ')">
          <icon slot="reference" :name="labelData.colourType===1?'iconzhuanxiangfenxigongju-landian':labelData.colourType===2?'iconbaojiapingfengenzong-jiedian-cheng':'iconbaojiapingfengenzong-jiedian-hui'" symbol></icon>
        </el-popover>
      </div>
      <div class="cursor" :style="{background:'url('+labelData.imgUrl+') no-repeat',backgroundSize: '100% 100%'}"></div>
    </iCard>
  </div>
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
.buttom-text {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2.5rem;
  font-size: 14px;
  color: #000;
  width: 100%;
  height: 100%;
}
::v-deep .el-divider--horizontal {
  margin: 1.25rem 0 !important;
}
.opacity {
  border-top: 2px solid #d7dde8;
  opacity: 0.2;
  position: absolute;
  background-color: #f5f5f5;
  bottom: 0;
  width: 100%;
  height: 100%;
}
.cursor {
  height: 20rem;
}
.content {
  position: relative;
  .bottom {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 100px;
    z-index: 2;
  }
}
.border {
  border: 1px solid #c6deff;
}
.min-height {
  min-height: 28rem;
}
</style>