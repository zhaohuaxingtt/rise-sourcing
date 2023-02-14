<!--
 * @Author: yuszhou
 * @Date: 2021-06-09 15:26:57
 * @LastEditTime: 2023-02-14 23:42:28
 * @LastEditors: 余继鹏 917955345@qq.com
 * @Description: fs 供应商 横轴纵轴界面。基于报价分析界面组件。
 * @FilePath: \front-web\src\views\designate\designatedetail\decisionData\abPrice\index.vue
-->
<template>
  <div :class="isRoutePreview ? 'isRoutePreview' : ''">
    <slot name="tabTitle"></slot>
    <div class="page-nav">
      <div class="nav">
        <div class="tab-list">
          <div
            @click="changeTab(item.value)"
            v-for="item in tabList"
            :key="item.label"
            class="tab-label cursor"
            :class="{ 'is-active': tab == item.value }"
          >
            <img
              class="icon margin-right5"
              :src="tab == item.value ? item.activeImg : item.img"
              alt=""
            />
            <span>
              {{ item.label }}
            </span>
          </div>
        </div>
        <el-radio-group
          v-show="tab == 'table'"
          class="radio-group margin-left20"
          v-model="tabTable"
          @change="change"
        >
          <el-radio-button label="Supplier"></el-radio-button>
          <el-radio-button label="Part"></el-radio-button>
          <el-radio-button label="Best ball"></el-radio-button>
          <el-radio-button label="GS Part"></el-radio-button>
          <el-radio-button
            label="Detailed Worksheet"
            @click="exportExcel"
          ></el-radio-button>
        </el-radio-group>
        <!-- 柱状图 -->
        <el-radio-group
          v-show="tab == 'bar'"
          class="radio-group margin-left20"
          v-model="tabBar"
          @change="changeCarType"
        >
          <template v-for="item in carTypeList">
            <el-radio-button
              :label="item.carTypeProjectNum"
              :key="item.carTypeProjectNum"
            ></el-radio-button>
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
            <el-radio-button
              :label="item.rfqId"
              :key="item.rfqId"
            ></el-radio-button>
          </template>
        </el-radio-group>
      </div>
      <!-- <div class="header-btn">
        <iButton @click="visible = true">编辑</iButton>
      </div> -->
    </div>
    <!-- table:切换必须使用v-if,不然翻页按钮位置会计算错误 -->
    <!-- 重点标注: table必须表头固定,不能出现横向滚动条,不然翻页按钮定位会异常 -->
    <supplierTableList
      class="content"
      v-if="
        (tab == 'table' && tabTable == 'Supplier') ||
        tabTable == 'Detailed Worksheet'
      "
    />
    <partTableList
      class="content"
      v-if="tab == 'table' && tabTable == 'Part'"
    />
    <bestBallTableList
      class="content"
      v-if="tab == 'table' && tabTable == 'Best ball'"
    />
    <!-- bar -->
    <supplierBar class="content" v-if="tab == 'bar'" :detail="carTypeDetail" />
    <!-- <supplierBar2 class="content" v-if="tab == 'bar'" :detail="carTypeDetail" /> -->
    <supplierLine class="content" v-if="tab == 'line'" :detail="rfqDetail" />
    <editDialog
      v-if="visible"
      :visible.sync="visible"
      :carTypeList="this.carTypeList"
    />
  </div>
</template> 
<script>
import { iCard, iTabsList, icon, iButton } from "rise";
import editDialog from "./components/editDialog";

// 表格
import supplierTableList from "./components/supplierTableList";
import partTableList from "./components/partTableList";
import bestBallTableList from "./components/bestBallTableList";
// 柱状图
import supplierBar from "./components/supplierBar";
import supplierBar2 from "./components/supplierBar2";
// 折线图
import supplierLine from "./components/supplierLine";
// 图片
import table from "@/assets/images/icon/table.png";
import tableActive from "@/assets/images/icon/table-active.png";
import bar from "@/assets/images/icon/bar.png";
import barActive from "@/assets/images/icon/bar-active.png";
import line from "@/assets/images/icon/line.png";
import lineActive from "@/assets/images/icon/line-active.png";

import {
  analysisNomiCarProject,
  getListRfq,
} from "@/api/partsrfq/editordetail/abprice";
import { exportFsSupplierAsRowByNomiId } from "@/api/partsrfq/editordetail";
export default {
  components: {
    editDialog,
    supplierTableList,
    partTableList,
    bestBallTableList,
    supplierBar,
    supplierBar2,
    supplierLine,
    iCard,
    iTabsList,
    icon,
    iButton,
  },
  data() {
    return {
      table,
      tableActive,
      bar,
      barActive,
      line,
      lineActive,
      tabList: [
        {
          label: "Table",
          value: "table",
          activeImg: tableActive,
          img: table,
        },
        {
          label: "Bar chart",
          value: "bar",
          activeImg: barActive,
          img: bar,
        },
        {
          label: "Line chart",
          value: "line",
          activeImg: lineActive,
          img: line,
        },
      ],
      tab: "table",
      tabTable: "Supplier",
      tabBar: "",
      tabLine: "",
      carTypeList: [],
      carTypeObj: {},
      carTypeDetail: {},
      rfqList: [],
      rfqObj: {},
      rfqDetail: {},
      visible: false,
    };
  },
  computed: {
    isRoutePreview() {
      return this.$route.query.isPreview == 1;
    },
  },
  created() {
    this.analysisNomiCarProject();
    this.getListRfq();
  },
  methods: {
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
          this.changeCarType(this.tabBar);
        }
      });
    },
    changeTab(tab) {
      this.tab = tab;
    },
    changeCarType(val) {
      this.carTypeDetail = this.carTypeObj[val];
    },
    getListRfq() {
      getListRfq(this.$route.query.desinateId).then((res) => {
        if (res?.code == "200") {
          this.rfqList = res.data;
          this.rfqList.forEach((item) => {
            this.rfqObj[item.rfqId] = item;
          });
          this.tabLine = this.rfqList[0]?.rfqId || "";
          this.changeRFQ(this.tabLine);
        }
      });
    },
    changeRFQ(val) {
      this.rfqDetail = this.rfqObj[val];
      console.log(this.rfqDetail);
    },
    change(val) {
      if (val == "Detailed Worksheet") {
        this.exportExcel();
        this.tabTable = "Supplier";
      }
    },
    exportExcel() {
      exportFsSupplierAsRowByNomiId(this.$route.query.desinateId, [
        "EBR",
        "Volume",
        "Invest Budget",
        "Prod. Loc.",
        "Dev.\nCost",
        "Supplier \nSOP Date",
        "Total\n Turnover",
      ]);
    },
  },
};
</script>
<style lang="scss" scoped>
.page-nav {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .nav {
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
    .tab-list {
      height: 100%;
      background: #f2f2f2;
      border-radius: 8px;
      padding: 5px 3px;
      font-size: 16px;
    }
    .tab-label {
      display: inline-flex;
      padding: 5px;
      border-radius: 5px;
      color: #7f7f7f;
      &.is-active {
        background: #fff;
        color: #0092eb;
      }
    }
    .icon {
      width: 17px;
      vertical-align: middle;
    }
  }
}
.content {
  margin-top: 20px;
  height: calc(100% - 74px);
  overflow: auto;
}
</style>