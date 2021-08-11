<template>
  <div>
      <iPage>
        <publicHeaderMenu></publicHeaderMenu>
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
export default {
    components:{
        iButton,
        iPage,
        kpiStructure,
        iCard,
        iInput,
        iSelect,
        publicHeaderMenu
    },
    data(){
        return {
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
    methods:{
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
</style>