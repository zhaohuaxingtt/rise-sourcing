<!--
 * @Author: wentliao
 * @Date: 2021-05-24 11:39:32
 * @Description: 决策资料-timeLine
-->
<template>
    <div class="decision-data-timeLine">
        <!-- 按钮区域 -->
        <div class="timeLine-btn-list" v-if="isPreview=='0'">
            <span v-if="isEdit">
                <iButton @click="save">{{$t('LK_BAOCUN')}}</iButton>
                <iButton @click="edit">{{$t('LK_QUXIAO')}}</iButton>
                <iButton>{{$t('LK_ZHANSHI')}}</iButton>
            </span>
            <iButton v-else @click="edit">{{$t('LK_BIANJI')}}</iButton>
        </div>
        <!-- 编辑状态 -->
        <div v-if="isEdit">
            <!--  -->
            <iCard collapse title="Material Group 1" class="timeLine-card">
                <ul class="timeLine-edit-list">
                    <li class="flex-between-center margin-bottom20">
                        <span class="show-icon">
                            <!-- <icon symbol name="iconxianshi" class="show-icon-item" ></icon> -->
                            <icon symbol name="iconyincang" class="show-icon-item" ></icon>
                        </span>
                        <groupStep :stepList="stepList" class="list-item-step"/>
                    </li>
                </ul>
                <!-- 供应商编辑列表 -->
                <ul class="supplier-edit-list">
                    <li v-for="(item,index) in supplierData" :key="'supplier-edit-list-'+index">
                        <supplierItem :itemIndex="index" :supplierData="item" @editSupplierLine="editSupplierLine"/>
                    </li>
                </ul>
            </iCard>
        </div>
        <!-- 展示状态 -->
        <div v-else>
            <iCard collapse title="Material Group 1" class="timeLine-card">
                <groupStep :stepList="stepList" :stepIndex='2'>
                    <template slot="myStep">
                        <icon symbol name="iconTimeLine-Today" class="step-icon" ></icon>
                        <p>Today</p>
                    </template>
                </groupStep>
                <!-- 供应商card -->
                <div class="supplier-list">
                    <iCard collapse title="Supplier 1" class="supplier-item">
                        <template slot="header-control" >
                            <supplierStep :supplierData="supplierData"/>
                        </template>
                        <ul class="supplier-item-list">
                            <li class="flex-between-center" v-for="(item,index) in timeList" :key="'supplier-item-'+index">
                                <span class="supplier-item-name">Experiment 1</span>
                                <div class="supplier-item-line">
                                    <supplierLine 
                                        :dateTime="item.startDate +'-'+ item.endDate"
                                        :percent="item.percent+'%'"
                                        :left="item.distance+'%'"
                                    />
                                </div>
                            </li>
                        </ul>
                    </iCard>
                </div>
            </iCard>
        </div>
    </div>
</template>

<script>
import {
  iCard,
  iButton,
  icon,
} from "rise";
import { stepList } from './components/data'
import groupStep from './components/groupStep'
import supplierStep from './components/supplierStep'
import supplierLine from './components/supplierLine'
import supplierItem from './components/supplierItem'
import { cloneDeep } from 'lodash'
export default {
    name:'timeLine',
     components:{
        groupStep,
        supplierStep,
        supplierLine,
        supplierItem,
        iCard,
        iButton,
        icon,
    },
    data(){
        return{
            isEdit:false,
            timeList:[
                {startDate:1621048561,endDate:1621912561}, // 5-17 ---> 5-25
                {startDate:1621480561,endDate:1621998961}, // 5-20 ---> 5-26
                {startDate:1620616561,endDate:1621307761}, // 5-10 ---> 5-18
            ],
            stepList:stepList,
            supplierData:[
                {name:'供应商1',a:'1',b:'2',c:'3',d:'4',
                list:[
                    {e:'1-1',date:''},
                    {e:'1-2',date:''},
                    {e:'1-3',date:''},
                    {e:'1-4',date:''},
                ]},
                {name:'供应商2',a:'1',b:'2',c:'3',d:'4',
                list:[
                    {e:'55',date:''}
                ]}
                
            ]
            
        }
    },
    created(){
        this.formatTime();

    },
    methods:{
        // 重置下timeList
        formatTime(){
            const { timeList=[] } = this;
            let newList = [];
            timeList.map((item=>{newList.push(item.startDate,item.endDate)}));
            // 排序取出最小和最大时间
            let sortList = newList.sort((a,b)=>a-b);
            let start= sortList[0];
            let end= sortList[sortList.length-1];
            console.log(sortList,start,end);
            timeList.map((item)=>{
                //获取当前item占总进度条的百分比
                item.percent = ((item.endDate - item.startDate) / (end - start)) * 100;
                // 获取当前item与开始时间的差距
                item.distance = ((item.startDate - start) / (end - start)) * 100; 
            });
            this.timeList = timeList;
            console.log(timeList,'timeList');
            
        },
        
        // 编辑 取消
        edit(){
            const {isEdit,stepList} = this;
            if(isEdit){
                stepList.map((item)=>{item.isEdit = false});
            }else{
                stepList.map((item)=>{
                    if(item.icon == 'TimeLine-CSCMeeting' || item.icon == 'TimeLine-BFConfirm'){
                        item.isEdit = true;
                        }
                    });
            }
             this.$store.dispatch('updateNominationStep',{nominateId:'1',phaseType:'1'});
            this.isEdit = !isEdit;
        },

        // 保存
        save(){
            console.log(this.stepList,'stepList');
        },

        // 新增删减供应商行
        editSupplierLine(type,index,line){
            const { supplierData=[] } = this;
            let newData = cloneDeep(supplierData);
            // 新增行
            if(type === 'add'){
                newData[index].list.push({
                     e:'',date:''
                });
            }else if(type === 'delete'){
                newData[index]['list'].splice(line,1);
            }
            this.supplierData = newData;
        },
    },
    computed:{
        isPreview(){
            return this.$store.getters.isPreview;
        }
    },
}
</script>

<style lang="scss" scoped>
.decision-data-timeLine{
    .supplier-list{
        margin-top: 30px;
        .supplier-item{
            position: relative;
            ::v-deep .cardHeader{
                .collapse{
                    position: absolute;
                    left: -5px;
                    top: 43px;
                }
            }
            .supplier-item-list{
                width: 100%;
                overflow: hidden;
                li{
                    padding: 25px 0;
                    align-items: center;
                    .supplier-item-name{
                        font-size: 16px;
                        color: #0D2451;
                    }
                    .supplier-item-line{
                        width: 900px;
                    }
                    &:not(:last-child){
                        border-bottom: 1px solid rgba($color: #707070, $alpha: 0.18);
                    }
                }
            }
        }
    }
    .timeLine-card{
        margin-bottom: 20px;
    }
    .timeLine-btn-list{
         margin-bottom: 20px;
         text-align: right;
    }
    .timeLine-edit-list{
        .show-icon{
            width: 100px;
            padding-top: 10px;
            .show-icon-item{
                width: 25px;
                height: 25px;
                margin-left: 20px;
            }
        }
        .list-item-step{
            flex: 1;
        }
    }
}
</style>