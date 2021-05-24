<template>
  <div class="supplier">
    <div class="multiSupplier supplierTable">
      <iCard>
        <div class="margin-bottom20 clearFloat">
          <span class="font18 font-weight">
            {{ $t("nominationSupplier.GongYingShangLieBiao") }}</span
          >
          <div class="floatright">
            <iButton
              @click="openPage"
              v-permission="PARTSPROCURE_TRANSFER"
            >
              {{ $t("nominationSupplier.JiaRuZhanShi") }}
            </iButton>
            <iButton
              @click="openPage"
              v-permission="PARTSPROCURE_STARTINQUIRY"
            >
              {{ $t("nominationSupplier.QuXiaoZhanShi") }}
            </iButton>
          </div>
        </div>
        <tablelist
          :tableData="tableListData"
          :tableTitle="multiSupplierTitle"
          :tableLoading="tableLoading"
          :treeProps="{children: 'children', hasChildren: 'hasChildren'}"
          @handleSelectionChange="handleSelectionChange"
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
    </div>
    <div class="dingleSupplier supplierTable">
      <iCard>
        <div class="margin-bottom20 clearFloat">
          <span class="font18 font-weight">
            {{ $t("nominationSupplier.DanYiGongYingShang") }}</span
          >
          <div class="floatright">
            <iButton
              @click="openPage"
              v-permission="PARTSPROCURE_TRANSFER"
            >
              {{ $t("LK_XINZENG") }}
            </iButton>
            <iButton
              @click="openPage"
              :loading="startLoding"
              v-permission="PARTSPROCURE_STARTINQUIRY"
            >
              {{ $t("LK_BAOCUN") }}
            </iButton>
            <iButton
              @click="openPage"
              :loading="startLoding"
              v-permission="PARTSPROCURE_STARTINQUIRY"
            >
              {{ $t("LK_QUXIAO") }}
            </iButton>
          </div>
        </div>
        <tablelist
          :tableData="singleListData"
          :tableTitle="singleSupplierTitle"
          :tableLoading="tableLoading"
          :treeProps="{children: 'children', hasChildren: 'hasChildren'}"
          @handleSelectionChange="handleSelectionChange"
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
    </div>
  </div>
</template>
<script>
import { 
  multiSupplierTitle, 
  mokeMultiSupplierData,
  singleSupplierTitle,
  mokeSingleSupplierData
} from './components/data'
import tablelist from "./components/tableList";
import {
  iButton,
  iPagination
} from "rise";

export default {
  components: {
    iButton,
    iPagination,
    tablelist
  },
  data() {
    return {
      tableListData: mokeMultiSupplierData,
      tableLoading: false,
      multiSupplierTitle,
      selectTableData: [],
      page: {},
      // 单一供应商
      singleSupplierTitle,
      singleListData: mokeSingleSupplierData
    }
  },
  methods: {
    handleSelectionChange() {

    },
    openPage() {

    },
    handleSizeChange() {

    },
    handleCurrentChange() {

    }
  }
}
</script>
<style lang="scss" scoped>
.supplier {
  .supplierTable {
    box-shadow: 0 0 1.25rem rgb(27 29 33 / 8%);
    border-radius: 0.375rem;
    background: #fff;
    padding: 20px;
    margin-top: 20px;
  }
}
</style>