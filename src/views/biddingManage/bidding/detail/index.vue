<template>
  <iPage>
    <div class="project__header">
      <div class="project__header-title">
        <div>{{ title }}</div>
      </div>
    </div>
    <biddingDetail
      :supplierCode="supplierCode"
      :supplierOfferId="supplierOfferId"
      :id="biddingId"
      @change-title="changeTitle"
    />
  </iPage>
</template>

<script>
import { iPage } from "rise";
import biddingDetail from "./components/biddingDetail.vue";

export default {
  components: {
    iPage,
    biddingDetail,
  },
  data() {
    return {
      id: 0,
      ruleForm: {},
      supplierCode: "",
      supplierOfferId: "",
    };
  },
  computed: {
    title() {
      const { rfqCode, projectCode,roundType,isTest } = this.ruleForm || {};
      return rfqCode ? `${this.language('BIDDING_RFQBH','RFQ编号')}：${rfqCode} ${ isTest ?  `${this.language('BIDDING_CESHI','（测试）')}`: `${this.language('BIDDING_ZHENGSHI','（正式）')}`}` 
                      : `${this.language('BIDDING_XIANGMUBIANHAO','项目编号')}：${projectCode} ${ isTest ?  `${this.language('BIDDING_CESHI','（测试）')}`: `${this.language('BIDDING_ZHENGSHI','（正式）')}`}`;
    },
  },
  mounted() {},
  created() {
    this.id = this.$route.params.id;
    // if (localStorage.getItem("supplierOfferId")) {
    //   this.supplierOfferId = localStorage.getItem("supplierOfferId");
    // }
    this.supplierOfferId = this.$route.query.supplierOfferId;
  },
  methods: {
    changeTitle(data) {
      this.ruleForm = data;
    },
  },
};
</script>
<style lang="scss" scoped>
.project__header-title {
  margin: 0;
  font-size: 28px;
  font-weight: bold;
  min-width: 290px;
  min-height: 34px;
  margin-right: 10px;
  margin-bottom: 15px;
}
</style>
