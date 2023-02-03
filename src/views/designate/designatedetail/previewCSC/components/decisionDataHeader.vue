<!--
 * @Author: wentliao
 * @Date: 2021-05-20 17:56:11
 * @Description: 决策资料的公共header
-->

<template>
    <div :class="isPreview=='1' ? 'decision-header preview-header' : 'decision-header'">
        <!-- <div v-if="isPreview=='1'" class="previewHeader">
            <p class="preview-title margin-top20 margin-bottom20">CSC Nomination Recommendation</p>
            <iButton class="export-btn" v-if="!isRoutePreview && !isApproval"  :loading="exportLoading" @click="exportPdf">{{ language("DAOCHUPDF", "导出PDF") }}</iButton>
        </div> -->
        <div  class="tab-list">
            <iTabsList v-if="isPreview=='1'" class="preview-tabs" type="card" v-model='defaultTab' @tab-click="handleClick" :before-leave="beforeLeave">
                <template  v-for="(item,index) in decisionType">
                    <template v-if="item.key =='MTZ'">
                        <el-tab-pane v-if='mtzShow' :key="'decisionType'+index" :label="item.name" :name="item.path"></el-tab-pane>
                    </template>
                    <el-tab-pane  v-else :key="'decisionType'+index" :label="item.name" :name="item.path"></el-tab-pane>
                </template>
            </iTabsList>
             <iTabsList v-else type="card"  v-model='defaultTab' @tab-click="handleClick" :before-leave="beforeLeave">
                 <template v-for="(item,index) in decisionType">
                    <template v-if="item.key =='MTZ'">
                        <el-tab-pane v-if='mtzShow' :key="'decisionType'+index" :label="item.name" :name="item.path"></el-tab-pane>
                    </template>
                    <el-tab-pane  v-else :key="'decisionType'+index" :label="item.name" :name="item.path"></el-tab-pane>
                 </template>
            </iTabsList>
        </div>

        <!-- 关闭预览按钮 -->
        <span class="tab-icon" v-if="isPreview=='1' && !$route.meta.hideCloseButton" @click="close">
            <icon symbol name="iconguanbixiaoxiliebiaokapiannei"></icon>
        </span>
        <!-- 设置按钮 -->
        <!-- 临时跳转的时候，当前步骤不在决策资料，不支持排序 -->
        <span class="tab-icon" @click="sortDialogVisibal = true" v-else-if="!isTemp && isPreview !== '1'" v-permission.auto="NOMINATION_NOMINATIONDETAILS_MOUDULES_SORT|定点管理详情菜单排序"><icon symbol name="iconSetting"></icon></span>
        <!-- 排序弹窗 -->

        <div v-if="isPreview=='1' && showExportPdf">
            <exportPdf :exportLoading="exportLoading" class="exportPdf" ref="exportPdf" @changeStatus="changeStatus"/>
        </div>
    </div>
</template>

<script>
import {
  iTabsList,
  icon,
  iButton,
} from "rise";
import {
    updatePresenPageSeat,
} from '@/api/designate'
import { decisionType } from './data'
import {mapGetters,mapState} from 'vuex'
import exportPdf from '@/views/designate/designatedetail/decisionData/exportPdf'
import { hasPermission } from "@/utils";


let fullscreenLoading  = null;

export default {
    name:'decisionDataHeader',
    components:{
        iTabsList,
        icon,
        exportPdf,
        iButton,
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
        },
        pendingRequestNum(val){
            if(val == 0 && this.exportLoading && this.showExportPdf){
                this.$refs['exportPdf'].exportPdf();
            }
        },
        exportLoading(val){
            if(val){
                fullscreenLoading = this.$loading({
                    lock: true,
                    text: 'PFD导出中',
                    background: 'rgba(255, 255, 255, 0.5)'
                })
            }else{
                fullscreenLoading && fullscreenLoading.close();
            }
        }
    },
    data(){
        return{
            decisionType: [],
            defaultTab:'Title',
            sortDialogVisibal: false,
            showExportPdf:false,
            exportLoading:false,
        }
    },
    mounted(){
        // 根据当前路由设置defaultTab
        const { path } = this.$route;
        // 解决刷新页面时当前tab的高亮条歪了的情况
        setTimeout(()=>{
            // 临时跳转的时候，直接取前端写死的配置
            if (this.isTemp || this.$route.meta.layoutPath) this.decisionType = decisionType
            this.defaultTab = path;
            // 配置了layoutPath，用于预览，在数据定义中找用于选中的path地址
            if (this.$route.meta.layoutPath) {
                const defaulTab = decisionType.find(o => String(o.path).includes(this.$route.meta.path))
                defaulTab && (this.defaultTab = defaulTab.path)
            }
        },50)
        
    },
    computed: {
        ...mapState({
            mtzShow: state => state.nomination.mtzApplyId,
            pendingRequestNum: state => state.sourcing.pendingRequestNum,
        }),
        ...mapGetters({
            'nominationStep': 'nominationStep'
        }),
        // 临时跳转，不更新步骤
        isTemp() {
            return this.$route.query.route === 'temp'
        },
        isRoutePreview() {
            return this.$route.query.isPreview == 1
        },
        isApproval() {
            return this.$route.query.isApproval === "true"
        },
        phaseType(){
            return this.$store.getters.phaseType;
        },
    },
    methods:{
        init() {
        try {
                      // 临时跳转不更新步骤
            if (this.isTemp) return
            const nominationStep = this.nominationStep
            let tableListData = nominationStep.nodeList || JSON.parse(JSON.stringify(decisionType))
            tableListData = tableListData.filter(o => !o.flag)
            this.decisionType = []
            tableListData.forEach(o => {
                const tabName = o.tabName
                const tabTarget = decisionType.find(item => item.name === tabName)
                if (tabTarget&&hasPermission(tabTarget.permissionKey)) {
                    this.decisionType.push({
                        key: tabTarget.key,
                        name: tabTarget.name,
                        path: tabTarget.path,
                        permissionKey: tabTarget.permissionKey,
                    })
                    // o.key = tabTarget.key
                    // o.name = tabTarget.name
                    // o.path = tabTarget.path
                    // o.permissionKey = tabTarget.permissionKey
                }
                // return o
            })
            } catch (error) {
                console.log(error)
            }
        },
        // tab切换
        handleClick(tab){
            console.log(tab)
            const { query } =  this.$route;
            let { name='Title' } = tab;
            if (this.$route.meta.layoutPath ==='/desinatepreview') {
                name = name.replace(/.*\/(.+)$/, '/previewCSC/$1')
            }

            console.log(name)
            this.$router.push({
                path: name,
                query,
            });
        },
        beforeLeave(activeName,oldActiveName){
            if(oldActiveName == 'Title'){
                return true
            }
             if(this.phaseType < 5) return false;
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
        },
        exportPdf(){
            if(this.showExportPdf){
                this.exportLoading = true;
                this.$refs['exportPdf'].exportPdf();
            }else{
                this.showExportPdf = true;
                this.exportLoading = true;
            }
            
        },
        
        changeStatus(type,status){
            this[type] = status;
        },
    }
}
</script>

<style lang="scss" scoped>
    .decision-header{
        padding: 20px 30px;
        position: relative;
        ::v-deep.el-tabs__nav-scroll{
				overflow: hidden !important;
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
            padding: 0 30px;
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
        .exportPdf{
            height: 0px;
            overflow: hidden;
        }
        .previewHeader{
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
    }
    ::v-deep .el-tabs--card{
        &.preview-tabs{
            background: transparent;
            .el-tabs__item{
                min-width: unset ;
                border-top: 1px solid #d9d9d9;
                border-bottom: 1px solid #d9d9d9;
                border-left: 1px solid #d9d9d9;
                &.is-active{
                    color: #fff;
                    background: #194669;
                }
            &:nth-child(1){
                border-radius: 0;
            }
            &:last-child{
                border-radius: 0;
                border-right: 1px solid #d9d9d9;
            }
            }
        }
    }

</style>
