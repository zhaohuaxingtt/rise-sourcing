<template>
  <iInput
    ref="input"
    v-bind="$attrs"
    v-on="$listeners"
    :type="isFocus ? 'number' : 'text'"
    :value="isFocus ? value : formatValue"
    :oninput="`value=value.indexOf('.') > -1 ? value.slice(value.indexOf('.') - ${maxIntLen}, value.indexOf('.')) + value.slice(value.indexOf('.'), value.indexOf('.') + 1 + ${maxDecimalLen}):value.slice(0,${maxIntLen})`"
    @focus="handleFocus"
    @blur="handleBlur"
    @input="handleInput"
  >
  </iInput>
</template>

<script>
import { iInput } from "rise";

export default {
  components: {
    iInput,
  },
  props: {
    maxIntLen: {
      type: Number,
      default: 15,
    },
    maxDecimalLen: {
      type: Number,
      default: 2
    },
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isFocus: false,
    }
  },
  computed: {
    formatValue() {
      return Number(this.value)?.toFixed(2).replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g ,'$1,');
    }
  },
  methods: {
    handleFocus(evt) {
      this.isFocus = true;
      this.$emit('focus', evt);
    },
    handleBlur(evt) {
      this.isFocus = false;
      this.$emit('blur', evt);
    },
    handleInput(value) {
      this.$emit('input', value)
    }
  },
}
</script>