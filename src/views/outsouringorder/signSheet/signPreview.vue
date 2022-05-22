<template>
  <iCard v-show="showNomi || showMtz" ref="signPreview" class="signPreview">
    <template #header>
      <iTabsList v-if="showNomi && showMtz" class="tabs" type="card" v-model="tab">
        <el-tab-pane lazy v-for="(tab, $tabIndex) in tabs" :key="$tabIndex" :label="tab.key ? language(tab.key, tab.label) : tab.label" :name="tab.name">
          <!-- <component :ref="tab.name" :is="component" v-for="(component, $componentIndex) in tab.components" :class="$componentIndex !== 0 ? 'margin-top20' : ''" :key="$componentIndex" :mtzAppId="mtzAppId" :mtzData="mtzData" /> -->
        </el-tab-pane>
      </iTabsList>
      <p class="title" v-if="!showMtz && showNomi">Production Purchasing</p>
      <p class="title" v-if="showMtz && !showNomi">MTZ Rules&Parts</p>
      <div>
        <iButton @click="handleExport">{{ language("DAOCHU", "导出") }}</iButton>
        <i @click="handleCollapse" class="el-icon-arrow-up collapse margin-left20 cursor" :class="{ rotate: !collapseValue }"></i>
      </div>
    </template>
    <div>
      <nomi v-if="showNomi" ref="nomi" v-show="tab === 'nomi'" @haveData="showNomi = true" @noData="showNomi = false; tab = 'mtz'" />
      <mtz v-if="showMtz" v-show="tab === 'mtz'" :mtzData="mtzData" />
    </div>
  </iCard>
</template>

<script>
import { iCard, iTabsList, iButton } from "rise"
import nomi from "./preview"
import mtz from "./components/mtzRulesAndParts"
import { getApproveSignMtzDetail } from "@/api/designate/decisiondata/rs"

export default {
  components: { iCard, iTabsList, iButton, nomi, mtz },
  data() {
    return {
      tab: "nomi",
      collapseValue: true,
      showMtz: false,
      showNomi: true,
      tabs: [
        {
          label: "Production Purchasing",
          name: "nomi",
          components: [ "nomi" ]
        },
        {
          label: "MTZ Rules&Parts",
          name: "mtz",
          components: [ "mtz" ]
        }
      ]
    }
  },
  created() {
    this.getApproveSignMtzDetail()
  },
  methods: {
    handleCollapse() {
      this.$refs.signPreview.handleCollapse()
      this.collapseValue = !this.collapseValue
    },
    getApproveSignMtzDetail() {
      return getApproveSignMtzDetail({
        signId: this.$route.query.signId
      })
      .then(res => {
        if (res.code == 200) {
          if (res.data) {
            this.showMtz = true

            this.mtzData = {
              ruleTableListData: Array.isArray(res.data.ruleList) ? res.data.ruleList : [],
              partTableListData: Array.isArray(res.data.partsList) ? res.data.partsList : []
            }
          } else {
            this.showMtz = false

            this.mtzData = {}
          }
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
      })
      .catch(() => this.showMtz = false)
    },
    handleExport() {
      // this.$refs.nomi.exportSignSheet()
      const BASEURL = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '')
      const fileURL = `${BASEURL}${process.env.VUE_APP_SOURCING}/nominate/sign/export-sign-single?signId=${ this.$route.query.signId }`
      window.open(fileURL)
    }
  }
}
</script>

<style lang="scss" scoped>
.signPreview {
  .tabs {
    ::v-deep .el-tabs__header {
      margin-bottom: 0;
    }

    ::v-deep .el-tabs__nav {
      background: #fff;
    }
  }

  .rotate {
    transform: rotate(180deg);
    color: $color-blue;
  }
}
</style>