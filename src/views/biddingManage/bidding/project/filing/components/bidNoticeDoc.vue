<template>
  <component
    :is="tag"
    v-bind="
      tag === 'iDialog' 
      ? {
        width: '108.75rem',
        class: 'summary-dialog-box',
        title: type === '01' ? '系统使用条款' : title,
        visible: open || type === '01',
        ['close-on-click-modal']: false,
      } 
      : {}
    "
    @close="handleCancel"
  >
    <iEditForm class="box">
      <div class="content">
        <div class="line-top"></div>
        <div class="line-bottom"></div>
        <div class="file-content">
          <embed :src="fileBlobUrl" class="iframe" />
        </div>
        <!-- hello -->
      </div>
      <div
        class="operate right"
        v-if="
          (type === '01' && systemUseFlag) || (type === '02' && biddingNtfFlag)
        "
      >
        <span
          >{{language('BIDDING_WYYDYSTK','我已阅读以上条款')}}，{{ supplierName }},{{ updateDateNewType }}</span
        >
      </div>
      <div class="operate" v-else>
        <!-- <div class="text">
          我已阅读以上条款，张三，2021-06-23 11：30：00
        </div> -->
        <div class="button">
          <el-checkbox
            v-model="checked"
            @change="handleChecked"
            :disabled="!getValue"
            >{{language('BIDDING_WYYDBJSYXTK','我已阅读并接受以下条款')}}</el-checkbox>
          <iButton
            class="reject"
            @click="hanldeAgreeOrReject(false)"
            :disabled="!getValue"
            >{{language('BIDDING_JUJUE','拒绝')}}</iButton>
          <iButton
            class="agree"
            :disabled="!checked"
            @click="hanldeAgreeOrReject(true)"
            >{{language('BIDDING_TONGYI','同意')}}</iButton>
        </div>
      </div>
      <!-- <div class="operate">
        我已阅读以上条款，张三，2021-06-23 11：30：00
      </div> -->
    </iEditForm>
  </component>
</template>
<script>
import { iDialog, iButton, iMessage } from "rise";
import iEditForm from "@/components/biddingComponents/iEditForm";
import { filePreview } from "@/utils/filePreview";
import {
  saveSupplierNotification,
  getSupplierNotification,
  getProjectCode,
  getBiddingId,
} from "@/api/bidding/bidding";
import dayjs from "dayjs";
export default {
  components: {
    iEditForm,
    iButton,
    iDialog,
  },
  props: {
    tag: {
      type: String,
      default: 'div',
    },
    //rfq编号
    rfqCode: {
      type: String,
      default: "",
    },
    //rfq伦茨
    rfqRound: {
      type: String,
      default: "",
    },

    title: {
      type: String,
      default: "",
    },
    //项目编号
    projectCode: {
      type: String,
      default: "",
    },
    supplierCode: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "01",
    },

    open: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      supplierName: "",
      projectTermsCode: "",
      supplierTermsCode: window.sessionStorage.getItem("BIDDING_SUPPLIER_CODE") || this.supplierCode || "11135",
      updateBy: "",
      updateDate: "",
      biddingNtfFlag: "",
      systemUseFlag: "",
      getValue: false,
      supplerId: "",
      //方便增删改
      fileTypeObj: {
        "01": "条款",
        "02": "告知书",
      },
      fileBlobUrl: "",
      checked: false,
      // open: true,
    };
  },
  created() {
    this.id = this.$route.params.id;
    Object.assign(this, this.$route.query);
    this.supplierTermsCode = this.supplierCode || this.supplierTermsCode;
    if (this.$route.name === "bidNoticeDocTender") {
      this.title = "开标告知书";
      this.type = "02";
      this.open = true;
    } else if (this.$route.name === "bidNoticeDocBidding") {
      this.title = "竞价告知书";
      this.type = "02";
      this.open = true;
    }
  },
  mounted() {
    if (this.type === "01" || this.$route.name === "bidNoticeDocTender" || this.$route.name === "bidNoticeDocBidding") {
      //如果没有项目编号，请求接口获取项目编号
      if (!this.projectCode) {
        if (this.rfqCode && this.rfqRound) {
          this.query({
            // id: this.id,
            rfqCode: this.rfqCode,
            rfqRound: this.rfqRound,
            projectCode: this.projectCode,
          }).then((code) => {
            this.projectTermsCode = code;
            this.supplierCode = this.supplierTermsCode;
            this.getView();
          });
        } else {
          this.query2({
            id: this.id,
          }).then((code) => {
            this.projectTermsCode = code;
            this.supplierCode = this.supplierTermsCode;
            this.getView();
          });
        }
      } else {
        this.projectTermsCode = this.projectCode;
        this.supplierCode = this.supplierTermsCode;
        this.getView();
      }
    } else {
      this.getView();
    }
  },
  computed: {
    updateDateNewType: function() {
      if (this.updateDate) {
        return dayjs(new Date(this.updateDate)).format("YYYY-MM-DD HH:mm:ss");
      }
      return "";
    },
  },
  methods: {
    //根据竞价信息id获取竞价信息得到形目编号：：：如果父级组件传递项目编号，此方法可以不调用
    async query(e) {
      const res = await getProjectCode(e);
      // return res.projectCode;
      return res;
    },
    //临时
    async query2(e) {
      const res = await getBiddingId(e);
      return res.projectCode;
    },
    async getView() {
      let param = {};
      switch (this.fileTypeObj[this.type]) {
        case "条款":
          param = {
            systemUseFlag: true,
            projectCode: this.projectCode
              ? this.projectCode
              : this.projectTermsCode,
            supplerCode: this.supplierCode
              ? this.supplierCode
              : this.supplierTermsCode,
          };
          break;
        case "告知书":
          param = {
            biddingNtfFlag: true,
            projectCode: this.projectCode
              ? this.projectCode
              : this.projectTermsCode,
            supplerCode: this.supplierCode
              ? this.supplierCode
              : this.supplierTermsCode,
          };
          break;
        default:
          break;
      }
      if (!param.systemUseFlag && !param.biddingNtfFlag) {
        return;
      }
      filePreview({
        url: `${process.env.VUE_APP_BIDDING}/biddingQueryService/viewAuctionEn`,
        data: {
          ...param,
        },
        callback: (e) => {
          this.fileBlobUrl = e;
          getSupplierNotification(param).then((res) => {
            this.supplierName = res.supplierName;
            this.supplerId = res.id;
            this.biddingNtfFlag = res.biddingNtfFlag;
            this.systemUseFlag = res.systemUseFlag;
            this.updateBy = res.updateBy;
            this.updateDate = res.updateDate;
            this.getValue = true;

            if (this.$route.name === "bidNoticeDoc") {
              if (this.systemUseFlag && this.biddingNtfFlag) {
                this.gotoSupplier();
              } else if (this.systemUseFlag) {
                this.$router.push({
                  name: 'bidNoticeDocBidding',
                  params: this.$route.params,
                  query: this.$route.query,
                })
              }
            } else if (this.$route.name === "bidNoticeDocBidding") {
              if (this.biddingNtfFlag) {
                this.gotoSupplier();
              }
            }
          });
        },
      });
    },
    //发送拒绝/同意请求
    hanldeAgreeOrReject(bol) {
      let param = {};
      if (this.type === "01") {
        param = {
          systemUseFlag: bol,
          supplerId: this.supplerId,
        };
      } else {
        param = {
          biddingNtfFlag: bol,
          supplerId: this.supplerId,
        };
      }
      saveSupplierNotification(param).then((res) => {
        // let rejectTerms = false;
        // if (this.type === "01" && !bol) {
        //   rejectTerms = true;
        // }
        if (res.code === 200) {
          iMessage.success(res.message);
          if (this.$route.name === "bidNoticeDoc") {
            if(bol) {
              this.$router.push({
                name: 'bidNoticeDocBidding',
                params: this.$route.params,
                query: this.$route.query,
              })
            } else {
              window.close();
            }
            return;
          } else if (this.$route.name === "bidNoticeDocTender") {
            this.getView();
          } else if(this.$route.name === "bidNoticeDocBidding") {
            this.gotoSupplier();
          }
        } else {
          iMessage.error(res.message);
        }
        this.handleCancel();
      });
    },
    handleCancel() {
      this.$emit("cancel", this.fileBlobUrl);
      // if (bol) {
      //   this.$router.go(-1);
      // } else {
      if (this.$route.name === "bidNoticeDoc") {
        window.close();
      } else if(this.$route.name === "bidNoticeDocBidding") {
        this.gotoSupplier();
      }
      //}
    },
    gotoSupplier() {
      this.$router.push({
        name: 'biddingSupplier',
        params: {
          id: this.id
        },
        query: {
          supplierCode: this.supplierCode,
        },
      });
    }
  },
};
</script>

<style lang="scss" scoped>
.content {
  position: relative;
  width: 1660px;
  height: 728px;
  background-color: #c4c4c4;
  border: 1px solid #e4e7ed;
  border-radius: 10px;
  /* .line-top {
    width: 1800px;
    height: 1px;
    background-color: #979797;
    transform: translateY(374px) rotate(23.4deg) translateX(-70px)
      translateY(20px);
  }
  .line-bottom {
    width: 1800px;
    height: 1px;
    background-color: #979797;
    transform: translateY(374px) rotate(-23.4deg) translateX(-60px)
      translateY(-40px);
  } */
  .file-content {
    /* display: none; */
    z-index: 10;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    .iframe {
      width: 100%;
      height: 100%;
    }
  }
}
.operate {
  height: 99px;
  font-size: 16px;
  font-family: "PingFangSC-Regular";
  font-size: 16px;
  font-weight: 400;
  padding-top: 31px;
  padding-bottom: 46px;
  .text {
    height: 22px;
    line-height: 22px;
    text-align: right;
  }
  .button {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .reject {
      margin-left: 40px;
    }
  }
}
.right {
  text-align: right;
}
::v-deep .el-checkbox {
  height: 22px;
  display: flex;
  align-items: center;
}
::v-deep .el-checkbox__label {
  margin-left: 10px;
  padding-left: 0;
  font-size: 16px;
  height: 22px;
  line-height: 22px;
}
::v-deep .el-checkbox__inner {
  width: 20px;
  height: 20px;
}
::v-deep .el-checkbox__inner::after {
  margin-left: 3px;
  margin-top: 2px;
}
</style>
