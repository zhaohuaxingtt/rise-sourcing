<template>
  <iCard
    class="volume"
    tabCard
    :title="`${$t('LK_LINGJIANMEICHEYONGLIANG')}（${ $t('LK_DANGQIANBANBEN') } ：${versionNum}）`"
  >
    <div class="body">
      <tableList
        class="table"
        index
        :tableData="tableListData"
        :tableTitle="tableTitle"
        :tableLoading="loading"
      />
      <iPagination
        class="pagination margin-top30"
        @size-change="handleSizeChange($event, getData)"
        @current-change="handleCurrentChange($event, getData)"
        background
        :current-page="page.currPage"
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :layout="page.layout"
        :total="page.totalCount"
		v-update
      />
    </div>
  </iCard>
</template>

<script>
import { iCard, iPagination } from "@/components";
import tableList from "@/views/partsign/editordetail/components/tableList";
import { pageMixins } from "@/utils/pageMixins";
import { volumeTableTitle as tableTitle } from "./data";
import {
  getPerCarDosageVersion,
  getPerCarDosageInfo,
} from "@/api/partsign/editordetail";

export default {
  components: { iCard, tableList, iPagination },
  mixins: [pageMixins],
  data() {
    return {
      loading: false,
      tableTitle,
      tableListData: [],
      versionNum: "",
      carTypeConfigId: "",
      tpId: ""
    };
  },
  props: {
    params: {
      type: Object,
      require: true,
    },
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      this.loading = true;

      try {
        if (!this.versionNum || !this.carTypeConfigId) {
          const versionRes = await getPerCarDosageVersion({
            currPage: 1,
            pageSize: 10,
            status: 1,
            purchasingRequirementId: this.params.purchasingRequirementId,
          });
          console.log('versionRes', versionRes)

          this.versionNum = "V1";
          if (
            versionRes.data &&
            Array.isArray(versionRes.data.tpRecordList) &&
            versionRes.data.tpRecordList[0]
          ) {
            this.carTypeConfigId = versionRes.data.tpRecordList[0].carTypeConfigId;
            this.versionNum = versionRes.data.tpRecordList[0].versionNum || "V1";
            this.tpId = versionRes.data.tpRecordList[0].tpId
          }
        }

        const infoRes = await getPerCarDosageInfo({
          carTypeConfigId: this.carTypeConfigId,
          versionNum: this.versionNum,
          currPage: this.page.currPage,
          pageSize: this.page.pageSize,
          status: 1,
          tpId: this.tpId,
        });

        if (infoRes.data) {
          this.tableListData = infoRes.data.tpRecordList;
          this.page.totalCount = infoRes.data.totalCount;
        }
      } catch (e) {
        console.error(e);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.volume {
}
</style>