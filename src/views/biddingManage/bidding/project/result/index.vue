<template>
  <projectResult
    :form="ruleForm"
    :isSupplier="isSupplier"
    :supplierCode="supplierCode"
  />
</template>

<script>
import projectResult from "./component/projectResult.vue";
import { findHallQuotation } from "@/api/bidding/bidding";

export default {
  components: {
    projectResult,
  },
  data() {
    return {
      ruleForm: {},
    };
  },
  props: {
    supplierCode: {
      type: String,
    },
    isSupplier: Boolean,
  },
  mounted() {
    this.handleSearchReset();
  },
  created() {
    this.id = this.$route.params.id;
  },
  computed: {},
  methods: {
    handleSearchReset() {
      let param = { biddingId: this.id, supplierCode: this.supplierCode };
      this.query(param);
    },
    async query(e) {
      // 根据 ID 获取竞价大厅报价单列表数据
      const res = await findHallQuotation(e);
      this.$emit("change-title", res);
      this.ruleForm = res;
    },
  },
};
</script>
<style lang="scss" scoped>
</style>
