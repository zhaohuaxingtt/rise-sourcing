<template>
  <iCard class="aPriceChange" v-permission.auto="AEKO_QUOTATION_CBD_TAB_BIANDONGZHICBD|变动值CBD" :title="language('BIANDONGZHICBD', '变动值CBD')">
    <template #header-control>
      <iButton v-permission.auto="AEKO_QUOTATION_CBD_BUTTON_BAOCUN|保存">{{ language("BAOCUN", "保存") }}</iButton>
      <iButton v-permission.auto="AEKO_QUOTATION_CBD_BUTTON_XIAZAI|下载">{{ language("XIAZAI", "下载") }}</iButton>
    </template>
    <div class="body">
      <div class="aPriceChangeMode">
        <el-checkbox v-model="aPriceChangeMode" v-permission.auto="AEKO_QUOTATION_CBD_RADIO_SHOUDONGSHURU|手动输入">{{ language("SHOUDONGSHURU", "手动输入") }}</el-checkbox>
        <div>
          <div class="input" v-permission.auto="AEKO_QUOTATION_CBD_INPUT_AJIABIANDONGHANFENTAN|A价变动_含分摊">
            <span class="label">{{ language("AJIABIANDONGHANFENTAN", "A价变动(含分摊)") }}:</span>
            <iInput v-if="aPriceChangeMode" :value="12" />
            <iText v-else />
          </div>
        </div>
      </div>
      <div v-if="!aPriceChangeMode">
        <i class="topCutLine"></i>
        <div class="aPriceChangeModule" v-permission.auto="AEKO_QUOTATION_CBD_SELECT_CBDXUTIAOZHENGBUFEN|CBD需调整部分">
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
              v-for="(item, $index) in moduleOptions"
              v-permission.dynamic.auto="item.permissionKey"
              :value="item.value"
              :label="`${ item.seq } ${ language(item.key, item.label) }`"
              :key="$index"
            ></el-option>
          </iSelect> 
        </div>

        <cbdSummary class="margin-top20" v-permission.auto="AEKO_QUOTATION_CBD_VIEW_BIANDONGZHICBDHUIZONG|变动值CBD汇总" />
        <rawMaterials v-if="moduleMap.rawMaterials" class="margin-top30" topCutLine v-permission.auto="AEKO_QUOTATION_CBD_VIEW_YUANCAILIAOSANJIAN|原材料/散件" />
        <manufacturingCost v-if="moduleMap.manufacturingCost" class="margin-top30" topCutLine v-permission.auto="AEKO_QUOTATION_CBD_VIEW_ZHIZAOCHENGBEN|制造成本" />
        <div class="flexBox">
          <scrapCost v-if="moduleMap.scrapCost" class="margin-top30" topCutLine v-permission.auto="AEKO_QUOTATION_CBD_VIEW_BAOFEICHENGBEN|报废成本" />
          <manageCost v-if="moduleMap.manageCost" class="margin-top30" topCutLine v-permission.auto="AEKO_QUOTATION_CBD_VIEW_GUANLIFEI|管理费" />
          <otherCost v-if="moduleMap.otherCost" class="margin-top30" topCutLine v-permission.auto="AEKO_QUOTATION_CBD_VIEW_QITAFEIYONG|其他费用" />
          <profit v-if="moduleMap.profit" class="margin-top30" topCutLine v-permission.auto="AEKO_QUOTATION_CBD_VIEW_LIRUN|利润" />
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
        { seq: "2.1", key: "YUANCAILIAOSANJIAN", label: "原材料/散件", value: "rawMaterials", permissionKey: "AEKO_QUOTATION_CBD_VIEW_YUANCAILIAOSANJIAN|原材料/散件" },
        { seq: "2.2", key: "ZHIZAOCHENGBEN", label: "制造成本", value: "manufacturingCost", permissionKey: "AEKO_QUOTATION_CBD_VIEW_ZHIZAOCHENGBEN|制造成本" },
        { seq: "2.3", key: "BAOFEICHENGBEN", label: "报废成本", value: "scrapCost", permissionKey: "AEKO_QUOTATION_CBD_VIEW_BAOFEICHENGBEN|报废成本" },
        { seq: "2.4", key: "GUANLIFEI", label: "管理费", value: "manageCost", permissionKey: "AEKO_QUOTATION_CBD_VIEW_GUANLIFEI|管理费" },
        { seq: "2.5", key: "QITAFEIYONG", label: "其他费⽤", value: "otherCost", permissionKey: "AEKO_QUOTATION_CBD_VIEW_QITAFEIYONG|其他费用" },
        { seq: "2.6", key: "LIRUN", label: "利润", value: "profit", permissionKey: "AEKO_QUOTATION_CBD_VIEW_LIRUN|利润" },
      ],
      modules: [""],
      moduleMap: {}
    }
  },
  created() {
    this.handleChangeByModules([""])
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