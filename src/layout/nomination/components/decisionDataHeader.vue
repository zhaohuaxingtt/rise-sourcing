<!--
 * @Author: wentliao
 * @Date: 2021-05-20 17:56:11
 * @Description: 决策资料的公共header
-->

<template>
    <div :class="isPreview=='1' ? 'decision-header preview-header' : 'decision-header'">
        <p v-if="isPreview=='1'" class="preview-title margin-top20 margin-bottom20">CSC Nomination Recommendation</p>
        <div  class="tab-list">
            <iTabsList v-if="isPreview=='1'"  v-model=defaultTab @tab-click="handleClick">
                <el-tab-pane lazy v-for="(item,index) in decisionType" :key="'decisionType'+index" :label="item.name" :name="item.path"></el-tab-pane>
            </iTabsList>
             <iTabsList v-else type="card"  v-model=defaultTab @tab-click="handleClick">
                <el-tab-pane lazy v-for="(item,index) in decisionType" :key="'decisionType'+index" :label="item.name" :name="item.path"></el-tab-pane>
            </iTabsList>
        </div>


        <!-- 关闭预览按钮 -->
        <span class="tab-icon" v-if="isPreview=='1'" @click="close">
            <icon symbol name="iconguanbixiaoxiliebiaokapiannei"></icon>
        </span>
        <!-- 设置按钮 -->
        <!-- 临时跳转的时候，当前步骤不在决策资料，不支持排序 -->
        <span class="tab-icon" @click="sortDialogVisibal = true" v-else-if="!isTemp" v-permission.auto="NOMINATION_NOMINATIONDETAILS_MOUDULES_SORT|定点管理详情菜单排序"><icon symbol name="iconSetting"></icon></span>
        <!-- 排序弹窗 -->
        <sortDialog :visible.sync="sortDialogVisibal" />
    </div>
</template>

<script>
import {
  iTabsList,
  icon,
} from "rise";
import {
    updatePresenPageSeat
} from '@/api/designate'
import { decisionType } from './data'
import sortDialog from './sortDialog'
import {mapGetters} from 'vuex'

export default {
    name:'decisionDataHeader',
    components:{
        iTabsList,
        icon,
        sortDialog
    },
    props:{
        isPreview:{
            type: String,
            default:'1'
        }
    },
    watch: {
        nominationStep() {
            this.init()
        }
    },
    data(){
        return{
            decisionType: [],
            defaultTab:'Title',
            sortDialogVisibal: false
        }
    },
    mounted(){
        // 根据当前路由设置defaultTab
        const { path } = this.$route;
        // 解决刷新页面时当前tab的高亮条歪了的情况
        setTimeout(()=>{
            // 临时跳转的时候，直接取前端写死的配置
            if (this.isTemp) this.decisionType = decisionType
            this.defaultTab = path;
        },50)
        
    },
    computed: {
        ...mapGetters({
            'nominationStep': 'nominationStep'
        }),
        // 临时跳转，不更新步骤
        isTemp() {
            return this.$route.query.route === 'temp'
        }
    },
    methods:{
        init() {
            // 临时跳转不更新步骤
            if (this.isTemp) return
            const nominationStep = this.nominationStep
            let tableListData = nominationStep.nodeList || []
            tableListData = tableListData.filter(o => !o.flag)
            this.decisionType = tableListData.map(o => {
                const tabName = o.tabName
                const tabTarget = decisionType.find(item => item.name === tabName)
                if (tabTarget) {
                    o.key = tabTarget.key
                    o.name = tabTarget.name
                    o.path = tabTarget.path
                }
                return o
            })
        },
        // tab切换
        handleClick(tab){
            const { query } =  this.$route;
            const { name='Title' } = tab;
            this.updateSteps()
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
        },
        // 更新进度
        updateSteps() {
            // 临时跳转不更新步骤
            if (this.isTemp) return

            const nominationStep = this.$store.getters.nominationStep
            const nodeList = nominationStep.nodeList || []
            const { path } = this.$route;
            const tabName = (decisionType.find(o => o.path === path) || {}).key || ''
            const node = nodeList.find(o => o.tabName === tabName) || {}
            updatePresenPageSeat({
                nominateId: this.$store.getters.nomiAppId,
                phaseType: 5,
                nodeList,
                currentNode: node,
                node
            })
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
                // border:1px solid red;
                position: absolute;
                right: 40px;
                top: 30px;
                font-size: 18px;
                cursor: pointer;
            }
        &.preview-header{
            background-color: #fff;
            // box-shadow: $btn-box-shadow;
            border-top-left-radius: 6px;
            border-top-right-radius: 6px;
            .tab-list {
                ::v-deep.el-tabs__active-bar {
                    background-color: transparent;
                }
            }

        }
        .preview-title{
            font-size: 20px;
            font-weight: bold;
        }
    }

</style>
