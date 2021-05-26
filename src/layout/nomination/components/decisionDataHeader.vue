<!--
 * @Author: wentliao
 * @Date: 2021-05-20 17:56:11
 * @Description: 决策资料的公共header
-->

<template>
    <div class="decision-header">
        <iTabsList type="card"  v-model=defaultTab @tab-click="handleClick" class="tab-list">
            <el-tab-pane v-for="(item,index) in decisionType" :key="'decisionType'+index" :label="item.name" :name="item.path"></el-tab-pane>
        </iTabsList>
        <!-- 设置按钮 -->
        <span><icon symbol name="Setting" class="tab-icon"></icon></span>
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
            console.log(tab,'handleClickhandleClick');
            const { name='Title' } = tab;
            this.$router.push({
                path: name,
            });
        }
    }
}
</script>

<style lang="scss" scoped>
    .decision-header{
        width: calc(100% - 50px);
        position: relative;
        ::v-deep.el-tabs__nav-scroll{
				overflow: hidden;
			}
        .tab-icon{
                width: 20px;
                height: 20px;
                border:1px solid red;
                position: absolute;
                right: -40px;
                bottom: 0;
            }
    }

</style>
