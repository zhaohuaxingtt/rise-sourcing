<template>
  <div class="cbdSummary">
    <i class="topCutLine" v-if="topCutLine"></i>
    <div class="header">
      <div class="aPriceChangeModule">
        <span class="label">{{ language("CBDXUTIAOZHENGBUFEN", "CBD需调整部分") }}:</span>
        <iSelect 
          multiple
          v-model="modules"
          :placeholder="language('QINGXUANZE','请选择')"
          >
          <!-- @visible-change="removeOther($event,'supplierSelectlist')" -->
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
      <div class="tip">{{ language("DANWEI", "单位") }}：RMB/Pc.</div>
    </div>
    <div class="content margin-top20">
      <tableList
        lang
        class="table"
        :selection="false"
        :tableTitle="tableTitle"
        :tableData="tableListData" />
    </div>
  </div>  
</template>

<script>
import { iSelect } from "rise"
import tableList from "../../../tableList"
import { cbdSummaryTableTitle as tableTitle } from "../data"

export default {
  components: { iSelect, tableList },
  props: {
    topCutLine: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      moduleOptions: [
        { seq: "2.1", key: "YUANCAILIAOSANJIAN", label: "原材料/散件", value: "a" },
        { seq: "2.2", key: "ZHIZAOCHENGBEN", label: "制造成本", value: "b" },
        { seq: "2.3", key: "BAOFEICHENGBEN", label: "报废成本", value: "c" },
        { seq: "2.4", key: "GUANLIFEI", label: "管理费", value: "d" },
        { seq: "2.5", key: "QITAFEIYONG", label: "其他费⽤", value: "e" },
        { seq: "2.6", key: "LIRUN", label: "利润", value: "f" },
      ],
      modules: [],
      tableTitle,
      tableListData: [
        { a: "0.00", b: "0.00", c: "0.00", d: "0.00", e: "0.00", f: "0.00", g: "0.00" }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.cbdSummary {
  .topCutLine {
    display: block;
    height: 2px;
    background: #AFB3BC;
    opacity: 0.45;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding-top: 30px;

    .aPriceChangeModule {
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

    .tip {
      font-size: 12px;
      font-weight: 400;
      color: #485465;
      font-weight: 400;
    }
  }
}
</style>