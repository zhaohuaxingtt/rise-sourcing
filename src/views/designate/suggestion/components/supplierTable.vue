<template>
  <iCard class="supplierTable singleSupplier">
      <div class="margin-bottom20 clearFloat">
        <div class="floatright">
          <!-- 批量编辑 -->
          <iButton @click="handleBatchEdit">
            {{ $t("nominationSupplier.BatchEdit") }}
          </iButton>
          <!-- 复制 -->
          <iButton
            @click="handleBatchEdit"
          >
            {{ $t("nominationSupplier.COPY") }}
          </iButton>
          <!-- 删除 -->
          <iButton
          >
            {{ $t("nominationLanguage.ShanChu") }}
          </iButton>
          <iButton
            @click="setEditState(false)"
            :loading="startLoding"
          >
            {{ $t("LK_BAOCUN") }}
          </iButton>
          <iButton
            @click="mouldVisibal = true"
          >
            {{ $t("nominationSuggestion.MoJuYuSuanGuanLi") }}
          </iButton>
        </div>
      </div>
      <tablelist
        index
        :tableData="data"
        :tableTitle="supplierTitle"
        :tableLoading="tableLoading"
        v-loading="tableLoading"
        @handleSelectionChange="handleSelectionChange"
      >
        <template #rfqNum="scope">
          <a class="link-underline" href="javascript:;">{{scope.row.rfqNum}}</a>
        </template>
        <!-- 供应商名 -->
        <template #supplierName="scope">
          <div v-if="scope.row.isEdit">
            <iSelect
              v-model="scope.row.supplierName"
              :placeholder="$t('LK_QINGXUANZE')">
              <el-option
                :value="items.key"
                :label="items.value"
                v-for="(items, index) in []"
                :key="index"
              ></el-option>
            </iSelect>
          </div>
          <span v-else>{{scope.row.supplierName}}</span>
        </template>
        <!-- 比例 -->
        <template #percent="scope">
          <div v-if="scope.row.isEdit">
            <iSelect
              v-model="scope.row.ratio"
              :placeholder="$t('LK_QINGXUANZE')">
              <el-option
                :value="items.key"
                :label="items.value"
                v-for="(items, index) in []"
                :key="index"
              ></el-option>
            </iSelect>
          </div>
          <span v-else>{{scope.row.ratio}}</span>
        </template>
      </tablelist>
      <iPagination
        v-update
        @size-change="handleSizeChange($event, getDataList)"
        @current-change="handleCurrentChange($event, getDataList)"
        background
        :current-page="page.currPage"
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :layout="page.layout"
        :total="page.totalCount"
      />

    <!-- 批量编辑弹窗 -->
    <batchEditDialog :visible.sync="batchEditVisibal" />
    <!-- 模具弹窗 -->
    <mouldDialog :visible.sync="mouldVisibal" :rfqIds="rfqIds" />
  </iCard>
</template>

<script>
import Vue from 'vue'
import {
  supplierTitle,
  mokeSupplierData
} from './data'
import tablelist from "./tableList";
import batchEditDialog from "./batchEditDialog"
// import mouldDialog from "./mouldDialog"
import mouldDialog from "./mouldBudgetManagementDialog"
import { pageMixins } from '@/utils/pageMixins'
import {
  getSuggestionList,
  updateSuggestion,
  deleteSuggestion
} from '@/api/designate/suggestion/part'

import {
  iCard,
  iButton,
  iPagination,
  iMessage,
  iSelect
} from "rise";

export default {
  components: {
    iCard,
    iButton,
    iSelect,
    iPagination,
    tablelist,
    batchEditDialog,
    mouldDialog
  },
  mixins: [ pageMixins ],
  data() {
    return {
      // 表头
      supplierTitle,
      // 表单数据
      data: [],
      // 表单选择的数据
      selectData: [],
      // 控制右边按钮整体切换
      editControl: false,
      // 批量编辑弹窗
      batchEditVisibal: false,
      // 模具弹窗
      mouldVisibal: false,
      // 列表加载状态
      tableLoading: false,
      page: {
        currPage: 1,
        pageSize: 10,
        totalCount: 0,
        layout: "total, prev, pager, next, jumper"
      },
      // 全量rfqId，用于模具预算管理列表查询
      rfqIds: []
    }
  },
  mounted() {
    this.getDataList()
  },
  methods: {
    // 批量编辑
    handleBatchEdit() {
      if (!this.selectData.length) {
        iMessage.error('请选择')
        return
      }
      this.batchEditVisibal = true
    },
    handlEdit() {
      if (!this.selectData.length) {
        iMessage.error('请选择')
        return
      }
      this.editControl = true
      this.setEditState(true)
    },
    setEditState(state = false) {
      this.selectData.forEach(item => {
        const tar = this.selectData.find(o => o.id === item.id)
        tar && (Vue.set(tar, 'isEdit', state))
      })
    },
    // 单一供应商
    handleSelectionChange(data) {
      this.selectData = data
    },
    getDataList() {
      this.tableLoading = true
      getSuggestionList({
        nominateAppId: this.$store.getters.nomiAppId || '',
        current: this.page.currPage,
        size: this.page.pageSize
      }).then(res => {
        this.tableLoading = false
        if (res.code === '200') {
          this.data = res.data || []
          this.page.totalCount = res.total || this.data.length
          console.log(this.selectTableData)
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
        console.log(res)
      }).catch(e => {
        this.tableLoading = false
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.supplierTable {
}
</style>