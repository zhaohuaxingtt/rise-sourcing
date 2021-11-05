<!--
 * @Author: wentliao
 * @Date: 2021-05-20 17:56:11
 * @Description: 决策资料的公共header
-->

<template>
    <iTabsList v-model=defaultTab @tab-click="handleClick">
        <el-tab-pane lazy v-for="(item,index) in decisionType" :key="'decisionType'+index" :label="item.name" :name="item.path"></el-tab-pane>
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
    props:{
        isPreview:{
            type: Boolean,
            default:false
        }
    },
    data(){
        return{
            decisionType:decisionType,
            defaultTab:'Title',
        }
    },
    created(){
        // 根据当前路由设置defaultTab
        const { path } = this.$route
        this.defaultTab = path;
    },
    methods:{
        // tab切换
        handleClick(tab){
            console.log(tab,'handleClickhandleClick');
            const { name='Title' } = tab;
            this.$router.push({
                path: name,
            });
        }
    }
}
</script>

<style>

</style>
