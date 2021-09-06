<template>
  <iCard class="aPriceChange" v-permission.auto="AEKO_QUOTATION_CBD_TAB_BIANDONGZHICBD|变动值CBD" :title="language('BIANDONGZHICBD', '变动值CBD')">
    <template #header-control>
      <iButton v-permission.auto="AEKO_QUOTATION_CBD_BUTTON_BAOCUN|保存" @click="handleSave">{{ language("BAOCUN", "保存") }}</iButton>
      <iButton v-permission.auto="AEKO_QUOTATION_CBD_BUTTON_XIAZAI|下载">{{ language("XIAZAI", "下载") }}</iButton>
    </template>
    <div class="body" v-loading="loading">
      <div class="aPriceChangeMode">
        <el-checkbox v-model="hasManualInput" v-permission.auto="AEKO_QUOTATION_CBD_RADIO_SHOUDONGSHURU|手动输入">{{ language("SHOUDONGSHURU", "手动输入") }}</el-checkbox>
        <div>
          <div class="input" v-permission.auto="AEKO_QUOTATION_CBD_INPUT_AJIABIANDONGHANFENTAN|A价变动_含分摊">
            <span class="label">{{ language("AJIABIANDONGHANFENTAN", "A价变动(含分摊)") }}:</span>
            <iInput v-if="hasManualInput" v-model="apriceChange" @input="handleInputByApriceChange" />
            <iText v-else />
          </div>
        </div>
      </div>
      <div v-if="!hasManualInput">
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
        <cbdSummary class="margin-top20" v-model="cbdSummaryTableData" v-permission.auto="AEKO_QUOTATION_CBD_VIEW_BIANDONGZHICBDHUIZONG|变动值CBD汇总" />
        <div v-if="!loading">
          <rawMaterials 
            topCutLine 
            class="margin-top30" 
            ref="rawMaterials"
            v-if="moduleMap.material" 
            v-model="rawMaterialsTableData" 
            :sumData.sync="rawMaterialsSumData"
            v-permission.auto="AEKO_QUOTATION_CBD_VIEW_YUANCAILIAOSANJIAN|原材料/散件" />
          <manufacturingCost 
            topCutLine 
            class="margin-top30" 
            ref="manufacturingCost"
            v-if="moduleMap.production" 
            v-model="manufacturingCostTableData" 
            :sumData.sync="manufacturingCostSumData"
            v-permission.auto="AEKO_QUOTATION_CBD_VIEW_ZHIZAOCHENGBEN|制造成本" />
          <div class="flexBox">
            <scrapCost v-if="moduleMap.scrap" class="margin-top30" topCutLine v-model="scrapCostTableData" :sumData="sumData" :discardCost.sync="discardCost" v-permission.auto="AEKO_QUOTATION_CBD_VIEW_BAOFEICHENGBEN|报废成本" />
            <manageCost v-if="moduleMap.manage" class="margin-top30" topCutLine v-model="manageTableData" :sumData="sumData" :manageFee.sync="manageFee" v-permission.auto="AEKO_QUOTATION_CBD_VIEW_GUANLIFEI|管理费" />
            <otherCost v-if="Array.isArray(otherCostTableData) && otherCostTableData.length > 0" class="margin-top30" :tableListData="otherCostTableData" topCutLine :otherFee.sync="otherFee" v-permission.auto="AEKO_QUOTATION_CBD_VIEW_QITAFEIYONG|其他费用" />
            <profit v-if="moduleMap.profit" class="margin-top30" topCutLine v-model="profitTableData" :sumData="sumData" :profit.sync="profit" v-permission.auto="AEKO_QUOTATION_CBD_VIEW_LIRUN|利润" />
          </div>
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
import { getAekoCarDosage, getAekoQuotationSummary, saveAekoQuotationSummary } from "@/api/aeko/quotationdetail"
import { numberProcessor } from "@/utils"

export default {
  components: { iCard, iButton, iInput, iText, iSelect, cbdSummary, rawMaterials, manufacturingCost, scrapCost, manageCost, otherCost, profit },
  props: {
    partInfo: {
      type: Object,
      required: true,
      default: () => ({})
    }
  },
  data() {
    return {
      loading: false,
      form: {},
      hasManualInput: false,
      apriceChange: "",
      moduleOptions: [
        // { seq: "2.5", key: "QITAFEIYONG", label: "其他费⽤", value: "otherCost", permissionKey: "AEKO_QUOTATION_CBD_VIEW_QITAFEIYONG|其他费用" },
      ],
      modules: [""],
      moduleMap: {},
      // cbdSummaryTableData: [{ material: "0.00", makeCost: "0.00", discardCost: "0.00", manageFee: "0.00", otherFee: "0.00", profit: "0.00", apriceChange: "0.00" }],
      rawMaterialsTableData: [],
      rawMaterialsSumData: {
        sourceMaterialCostSum: 0,
        sourceMaterialCostSumByNotSvwAssignPriceParts: 0,
        newMaterialCostSum: 0,
        newMaterialCostSumByNotSvwAssignPriceParts: 0
      },
      manufacturingCostTableData: [],
      manufacturingCostSumData: {
        sourceLaborCostSum: 0,
        sourceDeviceCostSum: 0,
        newLaborCostSum: 0,
        newDeviceCostSum: 0
      },
      scrapCostTableData: [],
      discardCost: 0,
      manageTableData: [],
      manageFee: 0,
      otherCostTableData: [],
      otherFee: 0,
      profitTableData: [],
      profit: 0
    }
  },
  computed: {
    cbdSummarySelected() {
      if (this.modules.length) {
         if (this.modules[0] === "") {
          return this.moduleOptions.map(item => item.value).join(",")
        } else {
          return this.modules.join(",")
        } 
      } else {
        return ""
      }
    },
    sumData() {
      return {
        ...this.rawMaterialsSumData,
        ...this.manufacturingCostSumData
      }
    },
    cbdSummaryTableData() {
      return [{
        material: this.rawMaterialsSumData.material || "0.00",
        makeCost: this.manufacturingCostSumData.makeCost || "0.00",
        discardCost: this.discardCost || "0.00",
        manageFee: this.manageFee || "0.00",
        otherFee: this.otherFee || "0.00",
        profit: this.profit || "0.00"
      }]
    },
  },
  created() {
    this.handleChangeByModules([""])
  },
  methods: {
    init() {
      this.getAekoCarDosage()
      this.getAekoQuotationSummary()
    },
    getAekoCarDosage() {
      getAekoCarDosage()
      .then(res => {
        if (res.code == 200) {
          this.moduleOptions = 
            Array.isArray(res.data) ?
            res.data.map(item => {
              switch(item.code) {
                case "material":
                  return { seq: "2.1", key: "YUANCAILIAOSANJIAN", label: "原材料/散件", value: "material", permissionKey: "AEKO_QUOTATION_CBD_VIEW_YUANCAILIAOSANJIAN|原材料/散件" }
                case "production":
                  return { seq: "2.2", key: "ZHIZAOCHENGBEN", label: "制造成本", value: "production", permissionKey: "AEKO_QUOTATION_CBD_VIEW_ZHIZAOCHENGBEN|制造成本" }
                case "scrap":
                  return { seq: "2.3", key: "BAOFEICHENGBEN", label: "报废成本", value: "scrap", permissionKey: "AEKO_QUOTATION_CBD_VIEW_BAOFEICHENGBEN|报废成本" }
                case "manage":
                  return { seq: "2.4", key: "GUANLIFEI", label: "管理费", value: "manage", permissionKey: "AEKO_QUOTATION_CBD_VIEW_GUANLIFEI|管理费" }
                case "profit":
                  return { seq: "2.6", key: "LIRUN", label: "利润", value: "profit", permissionKey: "AEKO_QUOTATION_CBD_VIEW_LIRUN|利润" }
                default:
                  return {}
              }
            }) :
            []

          this.handleChangeByModules([""])
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
      })
      .catch()
    },
    getAekoQuotationSummary() {
      this.loading = true

      getAekoQuotationSummary({
        quotationId: this.partInfo.quotationId
      })
      .then(res => {
        if (res.code == 200) {
          this.form = res.data
          this.setCbdSummaryTableData(res.data)
          this.rawMaterialsTableData = Array.isArray(res.data.rawMaterialList) ? res.data.rawMaterialList : []
          this.manufacturingCostTableData = Array.isArray(res.data.makeCostList) ? res.data.makeCostList : []
          this.scrapCostTableData = this.setScrapCostTableData(Array.isArray(res.data.discardCostList) ? res.data.discardCostList : [])
          this.manageTableData = this.setManageTableData(Array.isArray(res.data.manageFeeList) ? res.data.manageFeeList : [])
          
          this.otherCostTableData = this.setOtherCostTableData(Array.isArray(res.data.otherFeeList) ? res.data.otherFeeList : [])
          this.profitTableData = this.setProfitTableData(Array.isArray(res.data.profitList) ? res.data.profitList : [])
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }

        this.loading = false
      })
      .catch(() => this.loading = false)
    },
    handleInputByApriceChange(value) {
      this.apriceChange = numberProcessor(value, 2)
    },
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
    },
    setCbdSummaryTableData(data = {}) {
      this.cbdSummaryTableData = [{
        material: data.material || "0.00",
        makeCost: data.makeCost || "0.00",
        discardCost: data.discardCost || "0.00",
        manageFee: data.manageFee || "0.00",
        otherFee: data.otherFee || "0.00",
        profit: data.profit || "0.00",
        apriceChange: data.apriceChange || "0.00"
      }]
    },
    setScrapCostTableData(data = []) {
      const result = []

      if (data.length > 0) {
        result.push(
          {
            index: "S1",
            typeName: "discardCost",
            typeNameByLang: () => this.language("ZHENGTIBAOFEICHENGBENBIANDONG", "整体报废成本变动"),
            originRatio: data[0].originRatio ?? "0.00",
            ratio: data[0].ratio ?? "0.00",
            changeAmount: data[0].changeAmount ?? "0.00"
          }
        )
      } else {
        result.push(
          {
            index: "S1",
            typeName: "discardCost",
            typeNameByLang: () => this.language("ZHENGTIBAOFEICHENGBENBIANDONG", "整体报废成本变动"),
            originRatio: "0.00",
            ratio: "0.00",
            changeAmount: "0.00"
          }
        )
      }

      return result
    },
    setManageTableData(data = []) {
      const result = []

      if (data.length > 0) {
        return data.map(item => {
          switch(item.typeName) {
            case "原材料与散件（不含SVW指定散件）管理费":
              item.index = "O1"
              item.typeNameByLang = () => this.language("YUANCAILIAOYUSANJIANBUHANSVWZHIDINGSANJIANGUANLIFEI", "原材料与散件(不含SVW指定散件)管理费")
              break
            case "制造管理费":
              item.index = "O2"
              item.typeNameByLang = () => this.language("ZHIZAOGUANLIFEI", "制造管理费")
              break
            default:
          }

          return item
        })
      } else {
        result.push(
          {
            index: "O1",
            typeName: "原材料与散件（不含SVW指定散件）管理费",
            typeNameByLang: () => this.language("YUANCAILIAOYUSANJIANBUHANSVWZHIDINGSANJIANGUANLIFEI", "原材料与散件(不含SVW指定散件)管理费"),
            originRatio: "0.00",
            ratio: "0.00",
            changeAmount: "0.00",
          },
          {
            index: "O2",
            typeName: "制造管理费",
            typeNameByLang: () => this.language("ZHIZAOGUANLIFEI", "制造管理费"),
            originRatio: "0.00",
            ratio: "0.00",
            changeAmount: "0.00",
          }
        )
      }

      return result
    },
    setOtherCostTableData(data = []) {
      const result = []

      if (data.length > 0) {
        data.forEach((item, index) => {
          switch(item.itemType) {
            case 0:
              result.push({
                index: `A${ ++index }`,
                itemType: item.itemType,
                itemTypeNameByLang: () => this.language("FENTANMUJUFEI", "分摊模具费"),
                shareTotal: item.shareTotal,
                shareQuantity: item.shareQuantity,
                shareAmount: item.shareAmount,
                totalPrice: item.totalPrice
              })
              break
            case 1:
              result.push({
                index: `A${ ++index }`,
                itemType: item.itemType,
                itemTypeNameByLang: () => this.language("FENTANKAIFAFEI", "分摊开发费"),
                shareTotal: item.shareTotal,
                shareQuantity: item.shareQuantity,
                shareAmount: item.shareAmount,
                totalPrice: item.totalPrice
              })
              break
            default:
          }
        })
      }

      return result
    },
    setProfitTableData(data = []) {
       const result = []

      if (data.length > 0) {
        result.push(
          {
            index: "P1",
            typeName: "profit",
            typeNameByLang: () => this.language("LIRUNBUHANSVWZHIDINGSANJIAN", "利润(不含SVW指定散件)"),
            originRatio: data[0].originRatio ?? "0.00",
            ratio: data[0].ratio ?? "0.00",
            changeAmount: data[0].changeAmount ?? "0.00"
          }
        )
      } else {
        result.push(
          {
            index: "S1",
            typeName: "profit",
            typeNameByLang: () => this.language("LIRUNBUHANSVWZHIDINGSANJIAN", "利润(不含SVW指定散件)"),
            originRatio: "0.00",
            ratio: "0.00",
            changeAmount: "0.00"
          }
        )
      }

      return result
    },
    handleSave() {
      saveAekoQuotationSummary({
        ...this.form,
        hasManualInput: this.hasManualInput,
        apriceChange: this.hasManualInput ? this.apriceChange : "",
        cbdSummarySelected: this.hasManualInput ? "" : this.cbdSummarySelected,
      })
      .then(res => {
        if (res.code == 200) {
          iMessage.success(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
      })
      .catch(() => {})
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