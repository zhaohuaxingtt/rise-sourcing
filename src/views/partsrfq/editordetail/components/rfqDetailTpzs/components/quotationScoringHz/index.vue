:<!--
 * @Author: yuszhou
 * @Date: 2021-05-28 14:32:04
 * @LastEditTime: 2021-06-02 16:17:39
 * @LastEditors: Please set LastEditors
 * @Description: 报价分析汇总表格
 * @FilePath: \front-web\src\views\partsrfq\editordetail\components\rfqDetailTpzs\components\quotationScoringHz\index.vue
-->
<template>
  <div style="position: relative">
    <div class="quotationHz margin-bottom20">
      <!--------------输入框模块-------------->
      <div class="search">
        <div class="needAddWhi" v-if="!disabel">
          <span>Fillter：</span>
          <iSelect
            v-model="backChoose"
            multiple
            :collapse-tags="true"
            @remove-tag="removeTags"
            @visible-change="visibleChange"
          >
            <el-option
              v-for="(items, index) in backChooseLists"
              :key="index"
              :label="items.label || items.name"
              :value="items.props || items.name"
            ></el-option>
          </iSelect>
        </div>
        <div v-if="showRound && !disabel">
          <span>Quotation Round：</span>
          <iSelect v-model="round" @change="changeRound" style="width: 100px">
            <el-option
              :label="items"
              :value="items"
              v-for="(items, index) in rundList"
              :key="index"
            ></el-option>
            <el-option label="Latest Offer" value="-1"></el-option>
          </iSelect>
        </div>
        <div v-if="!disabel">
          <span>Layout: </span>
          <iSelect v-model="layout" @change="changeLayout">
            <el-option label="FS-Parts as Row" value="1"></el-option>
            <el-option label="FS-Supplier as Row" value="2"></el-option>
            <el-option label="GS-Parts as Row" value="3"></el-option>
          </iSelect>
        </div>
      </div>
      <div class="btnSearch" v-if="!disabel && !isRoutePreview && !isApproval">
        <iButton
          @click="quote"
          v-if="quoteShow && !disabled && !rfqDisabled && showBtn"
          :loading="quoteInquiryPriceLoading"
          v-permission.auto="
            RFQ_DETAIL_TIPS_BAOJIAFENXIHUIZONGLINGJIAN_QUOTEINQUIRYPRICE |
              (报价分析汇总 - 零件 - 引用报价按钮)
          "
          >引用报价</iButton
        >
        <iButton
          @click="group"
          v-if="layout == '1' && !abPrice && !disabled && !rfqDisabled"
          v-permission.auto="
            RFQ_DETAIL_TIPS_BAOJIAFENXIHUIZONGLINGJIAN_GROUPBTN |
              (报价分析汇总 - 零件 - 组合按钮)
          "
          >组合</iButton
        >
        <iButton
          @click="removeGroup"
          v-if="layout == '1' && !abPrice && !disabled && !rfqDisabled"
          v-permission.auto="
            RFQ_DETAIL_TIPS_BAOJIAFENXIHUIZONGLINGJIAN_REMOVEBTN |
              (报价分析汇总 - 零件 - 取消组合按钮)
          "
          >取消组合</iButton
        >
        <!-- <iButton v-if='isKborJj == 1' @click="openjjdt">{{language('KAIBIAOJIEGUOANNIUJJYS','竞价结果')}}</iButton> -->
        <iButton
          v-if="isKborJj == 2 && !disabled && !rfqDisabled"
          @click="options.show = true"
          v-permission.auto="
            RFQ_DETAIL_TIPS_BAOJIAFENXIHUIZONGLINGJIAN_KBOJJBTN |
              (报价分析汇总 - 零件 - 开标结果按钮)
          "
          >{{ language("KAIBIAOJIEGUOANNIU", "开标结果") }}</iButton
        >
        <iButton
          @click="exportParts(layout)"
          v-permission.auto="
            RFQ_DETAIL_TIPS_BAOJIAFENXIHUIZONGLINGJIAN_DOWNLOADBTN |
              (报价分析汇总 - 零件导出按钮)
          "
          >{{ language("DAOCHU", "导出") }}</iButton
        >
        <iButton @click="openView" v-if="!preview">{{
          language("SOURCING_RFQDETAIL_FANGDACHAK", "预览")
        }}</iButton>
      </div>
      <!--------------表格模块-------------->
    </div>
    <template v-if="!hasNoBidOpen">
      <tableList
        ref="tableList"
        v-loading="fsTableLoading"
        @sortChangeTabless="sortChange"
        :round="round"
        :tableTitle="title"
        v-if="layout == '1' || layout == '3'"
        :ratingList="ratingList"
        :tableData="exampelData"
        @handleSelectionChange="handleSelectionChange"
      ></tableList>
      <tableListSupplier
        v-loading="supplierTableLoading"
        ref="tableSupplier"
        v-if="layout == '2'"
        :parentsData="tabelDataSupplier"
      ></tableListSupplier>
    </template>
    <template v-else>
      <span class="flex-center-center font18 noData">{{
        language(
          "BAOQIANDANGQIANWUFACHAKKBXX",
          "抱歉！当前轮次还未开标您无法查看报价汇总信息。"
        )
      }}</span>
    </template>
    <div v-html="tipsHtmlStr"></div>
    <!-- <div class="margin-top10 font-size14"><span style='color:red;font-size14px;'>*</span> means Invest or Develop Cost is amortized into piece price. </div>
    <div class="margin-top10 font-size14">/ means no calculation base for mixed price. </div>
    <div class="margin-top10 font-size14">Exchange Rate：1.00 EUR = 6.66RMB</div> -->
    <!-- <div class="margin-top10 font-size14">
      <div v-if="exchangeRatesOldVersions.length" class="margin-top10">
        <p v-for="(exchangeRate, index) in exchangeRatesOldVersions" :key="index">Exchange rate{{ exchangeRate.fsNumsStr ? ` ${ index + 1 }` : '' }}: {{ exchangeRate.str }}{{ exchangeRate.fsNumsStr ? `（${ exchangeRate.fsNumsStr }）` : '' }}</p>
      </div>
      <p v-if="exchangeRatesCurrentVersionStr">Current Exchange rate: {{ exchangeRatesCurrentVersionStr }}</p>
    </div> -->
    <!-- <tablelistGSasRow v-loading='fsTableLoading' @sortChangeTabless='sortChange' :round='round' :tableTitle='title' v-if='layout == "3"' :ratingList='ratingList' :tableData='exampelData' @handleSelectionChange='handleSelectionChange'></tablelistGSasRow> -->
    <!--------------弹窗-------------->
    <iDialog title="组合名" :visible.sync="groupVisble" width="25%">
      <div class="mine_height">
        <span>组合名：</span><iInput v-model="groupName" />
      </div>
      <template slot="footer">
        <iButton @click="groupVisble = false">取消</iButton>
        <iButton @click="sureClick()">确定</iButton>
      </template>
    </iDialog>
    <!-------开标结果------->
    <bidOpenResult
      :options="options"
      :round="round"
      :rundList="rundList"
    ></bidOpenResult>
  </div>
</template>
<script>
import { iButton, iSelect, iDialog, iInput, iMessage } from "rise";
import tableList from "./components/table";
import { roundsType } from "@/config";
import tableListSupplier from "./components/tableListSupplier";
import bidOpenResult from "./components/bidOpenResult";
import {
  exampelData,
  backChooseList,
  getRenderTableTile,
  translateData,
  translateRating,
  subtotal,
  defaultSort,
  showOrHide,
  getRowAndcolSpanArray,
  defaultLayoutTemplate,
} from "./components/data";
import {
  negoAnalysisSummaryLayout,
  negoAnalysisSummaryLayoutSave,
  negoAnalysisSummaryRound,
  fsPartsAsRow,
  gsPartsAsRow,
  negoAnalysisSummaryGroup,
  negoAnalysisSummaryGroupDelete,
  fsSupplierAsRow,
  quoteInquiryPrice,
  searchABPageExchangeRate,
  exportFSPartsAsRow,
  exportFsSupplierAsRow,
  exportGsPartsAsRow,
  exportFSPartsAsRowTWO,
  exportFsSupplierAsRowTWO,
  exportGsPartsAsRowTWO,
} from "@/api/partsrfq/editordetail";
import { getRfqInfo } from "@/api/costanalysismanage/rfqdetail";
export default {
  components: {
    iButton,
    iSelect,
    tableList,
    iDialog,
    iInput,
    tableListSupplier,
    bidOpenResult,
  },
  data() {
    return {
      exportTile: [],
      supplierLoading: false,
      title: getRenderTableTile([], 0, 1),
      exampelData: exampelData,
      groupSelectData: [],
      groupVisble: false,
      layout: "1",
      supplierData: [],
      supplierTile: [],
      //轮次选择
      round: "-1",
      rundList: [],
      backChooseLists: [],
      backChoose: "",
      ratingList: {
        firstTile: [],
        ratingList: [],
      },
      groupName: "",
      fsTableLoading: false,
      supplierTableLoading: false,
      reRenderLastChild: "",
      suppliertopList: [],
      supplierLeftLit: [],
      showRound: true,
      quoteShow: true,
      partInfoList: [],
      bdlPriceTotalInfoList: [],
      oldExampelData: [],
      templateSummary: 1,
      disabel: false,
      showTable: true,
      cWidth: "0px",
      abPrice: false,
      kmAPrice: "",
      budget: "",
      kmTooling: "",
      quoteInquiryPriceLoading: false,
      options: { show: false },
      roundsType,
      DataRoundsType: "",
      exchangeRatesCurrentVersionStr: "",
      exchangeRatesOldVersions: [],
      hasNoBidOpen: false,
      tabelDataSupplier: {},
      tipsHtmlStr: "",
      rfqDisabled: false,
    };
  },
  watch: {
    /**
     * @description:当前界面是否处于一个disble模式。取决于当前路由中是否存在 isPreview 字段
     * @param {*}
     * @return {*}
     */
    $route: function () {
      try {
        if (this.$route.query.isPreview == 1) {
          this.disabel = true;
        } else {
          this.disabel = false;
        }
      } catch (error) {
        this.disabel = false;
      }
    },
  },
  inject: ["getbaseInfoData", "getDisabled"],
  computed: {
    disabled() {
      return typeof this.getDisabled === "function"
        ? this.getDisabled()
        : this.getRfqInfo();
    },
    //判断当前是开标还是竞价，需要对按钮做不同的展示。
    isKborJj() {
      if (this.DataRoundsType == this.roundsType.zxjjys) return 1;
      if (this.DataRoundsType == this.roundsType.zxkb) return 2;
      return 0;
    },
    isRoutePreview() {
      return this.$route.query.isPreview == 1;
    },
    isApproval() {
      return this.$route.query.isApproval === "true";
    },
    // 已定点，不展示引用价格按钮
    showBtn() {
      return !["NOMINATED"].includes(this.rfqInfoData.currentStatus);
    },
  },
  created() {
    if (this.isRoutePreview) {
      this.layout = "2";
    } else {
      this.layout = this.getLayoutDetaultNumber();
    }
    this.searchABPageExchangeRate();
  },
  mounted() {
    this.init();
  },
  provide() {
    return { vm: this };
  },
  props: {
    preview: Boolean,
    rfqInfoData: { type: Object, default: () => ({}) },
  },
  methods: {
    /**
     * @description: 点击进入竞价大厅。
     * @param {*}
     * @return {*}
     */
    openView() {
      let routerView = this.$router.resolve({
        path: "/sourceinquirypoint/sourcing/previewfssugs",
        query: {
          id: this.$route.query.id,
        },
      });
      window.open(routerView.href, "_blank");
    },

    openjjdt() {
      alert("online-bidding 暂未提供跳转url,稍等片刻...");
    },
    getLayoutDetaultNumber() {
      try {
        const partProjectType = this.$route.query.businessKey;
        if (!partProjectType) return "1";
        if (defaultLayoutTemplate[partProjectType])
          return defaultLayoutTemplate[partProjectType];
        return "1";
      } catch (error) {
        return "1";
      }
    },
    removeTags() {
      this.negoAnalysisSummaryLayoutSave();
    },
    /**
     * @description: 排除group total km buget 列不需要排序外，其他的都是需要排序的列。
     * @param {*} props -表格中返回的标识。正排序 还是 反排序 还是 默认
     *            prop  - 表格中的排序字段 名字叫啥
     * @return {*}
     */
    sortChange({ props, prop }) {
      try {
        const notSortData = this.oldExampelData.filter(
          (items) =>
            (items.groupId != null && items.groupId != "-") || items.groupIdTemp
        );
        const sortData = this.oldExampelData.filter(
          (items) => items.groupId == null && items.groupId != "-"
        );
        const totalData = this.oldExampelData.filter(
          (items) => items.groupId == "-" && !items.groupIdTemp
        );

        if (props == "ascending") {
          this.exampelData = [
            ...notSortData,
            ..._.orderBy(
              sortData,
              [
                prop === "partNo"
                  ? (item) => (item[prop] ? item[prop].substring(3, 9) : "")
                  : (item) => +item[prop],
              ],
              ["asc"]
            ),
            ...totalData,
          ];
        } else if (props == "descending") {
          this.exampelData = [
            ...notSortData,
            ..._.orderBy(
              sortData,
              [
                prop === "partNo"
                  ? (item) => (item[prop] ? item[prop].substring(3, 9) : "")
                  : (item) => +item[prop],
              ],
              ["desc"]
            ),
            ...totalData,
          ];
        } else {
          this.exampelData = this.oldExampelData;
        }
      } catch (error) {
        this.exampelData = this.oldExampelData;
      }
    },
    changeRound() {
      this.backChoose = "";
      this.init();
    },
    /**
     * @description: 切换tempalte展示
     * @param {*} res
     * @return {*}
     */
    changeLayout(res) {
      this.layout = res;
      this.init();
    },
    removeGroup() {
      if (this.groupSelectData.length == 0) {
        iMessage.warn("抱歉！您还未选择零件！");
        return;
      }
      if (this.groupSelectData[0].groupId == null) {
        iMessage.warn("抱歉！您选中的零件还未组合，无法取消");
        return;
      }
      this.negoAnalysisSummaryGroupsDelete();
    },
    /**
     * @description: 确认组合
     * @param {*}
     * @return {*}
     */
    sureClick() {
      const realGroupSelectData = this.groupSelectData.filter(
        (item) => !item.groupId
      );
      //新增需求，如果零件采购项目不一致，需要提示文案但是不影响这个组合的效果
      if (
        realGroupSelectData.some(
          (item) => item.carProType != realGroupSelectData[0].carProType
        )
      )
        iMessage.warn(
          "您的组合项中，存在车型项目不一致的情况，MixPrice将不展示！"
        );

      this.negoAnalysisSummaryGroups();
      this.groupVisble = false;
    },
    getPartNumber(list) {
      const listArray = [];
      list.forEach((element) => {
        listArray.push(element.partPrjCode);
      });
      return listArray;
    },
    getPartGroupNumber() {
      const listArray = [];
      this.groupSelectData.forEach((element) => {
        listArray.push(element.groupId);
      });
      return listArray;
    },
    /**
     * @description:取消组合零件
     * @param {*}
     * @return {*}
     */
    negoAnalysisSummaryGroupsDelete() {
      const sendata = {
        groupIdList: this.getPartGroupNumber(),
        rfqId: this.$route.query.id,
        scenarioType: this.templateSummary,
      };
      negoAnalysisSummaryGroupDelete(sendata)
        .then((res) => {
          if (res.code == 200) {
            this.fsPartsAsRow();
          } else {
            iMessage.warn(res.desZh);
          }
        })
        .catch((err) => {
          iMessage.warn(err.desZh);
        });
    },
    /**
     * @description:组合零件
     * @param {*}
     * @return {*}
     */
    negoAnalysisSummaryGroups() {
      const sendata = {
        groupName: this.groupName,
        partPrjCode: this.getPartNumber(
          this.groupSelectData.filter((item) => !item.groupId)
        ),
        rfqId: this.$route.query.id,
        scenarioType: this.templateSummary,
      };
      negoAnalysisSummaryGroup(sendata)
        .then((res) => {
          if (res.code == 200) {
            this.fsPartsAsRow();
          } else {
            iMessage.warn(res.desZh);
          }
        })
        .catch((err) => {
          iMessage.warn(err.desZh);
        });
    },
    async init() {
      await this.negoAnalysisSummaryRound(); //获取轮次
      await this.negoAnalysisSummaryLayout(this.layout); //获取隐藏项
      if (this.layout == 1) {
        await this.fsPartsAsRow();
      } else if (this.layout == 2) {
        await this.supplierfsSupplierAsRow();
      } else {
        await this.fsPartsAsRow();
      }
    },
    visibleChange(res) {
      if (!res) {
        this.negoAnalysisSummaryLayoutSave();
      }
    },
    /**
     * @description: 获取隐藏打开项
     * @param {*}
     * @return {*}
     */
    negoAnalysisSummaryLayout(type) {
      this.backChooseLists = backChooseList(this.layout);
      let hostId = this.$route.query.id || this.$route.query.desinateId;
      return negoAnalysisSummaryLayout(type, this.templateSummary, hostId)
        .then((res) => {
          if (res.data && res.data.layout) {
            this.backChoose = JSON.parse(res.data.layout); //
          } else {
            this.backChoose = "";
          }
          if (this.backChoose === "") {
            //特殊逻辑处理，如果第一次进来，隐藏项为空。则认为用户没有设置过，需要将默认隐藏项设置好。
            if (type == 2) {
              this.backChoose = [
                "EBR",
                "Volume",
                "Invest Budget",
                "Prod. Loc.",
                "Dev.\nCost",
                "Supplier \nSOP Date",
                "Total\n Turnover",
              ];
            }
            if (type == 3) {
              this.backChoose = ["currentShare", "currentLtc", "currentTto"];
            }
          }
        })
        .catch((err) => {
          iMessage.warn(err.desZh);
        });
    },
    /**
     * @description: 保存隐藏打开项
     * @param {*}
     * @return {*}
     */
    negoAnalysisSummaryLayoutSave() {
      let hostId = this.$route.query.id || this.$route.query.desinateId;
      negoAnalysisSummaryLayoutSave(
        JSON.stringify(this.backChoose),
        this.layout,
        hostId,
        this.templateSummary
      )
        .then(async (res) => {
          if (res.code == 200) {
            this.init();
          }
        })
        .catch((err) => {
          iMessage.warn(err.desZh);
        });
    },
    /**
     * @description: 获取报价轮次
     * @param {*}
     * @return {*}
     */
    negoAnalysisSummaryRound() {
      //兼容定点管理界面，无法拿到rfqID，定点管理这个接口也不需要请求。
      if (!this.$route.query.id) return;
      negoAnalysisSummaryRound(this.$route.query.id)
        .then((res) => {
          if (res.code == 200 && res.data) {
            this.rundList = res.data;
          }
        })
        .catch((err) => {
          iMessage.warn(err.desZh);
        });
    },
    /**
     * @description: 勾选方法
     * @param {*} val
     * @return {*}
     */
    handleSelectionChange(val) {
      this.groupSelectData = val;
    },
    /**
     * @description: 获取数据。
     * @param {*}
     * @return {*}
     */
    fsPartsAsRow() {
      this.fsTableLoading = true;
      this.clearDataFs();
      // eslint-disable-next-line no-unexpected-multiline
      this.changeFnForGSandFS(this.layout)
        .then((res) => {
          this.fsTableLoading = false;
          if (res.data && res.data.partInfoList && res.data.partInfoList) {
            this.DataRoundsType = res.data.roundsType;
            this.hasNoBidOpen = res.data.hasNoBidOpen;
            this.partInfoList = res.data.partInfoList;
            this.bdlPriceTotalInfoList = res.data.bdlPriceTotalInfoList;
            const relTitle = getRenderTableTile(
              this.backChoose,
              res.data.partInfoList[0].bdlInfoList.length,
              this.layout
            );
            this.title = relTitle.title;
            console.log(relTitle);
            this.exportTile = relTitle.allExportHiddenOrShow;
            this.reRenderLastChild = relTitle.xhLastChildProps;
            this.exampelData = defaultSort(
              translateData(res.data.partInfoList),
              "groupId"
            );
            this.ratingList = translateRating(
              res.data.partInfoList,
              res.data.bdlRateInfoList
            );
            const subtotalList = subtotal(
              this.title,
              this.exampelData,
              res.data.bdlPriceTotalInfoList,
              this.layout == 1
            );
            this.exampelData = this.exampelData.reduce((accu, curr, index) => {
              if (index === this.exampelData.length - 1) {
                return [...accu, curr, ...subtotalList];
              }
              if (
                curr.groupId &&
                curr.groupId !== this.exampelData[index + 1].groupId
              ) {
                // eslint-disable-next-line no-undef
                const subtotalItem = _.remove(subtotalList, function (n) {
                  return n.groupIdTemp == curr.groupId;
                });
                return [...accu, curr, ...subtotalItem];
              }
              return [...accu, curr];
            }, []);
            this.oldExampelData = _.cloneDeep(this.exampelData);
            // this.oldExampelData = JSON.parse(JSON.stringify(this.exampelData))
            this.$nextTick(() => {
              this.$refs.tableList.setfixElement();
            });
          }

          if (res.data) {
            const tips = Array.isArray(res.data.tips) ? res.data.tips : [];
            this.tipsHtmlStr = tips
              .map((item) => {
                let str = typeof item === "string" ? item : "";

                return /^\*.*/.test(str)
                  ? item.replace(
                      /^\*(.*)/,
                      '<div class="margin-top10 font-size14"><span style="color:red;font-size14px;">*</span>$1</div>'
                    )
                  : str
                  ? `<div class="margin-top10 font-size14">${str}</div>`
                  : "";
              })
              .join("");
          } else {
            this.tipsHtmlStr = "";
          }
        })
        .catch((err) => {
          this.clearDataFs();
          this.fsTableLoading = false;
          console.error(err);
        });
    },
    group() {
      if (this.groupSelectData.length == 0)
        return iMessage.warn(
          this.language("QINGXUANZENINYAOZUHEDEXIANG", "请选择您要组合的项")
        );
      if (this.groupSelectData.length == 1)
        return iMessage.warn(
          this.language("QINGZHISHAOXUANZENIANGXIANGZUHE", "请至少选择两项组合")
        );
      if (this.groupSelectData.filter((item) => !item.groupId).length == 1)
        return iMessage.warn(
          this.language(
            "QINGZHISHAOXUANZENIANGXIANGFEIYIZUHEDESHUJU",
            "请至少选择两项非已组合的数据"
          )
        );

      this.groupVisble = !this.groupVisble;
    },
    async quote() {
      await this.$confirm(
        this.language(
          "SHIFOUYINYONGXUNJIALUNCIBAOJIA",
          "是否引用询价轮次报价？"
        ),
        this.language("YINYONGXUNJIALUNCIBAOJIA", "引用询价轮次报价"),
        {
          confirmButtonText: this.language("SHI", "是"),
          cancelButtonText: this.language("FOU", "否"),
        }
      );

      this.quoteInquiryPriceLoading = true;
      try {
        const res = await quoteInquiryPrice({
          rfqId: this.$route.query.id,
        });

        const message = this.$i18n.locale === "zh" ? res.desZh : res.desEn;
        if (res.code == 200) {
          iMessage.success(message);
        } else {
          iMessage.error(message);
        }
      } catch (e) {
        console.log(e);
      } finally {
        this.quoteInquiryPriceLoading = false;
      }
    },
    /**
     * @description:获取供应商横轴
     * @param {*}
     * @return {*}
     */
    supplierfsSupplierAsRow() {
      this.backChooseList = [];
      this.tabelDataSupplier = [];
      return new Promise((r) => {
        this.supplierTableLoading = true;
        fsSupplierAsRow(this.$route.query.id, this.round, this.backChoose)
          .then((res) => {
            this.supplierTableLoading = false;
            if (res.code == 200 && res.data) {
              this.tabelDataSupplier = getRowAndcolSpanArray(res.data);
              this.backChooseLists = res.data.header || [];

              const tips = Array.isArray(res.data.tips) ? res.data.tips : [];
              this.tipsHtmlStr = tips
                .map((item) => {
                  let str = typeof item === "string" ? item : "";

                  return /^\*.*/.test(str)
                    ? item.replace(
                        /^\*(.*)/,
                        '<div class="margin-top10 font-size14"><span style="color:red;font-size14px;">*</span>$1</div>'
                      )
                    : str
                    ? `<div class="margin-top10 font-size14">${str}</div>`
                    : "";
                })
                .join("");
              r();
            } else {
              this.tipsHtmlStr = "";
              r();
            }
          })
          .catch((err) => {
            this.supplierTableLoading = false;
            iMessage.error(err.desZh);
          });
      });
    },
    changeFnForGSandFS(type) {
      if (type == 1) {
        return fsPartsAsRow(this.$route.query.id, this.round);
      } else {
        return gsPartsAsRow(this.$route.query.id, this.round);
      }
    },
    clearDataFs() {
      this.partInfoList = [];
      this.bdlPriceTotalInfoList = [];
      this.title = [];
      this.reRenderLastChild = [];
      this.exampelData = [];
      this.ratingList = [];
    },
    searchABPageExchangeRate() {
      if (!this.$route.query.desinateId) return;

      searchABPageExchangeRate(this.$route.query.desinateId).then((res) => {
        if (res.code == 200) {
          const sourceData = Array.isArray(res.data) ? res.data : [];

          const currentVersion = sourceData.find(
            (item) => item.isCurrentVersion
          );
          const exchangeRatesCurrentVersion = currentVersion
            ? Array.isArray(currentVersion.exchangeRateVos)
              ? currentVersion.exchangeRateVos
              : []
            : [];
          this.exchangeRatesCurrentVersionStr = exchangeRatesCurrentVersion
            .map((item) => this.exchangeRateProcess(item))
            .join(", ");

          const oldVersions = sourceData.filter(
            (item) => !item.isCurrentVersion
          );
          this.exchangeRatesOldVersions = oldVersions
            .filter(
              (item) =>
                Array.isArray(item.exchangeRateVos) &&
                item.exchangeRateVos.length
            )
            .map((item) => ({
              version: item.exchangeRateVos[0].version,
              str: item.exchangeRateVos
                .map((item) => this.exchangeRateProcess(item))
                .join(", "),
              fsNumsStr: Array.isArray(item.fsNums)
                ? item.fsNums.join("、")
                : "",
            }));
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
        }
      });
    },
    // 汇率显示处理
    exchangeRateProcess(row) {
      return `100${row.currencyCode} = ${math
        .multiply(math.bignumber(row.exchangeRate || 0), 100)
        .toString()}${row.originCurrencyCode}`;
    },
    //导出
    exportParts(layout) {
      if (layout === "1") {
        return exportFSPartsAsRow(
          this.$route.query.id,
          this.round,
          this.exportTile
        );
      } else if (layout === "2") {
        return exportFsSupplierAsRow(
          this.$route.query.id,
          this.round,
          this.backChoose
        );
      } else {
        return exportGsPartsAsRow(
          this.$route.query.id,
          this.round,
          this.exportTile
        );
      }
    },
    //导出
    exportPartsTwo(layout) {
      return new Promise((r) => {
        if (layout === "1") {
          const res1 = exportFSPartsAsRowTWO(
            this.$route.query.id,
            this.round,
            this.exportTile
          );
          r(res1);
        } else if (layout === "2") {
          const res2 = exportFsSupplierAsRowTWO(
            this.$route.query.id,
            this.round,
            this.backChoose
          );
          r(res2);
        } else {
          const res3 = exportGsPartsAsRowTWO(
            this.$route.query.id,
            this.round,
            this.exportTile
          );
          r(res3);
        }
      });
    },
    getRfqInfo() {
      getRfqInfo({
        rfqId: this.$route.query.id,
      }).then((res) => {
        if (res.code == 200) {
          this.rfqDisabled = !!res.data.isFreeze;
        }
      });

      return false;
    },
  },
};
</script>
<style lang='scss' scoped>
.noData {
  margin-top: 10px;
  margin-bottom: 10px;
  border: 1px solid ghostwhite;
  padding: 20px;
  text-align: center;
}
.mine_height {
  min-height: 100px;
  display: flex;
  span {
    width: 100px;
    line-height: 35px;
  }
}
.quotationHz {
  display: flex;
  justify-content: space-between;
  .search {
    & > div {
      float: left;
      margin-right: 10px;
      display: flex;
      justify-content: space-between;
      span {
        // width: 160px;
        margin-right: 20px;
        line-height: 30px;
        font-size: 14px;
      }
    }
  }
}
.needAddWhi {
  width: 400px;
}
</style>
