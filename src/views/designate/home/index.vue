<!--
 * @Author: wentliao
 * @Date: 2021-05-20 14:07:50
 * @Description: 
-->
<template>
  <iPage class="designateHome">
    <!-- 头部 -->
    <headerNav class="margin-bottom30" />
    <!-- 筛选框 -->
    <div style="clear: both"></div>
    <!-- 搜索区 -->
    <search @search="getFetchData" :carTypeList="carTypeList" />
    <!-- 表格 -->
    <iCard class="designateTable">
      <div class="margin-bottom20 clearFloat">
        <span class="font18 font-weight">
          {{ $t("nominationLanguage.DingDianShenQingZongHeGuanLi") }}</span
        >
        <div class="floatright">
          <!-- 新建定点申请 -->
          <iButton
            @click="createNomination"
            v-permission="PARTSPROCURE_TRANSFER"
          >
            {{ $t("nominationLanguage.XinJianLingJIanDingDianShengQIng") }}
          </iButton>
          
          <!-- 冻结 -->
          <iButton @click="freeze">
            {{$t('LK_DONGJIE')}}
          </iButton>

          <!-- 解冻 -->
          <iButton @click="freeze(false)">
            {{$t('LK_JIEDONG')}}
          </iButton>

          <!-- 定点 -->
          <iButton @click="confirm">
            {{$t('nominationLanguage.DINGDIAN')}}
          </iButton>


          <!--  <iButton @click="creatFs" v-permission="PARTSPROCURE_GENERATEFSBUTTON">
            {{ $t('partsprocure.PARTSPROCUREGENERATEFSGSNR') }}
          </iButton> -->
          <!-- 撤回 -->
          <iButton
            @click="handleBatchRevoke"
            v-permission="PARTSPROCURE_CANCELPROCUREMENTITEMS"
          >
            {{ $t("nominationLanguage.CheHui") }}
          </iButton>
          <!-- 批量删除 -->
          <iButton
            @click="handleBatchDelete"
            v-permission="PARTSPROCURE_BATCHMAINTENANCE"
          >
            {{ $t("nominationLanguage.ShanChu") }}
          </iButton>
          <iButton
            @click="openPage"
            :loading="startLoding"
            v-permission="PARTSPROCURE_STARTINQUIRY"
          >
            {{ $t("nominationLanguage.TiJiaoYiZhiXingJiaoYan") }}
          </iButton>
        </div>
      </div>
      <tablelist
        :tableData="tableListData"
        :tableTitle="tableTitle"
        :tableLoading="tableLoading"
        @handleSelectionChange="handleSelectionChange"
      >
      <!-- <template #LK_CAOZUO="scope">
        <span><a href="javascript:;" @click="detail(scope.row)">{{'定点详情'}}</a></span>
      </template> -->
      
      <!-- 定点单号 -->
      <template #nominateName="scope">
        <a
          href="javascript:;"
          @click="viewNominationDetail(scope.row)">
          {{scope.row.nominateName}}
        </a>
      </template>

      <!-- re冻结日期 -->
      <template #rsFreezeDate="scope">
        <span>{{scope.row.rsFreezeDate | dateFilter("YYYY-MM-DD")}}</span>
      </template>
      
      <!-- 一致性校验 -->
      <!-- <template #isPriceConsistent="scope">
        <span>{{scope.row.isPriceConsistent ? '通过' : '不通过'}}</span>
      </template> -->

      <!-- 定点日期 -->
      <template #nominateDate="scope">
        <span>{{scope.row.nominateDate | dateFilter("YYYY-MM-DD")}}</span>
      </template>
      
      </tablelist>
      <iPagination
        v-update
        @current-change="handleCurrentChange($event, getFetchData)"
        background
        :current-page="page.currPage"
        :page-sizes="page.pageSize"
        :page-size="page.pageSize"
        :layout="page.layout"
        :total="page.totalCount"
      />
    </iCard>
    
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
  getCarTypePro
} from '@/api/designate/nomination'
// 前端配置文件里面的定点类型
// import { applyType } from '@/layout/nomination/components/data'

import { pageMixins } from '@/utils/pageMixins'
import filters from "@/utils/filters"

import {
  iPage,
  iCard,
  iButton,
  iPagination,
  iMessage
} from "rise";

export default {
  mixins: [ filters, pageMixins ],
  data() {
    return {
      tableListData: [],
      tableLoading: false,
      tableTitle: tableTitle,
      selectTableData: [],
      startLoding: false,
      carTypeList: [],
      page: {
        currPage: 1,
        pageSize: 15,
        totalCount: 0,
        layout: "total, prev, pager, next, jumper"
      }
    }
  },
  components: {
    iPage,
    iCard,
    iButton,
    iPagination,
    headerNav,
    search,
    tablelist
  },
  mounted() {
    this.getFetchData()
    // 获取车型项目
    this.getCarTypePro()
  },
  methods: {
    // 新建零件定点申请
    createNomination() {
      // 缓存/更新定点申请类型
      this.$store.dispatch('setNominationTypeDisable', false)
      this.$nextTick(() => {
        this.$router.push({path: '/designate/rfqdetail'})
      })
    },
    // 查看详情
    viewNominationDetail(row) {
      // 缓存nominateProcessType
      // this.$store.dispatch('setNominationType', row.nominateProcessType)
      // 禁用nominateProcessType编辑
      this.$store.dispatch('setNominationTypeDisable', true)
      this.$nextTick(() => {
        this.$router.push({path: '/designate/rfqdetail', query: {desinateId: row.id, designateType: row.nominateProcessType}})
      })
    },
    // 获取车型项目
    getCarTypePro() {
      getCarTypePro().then(res => {
        if (res.code === '200') {
          this.carTypeList = (res.data && res.data.data) || []
        }
      })
    },
    // 获取定点管理列表
    getFetchData(params = {}) {
      this.tableLoading = true
      getNominationList({
        ...params,
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
        console.log(res)
      }).catch(e => {
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
        iMessage.error(this.$t('nominationSuggestion.QingXuanZeZhiShaoYiTiaoShuJu'))
        return
      }
      const confirmInfo = await this.$confirm(this.$t('revokeSure'))
      if (confirmInfo !== 'confirm') return
      const idList = this.selectTableData.map(o => Number(o.id))
      try {
        const res = await batchRevoke({nominateIdArr: idList})
        if (res.code === '200') {
          iMessage.success(this.$t('LK_CAOZUOCHENGGONG'))
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
        iMessage.error(this.$t('nominationSuggestion.QingXuanZeZhiShaoYiTiaoShuJu'))
        return
      }
      const confirmInfo = await this.$confirm(this.$t('deleteSure'))
      if (confirmInfo !== 'confirm') return
      const idList = this.selectTableData.map(o => Number(o.id))
      try {
        const res = await batchDelete({nominateIdArr: idList})
        if (res.code === '200') {
          iMessage.success(this.$t('LK_CAOZUOCHENGGONG'))
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
        iMessage.warn(this.$t('nominationSuggestion.QingXuanZeZhiShaoYiTiaoShuJu'));
      }else{
        const confirmInfo = await this.$confirm(this.$t('LK_NINQUERENZHIXINGDONGJIECAOZUOMA'));
        if (confirmInfo !== 'confirm') return;
        const nominateIdArr = selectTableData.map((item)=>Number(item.id));
        const data = {
          nominateIdArr,
        };
        try {
          const res = type ? await nominateRreeze(data) : await nominateUnRreeze(data)
          const { code } = res;
          if(code == 200){
            iMessage.success(this.$t('LK_CAOZUOCHENGGONG'));
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
        iMessage.warn(this.$t('nominationSuggestion.QingXuanZeZhiShaoYiTiaoShuJu'));
      }else{
        const confirmInfo = await this.$confirm(this.$t('LK_NINQUERENZHIXINGDONGJIECAOZUOMA'));
        if (confirmInfo !== 'confirm') return;
        const nomiAppIdList = selectTableData.map((item)=>Number(item.id));
        const data = {
          nomiAppIdList,
        };
        await nominateConfirm(data).then((res)=>{
          const { code } = res;
          if(code == 200){
            iMessage.success(this.$t('LK_CAOZUOCHENGGONG'));
            this.getFetchData()
          }else{
            iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
          }
        }).catch((e)=>{
          iMessage.error(this.$i18n.locale === "zh" ? e.desZh : e.desEn)
        })
      }
    },


  }
}
</script>

<style lang="scss" scoped>
.designateSearch {
  margin-top: 20px;
}
</style>