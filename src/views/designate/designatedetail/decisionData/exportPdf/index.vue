<template> <!-- 导出RS单决策资料 -->
  <div class="exportPdf">
    <div class="btnControl">
      <iButton :loading="exportLoading" @click="exportPdf">{{ language("DAOCHUPDF", "导出PDF") }}</iButton>
    </div>
    <div id="bbbbb" class="main" ref="contentPage">
      <div class="title">
        <span>{{ language("DINGDIANGUANLI", "定点管理") }}: {{ nominateAppId }}</span>
        <span class="mtz" v-if="this.nomiData.mtzApplyId">
          <span class="crossbar">-</span>
          <span class="num">MTZ{{ this.nomiData.mtzApplyId }}</span>
        </span>
        <span class="nomiType">{{ language("DINGDIANSHENQINGLEIXING", "定点申请类型") }}：{{ this.nomiData.nominateProcessTypeDesc }}</span>
      </div>
      <div class="content">
        <div  class="tab-list">
          <iTabsList value="/designate/decisiondata/title">
            <template v-for="(item,index) in decisionType">
              <el-tab-pane :key="'decisionType' + index" :label="item.name" :name="item.path"></el-tab-pane>
            </template>
          </iTabsList>
        </div>
        <rsTitle class="module"/>
        <!-- [ { "key": "Title", "name": "Title", "path": "/designate/decisiondata/title" }, 
        { "key": "PartList", "name": "Part List", "path": "/designate/decisiondata/partlist" },
         { "key": "Tasks", "name": "Tasks", "path": "/designate/decisiondata/tasks" },
          { "key": "Drawing", "name": "Drawing", "path": "/designate/decisiondata/drawing" },
           { "key": "BDL", "name": "BDL", "path": "/designate/decisiondata/bdl" }, 
           { "key": "SingleSourcing", "name": "Single Sourcing", "path": "/designate/decisiondata/singlesourcing" }, 
           { "key": "ABPrice", "name": "A-B Price", "path": "/designate/decisiondata/abprice" }, 
           { "key": "CostAnalysis", "name": "Cost Analysis", "path": "/designate/decisiondata/costanalysis" }, \
           { "key": "TimeLine", "name": "Timeline", "path": "/designate/decisiondata/timeline" },
            { "key": "Strategy", "name": "Strategy", "path": "/designate/decisiondata/strategy" },
             { "key": "AwardingScenario", "name": "Awarding Scenario", "path": "/designate/decisiondata/awardingscenario" },
              { "key": "RS", "name": "RS", "path": "/designate/decisiondata/rs" },
               { "key": "MTZ", "name": "MTZ", "path": "/designate/decisiondata/mtz", "isMtz": true }, 
               { "key": "Attachment", "name": "Attachment", "path": "/designate/decisiondata/attachment" } ] -->
        <div  class="tab-list">
          <iTabsList value="/designate/decisiondata/partlist">
            <template v-for="(item,index) in decisionType">
              <el-tab-pane :key="'decisionType' + index" :label="item.name" :name="item.path"></el-tab-pane>
            </template>
          </iTabsList>
        </div>
        <partList class="module"/>

        <div  class="tab-list">
          <iTabsList value="/designate/decisiondata/tasks">
            <template v-for="(item,index) in decisionType">
              <el-tab-pane :key="'decisionType' + index" :label="item.name" :name="item.path"></el-tab-pane>
            </template>
          </iTabsList>
        </div>
        <tasks class="module"/>

        <div  class="tab-list">
          <iTabsList value="/designate/decisiondata/drawing">
            <template v-for="(item,index) in decisionType">
              <el-tab-pane :key="'decisionType' + index" :label="item.name" :name="item.path"></el-tab-pane>
            </template>
          </iTabsList>
        </div>
        <drawing class="module"/>

        <div  class="tab-list">
          <iTabsList value="/designate/decisiondata/bdl">
            <template v-for="(item,index) in decisionType">
              <el-tab-pane :key="'decisionType' + index" :label="item.name" :name="item.path"></el-tab-pane>
            </template>
          </iTabsList>
        </div>
        <bdl class="module"/>

        <div  class="tab-list">
          <iTabsList value="/designate/decisiondata/singlesourcing">
            <template v-for="(item,index) in decisionType">
              <el-tab-pane :key="'decisionType' + index" :label="item.name" :name="item.path"></el-tab-pane>
            </template>
          </iTabsList>
        </div>
        <singleSourcing class="module"/>

        <div  class="tab-list">
          <iTabsList value="/designate/decisiondata/timeline">
            <template v-for="(item,index) in decisionType">
              <el-tab-pane :key="'decisionType' + index" :label="item.name" :name="item.path"></el-tab-pane>
            </template>
          </iTabsList>
        </div>
        <timeline class="module"/>
        <!-- <awardingScenario class="module" /> -->

        <div  class="tab-list">
          <iTabsList value="/designate/decisiondata/rs">
            <template v-for="(item,index) in decisionType">
              <el-tab-pane :key="'decisionType' + index" :label="item.name" :name="item.path"></el-tab-pane>
            </template>
          </iTabsList>
        </div>
        <rs class="module" :nomiData="nomiData"/>
      </div>
    </div>
  </div>
</template>

<script>
import { iButton, iTabsList } from "rise"
import {nominateAppSDetail} from "@/api/designate"
import rsTitle from "./components/rsTitle"
import partList from "./components/partList"
import tasks from "./components/tasks"
import drawing from "./components/drawing"
import bdl from "./components/bdl"
import singleSourcing from "./components/singleSourcing"
import timeline from "./components/timeline"
import rs from "./components/rs"
import { transverseDownloadPDF } from "@/utils/pdf"

import { decisionType } from '@/layout/nomination/components/data'

export default {
  components: {
    iButton,
    rsTitle,
    partList,
    tasks,
    drawing,
    bdl,
    singleSourcing,
    timeline,
    rs,
    iTabsList
  },
  created() {
    this.nominateAppId = this.$route.query.desinateId
    if (!this.nominateAppId) return

    this.nominateAppSDetail()
  },
  data() {
    return {
      exportLoading: false,
      nominateAppId: "", // 定点申请id
      nomiData: {}, // 定点申请数据
      decisionType
    }
  },
  methods: {
    nominateAppSDetail() {
      nominateAppSDetail({
        nominateAppId: this.nominateAppId
      }).then(res => {
        if (res.code == 200) {
          this.nomiData = res.data || {}
          console.log("nmsl", this.nomiData)
        }
      })
    },
    exportPdf() {
      // this.exportLoading = true
      // transverseDownloadPDF({
      //   dom: this.$refs.contentPage,
      //   pdfName: `定点申请_${ this.$route.query.desinateId }_决策资料`,
      //   exportPdf: true,
      //   waterMark: true,
      //   callback: () => {
      //     this.exportLoading = false
      //   }
      // })
      html2canvas(this.$el.querySelector("#bbbbb")).then(canvas => {
        const url = canvas.toDataURL("image/png")

        const a = document.createElement('a');
                    a.href = url;
                    a.setAttribute('download', 'chart-download');
                    a.click();
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.exportPdf {
  width: 100vw;
  height: 100vh;
  overflow-y: auto;
  position: relative;

  .tab-list {
    margin-top:40px
  }

  .btnControl {
    width: 1920px; /*no*/
    text-align: right;
    position: absolute;
    height: 30px; /*no*/
    top: 30px; /*no*/
    left: 50%;
    transform: translate(-50%, 0);
  }

  .main {
    width: 1920px; /*no*/
    padding: 30px 40px; /*no*/
    margin: 0 auto;
    box-sizing: content-box;

    .title {
      display: flex;
      align-items: center;
      font-size: 20px; /*no*/
      font-weight: bold;
      white-space: nowrap;
      height: 30px; /*no*/
      line-height: 30px; /*no*/

      .mtz {
        .num {
          color: $color-blue;
        }
      }

      .nomiType {
        margin-left: 14px; /*no*/
        font-size: 14px; /*no*/
        font-weight: normal;
        white-space: nowrap;
      }
    }

    .crossbar {
      padding: 0 5px; /*no*/
    }

    .content {
      margin-top: 30px; /*no*/

      ::v-deep .card {
        box-shadow: none;
        border: 1px solid #999;
      }

      .module {
        & + .module {
          margin-top: 20px; /*no*/
        }
      }
    }
  }
}
</style>
