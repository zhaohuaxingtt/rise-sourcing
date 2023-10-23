<template>
  <iPage class="new-bob"
         v-loading="onDataLoading">
    <div>
      <div class="navBox flex-between-center">
        <span class="title font-weight">BOB{{ $t('TPZS.FENXI') }} <span v-if="inside">-RFQ {{ rfq }}</span></span>
        <div class="flex-align-center"
             v-if="!isComponent">
          <!--预览-->
          <iButton class="margin-left30" v-premission="WORKBENCH_RFQ_TPZS_CARD_BOB_INFOR_YULAN"
                   @click="handlePreview">{{ $t('LK_YULAN') }}</iButton>
          <!--保存-->
          <iButton class="margin-left30" v-premission="WORKBENCH_RFQ_TPZS_CARD_BOB_INFOR_SAVE"
                   @click="saveDialog">{{ $t('LK_BAOCUN') }}</iButton>
          <!--BoB分析库-->
          <iButton @click="goToBob" v-premission="WORKBENCH_RFQ_TPZS_CARD_BOB_INFOR_FENXIKU">BoB{{ $t('FENXIKU') }}</iButton>
          <!--查找零件-->
          <iButton class="margin-left30" v-premission="WORKBENCH_RFQ_TPZS_CARD_BOB_INFOR_CHAZHAOLINGJIAN"
                   @click="findPart"
                   v-if="!inside">{{ $t('TPZS.CZLJ') }}</iButton>
        </div>
      </div>
      <el-row :gutter="20"
              class="margin-top20">
        <el-col span="4"
                v-if="!isComponent">
          <iCard :collapse="false"
                 style="height: 620px">
            <el-form label-position="top"
                     :model="form">
              <el-row class="margin-bottom20">
                <div v-if="inside">
                  <!--比较类型-->
                  <el-form-item :label="$t('BIJIAOLEIXING')">
                    <iSelect v-model="chartType"
                             @change="changeBy">
                      <el-option value="supplier"
                                 :label="$t('ANGONGYINGSHANGBIJIAO')"> </el-option>
                      <el-option value="turn"
                                 :label="$t('ANLUNCIBIJIAO')"></el-option>
                      <el-option value="spareParts"
                                 :label="$t('ANLINGJIANHAOBIJIAO')"></el-option>
                    </iSelect>
                  </el-form-item>
                  <!--供应商-->
                  <el-form-item :label="$t('TPZS.GONGYINGSHANG')">
                    <el-select multiple
                               clearable
                               value-key
                               :multiple-limit="chartType === 'supplier' ? 5 : 1"
                               v-model="form.supplier">
                      <el-option v-for="i in supplierList"
                                 :key="i.supplierId"
                                 :value="i.supplierId"
                                 :label="i.shortNameZh">
                        <span style="float: left">{{ i.shortNameZh }}</span>
                        <span style="float: right; color: #8492a6; font-size: 13px"><i class="el-icon-error"></i> </span>
                      </el-option>
                    </el-select>
                  </el-form-item>
                  <!--轮次-->
                  <el-form-item :label="$t('LUNCI')">
                    <el-select multiple
                               clearable
                               value-key
                               :multiple-limit="chartType === 'turn' ? 5 : 1"
                               v-model="form.turn">
                      <el-option :value="Number(-1)"
                                 :label="$t('ZUIXIN')"
                                 v-if="chartType !== 'turn'"></el-option>
                      <el-option v-for="i in turnList"
                                 :key="i.turn"
                                 :value="i.turn"
                                 :label="$t('DI') + i.turn + $t('LUN')"></el-option>
                    </el-select>
                  </el-form-item>
                  <!--零件号-->
                  <el-form-item :label="$t('LK_SPAREPARTSNUMBER') + '/' + $t('LK_FSHAO')">
                    <i-select multiple
                              clearable
                              value-key
                              :multiple-limit="chartType === 'spareParts' ? 5 : 1"
                              v-model="form.spareParts">
                      <el-option v-for="i in partList"
                                 :key="i.fsNo"
                                 :value="i.fsNo"
                                 :label="i.fsNo + '/' + i.spareParts"></el-option>
                    </i-select>
                  </el-form-item>
                </div>
                <div v-else>
                  <el-form-item :label="$t('BIJIAOLEIXING')">
                    <iSelect v-model="chartType"
                             @change="changeBy">
                      <el-option value="combination"
                                 :label="$t('HUNHEBIJIAO')"> </el-option>
                    </iSelect>
                  </el-form-item>
                  <el-form-item :label="$t('FSLINGJIANHAOGONGYINGSHANG')">
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
                       @click="searchChartData">{{ $t('LK_QUEDING') }}</iButton>
              <iButton type="primary"
                       @click="handleSearchReset">{{ $t('LK_ZHONGZHI') }}</iButton>
            </div>
          </iCard>
        </el-col>
        <el-col :span="isComponent ? 24 : 20">
          <iCard style="height: 620px">
            <div style="width: 100%; height: 30px;display: flex;flex-flow: row nowrap;justify-content: space-between;">
              <div>
                <span class="chartTitle">{{ chartTitle }}</span>
                <el-button type="primary"
                           icon="el-icon-refresh"
                           size="mini"
                           circle
                           @click="refresh"> </el-button>
              </div>

              <div class="legend">
                <ul>
                  <li v-for="(item, index) in anchorList"
                      :key="index">
                    <i class="circle"
                       :style="color(item.zh)"></i>
                    <span style="vertical-align: baseline">{{ $t(item.i18n) }}</span>
                  </li>
                </ul>
              </div>
            </div>
            <div style="display: flex;flex-flow: row nowrap;">
              <div :style="{ width: groupIds ? '100%' : inside ? '75%' : '100%' }">
                <crown-bar :chartData="chartData"
                           :partList="partList"
                           :title="chartTitle"
                           :maxData="maxData"
                           :type="bobType"
                           :by="chartType"
                           :supplierList="supplierList"
                           @select="showSelect"
                           @type-changed="bobTypeChanged" />
              </div>
              <out-bar :chartData="chartData1"
                       :maxData="maxData"
                       :isPreview="isPreview"
                       preview
                      :supplierList="supplierList"
                       @del="delOut"
                       @change="changeOut"
                       @find-part="findPart"
                       style="flex: 1;"
                       v-if="inside"></out-bar>
            </div>
          </iCard>
        </el-col>
      </el-row>
      <el-row :gutter="20"
              class="margin-top20">
        <el-col span="4"
                v-if="!isComponent">
          <bob-pin :offset-top="80">
            <iCard :collapse="false">
              <ul class="anchorList flex">
                <li v-for="(i, index) in anchorList"
                    :key="index"
                    @click="doActive(i.zh, index)"
                    :class="{ active: index == current }">{{ $t(i.i18n) }}</li>
              </ul>
            </iCard>
          </bob-pin>
        </el-col>
        <el-col span="4"
                v-if="!isComponent"
                style="border:1px solid #F8F9FA;"></el-col>
        <el-col :span="isComponent ? 24 : 20">
          <bobAnalysis ref="bobAnalysis"
                       :label="label"
                       :formUpdata="formUpdata"
                       :propSchemeId="analysisSchemeId"
                       :propGroupId="groupId"
                       :supplierList="supplierList"
                       @groupToList="groupToList"
                       :isPreview="isPreview"></bobAnalysis>
        </el-col>
      </el-row>
      <!-- <div class="margin-top20"
           style="display:flex;flex-flow:row nowrap;justify-content:flex-end;">
        <div style="width: calc(100% / 6);padding-right: 20px; border:1px solid #f00;" v-if="!isComponent" >
          
        </div>
        <div style="width: calc(100% / 6 * 5);border:1px solid #f90;">
          
        </div>
      </div> -->
      <!-- </el-row> -->
    </div>
    <findingParts v-if="value"
                  v-show="value"
                  :value="value"
                  :selectedParts="chartData1"
                  @sure="sure"
                  @close="closeDialog"
                  @add="add"></findingParts>
    <preview ref="preview"
             v-if="pre"
             :value="pre"
             :crownBarChartData="chartData"
             :outBarChartData="chartData1"
             :partList="partList"
             :title="chartTitle"
             :type="bobType"
             :by="chartType"
             :maxData="maxData"
             :label="label"
             :formUpdata="formUpdata"
             :propSchemeId="analysisSchemeId"
             :propGroupId="groupId"
             :reportName="reportName"
             @closeDialog="closePreView"></preview>
    <iDialog :title="$t('BAOCUN')"
             :visible.sync="dialogVisible"
             width="20%"
             @close="close">
      <div>
        <div class="margin-bottom15 flex-between-center">
          <label for="">{{$t('TPZS.BCZFXK')}}</label>
          <el-checkbox v-model="analysisSave"></el-checkbox>
        </div>
        <iInput v-model="analysisName"
                :placeholder="$t('TPZS.QSRWJMC')" />
      </div>
      <div class="margin-top20">
        <div class="margin-bottom15 flex-between-center">
          <label for="">{{$t('TPZS.BCWBK')}}</label>
          <el-checkbox v-model="reportSave"></el-checkbox>
        </div>
        <iInput v-model="reportName"
                :placeholder="$t('TPZS.QSRWJMC')" />
      </div>
      <span slot="footer"
            class="dialog-footer">
        <iButton type="primary"
                 @click="save">{{$t('QUEDING')}}</iButton>
      </span>
    </iDialog>
  </iPage>
</template>

<script>
import { iPage, iButton, iCard, iSelect, icon, iDialog, iInput, iMessage } from 'rise';
import CrownBar from './components/crownBar.vue';
import BobPin from './components/pin.vue';
import bobAnalysis from '@/views/partsrfq/bob/bobAnalysis/index.vue';
import findingParts from '@/views/partsrfq/components/findingParts.vue';
import { getBobLevelOne, removeBobOut, addBobOut } from '@/api/partsrfq/bob';
import { part, supplier, turn, update, add, initOut, querySupplierTurnPartList, generateGroupId } from '@/api/partsrfq/bob/analysisList';
import customSelect from '@/views/demo';
import { downloadPDF, dataURLtoFile } from '@/utils/pdf';
import preview from './preview.vue';
import OutBar from './components/outBar.vue';

export default {
  componentName: 'parentCom',
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
    customSelect,
    BobPin,
  },
  data () {
    return {
      onDataLoading: false,
      rfq: '',
      inside: false,
      chartData: [],
      chartData1: [],
      chartType: '',
      bobType: 'Best of Best',
      form: {
        supplier: [],
        turn: [],
        spareParts: [],
        combination: [],
      },
      showSelectDiv: false,
      analysisSchemeId: '',
      value: false,
      pre: false,
      partList: [],
      supplierList: [],
      turnList: [],
      options: [],
      analysisName: '',
      reportName: '',
      Split: window._.split,
      dialogVisible: false,
      analysisSave: false,
      reportSave: false,
      anchorList: [{zh:'原材料/散件成本',i18n:'YUANCAILIAOSANJIANCHENGBEN'}, {zh:'制造成本',i18n:'ZHIZAOCHENGBEN'}, {zh:'报废成本',i18n:'BAOFEICHENGBEN'}, {zh:'管理费用',i18n:'GUANLIFEI'}, {zh:'其他费用',i18n:'LK_QITAFEIYONG'}, {zh:'利润',i18n:'LIRUN'}],
      current: null,
      isCover: true,
      label: '',
      groupId: '',
      formUpdata: {},
      maxData: '',
      maxData1: '',
      maxDataList: [],
      maxDataList1: [],
      isComponent: false,
    };
  },
  props: {
    propSchemeId: {
      type: String,
      default: '',
    },
    propGroupId: {
      type: String,
      default: '',
    },
    statusProps: {
      type: Boolean,
      default: false,
    },
    // 是否预览模式
    isPreview: {
      type: Boolean,
      default: false,
    },
  },
  async created () {
    // 当组件使用的时候隐藏侧边及顶部按钮
    if (this.propSchemeId || this.propGroupId) {
      this.isComponent = true;
    }
    this.onDataLoading = true;
    this.newBuild = this.$route.query.newBuild;
    if (this.statusProps) {
      this.entryStatus = 1;
    } else {
      this.entryStatus = this.$store.state.rfq.entryStatus;
    }
    if (this.$route.query.chemeId) {
      this.analysisSchemeId = this.$route.query.chemeId;
    } else {
      this.analysisSchemeId = this.propSchemeId;
    }
    // this.groupId = this.$route.query.groupId
    let res = await generateGroupId();
    this.groupId = res.data;
    if (this.newBuild) {
      if (this.entryStatus === 1) {
        this.inside = true;
        this.rfq = this.$store.state.rfq.rfqId;
        if (this.$route.query.chemeId) {
          this.analysisSchemeId = this.$route.query.chemeId;
        } else {
          this.analysisSchemeId = this.propSchemeId;
        }
        await this.getChartData();
      } else if (this.entryStatus === 0) {
        this.findPart();
      }
      this.analysisSave = true;
    } else {
      if (this.entryStatus === 1) {
        this.inside = true;
        this.rfq = this.$store.state.rfq.rfqId;
      } else {
        if (this.$route.query.rfqId) {
          this.inside = true;
        } else {
          this.inside = false;
        }
      }
      if (this.$route.query.chemeId) {
        this.analysisSchemeId = this.$route.query.chemeId;
      } else {
        this.analysisSchemeId = this.propSchemeId;
      }
      await this.getChartData();
    }
  },
  watch: {
    analysisName: {
      handler (val, newval) {
        if (newval && !this.newBuild) {
          this.isCover = false;
          console.log(this.isCover)
        }
      },
      immediate: true,
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
          this.chartType = 'combination';
        }
        // this.inside ? "supplier" : "mixComp"
      },
    },
  },
  mounted () {
    // window.addEventListener('scroll', this.handleScroll, true)
  },
  methods: {
    getSelectedParts () {
      if (this.chartData1 && this.chartData1.length > 0) {
        var results = [];
        this.chartData1.forEach((item) => {
          results.push(item.id);
        });
        return results;
      } else {
        return [];
      }
    },
    handlePreview () {
      this.pre = true;
      setTimeout(() => {
        if (!this.bobType) {
          this.bobType = 'Best of Best';
        }
        this.$refs.preview.open();
      }, 200);
    },
    bobTypeChanged (type) {
      this.bobType = type;
    },
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
        this.options = res.data;
      });
    },
    selectChange (e) {
      this.$nextTick(() => {
        let html = '';
        this.options.forEach((value, index) => {
          e.forEach((i, index) => {
            if (value.key == i) {
              html += `<div class="el-tag el-tag--info el-tag--large el-tag--light" style="display:flex;justify-content: center;align-items: center;">
            <div >
             <p class="el-select__tags-text">${value.nameZh}</p>
             <p class="el-select__tags-text">${value.value}</p>
            </div> 
             <i class="el-tag__close el-icon-close" style="z-index:1000" @click="closeTag(${e})"></i>
           </div>`;
            }
          });
        });
        this.$el.querySelector('.el-select__tags').innerHTML = `<div>${html}</div>`;
      });
    },
    closeTag (e) { },
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
          combination: [],
        };
        return;
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
        groupId: this.groupId,
      });
    },
    goToBob () {
      // this.$router.push('bob');
      if (this.$store.state.rfq.entryStatus === 1) {
        this.$router.push({
          path: "/sourceinquirypoint/sourcing/partsrfq/assistant",
          query: {
            id: this.$store.state.rfq.rfqId,
            round: this.$route.query.round,
            pageType: "BoB",
            activityTabIndex: "two",
          },
        });
      } else {
        this.$router.push({
          path: "/sourcing/partsrfq/externalNegotiationAssistant",
          query: { pageType: "BoB" },
        });
      }
    },
    closeDiv () {
      this.showSelectDiv = false;
    },
    close () {
      this.reportSave = false;
    },
    showSelect (e) {
      const position = e.event.target.position;

      this.showSelectDiv = true;
      this.$refs.toolTipDiv.style.left = position[0] + -40 + 'px';
      this.$refs.toolTipDiv.style.top = position[1] + 15 + 'px';
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
          combination: [],
        };
      }
      this.querySupplierTurnPartList()
    },
    add (val) {
      if (val.constructor === Object) {
        iMessage.error('请选择数据');
        return;
      }
      if (val.length && val.length === 0) {
        iMessage.error('请选择数据');
        return;
      } else if (this.inside && val.length > 1) {
        iMessage.error('最多只能选择1条数据');
        return;
      } else if (!this.inside && val.length > 20) {
        iMessage.error('最多只能选择20条数据');
      }
      this.onDataLoading = true;
      if (this.inside) {
        if (this.chartData1.length > 0 && this.chartData1[0].id) {
          removeBobOut({
            id: this.chartData1[0].id,
          }).then(() => {
            this.doAddBobOut(val);
          });
        } else {
          this.doAddBobOut(val);
        }
      } else {
        let arr = [];
        val.forEach((value) => {
          arr.push({
            fs: value.fsNum,
            partNumber: value.partNum,
            rfqId: value.rfqId,
            supplierId: value.supplierId,
          });
        });
        initOut({ list: arr, groupId: this.groupId }).then((res) => {
          if (res.code === '200') {
            this.$message.success(res.desZh);
            this.analysisSchemeId = res.data;
            this.$store.dispatch('setSchemeId', this.analysisSchemeId);
            this.$refs.bobAnalysis.SchemeId = res.data;
            this.$refs.bobAnalysis.chargeRetrieve({
              viewType: 'all',
              isDefault: true,
              schemaId: this.analysisSchemeId,
              groupId: this.groupId,
            });
            // this.querySupplierTurnPartList()
            this.getChartData();
            this.closeDialog();
          } else {
            this.$message.error(res.desZh);
            this.closeDialog();
          }
        });
      }
    },
    doAddBobOut (val) {
      addBobOut({
        analysisSchemeId: this.analysisSchemeId,
        fs: val[0].fsNum,
        partNumber: val[0].partNum,
        rfqId: val[0].rfqId,
        supplierId: val[0].supplierId,
        groupId: this.groupId,
      })
        .then((res) => {
          if (res.code == 200) {
            this.$message.success(res.desZh);
            this.searchChartData();
            this.$refs.bobAnalysis.chargeRetrieve({
              viewType: 'all',
              isDefault: true,
              schemaId: this.analysisSchemeId,
              groupId: this.groupId,
            });
            this.closeDialog();
          } else {
            this.$message.error(res.desZh);
            this.closeDialog();
          }
        })
        .catch((error) => {
          this.$message.error(error.desZh);
          this.closeDialog();
        });
    },
    async refresh () {
      // let res = await generateGroupId()
      // this.groupId = res.data


      this.searchChartData();
    },
    groupToList (val) {
      if (val) {
        let selectedList = [];
        let tableParams
        if (this.inside) {
          tableParams = {
            schemaId: this.analysisSchemeId,
            analysisDimension: this.chartType,
            spareParts: this.form.spareParts.join(','),
            supplier: this.form.supplier.join(','),
            turn: this.form.turn.join(','),
            groupId: this.groupId,
            isDefault: false,
            viewType: 'all',
          }
        } else {
          this.form.combination.map((item) => {
            selectedList.push(item.key);
          });
          tableParams = {
            schemaId: this.analysisSchemeId,
            analysisDimension: this.chartType,
            combination: selectedList.join(','),
            groupId: this.groupId,
            isDefault: false,
            viewType: 'all',
          };
        }
        this.$refs.bobAnalysis.chargeRetrieve(tableParams);
      }
    },
    async searchChartData () {
      if (this.form.combination && this.form.combination.length === 0) return iMessage.error(this.language('QINGXUANZEFSLINGJIANHAOGONGYINGSHANG', '请选择FS号-零件号-供应商'))
      this.onDataLoading = true;
      if (this.inside) {
        await this.getOptions();
      } else {
        await this.querySupplierTurnPartList();
      }

      let res = await generateGroupId();
      this.groupId = res.data;
      let params = {};
      let tableParams = {};
      if (this.inside) {
        params = {
          analysisSchemeId: this.analysisSchemeId,
          analysisDimension: this.chartType,
          spareParts: this.form.spareParts.join(','),
          supplier: this.form.supplier.join(','),
          turn: this.form.turn.join(','),
          defaultBobOptions: this.bobType,
          groupId: this.groupId,
        };
        tableParams = {
          schemaId: this.analysisSchemeId,
          analysisDimension: this.chartType,
          spareParts: this.form.spareParts.join(','),
          supplier: this.form.supplier.join(','),
          turn: this.form.turn.join(','),
          groupId: this.groupId,
          isDefault: false,
          viewType: 'all',
        };
      } else {
        let selectedList = [];

        this.form.combination.map((item) => {
          selectedList.push(item.key);
        });
        params = {
          analysisSchemeId: this.analysisSchemeId,
          analysisDimension: this.chartType,
          combination: selectedList.join(','),
          defaultBobOptions: this.bobType,
          groupId: this.groupId,
        };
        tableParams = {
          schemaId: this.analysisSchemeId,
          analysisDimension: this.chartType,
          combination: selectedList.join(','),
          groupId: this.groupId,
          isDefault: false,
          viewType: 'all',
        };
      }
      getBobLevelOne(params).then(
        (res) => {
          const allData = res.data || [];
          if (!allData) {
            this.$message.error(res.desZh);
            return;
          }
          this.maxDataList = [];
          this.chartData = allData.bobLevelOneVOList.filter((r) => r.isIntroduce === 0);
          this.chartData1 = allData.bobLevelOneVOList.filter((r) => r.isIntroduce === 1);
          allData.bobLevelOneVOList.forEach((item) => {
            this.maxDataList.push(parseInt(item.sum));
          });
          this.maxData = _.max(this.maxDataList).toString();
          let first = Number(this.maxData.slice(0, 1)) + 1;
          for (let i = 0; i < this.maxData.length - 1; i++) {
            first += '0';
          }
          this.maxData = first;
          this.chartType = allData.analysisDimension;
          this.bobType = allData.defaultBobOptionsForFront;
          if (this.chartType === 'combination') {
            this.form.combination = [];
            let combinationData = this.Split(allData.combination, ',');
            this.options.forEach((item) => {
              combinationData.forEach((i) => {
                if (item.key === i) {
                  this.form.combination.push(item);
                }
              });
            });
          } else {
            this.form = {
              supplier: [],
              turn: [],
              spareParts: [],
            };
            this.form.supplier = this.Split(allData.supplier, ',');
            this.form.turn = this.Split(allData.turn, ',').map(Number);
            this.form.spareParts = this.Split(allData.spareParts, ',');
          }
          if (this.inside) {
            this.formUpdata = {
              analysisDimension: this.chartType,
              defaultBobOptions: this.bobType,
              id: this.analysisSchemeId,
              name: this.analysisName,
              spareParts: this.form.spareParts.join(','),
              supplierId: this.form.supplier.join(','),
              turn: this.form.turn.join(','),
              isCover: this.isCover,
              // remark: this.$refs.bobAnalysis.remark
            };
          } else {
            this.formUpdata = {
              analysisDimension: this.chartType,
              defaultBobOptions: this.bobType,
              id: this.analysisSchemeId,
              name: this.analysisName,
              isCover: this.isCover,
              combination: ''
              // remark: this.$refs.bobAnalysis.remark
            };
            this.form.combination.forEach((item) => {
              this.formUpdata.combination = this.formUpdata.combination + item.key + ",";
            });
          }
          this.$nextTick(() => {
            this.onDataLoading = false;
          });
          this.$refs.bobAnalysis.chargeRetrieve(tableParams);
        },
        () => {
          this.$nextTick(() => {
            this.onDataLoading = false;
          });
        }
      );
    },

    async getChartData () {
      this.onDataLoading = true;
      if (this.inside) {
        await this.getOptions();
      } else {
        await this.querySupplierTurnPartList();
      }
      getBobLevelOne({
        analysisSchemeId: this.analysisSchemeId,
        groupId: this.groupId,
      }).then(
        (res) => {
          const allData = res.data || [];
          if (allData.length == 0) {
            this.$message.error(res.desZh);
            this.onDataLoading = false;
            return;
          }
          this.chartData = allData.bobLevelOneVOList.filter((r) => r.isIntroduce === 0);
          this.chartData1 = allData.bobLevelOneVOList.filter((r) => r.isIntroduce === 1);
          allData.bobLevelOneVOList.forEach((item) => {
            this.maxDataList.push(parseInt(item.sum));
          });
          this.maxData = _.max(this.maxDataList).toString();
          let first = Number(this.maxData.slice(0, 1)) + 1;
          for (let i = 0; i < this.maxData.length - 1; i++) {
            first += '0';
          }

          this.maxData = first;
          this.chartType = allData.analysisDimension;
          this.bobType = allData.defaultBobOptionsForFront;
          this.analysisName = allData.name;
          this.$refs.bobAnalysis.remark = allData.remark;
          this.reportName = allData.name + '_' + window.moment(new Date()).format('yyyy.MM');
          if (this.chartType === 'combination') {
            this.form.combination = [];
            let combinationData = this.Split(allData.combination, ',');
            this.options.forEach((item) => {
              combinationData.forEach((i) => {
                if (item.key === i) {
                  this.form.combination.push(item);
                }
              });
            });
          } else {
            this.form = {
              supplier: [],
              turn: [],
              spareParts: [],
            };
            this.form.supplier = this.Split(allData.supplier, ',');
            this.form.turn = this.Split(allData.turn, ',').map(Number);
            this.form.spareParts = this.Split(allData.spareParts, ',');
          }

          if (this.inside) {
            this.formUpdata = {
              analysisDimension: this.chartType,
              defaultBobOptions: this.bobType,
              id: this.analysisSchemeId,
              name: this.analysisName,
              spareParts: this.form.spareParts.join(','),
              supplierId: this.form.supplier.join(','),
              turn: this.form.turn.join(','),
              isCover: this.isCover,
              // remark: this.$refs.bobAnalysis.remark
            };
          } else {
            this.formUpdata = {
              analysisDimension: this.chartType,
              defaultBobOptions: this.bobType,
              id: this.analysisSchemeId,
              name: this.analysisName,
              isCover: this.isCover,
              combination: []
              // remark: this.$refs.bobAnalysis.remark
            };
            this.form.combination.forEach((item) => {
              this.formUpdata.combination = this.formUpdata.combination + item.key + ",";
            });
          }
          this.$nextTick(() => {
            this.onDataLoading = false;
          });
          this.$refs.bobAnalysis.chargeRetrieve({
            viewType: 'all',
            isDefault: true,
            schemaId: this.analysisSchemeId,
            groupId: this.groupId,
          });
        },
        () => {
          this.$nextTick(() => {
            this.onDataLoading = false;
          });
        }
      );
    },
    filterNumber (value) {
      let num = '';
      num = value / 100;
      if (num.toString().split(',').length == 1) {
        return num + '.00';
      } else {
        if (
          num
            .toString()
            .split(',')[1]
            .toString().length == 1
        ) {
          return num + '0';
        } else {
          return num + '';
        }
      }
    },
    delOut () {
      this.onDataLoading = true;
      removeBobOut({
        id: this.chartData1[0].id,
      }).then((res) => {
        if (res.code == 200) {
          this.$message.success(res.desZh);
          this.$refs.bobAnalysis.chargeRetrieve({
            viewType: 'all',
            isDefault: true,
            schemaId: this.analysisSchemeId,
            groupId: this.groupId,
          });
          this.searchChartData();
        } else {
          this.$message.error(res.desZh);
        }
      });
    },
    changeOut () {
      // removeBobOut({
      //   id: this.chartData1[0].id
      // });
      this.findPart();
    },
    handleMultiChange (val) {
      console.log("选择过后的数据" + val);
    },
    saveDialog () {
      this.dialogVisible = true;
    },
    save () {
      let that = this;
      if (this.analysisSave) {
        this.dialogVisible = false;
        if (this.isCover && !this.newBuild) {
          this.$confirm('此样式/报告已存在, 是否覆盖?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          })
            .then(() => {
              this.formUpdata.remark = this.$refs.bobAnalysis.remark;
              this.formUpdata.name = this.analysisName;
              this.formUpdata.isCover = this.isCover;
              // this.formUpdata.defaultBobOptions = this.formUpdata.defaultBobOptions.replaceAll("▼","")
              update(this.formUpdata)
                .then((res) => {
                  if (res?.code === '200') {
                    iMessage.success('保存成功');
                    this.dialogVisible = false;
                    this.reportSave = false;
                  } else {
                    iMessage.eroor(res.desZh)
                  }
                })
                .catch((err) => {
                  iMessage.err('保存失败');
                  this.dialogVisible = false;
                  this.reportSave = false;
                });
            })
            .catch(() => {
              this.$message({
                type: 'info',
                message: '已取消',
              });
            });
        } else {
          console.log(this.formUpdata.combination);
          this.formUpdata.remark = this.$refs.bobAnalysis.remark;
          this.formUpdata.name = this.analysisName;
          this.formUpdata.isCover = this.isCover;
          update(this.formUpdata)
            .then((res) => {
              if (res?.code === '200') {
                iMessage.success('保存成功');
                this.dialogVisible = false;
                this.reportSave = false;
              } else {
                iMessage.error(res.desZh)
              }
            })
            .catch((err) => {
              iMessage.err('保存失败');
              this.dialogVisible = false;
              this.reportSave = false;
            });
        }
      }
      if (this.reportSave) {
        this.pre = true;
        this.$nextTick(() => {
          this.$refs.preview.open();
        })
      }
    },
    doActive (i, index) {
      this.label = i;
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
      this.current = index;
    },
  },
  computed: {
    chartTitle () {
      if (this.chartType === 'supplier') {
        return this.form.spareParts.toString();
      } else if (this.chartType === 'turn') {
        let nameZh = '';
        this.supplierList.forEach((item) => {
          this.form.supplier.forEach((i) => {
            if (item.supplierId === i) {
              nameZh = item.shortNameZh;
            }
          });
        });
        return nameZh;
      } else if (this.chartType === 'spareParts') {
        let nameZh = '';
        this.supplierList.forEach((item) => {
          this.form.supplier.forEach((i) => {
            if (item.supplierId === i) {
              nameZh = item.shortNameZh;
            }
          });
        });
        return nameZh;
      } else if (this.chartType === 'combination') {
        return '';
      } else {
        return '';
      }
    },
    color () {
      return function (item) {
        if (item === '原材料/散件成本') {
          return 'background: #C6DEFF';
        } else if (item === '制造成本') {
          return 'background: #9BBEFF';
        } else if (item === '报废成本') {
          return 'background: #72AEFF';
        } else if (item === '管理费用') {
          return 'background: #5993FF';
        } else if (item === '其他费用') {
          return 'background: #67C23A';
        } else if (item === '利润') {
          return 'background: #0040BE';
        }
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.new-bob {
  .end {
    text-align: center;
    bottom: 20%;
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
      height: 520%;
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
    right: 20% !important;
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
    color: #67C23A !important;
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
