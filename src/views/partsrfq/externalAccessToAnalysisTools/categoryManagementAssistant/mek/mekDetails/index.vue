<!--
 * @Author: your name
 * @Date: 2021-08-05 06:53:42
 * @LastEditTime: 2021-09-24 11:25:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsrfq\externalAccessToAnalysisTools\categoryManagementAssistant\mek\mekDetails\index.vue
-->
<template>
  <iPage class="new-MEK">
    <div id="content">
      <div class="navBox flex-between-center"
           style="margin-bottom:20px">
        <div class="title font-weight flex">
          <label for="">{{ language("QIEHUANCAILIAOZU","切换材料组") }}:</label>
          <iSelect @change="changeCategory"
                   v-model="categoryCode"
                   v-if="entryStatus==='1'">
            <el-option v-for="item in categoryList"
                       :key="item.categoryId"
                       :value="item.categoryCode"
                       :label="item.categoryName">
            </el-option>
          </iSelect>
          <span v-else>{{categoryName}}</span>
        </div>
        <div class="flex"
             v-show="reportFlag">
          <!--预览-->
          <iButton class="margin-left30"
                   @click="handleAnalysis">{{ $t("MEK分析库") }}</iButton>
          <!--保存-->
          <iButton @click="handleMEKInfo"
                   class="margin-left30">{{ $t("MEK基础数据库") }}</iButton>
          <!--BoB分析库-->
          <iButton class="margin-left30"
                   @click="preview">{{ $t("预览") }}</iButton>
          <!--查找零件-->
          <iButton class="margin-left30"
                   @click="saveDialog">{{ $t("保存") }}</iButton>
          <icon symbol
                name="iconrizhi"
                class="margin-left30 "></icon>
        </div>
      </div>
      <el-row>
        <el-col :span="4">
          <iCard v-show="reportFlag"
                 style="height:670px">
            <div class=" searchForm"
                 style="margin-right:-20px">
              <el-form label-position="top"
                       :model="form"
                       style="height:564px;margin-right:10px"
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
                    <el-select v-model="comparedType"
                               @change="comparedTypeBy">
                      <el-option v-for="item in mekTypeList"
                                 :key="item.id"
                                 :value="item.code"
                                 :label="item.name"> </el-option>
                    </el-select>
                  </el-form-item>
                  <!--零件六位号-->
                  <el-form-item :label="$t('零件六位号')">
                    <el-select v-model="partNumber"
                               multiple
                               @change="changePartNumber">
                      <el-option v-for="item in recursiveRetrieveList"
                                 :key="item.partId"
                                 :value="item.partNumber"
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
          <iCard v-show="!reportFlag"
                 style="height:619px">
            <div class=" searchForm1"
                 style="margin-right:20px">
              <label for=""
                     style="font-weight:600;font-size:14px">六位零件号</label>
              <ul style="margin-top:10px">
                <li style="maring-bottom:10px"
                    v-for="(item,index) in partNumber"
                    :key="index">{{item}}</li>
              </ul>
            </div>
          </iCard>

        </el-col>
        <el-col :span="20">
          <iCard class="margin-left20"
                 ref="chartBox"
                 style="height:670px">
            <div class="chartBox1 ">
              <div class="chartBox">
                <div class="line"
                     :style="{width:totalWidth}"></div>
                <div class="line1"
                     :style="{width:totalWidth}"></div>
                <div class="line2"
                     :style="{width:totalWidth}"></div>
                <div class="line3"
                     :style="{width:totalWidth}"></div>
                <div class="line4"
                     :style="{width:totalWidth}"></div>
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
                                 :label="item.motorName"> </el-option>
                    </el-select>
                    <span class="margin-bottom20 productFactoryNames">{{productFactoryNames}}</span>
                    <span class="yield">{{firstBarData.output}}</span>
                  </div>
                  <datasetBar1 ref="datasetBar1"
                               :typeSelection="mekMotorTypeFlag"
                               :firstBarData="firstBarData.detail"
                               :maxWidth="maxWidth"
                               :maxData="maxData"
                               :clientHeight="clientHeight"
                               @detailDialog="detailDialog"></datasetBar1>
                  <div class="xAxis"
                       v-if="mekMotorTypeFlag">
                    <div v-for="i in firstBarData.detail"
                         :key="i.value"
                         style="text-align:center">
                      <div style="margin-bottom:5px">
                        <span class="detail"
                              @click="computeModal(firstBarData)">{{i.title}}</span>
                        <el-tooltip class="item"
                                    effect="dark"
                                    :content="firstBarData.tips"
                                    placement="top-end">
                          <icon name="iconzengjiacailiaochengben_lan"
                                symbol
                                style="width:14px;height:14px;margin-left:10px"></icon>
                        </el-tooltip>
                      </div>
                      <span @click="computeModal(firstBarData)">{{i.ebr}}</span>
                    </div>
                  </div>

                </div>
                <div class="flex chartItem"
                     v-for="item in barData"
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
                        <el-checkbox v-for="(i,index) in item.detail"
                                     :key="index"
                                     :label="i.value">{{i.title}}</el-checkbox>
                      </el-checkbox-group>
                      <div class="motorName"
                           slot="reference">{{item.motorName}}</div>
                    </el-popover>
                    <span class="margin-bottom20"
                          style="line-height:16px;height:16px">{{item.factory}}</span>
                    <span class="yield margin-bottom15">{{item.output}}</span>
                    <div>
                      <el-select v-model="item.priceType"
                                 @change="changPriceType"
                                 style="width:150px;z-index:1000"
                                 v-if="!flag1">
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
                                      v-if="flag1">
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
                              @click="computeModal(item)">{{i.title}}</span>
                        <el-tooltip class="item"
                                    effect="dark"
                                    :content="item.tips"
                                    placement="top-end">
                          <icon name="iconzengjiacailiaochengben_lan"
                                symbol
                                style="width:14px;height:14px;margin-left:10px"></icon>
                        </el-tooltip>
                      </div>
                      <span @click="computeModal(item)">{{i.ebr}}</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
            <!-- <report :dialogVisible="true"></report> -->
          </iCard>

        </el-col>
      </el-row>
      <tableList :gridData="gridData"
                 :editFlag="editFlag"
                 :addRowList="addRowList"
                 @editData="editData"
                 :reportFlag="reportFlag"
                 @addData="addData"></tableList>

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
                   @input="closeModalDialog"
                   :computeModalData="computeModalData"></modalDialog>
      <detailDialog :detailVisible="detailVisible"
                    :detailsData="detailsData"
                    @input="closeModalDialog1"></detailDialog>
      <preview v-if="previewFlag"
               :value="previewFlag"
               :firstBarData="firstBarData"
               :chartItemWidth="chartItemWidth"
               :barData="barData"
               :gridData="gridData"
               :partNumber="partNumber"
               @closeDialog="closeDialog"
               :maxWidth="maxWidth"
               :targetMotorName="targetMotorName"
               :mekpriceType="mekpriceType"
               :preview="true"></preview>
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
import preview from "../components/preview";
import { getMekTable, getHistogram, category, getComparedMotor, getTargetMotor, recursiveRetrieve, getSchemeInfo, queryPartEbr, queryCal, updateScheme, add } from '@/api/categoryManagementAssistant/mek'
import { getDictByCode } from '@/api/dictionary'
import { downloadPDF, dataURLtoFile } from "@/utils/pdf";
import { uploadFile } from "@/api/file/upload";
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
    detailDialog,
    preview
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
      flag1: false,
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
      reportSave: false,
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
      //目标车型code
      targetMotorCode: "",
      //对标车型list
      ComparedMotorList: [],
      //对标车型Code
      ComparedMotorCode: [],
      //对标车型
      ComparedMotor: "",
      //比较类型
      comparedType: "",
      //未选中的零件ID
      exceptPart: [],
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
      mekMotorTypeFlag: false,
      chartItemWidth: "",
      //点击柱状图mek详情
      detailsData: [],
      //查询计算车型List
      computeModalData: [],
      //预览开关
      previewFlag: false,
      targetMotorName: "",
      mekpriceType: "",
      reportFlag: true,
      maxDataList: [],
      maxData: "",
      totalWidth: 0,
      clientHeight: false,
      productFactoryNames: ""
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
      categoryCode: this.categoryCode,
      unselected: this.exceptPart
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
    if (this.categoryId && this.chemeId && this.categoryCode) {
      this.getHistogram(params)
    }
    this.getMekTable()
  },
  mounted () {
  },
  methods: {
    async init () {
      this.rfqId = this.$store.state.rfq.rfqId
      this.entryStatus = this.$store.state.rfq.entryStatus
      this.chemeId = this.$route.query.chemeId
      this.productFactoryNames = this.$route.query.productFactoryNames
      await getSchemeInfo({
        schemeId: this.chemeId
      }).then(res => {
        let data = res.data
        this.categoryCode = data.categoryCode
        this.categoryId = data.categoryId
        this.categoryName = data.categoryName
        this.exceptPart = data.exceptPart
        this.targetMotor = data.targetMotor.toString()
        this.comparedType = data.comparedType
        if (data.firstComparedMotor) {
          this.ComparedMotor.push(data.firstComparedMotor.toString())
        }
        if (data.secondComparedMotor) {
          this.ComparedMotor.push(data.secondComparedMotor.toString())
        }
        if (data.thirdComparedMotor) {
          this.ComparedMotor.push(data.thirdComparedMotor.toString())
        }
        if (data.forthComparedMotor) {
          this.ComparedMotor.push(data.forthComparedMotor.toString())
        }
        if (data.fifthComparedMotor) {
          this.ComparedMotor.push(data.fifthComparedMotor.toString())
        }
        //材料组
        category({}).then((res) => {
          this.categoryList = res.data
        })
        let params = {}
        if (this.entryStatus == 1) {
          params = {
            categoryId: this.categoryId,
            isBindingRfq: true,
            req: this.rfqId
          }
        } else {
          params = {
            categoryId: this.categoryId,
            isBindingRfq: false,
          }
        }
        //目标车型
        getTargetMotor(params).then(res => {
          this.TargetMotorList = res.data
          this.TargetMotorList.forEach(item => {
            if (item.motorId === this.targetMotor) {
              this.targetMotorCode = item.motorCode
            }
          })
        })
        getDictByCode('mekType').then(res => {
          this.mekTypeList = res.data[0].subDictResultVo
        })
        getDictByCode('mekpriceType').then(res => {
          this.mekpriceTypeList = res.data[0].subDictResultVo
        })
        getComparedMotor({
          categoryId: this.categoryId,
          isTarget: true,
          targetMotorId: this.targetMotor
        }).then(res => {
          this.ComparedMotorList = res.data
          this.ComparedMotorList.forEach(item => {
            this.ComparedMotor.forEach(i => {
              if (item.motorId === i) {
                this.ComparedMotorCode.push(item.motorCode)
              }
            })
          })
        })
        let params1 = {
          categoryId: this.categoryId,
          motorIds: [this.targetMotor, ...this.ComparedMotor],
          schemeId: this.chemeId
        }
        recursiveRetrieve(params1).then(res => {
          if (res.code === '200') {
            let partNumber = []
            res.data.forEach(item => {
              partNumber.push(item.partNumber)
            })
            this.recursiveRetrieveList = res.data
            this.partNumber = _.difference(partNumber, this.exceptPart)
          }
        })
      })

    },
    //查询  
    searchChartData () {
      let params = {
        comparedType: this.comparedType,
        info: [{
          motorId: this.targetMotor,
          priceType: 'sopPrice',
          isTargetMotor: true
        }],
        categoryId: this.categoryId,
        categoryCode: this.categoryCode,
        schemeId: this.chemeId,
        unselected: this.exceptPart
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
      this.getMekTable()
    },
    //选择材料组
    changeCategory (val) {
      let obj = {}
      obj = this.categoryList.find(item => {
        return item.categoryCode === val
      })
      this.categoryId = obj.categoryId
      this.categoryName = obj.categoryName
      let params = {}
      if (this.entryStatus == 1) {
        params = {
          categoryId: this.categoryId,
          isBindingRfq: true,
          req: this.rfqId
        }
      } else {
        params = {
          categoryId: this.categoryId,
          isBindingRfq: false,
        }
      }
      getTargetMotor(params).then(res => {
        this.TargetMotorList = res.data
      })
    },
    changeComparedMotor (val) {
      console.log(this.targetMotor, this.ComparedMotor)
      this.ComparedMotorList.forEach(item => {
        if (item.motorId === val) {
          this.ComparedMotorCode.push(item.motorCode)
        }
      })
      let params = {
        categoryId: this.categoryId,
        motorIds: [this.targetMotor, ...this.ComparedMotor],
        schemeId: this.chemeId
      }
      recursiveRetrieve(params).then(res => {
        this.recursiveRetrieveList = res.data
      })
    },
    //选择目标车型
    changeTargetMotor (val) {
      this.TargetMotorList.forEach(item => {
        if (item.motorId === val) {
          this.targetMotorName = item.motorName
          this.targetMotorCode = item.motorCode
        }
      })
      let params = {}
      params = {
        categoryId: this.categoryId,
        targetMotorId: val
      }
      getComparedMotor(params).then(res => {
        this.ComparedMotorList = res.data
      })
    },
    //
    detailDialog (flag, val) {
      this.detailVisible = flag
      let params = {
        comparedType: this.comparedType,
        schemeId: this.chemeId,
        ...val
      }
      queryPartEbr(params).then(res => {
        if (res.code === '200') {
          this.detailsData = res.data
        }
      })
      console.log(flag, val)
    },
    changeCheckList (val) {
      console.log(this.barData)
    },

    changeDate () {
      this.flag1 = false
      // this.priceType = ""
    },
    saveDialog () {
      this.analysisName = this.categoryCode + '_' + this.categoryName + '_' + this.targetMotorName + "_" + 'MEK' + '_' + window.moment(new Date()).format("yyyy.MM")
      this.reportName = this.categoryCode + '_' + this.categoryName + '_' + this.targetMotorName + "_" + 'MEK' + '_' + window.moment(new Date()).format("yyyy.MM")
      this.dialogVisible = true
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
    computeModal (val) {
      this.modalVisible = true
      let params = {
        engine: val.detail[0].engine,
        motorId: val.motorId,
        position: val.detail[0].position,
        schemeId: this.chemeId,
        transmission: val.detail[0].engine
      }
      queryCal(params).then(res => {
        if (res.code === '200') {
          this.computeModalData = res.data
        }

      })
    },
    closeModalDialog (val) {
      this.modalVisible = val
    },
    closeModalDialog1 (val) {
      this.detailVisible = val
    },
    changePartNumber (val) {
      if (!this.exceptPart) {
        this.exceptPart = []
      }
      let recursiveRetrieveList = this.recursiveRetrieveList.map(item => item.partNumber)
      this.exceptPart = _.difference(recursiveRetrieveList, val)
      console.log(this.exceptPart)
    },
    //价格类型
    changPriceType (val) {
      console.log(val)
      if (val === 'monthPrice') {
        this.flag1 = true
      }
      this.mekpriceTypeList.forEach(item => {
        if (item.code === val) {
          this.mekpriceType = item.label
        }
      })
      let params = {
        comparedType: this.comparedType,
        info: [{
          motorId: this.targetMotor,
          priceType: 'sopPrice',
          isTargetMotor: true
        }],
        categoryId: this.categoryId,
        categoryCode: this.categoryCode,
        schemeId: this.chemeId,
        unselected: this.exceptPart
      }
      if (this.entryStatus === 1) {
        params.isBindingRfq = true
        params.rfq = this.rfqId
      } else {
        params.isBindingRfq = false
      }
      this.barData.forEach(item => {
        let obj = {
          motorId: item.motorId,
          priceType: val,
          isTargetMotor: false
        }
        params.info.push(obj)
      })
      this.getHistogram(params)
    },
    //获取表格
    getMekTable () {
      let params = {
        "comparedType": this.comparedType,
        "motorIds": this.ComparedMotor,
        "schemeId": this.chemeId,
        "targetMotorId": this.targetMotor
      }
      if (this.comparedType && this.ComparedMotor && this.chemeId && this.targetMotor) {
        getMekTable(params).then(res => {
          let data = _.cloneDeep(res)
          let mekTypeName = ""
          this.mekTypeList.forEach(item => {
            if (item.code === this.comparedType) {
              mekTypeName = item.name
            }
          })
          data.config['label#-1'] = mekTypeName
          this.gridData = data
          console.log(this.gridData)
        })
      }
    },
    comparedTypeBy (val) {
      let mekTypeName = ""
      this.mekTypeList.forEach(item => {
        if (item.code === val) {
          mekTypeName = item.name
        }
      })

      if (this.gridData) {
        this.gridData.config['label#-1'] = mekTypeName
      }
    },
    delItem (data) {
      let params = {
        comparedType: this.comparedType,
        info: [{
          motorId: this.targetMotor,
          priceType: 'sopPrice',
          isTargetMotor: true
        }],
        categoryId: this.categoryId,
        categoryCode: this.categoryCode,
        schemeId: this.chemeId,
        unselected: this.exceptPart
      }
      this.ComparedMotor = this.ComparedMotor.filter(i => i !== data.motorId)
      this.ComparedMotor.forEach(item => {
        params.info.push({
          motorId: item,
          priceType: data.priceType,
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
      this.getMekTable()
    },
    getHistogram (params) {
      getHistogram(params).then(res => {
        this.$nextTick(() => {
          let data = res.data
          let maxWidthList = []
          let maxList = []
          this.totalWidth = 0
          if (data) {
            data.forEach(item => {
              maxWidthList.push(item.detail.length)
              if (item.detail.length === 1 || item.detail.length === 0) {
                this.totalWidth = 260 * data.length
              } else {
                this.totalWidth += item.detail.length * 100
              }
              item.detail.forEach(i => {
                maxList.push(parseInt(i.value))
              })
            })

            if (this.totalWidth <= this.$refs.chartBox.$el.clientWidth) {
              this.clientHeight = true
            } else {
              this.clientHeight = false
            }
            this.totalWidth = this.totalWidth + 200 + 'px'
            this.maxData = _.max(maxList).toString()
            let first = (Number(this.maxData.slice(0, 1)) + 1)
            for (let i = 0; i < this.maxData.length - 1; i++) {
              first += '0'
            }
            this.maxData = first
            // if (this.maxWidth === 1 || this.maxWidth === 0) {
            //   this.chartItemWidth = '300px'
            // } else {
            //   this.chartItemWidth = this.maxWidth * 160 + 'px'
            // }
            this.firstBarData = data[0]
            data.shift()
            this.barData = data
            this.barData.forEach(item => {
              item.checkList = []
              // this.$set(this.barData, 'checkList', []);
            })
            this.barData.forEach(item => {
              item.detail.forEach(i => {
                item.checkList.push(i.value)
                // item.checkList = [...item.checkList]
              })
            })
            if (this.comparedType === "mekMotorType") {
              this.mekMotorTypeFlag = true
            } else {
              this.mekMotorTypeFlag = false
            }
          } else {
            iMessage.error(res.desZh)
          }
        });
      })
    },
    handleMEKInfo () {
      let vwModelCodes = JSON.stringify([...this.ComparedMotor, this.targetMotor])
      // let vmModelCodes = ['SK461/0CS_K', 'SK260/0CS_K']
      console.log(vwModelCodes)
      this.$router.push({ path: '/sourcing/partsrfq/mekInfoData', query: { categoryCode: this.categoryCode, vwModelCodes, chemeId: this.chemeId } })
    },
    preview () {
      this.previewFlag = true
    },
    closeDialog (val) {
      this.previewFlag = val
    },
    close () {
      this.dialogVisible = false
      this.reportFlag = true
    },
    handleAnalysis () {
      if (this.entryStatus) {
        this.$router.push({ path: '/sourceinquirypoint/sourcing/partsrfq/assistant', query: { id: this.rfqId, round: this.$route.query.round, pageType: 'MEK', activityTabIndex: 'two' } })
      } else {
        this.$router.push({ path: '/sourcing/partsrfq/externalNegotiationAssistant', query: { pageType: 'MEK' } })
      }
    },
    save () {
      console.log(this.barData)
      this.analysisSave = true

      if (this.analysisSave) {
        let params = {
          categoryCode: this.categoryCode,
          categoryId: this.categoryId,
          categoryName: this.categoryName,
          comparedType: this.comparedType,
          exceptPart: this.exceptPart,
          firstComparedConfig: "",
          secondComparedConfig: "",
          thirdComparedConfig: "",
          forthComparedConfig: "",
          schemeId: this.chemeId,
          targetMotor: this.targetMotor
        }
        if (this.barData[0]) {
          params.firstComparedMotor = this.barData[0].motorId || ""
          params.firstComparedPrice = this.barData[0].priceType || ""
        }
        if (this.barData[1]) {
          params.secondComparedMotor = this.barData[1].motorId || ""
          params.secondComparedPrice = this.barData[1].priceType || ""
        }
        if (this.barData[2]) {
          params.thirdComparedMotor = this.barData[2].motorId || ""
          params.thirdComparedPrice = this.barData[2].priceType || ""
        }
        if (this.barData[3]) {
          params.forthComparedMotor = this.barData[3].motorId || ""
          params.forthComparedPrice = this.barData[3].priceType || ""
        }
        updateScheme(params).then()
      }
      if (this.reportSave) {
        this.reportFlag = false
        downloadPDF({
          idEle: "content",
          pdfName: this.reportName,
          callback: async (pdf, pdfName) => {
            try {
              const time = new Date().getTime();
              const filename = pdfName + time + ".pdf";
              const pdfFile = pdf.output("datauristring");
              const blob = dataURLtoFile(pdfFile, filename);
              const formData = new FormData();
              formData.append("multipartFile", blob);
              formData.append("applicationName", "rise");
              const res = await uploadFile(formData);
              const data = res.data[0];
              const req = {
                mekId: this.chemeId,
                name: data.fileName,
                path: data.filePath,
                remark: this.reportName,
              };
              await add(req);
              this.dialogVisible = false;
              this.reportSave = false;
              iMessage.success("保存成功");
            } catch {
              iMessage.err("保存失败");
              this.dialogVisible = false;
              this.reportSave = false;
            }
          },
        });
      }
    }
  }
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
  margin-right: 60px;
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
    width: 130px;
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
</style>
<style lang="scss">
</style>
