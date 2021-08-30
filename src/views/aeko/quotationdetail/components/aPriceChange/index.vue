<template>
  <iCard class="aPriceChange" :title="language('BIANDONGZHICBD', '变动值CBD')">
    <template #header-control>
      <iButton>{{ language("BAOCUN", "保存") }}</iButton>
      <iButton>{{ language("XIAZAI", "下载") }}</iButton>
    </template>
    <div class="body">
      <div class="aPriceChangeMode">
        <el-checkbox v-model="aPriceChangeMode">{{ language("SHOUDONGSHURU", "手动输入") }}</el-checkbox>
        <div>
          <div class="input">
            <span class="label">{{ language("AJIABIANDONGHANFENTAN", "A价变动(含分摊)") }}:</span>
            <iInput v-if="aPriceChangeMode" :value="12" />
            <iText v-else />
          </div>
        </div>
      </div>
      <div v-if="!aPriceChangeMode">
        <cbdSummary class="margin-top20" topCutLine />
        <rawMaterials class="margin-top30" topCutLine />
        <manufacturingCost class="margin-top30" topCutLine />
        <div class="flexBox">
          <scrapCost class="margin-top30" topCutLine />
          <manageCost class="margin-top30" topCutLine />
          <otherCost class="margin-top30" topCutLine />
          <profit class="margin-top30" topCutLine />
        </div>
      </div>
    </div>
  </iCard>
</template>

<script>
import { iCard, iButton, iInput, iText } from "rise"
import cbdSummary from "./components/cbdSummary"
import rawMaterials from "./components/rawMaterials"
import manufacturingCost from "./components/manufacturingCost"
import scrapCost from "./components/scrapCost"
import manageCost from "./components/manageCost"
import otherCost from "./components/otherCost"
import profit from "./components/profit"

export default {
  components: { iCard, iButton, iInput, iText, cbdSummary, rawMaterials, manufacturingCost, scrapCost, manageCost, otherCost, profit },
  data() {
    return {
      aPriceChangeMode: false
    }
  }
}
</script>

<style lang="scss" scoped>
.aPriceChange {
  .aPriceChangeMode {
    display: flex;
    align-items: center;
    
    .input {
      margin-left: 50px;
      width: 366px;
      display: flex;
      align-items: center;

      .label {
        width: 126px;
        margin-right: 20px;
      }

      ::v-deep 
      .el-input,
      .itext {
        width: 220px;
      }
    }
  }

  .flexBox {
    display: flex;
    flex-wrap: wrap;
    
    & > div {
      width: 50%;
      box-sizing: border-box;

      &:nth-of-type(odd) {
        ::v-deep .topCutLine {
          padding-right: 2px;
        }

        ::v-deep .main {
          padding-right: 55px;
        }
      }

      &:nth-of-type(even) {
        ::v-deep .topCutLine {
          padding-left: 2px;
        }

        ::v-deep .main {
          padding-left: 55px;
        }
      }
    }
  }
}
</style>