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
      <iSelect v-model="priceType" style="width:200px">
        <el-option
          :value="item.value"
          :label="item.label"
          v-for="(item, $index) in priceTypeOptions"
          :key="$index"
        ></el-option>
      </iSelect>
    </p>
    <div class="contain">
      <div class="contain-priceAxis">
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
        }
    },
    methods:{
        clearDialog() {
            this.$emit('changeVisible','priceAxisVisible',false);
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
      .contain-info{
        color: #606067;
        width: 30%;
        height: 500px;
        background: rgba(#9FA4AE, .21);
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
          margin: 50px 0;
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