<template>
  <div>
    <el-popover
        trigger="hover"
        :placement="tipPlacement"
        :width="tipWidth"
        :content="tipContent">
      <icon symbol :name="iconName" :style="iconStyle" slot="reference"/>
    </el-popover>
  </div>
</template>

<script>
import {icon} from 'rise';

export default {
  components: {
    icon,
  },
  props: {
    tipContent: {
      type: String,
      default: '',
    },
    tipPlacement: {
      type: String,
      default: 'top-start',
    },
    tipWidth: {
      type: String,
      default: '300',
    },
    iconName: {
      type: String,
      default: 'iconxinxitishi',
    },
    iconStyle: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
};
</script>

<style scoped>

</style>
