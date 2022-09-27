<template>
  <div>
    <iCard
      collapse
      :title="language('LK_GONGYINGSHANGPINGFEN', '供应商评分')"
      :defalutCollVal="status == '已完成' || !todo"
    >
      <template v-if="todo" slot="subInfo">
        <div
          :class="{
            danger: status == '未申请',
            warning: status == '未完成',
            success: status == '已完成',
          }"
          class="tishi"
        >
          <icon symbol :name="iconName[status] || ''" class="tishi-icon"></icon>
          <span class="status">{{ status }}</span>
        </div>
      </template>
      <template slot="header-control">
        <div class="button-box" v-if="!disabled">
          <div class="margin-right10" v-if="!todo">
            <iButton
              v-if="!editStatus"
              @click="editStatus = true"
              v-permission.auto="
                PARTSRFQ_EDITORDETAIL_RFQPENDING_SUPPLIERSCORE_EDIT |
                  供应商评分编辑
              "
              >{{ language("LK_BIANJI", "编辑") }}</iButton
            >
            <iButton
              v-if="editStatus"
              @click="cancel"
              v-permission.auto="
                PARTSRFQ_EDITORDETAIL_RFQPENDING_SUPPLIERSCORE_CANCEL |
                  供应商评分取消
              "
              >{{ language("LK_QUXIAO", "取 消") }}</iButton
            >
            <iButton
              v-if="editStatus"
              :loading="saveLoading"
              @click="handleSave"
              v-permission.auto="
                PARTSRFQ_EDITORDETAIL_RFQPENDING_SUPPLIERSCORE_SAVE |
                  供应商评分保存
              "
              >{{ language("LK_BAOCUN", "保存") }}</iButton
            >
            <iButton
              @click="setScoringDept"
              v-permission.auto="
                PARTSRFQ_EDITORDETAIL_RFQPENDING_SUPPLIERSCORE_SETSCOREDEPT |
                  供应商评分设置评分部门
              "
              >{{ language("LK_SHEZHIPINGFENBUMEN", "设置评分部门") }}</iButton
            >
          </div>
          <!-- <iButton @click="sendTaskForRating" v-permission.auto="PARTSRFQ_EDITORDETAIL_RFQPENDING_SUPPLIERSCORE_SETSCOREDEPT|供应商评分设置评分部门">{{ language('LK_TUISONGPINGFENRENWU','推送评分任务') }}</iButton> -->
          <iButton
            @click="setScoringPush"
            :loading="pushLoading"
            v-permission.auto="
              PARTSRFQ_EDITORDETAIL_RFQPENDING_SUPPLIERSCORE_PUSHSCORETASK |
                供应商评分推送评分任务
            "
            >{{ language("LK_TUISONGPINGFENRENWU", "推送评分任务") }}</iButton
          >
        </div>
      </template>
      <!-- <div class="card-header">
      <div class="card-title">
        <span class="title">{{ language('LK_GONGYINGSHANGPINGFEN','供应商评分') }}</span>
        
      </div>
    </div> -->
      <tablelist
        :tableData="tableListData"
        :tableTitle="tableTitle"
        :tableLoading="tableLoading"
        @handleSelectionChange="handleSelectionChange"
        :index="true"
        :supplierProducePlaces="supplierProducePlaces"
        :supplierProducePlacesLoading="supplierProducePlacesLoading"
        @supplierProducePlacesVisibleChange="supplierProducePlacesVisibleChange"
        @openActionPropsPage="openActionPropsPage"
        @openMultiHeaderPropsPage="openMultiHeaderPropsPage"
        :disabled="!editStatus || disabled"
        @link="link"
        v-permission.auto="
          PARTSRFQ_EDITORDETAIL_RFQPENDING_SUPPLIERSCORE_TABLE | 供应商评分列表
        "
      ></tablelist>
      <!------------------------------------------------------------------------>
      <!--                  表格分页                                          --->
      <!------------------------------------------------------------------------>
      <!-- <iPagination
        v-update
        @size-change="handleSizeChange($event, getTableList)"
        @current-change="handleCurrentChange($event, getTableList)"
        background
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :layout="page.layout"
        :current-page='page.currPage'
        :total="page.totalCount"
    /> -->
      <!------------------------------------------------------------------------>
      <!--                  备注弹框                                          --->
      <!------------------------------------------------------------------------>
      <tpb-remarks
        v-model="dialogRemarks"
        @submit="handleRemarksSubmit"
        :memo="memo"
        :disabled="disabled"
      />
      <scoringDeptDialog
        :visible.sync="scoringDeptVisible"
        :ids="[$route.query.id]"
        @update="updateTable"
        :tableData="tableListData"
      />
    </iCard>
    <scoringPushDialog
      :visible.sync="scoringPushVisible"
      :ids="[$route.query.id]"
      @update="getTableList"
      :factoryTableData="tableListData"
    />
  </div>
</template>

<script>
import { iCard, iPagination, iButton, iMessage, icon } from "rise";
import tablelist from "./supplierScoreTableList";
import { supplierScoreTitle, templateScoreTitle } from "./data";
import { pageMixins } from "@/utils/pageMixins";
import tpbRemarks from "./tpbRemarks";
import {
  getAllSupplier,
  setTpbMemo,
  sendTaskForRating,
  getRaterAndCoordinatorByDepartmentId,
  getSupplierProducePlace,
  updateBatchSupplierProducePlace,
} from "@/api/partsrfq/editordetail";
import { serialize } from "@/utils";
import store from "@/store";
import { rfqCommonFunMixins } from "pages/partsrfq/components/commonFun";
import scoringDeptDialog from "./scoringDeptDialog";
import scoringPushDialog from "./scoringPushDialog";
import axios from "axios";
import { cloneDeep } from "lodash";
import { iconName } from "@/views/partsrfq/editordetail/components/rfqPending/components/partDetaiList/data";

export default {
  components: {
    iCard,
    iPagination,
    tablelist,
    tpbRemarks,
    iButton,
    icon,
    scoringDeptDialog,
    scoringPushDialog,
  },
  mixins: [pageMixins, rfqCommonFunMixins],
  props: {
    todo: Boolean,
  },
  data() {
    return {
      iconName,
      tableListData: [],
      tableTitle: JSON.parse(JSON.stringify(supplierScoreTitle)),
      tableLoading: false,
      selectTableData: [],
      dialogRemarks: false,
      selectedRowData: {},
      scoringDeptVisible: false,
      scoringPushVisible: false,
      pushLoading: false,
      setScoringDeptVisible: false,
      templateScoreTitle: templateScoreTitle,
      tagName: "",
      getSupplierProducePlaceSource: null, // 请求CancelToken
      currentSupplierId: "",
      supplierProducePlaces: [],
      supplierProducePlacesLoading: false,
      editStatus: false,
      saveLoading: false,
    };
  },
  created() {
    this.tableTitle = JSON.parse(JSON.stringify(supplierScoreTitle));
    this.getTableList();
  },
  inject: ["getBaseInfo", "getbaseInfoData", "getDisabled"],
  computed: {
    disabled() {
      return this.getDisabled();
    },
    status() {
      return this.$store.state.rfq.todoObj["pushRateStatusDesc"].status;
    },
  },
  methods: {
    async getTableList() {
      const id = this.$route.query.id;

      if (!id) return;

      this.tableLoading = true;
      try {
        const req = {
          rfqId: id,
          userId: store.state.permission.userInfo.id,
          current: this.page.currPage,
          size: this.page.pageSize,
        };
        const res = await getAllSupplier(req);
        // const tpb = await getRaterAndCoordinatorByDepartmentId({'rfqId':id})
        // ,tpb.data ||
        this.tableTitle = JSON.parse(JSON.stringify(supplierScoreTitle));
        const tpb = res.data[0]
          ? res.data[0].rateEntity
            ? res.data[0].rateEntity
            : []
          : [];
        this.tableListData = this.trnaslateDataForView(res.data || [], tpb);
        this.page.totalCount = res.total;
        this.tableLoading = false;
        this.supplierProducePlaces = this.tableListData.map((item) => {
          if (!item.companyAddressCode && item.companyAddress) {
            item.companyAddressCode = item.companyAddress;
            item.isNoCodeData = true;
          }

          return {
            key: item.companyAddressCode,
            value: item.companyAddressCode,
            label: item.companyAddress,
            companyAddressAndCode:
              item.companyAddressCode + item.companyAddress,
          };
        });

        const baseInfo = this.getbaseInfoData();
        if (baseInfo.rfqType === "附件" || baseInfo.rfqType === "AFFIX") {
          const tableTitle = cloneDeep(this.tableTitle);

          tableTitle.forEach((item) => {
            if (Array.isArray(item.list) && item.list.length > 0) {
              item.list = item.list.filter(
                (item) =>
                  item.props.includes("rate") || item.props.includes("memo")
              );
            }
          });

          this.tableTitle = tableTitle;
        }
      } catch {
        this.tableLoading = false;
        this.supplierProducePlaces = [];
      }
    },
    sendTaskForRating() {
      if (!this.selectTableData.length)
        return iMessage.warn(
          this.language("NINHAIWEIXUANZEGONGS", "您当前还未选择供应商！")
        );
      this.pushLoading = true;
      sendTaskForRating(this.selectTableData)
        .then((res) => {
          if (res.code == 200) {
            iMessage.success(
              this.$i18n.locale === "zh" ? res.desZh : res.desEn
            );
          } else {
            iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
          }

          this.pushLoading = false;
        })
        .catch(() => (this.pushLoading = false));
    },
    trnaslateDataForView(data, vmdata) {
      const parmars = ["rate", "externaFee", "addFee", "confirmCycle", "memo"];

      vmdata.forEach((vmitems, vmindex) => {
        const templateTitleLast = JSON.parse(
          JSON.stringify(this.templateScoreTitle)
        );
        this.translateTile(vmindex, vmitems, parmars, templateTitleLast);
      });

      data.forEach((items, index) => {
        items.companyAddressAndCode =
          items.companyAddressCode + items.companyAddress;
        vmdata.forEach((vmitems, vmindex) => {
          const obj = {};
          parmars.forEach((item) => {
            // vmitems[item+(vmindex?vmindex:'')] = vmitems[item]
            obj[item + (vmindex ? vmindex : "")] = items.rateEntity
              ? items.rateEntity[vmindex]
                ? items.rateEntity[vmindex][item]
                : items.rateEntity[vmindex]
              : "";
          });
          items = Object.assign(items, obj);
        });
      });

      return data;
    },
    translateTile(index, data, parmars, templateTitleLast) {
      templateTitleLast.name = data.rateDepartNum;
      templateTitleLast.list.forEach((items) => {
        // parmars.forEach(v=>{
        items.props = items.props + (index ? index : "");
        // })
      });
      this.tableTitle.push(templateTitleLast);
    },
    openActionPropsPage(row) {
      const rfqId = this.$route.query.id;
      const supplierId = row.id;

      const params = serialize({
        rfqType: this.getbaseInfoData().rfqType,
        rfqId,
        supplierId,
      });
      this.$router.push({
        path: `/sourceinquirypoint/sourcing/partsrfq/editordetail/partScoring?${params}`,
      });
    },
    openMultiHeaderPropsPage(row, key) {
      this.selectedRowData = row;
      this.memo = row[key];
      this.tagName = row.rateEntity[+key.replace(/\D/g, "")]
        ? row.rateEntity[+key.replace(/\D/g, "")].tagName
        : "";
      this.dialogRemarks = true;
    },
    //修改表格改动列
    handleSelectionChange(val) {
      this.selectTableData = val;
    },
    async handleRemarksSubmit(memo) {
      const req = {
        memo,
        supplierId: this.selectedRowData.id,
        rfqId: this.$route.query.id,
        tagName: this.tagName,
      };
      const res = await setTpbMemo(req);
      this.resultMessage(res, () => {
        this.dialogRemarks = false;
        this.getTableList();
      });
    },
    // 设置评分部门
    setScoringDept() {
      this.scoringDeptVisible = true;
    },
    // 推送评分
    setScoringPush() {
      this.scoringPushVisible = true;
    },
    // 关闭设置部门后是否刷新表格
    updateTable(status) {
      if (status) {
        let dialogPage = "1";
        this.getBaseInfo(dialogPage);
        this.getTableList();
      }
    },
    supplierProducePlacesVisibleChange(status, data) {
      if (status) {
        // if (data.id === this.currentSupplierId) return
        this.supplierProducePlaces = [];
        this.currentSupplierId = data.id;
        this.getSupplierProducePlace(data.id);
      } else {
        // setTimeout(() => {
        //   this.supplierProducePlaces = this.tableListData.map(item => ({ key: item.companyAddressCode, value: item.companyAddressCode, label: item.companyAddress }))
        // }, 100)
      }
    },
    // 获取供应商生产地
    getSupplierProducePlace(supplierId) {
      if (!supplierId) return;

      if (this.getSupplierProducePlaceSource)
        this.getSupplierProducePlaceSource.cancel();
      this.getSupplierProducePlaceSource = axios.CancelToken.source();

      this.supplierProducePlacesLoading = true;
      getSupplierProducePlace({ supplierId })
        .then((res) => {
          if (res.code == 200) {
            this.supplierProducePlaces = Array.isArray(res.data)
              ? res.data.map((item) => ({
                  ...item,
                  key: item.code,
                  label: `${item.province}_${item.city}_${item.address}`,
                  value: item.code,
                  companyAddressAndCode:
                    item.code + item.province + item.city + item.address,
                }))
              : [];
          } else {
            iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
          }

          this.supplierProducePlacesLoading = false;
        })
        .catch(() => (this.supplierProducePlacesLoading = false));
    },
    cancel() {
      this.editStatus = false;
      console.log(this.tableListData);
      this.supplierProducePlaces = this.tableListData.map((item) => {
        return {
          key: item.companyAddressCode,
          value: item.companyAddressCode,
          label: item.companyAddress,
          companyAddressAndCode: item.companyAddressAndCode,
        };
      });
    },
    // 保存
    handleSave() {
      updateBatchSupplierProducePlace(
        this.tableListData.map((item) => ({
          companyAddress: item.companyAddress,
          companyAddressCode: item.isNoCodeData
            ? null
            : item.companyAddressCode,
          rfqBdlId: item.rfqBdlId,
        }))
      )
        .then((res) => {
          if (res.code == 200) {
            iMessage.success(
              this.$i18n.locale === "zh" ? res.desZh : res.desEn
            );
            this.getTableList();
          } else {
            iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn);
          }

          this.saveLoading = false;
        })
        .catch(() => (this.saveLoading = false));
    },
    // 列表link点击
    link(data, key) {
      switch (key) {
        case "shortNameZh":
          window.open(`xxxx?supplierId=${data.id}` /* SP4地址 */, "_blank");
          break;
        default:
      }
    },
  },
};
</script>

<style scoped>
</style>