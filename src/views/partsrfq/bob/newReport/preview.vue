<template>
  <iDialog :title="reportName"
           :visible.sync="value"
           width="95%"
           v-loading="onDataLoading"
           @close="closeDialog">
    <div id="content"
         :class="[!reportSave?'on-preview-padding':'']">
      <div style="width: 75%; height: 30px;display: flex;flex-flow: row nowrap;justify-content: space-between;">
        <div> <span class="chartTitle">{{title}}</span></div>
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
                 v-premission="WORKBENCH_RFQ_TPZS_CARD_BOB_INFOR_YULAN_SHENGCHENGBAOGAO"
                 @click="handleDownload">生成报告</iButton>
      </div>
      <div style="display: flex;flex-flow: row nowrap;width: 100%;">
        <crown-bar ref="crownBarChartData"
                   :chartData="crownBarChartData"
                   :partList="partList"
                   :title="title"
                   :maxData="maxData"
                   :type="bobType"
                   :by="by"
                   style="width: 75%" />
        <out-bar ref="outBarChartData"
                 :chartData="outBarChartData"
                 :maxData="maxData"
                 :preview="false"
                 style="flex: 1;"></out-bar>
      </div>
      <div style="margin-top:20px;">
        <span style="font-weight:bold;font-size:14px">
          {{ $t("费用详情") }}
        </span>
      </div>
      <bobAnalysis ref="bobAnalysis"
                   :label="label"
                   :formUpdata="formUpdata"
                   :propSchemeId="propSchemeId"
                   :propGroupId="propGroupId"
                   :onPreview="true"></bobAnalysis>
      <!-- <table1 :tableList="tableList"
              style="margin-top:20px"
              v-bind="$attr"></table1> -->
    </div>
    <!-- <bobPreview v-bind="$attrs"></bobPreview> -->
  </iDialog>
</template>

<script>
import { iButton, iDialog, iMessage } from "rise";

import CrownBar from "./components/crownBar.vue";
import { add } from "@/api/partsrfq/bob/analysisList";
import { downloadPDF, dataURLtoFile } from "@/utils/pdf";
import { uploadUdFile } from "@/api/file/upload";
import bobAnalysis from "@/views/partsrfq/bob/bobAnalysis/index.vue";
import OutBar from "./components/outBar.vue";
export default {
  components: {
    iDialog,
    iButton,
    CrownBar,
    OutBar,
    bobAnalysis
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    onPreview: {
      type: Boolean,
      default: false
    },
    crownBarChartData: {
      type: Array,
      default: () => [],
    },
    outBarChartData: {
      type: Array,
      default: () => [
      ]
    },
    reportName: {
      type: String,
      default: ""
    },
    partList: {
      type: Array,
      default: () => []
    },
    title: {
      type: String,
      default: "",
    },
    bobType: {
      type: String,
      default: "Best of Best",
    },
    by: {
      type: String,
      default: "supplier",
    },
    maxData: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: ""
    },
    formUpdata: {
      type: Object,
      default: () => {
        return {}
      }
    },
    propSchemeId: {
      type: String,
      default: ""
    },
    propGroupId: {
      type: String,
      default: ""
    }
  },
  data () {
    return {
      onDataLoading: false,
      onPreview: true,
      reportSave: true,
      anchorList: ['原材料/散件成本', '制造成本', '报废成本', '管理费用', '其他费用', '利润']
    };
  },
  mounted () {
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
          return 'background: #67C23A'
        } else if (item === '利润') {
          return 'background: #0040BE'
        }
      }
    }
  },
  methods: {
    open () {
      console.log(this.crownBarChartData)
      this.$refs.bobAnalysis.chargeRetrieve({
        viewType: 'all',
        isDefault: true,
        schemaId: this.propSchemeId,
        groupId: this.propGroupId
      })
      this.$refs.crownBarChartData.initData(this.crownBarChartData)
      this.$refs.outBarChartData.initData(this.outBarChartData)
    },
    handleDownload () {
      this.reportSave = false
      this.onDataLoading = true;
      this.$nextTick(() => {
        setTimeout(() => {
          downloadPDF({
            idEle: "#content",
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
                  const req = {
                    analysisSchemeId: this.propSchemeId,
                    name: data.name,
                    path: data.path,
                    remark: this.reportName.replaceAll(/\./g, '_'),
                  };
                  add(req);
                  this.closeDialog()
                  this.reportSave = true;
                  this.onDataLoading = false;
                  iMessage.success("生成成功");
                });
              } catch {
                iMessage.err("生成失败");
                this.closeDialog()
                this.onDataLoading = false;
                this.reportSave = true;
              }
            },
          });
        }, 20)
      })
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
.on-preview-padding {
  padding: 15px;
}
</style>