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
      <iButton v-if="!setMaterialGroupStatus" @click="setMaterialGroup" v-permission="PARTSPROCURE_EDITORDETAIL_SETPROCESSGROUP">{{ $t('LK_SHEZHIGONGYIZU') }}</iButton>
      <!-- <iButton v-if="!setMaterialGroupStatus" @click="log">日志</iButton> -->
      <iButton v-if="setMaterialGroupStatus" @click="confirmMaterialGroup" :loading="confirmLoading" v-permission="PARTSPROCURE_EDITORDETAIL_MATERIALGROUPINFO_CONFIRM">{{ $t('LK_QUEREN') }}</iButton>
      <iButton v-if="setMaterialGroupStatus" @click="back" v-permission="PARTSPROCURE_EDITORDETAIL_MATERIALGROUPINFO_BACK">{{ $t('LK_FANHUI') }}</iButton>
    </template>
    <div class="body">
      <infos :data="info" />
      <div v-if="setMaterialGroupStatus">
        <tableList 
          class="table margin-top20"
          :indexLabel="$t('LK_BIANHAO')" 
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
  props: {
    params: {
      type: Object,
      require: true
    }
  },
  computed: {
    // eslint-disable-next-line no-undef
    ...Vuex.mapState({
      userInfo: state => state.permission.userInfo,
    })
  },
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
    console.log(JSON.parse(this.$route.query.item))
  },
  methods: {
    getMaterialGroup() {
      getMaterialGroup({ categoryCode: this.params.categoryCode })
        .then(res => {
          this.info = res.data
          this.loading = false
        })
        .catch(() => this.loading = false)
    },
    setMaterialGroup() {
      if (!this.params.partNum) return iMessage.warn("缺失有效的零件编号")
      this.setMaterialGroupStatus = true

      this.getMeterialStuff()
    },
    confirmMaterialGroup() {
      if (this.multipleSelection.length !== 1) return iMessage.warn('抱歉，此处必须选择一条工艺组数据')
      const data = this.multipleSelection[0]

      this.confirmLoading = true
      putMaterialGroup({
        id: this.info.id,
        stuffCode: data.stuffCode,
        stuffId: data.id,
        updateBy: this.userInfo.id,
        partNum: this.params.partNum
      })
        .then(res => {
          if (res.code == 200) {
            iMessage.success(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
            this.confirmLoading = false
            this.getMaterialGroup()
            this.back()
          } else {
            iMessage.error(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
          }
        })
        .catch(() => this.confirmLoading = false)
    },
    getMeterialStuff() {
      this.tableLoading = true

      getMeterialStuff({
        partNum: this.params.partNum,
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