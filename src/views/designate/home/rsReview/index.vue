<!--
 * @Author: haojiang
 * @Date: 2021-06-20 14:07:50
 * @Description: 
-->
<template>
  <iPage class="designateHome">
    <!-- 头部 -->
    <headerNav />
    <!-- 筛选框 -->
    <div style="clear: both"></div>
    <!-- 搜索区 -->
    <search @search="getFetchData" />
    <!-- 表格 -->
    <iCard class="designateTable">
      <div class="margin-bottom20 clearFloat">
        <div class="floatright">
          <!-- 发起复核 -->
          <iButton
          >
            {{ $t("nominationLanguage.FaQiFuHe") }}
          </iButton>
          <!-- 退回 -->
          <iButton
          >
            {{ $t("LK_TUIHUI") }}
          </iButton>
          <!-- 退回至通过状态（复核撤回） -->
          <iButton
          >
            {{ $t("nominationLanguage.TuiHuiZhiTongGuoZHuangTai") }}
          </iButton>
          <!-- 冻结 -->
          <iButton
          >
            {{ $t("LK_DONGJIE") }}
          </iButton>
          <!-- 解冻 -->
          <iButton
          >
            {{ $t("LK_JIEDONG") }}
          </iButton>
          <!-- SEL单据确认 -->
          <iButton
          >
            {{ $t("nominationLanguage.SELDanJuQUeRen") }}
          </iButton>
          <!-- 签字单 -->
          <iDropdown class="margin-left10 margin-right10" @command="toPath">
            <iButton type="default">
              {{ $t("nominationLanguage.QianZiDan") }}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </iButton>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                :command="item.path"
                v-for="(item, index) in signMenu" :key="index">
                  {{$t(item.key)}}
              </el-dropdown-item>
            </el-dropdown-menu>
          </iDropdown>
          <!-- 定点 -->
          <iButton
          >
            {{ $t("nominationLanguage.DINGDIAN") }}
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
      <!-- 定点类型 -->
      <template #nominateProcessType="scope">
        <span>{{(scope.row.nominateProcessType && scope.row.nominateProcessType.desc) || ''}}</span>
      </template>
      <!-- 定点类型 -->
      <template #applicationStatus="scope">
        <span>{{(scope.row.applicationStatus && scope.row.applicationStatus.desc) || ''}}</span>
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

      <template #freezeDate="scope">
        <span>{{scope.row.freezeDate | dateFilter("YYYY-MM-DD")}}</span>
      </template>
      <template #selStatus="scope">
        <div>
          <a href="javascript:;" class="selStatus-link" @click="confirmSelSheet(false)" v-if="scope.row.selStatus === '已确认'">{{scope.row.selStatus}}</a>
          <a href="javascript:;" class="selStatus-link" @click="confirmSelSheet(true)" v-else-if="scope.row.selStatus === '未确认'">{{scope.row.selStatus}}</a>
          <span v-else>{{scope.row.selStatus}}</span>
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
    <selDialog :visible.sync="selDialogVisibal" :selStatus="selStatus" :readOnly="true" />
    
  </iPage>
</template>

<script>
import { tableTitle, signMenu, mokeResData } from './components/data'
import headerNav from '@/views/designate/home/components/headerNav'
import search from './components/search'
import tablelist from "@/views/designate/supplier/components/tableList";
import selDialog from '../components/selDialog'
import { 
  getNominationList,
  batchRevoke,
  batchDelete,
  nominateRreeze,
  nominateUnRreeze,
  nominateConfirm,
  getCarTypePro,
  rsFrozen,
  rsUnFrozen
} from '@/api/designate/nomination'
import { 
  getSelList
} from '@/api/designate/nomination/selsheet'
// 前端配置文件里面的定点类型
// import { applyType } from '@/layout/nomination/components/data'

import { pageMixins } from '@/utils/pageMixins'
import filters from "@/utils/filters"

import {
  iPage,
  iCard,
  iButton,
  iPagination,
  iMessage,
  iDropdown
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
      // SEL单据确认状态
      selStatus: true,
      selDialogVisibal: false,
      // 签字单菜单
      signMenu,
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
    selDialog
  },
  mounted() {
    this.getFetchData()
    // 获取车型项目
    this.getCarTypePro()
  },
  methods: {
    toPath(path) {
      this.$router.push({path})
    },
    // 确认sel附件单
    confirmSelSheet(type = true) {
      this.selStatus = type
      this.selDialogVisibal = true
    },
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
            designateType: (row.nominateProcessType && row.nominateProcessType.code) || ''
          }
        })
        window.open(routeData.href, '_blank')
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
    // 获取rs列表
    getFetchData() {
      this.tableListData = mokeResData
      // this.tableLoading = true
      // getSelList({
      //   ...params,
      //   current: this.page.currPage,
      //   size: this.page.pageSize
      // }).then(res => {
      //   this.tableLoading = false
      //   if (res.code === '200') {
      //     this.tableListData = res.data.records || []
      //     this.page.totalCount = res.data.total
      //     console.log(this.selectTableData)
      //   } else {
      //     iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
      //   }
      //   console.log(res)
      // }).catch(e => {
      //   this.tableLoading = false
      // })
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
    // rs冻结
    async frozeRS(state){
      const {selectTableData} = this;
      if(!selectTableData.length){
        iMessage.warn(this.$t('nominationSuggestion.QingXuanZeZhiShaoYiTiaoShuJu'));
      }else{
        const confirmInfo = await this.$confirm(this.$t('LK_NINQUERENZHIXINGDONGJIECAOZUOMA'));
        if (confirmInfo !== 'confirm') return;
        const nomiAppIdList = selectTableData.map((item)=>Number(item.id));
        const data = {
          ids: nomiAppIdList,
        };
        try {
          const res = state ? await rsFrozen(data) : await rsUnFrozen(data)
          const { code } = res;
          if(code == 200){
            iMessage.success(this.$t('LK_CAOZUOCHENGGONG'));
            this.getFetchData()
          }else{
            iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
          }
        } catch(e) {
          iMessage.error(this.$i18n.locale === "zh" ? e.desZh : e.desEn)
        }
      }
    },

  }
}
</script>

<style lang="scss" scoped>
.designateSearch {
  margin-top: 20px;
}
.selStatus-link {
  font-size: 12px;
  text-decoration: underline;
}
</style>