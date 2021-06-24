<template>
  <iPage class="new-bob">
    <div class="navBox flex-between-center">
      <span class="title"
        >BOB{{ $t("TPZS.FENXI")
        }}<span v-if="inside">-RFQ {{ rfq }}</span></span
      >
      <div class="flex-align-center">
        <!--预览-->
				<iButton class="margin-left30" >{{ $t('LK_YULAN') }}</iButton>
				<!--保存-->
				<iButton class="margin-left30" >{{ $t('LK_BAOCUN') }}</iButton>
				<!--BoB分析库-->
				<iButton @click="goToBob">BoB{{ $t('分析库') }}</iButton>
        <!--查找零件-->
        <iButton class="margin-left30" @click="findPart">{{ $t("查找零件") }}</iButton>
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
                      <el-option value="supplier" label="按供应商比较"></el-option>
                      <el-option value="turn" label="按轮次比较"></el-option>
                      <el-option value="spareParts" label="按零件号比较"></el-option>
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
                <el-form-item :label="$t('LK_SPAREPARTSNUMBER')">
                  <el-select multiple clearable value-key :multiple-limit="(chartType==='spareParts')?5:1"  v-model="form.spareParts">
                    <el-option :value="2">2</el-option>
                    <el-option :value="3">3</el-option>
                  </el-select>
                </el-form-item>
                
              </el-row>
            </el-form>
            <div class="end">
              <iButton  type="primary" @click="searchChartData">确定</iButton>
              <iButton type="primary"  @click="handleSearchReset">重制</iButton>
            </div>
        </iCard>
      </el-col>
      <el-col :span="20">
        <iCard style="height:500px" collapse>
          <crown-bar :chartData="chartData" :title="chartTitle" @select="showSelect" :type="bobType" :by="chartType"/>
          <div class="toolTip-div" ref="toolTipDiv" v-show="showSelectDiv">
            <iSelect v-model="bobType" ref="toolTipSelect" @blur="closeDiv" @change="changeType">
                <el-option value="Best of Best" label="Best of Best"></el-option>
                <el-option value="Best of Average" label="Best of Average"></el-option>
                <el-option value="Best of Second" label="Best of Second"></el-option>
            </iSelect>
          </div>
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
            <iButton type="primary" @click="handleSearchReset">重制</iButton>
          </div>
        </iCard>
      </el-col>
      <el-col :span="20">
        <bobAnalysis></bobAnalysis>
      </el-col>
    </el-row>
    <findingParts :value="value"></findingParts>
  </iPage>
</template>

<script>
import { iPage, iButton, iCard, iSelect } from "rise";
import CrownBar from "./components/crownBar.vue";
import bobAnalysis from "@/views/partsrfq/bob/bobAnalysis/index.vue";
import findingParts from "@/views/partsrfq/components/findingParts.vue";
import {getBobLevelOne} from '@/api/partsrfq/bob'
export default {
  components: {
    iPage,
    iButton,
    iCard,
    iSelect,
    CrownBar,
    bobAnalysis,
    findingParts
  },
  data() {
    return {
      rfq:'2222',
      inside:false,
      chartData:[],
      chartType:'supplier',
      bobType:'Best of Best',
      form:{
        supplier:[],
        turn:[],
        spareParts:[]
      },
      showSelectDiv:false,
      analysisSchemeId:5,
      
    }
  },
  mounted(){
    this.inside=true
    // this.initChartData()
    // this.analysisSchemeId = this.$route.query.analysisSchemeId;
    this.getChartData()
  },
  methods:{
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
      const data=require('./data.json')
      this.chartData = data
    },
    handleSearchReset(){
      this.form={
        supplier:[],
        turn:[],
        spareParts:[]
      }
      this.getChartData()
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
        this.chartData=allData.filter((r)=>r.isIntroduce===0)
      })
    },
    getChartData(){
      getBobLevelOne({
        analysisSchemeId:this.analysisSchemeId
      }).then((res)=>{
        const allData=res.data||[]
        this.chartData=allData.filter((r)=>r.isIntroduce===0)
      })
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
}
</style>