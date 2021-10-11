<template>
  <iCard
    class="volume"
    tabCard
    :title="`${language('LK_LINGJIANMEICHEYONGLIANG','零件每车用量')}（${ language('LK_DANGQIANBANBEN','当前版本') } ：${version}）`"
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
import { iCard, iPagination, iMessage } from 'rise';
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
      version: "",
      carTypeConfigId: "",
      tpId: ""
    };
  },
  props: {
    params: {
      type: Object,
      require: true,
      default:()=>{}
    },
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      if (this.params.partProjectSource != 1) return // 手工创建的采购项目不调用该接口

      this.loading = true;

      try {
        if ((!this.version || !this.carTypeConfigId) && this.params.purchasingRequirementId) {
          const versionRes = await getPerCarDosageVersion({
            currPage: 1,
            pageSize: 10,
            status: 1,
            purchasingRequirementId: this.params.purchasingRequirementId,
          });

          this.version = "V1";

          if (versionRes.code != 200) {
            return iMessage.error(`${ this.$i18n.locale === 'zh' ? versionRes.desZh : versionRes.desEn }`)
          }

          if (
            versionRes.data &&
            Array.isArray(versionRes.data.tpRecordList) &&
            versionRes.data.tpRecordList[0]
          ) {
            this.carTypeConfigId = versionRes.data.tpRecordList[0].carTypeConfigId;
            this.version = versionRes.data.tpRecordList[0].version || "V1";
            this.tpId = versionRes.data.tpRecordList[0].tpId
          }
        }
        if(!this.carTypeConfigId) return;
        const infoRes = await getPerCarDosageInfo({
          carTypeConfigId: this.carTypeConfigId,
          version: this.version,
          currPage: this.page.currPage,
          pageSize: this.page.pageSize,
          status: 1,
          tpId: this.tpId,
        });

        if (infoRes.code != 200) {
          return iMessage.error(`${ this.$i18n.locale === 'zh' ? infoRes.desZh : infoRes.desEn }`)
        }

        if (infoRes.data) {
          this.tableListData = infoRes.data.tpRecordList;
          this.page.totalCount = infoRes.data.totalCount || 0;
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