<template>
  <div class="top-action-bar">
    <div class="language margin-right20" @click="handleChangeLang">
      <icon
          symbol
          v-if="lang === 'zh'"
          class="icon"
          name="iconzhongyingwenzhuanhuanzhong"
      />
      <icon symbol v-else class="icon" name="iconzhongyingwenzhuanhuanying"/>
    </div>
    <!--提交-->
    <i-button @click="handleTopSubmitButtonClick"
              :disabled="submitButtonDisabled"
              :loading="submitButtonLoading"
    >{{ $t('SUPPLIER_TIJIAO') }}
    </i-button>
    <log-button @toLogPage="toLogPage" v-if="showLogButton"/>
  </div>
</template>

<script>
import {iButton, icon} from 'rise'
import logButton from '../logButton'

export default {
  components: {
    iButton,
    logButton,
    icon
  },
  props: {
    submitButtonDisabled: {
      type: Boolean, default: false
    },
    submitButtonLoading: {
      type: Boolean, default: false
    },
    showLogButton: {
      type: Boolean, default: false
    }
  },
  created() {
    this.lang = localStorage.getItem("lang");
  },
  data() {
    return {
      lang: "",
    }
  },
  methods: {
    handleTopSubmitButtonClick() {
      this.$emit('handleTopSubmitButtonClick')
    },
    toLogPage() {

    },
    handleChangeLang() {
      this.lang = this.lang === "zh" ? "en" : "zh";
      localStorage.setItem("lang", this.lang);
      this.$i18n.locale = this.lang;
      if(this.lang == 'en'){
        // eslint-disable-next-line no-undef
        ELEMENT.locale(ELEMENT.lang.en)
      }else{
        // eslint-disable-next-line no-undef
        ELEMENT.locale(ELEMENT.lang.zhCN)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.top-action-bar {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.language{
  .icon {
    line-height: 97px;
    font-size: 25px;
    cursor: pointer;
  }
}
</style>