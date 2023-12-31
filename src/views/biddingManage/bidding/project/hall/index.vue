<template>
  <div>
    <biddingInfo
      ref="biddingInfo"
      @reload="reload"
      v-model="ruleForm"
      :supplierCode="supplierCode"
      v-if="ruleForm.roundType != '02'"
    />

    <div class="card bottom-list">
      <div class="card--header">
        <div class="card--header--item">
          <div class="header--item--left">
            <div class="header--item--left__btn header--item--left__tab">
              <div v-for="item in tabList" :key="item.path">
                <iButton
                  v-if="tabShow(item.path)"
                  :class="{ active: bottomActived === item.path }"
                  :key="item.path"
                  @click="handleBottom(item.path, item.components)"
                  >{{ item.label }}</iButton
                >
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="card--body">
        <component
          ref="formComponent"
          v-if="formComponent"
          :is="formComponent"
          :biddingId="id"
          :isSupplier="isSupplier"
          :supplierCode="supplierCode"
          :getRank="getRank"
          v-model="ruleForm"
          @getRank="getRank"
          :rfqId="ruleForm.rfqCode"
          @ranksData="ranksData"
          :biddingQuoteRule="biddingQuoteRule"
          :rankDatas="rankDatas"
        ></component>
      </div>
    </div>
  </div>
</template>

<script>
import { iPage, iButton } from "rise";
import {
  findHallQuotation,
  findHallSupplier,
  getSupplierRank,
  findQuoteRule,
} from "@/api/bidding/bidding";
import biddingInfo from "./components/biddingInfo.vue";
import bidList from "./components/bidList.vue";
import supplierList from "./components/supplierList.vue";
import quotationOrder from "./components/quotationOrder";
import graph from "./components/graph.vue";
import itemNumber from "./components/itemNumber.vue";
import bidDetail from "./components/bidDetail.vue";
import projectNotes from "./components/projectNotes.vue";
import attachment from "./components/attachment.vue";
import inquiryAttachment from '@/views/partsrfq/editordetail/components/rfqDetailInfo/components/inquiryAttachment'

export default {
  components: {
    iPage,
    iButton,

    biddingInfo,
    bidList,
    supplierList,
    quotationOrder,
    graph,
    itemNumber,
    bidDetail,
    projectNotes,
    attachment,
    inquiryAttachment
  },
  props: {
    isSupplier: { type: Boolean, default: false },
    supplierCode: {
      type: String,
    },
  },
  data() {
    return {
      id: 0,
      actived: 2,
      ruleForm: {},
      bottomActived: 0,

      showBidNotice: false,

      yearsPlans: [],
      procurePlans: [],
      biddingQuoteRule: {},
      rankDatas:{}
    };
  },
  computed: {
    role() {
      return this.$route.meta.role;
    },
    title() {
      const { rfqCode, projectCode } = this.ruleForm || {};
      return rfqCode ? `${this.language('BIDDING_RFQBIANHAO','RFQ编号')}：${rfqCode}` : `${this.language('BIDDING_XIANGMUBIANHAO','项目编号')}：${projectCode}`;
    },
    formComponent() {
      return {
        1: quotationOrder,
        2: bidList,
        3: attachment,
        4: supplierList,
        5: graph,
        6: itemNumber,
        7: bidDetail,
        8: projectNotes,
        9: inquiryAttachment,
      }[this.bottomActived];
    },
    tabList() {
      switch (this.role) {
        case "buyer":
          return [
            { label: this.language('BIDDING_BAOJIADAN',"报价单"), path: 1, components: "quotationOrder" },
            // { label: "出价列表", path: 2, components: "bidList" },
            { label: this.language('BIDDING_XUNJIAFUJIAN',"询价附件"), path: 3, components: "attachment" },
            { label: this.language('BIDDING_XUNJIAFUJIAN',"询价附件"), path: 9, components: "inquiryAttachment" },
            { label: this.language('BIDDING_GONGYINGSHANGLIEBIAO',"供应商列表"), path: 4, components: "supplierList" },
            { label: this.language('BIDDING_QUXIANTU',"曲线图"), path: 5, components: "graph" },
            { label: this.language('BIDDING_FENXIANGPAIMING',"分项排名"), path: 6, components: "itemNumber" },
            { label: this.language('BIDDING_JINGJIAMINGXI',"竞价明细"), path: 7, components: "bidDetail" },
            { label: this.language('BIDDING_XIANGMUBEIZHU',"项目备注"), path: 8, components: "projectNotes" },
          ];
        case "supplier":
          return [
            { label: this.language('BIDDING_BAOJIADAN',"报价单"), path: 1, components: "quotationOrder" },
            { label: this.language('BIDDING_CHUJIALIEBIAO',"出价列表"), path: 2, components: "bidList" },
            { label: this.language('BIDDING_XUNJIAFUJIAN',"询价附件"), path: 3, components: "attachment" },
            { label: this.language('BIDDING_XUNJIAFUJIAN',"询价附件"), path: 9, components: "inquiryAttachment" },
            { label: this.language('BIDDING_GONGYINGSHANGPAIMING',"供应商排名"), path: 4, components: "supplierList" },
          ];
        default:
          return [];
      }
    },
  },
  mounted() {
    this.handleSearchReset();

  },
  created() {
    this.id = this.$route.params.id;
  },
  methods: {
    ranksData(data){
      this.rankDatas = data
    },
    handleSearchReset() {
      // 采购员
       let param
      if( this.supplierCode === '11135'){
         param = { biddingId: this.id};
      } else {
         param = { biddingId: this.id, supplierCode: this.supplierCode };
      }
      this.query(param);
      findQuoteRule({ id: this.id }).then((res) => {
        this.biddingQuoteRule = res.biddingQuoteRule;
        console.log(this.biddingQuoteRule);
      });
    },
    handleChangeTitle(data) {
      this.ruleForm = data;
    },
    reload() {
      try {
        this.handleSearchReset();
      } catch {
        1;
      } finally {
        if (
          "function" === typeof this.$refs.formComponent?.$children?.[0]?.reset
        ) {
          this.$refs.formComponent.$children[0].reset();
        }
      }
    },
    getRank() {
      if ("function" === typeof this.$refs.biddingInfo.getRank) {
        this.$refs.biddingInfo.getRank();
      }
    },
    async query(e) {
      // 根据 ID 获取竞价大厅报价单列表数据
      // 根据 ID 获取竞价大厅报价单列表数据
      const res = await findHallQuotation(e);
      const hallRes = await findHallSupplier({ id: this.id });
      this.$emit("change-title", res);
      this.ruleForm = {
        ...res,
        attachments:hallRes.attachments
      };
      console.log(190,this.ruleForm)
      this.bottomActived === 0 ? (this.bottomActived = 1) : this.bottomActived;
    },
    handleShowBidNotice() {
      this.showBidNotice = true;
    },
    handleBottom(e, components) {
      this.bottomActived = e;
    },
    tabShow(path) {
      let { biddingStatus, roundType, manualBiddingType, biddingMode } =
        this.ruleForm;
      if (path == 1 && this.role == 'supplier') {
        if (biddingStatus === "02") {
          return false;
        } else {
          true;
        }
      }
      if (path == 2) {
        if (biddingStatus === "02") {
          return false;
        } else {
          true;
        }
      }
      if(path == 3){
        if(roundType === '05'){
          return true
        } else {
          return false
        }
      }
      if (path == 4) {
        if (
          roundType == "03" ||
          (roundType == "05" &&
            manualBiddingType == "01")
        ) {
          // if(this.ruleForm.supplierProducts?.length<1){
          //   return false;
          // }
          if (
            biddingStatus == "06" ||
            biddingStatus == "07" ||
            biddingStatus == "08" ||
            biddingStatus == "09" ||
            biddingStatus == "04"
          ) {
            return true;
          } else if (biddingStatus != "01" && this.role == 'buyer') {
            return true;
          } else {
            return false;
          }
        } else {
          if(manualBiddingType == '02' && this.role == 'buyer') {
            return true;
          }else {
            return false;
          }
        }
      }
      if (path == 5) {
        if (
          biddingStatus == "06" ||
          biddingStatus == "08" ||
          biddingStatus == "09"
        ) {
          return true;
        } else {
          return false;
        }
      }
      if (path == 6) {
        if (biddingMode != "02") {
          if (
            roundType == "03" ||
            (roundType == "05" && manualBiddingType == "01")
          ) {
            if (
              biddingStatus == "06" ||
              biddingStatus == "08" ||
              biddingStatus == "09"
            ) {
              return true;
            } else {
              return false;
            }
          } else {
            return false;
          }
        } else {
          return false;
        }
      }
      if (path == 7) {
        if (
          biddingStatus == "06" ||
          biddingStatus == "08" ||
          biddingStatus == "09"
        ) {
          return true;
        } else {
          return false;
        }
      }
      if (path == 8) {
        if (
          roundType == "03" ||
          (roundType == "05" && manualBiddingType == "01")
        ) {
          if (
            biddingStatus == "06" ||
            biddingStatus == "08" ||
            biddingStatus == "09"
          ) {
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      }
      if(path == 9){          //引用rfq展示附件
        if(roundType === '03'){
          return true
        } else {
          return false
        }
      }
      return true;
    },
  },
};
</script>
<style lang="scss" scoped>
.card {
  .card--header {
    .card--header--item {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      flex-direction: row;
      margin-bottom: 15px;
      min-height: 37px;
      .header--item--left {
        display: flex;
        .header--item--lable {
          ::v-deep .el-button {
            font-size: 0.9rem;
            background-color: #fff;
            color: #1763f7;
            box-shadow: 0 0 0.1875rem rgb(0 38 98 / 15%);
            border-color: transparent;
          }
        }

        .header--item--lable__left {
          margin: 0;
          font-size: 28px;
          font-weight: bold;
          min-width: 290px;
          margin-right: 10px;
        }
      }
      .header--item--left__btn {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-end;

        ::v-deep .el-button--default {
          min-width: 130px;
          margin-bottom: 10px;
          /* cursor: default; */
        }
        ::v-deep .el-button.active {
          color: #1763f7;
          box-shadow: 0 0 0.1875rem rgb(0 38 98 / 15%);
          border-color: transparent;
        }
      }
      .header--item--left__tab {
        ::v-deep .el-button {
          margin-left: 2px;
          background-color: #fcfdfd;
          color: #ccc;
        }
      }
    }
  }
}

.bottom-list {
  padding-top: 2rem;
}
</style>
