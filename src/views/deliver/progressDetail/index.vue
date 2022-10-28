<template>
  <iPage class="progressDetail">
    <projectTop />
    <iSearch>
      <!-- <template #header> -->
      <div class="flex-top">
        <!-- language('CHEXINGXIANGMU','车型项目') -->
        <div class="flex-title">
          <span class="form-title lineH40">{{$t("CHEXINGXIANGMU")}}：</span>
          <el-form inline class="form">
            <el-form-item>
                <iSelect filterable v-model="searchParams.carTypeProId" :placeholder="language('QINGXUANZE','请选择')" @change="carChange" >
                  <el-option
                    v-for="item in carProjectOptions"
                    :key="item.cartypeProId"
                    :label="item.cartypeProNameZh"
                    :value="item.cartypeProId">
                  </el-option>
                </iSelect>
              </el-form-item>
          </el-form>
        </div>
        <div class="isearch-top">
          <iprogress v-if="searchParams.carTypeProId" :carProjectId="searchParams.carTypeProId"></iprogress>
        </div>
      </div>
      <el-divider></el-divider>
      <div class="flex-bottom">
        <span class="form-title lineH60">{{$t("LINGJIANJINDU")}}：</span>
        <div class="flex-top flex1">
          <el-form class="margin-top10">
            <el-form-item :label="language('CAILIAOZU', '材料组')">
              <iSelect filterable v-model="searchParams.materialGroupId"  :placeholder="language('QINGXUANZE','请选择')">
                <el-option
                  v-for="item in deptList"
                  :key="item.materialGroupId"
                  :label="item.materialGroupNameZh"
                  :value="item.materialGroupId">
                </el-option>
              </iSelect>
            </el-form-item>

            <el-form-item :label="language('LINGJIAN', '零件')">
              <iSelect filterable v-model="searchParams.partNum" :placeholder="language('QINGXUANZE','请选择')">
                <el-option
                  v-for="item in partList"
                  :key="item.partNum"
                  :label="item.partNameZh"
                  :value="item.partNum">
                </el-option>
              </iSelect>
            </el-form-item>

            <el-form-item :label="language('GONGYINGSHANG', '供应商')">
              <iSelect filterable v-model="searchParams.supplierId" :placeholder="language('QINGXUANZE','请选择')">
                <el-option
                  v-for="item in supplierList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </iSelect>
            </el-form-item>

          </el-form>
          <div class="sreach-button">
            <iButton @click="sure">{{$t("BIDDING_CHAXUN")}}</iButton>
            <iButton @click="reset">{{$t("LK_CHONGZHI")}}</iButton>
          </div>
        </div>
      </div>
      <!-- </template> -->
    </iSearch>
    <iTabsList type="card" class='margin-top20' v-model="tabVal" @tab-click="changeTab" >
      <el-tab-pane name="1" :label="$t('HeavyItem零件')">
        <heavyItem ref="heavyItem" :partPage="partPage" :carProjectId="searchParams.carTypeProId" :carProjectOptions="carProjectOptions" @handleCurrentChange="handleCurrentChange" v-if="searchParams.carTypeProId" :titleName="titleName" :supplierName="supplierName" />
      </el-tab-pane>
      <el-tab-pane name="2" :label="$t('普通零件')">
        <commonParts ref="commonParts" :carProjectId="searchParams.carTypeProId" v-if="searchParams.carTypeProId" />
      </el-tab-pane>
    </iTabsList>
  </iPage>
</template>

<script>
import { iPage, iCard,iTabsList, iInput, iSearch, iButton, iDatePicker, iSelect, iMessage } from "rise";
import projectTop from '../components/projectHeader'
import iprogress from "../components/progress";
import heavyItem from "./components/heavyItem";
import commonParts from "./components/commonParts";
import {
  cartype_pro_List,
  getCartypeProMaterialGroup,
  getCartypeProPart,
  getCartypeProSupplier,
  partsPage,
  getPartNode,
  ordinaryPart,
} from "@/api/project/deliver";

export default {
  components:{
    iPage, iCard,iTabsList, iInput, iSearch, iButton, iDatePicker, iSelect, iMessage, projectTop,iprogress,heavyItem,commonParts
  },
  data() {
    return {
      searchParams: {
        carTypeProId:"",
        materialGroupId:"",
        partNum:"",
        supplierId:"",
      },
      carTypeProIdOld:"",

      carProjectOptions:[],
      deptList:[],
      partList:[],
      supplierList:[],

      selectOptions:{},
      tabVal:'1',
      supplierName:"",

      partNum:'',
      partPage:{
        totalCount:0, //总条数
        pageSize:1,   //每页多少条
        pageSizes:[1], //每页条数切换
        currPage:1,    //当前页
        layout:"sizes, prev, pager, next, jumper"
      },
      titleName:{
        name:"",
        nameE:"",
        number:"",
      },
    }
  },
  created(){
    this.getData();
  },
  methods:{
    carChange(val){
      this.getGroup(val);//获取车型项目材料组下拉
      this.searchParams.materialGroupId = "";
      this.searchParams.partNum = "";
      this.searchParams.supplierId = "";
    },
    async sure(){
      this.partPage.currPage = 1;
      await this.partsPage();
      this.getPartNode(this.partNum);
    },
    async reset(){
      this.partPage.currPage = 1;
      this.searchParams = {
        carTypeProId : this.carTypeProIdOld,
        materialGroupId : "",
        partNum : "",
        supplierId : "",
      }
      await this.partsPage();
      this.getPartNode(this.partNum);
    },
    async handleCurrentChange(val){
      this.partPage.currPage = val;
      await this.partsPage();
      this.getPartNode(this.partNum);
    },
    async getData(){
      await this.getCarType();
      await this.partsPage();
      this.getPartNode(this.partNum);
    },
    getCarType(){
      return new Promise((resolve,reject) => {
        cartype_pro_List({}).then(res=>{
          if(res?.result){
            this.carProjectOptions = res.data.filter(res => res)
            this.searchParams.carTypeProId = this.carProjectOptions[0]?.cartypeProId;
            this.carTypeProIdOld = this.carProjectOptions[0]?.cartypeProId;
            this.getGroup(this.searchParams.carTypeProId);//获取车型项目材料组下拉
            resolve();
          }
        })
      })
    },
    partsPage(){
      return new Promise((resolve,reject) => {
        partsPage({
          ...this.searchParams,
          current:this.partPage.currPage,
          size:1,
        }).then(res=>{
          if(res?.result){
            this.partPage.currPage = res.pageNum;
            this.partPage.totalCount = res.total;
            if(res.data.length>0){
              this.partNum = res.data[0].partsNum;
              if(res.data[0].supplierName){
                this.supplierName = res.data[0].supplierName;
              }else{
                this.supplierName = "";
              }
              this.titleName.name = res.data[0].partNameZh;
              this.titleName.nameE = res.data[0].partNameDe;
              this.titleName.number = res.data[0].partsNum;
            }else{
              this.partNum = "";
              this.supplierName = "";
              this.titleName.name = "";
              this.titleName.nameE = "";
              this.titleName.number = "";
            }
            resolve();
          }
        })
      })
    },
    getPartNode(){
      if(this.tabVal == 1){
        if(this.partNum){
          getPartNode({
            partNum:this.partNum,
          }).then(res=>{
            if(res?.result){
              this.$refs.heavyItem.queryPepNodeTimeByCarTypeProId(res.data,this.searchParams.carTypeProId);
            }
          })
        }else{
          this.$refs.heavyItem.queryPepNodeTimeByCarTypeProId([],this.searchParams.carTypeProId);
        }
      }else{
        ordinaryPart({
          ...this.searchParams,
        }).then(res=>{
          if(res?.result){
            this.$refs.commonParts.setData(res.data);
          }
        })
      }
    },
    getGroup(val){
      var id = "";
      if(val){
        id = val;
      }else{r
        id = 0;
      }
      getCartypeProMaterialGroup(id).then(res=>{
        if(res?.result){
          this.deptList = res.data;
        }
      })

      getCartypeProPart(id).then(res=>{
        if(res?.result){
          this.partList = res.data;
        }
      })

      getCartypeProSupplier(id).then(res=>{
        if(res?.result){
          this.supplierList = res.data;
        }
      })
    },
    changeTab(val){
      this.tabVal = val.name;
      this.getPartNode();
    }
  }
}
</script>

<style lang="scss" scoped>
.progressDetail{
  .form-title{
    font-size: 18px;
    font-weight: bold;
  }
  .isearch-top{
    display: flex;
    flex:1;
    // justify-content: space-between;
    flex-flow: row;
    margin-right: 20px;
  
  }
  ::v-deep .hiden{
    max-height: 108px;
  }
}
.flex-bottom{
  display:flex;
  ::v-deep .el-form{
    .el-form-item{
      display: flex;
      align-items: center;
      width: 17rem;

      .el-form-item__label{
        width: 70px;
      }
    }
  }
}
.flex-top{
  display: flex;
  justify-content: space-between;
}
.flex1{
  flex:1;
}
::v-deep .cardBody{
  .operation{
    button{
      display: none;
    }
  }
}

::v-deep .el-divider{
  margin:1rem 0 0.5rem 0;
}
.flex-title{
  display: flex;
}
.lineH40{
  line-height: 40px;
}
.lineH60{
  line-height: 55px;
}
.sreach-button{
  margin-top:15px;
}
</style>