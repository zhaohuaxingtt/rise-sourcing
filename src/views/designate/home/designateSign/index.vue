<!--
 * @Author: wentliao
 * @Date: 2021-05-20 14:07:50
 * @Description: 
-->
<template>
  <div class="designateHome">
    <!-- 筛选框 -->
    <div style="clear: both"></div>
    <!-- 搜索区 -->
    <search @search="getFetchData" ref="search" />
    <!-- 表格 -->
    <iCard class="designateTable"  >
      <div class="margin-bottom20 clearFloat">
        <!-- 签字单模式 -->
        <div class="floatright">
          <!-- 选择 -->
          <iButton
            @click="handleChoose"
          >
            {{ language("XUANZE", '选择') }}
          </iButton>
        </div>
      </div>
      <tablelist
        :tableData="tableListData"
        :tableTitle="tableTitle"
        :tableLoading="tableLoading"
        :lang="true"
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
      <!-- RS状态 -->
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
    
  </div>
</template>

<script>
import { tableTitle } from './components/data'
import search from './components/search'
import tablelist from "@/views/designate/supplier/components/tableList";
import {
  getNomiNotSelectedPage
} from '@/api/designate/nomination/signsheet'
// 前端配置文件里面的定点类型
// import { applyType } from '@/layout/nomination/components/data'

import { pageMixins } from '@/utils/pageMixins'
import filters from "@/utils/filters"

import {
  // iPage,
  iCard,
  iButton,
  iPagination,
  iMessage
} from "rise";

export default {
  mixins: [ filters, pageMixins ],
  props: {
    // 模式1： page - 用于展示
    // 模式2： sign - 用于签字单选择
    mode: {
      type: String,
      default: 'page'
    }
  },
  data() {
    return {
      tableListData: [],
      tableLoading: false,
      tableTitle: tableTitle,
      selectTableData: [],
      startLoding: false,
      carTypeList: [],
      selDialogVisibal: false
    }
  },
  components: {
    // iPage,
    iCard,
    iButton,
    iPagination,
    search,
    tablelist
  },
  mounted() {
    const params = this.$refs.search.form || {}
    this.getFetchData(params)
  },
  methods: {
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
    // 获取定点管理列表
    getFetchData(params = {}) {
      this.tableLoading = true
      getNomiNotSelectedPage({
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
    handleChoose() {
      this.$emit('choose', this.selectTableData)
    }

  }
}
</script>

<style lang="scss" scoped>
.designateSearch {
  margin-top: 20px;
  box-shadow: none;
  ::v-deep.iSearch-content {
    position: relative;
    overflow: visible;
    &:after {
      content: '';
      width: 100%;
      height: 0px;
      display: block;
      border-bottom: 1px dashed #e1e1e1;
      position: absolute;
      left: 0px;
      bottom: -30px
    }
  }
  
}
.designateTable {
  box-shadow: none;
}
</style>