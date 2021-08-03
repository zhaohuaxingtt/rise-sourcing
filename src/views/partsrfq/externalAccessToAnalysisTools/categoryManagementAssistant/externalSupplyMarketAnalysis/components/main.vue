<!--
 * @Author: youyuan
 * @Date: 2021-08-03 19:45:03
 * @LastEditTime: 2021-08-03 20:10:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsrfq\externalAccessToAnalysisTools\categoryManagementAssistant\externalSupplyMarketAnalysis\components\main.vue
-->
<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card class="box-card">
          <p class="cardTitle">{{language('SVWGONGYINGSHANGSHICHANGZONGLAN', 'SVW供应商市场总览')}}</p>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card">
          <p class="cardTitle">{{language('HANGYEBAOGAO', '行业报告')}}</p>
          
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card">
          <p class="cardTitle">{{language('SHICHANGSHUJU', '市场数据')}}</p>
          
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card">
          <p class="cardTitle">{{language('GONGYINGLIANGAILAN', '供应链概览（N级供应链管理）')}}</p>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {

    }
  },
  created() {

  },
  methods: {

  }
}
</script>

<style lang='scss' scoped>
.box-card {
  height: 320px;
  margin: 10px 0;
  cursor: pointer;
  .cardTitle {
    font-weight: bold;
    font-size: 20px;
  }
}
 
</style>

