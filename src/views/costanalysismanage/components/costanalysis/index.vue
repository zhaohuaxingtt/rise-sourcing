<!--
 * @Author: your name
 * @Date: 2021-05-28 16:01:25
 * @LastEditTime: 2021-06-03 17:58:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\costanalysismanage\components\costanalysis\index.vue
-->
<template>
  <iPage class="analysis">
    <div class="header clearFloat">
      <div class="title">{{ $t("costanalysismanage.ChengBenFenXi") }}</div>
      <div class="control">
        <iButton @click="back">{{ $t("costanalysismanage.FanHui") }}</iButton>
        <uploadButton uploadClass="uploadButton" :params="uploadParams" :beforeUpload="beforeUpload" @success="uploadSuccess" @error="uploadError">
          <iButton :loading="uploadLoading">{{ $t("costanalysismanage.ShangChuan") }}</iButton>
        </uploadButton>
        <iButton @click="handleDownload">{{ $t("costanalysismanage.XiaZai") }}</iButton>
        <iButton>{{ $t("costanalysismanage.ShanChu") }}</iButton>
        <logButton class="margin-left20" />
        <span class="margin-left20">
          <icon symbol name="icondatabaseweixuanzhong" class="font24"></icon>
        </span>
      </div>
    </div>
    <iCard class="margin-top30 card">
      <div class="body">
        <tableList
          class="table"
          index
          :tableData="tableListData"
          :tableTitle="tableTitle"
          :tableLoading="loading"
          height="calc(100% - 54px)"
          @handleSelectionChange="handleSelectionChange"
        >
          <template #fileName="scope">
            <span class="link" @click="download(scope.row)">{{ scope.row.fileName }}</span>
          </template>
          <template #date="scope">
            <span>{{ scope.row.uploadDate | dateFilter("YYYY-MM-DD") }}</span>
          </template>
        </tableList>
        <iPagination 
          v-update
          class="margin-top30"
          @size-change="handleSizeChange($event, getList)"
          @current-change="handleCurrentChange($event, getList)"
          background
          :current-page="page.currPage"
          :page-sizes="page.pageSizes"
          :page-size="page.pageSize"
          :layout="page.layout"
          :total="page.totalCount" />
      </div>
    </iCard>
  </iPage>
</template>

<script>
import { iPage, iButton, icon, iCard, iPagination, iMessage } from "rise"
import logButton from "@/views/partsign/editordetail/components/logButton"
import uploadButton from "../uploadButton"
import tableList from "@/views/partsign/editordetail/components/tableList"
import { tableTitle, uploadFiles } from "./components/data"
import filters from "@/utils/filters"
import { pageMixins } from "@/utils/pageMixins"
import { getKmRfqList } from "@/api/costanalysismanage/costanalysis"

export default {
  components: {
    iPage,
    iButton,
    icon,
    iCard,
    iPagination,
    logButton,
    uploadButton,
    tableList
  },
  mixins: [ filters, pageMixins ],
  data() {
    return {
      loading: false,
      tableTitle,
      tableListData: [],
      multipleSelection: [],
      uploadParams: { applicationName: "rise" },
      uploadLoading: false,
      timer: 0,
      fileList: []
    }
  },
  created() {
    this.rfqId = this.$route.query.rfqId
    this.getKmRfqList()
  },
  methods: {
    getKmRfqList() {
      if (!this.rfqId) return

      this.loading = true
      getKmRfqList({
        rfqId: this.rfqId,
        currPage: this.page.currPage,
        pageSize: this.page.pageSize
      })
      .then(res => {
        if (res.code == 200) {
          this.tableListData = Array.isArray(res.data.records) ? res.data.records : []
          this.totalCount = res.data.total || 0
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }

        this.loading = false
      })
      .catch(() => this.loading = false)
    },
    handleSelectionChange(list) {
      this.multipleSelection = list
    },
    beforeUpload() {
      this.uploadLoading = true
    },
    uploadFiles() {
      uploadFiles({
//         fileCode	string
// 文件编码（在哪个文件服务系统内，即为哪个附件服务系统内的文件编码；例如：当file_service_type为0，表示在RiSE文件服务中的编码）

// fileName	string
// 文件名称

// filePath	string
// 文件路径（可直接用于下载，可能是RiSE文件服务提供的URL，也可能是外部系统/互联网 文件的URL）

// fileSize	number
// 大小（MB）

// fileType	integer($int32)
// 附件类型 0：零件CBD(L1级)报价记录，1：零件CBD(L2级)报价记录，2：零件CBD(L3级)报价记录，3：模具CBD报价记录，4: CBD附件，5: BNK零件采购项目附件，6: 物流相关BNK附件,7:人工成本数据维护 ;101: 定点图纸， 102：定点附件，103：纸质RS单, 104：电子RS单， 105：SEL分摊单，106：配件上传的单据， 107：附件上传的单据，108: 附件的附件,109: 报告清单,110:询价图纸,111:询价附件

// hostId	string
// 宿主表的id；含义依赖于file_type。例如：file_type在[1,6],host_id为quotation库中tt_quotation表的id；file_type在[101,105]时，host_id为sourcing库中tt_nomi_application中的id;…

// source	integer($int32)
// 文件来源 0：人工上传 1:其他系统导入（具体系统可由source的枚举定义扩充，在字典中查询）
      })
      .then(res => {
        if (res.code == 200) {

        } else {

        }

        this.uploadLoading = false
      })
      .catch(() => this.uploadLoading = false)
    },
    uploadSuccess(res, file) {
      this.uploadLoading = false
      if (res.code != 200) {
        iMessage.error(`${ this.$i18n.locale === "zh" ? res.desZh : res.desEn }`)
      } else {
        this.fileList = []
        clearTimeout(this.timer)
        iMessage.success(`${ file.name } ${ this.$t("LK_SHANGCHUANCHENGGONG") }`)
        // (file.size / 1024 / 1024).toFixed(3)
        this.fileList.push({ tpPartAttachmentName: res.data[0].fileName, tpPartAttachmentPath: res.data[0].filePath, size: file.size })
        this.timer = setTimeout(() => {
          // this.uploadFiles()
          clearTimeout(this.timer)
        }, 700)
      }
    },
    uploadError(err, file) {
      this.uploadLoading = false
      iMessage.error(`${ file.name } ${ this.$t('LK_SHANGCHUANSHIBAI') }`)
    },
    // 返回
    back() {
      this.$router.go(-1)
    },
    // 多选下载
    handleDownload() {
      if (this.multipleSelection.length < 1) return iMessage.warn(this.$t("costanalysismanage.QingXuanZeXuYaoXiaZaiDeWenJian"))
    

    },
    // 单个下载
    download(row) {

    },
  }
}
</script>

<style lang="scss" scoped>
.analysis {
  .header {
    position: relative;

    .title {
      font-size: 20px;
      font-weight: bold;
      color: #000;
      height: 28px;
      line-height: 28px;
    }

    .control {
      position: absolute;
      top: 50%;
      right: 0;
      transform: translate(0, -50%);
      display: flex;
      align-items: center;
      height: 30px;
    }
  }

  .card {
    .body {
      height: calc(100vh - 240px);
      min-height: 480px;
    }
  }

  .uploadButton {
    margin-left: 10px;
    margin-right: 10px;
  }
}
</style>