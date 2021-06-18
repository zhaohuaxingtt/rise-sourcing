<template>
  <iCard class="multiSupplier supplierTable">
    <div class="margin-bottom20 clearFloat">
      <span class="font18 font-weight">
        {{ $t("nominationSupplier.GongYingShangLieBiao") }}</span
      >
      <div class="floatright">
        <span v-if="multiEditControl">
          <iButton @click="addShow(true)">
            {{ $t("nominationSupplier.JiaRuZhanShi") }}
          </iButton>
          <iButton @click="addShow(false)">
            {{ $t("nominationSupplier.QuXiaoZhanShi") }}
          </iButton>
          <iButton @click="submit" :loading="submiting">
            {{ $t("LK_BAOCUN") }}
          </iButton>
          <iButton @click="multiEditControl = false">
            {{ $t("LK_QUXIAO") }}
          </iButton>
        </span>
        <span v-else>
          <iButton @click="multiEditControl = true">
            {{ $t("LK_BIANJI") }}
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
      @handleSelectionChange="handleMutiSelectionChange"
      @openPage="openPage"
      :activeItems="'partNum'"
    >
    <template #descr="scope">
      <el-tooltip effect="light" :content="genHeaderTitle(scope)">
          <span>{{ genHeaderTitle(scope) }}</span>
      </el-tooltip>
    </template>
    <!-- 厂商 -->
    <template #factoryNameCh="scope">
      <div>
        <span class="factoryDesc">{{scope.row.factoryNameCh }}</span>
        <el-tooltip effect="light" :content="`FRM评级：${scope.row.frmRate}`" v-if="scope.row.isFRMRate === 1">
          <span>
            <icon symbol name="iconzhongyaoxinxitishi" />
          </span>
        </el-tooltip>
      </div>
    </template>
    <!-- 是否展示 -->
    <template #isPresent="scope">
      <span>{{scope.row.isPresent === 1 ? '是' : '否' }}</span>
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
        iMessage.error(this.$t('nominationSuggestion.QingXuanZeZhiShaoYiTiaoShuJu'))
        return
      }
      this.selectMultiData.map(o => {
        this.$set(o, 'isPresent', type ? 1 : 0)
      })
    },
    async submit() {
      const confirmInfo = await this.$confirm(this.$t('submitSure'))
      if (confirmInfo !== 'confirm') return
      this.submiting = true
      addSuppliersInfo({
        items: this.tableListData,
        nominateId: this.$store.getters.nomiAppId
      }).then(res => {
        if (res.code === '200') {
          iMessage.success(this.$t('LK_CAOZUOCHENGGONG'))
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
      const confirmInfo = await this.$confirm(this.$t('cancelSure'))
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
        nominateId: this.nomiAppId
      }).then(res => {
        this.tableLoading = false
        if (res.code === '200') {
          const tableListData = res.data || []
          tableListData.map(o => {
            o.id = this.randomid()
            o.nestedList && o.nestedList.length && (o.nestedList.map(item => {
              item.id = this.randomid()
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