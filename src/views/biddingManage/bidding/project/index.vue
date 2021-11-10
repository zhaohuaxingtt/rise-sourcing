<template>
  <iPage>
    <div class="project__header">
      <div class="project__header-title">
        <div>{{ title }}</div>
        <div class="form-item-back">
          <iButton v-if="projectBack === 'back'" @click="handleBack"
            >{{language('BIDDING_FANHUI', '返回')}}</iButton
          >
        </div>
        <div
          class="project__header-btns"
          v-if="
            ruleForm.roundType === '01' || ruleForm.roundType === '06'
              ? false
              : true
          "
        >
          <template
            v-if="actived === 'inquiry' && ruleForm.biddingStatus !== '08'"
          >
            <div v-if="ruleForm.roundType !== '05'">
              <iButton
                v-if="ruleForm.biddingStatus === '01'"
                @click="handelSend"
                >{{ language('BIDDING_FCBLRFQ', '发出本轮RFQ') }}</iButton
              >
              <!-- 竞价 -->

              <iButton
                v-if="
                  (ruleForm.roundType === '03' ||
                    ruleForm.roundType === '05') &&
                  (ruleForm.biddingStatus === '01' ||
                    ruleForm.biddingStatus === '02')
                "
                @click="onBiddingCancel"
                >{{ language('BIDDING-JSBLRFQ', '结束本轮RFQ') }}</iButton
              >
              <!-- 开标 -->
              <iButton
                v-if="
                  ruleForm.roundType === '02' &&
                  (ruleForm.biddingStatus === '01' ||
                    ruleForm.biddingStatus === '03')
                "
                @click="onOpenCancel"
                >{{ language('BIDDING_JSBLRFQ', '结束本轮RFQ') }}</iButton
              >
            </div>
            <div v-if="ruleForm.roundType === '05'">
              <iButton
                v-if="ruleForm.biddingStatus === '01'"
                @click="handelSend"
                >{{ language('BIDDING_FACHUJINGJIA', '发出竞价') }}</iButton
              >
              <iButton
                v-if="
                  (ruleForm.roundType === '03' ||
                    ruleForm.roundType === '05') &&
                  (ruleForm.biddingStatus === '01' ||
                    ruleForm.biddingStatus === '02')
                "
                @click="onBiddingCancel"
                >{{ language('BIDDING_JIESHUXIANGMU', '结束项目') }}</iButton
              >
            </div>
          </template>
        </div>
      </div>
      <div class="project__navtab">
        <div class="project__navtab-item">
          <div v-for="item in tabList" :key="item.value">
            <iButton
              :class="{ active: actived === item.value }"
              @click="handleBottom(item)"
              v-if="buttonShow(item.value)"
              >{{ item.label }}</iButton
            >
          </div>
        </div>
        <div class="project__header-btns">
          <template v-if="actived === 'filing'">
            <iButton v-if="ruleForm.biddingStatus == '06'">{{
              language('BIDDING_TXBJMX', '填写报价明细')
            }}</iButton>
            <!-- <iButton @click="handleShowNotice('01', '系统使用条款')">{{
              language('系统使用条款', '系统使用条款')
            }}</iButton> -->
            <iButton @click="handleShowNotice('02', '竞价告知书')">{{
              language('BIDDING_JINJIAGAOZHISHU', '竞价告知书')
            }}</iButton>
          </template>
        </div>
      </div>
    </div>
    <router-view
      :isSupplier="role === 'supplier'"
      :supplierCode="supplierCode"
      @change-title="handleChangeTitle"
      ref="child"
    ></router-view>

    <!-- <bidNoticeDialog :show.sync="showBidNotice" /> -->
    <bidNoticeDoc
      tag="iDialog"
      :open="showBidNotice"
      @cancel="cancel"
      v-if="showBidNotice"
      :projectCode="ruleForm.projectCode"
      :supplierCode="supplierCode"
      :type="type"
      :title="docTitle"
    />
  </iPage>
</template>

<script>
import { iPage, iButton } from "rise";
// import bidNoticeDialog from "./filing/components/bidNoticeDialog.vue";
import bidNoticeDoc from "./filing/components/bidNoticeDoc.vue";
import {
  cancelOpenTender,
  cancelBidding,
  sendEmail,
  getSupplierNotification,
} from "@/api/bidding/bidding";

export default {
  components: {
    iPage,
    iButton,
    bidNoticeDoc,
    // bidNoticeDialog,
  },
  data() {
    const cacheRuleForm = window.sessionStorage.getItem(
      "CACHE_PROJECT_RULE_FORM"
    );
    return {
      docTitle: "",
      type: "",
      actived: "",
      ruleForm: cacheRuleForm
        ? JSON.parse(cacheRuleForm)
        : {
            biddingStatus: "",
          },
      supplierCode: this.$route.query.supplierCode || window.sessionStorage.getItem("BIDDING_SUPPLIER_CODE") || "11135",
      showBidNotice: false,
      projectBack: "",
      biddingFinish: false,
    };
  },
  mounted() {
    window.sessionStorage.setItem("BIDDING_SUPPLIER_CODE", this.supplierCode);
    this.projectBack = sessionStorage.getItem("projectBack");
    console.log(this.projectBack);
  },

  computed: {
    role() {
      return this.$route.meta.role;
    },
    tabList() {
      switch (this.role) {
        case "buyer":
          return [
            {
              value: "inquiry",
              label: this.language('BIDDING_XUNJIAGUANLI','询价管理'),
              path: "biddingProjectInquiry",
            },
            { value: "hall", label: this.language('BIDDING_JINGJIADATING','竞价大厅'), path: "biddingProjectHall" },
            {
              value: "result",
              label: this.language('BIDDING_XIANGMUJIEGUO','项目结果'),
              path: "biddingProjectResult",
            },
          ];
        case "supplier":
          return [
            {
              value: "filing",
              label: this.language('BIDDING_JINGDANGXINXI','建档信息'),
              path: "biddingSupplierFiling",
            },
            { value: "hall", label: this.language('BIDDING_JINGJIADATING','竞价大厅'), path: "biddingProjectHall" },
            {
              value: "result",
              label: this.language('BIDDING_XIANGMUJIEGUO','项目结果'),
              path: "biddingSupplierResult",
            },
          ];
        default:
          return [];
      }
    },
    title() {
      const { rfqCode, projectCode } = this.ruleForm || {};
      // return rfqCode ? `RFQ编号：${rfqCode}` : `项目编号：${projectCode}`;
      return rfqCode ? `${this.language('BIDDING_RFQBIANHAO','RFQ编号')}：${rfqCode}` : `${this.language('BIDDING_XIANGMUBIANHAO','项目编号')}：${projectCode}`;
    },
  },
  watch: {
    $route: {
      immediate: true,
      handler(to) {
        switch (to.name) {
          case "biddingProjectInquiry":
            this.actived = "inquiry";
            break;
          case "biddingSupplierFiling":
            this.actived = "filing";
            break;
          case "biddingProjectHall":
          case "biddingSupplierHall":
            this.actived = "hall";
            break;
          case "biddingProjectResult":
          case "biddingSupplierResult":
            this.actived = "result";
            break;
        }
      },
    },
  },
  methods: {
    handleBack() {
      this.$router.push({
        path: "/bidding/projectlist",
      });
      sessionStorage.clear();
    },
    handleChangeTitle(data) {
      if (data.biddingStatus == "01" || data.biddingStatus == null) {
        if (this.role == "buyer") {
          this.$router.push({ name: "biddingProjectInquiry" });
        } else {
          this.$router.push({ name: "biddingSupplierFiling" });
        }
      }
      this.ruleForm = data;
      window.sessionStorage.setItem(
        "CACHE_PROJECT_RULE_FORM",
        JSON.stringify(data)
      );
    },
    // 开标结束本轮RFQ
    onOpenCancel() {
      const { projectCode } = this.ruleForm;
      const fromdata = { projectCode };
      cancelOpenTender(fromdata)
        .then((res) => {
          this.$message.success(this.language('BIDDING_CAOZUOCHENGGONG','操作成功'));
          location.reload();
        })
        .catch(() => {
          this.$message.error(this.language('BIDDING_CAOZUOSHIBAI','操作失败'));
        });
    },
    // 竞价结束本轮RFQ
    onBiddingCancel() {
      const { projectCode } = this.ruleForm;
      const fromdata = { projectCode };
      cancelBidding(fromdata)
        .then((res) => {
          this.$message.success(this.language('BIDDING_CAOZUOCHENGGONG','操作成功'));
          if (this.ruleForm.isRfqCompleted === null) {
            localStorage.setItem("finish", true);
          } else {
            localStorage.removeItem("finish");
            console.log(this.language('BIDDING_YIBEISHANGCHU','已被删除'));
          }
          location.reload();
        })
        .catch(() => {
          this.$message.error(this.language('BIDDING_CAOZUOSHIBAI','操作失败'));
        });
    },

    // 发出本轮RFQ
    handelSend() {
      if (this.ruleForm.suppliers.length === 0) {
        return this.$message.error(this.language('BIDDING_BXYYYGGYS','必须要有一个供应商'));
      }
      if (this.ruleForm.biddingBeginTime) {
        const biddingBeginTime = new Date(this.ruleForm.biddingBeginTime);
        const date = new Date();
        if (date > biddingBeginTime) {
          return this.$message.error(this.language('BIDDING_JJKSSJYGQ','竞价开始时间已过期'));
        }
      }

      if (this.ruleForm?.suppliers.every((item) => !item.isAttend)) {
        return this.$message.error(this.language('BIDDING_GYSBXYYGCYBLRFQCNFQJJ','供应商必须有一个参与本轮RFQ，才能发起竞价'));
      }

      if (this.ruleForm.isRfqCompleted === null) {
        return this.$message.error(this.language('BIDDING_WWCXJGLSZWFFQJJ','未完成询价管理设置, 无法发起竞价'));
      }

      this.$refs.child.submitForm(() => {
        const { projectCode } = this.ruleForm;
        const fromdata = { projectCode };
        sendEmail(fromdata)
          .then((res) => {
            window.location.reload();
          })
          .catch((err) => {
            this.$message.error(err.message);
          });
      });
    },
    handleShowNotice(type, docTitle) {
      this.type = type;
      this.docTitle = docTitle;
      this.showBidNotice = true;
      // this.$router.push('/bidding/bidNotice')
      // this.$router.push({
      //   path: `/bidding/bidNotice`,
      // });
    },
    cancel(blobUrl) {
      this.showBidNotice = false;
      if (blobUrl) {
        window.URL.revokeObjectURL(blobUrl);
      }
    },
    buttonShow(val) {
      const { biddingStatus, roundType } = this.ruleForm || {};
      this.biddingFinish = localStorage.getItem("finish");
      if (val == "hall") {
        if (this.biddingFinish) {
          console.log(this.language('BIDDING_WMZBNJXCK','未满足，不能进行查看'));
          return false;
        } else {
          if (biddingStatus == "01") {
            return false;
          } else if (roundType == "02") {
            return false;
          } else {
            return true;
          }
        }
      }

      if (val == "result") {
        if (biddingStatus == "06" || biddingStatus == "08") {
          return true;
        } else {
          return false;
        }
      }
      return true;
    },
    async handleBottom(item) {
      if (item.value == "hall" && this.role === "supplier") {
        const res = await getSupplierNotification({
          projectCode: this.ruleForm.projectCode,
          supplerCode: this.supplierCode,
        });
        if (!res.biddingNtfFlag && !res.systemUseFlag) {
          return this.$message.error(this.language('BIDDING_QTYJJGZSHXTSYTK','请同意竞价告知书和系统使用条款'));
        } else if (!res.biddingNtfFlag && res.systemUseFlag) {
          return this.$message.error(this.language('BIDDING_QTYJJGZS','请同意竞价告知书'));
        } else if (res.biddingNtfFlag && !res.systemUseFlag) {
          return this.$message.error(this.language('BIDDING_QTYXTSYTK','请同意系统使用条款'));
        } else {
          this.$router.push({ name: item.path });
        }
      }else {
          this.$router.push({ name: item.path });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.form-item-back {
  margin-left: auto;
  margin-right: 0.5rem;
  ::v-deep .el-button--default {
    min-width: 130px;
  }
}
.project {
  &__header {
    &-title {
      display: flex;
      justify-content: space-between;
      font-size: 28px;
      font-weight: bold;
      height: 40px;
      margin-bottom: 10px;
    }

    &-btns {
      .el-button--default {
        min-width: 130px;
      }
    }
  }
  &__navtab {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;

    &-item {
      display: flex;
      flex-direction: row;
      .el-button {
        margin-left: 2px;
        background-color: #fcfdfd;
        color: #ccc;
      }
      .el-button.active {
        color: #1763f7;
        box-shadow: 0 0 0.1875rem rgb(0 38 98 / 15%);
        border-color: transparent;
      }
    }
  }
}
</style>
