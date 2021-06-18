<template>
  <div class="container">
    <HeadTool @refresh="refresh">
      <template slot="btns">
        <iButton @click="save">{{ $t('LK_BAOCUN') }}</iButton><!-- 保存 -->
        <iButton @click="saveNewVersion">{{ $t('LK_BAOCUNWEIZUIXINBANBEN') }}</iButton><!-- 保存为最新版本 -->
      </template>
    </HeadTool>

    <div class="content">
      <div class="c-left">
        <!-- 上半年SOP付款⽐ -->
        <iCard class="c-card-l">
          <div class="title">{{ $t('LK_SHANGBANNIANSOPFUKUANDUIBI') }}</div>
          <icon symbol name="iconSOPfukuanbi" class="card-icon"></icon>
          <iInput v-model="no1"></iInput>
        </iCard>

        <!-- 下半年SOP付款⽐ -->
        <iCard class="c-card-l">
          <div class="title">{{ $t('LK_XIABANNIANSOPFUKUANDUIBI') }}</div>
          <icon symbol name="iconSOPfukuanbi" class="card-icon"></icon>
          <iInput v-model="no1"></iInput>
        </iCard>
      </div>
      <div class="c-right">
        <iCard class="c-card-r">
          <div class="right-head">
            <div class="right-title">年度计划</div>
            <div class="right-sildBox">
              <div>系统计算上半年</div>
              <div>系统计算下半年</div>
              <div>系统计算Backlog</div>
              <div>⼿⼯调整</div>
              <div>⼿⼯调整Risk</div>
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
          <span>{{$t('LK_HUOBI')}}：{{$t('LK_RENMINBI')}}</span>
          <span>{{$t('LK_DANWEI')}}：{{$t('LK_BAIWANYUAN')}}</span>
          <span>{{$t('LK_BUHANSUI')}}</span>
        </div><!-- 货币：人民币  |  单位：百万元  |  不含税  -->
        <iButton @click="save">{{ $t('LK_XIAZAIQINGDAN') }}</iButton><!-- 下载清单 -->
      </template>

      <template slot="content">
        <iTableList
            :tableData="systemListData"
            :tableTitle="budgetApprovalData"
            :activeItems="'partNum'"
            :selection="false"
        >

        </iTableList>
      </template>
      
    </Popup>

    <!-- 手工调整 -->
    <iDialog :visible="manualvisible" @close='() => this.manualvisible = false' width="80%" z-index="1000" class="manualIDialog">
      <template slot="title">
        <div class="manual-head">
          <div class="title">
            {{$t('LK_SHOUGONGTIAOZHENG')}}-{{'2021'}}
          </div>
          <div>
            <iButton @click="save">{{ $t('LK_BAOCUN') }}</iButton><!-- 保存 -->
            <iButton @click="save">{{ $t('LK_XIAZAIQINGDAN') }}</iButton><!-- 下载清单 -->
          </div>
        </div>
      </template>
      <div class="btns-txt manual-txt"><!-- 货币：人民币  |  单位：百万元  |  不含税  -->
        <span>{{$t('LK_HUOBI')}}：{{$t('LK_RENMINBI')}}</span>
        <span>{{$t('LK_DANWEI')}}：{{$t('LK_BAIWANYUAN')}}</span>
        <span>{{$t('LK_BUHANSUI')}}</span>
      </div>
      <div class="manual-content">
        <div>
          <div id="total"></div>
          <div class="manual-l-txt"></div>
          <div class="manual-l-txt"></div>
        </div>
        <div></div>
      </div>
    </iDialog>
  </div>
</template>

<script>
import {
  icon,
  iTableList
} from "@/components";
import {iDialog, iMessage, iInput, iButton, iCard} from "rise";
import HeadTool from "../components/headTool";
import echarts from "@/utils/echarts";
import Popup from "./components/popup";
import { budgetApprovalData } from "./components/data";


export default {
  components: {
    HeadTool, iButton, iCard, iInput, icon, Popup, iTableList,
    iDialog,
  },

  data(){
    return {
      no1: '',
      systemVisible: false,
      manualvisible: false,
      systemListData: [],
      budgetApprovalData,
    }
  },

  mounted(){
    const _this = this;
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
        data: ['2021', '2022']
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
          data: [50, 50],
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
          data: [10, 10],
        },
        {
          name: '系统计算上半年',
          type: 'bar',
          stack: '系统',
          barWidth: 40,
          itemStyle:{
            normal:{color:'#90C7FF'}
          },
          data: [30, 30],
          label: {
            show: true,
            position: 'top',
            color: 'black',
            formatter: function (params){
              if(params.name === '2021'){
                return 100
              }else{
                return params.value
              }
            }
          }
        },
        
        {
          name: '⼿⼯调整Risk',
          type: 'bar',
          stack: '手工',
          data: [50, 10],
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
          data: [120, 132],
          label: {
            show: true,
            position: 'top',
            color: 'black',
            formatter: function (params){
              return params.value
            }
          }
        },
        
      ]
    })

    myChart.on('click', function(params) {
      const arr1 = ['系统计算上半年', '系统计算下半年', '系统计算Backlog'];
      const arr2 = ['⼿⼯调整', '⼿⼯调整Risk'];
      if(arr1.includes(params.seriesName)){
        
        _this.systemVisible = true;
      }else{
        _this.manualvisible = true;
        setTimeout(() => {
          const total = echarts().init(document.getElementById("total"));
          total.setOption(
              {
                title: {
                    text: 'Total',
                },
                tooltip: {
                    
                },
                legend: {
                    data: []
                },
                grid: {
                    left: '8%',
                    right: '8%',
                    bottom: '3%',
                    top: '10%',
                    containLabel: true
                },
                xAxis: {
                    show: false
                },
                yAxis: {
                    type: 'category',
                    data: ['BUB', 'CSX', 'CSP', 'CSM', 'CSI', 'CSE']
                },
                series: [
                    {
                        name: '2011年',
                        type: 'bar',
                        data: [18203, 23489, 29034, 104970, 131744, 630230],
                        barWidth: 40,
                        itemStyle:{
                            normal:{color:'#ACBFE3'}
                        },
                    },
                ]
            }
          )
        }, 3000)
        
        
      }
      // console.log(params, arr1.includes(params.seriesName));
      // var name = parseInt(params.name);
    });
  },

  methods: {

    //  刷新
    refresh(){

    },

    //  保存
    save(){

    },

    //  保存为最新版本
    saveNewVersion(){

    }
  }
}
</script>

<style lang="scss" scoped>
.container{
  padding-top: 20px;
  height: 92%;

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

      .manual-l-txt{
        flex: 1;
        // height: 100%;
      }

      #total{
        flex: 3;
        padding-left: 32px;
        // height: 100%;
      }

      & > div{
        display: flex;
        flex: 1;
        height: 100%;
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