<template>
  <div class="bottom-action-bar">
    <div class="left">
      <span v-if="showCheckCode">*本次填写检验码：{{ checkCode }}</span>
    </div>
    <div class="right">
      <i-button v-if="showPreviousButton" @click="handlePreviousButtonClick">上一步</i-button>
      <i-button v-if="showNextButton" @click="handleNextButtonClick">下一步</i-button>
      <i-button v-if="showTemporaryStorageButton" @click="handleTemporaryStorageButtonClick">暂存</i-button>
      <i-button v-if="showSubmitButton" @click="handleSubmitButtonClick">提交</i-button>
    </div>
  </div>
</template>

<script>
import {iButton} from '@/components'

export default {
  components: {
    iButton
  },
  props: {
    checkCode: {type: String, default: '12345678'},
    showCheckCode: {type: Boolean, default: false},
    showPreviousButton: {type: Boolean, default: false},
    showNextButton: {type: Boolean, default: false},
    showTemporaryStorageButton: {type: Boolean, default: false},
    showSubmitButton: {type: Boolean, default: false},
  },
  methods: {
    handlePreviousButtonClick() {
      this.$emit('handlePreviousButtonClick')
    },
    handleNextButtonClick() {
      this.$emit('handleNextButtonClick')
    },
    handleTemporaryStorageButtonClick() {
      this.$emit('handleTemporaryStorageButtonClick')
    },
    handleSubmitButtonClick() {
      this.$emit('handleSubmitButtonClick')
    }
  }
}
</script>

<style scoped lang="scss">
.bottom-action-bar {
  display: flex;
  justify-content: space-between;
}
</style>