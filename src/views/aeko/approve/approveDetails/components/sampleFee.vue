<!--
 * @Author: YoHo
 * @Date: 2021-10-09 16:02:48
 * @LastEditTime: 2021-11-06 12:50:24
 * @LastEditors: YoHo
 * @Description: 
-->
<template>
  <!-- 样件费 -->
  <iCard class="sampleFee">
    <template #header>
        <div class="header">
          <div>
            <span class="title">{{ language('LK_DAMAGES_SAMPLEFEE_YANGJIANFEI','样件费') }}</span>
          </div>
        </div>
    </template>
    <div v-loading="loading">
       <tableList 
       class="table" 
       :selection="false" 
       :tableData="tableListData" 
       :tableTitle="sampleTableTitle">

       </tableList>
    </div>
  </iCard>
</template>

<script>
import {
  iCard,
  iMessage,
} from 'rise';
import tableList from 'rise/web/quotationdetail/components/tableList';
import { sampleTableTitle } from 'rise/web/quotationdetail/components/sample/data.js'
import { getToolingsample } from "@/api/aeko/approve";
import { getToolingSample as getToolingSampleByLinie } from "@/api/rfqManageMent/quotationdetail"
export default {
  name:'sampleFee',
  components:{
    iCard,
    tableList,
  },
  props:{
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
      loading:false,
      tableListData:[],
      sampleTableTitle:{},
    }
  },
  created(){
    this.sampleTableTitle = sampleTableTitle(false).filter((item)=>item.isAeko);
  },
  methods:{
    init(){
      this.workFlowId?this.getToolingsample():this.getToolingSampleByLinie()
    },
    async getToolingsample(){
      const {workFlowId,quotationId} = this;
      this.loading = true;
      await getToolingsample({
        workFlowId,
        quotationId,
      }).then((res)=>{
        this.loading = false;
        if(res.code == 200){
          this.tableListData = res.data || [];
        }else{
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
      }).catch(()=>this.loading = false)
    },
    getToolingSampleByLinie(){
      const {quotationId} = this;
      this.loading = true

      getToolingSampleByLinie(quotationId)
      .then(res => {
        if (res.code == 200) {
          this.tableListData = Array.isArray(res.data.toolingSampleDTOList) ? res.data.toolingSampleDTOList : []
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
        }
        this.loading = false
      })
      .catch(() => this.loading = false)
    }
  }
}
</script>

<style lang="scss" scoped>
  .sampleFee{
    width: 100%;
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
    .tableInput{
      width: 70%;
    }
  }
</style>