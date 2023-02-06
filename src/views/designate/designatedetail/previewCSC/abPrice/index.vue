<!--
 * @Author: yuszhou
 * @Date: 2021-06-09 15:26:57
 * @LastEditTime: 2023-02-06 14:16:56
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
      <el-radio-group
        v-show="tab == 'bar'"
        class="radio-group margin-left20"
        v-model="tabBar"
        @change="changeFS"
      >
      <template v-for="item in carTypeList">
        <el-radio-button :label="item.carTypeProjectNum" :key="item.carTypeProjectNum"></el-radio-button>
      </template>
      </el-radio-group>
    </div>
    <!-- table:切换必须使用v-if,不然翻页按钮位置会计算错误 -->
    <!-- 重点标注: table必须表头固定,不能出现横向滚动条,不然翻页按钮定位会异常 -->
    <supplierTableList v-if="tab == 'table' && tabTable == 'Supplier'" />
    <partTableList v-if="tab == 'table' && tabTable == 'Part'" />
    <bestBallTableList v-if="tab == 'table' && tabTable == 'Best ball'" />
    <!-- <test v-if="tab == 'table' && tabTable == 'Best ball'" /> -->
    <!-- bar -->
    <supplierBar v-if="tab == 'bar'" :detail="carTypeDetail" />
    <!-- <supplierBar2 v-if="tab == 'bar'" :detail="carTypeDetail" /> -->
    <supplierLine v-if="tab == 'line'" :detail="carTypeDetail" />
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
import { analysisNomiCarProject } from "@/api/partsrfq/editordetail/abprice";

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
      tab: "table",
      tabTable: "Supplier",
      // tabTable: "Part",
      tabBar: "",
      carTypeList:[],
      carTypeObj:{},
      carTypeDetail:{}
    };
  },
  computed: {
    isRoutePreview() {
      return this.$route.query.isPreview == 1;
    },
  },
  created(){
    this.setFS()
  },
  methods: {
    setFS(){
      this.carTypeObj = {}
      analysisNomiCarProject({
        nomiId: "60003714" || this.$route.query.desinateId,
      }).then(res=>{
        console.log(res);
        if(res?.code=='200'){
          this.carTypeList = res.data
          this.carTypeList.forEach(item=>{
            this.carTypeObj[item.carTypeProjectNum] = item
          })
          this.tabBar = this.carTypeList[0].carTypeProjectNum
          this.changeFS(this.tabBar)
        }
      })
    },
    changeFS(val){
      this.carTypeDetail = this.carTypeObj[val]
      console.log(this.carTypeDetail);
    },
    getbaseInfoData() {
      return {};
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
</style>