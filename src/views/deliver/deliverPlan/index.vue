<template>
  <iPage class="deliverPlan">
    <H1>送样计划</H1>
    <div style="margin:20px 0;">
      <iSearch @sure="sure" @reset="reset">
        <el-form class="margin-top10">
          <el-form-item :label="$t('CHEXINGXIANGMU')">
            <iSelect filterable v-model="selectOptions.catTypeProName" :placeholder="language('QINGXUANZE','请选择')" @change="projectChange">
              <el-option
                v-for="(item,index) in carProjectOptions"
                :key="index"
                :label="item.cartypeProNameZh"
                :value="item.cartypeProNameZh">
              </el-option>
            </iSelect>
          </el-form-item>
          <el-form-item :label="language('GONGYINGSHANG', '供应商')">
            <iSelect filterable v-model="selectOptions.supplierId" :placeholder="language('QINGXUANZE','请选择')">
              <el-option
                v-for="item in supplierList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </iSelect>
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
              <!-- <iButton type="text" @click="copyParts(scope.row)">复制</iButton> -->
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
              <!-- <iButton>甘特图导出</iButton> -->
              <!-- <iButton @click="save">保存</iButton> -->
              <iButton @click="sendOut" v-if="rightTitleType">发送</iButton>
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
              <!-- <iDatePicker
                v-if="!scope.row.isSend"
                v-model="scope.row.planStartTime"
                type="date"
                :placeholder="$t('LK_QINGXUANZE')"
                >
              </iDatePicker> -->
              <span>{{scope.row.planStartTime?scope.row.planStartTime.split(" ")[0]:'/'}}</span>
            </template>
            <template #planEndTime="scope">
              <!-- <iDatePicker
                v-if="!scope.row.isSend"
                v-model="scope.row.planEndTime"
                type="date"
                :placeholder="$t('LK_QINGXUANZE')"
                >
              </iDatePicker> -->
              <span>{{scope.row.planEndTime?scope.row.planEndTime.split(" ")[0]:'/'}}</span>
            </template>
            <template #isSend="scope">
              <span>{{scope.row.isSend?scope.row.isFeedback?"已反馈":"已发送":"未发送"}}</span>
            </template>
            <template #col4="scope">
              <iButton type="text" :disabled="scope.row.isSend?scope.row.isFeedback?false:true:false" @click="scope.row.isSend?scope.row.isFeedback?unlock(scope.row):sendOne(scope.row):sendOne(scope.row)">{{scope.row.isSend?scope.row.isFeedback?"解锁":"发送":"发送"}}</iButton>
            </template>
          </tableList>
          <tableList 
            v-show="!rightTitleType"
            class="margin-top20" 
            :tableData="tableDataRight" 
            :tableTitle="tableTitleRight2"
            >
            <template #actualStartTime="scope">
              <!-- <iDatePicker
                v-if="scope.row.isSend"
                v-model="scope.row.actualStartTime"
                type="date"
                :placeholder="$t('LK_QINGXUANZE')"
                >
              </iDatePicker> -->
              <span>{{scope.row.actualStartTime?scope.row.actualStartTime.split(" ")[0]:'/'}}</span>
            </template>
            <template #actualEndTime="scope">
              <!-- <iDatePicker
                v-if="scope.row.isSend"
                v-model="scope.row.actualEndTime"
                type="date"
                :placeholder="$t('LK_QINGXUANZE')"
                >
              </iDatePicker> -->
              <span>{{scope.row.actualEndTime?scope.row.actualEndTime.split(" ")[0]:'/'}}</span>
            </template>
            <template #col4="scope">
              <iButton type="text" :disabled="!(scope.row.isSend && scope.row.isFeedback)" @click="unlock(scope.row)">解锁</iButton>
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
  iSelect,
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
  cartype_pro_List,
  getCartypeProSupplier,
} from "@/api/project/deliver";
export default {
  components:{
    iPage,
    iCard,
    iButton,
    tableList,
    iDatePicker,
    iSearch,
    iInput,
    iSelect
  },
  data() {
    return {
      searchList,
      supplierList:[],
      selectOptions: {
        catTypeProName:"",
        partNum:"",
        supplierId:"",
        partName:"",
      },
      tableDataLeft:[],
      tableTitleLeft,
      tableTitleRight1,
      tableTitleRight2,
      tableDataRight:[],
      partNum: "",
      partName: '',
      carProject:"",
      rightTitleType:true,

      carProjectOptions:[],//车型项目

      selectData:[],
    }
  },
  created(){
    this.selectOptions.catTypeProName = this.$route.query.carProjectName;
    this.getSearch();
  },
  methods:{
    unlock(val){
      const data = _.cloneDeep(val);
      delete data.isFeedback;
      delete data.isSend;
      data.type = 3;
      changePlan([data]).then(res=>{
        if(res?.result){
          iMessage.success(res.desZh)
          this.getRightData();
        }
      })
    },
    projectChange(val){
      this.getSupplier();
    },
    async getSearch(){
      await this.getCarType();
      await this.getSupplier();
      this.getLeftData();
    },
    getCarType(){
      return new Promise((resolve,reject) => {
        cartype_pro_List({}).then(res=>{
          if(res?.result){
            this.carProjectOptions = res.data.filter(res => res)
            resolve();
          }
        })
      })
    },
    getSupplier(){
      this.selectOptions.supplierId = "";
      var supplierId = this.carProjectOptions.filter(e => e.cartypeProNameZh == this.selectOptions.catTypeProName)
      return new Promise((resolve,reject) => {
        getCartypeProSupplier(supplierId[0].cartypeProId).then(res=>{
          if(res?.result){
            this.supplierList = res.data;
            resolve();
          }
        })
      })
    },
    sendOne(val){
      const data = _.cloneDeep(val);
      delete data.isFeedback;
      delete data.isSend;
      data.type = 1;
      changePlan([data]).then(res=>{
        if(res?.result){
          iMessage.success(res.desZh)
          this.getRightData();
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
        if(e.isSend){
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
        delete e.isFeedback;
        delete e.isSend;
      })
      changePlan(this.selectData).then(res=>{
        if(res?.result){
          iMessage.success(res.desZh)
          this.getRightData();
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
        this.carProject = this.tableDataLeft[0].carTypeProNameZh;

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
      this.carProject = val.carTypeProNameZh;
      this.getRightData();
    },
    editActual(val){
      this.rightTitleType = false;
      this.partNum = val.partNum;
      this.partName = val.partNameZh;
      this.carProject = val.carTypeProNameZh;
      this.getRightData();
    },
    copyParts(val){
      console.log(val);
    },
    sure(){
      this.getLeftData();
    },
    async reset(){
      this.selectOptions = {
        catTypeProName:this.$route.query.carProjectName,
        partNum:"",
        supplierId:"",
        partName:"",
      }
      await this.getSupplier();
      this.getLeftData();
    },
  }
}
</script>

<style lang="scss" scoped>
.deliverPlan{
  ::v-deep .el-col{
    .card{
      min-height: calc(100vh - 320px);
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