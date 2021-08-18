<!--
 * @Author: youyuan
 * @Date: 2021-08-03 19:45:03
 * @LastEditTime: 2021-08-17 17:09:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-sourcing\src\views\partsrfq\externalAccessToAnalysisTools\categoryManagementAssistant\externalSupplyMarketAnalysis\overView\index.vue
-->
<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card class="cardBox">
          <div @click="clickCard(card1Param)">
            <p class="cardTitle">{{ language('SVWGONGYINGSHANGSHICHANGZONGLAN', 'SVW供应商市场总览') }}</p>
            <div class="imgBox">
              <img src="@/assets/images/out_supplier.png" alt="">
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="cardBox">
          <div @click="clickCard(card2Param)">
            <p class="cardTitle">{{ language('HANGYEBAOGAO', '行业报告') }}</p>
            <div class="imgBox">
              <img src="@/assets/images/out_industry_report.png" alt="">
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="cardBox">
          <div @click="clickCard(card3Param)">
            <p class="cardTitle">{{ language('SHICHANGSHUJU', '市场数据') }}</p>
            <div class="imgBox">
              <img src="@/assets/images/out_market.png" alt="">
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="cardBox">
          <div @click="clickCard(card4Param)">
            <p class="cardTitle">{{ language('GONGYINGLIANGAILAN', '供应链概览（N级供应链管理）') }}</p>
            <div class="imgBox">
              <img src="@/assets/images/out_supply_chain.png" alt="">
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      card1Param: {
        url: '/sourcing/categoryManagementAssistant/externalSupplyMarketAnalysis/svw',
        data: {},
      },
      card2Param: {
        url: '/sourcing/categoryManagementAssistant/externalSupplyMarketAnalysis/industryReport',
        data: {},
      },
      card3Param: {
        url: '/sourcing/categoryManagementAssistant/externalSupplyMarketAnalysis/marketData',
        data: {},
      },
      card4Param: {
        url: '/sourcing/categoryManagementAssistant/externalSupplyMarketAnalysis/supplyChainOverall',
        data: {},
      },
    };
  },
  created() {

  },
  methods: {
    clickCard(params) {
      if(this.$store.state.rfq.categoryCode){
        this.$router.push({
          path: params.url,
          query: params.data,
        });
      } else {
        this.$parent.$children[0].openCatecory()
      }
    },
  },
};
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

