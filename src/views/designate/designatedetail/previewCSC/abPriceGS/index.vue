<!--
 * @Author: yuszhou
 * @Date: 2021-06-09 15:26:57
 * @LastEditTime: 2023-03-23 14:32:32
 * @LastEditors: 余继鹏 917955345@qq.com
 * @Description: fs 供应商 横轴纵轴界面。基于报价分析界面组件。
 * @FilePath: \front-web\src\views\designate\designatedetail\previewCSC\abPriceGS\index.vue
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
          <el-radio-button label="supplier" v-if="config.supplier.isShow"
            >Supplier</el-radio-button
          >
          <el-radio-button label="part" v-if="config.part.isShow"
            >Part</el-radio-button
          >
          <el-radio-button label="best_ball" v-if="config['best_ball'].isShow"
            >Best ball</el-radio-button
          >
          <el-radio-button label="gs_part" v-if="config['gs_part'].isShow"
            >GS Part</el-radio-button
          >
          <el-radio-button
            v-if="config['Detailed_Worksheet'].isShow"
            label="Detailed_Worksheet"
            @click="exportExcel"
            >Detailed Worksheet</el-radio-button
          >
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
        <div class="margin-left20">
          <iButton class="margin-left20" v-show="false" @click="visible = true"
            >strategy</iButton
          >
        </div>
      </div>
      <div class="header-btn" v-if="tab == 'table' && index > -1">
        <template v-if="tabTable == 'best_ball'">
          <span> 当前展示第{{ index + 1 }}页，总共 2 页 </span>
          <img :src="left" alt="lrft" class="allow" @click="prev" />
          <span v-if="tabTable == 'best_ball'"> {{ index + 1 }} / 2 </span>
          <span v-else>
            {{ index + 1 }}/{{ Math.ceil(total / showLength) }}
          </span>
          <img :src="right" alt="right" class="allow" @click="next" />
        </template>
        <template v-else-if="Math.ceil(total / showLength) > 1">
          <span>
            当前展示{{ index * showLength + 1 }}到{{
              (index + 1) * showLength > total
                ? total
                : (index + 1) * showLength
            }}列，总共{{ total }}列
          </span>
          <img :src="left" alt="lrft" class="allow" @click="prev" />
          <span v-if="tabTable == 'best_ball'"> {{ index + 1 }} / 2 </span>
          <span v-else>
            {{ index + 1 }}/{{ Math.ceil(total / showLength) }}
          </span>
          <img :src="right" alt="right" class="allow" @click="next" />
        </template>
      </div>
    </div>
    <!-- table:切换必须使用v-if,不然翻页按钮位置会计算错误 -->
    <!-- 重点标注: table必须表头固定,不能出现横向滚动条,不然翻页按钮定位会异常 -->
    <supplierTableList
      class="content"
      ref="table"
      @setPage="setPage"
      v-if="
        (tab == 'table' && tabTable == 'supplier') ||
        tabTable == 'Detailed_Worksheet'
      "
    />
    <partTableList
      class="content"
      ref="table"
      @setPage="setPage"
      v-if="
        (tab == 'table' && tabTable == 'part') ||
        tabTable == 'Detailed_Worksheet'
      "
    />
    <GSpartTableList
      class="content"
      ref="table"
      @setPage="setPage"
      v-if="
        (tab == 'table' && tabTable == 'gs_part') ||
        tabTable == 'Detailed_Worksheet'
      "
    />
    <bestBallTableList
      class="content"
      ref="table"
      @setPage="setPage"
      v-if="
        (tab == 'table' && tabTable == 'best_ball') ||
        tabTable == 'Detailed_Worksheet'
      "
    />
    <!-- bar -->
    <supplierBar
      class="content-chart"
      v-if="tab == 'bar'"
      :detail="carTypeDetail"
    />
    <!-- <supplierBar2 class="content" v-if="tab == 'bar'" :detail="carTypeDetail" /> -->
    <supplierLine
      class="content-chart"
      v-if="tab == 'line'"
      :detail="rfqDetail"
    />
    <div class="footer">
      <!-- <el-popover
        placement="top-start"
        popper-class="bg-yellow font-family"
        width="850"
        trigger="click"
        :visible-arrow="false"
        :content="strategy"
      >
        <img :src="tips" alt="tips" class="iconSize" slot="reference" />
      </el-popover> -->
      <p>
        <span style="color: red">*</span>means Invest or Develop Cost is
        amortized into piece price.
      </p>
      <p class="margin-top10 font-size16" v-if="tab == 'line'">
        <span class="margin-right10"
          ><icon
            name="iconbaojiazhuangtailiebiao_yibaojia"
            class="margin-right5"
            symbol
          ></icon>
          Completely Quoted</span
        >
        <span class="margin-right10"
          ><icon
            name="iconbaojiazhuangtailiebiao_yijujue"
            class="margin-right5"
            symbol
          ></icon>
          Rejected</span
        >
        <span class="margin-right10"
          ><i class="margin-right5">\</i> Not inquired</span
        >
        <span class="margin-right10"
          ><i class="margin-right5">—</i> No quotation</span
        >
        <span class="margin-right10"
          ><span class="margin-right5">N/M</span> N out of M Quotation is
          submitted</span
        >
      </p>
      <p class="tips" v-else-if="tab == 'table'">
        <span class="legend margin-right5"></span><span>: Recommendation</span
        ><span class="font-green margin-left20 margin-right5">99.99</span
        ><span>Best offer</span>
      </p>
    </div>

    <strategyDialog
      v-if="visible"
      :visible.sync="visible"
      :strategy="strategy"
      @updateData="updateNomiRemark"
    />
  </div>
</template> 
<script>
import { iCard, iTabsList, icon, iButton } from "rise";

// 表格
import supplierTableList from "./components/supplierTableList";
import partTableList from "./components/partTableList";
import GSpartTableList from "./components/GSpartTableList";
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
import tips from "@/assets/images/cscIcon/tips.svg";
import right from "@/assets/images/cscIcon/right.svg";
import left from "@/assets/images/cscIcon/left.svg";
import strategyDialog from "./components/strategyDialog";

import {
  analysisNomiCarProject,
  getListRfq,
  getList,
  findNomiProject,
  getNomiRemark,
} from "@/api/partsrfq/editordetail/abprice";
import { exportFsSupplierAsRowByNomiId } from "@/api/partsrfq/editordetail";
export default {
  components: {
    supplierTableList,
    partTableList,
    GSpartTableList,
    bestBallTableList,
    supplierBar,
    supplierBar2,
    supplierLine,
    iCard,
    iTabsList,
    icon,
    iButton,
    strategyDialog,
  },
  data() {
    return {
      table,
      tableActive,
      bar,
      barActive,
      line,
      lineActive,
      tips,
      right,
      left,
      tabList: [
        {
          label: "Table",
          value: "table",
          activeImg: tableActive,
          img: table,
        },
        {
          label: "Bar",
          value: "bar",
          activeImg: barActive,
          img: bar,
        },
        {
          label: "Line",
          value: "line",
          activeImg: lineActive,
          img: line,
        },
      ],
      tab: "table",
      tabTable: "",
      tabBar: "",
      tabLine: "",
      carTypeList: [],
      carTypeObj: {},
      carTypeDetail: {},
      rfqList: [],
      rfqObj: {},
      rfqDetail: {},
      visible: false,
      index: 0,
      showLength: 1,
      total: 0,
      config: {
        supplier: {},
        part: {},
        best_ball: {},
        gs_part: {},
        Detailed_Worksheet: {},
      },
      strategy: "",
    };
  },
  computed: {
    isRoutePreview() {
      return this.$route.query.isPreview == 1;
    },
  },
  created() {
    this.getNomiRemark();
    this.analysisNomiCarProject();
    this.getListRfq();
    this.getList();
  },
  methods: {
    getList() {
      getList({
        businessId: this.$route.query.desinateId,
        type: "nominate_ab_price",
      }).then((res) => {
        if (res?.code == "200") {
          res.data.forEach((item) => {
            this.config[item.operateCode] = item;
            if (item.isShow && !this.tabTable) {
              // 显示第一个true
              this.tabTable = item.operateCode;
            }
          });
        }
        if (!this.tabTable) {
          // 没有表格就显示bar
          this.tab = "bar";
        }
      });
    },
    setPage({ index, showLength, total }) {
      this.index = index;
      this.showLength = showLength;
      this.total = total;
    },

    prev() {
      if (typeof this.$refs.table.prev == "function") {
        this.$refs.table.prev();
      } else if (typeof this.$refs.table.tabChange == "function") {
        this.$refs.table.tabChange();
      }
    },
    next() {
      if (typeof this.$refs.table.next == "function") {
        this.$refs.table.next();
      } else if (typeof this.$refs.table.tabChange == "function") {
        this.$refs.table.tabChange();
      }
    },
    getNomiRemark() {
      getNomiRemark(this.$route.query.desinateId).then((res) => {
        if (res?.code == "200") {
          this.strategy = res.data.strategy;
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
          this.changeCarType(this.tabBar);
          this.findVsi();
        }
      });
    },
    findVsi() {
      let params = this.carTypeList.map((item) => {
        return {
          nominateId: this.$route.query.desinateId,
          carProjectCode: item.carTypeProjectNum,
          carProjectId: item.carTypeProjectId,
        };
      });
      findNomiProject(params).then((res) => {
        this.tableData = res.data;
        res.data.forEach((item) => {
          this.carTypeObj[item.carProjectCode].vsi = item.vsi;
        });
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
    },
    change(val) {
      if (val == "Detailed_Worksheet") {
        this.exportExcel();
        this.tabTable = this.oldTabTable;
      } else {
        this.oldTabTable = this.tabTable;
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
  .header-btn {
    font-size: 16px;
    display: flex;
    align-items: center;
    .allow {
      height: 22px;
      margin: 0 7px;
    }
  }
}
.content {
  margin-top: 20px;
  height: calc(100% - 100px);
  overflow: auto;
}
.content-chart {
  height: calc(100% - 84px);
  overflow: auto;
}
::v-deep .unit {
  vertical-align: top;
  padding-top: 4px !important;
  padding-bottom: 4px !important;
  .cell {
    font-size: 18px !important;
    font-weight: 500 !important;
  }
}
::v-deep .blue-border {
  background: #d1e0ea !important;
}
::v-deep .font-green {
  color: #43b02a;
}
.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}
.tips {
  display: flex;
  align-items: center;
  font-size: 16px;
  .legend {
    display: inline-block;
    width: 25px;
    height: 20px;
    background: #bdd7ee;
  }
}
.iconSize {
  height: 36px;
  vertical-align: middle;
}
.font-size20 {
  font-size: 20px;
}
.font-size16 {
  font-size: 16px;
}
</style>