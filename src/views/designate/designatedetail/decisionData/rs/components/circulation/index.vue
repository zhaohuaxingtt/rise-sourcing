<!--
 * @Author: Luoshuang
 * @Date: 2021-05-28 15:18:01
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-01-10 19:59:37
 * @Description: 流转RS单
 * @FilePath: \front-sourcing\src\views\designate\designatedetail\decisionData\rs\components\circulation\index.vue
-->

<template>
  <div :class="isPreview && 'isPreview'">
    <iCard v-if="projectType === partProjTypes.PEIJIAN || projectType === partProjTypes.FUJIAN">
      <template #header>
        <div class="title">
          <p>CSC推荐表/CSC Recommendation Sheet会外流转</p>
        </div>
        <div v-if="!isRoutePreview && !isApproval" class="btnWrapper">
          <iButton v-if="!isRoutePreview && !isApproval && !editStatus" @click="editStatus = true">{{ language("BIANJI", "编辑") }}</iButton>
          <iButton v-if="editStatus" :loading="saveLoading" @click="handleSave">{{ language("BAOCUN", "保存") }}</iButton>
          <iButton v-if="editStatus" :loading="saveLoading" @click="editStatus = false">{{ language("TUICHUBIANJI", "退出编辑") }}</iButton>
          <iButton @click="handleExportPdf">{{ language("DAOCHURSDAN", "导出RS单") }}</iButton>
        </div>
      </template>
      <iFormGroup row="4"
                  class="csc">
        <div class="col">
          <iFormItem v-for="(item,index) in titleData"
                     :key="'titleData'+index"
                     :label="item.label+':'">
            <iText v-if="item.props === 'currency'">
              {{ basicData.currencyMap && basicData.currencyMap[basicData.currency] ? basicData.currencyMap[basicData.currency].name : basicData.currency }}
            </iText>
            <iText v-else-if="item.props === 'exchangeRate'">
              <span class="exchangeRageCurrency"
                    v-for="item in exchangeRageCurrency"
                    :key="item">
                1{{basicData.currencyMap && basicData.currencyMap[item] ? basicData.currencyMap[item].name : item}}={{basicData.currencyRateMap[item]}}{{basicData.currencyMap.RMB ? basicData.currencyMap.RMB.name : 'RMB'}}
              </span>
            </iText>
            <iText v-else-if="item.props === 'partProjectType'">
              {{basicData[item.props] === partProjTypes.PEIJIAN ? '配件' : '附件'}}
            </iText>
            <iText v-else>{{basicData[item.props]}}</iText>
          </iFormItem>
        </div>
      </iFormGroup>
    </iCard>
    <iCard :class="!isPreview && 'margin-top20'">
      <template #header>
        <div class="title">
          <p>{{ `流转定点推荐 - ${ cardTitle }` }}</p>
        </div>
        <div v-if="!(projectType === partProjTypes.PEIJIAN || projectType === partProjTypes.FUJIAN)"
             class="btnWrapper">
          <iButton v-if="!isRoutePreview && !isApproval && !editStatus" @click="editStatus = true">{{ language("BIANJI", "编辑") }}</iButton>
          <iButton v-if="editStatus" :loading="saveLoading" @click="handleSave">{{ language("BAOCUN", "保存") }}</iButton>
          <iButton v-if="editStatus" :loading="saveLoading" @click="editStatus = false">{{ language("TUICHUBIANJI", "退出编辑") }}</iButton>
          <iButton v-if="!isRoutePreview && !isApproval" @click="handleExportPdf">{{ language("DAOCHURSDAN", "导出RS单") }}</iButton>
        </div>
      </template>
      <tableList
        :tableLoading="tableLoading"
        :selection="false"
        :tableTitle="tableTitle"
        :tableData="tableData"
        class="rsTable"
        :maxHeight="600"
        :tableRowClassName="tableRowClassName">
        <template #oldAPrice="scope">
          <span>{{ scope.row.oldAPrice | toThousands(true) }}</span>
        </template>
        <template #cfTargetAPrice="scope">
          <span>{{ scope.row.cfTargetAPrice | toThousands(true) }}</span>
        </template>
        <template #cfTargetBPrice="scope">
          <span>{{ scope.row.cfTargetBPrice | toThousands(true) }}</span>
        </template>
        <template #rw="scope">
          <span>{{ scope.row.rw | toThousands(true) }}</span>
        </template>
        <template #aprice="scope">
          <span>{{ scope.row.aprice | toThousands(true) }}</span>
        </template>
        <template #bprice="scope">
          <span>{{ scope.row.bprice | toThousands(true) }}</span>
        </template>
        <template #packPrice="scope">
          <span>{{ scope.row.packPrice | toThousands(true) }}</span>
        </template>
        <template #transportPrice="scope">
          <span>{{ scope.row.transportPrice | toThousands(true) }}</span>
        </template>
        <template #operatePrice="scope">
          <span>{{ scope.row.operatePrice | toThousands(true) }}</span>
        </template>
        <template #investFee="scope">
          <span>{{ scope.row.investFee | toThousands(true) }}</span>
        </template>
        <template #turnover="scope">
          <span>{{ scope.row.turnover | toThousands(true) }}</span>
        </template>


        <!-- 年降 -->
        <template #ltc="scope">
          <span>{{resetLtcData(scope.row.ltcs,'ltc')}}</span>
        </template>

        <!-- 年降开始时间 -->
        <template #beginYearReduce="scope">
          <span>{{resetLtcData(scope.row.ltcs,'beginYearReduce')}}</span>
        </template>

        <template #sapCode="scope">
          <span>{{ scope.row.sapCode || scope.row.svwCode || scope.row.svwTempCode }}</span>
        </template>

        <template #aprice="scope">
          <div v-if="scope.row.status === 'SKDLC'">
            <p>{{ scope.row.skdAPrice | toThousands }}</p>
            <p>{{ scope.row.aprice | toThousands }}</p>
          </div>
          <span v-else-if="scope.row.status === 'SKD'">{{ scope.row.skdAPrice | toThousands }}</span>
          <span v-else>{{ scope.row.aprice | toThousands }}</span>
        </template>

        <template #bprice="scope">
          <div v-if="scope.row.status === 'SKDLC'">
            <p>{{ scope.row.skdBPrice | toThousands }}</p>
            <p>{{ scope.row.bprice | toThousands }}</p>
          </div>
          <span v-else-if="scope.row.status === 'SKD'">{{ scope.row.skdBPrice | toThousands }}</span>
          <span v-else>{{ scope.row.bprice | toThousands }}</span>
        </template>

        <template #investFee="scope">
          <div v-if="scope.row.status === 'SKDLC'">
            <p>{{ scope.row.skdInvestFee | toThousands }}</p>
            <p>{{ scope.row.investFee | toThousands }}</p>
          </div>
          <span v-else-if="scope.row.status === 'SKD'">
            <p>{{ scope.row.skdInvestFee | toThousands }}</p>
          </span>
          <span v-else>
            <p>{{ scope.row.investFee | toThousands }}</p>
          </span>
        </template>

        <template #remarks="scope">
          <div>
            <iInput v-if="editStatus" v-model="scope.row.remarks"></iInput>
            <span v-else>{{ scope.row.remarks }}</span>
          </div>
        </template>
      </tableList>
    </iCard>
    <iCard :title="language('BEIZHU','备注')"
           :class="!isPreview && 'margin-top20'">
      <template slot="header-control" v-if="!isPreview">
        <iButton v-if="!isRoutePreview && !isApproval && !isEdit" @click="handleEdit">{{language('BIANJI','编辑')}}</iButton>
        <template v-else>
          <iButton @click="handleDeleteRemark">{{language('SHANCHU','删除')}}</iButton>
          <iButton @click="handleAddRemark">{{language('TIANJIA','添加')}}</iButton>
          <iButton @click="handleSaveRemarks"
                   :loading="saveLoading">{{language('BAOCUN','保存')}}</iButton>
          <iButton @click="cancelEdit">{{language('QUXIAO','取消')}}</iButton>
        </template>
      </template>
      <div class="meetingRemark">
        <div class="meetingRemark-item"
             v-for="(item, index) in remarkItem"
             :key="index">
          <el-checkbox v-if="!isPreview"
                       v-model="item.checked"></el-checkbox>
          <iInput v-model="item.value"
                  class="margin-top10"
                  :class="!isPreview && 'margin-left20'"
                  type="textarea"
                  :rows="3"
                  resize="none"></iInput>
        </div>
      </div>
    </iCard>
    <iCard :title="language('JINGLINGJIANAOCARD','上传仅零件号变更单')"
           class="margin-top20"
           v-if="$route.query.partProjType == partProjTypes.JINLINGJIANHAOGENGGAI">
      <div class="text-align-right margin-bottom20">
        <Upload hideTip
                @on-success='upLoadsucess'
                class="margin-right10"></Upload>
        <iButton @click='downloadFile'>下载</iButton>
        <iButton @click='deleteFile'>删除</iButton>
      </div>
      <tableList :tableTitle="fileTableTitle"
                 @handleSelectionChange="(r)=>fileTableSelect=r"
                 :tableData="fileTableData"
                 :activeItems='"fileName"'
                 @openPage="handleOpenPage">
      </tableList>
      <iPagination v-update
                   class="margin-top30"
                   @size-change="handleSizeChange($event, getFileList)"
                   @current-change="handleCurrentChange($event, getFileList)"
                   background
                   :current-page="page.currPage"
                   :page-sizes="page.pageSizes"
                   :page-size="page.pageSize"
                   :layout="page.layout"
                   :total="page.totalCount" />
    </iCard>
    <div class="rsPdfWrapper">
      <rsPdf ref="rsPdf" :nominateId="nominateId"/>
    </div>
  </div>
</template>

<script>
import { iCard, iButton, iInput, iFormGroup, iFormItem, iText, iMessage, iPagination } from 'rise'
import { nomalTableTitle, checkList, accessoryTableTitle, sparePartTableTitle, fileTableTitle, gsTableTitle } from './data'
import tableList from '@/views/designate/designatedetail/components/tableList'
import { getList, getRemark, updateRemark, updateRsMemo, reviewListRs } from '@/api/designate/decisiondata/rs'
import { uploadFiles } from '@/api/costanalysismanage/costanalysis'
import { partProjTypes, fileType } from '@/config'
import Upload from '@/components/Upload'
import { getFile, downloadUdFile, deleteFiles } from '@/api/file'
import { pageMixins } from '@/utils/pageMixins'
import { transverseDownloadPDF } from "@/utils/pdf"
import rsPdf from "./rsPdf"
import { toThousands } from "@/utils"

export default {
  components: { iCard, tableList, iButton, iInput, iFormGroup, iFormItem, iText, Upload, iPagination, rsPdf },
  props: {
    isPreview: { type: Boolean, default: false },
    nominateId: { type: String },
    // projectType: {type:String}
  },
  mixins: [pageMixins],
  filters: {
    toThousands
  },
  data () {
    return {
      // 零件项目类型
      partProjTypes,
      fileTableTitle,
      fileTableData: [],
      fileTableSelect: [],
      titleData: [
        { label: '零件关系', value: '配件', props: 'partProjectType' },
        { label: '询价采购员', value: '胡伟', props: 'buyer' },
        { label: '货币单位', value: 'RMB', props: 'currency' },
        { label: '申请单号', value: '', props: 'nominateAppId' },
        { label: '申请日期', value: '2020-01-01', props: 'nominateAppTime' },
        { label: 'LINIE采购员', value: '胡伟', props: 'linieName' },
        { label: 'Exchange rate', value: '', props: 'cfExchangeRate' },
      ],
      // tableTitle: cloneDeep(nomalTableTitle),
      tableData: [],
      remarkItem: [{ value: '', checked: false }, { value: '', checked: false }, { value: '', checked: false }],
      checkList: checkList,
      isEdit: false,
      saveLoading: false,
      projectType: '',
      basicData: {},
      editStatus: false,
      saveLoading: false,
      tableLoading: false
    }
  },
  computed: {
    exchangeRageCurrency () {
      if (this.basicData.currencyRateMap) {
        const exchangeRageCurrency = []
        for (var key in this.basicData.currencyRateMap) {
          if (key) {
            exchangeRageCurrency.push(key)
          }
        }
        return exchangeRageCurrency
      }
      return []
    },
    cardTitle () {
      if (this.projectType === partProjTypes.PEIJIAN) {
        return '配件采购 Nomination Recommendation - Spare Part Purchasing'
      } else if (this.projectType === partProjTypes.FUJIAN) {
        return '附件采购 Nomination Recommendation – Accessory Purchasing'
      }
      return '生产采购 Nomination Recommendation - Production Purchasing'
    },
    tableTitle () {
      if (this.projectType === partProjTypes.PEIJIAN) {
        return sparePartTableTitle
      } else if (this.projectType === partProjTypes.FUJIAN) {
        return accessoryTableTitle
      } else if (this.projectType === partProjTypes.GSLINGJIAN || this.projectType === partProjTypes.GSCOMMONSOURCING) {
        return gsTableTitle
      }

      return nomalTableTitle
    },
    isRoutePreview() {
      return this.$route.query.isPreview == 1
    },
    isApproval() {
      return this.$route.query.isApproval === "true"
    }
  },
  methods: {
    downloadFile () {
      if (this.fileTableSelect.length == 0) return iMessage.warn(this.language('NINGHAIWEIXUANZESHUJUWENJIAN', "您当前还未选择列表文件，请选择后重试！"))
      downloadUdFile(this.fileTableSelect.map(r => r.uploadId))
    },
    deleteFile () {
      if (this.fileTableSelect.length == 0) return iMessage.warn(this.language('NINGHAIWEIXUANZESHUJUWENJIAN', "您当前还未选择列表文件，请选择后重试！"))
      deleteFiles(this.fileTableSelect.map(r => r.id))
      this.getFileList()
    },
    /**
     * @description: 绑定仅零件号变更的文件和当前定点申请单的关系
     * @param {*} res
     * @return {*}
     */
    upLoadsucess (res) {
      const sendMap = {
        hostId: res.data.hostId || this.$store.getters.nomiAppId || '',
        filePath: res.data.path,
        uploadId: res.data.id,
        fileSize: res.file.size,
        fileName: res.file.name,
        fileCode: '0',
        source: '0',
        fileType: fileType.JINGLINGHAOBIANG
      }
      uploadFiles(sendMap).then(res => {
        if (res.result) {
          this.getFileList()
          iMessage.success('上传成功！')
        }
      }).catch(err => {
        iMessage.error(err.desZh)
      })
    },
    getFileList () {
      getFile(
        {
          hostId: this.$store.getters.nomiAppId, fileType: fileType.JINGLINGHAOBIANG, pageNo: this.page.pageSize,
          pageSize: this.page.currPage
        }).then(res => {
          this.fileTableData = res.data
          this.page.totalCount = res.total || 0
        }).catch(err => {
          iMessage.error(err.desZh)
        })
    },
    // 单独处理下年降或年降计划
    resetLtcData (row, type) {
      if (!row) return ""
      // 年降开始时间
      if (type == 'beginYearReduce') {
        // 取第一个非0的年份
        const list = row.filter((item) => item.ltcRate != '0.00');
        return list.length ? list[0].ltcDate : '-'
      } else { // 年降
        // 从非0开始至非0截至的数据 不包含0
        let strList = [];
        let strFlag = false;
        for (let i = 0; i < row.length; i++) {
          if (row[i].ltcRate != '0.00') {
            strFlag = true;
            strList.push(row[i].ltcRate);
          } else if (strFlag && row[i].ltcRate == '0.00') {
            break
          }
        }
        return strList.length ? strList.join('/') : '-'
      }
    },
    handleEdit () {
      this.isEdit = true
    },
    cancelEdit () {
      this.isEdit = false
      this.getRemark()
    },
    handleAddRemark () {
      this.remarkItem.push({ value: '', checked: false })
    },
    handleDeleteRemark () {
      this.remarkItem = this.remarkItem.filter(item => !item.checked)
    },
    /**
     * @Description: 保存备注
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */
    handleSaveRemarks () {
      this.saveLoading = true
      const params = {
        // meetRemark: this.remarks[this.resetRemarkType],
        nominateAppId: this.nominateId,
        // remarkType: this.resetRemarkType
        remarks: this.remarkItem.map(item => item.value)
      }
      updateRemark(params).then(res => {
        if (res?.result) {
          iMessage.success(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
          this.getRemark()
        } else {
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        }
      }).finally(() => {
        this.saveLoading = false
      })
    },
    /**
     * @Description: 页面初始化
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */
    init () {
      if (this.isApproval) {
        this.reviewListRs()
      } else {
        this.getTopList()
      }
      this.getRemark()
      this.$route.query.partProjType == partProjTypes.JINLINGJIANHAOGENGGAI && this.getFileList()
    },
    /**
     * @Description: 获取表格初始数据
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */
    getTopList () {
      this.tableLoading = true

      getList(this.nominateId).then(res => {
        if (res?.result) {
          this.basicData = res.data
          this.tableData = res.data.lines
          this.projectType = res.data.partProjectType || ''
          // this.projectType = partProjTypes.PEIJIAN
        } else {
          this.basicData = {}
          this.tableData = []
          this.projectType = ''
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        }
      })
      .finally(() => this.tableLoading = false)
    },
    reviewListRs() {
      this.tableLoading = true

      reviewListRs(this.nominateId)
      .then(res => {
        if (res.code == 200) {
          this.basicData = res.data
          this.tableData = res.data.lines
          this.projectType = res.data.partProjectType || ''
        } else {
          this.basicData = {}
          this.tableData = []
          this.projectType = ''
          iMessage.error(this.$i18n.locale === 'zh' ? res.desZh : res.desEn)
        }
      })
      .finally(() => this.tableLoading = false)
    },
    /**
     * @Description: 获取备注
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */
    getRemark () {
      getRemark(this.nominateId).then(res => {
        if (res?.result) {
          // res.data.forEach(element => {
          //   this.remarks[element.remarkType] = element.remark
          //   this.remarkItem = this.remarkItem.map(item => {
          //     return {...item, value: this.remarks[item.type]}
          //   })
          // })
          this.remarkItem = res.data.map(item => {
            return { value: item, checked: false }
          })
        } else {
          this.remarks = {}
          iMessage.error(this.$i18n.locale === 'zh' ? res?.desZh : res?.desEn)
        }
      })
    },
    handleOpenPage (row) {
      console.log(row);
      downloadUdFile(row.uploadId)
    },

    // 导出pdf
    handleExportPdf() {
      transverseDownloadPDF({
        dom: this.$refs.rsPdf.$el,
        pdfName: `定点申请_${ this.$route.query.desinateId }_RS单`,
        exportPdf: true,
        waterMark: true
      })
    },

    tableRowClassName({ row, rowIndex }) {
      if (row.isSuggestion) {
        return "suggestionRow"
      }
    },

    handleEdit() {
      this.editStatus = true
    },

    // 保存行备注
    handleSave() {
      this.saveLoading = true

      updateRsMemo(
        this.tableData.map(item => ({
          id: item.nomiMemoId,
          nominateId: this.nominateId,
          partProjId: item.partProjId,
          remarks: item.remarks || "",
          rfqId: item.rfqId,
          supplierId: item.supplierId
        }))
      )
      .then(res => {
        const message = this.$i18n.locale === 'zh' ? res.desZh : res.desEn

        if (res.code == 200) {
          iMessage.success(message)
        } else {
          iMessage.error(message)
        }
      })
      .finally(() => this.saveLoading = false)
    }
  }
}
</script>

<style lang="scss" scoped>
.exchangeRageCurrency + .exchangeRageCurrency {
  margin-left: 20px;
}
.meetingRemark {
  &-item {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }
}
.csc {
  ::v-deep .el-form-item__label {
    width: 150px;
  }
}
.isPreview {
  .card {
    box-shadow: none;
  }
}

.rsPdfWrapper {
  width: 0;
  height: 0;
  overflow: hidden;
}

.suggestionRow {
  border: 10px solid red
}
</style>