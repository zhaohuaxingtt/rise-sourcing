<!--
 * @Author: yuszhou
 * @Date: 2021-06-09 15:26:57
 * @LastEditTime: 2023-02-10 00:08:06
 * @LastEditors: 余继鹏 917955345@qq.com
 * @Description: fs 供应商 横轴纵轴界面。基于报价分析界面组件。
 * @FilePath: \front-web\src\views\designate\designatedetail\decisionData\abPrice\index.vue
-->
<template>
  <div :class="isRoutePreview ? 'isRoutePreview' : ''">
    <slot name="tabTitle"></slot>
    <div class="page-nav">
      <iTabsList class="preview-tabs" type="card" v-model="tab">
        <el-tab-pane name="table">
          <span slot="label"
            ><icon symbol name="iconshenrupingji" class="margin-right10"></icon
            >Table</span
          >
        </el-tab-pane>
        <el-tab-pane name="bar">
          <span slot="label"
            ><icon symbol name="iconchubupingji" class="margin-right10"></icon
            >Bar chart</span
          >
        </el-tab-pane>
        <el-tab-pane name="line">
          <span slot="label"
            ><icon
              symbol
              name="iconAekozengzhiBMdanweixuanzhong"
              class="margin-right10"
            ></icon>
            line chart</span
          >
        </el-tab-pane>
      </iTabsList>
      <el-radio-group
        v-show="tab == 'table'"
        class="radio-group margin-left20"
        v-model="tabTable"
      >
        <el-radio-button label="Supplier"></el-radio-button>
        <el-radio-button label="Part"></el-radio-button>
        <el-radio-button label="Best ball"></el-radio-button>
        <el-radio-button label="GS Part"></el-radio-button>
        <el-radio-button label="Detailed Worksheet"></el-radio-button>
      </el-radio-group>
      <!-- 柱状图 -->
      <el-radio-group
        v-show="tab == 'bar'"
        class="radio-group margin-left20"
        v-model="tabBar"
        @change="changeCarType"
      >
      <template v-for="item in carTypeList">
        <el-radio-button :label="item.carTypeProjectNum" :key="item.carTypeProjectNum"></el-radio-button>
      </template>
      </el-radio-group>
      <!-- 折线图 -->
      <el-radio-group
        v-show="tab == 'line'"
        class="radio-group margin-left20"
        v-model="tabLine"
        @change="changeRFQ"
      >
      <template v-for="item in rfqList">
        <el-radio-button :label="item.rfqId" :key="item.rfqId"></el-radio-button>
      </template>
      </el-radio-group>
    </div>
    <!-- table:切换必须使用v-if,不然翻页按钮位置会计算错误 -->
    <!-- 重点标注: table必须表头固定,不能出现横向滚动条,不然翻页按钮定位会异常 -->
    <supplierTableList class="content" v-if="tab == 'table' && tabTable == 'Supplier'" />
    <partTableList class="content" v-if="tab == 'table' && tabTable == 'Part'" />
    <bestBallTableList class="content" v-if="tab == 'table' && tabTable == 'Best ball'" />
    <!-- <test v-if="tab == 'table' && tabTable == 'Best ball'" /> -->
    <!-- bar -->
    <supplierBar class="content" v-if="tab == 'bar'" :detail="carTypeDetail" />
    <!-- <supplierBar2 class="content" v-if="tab == 'bar'" :detail="carTypeDetail" /> -->
    <supplierLine class="content" v-if="tab == 'line'" :detail="rfqDetail" />
    <!-- <iCard v-permission.auto="SOURCING_NOMINATION_ATTATCH_ABPRICE|决策资料-abprice">
      <fsandsupplier preview></fsandsupplier>
  </iCard> -->
  </div>
</template> 
<script>
import { iCard, iTabsList, icon } from "rise";
// import fsandsupplier from "./components/index";
// 表格
import supplierTableList from "./components/components/supplierTableList";
import partTableList from "./components/components/partTableList";
import bestBallTableList from "./components/components/bestBallTableList";
import test from "./components/components/test";
// 柱状图
import supplierBar from "./components/components/supplierBar";
import supplierBar2 from "./components/components/supplierBar2";
// 折线图
import supplierLine from "./components/components/supplierLine";
import { analysisNomiCarProject, getListRfq } from "@/api/partsrfq/editordetail/abprice";

export default {
  components: {
    supplierTableList,
    partTableList,
    bestBallTableList,
    test,
    supplierBar,
    supplierBar2,
    supplierLine,
    iCard,
    iTabsList,
    icon,
  },
  data() {
    return {
      tab: "line",
      tabTable: "Supplier",
      // tabTable: "Part",
      tabBar: "",
      carTypeList:[],
      carTypeObj:{},
      carTypeDetail:{},
      rfqList:[],
      rfqObj:{},
      rfqDetail:{},

    };
  },
  computed: {
    isRoutePreview() {
      return this.$route.query.isPreview == 1;
    },
  },
  created(){
    this.analysisNomiCarProject()
    this.getListRfq()
  },
  methods: {
    analysisNomiCarProject(){
      this.carTypeObj = {}
      analysisNomiCarProject({
        nomiId: "60003714" || this.$route.query.desinateId,
      }).then(res=>{
        if(res?.code=='200'){
          this.carTypeList = res.data
          this.carTypeList.forEach(item=>{
            this.carTypeObj[item.carTypeProjectNum] = item
          })
          this.tabBar = this.carTypeList[0]?.carTypeProjectNum||''
          this.changeCarType(this.tabBar)
        }
      })
    },
    changeCarType(val){
      this.carTypeDetail = this.carTypeObj[val]
    },
    getListRfq(){
      getListRfq("60003714" || this.$route.query.desinateId,).then(res=>{
        if(res?.code=='200'){
          this.rfqList = res.data
          this.rfqList.forEach(item=>{
            this.rfqObj[item.rfqId] = item
          })
          this.tabLine = this.rfqList[0]?.rfqId||''
          this.changeRFQ(this.tabLine)
        }
      })
    },
    changeRFQ(val) {
      this.rfqDetail = this.rfqObj[val]
    },
  },
};
</script>
<style lang="scss" scoped>
.isRoutePreview {
  ::v-deep .card {
    .cardBody {
      padding-top: 0;
    }
  }
}
.page-nav {
  display: flex;
  align-items: center;
  ::v-deep .el-radio-group {
    &.radio-group {
      .el-radio-button__inner {
        display: flex;
        border-radius: 0;
        height: 26px;
        padding: 3px 10px;
        align-items: center;
        min-width: 60px;
        justify-content: center;
        &:hover {
          color: #727272;
        }
      }
      .el-radio-button__orig-radio:checked + .el-radio-button__inner {
        background: #364d6e;
        color: #fff;
        border-color: #e0e6ed;
      }
    }
  }
}
.content{
  margin-top: 20px;
  height: calc(100% - 69px);
}
</style>