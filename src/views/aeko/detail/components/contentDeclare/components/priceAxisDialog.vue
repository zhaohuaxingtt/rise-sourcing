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
        <p class="title">{{language('AEKO_PRICE_GAIXINLINGJIANDEJIAGEBIANHUAQUSHI','该新零件的价格变化趋势，仅供参考。')}}</p>
        <p class="tips">{{language('AEKO_PRICE_AEKOSHISHISHIYUANLINGJIANJIAGEFASHENGBIANHUA','Aeko实施时，原零件价格发生变化，或者原零件的生效时间，都会引起该新零件的价格变化。')}}</p>
        <ul class="price-list">
          <li><span>{{language('AEKO_PRICE_BIAOTAISHIDEYUANLINGJIANJIAGE','表态时的原零件价格')}}：</span><span>{{priceType =='bnkPrice' ? '-' : priceAxisInfo.contentOldPrice+'RMB'}},</span></li>
          <li><span>{{language('AEKO_PRICE_BIANDONGCHENGBEN','成本变动')}}：</span><span>{{priceType =='bnkPrice' ? '-' : priceAxisInfo.changPrice+'RMB'}} ,</span></li>
          <li><span>{{language('AEKO_PRICE_XINLINGJIANJIAGE','新零件价格')}}：</span><span>{{priceType =='bnkPrice' ? '-' : priceAxisInfo.currentPrice+'RMB'}} ,</span></li>
        </ul>
        <div class="footer-price">
          <p>{{language('AEKO_PRICE_DANGQIANYUGUDEXINLINGJIANSHENGXIAOJIAGE','当前预估的新零件⽣效价格')}}： {{priceType =='bnkPrice' ? '-' : priceAxisInfo.effectPrice+'RMB'}} </p>
          <p>{{language('AEKO_PRICE_ZUIZHONGDEXINLINGJIANSHENGXIAOJIAGE','最终的新零件⽣效价格')}}： {{priceType =='bnkPrice' ? '-' : priceAxisInfo.newPartPrice+'RMB'}} </p>
        </div>
      </div>
    </div>
  </iDialog>
</template>

<script>
import {
    iDialog,
    iSelect,
    iMessage,
} from 'rise';
import echarts from "@/utils/echarts";
import { getPriceAxis } from "@/api/aeko/detail";

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
      priceAxisRow:{
        type:Object,
        default:()=>{},
      } 
    },
    data(){
        return{
          priceTypeOptions:[
            {label:'A价',value:'aPrice'},
            {label:'B价',value:'bPrice'},
            {label:'BNK价',value:'bnkPrice'},
          ],
          priceType:'aPrice',
          loading:false,
          priceAxisInfo:{},
          priceAxisList:{
            aPrice:{},
            bPrice:{},
            bnkPrice:{},
          },
        }
    },
    mounted(){
      // setTimeout(() => {
      //   this.init();
      // }, 500);
      this.init();
    },
    methods:{
        clearDialog() {
            this.$emit('changeVisible','priceAxisVisible',false);
        },
        async init(){
          this.loading = true;
          const {priceAxisRow={}} = this;
          const {objectAekoPartId=''} = priceAxisRow;
          await getPriceAxis(objectAekoPartId).then((res)=>{
            this.loading = false;
            const {code,data={}} = res;
            if(res.code == 200){
              this.priceAxisInfo = data;
              // 将A,B,BNK价格拆分
              let axisData = {};
              axisData.aPrice = this.resetData(data.anewPrice,data.aoldPrice);
              axisData.bPrice = this.resetData(data.bnewPrice,data.boldPrice);
              axisData.bnkPrice = this.resetData(data.bnkNewPrice,data.bnkOldPrice);
              this.priceAxisList = axisData;
              this.initEcharts(axisData.aPrice);
            }else{
              iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
            }
          }).catch(()=>this.loading = false)
        },
        // 初始化echart
        initEcharts(priceList={}){
          
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
              // data: ['2018-03-15', '2019-04-15', '2019-05-15', '2019-06-15', '2019-07-15', '2019-08-15', '2019-09-15']
              data:priceList.date || []
            },
            yAxis: {
              type: 'value'
            },
            series: [
              {
                name: '新零件价格',
                type: 'line',
                step: 'middle',
                // data: [120, 132, 101, 134, 90, 230, 210],
                data: priceList.newPirce||[],
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
                // data: [220, 282, 201, 234, 290, 430, 410],
                data: priceList.oldPrice||[],
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
          const {priceAxisList} = this;
          var option = vm.getOption();
          option.xAxis.data = priceAxisList[value].date;
          option.series[0].data = priceAxisList[value].newPirce;
          option.series[1].data = priceAxisList[value].oldPrice;
          vm.setOption(option);  
          this.loading = false;
        },

        // 切换类型
        handleChange(value){
          this.loading = true;
          this.refreshData(value);
        },

        // 数据转换
        resetData(newData=[],oldData=[]){
          console.log(newData,oldData)
          let data = {
            date:[],
            newPirce:[],
            oldPrice:[],
          };
          data.date = newData.map((item)=>item.startTime).concat(oldData.map((item)=>item.startTime));
          // 去重
          data.date = Array.from(new Set(data.date));
          // 排序
          data.date = data.date.sort((a,b)=>{
            return a > b ? 1:-1
          })

          data.date.map((item)=>{
            let filterNew = newData.filter((itemData)=>itemData.startTime == item);
            let filterOld = oldData.filter((itemData)=>itemData.startTime == item);
            if(filterNew.length){
              data.newPirce.push(filterNew[0].price);
            }
            if(filterOld.length){
              data.oldPrice.push(filterNew[0].price);
            }
          })

          return data;
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