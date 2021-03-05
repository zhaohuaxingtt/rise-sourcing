<!--
* @author:shujie
* @Date: 2021-2-25 10:58:09
 * @LastEditors: Please set LastEditors
* @Description: RFQ待办事项
 -->
<template>
  <iTabsList type="border-card">
    <el-tab-pane label="零件清单">
      <partDetailList></partDetailList>
    </el-tab-pane>
    <el-tab-pane label="BDL列表"> BDL列表 </el-tab-pane>
    <el-tab-pane label="供应商评分">
      <supplier-score/>
    </el-tab-pane>
    <el-tab-pane label="CBD设置"> CBD设置 </el-tab-pane>
    <el-tab-pane label="模具预算申请"> 模具预算申请 </el-tab-pane>
    <el-tab-pane label="技术交流会"> 技术交流会 </el-tab-pane>
  </iTabsList>
</template>

<script>
import { iTabsList } from "@/components";
import partDetailList from "./components/partDetaiList";
import supplierScore from "./components/supplierScore";
export default {
  components: {
    iTabsList,
    partDetailList,
    supplierScore
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
</style>
