<template>
  <iCard class="supplierTable singleSupplier margin-top20">
    <div class="margin-bottom20 clearFloat">
        <span class="font18 font-weight">
          {{ language("DANYIGONGYINGSHANG",'单一供应商') }}</span
        >
        <div class="floatright" v-if="singleEditControl">
          <!-- 批量编辑 -->
          <iButton @click="handleBatchEdit">
            {{ language("nominationSupplier_BatchEdit",'批量编辑') }}
          </iButton>
          <iButton
            @click="partDialogVisibal = !partDialogVisibal"
          >
            {{ language("LK_XINZENG",'新增') }}
          </iButton>
          <iButton
            @click="submit"
            :loading="submiting"
          >
            {{ language("LK_BAOCUN",'保存') }}
          </iButton>
          <iButton
            @click="singleEditControl = false"
          >
            {{ language("LK_QUXIAO",'取消') }}
          </iButton>
          <iButton
            @click="deleteRow"
          >
            {{ language("LK_SHANCHU",'删除') }}
          </iButton>
        </div>
        <div class="floatright" v-else>
          <iButton @click="handlEdit">
            {{ language("nominationSupplier_Edit",'编辑') }}
          </iButton>
          <iButton @click="exportSupplier">
            {{ language("nominationSupplier_Export",'导出') }}
          </iButton>
        </div>
      </div>
      <tablelist
        index
        :tableData="singleListData"
        :tableTitle="singleSupplierTitle"
        :tableLoading="tableLoading"
        :lang="true"
        @handleSelectionChange="handleSingleSelectionChange"
        @openPage="openPage"
        :activeItems="'partNum'"
      >
        <template #partNum="scope">
          <a class="link-underline" href="javascript:;">{{scope.row.partNum}}</a>
        </template>
        <!-- 供应商名 -->
        <template #suppliersName="scope">
          <div v-if="singleEditControl || scope.row.isEdit">
            <iSelect
              v-model="scope.row.suppliersName"
              @focus="getRfqDepartment(scope.row)"
              @change="onSupplierChange(arguments, scope.row)"
              :placeholder="language('LK_QINGXUANZE','请选择')">
              <el-option
                :value="items.supplierName"
                :label="items.supplierName"
                v-for="(items, index) in (scope.row.departmentOption || [])"
                :key="index"
              ></el-option>
            </iSelect>
          </div>
          <span v-else>{{scope.row.suppliersName}}</span>
        </template>
        <!-- 单一原因 -->
        <template #singleReason="scope">
          <div v-if="singleEditControl || scope.row.isEdit">
            <iSelect
              v-model="scope.row.singleReason"
              :placeholder="language('LK_QINGXUANZE','请选择')">
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
          <div v-if="singleEditControl || scope.row.isEdit">
            <iSelect
              v-model="scope.row.department"
              :placeholder="language('LK_QINGXUANZE','请选择')">
              <el-option
                :value="items.value"
                :label="items.value"
                v-for="(items, index) in (selectOptions.dept || [])"
                :key="index"
              ></el-option>
            </iSelect>
          </div>
          <span v-else>{{scope.row.department}}</span>
        </template>
      </tablelist>
    <!-- 零件弹窗 -->
    <partDialog :visible.sync="partDialogVisibal" @add="onPartAdd" />
    <!-- 批量操作弹窗 -->
    <batchEditDialog
      :visible.sync="batchEditVisibal"
      :selectOptions="selectOptions"
      @submit="onBatchEdit" />
  </iCard>
</template>

<script>
import Vue from 'vue'
import {
  singleSupplierTitle,
  // mokeSingleSupplierData
} from './data'
import tablelist from "./tableList";
import partDialog from './partDialog'
import batchEditDialog from './batchEditDialog'
import _ from 'lodash'

import {
  iCard,
  iButton,
  // iPagination,
  iMessage,
  iSelect
} from "rise";
import {
  getSingleSupplierList,
  addsingleSuppliersInfo,
  getRfqSupplierList,
  exportExclusiveSuppliersList
} from '@/api/designate/supplier' 
import { getDictByCode } from '@/api/dictionary'
import { excelExport } from '@/utils/filedowLoad'
import { pageMixins } from '@/utils/pageMixins'
import filters from "@/utils/filters"

export default {
  mixins: [ filters, pageMixins ],
  components: {
    iCard,
    iButton,
    iSelect,
    // iPagination,
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
      oriTableListData: [],
      singleEditControl: false,
      partDialogVisibal: false,
      batchEditVisibal: false,
      submiting: false,
      selectOptions: {},
      // 记录删除的行
      deletedRowList: []
    }
  },
  mounted() {
    this.getFetchDataList()
    this.getOptions()
  },
  methods: {
    randomid() {
      return Math.floor(Math.random() * 10000000)
    },
    onSupplierChange(data, row) {
      const val = data && data[0] || ''
      const list = row.departmentOption || []
      const op = list.find(o => o.supplierName === val) || {}
      Vue.set(row, 'supplierId', op.supplierId || '')
      Vue.set(row, 'sapNum', op.sap || '')
    },
    getRfqDepartment(item) {
      getRfqSupplierList({
        rfqId: item.rfqId
      }).then(res => {
        if (res.code === '200') {
          Vue.set(item, 'departmentOption', res.data)
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
      }).catch(e => {
        iMessage.error(this.$i18n.locale === "zh" ? e.desZh : e.desEn)
      })
    },
    async submit() {
      const confirmInfo = await this.$confirm(this.language('submitSure','您确定要执行提交操作吗？'))
      if (confirmInfo !== 'confirm') return
      this.submiting = true
      addsingleSuppliersInfo({
        items: [...this.singleListData, ...this.deletedRowList],
        nominateId: this.$store.getters.nomiAppId
      }).then(res => {
        if (res.code === '200') {
          iMessage.success(this.language('LK_CAOZUOCHENGGONG','操作成功'))
          this.getFetchDataList()
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
        this.submiting = false
      }).catch(e => {
        this.submiting = false
        iMessage.error(this.$i18n.locale === "zh" ? e.desZh : e.desEn)
      })
    },
    // 删除
    async deleteRow() {
      if (!this.selectSingleData.length) {
        iMessage.error(this.language('nominationSuggestion_QingXuanZeZhiShaoYiTiaoShuJu','请选择至少一条数据'))
        return
      }
      const confirmInfo = await this.$confirm(this.language('deleteSure','您确定要执行删除操作吗？'))
      if (confirmInfo !== 'confirm') return
      this.selectSingleData.forEach(item => {
        const dIndex = this.selectSingleData.findIndex(o => o.sid === item.sid)
        const row = this.selectSingleData[dIndex]
        
        if (dIndex >= 0) {
          this.singleListData.splice(dIndex, 1)
          row.isDelete = 1
          if (!this.deletedRowList.find(o => o.sid === row.sid)) {
            this.deletedRowList.push(row)
          }
        }
      })
      
    },
    // 取消
    async cancel() {
      // const confirmInfo = await this.$confirm(this.language('cancelSure'))
      // if (confirmInfo !== 'confirm') return
      // this.singleListData = _.cloneDeep(this.oriTableListData)
    },
    // 添加零件单一供应商
    onPartAdd(dataList = []) {
      console.log(dataList)
      Array.from(dataList).forEach(item => {
        if (!this.singleListData.find(o => o.partNum === item.partNum)) {
          item.partNameCh = item.partNameZh
          item.partNameGer = item.partNameDe
          item.nominateId = this.$store.getters.nomiAppId
          this.singleListData.push(item)
        }
      })
    },
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
          let singleListData = res.data || []
          singleListData.map(o => {
            o.sid = this.randomid()
            o.nominateId = this.$store.getters.nomiAppId
            return o
          })
          // 过滤掉已经删除的项目
          singleListData = singleListData.filter(o => o.isDelete !== 1)
          this.singleListData = singleListData
          // 备份列表数据
          this.oriTableListData = _.cloneDeep(this.singleListData)
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
      if (!this.selectSingleData.length) {
        iMessage.error(this.language('nominationSuggestion_QingXuanZeZhiShaoYiTiaoShuJu','请选择至少一条数据'))
        return
      }
      this.batchEditVisibal = true
    },
    handlEdit() {
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
    onBatchEdit(form) {
      this.selectSingleData.forEach(item => {
        Object.keys(form).forEach(key => {
          Vue.set(item, key, form[key])
        })
      })
    },
    // 导出
    async exportSupplier() {
      if (!this.selectSingleData.length) {
        iMessage.error(this.language('nominationSuggestion_QingXuanZeZhiShaoYiTiaoShuJu','请选择至少一条数据'))
        return
      }
      excelExport(this.selectSingleData, this.singleSupplierTitle)
      // exportExclusiveSuppliersList({
      //   data: this.singleListData,
      //   nominateId: this.$store.getters.nomiAppId
      // }).then(res => {
      //   excelExport(res, '单一供应商')
      // }).catch(e => {
      //   console.log(e, '123123')
      //   iMessage.error(this.$i18n.locale === "zh" ? e.desZh : e.desEn)
      // })
    },
  }
}
</script>
<style lang="scss" scoped>
</style>