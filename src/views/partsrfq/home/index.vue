<!--
 * @Author: moxuan
 * @Date: 2021-02-25 09:59:25
 * @LastEditTime: 2023-02-24 16:13:27
 * @LastEditors: 余继鹏 917955345@qq.com
 * @Description: RFQ模块首页
 * @FilePath: \front-sourcing-new\src\views\partsrfq\home\index.vue
-->
<template>
  <iPage class="partsrfqHome">
    <headerNav />
      <!------------------------------------------------------------------------>
      <!--                  search 搜索模块                                   --->
      <!------------------------------------------------------------------------>
      <iSearch
        class="margin-bottom7"
        :icon="false"
        @reset="handleSearchReset"
        @sure="sure"
        :resetKey="PARTSRFQ_RESET"
        :searchKey="PARTSRFQ_SEARCH"
      >
        <el-form>
          <!-- <el-form-item class="currentWidth" :label="language('LK_LINGJIANHAO_FSNR_RFQBIANHAO_CAIGOUYUAN_SAP_SUPPLIERNAME','零件号/零件采购项目号/RFQ编号/采购员/供应商SAP号/供应商名称')"
              v-permission.auto="PARTSRFQ_SEARCHBOX|零件号/零件采购项目号/RFQ编号/采购员/供应商SAP号/供应商名称">
                <iInput  :placeholder="language('LK_QINGXUANZE','请选择')" v-model="form.searchConditions"></iInput>
              </el-form-item> -->
          <el-form-item :label="language('LK_LINGJIANHAO', '零件号')">
            <!-- <iInput clearable :placeholder="language('partsprocure.PLEENTER','请输入')" v-model="form.partNum"></iInput> -->
            <iMultiLineInput
              v-model="form.partNum"
              :title="language('LK_LINGJIANHAO', '零件号')"
            />
          </el-form-item>
          <el-form-item :label="language('LK_LINGJIANMINGCHENG', '零件名称')">
            <iInput
              clearable
              :placeholder="language('partsprocure.PLEENTER', '请输入')"
              v-model="form.partName"
            ></iInput>
          </el-form-item>
          <el-form-item :label="$t('LINGJIANCAIGOUXIANGMUHAO')">
            <iInput
              clearable
              :placeholder="language('partsprocure.PLEENTER', '请输入')"
              v-model="form.fsNum"
            ></iInput>
          </el-form-item>
          <el-form-item :label="language('LK_RFQBIANHAO', 'RFQ编号')">
            <iInput
              clearable
              :placeholder="language('partsprocure.PLEENTER', '请输入')"
              v-Int
              v-model="form.rfqId"
            ></iInput>
          </el-form-item>
          <el-form-item :label="language('RFQMINGCHENG', 'RFQ名称')">
            <iInput
              clearable
              :placeholder="language('partsprocure.PLEENTER', '请输入')"
              v-model="form.rfqName"
            ></iInput>
          </el-form-item>
          <el-form-item
            :label="language('LK_XUNJIACAIGOUYUAN', '询价采购员名称')"
          >
            <iInput
              clearable
              :placeholder="language('partsprocure.PLEENTER', '请输入')"
              v-model="form.buyerName"
            ></iInput>
          </el-form-item>
          <el-form-item
            :label="language('partsprocure.PARTSPROCURELINIE', 'LINIE')"
          >
            <iInput
              clearable
              :placeholder="language('partsprocure.PLEENTER', '请输入')"
              v-model="form.linieName"
            ></iInput>
          </el-form-item>
          <el-form-item :label="$t('LK_GONGYINGSHANGSAPHAO')">
            <iInput
              clearable
              :placeholder="language('partsprocure.PLEENTER', '请输入')"
              v-model="form.supplierSap"
            ></iInput>
          </el-form-item>
          <el-form-item :label="$t('LK_GONGYINGSHANGMINGCHENG')">
            <iInput
              clearable
              :placeholder="language('partsprocure.PLEENTER', '请输入')"
              v-model="form.supplierName"
            ></iInput>
          </el-form-item>
          <el-form-item
            :label="language('LK_CHEXINGXIANGMU', '车型项目')"
            v-permission.auto="PARTSRFQ_MODELPROJECT | 车型项目"
          >
            <iSelect
              clearable
              filterable
              :placeholder="language('LK_QINGXUANZE', '请选择')"
              v-model="form.carTypeProjectId"
            >
              <el-option
                value=""
                :label="language('all', '全部') | capitalizeFilter"
              ></el-option>
              <el-option
                v-for="items in carTypeOptions"
                :key="items.id"
                :value="items.id"
                :label="items.name"
              />
            </iSelect>
          </el-form-item>
          <el-form-item
            :label="language('LK_LINGJIANXIANGMULEIXING', '零件项目类型')"
            v-permission.auto="PARTSRFQ_PARTITEMTYPE | 零件项目类型"
          >
            <iSelect
              clearable
              :placeholder="language('LK_QINGXUANZE', '请选择')"
              v-model="form.partType"
            >
              <el-option
                value=""
                :label="language('all', '全部') | capitalizeFilter"
              ></el-option>
              <el-option
                v-for="item in partTypeOptions"
                :key="item.code"
                :value="item.value"
                :label="item[$i18n.locale]"
              />
            </iSelect>
          </el-form-item>
          <el-form-item
            :label="language('LK_RFQZHUANGTAI', 'RFQ状态')"
            v-permission.auto="PARTSRFQ_RFQSTATUS | RFQ状态"
          >
            <iSelect
              clearable
              :placeholder="language('LK_QINGXUANZE', '请选择')"
              v-model="form.rfqStatus"
            >
              <el-option
                value=""
                :label="language('all', '全部') | capitalizeFilter"
              ></el-option>
              <el-option
                v-for="items in rfqStatusOptions"
                :key="items.code"
                :value="items.code"
                :label="items.name"
              />
            </iSelect>
          </el-form-item>
          <el-form-item
            :label="language('LK_CHEXING', '车型')"
            v-permission.auto="PARTSRFQ_RFQCHEXING | 车型"
          >
            <iSelect
              clearable
              :placeholder="language('LK_QINGXUANZE', '请选择')"
              v-model="form.modelCode"
              filterable
            >
              <el-option
                value=""
                :label="language('all', '全部') | capitalizeFilter"
              ></el-option>
              <el-option
                v-for="item in cartTypeOptions"
                :key="item.key"
                :value="item.value"
                :label="item.label"
              />
            </iSelect>
          </el-form-item>
          <el-form-item
            :label="language('LK_JISHUPINGFENZHUANGTAI', '技术评分状态')"
            v-permission.auto="PARTSRFQ_RFQJISHUPINFENZHUANGTAI | 技术评分状态"
          >
            <iSelect
              clearable
              :placeholder="language('LK_QINGXUANZE', '请选择')"
              v-model="form.tpStatus"
              filterable
            >
              <el-option
                value=""
                :label="language('all', '全部') | capitalizeFilter"
              ></el-option>
              <el-option
                v-for="item in rfqRateStatusOptions"
                :key="item.code"
                :value="item.value"
                :label="item[$i18n.locale]"
              />
            </iSelect>
          </el-form-item>
          <el-form-item
            :label="language('LK_ZHILIANGPINGFENZHUANGTAI', '质量评分状态')"
            v-permission.auto="
              PARTSRFQ_RFQZILIANGPINFENZHUANGTAI | 质量评分状态
            "
          >
            <iSelect
              clearable
              :placeholder="language('LK_QINGXUANZE', '请选择')"
              v-model="form.mqStatus"
              filterable
            >
              <el-option
                value=""
                :label="language('all', '全部') | capitalizeFilter"
              ></el-option>
              <el-option
                v-for="item in rfqRateStatusOptions"
                :key="item.code"
                :value="item.value"
                :label="item[$i18n.locale]"
              />
            </iSelect>
          </el-form-item>
          <el-form-item
            :label="language('LK_CAIWUMUBIAOJIAZHUANGTAI', '财务目标价状态')"
            v-permission.auto="
              PARTSRFQ_RFQCAIWUMUBIAOJIAZHUANGTAI | 财务目标价状态
            "
          >
            <iSelect
              clearable
              :placeholder="language('LK_QINGXUANZE', '请选择')"
              v-model="form.cfStatus"
              filterable
            >
              <el-option
                value=""
                :label="language('all', '全部') | capitalizeFilter"
              ></el-option>
              <el-option
                v-for="item in cfApplyStatusOptions"
                :key="item.code"
                :value="item.value"
                :label="item[$i18n.locale]"
              />
            </iSelect>
          </el-form-item>
          <el-form-item
            :label="
              language('LK_HEAVYITEMWEIHUZHUANGTAI', 'Heavy Item维护状态')
            "
            v-permission.auto="
              PARTSRFQ_RFQHEAVYITEMZHUANGTAI | HeavyItem维护状态
            "
          >
            <iSelect
              clearable
              :placeholder="language('LK_QINGXUANZE', '请选择')"
              v-model="form.heavyItem"
              filterable
            >
              <el-option
                value=""
                :label="language('all', '全部') | capitalizeFilter"
              ></el-option>
              <el-option
                v-for="item in heavyItemOptions"
                :key="item.code"
                :value="item.value"
                :label="item[$i18n.locale]"
              />
            </iSelect>
          </el-form-item>
          <el-form-item
            :label="language('LK_XIANSHIZIJI', '显示自己')"
            v-permission.auto="PARTSRFQ_SHOWSELF | 显示自己"
          >
            <iSelect
              clearable
              v-model="form.showSelf"
              :placeholder="
                language('LK_QINGXUANZHEMEICHEYONGLIANGZHUANGTAI', '显示自己')
              "
            >
              <el-option
                value=""
                :label="language('all', '全部') | capitalizeFilter"
              ></el-option>
              <el-option
                :value="true"
                :label="language('YES', '是')"
              ></el-option>
              <el-option
                :value="false"
                :label="language('NO', '否')"
              ></el-option>
            </iSelect>
          </el-form-item>
        </el-form>
      </iSearch>
      <iCard>
        <!------------------------------------------------------------------------>
        <!--                  table模块，向外入参表格数据，表头                    --->
        <!------------------------------------------------------------------------>
        <div class="margin-bottom20 clearFloat">
          <span class="font18 font-weight">{{
            language("LK_RFQZONGHEGUANLI", "RFQ综合管理")
          }}</span>
          <div class="floatright">
            <!--激活RFQ：仅前期采购员有该按钮权限。已经关闭的RFQ，如果需要再次打开时，点击该键-->
            <iButton
              @click="editRfq('02')"
              :loading="activateButtonLoading"
              v-permission.auto="PARTSRFQ_ACTIVATERFQ | 激活RFQ"
            >
              {{ language("LK_JIHUORFQS", "激活RFQ") }}
            </iButton>
            <!--新建RFQ：点击该键，系统会跳到下一界面。具体新建RFQ见另一user story，当RFQ类型为FS时，仅前期采购员有该按钮权限-->
            <iButton
              @click="newRfq"
              v-permission.auto="PARTSRFQ_NEWRFQ | 新建RFQ"
              >{{ language("LK_XINJIANRFQS", "新建RFQ") }}</iButton
            >
            <!--关闭RFQ：仅前期采购员有该按钮权限。以下情况可关闭：RFQ零件状态是全部定点或全部结束，当前RFQ没有零件-->
            <iButton
              @click="editRfq('01')"
              :loading="closeButtonLoading"
              v-permission.auto="PARTSRFQ_CLOSERFQ | 关闭RFQ"
            >
              {{ language("LK_GUANBIRFQS", "关闭RFQ") }}
            </iButton>
            <!--转派评分任务：选中RFQ之后，可以手动转派任务给EP/MQ同事-->
            <iButton
              @click="assignmentOfScoringTasks"
              v-permission.auto="PARTSRFQ_ASSIGNMENTTASKS | 转派任务评分"
            >
              {{ language("LK_ZHUANPAIPINGFENRENWUS", "转派任务评分") }}
            </iButton>
            <!--转派前期采购员：选中RFQ之后，可以手动转派前期采购员-->
            <iButton
              @click="openInquiryBuyerDialog('1')"
              v-permission.auto="PARTSRFQ_ASSIGNMENTBUYER | 转派前期采购员"
            >
              {{ language("ZHUANPAIQIANQICAIGOUYUAN", "转派前期采购员") }}
            </iButton>
            <!--转派LINIE：选中RFQ之后，可以手动转派转派LINIE-->
            <iButton
              @click="openInquiryBuyerDialog('2')"
              v-permission.auto="PARTSRFQ_ASSIGNMENTLINIE | 转派LINIE"
            >
              {{ language("ZHUANPAILINIE", "转派LINIE") }}
            </iButton>
            <!--转谈判：只会出现在前期采购员界面-->
            <iButton
              @click="editRfq('03')"
              :loading="transferNegotiationButtonLoading"
              v-permission.auto="PARTSRFQ_TRANSFERNEGOTIATION | 转谈判"
              >{{ language("LK_ZHUANTANPANS", "转谈判") }}
            </iButton>
            <!--转询价：只会出现在专业采购员界面-->
            <iButton
              @click="editRfq('04')"
              :loading="transferInquiryButtonLoading"
              v-permission.auto="PARTSRFQ_REINQUIRY | 转询价"
              >{{ language("LK_ZHUANXUNJIAS", "转询价") }}
            </iButton>
            <!--创建定点申请：在列表中选择RFQ，点击该键，会跳转到定点申请创建页面，RFQ的内容会自动带入到定点申请的各页签中-->
            <iButton
              v-permission.auto="PARTSRFQ_CREATEAPPLICATION | 创建定点申请"
              :loading="createDesignateLoading"
              @click="openNominateTypeDialog"
            >
              {{ language("LK_CHUANGJIANDINGDIANSHENQINGS", "创建定点申请") }}
            </iButton>
            <iButton
              @click="exportTable"
              v-permission.auto="PARTSRFQ_EXPORT | 导出"
              >{{ language("LK_DAOCHUS", "导出") }}</iButton
            >
            <button-table-setting @click="edittableHeader" />
          </div>
        </div>
        <tablelist
          permissionKey="PARTSRFQ_HOME"
          :tableData="tableListData"
          :tableTitle="tableTitle"
          :tableLoading="tableLoading"
          @handleSelectionChange="handleSelectionChange"
          openPageGetRowData
          @openPage="openPage"
          :activeItems="'id'"
          :index="true"
          indexFixed
          icon-props="recordId"
          :lang="true"
          ref="tableList"
        >
          <template #recordId="scope">
            <div @click="toTop(scope.row)" class="icon-style">
              <icon
                symbol
                class="icon icon-color-active"
                name="iconliebiaoyizhiding"
                v-if="+scope.row.recordId > 0"
              ></icon>
              <icon
                symbol
                class="icon"
                name="iconliebiaoweizhiding"
                v-else
              ></icon>
            </div>
          </template>
          <!-- <template v-slot:icon="scope">
                <div @click="toTop(scope.data)" class="icon-style">
                  <icon symbol class="icon icon-color-active" name="iconliebiaoyizhiding"
                        v-if="+scope.data.recordId > 0"></icon>
                  <icon symbol class="icon" name="iconliebiaoweizhiding" v-else></icon>
                </div>
              </template> -->
          <template #kmAnalysis="scope">
            <el-popover
              v-if="scope.row.kmAnalysis"
              placement="left"
              width="300"
              trigger="click"
              @show="showAttachmentTable(scope.row)"
              @hide="attachmentTableListData = []"
            >
              <tablelist
                :tableTitle="attachmentTableTitle"
                :tableData="attachmentTableListData"
                :tableLoading="attachmentLoading"
                :selection="false"
              >
                <template #fileName="attachmentScope">
                  <span class="link" @click="downLoad(attachmentScope.row)">{{
                    attachmentScope.row.fileName
                  }}</span>
                </template>
              </tablelist>
              <icon
                class="tick icon-style"
                symbol
                name="iconbaojiazhuangtailiebiao_yibaojia"
                slot="reference"
              />
            </el-popover>
            <span v-else></span>
          </template>

          <!-- 已报价&已询价 合并显示 -->
          <template #suppliers="scope">
            <span>{{ scope.row.quotations }}/{{ scope.row.suppliers }}</span>
          </template>
        </tablelist>
        <!------------------------------------------------------------------------>
        <!--                  表格分页                                          --->
        <!------------------------------------------------------------------------>
        <iPagination
          v-update
          @size-change="handleSizeChange($event, getTableList)"
          @current-change="handleCurrentChange($event, getTableList)"
          background
          :page-sizes="page.pageSizes"
          :page-size="page.pageSize"
          :layout="page.layout"
          :current-page="page.currPage"
          :total="page.totalCount"
        />
        <!------------------------------------------------------------------------>
        <!--                  转派评分任务弹出框                                   --->
        <!------------------------------------------------------------------------>
        <!-- <assignment-of-scoring-tasks
                v-model="diologAssignmentOfScroingTasks"
                :rfq-id="assignmentRfqIdList"
                :selectDatalist='selectDatalist'
            /> -->
        <scoringDeptDialog
          ref="scoringDeptDialog"
          :visible.sync="scoringDeptVisible"
          :ids="rfqIds"
          customAction
          @handleSave="scoringDeptSave"
        />
        <!------------------------------------------------------------------------>
        <!--                  转派询价采购员/LINIE弹窗                           --->
        <!------------------------------------------------------------------------>
        <assignInquiryBuyerDialog
          ref="assignInquiryBuyerDialog"
          :dialogVisible="inquiryBuyerVisible"
          :type="inquiryBuyerDialogType"
          @changeVisible="changeInquiryBuyerDialogVisible"
          @handleConfirm="handleTransferConfirm"
        />
      </iCard>
      <nominateTypeDialog
        :visible.sync="nominateTypeDialogVisible"
        @confirm="createDesignate"
      />
  </iPage>
</template>
<script>
import {
  iPage,
  iButton,
  iCard,
  iMessage,
  iPagination,
  iInput,
  iSelect,
  icon,
  iMultiLineInput,
} from "rise";
import { iNavMvp, iSearch } from "rise";
import headerNav from "@/components/headerNav";
// import tablelist from "pages/partsrfq/components/tablelist";
import tablelist from "@/components/iTableSort";
import { tableSortMixins } from "@/components/iTableSort/tableSortMixins";
import { pageMixins } from "@/utils/pageMixins";
import {
  tableTitle,
  attachmentTableTitle,
  partsprocureNavList,
} from "pages/partsrfq/home/components/data";
import {
  getRfqList,
  getCartypeDict,
  modification,
  ratingTranslate,
  setRfqTop,
} from "@/api/partsrfq/home";
import { excelExport } from "@/utils/filedowLoad";
import store from "@/store";
import filters from "@/utils/filters";
import { rfqCommonFunMixins } from "pages/partsrfq/components/commonFun";
import { getAllScoringDepartmentInfo, transferRfq } from "@/api/partsrfq/home";
import { getProcureGroup } from "@/api/partsprocure/home";
import scoringDeptDialog from "@/views/partsrfq/editordetail/components/rfqPending/components/supplierScore/components/scoringDeptDialog";
import { getKmFileHistory } from "@/api/costanalysismanage/costanalysis";
import { downloadFile, downloadUdFile } from "@/api/file";
import { selectRfq } from "@/api/designate/designatedetail/addRfq";
import nominateTypeDialog from "./components/nominateTypeDialog";
import { clickMessage } from "@/views/partsign/home/components/data";
import { selectDictByRootKeys } from "@/api/dictionary";
import { setPretreatmentParams } from "@/utils/tool";
import assignInquiryBuyerDialog from "./components/assignInquiryBuyer";
import { getCarTypeSop } from "@/api/partsprocure/editordetail";
import buttonTableSetting from "@/components/buttonTableSetting";
// eslint-disable-next-line no-undef
const { mapState, mapActions } = Vuex.createNamespacedHelpers("sourcing");

export default {
  components: {
    iPage,
    tablelist,
    iButton,
    iCard,
    iNavMvp,
    iPagination,
    iSearch,
    iInput,
    iSelect,
    icon,
    scoringDeptDialog,
    nominateTypeDialog,
    assignInquiryBuyerDialog,
    headerNav,
    buttonTableSetting,
    iMultiLineInput,
  },
  mixins: [pageMixins, filters, rfqCommonFunMixins, tableSortMixins],
  data() {
    return {
      tableListData: [],
      tableTitle: tableTitle,
      tableLoading: false,
      selectTableData: [],
      diologAssignmentOfScroingTasks: false,
      form: {
        supplierName:'',
        searchConditions: "",
        rfqId: "",
        rfqName: "",
        carTypeProjectId: "",
        partType: "",
        partName: "",
        rfqStatus: "",
        car: "",
        modelCode: "",
        tpStatus: "",
        mqStatus: "",
        cfStatus: "",
        heavyItem: "",
        showSelf: true,
      },
      activateButtonLoading: false,
      closeButtonLoading: false,
      transferNegotiationButtonLoading: false,
      transferInquiryButtonLoading: false,
      carTypeOptions: [],
      partTypeOptions: [],
      rfqStatusOptions: [],
      assignmentRfqIdList: [],
      fromGroup: [],
      tab: "source",
      selectDatalist: [],
      scoringDeptVisible: false,
      rfqIds: [],
      attachmentLoading: false,
      attachmentTableTitle,
      attachmentTableListData: [],
      cartTypeOptions: [],
      createDesignateLoading: false,
      nominateTypeDialogVisible: false,
      rfqRateStatusOptions: [],
      cfApplyStatusOptions: [],
      heavyItemOptions: [],
      inquiryBuyerVisible: false,
      inquiryBuyerDialogType: "1",
      partsprocureNavList: partsprocureNavList,
      flagIsLinieGZ: false,
    };
  },
  created() {
  
    this.getCartypeDict();
    this.getDict();
    this.getCarTypeOptions();
    // this.getPartTypeOptions()
    // this.getRfqStatusOptions()
    if(this.$route.query.supplierName){
      this.form.supplierName=this.$route.query.supplierName
      this.sure()
    }else{
       this.getTableList();
    }
    this.updateNavList;
  },
  computed: {
    ...mapState(["navList"]),
    ...mapActions(["updateNavList"]),
  },
  methods: {
    handleTransferConfirm(options) {
      const params = {
        rfqIds: this.rfqIds,
        updateUserType: this.inquiryBuyerDialogType === "1" ? "0" : "1",
        userId: options.userId,
        linieDept: options.linieDept,
        linieDeptName: options.linieDeptName,
      };
      transferRfq(params)
        .then((res) => {
          if (res?.result) {
            iMessage.success(
              this.$i18n.locale === "zh" ? res.desZh : res.desEn
            );
            this.changeInquiryBuyerDialogVisible(false);
            this.getTableList();
          } else {
            iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
          }
        })
        .finally(() => {
          this.$refs.assignInquiryBuyerDialog.changeLoading(false);
        });
    },
    openInquiryBuyerDialog(type) {
      if (this.selectTableData.length > 0) {
        this.rfqIds = this.selectTableData.map((item) => item.id);
      } else {
        return iMessage.warn(
          this.language(
            "BAOQIANNINDANGQIANHAIWEIXUANZENINXUYAOZHUANPAIDERENWU",
            "抱歉，您当前还未选择您需要转派的任务！"
          )
        );
      }
      this.inquiryBuyerDialogType = type;
      this.changeInquiryBuyerDialogVisible(true);
    },
    changeInquiryBuyerDialogVisible(visible) {
      this.inquiryBuyerVisible = visible;
    },
    getDict() {
      selectDictByRootKeys([
        { keys: "RfqRateStatus" },
        { keys: "CF_APPLY_STATUS" },
        { keys: "HEAVY_ITEM" },
        { keys: "PPT" },
        { keys: "RFQ_STATE" },
      ])
        .then((res) => {
          if (res.code == 200) {
            Object.keys(res.data).forEach((key) => {
              switch (key) {
                case "RfqRateStatus":
                  this.rfqRateStatusOptions = Array.isArray(
                    res.data["RfqRateStatus"]
                  )
                    ? res.data["RfqRateStatus"].map((item) => ({
                        ...item,
                        key: item.code,
                        value: item.code,
                        zh: item.name,
                        en: item.nameEn,
                        de: item.nameDe,
                      }))
                    : [];
                  break;
                case "CF_APPLY_STATUS":
                  this.cfApplyStatusOptions = Array.isArray(
                    res.data["CF_APPLY_STATUS"]
                  )
                    ? res.data["CF_APPLY_STATUS"].map((item) => ({
                        ...item,
                        key: item.code,
                        value: item.code,
                        zh: item.name,
                        en: item.nameEn,
                        de: item.nameDe,
                      }))
                    : [];
                  break;
                case "HEAVY_ITEM":
                  this.heavyItemOptions = Array.isArray(res.data["HEAVY_ITEM"])
                    ? res.data["HEAVY_ITEM"].map((item) => ({
                        ...item,
                        key: item.code,
                        value: item.code,
                        zh: item.name,
                        en: item.nameEn,
                        de: item.nameDe,
                      }))
                    : [];
                  break;
                case "PPT":
                  this.partTypeOptions = Array.isArray(res.data["PPT"])
                    ? res.data["PPT"].map((item) => ({
                        ...item,
                        key: item.code,
                        value: item.code,
                        zh: item.name,
                        en: item.nameEn,
                        de: item.nameDe,
                      }))
                    : [];
                  break;
                case "RFQ_STATE":
                  this.rfqStatusOptions = Array.isArray(res.data["RFQ_STATE"])
                    ? res.data["RFQ_STATE"].map((item) => ({
                        ...item,
                        key: item.code,
                        value: item.code,
                        zh: item.name,
                        en: item.nameEn,
                        de: item.nameDe,
                      }))
                    : [];
                  break;
                default:
              }
            });
          } else {
            iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
          }
        })
        .catch(() => {});
    },
    sure() {
      this.page.currPage = 1;
      this.getTableList();
    },
    getYearMonth(date) {
      date = (date + "").split(/[ ]+/);
      return date[0];
    },
    //获取转派评分任务列表
    getAllScoringDepartmentInfo() {
      return new Promise((r) => {
        const rfqids = [];
        this.selectTableData.forEach((element) => {
          rfqids.push(element.id);
        });
        getAllScoringDepartmentInfo({ rfqId: rfqids })
          .then((res) => {
            r(res.data);
          })
          .catch((err) => {
            r([]);
          });
      });
    },
    //动态获取转派评分任务
    openPage(row) {
      const openUrl = this.$router.resolve({
        path: `/sourceinquirypoint/sourcing/partsrfq/editordetail`,
        query: {
          id: row.id,
          round: row.currentRounds,
          carTypeNames: row.carTypeNames,
          businessKey:row.partProjectType,
          rfqName:row.rfqName,
        },
      });
      window.open(openUrl.href, "_blank");
    },
    //获取表格数据
    async getTableList() {
      this.tableLoading = true;
      // 获取寻源概览过来的预置参数
      setPretreatmentParams(this, this.form, this.$route.query);
      const req = {
        userId: store.state.permission.userInfo.id,
        current: this.page.currPage,
        size: this.page.pageSize,
        ...this.form,
      };
      try {
        // const res = await getRfqDataList(req)
        const res = await getRfqList(req);
        // this.tableListData = res.data.getRfqInfoVO.rfqVOList;
        // this.page.currPage = res.data.getRfqInfoVO.pageNum
        // this.page.pageSize = res.data.getRfqInfoVO.pageSize
        // this.page.totalCount = res.data.getRfqInfoVO.total

        res.data.forEach((val) => {
          // eslint-disable-next-line no-undef
          val.createDate = val.createDate
            ? moment(val.createDate).format("YYYY-MM-DD")
            : "";
          // eslint-disable-next-line no-undef
          val.currentRoundsEndTime = val.currentRoundsEndTime
            ? moment(val.currentRoundsEndTime).format("YYYY-MM-DD")
            : "";
        });
        this.tableListData = Array.isArray(res.data) ? res.data : [];
        this.page.totalCount = res.total;
        this.tableLoading = false;
      } catch {
        this.tableLoading = false;
      }
    },
    //修改表格改动列
    handleSelectionChange(val) {
      this.selectTableData = val;
    },
    newRfq() {
      const newRfqUrl = this.$router.resolve({
        path: "/sourceinquirypoint/sourcing/partsrfq/editordetail",
      });
      window.open(newRfqUrl.href, "_blank");
    },
    async editRfq(updateType) {
      if (!this.selectTableData.length)
        return iMessage.warn(
          this.language("LK_NINDANGQIANHAIWEIXUANZE", "抱歉！您当前还未选择！")
        );
      if (
        this.selectTableData.some((item) =>
          Array.isArray(item.partProjectType)
            ? item.partProjectType.find((o) => o == "1000040" || o == "1000030")
            : false
        )
      )
        return iMessage.warn(
          this.language(
            "LK_GANGCAILEIXINGBUNENGJINGXINGCAOZUO",
            "抱歉，钢材类型不能进行操作"
          )
        );

      const req = {
        updateType,
        tmRfqIdList: this.selectTableData.map((item) => item.id),
        userId: store.state.permission.userInfo.id,
      };
      this.setOperationButtonLoading(updateType, true);
      const res = await modification(req);
      this.setOperationButtonLoading(updateType, false);
      this.resultMessage(res);
      this.getTableList();
    },
    //d点击打开转派评分任务列表
    async assignmentOfScoringTasks() {
      if (this.selectTableData.length) {
        this.rfqIds = this.selectTableData.map((item) => item.id);
      } else {
        return iMessage.warn(
          this.language(
            "LK_NINDANGQIANHAIWEIXUANZENINXUYAOZHUANPAIDEPINGFENRENWU",
            "抱歉，您当前还未选择您需要转派的评分任务！"
          )
        );
      }
      if (this.selectTableData.length !== 1)
        return iMessage.warn(
          this.language("QINGXUANZEYITIAOSHUJU", "请选择一条数据")
        );
      if (
        this.selectTableData.some((item) =>
          Array.isArray(item.partProjectType)
            ? item.partProjectType.find((o) => o == "1000040" || o == "1000030")
            : false
        )
      )
        return iMessage.warn(
          this.language(
            "LK_GANGCAILEIXINGBUNENGJINGXINGCAOZUO",
            "抱歉，钢材类型不能进行操作"
          )
        );
      this.scoringDeptVisible = true;
      // if (this.selectTableData.length == 0)
      //   return iMessage.warn(this.$t('LK_NINDANGQIANHAIWEIXUANZENINXUYAOZHUANPAIDEPINGFENRENWU'));
      // this.selectDatalist = await this.getAllScoringDepartmentInfo()
      // this.diologAssignmentOfScroingTasks = true
      // this.assignmentRfqIdList = this.selectTableData.map(item => {
      //   return item.id
      // })
    },
    async scoringDeptSave(list) {
      // if (this.selectTableData.length == "") return iMessage.warn(this.$t("LK_NINDANGQIANHAIWEIXUANZE"));
      // const rateDepartMap = {
      //   "质量部门": "MQ",
      //   "技术部门": "EP"
      // }
      let refs = this.selectTableData.map((item) => {
        return item.id;
      });
      const req = list.map((item) => ({
        deptNum: item.rateDepartNum,
        // deptType: rateDepartMap[item.rateDepart],
        deptType: item.rateTag,
        graderId: item.raterId,
        graderName: item.rater,
        coordinator: item.coordinator,
        coordinatorId: item.coordinatorId,
        rfqDeptRatId: item.id,
      }));
      this.$refs.scoringDeptDialog.setSaveLoading(true);
      try {
        const res = await ratingTranslate({ rfqId: refs, ratingInfoList: req });
        if (res.code == 200) {
          iMessage.success(this.language("LK_ZHUANPAICHENGGONG", "转派成功"));
        } else {
          iMessage.error(
            `${this.$i18n.locale === "zh" ? res.desZh : res.desEn}`
          );
        }
      } finally {
        this.$refs.scoringDeptDialog.setSaveLoading(false);
      }
    },
    async toTop(row) {
      const setType = row.recordId ? "0" : "1";
      const req = {
        setType,
        rfqId: row.id,
        userId: store.state.permission.userInfo.id,
      };
      const res = await setRfqTop(req);
      this.resultMessage(res);
      this.getTableList();
    },
    change() {},
    handleSearchReset() {
      this.form = { showSelf: true };
      this.getTableList();
    },
    exportTable() {
      if (this.selectTableData.length == 0)
        return iMessage.warn(
          this.language(
            "LK_QINGXUANZHEXUYAODAOCHUSHUJU",
            "请选择需要导出的数据"
          )
        );
      excelExport(this.selectTableData, this.tableTitle);
    },
    setOperationButtonLoading(updateType, boolean) {
      switch (updateType) {
        case "01":
          this.closeButtonLoading = boolean;
          break;
        case "02":
          this.activateButtonLoading = boolean;
          break;
        case "03":
          this.transferNegotiationButtonLoading = boolean;
          break;
        case "04":
          this.transferInquiryButtonLoading = boolean;
          break;
      }
    },
    async getCarTypeOptions() {
      getCarTypeSop().then((res) => {
        if (res.code == 200) {
          this.carTypeOptions = Array.isArray(res.data)
            ? res.data.map((item) => ({
                id: item.id,
                code: item.cartypeProCode,
                name: item.cartypeProName,
              }))
            : [];
        }
      });
    },
    // async getPartTypeOptions() {
    //   const res = await findBySearches('02')
    //   this.partTypeOptions = res.data
    // },
    // async getRfqStatusOptions() {
    //   const res = await findBySearches('03')
    //   this.rfqStatusOptions = res.data
    // },

    // 分析报告下载
    downLoad(row) {
      // downloadFile({
      //   applicationName: "rise",
      //   fileList: row.fileName
      // })
      downloadUdFile(row.uploadId);
    },
    showAttachmentTable(row) {
      this.getKmFileHistory(row.id);
    },
    // 获取分析报告
    getKmFileHistory(rfqId) {
      if (!rfqId) return;

      this.attachmentLoading = true;
      getKmFileHistory({
        hostId: rfqId,
        type: 1,
        currPage: 1,
        pageSize: 99999999,
        rfqFlag: true, // 对应url中的false
      })
        .then((res) => {
          if (res.code == 200) {
            this.attachmentTableListData = Array.isArray(res.data)
              ? res.data
              : [];
          } else {
            iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
          }

          this.attachmentLoading = false;
        })
        .catch(() => (this.attachmentLoading = false));
    },
    // 获取车型字典
    getCartypeDict() {
      getCartypeDict().then((res) => {
        if (res.code == 200) {
          this.cartTypeOptions = Array.isArray(res.data)
            ? res.data.map((item) => ({
                ...item,
                key: item.code,
                label: item.name,
                value: item.name,
              }))
            : [];
        }
      });
    },
    openNominateTypeDialog() {
      if (!this.selectTableData.length)
        return iMessage.warn(
          this.language("LK_QINGXUANZEZHISHAOYITIAORFQ", "请至少选择一条RFQ")
        );
      if (
        this.selectTableData.some((item) =>
          Array.isArray(item.partProjectType)
            ? item.partProjectType.find((o) => o == "1000040" || o == "1000030")
            : false
        )
      )
        return iMessage.warn(
          this.language(
            "LK_GANGCAILEIXINGBUNENGJINGXINGCAOZUO",
            "抱歉，钢材类型不能进行操作"
          )
        );
      // this.nominateTypeDialogVisible = true
      this.createDesignate();
    },
    // 创建定点申请
    createDesignate() {
      this.nominateTypeDialogVisible = false;
      this.createDesignateLoading = true;

      selectRfq({
        rfqIdArr: this.selectTableData.map((item) => item.id),
      })
        .then((res) => {
          const message = this.$i18n.locale === "zh" ? res.desZh : res.desEn;

          if (res.code == 200) {
            iMessage.success(message);
            const openDesignate = this.$router.resolve({
              path: "/designate/details",
              query: {
                desinateId: res.data.nominateId,
                sd: 1,
                designateType: res.data.nominateProcessType,
                partProjType: res.data.partProjectType,
              },
            });
            window.open(openDesignate.href, "_blank");
          } else {
            iMessage.error(message);
          }

          this.createDesignateLoading = false;
        })
        .catch(() => (this.createDesignateLoading = false));
    },
    // 通过待办数跳转
    clickMessage,
  },
};
</script>
<style lang='scss' scoped>
.currentWidth {
  width: 490px !important;
}
.icon-color-active {
  color: $color-blue;
}

.icon-style {
  cursor: pointer;
}

.partsrfqHome {
  position: relative;
  .tab {
    ::v-deep .el-tabs__header {
      position: absolute;
      top: 20px;
      transform: translate(0, 5px);
      z-index: 1;

      .el-tabs__nav-wrap::after {
        background: transparent;
      }

      .el-tabs__active-bar {
        height: 3px;
        background: $color-blue;
        border-radius: 2px;
      }

      .el-tabs__item {
        font-size: 18px;
        color: #000000;
        opacity: 0.42;
        height: 35px;
        line-height: 35px;

        & + & {
          padding: 0 25px;
        }
      }

      .is-active {
        opacity: 1;
        font-weight: bold;
      }
    }
  }

  .tick {
    font-size: 18px;
  }
  .topMenu {
    display: flex;
    justify-content: space-between;
  }
}
</style>