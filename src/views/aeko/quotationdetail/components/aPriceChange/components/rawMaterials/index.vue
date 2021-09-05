<template>
  <div class="rawMaterials">
    <i class="topCutLine" v-if="topCutLine"></i>
    <div class="header">
      <span class="title">2.1 {{ language("YUANCAILIAOSANJIANCHENGBEN", "原材料/散件成本") }}</span>
      <div class="control">
        <iButton @click="handleAddSourceData" v-permission.auto="AEKO_QUOTATION_CBD_VIEW_YUANCAILIAOSANJIANCHENGBEN_BUTTON_TIANJIAYUANLINGJIANCBD|添加原零件CBD">{{ language("TIANJIAYUANLINGJIANCBD", "添加原零件CBD") }}</iButton>
        <iButton @click="handleAddNewData" v-permission.auto="AEKO_QUOTATION_CBD_VIEW_YUANCAILIAOSANJIANCHENGBEN_BUTTON_TIANJIAXINLINGJIANCBD|添加新零件CBD">{{ language("TIANJIAXINLINGJIANCBD", "添加新零件CBD") }}</iButton>
        <iButton @click="handleDelete" v-permission.auto="AEKO_QUOTATION_CBD_VIEW_YUANCAILIAOSANJIANCHENGBEN_BUTTON_SHANCHUHANG|删除行">{{ language("SHANCHUHANG", "删除行") }}</iButton>
      </div>
    </div>
    <div class="body margin-top20">
      <el-table class="table" ref="table" :data="tableListData" :row-class-name="sourceRowClass" @selection-change="selectionChange">
        <el-table-column :label="language('YUANCAILIAOSANJIANCHENGBEN', '原材料/散件成本')" align="center">
          <el-table-column type="selection" align="center" width="55"></el-table-column>
          <el-table-column label="#" prop="index" align="center" width="55" ></el-table-column>
          <el-table-column :label="language('LEIXING', '类型')" align="center" width="132" >
            <template v-slot="scope">
              <div class="partNameColumn">
                <iconFont v-if="scope.row.partCbdType == 2" class="iconFont" />
                <div>
                  <iInput v-if="scope.row.partCbdType == 1 || scope.row.partCbdType == 2" class="input-center" v-model="scope.row.partName" :class="{ changeClass: sourceMap[scope.row.sourceId] ? (scope.row.partName !== sourceMap[scope.row.sourceId].partName) : false }"></iInput>
                  <div v-else>{{ scope.row.partName }}</div>
                </div>
              </div>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="language('YUANCAILIAOSANJIANMIAOSHU', '原材料/散件描述')" align="center" width="120">
          <template v-slot="scope">
            <iInput v-if="scope.row.partCbdType == 1 || scope.row.partCbdType == 2" class="input-center" v-model="scope.row.partNumber" :class="{ changeClass: sourceMap[scope.row.sourceId] ? (scope.row.partNumber !== sourceMap[scope.row.sourceId].partNumber) : false }"></iInput>
            <span v-else>{{ scope.row.partNumber }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="language('GONGYINGSHANGMINGCHENG', '供应商名称')" align="center" width="92">
          <template v-slot="scope">
            <iInput v-if="scope.row.partCbdType == 1 || scope.row.partCbdType == 2" class="input-center" v-model="scope.row.supplierName" :class="{ changeClass: sourceMap[scope.row.sourceId] ? (scope.row.supplierName !== sourceMap[scope.row.sourceId].supplierName) : false }"></iInput>
            <span v-else>{{ scope.row.supplierName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="language('YUANCHANGUO', '原产国')" align="center" width="100">
          <template v-slot="scope">
            <iSelect v-if="scope.row.partCbdType == 1 || scope.row.partCbdType == 2" class="select-center" filterable v-model="scope.row.productionCountry" :class="{ changeClass: sourceMap[scope.row.sourceId] ? (scope.row.productionCountry !== sourceMap[scope.row.sourceId].productionCountry) : false }">
              <el-option
                v-for="item in countryOptions"
                :key="item.key"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </iSelect>
            <span v-else>{{ scope.row.productionCountry }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="language('SHIFOUSVWZHIDINGJIAGESANJIAN', '是否SVW指定价格散件')" align="center" width="150">
          <template v-slot="scope">
            <iSelect v-if="scope.row.partCbdType == 1 || scope.row.partCbdType == 2" class="select-center" v-model="scope.row.isSvwAssignPriceParts" :class="{ changeClass: sourceMap[scope.row.sourceId] ? (scope.row.isSvwAssignPriceParts !== sourceMap[scope.row.sourceId].isSvwAssignPriceParts) : false }" @change="computeMaterialCostSum">
              <el-option
                v-for="item in options"
                :key="item.key"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </iSelect>
            <span v-else>{{ scope.row.isSvwAssignPriceParts | statusFilter }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" width="81" :render-header="h => h('span', { domProps: { innerHTML: `${ language('SHULIANGDANWEI', '数量单位') }<br/>（UoM）` }})">
          <template v-slot="scope">
            <iInput v-if="scope.row.partCbdType == 1 || scope.row.partCbdType == 2" class="input-center" v-model="scope.row.quantityUnit" :class="{ changeClass: sourceMap[scope.row.sourceId] ? (scope.row.quantityUnit !== sourceMap[scope.row.sourceId].quantityUnit) : false }"></iInput>
            <span v-else>{{ scope.row.quantityUnit }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" width="120" :render-header="h => h('span', { domProps: { innerHTML: `${ language('DANJIARMBUOM', '单价') }(RMB/UoM)` }})">
          <template v-slot="scope">
            <iInput v-if="scope.row.partCbdType == 1 || scope.row.partCbdType == 2" class="input-center" v-model="scope.row.unitPrice" :class="{ changeClass: sourceMap[scope.row.sourceId] ? (scope.row.unitPrice !== sourceMap[scope.row.sourceId].unitPrice) : false }" @input="handleInputByNumber($event, 'unitPrice', scope.row, 2, updateUnitPrice)"></iInput>
            <span v-else>{{ scope.row.unitPrice }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" width="96" :render-header="h => h('span', { domProps: { innerHTML: `${ language('SHULIANG', '数量') }(1..n)` }})">
          <template v-slot="scope">
            <iInput v-if="scope.row.partCbdType == 1 || scope.row.partCbdType == 2" class="input-center" v-model="scope.row.quantity" :class="{ changeClass: sourceMap[scope.row.sourceId] ? (scope.row.quantity !== sourceMap[scope.row.sourceId].quantity) : false }" @input="handleInputByNumber($event, 'quantity', scope.row, 0, updateQuantity)"></iInput>
            <span v-else>{{ scope.row.quantity }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" width="140" prop="directMaterialCost" :render-header="h => h('span', { domProps: { innerHTML: `${ language('ZHIJIEYUANCAILIAOSANJIANCHENGBEN', '直接原材料/散件成本') }<br/>（RMB/Pc.）` }})"></el-table-column>
        <el-table-column :label="language('WULIAOGUANLIFEI', '物料管理费')" align="center">
          <el-table-column label="(%)" align="center" width="88">
            <template v-slot="scope">
              <iInput v-if="scope.row.partCbdType == 1 || scope.row.partCbdType == 2" class="input-center" v-model="scope.row.materialManageCostRate" :class="{ changeClass: sourceMap[scope.row.sourceId] ? (scope.row.materialManageCostRate !== sourceMap[scope.row.sourceId].materialManageCostRate) : false }" @input="handleInputByNumber($event, 'materialManageCostRate', scope.row, 2, updateMaterialManageCostRate)"></iInput>
              <span v-else>{{ scope.row.materialManageCostRate }}</span>
            </template>
          </el-table-column>
          <el-table-column label="(RMB/Pc.)" align="center" width="93" prop="materialManageCost"></el-table-column>
        </el-table-column>
        <el-table-column align="center" min-width="122" prop="materialCost" :render-header="h => h('span', { domProps: { innerHTML: `${ language('YUANCAILIAOSANJIANCHENGBEN', '原材料/散件成本') }<br/>（RMB/Pc.）` }})"></el-table-column>
      </el-table>
    </div>
  </div>  
</template>

<script>
/* eslint-disable no-undef */

import { iButton, iInput, iSelect, iMessage, iMessageBox } from "rise"
import iconFont from "../iconFont"
import { uuidv4, sourceRowClass } from "../data"
import { numberProcessor } from "@/utils"
import { cloneDeep } from "lodash"

export default {
  components: { iButton, iInput, iSelect, iconFont },
  model: {
    prop: "tableListData",
    event: "change"
  },
  props: {
    topCutLine: {
      type: Boolean,
      default: false
    },
    tableListData: {
      type: Array,
      required: true,
      default: () => ([])
    },
    sumData: {
      type: Object,
      default: () => ({})
    },
  },
  data() {
    return {
      countryOptions: [
        { key: "China", label: "China", value: "China" },
        { key: "Japan", label: "Japan", value: "Japan" },
        { key: "Germany", label: "Germany", value: "Germany" }
      ],
      options: [
        { key: "Y", label: "是", value: true },
        { key: "N", label: "否", value: false }
      ],
      sourceMap: {},
      sourceTableListData: [],
      multipleSelection: [],
      validateNewDataChangeKeys: [
        "partName",
        "partNumber",
        "supplierName",
        "productionCountry",
        "isSvwAssignPriceParts",
        "quantityUnit",
        "unitPrice",
        "quantity",
        "materialManageCostRate"
      ],
      validateSourceDataChangeKeys: [
        "partName",
        "partNumber",
        "supplierName",
        "productionCountry",
        "isSvwAssignPriceParts",
        "quantityUnit",
        "unitPrice",
        "quantity",
        "directMaterialCost",
        "materialManageCostRate",
        "materialManageCost",
        "materialCost"
      ]
    }
  },
  filters: {
    statusFilter(value) {
      return value === "Y" ? "是" : "否"
    }
  },
  created() {
    let index = 0
    this.sourceTableListData = this.tableListData.filter(item => {
      if (item.partCbdType == 0 || item.partCbdType == 1) {
        this.$set(this.sourceMap, item.id, item)
        this.$set(item, "index", `C${ ++index }`)
        return true
      } else 
        return false
    })
  },
  methods: {
    sourceRowClass,
    selectionChange(list) {
      this.multipleSelection = list
    },
    handleAddSourceData() {
      const data = {
        id: uuidv4(),
        index: `C${ this.sourceTableListData.length + 1 }`,
        partCbdType: 1
      }

      this.tableListData.push(data)
      this.sourceTableListData.push(data)
      this.$set(this.sourceMap, data.id, data)
    },
    handleAddNewData() {
      if (!this.multipleSelection.some(item => item.partCbdType == 0 || item.partCbdType == 1)) return iMessage.warn(this.language("QINGXUANZEZHISHAOYITIAOYUANLINGJIANSHUJUZUOWEITIANJIAYANGBAN", "请选择至少一条原零件数据作为添加样板"))

      this.multipleSelection.forEach(item => {
        if (item.partCbdType == 0 || item.partCbdType == 1) {
          const data = cloneDeep(item)
          data.id = ""
          data.sourceId = item.id
          data.index = ""
          data.partCbdType = 2
          this.tableListData.splice(this.tableListData.indexOf(item) + 1, 0, data)
        }
      })

      this.$refs.table.clearSelection()
    },
    async handleDelete() {
      for (let i = 0, item; item = this.multipleSelection[i++]; ) {
        if (item.partCbdType == 0) return iMessage.warn(this.language("WUFASHANCHUYUANYOUYUANLINGJIANHANGXIANGMU", "无法删除原有原零件行项目！"))
      
        if ((item.partCbdType == 2 && this.validateNewDataChangeKeys.some(key => item[key] !== this.sourceMap[item.sourceId][key])) || (item.partCbdType == 1 && this.validateSourceDataChangeKeys.some(key => item[key] || item[key] === 0))) {
          await iMessageBox(
            this.language("HASCHANGEDELETE", "已维护的有值，请确认是否删除？"),
            { confirmButtonText: this.language("SHI", "是"), cancelButtonText: this.language("FOU", "否") }
          )
        }
        
        if (item.partCbdType == 1 && this.tableListData.some(row => item.partCbdType == 2 && row.sourceId === item.id)) {
          await iMessageBox(
            this.language("HASNEWDATADELETE", "该原零件行项目对应的所有新零件行项目也将一并删除，请确认是否删除？"),
            { confirmButtonText: this.language("SHI", "是"), cancelButtonText: this.language("FOU", "否") }
          )

          this.multipleSelection = this.multipleSelection.concat(this.tableListData.filter(row => item.partCbdType == 2 && row.sourceId === item.id))
        }
      }

      this.$emit("change", this.tableListData.filter(item => !this.multipleSelection.includes(item)))

      let flag = false
      this.multipleSelection.forEach(item => {
        if (item.partCbdType == 1) {
          this.sourceTableListData.splice(this.sourceTableListData.indexOf(this.sourceMap[item.id]), 1)
          delete this.sourceMap[item.id]

          flag = true
        }
      })

      flag && (this.updateSourceDataIndex())
    },
    updateSourceDataIndex() {
      this.sourceTableListData.forEach((item, index) => this.$set(item, "index", `C${ ++index }`))
    },
    handleInputByNumber(value, key, row, precision, cb) {
      this.$set(row, key, numberProcessor(value, precision))
      
      if (typeof cb === "function") {
        cb(value, key, row)
      }
    },
    updateUnitPrice(value, key, row) {
      this.computeDirectMaterialCost(value, key, row)
    },
    updateQuantity(value, key, row) {
      this.computeDirectMaterialCost(value, key, row)
    },
    computeDirectMaterialCost(sourceValue, sourceKey, row) {
      const directMaterialCost = math.evaluate(`${ math.bignumber(row.unitPrice || 0) } * ${ math.bignumber(row.quantity || 0) }`).toFixed(2)
      this.$set(row, "directMaterialCost", directMaterialCost)
    
      this.computeMaterialManageCost(directMaterialCost, "directMaterialCost", row)
    },
    updateMaterialManageCostRate(value, key, row) {
      this.computeMaterialManageCost(value, key, row)
    },
    computeMaterialManageCost(sourceValue, sourceKey, row) {
      const materialManageCost = math.evaluate(`${ math.bignumber(row.directMaterialCost || 0) } * (${ math.bignumber(row.materialManageCostRate || 0) } / 100)`).toFixed(2)
      this.$set(row, "materialManageCost", materialManageCost)

      this.computeMaterialCost(materialManageCost, "materialManageCost", row)
    },
    computeMaterialCost(sourceValue, sourceKey, row) {
      const materialCost = math.evaluate(`${ math.bignumber(row.directMaterialCost || 0) } + ${ math.bignumber(row.materialManageCost || 0) }`).toFixed(2)
      this.$set(row, "materialCost", materialCost)
    
      this.computeMaterialCostSum(materialCost, "materialCost", row)
    },
    computeMaterialCostSum(sourceValue, sourceKey, row) {
      let sourceMaterialCostSum = 0
      let sourceMaterialCostSumByNotSvwAssignPriceParts = 0
      let newMaterialCostSum = 0
      let newMaterialCostSumByNotSvwAssignPriceParts = 0

      this.tableListData.forEach(item => {
        if (item.partCbdType == 0 || item.partCbdType == 1) {
          sourceMaterialCostSum = math.add(sourceMaterialCostSum, math.bignumber(item.materialCost || 0))

          if (!item.isSvwAssignPriceParts) {
            sourceMaterialCostSumByNotSvwAssignPriceParts = math.add(sourceMaterialCostSumByNotSvwAssignPriceParts, math.bignumber(item.materialCost || 0))
          }
        }

        if (item.partCbdType == 2) {
          newMaterialCostSum = math.add(newMaterialCostSum, math.bignumber(item.materialCost || 0))

          if (!item.isSvwAssignPriceParts) {
            newMaterialCostSumByNotSvwAssignPriceParts = math.add(newMaterialCostSumByNotSvwAssignPriceParts, math.bignumber(item.materialCost || 0))
          }
        }
      })

      const material = math.evaluate(`${ newMaterialCostSum } - ${ sourceMaterialCostSum }`).toFixed(2)
      sourceMaterialCostSum = sourceMaterialCostSum.toFixed(2)
      sourceMaterialCostSumByNotSvwAssignPriceParts = sourceMaterialCostSumByNotSvwAssignPriceParts.toFixed(2)
      newMaterialCostSum = newMaterialCostSum.toFixed(2)
      newMaterialCostSumByNotSvwAssignPriceParts = newMaterialCostSumByNotSvwAssignPriceParts.toFixed(2)

      this.$emit("update:sumData", {
        sourceMaterialCostSum,
        sourceMaterialCostSumByNotSvwAssignPriceParts,
        newMaterialCostSum,
        newMaterialCostSumByNotSvwAssignPriceParts,
        material
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.rawMaterials {
  .topCutLine {
    display: block;
    border-top: 2px #BBC4D6 dashed;
    margin-bottom: 30px;
  }

  .header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;

    .title {
      font-size: 18px;
      color: #131523;
      font-weight: bold;
    }

    .control {}
  }

  .table {
    .partNameColumn {
      position: relative;

      ::v-deep .iconFont {
        width: 30px;
        position: absolute;
        top: 50%;
        left: 0;
        transform: translate(0, -50%);

        svg {
          vertical-align: middle;
          float: left;
        }
      }

      & > div:not(.iconFont) {
        padding-left: 30px;
      }
    }

    ::v-deep .el-table__row {
      background-color: #fff;
    }

    ::v-deep td {
      border-right: 0;
      border-bottom: 1px solid rgba(112, 112, 112, .1);
    }

    ::v-deep .sourceRow {
      background: #f4f8ff;
    }
  }

  ::v-deep .changeClass {
    input {
      font-style: italic;
      color: #1660F1;
    }
  }
}
</style>