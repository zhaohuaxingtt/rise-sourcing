<template>
  <!-- <div class="card-item"> -->
    <iCard>
      <div class="wrap-flex">
        <div class="left">
          <h2>{{dataList.carTypeProNameZh}}</h2>
          <!-- <h2>{{dataList.carTypeProNameEn}}</h2> -->
          <div>
            <p>{{$t("零件总个数")}}：<span>{{dataList.partCount}}</span></p>
            <p>{{$t("当前定点完成数量")}}：<span>{{dataList.cscNotFinishCount}}</span></p>
            <p>{{$t("当前已完成送样数量")}}：<span>{{dataList.sendSampleNotFinishCount}}</span></p>
          </div>
        </div>
        <div class="right">
          <iprogress :carProjectId="dataList.carTypeProId"></iprogress>
          
          <el-table :data="tableListData" class="margin-top20">
            <el-table-column width="70"
              prop="type"
              align="center"
              label="分类"
            >
              <template slot-scope="scope">
                <span>{{scope.row.partType}}</span>
              </template>
            </el-table-column>
            <el-table-column width="70"
              prop="csc"
              align="center"
              label="CSC"
            >
              <template slot-scope="scope">
                <!-- <span :style="scope.row.cscNotFinishCount!=0?'color:blue;cursor:pointer;':''" @click="jump('csc','CSC',scope.row.cscNotFinishCount)">{{scope.row.cscNotFinishCount}}</span> | <span>{{scope.row.cscFinishCount}}</span> -->
                <span :style="scope.row.cscNotFinishCount!=0?'color:blue;cursor:pointer;':''" @click="jump('csc','CSC',scope.row.cscNotFinishCount,0,scope.row)">{{scope.row.cscNotFinishCount}}</span> | <span :style="scope.row.cscFinishCount!=0?'color:blue;cursor:pointer;':''" @click="jump('csc','CSC',scope.row.cscFinishCount,1,scope.row)">{{scope.row.cscFinishCount}}</span>
              </template>
            </el-table-column>
            <el-table-column width="70"
              prop="Kickoff"
              align="center"
              label="Kickoff"
            >
              <template slot-scope="scope">
                <!-- <span :style="scope.row.kickoffNotFinishCount!=0?'color:blue;cursor:pointer;':''" @click="jump('Kickoff','Kickoff',scope.row.kickoffNotFinishCount)">{{scope.row.kickoffNotFinishCount}}</span> | <span>{{scope.row.kickoffFinishCount}}</span> -->
                <span :style="scope.row.kickoffNotFinishCount!=0?'color:blue;cursor:pointer;':''" @click="jump('Kickoff','Kickoff',scope.row.kickoffNotFinishCount,0,scope.row)">{{scope.row.kickoffNotFinishCount}}</span> | <span :style="scope.row.kickoffFinishCount!=0?'color:blue;cursor:pointer;':''" @click="jump('Kickoff','Kickoff',scope.row.kickoffFinishCount,1,scope.row)">{{scope.row.kickoffFinishCount}}</span>
              </template>
            </el-table-column>
            <el-table-column width="70"
              prop="BF"
              align="center"
              label="BF"
            >
              <template slot-scope="scope">
                <!-- <span  :style="scope.row.bfNotFinishCount!=0?'color:blue;cursor:pointer;':''"  @click="jump('bf','BF',scope.row.bfNotFinishCount)">{{scope.row.bfNotFinishCount}}</span> | <span>{{scope.row.bfFinishCount}}</span> -->
                <span  :style="scope.row.bfNotFinishCount!=0?'color:blue;cursor:pointer;':''"  @click="jump('bf','BF',scope.row.bfNotFinishCount,0,scope.row)">{{scope.row.bfNotFinishCount}}</span> | <span :style="scope.row.bfFinishCount!=0?'color:blue;cursor:pointer;':''"  @click="jump('bf','BF',scope.row.bfFinishCount,1,scope.row)">{{scope.row.bfFinishCount}}</span>
              </template>
            </el-table-column>
            <el-table-column width="70"
              prop="Data"
              align="center"
              label="Data Confirm"
              show-overflow-tooltip
            >
              <template slot="header">
                <div>
                  <span>Data</span>
                  <br/>
                  <span>Confirm</span>
                </div>
              </template>
              <template slot-scope="scope">
                <!-- <span  :style="scope.row.dataConfirmNotFinishCount!=0?'color:blue;cursor:pointer;':''"  @click="jump('',scope.row.dataConfirmNotFinishCount)">{{scope.row.dataConfirmNotFinishCount}}</span> | <span>{{scope.row.dataConfirmFinishCount}}</span> -->
                <span>{{scope.row.dataConfirmNotFinishCount}}</span> | <span>{{scope.row.dataConfirmFinishCount}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="Start"
              align="center"
              label="Start of Serie tool-making"
            >
              <template slot="header">
                <div>
                  <span>Start of Serie</span>
                  <br/>
                  <span>tool-making</span>
                </div>
              </template>
              <template slot-scope="scope">
                <!-- <span  :style="scope.row.toolMarkingNotFinishCount!=0?'color:blue;cursor:pointer;':''"  @click="jump('',scope.row.toolMarkingNotFinishCount)">{{scope.row.toolMarkingNotFinishCount}}</span> | <span>{{scope.row.toolMarkingFinishCount}}</span> -->
                <span>{{scope.row.toolMarkingNotFinishCount}}</span> | <span>{{scope.row.toolMarkingFinishCount}}</span>
              </template>
            </el-table-column>

             <el-table-column width="70"
              prop="T0"
              align="center"
              label="T0"
            >
              <template slot-scope="scope">
                <!-- <span  :style="scope.row.toNotFinishCount!=0?'color:blue;cursor:pointer;':''"  @click="jump('',scope.row.toNotFinishCount)">{{scope.row.toNotFinishCount}}</span> | <span>{{scope.row.toFinishCount}}</span> -->
                <span>{{scope.row.toNotFinishCount}}</span> | <span>{{scope.row.toFinishCount}}</span>
              </template>
            </el-table-column>

            <el-table-column 
              prop="tryout"
              align="center"
              label="1st Tryout"
            >
              <template slot-scope="scope">
                <!-- <span  :style="scope.row.oneStTryoutNotFinishCount!=0?'color:blue;cursor:pointer;':''"  @click="jump('oneStTryout','1st Tryout',scope.row.oneStTryoutNotFinishCount)">{{scope.row.oneStTryoutNotFinishCount}}</span> | <span>{{scope.row.oneStTryoutFinishCount}}</span> -->
                <span  :style="scope.row.oneStTryoutNotFinishCount!=0?'color:blue;cursor:pointer;':''"  @click="jump('oneStTryout','1st Tryout',scope.row.oneStTryoutNotFinishCount,0,scope.row)">{{scope.row.oneStTryoutNotFinishCount}}</span> | <span :style="scope.row.oneStTryoutFinishCount!=0?'color:blue;cursor:pointer;':''"  @click="jump('oneStTryout','1st Tryout',scope.row.oneStTryoutFinishCount,1,scope.row)">{{scope.row.oneStTryoutFinishCount}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="Startof"
              align="center"
              label="Start of Self-testing"
            >
              <template slot="header">
                <div>
                  <span>Start of</span>
                  <br/>
                  <span>Self-testing</span>
                </div>
              </template>
              <template slot-scope="scope">
                <!-- <span  :style="scope.row.toolTestingNotFinishCount!=0?'color:blue;cursor:pointer;':''"  @click="jump('',scope.row.toolTestingNotFinishCount)">{{scope.row.toolTestingNotFinishCount}}</span> | <span>{{scope.row.toolTestingFinishCount}}</span> -->
                <span>{{scope.row.toolTestingNotFinishCount}}</span> | <span>{{scope.row.toolTestingFinishCount}}</span>
              </template>
            </el-table-column>
            <el-table-column width="70"
              prop="OTS"
              align="center"
              label="OTS"
            >
              <template slot-scope="scope">
                <!-- <span  :style="scope.row.otsNotFinishCount!=0?'color:blue;cursor:pointer;':''"  @click="jump('ots','OTS',scope.row.otsNotFinishCount)">{{scope.row.otsNotFinishCount}}</span> | <span>{{scope.row.otsFinishCount}}</span> -->
                <span  :style="scope.row.otsNotFinishCount!=0?'color:blue;cursor:pointer;':''"  @click="jump('ots','OTS',scope.row.otsNotFinishCount,0,scope.row)">{{scope.row.otsNotFinishCount}}</span> | <span :style="scope.row.otsFinishCount!=0?'color:blue;cursor:pointer;':''"  @click="jump('ots','OTS',scope.row.otsFinishCount,1,scope.row)">{{scope.row.otsFinishCount}}</span>
              </template>
            </el-table-column>

            <el-table-column  
              label="EM" 
              prop="EM" 
              align="center"
            >
              <el-table-column  width="70"
                label="M" 
                prop="M" 
                align="center"
              >
                <template slot-scope="scope">
                  <!-- <span  :style="scope.row.emMNotFinishCount!=0?'color:blue;cursor:pointer;':''"  @click="jump('emM','EM-M',scope.row.emMNotFinishCount)">{{scope.row.emMNotFinishCount}}</span> | <span>{{scope.row.emMFinishCount}}</span> -->
                  <span  :style="scope.row.emMNotFinishCount!=0?'color:blue;cursor:pointer;':''"  @click="jump('emM','EM-M',scope.row.emMNotFinishCount,0,scope.row)">{{scope.row.emMNotFinishCount}}</span> | <span :style="scope.row.emMFinishCount!=0?'color:blue;cursor:pointer;':''"  @click="jump('emM','EM-M',scope.row.emMFinishCount,1,scope.row)">{{scope.row.emMFinishCount}}</span>
                </template>
              </el-table-column>

              <el-table-column  width="70"
                label="D" 
                prop="D" 
                align="center"
              >
                <template slot-scope="scope">
                  <!-- <span  :style="scope.row.emDNotFinishCount!=0?'color:blue;cursor:pointer;':''"  @click="jump('emD','EM-D',scope.row.emDNotFinishCount)">{{scope.row.emDNotFinishCount}}</span> | <span>{{scope.row.emDFinishCount}}</span> -->
                  <span  :style="scope.row.emDNotFinishCount!=0?'color:blue;cursor:pointer;':''"  @click="jump('emD','EM-D',scope.row.emDNotFinishCount,0,scope.row)">{{scope.row.emDNotFinishCount}}</span> | <span :style="scope.row.emDFinishCount!=0?'color:blue;cursor:pointer;':''"  @click="jump('emD','EM-D',scope.row.emDFinishCount,1,scope.row)">{{scope.row.emDFinishCount}}</span>
                </template>
              </el-table-column>

              <!-- <el-table-column  width="70"
                label="C" 
                prop="C"
                align="center"
              >
                <template slot-scope="scope">
                  <span  :style="scope.row.emCubingNomiNotDone!=0?'color:blue;cursor:pointer;':''"  @click="jump('EM-M',scope.row.emCubingNomiNotDone)">{{scope.row.emCubingNomiNotDone}}</span> | <span>{{scope.row.emCubingNomiDone}}</span>
                </template>
              </el-table-column> -->

              <el-table-column  width="70"
                label="G" 
                prop="G" 
                align="center"
              >
                <template slot-scope="scope">
                  <!-- <span  :style="scope.row.emGNotFinishCount!=0?'color:blue;cursor:pointer;':''"  @click="jump('emG','EM-G',scope.row.emGNotFinishCount)">{{scope.row.emGNotFinishCount}}</span> | <span>{{scope.row.emGFinishCount}}</span> -->
                  <span  :style="scope.row.emGNotFinishCount!=0?'color:blue;cursor:pointer;':''"  @click="jump('emG','EM-G',scope.row.emGNotFinishCount,0,scope.row)">{{scope.row.emGNotFinishCount}}</span> | <span :style="scope.row.emGFinishCount!=0?'color:blue;cursor:pointer;':''"  @click="jump('emG','EM-G',scope.row.emGFinishCount,1,scope.row)">{{scope.row.emGFinishCount}}</span>
                </template>
              </el-table-column>
            </el-table-column>
          </el-table>
          
          
          
          
          <!-- <el-table :data="tableListData" class="margin-top20">
            <el-table-column width="70"
              prop="type"
              align="center"
              label="分类"
            >
              <template slot-scope="scope">
                <span>{{scope.row.type}}</span>
              </template>
            </el-table-column>
            <el-table-column width="70"
              prop="csc"
              align="center"
              label="CSC"
            >
              <template slot-scope="scope">
                <span :style="scope.row.cscNomiNotDone!=0?'color:blue;cursor:pointer;':''" @click="jump('csc',scope.row.cscNomiNotDone)">{{scope.row.cscNomiNotDone}}</span> | <span>{{scope.row.cscNomiDone}}</span>
              </template>
            </el-table-column>
            <el-table-column width="70"
              prop="Kickoff"
              align="center"
              label="Kickoff"
            >
              <template slot-scope="scope">
                <span :style="scope.row.kickoffNomiNotDone!=0?'color:blue;cursor:pointer;':''" @click="jump('Kickoff',scope.row.kickoffNomiNotDone)">{{scope.row.kickoffNomiNotDone}}</span> | <span>{{scope.row.kickoffNomiDone}}</span>
              </template>
            </el-table-column>
            <el-table-column width="70"
              prop="BF"
              align="center"
              label="BF"
            >
              <template slot-scope="scope">
                <span  :style="scope.row.bfNomiNotDone!=0?'color:blue;cursor:pointer;':''"  @click="jump('BF',scope.row.bfNomiNotDone)">{{scope.row.bfNomiNotDone}}</span> | <span>{{scope.row.bfNomiDone}}</span>
              </template>
            </el-table-column>
            <el-table-column width="70"
              prop="Data"
              align="center"
              label="Data Confirm"
              show-overflow-tooltip
            >
              <template slot="header">
                <div>
                  <span>Data</span>
                  <br/>
                  <span>Confirm</span>
                </div>
              </template>
              <template slot-scope="scope">
                <span  :style="scope.row.dataConfirmNomiNotDone!=0?'color:blue;cursor:pointer;':''"  @click="jump('Data',scope.row.dataConfirmNomiNotDone)">{{scope.row.dataConfirmNomiNotDone}}</span> | <span>{{scope.row.dataConfirmNomiDone}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="Start"
              align="center"
              label="Start of Serie tool-making"
            >
              <template slot="header">
                <div>
                  <span>Start of Serie</span>
                  <br/>
                  <span>tool-making</span>
                </div>
              </template>
              <template slot-scope="scope">
                <span  :style="scope.row.startOfSerieToolMakingNomiNotDone!=0?'color:blue;cursor:pointer;':''"  @click="jump('Data',scope.row.startOfSerieToolMakingNomiNotDone)">{{scope.row.startOfSerieToolMakingNomiNotDone}}</span> | <span>{{scope.row.startOfSerieToolMakingNomiDone}}</span>
              </template>
            </el-table-column>

             <el-table-column width="70"
              prop="T0"
              align="center"
              label="T0"
            >
              <template slot-scope="scope">
                <span  :style="scope.row.toNomiNotDone!=0?'color:blue;cursor:pointer;':''"  @click="jump('1st Tryout',scope.row.toNomiNotDone)">{{scope.row.toNomiNotDone}}</span> | <span>{{scope.row.toNomiDone}}</span>
              </template>
            </el-table-column>

            <el-table-column 
              prop="tryout"
              align="center"
              label="1st Tryout"
            >
              <template slot-scope="scope">
                <span  :style="scope.row.onestTryoutNomiNotDone!=0?'color:blue;cursor:pointer;':''"  @click="jump('1st Tryout',scope.row.onestTryoutNomiNotDone)">{{scope.row.onestTryoutNomiNotDone}}</span> | <span>{{scope.row.onestTryoutNomiDone}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="Startof"
              align="center"
              label="Start of Self-testing"
            >
              <template slot="header">
                <div>
                  <span>Start of</span>
                  <br/>
                  <span>Self-testing</span>
                </div>
              </template>
              <template slot-scope="scope">
                <span  :style="scope.row.startOfSelfTestingNomiNotDone!=0?'color:blue;cursor:pointer;':''"  @click="jump('OTS',scope.row.startOfSelfTestingNomiNotDone)">{{scope.row.startOfSelfTestingNomiNotDone}}</span> | <span>{{scope.row.startOfSelfTestingNomiDone}}</span>
              </template>
            </el-table-column>
            <el-table-column width="70"
              prop="OTS"
              align="center"
              label="OTS"
            >
              <template slot-scope="scope">
                <span  :style="scope.row.otsNomiNotDone!=0?'color:blue;cursor:pointer;':''"  @click="jump('OTS',scope.row.otsNomiNotDone)">{{scope.row.otsNomiNotDone}}</span> | <span>{{scope.row.otsNomiDone}}</span>
              </template>
            </el-table-column>

            <el-table-column  
              label="EM" 
              prop="EM" 
              align="center"
            >
              <el-table-column  width="70"
                label="M" 
                prop="M" 
                align="center"
              >
                <template slot-scope="scope">
                  <span  :style="scope.row.emMNomiNotDone!=0?'color:blue;cursor:pointer;':''"  @click="jump('EM-M',scope.row.emMNomiNotDone)">{{scope.row.emMNomiNotDone}}</span> | <span>{{scope.row.emMNomiDone}}</span>
                </template>
              </el-table-column>

              <el-table-column  width="70"
                label="D" 
                prop="D" 
                align="center"
              >
                <template slot-scope="scope">
                  <span  :style="scope.row.emDNomiNotDone!=0?'color:blue;cursor:pointer;':''"  @click="jump('EM-M',scope.row.emDNomiNotDone)">{{scope.row.emDNomiNotDone}}</span> | <span>{{scope.row.emDNomiDone}}</span>
                </template>
              </el-table-column>

              <el-table-column  width="70"
                label="C" 
                prop="C"
                align="center"
              >
                <template slot-scope="scope">
                  <span  :style="scope.row.emCubingNomiNotDone!=0?'color:blue;cursor:pointer;':''"  @click="jump('EM-M',scope.row.emCubingNomiNotDone)">{{scope.row.emCubingNomiNotDone}}</span> | <span>{{scope.row.emCubingNomiDone}}</span>
                </template>
              </el-table-column>

              <el-table-column  width="70"
                label="G" 
                prop="G" 
                align="center"
              >
                <template slot-scope="scope">
                  <span  :style="scope.row.emGNomiNotDone!=0?'color:blue;cursor:pointer;':''"  @click="jump('EM-G',scope.row.emGNomiNotDone)">{{scope.row.emGNomiNotDone}}</span> | <span>{{scope.row.emGNomiDone}}</span>
                </template>
              </el-table-column>
            </el-table-column>
          </el-table> -->
        </div>
      </div>
    </iCard>
</template>

<script>
import { iCard } from "rise";
import iprogress from "./progress";
export default {
  components:{
    iCard, iprogress
  },
  props:{
    dataList:{type: Array,default:[]},
    carProjectId:{type: String, default: '50141107'},
  },
  created(){
    this.getData(this.dataList);
  },
  watch:{
    // dataList (newValue, oldValue) {
    //   console.log(newValue)
      

    //   console.log(this.tableListData)
    // },
  },
  data(){
    return{
      tableListData:[
        {
          type:'FS/GS',
        },{
          type:'Aeko',
        }
      ]
    }
  },
  methods:{
    getData(newValue){
      console.log(newValue)
      this.tableListData = newValue.partVos;
      // return;
      // this.tableListData = [
      //   {
      //     type:'FS/GS',
      //     cscNomiDone: newValue.cscNomiDone,
      //     cscNomiNotDone: newValue.cscNomiNotDone,
      //     kickoffNomiDone: newValue.kickoffNomiDone,
      //     kickoffNomiNotDone: newValue.kickoffNomiNotDone,
      //     bfNomiDone: newValue.bfNomiDone,
      //     bfNomiNotDone: newValue.bfNomiNotDone,
      //     dataConfirmNomiDone: newValue.dataConfirmNomiDone,
      //     dataConfirmNomiNotDone: newValue.dataConfirmNomiNotDone,
      //     onestTryoutNomiDone: newValue.onestTryoutNomiDone,
      //     onestTryoutNomiNotDone: newValue.onestTryoutNomiNotDone,
      //     otsNomiDone: newValue.otsNomiDone,
      //     otsNomiNotDone: newValue.otsNomiNotDone,
      //     emMNomiDone: newValue.emMNomiDone,
      //     emMNomiNotDone: newValue.emMNomiNotDone,
      //     emGNomiDone: newValue.emGNomiDone,
      //     emGNomiNotDone: newValue.emGNomiNotDone,
      //     emDNomiDone:newValue.emDNomiDone,
      //     emDNomiNotDone:newValue.emDNomiNotDone,
      //     emCubingNomiDone: newValue.emCubingNomiDone,
      //     emCubingNomiNotDone: newValue.emCubingNomiNotDone,

      //     startOfSerieToolMakingNomiDone: newValue.startOfSerieToolMakingNomiDone,
      //     startOfSerieToolMakingNomiNotDone: newValue.startOfSerieToolMakingNomiNotDone,
      //     toNomiDone: newValue.toNomiDone,
      //     toNomiNotDone: newValue.toNomiNotDone,
      //     startOfSelfTestingNomiDone: newValue.startOfSelfTestingNomiDone,
      //     startOfSelfTestingNomiNotDone: newValue.startOfSelfTestingNomiNotDone,

      //   },{
      //     type:'Aeko',
      //     cscNomiDone: newValue.cscAekoDone,
      //     cscNomiNotDone: newValue.cscAekoNotDone,
      //     kickoffNomiDone: newValue.kickoffAekoDone,
      //     kickoffNomiNotDone:newValue.kickoffAekoNotDone,
      //     bfNomiDone: newValue.bfAekoDone,
      //     bfNomiNotDone: newValue.bfAekoNotDone,
      //     dataConfirmNomiDone: newValue.dataConfirmAekoDone,
      //     dataConfirmNomiNotDone: newValue.dataConfirmAekoNotDone,
      //     onestTryoutNomiDone: newValue.onestTryoutAekoDone,
      //     onestTryoutNomiNotDone: newValue.onestTryoutAekoNotDone,
      //     otsNomiDone:newValue.otsAekoDone,
      //     otsNomiNotDone:newValue.otsAekoNotDone,
      //     emMNomiDone: newValue.emMAekoDone,
      //     emMNomiNotDone: newValue.emMAekoNotDone,
      //     emGNomiDone: newValue.emGAekoDone,
      //     emGNomiNotDone: newValue.emGAekoNotDone,
      //     emDNomiDone:newValue.emDAekoDone,
      //     emDNomiNotDone:newValue.emDAekoNotDone,
      //     emCubingNomiDone: newValue.emCubingAekoDone,
      //     emCubingNomiNotDone: newValue.emCubingAekoNotDone,

      //     startOfSerieToolMakingNomiDone: newValue.startOfSerieToolMakingAekoDone,
      //     startOfSerieToolMakingNomiNotDone: newValue.startOfSerieToolMakingAekoNotDone,
      //     toNomiDone: newValue.toAekoDone,
      //     toNomiNotDone: newValue.toAekoNotDone,
      //     startOfSelfTestingNomiDone: newValue.startOfSelfTestingAekoDone,
      //     startOfSelfTestingNomiNotDone: newValue.startOfSelfTestingAekoNotDone,
      //   }
      // ];
    },
    jump(val,num,data,completion,obj){
      // console.log(this.dataList)
      // return;
      if(data != 0){
        const hrefs = this.$router.resolve({
          path: "/deliver/kickoff",
          query: {
            type: num,
            value:val,
            id:this.dataList.carTypeProId,
            completion:completion,
            partType:obj.partType,
          }
        });
        window.open(hrefs.href, "_blank");
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.left{
  width: 250px;
  margin-right: 30px;
  padding-right: 30px;
  border-right:1px solid #E6E9F0;
  
  h2{
    margin-bottom:10px;
  }
  p{
    font-size: 14.5px;
    margin-bottom:15px;
  }

  div{
    margin-top:40px;
  }

  ::v-deep .bodyShow{
    padding: 0;
    .el-divider--horizontal{
      margin-top: 0;
    }
  }
}
.right{
  flex: 1;
}
.wrap-flex{
  display: flex;
  justify-content: space-between;
}
</style>