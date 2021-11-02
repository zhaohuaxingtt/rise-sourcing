<!--
 * @Author: haojiang
 * @Date: 2021-06-20 14:07:50
 * @Description: 
-->
<template>
  <iPage class="designateHome" v-permission.auto="SOURCING_NOMINATION_RSREVIEW_PAGE|上会复核页面">
    <!-- 头部 -->
    <headerNav  />
    <!-- 筛选框 -->
    <div style="clear: both"></div>
    <!-- 搜索区 -->
    <search @search="handSearch" ref="searchForm" />
    <!-- 表格 -->
    <iCard class="designateTable" >
      <div class="margin-bottom20 clearFloat">
      <span class="font18 font-weight">{{ language( 'SHANGHUIRSDANFUHE', '上会RS单复核' ) }}</span>
        <div class="floatright">
          <!-- 发起复核 -->
          <iButton
            @click="initRsReview"
            v-permission.auto="SOURCING_NOMINATION_RSREVIEW_FAQIFUHE|发起复核"
          >
            {{ language("FAQIFUHE", '发起复核') }}
          </iButton>
          <!-- 退回 -->
          <iButton
            @click="handleBatchRevoke"
            v-permission.auto="SOURCING_NOMINATION_RSREVIEW_TUIHUI|退回"
          >
            {{ language("LK_TUIHUI",'退回') }}
          </iButton>
          <!-- 退回至通过状态（复核撤回） -->
          <iButton
            @click="handleBatchRevokeToPass"
            v-permission.auto="SOURCING_NOMINATION_RSREVIEW_TUIHUIZHITONGGUO|退回至通过状态"
          >
            {{ language("TUIHUIZHITONGGUOZHUANGTAI","退回至通过状态") }}
          </iButton>
          <!-- SEL单据确认 -->
          <iButton
            @click="selConfirm"
            v-permission.auto="SOURCING_NOMINATION_RSREVIEW_SELDANJUQUEREN|SEL单据确认"
          >
            {{ language("LK_SELDANJUQUEREN","SEL单据确认") }}
          </iButton>
          <!-- 签字单 -->
          <iDropdown class="margin-left10 margin-right10" @command="toPath">
            <iButton type="default" v-permission.auto="SOURCING_NOMINATION_RSREVIEW_QIANZIDAN|签字单">
              {{ language("LK_QIANZIDAN",'签字单') }}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </iButton>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                :command="item.path"
                v-for="(item, index) in signMenu" :key="index">
                  {{language(item.key, item.name)}}
              </el-dropdown-item>
            </el-dropdown-menu>
          </iDropdown>
          <!-- 定点 -->
          <iButton
            @click="confirm"
            v-permission.auto="SOURCING_NOMINATION_RSREVIEW_DINGDIAN|定点"
          >
            {{ language("nominationLanguage_DINGDIAN", "定点") }}
          </iButton>
          <!-- 导出 -->
          <iButton
            @click="rsexport"
            v-permission.auto="SOURCING_NOMINATION_RSREVIEW_DAOCHU|导出"
          >
            {{ language("DAOCHU", "导出") }}
          </iButton>

          
        </div>
      </div>
      <tablelist
        class="aotoTableHeight"
        :tableData="tableListData"
        :tableTitle="tableTitle"
        :tableLoading="tableLoading"
        v-loading="tableLoading"
        v-permission.auto="SOURCING_NOMINATION_RSREVIEW_TABLE|表格"
        @handleSelectionChange="handleSelectionChange"
      >
      <!-- <template #LK_CAOZUO="scope">
        <span><a href="javascript:;" @click="detail(scope.row)">{{'定点详情'}}</a></span>
      </template> -->
      
      <!-- 定点单号 -->
      <template #nominateName="scope">
        <span class="flexRow">
          <el-tooltip :content="scope.row.nominateName" placement="top" effect="light">
            <span class="openLinkText cursor leftRow"  @click="viewRsSheetDetail(scope.row)"> {{ scope.row.nominateName}}</span>
          </el-tooltip>
            <span class="icon-gray  cursor rightRow" v-if="scope.row.nominateName"  @click="viewRsSheetDetail(scope.row)">
                <icon symbol class="show" name="icontiaozhuananniu" />
                <icon symbol class="active" name="icontiaozhuanxuanzhongzhuangtai" />
            </span>
          </span> 
      </template>
      <!-- rs状态 -->
      <template #rsStatus="scope">
        <div>
          <span>{{scope.row.rsStatus && scope.row.rsStatus.desc || scope.row.rsStatus}}</span>
        </div>
      </template>
      <!-- re冻结日期 -->
      <template #rsFreezeDate="scope">
        <span>{{scope.row.rsFreezeDate | dateFilter("YYYY-MM-DD")}}</span>
      </template>
      
      <!-- 一致性校验 -->
      <template #isPriceConsistent="scope">
        <span>{{[null, undefined].includes(scope.row.isPriceConsistent) ? '' : (scope.row.isPriceConsistent ? '通过' : '不通过')}}</span>
      </template>

      <!-- 定点日期 -->
      <template #nominateDate="scope">
        <span>{{scope.row.nominateDate | dateFilter("YYYY-MM-DD")}}</span>
      </template>
      <template #freezeDate="scope">
        <span>{{scope.row.freezeDate | dateFilter("YYYY-MM-DD")}}</span>
      </template>

      <template #signId="scope">
        <a href="javascript:;" class="selStatus-link" @click="$router.push({path: '/sourcing/partsnomination/signSheet/details', query: {id: scope.row.signId}})">{{scope.row.signId}}</a>
      </template>
      <!-- SEL单据确认状态 -->
      <template #selStatus="scope">
        <div>
          <a href="javascript:;" class="selStatus-link" @click="confirmSelSheet(scope.row)" v-if="userRole.isDDGL && scope.row.selStatus === 'CONFIRMED'">{{scope.row.selStatusDesc}}</a>
          <a href="javascript:;" class="selStatus-link" @click="confirmSelSheet(scope.row)" v-else-if="userRole.isDDGL && scope.row.selStatus === 'UNCONFIRMED'">{{scope.row.selStatusDesc}}</a>
          <span v-else>{{scope.row.selStatusDesc}}</span>
        </div>
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
    <selDialog :visible.sync="selDialogVisibal" :nomiAppId="selNominateId" :selStatus="selStatus" @refresh="getFetchData" :readOnly="true" />
    
  </iPage>
</template>

<script>
import { tableTitle, signMenu } from './components/data'
// import checklistData from './lib/checklist.json'
import headerNav from '@/views/designate/home/components/headerNav'
import search from './components/search'
import tablelist from "@/views/designate/supplier/components/tableList";
import selDialog from '../components/selDialog'
import {
  nominateConfirm,
} from '@/api/designate/nomination'
import {roleMixins} from '@/utils/roleMixins'

import { 
  getSelList,
  selSheetSubmit,
  batchRevoke,
  batchRevokeToPass,
  batchConfirmSelSheet,
  // batchExportSelSheet
} from '@/api/designate/nomination/selsheet'
import { 
  createSignSheet
} from '@/api/designate/nomination/signsheet'
// 前端配置文件里面的定点类型
// import { applyType } from '@/layout/nomination/components/data'

import { pageMixins } from '@/utils/pageMixins'
import filters from "@/utils/filters"

import {
  iPage,
  iCard,
  iButton,
  iPagination,
  iDropdown,
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
      // SEL单据确认状态
      selNominateId: '',
      selStatus: false,
      selDialogVisibal: false,
      // 签字单菜单
      signMenu,
      params: {}
    }
  },
  components: {
    iPage,
    iCard,
    iButton,
    iPagination,
    iDropdown,
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
    handSearch() {
      this.page.currPage = 1
      this.getFetchData()
    },
    toPath(path) {
      // 新增签字单
      if (path === '/sourcing/partsnomination/signSheet/details?mode=add') {
        this.createSignSheet(path)
      } else {
        const newSignSheet = this.$router.resolve({path})
        window.open(newSignSheet.href,'_blanks')
      }
      
    },
    // 新增签字单
    createSignSheet(path) {
      let query = {}
      createSignSheet({}).then(res => {
        if (res.code === '200') {
          query = {
            signCode: res.data.signCode,
            id: res.data.id,
            status: res.data.status && res.data.status.name || res.data.status
          }
          const mCreateSing = this.$router.resolve({path, query}) 
          window.open(mCreateSing.href,'_blank')
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
      }).catch(e => {
        iMessage.error(this.$i18n.locale === "zh" ? e.desZh : e.desEn)
      })
    },
    // 查看详情
    viewRsSheetDetail(row) {
      // const routeData = this.$router.resolve({
      //   path: '/sourcing/partsnomination/rsreview/details',
      //   query: {
      //     otherNominationId: row.id, 
      //     otherNominationType: 'METTING',
      //     otherPartProjectType: row.partProjType
      //   }
      // })
      // window.open(routeData.href, '_blank')
      this.$store.dispatch('setNominationTypeDisable', true)
      this.$nextTick(() => {
        const routeData = this.$router.resolve({
          path: '/designate/rfqdetail',
          query: {
            desinateId: row.id, 
            designateType: "MEETING",
            applicationStatus: row.applicationStatus,
            partProjType: row.partProjType,
            mtzApplyId: row.mtzApplyId
          }
        })
        window.open(routeData.href, '_blank')
      })
    },
    // 获取rs列表
    async getFetchData(params) {
      this.tableLoading = true
      try {
        // const res = checklistData
        const res = await getSelList(Object.assign({
          current: this.page.currPage,
          size: this.page.pageSize
        }, this.$refs.searchForm.form, params))
        this.tableLoading = false
        if (res.code === '200') {
          this.tableListData = res.data.records || []
          this.page.totalCount = res.data.total
        } else {
          this.tableListData = []
          this.page.totalCount = 0
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
      } catch(e) {
        this.tableLoading = false
        this.tableListData = []
        this.page.totalCount = 0
        iMessage.error(this.$i18n.locale === "zh" ? e.desZh : e.desEn)
      }
    },
    // 多选
    handleSelectionChange(data) {
      this.selectTableData = data
    },
    // 发起复核
    async initRsReview() {
      if (!this.selectTableData.length) {
        iMessage.warn(this.language('nominationSuggestion_QingXuanZeZhiShaoYiTiaoShuJu', '请选择至少一条数据'))
        return
      }
      const confirmInfo = await this.$confirm(this.language('NINGQUEDINGYAOFAQIFUHEMA','您确定要发起复核吗？'))
      if (confirmInfo !== 'confirm') return
      const idList = this.selectTableData.map(o => Number(o.id))
      try {
        const res = await selSheetSubmit({nominateIdArr: idList})
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
    // 批量撤回
    async handleBatchRevoke() {
      if (!this.selectTableData.length) {
        iMessage.warn(this.language('nominationSuggestion_QingXuanZeZhiShaoYiTiaoShuJu', '请选择至少一条数据'))
        return
      }
      const confirmInfo = await this.$confirm(this.language('revokeSure'))
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
    // 批量退回至通过状态
    async handleBatchRevokeToPass() {
      if (!this.selectTableData.length) {
        iMessage.warn(this.language('nominationSuggestion_QingXuanZeZhiShaoYiTiaoShuJu','请选择至少一条数据'))
        return
      }
      const confirmInfo = await this.$confirm(this.language('revokeSure','您确定要执行撤回操作吗？'))
      if (confirmInfo !== 'confirm') return
      const idList = this.selectTableData.map(o => Number(o.id))
      try {
        const res = await batchRevokeToPass({nominateIdArr: idList})
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
    // SEL单据确认
    async selConfirm() {
      if (!this.selectTableData.length) {
        iMessage.warn(this.language('nominationSuggestion_QingXuanZeZhiShaoYiTiaoShuJu','请选择至少一条数据'))
        return
      }
      const confirmInfo = await this.$confirm(this.language('LK_EXCUTESURE','您确定要执行该操作吗？'))
      if (confirmInfo !== 'confirm') return
      const idList = this.selectTableData.map(o => Number(o.id))
      try {
        const res = await batchConfirmSelSheet({nominateIdArr: idList})
        if (res.code === '200') {
          iMessage.success(this.language('LK_CAOZUOCHENGGONG','操作成功'))
          this.getFetchData()
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
      } catch (e) {
        console.log('e', e)
        iMessage.error(e && e.message ? e.message : this.$i18n.locale === "zh" ? e.desZh : e.desEn)
      }
    },
    // 导出
    async rsexport() {
      if (!this.selectTableData.length) {
        iMessage.warn(this.language('nominationSuggestion_QingXuanZeZhiShaoYiTiaoShuJu','请选择至少一条数据'))
        return
      }
      const confirmInfo = await this.$confirm(this.language('LK_EXCUTESURE','您确定要执行该操作吗？'))
      if (confirmInfo !== 'confirm') return
      const idList = this.selectTableData.map(o => Number(o.id))
      const BASEURL = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '')
      const fileURL = `${BASEURL}${process.env.VUE_APP_RFQ}/nominate/check/export?nomiAppIds=${idList.join(',')}`
      console.log(fileURL)
      window.open(fileURL)
      // try {
      //   const res = await batchExportSelSheet({nomiAppIds: idList})
      //   if (res) {
      //     iMessage.success(this.language('LK_CAOZUOCHENGGONG','操作成功'))
      //     let url = window.URL.createObjectURL(new Blob([res]))
      //     let link = document.createElement('a')
      //     link.style.display = 'none'
      //     link.href = url
      //     link.setAttribute('download', 'rsexport.xlsx')// 文件名
      //     document.body.appendChild(link)
      //     link.click()
      //     document.body.removeChild(link) // 下载完成移除元素
      //     window.URL.revokeObjectURL(url) // 释放掉blob对象
      //   }
      // } catch (e) {
      //   console.log('e', e)
      //   iMessage.error(e && e.message ? e.message : this.$i18n.locale === "zh" ? e.desZh : e.desEn)
      // }
    },
    // 定点
    async confirm(){
      const {selectTableData} = this;
      if(!selectTableData.length){
        iMessage.warn(this.language('nominationSuggestion_QingXuanZeZhiShaoYiTiaoShuJu', '请选择至少一条数据'));
      }else{
        const confirmInfo = await this.$confirm(this.language('LK_NINQUERENZHIXINGDINGDIANCAOZUOMA','您确定要执行定点操作吗？'));
        if (confirmInfo !== 'confirm') return;
        const nomiAppIdList = selectTableData.map((item)=>Number(item.id));
        const data = {
          nomiAppIdList,
        };
        await nominateConfirm(data).then((res)=>{
          const { code } = res;
          if(code == 200){
            iMessage.success(this.language('LK_CAOZUOCHENGGONG','操作成功'));
            this.getFetchData()
          }else{
            iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
          }
        }).catch((e)=>{
          iMessage.error(this.$i18n.locale === "zh" ? e.desZh : e.desEn)
        })
      }
    },
    // sel附件列表弹窗
    confirmSelSheet(row) {
      this.selStatus = (row.selStatus && row.selStatus.code) || row.selStatus
      this.selNominateId = row.id
      this.selDialogVisibal = true
    }

  }
}
</script>

<style lang="scss" scoped>
  .openLinkText{
    color:$color-blue;
  }
  .aotoTableHeight{
    ::v-deep .el-table__body-wrapper {
      min-height: 422px !important;  
      overflow: auto !important ;
    }
  }
  .designateSearch {
    margin-top: 20px;
  }
  .selStatus-link {
    font-size: 12px;
    text-decoration: underline;
  }
  .icon-gray{
    cursor: pointer;
    .active{
      display: none;
    }
    .show{
      display: block;
    }
  }
  .flexRow{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    .leftRow{
      width:85%;
      text-align: left;
      white-space:nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      
    }    
    .rightRow{
      width:5%
    }
  }
  .icon-gray:hover{
    cursor: pointer;
    .show{
      display: none;
    }
    .active{
      display: block;
    }
  }
</style>