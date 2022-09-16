<template>
  <iPage class="progressDetail">
    <projectTop />
    <iSearch>
      <!-- <template #header> -->
      <div class="flex-top">
        <!-- language('CHEXINGXIANGMU','车型项目') -->
        <div class="flex-title">
          <span class="form-title lineH40">车型项目：</span>
          <el-form inline class="form">
            <el-form-item>
                <iSelect filterable v-model="searchParams.carProject" :placeholder="language('QINGXUANZE','请选择')">
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
          <iprogress v-if="searchParams.carProject" :carProjectId="searchParams.carProject"></iprogress>
        </div>
      </div>
      <el-divider></el-divider>
      <div class="flex-bottom">
        <span class="form-title lineH60">零件进度：</span>
        <div class="flex-top flex1">
          <el-form class="margin-top10">
            <el-form-item :label="language('CAILIAOZU', '材料组')">
              <iSelect filterable v-model="searchParams.dept"  :placeholder="language('QINGXUANZE','请选择')">
                <el-option
                  v-for="item in deptList"
                  :key="item.materialGroupId"
                  :label="item.materialGroupNameZh"
                  :value="item.materialGroupId">
                </el-option>
              </iSelect>
            </el-form-item>

            <el-form-item :label="language('LINGJIAN', '零件')">
              <iSelect filterable v-model="searchParams.part" :placeholder="language('QINGXUANZE','请选择')">
                <el-option
                  v-for="item in partList"
                  :key="item.partNum"
                  :label="item.partNameZh"
                  :value="item.partNum">
                </el-option>
              </iSelect>
            </el-form-item>

            <el-form-item :label="language('GONGYINGSHANG', '供应商')">
              <iSelect filterable v-model="searchParams.supplier" :placeholder="language('QINGXUANZE','请选择')">
                <el-option
                  v-for="item in supplierList"
                  :key="item.cartypeProId"
                  :label="item.cartypeProNameZh"
                  :value="item.cartypeProId">
                </el-option>
              </iSelect>
            </el-form-item>

          </el-form>
          <div class="sreach-button">
            <iButton>查询</iButton>
            <iButton>重置</iButton>
          </div>
        </div>
      </div>
      <!-- </template> -->
    </iSearch>
    <iTabsList type="card" class='margin-top20' v-model="tabVal" @tab-click="changeTab" >
      <el-tab-pane name="1" label="HeavyItem零件">
        <heavyItem :carProjectId="searchParams.carProject" v-if="searchParams.carProject" />
      </el-tab-pane>
      <el-tab-pane name="2" label="普通零件">
        <commonParts :carProjectId="searchParams.carProject" v-if="searchParams.carProject" />
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
} from "@/api/project/deliver";

export default {
  components:{
    iPage, iCard,iTabsList, iInput, iSearch, iButton, iDatePicker, iSelect, iMessage, projectTop,iprogress,heavyItem,commonParts
  },
  data() {
    return {
      searchParams: {
        carProject:"",
        dept:"",
        part:"",
        supplier:"",
      },

      carProjectOptions:[],
      deptList:[],
      partList:[],
      supplierList:[],


      selectOptions:{},
      tabVal:'1',
    }
  },
  created(){
    this.getData();
  },
  methods:{
    getData(){
      cartype_pro_List({}).then(res=>{
        if(res?.result){
          this.carProjectOptions = res.data.filter(res => res)
          this.searchParams.carProject = this.carProjectOptions[0]?.cartypeProId;

          this.getGroup(this.searchParams.carProject);//获取车型项目材料组下拉
        }
      })
    },
    getGroup(val){
      getCartypeProMaterialGroup(val).then(res=>{
        if(res?.result){
          this.deptList = res.data;
        }
      })

      getCartypeProPart(val).then(res=>{
        if(res?.result){
          this.partList = res.data;
        }
      })

      getCartypeProSupplier(val).then(res=>{
        if(res?.result){
          this.supplierList = res.data;
        }
      })
    },
    changeTab(){

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