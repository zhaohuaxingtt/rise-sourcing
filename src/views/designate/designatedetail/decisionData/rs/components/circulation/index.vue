<!--
 * @Author: Luoshuang
 * @Date: 2021-05-28 15:18:01
 * @LastEditors: YoHo
 * @LastEditTime: 2022-03-27 17:42:58
 * @Description: 流转RS单
 * @FilePath: \front-sourcing\src\views\designate\designatedetail\decisionData\rs\components\circulation\index.vue
-->

<template>
  <div :class="isPreview && 'isPreview'">
    <div class="rsPdfWrapper">
      <rsPdf ref="rsPdf" :nominateId="nominateId"
        :cardTitle="cardTitle"
        :basicData="basicData"
        :titleData="titleData"
        :tableTitle="tableTitle"
        :tableData="tableData"
        :firstCount="firstCount"
        :count="count"
        :remarkItem="remarkItem"
        :projectType="projectType"
        :isApproval="isApproval"
        :exchangeRageCurrency="exchangeRageCurrency"
        :checkList="checkList"/>
    </div>
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
        class="rsTable mainTable"
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
        <template #packPrice="scope">
          <span>{{ scope.row.packPrice | toThousands(true) }}</span>
        </template>
        <template #transportPrice="scope">
          <span>{{ scope.row.transportPrice | toThousands(true) }}</span>
        </template>
        <template #operatePrice="scope">
          <span>{{ scope.row.operatePrice | toThousands(true) }}</span>
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

        <template #svwCode="scope">
          <span>{{ scope.row.svwCode || scope.row.svwTempCode }}</span>
        </template>

        <template #aprice="scope">
          <div v-if="scope.row.status === 'SKDLC'">
            <p>{{ scope.row.skdAPrice | toThousands(true) }}</p>
            <p>{{ scope.row.aprice | toThousands(true) }}</p>
          </div>
          <span v-else-if="scope.row.status === 'SKD'">{{ scope.row.skdAPrice | toThousands(true) }}</span>
          <span v-else>{{ scope.row.aprice | toThousands(true) }}</span>
        </template>

        <template #bprice="scope">
          <div v-if="scope.row.status === 'SKDLC'">
            <p>{{ scope.row.skdBPrice | toThousands(true) }}</p>
            <p>{{ scope.row.bprice | toThousands(true) }}</p>
          </div>
          <span v-else-if="scope.row.status === 'SKD'">{{ scope.row.skdBPrice | toThousands(true) }}</span>
          <span v-else>{{ scope.row.bprice | toThousands(true) }}</span>
        </template>

        <template #investFee="scope">
          <div v-if="scope.row.status === 'SKDLC'">
            <p>{{ scope.row.skdInvestFee | toThousands(true) }}</p>
            <p>{{ scope.row.investFee | toThousands(true) }}</p>
          </div>
          <span v-else-if="scope.row.status === 'SKD'">
            <p>{{ scope.row.skdInvestFee | toThousands(true) }}</p>
          </span>
          <span v-else>
            <p>{{ scope.row.investFee | toThousands(true) }}</p>
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
    <div class="position-compute">
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
    </div>
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
    <canvas id="myCanvas"></canvas>
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
import { decisionDownloadPdfLogo } from '@/api/designate'
import {
    uploadUdFile
} from '@/api/file/upload'

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
      tableLoading: false,
      firstCount: 0,
      count: 0,
      fileList:[],
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
    getHeight(){
      let tableHeight = document.getElementsByClassName('mainTable')[0].clientHeight
      let trHeight = (tableHeight - 56) / this.tableData.length
      // position-compute 顶部内容, 备注, 审批等 导出pdf页面固有的元素标签
      let tableHeader = 60 // 表头高度, position-compute 未计算到的
      let pageHeight = 1360 // 横版A4一页对应的高度
      let padding = 60 // 内边距高度, position-compute 未计算到的
      let headerHeight = 106 // 顶部标题高度, position-compute 未计算到的
      // let topHeight = document.getElementsByClassName('position-compute')[0].offsetHeight + headerHeight  // 顶部内容加标题高度, 第一页独有的内容
      let el = document.getElementsByClassName('position-compute')  // 页面所有固定元素的高度
      let height = headerHeight + padding + tableHeader // 第一页所有固定元素高度总和
      for (let i = 0; i < el.length; i++) {
        height += el[i].offsetHeight;
      }
      let firstCount = parseInt((pageHeight - height) / trHeight) // 第一页数据条数
      let count = parseInt((pageHeight - height + headerHeight) / trHeight ) // 之后页面,每页数据条数
      this.firstCount = firstCount
      this.count = count
    console.log(this.firstCount);
    console.log(this.count);
    },
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
      .finally(() => {
        this.tableLoading = false
        this.$nextTick(()=>{
          setTimeout(()=>{
            this.getHeight()
          },1000)
        })
      })
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
      .finally(() => {this.tableLoading = false
      
        this.$nextTick(()=>{
          setTimeout(()=>{
            this.getHeight()
          },1000)
        })})
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
      this.createEl()
      // transverseDownloadPDF({
      //   dom: this.$refs.rsPdf.$el,
      //   pdfName: `定点申请_${ this.$route.query.desinateId }_RS单`,
      //   exportPdf: true,
      //   waterMark: true
      // })
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
    },
  // 是否跨页面, 需要分割
    isSplit(nodes, index, pageHeight) {
      // 计算当前这块d是否跨越了a4大小，以此分割
      if (
        nodes[index].offsetTop + nodes[index].offsetHeight < pageHeight &&
        nodes[index + 1] &&
        nodes[index + 1].offsetTop + nodes[index + 1].offsetHeight > pageHeight
      ) {
        return true;
      }
      return false;
    },
    
    // 创建空白元素,撑开跨页面空间
    createEl() {
      let vm = this;
      const A4_WIDTH = 841.89;
      const A4_HEIGHT = 595.28;
      this. initTop = 0
      vm.$nextTick(() => {
        // dom的id。
        let target = this.$refs.rsPdf.$el;
        let pageHeight = (target.clientWidth / A4_WIDTH) * A4_HEIGHT; // a4每页对应页面的高度
        // 获取分割dom，此处为class类名为item的dom
        let lableListID = document.getElementsByClassName("pdf-item");
        // 进行分割操作，当dom内容已超出a4的高度，则将该dom前插入一个空dom，把他挤下去，分割
        for (let i = 0; i < lableListID.length; i++) {
          let multiple = Math.ceil(
            (lableListID[i].offsetTop + lableListID[i].offsetHeight) /
              pageHeight
          );  // 页码
          if (this.isSplit(lableListID, i, multiple * pageHeight)) {  // 下一个item节点是否跨域了a4页面
            let divParent = lableListID[i].parentNode; // 获取该div的父节点
            let newNode = document.createElement("div");
            newNode.className = "emptyDiv";
            newNode.style.background = "transparent";
            // 当前页高度减去div下边框距顶部高度，等于到底部的距离
            let _H = multiple * pageHeight - (lableListID[i].offsetTop + lableListID[i].offsetHeight);
            newNode.style.height = _H + "px";
            newNode.style.width = "100%";
            let next = lableListID[i].nextSibling; // 获取div的下一个兄弟节点
            // 判断兄弟节点是否存在
            if (next) {
              // 存在则将新节点插入到div的下一个兄弟节点之前，即div之后
              divParent.insertBefore(newNode, next);
            } else {
              // 不存在则直接添加到最后,appendChild默认添加到divParent的最后
              divParent.appendChild(newNode);
            }
          }
        }
      this.getPdfImage({
        dom: this.$refs.rsPdf.$el,
        pdfName: `定点申请_${ this.$route.query.desinateId }_RS单`,
        exportPdf: true,
        waterMark: true
      })
      });
    },
    
    // 截取页面,存入pdf
    // 截取页面,转图片, 上传服务器
    getPdfImage({
      //html横向导出pdf
      idEle: ele,
      dom,
      pdfName: pdfName,
      callback: callback,
      exportPdf: exportPdf,
    }) {
      let el = "";
      if (ele) el = document.getElementById(ele);
      //通过getElementById获取要导出的内容
      else el = dom;
      let eleW = el.offsetWidth; // 获得该容器的宽
      let eleH = el.offsetHeight; // 获得该容器的高
      var canvasFragment = document.createElement("canvas");
      canvasFragment.width = eleW; // 将画布宽&&高放大两倍
      canvasFragment.height = eleH;
      this.width = canvasFragment.width;
      this.height = canvasFragment.height;
      var context = canvasFragment.getContext("2d");
      context.scale(2, 2);
      html2canvas(el, {
        dpi: 96, //分辨率
        scale: 1, //设置缩放
        useCORS: true, //允许canvas画布内 可以跨域请求外部链接图片, 允许跨域请求。,
        bgcolor: "#ffffff", //应该这样写
        logging: false, //打印日志用的 可以不加默认为false
      }).then((canvas) => {
        var contentWidth = canvas.width; //
        var contentHeight = canvas.height; //
        //一页pdf显示html页面生成的canvas高度;
        var pageHeight = (contentWidth / 841.89) * 595.28; //
        this.pageHeight = pageHeight;
        console.log(this.pageHeight);
        //未生成pdf的html页面高度
        var leftHeight = contentHeight; //
        var ctx = canvas.getContext("2d");

        var copyCanvas = document.getElementById("myCanvas"); // 创建截图画布
        copyCanvas.width = contentWidth;
        copyCanvas.height = pageHeight;
        var ctxs = copyCanvas.getContext("2d");
        // 保存每一页的画布, 然后清空canvas
        if (leftHeight < pageHeight) {
          //   console.log(pageData);
          var imgData = ctx.getImageData(0, 0, contentWidth, pageHeight); // 截取主画布
          ctxs.putImageData(imgData, 0, 0); // 插入到截图画布中
          // 截图画布转为file
          copyCanvas.toBlob((blob) => {
            //以时间戳作为文件名 实时区分不同文件
            let filename = `${new Date().getTime()}.png`;
            //转换canvas图片数据格式为formData
            let pdfFile = new File([blob], filename, { type: "image/png" });
            this.fileList.push({ file: pdfFile });
          });
        } else {
          // 分页
          var num = 1;
          while (leftHeight > 0) {
            ctxs.clearRect(0, 0, contentWidth, pageHeight); //清空截图画布
            var imgData = ctx.getImageData(
              0,
              (num - 1) * pageHeight,
              contentWidth,
              pageHeight
            ); // 截取主画布当前页
            ctxs.putImageData(imgData, 0, 0); // 插入截图画布
            // 截图画布转为file
            copyCanvas.toBlob((blob) => {
              //以时间戳作为文件名 实时区分不同文件
              let filename = `${new Date().getTime()}.png`;
              let pdfFile = new File([blob], filename, { type: "image/png" });
              this.fileList.push({ file: pdfFile });
            });
            leftHeight -= pageHeight;
            // //避免添加空白页
            if (leftHeight > 0) {
              num++;
            }
          }
        }
        // if (callback) {
        //   callback(pdf, pdfName)
        // }
        this.$nextTick(() => {
          setTimeout(() => {
            this.uploadUdFile();
          }, 1000);
        });
      });
    },

    // 下载 pdf 文件
    async DownloadPdf(){
      let arr = this.fileList.filter(item=>!item.imageUrl)
      if(arr.length) return
      const list = this.fileList.map((item)=>item.imageUrl);
      await decisionDownloadPdfLogo({filePaths:list, needLogo:true, needSplit:true, width: this.width, height: this.pageHeight*1.2})  // 1.2 预留 页脚位置
    },

    // 上传图片
    async uploadUdFile(){
      this.fileList.map((item)=>{
        uploadUdFile({
        multifile: item.file
        }).then(res=>{
          if(res.code == 200){
            item['imageUrl'] = res.data[0].path
            this.DownloadPdf();
          }else{
            this.$message.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
          }
        });
      })
    },
  },
}
</script>

<style lang="scss" scoped>
#myCanvas{
  display: none;
}
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
  position: absolute;
  top: 0;
}

.suggestionRow {
  border: 10px solid red
}
</style>