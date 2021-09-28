<template>
  <iCard class="multiSupplier supplierTable">
    <div class="margin-bottom20 clearFloat">
      <span class="font18 font-weight">
        {{ language("nominationSupplier_GongYingShangLieBiao",'供应商列表') }}</span
      >
      <div class="floatright" v-if="!nominationDisabled && !rsDisabled">
        <span v-if="multiEditControl">
          <iButton @click="addShow(true)" v-permission.auto="SOURCING_NOMINATION_SUPPLIER_MULTI_ADDSHOW|供应商列表加入展示按钮">
            {{ language("nominationSupplier_JiaRuZhanShi",'加入展示') }}
          </iButton>
          <iButton @click="addShow(false)" v-permission.auto="SOURCING_NOMINATION_SUPPLIER_MULTI_REMOVEHIDDEN|供应商列表取消展示按钮">
            {{ language("nominationSupplier_QuXiaoZhanShi",'取消展示') }}
          </iButton>
          <iButton @click="submit" :loading="submiting" v-permission.auto="SOURCING_NOMINATION_SUPPLIER_MULTI_SAVE|供应商列表保存按钮">
            {{ language("LK_BAOCUN", '保存') }}
          </iButton>
          <iButton @click="multiEditControl = false" v-permission.auto="SOURCING_NOMINATION_SUPPLIER_MULTI_CANCEL|供应商列表取消按钮">
            {{ language("LK_QUXIAO",'取消') }}
          </iButton>
        </span>
        <span v-else>
          <iButton @click="multiEditControl = true" v-permission.auto="SOURCING_NOMINATION_SUPPLIER_MULTI_EDIT|供应商列表编辑按钮">
            {{ language("LK_BIANJI",'编辑') }}
          </iButton>
        </span>
        
      </div>
    </div>
    <tablelist
      index
      :tableData="tableListData"
      :tableTitle="multiSupplierTitle"
      :tableLoading="tableLoading"
      :treeProps="{'tree-props': {children: 'children'}, 'row-key': 'id'}"
      :lang="true"
      @handleSelectionChange="handleMutiSelectionChange"
      @openPage="openPage"
      :activeItems="'partNum'"
      v-permission.auto="SOURCING_NOMINATION_SUPPLIER_MULTI_TABLE|供应商列表表格"
    >
    <template #_index="scope">
      {{((page.currPage - 1)*page.pageSize + scope.$index + 1 )}}
    </template>
    <template #descr="scope">
      <el-tooltip effect="light" :content="genHeaderTitle(scope)">
          <span>{{ genHeaderTitle(scope) }}</span>
      </el-tooltip>
    </template>
    <!-- 厂商 -->
    <template #factoryNameCh="scope">
      <div>
        <span class="factoryDesc">{{scope.row.factoryNameCh }}</span>
        <el-tooltip effect="light" :content="`${language('LK_FRMPINGJI','FRM评级')}：${scope.row.frmRate}`" v-if="scope.row.isFRMRate === 1">
          <span>
            <icon symbol name="iconzhongyaoxinxitishi" />
          </span>
        </el-tooltip>
      </div>
    </template>
    <!-- 是否展示 -->
    <template #isPresent="scope">
      <span>{{scope.row.isPresent === 1 ? language('LK_YES','是') : language('LK_NO','否') }}</span>
    </template>
    <template #sapCode="scope">
      <span>{{ scope.row.sapCode || scope.row.svwCode || scope.row.svwTempCode }}</span>
    </template>
    </tablelist>
    <iPagination
      v-update
      @size-change="handleSizeChange($event, getFetchDataList)"
      @current-change="handleCurrentChange($event, getFetchDataList)"
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
import { 
  multiSupplierTitle, 
  // mokeMultiSupplierData
} from './data'
import tablelist from "./tableList";
import {
  iCard,
  iButton,
  iPagination,
  icon,
  iMessage
} from "rise";
import {
  getSupplierList,
  addSuppliersInfo
} from '@/api/designate/supplier' 
import { pageMixins } from '@/utils/pageMixins'
import filters from "@/utils/filters"
import _ from 'lodash'

export default {
  mixins: [ filters, pageMixins ],
  components: {
    iCard,
    iButton,
    iPagination,
    tablelist,
    icon
  },
  data() {
    return {
      nomiAppId: this.$store.getters.nomiAppId,
      tableListData: [],
      // 备份tableListData,重置备用
      oriTableListData: [],
      tableLoading: false,
      multiSupplierTitle,
      multiEditState: false,
      multiEditControl: false,
      selectMultiData: [],
      submiting: false
    }
  },
  computed: {
    // eslint-disable-next-line no-undef
    ...Vuex.mapState({
      nominationDisabled: state => state.nomination.nominationDisabled,
      rsDisabled: state => state.nomination.rsDisabled,
    }),
  },
  mounted() {
    this.getFetchDataList()
  },
  methods: {
    // 生成随机id
    randomid() {
      return Math.floor(Math.random() * 10000000)
    },
    // 加入展示
    addShow(type = true) {
      if (!this.selectMultiData.length) {
        iMessage.error(this.language('nominationSuggestion_QingXuanZeZhiShaoYiTiaoShuJu','请选择至少一条数据'))
        return
      }
      this.selectMultiData.map(o => {
        this.$set(o, 'isPresent', type ? 1 : 0)
      })
    },
    async submit() {
      const confirmInfo = await this.$confirm(this.language('submitSure','您确定要执行提交操作吗？'))
      if (confirmInfo !== 'confirm') return
      this.submiting = true
      addSuppliersInfo({
        items: this.tableListData,
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
    // 取消
    async cancel() {
      const confirmInfo = await this.$confirm(this.language('cancelSure','您确定要取消吗？'))
      if (confirmInfo !== 'confirm') return
      this.tableListData = _.cloneDeep(this.oriTableListData)
    },
    // [RFQ号+零件号+零件名称+车型项目]
    genHeaderTitle(scope) {
      return `${scope.row.rfqId || ''} ${scope.row.partNum || ''} ${scope.row.partNameCh || ''} ${scope.row.carModelProject || ''}`
    },
    getFetchDataList() {
      this.tableLoading = true
      getSupplierList({
        nominateId: this.nomiAppId,
        current: this.page.currPage,
        size: this.page.pageSize
      }).then(res => {
        this.tableLoading = false
        if (res.code === '200') {
          const tableListData = res.data || []
          tableListData.map(o => {
            o.sid = this.randomid()
            o.nestedList && o.nestedList.length && (o.nestedList.map(item => {
              item.sid = this.randomid()
              return item
            }))
            o.children = o.nestedList || []
            return o
          })
          this.tableListData = tableListData
          this.oriTableListData = _.cloneDeep(this.tableListData)
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
    handleMutiSelectionChange(data) {
      this.multiEditControl = Boolean( data && data.length)
      this.selectMultiData = data
    },
  }
}
</script>
<style lang="scss" scoped>
.factoryDesc {
  display: inline-block;
  padding-right: 3px;
}
</style>