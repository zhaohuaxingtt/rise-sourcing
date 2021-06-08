
<template>
  <iCard class="editor">
    <div class="clearFloat">
      <span class="font18 font-weight">
        {{ $t("Background & Objective") }}</span
      >
      <div class="floatright">
        <span v-if="multiEditControl">
          <iButton>
            {{ $t("LK_BAOCUN") }}
          </iButton>
          <iButton>
            {{ $t("strategicdoc.JieSuBianJi") }}
          </iButton>
        </span>
        <span v-else>
          <iButton v-if="!$store.getters.isPreview" @click="multiEditControl = true">
            {{ $t("LK_BIANJI") }}
          </iButton>
        </span>
      </div>
      <div class="clearfix"></div>
      <div class="editor-content margin-top20" id="textEditor">
        <!-- <iInput
          type="textarea"
          :placeholder="$t('strategicdoc.BeiZuXinXi')"
          :autosize="{ minRows: 4, maxRows: 6}"
          v-model="value">
        </iInput>  -->
      </div>
    </div>
  </iCard>
</template>

<script>
import {
  iInput,
  iCard,
  iButton
} from 'rise'

export default {
  data() {
    return {
      value: '',
      multiEditControl: false
    }
  },
  components: {
    // iInput,
    iCard,
    iButton
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      const wangEditor = window.wangEditor
      const Edditor = new wangEditor('#textEditor')
      Edditor.config.menus = []
      Edditor.config.placeholder = this.$t('strategicdoc.BeiZuXinXi')
      Edditor.config.zIndex = 100
      Edditor.create()
      window.Edditor = Edditor
    }
  }
}
</script>
<style lang="scss" scoped>
.clearfix {
  clear: both
}
#textEditor {
  border: 1px solid #ebebeb;
  border-radius: 5px;
  ::v-deep.w-e-toolbar {
    display: none;
  }
  ::v-deep.w-e-text-container {
    height: auto !important;
    min-height: 100px;
    max-height: 500px;
    border: 0px !important;
  }
}
</style>