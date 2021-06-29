<template>
  <iPage class="new-bob">
    <div class="navBox flex-between-center">
      <span class="title"
        >BOB{{ $t("TPZS.FENXI")
        }}<span v-if="inside">-RFQ {{ rfq }}</span></span
      >
      <div class="flex-align-center">
        <!--预览-->
				<iButton class="margin-left30" @click="pre=true">{{ $t('LK_YULAN') }}</iButton>
				<!--保存-->
				<iButton class="margin-left30" >{{ $t('LK_BAOCUN') }}</iButton>
				<!--BoB分析库-->
				<iButton @click="goToBob">BoB{{ $t('分析库') }}</iButton>
        <!--查找零件-->
        <iButton class="margin-left30" @click="findPart">{{
          $t("查找零件")
        }}</iButton>
      </div>
    </div>
    <el-row :gutter="20" class="margin-top20">
      <el-col :span="4">
        <iCard :collapse="false" style="height:500px" >
            <el-form  label-position="top" :model="form" style="height:460px">
              <el-row class="margin-bottom20">
                <!--比较类型-->
                <el-form-item :label="$t('比较类型')">
                  <iSelect v-model="chartType" @change="changeBy">
                      <el-option value="supplier" :label="$t('按供应商比较')"></el-option>
                      <el-option value="turn" :label="$t('按轮次比较')"></el-option>
                      <el-option value="spareParts" :label="$t('按零件号比较')"></el-option>
                  </iSelect>
                </el-form-item>
                <!--供应商-->
                <el-form-item :label="$t('TPZS.GONGYINGSHANG')">
                  <el-select multiple clearable value-key :multiple-limit="(chartType==='supplier')?5:1" v-model="form.supplier" >
                    <el-option value="11001" label="上海AA汽车"></el-option>
                    <el-option value="11002" label="上海BB汽车"></el-option>
                    <el-option value="11003" label="上海CC汽车"></el-option>
                  </el-select>
                </el-form-item>
                <!--轮次-->
                <el-form-item :label="$t('轮次')">
                  <el-select multiple clearable value-key :multiple-limit="(chartType==='turn')?5:1" v-model="form.turn">
                    <el-option :value="1" label="第1轮"></el-option>
                    <el-option :value="2" label="第2轮"></el-option>
                    <el-option :value="-1" label="最新轮"></el-option>
                  </el-select>
                </el-form-item>
                <!--零件号-->
                <el-form-item :label="$t('LK_SPAREPARTSNUMBER')+'/'+$t('LK_FSHAO')">
                  <el-select multiple clearable value-key :multiple-limit="(chartType==='spareParts')?5:1"  v-model="form.spareParts">
                    <el-option :value="2+'/'+1" >2/1</el-option>
                    <el-option :value="3+'/'+1" >3/1</el-option>
                  </el-select>
                </el-form-item>
              </el-row>
            </el-form>
            <div class="end">
              <iButton  type="primary" @click="searchChartData">{{ $t('LK_QUEDING') }}</iButton>
              <iButton type="primary"  @click="handleSearchReset">{{ $t('LK_ZHONGZHI') }}</iButton>
            </div>
        </iCard>
      </el-col>
      <el-col :span="20">
        <iCard style="height:500px" collapse>
          <iRow>
            <el-col :span="(inside)?18:24">
              <crown-bar :chartData="chartData" :title="chartTitle" @select="showSelect" :type="bobType" :by="chartType"/>
              <div class="toolTip-div" ref="toolTipDiv" v-show="showSelectDiv">
                <iSelect v-model="bobType" ref="toolTipSelect" @blur="closeDiv" @change="changeType">
                    <el-option value="Best of Best" label="Best of Best"></el-option>
                    <el-option value="Best of Average" label="Best of Average"></el-option>
                    <el-option value="Best of Second" label="Best of Second"></el-option>
                </iSelect>
              </div>
            </el-col>
            <el-col :span="6" v-if="inside">
              <div  class="left-dash1">
              <out-bar v-if="chartData1.length>0" :chartData="chartData1" @del="delOut" @change="changeOut"></out-bar>
              <div v-else @click="findPart" class="icon-add">
                <icon  style="font-size:260px" name="iconbob-daitianjia" symbol></icon>
                <div style="text-align:center">{{$t('待添加')}}</div>
              </div>
              </div>
            </el-col>
          </iRow>
        </iCard>
      </el-col>
    </el-row>
    <el-row :gutter="20" class="margin-top20">
      <el-col :span="4">
        <iCard :collapse="false" style="height: 500px">
          <el-form label-position="top" :model="form" style="height: 460px">
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
                <iSelect multiple v-model="form.supplier"> </iSelect>
              </el-form-item>
              <!--轮次-->
              <el-form-item :label="$t('轮次')">
                <iSelect multiple v-model="form.round"></iSelect>
              </el-form-item>
              <!--零件号-->
              <el-form-item :label="$t('LK_SPAREPARTSNUMBER')">
                <iSelect multiple v-model="form.num"></iSelect>
              </el-form-item>
            </el-row>
          </el-form>
          <div class="end">
            <iButton type="primary" @click="getChartData">确定</iButton>
            <iButton type="primary" @click="handleSearchReset">重置</iButton>
          </div>
        </iCard>
      </el-col>
      <el-col :span="20">
        <bobAnalysis></bobAnalysis>
        <ungroupedTable class="margin-top20" :tableList="tableList"></ungroupedTable>
      </el-col>
    </el-row>
    <findingParts
      :value="value"
      @sure="sure"
      @close="closeDialog"
      @handleSelectionChange="handleSelectionChange"
    ></findingParts>
    <preview
      :value="pre"
      @close="closePreView"
    ></preview>
  </iPage>
</template>

<script>
import { iPage, iButton, iCard, iSelect, icon } from "rise";
import CrownBar from "./components/crownBar.vue";
import bobAnalysis from "@/views/partsrfq/bob/bobAnalysis/index.vue";
import ungroupedTable from "@/views/partsrfq/bob/bobAnalysis/ungroupedTable.vue";
import findingParts from "@/views/partsrfq/components/findingParts.vue";
import {getBobLevelOne,removeBobOut} from '@/api/partsrfq/bob'
import preview from './preview.vue';
import OutBar from './components/outBar.vue';
import {
  dataList1,
  dataList2,
  dataList3,
  dataList4,
  dataList5,
  dataList6,
  tableList,
} from "@/views/partsrfq/bob/bobAnalysis/components/data.js";

export default {
  components: {
    iPage,
    iButton,
    iCard,
    iSelect,
    CrownBar,
    bobAnalysis,
    ungroupedTable,
    findingParts,
    OutBar,
    icon,
    preview
  },
  data() {
    return {
      rfq:'2222',
      inside:true,
      chartData:[],
      chartData1:[],
      chartType:'supplier',
      bobType:'Best of Best',
      tableList,
      form:{
        supplier:[],
        turn:[],
        spareParts:[]
      },
      showSelectDiv:false,
      analysisSchemeId:5,
      value:false,
      pre:false
    }
  },
  mounted(){
    this.inside=true
    // this.initChartData()
    // this.analysisSchemeId = this.$route.query.analysisSchemeId;
    this.getChartData()
  },
  methods:{
    findPart(){
      this.value=true
    },
    closeDialog(val){
      this.value=val
    },
    closePreView(val){
      this.pre=val
    },
    sure(){
      
    },
    changeBy(e){
      this.chartType=e
      this.form={
        supplier:[],
        turn:[],
        spareParts:[]
      }
    },
    changeType(e){
      this.bobType=e
      this.initChartData()
      this.closeDiv()
    },
    goToBob(){
      this.$router.push('bob')
    },
    closeDiv(){
      this.showSelectDiv=false
    },
    showSelect(e){
      console.log(e)
      const position=e.event.target.position
      this.showSelectDiv=true
      this.$refs.toolTipDiv.style.left=position[0]+210+'px'
      this.$refs.toolTipDiv.style.top=position[1]+15+'px'
      this.$refs.toolTipSelect.focus()
    },
    initChartData(){
      // const data=require('./data.json')
      // this.chartData = data
    },
    handleSearchReset(){
      this.form={
        supplier:[],
        turn:[],
        spareParts:[]
      }
      this.getChartData()
    },
    handleSelectionChange(val){
      console.log(val)
    },
    searchChartData(){
      getBobLevelOne({
        analysisSchemeId:this.analysisSchemeId,
        analysisDimension:this.chartType,
        spareParts:this.form.spareParts.join(','),
        supplier:this.form.supplier.join(','),
        turn:this.form.turn.join(',')
      }).then((res)=>{
        const allData=res.data||[]
        this.chartData=allData.bobLevelOneVOList.filter((r)=>r.isIntroduce===0)
        this.chartData1=allData.bobLevelOneVOList.filter((r)=>r.isIntroduce===1)
        this.chartType=allData.analysisDimension
        this.bobType=allData.defaultBobOptions

      })
    },
    getChartData(){
      getBobLevelOne({
        analysisSchemeId:this.analysisSchemeId
      }).then((res)=>{
        console.log(res)
        const allData=res.data||[]
        this.chartData=allData.bobLevelOneVOList.filter((r)=>r.isIntroduce===0)
        this.chartData1=allData.bobLevelOneVOList.filter((r)=>r.isIntroduce===1)
        this.chartType=allData.analysisDimension
        this.bobType=allData.defaultBobOptions
      })
    },
    delOut(){
      removeBobOut({
        id:this.chartData1[0].id
      }).then((res)=>{
        if(res.code==200){
						this.$message.success(res.desZh)
						this.getChartData()
					}else{
						this.$message.error(res.desZh)
					}
      })
    },
    changeOut(){
      this.findPart()
    }
  },
  computed:{
    chartTitle(){
      console.log(this.form)
      if(this.chartType==='supplier'){
        return this.form.spareParts
      }else if(this.chartType==='turn'){
        return this.form.supplier+' '+ this.form.spareParts
      }else if(this.chartType==='spareParts'){
        return this.form.supplier
      }else{
        return ''
      }
    },
  },
};
</script>

<style lang="scss">
.new-bob {
  .end {
    text-align: center;
    position: relative;
    bottom: 30px;
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
  .left-dash1{
    border: none;
    border-left: 5px dashed grey;
    .icon-add{
      margin-top: 100px;
      margin-bottom: 20px;
      text-align: center;
    }
  }
}
</style>