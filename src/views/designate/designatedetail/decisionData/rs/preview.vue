<template>
  <div class="rsPreview">
    <iTabsList v-if="mtzAppId" type="card" v-model="tab">
      <el-tab-pane lazy v-for="(tab, $tabIndex) in tabs" :key="$tabIndex" :label="language(tab.key, tab.label)" :name="tab.name">
        <component :ref="tab.name" :is="component" v-for="(component, $componentIndex) in tab.components" :class="$componentIndex !== 0 ? 'margin-top20' : ''" :key="$componentIndex" :mtzAppId="mtzAppId" />
      </el-tab-pane>
    </iTabsList>
    <nomi v-else />
  </div>
</template>

<script>
import { iTabsList, iMessage } from "rise"
import nomi from "./index"
import mtz from "./components/signPreviewBefore"
import { nominateAppSDetail } from "@/api/designate"

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
      mtzAppId: ""
    }
  },
  created() {
    this.nominateAppSDetail()
  },
  methods: {
    nominateAppSDetail() {
      nominateAppSDetail({
        nominateAppId: this.$route.query.desinateId
      })
      .then(res => {
        if (res.code == 200) {
          this.mtzAppId = res.data.mtzApplyId
        } else {
          iMessage.error(this.$i18n.locale === "zh" ? res.desZh : res.desEn)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.rsPreview {}
</style>