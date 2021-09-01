<template>
  <div class="manufacturingCost">
    <i class="topCutLine" v-if="topCutLine"></i>
    <div class="header">
      <span class="title">2.2 {{ language("ZHIZAOCHENGBEN", "制造成本") }}</span>
      <div class="control">
        <iButton @click="handleAddOldPart">{{ language("TIANJIAYUANLINGJIANCBD", "添加原零件CBD") }}</iButton>
        <iButton @click="handleAddNewPart">{{ language("TIANJIAXINLINGJIANCBD", "添加新零件CBD") }}</iButton>
        <iButton @click="handleDelete">{{ language("SHANCHUHANG", "删除行") }}</iButton>
      </div>
    </div>
    <div class="body margin-top20">
      <el-table class="table" :data="tableListData" @selection-change="selectionChange">
        <el-table-column :label="language('ZHIZAOCHENGBEN', '制造成本')" align="center">
          <el-table-column type="selection" align="center" width="55"></el-table-column>
          <el-table-column label="#" prop="index" align="center" width="55" ></el-table-column>
          <el-table-column :label="language('ZHIZAOGONGXU', '制造工序')" prop="type" align="center" width="136">
            <template v-slot="scope">
              <div class="typeColumn">
                <iconFont v-if="scope.row.source === 'new'" class="iconFont" />
                <div>
                  <div v-if="scope.row.source === 'source'">{{ scope.row.type }}</div>
                  <div v-else>
                    <iInput class="input-center" v-model="scope.row.type" :class="{ changeClass: sourceMap[scope.row.sourceId] ? (scope.row.type !== sourceMap[scope.row.sourceId].type) : false }"></iInput>
                  </div>
                </div>
              </div>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column prop="a" align="center" width="126" :render-header="h => h('span', { domProps: { innerHTML: `${ language('DUIYINGYUANCAILIAOSANJIAN', '对应原材料/散件') }<br/>（Ref.-ID）` }})">
          <template v-slot="scope">
            <span v-if="scope.row.source === 'source'">{{ scope.row.a }}</span>
            <iInput v-else class="input-center" v-model="scope.row.a" :class="{ changeClass: sourceMap[scope.row.sourceId] ? (scope.row.a !== sourceMap[scope.row.sourceId].a) : false }"></iInput>
          </template>
        </el-table-column>
        <el-table-column prop="b" align="center" width="110" :render-header="h => h('span', { domProps: { innerHTML: `${ language('SHEBEIMINGCHENGXINGHAO', '设备名称/型号') }<br/>（Ref.-Name）` }})">
          <template v-slot="scope">
            <span v-if="scope.row.source === 'source'">{{ scope.row.b }}</span>
            <iInput v-else class="input-center" v-model="scope.row.b" :class="{ changeClass: sourceMap[scope.row.sourceId] ? (scope.row.b !== sourceMap[scope.row.sourceId].b) : false }"></iInput>
          </template>
        </el-table-column>
        <el-table-column prop="c" align="center" width="132" :render-header="h => h('span', { domProps: { innerHTML: `${ language('SHANGQIDAZHONGZHUANYONGSHEBEIFEI', '上汽大众专用设备费') }<br/>（RMB）` }})">
          <template v-slot="scope">
            <span v-if="scope.row.source === 'source'">{{ scope.row.c }}</span>
            <iInput v-else class="input-center" v-model="scope.row.c" :class="{ changeClass: sourceMap[scope.row.sourceId] ? (scope.row.c !== sourceMap[scope.row.sourceId].c) : false }"></iInput>
          </template>
        </el-table-column>
        <el-table-column prop="d" align="center" width="74" :render-header="h => h('span', { domProps: { innerHTML: `${ language('SHENGCHANJIEPAI', '生产节拍') }<br/>（Sec.）` }})">
          <template v-slot="scope">
            <span v-if="scope.row.source === 'source'">{{ scope.row.d }}</span>
            <iInput v-else class="input-center" v-model="scope.row.d" :class="{ changeClass: sourceMap[scope.row.sourceId] ? (scope.row.d !== sourceMap[scope.row.sourceId].d) : false }"></iInput>
          </template>
        </el-table-column>
        <el-table-column prop="e" align="center" width="102" :render-header="h => h('span', { domProps: { innerHTML: `${ language('JIANSHUSHENGCHANJIEPAI', '件数/生产节拍') }<br/>（1..n）` }})">
          <template v-slot="scope">
            <span v-if="scope.row.source === 'source'">{{ scope.row.e }}</span>
            <iInput v-else class="input-center" v-model="scope.row.e" :class="{ changeClass: sourceMap[scope.row.sourceId] ? (scope.row.e !== sourceMap[scope.row.sourceId].e) : false }"></iInput>
          </template>
        </el-table-column>
        <el-table-column :label="language('RENGONGCHENGBEN', '人工成本')" align="center">
          <el-table-column prop="f" align="center" width="104" :render-header="h => h('span', { domProps: { innerHTML: `${ language('ZHIJIERENGONGFEILV', '直接人工费率') }<br/>（RMB/Hour）` }})">
            <template v-slot="scope">
              <span v-if="scope.row.source === 'source'">{{ scope.row.f }}</span>
              <iInput v-else class="input-center" v-model="scope.row.f" :class="{ changeClass: sourceMap[scope.row.sourceId] ? (scope.row.f !== sourceMap[scope.row.sourceId].f) : false }"></iInput>
            </template>
          </el-table-column>
          <el-table-column prop="g" align="center" width="100" :render-header="h => h('span', { domProps: { innerHTML: `${ language('ZHIJIERENGONGSHULIANG', '直接人工数量') }<br/>（0..n）` }})">
            <template v-slot="scope">
              <span v-if="scope.row.source === 'source'">{{ scope.row.g }}</span>
              <iInput v-else class="input-center" v-model="scope.row.g" :class="{ changeClass: sourceMap[scope.row.sourceId] ? (scope.row.g !== sourceMap[scope.row.sourceId].g) : false }"></iInput>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="language('SHEBEIFEI', '设备费')" align="center">
          <el-table-column prop="h" align="center" width="104" :render-header="h => h('span', { domProps: { innerHTML: `${ language('SHEBEIFEILV', '设备费率') }<br/>（RMB/Hour）` }})">
            <template v-slot="scope">
              <span v-if="scope.row.source === 'source'">{{ scope.row.h }}</span>
              <iInput v-else class="input-center" v-model="scope.row.h" :class="{ changeClass: sourceMap[scope.row.sourceId] ? (scope.row.h !== sourceMap[scope.row.sourceId].h) : false }"></iInput>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column :label="language('JIANJIEZHIZAOCHENGBEN', '间接制造成本')" align="center">
          <el-table-column label="(%)" prop="i" align="center" width="88">
            <template v-slot="scope">
              <span v-if="scope.row.source === 'source'">{{ scope.row.i }}</span>
              <iInput v-else class="input-center" v-model="scope.row.i" :class="{ changeClass: sourceMap[scope.row.sourceId] ? (scope.row.i !== sourceMap[scope.row.sourceId].i) : false }"></iInput>
            </template>
          </el-table-column>
          <el-table-column label="(RMB/Pc.)" prop="j" align="center" width="93"></el-table-column>
        </el-table-column>
        <el-table-column prop="k" align="center" width="100" :render-header="h => h('span', { domProps: { innerHTML: `${ language('RENGONGCHENGBEN', '人工成本') }<br/>（RMB/Pc.）` }})">
          <template v-slot="scope">
            <span v-if="scope.row.source === 'source'">{{ scope.row.k }}</span>
            <iInput v-else class="input-center" v-model="scope.row.k" :class="{ changeClass: sourceMap[scope.row.sourceId] ? (scope.row.k !== sourceMap[scope.row.sourceId].k) : false }"></iInput>
          </template>
        </el-table-column>
        <el-table-column prop="l" align="center" width="102" :render-header="h => h('span', { domProps: { innerHTML: `${ language('SHEBEICHENGBEN', '设备成本') }<br/>（RMB/Pc.）` }})">
          <template v-slot="scope">
            <span v-if="scope.row.source === 'source'">{{ scope.row.l }}</span>
            <iInput v-else class="input-center" v-model="scope.row.l" :class="{ changeClass: sourceMap[scope.row.sourceId] ? (scope.row.l !== sourceMap[scope.row.sourceId].l) : false }"></iInput>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>  
</template>

<script>
import { iButton, iInput } from "rise"
import iconFont from "../iconFont"

export default {
  components: { iButton, iInput, iconFont },
  props: {
    topCutLine: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      tableListData: [
        {
          id: "p1",
          index: "P1",
          source: "source",
          type: "Injection Molding",
          a: "C1",
          b: "Haitian 120T",
          c: "350000",
          d: "30.00",
          e: "2",
          f: "25.00",
          g: "2",
          h: "120000",
          i: "4.09",
          j: "0.02",
          k: "10.00",
          l: "10.00"
        },
        {
          sourceId: "p1",
          index: "",
          source: "new",
          type: "Injection Molding",
          a: "C1",
          b: "Haitian 120T",
          c: "350000",
          d: "30.00",
          e: "2",
          f: "25.00",
          g: "2",
          h: "120000",
          i: "4.09",
          j: "0.02",
          k: "10.00",
          l: "10.00"
        }
      ],
      sourceMap: {},
      multipleSelection: []
    }
  },
  created() {
    this.tableListData.forEach(item => {
      if (item.source === "source") {
        this.$set(this.sourceMap, item.id, item)
      }
    })
  },
  methods: {
    selectionChange(list) {
      this.multipleSelection = list
    },
    handleAddOldPart() {
      this.tableListData.push({})
    },
    handleAddNewPart() {
      this.tableListData.push({})
    },
    handleDelete() {
      this.tableListData = this.tableListData.filter(item => !this.multipleSelection.includes(item))
    }
  }
}
</script>

<style lang="scss" scoped>
.manufacturingCost {
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
    .typeColumn {
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
  }

  ::v-deep .changeClass {
    input {
      font-style: italic;
      color: #1660F1;
    }
  }
}
</style>