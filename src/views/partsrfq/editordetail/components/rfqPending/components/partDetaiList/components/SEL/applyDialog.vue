<!--
 * @Description: 
 * @Author: tyra liu
 * @Date: 2021-11-15 19:58:57
 * @LastEditTime: 2023-02-22 17:00:31
 * @LastEditors: 余继鹏 917955345@qq.com
-->
<template>
  <iDialog :visible.sync="visible" class="toolingTargetPrice">
    <template slot="title">
      <div class="el-dialog__title">
        <span class="font18 font-weight">{{
          language("申请记录", "申请记录")
        }}</span>
      </div>
    </template>
    <tablelist
      :tableData="tableListData"
      :tableTitle="tableTitle"
      :tableLoading="loading"
      :selection="false"
    >
      <template #status="scope">
        <span>{{ getStatus(scope.row.status) }}</span>
      </template>
      <!-- 目标价·分摊 -->
      <template #shareTargetPrice="scope">
        <span>{{ scope.row.shareTargetPrice | thousandsFilter(2)}}</span>
      </template>
      <!-- 目标价·一次性 -->
      <template #targetPrice="scope">
        <span>{{ scope.row.targetPrice | thousandsFilter(2)}}</span>
      </template>
      <!-- 预计A价分摊 -->
      <template #estimateShareAPrice="scope">
        <span>{{ scope.row.estimateShareAPrice | thousandsFilter }}</span>
      </template>
    </tablelist>
    <iPagination
      class="pagination"
      v-update
      @size-change="handleSizeChange($event, getTargetPrice)"
      @current-change="handleCurrentChange($event, getTargetPrice)"
      background
      :current-page="page.currPage"
      :page-sizes="page.pageSizes"
      :page-size="page.pageSize"
      :layout="page.layout"
      :total="page.totalCount"
    />
  </iDialog>
</template>
  
  <script>
import {
  iFormGroup,
  iFormItem,
  iText,
  iPagination,
  iDialog,
  iMessage,
} from "rise";
import tablelist from "@/views/partsign/editordetail/components/tableList";
import { getCfTargetApplyHistory } from "@/api/financialTargetPrice/index";
import { pageMixins } from "@/utils/pageMixins";
import filters from '@/utils/filters'
import { SELApplyTargetPriceTitle as tableTitle } from "./data";
import { applySelTargetPriceRecordList } from "@/api/SELTargetPrice";
export default {
  components: { iFormGroup, iFormItem, iText, iPagination, tablelist, iDialog },
  mixins: [pageMixins, filters],
  props: {
    rfqId: {
      type: String,
    },
    visible: { type: Boolean },
    options:{ type: Object, default: ()=>({})}
  },
  data() {
    return {
      tableLoading: false,
      tableTitle,
      tableListData: [],
    };
  },
  watch: {
    visible(nv) {
      this.$emit("update:visible", nv);
      if (nv) {
        this.getTargetPrice();
      }
    },
  },
  created() {},
  methods: {
    
    getStatus(status) {
      return (
        this.options.sel_target_price_status?.find((item) => item.code == status)
          ?.name || status
      );
    },
    getTargetPrice() {
      const rfqId = this.$route.query.id;
      if (!rfqId) return;
      this.loading = true;
      applySelTargetPriceRecordList({
        rfqIds: [this.$route.query.id],
        current: this.page.currPage,
        size: this.page.pageSize,
      })
        .then((res) => {
          if (res.code == 200) {
            (this.page.totalCount = Number(res.total)),
              (this.tableListData = res.data || []);
          } else {
            iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
          }
          this.loading = false;
        })
        .catch(() => {
          this.loading = false;
        });
    },
  },
};
</script>
  
  <style lang="scss" scoped>
.pagination {
  padding-bottom: 20px;
}
</style>