<template> <!-- 导出RS单决策资料 -->
<div class="b">
  <div class="exportPdf">
    <div class="title">
      <span>{{ language("DINGDIANGUANLI", "定点管理") }}: {{ nominateAppId }}</span>
      <span class="mtz" v-if="this.nomiData.mtzApplyId">
        <span class="crossbar">-</span>
        <span class="num">MTZ{{ this.nomiData.mtzApplyId }}</span>
      </span>
      <span class="nomiType">{{ language("DINGDIANSHENQINGLEIXING", "定点申请类型") }}：{{ this.nomiData.nominateProcessTypeDesc }}</span>
    </div>
    <div class="content">
      <rsTitle class="module" />
      <partList class="module" />
      <tasks class="module" />
      <drawing class="module" />
      <bdl class="module" />
      <singleSourcing class="module" />
      <timeline class="module" />
      <!-- <awardingScenario class="module" /> -->
      <rs class="module" />
    </div>
  </div>
</div>
</template>

<script>
import { nominateAppSDetail } from "@/api/designate"
import rsTitle from "./components/rsTitle"
import partList from "./components/partList"
import tasks from "./components/tasks"
import drawing from "./components/drawing"
import bdl from "./components/bdl"
import singleSourcing from "./components/singleSourcing"
import timeline from "./components/timeline"
import awardingScenario from "./components/awardingScenario"
import rs from "./components/rs"

export default {
  components: {
    rsTitle,
    partList,
    tasks,
    drawing,
    bdl,
    singleSourcing,
    timeline,
    awardingScenario,
    rs
  },
  created() {
    this.nominateAppId = this.$route.query.desinateId

    if (!this.nominateAppId) return

    this.nominateAppSDetail()
  },
  data() {
    return {
      nominateAppId: "", // 定点申请id
      nomiData: {}, // 定点申请数据
    }
  },
  methods: {
    nominateAppSDetail() {
      nominateAppSDetail({
        nominateAppId: this.nominateAppId
      })
      .then(res => {
        if (res.code == 200) {
          this.nomiData = res.data || {}
        }
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.exportPdf {
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
  
    .module {
      & + .module {
        margin-top: 20px; /*no*/
      }
    }
  }
}

.b {
  width: 100vw;
  height: 100vh;
  overflow-y: auto;
}
</style>