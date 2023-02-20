<!--
 * @Author: your name
 * @Date: 2021-03-01 10:29:09
 * @LastEditTime: 2023-02-20 17:23:14
 * @LastEditors: 余继鹏 917955345@qq.com
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsprocure\editordetail\components\materialGroupInfo\index.vue
-->
<template>
  <iCard class="materialGroupInfo" tabCard v-loading="loading">
    <template v-slot:header-control v-if="!disabled">
      <iButton
        v-if="!setMaterialGroupStatus"
        @click="setMaterialGroup"
        v-permission.auto="PARTSPROCURE_EDITORDETAIL_SETPROCESSGROUP|设置工艺组"
        >{{ language("LK_SHEZHIGONGYIZU",'设置工艺组') }}</iButton
      >
      <iButton
        v-if="setMaterialGroupStatus"
        @click="confirmMaterialGroup"
        :loading="confirmLoading"
        v-permission.auto="PARTSPROCURE_EDITORDETAIL_MATERIALGROUPINFO_CONFIRM|确认"
        >{{ language("LK_QUEREN",'确认') }}</iButton
      >
      <iButton
        v-if="setMaterialGroupStatus"
        @click="back"
        v-permission.auto="PARTSPROCURE_EDITORDETAIL_MATERIALGROUPINFO_BACK|返回"
        >{{ language("LK_FANHUI",'返回') }}</iButton
      >
      <iButton v-permission.auto="PARTSPROCURE_EDITORDETAIL_CHAZHAOGONGYIZUGONGYINGSHANG|查找工艺组供应商" @click="jumpBdl">{{ language('LK_CHAZHAOGONGYIZUGONGYINGSHANG','查找工艺组供应商') }}</iButton>
    </template>
    <div class="body" :class="{ bodyMarginTop: disabled }">
      <infos :data="info" />
      <div v-if="setMaterialGroupStatus">
        <tableList
          singleSelect
          class="table margin-top20"
          :indexLabel="language('LK_BIANHAO','编号')"
          :tableData="tableListData"
          :tableTitle="tableTitle"
          :tableLoading="tableLoading"
          @handleSingleSelectChange="handleSingleSelectChange"
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
import { tableTitle, infos as materialTitle } from './components/data'
import { iButton, iCard, iPagination, iMessage } from 'rise'
import infos from './components/infos'
import {partProjTypes} from '@/config'
import tableList from '@/views/partsign/editordetail/components/tableList'
import { pageMixins } from '@/utils/pageMixins'
import {getMaterialGroup,getMeterialStuff,getAttachMeterialStuff, getMaterialGroupByCategoryCode} from '@/api/partsprocure/editordetail'
import { batchUpdateStuff } from '@/api/partsprocure/home'
// import logDialog from "@/views/partsign/editordetail/components/logDialog"
import { cloneDeep } from "lodash"

export default {
  components: { iButton, iCard, iPagination, tableList, infos },
  mixins: [ pageMixins ],
  inject: ['getDisabled', 'getDatailFn'],
  props: {
    params: {
      type: Object,
      require: true,
    },
    // 零件采购项目数据
    detailData: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    // eslint-disable-next-line no-undef
    ...Vuex.mapState({
      userInfo: (state) => state.permission.userInfo,
    }),
    disabled() {
      return this.getDisabled()
    },
    isAttach() {
      return this.params.partProjectType === '1000061' && this.params.partProjectTypeDesc === '附件'
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
      infoSource: {}, // 材料组后端数据备份
      confirmLoading: false, // 确认按钮loading
    };
  },
  watch: {
    setMaterialGroupStatus(status) {
      if (status) {
        // 零件项目类型为附件单独调接口拿工艺组数据
        if (this.isAttach) {
          this.getAttachMeterialStuff()
        } else {
          this.getMeterialStuff()
        }
      }
    },
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      if(this.params.partProjectType !== this.partProjTypes.GANGCAIYICIXINGCAIGOU){
        this.getMaterialGroup()
      }
    },
    // 设置特定材料组数据，目前只有附件类型
    async setAttachMaterialGroup(categoryCode=null, stuffCode=null) {
      if(this.isAttach){
        // this.info['categoryCode'] = categoryCode || this.detailData.categoryCode || ''  // 附件类型固定显示 基础信息里的材料组编号 9999
        let code = categoryCode || this.detailData.categoryCode || ''  // 附件类型固定显示 基础信息里的材料组编号 9999
        this.$set(this.info,'categoryCode',code)
        this.$set(this.info,'categoryNameZh',this.detailData.categoryName)
        this.$set(this.info,'categoryNameDe',this.detailData.categoryName)
      }
    },
    // 获取材料组数据
    getMaterialGroup(categoryCode=null, stuffCode=null) {
      if(!(categoryCode||this.detailData.categoryCode)) return // 如果没有categoryCode不调用查询接口
      // 签收的时候默认会设置一个采购项目为这个零件号。移除提示问题
      //if (!this.params.categoryCode) return iMessage.warn(this.$t('LK_QUESHICAILIAOZUBIANHAOETC'))
      this.loading = true
      // getMaterialGroup({ partNum: this.params.partNum, pprjId: this.params.id }) // 根据零件六位号查询
      getMaterialGroupByCategoryCode({ categoryCode:categoryCode||this.detailData.categoryCode, pprjId: this.params.id })  // 根据材料组code查询
        .then(res => {
          if (res.code == 200) {
            this.info = res.data || {}
            this.setAttachMaterialGroup(categoryCode, stuffCode)
            this.infoSource = cloneDeep(this.info)
          } else {
            iMessage.error(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
          }
          
          this.loading = false
        })
        .catch(() => (this.loading = false)).finally(()=>{
          this.setAttachMaterialGroup(categoryCode, stuffCode)
        })
    },
    // 设置工艺组
    setMaterialGroup() {
      if (!this.params.partNum) return iMessage.warn(this.language('LK_QUESHIYOUXIAODELINGJIANBIANHAO','缺失有效的零件编号'))
      this.setMaterialGroupStatus = true

      // this.getMeterialStuff()
    },
    // 设置工艺组请求
    confirmMaterialGroup() {
      if (this.multipleSelection.length !== 1) return iMessage.warn(this.language('LK_CICHUBIXUXUANZEYITIAOGONGYIZUSHUJU','抱歉，此处必须选择一条工艺组数据'))
        const data = this.multipleSelection[0]
      if (!this.isAttach) {
        if (!data.id) return iMessage.warn(this.language('LK_QUESHIYOUXIAODEGONGYIZUID','缺失有效的工艺组id'))
      }
      if (!this.params.partNum) return iMessage.warn(this.language('LK_QUESHIYOUXIAODELINGJIANBIANHAO','缺失有效的零件编号'))
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
            const resData = res.data && res.data.length && res.data[0] || {}
            // 刷新材料组数据
            this.getMaterialGroup(resData.categoryCode, resData.stuffCode)
            this.getDatailFn()
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
    // 获取零件项目类型为附件时候的零件可选的工艺组数据
    async getAttachMeterialStuff() {
      this.tableLoading = true
      try {
        const res = await getAttachMeterialStuff()
        if (res.code == 200) {
          this.tableListData = (res.data || []).map(row => {
            row.deptCodes = row.deptName
            row.categoryNameDe = row.materialStuffGroupNameDe
            row.categoryNameZh = row.materialStuffGroupName
            return row
          })
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
        }
        // this.page.totalCount = res.total
        this.tableLoading = false
      } catch (e) {
        this.tableLoading = false
      }
    },
    handleSingleSelectChange(row={}) {
      if (row) {
        if (this.isAttach) {
          materialTitle.forEach(mitem => {
            this.info[mitem.props] = row[mitem.props]
          })
        }

        this.$set(this.info, "stuffCode", row.stuffCode)
        this.multipleSelection = [row]
      } else {
        this.info = cloneDeep(this.infoSource)
        this.multipleSelection = []
      }
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

  .bodyMarginTop {
    padding-top: 30px;
  }
}
</style>