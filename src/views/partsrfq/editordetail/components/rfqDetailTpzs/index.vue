<!--
 * @Author: yuszhou
 * @Date: 2021-05-25 13:01:23
 * @LastEditTime: 2021-05-28 14:44:14
 * @LastEditors: Please set LastEditors
 * @Description: 报价助手界面
 * @FilePath: \front-web\src\views\partsrfq\editordetail\components\rfqDetailTpzs\index.vue
-->
<template>
  <iTabsList type="card" slot="components" class='margin-top20'>
    <el-tab-pane label="报价分析">
      <template>
         <!--------------------报价评分跟踪----------------------------------------->
         <iCard title="报价与评分跟踪" collapse>
           <quotationScoringTracking></quotationScoringTracking>
         </iCard>
         <!--------------------报价分析汇总----------------------------------------->
         <iCard title="报价分析汇总-零件" collapse class="margin-top20">
           <quotationScoringHZ></quotationScoringHZ>
         </iCard>
         <quotationScoringMj class="margin-top20" titleKey='LK_BJFXHZMJ'></quotationScoringMj>
         <iCard title="报价趋势" collapse class="margin-top20"></iCard>
         <iCard title="业务分配模拟" collapse class="margin-top20"></iCard>
      </template>
    </el-tab-pane>
    <el-tab-pane label="专项分析工具">
      <iCard>
        
      </iCard>
    </el-tab-pane>
    <el-tab-pane label="谈判基本信息">
      <iCard>

      </iCard>
    </el-tab-pane>
  </iTabsList>
</template>
<script>
import {iTabsList,iCard} from 'rise'
import quotationScoringTracking from './components/quotationScoringTracking'
import quotationScoringMj from './components/quotationScoringMj'
import quotationScoringHZ from './components/quotationScoringHz'
export default{
  components:{iTabsList,iCard,quotationScoringTracking,quotationScoringMj,quotationScoringHZ}
}
</script>
<style lang='scss' scoped>
</style>