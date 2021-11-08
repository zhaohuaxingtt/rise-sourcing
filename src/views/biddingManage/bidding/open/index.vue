<template>
  <iPage>
    <div class="form-itme">
      <div class="form-item-left">{{ title }}</div>
      <!-- <iButton>开标告知书</iButton> -->
      <!-- <iButton @click="handleShowNotice('02', '开标告知书')">{{
        language('开标告知书', '开标告知书')
      }}</iButton> -->
    </div>
    <information @change-title="handleChangeTitle" />
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
import information from "./components/information.vue";
import bidNoticeDoc from "@/views/manage/bidding/project/filing/components/bidNoticeDoc.vue";
export default {
  components: {
    iPage,
    information,
    bidNoticeDoc,
  },
  data() {
    return {
      showBidNotice: false,
      supplierCode: this.$route.query.supplierCode || window.sessionStorage.getItem("BIDDING_SUPPLIER_CODE") || "11135",
      ruleForm: {},
    };
  },
  mounted() {
    window.sessionStorage.setItem("BIDDING_SUPPLIER_CODE", this.supplierCode);
  },
  computed: {
    title() {
      const { rfqCode, projectCode } = this.ruleForm || {};
      return rfqCode ? `${this.language('BIDDING_RFQBIANHAO','RFQ编号')}：${rfqCode}` : `${this.language('BIDDING_XIANGMUBIANHAO','项目编号')}：${projectCode}`;
    },
  },
  methods: {
    handleChangeTitle(data) {
      this.ruleForm = data;
    },
    handleShowNotice(type, docTitle) {
      this.type = type;
      this.docTitle = docTitle;
      this.showBidNotice = true;
    },
    cancel(blobUrl) {
      this.showBidNotice = false;
      if (blobUrl) {
        window.URL.revokeObjectURL(blobUrl);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.form-itme {
  display: flex;
  justify-content: space-between;
  .form-item-left {
    font-size: 1.5rem;
    font-weight: bold;
  }
}
</style>
