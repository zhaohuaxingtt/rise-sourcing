<template>
  <div class="rawMaterials">
    <i class="topCutLine" v-if="topCutLine"></i>
    <div class="header">
      <span class="title">2.1 {{ language("YUANCAILIAOSANJIANCHENGBEN", "原材料/散件成本") }}</span>
      <div class="control">
        <iButton @click="handleAddOldPart">{{ language("TIANJIAYUANLINGJIANCBD", "添加原零件CBD") }}</iButton>
        <iButton @click="handleAddNewPart">{{ language("TIANJIAXINLINGJIANCBD", "添加新零件CBD") }}</iButton>
        <iButton @click="handleDelete">{{ language("SHANCHUHANG", "删除行") }}</iButton>
      </div>
    </div>
    <div class="body margin-top20">
      <el-table :data="tableListData" @selection-change="selectionChange">
        <el-table-column :label="language('YUANCAILIAOSANJIANCHENGBEN', '原材料/散件成本')" align="center">
          <el-table-column type="selection" align="center" width="55"></el-table-column>
          <el-table-column label="#" prop="index" align="center" width="55" ></el-table-column>
          <el-table-column :label="language('LEIXING', '类型')" prop="type" align="center" width="132" ></el-table-column>
        </el-table-column>
        <el-table-column :label="language('YUANCAILIAOSANJIANMIAOSHU', '原材料/散件描述')" prop="a" align="center" width="120"></el-table-column>
        <el-table-column :label="language('GONGYINGSHANGMINGCHENG', '供应商名称')" prop="b" align="center" width="92"></el-table-column>
        <el-table-column :label="language('YUANCHANGUO', '原产国')" prop="c" align="center" width="87"></el-table-column>
        <el-table-column :label="language('SHIFOUSVWZHIDINGJIAGESANJIAN', '是否SVW指定价格散件')" prop="d" align="center" width="200"></el-table-column>
        <el-table-column prop="e" align="center" width="81" :render-header="h => h('span', { domProps: { innerHTML: `${ language('SHULIANGDANWEI', '数量单位') }<br/>（UoM）` }})"></el-table-column>
        <el-table-column prop="f" align="center" width="120" :render-header="h => h('span', { domProps: { innerHTML: `${ language('DANJIARMBUOM', '单价') }(RMB/UoM)` }})"></el-table-column>
        <el-table-column prop="g" align="center" width="96" :render-header="h => h('span', { domProps: { innerHTML: `${ language('SHULIANG', '数量') }(1..n)` }})"></el-table-column>
        <el-table-column prop="h" align="center" width="140" :render-header="h => h('span', { domProps: { innerHTML: `${ language('ZHIJIEYUANCAILIAOSANJIANCHENGBEN', '直接原材料/散件成本') }<br/>（RMB/Pc.）` }})"></el-table-column>
        <el-table-column :label="language('WULIAOGUANLIFEI', '物料管理费')" align="center">
          <el-table-column label="(%)" prop="i" align="center" width="88"></el-table-column>
          <el-table-column label="(RMB/Pc.)" prop="j" align="center" width="93"></el-table-column>
        </el-table-column>
        <el-table-column prop="k" align="center" width="122" :render-header="h => h('span', { domProps: { innerHTML: `${ language('YUANCAILIAOSANJIANCHENGBEN', '原材料/散件成本') }<br/>（RMB/Pc.）` }})"></el-table-column>
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
}
</style>