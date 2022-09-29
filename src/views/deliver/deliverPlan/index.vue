<template>
  <iPage class="deliverPlan">
    <H1>送样计划</H1>
    <div style="margin:20px 0;">
      <iSearch @sure="sure" @reset="reset">
        <el-form class="margin-top10">
          <el-form-item :label="$t('CHEXINGXIANGMU')">
            <iInput v-model="selectOptions.catTypeProName"></iInput>
          </el-form-item>
          <el-form-item :label="$t('LINGJIANHAO')">
            <iInput v-model="selectOptions.partNum"></iInput>
          </el-form-item>
          <el-form-item :label="$t('LINGJIANMINGCHENG')">
            <iInput v-model="selectOptions.partName"></iInput>
          </el-form-item>
        </el-form>
      </iSearch>
    </div>
    <el-row :gutter="40">
      <el-col :span="12">
        <iCard :title="'送样零件'">
          <tableList :tableData="tableDataLeft" :tableTitle="tableTitleLeft" index :indexLabel="'#'" :selection='false'>
            <template #col5="scope">
              <iButton type="text" @click="editPlan(scope.row)">编辑计划</iButton>
              <iButton type="text" @click="editActual(scope.row)">编辑实际</iButton>
              <iButton type="text" @click="copyParts(scope.row)">复制</iButton>
            </template>
          </tableList>
        </iCard>
      </el-col>
      <el-col :span="12">
        <iCard :title="rightTitleType?'送样管理进度计划':'送样管理进度计划维护'">
          <div class="flex-box">
            <div>
              <span>车型项目:{{carProject}}</span>
              <span style="display:inline-block;margin-left:20px;">零件：{{partName}}</span>
            </div>
            <div>
              <iButton>甘特图导出</iButton>
              <iButton @click="save">保存</iButton>
              <iButton @click="sendOut">发送</iButton>
            </div>
          </div>
          <tableList
            v-show="rightTitleType"
            @handleSelectionChange="handleSelectionChangePlan"
            class="margin-top20"
            :tableData="tableDataRight"
            :tableTitle="tableTitleRight1"
            >
            <template #planStartTime="scope">
              <iDatePicker
                v-if="scope.row.isSend"
                v-model="scope.row.planStartTime"
                type="date"
                :placeholder="$t('LK_QINGXUANZE')"
                >
              </iDatePicker>
              <span v-else>{{scope.row.planStartTime?scope.row.planStartTime:'/'}}</span>
            </template>
            <template #planEndTime="scope">
              <iDatePicker
                v-if="scope.row.isSend"
                v-model="scope.row.planEndTime"
                type="date"
                :placeholder="$t('LK_QINGXUANZE')"
                >
              </iDatePicker>
              <span v-else>{{scope.row.planEndTime?scope.row.planEndTime:'/'}}</span>
            </template>
            <template #col4="scope">
              <iButton type="text" :disabled="!scope.row.isSend" @click="sendOne(scope.row)">发送</iButton>
            </template>
          </tableList>
          <tableList 
            v-show="!rightTitleType"
            class="margin-top20" 
            :tableData="tableDataRight" 
            :tableTitle="tableTitleRight2"
            >
            <template #actualStartTime="scope">
              <iDatePicker
                v-if="scope.row.isSend"
                v-model="scope.row.actualStartTime"
                type="date"
                :placeholder="$t('LK_QINGXUANZE')"
                >
              </iDatePicker>
              <span v-else>{{scope.row.actualStartTime?scope.row.actualStartTime:'/'}}</span>
            </template>
            <template #actualEndTime="scope">
              <iDatePicker
                v-if="scope.row.isSend"
                v-model="scope.row.actualEndTime"
                type="date"
                :placeholder="$t('LK_QINGXUANZE')"
                >
              </iDatePicker>
              <span v-else>{{scope.row.actualEndTime?scope.row.actualEndTime:'/'}}</span>
            </template>
            <template #col4="scope">
              <iButton type="text" :disabled="!scope.row.isSend" @click="sendOne(scope.row)">发送</iButton>
            </template>
          </tableList>
        </iCard>
      </el-col>
    </el-row>
  </iPage>
</template>

<script>
import {
  iPage,
  iCard,
  iButton,
  iDatePicker,
  iSearch,
  iInput,
  iMessage
} from "rise";
import tableList from "@/components/iTableSort"
import { searchList, tableTitleLeft, tableTitleRight1,tableTitleRight2 } from "./data";
import {
  getPartActityty,
  getSamplePlanList,
  planDetail,
  changePlan,
} from "@/api/project/deliver";
export default {
  components:{
    iPage,
    iCard,
    iButton,
    tableList,
    iDatePicker,
    iSearch,
    iInput
  },
  data() {
    return {
      searchList,
      selectOptions: {
        catTypeProName:"",
        partNum:"",
        partName:"",
      },
      tableDataLeft:[],
      tableTitleLeft,
      tableTitleRight1,
      tableTitleRight2,
      tableDataRight:[],
      partNum: "",
      partName: '',
      rightTitleType:true,

      selectData:[],
    }
  },
  created(){
    this.selectOptions.catTypeProName = this.$route.query.carProjectName;
    this.getLeftData();
  },
  methods:{
    sendOne(val){
      const data = _.cloneDeep(val);
      data.type = 1;
      changePlan([data]).then(res=>{
        if(res?.result){
          iMessage.success(res.desZh)
        }
      })
    },
    sendOut(){
      if(this.selectData.length<1){
        iMessage.error("请选择")
        return;
      }
      var sendType = true;
      this.selectData.forEach(e=>{
        if(!e.isSend){
          sendType = false;
        }
      })
      if(!sendType){
        iMessage.error("请勾选可发送的节点进行发送")
        return
      }
      this.changePlan(1)
    },
    save(){
      if(this.selectData.length<1){
        iMessage.error("请选择")
        return;
      }
      var sendType = true;
      this.selectData.forEach(e=>{
        if(!e.isSend){
          sendType = false;
        }
      })
      if(!sendType){
        iMessage.error("请勾选可发送的节点进行发送")
        return
      }
      this.changePlan(4)
    },
    changePlan(val){
      this.selectData.forEach(e=>{
        e.type = val;
      })
      changePlan(this.selectData).then(res=>{
        if(res?.result){
          iMessage.success(res.desZh)
        }
      })
    },
    handleSelectionChangePlan(val){
      this.selectData = val;
    },
    getLeftData(){
      getSamplePlanList({
        ...this.selectOptions
      }).then(res=>{
        this.tableDataLeft = res.data;
        this.partNum = this.tableDataLeft[0].partNum;
        this.partName = this.tableDataLeft[0].partNameZh;

        this.getRightData();
      })
    },
    getRightData(){
      planDetail({
        partNum:this.partNum,
        type:this.rightTitleType?1:2
      }).then(res=>{
        // this.tableDataRight = res.data;
        // res.data.forEach((e,index) => {
        //   if(index == 0){
        //     e.isSend = true;
        //   }
        // });
        this.tableDataRight = res.data;
      })
    },
    editPlan(val){
      this.rightTitleType = true;
      this.partNum = val.partNum;
      this.partName = val.partNameZh;
      this.getRightData();
    },
    editActual(val){
      this.rightTitleType = false;
      this.partNum = val.partNum;
      this.partName = val.partNameZh;
      this.getRightData();
    },
    copyParts(val){
      console.log(val);
    },
    sure(){
      this.getLeftData();
    },
    reset(){
      this.selectOptions = {
        catTypeProName:this.$route.query.carProjectName,
        partNum:"",
        partName:"",
      }
      this.getLeftData();
    },
  }
}
</script>

<style lang="scss" scoped>
.deliverPlan{
  ::v-deep .el-col{
    .card{
      height: calc(100vh - 320px);
      .flex-box{
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
  }
}
::v-deep .el-input__icon{
  line-height: 2rem;
}
</style>