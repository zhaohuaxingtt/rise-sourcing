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
      </div>
    </div>
  </iCard>
</template>

<script>
import { iCard, iButton, iInput, iText } from "rise"
import cbdSummary from "./components/cbdSummary"
import rawMaterials from "./components/rawMaterials"
import manufacturingCost from "./components/manufacturingCost"

export default {
  components: { iCard, iButton, iInput, iText, cbdSummary, rawMaterials, manufacturingCost },
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
}
</style>