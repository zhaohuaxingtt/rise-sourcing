<template>
  <div class="rsPreview">
    <iTabsList v-if="showMtz" type="card" v-model="tab">
      <el-tab-pane lazy v-for="(tab, $tabIndex) in tabs" :key="$tabIndex" :label="language(tab.key, tab.label)" :name="tab.name">
        <component :ref="tab.name" :is="component" v-for="(component, $componentIndex) in tab.components" :class="$componentIndex !== 0 ? 'margin-top20' : ''" :key="$componentIndex" :mtzAppId="mtzAppId" :mtzData="mtzData" />
      </el-tab-pane>
    </iTabsList>
    <nomi v-else :mtzData="mtzData" />
  </div>
</template>

<script>
import { iTabsList, iMessage } from "rise"
import nomi from "./index"
import mtz from "./components/signPreviewBefore"
import { nominateAppSDetail } from "@/api/designate"
import { getApproveRsMtzDetail } from "@/api/designate/decisiondata/rs"

export default {
  components: { iTabsList, nomi, mtz },
  data() {
    return {
      tab: "nomi",
      tabs: [
        {
          key: "LINGJIANDINGDIANSHENQING",
          label: "零件定点申请",
          name: "nomi",
          components: [ "nomi" ]
        },
        {
          key: "MTZDINGDIANSHENQING",
          label: "MTZ定点申请",
          name: "mtz",
          components: [ "mtz" ]
        }
      ],
      mtzAppId: "",
      showMtz: false,
      mtzData: {}
    }
  },
  async created() {
    await this.nominateAppSDetail()
    this.getApproveRsMtzDetail()
  },
  methods: {
    nominateAppSDetail() {
      return nominateAppSDetail({
        nominateAppId: this.$route.query.desinateId
      })
      .then(res => {
        if (res.code == 200) {
          this.mtzAppId = res.data.mtzApplyId
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
          this.showMtz = false
        }
      })
      .catch(() => this.showMtz = false)
    },
    getApproveRsMtzDetail() {
      if (!this.mtzAppId) return

      return getApproveRsMtzDetail({
        nominateId: this.$route.query.desinateId
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
    }
  }
}
</script>

<style lang="scss" scoped>
.rsPreview {}
</style>