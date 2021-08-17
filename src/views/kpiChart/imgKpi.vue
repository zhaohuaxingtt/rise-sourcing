<template>
  <div>
      <iPage>
        <div class="navBox clearfix">
            <el-tabs v-model="activeName" @tab-click="handleleftClick" class="leftNav">
                <el-tab-pane 
                v-for="x in tabRouterList"
                :label="x.name" 
                :name="x.url"
                :key="x.value"
                ></el-tab-pane>
            </el-tabs>
            <div>
            <el-tabs v-model="activeRightName" @tab-click="handlerightClick" class="rightNav">
                <el-tab-pane 
                v-for="x in categoryManagementAssistantList"
                :label="x.name" 
                :name="x.url"
                :key="x.value"
                ></el-tab-pane>
            </el-tabs>
            <logButton class="logButton"/>
            </div>
        </div>
           <iCard>
               <div class="imgkpi-head">
               <el-form>
                <el-form-item
                  class="SearchOption"
                >
                  <iSelect v-model="selectValue">
                        <el-option v-for="(x,index) in dropDownOptions"
                          :key="index" 
                          :label="x.value" 
                          :value="x.key"></el-option>
                    </iSelect>
                </el-form-item>
               </el-form>
               <div>
                   <iButton @click="newData">新增</iButton>
                   <iButton @click="handleChange">确认</iButton>
               </div>
               </div>
           </iCard>
           
          <kpiStructure 
          style="margin-top:20px" 
          :treeData="allData"
          :temId="selectValue"
          :templateName="templateName"
          @click="changeSaveData"
          @saveVersion="saveVersion"></kpiStructure>
      </iPage>
  </div>
</template>

<script>
import {iButton,iPage,iCard,iInput,iSelect} from 'rise'
import kpiStructure from './components/kpiStructure'
import publicHeaderMenu from './commonHeardNav/headerNav'
import { kpiDetail,slelectkpiList,dowbloadAPI,templateDetail } from '@/api/kpiChart'
import {iNavMvp } from 'rise'
import { tabRouterList, categoryManagementAssistantListkpi } from './commonHeardNav/navData'
import logButton from '@/components/logButton'
export default {
    components:{
        iButton,
        iPage,
        kpiStructure,
        iCard,
        iInput,
        iSelect,
        publicHeaderMenu,
         categoryManagementAssistantListkpi,
        tabRouterList,
        iNavMvp,
        logButton
    },
    data(){
        return {
      activeName:'/supplier/kpiList',
      activeRightName:'/supplier/imgKpi',
      tabRouterList:tabRouterList,
        categoryManagementAssistantList:categoryManagementAssistantListkpi,
            formData:{
                deptId:''
            },
            dropDownOptions:[],
            allData:[],
            saveData:[],
            selectValue:"",
            templateName:""
        }
    },
    created(){
      this.getSelectKpiList({deptCode:this.$store.state.permission.userInfo.deptDTO.deptNum})
    },
    mounted(){
      // this.getDetail("1")
    },
    watch:{
      dropDownOptions(){
        if(this.dropDownOptions.length>0){
          let leg = this.dropDownOptions.length-1
          this.selectValue=this.dropDownOptions[leg].key
          this.handleChange()
        }
      }
    },
    methods:{
      handleleftClick(tab,event){
            this.$router.push(tab.name)
        },
        handlerightClick(tab){
            //this.activeName='/supplier/kpiList'
             this.$router.push(tab.name)
        },
      saveVersion(){
        this.getSelectKpiList({deptCode:this.$store.state.permission.userInfo.deptDTO.deptNum})
      },
      getSelectKpiList(params){
            slelectkpiList(params).then(res=>{
                this.dropDownOptions=res.data
            })
        },
      getDetail(x){
            templateDetail({pageNo: 1,
            pageSize: 100,
            templateId: x}).then(res=>{
                if(res.code=="200"){
                  console.log(res.data)
                    this.allData=JSON.parse(JSON.stringify(res.data))
                }
            })

        },
      changeSaveData(data){
        
      },
      handleChange(){
        this.getDetail(this.selectValue)
        
        this.dropDownOptions.forEach(x=>{
          if(x.key==this.selectValue){
            this.templateName=x.value
          }
        })
      },
      newData(){
        this.selectValue=""
        this.temId=""
        this.templateName=""
      }
    }
}
</script>

<style lang="scss" scoped>
    .imgkpi-head{
        display: flex;
        justify-content: space-between;
    }
    ::v-deep.navBox {
  position: relative;
  // border-bottom: 1px solid #E3E3E3;
  .logButton .icon + span{vertical-align: top;}
  margin-bottom: 20px;
  div{font-size: 20px;}
  .el-tabs__nav-wrap::after{
    width: 0;
  }
  .el-tabs__item{
    line-height: 24px;
  }
  .el-tabs__item.is-active{
    font-weight: Bold;
  }
  .leftNav{
      float: left;
  }
  .rightNav {
    float: right;
    margin-right: 110px;
    .el-tabs__active-bar {
        background-color: transparent !important;
    }
  }

  .logButton {
    position: absolute;
    top: 5px;
    right: 0;
  }
}
.clearfix:after{
  content: "020"; 
  display: block; 
  height: 0; 
  clear: both; 
  visibility: hidden;  
  }

.clearfix {
  /* 触发 hasLayout */ 
  zoom: 1; 
  }
</style>