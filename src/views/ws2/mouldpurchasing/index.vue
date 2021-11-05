<template>
  <el-tabs v-model="tab" class="tab">
    <el-tab-pane name="source">
      <div>
        <!-- <div class="flex-between-center-center topselectbar">
            <NavTabs :selectTab="selectTab" />
            <div class="btnList flex-align-center">
              <logButton @click="log" />
              <span class="cursor" @click="clickParts">
                <icon symbol name="icondatabaseweixuanzhong"></icon>
              </span>
            </div>
          </div> -->
        <!------------------------------------------------------------------------>
        <!--                  search 搜索模块                                   --->
        <!------------------------------------------------------------------------>
        <iSearch
          class="search-form"
          @sure="sure"
          @reset="reset"
          :resetKey="PARTSPROCURE_RESET"
          :searchKey="PARTSPROCURE_CONFIRM"
        >
          <el-form>
            <el-form-item :label="$t('MODEL-ORDER.LK_SAPBIANHAO')">
              <iInput
                :placeholder="$t('LK_QINGSHURU')"
                v-model="form['sapCode']"
              ></iInput>
            </el-form-item>
            <el-form-item :label="$t('MODEL-ORDER.LK_QIWANGGONGYINGSHANG')">
              <iInput
                placeholder="请输入供应商名或编号"
                @blur="validateSupplierCodeOrName(supplierCodeOrName)"
                v-model="supplierCodeOrName"
              />
            </el-form-item>
            <el-form-item :label="$t('LK_MIAOSHU')">
              <iInput
                :placeholder="$t('LK_QINGSHURU')"
                v-model="form['partNameZh']"
              ></iInput>
            </el-form-item>
            <el-form-item :label="$t('LK_CAIGOUZU')">
              <iInput
                :placeholder="$t('LK_QINGSHURU')"
                v-model="form['procureGroup']"
              />
            </el-form-item>
            <el-form-item :label="$t('LK_ZHUANGTAI')">
              <iSelect
                :placeholder="$t('LK_QINGXUANZE')"
                v-model="form['status']"
              >
                <el-option
                  value=""
                  :label="$t('all') | capitalizeFilter"
                ></el-option>
                <el-option value="1" label="已创建"> </el-option>
                <el-option value="2" label="已关联订单"> </el-option>
                <el-option value="3" label="订单已推送SAP"> </el-option>
                <el-option value="4" label="关闭"> </el-option>
              </iSelect>
            </el-form-item>
            <el-form-item :label="$t('MODEL-ORDER.LK_RISEBIANHAO')">
              <iInput
                :placeholder="$t('LK_QINGSHURU')"
                v-model="form['riseCode']"
              />
            </el-form-item>
            <el-form-item :label="$t('LK_CAIGOUGONGCHANG')">
              <iSelect
                :placeholder="$t('LK_QINGXUANZE')"
                v-model="form['procureFactory']"
              >
                <el-option
                  value=""
                  :label="$t('all') | capitalizeFilter"
                ></el-option>
                <el-option
                  v-for="(item, index) in splitPurchList"
                  :value="item.procureFactory"
                  :label="`${item.procureFactory}-${item.factoryName}`"
                  :key="index"
                >
                </el-option>
              </iSelect>
            </el-form-item>
            <el-form-item :label="$t('LK_KESHI')">
              <iInput
                :placeholder="$t('LK_QINGSHURU')"
                v-model="form['deptName']"
              />
            </el-form-item>
            <el-form-item :label="$t('MODEL-ORDER.LK_XUQIUGENZONGHAO')">
              <iInput
                :placeholder="$t('LK_QINGSHURU')"
                v-model="form['requestTraceNo']"
              />
            </el-form-item>
            <el-form-item :label="$t('LK_SHENQINGREN')">
              <iInput
                :placeholder="$t('LK_QINGSHURU')"
                v-model="form['applyBy']"
              />
            </el-form-item>
          </el-form>
        </iSearch>
        <iCard>
          <!------------------------------------------------------------------------>
          <!--                  table模块，向外入参表格数据，表头                    --->
          <!------------------------------------------------------------------------>
          <div class="margin-bottom20 clearFloat">
            <!-- <span class="font18 font-weight"> 备货列表 </span>
               -->
            <div class="floatright">
              <iButton @click="transferFrame">{{ $t("LK_ZHUANPAI") }}</iButton>
              <iButton @click="close">{{ $t("LK_GUANBI") }}</iButton>
              <iButton @click="importSAP">{{
                $t("MODEL-ORDER.LK_SAPDAORU")
              }}</iButton>
            </div>
          </div>
          <tablelist
            :tableData="tableListData"
            :tableTitle="tableTitle"
            :tableLoading="tableLoading"
            :stockCodeList="stockCodeList"
            @handleSelectionChange="handleSelectionChange"
            @openItemPage="openItemPage"
            @openOrderPage="openOrderPage"
            :activeItems="'partNum'"
          >
          </tablelist>
          <!------------------------------------------------------------------------>
          <!--                  表格分页                                          --->
          <!------------------------------------------------------------------------>
          <iPagination
            v-update
            @size-change="handleSizeChange($event, getTableListFn)"
            @current-change="handleCurrentChange($event, getTableListFn)"
            background
            :current-page="page.currPage"
            :page-sizes="page.pageSizes"
            :page-size="page.pageSize"
            :layout="page.layout"
            :total="page.totalCount"
          />
        </iCard>
        <transfer-dialog
          v-model="showTransfer"
          @handleTransfer="handleTransfer"
        />
        <import-sap-dialog
          v-model="showImport"
          @handleImportSap="handleImportSap"
        />
        <item-dialog
          @openOrderPage="openOrderPage"
          @handleSaveDetail="handleSaveDetail"
          v-model="showItem"
          :detailInfo="detailInfo"
          :isItem="true"
        />
      </div>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import {
  iPage,
  iCard,
  iPagination,
  iSearch,
  icon,
  iInput,
  iSelect,
  iMessage,
  iButton,
} from "rise";
import logButton from "./components/logButton";
import { pageMixins } from "@/utils/pageMixins";
import { tableTitle, form } from "./components/data";
import tablelist from "./components/tablelist";
import { getPurchaseOrder } from "@/api/ws2/modelOrder";
import { purchaseFactory } from "@/api/partsprocure/editordetail";
import {
  findNormalPrByPage,
  findNormalPrById,
  toOwner,
  sapRefresh,
  saveOrUpdate,
  applyClose,
} from "@/api/ws2/purchaserequest";
import { getDictByCode } from "@/api/dictionary";
import filters from "@/utils/filters";
// import NavTabs from "@/components/ws2/mouldTabs";
import ItemDialog from "./components/itemDialog.vue";
import ImportSapDialog from "./components/importSapDialog.vue";
import TransferDialog from "./components/transferDialog.vue";

export default {
  mixins: [pageMixins, filters],
  components: {
    iPage,
    iCard,
    tablelist,
    iPagination,
    iSearch,
    iInput,
    iSelect,
    logButton,
    icon,
    iButton,
    ItemDialog,
    ImportSapDialog,
    TransferDialog,
  },
  data() {
    return {
      tableListData: [],
      splitPurchList: [],
      tableLoading: false,
      tableTitle: tableTitle,
      selectTableData: [],
      form: form,
      startLoding: false,
      tab: "source",
      selectTab: 1,
      firstId: null,
      btntab1: 1,
      // svwDate: [], // 实施日期起止
      stockCodeList: [], //状态值
      supplierCodeOrName: "", // 供应商名称or供应商SAP号
      showItem: false, //项次
      showImport: false, //SAP导入
      showTransfer: false, //转派
      detailInfo: {},
    };
  },
  async created() {
    await Promise.all([
      this.getStockCodeList(),
      this.purchaseFactory(),
      this.getTableListFn(),
    ]);
  },
  methods: {
    // 获取状态值
    async getStockCodeList() {
      await getDictByCode("PR_STOCK_STATUS")
        .then((res) => {
          if (res.data) {
            this.stockCodeList = res?.data[0]?.subDictResultVo;
          }
        })
        .catch((err) => {
          this.getStockCodeList();
        });
    },
    //获取采购工厂列表
    purchaseFactory() {
      this.tableLoading = true;
      purchaseFactory({ firstId: this.firstId, isSparePart: false })
        .then((res) => {
          if (res.data) {
            this.splitPurchList = res.data;
            this.tableLoading = false;
          }
        })
        .catch((err) => (this.tableLoading = false));
    },

    //表格选中值集
    handleSelectionChange(val) {
      this.selectTableData = val;
    },
    // 获取零件采购项目相关信息
    getTableListFn() {
      this.tableLoading = true;
      this.form.pageSize = this.page.pageSize;
      this.form.currentPage = this.page.currPage;
      findNormalPrByPage(this.form)
        .then((res) => {
          this.tableLoading = false;
          this.tableListData = res.data?.records;
          // this.page.currPage = res.data?.current
          this.page.pageSize = res.data.size;
          this.page.totalCount = res.data.total;
        })
        .catch(() => (this.tableLoading = false));
    },
    // 判断用户输入供应商的Name还是SAPCode
    validateSupplierCodeOrName(queryString) {
      if (isFinite(+queryString)) {
        this.form.supplierSapCode = queryString;
        this.form.supplierNameZh = "";
        return queryString;
      } else {
        this.form.supplierNameZh = queryString;
        this.form.supplierSapCode = "";
        return queryString;
      }
    },
    // 查询
    sure() {
      this.page.currPage = 1;
      this.getTableListFn();
    },
    // 重置搜索条件
    reset() {
      for (let i in this.form) {
        this.form[i] = "";
      }
      this.form.type = "MPR";
      this.supplierCodeOrName = "";
      this.getTableListFn();
    },
    clickParts() {
      this.$router.push({
        path: "/priceorder/partsparameter",
      });
    },
    //转派
    transferFrame() {
      if (this.selectTableData.length == 0) {
        return iMessage.warn("请先选择数据");
      }
      this.showTransfer = true;
    },
    //关闭
    close() {
      let param = [];
      if (this.selectTableData.length == 0) {
        return iMessage.warn("请先选择数据");
      }
      let data = this.selectTableData;
      for (let index = 0; index < data.length; index++) {
        if (data[index].status == "2") {
          return iMessage.warn("仅未关联可进行关闭操作");
        }
        if (
          data[index].nominationStatus != "0" &&
          data[index].nominationStatus != "1"
        ) {
          return iMessage.warn("仅定点未完成可进行关闭操作");
        }
        param.push(data[index].purchasingRequirementId);
      }
      applyClose(param)
        .then((res) => {
          if (res.code == "200") {
            return iMessage.success(
              this.$i18n.locale === "zh" ? res.desZh : res.desEn
            );
          } else {
            return iMessage.error(
              this.$i18n.locale === "zh" ? res.desZh : res.desEn
            );
          }
        })
        .catch((err) => {});
    },
    //SAP导入
    importSAP() {
      this.showImport = true;
    },
    openItemPage(val) {
      let param = {
        sapCode: val.sapCode,
        sapItem: val.sapItem,
      };
      findNormalPrById(param)
        .then((res) => {
          if (res.data?.length > 0) {
            this.detailInfo = res.data[0];
          } else {
            this.detailInfo = {};
          }
          this.showItem = true;
        })
        .catch((err) => {});
    },
    // 零件号校验
    validate(e) {
      let reg = /^[A-Za-z0-9 ]+$/;
      if (e.target.value == "") {
        return;
      }
      if (!reg.test(e.target.value) && !e.target.value.includes(",")) {
        e.target.value = "";
        this.form.partNum = "";
        return iMessage.error("零件号输入有误，请重新输入");
      }
      // 包含英文逗号，但是不满足零件号英文大小写加数字
      if (e.target.value.includes(",")) {
        let temp = e.target.value.split(",");
        if (temp.length > 0) {
          temp.forEach((element) => {
            if (!reg.test(element)) {
              e.target.value = "";
              this.form.partNum = "";
              return iMessage.error("零件号输入有误，请重新输入");
            }
          });
        }
      }
    },
    //转派
    handleTransfer(val) {
      let param = val;
      param.normalPrList = this.selectTableData;
      toOwner(param)
        .then((res) => {
          if (res.code == "200") {
            this.showTransfer = false;
          }
        })
        .catch((err) => {});
      this.getTableListFn();
    },
    //SAP导入
    handleImportSap(param) {
      sapRefresh(param)
        .then((res) => {
          if (res.code == "200") {
            this.showImport = false;
          }
        })
        .catch((err) => {});
    },
    //保存
    handleSaveDetail(val) {
      let param = [val];
      saveOrUpdate(param)
        .then((res) => {
          if (res.code == "200") {
            this.showItem = false;
            this.getTableListFn();
          }
        })
        .catch((err) => {});
    },
    openOrderPage(val) {
      let param = {
        pageSize: 1,
        currentPage: 1,
        contractCode: val.contractRiseCode,
      };
      getPurchaseOrder(param)
        .then((res) => {
          if (res.code == 200 && res.data.records.length > 0) {
            let item = res.data.records;
            let routeData = this.$router.resolve({
              path: `/ws2/purchaseorder/PurchaseOrderDetails/1/${item[0].id}`,
            });
            window.open(routeData.href, "_blank");
          }
        })
        .catch((err) => {});
    },
  },
};
</script>
<style lang="scss" scoped>
.partsprocureHome {
  position: relative;

  .topselectbar {
    width: 100%;
    border-bottom: none;
  }
  .margin-bottom20 {
    margin-top: 20px;
  }

  .btnList {
    .btngroup {
      display: flex;
      flex-direction: row;
      cursor: pointer;
      > li {
        display: flex;
        align-items: center;
        justify-content: center;
        padding-left: 20px;
        padding-right: 20px;
        height: 16px;
        opacity: 0.58;
        &:not(:last-child) {
          border-right: 2px solid #909091;
        }
        > span {
          font-size: 18px;
          font-family: Arial;
          font-weight: 400;
          line-height: 25px;
          color: #000000;
          opacity: 0.42;
        }
        .activetest {
          font-weight: bold;
          color: #1660f1;
          opacity: 1;
        }
      }
    }
    > span {
      font-size: 20px;
      margin-left: 20px;

      // opacity: 0.5;
      .log {
        font-size: 16px;
        color: #1660f1;
        margin-left: 5px;
      }
    }
  }
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
    .tabs {
      display: flex;
      flex-direction: column;
      cursor: pointer;
      > ul {
        display: flex;
        flex-direction: row;
        > li {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 110px;
          font-size: 20px;
          font-family: Arial;
          font-weight: 400;
          line-height: 23px;
          color: #727272;
          opacity: 1;
        }
        .active {
          font-size: 20px;
          font-family: Arial;
          font-weight: bold;
          line-height: 23px;
          color: #000000;
          border-radius: 2px;
          padding-top: 5px;
          padding-bottom: 5px;
          border-bottom: 2px solid #1763f7;
        }
      }
    }
  }
}

.search-form {
  margin: 20px 0px;
}
</style>
