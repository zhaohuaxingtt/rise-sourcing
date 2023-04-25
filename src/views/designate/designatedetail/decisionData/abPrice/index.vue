<!--
 * @Author: yuszhou
 * @Date: 2021-06-09 15:26:57
 * @LastEditTime: 2023-04-25 17:55:20
 * @LastEditors: 余继鹏 917955345@qq.com
 * @Description: fs 供应商 横轴纵轴界面。基于报价分析界面组件。
 * @FilePath: \front-web\src\views\designate\designatedetail\decisionData\abPrice\index.vue
-->
<template>
  <div class="abPrice" :class="isRoutePreview ? 'isRoutePreview' : ''">
    <slot name="tabTitle"></slot>
    <iCard
      v-permission.auto="
        SOURCING_NOMINATION_ATTATCH_ABPRICE | (决策资料 - abprice)
      "
    >
      <div class="card-header">
        <div v-if="!nominationDisabled && !rsDisabled">
          <span class="margin-right20">默认展示:</span>
          <i-select v-model="defaultTable" style="width:200px" @change="changeStatus">
            <template v-for="item in config_list">
              <el-option v-if="config_Name[item.operateCode]" :value="item.operateCode" :label="config_Name[item.operateCode]" :key="item.operateCode"></el-option>
            </template>
          </i-select>
        </div>
        <div class="btn-list" v-if="!nominationDisabled && !rsDisabled">
          <iButton @click="visible = true">输入VSI</iButton>
          <iButton v-show="false" @click="strategyVisible = true">strategy</iButton>
        </div>
      </div>
      <!-- <abPrice ref="abPrice" :strategy="strategy" />
      <abPriceGS ref="abPrice" :strategy="strategy" /> -->
      <component ref="abPrice" :is="component" :key="component" :strategy="strategy" />
    </iCard>

    <editDialog
      v-if="visible"
      :visible.sync="visible"
      :carTypeList="carTypeList"
      @getData="getData"
    />

    <strategyDialog
      v-if="strategyVisible"
      :visible.sync="strategyVisible"
      :strategy="strategy"
      @updateData="updateNomiRemark"
      @close="close"
    />
  </div>
</template> 
<script>
import { iButton, iCard, iSelect } from "rise";
import editDialog from "./components/editDialog";
import strategyDialog from "./components/strategyDialog";
import abPrice from "./abPrice"; // UI一样,但是布局需要调整
import abPriceGS from "./abPriceGS"; // UI一样,但是布局需要调整
import {
  getList,
  update,
  analysisNomiCarProject,
  getNomiRemark,
  updateNomiRemark,
} from "@/api/partsrfq/editordetail/abprice";
export default {
  components: { editDialog, strategyDialog, iButton, iCard, abPrice, iSelect, abPriceGS },
  props:{
    isGS:{
      type:Boolean,
      default: false
    }
  },
  computed: {
    isRoutePreview() {
      return this.$route.query.isPreview == 1;
    },
  },
  data() {
    return {
      visible: false,
      strategyVisible: false,
      carTypeList: [],
      config_Name:{
        gs_part:'Detail',
        supplier:'Supplier',
        part:'Part',
        best_ball:'Best ball',
      },
      config_list:[],
      strategy: "",
      defaultTable:'',
      component:''
    };
  },
  computed:{
    ...Vuex.mapState({
      nominationDisabled: state => state.nomination.nominationDisabled,
      rsDisabled: state => state.nomination.rsDisabled,
    }),
  },
  watch:{
    isGS:{
      handler(val){
        if(val){
          this.component = "abPriceGS";
        }else{
          this.component = "abPrice";
        }
      },
      immediate:true
    }
  },
  created() {
    this.getList()
    this.getNomiRemark();
    this.analysisNomiCarProject();
  },
  methods: {
    getList() {
      getList({
        businessId:this.$route.query.desinateId,
        type: "nominate_ab_price",
      }).then(res=>{
        this.config_list = res.data
        this.defaultTable = res.data.find(item=>{return item.isShow})?.operateCode || 'gs_part'
      })
    },
    changeStatus() {
      let params = this.config_list.map(item=>{
        item.isShow = false
        if(item.operateCode==this.defaultTable){
          item.isShow = true
        }
        return item
      });
      update(params)
    },
    getData() {
      this.$refs.abPrice.findVsi()
    },
    getNomiRemark() {
      getNomiRemark(this.$route.query.desinateId).then((res) => {
        if (res?.code == "200") {
          this.strategy = res.data.strategy;
        }
      });
    },
    close(){
      this.strategyVisible = false
    },
    updateNomiRemark(val) {
      this.strategyVisible = false
      updateNomiRemark({
        nominateId: this.$route.query.desinateId,
        strategy: val,
      }).then((res) => {
        if (res?.code == "200") {
          this.strategy = val;
        }
      });
    },
    analysisNomiCarProject() {
      this.carTypeObj = {};
      analysisNomiCarProject({
        nomiId: this.$route.query.desinateId,
      }).then((res) => {
        if (res?.code == "200") {
          this.carTypeList = res.data;
          this.carTypeList.forEach((item) => {
            this.carTypeObj[item.carTypeProjectNum] = JSON.parse(
              JSON.stringify(item)
            );
          });
          this.tabBar = this.carTypeList[0]?.carTypeProjectNum || "";
        }
      });
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
.card-header{
  display: flex;
  font-size: 16px;
  margin-bottom: 10px;
  justify-content: space-between;
  .btn-list {
    text-align: right;
  }
}
.abPrice {
  ::v-deep * {
    font-family: "Arial", "Helvetica", "sans-serif";
    letter-spacing: 0;
    &::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }
    &::-webkit-scrollbar-thumb {
      min-height: 8px;
      min-width: 8px;
    }
    &::-webkit-scrollbar-track {
      width: 8px;
    }
  }
  .tab-nav {
    height: 54px;
  }
  .nomination-content {
    height: calc(100% - 54px);
    .page-content {
      padding-top: 20px;
      height: 100%;
      overflow: auto;
      display: flex;
      flex-flow: column;
    }
  }
  ::v-deep .decision-header.preview-header {
    padding: 0;
    background-color: transparent;
  }
  ::v-deep.el-tabs--card {
    .el-tabs__header {
      margin-bottom: 15px;
    }
    .el-tabs__nav-wrap {
      height: unset;
    }
  }
  ::v-deep .el-table {
    border-radius: 0;
    font-size: 16px;
    th.gutter:last-of-type {
      background: #fff;
      border: 0;
    }
    .el-table__header {
      th {
        border-color: #d9d9d9;
        .cell {
          color: #fff;
          line-height: 20px;
        }
      }
    }
    .el-table__body-wrapper,
    .el-table__fixed-body-wrapper {
      tr:nth-child(even) {
        background-color: #ffffff;
      }

      tr:last-of-type {
        td {
          border-bottom: 1px solid #d9d9d9;
        }
      }

      td {
        border-color: #d9d9d9;
        border-top: 1px solid #d9d9d9;
        .cell {
          line-height: 20px;
        }
      }
    }
    tr {
      border-top: 1px solid #d9d9d9;
      .link {
        color: #364d6e;
        text-decoration: underline;
      }
    }
  }
  ::v-deep .i-pagination {
    margin-bottom: 5px;
    height: 35px;
    margin-top: 10px;
    .pagination {
      margin-top: 0;
      .el-pager li:not(.disabled).active {
        background-color: #364d6e;
      }
    }
  }
}
</style>