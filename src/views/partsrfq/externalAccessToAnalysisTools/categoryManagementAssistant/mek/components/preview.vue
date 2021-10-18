<template>
  <iDialog
    :title="reportName"
    :visible.sync="value"
    width="95%"
    @close="closeDialog"
    @opened="open"
  >
    <div class="new-MEK" id="downloadRef">
      <div class=" bodyBox clearFloat">
        <el-col :span="4">
          <iCard style="width:100%;height:610px">
            <div class="cardBox" style="width:100%;">
              <div class=" searchForm" style="margin-right:20px">
                <div class="searchFormItem">
                  <label for="" style="font-weight:600;font-size:14px"
                    >对标车型</label
                  >
                  <div class="flexBox">
                    <el-tag
                      v-for="(item, index) in ComparedMotorName"
                      :key="index"
                    >
                      {{ item }}
                    </el-tag>
                  </div>
                </div>
                <div class="searchFormItem">
                  <label for="" style="font-weight:600;font-size:14px"
                    >类型选择</label
                  >
                  <div class="flexBox">
                    <el-tag>{{ mekTypeName }}</el-tag>
                  </div>
                </div>
                <div class="searchFormItem">
                  <label for="" style="font-weight:600;font-size:14px"
                    >六位零件号</label
                  >
                  <div class="flexBox">
                    <el-tag v-for="(item, index) in partNumber" :key="index">
                      {{ item }}
                    </el-tag>
                  </div>
                </div>
              </div>
            </div>
          </iCard>
        </el-col>
        <el-col :span="20">
          <iCard class="margin-left20" ref="chartBox" style="height:610px">
            <div class="chartBox1 ">
              <div class="chartBox">
                <div class="line" :style="{ width: totalWidth }"></div>
                <div class="line1" :style="{ width: totalWidth }"></div>
                <div class="line2" :style="{ width: totalWidth }"></div>
                <div class="line3" :style="{ width: totalWidth }"></div>
                <div class="line4" :style="{ width: totalWidth }"></div>
                <div class="flex chartItem">
                  <div class="operation1">
                    <p class="motorName">{{targetMotorName}}</p>
                    <span class="margin-bottom20 productFactoryNames">{{
                      productFactoryNames
                    }}</span>
                    <span class="yield">{{
                      toThousand(parseInt(firstBarData.output))
                    }}</span>
                  </div>
                  <datasetBar1
                    ref="datasetBar1"
                    :typeSelection="mekMotorTypeFlag"
                    :firstBarData="firstBarData"
                    :maxWidth="maxWidth"
                    :maxData="maxData"
                    :clientHeight="clientHeight"
                    @detailDialog="detailDialog"
                  ></datasetBar1>
                </div>
                <div
                  class="flex chartItem"
                  v-for="(item, ind) in barData"
                  :key="item.motorId"
                >
                  <div class="operation">
                      <P class="motorName">
                        {{ item.motorName }}
                      </P>
                    <span
                      class="margin-bottom20 motorName"
                      style="line-height:16px;height:16px"
                      >{{ item.factory }}</span
                    >
                    <span class="yield margin-bottom15">{{
                      toThousand(parseInt(item.output))
                    }}</span>
                    <div class="flex">
                      <el-select
                        v-model="item.priceType"
                        @change="changPriceType"
                        style="width:150px;z-index:1000"
                      >
                        <el-option
                          v-for="i in mekpriceTypeList"
                          :key="i.id"
                          :value="i.code"
                          :label="i.name"
                        >
                        </el-option>
                      </el-select>
                      <el-date-picker
                        v-model="item.priceDate"
                        type="date"
                        placeholder="选择日期"
                        @input="changeDate(item.priceDate, ind)"
                        value-format="yyyy-MM-dd"
                        style="width:150px;z-index:1000;margin-left:20px"
                        v-if="item.priceType === 'monthPrice'"
                      >
                      </el-date-picker>
                    </div>
                  </div>
                  <datasetBar
                    :barData="item"
                    :maxWidth="maxWidth"
                    :typeSelection="mekMotorTypeFlag"
                    :maxData="maxData"
                    :clientHeight="clientHeight"
                  ></datasetBar>
                </div>
              </div>
            </div>
            <!-- <report :dialogVisible="true"></report> -->
          </iCard>
        </el-col>
      </div>
      <tableList
        v-bind="$attr"
        :gridData="gridData"
        :editFlag="editFlag"
        :addRowList="addRowList"
        @editData="editData"
        @addData="addData"
      ></tableList>
    </div>
  </iDialog>
</template>

<script>
import { iPage, iButton, iCard, iSelect, icon, iDialog } from "rise";
import datasetBar from "./datasetBar";
import datasetBar1 from "./datasetBar1";
import tableList from "./tableList";
import { fmoney, toThousand } from "@/utils/index.js";
export default {
  components: {
    iDialog,
    iButton,
    iCard,
    datasetBar,
    datasetBar1,
    tableList,
  },
  props: {
    value: {
      type: Boolean,
      default: true,
    },
    firstBarData: {
      type: Object,
      default: () => {
        return {};
      },
    },
    chartItemWidth: {
      type: Number,
      default: 1,
    },
    barData: {
      type: Array,
      default: () => {
        return [];
      },
    },
    gridData: {
      type: Array,
      default: () => {
        return [];
      },
    },
    preview: {
      type: Boolean,
      default: false,
    },
    partNumber: {
      type: Array,
      default: () => {
        return [];
      },
    },
    targetMotorName: {
      type: String,
      default: "",
    },
    mekpriceType: {
      type: String,
      default: "",
    },
    maxWidth: {
      type: Number,
    },
    mekTypeName: {
      type: String,
    },
    ComparedMotorName: {
      type: Array,
    },
    totalWidth:{
      type:String
    },
    productFactoryNames:{
      type:String
    },
    maxData:{
      tyep:String
    },
    clientHeight:{
      type:String
    }
  },
  watch: {
    value(val) {
      console.log(val);
    },
    firstBarData: {
      handler(val) {
        console.log(val);
      },
      deep: true,
      immediate: true,
    },
  },
  data() {
    return {
      toThousand,
      fmoney,
    };
  },
  mounted() {},
  methods: {
    closeDialog() {
      this.$emit("closeDialog", false);
      // this.value = val;
    },
  },
};
</script>

<style lang="scss" scoped>
.new-MEK {
  .bodyBox {
    margin-top: 25px;
  }
  .formBox {
    width: 100%;
    overflow: auto;
  }
  .end {
    display: flex;
    text-align: center;
    position: relative;
    bottom: 0;
    justify-content: space-between;
  }
}
.searchForm {
  overflow-y: auto;
  overflow-x: hidden;
  margin-bottom: 20px;
  &::-webkit-scrollbar {
    margin-left: 10px !important;
  }
}
.searchForm1 {
  height: 559px;
  text-align: center;
}
::v-deep .cardBox {
  float: left;
}
.tableList {
  margin-top: 20px;
}
.chartItem {
  float: left;
  position: relative;
  // flex: 1;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-right: 10px;
  &:last-child {
    margin-right: 0;
  }
}
.operation {
  margin-bottom: -70px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.operation1 {
  margin-bottom: -70px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.title {
  font-family: Arial;
  font-size: $font-size20;
  color: black;
  align-items: center;
  label {
    width: 90px;
  }
}

.icon {
  width: 45px;
  height: 45px;
}
.yield {
  width: 120px;
  height: 35px;
  line-height: 25px;
  text-align: center;
  background: #eef2fb;
  opacity: 1;
  font-size: 16px;
  border-radius: 20px;
  padding: 5px;
}
.chartBox {
  position: relative;
  display: flex;
  // overflow-x: auto;
  // overflow-y: hidden;
}
.chartBox1 {
  height: 100%;
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  position: relative;
}
.productFactoryNames {
  font-size: 16px;
  line-height: 16px;
  height: 16px;
}
.line {
  position: absolute;
  left: 40px;
  bottom: 10%;
  height: 2px;

  border: 1px solid #f1f1f5;
}
.line1 {
  position: absolute;
  left: 40px;
  bottom: 20%;
  height: 2px;

  border: 1px solid #f1f1f5;
}
.line2 {
  position: absolute;
  left: 40px;
  bottom: 30%;
  height: 2px;

  border: 1px solid #f1f1f5;
}
.line3 {
  position: absolute;
  left: 40px;
  bottom: 40%;
  height: 2px;

  border: 1px solid #f1f1f5;
}
.line4 {
  position: absolute;
  left: 40px;
  bottom: 49%;
  height: 2px;

  border: 1px solid #f1f1f5;
}
.checkList {
  display: flex;
  flex-direction: column;
}
.xAxis {
  position: absolute;
  bottom: 1%;
  font-size: 14px;
  color: "#3C4F74";
  font-family: "Arial";
  .detail:hover {
    text-decoration: underline;
    cursor: pointer;
  }
}
.xAxis1 {
  position: absolute;
  left: 23%;
  bottom: 1%;
  font-size: 14px;
  color: "#3C4F74";
  font-family: "Arial";
  .detail:hover {
    text-decoration: underline;
    cursor: pointer;
  }
}
.motorName {
  font-size: 16px;
  height: 32px;
}
::v-deep .el-select {
  width: 100%;
  .el-select-dropdown.is-multiple .el-select-dropdown__item.selected::after {
    right: 60px !important;
  }
}
::v-deep .el-select__tags {
  justify-content: flex-start;
}
.searchFormItem {
  margin-bottom: 60px;
  ul {
    li {
      margin-bottom: 20px;
    }
  }
}
.flexBox {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
}
</style>
