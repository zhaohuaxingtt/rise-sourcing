<!--
 * @Author: yuszhou
 * @Date: 2021-06-29 17:02:51
 * @LastEditTime: 2022-03-31 14:32:01
 * @LastEditors: YoHo
 * @Description: In User Settings Edit
-->
<template>
  <iPage class="out-souring-order">
    <headerNav />
    <iSearch class="margin-bottom7" @sure="sure" @reset="reset()">
      <el-form>
        <template v-for="(items, index) in searchForm">
          <el-form-item
            :label="language(items.i18nKey, items.i18nName)"
            :key="index"
          >
            <template v-if="items.type == 'input'">
              <iInput
                clearable
                v-model="form[items.moduleKey]"
                :placeholder="language('QINGITANXIE', '请填写')"
              />
            </template>
            <template v-else-if="items.type == 'datepicker'">
              <iDatePicker
                clearable
                v-model="form[items.moduleKey]"
                value-format="yyyy-MM-dd HH:mm:ss"
              >
              </iDatePicker>
            </template>
            <template v-else-if="items.type == 'partNum'">
              <iMultiLineInput
                :placeholder="
                  language(
                    'partsprocure.PARTSPROCURE',
                    '请输入零件号，多个逗号分隔'
                  )
                "
                :title="
                  language('partsprocure.PARTSPROCUREPARTNUMBER', '零件号')
                "
                v-model="form['partNumStr']"
              ></iMultiLineInput>
            </template>
            <template v-else>
              <iSelect
                clearable
                v-model="form[items.moduleKey]"
                :placeholder="language('QINGXUANZE', '请选择')"
              >
                <el-option
                  :label="language('ALL', '全部')"
                  value=""
                ></el-option>
                <el-option
                  v-for="(item, i) in selectOptions[items.selectOptions]"
                  :key="i"
                  :label="$i18n.locale == 'zh' ? item.name : item.nameEn"
                  :value="item.code"
                ></el-option>
              </iSelect>
            </template>
          </el-form-item>
        </template>
      </el-form>
    </iSearch>
    <iCard>
      <div class="margin-bottom20 clearFloat">
        <div class="showMe">
          <span>{{ $t("MODEL-ORDER.LK_JINKANZIJI") }}</span>
          <el-switch
            v-model="form['isOwn']"
            @change="showOnlyMyselfData($event)"
            active-color="#67C23A"
            inactive-color="#cccccc"
          ></el-switch>
        </div>
        <div class="floatright btns">
          <iButton
            @click="createSignSheet"
            permissionKey="SOURCEINQUIRYPOINT_OUTSOURINGORDER_XINJIAN"
          >
            {{ language("LK_XINJIANNEW", "新建") }}
          </iButton>
          <!-- 删除 -->
          <iButton
            @click="deleteItem"
            permissionKey="SOURCEINQUIRYPOINT_OUTSOURINGORDER_SHANCHU"
          >
            {{ language("SHANCHU", "删除") }}
          </iButton>
          <!-- 转派 -->
          <iButton
            @click="handleBatchTransation"
            permissionKey="SOURCEINQUIRYPOINT_OUTSOURINGORDER_ZHUANPAI"
          >
            {{ language("ZHUANPAI", "转派") }}
          </iButton>
          <!-- 签收 -->
          <iButton
            @click="handleBatchSingn"
            permissionKey="SOURCEINQUIRYPOINT_OUTSOURINGORDER_QIANSHOU"
          >
            {{ language("QIANSHOU", "签收") }}
          </iButton>
          <!-- 退回 -->
          <iButton
            @click="handleBatchReject(true)"
            permissionKey="SOURCEINQUIRYPOINT_OUTSOURINGORDER_TUIHUI"
          >
            {{ language("TUIHUI", "退回") }}
          </iButton>
          <!-- 关闭 -->
          <iButton
            @click="handleBatchClose(true)"
            permissionKey="SOURCEINQUIRYPOINT_OUTSOURINGORDER_GUANBI"
          >
            {{ language("LK_GUANBI", "关闭") }}
          </iButton>
          <buttonTableSetting @click="edittableHeader"></buttonTableSetting>
        </div>
      </div>
      <!-- radio 单选数据 -->
      <tablePart
        ref="tableList"
        :lang="true"
        @handleSelectionChange="(row) => (selectRow = row)"
        :tableData="tableData"
        :tableTitle="tableTitle"
        :tableLoading="tableLoading"
        index
        indexFixed
      >
        <template #riseCode="scope">
          <span
            class="openLinkText cursor"
            @click="viewNominationDetail(scope.row)"
          >
            {{ scope.row.riseCode }}
          </span>
        </template>
        <template #subType="scope">
          <span>{{ getSubType(scope.row.subType) }}</span>
        </template>
        <template #status="scope">
          <el-tooltip
            v-if="scope.row.status == '-1'"
            class="item"
            effect="light"
            :content="
              scope.row.rejectReason != null
                ? scope.row.rejectReason
                : $t('LK_YUANYINBUXIANG')
            "
            placement="top"
          >
            <iText
              >{{ getStatus(scope.row.status, scope.row.nominationStatus)
              }}<icon class="el-icon-warning-outline red"
            /></iText>
          </el-tooltip>
          <span v-else>{{
            getStatus(scope.row.status, scope.row.nominationStatus)
          }}</span>
        </template>
        <template #nominationStatus="scope">
          <span>{{
            scope.row["nominationStatus"] == "1"
              ? language("YIZHUANDINGDIAN", "已转定点")
              : scope.row["nominationStatus"] == 2
              ? language("YDD", "已定点")
              : language("WEIFAQIZHUANDINGDIAN", "未发起转定点")
          }}</span>
        </template>
        <template #buyerCode="scope">
          {{ scope.row.ownerName || scope.row.ownerId || "-" }}
        </template>
      </tablePart>
      <!------------------------------------------------------------------------>
      <!--                  表格分页                                          --->
      <!------------------------------------------------------------------------>
      <iPagination
        v-update
        @size-change="handleSizeChange($event, getOutsouringFindBypage)"
        @current-change="handleCurrentChange($event, getOutsouringFindBypage)"
        background
        :page-sizes="page.pageSizes"
        :page-size="page.pageSize"
        :layout="page.layout"
        :current-page="page.currPage"
        :total="page.totalCount"
      />
    </iCard>

    <!------------------------------------------------------------------------>
    <!--                  删除弹窗                                       --->
    <!------------------------------------------------------------------------>
    <delete-dialog
      ref="delete"
      :dialogVisible="deleteDialogVisible"
      @handleBack="handleBatchDelete"
      @changeVisible="deleteDialogVisible = false"
    />

    <!------------------------------------------------------------------------>
    <!--                  退回EPS弹窗                                       --->
    <!------------------------------------------------------------------------>
    <backEps
      ref="backEPS"
      :mode="mode"
      :dialogVisible="backDialogVisible"
      @handleBack="handleBackEPS"
      @changeVisible="
        (val) =>
          mode == 'back' ? handleBatchReject(false) : handleBatchClose(false)
      "
    />
    <!------------------------------------------------------------------------>
    <!--                     转派                                          --->
    <!------------------------------------------------------------------------>
    <transfer-dialog
      v-model="showTransfer"
      :transferLoading="transferLoading"
      @handleTransfer="handleTransfer"
      ref="transfer"
    />
    <!------------------------------------------------------------------------>
    <!---                                 签 收                            --->
    <!------------------------------------------------------------------------>
    <turning-point-dialog
      v-model="showPoint"
      @handleTurningPoint="handleTurningPoint"
      ref="turnpoint"
    />
  </iPage>
</template>
<script>
import {
  iPage,
  iSearch,
  iCard,
  iSelect,
  iInput,
  iButton,
  iPagination,
  iMessage,
  icon,
  iDatePicker,
  iMultiLineInput,
} from "rise";
import headerNav from "@/components/headerNav";
import backEps from "./components/backEps";
import deleteDialog from "./components/deleteDialog";
import {
  searchForm,
  form,
  tableTitle,
  addType,
  statusList,
} from "./components/data";
import {
  outsouringFindBypage,
  signByLinie,
  rejectByLinie,
  deleteOutSouring,
  closeOutSouringOrder,
} from "@/api/outsouringorder";
import { toOwner } from "@/api/ws2/purchaserequest";
import { pageMixins } from "@/utils/pageMixins";
import tablePart from "@/components/iTableSort";
import { tableSortMixins } from "@/components/iTableSort/tableSortMixins";
import buttonTableSetting from '@/components/buttonTableSetting'
import { getDepartmentsCombo } from "@/api/ws2/purchase/investmentList";
import TransferDialog from "./components/transferDialog.vue";
import TurningPointDialog from "./components/turningPointDialog.vue";
import { getDictByCode } from "@/api/dictionary";
import { purchaseFactory } from "@/api/partsprocure/editordetail";

// eslint-disable-next-line no-undef
export default {
  mixins: [pageMixins, tableSortMixins],
  components: {
    iPage,
    iSearch,
    iCard,
    iSelect,
    iInput,
    iButton,
    iPagination,
    iDatePicker,
    tablePart,
    iMultiLineInput,
    icon,
    headerNav,
    TurningPointDialog,
    TransferDialog,
    backEps,
    deleteDialog,
    buttonTableSetting
  },
  data() {
    return {
      selectOptions: {
        subTypeOption: addType,
        statusOption: statusList,
        procureFactoryOption: [],
      },
      backDialogVisible: false,
      searchForm,
      form: JSON.parse(JSON.stringify(form)),
      tableTitle: tableTitle,
      tableLoading: false,
      tableData: [],
      selectRow: [],
      addType: addType,
      mode: "back",
      showTransfer: false,
      transferLoading: false,
      showPoint: false, //转定点
      deleteDialogVisible: false,
    };
  },
  computed: {
    ...Vuex.mapState({
      userId: (state) => state.permission.userInfo?.id || "",
    }),
  },
  created() {
    this.initSelectOptions();
    this.getOutsouringFindBypage();
    console.log(this.userInfo);
  },
  methods: {
    // 检查用户是否有操作权限
    checkUser() {
      let msg = "";
      this.selectRow.forEach((item) => {
        if (![item.ownerId, item.applyId].includes(this.userId)) {
          msg += item.riseCode + ",";
        }
      });
      if (msg) msg = "无 " + msg + " 操作权限";
      return msg;
    },
    // 新建采購申請
    createSignSheet() {
      // const { herf } = this.$router.resolve({
      // 	path: '/partsign/outsouringorder/addoutsourcing/details',
      // })
      window.open(
        "/sourcing/#/partsign/outsouringorder/addoutsourcing/details"
      );
    },
    // 映射采购申请类型
    getSubType(type) {
      let item = this.selectOptions.subTypeOption.find((k) => k.code === type);
      return this.$i18n.locale == "zh" ? item.name : item.nameEn;
    },
    // 映射状态值
    getStatus(status, nominationStatus) {
      let item = this.selectOptions.statusOption.find((k) => k.code == status);
      if (status == "1") {
        if (nominationStatus == "2") {
          return this.language("LK_YIDINGDIAN", "已定点");
        }
        return this.language("LK_YIQIANSHOU", "已签收");
      }
      return this.$i18n.locale == "zh" ? item.name : item.nameEn;
    },
    //仅看自己
    showOnlyMyselfData(val) {
      this.form.isOwn = val;
      this.getOutsouringFindBypage();
    },
    /**
     * @Description: 退回EPS弹窗状态修改
     * @param {*} visible
     * @return {*}
     */
    handleBatchReject(visible) {
      if (this.selectRow.length < 1) {
        iMessage.warn(
          this.language("QINGXUANZECAIGOUSHENQING", "请选择采购申请")
        );
        return;
      }
      if (
        this.selectRow.find((item) => {
          return item.status != 0;
        })
      ) {
        return iMessage.warn("仅待签收状态的数据可以退回");
      }
      let msg = this.checkUser();
      if (msg) return iMessage.warn(msg);
      this.backDialogVisible = visible;
      this.mode = "back";
    },

    /**
     * @Description: 关闭弹窗状态修改
     * @param {*} visible
     * @return {*}
     */
    handleBatchClose(visible) {
      if (this.selectRow.length < 1) {
        iMessage.warn(
          this.language("QINGXUANZECAIGOUSHENQING", "请选择采购申请")
        );
        return;
      }
      if (
        this.selectRow.find((item) => {
          return !(item.status == 0 || item.status == 1);
        })
      ) {
        return iMessage.warn("仅待签收，已签收状态的数据可以关闭");
      }
      let msg = this.checkUser();
      if (msg) return iMessage.warn(msg);
      this.backDialogVisible = visible;
      this.mode = "close";
    },

    /**
     * @description: 查看定点详情
     * @param {*}
     * @return {*}
     */
    viewNominationDetail(row) {
      this.$nextTick(() => {
        const routeData = this.$router.resolve({
          path: "/partsign/outsouringorder/addoutsourcing/details",
          query: {
            code: row.riseCode,
            subType: row.subType,
          },
        });
        window.open(routeData.href, "_blank");
      });
    },

    /**
     * @description: 获取工序委外列表数据。
     * @param {*}
     * @return {*}
     */
    getOutsouringFindBypage() {
      this.tableLoading = true;
      outsouringFindBypage({
        ...this.form,
        ...{ pageSize: this.page.pageSize, currentPage: this.page.currPage },
      })
        .then((res) => {
          this.tableLoading = false;
          this.tableData = JSON.parse(JSON.stringify(res.data.records));
          this.page.totalCount = res.data.total;
        })
        .catch((err) => {
          this.tableLoading = false;
        });
    },
    /**
     * @description: 删除工序委外列表数据。
     * @param {*}
     * @return {*}
     */
    deleteItem() {
      if (this.selectRow.length < 1) {
        iMessage.warn(
          this.language("QINGXUANZECAIGOUSHENQING", "请选择采购申请")
        );
        return;
      }
      let msg = this.checkUser();
      if (msg) return iMessage.warn(msg);
      this.deleteDialogVisible = true;
    },
    /**
     * @description: 删除工序委外列表数据。
     * @param {*}
     * @return {*}
     */
    handleBatchDelete(isAllItem) {
      this.tableLoading = true;
      deleteOutSouring({
        requirementIds: this.selectRow.map((k) => k.purchasingRequirementId),
        isAllItem,
      })
        .then((res) => {
          if (+res.code === 200) {
            this.getOutsouringFindBypage();
            iMessage.success(this.$i18n.locale == "zh" ? res.desZh : res.desEn);
            this.deleteDialogVisible = false;
          } else {
            iMessage.error(this.$i18n.locale == "zh" ? res.desZh : res.desEn);
          }
          this.tableLoading = false;
        })
        .catch((err) => {
          this.tableLoading = false;
        });
    },
    /**
     * @description: 签收
     * @param {*}
     * @return {*}
     */
    handleBatchSingn() {
      if (this.selectRow.length == 0) {
        return iMessage.warn(
          this.language("QINGXUANZECAIGOUSHENQING", "请选择采购申请")
        );
      }
      if (
        this.selectRow.find((item) => {
          return item.status != 0;
        })
      ) {
        return iMessage.warn("仅待签收状态的数据可以签收");
      }
      let msg = this.checkUser();
      if (msg) return iMessage.warn(msg);
      this.showPoint = true;
    },
    /**
     @Description: 退回EPS
     @param {*} reasonType 退回类型
     @param {*} reasonDescription  退回描述
     @return {*}
    */
    handleBackEPS(reasonDescription, isAllItem) {
      if (this.mode === "back") {
        if (!reasonDescription) return iMessage.warn("退回理由不能为空");
        this.$refs.backEPS.changeSaveLoading &&
          this.$refs.backEPS.changeSaveLoading(true);
        let params = {
          purchasingRequirementChooseList: this.selectRow.map((item) => {
            return { riseCode: item.riseCode, sapItem: item.sapItem };
          }),
          reason: reasonDescription,
          isAllItem,
        };
        rejectByLinie(params)
          .then((res) => {
            if (res.result) {
              iMessage.success(
                this.$i18n.locale === "zh" ? res.desZh : res.desEn
              );
              this.getOutsouringFindBypage();
            } else {
              iMessage.error(
                this.$i18n.locale === "zh" ? res.desZh : res.desEn
              );
            }
          })
          .finally(() => {
            this.$refs.backEPS.changeSaveLoading &&
              this.$refs.backEPS.changeSaveLoading(false);
            this.$refs.backEPS.changeSaveLoading &&
              this.$refs.backEPS.clearDialog();
          });
        return;
      }
      if (this.mode === "close") {
        let params = {
          purchasingRequirementChooseList: this.selectRow.map((item) => {
            return { riseCode: item.riseCode, sapItem: item.sapItem };
          }),
          closeReason: reasonDescription,
          isAllItem,
        };
        closeOutSouringOrder(params)
          .then((res) => {
            if (res.result) {
              iMessage.success(
                this.$i18n.locale === "zh" ? res.desZh : res.desEn
              );
              this.getOutsouringFindBypage();
            } else {
              iMessage.error(
                this.$i18n.locale === "zh" ? res.desZh : res.desEn
              );
            }
          })
          .finally(() => {
            this.$refs.backEPS.changeSaveLoading &&
              this.$refs.backEPS.changeSaveLoading(false);
            this.$refs.backEPS.changeSaveLoading &&
              this.$refs.backEPS.clearDialog();
          });
      }
    },

    //转派
    handleTransfer(val) {
      let param = val;
      param.normalPrList = this.selectRow;
      this.transferLoading = true;
      toOwner(param)
        .then((res) => {
          if (res.code == "200") {
            this.showTransfer = false;
            this.getOutsouringFindBypage();
            iMessage.success(this.$t("LK_CAOZUOCHENGGONG"));
          } else {
            return iMessage.error(res.desZh || "转派失败");
          }
        })
        .catch((error) => {
          console.log(error);
          iMessage.error(error.desZh || "转派失败");
        })
        .finally(() => (this.transferLoading = false));
    },

    //簽收
    handleTurningPoint(val) {
      // this.tableLoading = true;
      signByLinie({
        ...val,
        purchasingRequirementChooseList: this.selectRow.map((k) => {
          return { riseCode: k.riseCode, sapItem: k.sapItem };
        }),
      })
        .then((res) => {
          // this.tableLoading = false;
          this.showPoint = false;
          if (+res.code === 200) {
            this.getOutsouringFindBypage();
            return iMessage.success(
              `${this.$i18n.locale === "zh" ? res.desZh : res.desEn}`
            );
          } else {
            return iMessage.error(
              `${this.$i18n.locale === "zh" ? res.desZh : res.desEn}`
            );
          }
        })
        .catch((err) => {
          this.showPoint = false;
          return iMessage.error(
            `${this.$i18n.locale === "zh" ? err.desZh : err.desEn}`
          );
        });
    },

    // 初始化申请部门数据
    async initSelectOptions() {
      // const DEPARTMENTLIST = await this.getDepartmentsCombo()
      this.dictkey();
      // this.searchFormTitle = searchForm([], PURCHASE_FACTORY)
    },

    // 获取申请部门参数
    getDepartmentsCombo() {
      return new Promise((r) => {
        getDepartmentsCombo()
          .then((res) => {
            r(res.data);
          })
          .catch(() => r({}));
      });
    },
    // 查询下拉数据
    dictkey() {
      // 获取采购工厂
      purchaseFactory({ isSparePart: 0 }).then((res) => {
        if (res.data) {
          this.selectOptions.procureFactoryOption = res.data.map((item) => {
            let obj = {
              code: item.procureFactory,
              name: item.factoryName,
              nameEn: item.factoryNameEn,
            };
            return obj;
          });
        }
      });
      // 获取状态下拉框
      getDictByCode("OUT_SOURCING_STATUS").then((res) => {
        this.selectOptions.statusOption = res.data[0].subDictResultVo;
      });
    },

    // 重置
    reset() {
      this.form = JSON.parse(JSON.stringify(form));
      // this.sure()
    },
    // 查询按钮
    sure() {
      this.page.currPage = 1;
      this.getOutsouringFindBypage();
    },
    // 转派
    handleBatchTransation() {
      if (this.selectRow.length == 0) {
        return iMessage.warn("请先选择数据");
      }
      if (
        this.selectRow.find((item) => {
          return !(item.status == 0 || item.status == 1);
        })
      ) {
        return iMessage.warn("仅待签收，已签收状态的数据可以转派");
      }
      this.showTransfer = true;
    },
  },
};
</script>
<style lang="scss" scoped>
.out-souring-order{
  position: relative;
}
.openLinkText {
  color: $color-blue;
}
.red {
  color: $color-delete;
}
.showMe {
  display: inline-flex;
  align-items: center;
  height: 30px;
  span {
    font-size: 20px;
    color: #000000;
    align-content: center;
  }
  .el-switch {
    margin-left: 10px;
  }
}
// .btns {
//   width: 40%;
// }
.topMenu {
  display: flex;
  justify-content: space-between;
}
.textalign-right {
  text-align: right;
  margin-bottom: 20px;
}
.uploadfile {
  display: inline-block;
  margin: 0 10px;
  &:nth-child(2) {
    margin-right: 0px;
  }
}
</style>
