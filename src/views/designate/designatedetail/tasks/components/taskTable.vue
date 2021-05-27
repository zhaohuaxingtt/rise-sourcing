<template>
  <iCard class="margin-top20">
    <div class="margin-bottom20 clearFloat">
        <span class="font18 font-weight">
          {{ $t("Tasks") }}</span
        >
        <div class="floatright" v-if="singleEditControl">
          <iButton
            v-if="!$store.getters.isPreview"
            @click="partDialogVisibal = !partDialogVisibal"
          >
            {{ $t("LK_XINZENG") }}
          </iButton>
          <iButton
            v-if="!$store.getters.isPreview"
            @click="setEditState(false)"
            :loading="startLoding"
          >
            {{ $t("LK_BAOCUN") }}
          </iButton>
          <iButton
            v-if="!$store.getters.isPreview"
            @click="setEditState(false)"
            :loading="startLoding"
          >
            {{ $t("LK_QUXIAO") }}
          </iButton>
        </div>
        <div class="floatright" v-else>
          <!-- 批量编辑 -->
          <iButton @click="handleBatchEdit" v-if="!$store.getters.isPreview">
            {{ $t("nominationSupplier.BatchEdit") }}
          </iButton>
          <iButton v-if="!$store.getters.isPreview" @click="handlEdit">
            {{ $t("nominationSupplier.Edit") }}
          </iButton>
          <iButton v-if="!$store.getters.isPreview">
            {{ $t("nominationSupplier.Export") }}
          </iButton>
        </div>
      </div>
      <tablelist
        index
        :selection="!$store.getters.isPreview"
        :tableData="data"
        :tableTitle="tasksTitle"
        :tableLoading="tableLoading"
        @handleSelectionChange="handleSingleSelectionChange"
        @openPage="openPage"
        :activeItems="'partNum'"
      >
        <template #partNum="scope">
          <a class="link-underline" href="javascript:;">{{scope.row.partNum}}</a>
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
        <!-- 单一原因 -->
        <template #reason="scope">
          <div v-if="scope.row.isEdit">
            <iSelect
              v-model="scope.row.reason"
              :placeholder="$t('LK_QINGXUANZE')">
              <el-option
                :value="items.key"
                :label="items.value"
                v-for="(items, index) in []"
                :key="index"
              ></el-option>
            </iSelect>
          </div>
          <span v-else>{{scope.row.reason}}</span>
        </template>
        <!-- 部门 -->
        <template #dept="scope">
          <div v-if="scope.row.isEdit">
            <iSelect
              v-model="scope.row.dept"
              :placeholder="$t('LK_QINGXUANZE')">
              <el-option
                :value="items.key"
                :label="items.value"
                v-for="(items, index) in []"
                :key="index"
              ></el-option>
            </iSelect>
          </div>
          <span v-else>{{scope.row.dept}}</span>
        </template>
      </tablelist>
      <iPagination
        v-update
        @size-change="handleSizeChange($event, getTableListFn)"
        @current-change="handleCurrentChange($event, getTableListFn)"
        background
        :current-page="page.currPage"
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :layout="page.layout"
        :total="page.totalCount"
      />
  </iCard>
</template>

<script>
import Vue from 'vue'
import {
  tasksTitle,
  MoketasksData
} from './data'
import tablelist from "./tableList";

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
    tablelist
  },
  data() {
    return {
      // 单一供应商
      tasksTitle,
      data: MoketasksData,
      selectSingleData: [],
      singleEditControl: false,
      partDialogVisibal: false,
      batchEditVisibal: false,
      page: {}
    }
  },
  methods: {
    // 批量编辑
    handleBatchEdit() {
      if (!this.selectSingleData.length) {
        iMessage.error('请选择')
        return
      }
      this.batchEditVisibal = true
    },
    handlEdit() {
      if (!this.selectSingleData.length) {
        iMessage.error('请选择')
        return
      }
      this.singleEditControl = true
      this.setEditState(true)
    },
    setEditState(state = false) {
      this.selectSingleData.forEach(item => {
        const tar = this.singleListData.find(o => o.id === item.id)
        tar && (Vue.set(tar, 'isEdit', state))
      })
    },
    // 单一供应商
    handleSingleSelectionChange(data) {
      this.selectSingleData = data
    },
  }
}
</script>
<style lang="scss" scoped>
</style>