<!--
 * @Author: wentliao
 * @Date: 2021-05-24 16:18:45
 * @Description: timeline供应商步骤显示
-->
<template>
    <ul class="supplierStep-list flex">
        <li class="flex-align-center" v-for="(item,index) in supplierData" :key="'supplierStep_'+index">
            <icon symbol name="iconTimeLine-Today" class="step-icon"></icon>
            <div>
                <p class="title">{{item.durationName}}</p>
                <p class="tips">{{item.nodeWeek ? ( getNodeYear(item.nodeDate) +'KW'+item.nodeWeek) :''}}</p>
            </div>
        </li>
    </ul>
</template>

<script>
import {
  icon,
} from "rise";
export default {
    name:'supplierStep',
    components:{
        icon,
    },
    props:{
        supplierData:{
            type:Array,
             default:()=>[],
        }
    },
    data(){
        return{
            supplierStepList:[],
        }
    },
    created(){
    },
    methods:{
        // 获取年份显示
        getNodeYear(nodeDate){
            if(!nodeDate) return '';
            const date = Number(nodeDate);
            const nodeYear = window.moment(date).year();
            if(nodeYear){
                return nodeYear+'-'
            }else{
                return ''
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .supplierStep-list{
        width: 900px;
        justify-content: space-around;
        li{
            .step-icon{
                width: 30px;
                height: 30px;
                margin-right: 15px;
            }
            p{
                text-align: center;
                &.title{
                    font-size: 16px;
                    color: #0D2451;
                    margin-bottom: 8px;
                }
                &.tips{
                    font-size: 14px;
                    color: #5F6F8F;
                }
            }
        }
    }

</style>
