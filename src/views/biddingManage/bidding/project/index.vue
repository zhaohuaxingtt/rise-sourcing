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
                :disabled="!isUser"
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
                :disabled="!isUser"
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
                :disabled="!isUser"
                >{{ language('BIDDING_JSBLRFQ', '结束本轮RFQ') }}</iButton
              >
            </div>
            <template v-if="isUser">
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
            <iButton @click="handleHref" v-if="ruleForm.roundType !== '05' && ruleForm.biddingStatus == '06'">{{
              language('BIDDING_TXBJMX', '填写报价明细')
            }}</iButton>
            <!-- <iButton @click="handleShowNotice('01', '系统使用条款')">{{
              language('系统使用条款', '系统使用条款')
            }}</iButton> -->
            <iButton v-if="isShowBidding" @click="handleShowNotice('02', language('BIDDING_JINJIAGAOZHISHU','竞价告知书'))">{{
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
      @hanldeAgreeOrReject="hanldeAgreeOrReject"
      v-if="showBidNotice"
      :projectCode="ruleForm.projectCode"
      :supplierCode="supplierCode"
      :type="type"
      :title="docTitle"
    />

    <!-- 供应商黑名单发出询价弹出 -->
    <supplierDisabled
      v-if="disSupplier"
      :show="disSupplier"
      :tableListData="tableListData"
      @update-show="updataShow"
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
import supplierDisabled from './inquiry/components/supplierDisabled'
import store from '@/store'


export default {
  components: {
    iPage,
    iButton,
    bidNoticeDoc,
    // bidNoticeDialog,
    supplierDisabled,
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
      handleReject:false,
      getSupplierData:{},
      disSupplier: false,
      tableListData: [],
      isUser:false,
      isLinieId:false
    };
  },
   async mounted() {
    window.sessionStorage.setItem("BIDDING_SUPPLIER_CODE", this.supplierCode);
    this.projectBack = sessionStorage.getItem("projectBack");
    console.log(this.projectBack);
    if (this.role === "supplier" && this.ruleForm.projectCode) {
      const res = await getSupplierNotification({
          projectCode: this.ruleForm.projectCode,
          supplerCode: this.supplierCode,
      });
      this.getSupplierData = res
    }
  },

  computed: {
    // 没有同意系统使用条款或者告知书的供应商只能看建档页面
    isShowBidding(){
      const {biddingStatus} = this.ruleForm
      if (biddingStatus == '06' || biddingStatus == '07' || biddingStatus == '08' || biddingStatus == '09') {
        return false
      } else {
        return true
      }
    },
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
            { value: "hall", label: this.language('BIDDING_JINGJIADATING','竞价大厅'), path: "biddingSupplierHall" },
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
      const { rfqCode, projectCode,roundType,isTest } = this.ruleForm || {};
      // return rfqCode ? `RFQ编号：${rfqCode}` : `项目编号：${projectCode}`;
      return rfqCode ? `${this.language('BIDDING_RFQBIANHAO','RFQ编号')}：${rfqCode} ${ isTest ?  `${this.language('BIDDING_CESHI','（测试）')}` : `${this.language('BIDDING_ZHENGSHI','（正式）')}`}` 
                    : `${this.language('BIDDING_XIANGMUBIANHAO','项目编号')}：${projectCode} ${ isTest ?  `${this.language('BIDDING_CESHI','（测试）')}`: `${this.language('BIDDING_ZHENGSHI','（正式）')}`}`;
    },
    userId(){
      return store.state.permission.userInfo.id
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
    handleHref(){
      window.open(`${process.env.VUE_APP_SITE_URL}supplier/rfqManageMent/rfqDetail?rfqId=${this.ruleForm.rfqCode}`)
    },
    handleBack() {
      this.$router.push({
        path: "/bidding/projectlist",
      });
      sessionStorage.clear();
    },
    async handleChangeTitle(data) {
      // 是否当前用户是否是采购员
      const userId = String(this.userId)
      this.isUser = userId === data.linieId
      // 判断采购员是否是当前登录者的下属员工
      this.isLinieId = !!data?.userIds?.some(item => data.linieId.includes(item))

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
      if(data) {
        if (this.actived === 'filing'){
          const res = await getSupplierNotification({
              projectCode: this.ruleForm.projectCode,
              supplerCode: this.supplierCode,
          });
          this.getSupplierData = res
        
          if(!res?.systemUseFlag) {
            const type = '01'
            const docTitle = '系统使用条款'
            this.handleShowNotice(type,docTitle)
          }
        }
      }
    },
    // 开标结束本轮RFQ
    onOpenCancel() {
      const { projectCode } = this.ruleForm;
      const fromdata = { projectCode };
      cancelOpenTender(fromdata)
        .then((res) => {
          if (res) {
            this.$message.success(this.language('BIDDING_CAOZUOCHENGGONG','操作成功'));
            location.reload();
          }
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
          if (res) {
            this.$message.success(this.language('BIDDING_CAOZUOCHENGGONG','操作成功'));
            if (this.ruleForm.isRfqCompleted === null) {
              localStorage.setItem("finish", true);
            } else {
              localStorage.removeItem("finish");
              console.log(this.language('BIDDING_YIBEISHANGCHU','已被删除'));
            }
            location.reload();
          }
        })
        .catch(() => {
          this.$message.error(this.language('BIDDING_CAOZUOSHIBAI','操作失败'));
        });
    },
    // 供应商黑名单
    updataShow(){
      this.disSupplier = false
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

      const { projectCode } = this.ruleForm;
      const inquiryFlag = this.$route.path.includes('/bidding/project/inquiry')
      const fromdata = { projectCode, inquiryFlag };
      // this.$refs.child.submitForm(() => {
      //   sendEmail(fromdata)
      //     .then((res) => {
      //       window.location.reload();
      //     })
      //     .catch((err) => {
      //       this.$message.error(err.message);
      //     });
      // });
      sendEmail(fromdata)
      .then((res) => {
        if (res.code == 200) {
          window.location.reload();
        }
        // 供应商黑名单
        if (res.code == 100407) {
          if (document.getElementsByClassName("el-message").length === 0) {
             this.$message.error(res.message);
           }
          this.tableListData = res.data
          this.disSupplier = true
        }
      })
      .catch((err) => {
        if (err) {
           if (document.getElementsByClassName("el-message").length === 0) {
             this.$message.error(err.message);
           }
        }
      });
    },
    handleShowNotice(type, docTitle) {
      this.type = type;
      this.docTitle = docTitle;
      const {biddingStatus} = this.ruleForm
      // 打开弹窗
      this.showBidNotice = biddingStatus === '02' || biddingStatus === '04';
      // this.$router.push('/bidding/bidNotice')
      // this.$router.push({
      //   path: `/bidding/bidNotice`,
      // });
    },
    // 发送拒绝/同意请求
    hanldeAgreeOrReject(param){
      this.handleReject = param.systemUseFlag
    },
    cancel(blobUrl) {
      if(this.type == '01' && !this.handleReject) {
        window.close()
      }
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
          } else if (this.role === "supplier" && (biddingStatus == '06' || biddingStatus == '07' || biddingStatus == '08' || biddingStatus == '09')  && (!this.getSupplierData?.biddingNtfFlag && !this.getSupplierData?.systemUseFlag )){
            return false
          } else if (this.role === "buyer" && this.isUser){
            return true;
          } else if (this.role === "buyer" && this.isLinieId){
            return true;
          } else if (this.role === "supplier" ){
            return true;
          }else {
            return false
          }
        }
      }

      if (val == "result") {
        if (this.role === "supplier" && (biddingStatus == '06' || biddingStatus == '07' || biddingStatus == '08' || biddingStatus == '09')  && (!this.getSupplierData?.biddingNtfFlag && !this.getSupplierData?.systemUseFlag )) {
          return false
        } else if (this.role === "buyer" && this.isUser && (biddingStatus == "06" || biddingStatus == "07" || biddingStatus == "08")) {
          return true;
        } else if (this.role === "buyer" && this.isLinieId && (biddingStatus == "06" || biddingStatus == "07" || biddingStatus == "08")) {
          return true;
        } else if (this.role === "supplier" && (biddingStatus == "06" || biddingStatus == "07" || biddingStatus == "08" && (this.getSupplierData?.biddingNtfFlag && this.getSupplierData?.systemUseFlag ))) {
          return true;
        } else {
          return false;
        }
      }

      if (val == 'inquiry' || val == 'filing') return true;
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
