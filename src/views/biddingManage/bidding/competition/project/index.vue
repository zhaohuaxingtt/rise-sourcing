<template>
  <component :is="priceComponent" :initData="ruleForm" :id="id"></component>
</template>

<script>
import easyPrice from './components/easyPrice';
import multiPrice from './components/multiPrice';
import {findMultiPrice} from "@/api/bidding/bidding";

export default {
  components: {
    easyPrice,
    multiPrice,
  },
  data() {
    return {
      id: '',
      ruleForm: {
        biddingMode: '',
      },
    };
  },
  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    priceComponent() {
      // if(this.ruleForm.biddingMode) {
      //   return 'easyPrice';
      // }
      // TODO 多价格merge后开启判断
      if (this.ruleForm.biddingMode) {
        return this.ruleForm.biddingMode === '03'? 'multiPrice' : 'easyPrice';
      }
      return '';
    }
  },
  created() {
    this.id = this.$route.params.id;
  },
  mounted() {
    const param = { id: this.id };
    this.query(param);
  },
  methods: {
    async query(e) {
      const res = await findMultiPrice(e);
      this.$emit("change-title", res);
      this.ruleForm = res;
    },
  },
};
</script>