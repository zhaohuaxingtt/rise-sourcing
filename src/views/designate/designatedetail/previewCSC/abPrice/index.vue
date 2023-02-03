<!--
 * @Author: yuszhou
 * @Date: 2021-06-09 15:26:57
 * @LastEditTime: 2023-02-03 18:53:51
 * @LastEditors: 余继鹏 917955345@qq.com
 * @Description: fs 供应商 横轴纵轴界面。基于报价分析界面组件。
 * @FilePath: \front-web\src\views\designate\designatedetail\decisionData\abPrice\index.vue
-->
<template>
<div :class="isRoutePreview?'isRoutePreview':''">
  <slot name="tabTitle"></slot>
  <div class="page-nav">
    <iTabsList class="preview-tabs" type="card" v-model='tab'>
      <el-tab-pane name="table">
        <span slot="label"><icon symbol name="iconshenrupingji" class="margin-right10"></icon>Table</span>
      </el-tab-pane>
      <el-tab-pane name="bar">
        <span slot="label"><icon symbol name="iconchubupingji" class="margin-right10"></icon>Bar chart</span>
      </el-tab-pane>
      <el-tab-pane name="line">
        <span slot="label"><icon symbol name="iconAekozengzhiBMdanweixuanzhong" class="margin-right10"></icon> line chart</span>
      </el-tab-pane>
    </iTabsList>
    <el-radio-group v-show="tab=='table'" class="radio-group margin-left20" v-model="tabTable">
      <el-radio-button label="Supplier"></el-radio-button>
      <el-radio-button label="Part"></el-radio-button>
      <el-radio-button label="Best ball"></el-radio-button>
      <el-radio-button label="GS Part"></el-radio-button>
      <el-radio-button label="Detailed Worksheet"></el-radio-button>
    </el-radio-group>
    <el-radio-group v-show="tab=='bar'" class="radio-group margin-left20" v-model="tabBar">
      <el-radio-button label="FSNo1"></el-radio-button>
      <el-radio-button label="FSNo2" name="FSNo2"></el-radio-button>
      <el-radio-button label="FSNo3"></el-radio-button>
      <el-radio-button label="FSNo4"></el-radio-button>
      <el-radio-button label="FSNo5"></el-radio-button>
    </el-radio-group>
  </div>
  <!-- table -->
  <supplierTableList v-show="tab=='table'&&tabTable=='Supplier'"/>
  <!-- bar -->
  <supplierBar v-show="tab=='bar'&&tabBar=='FSNo1'"/>
  <!-- <iCard v-permission.auto="SOURCING_NOMINATION_ATTATCH_ABPRICE|决策资料-abprice">
      <fsandsupplier preview></fsandsupplier>
  </iCard> -->
</div>
</template> 
<script>
import {iCard, iTabsList, icon} from 'rise'
import fsandsupplier from './components/index'
import supplierTableList from './components/components/supplierTableList'
import supplierBar from './components/components/supplierBar'
export default{
  components:{supplierTableList,supplierBar,fsandsupplier,iCard, iTabsList, icon},
  data() {
    return {
      tab: 'table',
      tabTable:'Supplier',
      tabBar:'FSNo1'
    }
  },
  computed:{
    isRoutePreview() {
      return this.$route.query.isPreview == 1
    },
  },
  methods:{
    getbaseInfoData(){
      return {}
    }
  }
}
</script>
<style lang="scss" scoped>
.isRoutePreview{
  ::v-deep .card{
    .cardBody{
      padding-top: 0;
    }  
  }
}
.page-nav{
  display: flex;
  align-items: center;
  ::v-deep .el-radio-group{
    &.radio-group{
      .el-radio-button__inner{
        display: flex;
        border-radius: 0;
        height: 26px;
        padding: 3px 10px;
        align-items: center;
        min-width: 60px;
        justify-content: center;
        &:hover{
          color:#727272
        }
      }
      .el-radio-button__orig-radio:checked+.el-radio-button__inner{
        background: #364d6e;
        color: #fff;
        border-color: #E0E6ED;
      }
    }
  }
}
</style>