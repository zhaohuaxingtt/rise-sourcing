<!--
 * @Author: haojiang
 * @Date: 2021-05-20 14:07:50
 * @Description: 
-->
<template>
  <iPage class="designateHome" v-permission.auto="SOURCING_NOMINATION_SIGNSHEET_SIGNSHEETPAGE|签字单列表">
    <div class="margin-bottom20 clearFloat">
      <span class="font18 font-weight">{{ language("MQIANZIDAN", "M签字单") }}</span>
    </div>

    <!-- 搜索区 -->
    <search @search="handSearch" ref="searchForm"/>
    <!-- 表格 -->
    <iCard class="designateTable">
      <div class="margin-bottom20 clearFloat">
        <div class="floatright">
          <!-- 新建 -->
          <iButton @click="createSignSheet" v-permission.auto="SOURCING_NOMINATION_SIGNSHEET_NEWSIGNSHEET|新建签字单">
            {{language('LK_XINJIANNEW', '新建')}}
          </iButton>
          <!-- 提交 -->
          <iButton @click="handleBatchSumit" v-permission.auto="SOURCING_NOMINATION_SIGNSHEET_SUBMITSIGNSHEET|提交签字单">
            {{language('LK_TIJIAO', '提交')}}
          </iButton>
          <!-- 删除 -->
          <iButton
            @click="handleBatchDelete"
            v-permission.auto="SOURCING_NOMINATION_SIGNSHEET_DELETESIGNSHEET|删除签字单"
          >
            {{ language("SHANCHU", '删除') }}
          </iButton>
        </div>
      </div>
      <tablelist
        :tableData="tableListData"
        :tableTitle="tableTitle"
        :tableLoading="tableLoading"
        :lang="true"
        v-permission.auto="SOURCING_NOMINATION_SIGNSHEET_SIGNSHEETABLE|签字单表格"
        @handleSelectionChange="handleSelectionChange"
      >
      <!-- 签字单 -->
      <template #signCode="scope">
        <a
          href="javascript:;"
          @click="viewDetail(scope.row)">
          {{scope.row.signCode}}
        </a>
      </template>
      <!-- 提交日期 -->
      <template #submitDate="scope">
        <span>{{scope.row.submitDate | dateFilter("YYYY-MM-DD")}}</span>
      </template>
      <!-- 截止日期 -->
      <template #dueDate="scope">
        <span>{{scope.row.dueDate | dateFilter("YYYY-MM-DD")}}</span>
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
    
  </iPage>
</template>

<script>
import { tableTitle,mokeData } from './components/data'
import search from './components/search'
import tablelist from "@/views/designate/supplier/components/tableList";
import { 
  nominateRreeze,
  nominateUnRreeze,
  nominateConfirm,
  rsFrozen,
  rsUnFrozen
} from '@/api/designate/nomination'
import {
  getSignList,
  batchSubmit,
  batchDelete,
  createSignSheet
} from '@/api/designate/nomination/signsheet'

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
      selDialogVisibal: false
    }
  },
  components: {
    iPage,
    iCard,
    iButton,
    iPagination,
    search,
    tablelist
  },
  mounted() {
    this.getFetchData()
  },
  methods: {
    handSearch(data) {
      this.page.currPage = 1
      this.getFetchData()
    },
    // 新建签字单
    createSignSheet() {
      let query = {}
      createSignSheet({}).then(res => {
        if (res.code === '200') {
          query = {
            id: res.data.id
          }
          this.$router.push({path: '/sourcing/partsnomination/signSheet/addSignOverView/details?mode=add', query})
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
      }).catch(e => {
        iMessage.error(this.$i18n.locale === "zh" ? e.desZh : e.desEn)
      })
    },
    // 查看详情
    viewDetail(row) {
      // 签字单状态
      const statusCode = row.status && row.status.code || row.status
      this.$router.push({
          path: '/sourcing/partsnomination/signSheet/addSignOverView/details',
          query: {
            signCode: row.signCode,
            id: row.id,
            status: row.status && row.status.name || row.status,
            desc: encodeURIComponent(row.description),
            // 仅仅允许草稿或者已拒绝的单子编辑
            mode: ['1', '2'].includes(statusCode) ? 'add' : ''
          }
        })
        
        // window.open(routeData.href, '_blank')
    },
    // 获取定点管理列表
    getFetchData() {
      this.tableLoading = true
      getSignList({
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
        console.log(res)
      }).catch(e => {
        this.tableLoading = false
      })
    },
    // 多选
    handleSelectionChange(data) {
      this.selectTableData = data
    },
    // 批量保存
    async handleBatchSumit() {
      if (!this.selectTableData.length) {
        iMessage.error(this.language('nominationSuggestion_QingXuanZeZhiShaoYiTiaoShuJu','请选择至少一条数据'))
        return
      }
      const confirmInfo = await this.$confirm(this.language('submitSure','您确定要执行提交操作吗？'))
      if (confirmInfo !== 'confirm') return
      const idList = this.selectTableData.map(o => Number(o.id))
      try {
        const res = await batchSubmit({signIdArr: idList})
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
        const res = await batchDelete({signIdArr: idList})
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
        const confirmInfo = await this.$confirm(this.language('LK_NINQUERENZHIXINGDONGJIECAOZUOMA','您确定要执行冻结操作吗？'));
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
        const confirmInfo = await this.$confirm(this.language('LK_NINQUERENZHIXINGDONGJIECAOZUOMA', '您确定要执行冻结操作吗？'));
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
    }
  }
}
</script>

<style lang="scss" scoped>
.designateSearch {
  margin-top: 20px;
}
</style>