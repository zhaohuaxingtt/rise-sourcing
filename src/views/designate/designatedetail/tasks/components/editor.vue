
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
      <div class="editor-content margin-top20">
        <iInput
          type="textarea"
          :placeholder="$t('strategicdoc.BeiZuXinXi')"
          :autosize="{ minRows: 4, maxRows: 6}"
          v-model="value">
        </iInput> 
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
    iInput,
    iCard,
    iButton
  }
}
</script>
<style lang="scss" scoped>
.clearfix {
  clear: both
}
</style>