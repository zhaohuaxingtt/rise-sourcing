<template>
  <iDialog :title="reportName"
           :visible.sync="value"
           width="95%"
           @close="closeDialog"
           @opened="open">
    <div class="new-MEK"
         id="downloadRef">
      <div class=" bodyBox clearFloat">
        <el-col>
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
        </el-col>
        <el-col :span="20">
          <iCard class="margin-left20"
                 ref="chartBox"
                 style="height:670px">
            <div class="chartBox1 ">
              <div class="chartBox">
                <div class="line"
                     :style="{ width: totalWidth }"></div>
                <div class="line1"
                     :style="{ width: totalWidth }"></div>
                <div class="line2"
                     :style="{ width: totalWidth }"></div>
                <div class="line3"
                     :style="{ width: totalWidth }"></div>
                <div class="line4"
                     :style="{ width: totalWidth }"></div>
                <div class="flex chartItem">
                  <div class="operation1">
                    <div style="height:20px"
                         class="margin-bottom20"></div>
                    <el-select v-model="targetMotor"
                               @change="changeTargetMotor"
                               style="width:150px"
                               class="margin-bottom20"
                               placeholder="请选择目标车型">
                      <el-option v-for="item in TargetMotorList"
                                 :key="item.motorId"
                                 :value="item.motorId"
                                 :label="item.motorName">
                      </el-option>
                    </el-select>
                    <span class="margin-bottom20 productFactoryNames">{{
                      productFactoryNames
                    }}</span>
                    <span class="yield">{{
                      toThousand(parseInt(firstBarData.output))
                    }}</span>
                  </div>
                  <datasetBar1 ref="datasetBar1"
                               :typeSelection="mekMotorTypeFlag"
                               :firstBarData="firstBarData"
                               :maxWidth="maxWidth"
                               :maxData="maxData"
                               :clientHeight="clientHeight"
                               @detailDialog="detailDialog"></datasetBar1>
                  <div class="xAxis1"
                       v-if="mekMotorTypeFlag">
                    <div v-for="i in firstBarData.detail"
                         :key="i.value"
                         style="text-align:center">
                      <div style="margin-bottom:5px">
                        <span class="detail"
                              @click="computeModal(firstBarData)">{{ i.title }}</span>
                        <el-tooltip class="item"
                                    effect="dark"
                                    :content="firstBarData.tips"
                                    placement="top-end">

                          <icon name="iconzengjiacailiaochengben_lan"
                                symbol
                                style="width:14px;height:14px;margin-left:10px"></icon>
                        </el-tooltip>
                      </div>
                      <span @click="computeModal(firstBarData)">{{ i.ebr }}</span>
                    </div>
                  </div>
                </div>
                <div class="flex chartItem"
                     v-for="(item,ind) in barData"
                     :key="item.motorId">
                  <div class="operation">
                    <div @click="delItem(item)"
                         style="z-index:1000">
                      <icon symbol
                            name="iconbob-shanchu"
                            class="margin-bottom20 "
                            style="width:20px;height:20px;"></icon>
                    </div>
                    <el-popover placement="bottom"
                                width="80"
                                trigger="click"
                                visible-arrow
                                class="margin-bottom20">
                      <el-checkbox-group v-model="item.checkList"
                                         class="checkList"
                                         @change="changeCheckList">
                        <el-checkbox v-for="(i, index) in item.detail"
                                     :key="index"
                                     :label="i.value">{{ i.title }}</el-checkbox>
                      </el-checkbox-group>
                      <div class="motorName"
                           slot="reference">
                        {{ item.motorName }}
                      </div>
                    </el-popover>
                    <span class="margin-bottom20 motorName"
                          style="line-height:16px;height:16px">{{ item.factory }}</span>
                    <span class="yield margin-bottom15">{{toThousand(parseInt(item.output))}}</span>
                    <div class="flex">
                      <el-select v-model="item.priceType"
                                 @change="changPriceType"
                                 style="width:150px;z-index:1000">
                        <el-option v-for="i in mekpriceTypeList"
                                   :key="i.id"
                                   :value="i.code"
                                   :label="i.name">
                        </el-option>
                      </el-select>
                      <el-date-picker v-model="item.priceDate"
                                      type="date"
                                      placeholder="选择日期"
                                      @input="changeDate(item.priceDate,ind)"
                                      value-format="yyyy-MM-dd"
                                      style="width:150px;z-index:1000;margin-left:20px"
                                      v-if="item.priceType === 'monthPrice'">
                      </el-date-picker>
                    </div>
                  </div>
                  <datasetBar :barData="item"
                              :maxWidth="maxWidth"
                              :typeSelection="mekMotorTypeFlag"
                              :maxData="maxData"
                              :clientHeight="clientHeight"
                              @detailDialog="detailDialog"></datasetBar>
                  <div class="xAxis"
                       v-if="mekMotorTypeFlag">
                    <div v-for="i in item.detail"
                         :key="i.value"
                         style="text-align:center">
                      <div style="margin-bottom:5px">
                        <span class="detail"
                              @click="computeModal(item,ind)">{{i.title}}</span>
                        <el-tooltip class="item"
                                    effect="dark"
                                    :content="item.tips"
                                    placement="top-end">

                          <icon name="iconzengjiacailiaochengben_lan"
                                symbol
                                style="width:14px;height:14px;margin-left:10px"></icon>
                        </el-tooltip>
                      </div>
                      <span @click="computeModal(item)">{{ i.ebr }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- <report :dialogVisible="true"></report> -->
          </iCard>
        </el-col>
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
import { fmoney, toThousand } from "@/utils/index.js";
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
    },
    firstBarData: {
      handler (val) {
        console.log(val)
      },
      deep: true,
      immediate: true
    }
  },
  data () {
    return {
      toThousand,
      fmoney
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
  justify-content: space-around;
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
  margin-bottom: -60px;
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
  width: 120px;
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
  bottom: 13%;
  height: 2px;
  width: 100%;
  border: 1px solid #f1f1f5;
}
.line1 {
  position: absolute;
  left: 40px;
  bottom: 23%;
  height: 2px;
  width: 100%;
  border: 1px solid #f1f1f5;
}
.line2 {
  position: absolute;
  left: 40px;
  bottom: 33%;
  height: 2px;
  width: 100%;
  border: 1px solid #f1f1f5;
}
.line3 {
  position: absolute;
  left: 40px;
  bottom: 43%;
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