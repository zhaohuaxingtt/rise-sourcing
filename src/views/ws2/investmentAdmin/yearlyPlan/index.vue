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
        <iCard class="c-card-r" id="echarts"></iCard>
      </div>
    </div>
  </div>
</template>

<script>
import {
  icon,
  iTableList
} from "@/components";
import {iPage, iMessage, iInput, iButton, iCard} from "rise";
import HeadTool from "../components/headTool";
import echarts from "@/utils/echarts";

// var chartDom = document.getElementById('echarts');
// var myChart = echarts.init(chartDom);


export default {
  components: {
    HeadTool, iButton, iCard, iInput, icon
  },

  data(){
    return {
      no1: ''
    }
  },

  mounted(){
    const myChart = echarts().init(document.getElementById("echarts"));
    myChart.setOption({
      tooltip: {
			trigger: 'axis',
			axisPointer: { 
				type: 'shadow'
			},
      // formatter: function (params) {//这里就是控制显示的样式
      //   console.log('paramsparamsparamsparams', params);
      // },
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
		series: [{
				name: '系统计算上半年',
				type: 'bar',
				stack: '系统',
				barWidth: 40,
				itemStyle:{
          normal:{color:'#90C7FF'}
        },
				data: [30, 30]
			},
			{
				name: '系统计算下半年',
				type: 'bar',
				stack: '系统',
				barWidth: 40,
				itemStyle:{
          normal:{color:'#3B9EF8'}
        },
				data: [10, 10]
			},
			{
				name: '系统计算Backlog',
				type: 'bar',
				stack: '系统',
				data: [50, 50],
				itemStyle:{
          normal:{color:'#056FCC'}
        },
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
				name: '⼿⼯调整',
				type: 'bar',
				stack: '手工',
				barWidth: 40,
				itemStyle:{
          normal:{color:'#708BFA'}
        },
				data: [120, 132]
			},
			{
				name: '⼿⼯调整Risk',
				type: 'bar',
				stack: '手工',
				data: [50, 10],
				itemStyle:{
          normal:{color:'#2F48D1'}
        },
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
    // myChart.setOption({
    //     tooltip: {
    //         trigger: 'axis',
    //         axisPointer: {            // 坐标轴指示器，坐标轴触发有效
    //             type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
    //         }
    //     },
    //     grid: {
    //         left: '3%',
    //         right: '4%',
    //         bottom: '3%',
    //         containLabel: true
    //     },
    //     xAxis: [
    //         {
    //             type: 'category',
    //             data: ['2021', '2022']
    //         }
    //     ],
    //     yAxis: [
    //         {
    //             type: 'value',
    //             show: false
    //         }
    //     ],
    //     series: [
    //         {
    //             name: '系统计算上半年',
    //             type: 'bar',
    //             stack: '系统',
    //             barWidth: 30,
    //             barGap: 1,
    //             itemStyle:{
    //               normal:{color:'#90C7FF'}
    //             },
    //             emphasis: {
    //                 focus: 'series'
    //             },
    //             data: [320, 332]
    //         },
    //         {
    //             name: '系统计算下半年',
    //             type: 'bar',
    //             stack: '系统',
    //             barWidth: 30,
    //             itemStyle:{
    //               normal:{color:'#3B9EF8'}
    //             },
    //             emphasis: {
    //                 focus: 'series'
    //             },
    //             data: [120, 132]
    //         },
    //         {
    //             name: '系统计算Backlog',
    //             type: 'bar',
    //             stack: '系统',
    //             barWidth: 30,
    //             itemStyle:{
    //               normal:{color:'#056FCC'}
    //             },
    //             emphasis: {
    //                 focus: 'series'
    //             },
    //             data: [220, 182]
    //         },
    //         {
    //             name: '⼿⼯调整',
    //             type: 'bar',
    //             stack: '手工',
    //             barWidth: 30,
    //             itemStyle:{
    //               normal:{color:'#708BFA'}
    //             },
    //             emphasis: {
    //                 focus: 'series'
    //             },
    //             data: [150, 232]
    //         },
    //         {
    //             name: '⼿⼯调整Risk',
    //             type: 'bar',
    //             stack: '手工',
    //             barWidth: 30,
    //             itemStyle:{
    //               normal:{color:'#2F48D1'}
    //             },
    //             data: [862, 101],
    //             emphasis: {
    //                 focus: 'series'
    //             },
    //         },
    //     ]
    // });

    myChart.on('click', function(params) {
        console.log(params); 
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

  .content{
    display: flex;
    width: 100%;
    height: 100%;
    padding-top: 25px;

    .c-right{
      width: 78%;
      height: 100%;

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