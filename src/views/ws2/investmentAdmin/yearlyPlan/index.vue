<template>
  <div>
    <!-- v-permission="TOOLING_PAYMENTPLAN_YEAR" -->
    <div class="page-container" v-permission="TOOLING_PAYMENTPLAN_YEAR">
      <HeadTool @refresh="refresh" @receiVereceive="receiVereceive" :refreshStatus="refreshStatus" :newVersionNum="newVersionNum">
        <template slot="btns">
          <iButton v-if="vereceive.editFlag" @click="save" :loading="saveLoading">{{ $t('LK_BAOCUN') }}</iButton><!-- 保存 -->
          <iButton @click="saveNew" :loading="saveNewLoading">{{ $t('LK_BAOCUNWEIZUIXINBANBEN') }}</iButton><!-- 保存为最新版本 -->
        </template>
      </HeadTool>

      <div class="content">
        <div class="c-left">
          <!-- 上半年SOP付款⽐ -->
          <iCard class="c-card-l">
            <div class="title">{{ $t('LK_SHANGBANNIANSOPFUKUANDUIBI') }}</div>
            <icon symbol name="iconSOPfukuanbi" class="card-icon"></icon>
            <iInput :disabled="!vereceive.editFlag" v-model="ratioInput.firstHalfYearPercent"></iInput>
          </iCard>

          <!-- 下半年SOP付款⽐ -->
          <iCard class="c-card-l">
            <div class="title">{{ $t('LK_XIABANNIANSOPFUKUANDUIBI') }}</div>
            <icon symbol name="iconSOPfukuanbi" class="card-icon"></icon>
            <iInput :disabled="!vereceive.editFlag" v-model="ratioInput.secondHalfYearPercent"></iInput>
          </iCard>
        </div>
        <div class="c-right">
          <iCard class="c-card-r" v-loading="chartLoading">
            <div class="right-head">
              <div class="right-title">{{ $t('LK_NIANDUJIHUA') }}</div>
              <div class="right-sildBox">
                <div>{{ $t('LK_XITONGJIHUASHANGBANNIAN') }}</div>
                <div>{{ $t('LK_XITONGJIHUAXIABANNIAN') }}</div>
                <div>{{ $t('LK_XITONGJISUANBACKLOG') }}</div>
                <div>{{ $t('LK_SHOUGONGTIAOZHENG') }}</div>
                <div>{{ $t('LK_SHOUGONGTIAOZHENGRISK') }}</div>
              </div>
            </div>
            <div id="echarts"></div>
          </iCard>
        </div>
      </div>


      <!-- 系统计算 -->
      <Popup :visible="systemVisible" @changeLayer="() => this.systemVisible = false" :title="$t('LK_XITONGJISUAN')">
        <template slot="btns">
          <div class="btns-txt">
            <span>{{ $t('LK_HUOBIRENMINBI') }}</span>
<!--            <span>{{$t('LK_HUOBI')}}：{{$t('LK_RENMINBI')}}</span>-->
<!--            <span>{{$t('LK_DANWEI')}}：{{$t('LK_BAIWANYUAN')}}</span>-->
<!--            <span>{{$t('LK_BUHANSUI')}}</span>-->
          </div><!-- 货币：人民币  |  单位：百万元  |  不含税  -->
          <iButton @click="downloadExport">{{ $t('LK_XIAZAIQINGDAN') }}</iButton><!-- 下载清单 -->
        </template>

        <template slot="content">
          <iTableList
              :tableData="systemListData"
              :tableTitle="budgetApprovalData"
              :tableLoading="systemTableLoading"
              :getSummaries="getSummaries"
              :activeItems="'partNum'"
              :selection="false"
              :show-summary="true"
              class="baApply-table"
          >
            <template #budgetAmount="scope">
              <div v-if="scope.row.statType === 'backlog'"></div>
              <div v-else>{{getTousandNum(NumFormat(scope.row.budgetAmount))}}</div>
            </template>
            <template #nomiAmount="scope">
              <div v-if="scope.row.statType === 'backlog'"></div>
              <div v-else>{{getTousandNum(NumFormat(scope.row.nomiAmount))}}</div>
            </template>
            <template #bmAmount="scope">
              <div v-if="scope.row.statType === 'backlog'"></div>
              <div v-else>{{getTousandNum(NumFormat(scope.row.bmAmount))}}</div>
            </template>
            <template #paymentAmountLast="scope">
              <div v-if="scope.row.statType === 'backlog'"></div>
              <div v-else>{{getTousandNum(NumFormat(scope.row.paymentAmountLast))}}</div>
            </template>
            <template #paymentAmountCurrent="scope">
              <div v-if="scope.row.statType === 'backlog'"></div>
              <div v-else>{{getTousandNum(NumFormat(scope.row.paymentAmountCurrent))}}</div>
            </template>
            <template #planAmountCurrent="scope">
              <div>{{getTousandNum(NumFormat(scope.row.planAmountCurrent))}}</div>
            </template>
            <template #planAmountNext="scope">
              <div v-if="scope.row.statType === 'backlog'"></div>
              <div v-else>{{getTousandNum(NumFormat(scope.row.planAmountNext))}}</div>
            </template>
            <template #linieName="scope">
              <div v-if="scope.row.statType === 'backlog'"></div>
              <div v-else>{{getTousandNum(NumFormat(scope.row.linieName))}}</div>
            </template>
            <template #carTypeProName="scope">
              <div class="backlog" v-if="scope.row.statType === 'backlog'">
                backlog
              </div>
              <div v-else>
                {{scope.row.carTypeProName}}
              </div>
            </template>
            <template #sopPercent="scope">
              <div v-if="scope.row.statType === 'backlog'"></div>
              <div v-else>{{getTousandNum(NumFormat(scope.row.sopPercent || 0))}}%</div>
            </template>
          </iTableList>
        </template>
        
      </Popup>

      <!-- 手工调整 -->
      <iDialog :visible="manualvisible" @close='() => this.manualvisible = false' width="80%" z-index="1000" class="manualIDialog">
        <template slot="title">
          <div class="manual-head">
            <div class="title">
              {{$t('LK_SHOUGONGTIAOZHENG')}}-{{isThen ? vereceive.year : vereceive.year + 1}}
            </div>
            <div>
              <iButton v-if="vereceive.editFlag" @click="manualSave" :loading="manualSaveLoading">{{ $t('LK_BAOCUN') }}</iButton><!-- 保存 -->
              <iButton @click="downloadList">{{ $t('LK_XIAZAIQINGDAN') }}</iButton><!-- 下载清单 -->
            </div>
          </div>
        </template>
        <div class="btns-txt manual-txt"><!-- 货币：人民币  |  单位：百万元  |  不含税  -->
          <span>{{ $t('LK_HUOBIRENMINBI') }}</span>
<!--          <span>{{$t('LK_HUOBI')}}：{{$t('LK_RENMINBI')}}</span>-->
<!--          <span>{{$t('LK_DANWEI')}}：{{$t('LK_BAIWANYUAN')}}</span>-->
<!--          <span>{{$t('LK_BUHANSUI')}}</span>-->
        </div>
        <div class="manual-content">
          <div class="content-l">
            <div id="totalLeft"></div>
            <div class="manual-l-txt">
              <div class="manual-l-title">{{setSystemTotal}}</div>
              <div class="manual-lprice manual-lprice1" v-for="(item, index) in planYearCommutity" :key="index">
                {{isThen ? item.planAmountSystemCurrent : item.planAmountSystemNext}}
              </div>
            </div>
            <div class="manual-l-txt" style="margin-right: 100px;">
              <div class="manual-l-title">Rate</div>
              <div class="manual-lprice manual-lprice2" v-for="(item, index) in setSystemRate" :key="index">{{item}}</div>
            </div>
          </div>
          <div class="content-r">
            <div id="totalRight"></div>
            <!-- <div style="flex: 1">
              <div id="totalRight"></div>
              <div id="moreTerm" style="dispaly: none"></div>
            </div> -->
            <!-- <div class="test"></div> -->
            <div class="manual-l-txt">
              <div class="manual-l-title">{{setManualTotal}}</div>
              <div class="manual-lpriceInput" v-for="(item, index) in planYearCommutity" :key="index">
                <iInput type="number" :disabled="!vereceive.editFlag" v-if="isThen" class="right-input" v-model="item.planAmountAmualCurrent"></iInput>
                <iInput type="number" :disabled="!vereceive.editFlag" v-else class="right-input" v-model="item.planAmountAmualNext"></iInput>
              </div>
            </div>
            <div class="manual-l-txt">
              <div class="manual-l-title">Rate</div>
              <div class="manual-lpriceInputTxt" v-for="(item, index) in setManualRate" :key="index">{{item}}</div>
            </div>
          </div>
        </div>
      </iDialog>

      <!-- 保存为最新版本 -->
      <new-version-dialog
        v-model="saveNewVersion"
        @handleConfirm="handleConfirm"
      />
    </div>
  </div>

</template>

<script>
import {
  iTableList
} from '@/components';
import {iDialog, iMessage, iInput, iButton, iCard,icon} from "rise";
import HeadTool from "../components/headTool";
import echarts from "@/utils/echarts";
import Popup from "./components/popup";
import { budgetApprovalData } from "./components/data";
import { saveVersion, refreshVersion,
  saveNewVersion, queryPlanYearSystem, downloadExport,
  queryPlanPercentage, queryPlanYearCommutity, saveCommutityAmualData, exportPlanCommutityList
} from "@/api/ws2/investmentAdmin/yearlyPlan";
import NewVersionDialog from "../monthlyPlan/components/newVersionDialog";
import { getTousandNum, NumFormat } from "@/utils/tool";
import _ from 'lodash';


export default {
  components: {
    HeadTool, iButton, iCard, iInput, icon, Popup, iTableList,
    iDialog, NewVersionDialog
  },

  computed: {
    setManualTotal: function() {  //  手工计算-总价
      const { isThen, planYearCommutity } = this;
      const key = isThen ? 'planAmountAmualCurrent' : 'planAmountAmualNext';
      const arr = planYearCommutity.map(item => item[key]).filter(n => n);
      const total = arr.reduce((prev,curr) => {
        return (Number(prev) + Number(curr)).toFixed(2);
      },0)

      return total;
    },
    setManualRate: function() { //  计算手工占比
      const { isThen, planYearCommutity } = this;
      const key = isThen ? 'planAmountAmualCurrent' : 'planAmountAmualNext';
      const arr = planYearCommutity.map(item => {
        return this.getPercent(Math.abs(item[key] || 0), Math.abs(this.setManualTotal)); 
      });
      return arr;
    },
    setSystemTotal: function() {  //  系统计算-总价
      const { isThen, planYearCommutity } = this;
      const key = isThen ? 'planAmountSystemCurrent' : 'planAmountSystemNext';
      const arr = planYearCommutity.filter(item => item.commodity !== 'Risk' ).map(item => item[key]).filter(n => n);
      const total = arr.reduce((prev,curr) => {
        return (Number(prev) + Number(curr)).toFixed(2);
      },0)

      return total;
    },
    setSystemRate: function() { //  计算系统占比
      const { isThen, planYearCommutity } = this;
      const key = isThen ? 'planAmountSystemCurrent' : 'planAmountSystemNext';
      const arr = planYearCommutity.filter(item => item.commodity !== 'Risk' ).map(item => {
        return this.getPercent(item[key] || 0, this.setSystemTotal);
      });
      return arr;
    }
  },

  data(){
    return {
      NumFormat,
      getTousandNum,
      no1: '',
      systemVisible: false,
      manualvisible: false,
      saveNewLoading: false,
      systemListData: [],
      budgetApprovalData,
      ratioInput: {
        firstHalfYearPercent: 0,  //  上半年SOP付款比
        secondHalfYearPercent: 0, //  下半年SOP付款比
      },
      saveLoading: false,
      saveNewVersion: false,
      systemTableLoading: false,
      vereceive: {},
      planYearCommutity: [],
      isThen: true,
      manualSaveLoading: false,
      refreshStatus: true,
      chartLoading: false,
      newVersionNum: '',
      base: 0,
    }
  },

  mounted(){
    this.base = document.body.clientWidth >= 1920 ? 75 : 66;
  },

  methods: {

    //  下载手工清单
    downloadList(){
      exportPlanCommutityList({
        versionId: this.vereceive.id,
        planType: this.isThen ? 'current_year' : 'next_year',
      }).then(res => {

      })
    },

    manualSave(){
      this.manualSaveLoading = true;
      const { isThen, planYearCommutity } = this;
      const params = {
        dataList : planYearCommutity
      }
      saveCommutityAmualData(planYearCommutity).then(res => {
        const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn;

        if(res.code === '0'){
          iMessage.success(result);
          this.manualvisible = false;
          this.getHistogram();  //  获取柱状图数据
        }else{
          iMessage.error(result);
        }

        this.manualSaveLoading = false;
      }).catch(err => {
        this.manualSaveLoading = false;
      })
    },

    //  求占比
    getPercent(num, total){
      num = parseFloat(num);
      total = parseFloat(total);
      if (isNaN(num) || isNaN(total)) {
          return "-";
      }
      return total <= 0 ? "0%" : (Math.round(num / total * 10000) / 100.00)+"%";
    },

    //  下载系统清单
    downloadExport(){
      downloadExport({
        versionId: this.vereceive.id
      }).then(res => {
        
      })
    },

    getSummaries(param){
      const { columns, data } = param;
      let sums = [];
      const keyArr = ['carTypeProName', 'sop', 'sopPercent', 'linieName'];

      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = 'Total';
          return;
        }
        if(!keyArr.includes(column.property)){  //  只有金额字段才需要显示总价
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
          } else {
            sums[index] = 'N/A';
          }
        }else{
          sums[index] = '';
        }
        
      });

      sums = sums.map(item => {
        if(typeof item === 'number'){
          item = getTousandNum(NumFormat(item));
        }

        return item;
      })
      return sums;
    },

    handleConfirm(val) {
      if(val){
        saveNewVersion({
          ...this.ratioInput,
          dateStr: val,
          versionId: this.vereceive.id
        }).then(res => {
          const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn;

          if(res.code === "0"){
            iMessage.success(result);
            this.$store.commit('SET_versionId', '');
            // this.refreshStatus = !this.refreshStatus;
            this.newVersionNum = res.data.version;
          }else{
            iMessage.error(result);
          }

          this.saveNewVersion = false;
        }).catch(err => {
          this.saveNewVersion = false;
        })
      }
    },

    //  保存为新版本
    saveNew(){
      this.saveNewVersion = true;
    },

    getHistogram(){
      this.chartLoading = true;
      queryPlanPercentage({
        versionId: this.vereceive.id
      }).then(res => {
        const _this = this;
        const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn;
        if(res.code === "0"){
          this.ratioInput.firstHalfYearPercent = res.data.firstHalfYearPercent;
          this.ratioInput.secondHalfYearPercent = res.data.secondHalfYearPercent;
          const resData = res.data;
          const myChart = echarts().init(document.getElementById("echarts"));
          myChart.setOption({
            tooltip: {
              backgroundColor: "#ffffff",
                    extraCssText:
                      "color: #1B1D21; box-shadow: 0px 0px 20px rgba(27, 29, 33, 0.12);",
              formatter: function (params) {
                return `<span style="color: #1763F7; font-weight: bold">${params.data}</span>`
              },
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            xAxis: [{
              type: 'category',
              data: [_this.vereceive.year, _this.vereceive.year + 1]
            }],
            yAxis: [{
              show: false,
              type: 'value'
            }],
            series: [
              {
                name: '系统计算Backlog',
                type: 'bar',
                stack: '系统',
                data: [resData.planSystemCurrentBacklog, resData.planSystemNextBacklog],
                itemStyle:{
                  normal:{color:'#056FCC'}
                },
              },
              
              {
                name: '系统计算下半年',
                type: 'bar',
                stack: '系统',
                barWidth: 40,
                itemStyle:{
                  normal:{color:'#3B9EF8'}
                },
                data: [resData.planSystemCurrentSecond, resData.planSystemNextSecond],
              },
              {
                name: '系统计算上半年',
                type: 'bar',
                stack: '系统',
                barWidth: 40,
                itemStyle:{
                  normal:{color:'#90C7FF'}
                },
                data: [resData.planSystemCurrentFirst, resData.planSystemNextFirst],
                label: {
                  show: true,
                  position: 'top',
                  color: 'black',
                  formatter: function (params){
                    const {
                      planSystemCurrentBacklog, planSystemCurrentSecond, planSystemCurrentFirst,
                      planSystemNextBacklog, planSystemNextSecond, planSystemNextFirst
                    } = resData;
                    if(params.name == _this.vereceive.year){ //  当年
                      return (Number(planSystemCurrentBacklog) + Number(planSystemCurrentSecond) + Number(planSystemCurrentFirst)).toFixed(2);
                    }else{
                      return (Number(planSystemNextBacklog) + Number(planSystemNextBacklog) + Number(planSystemNextFirst)).toFixed(2);
                    }
                  }
                }
              },
              
              {
                name: '⼿⼯调整Risk',
                type: 'bar',
                stack: '手工',
                data: [resData.planManualCurrentRisk, resData.planManualNextRisk],
                itemStyle:{
                  normal:{color:'#2F48D1'}
                },
              },
              {
                name: '⼿⼯调整',
                type: 'bar',
                stack: '手工',
                barWidth: 40,
                itemStyle:{
                  normal:{color:'#708BFA'}
                },
                data: [resData.planManualCurrent, resData.planManualNext],
                label: {
                  show: true,
                  position: 'top',
                  color: 'black',
                  formatter: function (params){
                    const { planManualCurrentRisk, planManualCurrent, planManualNextRisk, planManualNext } = resData;
                    if(params.name == _this.vereceive.year){ //  当年
                      return (Number(planManualCurrentRisk) + Number(planManualCurrent)).toFixed(2);
                    }else{
                      return (Number(planManualNextRisk) + Number(planManualNext)).toFixed(2);
                    }
                  }
                }
              },
              
            ]
          })
          myChart.off('click');
          myChart.on('click', function(params) {
            const arr1 = ['系统计算上半年', '系统计算下半年', '系统计算Backlog'];
            _this.isThen = params.name == _this.vereceive.year; //  是否为当年
            
            if(arr1.includes(params.seriesName)){ //  系统计算列表
              _this.systemTableLoading = true;
              _this.systemVisible = true;
              queryPlanYearSystem({
                versionId: _this.vereceive.id
              }).then(res => {
                const result = _this.$i18n.locale === 'zh' ? res.desZh : res.desEn;
                if(res.code === '0'){
                  _this.systemListData = res.data;
                }else{
                  iMessage.error(result);
                }

                _this.systemTableLoading = false;
              }).catch(err => {
                _this.systemTableLoading = false;
              })
            }else{
              _this.manualvisible = true;
              _this.queryPlanYearCommutity();  //  手工调整
            }
          });
        }else{
          iMessage.error(result);
        }

        this.chartLoading = false;
      }).catch(err => {
        this.chartLoading = false;
      })
    },

    setDomParameter(){
      setTimeout(() => {
        const RInput = document.getElementsByClassName("manual-lpriceInput");
        const RTxt = document.getElementsByClassName("manual-lpriceInputTxt");
        const LTxt1 = document.getElementsByClassName("manual-lprice1");
        const LTxt2 = document.getElementsByClassName("manual-lprice2");
        const top = document.body.clientWidth >= 1920 ? '28px' : '32px';
        Array.prototype.forEach.call(RInput, function (element, index) {
          element.style.marginTop = top;
          element.style.height = '28px';
          element.style.opacity = '1';
          RTxt[index].style.marginTop = top;
          RTxt[index].style.height = '28px';
          LTxt1[index].style.marginTop = top;
          LTxt1[index].style.height = '28px';
          LTxt2[index].style.marginTop = top;
          LTxt2[index].style.height = '28px';
        });
      }, 1000)
      
    },

    queryPlanYearCommutity(){
      queryPlanYearCommutity({
        versionId: this.vereceive.id
      }).then(res => {
        const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn;
        if(res.code === '0'){
          const arr = ['CSX', 'CSP', 'CSM', 'CSI', 'CSE', 'BU-B', 'Risk'];
          this.planYearCommutity = _.cloneDeep(res.data);
          const _this = this;
          const totalLeft = echarts().init(document.getElementById("totalLeft"));
          const totalRight = echarts().init(document.getElementById("totalRight"));
          const resData = _.cloneDeep(res.data);
          const resDataL = res.data.filter(item => item.commodity !== 'Risk');
          totalRight.resize({height: 66*resData.length});
          totalLeft.resize({height: 66*resDataL.length});
          totalRight.setOption(
            {
                title: {
                    text: 'Total',
                    textStyle:{
                      color:'#485465',        //颜色
                      fontWeight:'bold',    //粗细
                      fontSize:22,     //大小
                  },
                },
                tooltip: {
                    
                },
                legend: {
                    data: []
                },
                grid: {
                    left: '8%',
                    right: '20%',
                    bottom: '0%',
                    top: '8%',
                    containLabel: true
                },
                xAxis: {
                    show: false
                },
                yAxis: {
                    type: 'category',
                    data: resData.map(item => item.commodity).reverse()
                },
                series: [
                    {
                        name: '2011年',
                        type: 'bar',
                        data: resData.reverse().map(item => {
                          if(_this.isThen){ //  当年
                            return item.planAmountAmualCurrent;
                          }

                          return item.planAmountAmualNext;
                        }),
                        barWidth: 30,
                        itemStyle:{
                            normal:{
                              color:'#D5DFF1',
                              barBorderRadius: 5
                            },
                        },
                    },
                ]
            }
          )
          totalLeft.setOption(
              {
                title: {
                    text: 'Total',
                    textStyle:{
                      color:'#485465',        //颜色
                      fontWeight:'bold',    //粗细
                      fontSize:22,     //大小
                  },
                },
                tooltip: {
                    
                },
                legend: {
                    data: []
                },
                grid: {
                    left: '8%',
                    right: '18%',
                    bottom: '0',
                    top: '10%',
                    containLabel: true
                },
                xAxis: {
                    show: false
                },
                yAxis: {
                    type: 'category',
                    data: resDataL.map(item => item.commodity).reverse()
                },
                series: [
                    {
                        name: '2011年',
                        type: 'bar',
                        data: resDataL.reverse().map(item => {
                          if(_this.isThen){ //  当年
                            return item.planAmountSystemCurrent;
                          }

                          return item.planAmountSystemNext;
                        }),
                        barWidth: 30,
                        itemStyle:{
                            normal:{
                              color:'#ACBFE3',
                              barBorderRadius: 5
                            },
                        },
                    },
                ]
            }
          )
        }else{
          iMessage.error(result);
        }

        this.setDomParameter(); //  设置dom参数
        
      })
    },

    //  接受版本选择
    receiVereceive(vereceive){
      this.vereceive = vereceive;
      this.getHistogram();  //  获取柱状图数据
    },

    //  刷新
    refresh(){
      refreshVersion({
        versionId: this.vereceive.id
      }).then(res => {
        const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn;

        if(res.code === "0"){
          iMessage.success(result);
          this.getHistogram();  //  获取柱状图数据
        }else{
          iMessage.error(result);
        }
      })
    },

    //  保存
    save(){
      this.saveLoading = true;
      const params = {
        ...this.ratioInput,
        versionId: this.vereceive.id,
      }
      saveVersion(params).then(res => {
        const result = this.$i18n.locale === 'zh' ? res.desZh : res.desEn;
        if(res.code === "0"){
          iMessage.success(result);
          this.getHistogram();
          this.refreshStatus = !this.refreshStatus;
        }else{
          iMessage.error(result);
        }

        this.saveLoading = false;
      }).catch(err => {
        this.saveLoading = false;
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.page-container{
  width: 95.5%;
  height: 94%;
  position: absolute;
  top: 0;
  padding-top: 95px;

  .baApply-table{
    ::v-deep .el-input__inner{
      width: 120px !important;
    }

    ::v-deep .el-table__footer-wrapper .is-center{
      color: #000 !important;
      font-weight: bold !important;
    }

    ::v-deep .el-table__body .el-table__row:nth-last-child(1){
      font-weight: bold !important;
    }
  }

  .manualIDialog{
    display: flex;
    align-items: center;
    justify-content: center;

    ::v-deep .el-dialog .el-dialog__header{
      height: 80px;
    }

    ::v-deep .el-dialog .el-dialog__body{
      width: 100%;
      position: absolute;
      top: 80px;
      left: 0;
      bottom: 0;
    }

    .manual-content{
      display: flex;
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      bottom: 0;

      .content-l{
        padding-bottom: 90px !important;
      }

      .manual-l-txt{
        text-align: right;
        white-space:nowrap;
        margin-right: 47px;

        &:nth-child(1){
          margin-right: 0;
        }

        // & .manual-lpriceInput:nth-child(2){
        //   margin-top: 40px !important;
        // }

        & .manual-lpriceInputTxt:nth-child(2){
          margin-top: 40px !important;
        }

        .manual-lpriceInputTxt{
          font-size: 16px;
          margin-top: 40px;
          height: 35px;
          line-height: 30px;

          // @media only screen and (min-width: 1920px) {
          //   margin-top: 48px !important;
          //   // background-color: chartreuse;
          // }
        }

        .manual-lpriceInput{
          font-size: 16px;
          opacity: 0;
          // margin-top: 40px;

          // @media only screen and (min-width: 1920px) {
          //   margin-top: 48px !important;
          //   // background-color: chartreuse;
          // }

          .right-input{
            width: 100px;
          }
        }

        .manual-lprice1{
          margin-top: 60%;
        }

        .manual-lprice{
          color: #485465;
          font-size: 16px;
          margin-top: 56px;

          // @media only screen and (min-width: 1920px) {
          //   margin-top: 64px !important;
          //   // background-color: chartreuse;
          // }
        }
        
        .manual-l-title{
          font-size: 22px;
          color: #485465;
          font-weight: bold;
        }
      }

      // #totalRight{
      //   width: 100%;
      //   height: 100%;
      // }

      #totalLeft, #totalRight{
        flex: 1;
        padding-left: 32px;
        width: 0;
        
        ::v-deep div :nth-child(1){
          height: 100% !important;
          width: 100% !important;

          ::v-deep canvas{
            height: 100% !important;
            width: 100% !important;
          }
        }
      }

      & > div{
        display: flex;
        width: 100%;
        height: 100%;
        padding-top: 30px;
      }
    }

    .manual-txt{
      display: flex;
      justify-content: flex-end;
    }

    .manual-head{
      display: flex;
      justify-content: space-between;
      padding-right: 25px;

      .title{
        font-size: 18px;
        font-weight: bold;
      }
    }

    ::v-deep .el-dialog__header{
      padding-top: 23px;
    }
    
    ::v-deep .el-dialog{
      height: 80% !important;
      overflow: auto;
      margin: 0 !important;
    }
  }

  .btns-txt{
    font-size: 12px;
    color: #485465;

    span{
      margin-right: 20px;
      position: relative;

      &::after{
        content: '';
        width: 1px;
        height: 18px;
        background-color: #0D2451;
        position: absolute;
        left: -9px;
        top: 1px;
      }

      &:nth-child(1){
        &::after{
          content: '';
          display: none;
        }
      }
    }
  }

  .content{
    display: flex;
    width: 100%;
    height: 100%;
    padding-top: 25px;

    .c-right{
      width: 78%;
      height: 100%;

      ::v-deep .card > div{
        height: 100%;
      }

      #echarts{
        width: 100%;
        height: 100%;
      }

      .right-head{
        display: flex;
        justify-content: space-between;

        .right-sildBox{
          font-size: 12px;
          font-weight: bold;

          div {
            display: inline-block;
            margin-right: 20px;

            &::before {
              content: "";
              display: inline-block;
              margin-right: 10px;
              width: 10px;
              height: 10px;
              border-radius: 50%;
              background-color: #90C7FF;
            }

            &:nth-of-type(2) {
              &::before {
                background-color: #3B9EF8;
              }
            }

            &:nth-of-type(3) {
              &::before {
                background-color: #056FCC;
              }
            }

            &:nth-of-type(4) {
              &::before {
                background-color: #708BFA;
              }
            }

            &:nth-of-type(5) {
              &::before {
                background-color: #2F48D1;
              }
            }
          }
        }

        .right-title{
          font-size: 18px;
          font-weight: bold;
        }
      }

      .c-card-r{
        width: 100%;
        height: 97%;
      }
    }

    .c-left{
      width: 20%;
      height: 100%;
      margin-right: 2%;

      ::v-deep .card > div{
        height: 100%;
      }

      ::v-deep .card .cardBody{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
      }

      .c-card-l{
        width: 100%;
        height: 47%;
        margin-bottom: 6%;

        ::v-deep .el-input{
          width: 200px !important;
          height: 80px !important;
          font-size: 70px;
          font-weight: bold;
          position: relative;

          &::after{
            content: '%';
            font-size: 30px;
            color: #000;
            font-weight: bold;
            position: absolute;
            bottom: 0;
            right: -30px;
          }

          .el-input__inner{
            width: 100%;
            height: 100%;
            color: #1763F7;
          }
        }

        .card-icon{
          width: 80px;
          height: 80px;
        }

        .title{
          font-size: 18px;
          text-align: center;
          font-weight: bold;
        }

        &:nth-last-child(1){
          margin-bottom: 0;
        }
      }

      
    }
  }
}
</style>