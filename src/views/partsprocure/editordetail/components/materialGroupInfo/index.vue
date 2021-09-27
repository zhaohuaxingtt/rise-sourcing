<!--
 * @Author: your name
 * @Date: 2021-03-01 10:29:09
 * @LastEditTime: 2021-09-14 20:08:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsprocure\editordetail\components\materialGroupInfo\index.vue
-->
<template>
  <iCard class="materialGroupInfo" tabCard v-loading="loading">
    <template v-slot:header-control v-if="!disabled">
      <iButton
        v-if="!setMaterialGroupStatus"
        @click="setMaterialGroup"
        v-permission="PARTSPROCURE_EDITORDETAIL_SETPROCESSGROUP"
        >{{ language("LK_SHEZHIGONGYIZU",'设置工艺组') }}</iButton
      >
      <iButton
        v-if="setMaterialGroupStatus"
        @click="confirmMaterialGroup"
        :loading="confirmLoading"
        v-permission="PARTSPROCURE_EDITORDETAIL_MATERIALGROUPINFO_CONFIRM"
        >{{ language("LK_QUEREN",'确认') }}</iButton
      >
      <iButton
        v-if="setMaterialGroupStatus"
        @click="back"
        v-permission="PARTSPROCURE_EDITORDETAIL_MATERIALGROUPINFO_BACK"
        >{{ language("LK_FANHUI",'返回') }}</iButton
      >
      <iButton v-permission.auto="PARTSPROCURE_EDITORDETAIL_CHAZHAOGONGYIZUGONGYINGSHANG|查找工艺组供应商" @click="jumpBdl">{{ language('LK_CHAZHAOGONGYIZUGONGYINGSHANG','查找工艺组供应商') }}</iButton>
    </template>
    <div class="body">
      <infos :data="info" />
      <div v-if="setMaterialGroupStatus">
        <tableList
          class="table margin-top20"
          :indexLabel="language('LK_BIANHAO','编号')"
          :tableData="tableListData"
          :tableTitle="tableTitle"
          :tableLoading="tableLoading"
          @handleSelectionChange="handleSelectionChange"
        />
        <iPagination
          v-if="false"
          class="pagination margin-top30"
          @size-change="handleSizeChange($event, getUsage)"
          @current-change="handleCurrentChange($event, getUsage)"
          background
          :current-page="page.currPage"
          :page-sizes="page.pageSizes"
          :page-size="page.pageSize"
          :layout="page.layout"
          :total="page.totalCount"
			v-update
        />
      </div>
    </div>
    <!-- <logDialog :visible.sync="logVisible" /> -->
  </iCard>
</template>

<script>
import { tableTitle } from './components/data'
import { iButton, iCard, iPagination, iMessage } from 'rise'
import infos from './components/infos'
import {partProjTypes} from '@/config'
import tableList from '@/views/partsign/editordetail/components/tableList'
import { pageMixins } from '@/utils/pageMixins'
import {getMaterialGroup,getMeterialStuff} from '@/api/partsprocure/editordetail'
import { batchUpdateStuff } from '@/api/partsprocure/home'
// import logDialog from "@/views/partsign/editordetail/components/logDialog"

export default {
  components: { iButton, iCard, iPagination, tableList, infos },
  mixins: [ pageMixins ],
  inject: ['getDisabled'],
  props: {
    params: {
      type: Object,
      require: true,
    },
  },
  computed: {
    // eslint-disable-next-line no-undef
    ...Vuex.mapState({
      userInfo: (state) => state.permission.userInfo,
    }),
    disabled() {
      return this.getDisabled()
    }
  },
  data() {
    return {
      partProjTypes,
      tableTitle,
      loading: false, // 主loading
      tableLoading: false, // 工艺组表格loading
      tableListData: [], // 工艺组表格数据
      setMaterialGroupStatus: false, // 工艺组表格显隐状态
      multipleSelection: [], // 工艺组多选项
      // logVisible: false,
      info: {}, // 材料组数据
      confirmLoading: false, // 确认按钮loading
    };
  },
  watch: {
    setMaterialGroupStatus(status) {
      if (status) this.getMeterialStuff()
    },
  },
  mounted() {
    if(this.params.partProjectType !== this.partProjTypes.GANGCAIYICIXINGCAIGOU){
      this.getMaterialGroup()
    }
  },
  methods: {
    // 获取材料组数据
    getMaterialGroup() {
      // 签收的时候默认会设置一个采购项目为这个零件号。移除提示问题
      //if (!this.params.categoryCode) return iMessage.warn(this.$t('LK_QUESHICAILIAOZUBIANHAOETC'))
      this.loading = true
      getMaterialGroup({ partNum: this.params.partNum })
        .then(res => {
          if (res.code == 200) {
            this.info = res.data || {}
          } else {
            iMessage.error(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
          }
          
          this.loading = false
        })
        .catch(() => (this.loading = false))
    },
    // 设置工艺组
    setMaterialGroup() {
      if (!this.params.partNum) return iMessage.warn(this.language('LK_QUESHIYOUXIAODELINGJIANBIANHAO','缺失有效的零件编号'))
      this.setMaterialGroupStatus = true

      // this.getMeterialStuff()
    },
    // 设置工艺组请求
    confirmMaterialGroup() {
      if (this.multipleSelection.length !== 1) return iMessage.warn(this.language('LK_CICHUBIXUXUANZEYITIAOGONGYIZUSHUJU','抱歉，此处只能选择一条工艺组数据'))
      if (!this.info.id) return iMessage.warn(this.language('LK_QUESHIYOUXIAODEGONGYIZUID','缺失有效的工艺组id'))
      if (!this.params.partNum) return iMessage.warn(this.language('LK_QUESHIYOUXIAODELINGJIANBIANHAO','缺失有效的零件编号'))
      const data = this.multipleSelection[0]
      this.confirmLoading = true
      batchUpdateStuff({
          operator: this.userInfo.id,
          ids: [ this.params.id ],
          categoryId: data.categoryId,
          categoryCode: data.categoryCode,
          categoryName: data.materialGroupName,
          stuffCode: data.stuffCode,
          stuffId: data.id,
          stuffName: data.materialStuffGroupName
      })
        .then((res) => {
          if (res.code == 200) {
            iMessage.success(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
            this.getMaterialGroup()
            this.back()
          } else {
            iMessage.error(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
          }
          this.confirmLoading = false
        })
        .catch((err) => {this.confirmLoading = false;iMessage.error(err.desZh)})
    },
    // 获取零件可选的工艺组数据
    getMeterialStuff() {
      this.tableLoading = true

      getMeterialStuff({
        partNum: this.params.partNum,
      })
        .then((res) => {
          if (res.code == 200) {
            this.tableListData = res.data
          } else {
            iMessage.error(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
          }
          // this.page.totalCount = res.total
          this.tableLoading = false
        })
        .catch(() => this.tableLoading = false)
    },
    // 表格多选
    handleSelectionChange(list) {
      this.multipleSelection = list
    },
    // 日志
    // log() {
    //   this.logVisible = true
    // },
    // 返回
    back() {
      this.setMaterialGroupStatus = false
      this.tableListData = []
      this.loading = false
    },
    jumpBdl() {
      window.open(`${ process.env.VUE_APP_PORTAL_URL }supplier/supplierList`, '_blank')
    }
  },
};
</script>

<style lang="scss" scoped>
.materialGroupInfo {
  ::v-deep .el-loading-mask {
    z-index: 2;
  }
}
</style>