<!--
 * @Author: your name
 * @Date: 2021-08-05 06:53:42
 * @LastEditTime: 2021-08-17 17:34:30
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
          <iSelect @change="changeCategory"
                   v-model="categoryCode">
            <el-option v-for="item in categoryList"
                       :key="item.categoryId"
                       :value="item.categoryCode"
                       :label="item.categoryName">
            </el-option>
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
                    <el-select v-model="ComparedMotor"
                               @change="changeBy"
                               multiple>
                      <el-option v-for="item in ComparedMotorList"
                                 :key="item.motorId"
                                 :value="item.motorCode"
                                 :label="item.motorName"> </el-option>
                    </el-select>
                  </el-form-item>
                  <!--类型选择-->
                  <el-form-item :label="$t('类型选择')">
                    <el-select v-model="type"
                               @change="changeBy">
                      <el-option v-for="item in mekTypeList"
                                 :key="item.id"
                                 :value="item.code"
                                 :label="item.name"> </el-option>

                    </el-select>
                  </el-form-item>
                  <!--零件六位号-->
                  <el-form-item :label="$t('零件六位号')">
                    <el-select v-model="partNumber"
                               @change="changeBy"
                               multiple>
                      <el-option v-for="item in recursiveRetrieveList"
                                 :key="item.partId"
                                 :value="item.partSixNumber"
                                 :label="item.partNumber"> </el-option>
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
                    <el-select v-model="targetMotor"
                               @change="changeTargetMotor"
                               style="width:150px"
                               class="margin-bottom15 margin-top40">
                      <el-option v-for="item in TargetMotorList"
                                 :key="item.motorId"
                                 :value="item.motorCode"
                                 :label="item.motorName"> </el-option>
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
                  <datasetBar :barData="item.detail"
                              :maxWidth="maxWidth"></datasetBar>
                </div>

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
              <iButton @click="addRow">新增</iButton>
              <iButton>删除</iButton>
              <iButton @click="edit">编辑</iButton>
            </div>
            <div v-else>
              <iButton @click="saveTable">保存</iButton>
              <iButton @click="cancel">取消</iButton>
            </div>
          </div>
        </template>
        <tableList :gridData="gridData"
                   :editFlag="editFlag"
                   :addRowList="addRowList"
                   @editData="editData"
                   @addData="addData"></tableList>
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
import { getMekTable, getHistogram, category, getComparedMotor, getTargetMotor, recursiveRetrieve, saveMekTable, deleteMekTable, getSchemeInfo } from '@/api/categoryManagementAssistant/mek'
import { getDictByCode } from '@/api/dictionary'
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
      maxWidth: null,
      //材料组
      categoryList: [],
      //0:外部，1：内部
      entryStatus: "",
      //rfqId
      rfqId: "",
      //材料组
      categoryCode: "",
      //目标车型list
      TargetMotorList: [],
      //目标车型
      targetMotor: "",
      //对标车型list
      ComparedMotorList: [],
      //对标车型
      ComparedMotor: "",
      //mek类型list
      mekTypeList: [],
      //"mek价格类型"list
      mekpriceTypeList: [],
      //六位车型零件号
      recursiveRetrieveList: [],
      //新增行
      addRowList: {},
      //编辑时的数据
      editDataList: [],
      //新增时的数据
      addDataList: []

    };
  },
  async created () {
    await this.init()
    // this.getHistogram()
    this.getMekTable()
  },
  mounted () {
  },
  methods: {
    init () {
      this.rfqId = this.$store.state.rfq.rfqId
      this.entryStatus = this.$store.state.rfq.entryStatus
      this.chemeId = this.$route.query.chemeId
      getSchemeInfo({
        schemeId: this.chemeId
      }).then(res => {

      })
      //材料组
      category({}).then((res) => {
        this.categoryList = res.data
      })
      getDictByCode('mekType').then(res => {
        this.mekTypeList = res.data[0].subDictResultVo
        console.log(res, "mekType")
      })
      getDictByCode('mekpriceType').then(res => {
        this.mekpriceTypeList = res.data[0].subDictResultVo
        console.log(res, "mekpriceType")
      })
      recursiveRetrieve({
        categoryId: '600029',
        motorIds: this.ComparedMotor,
        schemeId: this.chemeId
      }).then(res => {
        this.recursiveRetrieveList = res.data
      })
      // getComparedMotor({
      // }).then(res => {

      // })
    },
    //选择材料组
    changeCategory (val) {
      let params = {}
      if (this.entryStatus == 1) {
        params = {
          // categoryId: val,
          categoryId: '600029',
          isBindingRfq: true,
          req: this.rfqId
        }
      } else {
        params = {
          // categoryId: val,
          categoryId: '600029',
          isBindingRfq: false,
        }
      }
      getTargetMotor(params).then(res => {
        this.TargetMotorList = res.data
      })
      // if (this.priceType === '2') {
      //   this.flag1 = false
      // }
    },
    //选择目标车型
    changeTargetMotor (val) {
      let params = {}
      params = {
        categoryId: '600029',
        // categoryId: this.categoryCode,
        // targetMotorId: val
        targetMotorId: '50044101'
      }
      getComparedMotor(params).then(res => {
        this.ComparedMotorList = res.data
      })
    },
    edit () {
      this.editFlag = true
    },
    saveTable () {
      this.editFlag = false
      let params = {
        "comparedType": "string",
        "detail": [],
        "schemeId": 0
      }
      this.addDataList.splice(0, 1);
      this.addDataList.forEach(item => {
        let obj = {
          "detail": [],
          "type": item['label#-1'],
          "typeId": item.textTypeId
        }
        this.gridData.title.forEach(i => {
          let obj1 = {
            "id": item[i.label],
            "motorTypeId": item['id#-1'],
            "remark": item[i.label]
          }
          obj.detail.push(obj1)
        })
        params.detail.push(obj)
      })
      console.log(params)
      saveMekTable(params).then(res => { })
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
    addRow () {
      this.addRowList = {}
      this.gridData.title.forEach(item => {
        this.addRowList[item.label] = ""
        this.addRowList['id#' + item.label.split("#")[1]] = ""
      })
      this.gridData.data.push(this.addRowList)
    },
    //编辑数据
    editData (val) {
      this.editDataList = val
    },
    //新增数据
    addData (val) {
      this.addDataList = val
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
          50048103, 2000000166, 50001004
        ],
        "schemeId": 3,
        "targetMotorId": 50044101
      }).then(res => {
        this.gridData = res
        console.log(this.gridData)
      })
    },
    getHistogram () {
      getHistogram({
        "comparedType": "mekConfig",
        "info": [{
          "motorId": 50044101,
          "priceType": "latestPrice",
          "isTargetMotor": true
        },
        {
          "motorId": 50048103,
          "priceType": "latestPrice",
          "isTargetMotor": false
        },
        {
          "motorId": 2000000166,
          "priceType": "latestPrice",
          "isTargetMotor": false
        },
        {
          "motorId": 2000000084,
          "priceType": "latestPrice",
          "isTargetMotor": false
        },
        {
          "motorId": 2000000164,
          "priceType": "latestPrice",
          "isTargetMotor": false
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
