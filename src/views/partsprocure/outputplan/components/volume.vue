<template>
  <iCard class="volume" tabCard title="零件每车用量" collapse>
    <template v-slot:header-control>
      <iButton @click="download" v-permission="PARTSPROCURE_OUTPUTPLAN_OUTPUTRECORD_EXPORT">导出</iButton>
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
        :current-page="page.size"
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :layout="page.layout"
        :total="page.totalCount"
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
        if (!this.versionNum || !this.carTypeConfigId) {
          const versionRes = await getPerCarDosageVersion({
            currPage: 1,
            pageSize: 10,
            status: 1,
            purchasingRequirementId: this.params.purchasingRequirementId,
          });

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
    handleSelectionChange(list) {
      this.multipleSelection = list
    },
    download() {
      if (!this.multipleSelection.length) return iMessage.warn('请选择需要导出的每车用量')
      excelExport(this.multipleSelection, this.tableTitle)
    }
  },
};
</script>

<style lang="scss" scoped>
.volume {
}
</style>