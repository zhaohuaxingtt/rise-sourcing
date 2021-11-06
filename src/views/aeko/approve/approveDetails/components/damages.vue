<!--
 * @Author: wentliao
 * @Date: 2021-08-27 09:39:40
 * @Description: 
-->

<template>
  <!-- 终止费 -->
  <iCard class="damages">
      <template #header>
        <div class="header">
          <div>
            <span class="title">{{ language('LK_DAMAGES_ZHONGZHIFEI','终⽌费') }}</span>
          </div>
        </div>
      </template>
      <div class="contain">
        <span class="contain-label">{{ language('LK_DAMAGES_ZHONGZHIFEI','终⽌费') }}:</span>
        <iInput class="contain-input" disabled v-model.trim="value"></iInput>
      </div>
  </iCard>
</template>

<script>
import {
  iCard,
  iInput,
  iMessage,
} from 'rise'
import { getTerminationPrice } from "@/api/aeko/approve";
export default {
  components:{
    iCard,
    iInput,
  },
  props:{
    basicInfo:{
      type:Object,
      default:()=>{},
    },
    disabled: {
      type: Boolean,
      default: false
    },
    workFlowId:{
      type:String,
      default:''
    },
    quotationId:{
      type:String,
      default:'',
    }
  },
  data(){
    return{
      value:'',
      btnLoading:false,
    }
  },
  methods:{
    init(){
      this.workFlowId?this.getTerminationPrice():this.getTerminationPriceByLinie();
    },
    // 获取终止费
    async getTerminationPrice(){
      const {workFlowId,quotationId} = this;
      await getTerminationPrice({
        workFlowId,
        quotationId,
      }).then((res)=>{
        if(res.code == 200){
          this.value = res.data || '';
        }else{
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
      })
    },
    getTerminationPriceByLinie(){
      const {basicInfo={}} = this; 
      const {quotationPriceSummaryInfo={}} = basicInfo;
      const terminationPrice = quotationPriceSummaryInfo.terminationPrice;
      this.value = terminationPrice;
    }
  }
}
</script>

<style lang="scss" scoped>
  .damages{
    .header {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .title {
        height: 25px;
        line-height: 25px;
        font-size: 18px;
        font-weight: bold;
        color: #131523;
      }
    }
    .contain{
      display: flex;
      align-items: center;
      .contain-label{
        flex-shrink: 0;
        margin-right: 30px;
      }
      .contain-input{
        width: 300px;
      }
    }

  }
</style>