<template>
  <iCard class="margin-top20">
    <div class="margin-bottom20 clearFloat">
        <span class="font18 font-weight">
          {{ language("Tasks",'Tasks') }}</span
        >
        <div class="floatright" v-if="editControl">
          <iButton
            @click="addRow"
            v-permission.auto="SOURCING_NOMINATION_ATTATCH_TASKS_ADDTASKSROW|新增TASKS行"
          >
            {{ language("strategicdoc_XinZengHang",'新增行') }}
          </iButton>
          <iButton
            @click="deleteRow"
            v-permission.auto="SOURCING_NOMINATION_ATTATCH_TASKS_DELETETASKSROW|删除TASKS行"
          >
            {{ language("strategicdoc_ShanChuHang",'删除行') }}
          </iButton>
          <iButton
            @click="save"
            :loading="submiting"
            v-permission.auto="SOURCING_NOMINATION_ATTATCH_TASKS_SAVETASKS|保存TASKS"
          >
            {{ language("LK_BAOCUN",'保存') }}
          </iButton>
          <iButton
            v-if="!$store.getters.isPreview"
            @click="handlCancel"
            :loading="startLoding"
            v-permission.auto="SOURCING_NOMINATION_ATTATCH_TASKS_EXITEDIT|结束编辑"
          >
            {{ language("strategicdoc_JieSuBianJi",'结束编辑') }}
          </iButton>
        </div>
        <div class="floatright" v-else>
          <!-- 编辑 -->
          <iButton v-if="!$store.getters.isPreview" @click="handlEdit" v-permission.auto="SOURCING_NOMINATION_ATTATCH_TASKS_EDIT|编辑">
            {{ language("nominationSupplier_Edit",'编辑') }}
          </iButton>
          <iButton @click="exportTasks" v-if="!$store.getters.isPreview" v-permission.auto="SOURCING_NOMINATION_ATTATCH_TASKS_EXPORT|导出">
            {{ language("nominationSupplier_Export",'导出') }}
          </iButton>
        </div>
      </div>
      <tableList
        index
        :selection="!$store.getters.isPreview"
        :tableData="data"
        :tableTitle="tasksTitle"
        :tableLoading="tableLoading"
        :class="{taskTable: true, edit: editControl}"
        v-permission.auto="SOURCING_NOMINATION_ATTATCH_TASKS_TABLE|表格"
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
              :placeholder="language('LK_QINGXUANZE','请选择')">
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
          <div>
            <!-- <div v-if="editControl && scope.row.isAdd"> -->
            <a class="link-underline" v-if="!scope.row.isPresent" @click="toggleShow(scope.row, true)">
              <icon symbol name="iconyincang" class="icon trigger-visible" />
            </a>
            <a class="link-underline" v-else @click="toggleShow(scope.row, false)">
              <icon symbol name="iconxianshi" class="icon trigger-visible" />
            </a>
          </div>
        </template>
      </tableList>
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
import tableList from '@/views/designate/supplier/components/tableList'

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
    tableList
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
    this.toggleShowEditCol(!this.$store.getters.isPreview)
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
        iMessage.error(this.language('nominationSuggestion_QingXuanZeZhiShaoYiTiaoShuJu','请选择至少一条数据'))
        return
      }
      const data = {
        taskIds: this.selectedData.map(o => o.id)
      }
      console.log(data)
      const confirmInfo = await this.$confirm(this.language('deleteSure','您确定要执行删除操作吗？'))
      if (confirmInfo !== 'confirm') return
      deleteNominateTask(data).then(res => {
        if (res.code === '200') {
          iMessage.success(this.language('LK_CAOZUOCHENGGONG','操作成功'))
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
      if (!this.editControl) return
      Vue.set(row, 'isPresent', state)
    },
    async save() {
      const data = {
        items: this.data.map(o => {
          // const status = this.taskStatus.find(item => item.key === o.isFinishFlag) || {}
          return {
            id: o.id,
            isFinishFlag: o.isFinishFlag,
            isPresent: o.isPresent,
            nominateId: this.$store.getters.nomiAppId,
            taskRemark: o.taskRemark,
            taskResult: o.taskResult,
            taskTime: o.taskTime
          }
        })
      }
      console.log(data)
      const confirmInfo = await this.$confirm(this.language('saveSure', '您确定要保存吗？'))
      if (confirmInfo !== 'confirm') return
      this.submiting = true
      addNominateTask(data).then(res => {
        if (res.code === '200') {
          iMessage.success(this.language('LK_CAOZUOCHENGGONG','操作成功'))
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
        size: this.page.pageSize,
        isPreview: this.$store.getters.isPreview
      }).then(res => {
        if (res.code === '200') {
          this.data = res.data || []
          this.data.map(o => {
            o.createDate = window.moment(o.createDate).format('YYYY-MM-DD HH:mm:ss')
            o.taskTime = o.taskTime ? window.moment(o.taskTime).format('YYYY-MM-DD HH:mm:ss') : ''
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
      // if (!this.tasksTitle.find(o => o.props === 'edit')) {
      //   this.tasksTitle.push(this.editColumn)
      // }
    },
    handlCancel() {
      this.editControl = false
      this.getFetchData()
      // if (this.tasksTitle.find(o => o.props === 'edit')) {
      //   this.tasksTitle.pop()
      // }
    },
    toggleShowEditCol(state) {
      if (state) {
        if (!this.tasksTitle.find(o => o.props === 'edit')) {
          this.tasksTitle.push(this.editColumn)
        }
      } else {
        if (this.tasksTitle.find(o => o.props === 'edit')) {
          this.tasksTitle.pop()
        }
      }
    },
    // 单一供应商
    handleSingleSelectionChange(data) {
      this.selectedData = data
    },
    async exportTasks() {
      if (!this.selectedData.length) {
        iMessage.error(this.language('nominationSuggestion_QingXuanZeZhiShaoYiTiaoShuJu','请选择至少一条数据'))
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