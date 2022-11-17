<!--
 * @Author: Luoshuang
 * @Date: 2021-06-22 11:14:02
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-01-18 13:09:55
 * @Description: 模具目标价-目标价签收
 * @FilePath: \front-sourcing\src\views\modelTargetPrice\signin\index.vue
-->

<template>
  <iPage
    v-permission.auto="
      MODELTARGETPRICE_SIGNIN_PAGE | (模具目标价管理 - 目标价签收 - 页面)
    "
  >
    <headerNav />
    <!----------------------------------------------------------------->
    <!---------------------------搜索区域------------------------------->
    <!----------------------------------------------------------------->
    <iSearch @sure="sure" @reset="reset">
      <el-form>
        <el-form-item
          v-for="(item, index) in searchList"
          :key="index"
          :label="language(item.i18n_label, item.label)"
          v-permission.dynamic.auto="item.permission"
        >
          <iSelect
            v-if="item.type === 'select'"
            v-model="searchParams[item.value]"
            :placeholder="language('QINGXUANZE', '请选择')"
          >
            <el-option
              v-if="!item.hideAll"
              value=""
              :label="language('all', '全部')"
            ></el-option>
            <el-option
              v-for="item in selectOptions[item.selectOption] || []"
              :key="item.code"
              :label="item.name"
              :value="
                item.selectOption === 'CAR_TYPE_PRO'
                  ? item.id
                  : item.selectOption === 'LINIE'
                  ? item.name
                  : item.code
              "
            >
            </el-option>
          </iSelect>
          <carProjectSelect
            v-else-if="item.type === 'carProjectSelect'"
            v-model="searchParams[item.value]"
            valueType="2"
          />
          <procureFactorySelect
            v-else-if="item.type === 'procureFactorySelect'"
            v-model="searchParams[item.value]"
          />
          <iDicoptions
            v-else-if="item.type === 'selectDict'"
            :optionAll="false"
            :optionKey="item.selectOption"
            v-model="searchParams[item.value]"
          />
          <iDatePicker
            v-else-if="item.type === 'dateRange'"
            value-format=""
            type="daterange"
            v-model="searchParams[item.value]"
            :default-time="['00:00:00', '23:59:59']"
          ></iDatePicker>
          <iMultiLineInput
            v-else-if="item.type === 'multiLineInput'"
            v-model="searchParams[item.value]"
            :title="language(item.i18n_label, item.label)"
          />
          <iInput
            v-else
            v-model="searchParams[item.value]"
            :placeholder="language('QINGSHURU', '请输入')"
          ></iInput>
        </el-form-item>
      </el-form>
    </iSearch>
    <!----------------------------------------------------------------->
    <!---------------------------表格区域------------------------------->
    <!----------------------------------------------------------------->
    <iCard
      class="margin-top20"
      v-permission.auto="
        MODELTARGETPRICE_SIGNIN_TABLE | (模具目标价管理 - 目标价签收 - 表格)
      "
    >
      <div class="margin-bottom20 clearFloat">
        <span class="font18 font-weight"></span>
        <div class="floatright">
          <!--------------------指派按钮----------------------------------->
          <iButton
            @click="openAssignDialog"
            :loading="assignDialogVisible"
            v-permission.auto="
              MODELTARGETPRICE_SIGNIN_ASSIGNBTN |
                (模具目标价管理 - 目标价签收 - 指派按钮)
            "
            >{{ language("LK_ZHIPAI", "指派") }}</iButton
          >
          <!--------------------退回按钮----------------------------------->
          <iButton
            @click="openSendBack"
            v-permission.auto="
              MODELTARGETPRICE_SIGNIN_BACK |
                (模具目标价管理 - 目标价签收 - 退回按钮)
            "
            >{{ language("TUIHUI", "退回") }}</iButton
          >
          <!--------------------无投资按钮----------------------------------->
          <iButton
            @click="handleNoInvest"
            :loading="noInvestLoading"
            v-permission.auto="
              MODELTARGETPRICE_SIGNIN_NOINVESTBTN |
                (模具目标价管理 - 目标价签收 - 无投资按钮)
            "
            >{{ language("WUTOUZI", "无投资") }}</iButton
          >
          <!--------------------签收按钮----------------------------------->
          <iButton
            @click="handleSignIn"
            :loading="signLoading"
            v-permission.auto="
              MODELTARGETPRICE_SIGNIN_SIGNINBTN |
                (模具目标价管理 - 目标价签收 - 签收按钮)
            "
            >{{ language("QIANSHOU", "签收") }}</iButton
          >
        </div>
      </div>
      <tableList
        selection
        indexKey
        :tableData="tableData"
        :tableTitle="tableTitle"
        :tableLoading="tableLoading"
        @handleSelectionChange="handleSelectionChange"
        @openAttachmentDialog="openAttachmentDialog"
      >
        <template #tuzhi="scope">
          <!-- <span v-if="!$store.state.permission.userInfo.isDeptLead && $store.state.permission.userInfo.deptDTO.level === 'K3' && scope.row.approvalStatus == 0"></span> -->
          <!-- 角色是财务模具控制员不展示 -->
          <span
            v-if="roleList.includes('CWMJKZY') && scope.row.approvalStatus == 0"
          ></span>
          <span
            class="openLinkText cursor"
            v-else
            @click="openAttachmentDialog(scope.row)"
            >{{ language("CHAKAN", "查看") }}</span
          >
        </template>
      </tableList>
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
    </iCard>
    <!------------------------------------------------------------------------>
    <!--                  附件弹窗                                      --->
    <!------------------------------------------------------------------------>
    <attachmentDialog
      :dialogVisible="attachmentDialogVisible"
      @changeVisible="changeAttachmentDialogVisible"
      :rfqNum="rfqId"
    />
    <!------------------------------------------------------------------------>
    <!--                  指派弹窗                                      --->
    <!------------------------------------------------------------------------>
    <assignDialog
      ref="assign"
      :dialogVisible.sync="assignDialogVisible"
      @changeVisible="changeAssignDialogVisible"
      @sendAccessory="targetAppoint"
    />
    <!------------------------------------------------------------------------>
    <!--                  无投资确认弹窗                                      --->
    <!------------------------------------------------------------------------>
    <noInvestConfirmDialog
      ref="noInvestConfirm"
      :dialogVisible="noInvestDialogVisible"
      @changeVisible="changeNoInvestDialogVisible"
      @handleConfirm="handleNoInvestConfirm"
    />
    <!------------------------------------------------------------------------>
    <!--                  退回弹窗                                      --->
    <!------------------------------------------------------------------------>
    <sendBackDialog
      ref="sendBackConfirm"
      :dialogVisible="sendBackDialogVisible"
      @changeVisible="changeSendBackDialogVisible"
      @handleConfirm="handleSendBackConfirm"
    />
  </iPage>
</template>

<script>
import {
  iPage,
  iCard,
  iPagination,
  iButton,
  iSelect,
  iDatePicker,
  iInput,
  iSearch,
  iMessage,
  iMultiLineInput,
} from "rise";
import headerNav from "../components/headerNav";
import { tableTitle, searchList } from "./data";
import { pageMixins } from "@/utils/pageMixins";
import tableList from "../components/tableList";
import assignDialog from "./components/assign";
import { getCartypeDict } from "@/api/partsrfq/home";
import {
  getTargetPriceSingPage,
  noInvestment,
  taskSign,
  appoint,
  existValidTargetPrice,
  sendBack,
} from "@/api/modelTargetPrice/index";
import iDicoptions from "rise/web/components/iDicoptions";
import attachmentDialog from "@/views/costanalysismanage/components/home/components/downloadFiles/index";
import noInvestConfirmDialog from "./components/noInvestConfirm";
import carProjectSelect from "@/views/modelTargetPrice/components/carProjectSelect";
import procureFactorySelect from "@/views/modelTargetPrice/components/procureFactorySelect";
import moment from "moment";
import sendBackDialog from "./components/sendBack";
import { roleMixins } from "@/utils/roleMixins";
export default {
  mixins: [pageMixins, roleMixins],
  components: {
    carProjectSelect,
    procureFactorySelect,
    iDicoptions,
    iPage,
    headerNav,
    iCard,
    tableList,
    iPagination,
    iButton,
    iSelect,
    iDatePicker,
    iInput,
    iSearch,
    attachmentDialog,
    assignDialog,
    sendBackDialog,
    noInvestConfirmDialog,
    iMultiLineInput,
  },
  data() {
    return {
      tableTitle: tableTitle,
      tableData: [],
      searchList: searchList,
      searchParams: {
        partProjectType: "",
        cartypeProjectId: "",
        procureFactory: "",
        applyType: "",
        showSelf: true,
      },
      tableLoading: false,
      selectOptions: {},
      assignDialogVisible: false,
      selectItems: [],
      rfqId: "",
      applyId: "",
      noInvestDialogVisible: false,
      attachmentDialogVisible: false,
      signLoading: false,
      noInvestLoading: false,
      sendBackDialogVisible: false,
    };
  },
  created() {
    this.selectOptions = {
      showSelfOptions: [
        { name: this.language("SHI", "是"), code: true },
        { name: this.language("FOU", "否"), code: false },
      ],
    };
    this.getTableList();
  },
  methods: {
    openNoInvest() {
      this.noInvestLoading = false;
      this.changeNoInvestDialogVisible(true);
    },
    handleSendBackConfirm(memo) {
      const params = {
        remarks: memo,
        taskIds: this.selectItems.map((item) => item.taskId),
      };
      sendBack(params)
        .then((res) => {
          if (res?.result) {
            iMessage.success(
              this.$i18n.locale === "zh" ? res?.desZh : res?.desEn
            );
            this.changeSendBackDialogVisible(false);
            this.getTableList();
          } else {
            iMessage.error(
              this.$i18n.locale === "zh" ? res?.desZh : res?.desEn
            );
          }
        })
        .finally(() => {
          this.refs.sendBackConfirm.changeSaveLoading(false);
        });
    },
    changeSendBackDialogVisible(visible) {
      this.sendBackDialogVisible = visible;
    },
    /**
     * @Description: 无投资
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */
    async handleNoInvest() {
      if (this.selectItems.length < 1) {
        iMessage.warn(
          this.language("ZHISHAOXUANZEYITIAOJILU", "至少选择一条记录")
        );
        return;
      }
      try {
        this.noInvestLoading = true;
        const existValidTargetPriceRes = await existValidTargetPrice(
          this.selectItems.map((item) => item.rfqId)
        );
        if (existValidTargetPriceRes?.result) {
          if (existValidTargetPriceRes?.data) {
            this.$confirm(
              this.language(
                "RFQHASVALIDTARGETPRICECONFIRMNOINVESTMENT",
                "RFQ已有目标价返回，是否确认无投资？"
              ),
              this.language("WUTOUZIQUEREN", "无投资确认"),
              {
                confirmButtonText: this.language("SHI", "是"),
                cancelButtonText: this.language("FOU", "否"),
                customClass: "progressmoni-tipsConfirm",
              }
            )
              .then((confirmInfo) => {
                console.log("confirmInfo", confirmInfo);
                if (confirmInfo === "confirm") {
                  this.openNoInvest();
                }
              })
              .catch(() => {
                this.noInvestLoading = false;
              });
          } else {
            this.openNoInvest();
          }
        } else {
          iMessage.error(
            this.$i18n.locale === "zh"
              ? existValidTargetPriceRes?.desZh
              : existValidTargetPriceRes?.desEn
          );
          this.noInvestLoading = false;
        }
      } catch (e) {
        iMessage.error(e.message || e);
        this.noInvestLoading = false;
      }
    },
    handleSelectionChange(val) {
      this.selectItems = val;
    },
    reset() {
      this.searchParams = {
        partProjectType: "",
        cartypeProjectId: "",
        procureFactory: "",
        applyType: "",
      };
      this.sure();
    },
    sure() {
      this.page = {
        ...this.page,
        currPage: 1,
      };
      this.getTableList();
    },
    /**
     * @Description: 附件查看
     * @Author: Luoshuang
     * @param {*} row
     * @return {*}
     */
    openAttachmentDialog(row) {
      this.rfqId = row.rfqId || "";
      this.changeAttachmentDialogVisible(true);
    },
    changeAttachmentDialogVisible(visible) {
      this.attachmentDialogVisible = visible;
    },
    /**
     * @Description: 指派操作
     * @Author: Luoshuang
     * @param {*} cfId 控制员id
     * @return {*}
     */
    targetAppoint(cfId) {
      const params = {
        taskIds: this.selectItems.map((item) => item.taskId),
        userId: cfId,
      };
      appoint(params)
        .then((res) => {
          if (res?.result) {
            iMessage.success(
              this.$i18n.locale === "zh" ? res?.desZh : res?.desEn
            );
            this.changeAssignDialogVisible(false);
            this.getTableList();
          } else {
            iMessage.error(
              this.$i18n.locale === "zh" ? res?.desZh : res?.desEn
            );
          }
        })
        .finally(() => {
          this.$refs.assign.changeAssigLoading(false);
        });
    },
    // 获取车型字典
    getCartypeDict() {
      getCartypeDict().then((res) => {
        if (res.code == 200) {
          this.selectOptions = {
            ...this.selectOptions,
            cartTypeOptions: Array.isArray(res.data) ? res.data : [],
          };
        }
      });
    },
    openPage(row) {
      const router = this.$router.resolve({
        path: "/sourceinquirypoint/sourcing/partsprocure/editordetail",
        query: {
          projectId: row.purchasingProjectPartId,
          businessKey: row.partProjectType,
        },
      });
      window.open(router.href, "_blank");
    },
    /**
     * @Description: 指派
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */
    openAssignDialog() {
      if (this.selectItems.length < 1) {
        iMessage.warn(
          this.language("ZHISHAOXUANZEYITIAOJILU", "至少选择一条记录")
        );
        return;
      }
      this.changeAssignDialogVisible(true);
    },
    /**
     * @Description: 修改指派弹窗状态
     * @Author: Luoshuang
     * @param {*} visible
     * @return {*}
     */
    changeAssignDialogVisible(visible) {
      this.assignDialogVisible = visible;
    },
    /**
     * @Description: 获取表格数据
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */
    getTableList() {
      this.tableLoading = true;
      // eslint-disable-next-line no-undef
      const params = _.omit(
        {
          ...this.searchParams,
          applyStartDate: this.searchParams.applyDate
            ? moment(this.searchParams.applyDate[0]).format(
                "YYYY-MM-DD HH:mm:ss"
              )
            : null,
          applyEndDate: this.searchParams.applyDate
            ? moment(this.searchParams.applyDate[1]).format(
                "YYYY-MM-DD HH:mm:ss"
              )
            : null,
          current: this.page.currPage,
          size: this.page.pageSize,
        },
        ["applyDate"]
      );
      getTargetPriceSingPage(params)
        .then((res) => {
          if (res?.result) {
            this.page = {
              ...this.page,
              totalCount: res.total,
              currPage: res.pageNum,
              pageSize: res.pageSize,
            };
            this.tableData = res.data;
          } else {
            this.tableData = [];
            iMessage.error(
              this.$i18n.locale === "zh" ? res?.desZh : res?.desEn
            );
          }
        })
        .catch((e) => {
          this.tableData = [];
          iMessage.error(this.$i18n.locale === "zh" ? e?.desZh : e?.desEn);
        })
        .finally(() => {
          this.tableLoading = false;
        });
    },
    /**
     * @Description: 签收
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */
    handleSignIn() {
      if (this.selectItems.length < 1) {
        iMessage.warn(
          this.language("ZHISHAOXUANZEYITIAOJILU", "至少选择一条记录")
        );
        return;
      }
      const params = {
        taskIds: this.selectItems.map((item) => item.taskId),
      };
      this.signLoading = true;
      taskSign(params)
        .then((res) => {
          if (res?.result) {
            iMessage.success(
              this.$i18n.locale === "zh" ? res?.desZh : res?.desEn
            );
            this.getTableList();
          } else {
            iMessage.error(
              this.$i18n.locale === "zh" ? res?.desZh : res?.desEn
            );
          }
        })
        .finally(() => {
          this.signLoading = false;
        });
    },
    /**
     * @Description: 退回
     * @Author: Luoshuang
     * @param {*}
     * @return {*}
     */
    openSendBack() {
      if (this.selectItems.length < 1) {
        iMessage.warn(
          this.language("ZHISHAOXUANZEYITIAOJILU", "至少选择一条记录")
        );
        return;
      }
      this.changeSendBackDialogVisible(true);
    },
    changeNoInvestDialogVisible(visible) {
      this.noInvestDialogVisible = visible;
    },
    /**
     * @Description: 无投资确认
     * @Author: Luoshuang
     * @param {*} memo 备注
     * @return {*}
     */
    handleNoInvestConfirm(memo) {
      const params = {
        remarks: memo,
        taskIds: this.selectItems.map((item) => item.taskId),
      };
      noInvestment(params)
        .then((res) => {
          if (res?.result) {
            iMessage.success(
              this.$i18n.locale === "zh" ? res?.desZh : res?.desEn
            );
            this.changeNoInvestDialogVisible(false);

            this.getTableList();
          } else {
            iMessage.error(
              this.$i18n.locale === "zh" ? res?.desZh : res?.desEn
            );
          }
        })
        .finally(() => {
          this.refs.noInvestConfirm.changeSaveLoading(false);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.openLinkText {
  color: $color-blue;
  text-decoration: underline;
}
</style>