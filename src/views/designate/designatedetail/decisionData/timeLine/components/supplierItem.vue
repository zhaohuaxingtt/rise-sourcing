<!--
 * @Author: wentliao
 * @Date: 2021-05-27 14:51:55
 * @Description: timeline编辑状态下的供应商编辑栏
-->

<template>
    <div class="supplierItem flex padding-bottom50">
        <span class="title">{{supplierData.supplierName || '-'}}</span>
        <div>
            <ul class="title-line flex">
                <li class="flex" v-for="(item,index) in supplierData.nomiTimeAxisSuppliers" :key="'titleLine_'+index">
                    <span class="line-label">{{item.durationName}}</span>
                    <iDatePicker
                        class="data-picker" 
                        v-model="item.nodeDate"
                        format="yyyy-MM-dd" 
                        value-format="timestamp"
                    />
                    <!-- <iInput class="line-input" v-model="supplierData[item['key']]"/> -->
                </li>
            </ul>
            <ul v-if="supplierData['nomiTimeAxisSupplierExps'] && supplierData['nomiTimeAxisSupplierExps'].length" class="date-line">
                <template  v-for="(supplieritem,supplierIndex) in supplierData.nomiTimeAxisSupplierExps" >
                    <li v-if="!supplieritem.isDelete" class="flex" :key="'supplierData_'+supplierIndex">
                        <iInput v-model="supplieritem.durationName"  class="date-input"/>
                        <iDatePicker
                            class="data-picker" 
                            v-model="supplieritem.rangeDate"
                            type="daterange"
                            range-separator="-"
                            :start-placeholder="language('LK_KAISHISHIJIAN','开始日期')"
                            :end-placeholder="language('LK_JIESHUSHIJIAN','结束日期')"
                            format="yyyy-MM-dd" 
                            value-format="timestamp"
                            @blur="changeDate(supplieritem)"
                        />

                        <!-- 删除按钮 -->
                        <span class="delete" @click="edit('delete',itemIndex,supplierIndex)"><icon class="delete-icon" symbol name="icondingdianshenqingyusheluoji-shanchu" /></span>
                    </li>
                 </template>
            </ul>
        </div>
        <p class="btn-list">
            <span class="add" @click="edit('add',itemIndex)"><icon class="add-icon" symbol name="iconTimeLine_tianjiagongyingshang" /></span>
        </p>
        
    </div>
</template>
<script>
import {
    iInput,
    iDatePicker,
    icon,
} from 'rise';
export default {
    name:'supplierItem',
    components:{
        iInput,
        iDatePicker,
        icon,
    },
    props:{
        supplierData:{
            type:Object,
            default:()=>{},
        },
        itemIndex:{
            type:Number,
            default:0,
        },
        cardIndex:{
            type:Number,
            default:0,
        }
    },
    data(){
        return{
            titleLine:[
                {key:'a',name:'1st Try Out'},
                {key:'b',name:'OTS'},
                {key:'c',name:'EM'},
                {key:'d',name:'SOP'},
            ]
        }
    },
    methods:{
        // 编辑行
        edit(type,index,line=null){
            const { 
                cardIndex,
                supplierData,
            } = this;
            if(type == 'add'){
                supplierData.nomiTimeAxisSupplierExps.push({
                     durationName:'',rangeDate:[],beginDate:'',endDate:'',isDelete:false,
                });

            }else if(type == 'delete'){
                supplierData.nomiTimeAxisSupplierExps[line].isDelete = true;
                //  supplierData.nomiTimeAxisSupplierExps.splice(line,1);
            }
        },

        // change区间日期
        changeDate(item){
            item.beginDate = item['rangeDate'][0];
            item.endDate = item['rangeDate'][1];
            console.log(item,'itemitemitemitemitem');
        },
        
    }
}
</script>

<style lang="scss" scoped>
    .supplierItem{
        position: relative;
        .title{
            font-size: 18px;
            color: #41434A;
            font-weight: bold;
            margin-right: 55px;
        }
        .title-line{
            li{
                align-items: center;
                margin-right: 35px;
                margin-bottom: 30px;
                .line-label{
                    white-space: nowrap;
                    margin-right: 10px;
                }
                .line-input{
                    width: 60px;
                }
                // &:nth-child(2){
                //     margin-right: 100px;
                // }
            }
        }
        .date-line{
            li{
                .date-input{
                    width: 268px; 
                    margin-right: 100px;
                    margin-bottom: 15px;
                }
                .delete{
                    margin-left: 15px;
                    display:inline-block;
                    margin-top: 10px;
                    .delete-icon{
                        width: 20px;
                        height: 20px;
                    }
                }
            }   
        }
        .btn-list{
            text-align: left;
            position: absolute;
            left: 10px;
            bottom: 30px;
            span{
                display:inline-block;
                .add-icon{
                    width: 20px;
                    height: 20px;
                }
            }
        }
    }
</style>
