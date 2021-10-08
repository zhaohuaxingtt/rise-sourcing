<!--
 * @Author: wentliao
 * @Date: 2021-09-26 15:42:46
 * @Description: 价格轴弹窗
-->
<template>
<iDialog
    :title="language('LK_AEKO_PRICEAXIS','价格轴')"
    :visible.sync="dialogVisible"
    @close="clearDialog"
    width="90%"
    class="priceAxisDialog"
  >
    <p class="flex-align-center">
      <span>{{language('LK_AEKO_PRICEAXIS_PRICETYPE','价格类型')}}：</span>
      <iSelect v-model="priceType" style="width:200px" @change="handleChange">
        <el-option
          :value="item.value"
          :label="item.label"
          v-for="(item, $index) in priceTypeOptions"
          :key="$index"
        ></el-option>
      </iSelect>
    </p>
    <div class="contain" v-loading="loading">
      <div class="contain-priceAxis" id="priceAxisEcharts">
      </div>
      <div class="contain-info">
        <p class="title">该新零件的价格变化趋势，仅供参考。</p>
        <p class="tips">Aeko实施时，原零件价格发生变化，或者原零件的生效时间，都会引起该新零件的价格变化。</p>
        <ul class="price-list">
          <li><span>表态时的原零件价格：</span><span>XX RMB,</span></li>
          <li><span>成本变动：</span><span>XX RMB,</span></li>
          <li><span>新零件价格：</span><span>XX RMB,</span></li>
        </ul>
        <div class="footer-price">
          <p>当前预估的新零件⽣效价格： XX RMB</p>
          <p>最终的新零件⽣效价格： XX RMB</p>
        </div>
      </div>
    </div>
  </iDialog>
</template>

<script>
import {
    iDialog,
    iSelect,
} from 'rise';
import echarts from "@/utils/echarts";

let vm = null;
export default {
    name:'priceAxisDialog',
    components:{
        iDialog,
        iSelect,
    },
    props:{
      dialogVisible:{
        type:Boolean,
        default:false,
      },  
    },
    data(){
        return{
          priceTypeOptions:[
            {label:'A价',value:'1'},
            {label:'B价',value:'2'},
            {label:'BNK价',value:'3'},
          ],
          priceType:'1',
          loading:false,
        }
    },
    mounted(){
      setTimeout(() => {
        this.init();
      }, 500);
      
    },
    methods:{
        clearDialog() {
            this.$emit('changeVisible','priceAxisVisible',false);
        },
        init(){
          this.initEcharts();
        },
        // 初始化echart
        initEcharts(){
          vm = echarts().init(document.getElementById("priceAxisEcharts"));

          let option = {
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              data: ['新零件价格', '原零件价格'],
              right:'0',
            },
            grid: {
              left: '10',
              right: '10',
              bottom: '10',
              top: '10%',
              containLabel: true
            },
            xAxis: {
              type: 'category',
              data: ['2018-03-15', '2019-04-15', '2019-05-15', '2019-06-15', '2019-07-15', '2019-08-15', '2019-09-15']
            },
            yAxis: {
              type: 'value'
            },
            series: [
              {
                name: '新零件价格',
                type: 'line',
                step: 'middle',
                data: [120, 132, 101, 134, 90, 230, 210],
                itemStyle : {  
                    normal : {  
                        color:'#1763F7',  
                        lineStyle:{  
                            color:'#1763F7'  
                        }  
                    }  
                },
              },
              {
                name: '原零件价格',
                type: 'line',
                step: 'start',
                data: [220, 282, 201, 234, 290, 430, 410],
                itemStyle : {  
                    normal : {  
                        color:'#9FA4AE',  
                        lineStyle:{  
                            color:'#9FA4AE'  
                        }  
                    }  
                },
              },
            ]
          };
          this.$nextTick(() => {
            vm.clear(); 
            vm.setOption(option);
          })
          
        },

        // 更新价格轴
        refreshData(value){
          var option = vm.getOption();
          option.series[0].data = [110, 110, 110, 110, 110, 110, 110];
          vm.setOption(option);  
          this.loading = false;
        },

        // 切换类型
        handleChange(value){
          this.loading = true;
          this.refreshData();
        },
    },
}
</script>

<style lang="scss" scoped>
  .priceAxisDialog{
    .contain{
      display: flex;
      justify-content: space-between;
      padding-bottom: 30px;
      .contain-priceAxis{
        width: 68%;
        height: 600px;
      }
      .contain-info{
        color: #606067;
        width: 30%;
        height: 600px;
        background: #F8F8FA;
        border:1px solid rgba(#1B1D21, .08);
        padding: 60px 10px 60px 35px;
        .title{
          font-size: 18px;
          font-weight: bold;
        }
        .tips{
          font-size: 18px;
          margin-top: 30px;
        }
        .price-list{
          font-size: 17px;
          width: 85%;
          margin: 70px 0;
          li{
            display: flex;
            align-items: center;
            justify-content: space-between;
            line-height: 40px;
            span{
              flex-grow: 1;
              width: 50%;
              text-align: right;
            }
          }
        }
        .footer-price{
          color: #1763F7;
          font-size: 17px;
          p{
            margin-bottom: 10px;
          }
        }
      }
    }
  }
</style>