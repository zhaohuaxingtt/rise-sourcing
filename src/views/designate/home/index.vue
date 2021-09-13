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
      <div class="margin-bottom20 clearFloat">
        <span class="font18 font-weight">{{ language( 'DINGDIANSHENQINGZONGHEGUANLI', '定点申请综合管理' ) }}</span>
        <div class="floatright">
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
          <!-- 提交一致性校验 -->
          <iButton
            @click="consistenceCheck"
            v-permission.auto="SOURCING_NOMINATION_TIJIAOYIZHIXINGJIAOYAN|提交一致性校验"
          >
            {{ language("nominationLanguage_TiJiaoYiZhiXingJiaoYan", '提交一致性校验') }}
          </iButton>        
        </div>
      </div>
      <tablelist
        class="aotoTableHeight"
        :tableData="tableListData"
        :tableTitle="tableTitle"
        :tableLoading="tableLoading"
        :lang="true"
        v-permission.auto="SOURCING_NOMINATION_NOMINATETABLE|表格"
        @handleSelectionChange="handleSelectionChange"
      >
      <!-- <template #LK_CAOZUO="scope">
        <span><a href="javascript:;" @click="detail(scope.row)">{{'定点详情'}}</a></span>
      </template> -->
      
      <!-- 定点单号 -->
      <template #nominateName="scope">
         <span class="flexRow-link">
            <span class="openLinkText cursor "  @click="viewNominationDetail(scope.row)"> {{ scope.row.nominateName }}</span>
            <span class="icon-gray cursor "  @click="viewNominationDetail(scope.row)">
                <icon symbol class="show" name="icontiaozhuananniu" />
                <icon symbol class="active" name="icontiaozhuanxuanzhongzhuangtai" />
            </span>
        </span> 
      </template>
      <!-- 定点类型 -->
      <template #nominateProcessType="scope">
        <span>{{(scope.row.nominateProcessType && scope.row.nominateProcessType.desc) || ''}}</span>
      </template>
      <!-- 状态 -->
      <template #applicationStatus="scope">
        <span>{{(scope.row.applicationStatus && scope.row.applicationStatus.desc) || ''}}</span>
      </template>
      <!-- 会议状态 -->
      <template #meetingStatus="scope">
        <span>{{(scope.row.meetingStatus && scope.row.meetingStatus.desc) || ''}}</span>
      </template>

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
            v-if="userRole.isZYCG && scope.row.selStatus === 'UNCONFIRMED'">
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
    
  </iPage>
</template>

<script>
import { tableTitle } from './components/data'
import headerNav from './components/headerNav'
import search from './components/search'
import tablelist from "@/views/designate/supplier/components/tableList";
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
  nomiApprovalProcess
} from '@/api/designate/nomination'
// 前端配置文件里面的定点类型
// import { applyType } from '@/layout/nomination/components/data'
import selDialog from './components/selDialog'

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

export default {
  mixins: [ filters, pageMixins, roleMixins ],
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
      selDialogVisibal: false
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
    icon
  },
  mounted() {
    this.getFetchData()
  },
  methods: {
    // 新建零件定点申请
    createNomination() {
      // 缓存/更新定点申请类型
      this.$store.dispatch('setNominationTypeDisable', false)
      this.$nextTick(() => {
        const routeData = this.$router.resolve({path: '/designate/rfqdetail'})
        window.open(routeData.href, '_blank')
      })
    },
    // 查看详情
    viewNominationDetail(row) {
      // 缓存nominateProcessType
      // this.$store.dispatch('setNominationType', row.nominateProcessType)
      // 禁用nominateProcessType编辑
      this.$store.dispatch('setNominationTypeDisable', true)
      this.$nextTick(() => {
        const routeData = this.$router.resolve({
          path: '/designate/rfqdetail',
          query: {
            desinateId: row.id, 
            designateType: (row.nominateProcessType && row.nominateProcessType.code) || row.nominateProcessType || '',
            partProjType: (row.partProjType && row.partProjType.code) || row.partProjType || '',
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
    async handleBatchRevoke() {
      if (!this.selectTableData.length) {
        iMessage.error(this.language('nominationSuggestion_QingXuanZeZhiShaoYiTiaoShuJu','请选择至少一条数据'))
        return
      }
      const confirmInfo = await this.$confirm(this.language('revokeSure','您确定要执行撤回操作吗？'))
      if (confirmInfo !== 'confirm') return
      const idList = this.selectTableData.map(o => Number(o.id))
      try {
        const res = await batchRevoke({nominateIdArr: idList})
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
        try {
          const res = type ? await nominateRreeze(data) : await nominateUnRreeze(data)
          const { code } = res;
          if(code == 200){
            iMessage.success(this.language('LK_CAOZUOCHENGGONG','操作成功'));
            this.getFetchData()
          }else{
            iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
          }
        } catch (e) {
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
    }
  }
}
</script>

<style lang="scss" scoped>
.openLinkText {
  color: $color-blue;
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