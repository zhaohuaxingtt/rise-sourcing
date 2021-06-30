<!--
 * @Author: your name
 * @Date: 2021-03-01 10:29:09
 * @LastEditTime: 2021-06-23 19:34:30
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsprocure\editordetail\components\materialGroupInfo\index.vue
-->
<template>
  <iCard class="materialGroupInfo" tabCard v-loading="loading">
    <template v-slot:header-control>
      <iButton
        v-if="!setMaterialGroupStatus"
        @click="setMaterialGroup"
        v-permission="PARTSPROCURE_EDITORDETAIL_SETPROCESSGROUP"
        >{{ $t("LK_SHEZHIGONGYIZU") }}</iButton
      >
      <iButton
        v-if="setMaterialGroupStatus"
        @click="confirmMaterialGroup"
        :loading="confirmLoading"
        v-permission="PARTSPROCURE_EDITORDETAIL_MATERIALGROUPINFO_CONFIRM"
        >{{ $t("LK_QUEREN") }}</iButton
      >
      <iButton
        v-if="setMaterialGroupStatus"
        @click="back"
        v-permission="PARTSPROCURE_EDITORDETAIL_MATERIALGROUPINFO_BACK"
        >{{ $t("LK_FANHUI") }}</iButton
      >
      <iButton @click="jumpBdl">{{ $t('LK_CHAZHAOGONGYIZUGONGYINGSHANG') }}</iButton>
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
import { iButton, iCard, iPagination, iMessage } from '@/components'
import infos from './components/infos'
import tableList from '@/views/partsign/editordetail/components/tableList'
import { pageMixins } from '@/utils/pageMixins'
import {
  getMaterialGroup,
  getMeterialStuff,
  putMaterialGroup,
} from '@/api/partsprocure/editordetail'
import { changeProcure } from '@/api/partsprocure/home'
// import logDialog from "@/views/partsign/editordetail/components/logDialog"

export default {
  components: { iButton, iCard, iPagination, tableList, infos },
  // logDialog
  mixins: [ pageMixins ],
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
  },
  data() {
    return {
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
  created() {
    this.getMaterialGroup()
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
            console.log(this.info)
          } else {
            iMessage.error(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
          }
          
          this.loading = false
        })
        .catch(() => (this.loading = false))
    },
    // 设置工艺组
    setMaterialGroup() {
      if (!this.params.partNum) return iMessage.warn(this.$t('LK_QUESHIYOUXIAODELINGJIANBIANHAO'))
      this.setMaterialGroupStatus = true

      // this.getMeterialStuff()
    },
    // 设置工艺组请求
    confirmMaterialGroup() {
      if (this.multipleSelection.length !== 1) return iMessage.warn(this.$t('LK_CICHUBIXUXUANZEYITIAOGONGYIZUSHUJU'))
      if (!this.info.id) return iMessage.warn(this.$t('LK_QUESHIYOUXIAODEGONGYIZUID'))
      if (!this.params.partNum) return iMessage.warn(this.$t('LK_QUESHIYOUXIAODELINGJIANBIANHAO'))
      const data = this.multipleSelection[0]

      // console.log('data', data)

      this.confirmLoading = true
      changeProcure({
        batch: {
          categoryId: data.categoryId,
          categoryCode: data.categoryCode,
          categoryName: data.categoryNameZh,
          purchaseProjectIds: [ this.params.purchasePrjectId ],
          stuffCode: data.stuffCode,
          stuffId: data.id,
          stuffName: data.materialStuffGroupName
        }
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
        .catch(() => this.confirmLoading = false)
      // putMaterialGroup({
      //   id: this.info.id,
      //   stuffCode: data.stuffCode,
      //   stuffId: data.id,
      //   updateBy: this.userInfo.id,
      //   partNums: [this.params.partNum].join('&partNums='),
      //   partPurchaseProId: this.params
      // })
      //   .then((res) => {
      //     if (res.code == 200) {
      //       iMessage.success(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
      //       this.confirmLoading = false
      //       this.getMaterialGroup()
      //       this.back()
      //     } else {
      //       iMessage.error(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
      //     }
      //   })
      //   .catch(() => this.confirmLoading = false)
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
      window.open(`${ process.env.VUE_APP_PORTAL_URL }/supplier/supplierList`, '_blank')
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