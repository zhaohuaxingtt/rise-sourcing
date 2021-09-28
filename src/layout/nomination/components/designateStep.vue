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
                <span class="title-text margin-left10">{{language('nominationLanguage.DingDianGuanLi','定点管理')}}: <span class="desinateId">{{desinateId}}</span></span>
                <span class="select-text margin-left10">{{language('nominationLanguage.DINGDIANSHENQINGLEIXING','定点申请类型')}}：</span>
                <iSelect v-model="designateType" @change="updateNominate" :disabled="disableNominationType || nominationDisabled">
                    <el-option
                    :value="item.id"
                    :label="language(item.key,item.name)"
                    v-for="(item, index) in applyType"
                    :key="index"
                    ></el-option>
                </iSelect>
            </div>
            <div class="btnList flex-align-center">
                <iButton @click="gotoRsMainten" v-if="!nominationDisabled && designateType === 'MEETING'">{{language('LK_RSWEIHUDAN','RS单维护')}}</iButton>
                <iButton v-if="showExport" @click="doExport">{{language('LK_DAOCHU','导出')}}</iButton>
                <iButton v-if="!nominationDisabled" @click="submit" :loading="submitting">{{language('LK_TIJIAO','提交')}}</iButton>
                <iButton v-if="!nominationDisabled && designateType === 'MEETING'" @click="meetingConclusionDialogVisible = true">{{ language("LK_HUIYIJIELUN", "会议结论") }}</iButton>
                <!-- <iButton @click="toNextStep">{{language('LK_XIAYIBU','下一步')}}</iButton> -->
                <iButton v-if="isDecision" @click="preview">{{language('LK_YULAN','预览')}}</iButton>
                <logButton class="margin-left20" @click="log"  />
                <span class="title-font margin-left20"><icon symbol name="icondatabaseweixuanzhong"></icon></span>
            </div>
        </div>
        <!-- 步骤栏 -->
        <div class="step-list flex-between-center-center margin-top30 margin-bottom30">
            <div class="step-list-item flex-center-center" v-for="(item,index) in applyStep" :key="'applyStep'+index">
                <!-- 下一步的图标或者是决策资料的图标支持灰色可点击 -->
                <div :class="(item.id === 5 || phaseType + 1 >=item.id) ? 'click-item step-list-item' : 'step-list-item' " @click="toAnyNomiStep(item)">
                    <p class="step-icon-box">
                        <!-- 正在进行中 -->
                        <icon v-if="phaseType == item.id" symbol name="icondingdianguanlijiedian-jinhangzhong"  class="step-icon"></icon> 
                        <!-- 已完成 -->
                        <icon v-else-if="phaseType > item.id" symbol name="icondingdianguanli-yiwancheng" class="step-icon  click-icon"></icon>
                        <!-- 未完成 -->
                        <icon v-else symbol name="icondingdianguanlijiedian-yiwancheng" class="step-icon"></icon>

                        <!-- 单一供应商需要单独展示icon -->
                        <el-tooltip v-if="item.hasInfo && isSingle" :content="language('LK_GAIDINGDIANSHENQINGZHONGYOUDANYIGONGYINGSHANG','该定点申请中有单一供应商')"   placement="top">
                            <icon symbol name="icontishi-cheng" class="info-icon"></icon>
                        </el-tooltip>
                    </p>
                    
                    <p class="step-text">
                        {{language(item.key,item.name)}}
                    </p>
                </div>
                <p v-if="index+1 !== applyStep.length" class="margin-bottom30" >
                    <!-- 正在进行中 -->
                    <span v-if="phaseType == item.id" v-html="svgList['icondingdianguanlizhou-zhengzaijinhang']"></span>
                    <!-- 已完成 -->
                    <span v-else-if="phaseType > item.id" v-html="svgList['iconliuchengjiedianyiwancheng1']"></span>
                     <!-- 未完成 -->
                     <span v-else v-html="svgList['icondingdianguanlizhou-weiwancheng']"></span>


                    <!-- 正在进行中 -->
                    <!-- <icon v-if="phaseType == item.id" symbol name="icondingdianguanlizhou-zhengzaijinhang" class="step-between-icon"></icon> -->
                    <!-- 已完成 -->
                    <!-- <icon v-else-if="phaseType > item.id" symbol name="iconliuchengjiedianyiwancheng1" class="step-between-icon"></icon> -->
                    <!-- 未完成 -->
                    <!-- <icon v-else symbol name="icondingdianguanlizhou-weiwancheng" class="step-between-icon"></icon> -->
                </p>
            </div>
        </div>
        <!-- 上会类型提交确认弹窗 -->
        <mettingDialog 
            :visible.sync="mettingDialogVisible" 
            @success="submit(...arguments, false)"
            @resetSubmitting="submitting = false"
            ref="mettingDialog" />
        <meetingConclusionDialog :desinateId="desinateId" :visible.sync="meetingConclusionDialogVisible" @afterConfirm="afterConfirm" />
    </div>
</template>

<script>
import {
  iButton,
  icon,
  iSelect,
  iMessage
} from "rise";
import logButton from '@/components/logButton'
import mettingDialog from './mettingDialog'
import {
    nominateAppSExport,
    nominateAppSsubmit,
    nominateAppSDetail,
    getNominateType,
    updatePresenPageSeat,
    sugesstionInit,
    sugesstionInitReCord,
    supplierInitReCord,
    checkNomiMeetingSubmit1,
    checkNomiMeetingSubmit2,
    checkNomiMeetingSubmit3,
    updateNominate,
    rsAttachExport
} from '@/api/designate'
import { applyStep,svgList } from './data'
import meetingConclusionDialog from "./meetingConclusionDialog"

export default {
    name:'designateStep',
    components:{
        iButton,
        logButton,
        icon,
        iSelect,
        mettingDialog,
        meetingConclusionDialog,
    },
    props:{
        status: {
            type: String,
            default: '1',
            isDecision:false,
        },
    },
    created(){
        this.getApplyType()
        // 判断当前路由是否是决策资料相关路由 是则显示预览按钮
        const { path,query,name } = this.$route;
        // const {desinateId =''} = query;
        // 禁用定点类型逻辑：存在定点id且处于草稿状态允许编辑，其他的不允许
        const nominationTypeDisable = !(name === 'designateRfqdetail' || (query.desinateId && query.applicationStatus === 'NEW'))
        this.isDecision = path.indexOf('/designate/decisiondata/')>-1;
        this.desinateId = query.desinateId
        this.designateType = query.designateType

        // this.getDesignateType(desinateId);
        // 控制定点类型是否可编辑
        this.$store.dispatch('setNominationTypeDisable', nominationTypeDisable)
        // 设置定点类型
        this.designateType && (this.$store.dispatch('setNominationType', this.designateType || 'MEETING'))
        // 缓存定点ID
        this.$store.dispatch('setNominateId', this.desinateId || '')
        // 校验定点下面是否有零件，前4步需要零件非空校验
        if(['designateRfqdetail', 'designateSuggestion', 'designateSupplier', 'approvalPersonAndRecord','designateDecisionData'].includes(name)) {
            this.$store.dispatch('checkPartNull', {})
        }
    },
    computed:{
        // eslint-disable-next-line no-undef
        ...Vuex.mapState({
            nominationDisabled: state => state.nomination.nominationDisabled,
        }),
        phaseType(){
            return this.$store.getters.phaseType;
        },
        disableNominationType(){
            return this.$store.getters.disableNominationType;
        },
        isSingle(){
            return this.$store.getters.isSingle;
        },
        // 是否显示下载按钮
        showExport() {
            return this.supportExportPath.includes(this.$route.name)
        }
    },
    data(){
        return{
            desinateId: '',
            designateType: 'RECORD',
            applyType:[],
            applyStep:applyStep,
            mettingDialogVisible: false,
            submitting: false,
            // 需要展示导出按钮的页面name
            supportExportPath: [
                'designateDecisionRS'
            ],
            meetingConclusionDialogVisible: false,
            svgList:svgList,
        }
    },
    methods:{
        async updateNominate(data) {
            if (this.desinateId) {
                this.$confirm(this.language('NINGQUEDINGYAOGENGGAIDINGDIANSHENQING','您确定要更改定点申请类型吗？')).then(confirmInfo => {
                    if (confirmInfo !== 'confirm') return
                    const params = {
                        meetingType: data,
                        nominateAppId:  this.desinateId
                    }
                    updateNominate(params).then((res)=>{
                        if (res.code === '200') {
                            iMessage.success(this.language('LK_CAOZUOCHENGGONG','操作成功'));
                            setTimeout(() => {
                                // 刷新页面参数
                                const query = this.$router.history.current.query
                                const path = this.$router.history.current.path
                                const newQuery = JSON.parse(JSON.stringify(query))
                                newQuery.designateType = this.designateType
                                this.$router.push({path, query: newQuery})
                            }, 500)
                        } else {
                            iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
                        }
                    }).catch(e => {
                        iMessage.error(this.$i18n.locale === "zh" ? e.desZh : e.desEn)
                    })
                }).catch(e => {
                    if (this.desinateId) {
                        this.desinateId = this.$route.query.desinateId
                    }
                })
            }
            this.onDesignateTypeChange(data)
            
        },
        // 临时跳转到决策资料，不更新当前步骤
        gotoNomiAttach() {
            this.$router.push({path: '/designate/decisiondata/title', query: Object.assign(this.$route.query, {desinateId:this.$route.query.desinateId, route: 'temp'})})
        },
        // 跳转到任何已完成的定点步骤
        toAnyNomiStep(item) {
            const id = item.id
            const path = item.path
            // 决策资料允许，特例跳转，不更新当前步骤
            if (id === 5) this.gotoNomiAttach()
            // 不允许跳转到未开始的步骤
            if (id > this.phaseType + 1) return
            console.log(this.$store.getters.isPartListNull, item.path)
            // 前4步零件非空校验不通过
            if (this.$store.getters.isPartListNull && item.path !== '/designate/rfqdetail') {
                iMessage.warn(this.language('NOMILINGJIANWEIKONGJINXAIYIBUTIXING','当前零件清单未勾选任何零件，请至少勾选一个零件后再进行操作！'))
                return
            }
             // 合理的跳转到下一步
            if (id === this.phaseType + 1) {
                this.toNextStep()
                return
            }
            // 已完成的步骤随便跳
            const query = Object.assign(this.$route.query, {route: 'force'})
            this.$router.push({
                path,
                query
            })
        },
        getApplyType() {
            getNominateType().then(res => {
                if (res?.result) {
                    const apply = []
                    Array.from(res.data).forEach(item => {
                        apply.push({id:item.code,name:item.desc,key:item.code})
                    })
                    this.applyType = apply
                } else {
                    this.applyType = []
                    iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
                }
            })
        },
        gotoRsMainten() {
            this.$router.push({path: '/sourcing/designate/rsSingleMaintenance', query: this.$route.query})
        },
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
            this.designateType = data
            this.$store.dispatch('setNominationType', data)

        },

        // 跳转
        goToRoute(item){
            // 新增模式下不允许跳转
            if (!this.desinateId) {
                iMessage.error(this.language('nominationLanguage.QingChuangJianWanDingDianShenQingDan','请创建完定点申请单再继续下一步'))
                return
            }
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
         // RFQ & 零件清单下一步前保存
        async onRfqPartListNextStepSave() {
            let state = false
            try {
                const res = await supplierInitReCord({
                    nominateId: this.$store.getters.nomiAppId,
                })
                if (res.code === '200') {
                    state = true
                } else {
                    iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
                }
            } catch (e) {
                iMessage.error(this.$i18n.locale === "zh" ? e.desZh : e.desEn)
                state = false
            }
            return state
        },
        // 单一供应商保存
        async onSupplierSave() {
            let state = false
            try {
                const res = await sugesstionInit({
                    nominateAppId: this.$store.getters.nomiAppId,
                })
                if (res.code === '200') {
                    state = true
                } else {
                    iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
                }
            } catch (e) {
                iMessage.error(this.$i18n.locale === "zh" ? e.desZh : e.desEn)
                state = false
            }
            return state
        },
         // 定点建议
        // async onSuggestionSave() {
        //     let state = false
        //     try {
        //         const res = await sugesstionInitReCord({
        //             nominateAppId: this.$store.getters.nomiAppId,
        //         })
        //         if (res.code === '200') {
        //             state = true
        //         } else {
        //             iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        //         }
        //     } catch (e) {
        //         iMessage.error(this.$i18n.locale === "zh" ? e.desZh : e.desEn)
        //         state = false
        //     }
        //     return state
        // },
        // 跳转下一步
        async toNextStep() {
            let step = Number(this.$store.getters.phaseType || '1')
            step = step > 5 ? 4 : step
            const phaseType = Number(step) + 1
            const confirmInfo = await this.$confirm(this.language('nextSure','您确定要进行下一步吗？请确定数据已经完全保存'))
            if (confirmInfo !== 'confirm') return
            const nominationStep = this.$store.getters.nominationStep
            const nodeList = nominationStep.nodeList || []
            const beforeNode = {
                phaseType: step,
                phaseNodeNow: 0
            }
            console.log(step, phaseType)
            // 当前步骤在rfq零件清单
            if (step === 1) {
                const proc = await this.onRfqPartListNextStepSave()
                console.log('step 1', proc)
                if (!proc) return
            }
            // 当前步骤在单一供应商
            if (step === 2) {
                const proc = await this.onSupplierSave()
                console.log('step 2', proc)
                if (!proc) return
            }
            // 流程有调整，取消这个接口
            // 当前步骤在定点建议
            // if (step === 3) {
            //     const proc = await this.onSuggestionSave()
            //     console.log('step 3', proc)
            //     if (!proc) return
            // }
            updatePresenPageSeat({
                nominateId: this.$store.getters.nomiAppId,
                phaseType: this.$store.getters.phaseType,
                nodeList,
                currentNode: step < 5 ? beforeNode : nominationStep.currentNode,
                node: step < 5 ? beforeNode : nominationStep.currentNode,
            }).then(res => {
                if (res.code === '200') {
                    let item = applyStep.find(o => o.id === phaseType )
                    const {query, path} = this.$route;
                    // 在决策资料前的步骤，支持正确的step跳转
                    if (path.indexOf('/designate/decisiondata') === -1) {
                        this.$router.push({
                            path:item.path,
                            query: {
                                ...query,
                            }
                        })
                    }
                }
            })
        },
        // 提交定点申请三轮校验
        async checkNomiMeetingSubmit(level = 1) {
            const { query } = this.$route;
            const {desinateId} = query;
            const data = {
                nominateId:Number(desinateId)
            }
            let state = true
            let dataInfo = ''
            let systemerror = false
            try {
                let res = {}
                if (level === 1) res = await checkNomiMeetingSubmit1(data)
                if (level === 2) res = await checkNomiMeetingSubmit2(data)
                if (level === 3) res = await checkNomiMeetingSubmit3(data)
                if (res && res.code === '200') {
                    state = true
                    if (res.data && res.data.length) {
                        res.data.forEach((item) => {
                            if (this.$i18n.locale === "zh") {
                                dataInfo+= `${item.zhMsg}<br>`
                            } else {
                                dataInfo+= `${item.engMsg}<br>`
                            }
                        })
                    } else {
                        state = false
                    }
                } else {
                    state = true
                    dataInfo = this.$i18n.locale === "zh" ? res.desZh : res.desEn
                    // iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
                }
            } catch(e) {
                state = true
                systemerror = true
                dataInfo = this.$i18n.locale === "zh" ? e.desZh : e.desEn
                !dataInfo && (dataInfo = this.language('NETWORKERROR', '网络错误，请稍后重试'))
                // iMessage.error(this.$i18n.locale === "zh" ? e.desZh : e.desEn)
            }
            return {state, dataInfo, systemerror}
        },
        // 提交
        // 提交逻辑需求有变化，所有类型的定点申请都要进行三轮校验，且第三轮为强制
        async submit(params = {}, check = true){
            const { query } = this.$route;
            const {desinateId} = query;
            const nominationType = this.$store.getters.nominationType || ''
            const data = Object.assign({
                nominateIdArr:[Number(desinateId)],
            }, params)
            console.log('params', data, nominationType)
            this.submitting = true
            try {
                if (check) {
                    // 进行第一轮校验
                    let res = await this.checkNomiMeetingSubmit(1)
                    console.log('第一轮校验',res)
                    if (res.state) {
                        try {
                            const confirmNextInfo = await this.$confirm(res.dataInfo,this.language('LK_NOTICE','提示'), {
                                confirmButtonText: this.language('LK_JIXU','继续'),
                                cancelButtonText: this.language('QUXIAO', res.systemerror ? this.language('SURE','确定') : this.language('QUXIAO','取消')),
                                showCancelButton: true,
                                showConfirmButton: res.systemerror ? false : true,
                                type: res.systemerror? 'error' : 'warning',
                                dangerouslyUseHTMLString:true
                                
                            })
                            if (confirmNextInfo !== 'confirm') {
                                this.submitting = false
                                return
                            }
                        } catch (e) {
                            this.submitting = false
                            return
                        }
                    }
                    // 进行第二轮校验
                    res = await this.checkNomiMeetingSubmit(2)
                    console.log('第二轮校验',res)
                    if (res.state) {
                        try {
                            const confirmNextInfo = await this.$confirm(res.dataInfo,this.language('LK_NOTICE','提示'), {
                                confirmButtonText: this.language('LK_JIXU','继续'),
                                cancelButtonText: this.language('QUXIAO', res.systemerror ? this.language('SURE','确定') : this.language('QUXIAO','取消')),
                                showCancelButton: true,
                                showConfirmButton: res.systemerror ? false : true,
                                type: res.systemerror? 'error' : 'warning',
                                dangerouslyUseHTMLString:true

                            })
                            if (confirmNextInfo !== 'confirm') {
                                this.submitting = false
                                return
                            }
                        } catch (e) {
                            this.submitting = false
                            return
                        }
                    }
                    // 进行第二轮校验
                    res = await this.checkNomiMeetingSubmit(3)
                    console.log('第三轮校验',res)
                    if (res.state) {
                        try {
                            const confirmNextInfo = await this.$confirm(res.dataInfo,this.language('LK_NOTICE','提示'), {
                                confirmButtonText: this.language('LK_JIXU','继续'),
                                cancelButtonText: this.language('QUXIAO','取消'),
                                type: 'warning'
                            })
                            if (confirmNextInfo !== 'confirm') {
                                this.submitting = false
                                return
                            }
                        } catch (e) {
                            this.submitting = false
                            return
                        }
                    }

                    // 打开上会确认弹窗
                    if (nominationType === 'MEETING') {
                        this.mettingDialogVisible = true
                        this.submitting = false
                        return
                    }
                }
                
                this.$confirm(this.language('submitSure','您确定要执行提交操作吗？')).then(confirmInfo => {
                    if (confirmInfo !== 'confirm') {
                        this.submitting = false
                        return
                    }
                    nominateAppSsubmit(data).then((res)=>{
                        if (res.code === '200') {
                            iMessage.success(this.language('LK_CAOZUOCHENGGONG','操作成功'));
                        } else {
                            iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
                        }
                        this.submitting = false
                    }).catch(e => {
                        this.submitting = false
                        iMessage.error(this.$i18n.locale === "zh" ? e.desZh : e.desEn)
                    })
                }).catch(e => {
                    this.submitting = false
                })
            } catch (e) {
                this.submitting = false
            }
            
        },
        afterConfirm() {
            
        },
        // 定点导出---后端功能未做
        exportNominate(){
            const { query } = this.$route;
            const {desinateId} = query;
            const data = {
                nominateIdArr:[Number(desinateId)],
            }
            nominateAppSExport(data).then((res)=>{
                if (res.code === '200') {
                    iMessage.success(this.language('LK_CAOZUOCHENGGONG','操作成功'));
                } else {
                    iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
                }
            }).catch(e => {
                iMessage.error(this.$i18n.locale === "zh" ? e.desZh : e.desEn)
            })
        },
        // rs单导出
        rsAttachExport() {
            const { query } = this.$route;
            const {desinateId} = query;
            const BASEURL = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '')
            const fileURL = `${BASEURL}${process.env.VUE_APP_RFQ}/rs/downCapacityExpRs?nominateAppId=${desinateId}`
            window.open(fileURL)
        },
        doExport() {
            const pathName = this.$route.name
            if (pathName === 'designateDecisionRS') {
                this.rsAttachExport()
            }
        },

        // 获取定点管理详情 --- 取定点申请类型字段
        getDesignateType(nominateAppId){ 
            const data = {nominateAppId,};
            nominateAppSDetail(data).then((res)=>{
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
    .pageTitle{
        .title-text{
            font-size: 20px;
            font-weight: bold;
            white-space: nowrap;
            // margin-bottom: 10px;
        }
        .select-text{
            font-size: 14px;
            white-space: nowrap;
        }
        .title-font{
            font-size: 20px;
        }
        .desinateId {
            display: inline-block;
            min-width: 100PX;
        }
    }
    .step-list{
        padding: 0 70px;
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
                    position: relative;
                    .info-icon{
                        position:absolute;
                        width: 20px;
                        height: 20px;
                        top: -5px;
                        right: 10px;
                    }
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