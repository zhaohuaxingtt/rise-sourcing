<template>
  <div>
      <iPage>
           <iCard style="margin-top:20px">
               <div class="top">
                   <div class="searchOptions">
                        <el-form>
                            <el-row>
                                <el-col>
                                        <iSelect>
                                            <option></option>
                                        </iSelect>
                                </el-col>
                            </el-row>
                        </el-form>
                    </div>
                    <div>
                        <iButton>{{language("SHANGCHUAN","上传")}}</iButton>
                        <iButton>{{language("XIAZAI","下载")}}</iButton>
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
                            <td v-for="(x,index) in allData" 
                            :key="index"
                            :colspan="computedOneClonNum(x)"><div>{{x.name}}
                                <i v-if="x.children.length>0" class="el-icon-minus" @click="handleFoldCell"></i></div>
                            </td>
                        </tr>
                        <!-- 二级表头 -->
                        <tr class="theadBgcolor thead2">
                            <td colspan="3"></td>
                            <template v-for="(t,tindex) in allData">
                                <td :key="tindex+'cell2'"><div></div></td>
                                <td v-for="(lev2,index) in t.children" 
                                :key="index+'lev2'"
                                :class="index<t.children.length-1?'lev1dashed':'halfWidth'"
                                :colspan="lev2.children.length+1">
                                <div>{{lev2.name}}
                                 <i v-if="lev2.children.length>0" class="el-icon-minus" @click="handleFoldCell"></i>
                                </div>
                                </td>
                            </template>
                        </tr>
                        <!-- 三级表头 -->
                        <tr class="theadBgcolor thead3">
                            <td colspan="3"></td>
                            <template v-for="one in allData">
                                <template v-for="(two,tindex) in one.children">
                                    <template v-for="(three,index) in two.children">
                                        <template v-if="index==0 && tindex==0">
                                        <td :key="index+'c3-1'"><div></div></td>
                                        <td :key="index+'c3-2'"><div></div></td>
                                        </template>
                                        <td :key="index+'c3-2'" v-if="index==0 && tindex!=0"><div></div></td>
                                        <td 
                                        :key="index" 
                                        :class="index<two.children.length-1?'lev1dashed':'halfWidth'">
                                            <div>{{three.name}}</div>
                                        </td>
                                    </template>
                                    
                                </template>
                            </template>
                        </tr>
                        <!-- 数据列表 -->
                        <tr>
                            <td></td>
                        </tr>
                    </table>
                </div>
           </iCard>
      </iPage>
  </div>
</template>

<script>
import {iButton,iPage,iCard,iInput,iSelect,iTableCustom} from 'rise'
export default {
    components:{
        iButton,
        iPage,
        iCard,
        iInput,
        iSelect,
        iTableCustom
    },
    data(){
        return {
            formData:{
                deptId:''
            },
            allData:[{
            id: "1",
            name: "指标1",
            score: 91.6,
            sort: 1,
            children: [
                {
                id: "2",
                name: "指标1-1",
                score: 86,
                sort: 1,
                children: [
                    {
                    id: "4",
                    name: "指标1-1-1",
                    score: 80,
                    sort: 1,
                    children: [],
                    },
                    {
                    id: "6",
                    name: "指标1-1-2",
                    score: 100,
                    sort: 2,
                    children: [],
                    }
                ],
                },
                {
                id: "3",
                name: "指标1-2",
                score: 100,
                sort: 2,
                children: [
                    {
                    id: "5",
                    name: "指标1-2-1",
                    score: 90,
                    sort: 1,
                    children: [],
                    }
                ],
                }
            ],
        }]
        }
    },
    mounted(){
        for (let i = 0; i < 1; i++) {
            this.allData.push(this.allData[0])
        }
    },
    methods:{
        handleClosed(){
            this.$router.go(-1)
        },
        handleFoldCell(){
        
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
    .halfWidth::after{
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