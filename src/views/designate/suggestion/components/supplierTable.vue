<template>
  <div class="supplierTable singleSupplier">
    <iCard>
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
              v-model="scope.row.percent"
              :placeholder="$t('LK_QINGXUANZE')">
              <el-option
                :value="items.key"
                :label="items.value"
                v-for="(items, index) in []"
                :key="index"
              ></el-option>
            </iSelect>
          </div>
          <span v-else>{{scope.row.percent}}</span>
        </template>
      </tablelist>
      <iPagination
        v-update
        @size-change="handleSizeChange($event, getTableList)"
        @current-change="handleCurrentChange($event, getTableList)"
        background
        :current-page="page.currPage"
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :layout="page.layout"
        :total="page.totalCount"
      />
    </iCard>

    <!-- 批量编辑弹窗 -->
    <batchEditDialog :visible.sync="batchEditVisibal" />
    <!-- 模具弹窗 -->
    <mouldDialog :visible.sync="mouldVisibal" />
  </div>
</template>

<script>
import Vue from 'vue'
import {
  supplierTitle,
  mokeSupplierData
} from './data'
import tablelist from "./tableList";
import batchEditDialog from "./batchEditDialog"
import mouldDialog from "./mouldDialog"

import {
  iButton,
  iPagination,
  iMessage,
  iSelect
} from "rise";

export default {
  components: {
    iButton,
    iSelect,
    iPagination,
    tablelist,
    batchEditDialog,
    mouldDialog
  },
  data() {
    return {
      // 表头
      supplierTitle,
      // 表单数据
      data: mokeSupplierData,
      // 表单选择的数据
      selectData: [],
      // 控制右边按钮整体切换
      editControl: false,
      // 批量编辑弹窗
      batchEditVisibal: false,
      // 模具弹窗
      mouldVisibal: false,
      page: {
        currPage: 1,
        pageSize: 10,
        totalCount: 2
      }
    }
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
    getTableList() {

    }
  }
}
</script>
<style lang="scss" scoped>
.supplierTable {
  box-shadow: 0 0 1.25rem rgb(27 29 33 / 8%);
  border-radius: 0.375rem;
  background: #fff;
  padding: 20px;
  margin-top: 20px;
}
</style>