<!--
 * @Author: 舒杰
 * @Date: 2021-08-03 15:43:21
 * @LastEditTime: 2021-12-10 13:35:40
 * @LastEditors: Please set LastEditors
 * @Description: 内部需求分析概览
 * @FilePath: \front-sourcing\src\views\partsrfq\externalAccessToAnalysisTools\categoryManagementAssistant\internalDemandAnalysis\overView\index.vue
-->
<template>
  <el-row gutter="20">
    <el-col :span="8"
            v-for="(item,index) in list"
            v-permission="item.permissionKey"
            :key="index">
      <div @click="onJump(item)"
           class="cursor cardBox">
        <iCard class="icard">
          <div slot="header">
            <span class="title">{{language(item.key,item.name)}}</span>
          </div>
          <div class="img"
               :style="{'background-image': 'url('+item.image+')'}">
          </div>
        </iCard>
      </div>
    </el-col>
  </el-row>
</template>
<script>
import { iCard, iMessage } from 'rise'
import { getDefaultCostStructure } from '@/api/partsrfq/costAnalysis/index.js'
export default {
  components: {
    iCard,
  },
  data () {
    return {
      list: [
        {
          name: "采购金额总览",
          key: "CAIGOUJINEZONGLAN",
          image: require("@/assets/images/partRfq/internalDemandAnalysis01.png"),
          url: '/sourcing/categoryManagementAssistant/internalDemandAnalysis/purchaseAmountOverall',
          permissionKey:"CATEGORY_ASSISTANT_CGJEZL",
        },{
          name: "产量总览",
          key: "CAILIANGZONGLAN",
          image: require("@/assets/images/partRfq/internalDemandAnalysis02.png"),
          url: "/sourcing/categoryManagementAssistant/internalDemandAnalysis/output",
          permissionKey:"CATEGORY_ASSISTANT_CHANLIANGZONGLAN"
        }, {
          name: "批量供应商概览",
          key: "PLGYSGL",
          image: require("@/assets/images/partRfq/internalDemandAnalysis03.png"),
          url: "/sourcing/categoryManagementAssistant/internalDemandAnalysis/batchSupplier",
          permissionKey:"CATEGORY_ASSISTANT_PLGYSGL"
        }, {
          name: "车型价格对比",
          key: "CHEXINGJIAGEDUIBI",
          image: require("@/assets/images/partRfq/internalDemandAnalysis04.png"),
          url: "/sourcing/categoryManagementAssistant/internalDemandAnalysis/carPrice",
          permissionKey:"CATEGORY_ASSISTANT_CXJGDB"
        }, {
          name: "EKL",
          key: "EKL",
          image: require("@/assets/images/partRfq/internalDemandAnalysis05.png"),
          // url: process.env.VUE_APP_PORTAL_URL + "achievement/baseData/mymerit",
          url: "/sourcing/categoryManagementAssistant/internalDemandAnalysis/ekl",
          permissionKey:"CATEGORY_ASSISTANT_EKL"
        }, {
          name: "SOP进度轴",
          key: "SOPJINDUZHOU",
          image: require("@/assets/images/partRfq/internalDemandAnalysis06.png"),
          url: "/sourcing/categoryManagementAssistant/internalDemandAnalysis/sop",
          permissionKey:"CATEGORY_ASSISTANT_SOP"
        }, {
          name: "成本结构",
          key: "CHENGBENJIEGOU",
          image: require("@/assets/images/partRfq/internalDemandAnalysis07.png"),
          url: "/sourcing/categoryManagementAssistant/internalDemandAnalysis/costAnalysisMain",
          permissionKey:"CATEGORY_ASSISTANT_CHENGBENJIEGOU"
        }, {
          name: "技术路线",
          key: "JISHULUXIAN",
          image: require("@/assets/images/partRfq/internalDemandAnalysis08.png"),
          url: "/sourcing/categoryManagementAssistant/internalDemandAnalysis/technology",
          permissionKey:"CATEGORY_ASSISTANT_JISHULUXIAN"
        }, {
          name: "批量供应商总览",
          key: "PLGYSZL",
          image: require("@/assets/images/partRfq/internalDemandAnalysis09.png"),
          url: '/sourcing/categoryManagementAssistant/internalDemandAnalysis/bulkSupplierPandect',
          permissionKey:"CATEGORY_ASSISTANT_PLGYSZL"
        }, {
          name: "定点历史记录",
          key: "DINGDIANLISHIJILU",
          image: require("@/assets/images/partRfq/internalDemandAnalysis10.png"),
          url: '/sourcing/categoryManagementAssistant/internalDemandAnalysis/historyPoint',
          permissionKey:"CATEGORY_ASSISTANT_DDLSJL"
        }
      ],
      // 成本组成-手工输入
      costAnalysisInputUrl: '/sourcing/categoryManagementAssistant/internalDemandAnalysis/costAnalysisHandleInput',
    }
  },
  methods: {
    onJump (item) {
      if (this.$store.state.rfq.categoryCode) {
        switch (item.key) {
          // 成本结构
          case 'CHENGBENJIEGOU':
            this.getCostData().then(res => {
              if (res.analysisType == "1") {

                //跳转系统
                this.$router.push({
                  path: item.url,
                  query: {
                    default: true,
                    schemeId: res.id || null,
                    operateLog: res.operateLog || null,
                    nomiList: JSON.stringify(res.nomiList)
                    // fsNumList: JSON.stringify(res.nomiList.map(item => item.id))
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
          case 'EKL':
            this.$router.push({
              path: item.url,
              query: {
                // materialCode:this.$store.state.rfq.categoryCode,
                // materialName:this.$store.state.rfq.categoryName,
              }
            })
            // window.open(process.env.VUE_APP_PORTAL_URL + "achievement/baseData/mymerit?materialCode="+this.$store.state.rfq.categoryCode+"&materialName="+this.$store.state.rfq.categoryName)
            break;
          default:
            this.$router.push({
              path: item.url,
              query: item.params || null
            })
            break
        }
      } else {
        this.$parent.$children[0].openCatecory()
      }
    },
    // 获取成本结构数据，用于判断跳转系统/手工页面
    getCostData () {
      const params = {
        categoryCode: this.$store.state.rfq.categoryCode
      }
      return new Promise(resolve => {
        getDefaultCostStructure(params).then(res => {
          if (res && res.code == 200) resolve(res.data)
          else iMessage.error(res.desZh)
        })
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.cardBox {
  margin: 10px 0;
}
.icard {
  height: 406px;
  margin-bottom: 20px;
  .img {
    height: 18rem;
    background-repeat: no-repeat;
    background-position: center;
    cursor: pointer;
  }
}
</style>

