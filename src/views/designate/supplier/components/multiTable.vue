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
      :treeProps="{children: 'children', hasChildren: 'hasChildren'}"
      @handleSelectionChange="handleMutiSelectionChange"
      @openPage="openPage"
      :activeItems="'partNum'"
    >
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
  iPagination
} from "rise";

export default {
  components: {
    iCard,
    iButton,
    iPagination,
    tablelist
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
.supplierTable {
  box-shadow: 0 0 1.25rem rgb(27 29 33 / 8%);
  border-radius: 0.375rem;
  background: #fff;
  padding: 20px;
  margin-top: 20px;
}
</style>