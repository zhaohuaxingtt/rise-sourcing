<!--
 * @Author: yuszhou
 * @Date: 2021-05-25 13:01:23
 * @LastEditors: caopeng
 * @Description: 报价助手界面
 * @FilePath: \front-sourcing-new\src\views\partsrfq\editordetail\components\rfqDetailTpzs\index.vue
-->
<template>
  <div>
    <negotiateBasicInfor :rfqInfoData="rfqInfoData"></negotiateBasicInfor>
  </div>
</template>
<script>
import { iTabsList, iCard, iButton, iMessage, icon } from "rise";
import quotationScoringTracking from "./components/quotationScoringTracking";
import quotationScoringMj from "./components/quotationScoringMj";
import quotationScoringHZ from "./components/quotationScoringHz";
import quotationScoringEcartsCard from "./components/quotationScoringEcartsCard";
import buMonitor from "./components/qutaionScoringBusses";
import { icardData } from "./components/data";
import gather from "@/views/partsrfq/externalAccessToAnalysisTools/negotiationAssistant/gather.vue";
import negotiateBasicInfor from "./components/negotiateBasicInfor";
import { downloadPdfMixins } from "@/utils/pdf";
import { hasPermission } from "@/utils";
import { udMutilfiles, reportAdd } from "@/api/partsrfq/reportList/index";
export default {
  mixins: [downloadPdfMixins],
  components: {
    icon,
    iTabsList,
    iCard,
    quotationScoringTracking,
    quotationScoringMj,
    quotationScoringHZ,
    quotationScoringEcartsCard,
    buMonitor,
    gather,
    negotiateBasicInfor,
    iButton,
  },
  props: {
    rfqInfoData: { type: Object },
  },
  watch: {
    rfqInfoData(val) {
      this.rfqInfoData = val;
      console.log(val);
    },
  },
  data() {
    return {
      cardShow: JSON.parse(JSON.stringify(icardData)),
      activityTabIndex: "one",
      downloadButtonLoading: false,
    };
  },
  created() {
    console.log(this.rfqInfoData);
    // window.sessionStorage.setItem('entryStatus', 1);
    this.$store.commit("SET_ENTRY_STATUS", 1);
    this.$store.dispatch("setRfqId", this.$route.query.id);
    if (this.$route.query.activityTabIndex) {
      this.activityTabIndex = this.$route.query.activityTabIndex;
    }
  },
  methods: {
    hasPermission,
    handleTabClick(target) {
      this.activityTabIndex = target.name;
    },
    /**
     * @description: 报价折叠
     * @param {*} e
     * @param {*} key
     * @return {*}
     */
    handleCollapse(e, key) {
      this.cardShow.forEach((i) => {
        if (i.key == key) {
          i.show = !i.show;
        }
      });
    },

    handleReport() {
      this.$router.push({ path: "/sourcing/partsrfq/reportList" });
    },
    //点击报告清单
    clickReport() {},
  },
};
</script>
<style lang='scss' scoped>
.MJbox {
  width: 200px;
  height: 30px;
  background: red;
}
.clearfix {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    font-size: 18px;
    color: #131523;
    font-weight: bold;
  }
  .icon {
    font-size: 20px;
    margin-left: 20px;
  }
}
.el-tabs--card {
  position: relative;
}
.right-btn {
  position: absolute;
  top: -3.5rem;
  right: 0;
}
.buMonitor {
  margin-bottom: 70px;
}
</style>
