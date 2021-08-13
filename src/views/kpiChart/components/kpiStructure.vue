<template>
  <div>
      <iCard>
          <div class="imgkpi-head">
               <el-form label-position="left" label-width="60px">
                <el-form-item
                label="版本："
                class="SearchOption"
                >
                 <iInput v-model="childTemplateName"></iInput>
                </el-form-item>
               </el-form>
               <div>
                   <iButton @click="deleteTemplate">删除</iButton>
                   <!-- <iButton @click="downloadTeplate">下载</iButton> -->
                   <iButton @click="save">保存</iButton>
               </div>
            </div>
          <div class="scoll-y">
          <div class="kpi-chart">
              <div class="tab1">
                  <div class="head">总体</div>
                  <div class="cell">
                    <div :class="formDataLevel2.length>0?'total first-cloum-after':'total'">
                        总体
                        <i class="el-icon-circle-plus-outline" @click="addCell"></i></div>
                </div>
              </div>
              <div class="tab2">
                   <div class="head"><p class="border-class">指标1</p></div>
                
              </div>
              <div class="tab3">
                   <div class="head"><p class="border-class">指标2</p></div>
                
              </div>
              <div class="tab4">
                   <div class="head"><p class="border-class">指标3</p></div>
                   
              </div>
          </div>
        <div class="list2">
          <div 
          class="list" 
          v-for="(item,index) in formDataLevel2" 
          :key="index" 
          :class="index<formDataLevel2.length-1?'second-cloum-before':''"
          >
                <div class="cell">
                    <div :class="item.children.length>0?'content kpi-module second-before second-after':'content kpi-module second-before'">
                        <div class="case">
                            <label>名称</label>
                            <iInput class="kpi-input" v-model="item.name"></iInput>
                        </div>
                        <div class="case">
                            <label>比重</label>
                            <iInput class="kpi-input" v-model="item.weight"></iInput>
                        </div>
                        <i class="add el-icon-circle-plus-outline" @click="handleAdd(index,'','2')"></i>
                        <i class="less el-icon-remove-outline" @click="handleLess(index,'','','2')"></i>
                    </div>
                </div>
                <div class="part2">
                    <div 
                    class="itemList" 
                    v-for="(lev3,index3) in item.children" 
                    :key="index3"
                    >
                        <div class="cell third-cell" :class="index3<item.children.length-1?'cloum-before':''">
                            <div :class="lev3.children.length>0?'content kpi-module third-border-before third-border-after':'content kpi-module third-border-before'">
                                <div class="case">
                                    <label>名称</label>
                                    <iInput class="kpi-input" v-model="lev3.name"></iInput>
                                </div>
                                <div class="case">
                                    <label>比重</label>
                                    <iInput class="kpi-input" v-model="lev3.weight"></iInput>
                                </div>
                                <i class="add el-icon-circle-plus-outline" @click="handleAdd(index,index3,'3')"></i>
                                <i class="less el-icon-remove-outline" @click="handleLess(index,index3,'','3')"></i>
                            </div>
                        </div>
                        
                        <div class="cell last-cell" :key="index3+'lev3'">
                            <div class="content kpi-module last-border"
                            v-for="(lev4,index4) in lev3.children" 
                            :key="index4+'lev4'"
                        >
                                <div class="case">
                                    <label>名称</label>
                                    <iInput class="kpi-input" v-model="lev4.name"></iInput>
                                </div>
                                <div class="case">
                                    <label>比重</label>
                                    <iInput class="kpi-input" v-model="lev4.weight"></iInput>
                                </div>
                                <i class="less el-icon-remove-outline" @click="handleLess(index,index3,index,'4')"></i>
                            </div>
                        </div>
                    </div>
                </div>
          </div>
          </div>
          </div>
      </iCard>
  </div>
</template>

<script>
import { iCard,iInput,iButton } from 'rise'
import { saveTemplateDetail,deleteTemplate,downloadTemplate } from '@/api/kpiChart'
export default {
    props:{
        treeData:{
            type:Array
        },
        temId:{
            type:String
        },
        templateName:{
            type:String
        }
    },
    components:{
        iCard,
        iInput,
        iButton
    },
    data(){
        return {
            formDataLevel2:[],
            childTemplateName:""
        }
    },
    mounted(){
        this.formDataLevel2=this.treeData
    },
    watch:{
        treeData:{
           handler(curVal,oldVal){
               this.formDataLevel2=this.treeData
               this.childTemplateName=this.templateName
            },
            immediate: true,
            deep: true
        },
        templateName(){
             this.childTemplateName=this.templateName
              this.formDataLevel2=[]
        }
    },
    methods:{
        addCell(){
            this.formDataLevel2.push({id:'',name:"",
                weight:"",children:[]})
        },
        handleAdd(index,idx3,str){
            if(str==="2"){
                 this.formDataLevel2[index].children.push({
                id:'',name:"",
                weight:"",children:[]})
            }else if(str==="3"){
                this.formDataLevel2[index].children[idx3].children.push({
                id:'',name:"",
                weight:"",children:[]})
                
            }
        },
        handleLess(index,index3,index4,str){
            if(str==="2"){
               this.formDataLevel2.splice(index,1)
            }else if(str==="3"){
               this.formDataLevel2[index].children.splice(index3,1)
            }else{
               this.formDataLevel2[index].children[index3].children.splice(index4,1)
            }
        },
        save(){
            saveTemplateDetail({
            deptCode:this.$store.state.permission.userInfo.deptDTO.deptNum,
            id:this.temId,
            name:this.childTemplateName,
            list:[...this.formDataLevel2]}).then(res=>{
            //  this.$router.go(0)
                this.$message("操作成功")
            }).catch(error=>{
               this.$message.error('指标权重设置有误，请重新设置');
            })
            this.$emit("saveVersion")
      },
      deleteTemplate(){
          this.$confirm('此操作将永久删除该模板, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteTemplate({templateId:this.temId}).then(res=>{
              this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            this.$router.go(0)
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
          
      },
      downloadTeplate(){
          downloadTemplate({templateId:this.temId}).then(res=>{
                let URL = window.URL || window.webkitURL;
                let objectUrl = URL.createObjectURL(res);
                let a = document.createElement('a');
                a.href = objectUrl; 
                a.download = `${this.childTemplateName}.xls`; 
                document.body.appendChild(a);
                a.click();
                a.remove();
          })
      }
    }
  
}
</script>

<style lang="scss" scoped>
    .kpi-Chart-box{
        width: 100%;
        display: flex;
        justify-content: flex-start;
        
    }
    .kpi-chart{
        width: 100%;
        position: relative;
        color: #fff;
        font-size: 22px;
        display: flex;
        justify-content: space-between;
        .tab1{
            width: calc(25% - 4px);
            position: relative;
             z-index: 9999;
            .head{
                line-height: 60px;
                text-align: center;
                border-radius: 10px 0 0 0;
                height: 60px;
                background-color: #0C47A1;
            }
            .cell{
                width:100%;
                position: relative;
                // display: flex;
                // justify-content: center;
                // align-items: center;
                margin-top: 30px;
                padding-bottom: 50px;
                .total{
                    left: 50%;
                    transform: translateX(-50%);
                    width: 304px;
                    height: 60px;
                    line-height: 60px;
                    text-align: center;
                    border-radius: 10px;
                    border: 1px solid #1A75D1;
                    position: relative;
                    color: #000000;
                    &.first-cloum-after::after{
                        content: '';
                        position: absolute;
                        border-top: 1px solid #2297F3;
                        top: 30px;
                        right: -79px;
                        width: 79px;
                        height: 1px;
                    }
                    i{
                        position: absolute;
                        top: -15px;
                        right: -15px;
                        font-size: 30px;
                        background-color: #fff;
                        color: #1A75D1;
                        cursor: pointer;
                    }
                }
            }
        }
        .tab2{
            width: calc(25% - 4px);
            .head{
                width: 100%;
                text-align: center;
                height: 60px;
                background-color: #1976D1;
            }
        }
        .tab3{
            width: calc(25% - 4px);
            .head{
                width: 100%;
                text-align: center;
                height: 60px;
                background-color: #2297F3;
                display: flex;
                align-items: center;
                justify-content: center
            }
        }
        .tab4{
            width:25%;
            .head{
                width: 100%;
                text-align: center;
                border-radius: 0 10px 0 0;
                height: 60px;
                background-color: #64B5F6;
            }
        }
        .head{
            display: flex;
            align-items: center;
            justify-content: center
        }
        .border-class{
            border: 1px solid #fff;
            width: 200px;
            text-align: center;
            height: 40px;
            line-height: 40px;
            border-radius: 4px;
        }
    }
    .scoll-y{height: calc(100vh - 436px);overflow-y: auto}
    .list2{margin-top:-140px;min-height: 120px;position: relative;}
    .second-cloum-before::before{
        content: '';
        position: absolute;
        border-left: 1px solid #2297F3;
        top: 62px;
        left: 0;
        height: calc(100%);
    }
    .list{
        width: 75%;
        margin-left: 25%;
        position: relative;
        display: flex;
        justify-content: flex-start;
        .cell{
            width:33.33%;
            position: relative;
            // display: flex;
            // justify-content: center;
            // align-items: center;
            margin-top: 30px;
            .total{
                width: 304px;
                height: 60px;
                line-height: 60px;
                text-align: center;
                border-radius: 10px;
                border: 1px solid #1A75D1;
                position: relative;
                i{
                    position: absolute;
                    top: -15px;
                    right: -15px;
                    font-size: 30px;
                    background-color: #fff;
                    color: #1A75D1;
                    cursor: pointer;
                }
            }
        }
         .second-before::before{
                content: '';
                position: absolute;
                border-top: 1px solid #2297F3;
                top: 30px;
                left: -54px;
                width: 54px;
                height: 1px;
            }
            .second-after::after{
                content: '';
                position: absolute;
                border-top: 1px solid #2297F3;
                top: 30px;
                right: -78px;
                width: 78px;
                height: 1px;
            }
    } 
    .kpi-module{
        margin-bottom: 20px;
        width: 304px;
        height: 60px;
        border-radius: 10px;
        border: 1px solid #1A75D1;
        display: flex;
        justify-content: space-between;
        padding: 18px 20px;
        position: relative;
        left: 50%;
        transform: translateX(-50%);
        .case{
            width: 1112px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            font-size: 18px;
            label{
                margin-right: 10px;
            }
            .kpi-input{
                width: 66px;
                height: 34px;
                border-radius: 10xp;
            }
        }
        .add{
            display: none;
            position: absolute;
                    top: -15px;
                    right: -15px;
                    font-size: 30px;
                    background-color: #fff;
                    color: #1A75D1;
                    cursor: pointer;
        }
        .less{
            display: none;
            position: absolute;
                    bottom: -15px;
                    right: -15px;
                    font-size: 30px;
                    background-color: #fff;
                    color: #1A75D1;
                    cursor: pointer;
        }
    }
    .kpi-module:hover .add{
        display: block;
    }
    .kpi-module:hover .less{
        display: block;
    }
    .part2{
        width: 66.66%;
        position: relative;
        
        .itemList{
            width: 100%;
            display: flex;
            justify-content: flex-start;
            position: relative;
            .cell{
                width: 50%;
                position: relative;
                // border-left: 1px solid #1976D1;
                .kpi-module{
                    position: relative;
                }
            }
            .cloum-before::before{
                content: '';
                position: absolute;
                border-left: 1px solid #2297F3;
                top: 32px;
                left: 0;
                height: calc(100% + 30px);
            }
            .last-cell::before{
                content: '';
                position: absolute;
                border-left: 1px solid #2297F3;
                top: 32px;
                left: 0;
                height: calc(100% - 80px);
            }
            .last-border::before{
                content: '';
                position: absolute;
                border-top: 1px solid #2297F3;
                top: 30px;
                left: -54px;
                width: 54px;
                height: 1px;
            }
            .third-border-before::before{
                content: '';
                position: absolute;
                border-top: 1px solid #2297F3;
                top: 30px;
                left: -54px;
                width: 54px;
                height: 1px;
            }
            .third-border-after::after{
                content: '';
                position: absolute;
                border-top: 1px solid #2297F3;
                top: 30px;
                right: -78px;
                width: 78px;
                height: 1px;
            }
        }
    }
  .imgkpi-head{
        display: flex;
        justify-content: space-between;
    }  
</style>
