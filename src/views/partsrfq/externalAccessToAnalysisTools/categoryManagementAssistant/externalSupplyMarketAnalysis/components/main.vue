<!--
 * @Author: youyuan
 * @Date: 2021-08-03 19:45:03
 * @LastEditTime: 2021-08-03 22:17:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsrfq\externalAccessToAnalysisTools\categoryManagementAssistant\externalSupplyMarketAnalysis\components\main.vue
-->
<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card class="cardBox">
          <p class="cardTitle">{{language('SVWGONGYINGSHANGSHICHANGZONGLAN', 'SVW供应商市场总览')}}</p>
          <div class="imgBox">
            <img src="@/assets/images/out_supplier.png" alt="">
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="cardBox">
          <p class="cardTitle">{{language('HANGYEBAOGAO', '行业报告')}}</p>
          <div class="imgBox">
            <img src="@/assets/images/out_industry_report.png" alt="">
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="cardBox">
          <p class="cardTitle">{{language('SHICHANGSHUJU', '市场数据')}}</p>
          <div class="imgBox">
            <img src="@/assets/images/out_market.png" alt="">
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="cardBox">
          <p class="cardTitle">{{language('GONGYINGLIANGAILAN', '供应链概览（N级供应链管理）')}}</p>
          <div class="imgBox"> 
            <img src="@/assets/images/out_supply_chain.png" alt="">
          </div>
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
.cardBox {
  height: 380px;
  margin: 10px 0;
  cursor: pointer;
  .cardTitle {
    font-weight: bold;
    font-size: 20px;
  }
  .imgBox {
    margin-top: 20px;
    img {
      height: 285px;
      width: 100%;
    }
  }
}
 
</style>

