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
        <div v-for="(item,index) in detailData" :key="'timeLine_'+index">
            <!-- 编辑状态 -->
            <div v-if="isEdit">
                <!--  -->
                <iCard collapse :title="item.materialGroupName"  class="timeLine-card">
                    <ul class="timeLine-edit-list">
                        <li class="flex-between-center margin-bottom20" v-for="(groupNode,groupNodeIndex) in item.nomiTimeAxisGroup" :key="'groupNodeEdit_'+groupNodeIndex">
                            <span class="show-icon">
                                <icon v-if="groupNode.isVisible" symbol name="iconxianshi" class="show-icon-item" ></icon>
                                <icon v-else symbol name="iconyincang" class="show-icon-item" ></icon>
                            </span>
                            <groupStep 
                                :groupNode="groupNode.nomiTimeAxisLine"
                                :stepList="stepList" 
                                :isEdit="true"
                                class="list-item-step"
                            />
                        </li>
                    </ul>
                    <!-- 供应商编辑列表 -->
                    <ul class="supplier-edit-list">
                        <!-- v-for="(supplierItem,supplierIndex) in item.nomiTimeAxisSupplierResultVOList" :key="'nomiTimeAxisSupplierResultVOList_'+supplierIndex" -->
                        <!-- <li v-for="(item,index) in supplierData" :key="'supplier-edit-list-'+index"> -->
                        <li  v-for="(supplierItem,supplierIndex) in item.nomiTimeAxisSupplierResultVOList" :key="'nomiTimeAxisSupplierResultVOListEdit_'+supplierIndex">
                            <supplierItem :itemIndex="supplierIndex" :supplierData="supplierItem" @editSupplierLine="editSupplierLine"/>
                        </li>
                    </ul>
                </iCard>
            </div>
            <!-- 展示状态 -->
            <div v-else>
                <iCard collapse :title="item.materialGroupName" class="timeLine-card">
                    <template v-for="(groupNode,groupNodeIndex) in item.nomiTimeAxisGroup">
                        <!-- :stepIndex='2' -->
                        <groupStep 
                            v-if="groupNode.isVisible"
                            :stepList="stepList"
                            :groupNode="groupNode.nomiTimeAxisLine"
                            :key="'groupNode_'+groupNodeIndex">
                            <template slot="myStep">
                                <icon symbol name="iconTimeLine-Today" class="step-icon" ></icon>
                                <p>Today</p>
                            </template>
                        </groupStep>
                    </template>
                    
                    <!-- 供应商card -->
                    <div class="supplier-list" v-for="(supplierItem,supplierIndex) in item.nomiTimeAxisSupplierResultVOList" :key="'nomiTimeAxisSupplierResultVOList_'+supplierIndex">
                        <iCard collapse :title="supplierItem.supplierName" class="supplier-item">
                            <template slot="header-control" >
                                <!-- <supplierStep :supplierData="supplierData"/> -->
                                <supplierStep :supplierData="supplierItem.nomiTimeAxisSuppliers"/>
                            </template>
                            <ul class="supplier-item-list">
                                <li class="flex-between-center" v-for="(supplierListItem,supplierListItemIndex) in supplierItem.nomiTimeAxisSupplierExps" :key="'supplier-item-'+supplierListItemIndex">
                                    <span class="supplier-item-name">{{supplierListItem.supplierNameZh}}</span>
                                    <div class="supplier-item-line">
                                        <supplierLine 
                                            :allList="supplierItem.nomiTimeAxisSupplierExps"
                                            :supplierIndex="supplierListItemIndex"
                                            :cardIndex="index"
                                        />
                                    </div>
                                </li>
                            </ul>
                        </iCard>
                    </div>
                </iCard>
            </div>
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
import { MockData } from './components/data'
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
            isEdit:true,
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
                
            ],
            MockData:MockData,
            detailData:[],
            
        }
    },
    created(){
        this.getDetail();

    },
    methods:{
        // 编辑 取消
        edit(){
            const {isEdit,stepList} = this;
            if(isEdit){
                stepList.map((item)=>{item.isEdit = false});
            }else{
                stepList.map((item)=>{
                    if(item.icon == 'iconTimeLine-CSCMeeting' || item.icon == 'iconTimeLine-BFConfirm'){
                        item.isEdit = true;
                        }
                    });
            }
            this.$store.dispatch('updateNominationStep',{nominateId:'1',phaseType:'1'});
            this.stepList = stepList;
            this.isEdit = !isEdit;
        },

        // 保存
        save(){
            console.log(this.detailData,'stepList');
        },

        // 新增删减供应商行
        editSupplierLine(type,card,index,line){
            console.log(type,card,index,line);
            const { supplierData=[],detailData=[] } = this;
            let newData = cloneDeep(detailData);
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

        // 获取timeLine详情
        getDetail(){
            const { MockData } = this;
            const { data } = MockData;
            this.detailData = data;
            // this.formatTime();
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