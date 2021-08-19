<!--
 * @Author: 舒杰
 * @Date: 2021-08-03 15:43:21
 * @LastEditTime: 2021-08-18 11:01:10
 * @LastEditors: Please set LastEditors
 * @Description: 内部需求分析概览
 * @FilePath: \front-sourcing\src\views\partsrfq\externalAccessToAnalysisTools\categoryManagementAssistant\internalDemandAnalysis\overView\index.vue
-->
<template>
   <el-row gutter="20">
      <el-col :span="8" v-for="(item,index) in list" :key="index">
         <iCard class="icard" :title='language(item.key,item.name)'>
            <div @click="onJump(item)" class="img">
               <img :src="item.image">
            </div>     
         </iCard> 
      </el-col>
   </el-row>
</template>
<script>
import {iCard, iMessage} from 'rise'
import { getDefaultCostStructure } from '@/api/partsrfq/costAnalysis/index.js'
export default {
  components: {
    iCard,
  },
  data () {
     return {
        list:[
           {
              name:"采购金额总览",
              key:"CAIGOUJINEZONGLAN",
              image:require("@/assets/images/partRfq/internalDemandAnalysis01.png"),
              url:'/sourcing/categoryManagementAssistant/internalDemandAnalysis/purchaseAmountOverall'
           },
           {
              name:"产量总览",
              key:"CAILIANGZONGLAN",
              image:require("@/assets/images/partRfq/internalDemandAnalysis02.png"),
              url:"/sourcing/categoryManagementAssistant/internalDemandAnalysis/output"
           },{
              name:"批量供应商概览",
              key:"PLGYSGL",
              image:require("@/assets/images/partRfq/internalDemandAnalysis03.png"),
              url:"/sourcing/categoryManagementAssistant/internalDemandAnalysis/batchSupplier"
           },{
              name:"车型价格对比",
              key:"CHEXINGJIAGEDUIBI",
              image:require("@/assets/images/partRfq/internalDemandAnalysis04.png"),
              url:"/sourcing/categoryManagementAssistant/internalDemandAnalysis/carPrice"
           },{
              name:"EKL",
              key:"EKL",
              image:require("@/assets/images/partRfq/internalDemandAnalysis05.png")
           },{
              name:"SOP进度轴",
              key:"SOPJINDUZHOU",
              image:require("@/assets/images/partRfq/internalDemandAnalysis06.png"),
              url:"/sourcing/categoryManagementAssistant/internalDemandAnalysis/sop"
           },{
              name:"成本组成",
              key:"CHENGBENZUCHENG",
              image:require("@/assets/images/partRfq/internalDemandAnalysis07.png"),
              url:"/sourcing/categoryManagementAssistant/internalDemandAnalysis/costAnalysisMain"
           },{
              name:"技术路线",
              key:"JISHULUXIAN",
              image:require("@/assets/images/partRfq/internalDemandAnalysis08.png"),
              url:"/sourcing/categoryManagementAssistant/internalDemandAnalysis/technology"
           },{
              name:"批量供应商概览",
              key:"PLGYJZL",
              image:require("@/assets/images/partRfq/internalDemandAnalysis09.png"),
              url:'/sourcing/categoryManagementAssistant/internalDemandAnalysis/bulkSupplierPandect'
           },{
              name:"定点历史记录",
              key:"DINGDIANLISHIJILU",
              image:require("@/assets/images/partRfq/internalDemandAnalysis10.png"),
              url:'/sourcing/categoryManagementAssistant/internalDemandAnalysis/historyPoint'
           }
        ],
        // 成本组成-手工输入
        costAnalysisInputUrl: '/sourcing/categoryManagementAssistant/internalDemandAnalysis/costAnalysisHandleInput',
     }
  },
  methods: {
    onJump(item){
      if(this.$store.state.rfq.categoryCode){
        switch (item.key) {
          // 成本结构
          case 'CHENGBENZUCHENG':
            this.getCostData().then(res => {
              if(res.analysisType == "1") {
                //跳转系统
                this.$router.push({
                  path: item.url,
                  query: {
                    schemeId: res.id || null
                  }
                })
              } else {
                //跳转手工
                this.$router.push({
                  path: this.costAnalysisInputUrl,
                  query: {
                    schemeId: res.id || null,
                    operateLog: res.operateLog || null
                  }
                })
              }
            })
            break;
          default:
            this.$router.push({
              path: item.url,
              query: item.params || null
            })
          break  
        }
      }else{
         this.$parent.$children[0].openCatecory()
      }
    },
    // 获取成本结构数据，用于判断跳转系统/手工页面
    getCostData() {
      const params = {
        categoryCode: this.$store.state.rfq.categoryCode
      }
      return new Promise(resolve => {
        getDefaultCostStructure(params).then(res => {
          if(res && res.code == 200) resolve(res.data)
          else iMessage.error(res.desZh)
        })
      })
    }
  }
};
</script>

<style lang="scss" scoped>
   .icard{
      height: 406px;
      margin-bottom: 20px;
      .img{
         height: 100%;
         cursor: pointer;
         img{
            width: 100%;
         }
      }
   } 
</style>

