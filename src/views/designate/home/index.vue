<!--
 * @Author: wentliao
 * @Date: 2021-05-20 14:07:50
 * @Description: 
-->
<template>
  <iPage class="designateHome" v-permission.auto="SOURCING_NOMINATION_PAGE|定点管理页面">
    <!-- 头部 -->
    <headerNav />
    <!-- 筛选框 -->
    <div style="clear: both"></div>
    <!-- 搜索区 -->
    <search @search="handSearch" ref="searchForm" />
    <!-- 表格 -->
    <iCard class="designateTable">
      <div class="clearFloat">
        <span class="font18 font-weight">{{ language( 'DINGDIANSHENQINGZONGHEGUANLI', '定点申请综合管理' ) }}</span>
        <div class="designateEditControl floatright">
          
          <!-- 新建定点申请 -->
          <iButton
            @click="createNomination"
            v-permission.auto="SOURCING_NOMINATION_XINJIANLINGJIANDINGDIANSHENQING|新建零件定点申请"
          >
            {{ language('nominationLanguage_XinJianLingJIanDingDianShengQIng', '新建零件定点申请') }}
          </iButton>

          <!-- 冻结RS -->
          <iButton
            @click="frozeRS(true)"
            v-permission.auto="SOURCING_NOMINATION_DONGJIERSDAN|冻结RS单">
            {{language('nominationLanguage_DongJieRS', '冻结RS单')}}
          </iButton>

          <!-- 解冻RS -->
          <iButton
            @click="frozeRS(false)"
            v-permission.auto="SOURCING_NOMINATION_JIEDONGRSDAN|解冻RS单">
            {{language('nominationLanguage_JieDongRS', '解冻RS单')}}
          </iButton>
          
          <!-- 冻结 -->
          <iButton
            @click="freeze"
            :loading="btnLoading.freeze"
            v-permission.auto="SOURCING_NOMINATION_DONGJIE|冻结">
            {{language('LK_DONGJIE', '冻结')}}
          </iButton>

          <!-- 解冻 -->
          <iButton
            @click="freeze(false)"
            v-permission.auto="SOURCING_NOMINATION_JIEDONG|解冻">
            {{language('LK_JIEDONG', '解冻')}}
          </iButton>

          <!-- 定点 -->
          <iButton
            @click="confirm"
            v-permission.auto="SOURCING_NOMINATION_DINGDIAN|定点">
            {{language('nominationLanguage_DINGDIAN', '定点')}}
          </iButton>

          <!-- 撤回 -->
          <iButton
            @click="handleBatchRevoke"
            v-permission.auto="SOURCING_NOMINATION_CHEHUI|撤回"
          >
            {{ language("nominationLanguage_CheHui", '撤回') }}
          </iButton>
          <!-- 批量删除 -->
          <iButton
            @click="handleBatchDelete"
            v-permission.auto="SOURCING_NOMINATION_SHANCHU|删除"
          >
            {{ language("nominationLanguage_ShanChu", '删除') }}
          </iButton>
          <!-- 会外流转 -->
          <iButton
            @click="mettingTransform"
            v-permission.auto="SOURCING_NOMINATION_HUIWAILIUZHUAN|会外流转"
          >
            {{ language("HUIWAILIUZHUAN", '会外流转') }}
          </iButton>
          <iButton
            @click="tranformRecall"
            v-permission.auto="SOURCING_NOMINATION_LIUZHUANTUIHUI|流转退回"
          >
            {{ language("LIUZHUANTUIHUI", '流转退回') }}
          </iButton>
          <!-- 提交一致性校验 -->
          <iButton
            @click="consistenceCheck"
            v-permission.auto="SOURCING_NOMINATION_TIJIAOYIZHIXINGJIAOYAN|提交一致性校验"
          >
            {{ language("nominationLanguage_TiJiaoYiZhiXingJiaoYan", '提交一致性校验') }}
          </iButton>
          <!-- 取消MTZ绑定 -->
          <iButton
          v-permission.auto="SOURCING_NOMINATION_QUXIAOMTZBANGDING|取消MTZ绑定"
            @click="ttss"
          >
            {{ language("QUXIAOMTZBANGDING", "取消MTZ绑定") }}
          </iButton>
          <!-- 取消定点 -->
          <iButton
            v-permission.auto="SOURCING_NOMINATION_QUXIAODINGDIAN|取消定点"
            @click="cancelNominate"
          >
            {{ language("QUXIAODINGDIAN", "取消定点") }}
          </iButton>
          <buttonTableSetting @click="edittableHeader"></buttonTableSetting>
        </div>
      </div>
      <tablelist
        permissionKey="DESIGNATE_HOME"
        class="aotoTableHeight"
        :tableData="tableListData"
        :tableTitle="tableTitle"
        :tableLoading="tableLoading"
        :lang="true"
        v-permission.auto="SOURCING_NOMINATION_NOMINATETABLE|表格"
        @handleSelectionChange="handleSelectionChange"
        ref="tableList"
      >
      <!-- <template #LK_CAOZUO="scope">
        <span><a href="javascript:;" @click="detail(scope.row)">{{'定点详情'}}</a></span>
      </template> -->
      
      <!-- 定点单号 -->
      <template #nominateName="scope">
        <!-- <div class="flexBox"> -->
          <!-- <div class="left"> -->
            <div class="flexBox">
              <el-tooltip :content="scope.row.nominateName" placement="top" effect="light">
                <div class="link" @click="viewNominationDetail(scope.row)">{{ scope.row.nominateName }}</div>
              </el-tooltip>
              <icon v-if="scope.row.mtzApplyId" class="iconMTZ right" symbol name="iconMTZ" />
            </div>
          <!-- </div> -->
          <!-- <div class="rigth icon-gray cursor arrow" @click="viewNominationDetail(scope.row)">
            <icon symbol class="show" name="icontiaozhuananniu" />
            <icon symbol class="active" name="icontiaozhuanxuanzhongzhuangtai" />
          </div> -->
        <!-- </div> -->
      </template>
      <!-- 定点类型 -->
      <!-- <template #nominateProcessType="scope">
        <span>{{(scope.row.nominateProcessType && scope.row.nominateProcessType.desc) || ''}}</span>
      </template> -->
      <!-- 状态 -->
      <!-- <template #applicationStatus="scope">
        <span>{{(scope.row.applicationStatus && scope.row.applicationStatus.desc) || ''}}</span>
      </template> -->
      <!-- 会议状态 -->
      <!-- <template #meetingStatus="scope">
        <span>{{(scope.row.meetingStatus && scope.row.meetingStatus.desc) || ''}}</span>
      </template> -->

      <!-- re冻结日期 -->
      <template #rsFreezeDate="scope">
        <span>{{scope.row.rsFreezeDate | dateFilter("YYYY-MM-DD")}}</span>
      </template>
      
      <!-- 一致性校验 -->
      <template #isPriceConsistent="scope">
        <span>{{[null, undefined].includes(scope.row.isPriceConsistent) ? '' : (scope.row.isPriceConsistent ? '通过' : '不通过')}}</span>
      </template>
      <!-- SEL单据确认状态 -->
      <template #selStatus="scope">
        <div>
          <!-- CRW1-1574 专业采购员，且SEL单据确认状态为未确认支持上传sel附件 -->
          <a
            href="javascript:;" 
            class="selStatus-link" 
            @click="confirmSelSheet(scope.row)" 
            v-if="userRole.isZYCG && (scope.row.selStatus === 'UNCONFIRMED' || scope.row.selStatus === 'CONFIRMED')">
          {{scope.row.selStatusDesc}}
        </a>
          <span v-else>{{scope.row.selStatusDesc}}</span>
        </div>
      </template>

      <!-- 定点日期 -->
      <template #nominateDate="scope">
        <span>{{scope.row.nominateDate | dateFilter("YYYY-MM-DD")}}</span>
      </template>

      <template #freezeDate="scope">
        <span>{{scope.row.freezeDate | dateFilter("YYYY-MM-DD")}}</span>
      </template>
      
      </tablelist>
      <iPagination
        v-update
        @size-change="handleSizeChange($event, getFetchData)"
        @current-change="handleCurrentChange($event, getFetchData)"
        background
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :layout="page.layout"
        :current-page="page.currPage"
        :total="page.totalCount"
      />
    </iCard>

    <!-- sel确认弹窗 -->
    <selDialog :visible.sync="selDialogVisibal" :nomiAppId="selNominateId" :readOnly="false" />
    <cancelNominateDialog :visible.sync="cancelNominateDialogVisibal" :nomiId="nomiId" />
    <!-- 撤回弹窗 -->
    <revokeDialog :visible.sync="showRevokeDialog" @confirm="handleBatchRevoke(...arguments, false)" ref="revokeForm" />
    <!-- 新建定点申请弹窗 -->
    <rfqDialog :visible.sync="newNomiAppStatus" :nomiAppId="selNominateId" :readOnly="false" />

    <!-- 黑名单校验弹窗提示 -->
        <dialogTableTips ref="dialogTableTips" tableType="SUGGESTIONFROZEN" :tableListData="blackTableListData"/>
  </iPage>
</template>

<script>
import { tableTitle } from './components/data'
import headerNav from '@/components/headerNav'
import search from './components/search'
// import tablelist from "@/views/designate/supplier/components/tableList";
import tablelist from "@/components/iTableSort";
import { tableSortMixins } from "@/components/iTableSort/tableSortMixins";
import { 
  getNominationList,
  batchRevoke,
  batchDelete,
  nominateRreeze,
  nominateUnRreeze,
  nominateConfirm,
  rsFrozen,
  rsUnFrozen,
  consistenceCheck,
  nomiApprovalProcess,
  tranformRecall,
  unbindMtzCheck,
  unbindMtz,
  cancelNominate
} from '@/api/designate/nomination'
// 前端配置文件里面的定点类型
// import { applyType } from '@/layout/nomination/components/data'
import selDialog from './components/selDialog'
import cancelNominateDialog from './components/cancelNominateDialog'
import revokeDialog from './components/revokeDialog'
import rfqDialog from './components/rfqDialog'

import { pageMixins } from '@/utils/pageMixins'
import filters from "@/utils/filters"
import {roleMixins} from '@/utils/roleMixins'

import {
  iPage,
  iCard,
  iButton,
  iPagination,
  iMessage,
  icon
} from "rise";

import  dialogTableTips  from '@/views/partsrfq/components/dialogTableTips';
import buttonTableSetting from '@/components/buttonTableSetting'
export default {
  mixins: [ filters, pageMixins, roleMixins,tableSortMixins ],
  data() {
    return {
      tableListData: [],
      tableLoading: false,
      tableTitle: tableTitle,
      selectTableData: [],
      startLoding: false,
      carTypeList: [],
      // 定点管理员上传sel状态待确认的sel附件列表
      selNominateId: '',
      selDialogVisibal: false,
      nomiId:'',
      cancelNominateDialogVisibal: false,
      tranformRecallLoading: false,
      showRevokeDialog: false,
      // 新建定点申请单
      newNomiAppStatus: false,
      blackTableListData:[],
      btnLoading:{
        freeze:false, // 冻结
      },
    }
  },
  components: {
    iPage,
    iCard,
    iButton,
    iPagination,
    headerNav,
    search,
    tablelist,
    selDialog,
    revokeDialog,
    rfqDialog,
    icon,
    dialogTableTips,
    buttonTableSetting,
    cancelNominateDialog
  },
  mounted() {
    this.getFetchData()
  },
  methods: {
    // 新建零件定点申请
    createNomination() {
      // 缓存/更新定点申请类型
      this.$store.dispatch('setNominationTypeDisable', false)
      // this.$nextTick(() => {
      //   const routeData = this.$router.resolve({path: '/designate/rfqdetail'})
      //   window.open(routeData.href, '_blank')
      // })
      // 修改为弹窗选择rfq创建
      this.newNomiAppStatus = true
    },
    // 查看详情
    viewNominationDetail(row) {
      // 缓存nominateProcessType
      // this.$store.dispatch('setNominationType', row.nominateProcessType)
      // 禁用nominateProcessType编辑
      this.$store.dispatch('setNominationTypeDisable', true)
      this.$nextTick(() => {
        const routeData = this.$router.resolve({
          path: '/designate/details',
          query: {
            desinateId: row.id, 
            mtzApplyId: row.mtzApplyId, 
            sd: 1,
            designateType: (row.nominateProcessType && row.nominateProcessType.code) || row.nominateProcessType || '',
            partProjType: (row.partProjType && row.partProjType.code) || row.partProjType || '',  
            businessKey: (row.partProjType && row.partProjType.code) || row.partProjType || '',
            applicationStatus: (row.applicationStatus && row.applicationStatus.code) || row.applicationStatus || '',
          }
        })
        window.open(routeData.href, '_blank')
      })
    },
    handSearch(data) {
      this.page.currPage = 1
      this.getFetchData()
    },
    // 获取定点管理列表
    getFetchData() {
      this.tableLoading = true
      getNominationList({
        ...this.$refs.searchForm.form,
        current: this.page.currPage,
        size: this.page.pageSize
      }).then(res => {
        this.tableLoading = false
        if (res.code === '200') {
          this.tableListData = res.data.records || []
          this.page.totalCount = res.data.total
          console.log(this.selectTableData)
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
      }).catch(e => {
        iMessage.error(this.$i18n.locale === "zh" ? e.desZh : e.desEn)
        this.tableLoading = false
      })
    },
    // 多选
    handleSelectionChange(data) {
      this.selectTableData = data
    },
    // 批量撤回
    async handleBatchRevoke(revokeReason = '', validation = true) {
      if (validation && !this.selectTableData.length) {
        iMessage.error(this.language('nominationSuggestion_QingXuanZeZhiShaoYiTiaoShuJu','请选择至少一条数据'))
        return
      }
      if (validation){
        this.showRevokeDialog = true
        return
      }
      const confirmInfo = await this.$confirm(this.language('revokeSure','您确定要执行撤回操作吗？'))
      if (confirmInfo !== 'confirm') return
      const idList = this.selectTableData.map(o => Number(o.id))
      try {
        this.$refs['revokeForm'].loading = true
        const res = await batchRevoke({recallReason: revokeReason, nominateIdArr: idList})
        if (res.code === '200') {
          iMessage.success(res.data && (this.$i18n.locale === "zh" ? res.data.zhMsg : res.data.engMsg) || this.language('LK_CAOZUOCHENGGONG','操作成功'))
          this.getFetchData()
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
        this.$refs['revokeForm'].close()
      } catch (e) {
        this.$refs['revokeForm'].close()
        iMessage.error(this.$i18n.locale === "zh" ? e.desZh : e.desEn)
      }
    },
    // 批量删除
    async handleBatchDelete() {
      if (!this.selectTableData.length) {
        iMessage.error(this.language('nominationSuggestion_QingXuanZeZhiShaoYiTiaoShuJu', '请选择至少一条数据'))
        return
      }
      const confirmInfo = await this.$confirm(this.language('deleteSure','您确定要执行删除操作吗？'))
      if (confirmInfo !== 'confirm') return
      const idList = this.selectTableData.map(o => Number(o.id))
      try {
        const res = await batchDelete({nominateIdArr: idList})
        if (res.code === '200') {
          iMessage.success(this.language('LK_CAOZUOCHENGGONG','操作成功'))
          this.getFetchData()
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
      } catch (e) {
        iMessage.error(this.$i18n.locale === "zh" ? e.desZh : e.desEn)
      }
    },
    /**
     * 冻结
     * type: true 冻结
     * type: false 解冻
     */
    async freeze(type = true){
      const {selectTableData} = this;
      if(!selectTableData.length){
        iMessage.warn(this.language('nominationSuggestion_QingXuanZeZhiShaoYiTiaoShuJu','请选择至少一条数据'));
      }else{
        let confirmInfo = null;
        if (type) {
          confirmInfo = await this.$confirm(this.language('LK_NINQUERENZHIXINGDONGJIECAOZUOMA', '您确定要执行冻结操作吗？'));
        } else {
          confirmInfo = await this.$confirm(this.language('LK_NINQUERENZHIXINGJIEDONGCAOZUOMA', '您确定要执行解冻操作吗？'));
        }
        if (confirmInfo !== 'confirm') return;
        const nominateIdArr = selectTableData.map((item)=>Number(item.id));
        const data = {
          nominateIdArr,
        };
        this.btnLoading.freeze = true;
        try {
          const res = type ? await nominateRreeze(data) : await nominateUnRreeze(data)
          const { code } = res;
          this.btnLoading.freeze = false;
          if(code == 200){
            iMessage.success(this.language('LK_CAOZUOCHENGGONG','操作成功'));
            this.getFetchData()
          }else if(code == '501'){
            this.blackTableListData = res.data || [];
            this.$refs.dialogTableTips.show(); 
          }else{
            iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
          }
        } catch (e) {
          this.btnLoading.freeze = false;
          iMessage.error(this.$i18n.locale === "zh" ? e.desZh : e.desEn)
        }
      }
    },

    // 定点
    async confirm(){
      const {selectTableData} = this;
      if(!selectTableData.length){
        iMessage.warn(this.language('nominationSuggestion_QingXuanZeZhiShaoYiTiaoShuJu','请选择至少一条数据'));
      }else{
        const confirmInfo = await this.$confirm(this.language('LK_NINQUERENZHIXINGDINGDIANCAOZUOMA','您确定执行定点操作吗？'));
        if (confirmInfo !== 'confirm') return;
        const nomiAppIdList = selectTableData.map((item)=>Number(item.id));
        const data = {
          nomiAppIdList,
        };
        await nominateConfirm(data).then((res)=>{
          const { code } = res;
          if(code == 200){
            iMessage.success(this.language('LK_CAOZUOCHENGGONG', '操作成功'));
            this.getFetchData()
          }else{
            iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
          }
        }).catch((e)=>{
          iMessage.error(this.$i18n.locale === "zh" ? e.desZh : e.desEn)
        })
      }
    },
    // rs冻结
    async frozeRS(state){
      const {selectTableData} = this;
      if(!selectTableData.length){
        iMessage.warn(this.language('nominationSuggestion_QingXuanZeZhiShaoYiTiaoShuJu','请选择至少一条数据'));
      }else{
        let confirmInfo = null
        if (state) {
          confirmInfo = await this.$confirm(this.language('LK_NINQUERENZHIXINGDONGJIECAOZUOMA', '您确定要执行冻结操作吗？'));
        } else {
          confirmInfo = await this.$confirm(this.language('LK_NINQUERENZHIXINGJIEDONGCAOZUOMA', '您确定要执行解冻操作吗？'));
        }
        if (confirmInfo !== 'confirm') return;
        const nomiAppIdList = selectTableData.map((item)=>Number(item.id));
        const data = {
          ids: nomiAppIdList,
        };
        try {
          const res = state ? await rsFrozen(data) : await rsUnFrozen(data)
          const { code } = res;
          if(code == 200){
            iMessage.success(this.language('LK_CAOZUOCHENGGONG','操作成功'));
            this.getFetchData()
          }else{
            iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
          }
        } catch(e) {
          iMessage.error(this.$i18n.locale === "zh" ? e.desZh : e.desEn)
        }
      }
    },
    // 提交一致性校验
    async consistenceCheck(){
      const {selectTableData} = this;
      if(!selectTableData.length){
        iMessage.warn(this.language('nominationSuggestion_QingXuanZeZhiShaoYiTiaoShuJu','请选择至少一条数据'));
      }else{
        const confirmInfo = await this.$confirm(this.language('LK_NINQUEDINGZHIXINGYIZHIXINGJIAOYANMA','您确定执行一致性校验吗？'));
        if (confirmInfo !== 'confirm') return;
        const nominateIdArr = selectTableData.map((item)=>Number(item.id));
        const data = {
          nominateIdArr,
        };
        consistenceCheck(data).then((res)=>{
          const { code } = res;
          if(code == 200){
            if (res.data.consistence) {
              iMessage.success(this.language('LK_CAOZUOCHENGGONG', '操作成功'));
              this.getFetchData()
            } else {
              this.$message({
                dangerouslyUseHTMLString: true,
                type: "error",
                message: Array.isArray(res.data.messageList) ? res.data.messageList.reduce((acc, cur, index) => {
                  return acc + `<p>${ this.$i18n.locale === "zh" ? cur.zhMsg : cur.engMsg }</p>${ index != res.data.messageList.length - 1 ? '<br/>' : '' }`
                }, "") : "Error"
              })
            }
          }else{
            iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
          }
        }).catch((e)=>{
          iMessage.error(this.$i18n.locale === "zh" ? e.desZh : e.desEn)
        })
      }
    },
    // 会外流转
    async mettingTransform(){
      const {selectTableData} = this;
      if(!selectTableData.length){
        iMessage.warn(this.language('nominationSuggestion_QingXuanZeZhiShaoYiTiaoShuJu','请选择至少一条数据'));
      }else{
        let confirmInfo = confirmInfo = await this.$confirm(this.language('LK_NINQUERENZHIXINGLIUZHUANCAOZUOMA', '您确定要执行流转操作吗？'));
        if (confirmInfo !== 'confirm') return;
        const nomiAppIdList = selectTableData.map((item)=>Number(item.id));
        const data = {
          nomiAppIds: nomiAppIdList,
        };
        try {
          const res = await nomiApprovalProcess(data)
          const { code } = res;
          if(code == 200){
            iMessage.success(this.language('LK_CAOZUOCHENGGONG','操作成功'));
            this.getFetchData()
          }else{
            iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
          }
        } catch(e) {
          iMessage.error(this.$i18n.locale === "zh" ? e.desZh : e.desEn)
        }
      }
    },
    // sel附件列表弹窗
    confirmSelSheet(row) {
      console.log(row)
      this.selNominateId = row.id
      this.selDialogVisibal = true
    },
    // 流转退回
    tranformRecall() {
      if (!this.selectTableData.length) return iMessage.warn(this.language("QINGXUANZEXUYAOLIUZHUANTUIHUIDEDINGDIANSHENQINGDAN", "请选择需要流转退回的定点申请单"))
      if (this.selectTableData.some(item => item.nominateProcessType !== "TRANFORM")) return iMessage.warn(this.language("QINGXUANZELIUCHENGLEIXINGWEILIUZHUANDEDINGDIANSHENQINGDAN", "请选择流程类型为流转的定点申请单"))
      
      this.tranformRecallLoading = true

      tranformRecall({
        nominateIdArr: this.selectTableData.map(item => item.id),
        // recallReason: ""
      })
      .then(res => {
        const message = this.$i18n.locale === "zh" ? res.desZh : res.desEn

        if (res.code == 200) {
          iMessage.success(message)
          this.getFetchData()
        } else {
          iMessage.error(message)
        }
      })
      .finally(() => this.tranformRecallLoading = false)
    },
    // 取消MTZ绑定
    async ttss() {
      // 校验是否支持解绑
      const state = await this.unbindMtzCheck()
      if (state) {
        const data = {
          nomiId: this.selectTableData[0].id,
        };
        try {
          const confirmInfo = await this.$confirm(this.language('LK_NINGQUEDINGYAOQUXIAOMTZBANGDING', '您确定要取消MTZ绑定吗？'));
          if (confirmInfo !== 'confirm') return;
          const res = await unbindMtz(data)
          const { code } = res;
          if(code == 200){
            iMessage.success(this.language('LK_CAOZUOCHENGGONG','操作成功'));
            this.getFetchData()
          }else{
            iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
          }
        } catch(e) {
          iMessage.error(this.$i18n.locale === "zh" ? e.desZh : e.desEn)
        }
      }
    },
    // 取消MTZ绑定校验
    async unbindMtzCheck() {
      let state = true
      if (this.selectTableData.length !== 1) return iMessage.warn(this.language("QINGXUANZEYIGELIE","请选择一条数据！"))
      const data = {
        nomiId: this.selectTableData[0].id,
        isCheck: false
      };
      try {
        const res = await unbindMtzCheck(data)
        const { code } = res;
        if(code == 200){
          state = true
        }else{
          state = false
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
      } catch(e) {
        state = false
        iMessage.error(this.$i18n.locale === "zh" ? e.desZh : e.desEn)
      }
      return state
    },
    //取消定点 
    async cancelNominate(){
      if (this.selectTableData.length !== 1) return iMessage.warn(this.language("QINGXUANZEYIGELIE","请选择一条数据！"))
      const item = this.selectTableData[0]
      if(item.applicationStatus!='NOMINATE') return iMessage.warn(this.language("QINGXUANZEYIDINGDIANZHUANGTAIDESHUJUJINXINGCAOZUO","请选择已定点状态的数据进行操作！"))
      this.nomiId = item.id
      this.cancelNominateDialogVisibal = true
    },
  }
}
</script>

<style lang="scss" scoped>
.designateHome {
  .flexBox {
    display: flex;
    align-items: center;
    text-align: left;

    .left {
      flex: 1;
      width: 0;
    }

    .link {
      flex: 1;
      width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  .iconMTZ {
    margin-left: 5px;
    width: 25px;
  }

  .icon-gray {
    .show {
      display: inline-block;
    }

    .active {
      display: none;
    }
    
    &:hover {
      .show {
        display: none;
      }

      .active {
        display: inline-block;
      }
    }
  }

  .arrow {
    margin-left: 5px;
  }
  .designateEditControl {
    max-width: 85%;
    text-align: right;
    ::v-deep.el-button {
      margin-bottom: 20px;
    }
  }
}
.openLinkText {
  flex: 1;
  color: $color-blue;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
  width: 100vw;
}
.designateSearch {
  margin-top: 20px;
}
.selStatus-link {
  font-size: 12px;
  text-decoration: underline;
}
.aotoTableHeight{
  ::v-deep .el-table__body-wrapper {
    min-height: 422px !important;  
    overflow: auto !important ;
  }
}
</style>