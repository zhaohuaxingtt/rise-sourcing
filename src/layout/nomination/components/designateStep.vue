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
                <span class="title-text margin-left10">{{$t('nominationLanguage.DingDianGuanLi')}}: 51017456</span>
                <span class="select-text margin-left10">{{$t('nominationLanguage.DINGDIANSHENQINGLEIXING')}}：</span>
                <iSelect v-model="designateType" @change="onDesignateTypeChange" :disabled="designateTypeDisabled">
                    <el-option
                    :value="item.id"
                    :label="$t(item.key) || item.name"
                    v-for="(item, index) in applyType"
                    :key="index"
                    ></el-option>
                </iSelect>
            </div>
            <div class="btnList flex-align-center">
                <iButton >{{$t('LK_DAOCHU')}}</iButton>
                <iButton @click="submit">{{$t('LK_TIJIAO')}}</iButton>
                <iButton v-if="isDecision" @click="preview">{{$t('LK_YULAN')}}</iButton>
                <logButton class="margin-left20" @click="log"  />
                <span class="title-font margin-left20"><icon symbol name="icondatabaseweixuanzhong"></icon></span>
            </div>
        </div>
        <!-- 步骤栏 -->
        <div class="step-list flex-between-center-center margin-top30 margin-bottom30">
            <div class="step-list-item flex-center-center" v-for="(item,index) in applyStep" :key="'applyStep'+index">
                <div :class="phaseType >=item.id ? 'click-item step-list-item' : 'step-list-item' " @click="goToRoute(item)">
                    <p class="step-icon-box">
                        <!-- 正在进行中 -->
                        <icon v-if="phaseType == item.id" symbol name="icondingdianguanlijiedian-jinhangzhong"  class="step-icon"></icon> 
                        <!-- 已完成 -->
                        <icon v-else-if="phaseType > item.id" symbol name="icondingdianguanli-yiwancheng" class="step-icon  click-icon"></icon>
                        <!-- 未完成 -->
                        <icon v-else symbol name="icondingdianguanlijiedian-yiwancheng" class="step-icon"></icon>
                    </p>
                    
                    <p class="step-text">{{$t(item.key) || item.name}}</p>
                </div>
                <p v-if="index+1 !== applyStep.length" class="margin-bottom30" >
                    <!-- 正在进行中 -->
                    <icon v-if="phaseType == item.id" symbol name="icondingdianguanlizhou-zhengzaijinhang" class="step-between-icon"></icon>
                    <!-- 已完成 -->
                    <icon v-else-if="phaseType > item.id" symbol name="iconliuchengjiedianyiwancheng1" class="step-between-icon"></icon>
                    <!-- 未完成 -->
                    <icon v-else symbol name="icondingdianguanlizhou-weiwancheng" class="step-between-icon"></icon>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import {
  iButton,
  icon,
  iSelect,
} from "rise";
import logButton from '@/views/partsign/editordetail/components/logButton'
import { 
    nominateAppSsubmit,
    nominateAppSDetail,
} from '@/api/designate'
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
        const { path,query } = this.$route;
        const {id ='1'} = query;
        this.isDecision = path.indexOf('/designate/decisiondata/')>-1;

        this.getStepStatus(id);
        this.getDesignateType(id);

    },
     computed:{
        phaseType(){
            return this.$store.getters.phaseType;
        }
    },
    data(){
        return{
            designateType:'MEETING',
            applyType:applyType,
            applyStep:applyStep,
            designateTypeDisabled:true,
        }
    },
    methods:{
        // 预览
        preview(){
            const {path,query} = this.$route;
            console.log(path);
            this.$router.push({
              path,
              query: {
                ...query,
                isPreview:'1'
              }
            })
        },
        onDesignateTypeChange(data) {
            // 缓存/更新定点申请类型
            this.$store.dispatch('setNominationType', data)
        },

        // 获取步骤状态
        async getStepStatus(nominateId){
            const data= {nominateId};
            await this.$store.dispatch('setNominationStep',data);
        },

        // 跳转
        goToRoute(item){
            if(this.phaseType < item.id) return;
            const {path,query} = this.$route;
            if(item.path === path ) return;
            this.$router.push({
              path:item.path,
              query: {
                ...query,
              }
            })
        },

        // 提交
        submit(){
            const { query } = this.$route;
            const {id ='1'} = query;
            const data = {
                nominateAppId:id,
            }
            nominateAppSsubmit(data).then((res)=>{
                console.log(res);
            })
        },

        // 获取定点管理详情 --- 取定点申请类型字段
        getDesignateType(nominateAppId){ 
            const data = {nominateAppId,};
            nominateAppSDetail(data).then((res)=>{
                console.log(res);
                const {code,data} = res;
                if(code === '200' && data){
                    const { nominateProcessType } = data;
                    this.designateType = nominateProcessType || 'MEETING';
                }
            })
        },

    }
}
</script>

<style lang="scss" scoped>
.designateStep{
    padding: 0 50px;
    .pageTitle{
        .title-text{
            font-size: 20px;
            font-weight: bold;
            white-space: nowrap;
            margin-bottom: 10px;
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
            position: relative;
            flex-grow: 1;
            text-align: center;
            .step-list-item{
                width: 80px;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                .step-icon-box{
                    width: 100%;
                }
            }
            .step-text{
                font-size: 20px;
                color: #41434A;
                font-weight: bold;
                margin-top: 14px;
                white-space: nowrap;
                text-align: center;
            }
            .step-icon{
                width: 36px;
                height: 36px;
            }
            .click-item{
                &:hover{
                    cursor: pointer;
                }
            }
            .step-between-icon{
                width: 100%;
                padding: 0 5px;
            }
        }
    }
}
</style>