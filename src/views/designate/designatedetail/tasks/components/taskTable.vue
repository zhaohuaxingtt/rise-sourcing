<template>
  <iCard class="margin-top20">
    <div class="margin-bottom20 clearFloat">
        <span class="font18 font-weight">
          {{ $t("Tasks") }}</span
        >
        <div class="floatright" v-if="editControl">
          <iButton
            @click="addRow"
          >
            {{ $t("strategicdoc.XinZengHang") }}
          </iButton>
          <iButton
            @click="deleteRow"
          >
            {{ $t("strategicdoc.ShanChuHang") }}
          </iButton>
          <iButton
            @click="save"
            :loading="submiting"
          >
            {{ $t("LK_BAOCUN") }}
          </iButton>
          <iButton
            v-if="!$store.getters.isPreview"
            @click="handlCancel"
            :loading="startLoding"
          >
            {{ $t("strategicdoc.JieSuBianJi") }}
          </iButton>
        </div>
        <div class="floatright" v-else>
          <!-- 编辑 -->
          <iButton v-if="!$store.getters.isPreview" @click="handlEdit">
            {{ $t("nominationSupplier.Edit") }}
          </iButton>
          <iButton @click="exportTasks" v-if="!$store.getters.isPreview">
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
        :class="{taskTable: true, edit: editControl}"
        @handleSelectionChange="handleSingleSelectionChange"
      >
        <template #partNum="scope">
          <a class="link-underline" href="javascript:;">{{scope.row.partNum}}</a>
        </template>
        <!-- 任务时间 -->
        <template #taskTime="scope">
          <div v-if="editControl">
            <iDatePicker v-model='scope.row.taskTime' value-format="yyyy-MM-dd HH:mm:ss">
            </iDatePicker>
          </div>
          <span v-else>{{scope.row.taskTime}}</span>
        </template>
        <!-- 任务名称 -->
        <template #taskRemark="scope">
          <div v-if="editControl">
            <iInput v-model="scope.row.taskRemark" />
          </div>
          <span v-else>{{scope.row.taskRemark}}</span>
        </template>
        <!-- 任务结果 -->
        <template #taskResult="scope">
          <div v-if="editControl">
            <iInput v-model="scope.row.taskResult" />
          </div>
          <span v-else>{{scope.row.taskResult}}</span>
        </template>
        <!-- 任务状态 -->
        <template #isFinishFlag="scope">
          <div v-if="editControl">
            <iSelect
              v-model="scope.row.isFinishFlag"
              :placeholder="$t('LK_QINGXUANZE')">
              <el-option
                :value="items.key"
                :label="items.value"
                v-for="(items, index) in taskStatus"
                :key="index"
              ></el-option>
            </iSelect>
          </div>
          <span v-else>{{getTaskStatusDesc(scope.row.isFinishFlag)}}</span>
        </template>
        <!-- 编辑 -->
        <template #edit="scope">
          <div v-if="editControl && scope.row.isAdd">
            <a class="link-underline" v-if="scope.row.isPresent" @click="toggleShow(scope.row, false)">
              <icon symbol name="iconyincang" class="icon trigger-visible" />
            </a>
            <a class="link-underline" v-else @click="toggleShow(scope.row, true)">
              <icon symbol name="iconxianshi" class="icon trigger-visible" />
            </a>
          </div>
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
  taskStatus
} from './data'
import { 
  getNominateTaskList,
  addNominateTask,
  deleteNominateTask
} from '@/api/designate/decisiondata/tasks'
import { excelExport } from '@/utils/filedowLoad'
import { pageMixins } from '@/utils/pageMixins'
import filters from "@/utils/filters"
import tablelist from "./tableList";

import {
  iCard,
  iInput,
  iButton,
  iPagination,
  iMessage,
  iSelect,
  iDatePicker,
  icon
} from "rise";

export default {
  components: {
    iCard,
    iButton,
    iInput,
    iSelect,
    iPagination,
    iDatePicker,
    icon,
    tablelist
  },
  mixins: [ filters, pageMixins ],
  data() {
    return {
      // 单一供应商
      tasksTitle,
      taskStatus,
      tableLoading: false,
      submiting: false,
      data: [],
      selectedData: [],
      editControl: false,
      batchEditVisibal: false,
      editColumn: {
        props: 'edit',
        name: 'HIDE/UNHIDE',
        key: 'HIDE/UNHIDE',
        tooltip: false
      },
      page: {
        currPage: 1,
        pageSize: 10,
        totalCount: 0,
        layout: "total, prev, pager, next, jumper"
      }
    }
  },
  mounted() {
    this.getFetchData()
  },
  methods: {
    // 取任务状态
    getTaskStatusDesc(key) {
      const task = taskStatus.find(o => o.key === key)
      return (task && task.value) || ''
    },
    addRow() {
      this.data.push({
        isFinishFlag: false,
        isPresent: true,
        isAdd: true,
        nominateId: this.$store.getters.nomiAppId,
        taskRemark: '',
        taskResult: '',
        taskTime: ''
      })
    },
    async deleteRow() {
      if (!this.selectedData.length) {
        iMessage.error(this.$t('nominationSuggestion.QingXuanZeZhiShaoYiTiaoShuJu'))
        return
      }
      const data = {
        taskIds: this.selectedData.map(o => o.id)
      }
      console.log(data)
      const confirmInfo = await this.$confirm(this.$t('deleteSure'))
      if (confirmInfo !== 'confirm') return
      deleteNominateTask(data).then(res => {
        if (res.code === '200') {
          iMessage.success(this.$t('LK_CAOZUOCHENGGONG'))
          this.getFetchData()
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
      }).catch(e => {
        console.log(e)
        iMessage.error(this.$i18n.locale === "zh" ? e.desZh : e.desEn)
      })
    },
    toggleShow(row, state) {
      Vue.set(row, 'isPresent', state)
    },
    async save() {
      if (!this.selectedData.length) {
        iMessage.error(this.$t('nominationSuggestion.QingXuanZeZhiShaoYiTiaoShuJu'))
        return
      }
      const data = {
        items: this.selectedData.map(o => {
          const status = this.taskStatus.find(item => item.key === o.isFinishFlag) || {}
          return {
            id: o.id,
            isFinishFlag: status.value,
            isPresent: o.isPresent ? 1 : 0,
            nominateId: this.$store.getters.nomiAppId,
            taskRemark: o.taskRemark,
            taskResult: o.taskResult,
            taskTime: o.taskTime
          }
        })
      }
      console.log(data)
      const confirmInfo = await this.$confirm(this.$t('saveSure'))
      if (confirmInfo !== 'confirm') return
      this.submiting = true
      addNominateTask(data).then(res => {
        if (res.code === '200') {
          iMessage.success(this.$t('LK_CAOZUOCHENGGONG'))
          this.getFetchData()
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
        this.submiting = false
      }).catch(e => {
        console.log(e)
        this.submiting = false
      })
    },
    // 获取任务列表
    getFetchData() {
      this.tableLoading = true
      getNominateTaskList({
        nominateId: this.$store.getters.nomiAppId,
        current: this.page.currPage,
        size: this.page.pageSize
      }).then(res => {
        if (res.code === '200') {
          this.data = res.data || []
          this.data.map(o => {
            o.createDate = window.moment(o.createDate).format('YYYY-MM-DD HH:mm:ss')
            o.taskTime = o.createDate
            return o
          })
          this.page.totalCount = res.total || 0
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
        this.tableLoading = false
        console.log(res)
      }).catch(e => {
        console.log(e)
        this.tableLoading = false
      })
    },
    // 批量编辑
    handleBatchEdit() {
      if (!this.selectedData.length) {
        iMessage.error('请选择')
        return
      }
      this.batchEditVisibal = true
    },
    handlEdit() {
      this.editControl = true
      if (!this.tasksTitle.find(o => o.props === 'edit')) {
        this.tasksTitle.push(this.editColumn)
      }
    },
    handlCancel() {
      this.editControl = false
      if (this.tasksTitle.find(o => o.props === 'edit')) {
        this.tasksTitle.pop()
      }
    },
    // 单一供应商
    handleSingleSelectionChange(data) {
      this.selectedData = data
    },
    async exportTasks() {
      if (!this.selectedData.length) {
        iMessage.error(this.$t('nominationSuggestion.QingXuanZeZhiShaoYiTiaoShuJu'))
        return
      }
      console.log(this.selectedData)
      excelExport(this.selectedData, this.tasksTitle)
    }
  }
}
</script>
<style lang="scss" scoped>
.link-underline {
  .trigger-visible {
    font-size: 18px;
  }
}
</style>