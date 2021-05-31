<template>
  <iCard class="multiSupplier supplierTable">
    <div class="margin-bottom20 clearFloat">
      <span class="font18 font-weight">
        {{ $t("nominationSupplier.GongYingShangLieBiao") }}</span
      >
      <div class="floatright">
        <span v-if="multiEditControl">
          <iButton>
            {{ $t("nominationSupplier.JiaRuZhanShi") }}
          </iButton>
          <iButton>
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
      <el-tooltip effect="light" :content="scope.row.descr">
          <span>{{ scope.row.descr }}</span>
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
    <template #show="scope">
      <span>{{scope.row.show === 'Y' ? '是' : '否' }}</span>
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
  icon
} from "rise";

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
      tableListData: mokeMultiSupplierData,
      tableLoading: false,
      multiSupplierTitle,
      multiEditState: false,
      multiEditControl: false,
      selectMultiData: [],
      page: {}
    }
  },
  methods: {
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