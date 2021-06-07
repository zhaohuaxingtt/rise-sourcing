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
      :treeProps="{'tree-props': {children: 'children', hasChildren: 'hasChildren'}, 'row-key': 'id'}"
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
    <template #fsnrGsnrName="scope">
      <div>
        <span class="factoryDesc">{{scope.row.fsnrGsnrName }}</span>
        <el-tooltip effect="light" :content="'FRM评级：CCC'" v-if="scope.row.frmWarning">
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
  mokeMultiSupplierData
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
  getSupplierList
} from '@/api/designate/supplier' 

export default {
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
      tableLoading: false,
      multiSupplierTitle,
      multiEditState: false,
      multiEditControl: false,
      selectMultiData: [],
      page: {
        currPage: 1,
        pageSize: 10,
        totalCount: 0,
        layout: "total, prev, pager, next, jumper"
      }
    }
  },
  mounted() {
    this.getFetchDataList()
  },
  methods: {
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
    // [RFQ号+零件号+零件名称+车型项目]
    genHeaderTitle(scope) {
      return scope.row.rfqId + scope.row.partNum + scope.row.partNameCh + scope.row.carModelProject
    },
    getFetchDataList() {
      this.tableLoading = true
      getSupplierList({
        nominateId: this.nomiAppId
      }).then(res => {
        this.tableLoading = false
        if (res.code === '200') {
          this.tableListData = res.data || []
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