<template>
  <iCard class="supplierTable singleSupplier margin-top20">
    <div class="margin-bottom20 clearFloat">
        <span class="font18 font-weight">
          {{ $t("nominationSupplier.DanYiGongYingShang") }}</span
        >
        <div class="floatright" v-if="singleEditControl">
          <iButton
            @click="partDialogVisibal = !partDialogVisibal"
          >
            {{ $t("LK_XINZENG") }}
          </iButton>
          <iButton
            @click="setEditState(false)"
            :loading="startLoding"
          >
            {{ $t("LK_BAOCUN") }}
          </iButton>
          <iButton
            @click="setEditState(false)"
            :loading="startLoding"
          >
            {{ $t("LK_QUXIAO") }}
          </iButton>
        </div>
        <div class="floatright" v-else>
          <!-- 批量编辑 -->
          <iButton @click="handleBatchEdit">
            {{ $t("nominationSupplier.BatchEdit") }}
          </iButton>
          <iButton @click="handlEdit">
            {{ $t("nominationSupplier.Edit") }}
          </iButton>
          <iButton>
            {{ $t("nominationSupplier.Export") }}
          </iButton>
        </div>
      </div>
      <tablelist
        index
        :tableData="singleListData"
        :tableTitle="singleSupplierTitle"
        :tableLoading="tableLoading"
        @handleSelectionChange="handleSingleSelectionChange"
        @openPage="openPage"
        :activeItems="'partNum'"
      >
        <template #partNum="scope">
          <a class="link-underline" href="javascript:;">{{scope.row.partNum}}</a>
        </template>
        <!-- 供应商名 -->
        <template #suppliersName="scope">
          <div v-if="scope.row.isEdit">
            <iSelect
              v-model="scope.row.suppliersName"
              :placeholder="$t('LK_QINGXUANZE')">
              <el-option
                :value="items.key"
                :label="items.value"
                v-for="(items, index) in []"
                :key="index"
              ></el-option>
            </iSelect>
          </div>
          <span v-else>{{scope.row.suppliersName}}</span>
        </template>
        <!-- 单一原因 -->
        <template #singleReason="scope">
          <div v-if="scope.row.isEdit">
            <iSelect
              v-model="scope.row.singleReason"
              :placeholder="$t('LK_QINGXUANZE')">
              <el-option
                :value="items.label"
                :label="items.label"
                v-for="(items, index) in (selectOptions.reason || [])"
                :key="index"
              ></el-option>
            </iSelect>
          </div>
          <span v-else>{{scope.row.singleReason}}</span>
        </template>
        <!-- 部门 -->
        <template #department="scope">
          <div v-if="scope.row.isEdit">
            <iSelect
              v-model="scope.row.department"
              :placeholder="$t('LK_QINGXUANZE')">
              <el-option
                :value="items.key"
                :label="items.value"
                v-for="(items, index) in (selectOptions.dept || [])"
                :key="index"
              ></el-option>
            </iSelect>
          </div>
          <span v-else>{{scope.row.department}}</span>
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
    <!-- 零件弹窗 -->
    <partDialog :visible.sync="partDialogVisibal" />
    <!-- 批量操作弹窗 -->
    <batchEditDialog :visible.sync="batchEditVisibal" :selectOptions="selectOptions" />
  </iCard>
</template>

<script>
import Vue from 'vue'
import {
  singleSupplierTitle,
  mokeSingleSupplierData
} from './data'
import tablelist from "./tableList";
import partDialog from './partDialog'
import batchEditDialog from './batchEditDialog'

import {
  iCard,
  iButton,
  iPagination,
  iMessage,
  iSelect
} from "rise";
import {
  getSingleSupplierList
} from '@/api/designate/supplier' 
import { getDictByCode } from '@/api/dictionary'

export default {
  components: {
    iCard,
    iButton,
    iSelect,
    iPagination,
    tablelist,
    partDialog,
    batchEditDialog
  },
  data() {
    return {
      // 单一供应商
      singleSupplierTitle,
      singleListData: [],
      selectSingleData: [],
      singleEditControl: false,
      partDialogVisibal: false,
      batchEditVisibal: false,
      selectOptions: {},
      page: {
        currPage: 1,
        pageSize: 10,
        totalCount: 0,
        layout: "total, prev, pager, next, jumper"
      }
    }
  },
  mounted() {
    this.getFetchDataList()
    this.getOptions()
  },
  methods: {
    getOptions() {
      // 获取单一原因数据字典
      this.getDictionary('dept', 'score_dept')
      // 部门
      this.getDictionary('reason', 'SINGLE_SOURCING_REASON')
    },
    // 获取数据字典
    getDictionary(optionName, optionType, key = {value: 'code', label: 'name'}) {
      getDictByCode(optionType).then(res => {
        if(res?.result) {
          this.selectOptions[optionName] = res.data[0].subDictResultVo.map(item => {
            return { value: item.code, label: item.name }
          })
        }
      })
    },
    getFetchDataList() {
      this.tableLoading = true
      getSingleSupplierList({
        nominateId: this.$store.getters.nomiAppId
      }).then(res => {
        this.tableLoading = false
        if (res.code === '200') {
          this.singleListData = res.data || []
          if (this.page) {
            this.page.totalCount = Number(res.total || 0)
          }
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
      }).catch(e => {
        iMessage.error(this.$i18n.locale === "zh" ? e.desZh : e.desEn)
      })
    },
    // 批量编辑
    handleBatchEdit() {
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