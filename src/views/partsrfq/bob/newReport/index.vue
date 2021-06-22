<template>
  <iPage class="new-bob">
    <div class="navBox flex-between-center">
			<span class="title">BOB{{$t("TPZS.FENXI")}}<span v-if="inside">-RFQ {{rfq}}</span></span>
			<div class="flex-align-center">
        <!--预览-->
				<iButton class="margin-left30" >{{ $t('LK_YULAN') }}</iButton>
				<!--保存-->
				<iButton class="margin-left30" >{{ $t('LK_BAOCUN') }}</iButton>
				<!--BoB分析库-->
				<iButton >BoB{{ $t('分析库') }}</iButton>
        <!--查找零件-->
				<iButton class="margin-left30">{{ $t('查找零件') }}</iButton>
			</div>
		</div>
    <el-row :gutter="20"  class="margin-top20">
      <el-col :span="4">
        <iCard :collapse="false" style="height:500px" >
            <el-form  label-position="top" :model="form" style="height:460px">
              <el-row class="margin-bottom20">
                <!--比较类型-->
                <el-form-item :label="$t('比较类型')">
                  <iSelect v-model="chartType">
                      <el-option value="supplier" label="按供应商比较"></el-option>
                      <el-option value="round" label="按轮次比较"></el-option>
                      <el-option value="num" label="按零件号比较"></el-option>
                  </iSelect>
                </el-form-item>
                <!--供应商-->
                <el-form-item :label="$t('TPZS.GONGYINGSHANG')">
                  <iSelect multiple v-model="form.supplier">
                  </iSelect>
                </el-form-item>
                <!--轮次-->
                <el-form-item :label="$t('轮次')">
                  <iSelect multiple  v-model="form.round"></iSelect>
                </el-form-item>
                <!--零件号-->
                <el-form-item :label="$t('LK_SPAREPARTSNUMBER')">
                  <iSelect multiple  v-model="form.num"></iSelect>
                </el-form-item>
                
              </el-row>
            </el-form>
            <div class="end">
              <iButton  type="primary" @click="getChartData">确定</iButton>
              <iButton type="primary"  @click="handleSearchReset">重制</iButton>
            </div>
        </iCard>
      </el-col>
      <el-col :span="20">
        <iCard style="height:500px" collapse>
          <crown-bar :chartData="chartData" :title="chartTitle" @select="showSelect"/>
          <div class="toolTip-div" ref="toolTipDiv" v-show="showSelectDiv">
            <iSelect v-model="bobType" ref="toolTipSelect" @blur="closeDiv">
                <el-option value="bob" label="Best of Best"></el-option>
                <el-option value="boa" label="Best of Average"></el-option>
                <el-option value="bos" label="Best of Second"></el-option>
            </iSelect>
          </div>
        </iCard>
      </el-col>
    </el-row>
  </iPage>
</template>

<script>
import{iPage,iButton,iCard,iSelect}from 'rise'
import CrownBar from './components/crownBar.vue'
export default {
  components:{
    iPage,iButton,iCard,iSelect,
    CrownBar
  },
  data(){
    return {
      rfq:'2222',
      inside:false,
      chartData:[],
      chartType:'supplier',
      bobType:'bob',
      form:{
        supplier:'',
        round:'',
        num:''
      },
      showSelectDiv:false
    }
  },
  mounted(){
    this.inside=true
    this.initChartData()
  },
  methods:{
    closeDiv(){
      this.showSelectDiv=false
    },
    showSelect(e){
      const position=e.event.target.position
      this.showSelectDiv=true
      this.$refs.toolTipDiv.style.left=position[0]+210+'px'
      this.$refs.toolTipDiv.style.top=position[1]+15+'px'
      this.$refs.toolTipSelect.focus()
    },
    initChartData(){
      this.chartData=[
        {
          name:'原材料/散件',
            list:[
                   {
              key:'上海AA汽车',
              value:30
            },
            {
              key:'长春BB汽车',
              value:20
            },
            {
              key:'上海CC汽车',
              value:31
            },
            {
              key:'长春DD汽车',
              value:22
            },
            {
              key:'上海FF汽车',
              value:33
            },
            {
              key:'长春EE汽车',
              value:24
            }
          ]
        },
        {
          name:'制造费',
          list:[
            {
              key:'上海AA汽车',
              value:30
            },
            {
              key:'长春BB汽车',
              value:20
            },
            {
              key:'上海CC汽车',
              value:31
            },
            {
              key:'长春DD汽车',
              value:22
            },
            {
              key:'上海FF汽车',
              value:33
            },
            {
              key:'长春EE汽车',
              value:24
            }
          ]
        },
        {
          name:'报废成本',
          list:[
            {
              key:'上海AA汽车',
              value:22
            },
            {
              key:'长春BB汽车',
              value:33
            },
            {
              key:'上海CC汽车',
              value:31
            },
            {
              key:'长春DD汽车',
              value:22
            },
            {
              key:'上海FF汽车',
              value:33
            },
            {
              key:'长春EE汽车',
              value:24
            }
          ]
        },
        {
          name:'管理费',
          list:[
            {
              key:'上海AA汽车',
              value:12
            },
            {
              key:'长春BB汽车',
              value:23
            },
            {
              key:'上海CC汽车',
              value:31
            },
            {
              key:'长春DD汽车',
              value:22
            },
            {
              key:'上海FF汽车',
              value:33
            },
            {
              key:'长春EE汽车',
              value:24
            }
          ]
        },
        {
          name:'其他费用',
          list:[
            {
              key:'上海AA汽车',
              value:22
            },
            {
              key:'长春BB汽车',
              value:33
            },
            {
              key:'上海CC汽车',
              value:32
            },
            {
              key:'长春DD汽车',
              value:22
            },
            {
              key:'上海FF汽车',
              value:33
            },
            {
              key:'长春EE汽车',
              value:24
            }
          ]
        },
        {
          name:'利润',
          list:[
            {
              key:'上海AA汽车',
              value:21
            },
            {
              key:'长春BB汽车',
              value:32
            },
            {
              key:'上海CC汽车',
              value:31
            },
            {
              key:'长春DD汽车',
              value:22
            },
            {
              key:'上海FF汽车',
              value:33
            },
            {
              key:'长春EE汽车',
              value:24
            }
          ]
        }
      ]
    },
    handleSearchReset(){

    },
    getChartData(){
      console.log(111)
    }
  },
  computed:{
    chartTitle(){
      if(this.chartType==='supplier'){
        return '供应商名称'
      }else if(this.chartType==='round'){
        return '轮次'
      }else if(this.chartType==='num'){
        return '零件号'
      }else{
        return ''
      }
    }
  }
}
</script>

<style lang="scss">
.new-bob{
  .end{
    text-align:center;
    position: relative;
    bottom:30px
  }
  .toolTip-div{
    z-index: 20;
    min-width:164px;
    max-width:224px;
    z-index: 6;
    background:'#fff';
    opacity:1;
    border-radius:5px;
    position: absolute;
    box-shadow: 0px 4px 10px rgba(27, 29, 33, 0.12);
    top: 0;
    left:0;
    padding:10px;
  }
}
</style>