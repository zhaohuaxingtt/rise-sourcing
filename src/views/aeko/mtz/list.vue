<!--
 * @Autor: Hao,Jiang
 * @Date: 2021-10-29 10:26:18
 * @LastEditors: YoHo
 * @LastEditTime: 2022-03-23 15:38:09
 * @Description: 
-->
<template>
  <div class="aeko-mtz" v-permission.auto="MTZ_MODIFY_LIST_PAGE|查看MTZ变更">
    <!-- 筛选 -->
    <search ref="search" @search="onSearch" />
    <!-- 表格 -->
    <iCard class="aeko-mtz-table">
      <template v-slot:header-control>
        <buttonTableSetting @click="edittableHeader"></buttonTableSetting>
      </template>
      <tableList
        permissionKey="AEKO_MTZ_LIST"
        height="400"
        ref="tableList"
        index
        :selection="false"
        :tableData="tableListData"
        :tableTitle="tableTitle"
        :tableLoading="tableLoading"
        :lang="true"
        v-permission.auto="MTZ_MODIFY_LIST_PAGE_TABLE|查看MTZ变更表格"
        v-loading="tableLoading"
        @handleSelectionChange="handleSelectionChange"
      >
      </tableList>
      <div class="pagination">
        <iPagination v-update
          class="pagination"
          @size-change="handleSizeChange($event, getFetchData)"
          @current-change="handleCurrentChange($event, getFetchData)"
          background
          :current-page="page.currPage"
          :page-sizes="page.pageSizes"
          :page-size="page.pageSize"
          :layout="page.layout"
          :total="page.totalCount" />
      </div>
    </iCard>
  </div>
</template>

<script>
import {mtzListtableTitle as tableTitle} from './components/data'
import search from './components/search'
// import tablelist from 'rise/web/components/iFile/tableList'; 
import tableList from "@/components/iTableSort"
import { tableSortMixins } from "@/components/iTableSort/tableSortMixins"
import {iCard, iButton, iPagination, iInput, iDatePicker, iMessage} from 'rise'
import { pageMixins } from '@/utils/pageMixins'
// 解释附件、审批附件查询，审批附件带taskId
import {
  aekoMtzDosage,
  getMaterial
} from '@/api/aeko/mtz'
import buttonTableSetting from '@/components/buttonTableSetting'

export default {
  mixins: [pageMixins, tableSortMixins],
  components: {
    iCard,
    iPagination,
    tableList,
    iButton,
    search,
    buttonTableSetting
  },
  data() {
    return {
      tableTitle,
      tableListData: [],
      tableLoading: false,
      selectTableData: []
    }
  },
  mounted() {
    this.getFetchData()
  },
  methods: {
    onSearch() {
      this.page.currPage = 1
      this.getFetchData()
    },
    /**
     * @description: 获取数据列表
     * @param {*}
     * @return {*}
     */    
    getFetchData() {
      const query = this.$route.query
      const aekoWorkFlow = window.atob(query.workflow)
      const aekoWorkFlowDTO = JSON.parse(decodeURIComponent(escape(aekoWorkFlow)))
      const parmas = Object.assign({
        aekoWorkFlowDTO,
        supplierName: '',
        requirementAekoId: this.$route.query.requirementAekoId || '',
        current: this.page.currPage,
        size: this.page.pageSize
      }, this.$refs.search.form)
      parmas.partNums = parmas.partNums ? String(parmas.partNums).split(',') : []
      parmas.materialCodeList = parmas.materialCodeList.length === 1 && !parmas.materialCodeList[0] ? [] : parmas.materialCodeList
      this.tableLoading = true
      aekoMtzDosage(parmas).then(res => {
        if (res.code === '200') {
          this.tableListData = (res.data && res.data.records || [])
          this.page.totalCount = res.data.total
        } else {
          this.tableListData = []
          res && (this.$message.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn));
        }
        this.tableLoading = false
      }).catch(e => {
        this.tableLoading = false
        this.$message.error(this.$i18n.locale === "zh" ? e.desZh : e.desEn);
      }).finally(() => {
        this.tableLoading = false
      })
    },
  }
}
</script>
<style lang="scss" scoped>
.aeko-mtz-details {
  .aeko-mtz-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .akeoTitle {
      font-weight: bold;
    }
  }
  .aeko-mtz-submenu {
    display: flex;
    justify-content: space-between;
    align-items: center
  }
  .aeko-mtz-table {
    .cardBody {
      padding: 10px;
    }
  }
}
.icon {
  svg {
    font-size: 28px;
  }
}
</style>