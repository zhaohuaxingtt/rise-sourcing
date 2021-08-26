<!--
 * @Author: your name
 * @Date: 2021-08-05 06:53:42
 * @LastEditTime: 2021-08-26 10:58:26
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
          <iButton @click="handleMEKInfo"
                   class="margin-left30">{{ $t("MEK基础数据库") }}</iButton>
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
            <div class=" searchForm"
                 style="margin-right:-20px">
              <el-form label-position="top"
                       :model="form"
                       style="height:504px;margin-right:10px"
                       label-width="200px">
                <el-row class="margin-bottom20">
                  <!--对标车型-->
                  <el-form-item :label="$t('对标车型')"
                                label-width="180px">
                    <el-select v-model="ComparedMotor"
                               @change="changeComparedMotor"
                               multiple>
                      <el-option v-for="item in ComparedMotorList"
                                 :key="item.motorId"
                                 :value="item.motorId"
                                 :label="item.motorName"> </el-option>
                    </el-select>
                  </el-form-item>
                  <!--类型选择-->
                  <el-form-item :label="$t('类型选择')">
                    <el-select v-model="comparedType">
                      <el-option v-for="item in mekTypeList"
                                 :key="item.id"
                                 :value="item.code"
                                 :label="item.name"> </el-option>
                    </el-select>
                  </el-form-item>
                  <!--零件六位号-->
                  <el-form-item :label="$t('零件六位号')">
                    <el-select v-model="partNumber"
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
          <iCard class="margin-left20"
                 style="height:619px">
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
                               class="margin-bottom15 margin-top40"
                               placeholder="请选择目标车型">
                      <el-option v-for="item in TargetMotorList"
                                 :key="item.motorId"
                                 :value="item.motorId"
                                 :label="item.motorName"> </el-option>
                    </el-select>
                    <span class="margin-bottom15 "
                          style="min-height:14px">{{firstBarData.motorName}}</span>
                    <span class="yield"
                          style="line-height:12px">{{firstBarData.output}}</span>
                  </div>
                  <datasetBar1 ref="datasetBar1"
                               :typeSelection="mekMotorTypeFlag"
                               :firstBarData="firstBarData.detail"
                               :maxWidth="maxWidth"
                               @detailDialog="detailDialog"></datasetBar1>
                  <div class="xAxis"
                       v-if="comparedType==='mekMotorType'">
                    <span @click="computeModal">MIX</span>
                  </div>
                </div>
                <div class="flex chartItem"
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
                  <div class="xAxis"
                       v-if="comparedType==='mekMotorType'">
                    <div v-for="i in item.detail"
                         :key="i.value">
                      <span @click="computeModal(i)">{{i.title}}</span>
                    </div>
                  </div>
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
      <detailDialog :detailVisible="detailVisible"
                    @input="closeModalDialog"></detailDialog>
    </div>
  </iPage>
</template>

<script>
import { iPage, iButton, iSelect, icon, iCard, iDialog, iInput, iMessage } from "rise";
import datasetBar from "../components/datasetBar";
import datasetBar1 from "../components/datasetBar1";
import tableList from "../components/tableList";
import modalDialog from "../components/modalDialog";
import detailDialog from "../components/detailDialog";
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
    modalDialog,
    detailDialog
  },
  data () {
    return {
      //类型选择
      type: "",
      //价格类型
      priceType: "",
      //时间选择
      date: "",
      //开关
      flag1: true,
      gridData: {},
      //保存弹窗
      dialogVisible: false,
      //计算车型开关
      modalVisible: false,
      //查询EBR详情
      detailVisible: false,
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
      //材料组ID
      categoryId: "",
      //材料组名称
      categoryName: "",
      //目标车型list
      TargetMotorList: [],
      //目标车型
      targetMotor: "",
      //对标车型list
      ComparedMotorList: [],
      //对标车型
      ComparedMotor: "",
      //比较类型
      comparedType: "",
      //未选中的零件ID
      exceptPartL: "",
      //mek类型list
      mekTypeList: [],
      //"mek价格类型"list
      mekpriceTypeList: [],
      //六位车型零件号
      recursiveRetrieveList: [],
      //六位零件号
      partNumber: [],
      //新增行
      addRowList: {},
      //编辑时的数据
      editDataList: [],
      //新增时的数据
      addDataList: [],
      //计算车型开关
      mekMotorTypeFlag: false

    };
  },
  async created () {
    await this.init()
    let params = {
      comparedType: this.comparedType,
      info: [{
        motorId: this.targetMotor,
        priceType: 'sopPrice',
        isTargetMotor: true
      }],
      categoryId: this.categoryId,
      schemeId: this.chemeId,
      categoryCode: this.categoryCode
    }
    this.ComparedMotor.forEach(item => {
      params.info.push({
        motorId: item,
        priceType: 'sopPrice',
        isTargetMotor: false
      })
    })
    if (this.entryStatus === 1) {
      params.isBindingRfq = true
      params.rfq = this.rfqId
    } else {
      params.isBindingRfq = false
    }
    // let params = {
    //   "comparedType": "mekConfig",
    //   "info": [{
    //     "motorId": 50044101,
    //     "priceType": "latestPrice",
    //     "isTargetMotor": true
    //   },
    //   {
    //     "motorId": 50048103,
    //     "priceType": "latestPrice",
    //     "isTargetMotor": false
    //   },
    //   {
    //     "motorId": 2000000166,
    //     "priceType": "latestPrice",
    //     "isTargetMotor": false
    //   },
    //   {
    //     "motorId": 2000000084,
    //     "priceType": "latestPrice",
    //     "isTargetMotor": false
    //   },
    //   {
    //     "motorId": 2000000164,
    //     "priceType": "latestPrice",
    //     "isTargetMotor": false
    //   }],
    //   "categoryId": 600029,
    //   "schemeId": 3
    // }
    this.getHistogram(params)
    this.getMekTable()
  },
  mounted () {
  },
  methods: {
    async init () {
      this.rfqId = this.$store.state.rfq.rfqId
      this.entryStatus = this.$store.state.rfq.entryStatus
      this.chemeId = this.$route.query.chemeId
      await getSchemeInfo({
        schemeId: this.chemeId
        // schemeId: 
      }).then(res => {
        let data = res.data
        this.categoryCode = data.categoryCode
        this.categoryId = data.categoryId
        this.categoryName = data.categoryName
        this.exceptPart = data.exceptPart
        this.targetMotor = data.targetMotor
        this.comparedType = data.comparedType
        if (data.firstComparedMotor) {
          this.ComparedMotor.push(data.firstComparedMotor)
        }
        if (data.secondComparedMotor) {
          this.ComparedMotor.push(data.secondComparedMotor)
        }
        if (data.thirdComparedMotor) {
          this.ComparedMotor.push(data.thirdComparedMotor)
        }
        if (data.forthComparedMotor) {
          this.ComparedMotor.push(data.forthComparedMotor)
        }
        if (data.fifthComparedMotor) {
          this.ComparedMotor.push(data.fifthComparedMotor)
        }
      })
      //材料组
      category({}).then((res) => {
        this.categoryList = res.data
      })
      let params = {}
      if (this.entryStatus == 1) {
        params = {
          // categoryId: val,
          categoryId: this.categoryId,
          isBindingRfq: true,
          req: this.rfqId
        }
      } else {
        params = {
          // categoryId: val,
          categoryId: this.categoryId,
          isBindingRfq: false,
        }
      }
      //目标车型
      getTargetMotor(params).then(res => {
        this.TargetMotorList = res.data
      })
      getDictByCode('mekType').then(res => {
        this.mekTypeList = res.data[0].subDictResultVo

      })
      getDictByCode('mekpriceType').then(res => {
        this.mekpriceTypeList = res.data[0].subDictResultVo

      })
      getComparedMotor({
        categoryId: this.categoryId,
        // categoryId: '3',
        isTarget: true,
        targetMotorId: this.targetMotor
      }).then(res => {
        this.ComparedMotorList = res.data
      })
      let params1 = {
        categoryId: this.categoryId,
        // categoryId: '600029',
        motorIds: this.ComparedMotor,
        schemeId: this.chemeId
        // schemeId: '3'
      }
      recursiveRetrieve(params1).then(res => {
        if (res.code === '200') {
          let partNumber = []
          res.data.forEach(item => {
            partNumber.push(item.partSixNumber)
          })
          this.recursiveRetrieveList = res.data
          this.partNumber = _.difference(partNumber, this.exceptPart)
        }
      })
      // getComparedMotor({
      // }).then(res => {

      // })
    },
    //查询  
    searchChartData () {
      if (this.comparedType === "mekMotorType") {
        this.mekMotorTypeFlag = true
      } else {
        this.mekMotorTypeFlag = false
      }
      let params = {
        comparedType: this.comparedType,
        info: [{
          motorId: this.targetMotor,
          priceType: 'sopPrice',
          isTargetMotor: true
        }],
        categoryId: this.categoryId,
        categoryCode: this.categoryCode,
        schemeId: this.chemeId
      }
      this.ComparedMotor.forEach(item => {
        params.info.push({
          motorId: item,
          priceType: 'sopPrice',
          isTargetMotor: false
        })
      })
      if (this.entryStatus === 1) {
        params.isBindingRfq = true
        params.rfq = this.rfqId
      } else {
        params.isBindingRfq = false
      }
      this.getHistogram(params)
    },
    //选择材料组
    changeCategory (val) {
      let obj = {}
      obj = this.categoryList.find(item => {
        return item.categoryCode === val
      })
      this.categoryId = obj.categoryId
      let params = {}
      if (this.entryStatus == 1) {
        params = {
          categoryId: this.categoryId,
          // categoryId: '600029',
          isBindingRfq: true,
          req: this.rfqId
        }
      } else {
        params = {
          categoryId: this.categoryId,
          // categoryId: '600029',
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
    changeComparedMotor (val) {
      let params = {
        // categoryId: '600029',
        categoryId: this.categoryId,
        motorIds: this.ComparedMotor,
        schemeId: this.chemeId
      }
      recursiveRetrieve(params).then(res => {
        this.recursiveRetrieveList = res.data
      })
    },
    //选择目标车型
    changeTargetMotor (val) {
      let params = {}
      params = {
        // categoryId: '600029',
        categoryId: this.categoryId,
        targetMotorId: val
        // targetMotorId: '50044101'
      }
      getComparedMotor(params).then(res => {
        this.ComparedMotorList = res.data
      })
    },
    edit () {
      this.editFlag = true
    },
    //表格保存
    saveTable () {
      this.editFlag = false
      let params = {
        "comparedType": "mekConfig",
        "detail": [],
        "schemeId": 0
      }
      this.editDataList.splice(0, 1);
      this.editDataList.forEach(item => {
        let obj = {
          "detail": [],
          "type": item['label#-1'],
          "typeId": item.textTypeId
        }
        this.gridData.title.forEach(i => {
          let obj1 = {
            "id": item['id#' + i.label.split('#')[1]],
            "motorTypeId": i.label.split('#')[1],
            "remark": item[i.label]
          }
          obj.detail.push(obj1)
        })
        params.detail.push(obj)
      })
      saveMekTable(params).then(res => {
        this.getMekTable()
      })
    },
    //
    detailDialog (flag, val) {
      this.detailVisible = flag
      console.log(flag, val)
    },
    changeCheckList (val) {
      console.log(this.barData)
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
    //价格类型
    changPriceType () {
      let params = {
        comparedType: this.comparedType,
        info: [{
          motorId: this.targetMotor,
          priceType: 'sopPrice',
          isTargetMotor: true
        }],
        categoryId: this.categoryId,
        schemeId: this.chemeId
      }
      this.barData.forEach(item => {
        let obj = {
          motorId: item.motorId,
          priceType: item.priceType,
          isTargetMotor: false
        }
        params.info.push(obj)
      })
      this.getHistogram(params)
    },
    //获取表格
    getMekTable () {
      // let params={
      //   "comparedType": "mekConfig",
      //   "motorIds": [
      //     50048103, 2000000166, 50001004
      //   ],
      //   "schemeId": 3,
      //   "targetMotorId": 50044101
      // }
      let params = {
        "comparedType": this.comparedType,
        "motorIds": this.ComparedMotor,
        "schemeId": this.chemeId,
        "targetMotorId": this.targetMotorId
      }
      getMekTable(params).then(res => {
        this.gridData = res
      })
    },
    getHistogram (params) {
      // let params = {
      //   comparedType: this.comparedType,
      //   info: [{
      //     motorId: this.targetMotor,
      //     priceType: 'sopPrice',
      //     isTargetMotor: true
      //   }],
      //   categoryId: this.categoryId,
      //   schemeId: this.chemeId
      // }
      // this.comparedType.forEach(item => {
      //   params.info.push({
      //     motorId: item,
      //     priceType: 'sopPrice',
      //     isTargetMotor: false
      //   })
      // })
      getHistogram(params).then(res => {
        let data = res.data
        let maxWidthList = []
        if (data) {
          data.forEach(item => {
            maxWidthList.push(item.detail.length)
          })
          this.maxWidth = _.max(maxWidthList)
          this.firstBarData = data[0]
          data.shift()
          this.barData = data
          this.barData.forEach(item => {
            item.checkList = []
          })
          this.barData.forEach(item => {
            item.detail.forEach(i => {
              item.checkList.push(i.value)
              // item.checkList = [...item.checkList]
            })
          })
          console.log(this.barData, "barData")
        } else {
          iMessage.error(res.desZh)
        }
      })
    },
    handleMEKInfo () {
      this.$router.push({ path: '/sourcing/partsrfq/mekInfoData', query: { categoryCode: '', vwModelCodes: '', chemeId: '' } })
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
  left: -16%;
}
</style>
<style lang="scss">
</style>
