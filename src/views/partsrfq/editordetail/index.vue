<!--
 * @Author: your name
 * @Date: 2021-02-25 10:09:50
 * @LastEditTime: 2022-03-17 17:16:58
 * @LastEditors: YoHo
 * @Description: In User Settings Edit
 * @FilePath: /front-sourcing/src/views/partsrfq/editordetail/index.vue
-->
<template>
  <iPage>
    <!-- rfq详情操作按钮 -->
    <div class="pageTitle flex-between-center-center">
      <div class="flex nav-box">
        <span>{{ $route.query.id ? 'RFQ' : language('LK_XINJIANRFQ', '新建RFQ') }}</span>
        <!-- <iNavMvp lang
                 :query="$route.query"
                 :lev="2"
                 routerPage
                 :list="navList"
                 @change="changeRouter"></iNavMvp> -->
      </div>
      <div class="btnList">
        <iButton 
        v-if="baseInfo.partProjectType && baseInfo.partProjectType[0] && (baseInfo.partProjectType[0] === partProjTypes.GSCOMMONSOURCING || baseInfo.partProjectType[0] === partProjTypes.FSCOMMONSOURCING)&&baseInfo.starMonitorStatus !== 1&&isCommonSurcingStar"
        @click="waitStarmonitor" v-permission.auto="DENGDAISTARTMONITOEDINGDIANGENGXIN|等待StarMonitor定点更新">{{language('LK_DENGDAISTARTMONITOEDINGDIANGENGXIN','等待StarMonitor定点更新')}}</iButton>
        <iButton  
        v-if="baseInfo.partProjectType && baseInfo.partProjectType[0] && (baseInfo.partProjectType[0] === partProjTypes.GSCOMMONSOURCING || baseInfo.partProjectType[0] === partProjTypes.FSCOMMONSOURCING)&&baseInfo.starMonitorStatus === 1"
      @click="cancelWaitStarmonitor" v-permission.auto="QUXIAODENGDAISTARTMONITOEDINGDIANGENGXIN|取消等待StarMonitor定点更新">{{language('LK_QUXIAODENGDAISTARTMONITOEDINGDIANGENGXIN','取消等待StarMonitor定点更新')}}</iButton>
          <!-- <iButton 
                v-if="baseInfo.starMonitorStatus !== 1"
                @click="handleApplyModuleTargetPrice"
                 :loading="checkApplyLoading"
                 v-permission.auto="PARTSRFQ_EDITORDETAIL_APPLYMODULETARGETPRICE|申请模具目标价">
          {{ language('SHENQINGMUJUMUBIAOJIA', '申请模具目标价') }}
        </iButton> -->
        <iButton v-if="baseInfo.partProjectType && baseInfo.partProjectType[0] && baseInfo.partProjectType[0] === partProjTypes.PEIJIAN && baseInfo.starMonitorStatus !== 1"
                 :loading="endEngotiationlaoding"
                 @click="updateRfqStatus('07')"
                 v-permission.auto="PARTSRFQ_EDITORDETAIL_ENDNEGOTIATION|谈判完成">
          {{ language('TANPANWANCHENG', '谈判完成') }}
        </iButton>
        <span v-if="!disabled && baseInfo.starMonitorStatus !== 1">
          <iButton @click="goToCesPage"
                   v-permission.auto="PARTSRFQ_EDITORDETAIL_NEWTESTPROG|新建测试项目">{{
            language('LK_XINGJIANCESHIXIANM', '新建测试项目')
          }}</iButton>

          <iButton 
                  v-if="baseInfo.starMonitorRef != 1 && baseInfo.starMonitorStatus !== 1"
                  :loading="newRfqOpenValidateLoading"
                   @click="newRfq"
                   v-permission.auto="PARTSRFQ_EDITORDETAIL_NEWRFQROUND|新建RFQ轮次">
            {{ language('LK_XINJIANRFQLUNCI', '新建RFQ轮次') }}
          </iButton>
          <iButton 
            v-if="baseInfo.starMonitorRef !== 1 && baseInfo.starMonitorStatus !== 1"
            :loading="rfqloading"
                   @click="updateRfqStatus('06')"
                   v-permission.auto="PARTSRFQ_EDITORDETAIL_SENDINQUIRY|发出询价">{{ language('LK_FACHUXUNJIA', '发出询价') }}
          </iButton>
          <iButton 
            v-if="baseInfo.starMonitorRef !== 1 && baseInfo.starMonitorStatus !== 1 && isPosition" 
            :loading="endingloading"
            @click="updateRfqStatus('05')"
            v-permission.auto="PARTSRFQ_EDITORDETAIL_ENDQUOTATION|结束本轮询价">
            {{ language('LK_JIESHUBENLUNXUNJIA', '结束本轮询价') }}
          </iButton>
          <iButton 
            v-if=" baseInfo.starMonitorRef !== 1 && baseInfo.starMonitorStatus !== 1 && isInquiryUser && isInquiryRfqStatus"
            :loading="transferlaoding"
                   @click="updateRfqStatus('03')"
                   v-permission.auto="PARTSRFQ_EDITORDETAIL_TRANSFERNEGOTIATION|转谈判">
            {{ language('LK_ZHUANTANPAN', '转谈判') }}
          </iButton>     
          <iButton 
            v-if=" baseInfo.starMonitorRef !== 1 && baseInfo.starMonitorStatus !== 1 && isLinieUser && isLiniefqStatus"
            :loading="transferlaoding"
                   @click="updateRfqStatus('04')"
                   v-permission.auto="PARTSRFQ_EDITORDETAIL_REINQUIRY|转询价">
            {{ language('LK_ZHUANXUNJIAS','转询价')}}
          </iButton>
          <iButton v-permission.auto="PARTSRFQ_EDITORDETAIL_CREATEAPPLICATION|创建定点申请"
                   :loading="createDesignateLoading"
                   @click="createDesignate">
            {{ language('LK_CHUANGJIANDINGDIANSHENQING', '创建定点申请') }}
          </iButton>
        </span>
        <!-- <iButton type="text" @click="toLogPage" v-permission.auto="PARTSRFQ_EDITORDETAIL_LOG|日志">
            <icon symbol name="iconrizhiwuzi" class="log-icon"/>
            <span class="log-word">{{ language('LK_RIZHI','日志') }}</span>
          </iButton> -->
        <iLoger :config="{
            module_obj_ae: 'RFQ管理',
            bizId_obj_ae: 'id',
            queryParams: ['bizId_obj_ae'],
          }"
                credentials
                isPage
                isUser
                hasBizId
                class="margin-left10"
                optionDicKey="LOG_OPERATION_TYPES"
                optionDicKey2="RFQ详情页" />
        <span>
          <icon symbol
                name="icondatabaseweixuanzhong"></icon>
        </span>
      </div>
    </div>
    <iCard collapse
           class="margin-bottom20 margin-top20"
           :title="language('LK_JICHUXINXI', '基础信息')"
           v-loading="baseInfoLoading">
      <!------------------------------------------------------------------------>
      <!--                  基本信息区域                                       --->
      <!------------------------------------------------------------------------>
      <iFormGroup row="1"
                  inline
                  :rules="rules">
        <div class="row">
          <div class="col">
            <iFormItem v-permission.auto="PARTSRFQ_EDITORDETAIL_RFQNUMBER|RFQ编号"
                       :label="language('LK_RFQBIANHAO', 'RFQ编号') + ':'"
                       name="id">
              <iText>{{ baseInfo.id }}</iText>
            </iFormItem>
            <iFormItem v-permission.auto="PARTSRFQ_EDITORDETAIL_RFQNAME|RFQ名称"
                       :label="language('LK_RFQMINGCHENG', 'RFQ名称') + ':'"
                       name="rfqName">
              <div class="input-box">
                <iInput v-if="editStatus" v-model="baseInfo.rfqName"></iInput>
                <iText v-else>{{ baseInfo.rfqName }}</iText>
                <div class="btn-box" v-if="isInit || !disabled">
                    <iButton v-if="!editStatus" @click="edit" type="text" icon="el-icon-edit"></iButton>
                    <template v-else>
                      <iButton class="save" type="text" @click="save" icon="el-icon-check"></iButton>
                      <iButton class="cancel" type="text" @click="cancel" icon="el-icon-close"></iButton>
                    </template>
                </div>
              </div>
            </iFormItem>
            <iFormItem :label="language('LK_RFQZHUANGTAI', 'RFQ状态') + ':'"
                       name="statusName"
                       v-permission.auto="PARTSRFQ_EDITORDETAIL_RFQSTATUS|RFQ状态">
              <iText>{{ baseInfo.statusName }}</iText>
            </iFormItem>
            <iFormItem :label="language('LK_CHUANGJIANRIQI', '创建日期') + ':'"
                       name="createDate"
                       v-permission.auto="PARTSRFQ_EDITORDETAIL_CREATIONDATE|创建日期">
              <iText>
                {{ $route.query.id ? baseInfo.createDate : moment().format('YYYY-MM-DD') }}
              </iText>
            </iFormItem>
            <iFormItem label="材料组" name="categoryCode"
                      v-permission.auto="PARTSRFQ_EDITORDETAIL_CATEGORYCODE|材料组"
            >
              <iText>
                {{ (baseInfo.categoryCode ? baseInfo.categoryCode : '') +'-'+ (baseInfo.categoryName ? baseInfo.categoryName : '') }}
              </iText>
            </iFormItem>
          </div>
          <div class="col">
            <iFormItem :label="language('LK_XUNJIACAIGOUYUAN', '询价采购员') + ':'"
                       name="buyerName"
                       v-permission.auto="PARTSRFQ_EDITORDETAIL_INQUIRYBUYER|询价采购员">
              <iText>{{ baseInfo.buyerName }}</iText>
            </iFormItem>
            <iFormItem label="LINIE："
                       name="linieNameZh"
                       v-permission.auto="PARTSRFQ_EDITORDETAIL_LINE|LINIE">
              <iText>{{ baseInfo.linieNameZh }}</iText>
            </iFormItem>
            <iFormItem :label="language('LK_EP', '技术评分人') + ':'"
                       name="ep"
                       v-permission.auto="PARTSRFQ_EDITORDETAIL_EP|技术评分人">
              <iText forceTooltip
                     :tooltipContent="baseInfo.ep">{{ nameProcessor(baseInfo.ep) }}</iText>
            </iFormItem>
            <iFormItem :label="language('LK_MQ', '质量评分人') + ':'"
                       name="mq"
                       v-permission.auto="PARTSRFQ_EDITORDETAIL_MQ|质量评分人">
              <iText forceTooltip
                     :tooltipContent="baseInfo.mq">{{ nameProcessor(baseInfo.mq) }}</iText>
            </iFormItem>
            <iFormItem 
                      :label="language('LK_CF','财务控制员')+':'" 
                      name="cf"
                      v-permission.auto="PARTSRFQ_EDITORDETAIL_CF|财务控制员"
                      >
              <iText forceTooltip :tooltipContent="baseInfo.cf">{{ nameProcessor(baseInfo.cf)||getName(baseInfo.cfControllerNames) }}</iText>
            </iFormItem>
          </div>
          <div class="col">
            <iFormItem :label="language('LK_DANGQIANLUNCI', '当前轮次') + ':'"
                       name="currentRounds"
                       v-permission.auto="PARTSRFQ_EDITORDETAIL_CURRENTROUND|当前轮次">
              <iText>{{ baseInfo.currentRounds }}</iText>
            </iFormItem>
            <iFormItem :label="language('LK_LUNCILEIXING', '轮次类型') + ':'"
                       name="roundsTypeName"
                       v-permission.auto="PARTSRFQ_EDITORDETAIL_ROUNDTYPE|轮次类型">
              <iText>
                {{ baseInfo.roundsTypeName }}
              </iText>
            </iFormItem>
            <iFormItem :label="language('LK_BENLUNZHUANGTAI', '本轮状态') + ':'"
                       name="test"
                       v-permission.auto="PARTSRFQ_EDITORDETAIL_CURRENTSTATE|本轮状态">
              <iText>{{ baseInfo.currentRoundsStatus }}</iText>
            </iFormItem>
            
            <iFormItem label="本轮开始时间"
                       name="currentRoundsEndTime"
                       v-permission.auto="PARTSRFQ_EDITORDETAIL_CURRENTROUNDSENDTIME|本轮开始时间"
                       >
              <iText>{{ baseInfo.currentRoundsStartTime }}</iText>
            </iFormItem>
            <iFormItem :label="language('LK_BENLUNBAOJIAJIEZHISHIJIAN', '本轮报价截止时间') + ':'"
                       name="currentRoundsEndTime"
                       v-permission.auto="PARTSRFQ_EDITORDETAIL_DEADLINEQUOTATIONS|本轮报价截止时间">
              <iText>{{ baseInfo.currentRoundsEndTime }}</iText>
            </iFormItem>
          </div>
          <!-- <div class="col">
            <iFormItem :label="language('LK_PL', '物流审核人') + ':'"
                       name="test"
                       v-permission.auto="PARTSRFQ_EDITORDETAIL_PL|物流审核人">
              <iText forceTooltip
                     :tooltipContent="baseInfo.pl">{{ nameProcessor(baseInfo.pl) }}</iText>
            </iFormItem>
            <div class="edit-button-row">
              <i-button v-if="!disabled"
                        @click="edit"
                        v-permission.auto="PARTSRFQ_EDITORDETAIL_SAVE|(编辑 / 保存)">{{ !editStatus ? language('LK_BIANJI', '编辑') : language('LK_BAOCUN', '保存') }}
              </i-button>
            </div>
          </div> -->
        </div>
      </iFormGroup>
    </iCard>
    <!--------------------------------------------------------------->
    <!-------------------------RFQ待办信息---------------------------->
    <!--------------------------------------------------------------->
    <rfqPending ref="rfqPending" :canRegiste="canRegiste" :rfqInfoData="rfqInfo"
                :isPosition="isPosition"
                v-if="(navActivtyValue === '0' || navActivtyValue === '') && tabShowStatus"
                :activityTabIndex="activityTabIndex"></rfqPending>
    <!--------------------------------------------------------------->
    <!-------------------------RFQ详情信息---------------------------->
    <!--------------------------------------------------------------->
    <rfq-detail-info v-if="navActivtyValue === '1' && tabShowStatus"></rfq-detail-info>
    <!--------------------------------------------------------------->
    <!-------------------------报价助手------------------------------->
    <!--------------------------------------------------------------->
    <rfq-detail-tpzs :rfqInfoData="rfqInfo"
                     v-if="navActivtyValue == 2"></rfq-detail-tpzs>
    <new-rfq-round v-model="newRfqRoundDialog"
                  :rfqInfo="baseInfo"
                   @refreshBaseInfo="getBaseInfo('2')"
                   @showTodo="showTodo"
                   :dataRes="newRfqRoundDialogRes"
                   v-if="tabShowStatus" />

    <nominateTypeDialog :visible.sync="nominateTypeDialogVisible"
                        @confirm="createDesignate" />
    <!-------------------commonsourcing类型维护供应商（目前未用）----------------------------------->
    <maintainSupplier ref="maintainSupplier" :supplierNamesTable="supplierNamesTable" @changeTipsDialog="changeTipsDialog" ></maintainSupplier>
    <!-------------------commonsourcing类型以下零件采购项目未关联StartMonitor记录----------------------------------->
    <createDesignateTips ref="createDesignateTips" :starMonitorTable="starMonitorTable" @changeTipsDialog="changeTipsDialog"/>
    <!-------------------commonsourcing类型以下零件采购项目BNK审核未通过----------------------------------->    
    <noBnkDialog ref="noBnkDialog" :bnkNotApprovesTable="bnkNotApprovesTable" @changeTipsDialog="changeTipsDialog"/>
    <!-- RFQ错误提示框 -->
    <dialogTableTips ref="dialogTableTips" tableType="RFQ" :tableListData="blackTableListData"/>
    <!-------------------------结束本轮询价的时候，如果当前的轮次类型为开标，并且rfq状态为询价中，当前轮次状态是进行中则需要填写一个结束备注-------->
    <iDialog :visible.sync="showReason"
             :title="language('QINGITANXIEJIESUYUANY', '结束原因')"
             width="500px">
      <div>
        <iInput rows="5"
                maxlength="200"
                v-model="reason"
                type="textarea"></iInput>
      </div>
      <div class="margin-top20 padding-bottom20"
           style="text-align:right;">
        <iButton :loading="endingloading"
                 @click="updateRfqStatus('05')">{{ language('QUEDING', '确定') }}</iButton>
        <iButton @click="
            showReason = false;
            endingloading = false;
          ">{{ language('QUXIAO', '取消') }}</iButton>
      </div>
    </iDialog>
    <intoiDialog :tipsVislble.sync="tipsVislble" v-if="(navActivtyValue === '0' || navActivtyValue === '')" @changeActivityTabIndex="changeActivityTabIndex" />
  </iPage>
</template>
<script>
import { iButton, iPage, icon, iCard, iFormGroup, iFormItem, iText, iInput, iMessage, iNavMvp, iDialog } from 'rise';
import rfqPending from './components/rfqPending';
import rfqDetailInfo from './components/rfqDetailInfo';
import newRfqRound from './components/newRfqRound';
import rfqDetailTpzs from './components/rfqDetailTpzs';
import { getRfqDataList, addRfq, modification, updateRfqInfo, pageRfqRound, getRfqList } from '@/api/partsrfq/home';
import store from '@/store';
import { rfqCommonFunMixins } from 'pages/partsrfq/components/commonFun';
import { navList } from './components/data';
import intoiDialog from './components/index';
import nominateTypeDialog from '@/views/partsrfq/home/components/nominateTypeDialog';
import maintainSupplier from '@/views/partsrfq/home/components/maintainSupplier';
import createDesignateTips from '@/views/partsrfq/home/components/createDesignateTips';
import noBnkDialog from '@/views/partsrfq/home/components/noBnkDialog';
import { selectRfq, starMonitorAutoNomi } from '@/api/designate/designatedetail/addRfq';
import { getTabelData, waitDealtRfqTaskStatus } from '@/api/partsprocure/home';
import { pageMixins } from '@/utils/pageMixins';
import { tableTitle, form } from '@/views/partsprocure/home/components/data';
import { getRfqInfo } from '@/api/costanalysismanage/rfqdetail';
import { checkApply } from '@/api/modelTargetPrice/index';
import iLoger from 'rise/web/components/iLoger';
import { partProjTypes, roundsType } from '@/config';
import { roleMixins } from "@/utils/roleMixins";
import {
  waitStarMonitorUpdate,
  cancelWaitStarMonitorUpdate
  
} from '@/api/partsrfq/editordetail';
import { mockData } from './mock.js';
import { linieQueryForm } from '../../aeko/detail/components/partsList/data';
import  dialogTableTips  from '@/views/partsrfq/components/dialogTableTips';
export default {
  components: {
    iButton,
    iPage,
    icon,
    iCard,
    iFormGroup,
    iFormItem,
    iText,
    iInput,
    rfqPending,
    rfqDetailInfo,
    newRfqRound,
    iNavMvp,
    rfqDetailTpzs,
    nominateTypeDialog,
    iLoger,
    iDialog,
    maintainSupplier,
    createDesignateTips,
    noBnkDialog,
    dialogTableTips,
    intoiDialog
  },
  mixins: [rfqCommonFunMixins, pageMixins, roleMixins],
  data () {
    return {
      tipsVislble:false,
      showReason: false,
      navActivtyValue: '',
      navList: navList,
      editStatus: false,
      newRfqRoundDialog: false,
      activityTabIndex: '0',
      baseInfo: {
        currentRoundsStatus: '',
        currentRounds: '',
        currentStatus: '',
        rfqName: '',
        categoryCode: '',
        categoryName: ''
      },
      baseInfoLoading: false,
      tabShowStatus: true,
      newRfqRoundList: [],
      newRfqOpenValidateLoading: false,
      nominateTypeDialogVisible: false,
      parmarsHasRfq: JSON.parse(JSON.stringify(form)),
      newRfqRoundDialogRes: {},
      rfqloading: false,
      endingloading: false,
      transferlaoding: false,
      disabled: true,
      canRegiste: false,
      linieUserId: '',
      childFnList: [],
      checkApplyLoading: false,
      endEngotiationlaoding: false,
      partProjTypes,
      reason: '',
      roundsType,
      rfqInfo: {},
      starMonitorTable:[],
      supplierNamesTable:[],
      bnkNotApprovesTable:[],
      bnkNotApprovesShow:false,
      supplierNamesShow:false,
      projectPartDTOSShow:false,
      beforeCreate: false,
      blackTableListData:[],
      createDesignateLoading:false,
      isCommonSurcingStar:false,
      isLinieUser:true,
      isInquiryUser:true,
      isInquiryRfqStatus:false,
      isLiniefqStatus:false,
      notAllow:false,
      isPosition:false,
      isInit: true
    };
  },  
  async created () {
    //是否是linie 如果不是linie 无法看见 【转询价】按钮
    // let linieTypeCode = ["ZYCGGZ","ZYCGKZ","LINIE"]
    //是否是询价采购员 如果不是 无法看见【转谈判】按钮
    // let inquiryTypeCode = ["PJCGY","FJCGY","PJCGGZ","FJCGGZ",'QQCGGZ',"QQCGKZ","FJCGKZ","PJCGKZ","QQCGY"]
    // this.$store.state.permission.userInfo.roleList.forEach(val=>{
      // linieTypeCode.includes(val.code) ? this.isLinieUser = true:''
      // inquiryTypeCode.includes(val.code) ? this.isInquiryUser = true:''
    // })
    if(this.navActivtyValue==0||this.navActivtyValue==''){
      await this.firstInit()
    }
    this.getPartTableList = this.$store.state.rfq.partfunc;
    this.getTableList();
    await this.getBaseInfo()
    //linie
    let efqLinieStatus = ["谈判完成",'谈判中',"转谈判"]
    //询价
    let efqinquiryStatus = ["未询价",'询价中',"转询价"]
    efqLinieStatus.includes(this.baseInfo.statusName) ? this.isLiniefqStatus = true :this.isLiniefqStatus = false    
    efqinquiryStatus.includes(this.baseInfo.statusName) ? this.isInquiryRfqStatus = true :this.isInquiryRfqStatus = false    
  },
  provide: function () {
    return {
      getBaseInfo: this.getBaseInfo, //当前是一个请求
      getbaseInfoData: this.getbaseInfoData, //直接reture当前请求完的数据
      getDisabled: this.getDisabled,
      registerFn: this.registerFn,
      isRfqStatus:this.isRfqStatus,
      isPos:this.isPos
    };
  },
  methods: {
    // 首次进入
    async firstInit(){
      if(this.$route.query.id){
        const isLinie = this.roleList.includes('LINIE') || this.roleList.includes('ZYCGY'); // 专业采购员
        let result = await this.$store.dispatch('setTodoObj',this.$route.query.id); //获取任务状态 true: 有未申请的任务
        // 从谈判助手跳过来的不再跳回去
        if(this.$route.query.form!='assistant'){
          // Linie 直接跳到谈判助手
          if(isLinie){
            this.$router.push({
              path:'/sourceinquirypoint/sourcing/partsrfq/assistant',
              query:this.$route.query
            })
            return
          }
          // 没有未申请就跳到谈判助手
          if(!result){
            this.$router.push({
              path:'/sourceinquirypoint/sourcing/partsrfq/assistant',
              query:this.$route.query
            })
          }else{
            this.changeActivityTabIndex('0')
          }
        }
        // 有未申请就跳到待办
        if(result){
          this.changeActivityTabIndex('0')
        }
      }
    },
    // 
    showTodo(){
      if(this.baseInfo.currentRounds=='1'){
        this.getTodoInfo()
      }
    },
    async getTodoInfo(){
      this.tipsVislble = false
      if(this.$route.query.id){
        let todoObj = this.$store.state.rfq.todoObj
        let arr = Object.values(todoObj).filter(i=>i.status!='已完成')
        this.tipsVislble = arr.length ? true : false
      }
    },
    goToCesPage () {
      const router = this.$router.resolve({
        path: `/bidding/test/addManual/${this.$route.query.id}`,
      });
      window.open(router.href, '_blank');
    },
    handleApplyModuleTargetPrice () {
      this.checkApplyLoading = true;
      const rfqId = this.baseInfo.id || this.$route.query.id;
      checkApply(rfqId)
        .then((res) => {
          if (res?.result) {
            const item = { rfqId: rfqId, applyType: '1', isAgain: res.data || false };
            this.$router.push({ path: '/targetpriceandscore/modeltargetprice/detail', query: item });
          } else {
            iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn);
          }
        })
        .finally(() => {
          this.checkApplyLoading = false;
        });
    },
    registerFn (fn) {
      this.childFnList.push(fn);
    },
    isRfqStatus() {
      return  this.isCommonSurcingStar
    },  
    isPos() {
      return  this.isPosition
    },
    getbaseInfoData () {
      return this.baseInfo;
    },
    /**
     * @description:  //获取表格数据 为新件轮次做数据准备
     * @param {*}
     * @return {*}
     */
    getTableList () {
      if (this.$route.query.id) {
        this.confirmTableLoading = true;
        this.parmarsHasRfq['rfqId'] = this.$route.query.id || '';
        this.parmarsHasRfq['size'] = this.pageSize || 10;
        this.parmarsHasRfq['current'] = this.currPage || 1;
        this.parmarsHasRfq['status'] = '';
        this.parmarsHasRfq["isRfqPartList"] = true;
        this.parmarsHasRfq["positionCtrl"] = false;
        // this.parmarsHasRfq['linieId'] = this.linieUserId;
        // this.parmarsHasRfq['buyerId'] = this.baseInfo.buyerId;
        getTabelData(this.parmarsHasRfq)
          .then((res) => {
            this.$store.dispatch(
              'setPendingPartsList',
              res.data.map((r) => {
                return { ...r, ...{ purchaseProjectId: r.id } };
              })
            );
          })
          .catch(() => (this.confirmTableLoading = false));
      }
    },
    changeRouter (router) { },
    backPage () {
      this.$router.go(-1);
    },
    nameProcessor (val) {
      if (!val) return '';
      const arr = val.split(',');
      if (arr.length > 3) {
        return `${arr.splice(0, 3).join(',')}...`;
      } else {
        return val;
      }
    },
    getName(val){
      if(Array.isArray(val)){
        if(val.length){
          return val.join(',')
        }else{
          return ''
        }
      }else{
        return val
      }
    },
    getBaseInfo (dialogPage) {
      return new Promise(resolve => {
        this.baseInfoLoading = true;
        if (this.$route.query.id) {
          this.isInit = false
          getRfqInfo({
            rfqId: this.$route.query.id,
          })
            .then((res) => {
              // const res = mockData;
              if (res.code == 200 && res.data) {
                this.baseInfo = res.data;
                this.isPosition = res.data.isPosition;
                this.rfqInfo = res.data;
                this.disabled = !!res.data.isFreeze;
                if (dialogPage) {
                  //如果是由保存和创建的地方点击过来的。并且当前如果是开标和竞价，则需要自动定位的询价管理页签。
                  this.activityTabIndex = dialogPage;
                }
                this.isPendingRfqStatus(this.baseInfo.statusName) === true ? this.isCommonSurcingStar = true: ''             
                this.childFnList.forEach((i) => i());
                if (typeof this.$store.state.rfq.partfunc === 'function') this.getPartTableList();
              } else {
                iMessage.error(this.language('HUOQURFQDINGDIANXINXISHIBAI', '获取RFQ定点信息失败'));
                this.baseInfo = '';
              }
            })
            .finally(() => {
              this.baseInfoLoading = false
              this.canRegiste = true
              resolve()
            });
        } else {
          this.disabled = true;
          this.isInit = true
          this.baseInfoLoading = false;
          resolve()
        }
      })
    },
    changeNav (target) {
      this.navActivtyValue = target.index;
    },
    changeActivityTabIndex(index){
      this.activityTabIndex = index
      this.tipsVislble = false
    },
    async newRfq () {
      const pendingPartsList = this.$store.state.rfq.pendingPartsList;
      this.newRfqOpenValidateLoading = true;

      try {
        await this.getNewRoundList()
        if(this.notAllow) return
        // if (pendingPartsList.length === 0 || this.newRfqRoundList.length === 0) {
        //   iMessage.warn(this.language('LK_RFQLINGJIANHUOZHERFQGONGYINGSHANGWEIKONG', 'RFQ零件或者RFQ供应商为空，不能创建RFQ轮次'));
        //   return false;
        // } else {
          this.newRfqRoundDialog = true;
        // }
      } finally {
        this.newRfqOpenValidateLoading = false;
      }
    },
    async updateRfqStatus (updateType) {
      const query = this.$route.query;
      if (updateType === '06') {
        this.rfqloading = true;
      }
      if (updateType === '05') {
        if (this.baseInfo.roundsType == this.roundsType.zxkb && this.baseInfo.currentRoundsStatusCode == 'RUNNING' && this.baseInfo.currentStatus == 'IN_REQ') {
          if (!this.showReason) return (this.showReason = true);
          if (!this.reason) return iMessage.warn(this.language('NINGDANGQIANHAIWEITXX', '您当前还未填写原因，请填写后再试！'));
        }
        this.endingloading = true;
      }
      if (updateType === '03') {
        this.transferlaoding = true;
      }
      if (updateType === '07') {
        this.endEngotiationlaoding = true;
      }
      const req = {
        updateType,
        tmRfqIdList: [query.id],
        userId: store.state.permission.userInfo.id,
        reason: this.reason,
      };

      try {
        const res = await modification(req);
        if(updateType === '06' && res.code == '501'){
          this.blackTableListData = res.data || [];
          this.$refs.dialogTableTips.show(); 
        }else{
          this.resultMessage(res);
          // 发出首轮询价时触发
          if(res?.code=='200' && updateType === '06' && this.baseInfo.currentRounds=='1'){
            this.getTodoInfo()
          }
        }
        this.getBaseInfo();
      } finally {
        if (updateType === '06') {
          this.rfqloading = false;
        }
        if (updateType === '05') {
          this.endingloading = false;
          this.showReason = false;
          this.reason = '';
        }
        if (updateType === '03') {
          this.transferlaoding = false;
        }
        if (updateType === '07') {
          this.endEngotiationlaoding = false;
        }
      }
    },
    edit () {
      this.oldrfqName = JSON.parse(JSON.stringify(this.baseInfo.rfqName))
      this.editStatus = !this.editStatus;
    },
    cancel(){
      this.baseInfo.rfqName = this.oldrfqName;
      this.editStatus = !this.editStatus;
    },
    async save () {
      const rfqName = this.baseInfo.rfqName;
      if (!rfqName.trim()) {
        iMessage.warn(this.language('LK_RFQMINGCHNEGBUNENGWEIKONG', 'RFQ名称不能为空'));
        return false;
      }
      this.editStatus = !this.editStatus;
      const query = this.$route.query;
      const params = {
        userId: store.state.permission.userInfo.id,
        cf: this.baseInfo.cf,
        ep: this.baseInfo.ep,
        mq: this.baseInfo.mq,
        pl: this.baseInfo.pl,
        rfqName: this.baseInfo.rfqName,
      };
      if (query.id) {
        const req = {
          rfqId: query.id,
          ...params,
        };
        const res = await updateRfqInfo(req);
        this.resultMessage(res);
        this.getBaseInfo();
      } else {
        const req = {
          userName: store.state.permission.userInfo.userName,
          ...params,
        };
        const res = await addRfq(req);
        this.linieUserId = res.data.linieUserId;
        this.resultMessage(res);
        this.$router.push({
          path: `/sourceinquirypoint/sourcing/partsrfq/editordetail?id=${res.data.rfqId}`,
        });
        this.getBaseInfo();
        this.tabShowStatus = false;
        this.$nextTick(() => {
          this.tabShowStatus = true;
        });
      }
    },
    toLogPage () {
      const id = this.$route.query.id;
      if (id) {
        window.open(`/#/log?recordId=${id}`, '_blank');
      }
    },
    async getNewRoundList () {
      const id = this.$route.query.id;
      if (id) {
        const req = {
          findType: '10',
          rfqId: id,
          current: 1,
          // size: 10,
          size: 9999,
        };
        try {
          const res = await pageRfqRound(req);

          if (res.code == 200) {
            this.newRfqRoundDialogRes = res;
            this.newRfqRoundList = res.data;
            this.notAllow = false
          } else {
            iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
            this.notAllow = true
          }
        } finally {

          this.newRfqOpenValidateLoading = false;
        }
      }
    },
    // eslint-disable-next-line no-undef
    moment,
    //
    //common sourcing 创建定点申请 打开提示框
    changeTipsDialog(val){

      if(val === 'supplier') {
        this.$refs.maintainSupplier.close() 
        if(this.projectPartDTOSShow) {
          this.$refs.createDesignateTips.show() 
        } else if(this.bnkNotApprovesShow) {
          this.$refs.noBnkDialog.show() 
        }
      }
      if(val === 'starMonitor') {
        this.$refs.createDesignateTips.close() 
        this.bnkNotApprovesShow ? this.$refs.noBnkDialog.show() :''
      }
      val === 'BNK' ? this.$refs.noBnkDialog.close() :''

    },
    // 创建定点申请
    createDesignate () {
      // this.nominateTypeDialogVisible = false
      this.createDesignateLoading = true;
      //如果零件类型为common sourcing 类型时候调用的创建定点申请接口
      if(this.baseInfo && this.baseInfo.partProjectType[0] && this.baseInfo.partProjectType[0] === this.partProjTypes.GSCOMMONSOURCING || this.baseInfo.partProjectType[0] === this.partProjTypes.FSCOMMONSOURCING )
      {
        starMonitorAutoNomi(this.$route.query.id).then(res=>{
          const message = this.$i18n.locale === 'zh' ? res.desZh : res.desEn;
          if(res.code === '200') {
            this.supplierNamesTable = res.data.supplierNames //供应商列表记录  
            this.starMonitorTable = res.data.projectPartDTOS  //fs号列表（未关联StarMonitor记录）
            this.bnkNotApprovesTable = res.data.bnkNotApproves  //fs号列表（零件采购项⽬BNK审核未通过，⽆法创建定点申请列表）
            res.data.supplierNames !== null ? this.supplierNamesShow = true : this.bnkNotApprovesShow = false       
            res.data.projectPartDTOS !== null? this.projectPartDTOSShow = true : this.projectPartDTOSShow = false       
            res.data.bnkNotApproves !== null? this.bnkNotApprovesShow = true : this.bnkNotApprovesShow = false 
            if(this.supplierNamesShow || this.projectPartDTOSShow || this.bnkNotApprovesShow){
              if(this.supplierNamesShow ) {
                this.$refs.maintainSupplier.show() 
              } else if(this.projectPartDTOSShow ) {
                this.$refs.createDesignateTips.show() 
              } else {
                this.$refs.noBnkDialog.show() 
              }
            } else {
              this.$router.push({
                path: '/designate/rfqdetail',
                query: {
                  desinateId: res.data.nominateId,
                  designateType: res.data.nominateProcessType,
                  partProjType: this.$route.query.businessKey,
                  businessKey: this.$route.query.businessKey,
                },
              })
            }
          } else{
            iMessage.error(message);
          }
          this.createDesignateLoading = false
        })
         .catch(() => (this.createDesignateLoading = false));
      } else {
        selectRfq({
          rfqIdArr: [this.$route.query.id],
        })
          .then((res) => {
            const message = this.$i18n.locale === 'zh' ? res.desZh : res.desEn;
  
            if (res.code == 200) {
              iMessage.success(message);
              this.$router.push({
                path: '/designate/rfqdetail',
                query: {
                  desinateId: res.data.nominateId,
                  designateType: res.data.nominateProcessType,
                  partProjType: this.$route.query.businessKey,
                  businessKey: this.$route.query.businessKey,
                },
              })
            } else {
              iMessage.error(message);
            }
  
            this.createDesignateLoading = false;
          })
          .catch(() => (this.createDesignateLoading = false));
      }
    },
    getDisabled () {
      // console.log(this.disabled)
      return this.disabled;
    },
    //等待StarMonitor定点更新
    waitStarmonitor() {
       const rfqId = this.baseInfo.id || this.$route.query.id;
      waitStarMonitorUpdate(rfqId).then(res=>{
         if(res.code === '200') {
          this.$router.go(0)
          iMessage.success(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        }
      })
    },
    cancelWaitStarmonitor() {
       const rfqId = this.baseInfo.id || this.$route.query.id;
      cancelWaitStarMonitorUpdate(rfqId).then(res=>{
        if(res.code === '200') {
          this.$router.go(0)
          iMessage.success(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        }
      })
    },
    //RFQ是否是待定状态
    isPendingRfqStatus(statusName) {
      let RFQ_STATE_ENUM=[ // RFQ状态
         "未询价", 
         "询价中", 
         "转询价", 
         "谈判中", 
         "转谈判", 
         "谈判完成", 
      ]
      let flag = true 
      RFQ_STATE_ENUM.indexOf(statusName) == -1 ? flag = false:''
      return flag
    },
  }
}
</script>
<style lang="scss" scoped>
.pageTitle {
  .nav-box {
    flex: 1;
    margin-right: 30px;
    justify-content: space-between;
    & > span {
      font-size: 20px;
      font-weight: bold;
    }

    .ml30 {
      margin-left: 30px;
    }
  }

  .btnList {
    > span {
      font-size: 20px;
      margin-left: 10px;
    }
  }
}

.row {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  justify-content: space-between;

  .col {
    width: 33.33%;
    border-right: 1px solid $color-border;
    margin-right: 20px;
    padding-right: 20px;

    &:last-child {
      margin-right: 0px;
      border-right: none;
    }
    .input-box{
      display: flex;
      width: 100%;
      .btn-box{
        display: inline-flex;
        padding: 0 10px;
        .save{
          color: #66b1ff;
        }
        .cancel{
          color: #f78989;
        }
      }
    }
  }

  .items {
    width: 300px;
  }

  .edit-button-row {
    float: right;
  }

  .mb0 {
    margin-bottom: 0px;
  }
}

.baseinfo-title {
  font-size: 18px;
  font-weight: bold;
  line-height: 21px;
  color: #131523;
  margin-bottom: 10px;
}

.log-icon {
  font-size: 20px;
}

.log-word {
  color: $color-blue;
  margin-left: 4px;
}

.nav-style {
  display: flex;
  align-items: center;
  margin-left: 20px;
}

.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
</style>
