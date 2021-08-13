<!--
 * @Author: wentliao
 * @Date: 2021-05-20 14:19:02
 * @Description: 定点管理详情页顶部步骤栏以公用头部
-->
<template>
    <div class="designateStep">
        <!-- 顶部信息栏 -->
        <div class="pageTitle flex-between-center-center">
            <div class="flex flex-between-center-center">
                <span class="title-text margin-left10">定点管理: 51017456</span>
                <span class="select-text margin-left10">定点申请类型：</span>
                <iSelect v-model="designateType">
                    <el-option
                    :value="item.id"
                    :label="item.name"
                    v-for="(item, index) in applyType"
                    :key="index"
                    ></el-option>
                </iSelect>
            </div>
            <div class="btnList flex-align-center">
                <iButton >导出</iButton>
                <iButton >提交</iButton>
                <iButton v-if="isDecision" @click="preview">预览</iButton>
                <logButton class="margin-left20" @click="log"  />
                <span class="title-font margin-left20"><icon symbol name="icondatabaseweixuanzhong"></icon></span>
            </div>
        </div>
        <!-- 步骤栏 -->
        <div class="step-list flex-between-center-center margin-top30 margin-bottom30">
            <div class="step-list-item flex-center-center" v-for="(item,index) in applyStep" :key="'applyStep'+index">
                <div>
                    <icon symbol name="dingdianguanlijiedian-jinhangzhong" class="step-icon"></icon>
                    <p class="step-text">{{item.name}}</p>
                </div>
                <icon v-if="index+1 !== applyStep.length" symbol name="liuchengjiedianyiwancheng1" class="step-icon"></icon>
            </div>
        </div>
    </div>
</template>

<script>
import {
  iButton,
  icon,
  iSelect,
} from 'rise';
import logButton from '@/components/logButton'
import { applyType,applyStep } from './data'
export default {
    name:'designateStep',
    components:{
        iButton,
        logButton,
        icon,
        iSelect,
    },
    props:{
        status: {
            type: String,
            default: '1',
            isDecision:false,
        },
    },
    created(){
        // 判断当前路由是否是决策资料相关路由 是则显示预览按钮
        const { path } = this.$route;
        this.isDecision = path.indexOf('/designate/decisiondata/')>-1;

    },
    data(){
        return{
            designateType:'1',
            applyType:applyType,
            applyStep:applyStep
        }
    },
    methods:{
        // 预览
        preview(){
            this.$emit('preview');
        }
    }
}
</script>

<style lang="scss" scoped>
.designateStep{
    .pageTitle{
        .title-text{
            font-size: 20px;
            font-weight: bold;
            white-space: nowrap;
        }
        .select-text{
            font-size: 14px;
            white-space: nowrap;
        }
        .title-font{
            font-size: 20px;
        }
    }
    .step-list{
        .step-list-item{
            flex-grow: 1;
            text-align: center;
            .step-text{
                font-size: 20px;
                color: #41434A;
                font-weight: bold;
                margin-top: 14px;
            }
            .step-icon{
                width: 36px;
                height: 36px;
            }
        }
    }
}
</style>