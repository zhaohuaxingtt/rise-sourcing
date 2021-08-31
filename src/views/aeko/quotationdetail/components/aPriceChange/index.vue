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
        <i class="topCutLine"></i>
        <div class="aPriceChangeModule">
          <span class="label">{{ language("CBDXUTIAOZHENGBUFEN", "CBD需调整部分") }}:</span>
          <iSelect 
            multiple
            v-model="modules"
            :placeholder="language('QINGXUANZE','请选择')"
            @change="handleChangeByModules"
            >
            <el-option
              value=""
              :label="language('ALL', '全部') | capitalizeFilter"
            ></el-option>
            <el-option
              :value="item.value"
              :label="`${ item.seq } ${ language(item.key, item.label) }`"
              v-for="(item, $index) in moduleOptions"
              :key="$index"
            ></el-option>
          </iSelect> 
        </div>

        <cbdSummary class="margin-top20" />
        <rawMaterials v-if="moduleMap.rawMaterials" class="margin-top30" topCutLine />
        <manufacturingCost v-if="moduleMap.manufacturingCost" class="margin-top30" topCutLine />
        <div class="flexBox">
          <scrapCost v-if="moduleMap.scrapCost" class="margin-top30" topCutLine />
          <manageCost v-if="moduleMap.manageCost" class="margin-top30" topCutLine />
          <otherCost v-if="moduleMap.otherCost" class="margin-top30" topCutLine />
          <profit v-if="moduleMap.profit" class="margin-top30" topCutLine />
        </div>
      </div>
    </div>
  </iCard>
</template>

<script>
import { iCard, iButton, iInput, iText, iSelect } from "rise"
import cbdSummary from "./components/cbdSummary"
import rawMaterials from "./components/rawMaterials"
import manufacturingCost from "./components/manufacturingCost"
import scrapCost from "./components/scrapCost"
import manageCost from "./components/manageCost"
import otherCost from "./components/otherCost"
import profit from "./components/profit"

export default {
  components: { iCard, iButton, iInput, iText, iSelect, cbdSummary, rawMaterials, manufacturingCost, scrapCost, manageCost, otherCost, profit },
  data() {
    return {
      aPriceChangeMode: false,
      moduleOptions: [
        { seq: "2.1", key: "YUANCAILIAOSANJIAN", label: "原材料/散件", value: "rawMaterials" },
        { seq: "2.2", key: "ZHIZAOCHENGBEN", label: "制造成本", value: "manufacturingCost" },
        { seq: "2.3", key: "BAOFEICHENGBEN", label: "报废成本", value: "scrapCost" },
        { seq: "2.4", key: "GUANLIFEI", label: "管理费", value: "manageCost" },
        { seq: "2.5", key: "QITAFEIYONG", label: "其他费⽤", value: "otherCost" },
        { seq: "2.6", key: "LIRUN", label: "利润", value: "profit" },
      ],
      modules: [],
      moduleMap: {}
    }
  },
  methods: {
    handleChangeByModules(modules) {
      this.moduleMap = {}

      if (modules.includes("") && modules[this.modules.length - 1] !== "") this.modules = modules.filter(item => !!item)

      if (Array.isArray(modules) && modules.length) {
        if (this.modules.includes("") || modules.length === this.moduleOptions.length) {
          this.modules = [""]
          this.moduleOptions.forEach(module => this.$set(this.moduleMap, module.value, true))
          return
        }

        modules.forEach(moduleKey => this.$set(this.moduleMap, moduleKey, true))
        this.modules = this.moduleOptions.filter(module => !!this.moduleMap[module.value]).map(module => module.value)
      }
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

  .topCutLine {
    margin-top: 22px;
    display: block;
    height: 2px;
    background: #AFB3BC;
    opacity: 0.45;
  }

  .aPriceChangeModule {
    margin-top: 30px;
    display: flex;
    align-items: center;
    width: 509px;

    .label {
      width: 123px;
      margin-right: 20px;
    }

    ::v-deep .el-select {
      width: 356px;
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
          margin-right: 2px;
        }

        ::v-deep .main {
          padding-right: 55px;
        }
      }

      &:nth-of-type(even) {
        ::v-deep .topCutLine {
          margin-left: 2px;
        }

        ::v-deep .main {
          padding-left: 55px;
        }
      }

      &:last-of-type:not(&:nth-of-type(even)) {
        ::v-deep .topCutLine {
          width: 200%;
        }
      }
    }
  }
}
</style>