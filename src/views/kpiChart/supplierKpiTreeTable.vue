<template>
  <div>
      <iPage>
          <publicHeaderMenu></publicHeaderMenu>
           <iCard style="margin-top:20px">
               <div class="top">
                   <div class="searchOptions">
                        <el-form>
                            <el-row>
                                <el-col>
                                        <iSelect v-model="selectValue" @change="handleChange()">
                                            <el-option v-for="(x,index) in dropDownOptions"
                                             :key="index" 
                                             :label="x.value" 
                                             :value="x.key"></el-option>
                                        </iSelect>
                                </el-col>
                            </el-row>
                        </el-form>
                    </div>
                    <div>
                        <input type="file" id="file" @change="upfileChange($event)" style="display:none;" />
                        <iButton @click="handleupLoad">{{language("SHANGCHUAN","上传")}}</iButton>
                        <iButton @click="handleDownload">{{language("XIAZAI","下载")}}</iButton>
                    </div>
               </div>
                <!-- 自定义列表 -->
                <div class="table">
                    <table cellspacing="0" cellpadding="0">
                        <!-- 一级表头 -->
                        <tr class="theadBgcolor blod thead1">
                            <td><div>#</div></td>
                            <td><div>供应商名称</div></td>
                            <td><div>总体KPI</div></td>
                            <template v-for="(x,index) in tittleData">
                            <td
                            :key="index"
                            :colspan="x.isShowChildren?computedOneClonNum(x):'1'"><div>{{x.name}}
                                <i v-if="x.children.length>0" class="el-icon-minus" @click="handleFoldCell('1',index)"></i></div>
                            </td>
                            </template>
                        </tr>
                        <!-- 二级表头 -->
                        <tr class="theadBgcolor thead2">
                            <td colspan="3"></td>
                            <template v-for="(t,tindex) in tittleData">
                                <td :key="tindex+'cell2'"><div></div></td>
                                <template v-for="(lev2,index) in t.children">
                                <td 
                                v-if="lev2.isShowChildren"
                                :key="index+'lev2'"
                                :class="index<t.children.length-1?'lev1dashed':'halfWidth leftline'"
                                :colspan="lev2.children.length+1">
                                <div>{{lev2.name}}
                                 <i v-if="lev2.children.length>0" class="el-icon-minus" @click="handleFoldCell('2',tindex,index,)"></i>
                                </div>
                                </td>
                                </template>
                            </template>
                        </tr>
                        <!-- 三级表头 -->
                        <tr class="theadBgcolor thead3">
                            <td colspan="3"></td>
                            <template v-for="one in tittleData">
                                <template v-for="(two,tindex) in one.children">
                                    <template v-for="(three,index) in two.children">
                                        <template v-if="index==0 && tindex==0 && isLastData()">
                                        <td :key="index+'c3-1'"><div></div></td>
                                        <td :key="index+'c3-2'"><div></div></td>
                                        </template>
                                        <td :key="index+'c3-2'" v-if="index==0 && tindex!=0"><div></div></td>
                                        <td  
                                        v-if="three.isShowChildren"
                                        :key="index" 
                                        :class="index<two.children.length-1?'lev1dashed':'halfWidth leftline'">
                                            <div>{{three.name}}</div>
                                        </td>
                                    </template>
                                    
                                </template>
                            </template>
                        </tr>
                        <!-- 数据列表 -->
                        <tr v-for="(x,index) in allData" :key="index">
                            <td><div>
                                <!-- <el-checkbox v-model="x.checked" :label="x.checked" @change="changeStatus(x)"></el-checkbox> -->
                                {{(index+1)+(ipagnation.pageNo-1)*ipagnation.pageSize}}
                            </div></td>
                            <td><div>{{x.nameZh}}</div></td>
                            <td><div>{{x.all}}</div></td>
                            <template v-for="(lv1,index1) in x.list">
                                 <td :key="index1+'l1'"><div>{{lv1.score}}</div></td>
                                 <template v-if="lv1.isShowChildren"><!-- 隐藏一级 -->
                                    <template v-for="(lv2,index2) in lv1.children">
                                        <td :key="index2+'l2'"><div>{{lv2.score}}</div></td>
                                        <template v-for="(lv3,index3) in lv2.children">
                                        <td :key="index3+'l3'"><div>{{lv3.score}}</div></td>
                                        </template>
                                    </template>
                                </template>
                                
                            </template>
                            <td></td>
                        </tr>
                    </table>
                </div>

                <!-- 分页标签 -->
                <iPagination
                  v-update
                  @size-change="handleSizeChange($event)"
                  @current-change="handleCurrentChange($event)"
                  background
                  :current-page="ipagnation.pageNo"
                  :page-sizes="page.pageSizes"
                  :page-size="page.pageSize"
                  :layout="page.layout"
                  :total="page.totalCount"
                >
                </iPagination>
           </iCard>
           <div v-if="isShowDialog">
               <div class="lay"></div>
               <div class="upload dialog-box">
                   <div class="lay-head">
                       <div>上传</div>
                       <div class="el-icon-circle-close" @click="isShowDialog=fasle"></div>
                   </div>
                   <div>请选择对应打分模型的版本号</div>
                   <div style="margin:10px 0 26px 0;" >
                       <iSelect v-model="uploadVersion" @change="changeSelectVer()">
                           <el-option v-for="(x,index) in dropDownOptions"
                            :key="index" 
                            :label="x.value" 
                            :value="x.key"></el-option>
                       </iSelect>
                   </div>
                   <div class="dialog-button"><iButton @click="handleSure">{{language("QUEREN","确认")}}</iButton></div>
               </div>
           </div>
      </iPage>
  </div>
</template>

<script>
import {iButton,iPage,iCard,iInput,iSelect,iPagination} from 'rise'
import { pageMixins } from '@/utils/pageMixins'
import { kpiDetail,slelectkpiList,dowbloadAPI,templateDetail,uploadTemplate } from '@/api/kpiChart'
import publicHeaderMenu from './commonHeardNav/headerNav'
export default {
    mixins: [pageMixins],
    components:{
        iButton,
        iPage,
        iCard,
        iInput,
        iSelect,
        iPagination,
        slelectkpiList,
        publicHeaderMenu
    },
    data(){
        return {
            formData:{
                deptId:''
            },
            tittleData:[],
            allData:[{
                list:[]
            }],
            scoreList:[],
            selectOptions:[],
            selectValue:"",
            dropDownOptions:[],
            checked:false,
            isShowDialog:false,
            uploadVersion:'',
            file:null,
            ipagnation:{
                pageNo:1,
                pageSize:10
            }
        }
    },
    created(){
        //let userCode = this.$store.state.permission.userInfo.deptDTO.deptNum
         this.getSelectKpiList({deptCode:this.$store.state.permission.userInfo.deptDTO.deptNum})
      
    },
    mounted(){
        
    },
    methods:{
        getSelectKpiList(params){
            slelectkpiList(params).then(res=>{
                this.dropDownOptions=res.data
                if(this.dropDownOptions.length>0){
                    this.getTittleDetail(this.dropDownOptions[this.dropDownOptions.length-1].key)
                    this.selectValue=this.dropDownOptions[this.dropDownOptions.length-1].value
                }
            })
        },
        // 获取表格数据
        getDetail(templateId){
            kpiDetail({
            templateId: templateId,
            ...this.ipagnation}).then(res=>{
                if(res.code=="200"){
                    this.allData=JSON.parse(JSON.stringify(res.data))
                    this.allData.forEach(x=>{
                        x.checked=false
                        x.list.forEach(y=>{
                            y.isShowChildren=true
                            y.children.forEach(z=>{
                                z.isShowChildren=true
                                z.children.forEach(k=>{k.isShowChildren=true})
                            })
                        })
                    })
                    this.page.totalCount = res.total
                    this.ipagnation.pageNo = res.pageNum
                    this.ipagnation.pageSize = res.pageSize
                    console.log(this.allData)
                }
            })
        },
        handleFoldCell(x,index,index2){
           return
            if(x=='1'){         
                this.allData.forEach(y=>{
                    y.list[index].isShowChildren=!y.list[index].isShowChildren
                    y.list[index].children.forEach(z=>{
                        z.isShowChildren=!z.isShowChildren
                        z.children.forEach(k=>{k.isShowChildren=!k.isShowChildren})
                    })
                })
            }
            if(x=='2'){
                this.allData.forEach(y=>{
                    y.list[index].isShowChildren[index2]=!y.list[index].isShowChildren[index2]
                })
            }
            this.allData.splice(0,0)
            
        },
        // 计算一级合并单元格数量
        computedOneClonNum(data){
            let count = 0
            let allCount = 0
            if(data.children.length>0){
                count = data.children.length
                count +=1
                data.children.forEach((x,index) => {
                    if(index==0){
                      allCount+=x.children.length   
                      allCount+=2  
                    }else{
                        allCount+=x.children.length   
                      allCount+=1 
                    }
                     
                });

                if(count>allCount){
                    return count
                }else{
                    return allCount
                }
            }else{
                return 1
            }
            
        },
        handleChange(){
            this.getTittleDetail(this.selectValue)
            this.getDetail(this.selectValue)
        },
        handleupLoad(){
           this.isShowDialog=true
        },
        changeSelectVer(){
            let link = document.querySelector("#file")
            link.click()
        },
        upfileChange(e){
           this.file = e.target.files[0]
        },
        handleSure(){
            if(this.uploadVersion){
                let formdata = new FormData()
                formdata.append('file',this.file)
                formdata.append('templateId',this.uploadVersion)
                uploadTemplate(formdata).then(res=>{
                    if(res.code=="200"){
                        this.isShowDialog=false
                    }
                })
            //    let  formData = new FormData()
            //     formData.append('file', fileInput.files[0])
            }else{
                this.$message({
                message: '请选择版本',
                type: 'warning'
                })
            }
        },
        handleDownload(){
            let name =""
            this.dropDownOptions.forEach(x=>{
                if(x.key==this.selectValue){
                    name =x.value
                }
            })
            dowbloadAPI({templateId:this.selectValue}).then(res=>{
               let URL = window.URL || window.webkitURL;
                let objectUrl = URL.createObjectURL(res);
                let a = document.createElement('a');
                a.href = objectUrl; 
                a.download = `${name}.xls`; 
                document.body.appendChild(a);
                a.click();
                a.remove();
            })
        },
        changeStatus(x){
           x.checked=!x.checked
        },
        isLastData(){
            let count = 0
            this.tittleData.forEach(x=>{
                if(x.isShowChildren){
                    count+=1
                }
            })
            if(count>1){
                return true
            }else{
                return true
            }
        },
        // 获取表头
        getTittleDetail(x){
            templateDetail({pageNo: 1,
            pageSize: 100,
            templateId: x}).then(res=>{
                if(res.code=="200"){
                    this.tittleData=JSON.parse(JSON.stringify(res.data))
                    this.tittleData.forEach(x=>{
                        x.isShowChildren=true
                        x.children.forEach(z=>{
                            z.isShowChildren=true
                            z.children.forEach(k=>{k.isShowChildren=true})
                        })
                    })
                }
            })

        },
        // //改变page操作
        handleSizeChange(event) {
        this.ipagnation.pageSize = event
        this.getDetail(this.selectValue)
        },
        handleCurrentChange(event) {
            console.log(event)
            this.ipagnation.pageNo = event
            this.getDetail(this.selectValue)
        },
    }
}
</script>

<style lang="scss" scoped>
    .imgkpi-head{
        display: flex;
        justify-content: space-between;
    }
    
    .top{
        display: flex;
        justify-content: space-between;
        .searchOptions{
            display: flex;
            justify-content: flex-start;
            align-items: center;
        }
        .rotate{
            transform: rotate(180deg);
            color: #A0BFFC;
            margin-left: 10px;
        }
        .closed{
            font-size: 24px;
            color: #A0BFFC;
            cursor: pointer;
        }
    }

    .table{
        width:100%;
        height: calc(100vh - 340px);
        overflow: auto;
        table{
            margin-top: 20px;
            position: relative;
            table-layout:fixed;
            white-space: nowrap;
            // width: 100%;
            height:100px;
            background-color: #fff;
            tr{
                td{
                    position: relative;
                    height: 50px;
                    text-align: left;
                    border-bottom: 2px solid #fff;
                    padding-left: 40px;
                    div{
                        position: relative;
                      width: 100px;  
                      height: 50px;
                      overflow: hidden;
                      line-height: 50px;
                      z-index: 999;
                    }
                    
                }
            //    td:first-child{
            //         padding-left: 40px;
            //     }
                td:last-child{
                    padding-right: 40px;
                }
            }
        }
    }
    .theadBgcolor{
        background: rgba(22,96,241, 0.1);
        color: #000;
    }
    .blod{
        font-weight: bold;
         td:first-child{
                border-top-left-radius: 10px;
                }
                td:last-child{
                    border-top-right-radius: 10px;
                }
    }
    .el-icon-plus{
                color: #fff;
                background: #1763F7;
                cursor: pointer;
                border-radius: 4px;
            }
            .el-icon-minus{
                color: #fff;
                background: #1763F7;
                cursor: pointer;
                border-radius: 4px;
            }
    
    .lev1dashed::after{
        position: absolute;
        content: '';
        width:100%;
        top:-25px;
        border-top: 1px dashed #1660F1;
        left: 0;
    }
    .lev1dashed::before{
        position: absolute;
        content: '';
        width:100%;
        top:-25px;
        border-left: 1px dashed #1660F1;
        height: 40px;
        left: 75px;
    }
    .leftline::after{
        position: absolute;
        content: '';
        width:75px;
        top:-25px;
        border-top: 1px dashed #1660F1;
        left: 0;
    }
    .halfWidth::before{
        position: absolute;
        content: '';
        width:100%;
        top:-25px;
        border-left: 1px dashed #1660F1;
        height: 40px;
        left: 75px;
    }
    .lay{
        position: absolute;
        top: 0;
        right: 0;
        width: 100%;
        height: 100%;
        background-color: #5D5D5D;
        opacity: 0.2;
        z-index: 1;
    }
    .upload{
        width: 390px;
        background: #FFFFFF;
        border-radius: 10px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        z-index: 999;
    }
    .lay-head{
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
        .el-icon-circle-close{
            font-size: 24px;
            color: #A0BFFC;
            cursor: pointer;
        }
    }
    .dialog-box{
        padding: 30px;
    }
    .dialog-button{
        display: flex;
        justify-content: flex-end;
    }
</style>