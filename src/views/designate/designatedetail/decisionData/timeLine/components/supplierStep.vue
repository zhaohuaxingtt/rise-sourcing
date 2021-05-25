<!--
 * @Author: wentliao
 * @Date: 2021-05-24 16:18:45
 * @Description: timeline供应商步骤显示
-->
<template>
    <ul class="supplierStep-list flex">
        <li class="flex-align-center" v-for="(item,index) in supplierStepList" :key="'supplierStep_'+index">
            <icon symbol name="TimeLine-Today" class="step-icon"></icon>
            <div>
                <p class="title">{{item.title}}</p>
                <p class="tips">{{item.tips}}</p>
            </div>
        </li>
    </ul>
</template>

<script>
import {
  icon,
} from "rise";
import { supplierStepList } from './data'
export default {
    name:'supplierStep',
    components:{
        icon,
    },
    data(){
        return{
            supplierStepList:supplierStepList,
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
                border: 1px solid red;
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
