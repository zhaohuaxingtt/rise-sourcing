<template>
  <iCard class="aPriceChange" v-permission.auto="AEKO_QUOTATION_CBD_TAB_BIANDONGZHICBD|变动值CBD" :title="language('BIANDONGZHICBD', '变动值CBD')">
    <template #header-control>
      <iButton v-permission.auto="AEKO_QUOTATION_CBD_BUTTON_BAOCUN|保存">{{ language("BAOCUN", "保存") }}</iButton>
      <iButton v-permission.auto="AEKO_QUOTATION_CBD_BUTTON_XIAZAI|下载">{{ language("XIAZAI", "下载") }}</iButton>
    </template>
    <div class="body" v-loading="loading">
      <div class="aPriceChangeMode">
        <el-checkbox v-model="hasManualInput" v-permission.auto="AEKO_QUOTATION_CBD_RADIO_SHOUDONGSHURU|手动输入">{{ language("SHOUDONGSHURU", "手动输入") }}</el-checkbox>
        <div>
          <div class="input" v-permission.auto="AEKO_QUOTATION_CBD_INPUT_AJIABIANDONGHANFENTAN|A价变动_含分摊">
            <span class="label">{{ language("AJIABIANDONGHANFENTAN", "A价变动(含分摊)") }}:</span>
            <iInput v-if="hasManualInput" v-model="apriceChange" />
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
            :sourceMaterialCostSum.sync="sourceMaterialCostSum" 
            :newMaterialCostSum.sync="newMaterialCostSum" 
            v-permission.auto="AEKO_QUOTATION_CBD_VIEW_YUANCAILIAOSANJIAN|原材料/散件" />
          <!-- <p>sourceMaterialCostSum: {{ sourceMaterialCostSum }}</p>
          <p>newMaterialCostSum: {{ newMaterialCostSum }}</p> -->
          <manufacturingCost 
            topCutLine 
            class="margin-top30" 
            ref="manufacturingCost"
            v-if="moduleMap.production" 
            v-model="manufacturingCostTableData" 
            :sourceLaborCostSum.sync="sourceLaborCostSum" 
            :newLaborCostSum.sync="newLaborCostSum" 
            :sourceDeviceCostSum.sync="sourceDeviceCostSum"
            :newDeviceCostSum.sync="newDeviceCostSum"
            v-permission.auto="AEKO_QUOTATION_CBD_VIEW_ZHIZAOCHENGBEN|制造成本" />
          <!-- <p>sourceLaborCostSum: {{ sourceLaborCostSum }}</p>
          <p>newLaborCostSum: {{ newLaborCostSum }}</p>
          <p>sourceDeviceCostSum: {{ sourceDeviceCostSum }}</p>
          <p>newDeviceCostSum: {{ newDeviceCostSum }}</p> -->
          <div class="flexBox">
            <scrapCost v-if="moduleMap.scrap" class="margin-top30" topCutLine v-model="scrapCostTableData" :sumData="sumData" v-permission.auto="AEKO_QUOTATION_CBD_VIEW_BAOFEICHENGBEN|报废成本" />
            <manageCost v-if="moduleMap.manage" class="margin-top30" topCutLine v-model="manageTableData" v-permission.auto="AEKO_QUOTATION_CBD_VIEW_GUANLIFEI|管理费" />
            <otherCost v-if="Array.isArray(otherCostTableData) && otherCostTableData.length > 0" class="margin-top30" :tableListData="otherCostTableData" topCutLine v-permission.auto="AEKO_QUOTATION_CBD_VIEW_QITAFEIYONG|其他费用" />
            <profit v-if="moduleMap.profit" class="margin-top30" topCutLine v-model="profitTableData" v-permission.auto="AEKO_QUOTATION_CBD_VIEW_LIRUN|利润" />
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
import { getAekoCarDosage, getAekoQuotationSummary } from "@/api/aeko/quotationdetail"
import { groupBy } from "lodash"

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
      hasManualInput: false,
      apriceChange: "",
      moduleOptions: [
        // { seq: "2.5", key: "QITAFEIYONG", label: "其他费⽤", value: "otherCost", permissionKey: "AEKO_QUOTATION_CBD_VIEW_QITAFEIYONG|其他费用" },
      ],
      modules: [""],
      moduleMap: {},
      cbdSummaryTableData: [{ material: "0.00", makeCost: "0.00", discardCost: "0.00", manageFee: "0.00", otherFee: "0.00", profit: "0.00", apriceChange: "0.00" }],
      rawMaterialsTableData: [],
      sourceMaterialCostSum: "0",
      newMaterialCostSum: "0",
      manufacturingCostTableData: [],
      sourceLaborCostSum: "0",
      newLaborCostSum: "0",
      sourceDeviceCostSum: "0",
      newDeviceCostSum: "0",
      scrapCostTableData: [],
      manageTableData: [],
      otherCostTableData: [],
      profitTableData: []
    }
  },
  computed: {
    sumData() {
      return {
        sourceMaterialCostSum: this.sourceMaterialCostSum,
        newMaterialCostSum: this.newMaterialCostSum,
        sourceLaborCostSum: this.sourceLaborCostSum,
        newLaborCostSum: this.newLaborCostSum,
        sourceDeviceCostSum: this.sourceDeviceCostSum,
        newDeviceCostSum: this.newDeviceCostSum
      }
    }
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
          console.log(res.data)
          this.setCbdSummaryTableData(res.data)
          this.rawMaterialsTableData = Array.isArray(res.data.rawMaterialList) ? res.data.rawMaterialList : []
          this.manufacturingCostTableData = Array.isArray(res.data.makeCostList) ? res.data.makeCostList : []
          this.scrapCostTableData = this.setScrapCostTableData(Array.isArray(res.data.discardCostList) ? res.data.discardCostList : [])
          this.manageTableData = this.setManageTableData(Array.isArray(res.data.manageFeeList) ? res.data.manageFeeList : [])
          
          res.data.otherFeeList = [
            { itemType: 0 },
            { itemType: 1 }
          ]
          
          this.otherCostTableData = this.setOtherCostTableData(Array.isArray(res.data.otherFeeList) ? res.data.otherFeeList : [])
          this.profitTableData = this.setProfitTableData(Array.isArray(res.data.profitList) ? res.data.profitList : [])
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }

        this.loading = false
      })
      .catch(() => this.loading = false)
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
      const discardCostMap = {
        source: {},
        new: {}
      }

      if (data.length > 0) {
        data.forEach(item => {
          if (item.id && !item.originScrapId) {
            discardCostMap.source = item
          }

          if (item.originScrapId) {
            discardCostMap.new = item
          }
        })
      }

      const result = [
        {
          index: "S1",
          typeName: "discardCost",
          typeNameByLang: () => this.language("ZHENGTIBAOFEICHENGBENBIANDONG", "整体报废成本变动"),
          sourceRatio: discardCostMap.source.ratio ?? "0.00",
          newRatio: discardCostMap.new.ratio ?? "0.00",
          sourceAmount: discardCostMap.source.amount ?? "0",
          newAmount: discardCostMap.new.amount ?? "0",
        }
      ]

      return result
    },
    setManageTableData(data = []) {
      const rawMaterialManageCostMap = {
        source: {},
        new: {}
      }
      const makeManageCostMap = {
        source: {},
        new: {}
      }

      if (data.length > 0) {
        const map = groupBy(data, "typeName")
        
        map["rawMaterialManageCost"].forEach(item => {
          if (item.id && !item.originManageId) {
            rawMaterialManageCostMap.source = item
          }

          if (item.originManageId) {
            rawMaterialManageCostMap.new = item
          }
        })

        map["makeManageCost"].forEach(item => {
          if (item.id && !item.originManageId) {
            makeManageCostMap.source = item
          }

          if (item.originManageId) {
            makeManageCostMap.new = item
          }
        })
      }

      const result = [
        {
          index: "O1",
          typeName: "rawMaterialManageCost",
          typeNameByLang: () => this.language("YUANCAILIAOYUSANJIANBUHANSVWZHIDINGSANJIANGUANLIFEI", "原材料与散件(不含SVW指定散件)管理费"),
          sourceRatio: rawMaterialManageCostMap.source.ratio ?? "0.00",
          newRatio: rawMaterialManageCostMap.new.ratio ?? "0.00",
          sourceAmount: rawMaterialManageCostMap.source.amount ?? "0",
          newAmount: rawMaterialManageCostMap.new.amount ?? "0",
        },
        {
          index: "O2",
          typeName: "makeManageCost",
          typeNameByLang: () => this.language("ZHIZAOGUANLIFEI", "制造管理费"),
          sourceRatio: makeManageCostMap.source.ratio ?? "0.00",
          newRatio: makeManageCostMap.new.ratio ?? "0.00",
          sourceAmount: makeManageCostMap.source.amount ?? "0",
          newAmount: makeManageCostMap.new.amount ?? "0",
        },
      ]

      return result
    },
    setOtherCostTableData(data = []) {
      const result = []

      if (data.length) {
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

      console.log("result", result)
      return result
    },
    setProfitTableData(data = []) {
      const profitMap = {
        source: {},
        new: {}
      }

      if (data.length > 0) {
        data.forEach(item => {
          if (item.id && !item.originProfitId) {
            profitMap.source = item
          }

          if (item.originProfitId) {
            profitMap.new = item
          }
        })
      }

      const result = [
        {
          index: "P1",
          typeName: "profit",
          typeNameByLang: () => this.language("LIRUNBUHANSVWZHIDINGSANJIAN", "利润(不含SVW指定散件)"),
          sourceRatio: profitMap.source.ratio ?? "0.00",
          newRatio: profitMap.new.ratio ?? "0.00",
          sourceAmount: profitMap.source.amount ?? "0",
          newAmount: profitMap.new.amount ?? "0",
        }
      ]

      return result
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