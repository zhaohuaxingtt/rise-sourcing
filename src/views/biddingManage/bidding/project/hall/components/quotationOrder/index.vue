<template>
  <component
    :is="priceComponent"
    :initData="ruleForm"
    :id="biddingId"
    :supplierCode="supplierCode"
    :isSupplier="isSupplier"
    @getRank="getRank"
    v-if="ruleForm.biddingStatus !== '02'"
    :biddingQuoteRule="biddingQuoteRule"
  ></component>
</template>

<script>
import { iPage } from "rise";
import multiPriceSupplierQuotation from "./components/multiPriceSupplierQuotation.vue";
import easyPriceSupplierQuotation from "./components/easyPriceSupplierQuotation.vue";
import multiPriceByerQuotation from "./components/multiPriceByerQuotation.vue";
import easyPriceByerQuotation from "./components/easyPriceByerQuotation.vue";
import heSupplierQuotation from "./components/heSupplierQuotation.vue";
export default {
  components: {
    iPage,
    multiPriceSupplierQuotation,
    easyPriceSupplierQuotation,
    multiPriceByerQuotation,
    easyPriceByerQuotation,
    heSupplierQuotation,
  },
  props: {
    biddingId: String,
    value: {
      type: Object,
      default: () => ({}),
    },
    supplierCode: String,
    isSupplier: { type: Boolean, default: false },
    biddingQuoteRule: {
      type: Object,
      default: () => ({}),
    },
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        this.ruleForm = val;
      },
    },
  },
  data() {
    return {
      ruleForm: {
        biddingMode: "",
      },
    };
  },
  computed: {
    priceComponent() {
      // 供应商
      if (this.isSupplier) {
        //荷氏
        if (
          "04" === this.ruleForm.roundType ||
          ("05" === this.ruleForm.roundType &&
            "02" === this.ruleForm.manualBiddingType)
        ) {
          return "heSupplierQuotation";
        } else {
          if (this.ruleForm.biddingMode) {
            return this.ruleForm.biddingMode === "03"
              ? "multiPriceSupplierQuotation"
              : "easyPriceSupplierQuotation";
          }
        }
      } else {
        //采购员
        if (this.ruleForm.biddingMode) {
          return this.ruleForm.biddingMode === "03"
            ? "multiPriceByerQuotation"
            : "easyPriceByerQuotation";
        }
      }
      return "";
    },
  },
  methods: {
    getRank() {
      this.$emit("getRank");
    },
  },
};
</script>
<style lang="scss" scoped></style>
