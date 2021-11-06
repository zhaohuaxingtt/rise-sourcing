<template>
  <div class="bottom-action-bar margin-top20">
    <div class="left">
      <span v-if="showCheckCode">
        <span class="required">*</span>
        <!--本次填写检验码-->
        {{$t('SUPPLIER_BENCITIANXIEJIANYANMA')}}：{{ checkCode }}
      </span>
    </div>
    <div class="right">
      <!--上一步-->
      <i-button v-if="showPreviousButton" @click="handlePreviousButtonClick">{{$t('SUPPLIER_SHANGYIBU')}}</i-button>
      <!--下一步-->
      <i-button v-if="showNextButton" @click="handleNextButtonClick">{{$t('SUPPLIER_XIAYIBU')}}</i-button>
      <!--暂存-->
      <i-button v-if="showTemporaryStorageButton" @click="handleTemporaryStorageButtonClick">{{$t('SUPPLIER_ZANCUN')}}</i-button>
      <!--提交-->
      <i-button v-if="showSubmitButton" @click="handleSubmitButtonClick">{{$t('SUPPLIER_TIJIAO')}}</i-button>
    </div>
  </div>
</template>

<script>
import {iButton} from 'rise'

export default {
  components: {
    iButton
  },
  props: {
    checkCode: {type: String, default: ''},
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
.required{
  font-size: 14px;
  color: red;
}
</style>