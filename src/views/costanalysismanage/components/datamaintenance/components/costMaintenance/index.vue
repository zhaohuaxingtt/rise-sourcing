
<!--
 * @Author: your name
 * @Date: 2021-05-27 12:33:07
 * @LastEditTime: 2022-03-11 11:59:08
 * @LastEditors: Please set LastEditors
 * @Description: 人工成本维护
 * @FilePath: \front-sourcing\src\views\costanalysismanage\components\datamaintenance\components\costMaintenance\index.vue
-->
<template>
  <div class="datamaintenance">
    <iCard
      class="card margin-top10"
      :title="language('RENGONGCHENGBENSHUJUWEIHU', '人工成本数据维护')"
    >
      <template v-slot:header-control>
        <el-upload
          class="uploadButton"
          ref="upload"
          name="multipartFile"
          :http-request="upload"
          accept=".pdf,.xlsx,.docx"
          :show-file-list="false"
          :disabled="uploadLoading"
          v-permission.auto="
            COSTANALYSISMANAGE_DATAMAINTENANCE_COSTMAINTENANCE_BUTTON_UPLOAD |
              上传
          "
        >
          <iButton :loading="uploadLoading">{{
            language("SHANGCHUAN", "上传")
          }}</iButton>
        </el-upload>
        <iButton
          @click="handleExport"
          v-permission.auto="
            COSTANALYSISMANAGE_DATAMAINTENANCE_COSTMAINTENANCE_BUTTON_EXPORTTEMPLATE |
              导出模板
          "
          >{{ language("DAOCHUMUBAN", "导出模板") }}</iButton
        >
        <iButton
          class="marginRight10"
          @click="openDate"
          :loading="uploadLoading"
          >{{ language("SHANGCHUAN", "上传") }}</iButton
        >
        <iButton
          @click="handleDownload"
          v-permission.auto="
            COSTANALYSISMANAGE_DATAMAINTENANCE_COSTMAINTENANCE_BUTTON_DOWNLOAD |
              下载文件
          "
          >{{ language("XIAZAIWENJIAN", "下载文件") }}</iButton
        >
        <iButton
          :loading="deleteLoading"
          @click="handleDelete"
          v-permission.auto="
            COSTANALYSISMANAGE_DATAMAINTENANCE_COSTMAINTENANCE_BUTTON_DELETE |
              删除
          "
          >{{ language("SHANCHU", "删除") }}</iButton
        >
      </template>
      <div class="body">
        <tableList
          class="table"
          index
          :tableData="tableListData"
          :tableTitle="tableTitle"
          :tableLoading="loading"
          :lang="true"
          height="calc(100% - 54px)"
          @handleSelectionChange="handleSelectionChange"
        >
          <template #fileName="scope">
            <span class="link-underline" @click="download(scope.row)">{{
              scope.row.fileName
            }}</span>
          </template>
          <template #createDate="scope">
            <span>{{ scope.row.createDate | dateFilter("YYYY-MM-DD") }}</span>
          </template>
        </tableList>
        <iPagination
          v-update
          class="margin-top30"
          @size-change="handleSizeChange($event, getKmFileHistory)"
          @current-change="handleCurrentChange($event, getKmFileHistory)"
          background
          :current-page="page.currPage"
          :page-sizes="page.pageSizes"
          :page-size="page.pageSize"
          :layout="page.layout"
          :total="page.totalCount"
        />
      </div>
    </iCard>
    <!-- 选择时间 -->
    <dateSelect v-model="dateValue" @sure="sure"></dateSelect>
  </div>
</template>

<script>
import {icon, iCard, iButton, iPagination, iMessage, iSearch} from "rise";
import logButton from "@/components/logButton";
import tableList from "@/views/partsign/editordetail/components/tableList";
// import uploadButton from "../../../uploadButton"
import { tableTitle } from "./data";
import filters from "@/utils/filters";
import { pageMixins } from "@/utils/pageMixins";
// import { excelExport } from "@/utils/filedowLoad"
import {
  dataMaintain,
  delMaintain,
  addMaintain,
  exportTemplate,
} from "@/api/costanalysismanage/costanalysis/costMaintenance";
import { downloadUdFile } from "@/api/file";
import dateSelect from "./dateSelect";

export default {
  components: {
    iSearch,
    // icon,
    iCard,
    iButton,
    iPagination,
    // logButton,
    tableList,
    //  uploadButton,
    dateSelect,
  },
  mixins: [filters, pageMixins],
  computed: {
    //eslint-disable-next-line no-undef
    ...Vuex.mapState({
      userInfo: (state) => state.permission.userInfo,
    }),
  },
  data() {
    return {
      loading: false,
      tableTitle,
      tableListData: [],
      multipleSelection: [],
      uploadParams: { applicationName: "rise" },
      uploadLoading: false,
      deleteLoading: false,
      timer: 0,
      fileList: [],
      dateValue: false,
      datePicker: "",
    };
  },
  created() {
    this.getKmFileHistory();
  },
  methods: {
    getKmFileHistory() {
      this.loading = true;
      dataMaintain({
        pageNo: this.page.currPage,
        pageSize: this.page.pageSize,
      })
        .then((res) => {
          if (res.code == 200) {
            this.tableListData = Array.isArray(res.data) ? res.data : [];
            this.page.totalCount = res.total || 0;
            this.multipleSelection = [];
            this.page.currPage = res.pageNum;
            this.page.pageSize = res.pageSize;
            this.page.totalCount = res.total;
          } else {
            iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
          }

          this.loading = false;
        })
        .catch(() => (this.loading = false));
    },
    handleSelectionChange(list) {
      this.multipleSelection = list;
    },
    // 导出
    handleExport() {
      exportTemplate("1497100847758282753").then((res) => {
        // window.open(res.data)
      });
    },
    openDate() {
      this.dateValue = true;
    },
    sure(date) {
      if (date) {
        this.datePicker = date;
        this.$refs.upload.$children[0].handleClick();
      } else {
        iMessage.warn(this.language("QINGXUANZHESHIJIAN", "请选择时间"));
      }
    },
    //上传
    async upload(content) {
      this.dateValue = false;
      this.uploadLoading = true;
      const formData = new FormData();
      formData.append("file", content.file);
      formData.append("year", this.datePicker);
      const res = await addMaintain(formData);
      this.uploadLoading = false;
      if (res?.code == 200) {
        iMessage.success(this.language("SHANGCHUANCHENGGONG", "上传成功"));
        this.getKmFileHistory();
      } else {
        iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
      }
    },
    uploadSuccess(res, file) {
      if (res.code != 200) {
        iMessage.error(`${this.$i18n.locale === "zh" ? res.desZh : res.desEn}`);
      } else {
        clearTimeout(this.timer);
        iMessage.success(
          `${file.name} ${this.language("SHANGCHUANCHENGGONG", "上传成功")}`
        );
        this.fileList.push({
          id: res.data[0].id,
          fileName: res.data[0].name,
          filePath: res.data[0].path,
          size: file.size,
        });
        this.timer = setTimeout(() => {
          this.uploadFiles();
          clearTimeout(this.timer);
        }, 700);
      }
    },
    uploadError(err, file) {
      this.uploadLoading = false;
      iMessage.error(
        `${file.name} ${this.language("SHANGCHUANSHIBAI", "上传失败")}`
      );
    },
    // 多选下载
    handleDownload() {
      if (this.multipleSelection.length < 1)
        return iMessage.warn(
          this.language(
            "QINGXUANZEXUYAOXIAZAIDEWENJIAN",
            "请选择需要下载的文件"
          )
        );
      downloadUdFile(this.multipleSelection.map((item) => item.url));
      // downloadUdFile(this.multipleSelection.map(item => item.uploadId))
    },
    // 单个下载
    download(row) {
      downloadUdFile(row.url);
      // downloadUdFile(row.uploadId)
    },
    // 删除
    handleDelete() {
      if (this.multipleSelection.length < 1)
        return iMessage.warn(
          this.language(
            "QINGXUANZEXUYAOSHANCHUDEWENJIAN",
            "请选择需要删除的文件"
          )
        );
      this.deleteLoading = true;
      delMaintain({
        ids: this.multipleSelection.map((item) => item.id),
      })
        .then((res) => {
          if (res.code == 200) {
            iMessage.success(
              this.$i18n.locale === "zh" ? res.desZh : res.desEn
            );
            this.getKmFileHistory();
          } else {
            iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
          }

          this.deleteLoading = false;
        })
        .catch(() => (this.deleteLoading = false));
    },
  },
};
</script>

<style lang="scss" scoped>
.datamaintenance {
  .control {
    position: absolute;
    top: 30px;
    right: 40px;
    display: flex;
    align-items: center;
    height: 30px;
  }

  .card {
    .body {
      height: calc(100vh - 310px);
      min-height: 480px;
    }
  }

  .uploadButton {
    display: none;
    margin-left: 10px;
    margin-right: 10px;
  }
}
</style>
