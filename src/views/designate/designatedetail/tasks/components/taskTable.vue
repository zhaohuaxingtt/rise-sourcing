<template>
  <iCard class="margin-top20">
    <div class="margin-bottom20 clearFloat">
        <span class="font18 font-weight">
          {{ $t("Tasks") }}</span
        >
        <div class="floatright" v-if="editControl">
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
            v-if="!$store.getters.isPreview"
            @click="handlCancel"
            :loading="startLoding"
          >
            {{ $t("LK_QUXIAO") }}
          </iButton>
        </div>
        <div class="floatright" v-else>
          <!-- 编辑 -->
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
        :class="{taskTable: true, edit: editControl}"
        @handleSelectionChange="handleSingleSelectionChange"
        @openPage="openPage"
        :activeItems="'partNum'"
      >
        <template #partNum="scope">
          <a class="link-underline" href="javascript:;">{{scope.row.partNum}}</a>
        </template>
        <!-- 任务时间 -->
        <template #time="scope">
          <div v-if="editControl">
            <iDatePicker v-model='scope.row.time' value-format="yyyy-MM-dd">
            </iDatePicker>
          </div>
          <span v-else>{{scope.row.time}}</span>
        </template>
        <!-- 任务名称 -->
        <template #task="scope">
          <div v-if="editControl">
            <iInput v-model="scope.row.task" />
          </div>
          <span v-else>{{scope.row.task}}</span>
        </template>
        <!-- 任务结果 -->
        <template #result="scope">
          <div v-if="editControl">
            <iInput v-model="scope.row.result" />
          </div>
          <span v-else>{{scope.row.result}}</span>
        </template>
        <!-- 部门 -->
        <template #status="scope">
          <div v-if="editControl">
            <iSelect
              v-model="scope.row.status"
              :placeholder="$t('LK_QINGXUANZE')">
              <el-option
                :value="items.key"
                :label="items.value"
                v-for="(items, index) in taskStatus"
                :key="index"
              ></el-option>
            </iSelect>
          </div>
          <span v-else>{{scope.row.status}}</span>
        </template>
        <!-- 编辑 -->
        <template #edit="scope">
          <div v-if="editControl">
            <a class="link-underline" v-if="scope.row.visible">
              <icon symbol name="iconyincang" class="icon trigger-visible" />
            </a>
            <a class="link-underline" v-else>
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
  getNominateTaskList
} from '@/api/designate/decisiondata/tasks'
import { pageMixins } from '@/utils/pageMixins'
import filters from "@/utils/filters"

import tablelist from "./tableList";

import {
  iCard,
  iButton,
  iInput,
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
      data: [],
      selectedData: [],
      editControl: false,
      partDialogVisibal: false,
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
    getFetchData() {
      this.tableLoading = true
      getNominateTaskList({
        nominateId: '1',
        current: this.page.currPage,
        size: this.page.pageSize
      }).then(res => {
        if (res.code === '200') {
          this.data = res.data.records || []
          this.page.totalCount = res.data.total || 0
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