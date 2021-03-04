<template>
  <div>
    <iTabsList class="margin-top20" type='border-card'>
      <el-tab-pane label="⽬标价">
        <target-price/>
      </el-tab-pane>
      <el-tab-pane label="参考产量">
        <reference-output/>
      </el-tab-pane>
      <el-tab-pane label="物流要求">
        <logistics-requirements/>
      </el-tab-pane>
      <el-tab-pane label="询价附件"></el-tab-pane>
      <el-tab-pane label="BOM单信息"></el-tab-pane>
    </iTabsList>
  </div>
</template>

<script>
import {iCard, iFormGroup, iFormItem, iText, iInput, iButton, iTabsList} from "@/components";
import targetPrice from './components/targetPrice'
import referenceOutput from './components/referenceOutput'
import logisticsRequirements from './components/logisticsRequirements'

export default {
  components: {
    iTabsList,
    targetPrice,
    referenceOutput,
    logisticsRequirements
  },
  data() {
    return {
      editStatus: false
    }
  },
  methods: {}
}
</script>

<style scoped lang="scss">
.mt20 {
  margin-top: 20px;
}


</style>