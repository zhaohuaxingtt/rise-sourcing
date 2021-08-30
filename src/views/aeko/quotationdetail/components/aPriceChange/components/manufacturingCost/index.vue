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
        <el-table-column :label="language('DUIYINGYUANCAILIAOSANJIANREFID', '对应原材料/散件 (Ref.-ID)')" prop="a" align="center" width="178"></el-table-column>
        <el-table-column :label="language('SHEBEIMINGCHENGXINGHAOREFNAME', '设备名称/型号 (Ref.-Name)')" prop="b" align="center" width="180"></el-table-column>
        <el-table-column :label="language('SHANGQIDAZHONGZHUANYONGSHEBEIFEI', '上汽大众专用设备费 (RMB)')" prop="c" align="center" width="178"></el-table-column>
        <el-table-column :label="language('SHENGCHANJIEPAI', '生产节拍 (Sec.)')" prop="d" align="center" width="112"></el-table-column>
        <el-table-column :label="language('JIANSHUSHENGCHANJIEPAIINT', '件数/生产节拍 (1..n)')" prop="e" align="center" width="136"></el-table-column>
        <el-table-column :label="language('RENGONGCHENGBEN', '人工成本')" align="center">
          <el-table-column :label="language('ZHIJIERENGONGFEILVRMBHOUR', '直接人工费率 (RMB/Hour)')" prop="f" align="center" width="175"></el-table-column>
          <el-table-column :label="language('ZHIJIERENGONGSHULIANGINT', '直接人工数量 (0..n)')" prop="g" align="center" width="130"></el-table-column>
        </el-table-column>
        <el-table-column :label="language('SHEBEIFEI', '设备费')" align="center">
          <el-table-column :label="language('SHEBEIFEILVRMBHOUR', '设备费率 (RMB/Hour)')" prop="h" align="center" width="152"></el-table-column>
        </el-table-column>
        <el-table-column :label="language('JIANJIEZHIZAOCHENGBEN', '间接制造成本')" align="center">
          <el-table-column label="(%)" prop="i" align="center" width="88"></el-table-column> -->
          <el-table-column label="(RMB/Pc.)" prop="j" align="center" width="93"></el-table-column>
        </el-table-column>
        <el-table-column :label="language('RENGONGCHENGBENRMBPC', '人工成本 (RMB/Pc.)')" prop="k" align="center" width="156"></el-table-column>
        <el-table-column :label="language('SHEBEICHENGBENRMBPC', '设备成本 (RMB/Pc.)')" prop="l" align="center" width="156"></el-table-column>
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