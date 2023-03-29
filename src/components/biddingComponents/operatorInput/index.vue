<template>
  <iInput
    ref="input"
    v-bind="$attrs"
    v-on="$listeners"
    :value="isFocus ? innerValue : formatValue"
    :oninput="`value=value.indexOf('.') > -1 ? value.slice(0,value.indexOf('.')).slice(0, ${maxIntLen})+value.slice(value.indexOf('.'), value.indexOf('.') + 1 + ${maxDecimalLen}):value.slice(0,${maxIntLen})`"
    @focus="handleFocus"
    @blur="handleBlur"
  >
    <!-- :type="isFocus ? 'number' : 'text'" -->
    <!-- @input="handleInput" -->
    <slot name="suffix" slot="suffix"></slot>
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
      innerValue: this.value,
      isFocus: false,
    }
  },
  watch: {
    isFocus(val) {
      if(val) {
        if (this.innerValue) {
          this.innerValue = Number(this.innerValue)?.toFixed(2);
        } 
      }
    },
    value(val) {
      this.innerValue = val;
    }
  },
  computed: {
    formatValue() {
      return this.innerValue ? Number(this.innerValue)?.toFixed(2).replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g ,'$1,') : '';
    },
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
      this.$emit('input', Number(value))
    }
  },
}
</script>