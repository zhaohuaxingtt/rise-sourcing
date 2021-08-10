<template>
  <div>
      <iPage>
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
                        <a type="file" id="file" style="display:none"></a>
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
                            <template v-for="(x,index) in allData[0].list">
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
                            <template v-for="(t,tindex) in allData[0].list">
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
                            <template v-for="one in allData[0].list">
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
                            <!-- <td>{{(index+1)+(page.currPage-1)*pageSize}}</td> -->
                            <td><div>
                                <el-checkbox v-model="x.checked" :label="x.checked" @change="changeStatus(x)">{{index+1}}</el-checkbox>
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
                  :current-page="page.currPage"
                  :page-sizes="page.pageSizes"
                  :page-size="page.pageSize"
                  :layout="page.layout"
                  :total="page.totalCount"
                >
                </iPagination>
           </iCard>
      </iPage>
  </div>
</template>

<script>
import {iButton,iPage,iCard,iInput,iSelect,iPagination} from 'rise'
import { pageMixins } from '@/utils/pageMixins'
import { kpiDetail,slelectkpiList,dowbloadAPI } from '@/api/kpiChart'

export default {
    mixins: [pageMixins],
    components:{
        iButton,
        iPage,
        iCard,
        iInput,
        iSelect,
        iPagination,
        slelectkpiList
    },
    data(){
        return {
            formData:{
                deptId:''
            },
            allData:[{
                list:[]
            }],
            scoreList:[],
            selectOptions:[],
            selectValue:"",
            dropDownOptions:[],
            checked:false
        }
    },
    created(){
        //let userCode = this.$store.state.permission.userInfo.deptDTO.deptNum
         this.getSelectKpiList({deptCode:'MQ'})
      
    },
    mounted(){
       this.getDetail("1")
    },
    methods:{
        getSelectKpiList(params){
            slelectkpiList(params).then(res=>{
                this.dropDownOptions=res.data
            })
        },
        getDetail(templateId){
            kpiDetail({pageNo: 1,
            pageSize: 100,
            templateId: templateId}).then(res=>{
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
            this.getDetail(this.selectValue)
        },
        handleupLoad(){
           
        },
        handleDownload(){
            dowbloadAPI({templateId:"1"}).then(res=>{
               let URL = window.URL || window.webkitURL;
                let objectUrl = URL.createObjectURL(res);
                let a = document.createElement('a');
                a.href = objectUrl; 
                a.download = "kpi.xls"; 
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
            this.allData[0].list.forEach(x=>{
                if(x.isShowChildren){
                    count+=1
                }
            })
            if(count>1){
                return true
            }else{
                return true
            }
        }
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
        overflow-x: auto;
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
</style>