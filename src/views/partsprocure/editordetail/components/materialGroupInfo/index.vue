<!--
 * @Author: your name
 * @Date: 2021-03-01 10:29:09
 * @LastEditTime: 2021-03-01 15:58:53
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \rise\src\views\partsprocure\editordetail\components\materialGroupInfo\index.vue
-->
<template>
  <iCard class="materialGroupInfo" tabCard v-loading="loading">
    <template v-slot:header-control>
      <iButton v-if="!setMaterialGroupStatus" @click="setMaterialGroup">设置工艺组</iButton>
      <!-- <iButton v-if="!setMaterialGroupStatus" @click="log">日志</iButton> -->
      <iButton v-if="setMaterialGroupStatus" @click="confirmMaterialGroup" :loading="confirmLoading">确认</iButton>
      <iButton v-if="setMaterialGroupStatus" @click="back">返回</iButton>
    </template>
    <div class="body">
      <infos :data="info" />
      <div v-if="setMaterialGroupStatus">
        <tableList 
          class="table margin-top20"
          indexLabel="编号" 
          :tableData="tableListData" 
          :tableTitle="tableTitle" 
          :tableLoading="tableLoading"
          @handleSelectionChange="handleSelectionChange" />
        <iPagination
          v-if="false"
          class="pagination margin-top30"
          @size-change="handleSizeChange($event, getUsage)"
          @current-change="handleCurrentChange($event, getUsage)"
          background
          :current-page="page.size"
          :page-sizes="page.pageSizes"
          :page-size="page.pageSize"
          :layout="page.layout"
          :total="page.totalCount" />
      </div>
    </div>
    <logDialog :visible.sync="logVisible" />
  </iCard>
</template>

<script>
import { tableTitle } from './components/data'
import { iButton, iCard, iPagination, iMessage } from '@/components'
import infos from './components/infos'
import tableList from '@/views/partsign/editordetail/components/tableList'
import { pageMixins } from '@/utils/pageMixins'
import { getMaterialGroup, getMeterialStuff, putMaterialGroup } from "@/api/partsprocure/editordetail"
import logDialog from "@/views/partsign/editordetail/components/logDialog"

export default {
  components: { iButton, iCard, iPagination, tableList, infos, logDialog },
  mixins: [ pageMixins ],
  data() {
    return {
      tableTitle,
      loading: false,
      tableLoading: false,
      tableListData: [],
      setMaterialGroupStatus: false,
      multipleSelection: [],
      logVisible: false,
      info: {},
      confirmLoading: false
    }
  },
  watch: {
    setMaterialGroupStatus(status) {
      if (status) this.getMeterialStuff()
    }
  },
  created() {
    this.getMaterialGroup()
  },
  methods: {
    getMaterialGroup() {
      getMaterialGroup({ id: 1 })
        .then(res => {
          this.info = res.data
          this.loading = false
        })
        .catch(() => this.loading = false)
    },
    setMaterialGroup() {
      if (!this.info.id) return iMessage.warn("缺失有效的材料组id")
      this.setMaterialGroupStatus = true

      this.getStuff()
    },
    confirmMaterialGroup() {
      if (this.multipleSelection.length !== 1) return iMessage.warn('抱歉，此处必须选择一条工艺组数据')
      const data = this.multipleSelection[0]

      this.confirmLoading = true
      putMaterialGroup({
        id: 1,
        stuffCode: data.stuffCode,
        stuffId: data.id,
        // updateBy: userId
      })
        .then(() => {
          iMessage.success('设置成功')
          this.confirmLoading = false
          this.back()
        })
        .catch(() => this.confirmLoading = false)
    },
    getMeterialStuff() {
      this.tableLoading = true

      getMeterialStuff({
        categoryId: 1,
      })
        .then(res => {
          this.tableListData = res.data
          // this.page.totalCount = res.total
          this.tableLoading = false
        })
        .catch(() => this.tableLoading = false)
    },
    handleSelectionChange(list) {
      this.multipleSelection = list
    },
    log() {
      this.logVisible = true
    },
    back() {
      this.setMaterialGroupStatus = false
      this.tableListData = []
      this.loading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.materialGroupInfo {
  ::v-deep .el-loading-mask {
    z-index: 2;
  }
}
</style>