<template>
  <iDialog :title="reportName"
           :visible.sync="value"
           width="95%"
           @close="closeDialog"
           @opened="open">
    <iCard :collapse="false"
           id="downloadRef">
      <div class="clearfix">
        <iButton class="margin-left10 "
                 style="float: right"
                 @click="handleDownload">{{ $t("LK_XIAZAI") }}</iButton>
      </div>
      <el-row :gutter="40">
        <el-col :span="inside ? 18 : 24">
          <crown-bar :chartData="chartData"
                     :title="chartTitle"
                     :type="bobType"
                     :by="chartType" />
        </el-col>
        <el-col :span="6"
                v-if="inside">
          <div class="left-dash1">
            <out-bar :chartData="chartData1"
                     :preview="false"></out-bar>
          </div>
        </el-col>
      </el-row>
      <div style="margin-top:20px;">
        <span style="font-weight:bold;font-size:14px">
          {{ $t("费用详情") }}
        </span>
      </div>
      <table1 :tableList="tableList" style="margin-top:20px"></table1>
      <!-- <table2 :dataList="dataList2"></table2>
      <table3 :dataList="dataList3"></table3>
      <table4 :dataList="dataList4"></table4>
      <table5 :dataList="dataList5"></table5>
      <table6 :dataList="dataList6"></table6> -->
    </iCard>
  </iDialog>
</template>

<script>
import { iPage, iButton, iCard, iSelect, icon, iDialog } from "rise";
import CrownBar from "./components/crownBar.vue";
// import bobAnalysis from "@/views/partsrfq/bob/bobAnalysis/index.vue";
import { getBobLevelOne, chargeRetrieve } from "@/api/partsrfq/bob";
import { downloadPDF, dataURLtoFile } from "@/utils/pdf";
import {
  dataList1,
  dataList2,
  dataList3,
  dataList4,
  dataList5,
  dataList6,
  tableList,
} from "@/views/partsrfq/bob/bobAnalysis/components/data.js";
import table1 from "../bobAnalysis/components/table1.vue";
import table2 from "../bobAnalysis/components/table2.vue";
import table3 from "../bobAnalysis/components/table3.vue";
import table4 from "../bobAnalysis/components/table4.vue";
import table5 from "../bobAnalysis/components/table5.vue";
import table6 from "../bobAnalysis/components/table6.vue";
import OutBar from "./components/outBar.vue";
export default {
  components: {
    iDialog,
    iButton,
    iCard,
    CrownBar,
    OutBar,
    table1,
    // table2,
    // table3,
    // table4,
    // table5,
    // table6,
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  data () {
    return {
      rfq: "2222",
      inside: true,
      chartData: [],
      chartData1: [],
      chartType: "supplier",
      bobType: "Best of Best",
      tableList,
      dataList1,
      dataList2,
      dataList3,
      dataList4,
      dataList5,
      dataList6,
      form: {
        supplier: [],
        turn: [],
        spareParts: [],
      },
      showSelectDiv: false,
      analysisSchemeId: "",
      flag: true,
      flag1: false,
      expends: [],
      reportName: "",
      id: "",
      chartTitle: "",
    };
  },
  mounted () {
    this.analysisSchemeId = this.$attrs.analysisSchemeId
    this.chargeRetrieve();
    this.getChartData();

    // if (this.inside === 0) {
    //   this.analysisSchemeId = this.$parent.$options.parent.analysisSchemeId
    // }
    // this.analysisSchemeId = this.$store.state.rfq.SchemeId
    // this.reportName = this.$route.query.name;
    // this.id = this.$route.query.id;
    // this.initChartData()
    // this.analysisSchemeId = this.$route.query.analysisSchemeId;

  },
  methods: {
    open () {
      let els = this.$el.getElementsByClassName("el-table__expand-icon");
      if (this.tableList.element.length != 0 && els.length != 0) {
        this.flag = false;
        this.flag1 = true;
        for (let j1 = 0; j1 < els.length; j1++) {
          els[j1].classList.add("dafult");
        }
        if (
          this.$el.getElementsByClassName("el-table__expand-icon--expanded")
        ) {
          const open = this.$el.getElementsByClassName(
            "el-table__expand-icon--expanded"
          );
          for (let j = 0; j < open.length; j++) {
            open[j].classList.remove("dafult");
          }
          const dafult = this.$el.getElementsByClassName("dafult");
          for (let a = 0; a < dafult.length; a++) {
            dafult[a].click();
          }
        }
      }
    },
    close () {
      if (this.tableList.element.length != 0) {
        this.flag = true;
        this.flag1 = false;
        const elsopen = this.$el.getElementsByClassName(
          "el-table__expand-icon--expanded"
        );
        if (
          this.$el.getElementsByClassName("el-table__expand-icon--expanded")
        ) {
          for (let i = 0; i < elsopen.length; i++) {
            elsopen[i].click();
          }
        }
      }
    },
    chargeRetrieve (type) {
      chargeRetrieve({
        viewType: 'all',
        isDefault: true,
        schemaId: this.analysisSchemeId
      })
        .then((res) => {
          this.tableList = res;
          this.$nextTick(() => {
            this.open();
          });
        })
        .catch((err) => { });
    },
    findPart () {
      this.value = true;
    },
    closeDialog (val) {
      this.$emit('closeDialog', false);
      // this.value = val;
    },
    sure () { },
    handleDownload () {
      downloadPDF({
        idEle: "downloadRef",
        pdfName: "BOB Preview",
      });
    },
    goToBob () {
      this.$router.push("bob");
    },
    closeDiv () {
      this.showSelectDiv = false;
    },
    showSelect (e) {

      const position = e.event.target.position;
      this.showSelectDiv = true;
      this.$refs.toolTipDiv.style.left = position[0] + 210 + "px";
      this.$refs.toolTipDiv.style.top = position[1] + 15 + "px";
      this.$refs.toolTipSelect.focus();
    },
    initChartData () {
      // const data=require('./data.json')
      // this.chartData = data
    },
    handleSearchReset () {
      this.form = {
        supplier: [],
        turn: [],
        spareParts: [],
      };
      this.getChartData();
    },
    searchChartData () {
      getBobLevelOne({
        analysisSchemeId: this.analysisSchemeId,
        analysisDimension: this.chartType,
        spareParts: this.form.spareParts.join(","),
        supplier: this.form.supplier.join(","),
        turn: this.form.turn.join(","),
      }).then((res) => {
        const allData = res.data || [];
        this.chartData = allData.bobLevelOneVOList.filter(
          (r) => r.isIntroduce === 0
        );
        this.chartData1 = allData.bobLevelOneVOList.filter(
          (r) => r.isIntroduce === 1
        );
        this.chartType = allData.analysisDimension;
        this.bobType = allData.defaultBobOptions;
      });
    },
    getChartData () {
      getBobLevelOne({
        analysisSchemeId: this.analysisSchemeId,
      }).then((res) => {
        const allData = res.data || [];
        this.chartData = allData.bobLevelOneVOList.filter(
          (r) => r.isIntroduce === 0
        );
        this.chartData1 = allData.bobLevelOneVOList.filter(
          (r) => r.isIntroduce === 1
        );
        this.chartType = allData.analysisDimension;
        this.bobType = allData.defaultBobOptions;
      });
    },
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
.clearfix::after {
  content: "";
  display: block;
  font-size: 0;
  height: 0;
  clear: both;
}
</style>