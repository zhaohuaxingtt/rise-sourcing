<!--
 * @Author: yuszhou
 * @Date: 2021-05-28 14:32:04
 * @LastEditTime: 2021-05-30 00:29:03
 * @LastEditors: ldh
 * @Description: 报价分析汇总表格
 * @FilePath: \front-web\src\views\partsrfq\editordetail\components\rfqDetailTpzs\components\quotationScoringHz\index.vue
-->
<template>
  <div>
    <div class="quotationHz margin-bottom20">
      <!--------------输入框模块-------------->
      <div class='search'>
        <div>
          <span>Hide/unHide：</span>
          <iSelect></iSelect> 
        </div>
        <div>
          <span>Quota. Round：</span>
          <iSelect></iSelect> 
        </div>
        <div>
          <span>Layout: </span>
          <iSelect></iSelect> 
        </div>            
      </div>
      <div class="btnSearch">
        <iButton @click="quote">是否引用询价轮次报价</iButton>
        <iButton>组合</iButton>
        <iButton>取消组合</iButton>
        <iButton>导出</iButton>
      </div>
      <!--------------表格模块-------------->
    </div>
    <tableList :tableTitle='title' :tableData='exampelData'></tableList>
  </div>
</template>
<script>
import {iButton,iSelect} from 'rise'
import tableList from './components/table'
import {title,exampelData} from './components/data'
export default{
  components:{iButton,iSelect,tableList},
  data(){return {
    title:title,
    exampelData:exampelData
  }},
  methods: {
    quote() {
      this.$confirm('是否引用询价轮次报价?', '引用询价轮次报价', {
        confirmButtonText: '是',
        cancelButtonText: '否',
      })
      .then(() => {})
      .catch(() => {});
    }
  }
}
</script>
<style lang='scss' scoped>
  .quotationHz{
    display: flex;
    justify-content: space-between;
    .search{
      &>div{
        float: left;
        margin-right: 20px;
        display: flex;
        justify-content: space-between;
        span{
          width: 160px;
          line-height: 30px;
          font-size: 14px;
        }
      }
    }
  }
</style>
