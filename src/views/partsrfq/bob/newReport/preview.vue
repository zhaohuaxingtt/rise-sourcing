<template>
  <iDialog :title="reportName"
           :visible.sync="value"
           width="95%"
           @close="closeDialog"
           @opened="open">
    <bobPreview v-bind="$attrs"></bobPreview>
  </iDialog>
</template>

<script>
import { iPage, iButton, iCard, iSelect, icon, iDialog, iMessage } from "rise";
import bobPreview from './bobPreview'
export default {
  components: {
    iDialog,
    bobPreview
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    reportName: {
      type: String,
      default: ""
    },
    chartTitle: {
      type: String,
      default: ""
    }
  },
  data () {
    return {
    };
  },
  mounted () {

    // if (this.inside === 0) {
    //   this.analysisSchemeId = this.$parent.$options.parent.analysisSchemeId
    // }
    // this.analysisSchemeId = this.$store.state.rfq.SchemeId
    // this.reportName = this.$route.query.name;
    // this.id = this.$route.query.id;
    // this.initChartData()
    // this.analysisSchemeId = this.$route.query.analysisSchemeId;

  },
  computed: {

  },
  methods: {
    findPart () {
      this.value = true;
    },
    closeDialog (val) {
      this.$emit('closeDialog', false);
      // this.value = val;
    }
  },
};
</script>

<style lang="scss" scoped>
.new-bob {
  .end {
    text-align: center;
    position: relative;
    bottom: 30px;
  }
  .toolTip-div {
    z-index: 20;
    min-width: 164px;
    max-width: 224px;
    z-index: 6;
    background: "#fff";
    opacity: 1;
    border-radius: 5px;
    position: absolute;
    box-shadow: 0px 4px 10px rgba(27, 29, 33, 0.12);
    top: 0;
    left: 0;
    padding: 10px;
  }
  .left-dash1 {
    border: none;
    // border-left: 5px dashed grey;
    .icon-add {
      margin-top: 100px;
      margin-bottom: 20px;
      text-align: center;
    }
  }
}
.chartTitle {
  font-size: 18px;
  font-family: "Arial";
  line-height: 16px;
  font-weight: "bold";
  margin-right: 20px;
}
.legend {
  font-family: "Arial";
  font-size: 16px;
  color: #0d2451;
  ul {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    li {
      padding-right: 20px;
    }
  }
}
.clearfix::after {
  content: "";
  display: block;
  font-size: 0;
  height: 0;
  clear: both;
}
.circle {
  display: inline-block;
  border-radius: 50%;
  width: 14px;
  height: 14px;
  vertical-align: baseline;
  margin-right: 10px;
}
</style>