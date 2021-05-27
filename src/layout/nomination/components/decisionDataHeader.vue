<!--
 * @Author: wentliao
 * @Date: 2021-05-20 17:56:11
 * @Description: 决策资料的公共header
-->

<template>
    <div :class="isPreview=='1' ? 'decision-header preview-header' : 'decision-header'">
        <p v-if="isPreview=='1'" class="preview-title margin-bottom20">CSC Nomination Recommendation</p>
        <div  class="tab-list">
            <iTabsList v-if="isPreview=='1'"  v-model=defaultTab @tab-click="handleClick">
                <el-tab-pane v-for="(item,index) in decisionType" :key="'decisionType'+index" :label="item.name" :name="item.path"></el-tab-pane>
            </iTabsList>
             <iTabsList v-else type="card"  v-model=defaultTab @tab-click="handleClick">
                <el-tab-pane v-for="(item,index) in decisionType" :key="'decisionType'+index" :label="item.name" :name="item.path"></el-tab-pane>
            </iTabsList>
        </div>


        <!-- 关闭预览按钮 -->
        <span class="tab-icon" v-if="isPreview=='1'" @click="close"><icon symbol name="guanbixiaoxiliebiaokapiannei"></icon></span>
        <!-- 设置按钮 -->
        <span class="tab-icon" v-else><icon symbol name="Setting"></icon></span>
    </div>
</template>

<script>
import {
  iTabsList,
  icon,
} from "rise";
import { decisionType } from './data'
export default {
    name:'decisionDataHeader',
    components:{
        iTabsList,
        icon,
    },
    props:{
        isPreview:{
            type: String,
            default:'0'
        }
    },
    data(){
        return{
            decisionType:decisionType,
            defaultTab:'Title',
        }
    },
    mounted(){
        // 根据当前路由设置defaultTab
        const { path } = this.$route;
        // 解决刷新页面时当前tab的高亮条歪了的情况
        setTimeout(()=>{
            this.defaultTab = path;
        },50)
        
    },
    methods:{
        // tab切换
        handleClick(tab){
            const { query } =  this.$route;
            const { name='Title' } = tab;
            this.$router.push({
                path: name,
                query,
            });
        },

        // 关闭预览
        close(){
            const { query,path } =  this.$route;
            console.log(this.$route);
            this.$router.push({
                path,
                query:{
                    ...query,
                    isPreview:'0'
                },
            });
        }
    }
}
</script>

<style lang="scss" scoped>
    .decision-header{
        padding: 20px 30px;
        position: relative;
        ::v-deep.el-tabs__nav-scroll{
				overflow: hidden;
			}
        .tab-list{
            width: calc(100% - 50px);
        }
        .tab-icon{
                width: 20px;
                height: 20px;
                border:1px solid red;
                position: absolute;
                right: 40px;
                top: 30px;
            }
        &.preview-header{
            background-color: #fff;
            box-shadow: $btn-box-shadow;
            border-top-left-radius: 6px;
            border-top-right-radius: 6px;
        }
        .preview-title{
            font-size: 20px;
            font-weight: bold;
        }
    }

</style>