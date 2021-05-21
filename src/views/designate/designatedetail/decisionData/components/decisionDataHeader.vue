<!--
 * @Author: wentliao
 * @Date: 2021-05-20 17:56:11
 * @Description: 决策资料的公共header
-->

<template>
    <iTabsList v-model=defaultTab>
        <el-tab-pane v-for="(item,index) in decisionType" :key="'decisionType'+index" :label="item.name" :name="item.key"></el-tab-pane>
    </iTabsList>
</template>

<script>
import {
  iTabsList
} from "rise";
import { decisionType } from './data'
export default {
    name:'decisionDataHeader',
    components:{
        iTabsList,
    },
    data(){
        return{
            decisionType:decisionType,
            defaultTab:'Title'
        }
    }
}
</script>

<style>

</style>
