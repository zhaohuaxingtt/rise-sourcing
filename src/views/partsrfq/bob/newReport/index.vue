<template>
  <iPage class="new-bob">
    <div>
      <div class="navBox flex-between-center">
        <span class="title font-weight">BOB{{ $t("TPZS.FENXI")}}
          <span v-if="inside">-RFQ {{ rfq }}</span></span>
        <div class="flex-align-center">
          <!--预览-->
          <iButton class="margin-left30"
                   @click="pre = true">{{
            $t("LK_YULAN")
          }}</iButton>
          <!--保存-->
          <iButton class="margin-left30"
                   @click="saveDialog">{{
            $t("LK_BAOCUN")
          }}</iButton>
          <!--BoB分析库-->
          <iButton @click="goToBob">BoB{{ $t("分析库") }}</iButton>
          <!--查找零件-->
          <iButton class="margin-left30"
                   @click="findPart"
                   v-if="!inside">{{
            $t("查找零件")
          }}</iButton>
        </div>
      </div>
      <el-row :gutter="20"
              class="margin-top20">
        <el-col :span="inside?4:5">
          <iCard :collapse="false"
                 style="height: 620px">
            <el-form label-position="top"
                     :model="form">
              <el-row class="margin-bottom20">
                <div v-if="inside">
                  <!--比较类型-->
                  <el-form-item :label="$t('比较类型')">
                    <iSelect v-model="chartType"
                             @change="changeBy">

                      <el-option value="supplier"
                                 :label="$t('按供应商比较')">
                      </el-option>
                      <el-option value="turn"
                                 :label="$t('按轮次比较')"></el-option>
                      <el-option value="spareParts"
                                 :label="$t('按零件号比较')"></el-option>
                    </iSelect>
                  </el-form-item>
                  <!--供应商-->
                  <el-form-item :label="$t('TPZS.GONGYINGSHANG')">
                    <el-select multiple
                               clearable
                               value-key
                               :multiple-limit="chartType === 'supplier' ? 5 : 1"
                               v-model="form.supplier">
                      <el-option v-for="(i, index) in supplierList"
                                 :key="i.supplierId"
                                 :value="i.supplierId"
                                 :label="i.nameZh">
                        <span style="float: left">{{ i.nameZh }}</span>
                        <span style="float: right; color: #8492a6; font-size: 13px"><i class="el-icon-error"></i>
                        </span>
                      </el-option>
                    </el-select>
                    <!-- <custom-select :data="supplierList"
                                   label="nameZh"
                                   value="supplierId"
                                   :multiple="true"
                                   @change="handleMultiChange"
                                   v-model="form.supplier"
                                   :disabled="false"
                                   :search-method="handleMultiSearch"
                                   :multiple-limit="chartType === 'supplier' ? 5 : 1"
                                   :popoverClass="'popover-class'" /> -->
                  </el-form-item>
                  <!--轮次-->
                  <el-form-item :label="$t('轮次')">
                    <el-select multiple
                               clearable
                               value-key
                               :multiple-limit="chartType === 'turn' ? 5 : 1"
                               v-model="form.turn">
                      <el-option :value="Number(-1)"
                                 label="最新"
                                 v-if="chartType!=='turn'"></el-option>
                      <el-option v-for="(i, index) in turnList"
                                 :key="i.turn"
                                 :value="i.turn"
                                 :label="'第' + i.turn + '轮'"></el-option>
                    </el-select>
                    <!-- <custom-select :data="supplierList"
                                   label="turn"
                                   value="turn"
                                   :multiple="true"
                                   @change="handleMultiChange"
                                   v-model="form.turn"
                                   :disabled="false"
                                   :search-method="handleMultiSearch"
                                   :multiple-limit="chartType === 'turn' ? 5 : 1"
                                   :popoverClass="'popover-class'" /> -->
                  </el-form-item>
                  <!--零件号-->
                  <el-form-item :label="$t('LK_SPAREPARTSNUMBER') + '/' + $t('LK_FSHAO')">
                    <!-- <custom-select :data="partList"
                                   label="spareParts"
                                   value="fsNo"
                                   :multiple="true"
                                   @change="handleMultiChange"
                                   v-model="form.spareParts"
                                   :disabled="false"
                                   :search-method="handleMultiSearch"
                                   :multiple-limit="chartType === 'spareParts' ? 5 : 1"
                                   :popoverClass="'popover-class'" /> -->
                    <el-select multiple
                               clearable
                               value-key
                               :multiple-limit="chartType === 'spareParts' ? 5 : 1"
                               v-model="form.spareParts">
                      <el-option v-for="(i, index) in partList"
                                 :key="i.fsNo"
                                 :value="i.fsNo"
                                 :label="i.fsNo+'/'+i.spareParts"></el-option>
                    </el-select>
                  </el-form-item>
                </div>
                <div v-else>
                  <el-form-item :label="$t('比较类型')">
                    <iSelect v-model="chartType"
                             @change="changeBy">
                      <el-option value="combination"
                                 :label="$t('混合比较')">
                      </el-option>

                    </iSelect>
                  </el-form-item>
                  <el-form-item :label="$t('FS号-零件号-供应商')">
                    <!-- <el-select multiple
                               clearable
                               value-key
                               :multiple-limit="chartType === 'combination' ? 6 : 1"
                               v-model="form.combination"
                               @change="selectChange"
                               @remove-tag="closeTag">
                      <el-option v-for="(i) in options"
                                 :key="i.key"
                                 :value="i.key"
                                 :label="i.nameZh+''+i.value">

                      </el-option>
                    </el-select> -->

                    <custom-select :data="options"
                                   label="nameZh"
                                   value="key"
                                   secordLabel="value"
                                   :multiple="true"
                                   @change="handleMultiChange"
                                   v-model="form.combination"
                                   :disabled="false"
                                   :search-method="handleMultiSearch"
                                   :multiple-limit="chartType === 'combination' ? 6 : 1"
                                   :popoverClass="'popover-class'" />
                  </el-form-item>
                </div>

              </el-row>
            </el-form>
            <div class="end">
              <iButton type="primary"
                       @click="searchChartData">{{
                $t("LK_QUEDING")
              }}</iButton>
              <iButton type="primary"
                       @click="handleSearchReset">{{
                $t("LK_ZHONGZHI")
              }}</iButton>
            </div>
          </iCard>
        </el-col>
        <el-col :span="inside?20:19">
          <iCard style="height: 620px">
            <div style="width: 100%; height: 30px;display: flex;flex-flow: row nowrap;justify-content: space-between;">
              <div> <span class="chartTitle">{{chartTitle}}</span>
                <el-button type="primary"
                           icon="el-icon-refresh"
                           size="mini"
                           circle
                           @click="refresh">
                </el-button>
              </div>

              <div class="legend">
                <ul>
                  <li v-for="(item,index) in anchorList"
                      :key="index">
                    <i class="circle"
                       :style="color(item)"></i>
                    <span style="vertical-align: baseline">{{item}}</span>
                  </li>
                </ul>
              </div>
            </div>
            <el-row>
              <el-col :span="inside ? 18 : 24"
                      style="padding-left:0px">
                <crown-bar :chartData="chartData"
                           :supplierList="supplierList"
                           :partList="partList"
                           :title="chartTitle"
                           @select="showSelect"
                           :type="bobType"
                           :by="chartType" />
                <div class="toolTip-div"
                     ref="toolTipDiv"
                     v-show="showSelectDiv">
                  <iSelect v-model="bobType"
                           ref="toolTipSelect"
                           @blur="closeDiv"
                           @change="changeType">
                    <el-option value="Best of Best"
                               label="Best of Best"></el-option>
                    <el-option value="Best of Average"
                               label="Best of Average"></el-option>
                    <el-option value="Best of Second"
                               label="Best of Second"></el-option>
                  </iSelect>
                </div>
              </el-col>
              <el-col :span="6"
                      v-if="inside">
                <!-- <div style="border: 1px dashed #ccc;width: 1px;height:320px;"></div> -->
                <div class="left-dash1">
                  <div v-if="chartData1.length > 0"
                       style="flex:1">
                    <out-bar :chartData="chartData1"
                             @del="delOut"
                             @change="changeOut"></out-bar>
                  </div>
                  <div v-else
                       @click="findPart"
                       class="icon-add">
                    <div>
                      <img src="@/assets/images/newZhu.png"
                           alt=""
                           style="width:220px;height:300px">
                      <div style="text-align: center;color:#8F8F90">{{ $t("待添加") }}</div>
                    </div>
                  </div>
                </div>
              </el-col>
            </el-row>
            <!-- <div class="legend">
              <ul>
                <li v-for="(item,index) in anchorList"
                    :key="index">
                  <i class="circle"
                     :style="color(item)"></i>
                  <span style="vertical-align: baseline">{{item}}</span>
                </li>
              </ul>
            </div> -->

          </iCard>
        </el-col>
      </el-row>
      <el-row :gutter="20"
              class="margin-top20">
        <el-col :span="inside?4:5">
          <iCard :collapse="false">
            <ul class="anchorList flex">
              <li v-for="(i,index) in anchorList"
                  :key="index"
                  @click="doActive(i,index)"
                  :class="{active:index==current}">{{i}}
              </li>
            </ul>
          </iCard>
        </el-col>
        <el-col :span="inside ? 20 : 19">
          <bobAnalysis ref="bobAnalysis"
                       :supplierList="supplierList"
                       :partList="partList"
                       :analysisSchemeId="analysisSchemeId"
                       :reportSave="reportSave"
                       :label="label"
                       :bobType="bobType"
                       :heightFlag="true"
                       :formUpdata="formUpdata"></bobAnalysis>
        </el-col>
      </el-row>
    </div>
    <findingParts v-if="value"
                  v-show="value"
                  :value="value"
                  @sure="sure"
                  @close="closeDialog"
                  @add="add"></findingParts>
    <preview ref="preview"
             v-if="pre"
             :value="pre"
             :supplierList="supplierList"
             :partList="partList"
             :analysisSchemeId="analysisSchemeId"
             :groupId="groupId"
             :reportName="reportName"
             :heightFlag="false"
             @closeDialog="closePreView"></preview>
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
  </iPage>
</template>

<script>
import {
  iPage,
  iButton,
  iCard,
  iSelect,
  icon,
  iDialog,
  iInput,
  iMessage,
} from "rise";
import CrownBar from "./components/crownBar.vue";
import bobAnalysis from "@/views/partsrfq/bob/bobAnalysis/index.vue";
import findingParts from "@/views/partsrfq/components/findingParts.vue";
import { getBobLevelOne, removeBobOut, addBobOut } from "@/api/partsrfq/bob";
import { part, supplier, turn, update, add, initOut, querySupplierTurnPartList, generateGroupId } from "@/api/partsrfq/bob/analysisList";
import customSelect from '@/views/demo'
import { downloadPDF, dataURLtoFile } from "@/utils/pdf";
import preview from "./preview.vue";
import OutBar from "./components/outBar.vue";

export default {
  componentName: "parentCom",
  components: {
    iPage,
    iButton,
    iCard,
    iSelect,
    CrownBar,
    bobAnalysis,
    findingParts,
    OutBar,
    icon,
    preview,
    iDialog,
    iInput,
    customSelect
  },
  data () {
    return {
      rfq: "",
      inside: false,
      chartData: [],
      chartData1: [],
      chartType: "",
      bobType: "Best of Best",
      form: {
        supplier: [],
        turn: [],
        spareParts: [],
        combination: []
      },
      showSelectDiv: false,
      analysisSchemeId: "",
      value: false,
      pre: false,
      partList: [],
      supplierList: [],
      turnList: [],
      options: [],
      analysisName: "",
      reportName: "",
      Split: window._.split,
      dialogVisible: false,
      analysisSave: false,
      reportSave: false,
      anchorList: ['原材料/散件', '制造费', '报废成本', '管理费', '其他费用', '利润'],
      current: null,
      isCover: true,
      label: "",
      groupId: "",
      formUpdata: {}
    };
  },
  async created () {
    this.newBuild = this.$route.query.newBuild;
    this.entryStatus = this.$store.state.rfq.entryStatus
    this.analysisSchemeId = this.$route.query.chemeId
    // this.groupId = this.$route.query.groupId
    let res = await generateGroupId()
    this.groupId = res.data
    if (this.newBuild) {
      if (this.entryStatus === 1) {
        this.inside = true
        this.rfq = this.$store.state.rfq.rfqId
        this.analysisSchemeId = this.$route.query.chemeId
        await this.getChartData()
      } else if (this.entryStatus === 0) {
        this.findPart()
      }
      this.analysisSave = true;
    } else {
      if (this.entryStatus === 1) {
        this.inside = true
        this.rfq = this.$store.state.rfq.rfqId
      } else {
        if (this.$route.query.rfqId) {
          this.inside = true
        } else {
          this.inside = false
        }
      }
      this.analysisSchemeId = this.$route.query.chemeId
      await this.getChartData()
    }
  },
  watch: {
    analysisName: {
      handler (val, newval) {
        if (newval && !this.newBuild) {
          this.isCover = false
        }
      },
      immediate: true
    },
    // reportName: {
    //   handler (val, newval) {
    //     if (newval && !this.newBuild) {
    //       this.isCover = false
    //     }
    //   },
    //   immediate: true
    // },
    chartType: {
      handler (newval) {
        if (!this.inside) {
          this.chartType = 'combination'
        }
        // this.inside ? "supplier" : "mixComp"
      },
    },
  },
  mounted () {
    // window.addEventListener('scroll', this.handleScroll, true)
  },
  methods: {
    getOptions () {
      part({
        analysisSchemeId: this.analysisSchemeId,
        data: {},
      }).then((res) => (this.partList = res.data));
      supplier({
        analysisSchemeId: this.analysisSchemeId,
        data: {},
      }).then((res) => (this.supplierList = res.data));
      turn({
        analysisSchemeId: this.analysisSchemeId,
        data: {},
      }).then((res) => (this.turnList = res.data));
    },
    querySupplierTurnPartList () {
      querySupplierTurnPartList({
        data: {},
        analysisSchemeId: this.analysisSchemeId,
      }).then((res) => {
        this.options = res.data
        // this.$nextTick(() => {
        //   let html = ""
        //   this.options.forEach((value, index) => {
        //     html +=
        //       `<div class="el-tag el-tag--info el-tag--large el-tag--light" style="display:flex;justify-content: center;align-items: center;">
        //     <div >
        //      <p class="el-select__tags-text">${value.nameZh}</p>
        //      <p class="el-select__tags-text">${value.value}</p>
        //     </div> 
        //      <i class="el-tag__close el-icon-close" style="z-index:1000" @click="closeTag"></i>
        //    </div>`
        //   })
        //   this.$el.querySelector('.el-select__tags').innerHTML = `<div>${html}</div>`

        // });
      })
    },
    selectChange (e) {
      this.$nextTick(() => {
        let html = ""
        this.options.forEach((value, index) => {
          e.forEach((i, index) => {
            if (value.key == i) {
              html +=
                `<div class="el-tag el-tag--info el-tag--large el-tag--light" style="display:flex;justify-content: center;align-items: center;">
            <div >
             <p class="el-select__tags-text">${value.nameZh}</p>
             <p class="el-select__tags-text">${value.value}</p>
            </div> 
             <i class="el-tag__close el-icon-close" style="z-index:1000" @click="closeTag(${e})"></i>
           </div>`
            }
          })
        })
        this.$el.querySelector('.el-select__tags').innerHTML = `<div>${html}</div>`
      });
    },
    closeTag (e) {
    },
    findPart () {
      this.value = true;
    },
    closeDialog (val) {
      this.value = val;
    },
    closePreView (val) {
      this.pre = val;
    },
    sure () { },
    changeBy (e) {
      this.chartType = e;
      if (this.chartType === 'combination') {
        this.form = {
          combination: []
        }
        return
      }
      this.form = {
        supplier: [],
        turn: [],
        spareParts: [],
      };
    },
    changeType (e) {
      this.bobType = e;
      this.closeDiv();
      this.$refs.bobAnalysis.chargeRetrieve({
        isDefault: true,
        viewType: 'all',
        schemaId: this.analysisSchemeId,
        groupId: this.groupId
      })
    },
    goToBob () {
      this.$router.push("bob");
    },
    closeDiv () {
      this.showSelectDiv = false;
    },
    close () {
      this.reportSave = false
    },
    showSelect (e) {
      const position = e.event.target.position;

      this.showSelectDiv = true;
      this.$refs.toolTipDiv.style.left = position[0] + -40 + "px";
      this.$refs.toolTipDiv.style.top = position[1] + 15 + "px";
      this.$refs.toolTipSelect.focus();
    },
    initChartData () {
      // const data=require('./data.json')
      // this.chartData = data
    },
    handleSearchReset () {
      if (this.inside) {
        this.form = {
          supplier: [],
          turn: [],
          spareParts: [],
        };
      } else {
        this.form = {
          combination: []
        }
      }
      this.getChartData();
    },
    add (val) {
      console.log(val)
      if (val.constructor === Object) {
        iMessage.error('请选择数据')
        return
      }
      if (val.length && val.length === 0) {
        iMessage.error('请选择数据')
        return
      } else if (val.length > 20) {
        iMessage.error('最多只能选择20条数据')
        return
      }
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      if (this.inside) {
        addBobOut({
          analysisSchemeId: this.analysisSchemeId,
          fs: val[0].fsNum,
          partNumber: val[0].partNum,
          rfqId: val[0].rfqId,
          supplierId: val[0].supplierId,
          groupId: this.groupId
        }).then((res) => {
          if (res.code == 200) {
            loading.close()
            this.$message.success(res.desZh);
            this.getChartData();
            this.$refs.bobAnalysis.chargeRetrieve({
              viewType: 'all',
              isDefault: true,
              schemaId: this.analysisSchemeId,
              groupId: this.groupId
            })
            this.closeDialog()
          } else {
            loading.close()
            this.$message.error(res.desZh);
            this.closeDialog()
          }
        }).catch((error) => {
          loading.close()
          this.$message.error(error.desZh);
          this.closeDialog()
        });
      } else {
        let arr = []
        val.forEach(value => {
          arr.push({
            fs: value.fsNum,
            partNumber: value.partNum,
            rfqId: value.rfqId,
            supplierId: value.supplierId,
          })
        })
        initOut({ list: arr, groupId: this.groupId }).then(res => {
          if (res.code === '200') {
            loading.close()
            this.$message.success(res.desZh);
            this.analysisSchemeId = res.data
            this.$store.dispatch('setSchemeId', this.analysisSchemeId);
            this.$refs.bobAnalysis.SchemeId = res.data
            this.$refs.bobAnalysis.chargeRetrieve({
              viewType: 'all',
              isDefault: true,
              schemaId: this.analysisSchemeId,
              groupId: this.groupId
            })
            // this.querySupplierTurnPartList()
            this.getChartData()
            this.closeDialog()
          } else {
            loading.close()
            this.$message.error(res.desZh);
            this.closeDialog()
          }
        })
      }

    },
    async refresh () {
      // let res = await generateGroupId()
      // this.groupId = res.data
      this.searchChartData()
    },
    async searchChartData () {
      if (this.inside) {
        await this.getOptions();
      } else {
        await this.querySupplierTurnPartList()
      }
      let res = await generateGroupId()
      this.groupId = res.data
      let params = {}
      let tableParams = {}
      if (this.inside) {
        params = {
          analysisSchemeId: this.analysisSchemeId,
          analysisDimension: this.chartType,
          spareParts: this.form.spareParts.join(","),
          supplier: this.form.supplier.join(","),
          turn: this.form.turn.join(","),
          defaultBobOptions: this.bobType,
          groupId: this.groupId
        }
        tableParams = {
          schemaId: this.analysisSchemeId,
          analysisDimension: this.chartType,
          spareParts: this.form.spareParts.join(","),
          supplier: this.form.supplier.join(","),
          turn: this.form.turn.join(","),
          groupId: this.groupId,
          isDefault: false,
          viewType: 'all',
        }
      } else {
        let selectedList = []
        this.form.combination.map(item => {
          selectedList.push(item.key)
        })
        params = {
          analysisSchemeId: this.$store.state.rfq.SchemeId,
          analysisDimension: this.chartType,
          combination: selectedList.join(','),
          defaultBobOptions: this.bobType,
          groupId: this.groupId
        }
        tableParams = {
          schemaId: this.analysisSchemeId,
          analysisDimension: this.chartType,
          combination: selectedList.join(','),
          groupId: this.groupId,
          isDefault: false,
          viewType: 'all',

        }
      }
      getBobLevelOne(params).then((res) => {
        const allData = res.data || [];
        this.chartData = allData.bobLevelOneVOList.filter(
          (r) => r.isIntroduce === 0
        );
        this.chartData1 = allData.bobLevelOneVOList.filter(
          (r) => r.isIntroduce === 1
        );
        this.chartType = allData.analysisDimension;
        this.bobType = allData.defaultBobOptions;
        if (this.chartType === 'combination') {
          this.form.combination = []
          let combinationData = this.Split(allData.combination, ",");
          this.options.forEach(item => {
            combinationData.forEach(i => {
              if (item.key === i) {
                this.form.combination.push(item)
              }
            })
          })
        } else {
          this.form = {
            supplier: [],
            turn: [],
            spareParts: [],
          };
          this.form.supplier = this.Split(allData.supplier, ",");
          this.form.turn = this.Split(allData.turn, ",").map(Number);
          this.form.spareParts = this.Split(allData.spareParts, ",");
        }
      });
      this.$refs.bobAnalysis.chargeRetrieve(tableParams);
    },

    async getChartData () {
      if (this.inside) {
        await this.getOptions();
      } else {
        await this.querySupplierTurnPartList()
      }
      getBobLevelOne({
        analysisSchemeId: this.analysisSchemeId,
        groupId: this.groupId
      }).then((res) => {
        const allData = res.data || [];
        this.chartData = allData.bobLevelOneVOList.filter(
          (r) => r.isIntroduce === 0
        );
        this.chartData1 = allData.bobLevelOneVOList.filter(
          (r) => r.isIntroduce === 1
        );
        this.chartType = allData.analysisDimension;
        this.bobType = allData.defaultBobOptions;
        this.analysisName = allData.name
        this.$refs.bobAnalysis.remark = allData.remark
        this.reportName = allData.name + '_' + window.moment(new Date()).format("yyyy.MM");
        if (this.chartType === 'combination') {
          this.form.combination = []
          let combinationData = this.Split(allData.combination, ",");
          this.options.forEach(item => {
            combinationData.forEach(i => {
              if (item.key === i) {
                this.form.combination.push(item)
              }
            })
          })
          console.log('', this.form.combination)
        } else {
          this.form = {
            supplier: [],
            turn: [],
            spareParts: [],
          };
          this.form.supplier = this.Split(allData.supplier, ",");
          this.form.turn = this.Split(allData.turn, ",").map(Number)
          this.form.spareParts = this.Split(allData.spareParts, ",");
        }
        if (this.inside) {
          this.formUpdata = {
            analysisDimension: this.chartType,
            defaultBobOptions: this.bobType,
            id: this.analysisSchemeId,
            name: this.analysisName,
            spareParts: this.form.spareParts.join(","),
            supplierId: this.form.supplier.join(","),
            turn: this.form.turn.join(","),
            isCover: this.isCover,
            // remark: this.$refs.bobAnalysis.remark
          };
        } else {
          this.formUpdata = {
            analysisDimension: this.chartType,
            defaultBobOptions: this.bobType,
            id: this.analysisSchemeId,
            name: this.analysisName,
            combination: this.form.combination.join(','),
            isCover: this.isCover,
            // remark: this.$refs.bobAnalysis.remark
          };
        }
        this.$refs.bobAnalysis.chargeRetrieve({
          viewType: 'all',
          isDefault: true,
          schemaId: this.analysisSchemeId,
          groupId: this.groupId
        })
      });
    },
    delOut () {
      removeBobOut({
        id: this.chartData1[0].id,
      }).then((res) => {
        if (res.code == 200) {
          this.$message.success(res.desZh);
          this.$refs.bobAnalysis.chargeRetrieve({
            viewType: 'all',
            isDefault: true,
            schemaId: this.analysisSchemeId,
            groupId: this.groupId
          })
          this.getChartData();
        } else {
          this.$message.error(res.desZh);
        }
      });
    },
    changeOut () {
      removeBobOut({
        id: this.chartData1[0].id,
      });
      this.findPart();
    },
    handleMultiChange (val) {
      console.log(val)
    },
    saveDialog () {
      this.dialogVisible = true;
    },
    save () {
      let that = this;
      if (this.analysisSave) {
        this.dialogVisible = false
        if (this.isCover && !this.newBuild) {
          this.$confirm('此样式/报告已存在, 是否覆盖?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.formUpdata.remark = this.$refs.bobAnalysis.remark
            this.formUpdata.name = this.analysisName
            update(this.formUpdata)
              .then((res) => {
                iMessage.success("保存成功");
                this.dialogVisible = false;
                this.reportSave = false;
              })
              .catch((err) => {
                iMessage.err("保存失败");
                this.dialogVisible = false;
                this.reportSave = false;
              });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消'
            });
          });
        } else {
          this.formUpdata.remark = this.$refs.bobAnalysis.remark
          this.formUpdata.name = this.analysisName
          update(this.formUpdata)
            .then((res) => {
              iMessage.success("保存成功");
              this.dialogVisible = false;
              this.reportSave = false;
            })
            .catch((err) => {
              iMessage.err("保存失败");
              this.dialogVisible = false;
              this.reportSave = false;
            });
        }
      }
      if (this.reportSave) {
        this.pre = true
        // downloadPDF({
        //   idEle: "content",
        //   pdfName: that.reportName,
        //   callback: async (pdf, pdfName) => {
        //     try {
        //       const time = new Date().getTime();
        //       const filename = pdfName + time + ".pdf";
        //       const pdfFile = pdf.output("datauristring");
        //       const blob = dataURLtoFile(pdfFile, filename);
        //       const formData = new FormData();
        //       formData.append("multipartFile", blob);
        //       formData.append("applicationName", "rise");
        //       const res = await uploadFile(formData);
        //       const data = res.data[0];
        //       const req = {
        //         analysisSchemeId: this.analysisSchemeId,
        //         name: data.fileName,
        //         path: data.filePath,
        //         remark: that.reportName,
        //       };
        //       await add(req);
        //       that.dialogVisible = false;
        //       that.reportSave = false;
        //       iMessage.success("保存成功");
        //     } catch {
        //       iMessage.err("保存失败");
        //       that.dialogVisible = false;
        //       that.reportSave = false;
        //     }
        //   },
        // });
      }
    },
    doActive (i, index) {
      this.label = i
      /*  this.$nextTick(() => {
         //页面滚动了的距离
         let height = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
         //指定dom到页面顶端的距离
         let nodeList = this.$el.querySelectorAll('.el-table__row--level-0')
         nodeList[index].scrollIntoView({
           top: nodeList[index].offsetTop - 40,
           behavior: 'smooth',
         })
       }); */
      this.current = index
    }
  },
  computed: {
    chartTitle () {
      if (this.chartType === "supplier") {
        return this.form.spareParts.toString();
      } else if (this.chartType === "turn") {
        return this.form.supplier.toString() + "/" + this.form.spareParts.toString();
      } else if (this.chartType === "spareParts") {
        return this.form.supplier.toString();
      } else if (this.chartType === 'combination') {
        return '';
      } else {
        return ''
      }
    },
    color (item) {
      return function (item) {
        if (item === '原材料/散件') {
          return 'background: #C6DEFF'
        } else if (item === '制造费') {
          return 'background: #9BBEFF'
        } else if (item === '报废成本') {
          return 'background: #72AEFF'
        } else if (item === '管理费') {
          return 'background: #5993FF'
        } else if (item === '其他费用') {
          return 'background: #1763F7'
        } else if (item === '利润') {
          return 'background: #0040BE'
        }
      }
    }

  },
};
</script>

<style lang="scss" scoped>
.new-bob {
  .end {
    text-align: center;
    bottom: 60px;
  }
  .toolTip-div {
    z-index: 20;
    min-width: 164px;
    max-width: 224px;
    z-index: 6;
    background: "#fff";
    opacity: 1;
    border-radius: 5px;
    position: absolute;
    box-shadow: 0px 4px 10px rgba(27, 29, 33, 0.12);
    top: 0;
    left: 0;
    padding: 10px;
  }

  .left-dash1 {
    display: flex;
    height: auto;
    border: none;
    padding-left: 40px;
    justify-content: center;
    align-items: center;
    .icon-add {
      display: flex;
      flex: 1;
      height: 560px;
      // border-left: 2px dashed #ccc;
      text-align: center;
      & > div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
    }
  }
}

::v-deep .el-select {
  width: 100%;
  .el-select-dropdown.is-multiple .el-select-dropdown__item.selected::after {
    right: 60px !important;
  }
}

.el-tag .flex {
  display: flex;
  justify-content: center;
  align-items: center;
}
::v-deep .el-select .el-tag {
  white-space: nowrap; //不换行
  overflow: hidden; //超出隐藏
  text-overflow: ellipsis; //变成...
}

::v-deep .el-tag--large {
  height: 3.5rem;
}
.anchorList {
  width: 60%;
  flex-direction: column;
  text-align: center;
  margin: 100px auto;
  & .active {
    font-weight: bold;
    color: #1660f1 !important;
    list-style: url("../../../../assets/images/circle.png") outside circle !important;
  }
  li {
    width: 100%;
    font-weight: 400;
    cursor: pointer;
    padding: 10px 0;
    color: #7e84a3;
    list-style: url("../../../../assets/images/circle1.png") outside circle;
  }
}
.refresh {
  font-size: 20px;
  color: #409eff;
}
::v-deep .el-form-item {
  margin-bottom: 20px;
  .el-form-item__label {
    padding: 0;
  }
}
.title {
  font-family: Arial;
  font-size: $font-size20;
  color: black;
}
.cardBody .end {
  position: absolute;
  bottom: 20px;
  display: flex;
  justify-content: space-around;
  .el-button {
    width: 100px;
  }
}
::v-deep.el-form-item {
  margin-bottom: 20px;
}
.chartTitle {
  font-size: 18px;
  font-family: "Arial";
  line-height: 16px;
  font-weight: "bold";
  margin-right: 20px;
}
.legend {
  // position: absolute;
  // right: 95px;
  // top: 26px;
  font-family: "Arial";
  font-size: 16px;
  color: #0d2451;
  ul {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    li {
      padding-right: 20px;
    }
  }
}
.card {
  position: relative;
}
.circle {
  display: inline-block;
  border-radius: 50%;
  width: 14px;
  height: 14px;
  vertical-align: baseline;
  margin-right: 10px;
}
</style>
