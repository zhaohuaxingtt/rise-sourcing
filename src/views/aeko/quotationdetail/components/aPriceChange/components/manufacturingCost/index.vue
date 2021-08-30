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
      <el-table :data="tableListData" @selection-change="selectionChange">
        <el-table-column :label="language('ZHIZAOCHENGBEN', '制造成本')" align="center">
          <el-table-column type="selection" align="center" width="55"></el-table-column>
          <el-table-column label="#" prop="index" align="center" width="55" ></el-table-column>
          <el-table-column :label="language('ZHIZAOGONGXU', '制造工序')" prop="type" align="center" width="136"></el-table-column>
        </el-table-column>
        <el-table-column prop="a" align="center" width="126" :render-header="h => h('span', { domProps: { innerHTML: `${ language('DUIYINGYUANCAILIAOSANJIAN', '对应原材料/散件') }<br/>（Ref.-ID）` }})"></el-table-column>
        <el-table-column prop="b" align="center" width="110" :render-header="h => h('span', { domProps: { innerHTML: `${ language('SHEBEIMINGCHENGXINGHAO', '设备名称/型号') }<br/>（Ref.-Name）` }})"></el-table-column>
        <el-table-column prop="c" align="center" width="132" :render-header="h => h('span', { domProps: { innerHTML: `${ language('SHANGQIDAZHONGZHUANYONGSHEBEIFEI', '上汽大众专用设备费') }<br/>（RMB）` }})"></el-table-column>
        <el-table-column prop="d" align="center" width="74" :render-header="h => h('span', { domProps: { innerHTML: `${ language('SHENGCHANJIEPAI', '生产节拍') }<br/>（Sec.）` }})"></el-table-column>
        <el-table-column prop="e" align="center" width="102" :render-header="h => h('span', { domProps: { innerHTML: `${ language('JIANSHUSHENGCHANJIEPAI', '件数/生产节拍') }<br/>（1..n）` }})"></el-table-column>
        <el-table-column :label="language('RENGONGCHENGBEN', '人工成本')" align="center">
          <el-table-column prop="f" align="center" width="104" :render-header="h => h('span', { domProps: { innerHTML: `${ language('ZHIJIERENGONGFEILV', '直接人工费率') }<br/>（RMB/Hour）` }})"></el-table-column>
          <el-table-column prop="g" align="center" width="100" :render-header="h => h('span', { domProps: { innerHTML: `${ language('ZHIJIERENGONGSHULIANG', '直接人工数量') }<br/>（0..n）` }})"></el-table-column>
        </el-table-column>
        <el-table-column :label="language('SHEBEIFEI', '设备费')" align="center">
          <el-table-column prop="h" align="center" width="104" :render-header="h => h('span', { domProps: { innerHTML: `${ language('SHEBEIFEILV', '设备费率') }<br/>（RMB/Hour）` }})"></el-table-column>
        </el-table-column>
        <el-table-column :label="language('JIANJIEZHIZAOCHENGBEN', '间接制造成本')" align="center">
          <el-table-column label="(%)" prop="i" align="center" width="88"></el-table-column> -->
          <el-table-column label="(RMB/Pc.)" prop="j" align="center" width="93"></el-table-column>
        </el-table-column>
        <el-table-column prop="k" align="center" width="100" :render-header="h => h('span', { domProps: { innerHTML: `${ language('RENGONGCHENGBEN', '人工成本') }<br/>（RMB/Pc.）` }})"></el-table-column>
        <el-table-column prop="l" align="center" width="102" :render-header="h => h('span', { domProps: { innerHTML: `${ language('SHEBEICHENGBEN', '设备成本') }<br/>（RMB/Pc.）` }})"></el-table-column>
      </el-table>
    </div>
  </div>  
</template>

<script>
import { iButton } from "rise"

export default {
  components: { iButton },
  props: {
    topCutLine: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      tableListData: [],
      multipleSelection: []
    }
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
}
</style>