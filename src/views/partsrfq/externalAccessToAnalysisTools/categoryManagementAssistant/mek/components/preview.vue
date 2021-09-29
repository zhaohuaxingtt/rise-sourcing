<template>
  <iDialog :title="reportName"
           :visible.sync="value"
           width="95%"
           @close="closeDialog"
           @opened="open">
    <div class="new-MEK"
         id="downloadRef">
      <div class=" bodyBox clearFloat">
        <div class="cardBox"
             style="width:18%">
          <iCard>
            <div class=" searchForm"
                 style="margin-right:20px">
              <label for=""
                     style="font-weight:600;font-size:14px">六位零件号</label>
              <ul style="margin-top:10px">
                <li style="maring-bottom:10px"
                    v-for="(item,index) in partNumber"
                    :key="index">{{item}}</li>
              </ul>
              <label for=""
                     style="font-weight:600;font-size:14px">六位零件号</label>
              <ul style="margin-top:10px">
                <li style="maring-bottom:10px"
                    v-for="(item,index) in partNumber"
                    :key="index">{{item}}</li>
              </ul>
              <label for=""
                     style="font-weight:600;font-size:14px">六位零件号</label>
              <ul style="margin-top:10px">
                <li style="maring-bottom:10px"
                    v-for="(item,index) in partNumber"
                    :key="index">{{item}}</li>
              </ul>
            </div>
          </iCard>
        </div>
        <div class="cardBox"
             style="width:82%">
          <iCard class="margin-left20"
                 style="height:619px">
            <div class="chartBox1">
              <div class="line"></div>
              <div class="line1"></div>
              <div class="line2"></div>
              <div class="line3"></div>
              <div class="line4"></div>
              <div class="chartBox">
                <div class="flex chartItem"
                     :style="{width:chartItemWidth}">
                  <div class="operation1">
                    <span class="margin-bottom15 margin-top40">{{targetMotorName}}</span>
                    <span class="margin-bottom15 "
                          style="min-height:14px">{{firstBarData.motorName}}</span>
                    <span class="yield"
                          style="line-height:12px">{{firstBarData.output}}</span>
                  </div>
                  <datasetBar1 :firstBarData="firstBarData.detail"
                               :maxWidth="maxWidth"
                               @detailDialog="detailDialog"></datasetBar1>
                </div>
                <div class="flex chartItem"
                     :style="{width:chartItemWidth}"
                     v-for="item in barData"
                     :key="item.motorId">
                  <div class="operation">
                    <icon symbol
                          name="iconbob-shanchu"
                          class="margin-bottom20 "
                          style="width:20px;height:20px"></icon>
                    <el-popover placement="bottom"
                                width="80"
                                trigger="click"
                                visible-arrow
                                class="margin-bottom15">
                      <el-checkbox-group v-model="item.checkList"
                                         class="checkList"
                                         @change="changeCheckList">
                        <el-checkbox v-for="(i,index) in item.detail"
                                     :key="index"
                                     :label="i.value">{{i.title}}</el-checkbox>
                      </el-checkbox-group>
                      <div style="line-height:30px"
                           slot="reference">{{item.motorName}}</div>
                    </el-popover>
                    <span class="margin-bottom15"
                          style="line-height:16px;height:16px">{{item.factory}}</span>
                    <span class="yield margin-bottom15">{{item.output}}</span>
                    <div>
                      <el-select v-model="item.priceType"
                                 @change="changPriceType"
                                 style="width:150px;z-index:1000"
                                 v-if="flag1">
                        <el-option v-for="i in mekpriceTypeList"
                                   :key="i.id"
                                   :value="i.code"
                                   :label="i.name"> </el-option>
                      </el-select>
                      <el-date-picker v-model="date"
                                      type="date"
                                      placeholder="选择日期"
                                      @change="changeDate"
                                      style="width:150px;z-index:1000"
                                      v-if="priceType==='2'">
                      </el-date-picker>
                    </div>
                  </div>
                  <datasetBar :barData="item"
                              :maxWidth="maxWidth"
                              :typeSelection="mekMotorTypeFlag"
                              @detailDialog="detailDialog"></datasetBar>
                </div>
              </div>
            </div>
          </iCard>
        </div>
      </div>
      <tableList v-bind="$attr"
                 :gridData="gridData"
                 :editFlag="editFlag"
                 :addRowList="addRowList"
                 @editData="editData"
                 @addData="addData"></tableList>
    </div>
  </iDialog>
</template>

<script>
import { iPage, iButton, iCard, iSelect, icon, iDialog } from "rise";
import datasetBar from "./datasetBar";
import datasetBar1 from "./datasetBar1";
import tableList from "./tableList";
export default {
  components: {
    iDialog,
    iButton,
    iCard,
    datasetBar,
    datasetBar1,
    tableList
  },
  props: {
    value: {
      type: Boolean,
      default: true,
    },
    firstBarData: {
      type: Object,
      default: () => {
        return {}
      }
    },
    chartItemWidth: {
      type: Number,
      default: 1
    },
    barData: {
      type: Array,
      default: () => {
        return []
      }
    },
    gridData: {
      type: Array,
      default: () => {
        return []
      }
    },
    preview: {
      type: Boolean,
      default: false,
    },
    partNumber: {
      type: Array,
      default: () => {
        return []
      }
    },
    targetMotorName: {
      type: String,
      default: ""
    },
    mekpriceType: {
      type: String,
      default: ""
    },
    maxWidth: {
      type: Number
    }
  },
  watch: {
    value (val) {
      console.log(val)
    }
  },
  data () {
    return {
    };
  },
  mounted () {

  },
  methods: {
    closeDialog () {
      this.$emit('closeDialog', false);
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
  text-align: center;
  height: 540px;
  overflow-y: auto;
  overflow-x: hidden;
  margin-bottom: 20px;
  &::-webkit-scrollbar {
    margin-left: 10px !important;
  }
}
::v-deep .cardBox {
  float: left;
}
.tableList {
  margin-top: 20px;
}
.chartItem {
  position: relative;
  // flex: 1;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-right: 60px;
  &:last-child {
    margin-right: 0;
  }
}
.operation {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: -110px;
}
.operation1 {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: -45px;
}
.title {
  font-family: Arial;
  font-size: $font-size20;
  color: black;
  align-items: center;
  label {
    width: 210px;
  }
}

.icon {
  width: 45px;
  height: 45px;
}
.yield {
  width: 100px;
  height: 35px;
  background: #eef2fb;
  opacity: 1;
  border-radius: 20px;
  padding: 9px 26px;
}
.chartBox {
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
}
.chartBox1 {
  width: 100%;
  overflow: hidden;
  position: relative;
}
.line {
  position: absolute;
  left: 40px;
  bottom: 12%;
  height: 2px;
  width: 100%;
  border: 1px solid #f1f1f5;
}
.line1 {
  position: absolute;
  left: 40px;
  bottom: 22%;
  height: 2px;
  width: 100%;
  border: 1px solid #f1f1f5;
}
.line2 {
  position: absolute;
  left: 40px;
  bottom: 32%;
  height: 2px;
  width: 100%;
  border: 1px solid #f1f1f5;
}
.line3 {
  position: absolute;
  left: 40px;
  bottom: 42%;
  height: 2px;
  width: 100%;
  border: 1px solid #f1f1f5;
}
.line4 {
  position: absolute;
  left: 40px;
  bottom: 54%;
  height: 2px;
  width: 100%;
  border: 1px solid #f1f1f5;
}
.checkList {
  display: flex;
  flex-direction: column;
}
.xAxis {
  position: absolute;
  bottom: 3%;
  font-size: 12px;
  color: "#3C4F74";
  font-family: "Arial";
}

::v-deep .el-select {
  width: 100%;
  .el-select-dropdown.is-multiple .el-select-dropdown__item.selected::after {
    right: 60px !important;
  }
}
::v-deep .el-select__tags {
  flex-direction: column;
  justify-content: flex-start;
  left: -16%;
}
</style>