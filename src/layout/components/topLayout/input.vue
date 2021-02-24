<template>
  <iInput class="search" :placeholder="placeholder" :value="value" @input="handleInput">
    <icon class="icon" slot="prefix" name="iconsousudingbu" />
  </iInput>
</template>

<script>
import { iInput, icon } from '@/components';

export default {
  components: {
    iInput,
    icon
  },
  props: {
    value: {
      type: String || Number,
      default: ''
    },
    placeholder: {
      type: String || Number,
      default: ''
    }
  },
  data() {
    return {}
  },
  methods: {
    handleInput(e) {
      this.$emit('input', e)
    }
  }
}
</script>

<style lang="scss" scoped>
.search {
  width: 667px;
  height: 50px;
  line-height: 50px;
  background: #F8F8FA;
  border-radius: 10px;

  .icon {
    height: 100%;
    margin-right: 20px;
    font-size: 26px;
  }

  ::v-deep .el-input__prefix {
    width: 76px;
    text-align: right;
  }

  ::v-deep .el-input__inner {
    height: 50px;
    padding: 0 40px 0 76px;
    background: transparent;
    box-shadow: 0 0 0 0;

    &::placeholder {
      color: $color-header-black;
      opacity: 0.3;
    }
  }
}
</style>