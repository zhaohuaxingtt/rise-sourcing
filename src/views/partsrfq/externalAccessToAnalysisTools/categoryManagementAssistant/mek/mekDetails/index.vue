<!--
 * @Author: your name
 * @Date: 2021-08-05 06:53:42
 * @LastEditTime: 2021-08-12 17:34:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsrfq\externalAccessToAnalysisTools\categoryManagementAssistant\mek\mekDetails\index.vue
-->
<template>
  <iPage class="new-MEK">
    <div id="content">
      <div class="navBox flex-between-center">
        <div class="title font-weight flex">
          <label for="">{{ language("QIEHUANCAILIAOZU","切换材料组") }}:</label>
          <iSelect v-model="chartType"
                   @change="changeBy"
                   placeholder="材料组编号_名称">
            <el-option value="supplier"
                       :label="$t('按供应商比较')">
            </el-option>
            <el-option value="turn"
                       :label="$t('按轮次比较')"></el-option>
            <el-option value="spareParts"
                       :label="$t('按零件号比较')"></el-option>
          </iSelect>
        </div>
        <div class="flex">
          <!--预览-->
          <iButton class="margin-left30">{{ $t("MEK分析库") }}</iButton>
          <!--保存-->
          <iButton class="margin-left30">{{ $t("MEK基础数据库") }}</iButton>
          <!--BoB分析库-->
          <iButton class="margin-left30">{{ $t("预览") }}</iButton>
          <!--查找零件-->
          <iButton class="margin-left30"
                   @click="saveDialog">{{ $t("保存") }}</iButton>
          <icon symbol
                name="iconrizhi"
                class="margin-left30 "></icon>
        </div>
      </div>
      <div class=" bodyBox clearFloat">
        <div class="cardBox"
             style="width:18%">
          <iCard>
            <div class=" searchForm">
              <el-form label-position="top"
                       :model="form"
                       style="height:486px"
                       label-width="200px">
                <el-row class="margin-bottom20">
                  <!--对标车型-->
                  <el-form-item :label="$t('对标车型')"
                                label-width="180px">
                    <el-select v-model="carType"
                               @change="changeBy"
                               multiple>
                      <el-option value="1"
                                 :label="$t('车型1')"> </el-option>
                      <el-option value="2"
                                 :label="$t('车型2')"></el-option>
                      <el-option value="3"
                                 :label="$t('车型3')"></el-option>
                      <el-option value="4"
                                 :label="$t('车型4')"></el-option>
                      <el-option value="5"
                                 :label="$t('车型5')"></el-option>
                      <el-option value="6"
                                 :label="$t('车型6')"></el-option>
                      <el-option value="7"
                                 :label="$t('车型7')"></el-option>
                      <el-option value="8"
                                 :label="$t('车型8')"></el-option>
                    </el-select>
                  </el-form-item>
                  <!--类型选择-->
                  <el-form-item :label="$t('类型选择')">
                    <el-select v-model="type"
                               @change="changeBy">
                      <el-option value="1"
                                 :label="$t('按车型配置')"> </el-option>
                      <el-option value="2"
                                 :label="$t('按发动机')"></el-option>
                      <el-option value="3"
                                 :label="$t('按变速箱')"></el-option>
                      <el-option value="4"
                                 :label="$t('按电池容量')"></el-option>
                      <el-option value="5"
                                 :label="$t('按计算车型')"></el-option>
                    </el-select>
                  </el-form-item>
                  <!--零件六位号-->
                  <el-form-item :label="$t('零件六位号')">
                    <el-select v-model="partNumber"
                               @change="changeBy"
                               multiple>
                      <el-option value="1"
                                 :label="$t('857705')"> </el-option>
                      <el-option value="2"
                                 :label="$t('857706')"></el-option>
                      <el-option value="3"
                                 :label="$t('857707')"></el-option>
                      <el-option value="4"
                                 :label="$t('857708')"></el-option>
                      <el-option value="5"
                                 :label="$t('857709')"></el-option>
                      <el-option value="6"
                                 :label="$t('857710')"></el-option>
                      <el-option value="7"
                                 :label="$t('857711')"></el-option>
                      <el-option value="8"
                                 :label="$t('857712')"></el-option>
                      <el-option value="9"
                                 :label="$t('857713')"></el-option>
                      <el-option value="10"
                                 :label="$t('857714')"></el-option>
                      <el-option value="11"
                                 :label="$t('857715')"></el-option>
                      <el-option value="12"
                                 :label="$t('857715')"></el-option>
                      <el-option value="13"
                                 :label="$t('857715')"></el-option>
                      <el-option value="14"
                                 :label="$t('857715')"></el-option>
                      <el-option value="15"
                                 :label="$t('857715')"></el-option>
                      <el-option value="16"
                                 :label="$t('857715')"></el-option>
                    </el-select>
                  </el-form-item>
                </el-row>
              </el-form>
            </div>

            <div class="end">
              <iButton type="primary"
                       style="width:100px;height:35px"
                       @click="searchChartData">{{ $t("LK_QUEDING") }}</iButton>
              <iButton type="primary"
                       style="width:100px;height:35px"
                       @click="handleSearchReset">{{ $t("LK_ZHONGZHI") }}</iButton>
            </div>
          </iCard>
        </div>
        <div class="cardBox"
             style="width:82%">
          <iCard class="margin-left20">
            <div class="chartBox1">
              <div class="line"></div>
              <div class="line1"></div>
              <div class="line2"></div>
              <div class="line3"></div>
              <div class="line4"></div>
              <div class="chartBox">
                <div class="flex chartItem">
                  <div class="operation1">
                    <el-select v-model="targetNumber"
                               @change="changeBy"
                               style="width:150px"
                               class="margin-bottom15 margin-top40">
                      <el-option value="1"
                                 :label="$t('车型1')"> </el-option>
                      <el-option value="2"
                                 :label="$t('车型2')"></el-option>
                      <el-option value="3"
                                 :label="$t('车型3')"></el-option>
                      <el-option value="4"
                                 :label="$t('车型4')"></el-option>
                    </el-select>
                    <span class="margin-bottom15 "
                          style="min-height:14px">{{firstBarData.motorName}}</span>
                    <span class="yield"
                          style="line-height:12px">{{firstBarData.output}}</span>
                  </div>
                  <datasetBar1 ref="datasetBar1"
                               :typeSelection="type"
                               :firstBarData="firstBarData.detail"
                               :maxWidth="maxWidth"></datasetBar1>
                  <div class="xAxis"
                       v-if="type==='5'">
                    <span @click=" computeModal">MIX</span>
                  </div>
                </div>
                <div class="flex chartItem"
                     v-for="item in barData"
                     :key="item.motorId">
                  <div class="operation">
                    <icon symbol
                          name="iconbob-shanchu"
                          class="margin-bottom15 "
                          style="width:20px;height:20px"></icon>
                    <el-popover placement="bottom"
                                width="80"
                                trigger="click"
                                visible-arrow
                                class="margin-bottom15">
                      <el-checkbox-group v-model="checkList"
                                         class="checkList">
                        <el-checkbox v-for="(i,index) in item.detail"
                                     :key="index"
                                     :label="i.value">{{i.title}}</el-checkbox>
                      </el-checkbox-group>
                      <div style="line-height:25px"
                           slot="reference">{{item.motorName}}</div>
                    </el-popover>
                    <span class="margin-bottom15"
                          style="line-height:16px">{{item.factory}}</span>
                    <span class="yield margin-bottom15">{{item.output}}</span>
                    <div>
                      <el-select v-model="priceType"
                                 @change="changeBy"
                                 style="width:150px;z-index:1000"
                                 v-if="flag1">
                        <el-option value="1"
                                   :label="$t('SOP价格')"> </el-option>
                        <el-option value="2"
                                   :label="$t('选择时间')"></el-option>
                        <el-option value="3"
                                   :label="$t('价格类型')"></el-option>
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
                  <datasetBar :barData="item.detail"
                              :maxWidth="maxWidth"></datasetBar>
                </div>
                <!-- <div class="flex chartItem">
                  <div class="operation">
                    <icon symbol
                          name="iconbob-shanchu"
                          class="margin-bottom15 "
                          style="width:20px;height:20px"></icon>
                    <el-select v-model="carType"
                               @change="changeBy"
                               style="width:150px"
                               class="margin-bottom15">
                      <el-option value="1"
                                 :label="$t('车型1')"> </el-option>
                      <el-option value="2"
                                 :label="$t('车型2')"></el-option>
                      <el-option value="3"
                                 :label="$t('车型3')"></el-option>
                      <el-option value="4"
                                 :label="$t('车型4')"></el-option>
                    </el-select>
                    <span class="margin-bottom15 ">Best Ball</span>
                    <span class="yield margin-bottom15">22,000</span>
                    <el-select v-model="carType"
                               @change="changeBy"
                               style="width:150px">
                      <el-option value="1"
                                 :label="$t('车型1')"> </el-option>
                      <el-option value="2"
                                 :label="$t('车型2')"></el-option>
                      <el-option value="3"
                                 :label="$t('车型3')"></el-option>
                      <el-option value="4"
                                 :label="$t('车型4')"></el-option>
                    </el-select>
                  </div>
                  <datasetBar ref="datasetBar"
                              :notY="true"></datasetBar>
                </div>
                <div class="flex chartItem">
                  <div class="operation">
                    <icon symbol
                          name="iconbob-shanchu"
                          class="margin-bottom15 "
                          style="width:20px;height:20px"></icon>
                    <el-select v-model="carType"
                               @change="changeBy"
                               style="width:150px"
                               class="margin-bottom10">
                      <el-option value="1"
                                 :label="$t('车型1')"> </el-option>
                      <el-option value="2"
                                 :label="$t('车型2')"></el-option>
                      <el-option value="3"
                                 :label="$t('车型3')"></el-option>
                      <el-option value="4"
                                 :label="$t('车型4')"></el-option>
                    </el-select>
                    <span class="margin-bottom15 ">Best Ball</span>
                    <span class="yield margin-bottom15">22,000</span>
                    <el-select v-model="carType"
                               @change="changeBy"
                               style="width:150px">
                      <el-option value="1"
                                 :label="$t('车型1')"> </el-option>
                      <el-option value="2"
                                 :label="$t('车型2')"></el-option>
                      <el-option value="3"
                                 :label="$t('车型3')"></el-option>
                      <el-option value="4"
                                 :label="$t('车型4')"></el-option>
                    </el-select>
                  </div>
                  <datasetBar ref="datasetBar"
                              :notY="true"></datasetBar>
                </div>
                <div class="flex chartItem">
                  <div class="operation">
                    <icon symbol
                          name="iconbob-shanchu"
                          class="margin-bottom15 "
                          style="width:20px;height:20px"></icon>
                    <el-select v-model="carType"
                               @change="changeBy"
                               style="width:150px"
                               class="margin-bottom10">
                      <el-option value="1"
                                 :label="$t('车型1')"> </el-option>
                      <el-option value="2"
                                 :label="$t('车型2')"></el-option>
                      <el-option value="3"
                                 :label="$t('车型3')"></el-option>
                      <el-option value="4"
                                 :label="$t('车型4')"></el-option>
                    </el-select>
                    <span class="margin-bottom15 ">Best Ball</span>
                    <span class="yield margin-bottom15">22,000</span>
                    <el-select v-model="carType"
                               @change="changeBy"
                               style="width:150px">
                      <el-option value="1"
                                 :label="$t('车型1')"> </el-option>
                      <el-option value="2"
                                 :label="$t('车型2')"></el-option>
                      <el-option value="3"
                                 :label="$t('车型3')"></el-option>
                      <el-option value="4"
                                 :label="$t('车型4')"></el-option>
                    </el-select>
                  </div>
                  <datasetBar ref="datasetBar"
                              :notY="true"></datasetBar>
                </div> -->
              </div>
            </div>
            <!-- <report :dialogVisible="true"></report> -->
          </iCard>
        </div>
      </div>
      <iCard class="tableList">
        <template v-slot:header>
          <div class="titleBox">
            <div v-if="!editFlag">
              <iButton>新增</iButton>
              <iButton>删除</iButton>
              <iButton @click="edit">编辑</iButton>
            </div>
            <div v-else>
              <iButton @click="save">保存</iButton>
              <iButton @click="cancel">取消</iButton>
            </div>
          </div>
        </template>
        <tableList :gridData="gridData"
                   :editFlag="editFlag"></tableList>
      </iCard>
      <iDialog title="保存"
               :visible.sync="dialogVisible"
               width="20%"
               @close="close">
        <div>
          <div class="margin-bottom15 flex-between-center">
            <label for="">保存在分析库</label>
            <el-checkbox v-model="analysisSave"></el-checkbox>
          </div>
          <iInput v-model="analysisName"
                  placeholder="请输入文件名称" />
        </div>
        <div class="margin-top20">
          <div class="margin-bottom15 flex-between-center">
            <label for="">保存为报告</label>
            <el-checkbox v-model="reportSave"></el-checkbox>
          </div>
          <iInput v-model="reportName"
                  placeholder="请输入文件名称" />
        </div>
        <span slot="footer"
              class="dialog-footer">
          <iButton type="primary"
                   @click="save">确 定</iButton>
        </span>
      </iDialog>
      <modalDialog :modalVisible="modalVisible"
                   @input="closeModalDialog"></modalDialog>
    </div>
  </iPage>
</template>

<script>
import { iPage, iButton, iSelect, icon, iCard, iDialog, iInput } from "rise";
import datasetBar from "../components/datasetBar";
import datasetBar1 from "../components/datasetBar1";
import tableList from "../components/tableList";
import modalDialog from "../components/modalDialog";
import { getMekTable, getHistogram } from '@/api/categoryManagementAssistant/mek'
export default {
  name: "mekDetails",
  components: {
    iPage,
    iButton,
    iSelect,
    icon,
    iCard,
    datasetBar,
    datasetBar1,
    tableList,
    iDialog,
    iInput,
    modalDialog
  },
  data () {
    return {
      //类型选择
      type: "",
      //对标车型
      carType: "",
      //六位车型零件号
      partNumber: "",
      //目标车型
      targetNumber: "",
      //价格类型
      priceType: "",
      //时间选择
      date: "",
      form: {},
      //开关
      flag1: true,
      gridData: {},
      //保存弹窗
      dialogVisible: false,
      //计算车型开关
      modalVisible: false,
      //保存在分析库
      analysisSave: false,
      //分析库名称
      analysisName: "",
      //保存为报告
      reportSave: "",
      //报告名称
      reportName: "",
      editFlag: false,
      checkList: [],
      //第一个柱状图
      firstBarData: {},
      //柱状图最大宽度
      maxWidth: null
    };
  },
  async created () {
    await this.getHistogram()
    await this.getMekTable()
  },
  mounted () {
  },
  methods: {
    edit () {
      this.editFlag = true
    },
    save () {
      this.editFlag = false
    },
    cancel () {
      this.editFlag = false
    },
    changeDate () {
      this.flag1 = true
      this.priceType = ""
    },
    saveDialog () {
      this.dialogVisible = true
    },
    //计算车型弹窗
    computeModal () {
      this.modalVisible = true
    },
    closeModalDialog (val) {
      this.modalVisible = val
    },
    //获取表格
    getMekTable () {
      getMekTable({
        "comparedType": "mekConfig",
        "motorIds": [
          50001002, 50001003, 50001004
        ],
        "schemeId": 2,
        "targetMotorId": 50001001
      }).then(res => {
        this.gridData = res
        console.log(this.gridData)
      })
    },
    getHistogram () {
      getHistogram({
        "comparedType": "mekConfig",
        "info": [
          {
            "motorId": 50044101,
            "priceType": "latestPrice"
          },
          {
            "motorId": 50048103,
            "priceType": "latestPrice"
          },
          {
            "motorId": 2000000166,
            "priceType": "latestPrice"
          },
          {
            "motorId": 2000000084,
            "priceType": "latestPrice"
          },
          {
            "motorId": 2000000164,
            "priceType": "latestPrice"
          }
        ],
        "categoryId": 600029,
        "schemeId": 3
      }).then(res => {
        let data = res.data
        let maxWidthList = []
        data.forEach(item => {
          maxWidthList.push(item.detail.length)
        })
        this.maxWidth = _.max(maxWidthList)
        this.firstBarData = data[0]
        data.shift()
        this.barData = data
        console.log(this.barData, "barData")
      })
    },
    changeBy () {
      if (this.priceType === '2') {
        this.flag1 = false
      }
    }

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
.cardBox {
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
  margin-bottom: -100px;
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
.titleBox {
  display: flex;
  width: 100%;
  justify-content: flex-end;
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
  left: 60px;
  bottom: 14%;
  height: 2px;
  width: 100%;
  border: 1px solid #f1f1f5;
}
.line1 {
  position: absolute;
  left: 60px;
  bottom: 24%;
  height: 2px;
  width: 100%;
  border: 1px solid #f1f1f5;
}
.line2 {
  position: absolute;
  left: 60px;
  bottom: 34%;
  height: 2px;
  width: 100%;
  border: 1px solid #f1f1f5;
}
.line3 {
  position: absolute;
  left: 60px;
  bottom: 44%;
  height: 2px;
  width: 100%;
  border: 1px solid #f1f1f5;
}
.line4 {
  position: absolute;
  left: 60px;
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
  bottom: 8%;
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
  left: -20%;
}
</style>
<style lang="scss">
</style>
