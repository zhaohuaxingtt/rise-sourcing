<template>
  <iPage class="deliverPlan">
    <H1>{{$t("送样计划")}}</H1>
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
          <el-form-item :label="$t('节点发送状态')">
            <iSelect filterable v-model="selectOptions.isSend" :placeholder="language('QINGXUANZE','请选择')">
              <el-option
                v-for="item in nodeList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </iSelect>
          </el-form-item>
          <el-form-item :label="$t('延误状态')">
            <iSelect filterable v-model="selectOptions.isDelay" :placeholder="language('QINGXUANZE','请选择')">
              <el-option
                v-for="item in ywtypeList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </iSelect>
          </el-form-item>
        </el-form>
      </iSearch>
    </div>
    <el-row :gutter="40">
      <el-col :span="9">
        <iCard :title="$t('送样零件')">
          <tableList :tableData="tableDataLeft" :tableTitle="tableTitleLeft" index :indexLabel="'#'" :selection='false'>
            <template #col5="scope">
              <iButton type="text" @click="editPlan(scope.row)">{{$t("CHAKAN")}}</iButton>
            </template>
          </tableList>
        </iCard>
      </el-col>
      <el-col :span="15">
        <iCard :title="$t('CHEXINGXIANGMU')+':' + carProject + ' ' + $t('LINGJIAN') +'：' + partName">
          <div class="flex-box">
            <div>
              <span></span>
              <span style="display:inline-block;margin-left:20px;"></span>
            </div>
            <div>
              <iButton @click="sendOut" v-permission="SONGYANGGUANLI_GUOCHENGJIANKONG_PLAN_PLFASONG">{{$t("批量发送")}}</iButton>
            </div>
          </div>

          <el-table
            tooltip-effect="light"
            :data="tableDataRight"
            class="table_task_class margin-top20"
            @selection-change="handleSelectionChangePlan"
            :border="true"
          > 
            <el-table-column type='selection' width="45" align="center" header-align="center"></el-table-column>
            <el-table-column width="70"
              prop="node"
              align="center"
              :label="$t('节点')"
            >
              <template slot-scope="scope">
                <span>{{scope.row.node}}</span>
              </template>
            </el-table-column>

            <el-table-column
              prop=""
              align="center"
              :label="$t('计划')"
            >
              <el-table-column
                prop="planStartTime"
                align="center"
                :label="$t('预计开始')+'(SOLL)'"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <span>{{scope.row.planStartTime?scope.row.planStartTime:"/"}}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="planEndTime"
                align="center"
                :label="$t('预计结束')+'(SOLL)'"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <span>{{scope.row.planEndTime?scope.row.planEndTime:"/"}}</span>
                </template>
              </el-table-column>
            </el-table-column>

            <el-table-column
              prop=""
              align="center"
              :label="$t('实际')"
            >
              <el-table-column
                prop="actualStartTime"
                align="center"
                :label="$t('实际开始')+'(SOLL)'"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <span>{{scope.row.actualStartTime?scope.row.actualStartTime:"/"}}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="actualEndTime"
                align="center"
                :label="$t('实际结束')+'(SOLL)'"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <span>{{scope.row.actualEndTime?scope.row.actualEndTime:"/"}}</span>
                </template>
              </el-table-column>
            </el-table-column>

            <el-table-column
              width="80"
              prop=""
              align="center"
              :label="$t('CAOZUO')"
            >
              <template slot-scope="scope">
                <div v-permission="SONGYANGGUANLI_GUOCHENGJIANKONG_PLAN_FASONG">
                  <span v-if="scope.row.isSend">{{$t('FASONG')}}</span>
                  <span v-else class="submit-plan" @click="sendOne(scope.row)">{{$t('FASONG')}}</span>
                </div>
              </template>
            </el-table-column>
          </el-table>
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
import { searchList, tableTitleLeft, tableTitleRight1 } from "./data";
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
      nodeList:[
        {
          id:0,
          name:"未发送",
          nameE:"Not Sent",
        },{
          id:1,
          name:"已发送",
          nameE:"has been sent",
        },
      ],
      ywtypeList:[
        {
          id:0,
          name:"未延误",
          nameE:"No delay",
        },{
          id:1,
          name:"已延误",
          nameE:"Delayed",
        },
      ],
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
        isDelay:this.selectOptions.isDelay,
        isSend:this.selectOptions.isSend,
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
        isDelay:"",
        isSend:"",
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

.table_task_class{
  ::v-deep .el-table td{
    padding:0.5625rem 0;
  }
  ::v-deep .el-table__row{
    height: 60px !important;
  }
}
.submit-plan{
  color:#66b1ff;
  font-weight: bold;
  cursor: pointer;
}
</style>