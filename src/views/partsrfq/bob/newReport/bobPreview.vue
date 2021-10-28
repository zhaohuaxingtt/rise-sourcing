<!--
 * @Author: your name
 * @Date: 2021-10-27 14:21:32
 * @LastEditTime: 2021-10-27 14:47:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsrfq\bob\newReport\bobPreview.vue
-->
<template>
  <div id="content">
    <div style="width: 75%; height: 30px;display: flex;flex-flow: row nowrap;justify-content: space-between;">
      <div> <span class="chartTitle">{{chartTitle}}</span></div>
      <div class="legend">
        <ul>
          <li v-for="(item,index) in anchorList"
              :key="index">
            <i class="circle"
               :style="color(item)"></i>
            <span style="vertical-align: baseline">{{item}}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="clearfix">
      <iButton class="margin-left10 "
               style="float: right"
               v-show="reportSave"
               @click="handleDownload">生成报告</iButton>
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
    <table1 :tableList="tableList"
            style="margin-top:20px"
            v-bind="$attr"></table1>
  </div>
</template>

<script>
import { iPage, iButton, iCard, iSelect, icon, iDialog, iMessage } from "rise";
import CrownBar from "./components/crownBar.vue";
import { add } from "@/api/partsrfq/bob/analysisList";
import { downloadPDF, dataURLtoFile } from "@/utils/pdf";
import { uploadUdFile } from "@/api/file/upload";
import table1 from "../bobAnalysis/components/table1.vue";
import OutBar from "./components/outBar.vue";
export default {
  components: {
    iDialog,
    iButton,
    iCard,
    CrownBar,
    OutBar,
    table1
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
    },
    chartData: {
      type: Array,
      default: () => {
        return []
      }
    },
    chartData1: {
      type: Array,
      default: () => {
        return []
      }
    },
    chartType: {
      type: String,
      default: ""
    },
    bobType: {
      type: String
    }
  },
  data () {
    return {
      rfq: "2222",
      inside: true,
      tableList: [],
      reportSave: true,
      anchorList: ['原材料/散件成本', '制造成本', '报废成本', '管理费用', '其他费用', '利润'],
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
      // reportName: "",
      id: "",
      // chartTitle: "",
      groupId: ""
    };
  },
  mounted () {
    console.log(this.$parent.$parent.$parent.$parent, "parent")
    this.analysisSchemeId = this.$attrs.analysisSchemeId
    this.groupId = this.$attrs.groupId
    this.tableList = this.$parent.$parent.$parent.$parent.$refs.bobAnalysis.tableList
    // this.chargeRetrieve();
    // this.getChartData();
    this.$nextTick(() => {
      this.open()
    });
  },
  computed: {
    color () {
      return function (item) {
        if (item === '原材料/散件成本') {
          return 'background: #C6DEFF'
        } else if (item === '制造成本') {
          return 'background: #9BBEFF'
        } else if (item === '报废成本') {
          return 'background: #72AEFF'
        } else if (item === '管理费用') {
          return 'background: #5993FF'
        } else if (item === '其他费用') {
          return 'background: #1763F7'
        } else if (item === '利润') {
          return 'background: #0040BE'
        }
      }
    }
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
    findPart () {
      this.value = true;
    },
    closeDialog (val) {
      this.$emit('closeDialog', false);
      // this.value = val;
    },
    sure () { },
    handleDownload () {
      this.reportSave = false
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      downloadPDF({
        idEle: "content",
        pdfName: this.reportName.replaceAll(/\./g, '_'),
        exportPdf: true,
        callback: async (pdf, pdfName) => {
          try {
            const filename = pdfName.replaceAll(/\./g, '_') + ".pdf";
            const pdfFile = pdf.output("datauristring");
            const blob = dataURLtoFile(pdfFile, filename);
            uploadUdFile({
              applicationName: 'sourcing',
              businessId: Math.ceil(Math.random() * 100000),
              multifile: blob
            }).then(res => {
              this.savereport = true
              const data = res.data[0]
              // let arr = data.path.match(/^(?:[^\/]|\/\/)*/)
              // let arr2 = data.path.split(arr[0])
              loading.close();
              const req = {
                analysisSchemeId: this.analysisSchemeId,
                name: data.name,
                path: data.path,
                remark: this.reportName.replaceAll(/\./g, '_'),
              };
              add(req);
              this.closeDialog()
              this.reportSave = true;
              iMessage.success("生成成功");
            });
          } catch {
            iMessage.err("生成失败");
            this.closeDialog()
            this.reportSave = true;
          }
        },
      });
    },
    goToBob () {
      this.$router.push("bob");
    },
    closeDiv () {
      this.showSelectDiv = false;
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