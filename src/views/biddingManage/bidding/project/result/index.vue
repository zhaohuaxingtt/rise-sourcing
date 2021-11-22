<template>
  <projectResult
    :form="ruleForm"
    :isSupplier="isSupplier"
    :supplierCode="supplierCode"
    :ranks="ranks"
  />
</template>

<script>
import projectResult from "./component/projectResult.vue";
import { findHallQuotation,getSupplierRank } from "@/api/bidding/bidding";

export default {
  components: {
    projectResult,
  },
  data() {
    return {
      ruleForm: {},
      ranks: {},
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
  computed: {
    role() {
      return this.$route.meta.role;
    },
  },
  methods: {
    handleSearchReset() {
      // 采购员
      let param
      if( this.supplierCode === '11135'){
        param = { biddingId: this.id};
      } else {
        param = { biddingId: this.id, supplierCode: this.supplierCode };
      }
      this.query(param);
    },
    async query(e) {
      // 根据 ID 获取竞价大厅报价单列表数据
      const res = await findHallQuotation(e);
      this.$emit("change-title", res);
      this.ruleForm = res;
      if (this.role == "supplier") {
        const r = await getSupplierRank(e).catch(err => {
          console.log(err)
        });
        this.ranks = r
      }
    },
  },
};
</script>
<style lang="scss" scoped>
</style>
