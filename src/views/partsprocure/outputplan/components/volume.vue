<template>
  <iCard class="volume" tabCard :title="language('LK_LINGJIANMEICHEYONGLIANG','零件每车用量')" collapse>
    <template v-slot:header-control>
      <iButton @click="download" v-permission="PARTSPROCURE_OUTPUTPLAN_OUTPUTRECORD_EXPORT">{{language('LK_DAOCHU','导出')}}</iButton>
    </template>
    <div class="body">
      <tablelist
        class="table"
        index
        :tableData="tableListData"
        :tableTitle="tableTitle"
        :tableLoading="loading"
        @handleSelectionChange="handleSelectionChange"
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
import { iCard, iButton, iPagination, iMessage } from "@/components";
import tablelist from "@/views/partsign/home/components/tableList";
import { pageMixins } from "@/utils/pageMixins";
import { volumeTableTitle as tableTitle } from "./data";
import {
  getPerCarDosageVersion,
  getPerCarDosageInfo,
} from "@/api/partsign/editordetail";
import { excelExport } from '@/utils/filedowLoad'

export default {
  components: { iCard, iButton, tablelist, iPagination },
  mixins: [pageMixins],
  props: {
    params: {
      type: Object,
      require: true
    }
  },
  data() {
    return {
      loading: false,
      tableTitle,
      tableListData: [],
      multipleSelection: [],
      carTypeConfigId: '',
      tpId: ''
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      this.loading = true;

      try {
        if (!this.version || !this.carTypeConfigId) {
          const versionRes = await getPerCarDosageVersion({
            currPage: 1,
            pageSize: 10,
            status: 1,
            purchasingRequirementId: this.$route.query.purchasingRequirementId || '',
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
          this.page.totalCount = infoRes.data.totalCount;
        }
      } catch (e) {
        console.error(e);
      } finally {
        this.loading = false;
      }
    },
    handleSelectionChange(list) {
      this.multipleSelection = list
    },
    download() {
      if (!this.multipleSelection.length) return iMessage.warn(this.language('LK_QINGXUANZHEXUYAODAOCHUDEMEINIANYONGCHELIANG','请选择需要导出的每车用量'))
      excelExport(this.multipleSelection, this.tableTitle)
    }
  },
};
</script>

<style lang="scss" scoped>
</style>