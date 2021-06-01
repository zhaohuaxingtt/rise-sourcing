<!--
 * @Author: wentliao
 * @Date: 2021-05-27 14:51:55
 * @Description: timeline编辑状态下的供应商编辑栏
-->

<template>
    <div class="supplierItem flex padding-bottom50">
        <span class="title">{{supplierData.name || '-'}}</span>
        <div>
            <ul class="title-line flex">
                <li class="flex" v-for="(item,index) in titleLine" :key="'titleLine_'+index">
                    <span class="line-label">{{item.name}}</span>
                    <iInput class="line-input" v-model="supplierData[item['key']]"/>
                </li>
            </ul>
            <ul v-if="supplierData['list'] && supplierData['list'].length" class="date-line">
                <li class="flex" v-for="(item,index) in supplierData.list" :key="'supplierData_'+index">
                    <iInput v-model="item.e"  class="date-input"/>
                    <iDatePicker
                    class="data-picker" 
                    v-model="item.date"
                    type="daterange"
                    range-separator="-"
                    :start-placeholder="$t('LK_KAISHISHIJIAN')"
                    :end-placeholder="$t('LK_JIESHUSHIJIAN')"
                    />

                    <!-- 删除按钮 -->
                    <span class="delete" @click="edit('delete',itemIndex,index)"><icon class="delete-icon" symbol name="icondingdianshenqingyusheluoji-shanchu" /></span>
                </li>
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
            this.$emit('editSupplierLine',type,index,line);
        }
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
                &:nth-child(2){
                    margin-right: 100px;
                }
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
