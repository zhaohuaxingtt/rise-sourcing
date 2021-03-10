<template>
  <div>
    <iTabsList class="margin-top20" type='border-card'>
      <el-tab-pane label="⽬标价">
        <target-price/>
      </el-tab-pane>
      <el-tab-pane label="参考产量及时间计划">
        <reference-output/>
      </el-tab-pane>
      <el-tab-pane label="物流要求">
        <logistics-requirements/>
      </el-tab-pane>
      <el-tab-pane label="询价附件">
        <inquiry-attachment/>
      </el-tab-pane>
      <el-tab-pane label="BOM单信息">
        <bom-list/>
      </el-tab-pane>
    </iTabsList>
  </div>
</template>

<script>
import {iTabsList} from "@/components";
import targetPrice from './components/targetPrice'
import referenceOutput from './components/referenceOutput'
import logisticsRequirements from './components/logisticsRequirements'
import inquiryAttachment from './components/inquiryAttachment'
import bomList from './components/bom'

export default {
  components: {
    iTabsList,
    targetPrice,
    referenceOutput,
    logisticsRequirements,
    inquiryAttachment,
    bomList
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